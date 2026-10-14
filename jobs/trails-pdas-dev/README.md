# Trails PDAs dev deployment

Catapult jobs for the Trails PDAs router, its adapters, and its signed swap oracle, in the
**dev** environment: the Sequence/Polygon dev stack, deployed on production chains. The owner
wallet and the oracle signer are throwaway keys. The production stack is `jobs/trails-pdas-prod/`
(see its README for what differs); both share the build-info and the scripts in
`jobs/trails-pdas/`, so the two stacks deploy identical bytecode and differ only by owner,
fee collector, oracle signer and rollouts.

Contracts are deployed deterministically through ERC-2470 with a zero salt, so every contract
whose constructor arguments are chain-invariant lands on the same address on every chain. Two
adapters take chain-specific arguments and therefore differ per chain by design:

| Contract | Per-chain argument | Source of truth |
|---|---|---|
| `WethAdapter` | wrapped native token | `constants/trails-pdas.constants.yaml`, mirrored from `0xsequence/trails-api` `lib/routes/weth/chains.go` |
| `UniswapV4Adapter` | v4 `PoolManager` | `constants/trails-pdas.constants.yaml`, mirrored from `Uniswap/docs` `content/protocols/v4/deployments.mdx` |

Neither is passed to the router constructor — doing so would make the router address differ per
chain too. Register them post-deploy with `addLocalAdapters`.

## Ownership

The adapters, the router and the oracle are owned by `trails-pdas-dev/configurator`, a `Configurator`
deployed by `configurator.yaml`. The Configurator's own owner is `trails-pdas-dev-owner`, a Sequence v3
wallet deployed by `jobs/wallets_and_safes/trails-pdas-dev-owner.yaml`. Both addresses are
counterfactual and identical on every chain, so contracts can take them as owner before they
exist; the wallet only needs code before its first signature is validated on that chain.

Administrative calls go through the Configurator rather than the CI deployer. The wallet signs one
merkle root covering a whole rollout, each leaf is one chain's atomic batch of calls, and any
relayer redeems a leaf with `updateConfig(root, leaf, proof, signature)`. The signed digest omits
`chainId` and `verifyingContract`, so one signature covers every chain; `leaf.chainId` does the
scoping and a per-chain `nonce` orders redemption. See `CONFIGURATOR.md` in the contracts repo.

Two consequences worth stating, both from the chain-agnostic digest:

- A root is accepted by every Configurator sharing this owner. Deployments that must not share
  authorization need distinct owners.
- ERC-1271 validity is chain-local, so the owner wallet must be deployed at the same address with
  the same signer set on every chain in a rollout, or its signature will not validate there.

Role administration is not on the router. It lives in a `TrailsPdasGovernor` satellite that the
router deploys from its own constructor — an EIP-170 measure, since the OpenZeppelin admin suite
costs ~3.4 KB of router runtime. `grantRole` and `beginDefaultAdminTransfer` are called on the
governor, which mirrors every change into the router's flat role storage so the hot-path
`onlyExecutor` check stays a plain storage read. `setSwapOracle` is still on the router. Since the
governor's address derives from the router's, it is stable across chains for the same reason the
router's is; read it with `router.governor()`.

## Reproducing everything

All commands run from the repository root. `cast` comes from Foundry.

### 0. Environment

```sh
set -a && . ./.env && set +a          # provides PDA_WALLET_SIGNER_KEY
export PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN=false   # repo-local pnpm/lefthook workaround
```

`PDA_WALLET_SIGNER_KEY` is a **test** key. Rotate the wallet configuration before production use.

```sh
cast wallet address --private-key "$PDA_WALLET_SIGNER_KEY"
# 0x44FE7566909FeDB819EDe3AAb086C14fE9eEc8cf
```

### 1. Build the contract build-info

Build one contract at a time, per the repo's `AGENTS.md` — a whole-project build bundles
unrelated sources into the build-info and muddies verification. The contracts repo pins
`solc_version` and `evm_version` in `evm/foundry.toml`, so no compiler flags are passed here; a
build from a commit predating that pin needs `--use solc:<version> --evm-version prague` instead.

