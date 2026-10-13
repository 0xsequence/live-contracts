#!/usr/bin/env bash
# Computes the Sequence v3 imageHash and counterfactual address for a
# threshold-1 wallet over the given signers (each weight 1).
#
# Usage: ./image-hash.sh <signer> [<signer> ...]
#
# Leaf   = keccak256("Sequence signer:\n" ++ address ++ uint256(weight))
# Branch = keccak256(left, right), folded left-to-right
# Image  = keccak(keccak(keccak(root, threshold), checkpoint), checkpointer)
#          with checkpoint = 0 and checkpointer = address(0)
set -euo pipefail

FACTORY=${FACTORY:-0x00000000000018A77519fcCCa060c2537c9D6d3F}
MAIN_MODULE=${MAIN_MODULE:-0x0000000000001f3C39d61698ab21131a12134454}
PROXY_CREATION_CODE=0x6041600e3d396021805130553df33d3d36153402601f57363d3d373d363d30545af43d82803e903d91601f57fd5bf3

THRESHOLD_HEX=0000000000000000000000000000000000000000000000000000000000000001
WEIGHT_HEX=$THRESHOLD_HEX
ZERO_HEX=0000000000000000000000000000000000000000000000000000000000000000
SIGNER_PREFIX=$(printf 'Sequence signer:\n' | xxd -p | tr -d '\n')

root=""
for signer in "$@"; do
  leaf=$(cast keccak "0x${SIGNER_PREFIX}${signer#0x}${WEIGHT_HEX}")
  echo "leaf   $signer -> $leaf" >&2
  if [ -z "$root" ]; then
    root=$leaf
  else
    root=$(cast keccak "0x${root#0x}${leaf#0x}")
  fi
done
echo "root            $root" >&2

h=$(cast keccak "0x${root#0x}${THRESHOLD_HEX}")
h=$(cast keccak "0x${h#0x}${ZERO_HEX}")
IMAGE_HASH=$(cast keccak "0x${h#0x}${ZERO_HEX}")

INIT_CODE_ARG=$(cast abi-encode 'f(address)' "$MAIN_MODULE")
INIT_CODE="${PROXY_CREATION_CODE}${INIT_CODE_ARG#0x}"
INIT_CODE_HASH=$(cast keccak "$INIT_CODE")
CREATE2=$(cast keccak "0xff${FACTORY#0x}${IMAGE_HASH#0x}${INIT_CODE_HASH#0x}")
ADDRESS=$(cast to-check-sum-address "0x${CREATE2: -40}")

echo "imageHash       $IMAGE_HASH"
echo "walletAddress   $ADDRESS"
