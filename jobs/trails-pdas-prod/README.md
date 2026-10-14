# Trails PDAs production deployment

Catapult jobs for the Trails PDAs router, its adapters, and its signed swap oracle, in the
**production** environment. This directory is a copy of `jobs/trails-pdas-dev/` with the job and
constant names renamed `-dev` -> `-prod`: the same build-info (`jobs/trails-pdas/build-info/`), the
same adapter set and order, the same per-chain protocol constants, the same rollout mechanism.
Everything that is not listed below is documented in `../trails-pdas-dev/README.md` and applies
here verbatim with `trails-pdas-prod` in place of `trails-pdas-dev`.

What differs:

| | dev | prod |
|---|---|---|
| Owner wallet | `trails-pdas-dev-owner`, 1/2, throwaway signer | `trails-pdas-prod-owner`, M-of-N multisig |
| Fee collector | dev EOA | `trails-pdas-prod-fee-collector` in `evm.yaml` |
| Oracle signer | dev trails-api key | `trails-pdas-prod-oracle-signer` in `signed-swap-oracle.yaml` |
| Executor (rollout `grantRole`) | dev relayer | prod relayer, in `rollouts/*.spec.json` |
| Rollout signing | `sign-root.py` with a local key | exported packet, signed by the multisig signers out of band, assembled back |

Because the owner wallet is a constructor argument of the Configurator and the Configurator is a
constructor argument of everything else, every prod contract lands at a different address from its
dev counterpart. Nothing is shared on-chain between the two stacks, and a root signed for one
cannot redeem on the other.

## TODO before the first deploy

Every `0x0000000000000000000000000000000000000000` in this directory and in
`jobs/wallets_and_safes/trails-pdas-prod-owner.yaml` / `constants.yaml` is a placeholder marked
`TODO`. The Configurator and the oracle revert on a zero owner / zero signer, so the jobs cannot
deploy until these are set:

1. `jobs/wallets_and_safes/trails-pdas-prod-owner.yaml` — `salt` = imageHash of the production
   signer set; `constants.yaml` — `trails-pdas-prod-owner-address` = its counterfactual address.
2. `evm.yaml` — `trails-pdas-prod-fee-collector`.
3. `signed-swap-oracle.yaml` — `trails-pdas-prod-oracle-signer`.
4. `rollouts/0001-bootstrap.spec.json` — every prod contract address (Configurator, router,
   governor, oracle, CCTP / Stargate / Relay adapters, WETH / Uniswap local adapters) and the
   executor address, read from a local run (step 2 below). Token, pool, Stargate pool-id and Relay
   solver values are protocol data shared with dev and are already filled in.
5. `rollouts/0001-bootstrap.constants.yaml` — regenerated from the spec, then signed.

## 1. Owner wallet

A Sequence v3 wallet, M-of-N, each signer weight 1, checkpoint 0, no checkpointer. A Sequence
wallet rather than a Safe because the Configurator's one-root-for-every-chain design depends on the
owner's ERC-1271 check accepting a chain-agnostic signature; Sequence v3 does (flag bit `0x02`),
a Safe binds its domain to the chain id and would need one signing round per chain.

```sh
THRESHOLD=<m> ./jobs/trails-pdas/image-hash.sh <signer-1> <signer-2> ... <signer-n>
# threshold       m
# imageHash       0x...   -> salt in jobs/wallets_and_safes/trails-pdas-prod-owner.yaml
# walletAddress   0x...   -> trails-pdas-prod-owner-address in constants.yaml
```

Signer order is part of the imageHash. Record it in the wallet job's comment; `export` below
needs the same order.

The wallet must not share a signer set with `trails-pdas-dev-owner`: the Configurator digest omits
`chainId` and `verifyingContract`, so a shared owner would let a dev rollout redeem on prod.

## 2. Addresses

Same as dev, against the prod jobs:

```sh
anvil --chain-id 1 --port 8546 &
./node_modules/.bin/catapult run --rpc-url http://localhost:8546 \
  --private-key "$ANVIL_KEY" --ignore-verify-errors 'trails-pdas-prod/*'
cast call <router> 'governor()(address)' --rpc-url http://localhost:8546
```

Chain-specific adapters (CCTP, Relay, WETH, Uniswap v3/v4) differ per chain; derive the ones chain 1
does not deploy offline from the init code, as for dev. Fill the spec, then
`pnpm -s run update-readme`.

## 3. Rollout: build, export, sign, assemble

```sh
R=jobs/trails-pdas-prod/rollouts/0001-bootstrap
python3 jobs/trails-pdas/build-rollout.py build  $R.spec.json
python3 jobs/trails-pdas/build-rollout.py export $R.constants.yaml \
  --wallet <wallet> --signers <signer-1>,...,<signer-n> --threshold <m>
```

`export` writes `0001-bootstrap.signing.json`: the owner configuration, the root, `rootDigest`,
and `opHash` — the 32-byte digest each signer signs — plus every chain's calls in readable form so
reviewers can check what they are approving. Hand the packet to the signers. Each returns their
address, the kind of signature, and the 64-byte (ERC-2098) or 65-byte (r,s,v) signature:

- `hash`: signed `opHash` directly (`cast wallet sign --no-hash`, a raw-hash HSM signer).
- `eth_sign`: signed via `eth_sign` / `personal_sign` (Ledger, MetaMask, `cast wallet sign` with
  the default message prefix). The packet's `ethSignHash` is what that path hashes internally.

Collect at least `m` and assemble:

```sh
python3 jobs/trails-pdas/build-rollout.py assemble $R.signing.json \
  --signature <signer-1>:hash:0x... \
  --signature <signer-3>:eth_sign:0x...
```

`assemble` emits a signature leaf for each signer that signed and an address leaf for the rest,
refuses to proceed below the threshold, re-derives the root from the leaves, and writes the blob
into `0001-bootstrap.constants.yaml`. Commit the constants file and the signing packet; the
rollout job redeems one leaf per chain from the CI deployer, which needs no key of its own
because `updateConfig` is permissionless.

Verify the blob locally before committing, as for dev: deploy `trails-pdas-prod/*` on an Anvil
fork at chain id 1, deploy the owner wallet there, and run the rollout job; its leaf for chain 1
must redeem and `Configurator.nonce()` must read 1 afterwards.

## Rotating the owner

Rotating the signer set changes the wallet's imageHash, so its address, so the Configurator's, so
every contract in this directory. It is a full redeploy at new addresses, not an update.