```sh
cd <trails-pda-contract-repo>/evm

for c in FeeAdapter HyperlaneAdapter LayerZeroAdapter StargateAdapter \
         OVaultComposerAdapter OVaultStargateAdapter WethAdapter UniswapV4Adapter; do
  forge clean
  rm -rf /tmp/bi && forge build --build-info --build-info-path /tmp/bi "src/adapters/$c.sol"
  cp /tmp/bi/*.json "<live-contracts>/jobs/trails-pdas/build-info/pdas-1/$c.json"
done

# The Configurator and the oracle sit at the src/ root, not under src/adapters/.
for c in Configurator SignedSwapOracle; do
  forge clean
  rm -rf /tmp/bi && forge build --build-info --build-info-path /tmp/bi "src/$c.sol"
  cp /tmp/bi/*.json "<live-contracts>/jobs/trails-pdas/build-info/pdas-1/$c.json"
done

# The router lives outside src/ so that TronBox and the Shanghai profile never see it.
forge clean
rm -rf /tmp/bi && forge build --build-info --build-info-path /tmp/bi cancun/TrailsPdasEvm.sol
cp /tmp/bi/*.json "<live-contracts>/jobs/trails-pdas/build-info/pdas-1/trails-pdas-evm.json"
```

Each build must leave exactly one JSON in `/tmp/bi`; more than one means the glob copied the wrong
build-info. The `lib/openzeppelin-contracts` submodule must be initialised, since its sources are
embedded in the build-info and feed verification.

`jobs/trails-pdas/build-info/pdas-1/source.yaml` records the repo, commit, Docker image and build command behind
every JSON here. Update its `commit` whenever the build-info is rebuilt, then prove the committed
files reproduce:

```sh
pnpm exec catapult provenance verify 'trails-pdas-dev/*'
```

Check the router still fits EIP-170 — it has very little headroom:

```sh
forge build --sizes | grep -E '^\| (TrailsPdas|TrailsPdasEvm) '
```

### 2. Compute the owner wallet imageHash and address

`./image-hash.sh <signer> [<signer> ...]` builds a threshold-1 configuration over the given
signers (each weight 1) and prints the imageHash — used as the wallet's deploy salt — and the
counterfactual address.

```sh
./jobs/trails-pdas/image-hash.sh \
  0xe8db071f698aBA1d60babaE8e08F5cBc28782108 \
  0x44FE7566909FeDB819EDe3AAb086C14fE9eEc8cf
# imageHash       0x2020ea78d2c0eed21b2b8d4e5eab6d1043c7b8ebbb7c1a1547367dc6c9f6807a
# walletAddress   0xdA93C44A5f1F7dA9537f51c4F7260c6b4829571c
```

**Signer order matters** — the leaves are folded left to right, so reordering them yields a
different imageHash and a different address. Keep this order in step 4.

The imageHash goes into `jobs/wallets_and_safes/trails-pdas-dev-owner.yaml` as `salt`, and the address
into `constants.yaml` as `trails-pdas-dev-owner-address`.

### 3. Get the deployed addresses

Deploy against a local Anvil at the target chain id:

```sh
anvil --chain-id 1 --port 8546 &
export ANVIL_KEY=<anvil's first default account key, printed at anvil startup>
./node_modules/.bin/catapult run \
  --rpc-url http://localhost:8546 \
  --private-key "$ANVIL_KEY" \
  --ignore-verify-errors 'trails-pdas-dev/*'
```

Read the addresses out of `output/trails-pdas-dev/*.json`.

The router deploys its own `TrailsPdasGovernor` from its constructor, so the governor address is
not in the Catapult output; read it off the router:

```sh
cast call <router> 'governor()(address)' --rpc-url http://localhost:8546
```

Use a real chain id, not Anvil's default 31337: the per-chain `read-json` lookups key off
`Network().chainId`, so on 31337 the WETH and Uniswap v4 actions silently skip.

### 4. Sign a configuration rollout

Administrative calls — `grantRole` on the governor, `setSwapOracle` on the router,
`setDestination` on a bridge adapter — are owned by the Configurator, so they are delivered as a
signed rollout rather than as individual transactions. One rollout is one merkle root, one leaf
per chain, and one signature covering all of them.

Build each chain's leaf as `(chainId, configurator, nonce, calls[])`, where `configurator` is the
Configurator that redeems it and `nonce` is that chain's
`Configurator.nonce()` at redemption time. Batch everything a chain needs into that chain's single
leaf: a root is spent by the first leaf of it redeemed on a chain, so a root carries at most one
leaf per chain. Then sign the root:

