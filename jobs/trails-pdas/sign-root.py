#!/usr/bin/env python3
"""Sign a Trails Configurator merkle root for a Sequence v3 smart-contract-wallet owner.

Produces the `signature` bytes blob that `Configurator.updateConfig` will accept via the
ERC-1271 path when `owner()` is a Sequence v3 (Stage1Module/Stage2Module) wallet.

The private key is read from the environment variable named by --key-env (default
PDA_WALLET_SIGNER_KEY). Signing happens in-process, so the key is never printed, never written
to disk, and never appears in a command line or in another process's arguments.

Usage:
  python3 sign-root.py --root 0x<32 bytes> \
      --wallet 0xdA93C44A5f1F7dA9537f51c4F7260c6b4829571c \
      --signers 0xe8db...,0x44FE...        # in imageHash fold order, left to right
      [--threshold 1] [--checkpoint 0] [--chain-id 0]

--chain-id 0 (the default) emits the no-chain-id signature (flag bit 0x02), which makes the
signature valid on every chain. Any other value emits the chain-bound form, which is only
valid on that chain.
"""

import argparse
import hashlib
import hmac
import os
import sys

try:
    from Crypto.Hash import keccak as _pycryptodome_keccak

    def keccak256(data: bytes) -> bytes:
        h = _pycryptodome_keccak.new(digest_bits=256)
        h.update(data)
        return h.digest()

