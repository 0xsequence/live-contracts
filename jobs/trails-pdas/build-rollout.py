#!/usr/bin/env python3
"""Build a Trails Configurator rollout from a spec, export it for signing, and attach the signature.

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
an empty signature, under the Catapult constant `trails-pdas-<env>-rollout-<name>`, where `<env>`
comes from the job directory the rollout lives in (`jobs/trails-pdas-dev/` -> `dev`). The file is
JSON, which is also valid YAML, so Catapult loads it as constants and any JSON tool can read it.
The root is what signers sign; the leaves are what they are approving.

`export` writes `rollouts/<name>.signing.json`, the packet handed to the owner wallet's signers:
the wallet configuration, the root, the digest chain down to the 32-byte `opHash` each signer
signs, and every chain's calls in readable form. `assemble` takes that packet plus the collected
signatures, encodes the Sequence v3 signature tree, and writes it into the rollout. `attach`
writes an already-encoded signature (for example from `sign-root.py`) into the rollout. Both
check the leaves still derive the recorded root first.

Calldata and leaf encoding use `cast`, so this script never holds or sees a key.

Usage:
  python3 build-rollout.py build    rollouts/0001-bootstrap.spec.json
  python3 build-rollout.py export   rollouts/0001-bootstrap.constants.yaml \
      --wallet 0x... --signers 0xA,0xB,0xC --threshold 2
  python3 build-rollout.py assemble rollouts/0001-bootstrap.signing.json \
      --signature 0xA:hash:0x<64 or 65 bytes> --signature 0xB:eth_sign:0x<64 or 65 bytes>
  python3 build-rollout.py attach   rollouts/0001-bootstrap.constants.yaml --signature 0x...
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


def constant_name(rollout_path: pathlib.Path, name: str) -> str:
    """`trails-pdas-<env>-rollout-<name>`, with <env> taken from the enclosing job directory."""
    job_dir = rollout_path.resolve().parent.parent.name
    prefix = "trails-pdas-"
    if not job_dir.startswith(prefix) or job_dir == prefix.rstrip("-"):
        sys.exit(f"error: {rollout_path} is not under a jobs/trails-pdas-<env>/rollouts/ directory")
    return f"{job_dir}-rollout-{name}"


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
    doc = {"type": "constants", "constants": {constant_name(spec_path, name): rollout}}
    out.write_text(json.dumps(doc, indent=2) + "\n")
    print(f"root        {rollout['root']}")
    print(f"rootDigest  {rollout['rootDigest']}")
    print(f"leaves      {len(leaves)}")
    print(f"wrote       {out}")


def load_rollout(rollout_path: pathlib.Path) -> tuple[dict, dict]:
    doc = json.loads(rollout_path.read_text())
    (rollout,) = doc["constants"].values()
    if hx(derive_root(rollout)) != rollout["root"]:
        sys.exit("error: leaves no longer derive the recorded root; rebuild from the spec")
    return doc, rollout


def attach(rollout_path: pathlib.Path, signature: str) -> None:
    doc, rollout = load_rollout(rollout_path)
    if not signature.startswith("0x") or len(signature) < 4:
        sys.exit("error: --signature must be 0x-prefixed hex")
    rollout["signature"] = signature.lower()
    rollout_path.write_text(json.dumps(doc, indent=2) + "\n")
    print(f"attached signature to {rollout_path}")


def export(rollout_path: pathlib.Path, wallet: str, signers: list[str], threshold: int, checkpoint: int) -> None:
    _, rollout = load_rollout(rollout_path)
    root = bytes.fromhex(rollout["root"][2:])
    digest = _sign_root.root_digest(root)
    op_hash = _sign_root.sequence_op_hash(digest, wallet, 0)
    packet = {
        "rollout": rollout_path.name,
        "configurator": rollout["configurator"],
        "owner": {"wallet": wallet, "signers": signers, "threshold": threshold, "checkpoint": checkpoint},
        "root": rollout["root"],
        "rootDigest": hx(digest),
        # What each signer signs. `opHash` is the Sequence v3 no-chain-id digest of rootDigest,
        # so one signature validates on every chain. `ethSignHash` is what an eth_sign /
        # personal_sign wallet produces from opHash; such a signer reports kind "eth_sign".
        "opHash": hx(op_hash),
        "ethSignHash": hx(_sign_root.eth_sign_hash(op_hash)),
        "leaves": {c: {"nonce": rollout["leaves"][c]["leaf"][2], "calls": rollout["leaves"][c]["calls"]} for c in sorted(rollout["leaves"], key=int)},
    }
    out = rollout_path.with_name(rollout_path.name.removesuffix(".constants.yaml") + ".signing.json")
    out.write_text(json.dumps(packet, indent=2) + "\n")
    print(f"opHash      {packet['opHash']}")
    print(f"ethSignHash {packet['ethSignHash']}")
    print(f"wrote       {out}")


def parse_signature(spec: str) -> tuple[str, str, bytes]:
    """`<signer>:<hash|eth_sign>:<0x hex>`, hex either 64 bytes (ERC-2098 compact) or 65 bytes (r,s,v)."""
    try:
        signer, kind, hex_sig = spec.split(":")
    except ValueError:
        sys.exit(f"error: --signature must be <signer>:<kind>:<0xhex>, got {spec!r}")
    raw = bytes.fromhex(hex_sig[2:] if hex_sig.startswith("0x") else hex_sig)
    if len(raw) == 65:
        r, s, v = raw[:32], int.from_bytes(raw[32:64], "big"), raw[64]
        parity = v - 27 if v >= 27 else v
        if parity not in (0, 1):
            sys.exit(f"error: signature for {signer} has invalid v={v}")
        if s >> 255:
            sys.exit(f"error: signature for {signer} has a high s; cannot encode as ERC-2098")
        raw = r + (s | (parity << 255)).to_bytes(32, "big")
    elif len(raw) != 64:
        sys.exit(f"error: signature for {signer} must be 64 or 65 bytes, got {len(raw)}")
    return signer.lower(), kind, raw


def assemble(packet_path: pathlib.Path, signature_specs: list[str]) -> None:
    packet = json.loads(packet_path.read_text())
    rollout_path = packet_path.with_name(packet["rollout"])
    _, rollout = load_rollout(rollout_path)
    if rollout["root"] != packet["root"]:
        sys.exit("error: the packet was exported from a different root; re-export and re-sign")
    owner = packet["owner"]
    signatures = {}
    for spec in signature_specs:
        signer, kind, raw = parse_signature(spec)
        if signer in signatures:
            sys.exit(f"error: duplicate signature for {signer}")
        signatures[signer] = (kind, raw)
    sig = _sign_root.encode_signature_tree(owner["signers"], owner["threshold"], owner["checkpoint"], 0, signatures)
    attach(rollout_path, hx(sig))


def main() -> None:
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    b = sub.add_parser("build")
    b.add_argument("spec", type=pathlib.Path)
    e = sub.add_parser("export")
    e.add_argument("rollout", type=pathlib.Path)
    e.add_argument("--wallet", required=True)
    e.add_argument("--signers", required=True, help="comma-separated, in imageHash fold order")
    e.add_argument("--threshold", type=int, required=True)
    e.add_argument("--checkpoint", type=int, default=0)
    s = sub.add_parser("assemble")
    s.add_argument("packet", type=pathlib.Path)
    s.add_argument("--signature", action="append", required=True, help="<signer>:<hash|eth_sign>:<0xhex>, repeatable")
    a = sub.add_parser("attach")
    a.add_argument("rollout", type=pathlib.Path)
    a.add_argument("--signature", required=True)
    args = p.parse_args()
    if args.cmd == "build":
        build(args.spec)
    elif args.cmd == "export":
        export(args.rollout, args.wallet, [x.strip() for x in args.signers.split(",") if x.strip()], args.threshold, args.checkpoint)
    elif args.cmd == "assemble":
        assemble(args.packet, args.signature)
    else:
        attach(args.rollout, args.signature)


if __name__ == "__main__":
    main()
