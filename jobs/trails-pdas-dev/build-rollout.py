#!/usr/bin/env python3
"""Build a Trails Configurator rollout from a spec, or attach a signature to a built rollout.

A spec (`rollouts/<name>.spec.json`) lists the chains in the rollout, each chain's nonce, and the
calls every chain's leaf carries:

  {
    "configurator": "0x...",
    "chains": {"1": 0, "137": 0},          # chain id -> Configurator.nonce() the leaf plays at
    "calls": [                              # prepended to every chain's leaf, in order
      {"target": "0x...", "signature": "setSwapOracle(address)", "args": ["0x..."]}
    ],
    "chainCalls": {"137": [ ... ]}          # appended to that chain's leaf only
  }

`build` writes `rollouts/<name>.constants.yaml`: the merkle root, each chain's leaf and proof, and
an empty signature, under the Catapult constant `trails-pdas-dev-rollout-<name>`. The file is JSON,
which is also valid YAML, so Catapult loads it as constants and any JSON tool can read it. The
root is what signers sign; the leaves are what they are approving. `attach` writes a signature
produced elsewhere into the rollout, after checking the leaves still derive the recorded root.

Calldata and leaf encoding use `cast`, so this script never holds or sees a key.

Usage:
  python3 build-rollout.py build  rollouts/0001-bootstrap.spec.json
  python3 build-rollout.py attach rollouts/0001-bootstrap.constants.yaml --signature 0x...
"""

import argparse
import importlib.util
import json
import pathlib
import subprocess
import sys

_HERE = pathlib.Path(__file__).resolve().parent
_spec = importlib.util.spec_from_file_location("sign_root", _HERE / "sign-root.py")
_sign_root = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_sign_root)
keccak256 = _sign_root.keccak256

LEAF_TYPE = "(uint256,address,uint256,(address,bytes)[])"


def cast(*args: str) -> str:
    return subprocess.run(["cast", *args], check=True, capture_output=True, text=True).stdout.strip()


def encode_call(call: dict) -> list[str]:
  # cast parses JSON-style lowercase booleans only; str(True) is "True" and fails.
  args = ["true" if a is True else "false" if a is False else str(a) for a in call["args"]]
  return [call["target"], cast("calldata", call["signature"], *args)]


def leaf_hash(leaf: list) -> bytes:
    """`Configurator.hashLeaf`: keccak256(bytes.concat(keccak256(abi.encode(leaf))))."""
    chain_id, configurator, nonce, calls = leaf
    literal = f"({chain_id},{configurator},{nonce},[{','.join(f'({t},{d})' for t, d in calls)}])"
    encoded = bytes.fromhex(cast("abi-encode", f"f({LEAF_TYPE})", literal)[2:])
    return keccak256(keccak256(encoded))


def hash_pair(a: bytes, b: bytes) -> bytes:
    """OpenZeppelin `MerkleProof` commutative pair hash."""
    return keccak256(a + b if a < b else b + a)


def merkle(leaves: list[bytes]) -> tuple[bytes, list[list[bytes]]]:
    """Root and per-leaf proofs. An unpaired node is carried up a level unchanged."""
    proofs = [[] for _ in leaves]
    positions = list(range(len(leaves)))
    level = list(leaves)
    while len(level) > 1:
        nxt = []
        for i in range(0, len(level), 2):
            if i + 1 < len(level):
                nxt.append(hash_pair(level[i], level[i + 1]))
            else:
                nxt.append(level[i])
        for leaf, pos in enumerate(positions):
            sibling = pos ^ 1
            if sibling < len(level):
                proofs[leaf].append(level[sibling])
            positions[leaf] = pos // 2
        level = nxt
    return level[0], proofs


def verify(proof: list[bytes], root: bytes, leaf: bytes) -> bool:
    node = leaf
    for sibling in proof:
        node = hash_pair(node, sibling)
    return node == root


def hx(b: bytes) -> str:
    return "0x" + b.hex()


def derive_root(rollout: dict) -> bytes:
    chain_ids = sorted(rollout["leaves"], key=int)
    root, _ = merkle([leaf_hash(rollout["leaves"][c]["leaf"]) for c in chain_ids])
    return root


def build(spec_path: pathlib.Path) -> None:
    spec = json.loads(spec_path.read_text())
    chain_ids = sorted(spec["chains"], key=int)
    if not chain_ids:
        sys.exit("error: spec has no chains")
    unknown = set(spec.get("chainCalls", {})) - set(chain_ids)
    if unknown:
        sys.exit(f"error: chainCalls for chains not in the rollout: {sorted(unknown, key=int)}")

    leaves = {}
    for chain_id in chain_ids:
        calls = spec["calls"] + spec.get("chainCalls", {}).get(chain_id, [])
        if not calls:
            sys.exit(f"error: chain {chain_id} has no calls")
        leaves[chain_id] = {
            "calls": calls,
            "leaf": [int(chain_id), spec["configurator"], spec["chains"][chain_id], [encode_call(c) for c in calls]],
        }

    hashes = [leaf_hash(leaves[c]["leaf"]) for c in chain_ids]
    root, proofs = merkle(hashes)
    for chain_id, h, proof in zip(chain_ids, hashes, proofs):
        if not verify(proof, root, h):
            sys.exit(f"error: proof for chain {chain_id} does not verify")
        leaves[chain_id]["leafHash"] = hx(h)
        leaves[chain_id]["proof"] = [hx(p) for p in proof]

    rollout = {
        "configurator": spec["configurator"],
        "root": hx(root),
        "rootDigest": hx(_sign_root.root_digest(root)),
        "signature": "",
        "leaves": leaves,
    }
    name = spec_path.name.removesuffix(".spec.json")
    out = spec_path.with_name(f"{name}.constants.yaml")
    doc = {"type": "constants", "constants": {f"trails-pdas-dev-rollout-{name}": rollout}}
    out.write_text(json.dumps(doc, indent=2) + "\n")
    print(f"root        {rollout['root']}")
    print(f"rootDigest  {rollout['rootDigest']}")
    print(f"leaves      {len(leaves)}")
    print(f"wrote       {out}")


def attach(rollout_path: pathlib.Path, signature: str) -> None:
    doc = json.loads(rollout_path.read_text())
    (rollout,) = doc["constants"].values()
    if hx(derive_root(rollout)) != rollout["root"]:
        sys.exit("error: leaves no longer derive the recorded root; rebuild from the spec")
    if not signature.startswith("0x") or len(signature) < 4:
        sys.exit("error: --signature must be 0x-prefixed hex")
    rollout["signature"] = signature.lower()
    rollout_path.write_text(json.dumps(doc, indent=2) + "\n")
    print(f"attached signature to {rollout_path}")


def main() -> None:
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    b = sub.add_parser("build")
    b.add_argument("spec", type=pathlib.Path)
    a = sub.add_parser("attach")
    a.add_argument("rollout", type=pathlib.Path)
    a.add_argument("--signature", required=True)
    args = p.parse_args()
    if args.cmd == "build":
        build(args.spec)
    else:
        attach(args.rollout, args.signature)


if __name__ == "__main__":
    main()