except ImportError:
    # Pure-python keccak-256 (FIPS-202 Keccak-f[1600], rate 136, pad 0x01) so this script has
    # no dependency beyond the standard library.
    _RC = [
        0x0000000000000001, 0x0000000000008082, 0x800000000000808A, 0x8000000080008000,
        0x000000000000808B, 0x0000000080000001, 0x8000000080008081, 0x8000000000008009,
        0x000000000000008A, 0x0000000000000088, 0x0000000080008009, 0x000000008000000A,
        0x000000008000808B, 0x800000000000008B, 0x8000000000008089, 0x8000000000008003,
        0x8000000000008002, 0x8000000000000080, 0x000000000000800A, 0x800000008000000A,
        0x8000000080008081, 0x8000000000008080, 0x0000000080000001, 0x8000000080008008,
    ]
    _ROT = [
        [0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61],
        [28, 55, 25, 21, 56], [27, 20, 39, 8, 14],
    ]
    _M = (1 << 64) - 1

    def _rotl(x: int, n: int) -> int:
        return ((x << n) | (x >> (64 - n))) & _M

    def _keccak_f(a: list[list[int]]) -> None:
        for rnd in range(24):
            c = [a[x][0] ^ a[x][1] ^ a[x][2] ^ a[x][3] ^ a[x][4] for x in range(5)]
            d = [c[(x - 1) % 5] ^ _rotl(c[(x + 1) % 5], 1) for x in range(5)]
            for x in range(5):
                for y in range(5):
                    a[x][y] ^= d[x]
            b = [[0] * 5 for _ in range(5)]
            for x in range(5):
                for y in range(5):
                    b[y][(2 * x + 3 * y) % 5] = _rotl(a[x][y], _ROT[x][y])
            for x in range(5):
                for y in range(5):
                    a[x][y] = b[x][y] ^ ((~b[(x + 1) % 5][y] & _M) & b[(x + 2) % 5][y])
            a[0][0] ^= _RC[rnd]

    def keccak256(data: bytes) -> bytes:
        rate = 136
        padded = bytearray(data)
        padded.append(0x01)
        while len(padded) % rate != 0:
            padded.append(0x00)
        padded[-1] ^= 0x80
        a = [[0] * 5 for _ in range(5)]
        for off in range(0, len(padded), rate):
            block = padded[off:off + rate]
            for i in range(rate // 8):
                lane = int.from_bytes(block[i * 8:i * 8 + 8], "little")
                a[i % 5][i // 5] ^= lane
            _keccak_f(a)
        out = bytearray()
        for i in range(4):
            out += a[i % 5][i // 5].to_bytes(8, "little")
        return bytes(out)


def k(*parts: bytes) -> bytes:
    return keccak256(b"".join(parts))


def w(x: int) -> bytes:
    return x.to_bytes(32, "big")


def addr_bytes(a: str) -> bytes:
    return bytes.fromhex(a[2:] if a.startswith("0x") else a)


# ---------------------------------------------------------------------------
# Layer 1: Configurator.rootDigest — EIP-712 with a name+version-only domain.
# ---------------------------------------------------------------------------

DOMAIN_TYPE_HASH = k(b"EIP712Domain(string name,string version)")
DOMAIN_NAME_HASH = k(b"TrailsPdasConfigurator")
DOMAIN_VERSION_HASH = k(b"1")
ROOT_TYPE_HASH = k(b"ConfigRoot(bytes32 root)")


def root_digest(root: bytes) -> bytes:
    domain_separator = k(DOMAIN_TYPE_HASH + DOMAIN_NAME_HASH + DOMAIN_VERSION_HASH)
    struct_hash = k(ROOT_TYPE_HASH + root)
    return k(b"\x19\x01" + domain_separator + struct_hash)


# ---------------------------------------------------------------------------
# Layer 2: the Sequence v3 opHash. BaseAuth.isValidSignature wraps the bytes32 it
# is given in Payload.fromDigest (KIND_DIGEST) and re-hashes it under the WALLET's own
# EIP-712 domain. The signature must therefore be over this opHash, NOT over rootDigest.
#   toEIP712(KIND_DIGEST) = keccak(abi.encode(MESSAGE_TYPEHASH, digest, keccak(packed wallets)))
#   opHash = keccak("\x19\x01" ++ domainSeparator(noChainId, wallet) ++ structHash)
# ---------------------------------------------------------------------------

SEQ_DOMAIN_TYPEHASH = k(
    b"EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
)
SEQ_NAME_HASH = k(b"Sequence Wallet")
SEQ_VERSION_HASH = k(b"3")
MESSAGE_TYPEHASH = k(b"Message(bytes message,address[] wallets)")


def sequence_op_hash(digest: bytes, wallet: str, chain_id: int) -> bytes:
    domain = k(
        SEQ_DOMAIN_TYPEHASH
        + SEQ_NAME_HASH
        + SEQ_VERSION_HASH
        + w(chain_id)
        + w(int(wallet, 16))
    )
    wallets_hash = k(b"")  # empty parentWallets array, abi.encodePacked
    struct_hash = k(MESSAGE_TYPEHASH + digest + wallets_hash)
    return k(b"\x19\x01" + domain + struct_hash)


# ---------------------------------------------------------------------------
# Layer 3: the BaseSig config-tree encoding.
# ---------------------------------------------------------------------------


# ---------------------------------------------------------------------------
# secp256k1 ECDSA with RFC-6979 deterministic nonces, standard library only, so the key is
# signed with in-process rather than handed to another program on a command line.
# ---------------------------------------------------------------------------

_P = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
_N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
_GX = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
_GY = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8
_G = (_GX, _GY)


def _point_add(p, q):
    if p is None:
        return q
    if q is None:
        return p
    (x1, y1), (x2, y2) = p, q
    if x1 == x2 and (y1 + y2) % _P == 0:
        return None
    if p == q:
        lam = (3 * x1 * x1 * pow(2 * y1, _P - 2, _P)) % _P
    else:
        lam = ((y2 - y1) * pow(x2 - x1, _P - 2, _P)) % _P
    x3 = (lam * lam - x1 - x2) % _P
    return (x3, (lam * (x1 - x3) - y1) % _P)


def _point_mul(scalar: int, point):
    result = None
    while scalar:
        if scalar & 1:
            result = _point_add(result, point)
        point = _point_add(point, point)
        scalar >>= 1
    return result


def _rfc6979_nonce(msg32: bytes, priv: int) -> int:
    x = priv.to_bytes(32, "big")
    v = b"\x01" * 32
    key = b"\x00" * 32
    for sep in (b"\x00", b"\x01"):
        key = hmac.new(key, v + sep + x + msg32, hashlib.sha256).digest()
        v = hmac.new(key, v, hashlib.sha256).digest()
    while True:
        v = hmac.new(key, v, hashlib.sha256).digest()
        candidate = int.from_bytes(v, "big")
        if 1 <= candidate < _N:
            return candidate
        key = hmac.new(key, v + b"\x00", hashlib.sha256).digest()
        v = hmac.new(key, v, hashlib.sha256).digest()


def sign_hash(msg32: bytes, priv: int) -> tuple[bytes, bytes]:
    """Sign a 32-byte hash. Returns (r, yParityAndS), s normalised low per EIP-2."""
    z = int.from_bytes(msg32, "big")
    while True:
        nonce = _rfc6979_nonce(msg32, priv)
        point = _point_mul(nonce, _G)
        r = point[0] % _N
        if r == 0:
            continue
        s = (pow(nonce, _N - 2, _N) * (z + r * priv)) % _N
        if s == 0:
            continue
        # ERC-2098 compact: yParity occupies the top bit of s. Flipping s to its low form
        # flips the parity with it.
        parity = (point[1] & 1) ^ (1 if s > _N // 2 else 0)
        if s > _N // 2:
            s = _N - s
        return r.to_bytes(32, "big"), (s | (parity << 255)).to_bytes(32, "big")


def load_private_key(key_env: str) -> int:
    raw = os.environ.get(key_env)
    if not raw:
        sys.exit(f"error: environment variable {key_env} is not set")
    raw = raw.strip()
    value = int(raw, 16)
    if not 1 <= value < _N:
        sys.exit(f"error: {key_env} is not a valid secp256k1 private key")
    return value


def signer_address(priv: int) -> str:
    point = _point_mul(priv, _G)
    uncompressed = point[0].to_bytes(32, "big") + point[1].to_bytes(32, "big")
    return "0x" + keccak256(uncompressed)[-20:].hex()


def eth_sign_hash(op_hash: bytes) -> bytes:
    """The hash an eth_sign / personal_sign wallet signs for a 32-byte message."""
    return k(b"\x19Ethereum Signed Message:\n32" + op_hash)


def encode_signature_tree(
    signers: list[str],
    threshold: int,
    checkpoint: int,
    chain_id: int,
    signatures: dict[str, tuple[str, bytes]],
) -> bytes:
    """Encode a Sequence v3 signature over a threshold-1-weight-each wallet configuration.

    `signatures` maps a lowercase signer address to (kind, 64-byte ERC-2098 compact signature),
    where kind is "hash" (signed the opHash directly) or "eth_sign" (signed its eth_sign
    wrapping). Signers absent from the map are emitted as address-only leaves, which keeps the
    recovered tree hashing to the imageHash without contributing weight.
    """
    branch = b""
    weight = 0
    for signer in signers:
        entry = signatures.get(signer.lower())
        if entry is None:
            # FLAG_ADDRESS (top nibble 1) + weight 1 -> 0x11, then the 20-byte address
            branch += b"\x11" + addr_bytes(signer)
            continue
        kind, compact = entry
        if len(compact) != 64:
            sys.exit(f"error: signature for {signer} is not 64 bytes")
        # FLAG_SIGNATURE_HASH (top nibble 0) or FLAG_SIGNATURE_ETH_SIGN (top nibble 7), weight 1,
        # then r ++ yParityAndS
        if kind == "hash":
            branch += b"\x01" + compact
        elif kind == "eth_sign":
            branch += b"\x71" + compact
        else:
            sys.exit(f"error: unknown signature kind {kind!r} for {signer}")
        weight += 1
    unknown = set(signatures) - {s.lower() for s in signers}
    if unknown:
        sys.exit(f"error: signatures from addresses outside the signer set: {sorted(unknown)}")
    if weight < threshold:
        sys.exit(f"error: {weight} signature(s) collected, threshold is {threshold}")

    # Signature flag byte:
    #   bits [1..0] signature type: 00 normal (chain-bound), 10 no-chain-id
    #   bits [4..2] checkpoint size in bytes
    #   bit  [5]    threshold size (0 = 1 byte)
    #   bit  [6]    checkpointer present
    #   bit  [7]    static signature
    cp = b"" if checkpoint == 0 else checkpoint.to_bytes((checkpoint.bit_length() + 7) // 8, "big")
    flag = (0x02 if chain_id == 0 else 0x00) | (len(cp) << 2)
    if threshold > 0xFF:
        flag |= 0x20
        th = threshold.to_bytes(2, "big")
    else:
        th = bytes([threshold])

    return bytes([flag]) + cp + th + branch


def build_signature(
    root: bytes,
    wallet: str,
    signers: list[str],
    threshold: int,
    checkpoint: int,
    chain_id: int,
    key_env: str,
) -> tuple[bytes, bytes, bytes]:
    """Sign the root with the key in `key_env` and encode a complete signature around it."""
    digest = root_digest(root)
    op_hash = sequence_op_hash(digest, wallet, chain_id)

    priv = load_private_key(key_env)
    me = signer_address(priv).lower()
    if me not in {s.lower() for s in signers}:
        sys.exit("error: the signing key is not in --signers")
    r, y_parity_and_s = sign_hash(op_hash, priv)

    sig = encode_signature_tree(signers, threshold, checkpoint, chain_id, {me: ("hash", r + y_parity_and_s)})
    return digest, op_hash, sig


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--root", required=True)
    p.add_argument("--wallet", required=True)
    p.add_argument("--signers", required=True, help="comma-separated, in imageHash fold order")
    p.add_argument("--threshold", type=int, default=1)
    p.add_argument("--checkpoint", type=int, default=0)
    p.add_argument("--chain-id", type=int, default=0, help="0 = no-chain-id (cross-chain)")
    p.add_argument("--key-env", default="PDA_WALLET_SIGNER_KEY")
    p.add_argument("--quiet", action="store_true", help="print only the signature")
    a = p.parse_args()

    root = bytes.fromhex(a.root[2:] if a.root.startswith("0x") else a.root)
    if len(root) != 32:
        sys.exit("error: --root must be 32 bytes")

    digest, op_hash, sig = build_signature(
        root,
        a.wallet,
        [s.strip() for s in a.signers.split(",") if s.strip()],
        a.threshold,
        a.checkpoint,
        a.chain_id,
        a.key_env,
    )

    if a.quiet:
        print("0x" + sig.hex())
    else:
        print("rootDigest  0x" + digest.hex())
        print("opHash      0x" + op_hash.hex())
        print("signature   0x" + sig.hex())


if __name__ == "__main__":
    main()