```sh
W=0xdA93C44A5f1F7dA9537f51c4F7260c6b4829571c   # owner wallet
A=0xe8db071f698aBA1d60babaE8e08F5cBc28782108   # signer 1
B=0x44FE7566909FeDB819EDe3AAb086C14fE9eEc8cf   # signer 2 (the test key)

python3 ./jobs/trails-pdas/sign-root.py --root 0x<merkle root> --wallet $W --signers $A,$B
```

List **all** the wallet's signers, in imageHash order. The script emits the signing key as a
signature leaf and the others as address-only leaves; without them the recovered configuration
tree cannot hash to the imageHash and the wallet rejects the signature.

The signature is over a second-layer digest, not over `rootDigest` directly: a Sequence v3 wallet's
`isValidSignature` re-hashes the `bytes32` it is handed as a `Message(bytes message,address[]
wallets)` struct under its **own** EIP-712 domain. That domain always binds the wallet address, and
binds the chain id unless flag bit `0x02` is set. Always set it — a chain-bound signature works on
the chain it was tested against and fails silently everywhere else.

Two preconditions for a leaf to redeem on a chain:

- the owner wallet must be **deployed** there, with the same signer set. With no code, the
  Configurator takes the ECDSA branch and rejects.
- the Configurator's `nonce()` must equal the leaf's. A leaf whose calls cannot succeed blocks
  every later leaf on that chain; unblock it by signing a new root whose leaf holds the same nonce.

### 5. Redeem a rollout

`updateConfig` is permissionless — the signature and the proof are the authorization, so any
relayer can redeem a leaf and pay its gas:

```sh
cast send <configurator> \
  'updateConfig(bytes32,(uint256,address,uint256,(address,bytes)[]),bytes32[],bytes)' \
  <root> '(<chainId>,<configurator>,<nonce>,[(<target>,<calldata>)])' '[<proof...>]' <signature>
```

Calls in a leaf run in order and atomically, so a reverting call bubbles its revert data and
consumes nothing — fix the cause and redeem again.

### 6. Verify end to end

Run the deploy twice against a clean chain. The first pass deploys; the second must deploy nothing,
proving every contract is already at its deterministic address.

```sh
anvil --chain-id 1 --port 8546 &
K=$ANVIL_KEY   # anvil's first default account key, printed at anvil startup

for i in 1 2; do
  ./node_modules/.bin/catapult run --rpc-url http://localhost:8546 \
    --private-key $K --ignore-verify-errors 'trails-pdas-dev/*'
done
```

Then assert ownership landed where it should, reading effects rather than trusting exit status:

```sh
CFG=<configurator>
cast call $CFG 'owner()(address)'   --rpc-url http://localhost:8546   # the owner wallet
cast call $R   'defaultAdmin()(address)' --rpc-url http://localhost:8546   # the Configurator
cast call $G   'defaultAdmin()(address)' --rpc-url http://localhost:8546   # the Configurator
for a in <each bridge adapter>; do
  cast call $a 'owner()(address)' --rpc-url http://localhost:8546          # the Configurator
done
```

A rollout redeemed on top of that is idempotent through the nonce: replaying the same leaf reverts
once `nonce()` has advanced past it, and the root is marked consumed regardless.

### 7. Regenerate the README address table

```sh
pnpm -s run update-readme
```

CI (`validate-readme`) re-runs the local Anvil deployment and fails if the committed table
differs, so run this whenever any address changes.

## Notes

- Adapter order in the router constructor is part of its init code. Appending is safe; inserting
  or reordering changes the router address on every chain.
- `--ignore-verify-errors` is only for local runs, where Etherscan and Sourcify cannot see an
  Anvil chain. Verification retries against the live APIs are what make these runs slow.
- A rollout signature is replayable on every chain by anyone who sees it. That is the intent here;
  `leaf.chainId` and the per-chain nonce are what bound it. Do not reuse the pattern for anything
  value-bearing.
- The Configurator's address feeds every adapter, the router and the oracle, so changing its owner
  moves all of them. Rotating the owner wallet's signer set changes the wallet's imageHash, hence
  its address, hence the Configurator's — and invalidates every root the previous owner signed.
