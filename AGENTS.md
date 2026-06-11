# Agent Instructions

## Start Here

This repository is `0xsequence/live-contracts`. It is not a Solidity source tree; it is a deployment ledger and Catapult project for deterministic Sequence contract deployments.

Before making changes, orient from the files in this repository: `README.md`, `KNOWN_ISSUES.md`, `package.json`, `.github/workflows/`, `networks.yaml`, `constants.yaml`, and nearby jobs under `jobs/`.

For non-trivial changes, inspect the current repo state and recent history first:

```sh
git status --short
git log --oneline -30
```

Do not add local compatibility hacks to keep nearby config compiling. Change the source of truth, let dependent assumptions fail loudly, and migrate the breakages explicitly.

## Repository Shape

- `package.json` exposes the main Catapult commands: `deploy`, `dry-run`, `download-build-info`, `gen-table`, and `update-readme`.
- `constants.yaml` contains shared constants such as zero address, salts, multisig, and ERC-4337 entrypoints.
- `constants/*.constants.yaml` stores large or special-purpose constants, such as chain-specific signed payloads.
- `networks.yaml` is the CI matrix source. `testnet: true` controls the testnet workflow, and `supports` controls verification targets.
- `jobs/` contains Catapult job YAML files. Most job folders also contain committed `build-info/` or `artifacts/` inputs.
- `jobs/**/templates/` contains local Catapult templates used by jobs, for example wallet deploy templates and Era predeploy support.
- `output/` is generated scratch output from local Catapult runs and is ignored by git. The README address table is generated from this directory.
- `scripts/update-table.sh` starts Anvil, cleans `output/`, deploys everything locally, runs `gen-table`, and replaces the table in `README.md`.
- `.github/workflows/validate-readme.yml` re-runs the local Anvil deployment and fails if the generated table differs from `README.md`.
- `.github/workflows/deploy-testnets.yml` deploys testnets on every branch push.
- `.github/workflows/deploy-mainnets.yml` deploys mainnets only on `main` pushes or manual dispatch.
- `KNOWN_ISSUES.md` records chain-specific deployment failures and intentional skips. Read it before adding or changing `skip_networks`.

## Catapult Jobs

Jobs are YAML files under `jobs/<area>/`. A typical job has:

```yaml
name: "job-name"
version: "1"
description: "What this deploys"
depends_on: ["other-job"]
skip_networks: [19011]
min_evm_version: "shanghai"
deprecated: true

actions:
  - name: "contract-key"
    template: "erc-2470"
    depends_on: ["previous-action"]
    arguments:
      salt: "{{salt-zero}}"
      creationCode: "{{Contract(./build-info/file.json:ContractName).creationCode}}"
    output: true

  - name: "verify-contract-key"
    type: "verify-contract"
    depends_on: ["contract-key"]
    arguments:
      address: "{{contract-key.address}}"
      contract: "{{Contract(./build-info/file.json:ContractName)}}"
    output: false
```

The top-level `name` is the stable job namespace used in output files and the README table. Action names become output keys such as `factory.address` or `stage-2-module.value`, so keep them stable and descriptive.

Use top-level `depends_on` for cross-job requirements. Use action-level `depends_on` when an action references another action output. Catapult automatically includes dependencies when running a targeted job.

Common templates and action types in this repo:

- `erc-2470`: deterministic CREATE2 deployment through the Singleton Factory.
- `sequence-universal-deployer-2`: legacy Sequence deterministic deployer for older wallet contracts.
- `arachnid-deterministic-deployment-proxy`: canonical deterministic proxy, currently used by `p256-verifier`.
- `static`: stores a read-only value, commonly a `call` result such as `STAGE_2_IMPLEMENTATION()`.
- `send-transaction`: sends encoded calldata, often for factory deployments or migration transactions.
- `verify-contract` or `template: "verify-contract"`: verifies with build-info metadata.

Use `output: true` only for values that should appear in generated outputs and the README table. Verification actions should use `output: false`. If an address is known from a factory call, use explicit output like `output: { address: "0x..." }` and pair it with a `contract-exists` skip condition.

Use `deprecated: true` for retained historical jobs that should not run unless explicitly targeted with `--run-deprecated`. Use `skip_networks` only for real chain incompatibilities, and document durable skips in `KNOWN_ISSUES.md`.

## Build Artifacts

Most Solidity sources live outside this repository. To add or update deployment inputs from a Foundry project, use the exact source commit intended for deployment, then build each deployable contract one at a time with build-info enabled.

Do not run a whole-project build such as `forge build --build-info` from the source repo root. That bundles too many unrelated contracts into the build-info, makes verification inputs noisy, and can hide which sources are actually required for the deployed bytecode.

```sh
forge clean
forge build --build-info path/to/Contract.sol
```

If you need several contracts, repeat the targeted build for each contract/source path and copy the resulting build-info separately. Using an isolated output path makes it easier to identify the file to commit:

```sh
rm -rf /tmp/live-contracts-build-info
forge build --build-info --build-info-path /tmp/live-contracts-build-info path/to/Contract.sol
```

Foundry writes build-info JSON under `out/build-info/` by default, or under the path passed to `--build-info-path`. Copy the relevant JSON into the appropriate `jobs/<area>/build-info/` path. Prefer a versioned subdirectory when a family has release candidates or repeated deployments, for example `jobs/sequence_v3/build-info/rc-5/`.

Reference build-info by relative path from the job file:

```yaml
creationCode: "{{Contract(./build-info/rc-5/stage1.json:Stage1Module).creationCode}}"
contract: "{{Contract(./build-info/rc-5/stage1.json:Stage1Module)}}"
```

For constructors, encode the same arguments in both the deploy action and the verify action:

```yaml
creationCode:
  type: "constructor-encode"
  arguments:
    creationCode: "{{Contract(./build-info/file.json:ContractName).creationCode}}"
    types: ["address"]
    values: ["{{developer-multisig-01}}"]
```

If the source was already deployed elsewhere, Catapult can fetch and rebuild source metadata from Etherscan:

```sh
pnpm -s run download-build-info --etherscan-api-key <key> --address <address> --network <chain-id> > jobs/<area>/build-info/<file>.json
```

Some older Solidity builds do not reconstruct deterministic build-info correctly. In those cases this repo may use `artifacts/*.json` instead. Do not silently swap between `build-info` and `artifacts`; verification and deterministic bytecode can change.

When a new release intentionally reuses an older contract address, reuse the exact older build-info/artifact and salt. Existing jobs such as Trails rc files do this deliberately and leave comments explaining why.

## README Table

The README address table must match a fresh local Anvil deployment. The CI validates it by:

1. Starting Anvil.
2. Running `pnpm run deploy --rpc-url http://localhost:8545 -vvv`.
3. Running `pnpm -s run gen-table > gen-table.txt`.
4. Extracting the table from `README.md`.
5. Running `diff -w gen-table.txt readme-table.txt`.

To regenerate the README the same way maintainers do, run:

```sh
pnpm -s run update-readme
```

That script starts Anvil, removes `output/`, deploys with the default Anvil private key, generates the table, and replaces the existing table in `README.md`. If port `8545` is already in use, stop that process first; the script expects Anvil at `http://localhost:8545`.

If you already have a fresh `output/` directory, you can inspect the generated table directly:

```sh
pnpm -s run gen-table ./output
```

Do not commit `output/`. Commit the job files, build-info/artifact inputs, constants/network changes, and the updated `README.md` table.

## Validation

For job or network changes, run:

```sh
pnpm run dry-run
```

For a targeted check:

```sh
pnpm run dry-run <job-name>
pnpm run deploy --rpc-url http://localhost:8545 <job-name>
```

Useful Catapult inspection commands:

```sh
pnpm exec catapult list jobs
pnpm exec catapult list networks --simple-chain-ids --only-testnets
pnpm exec catapult list networks --simple-chain-ids --only-non-testnets
```

Run `pnpm -s run update-readme` whenever a job output changes. If README validation fails in CI, regenerate the README with that command rather than editing the table by hand.

## CI Notes

The deploy workflows build their matrix from `networks.yaml`. Testnets run on every branch push; mainnets run only on `main` or manual dispatch.

Live deploy jobs use these secrets:

- `PRIVATE_KEY`
- `ETHERSCAN_API_KEY`
- `RPC_BUILDER_KEY`

Deploy jobs run Catapult with `--ignore-verify-errors`, so verification failures become warnings during live deploys. The dry-run job still validates project configuration with `RPC_BUILDER_KEY=test`.

The CI deployer address is `0x000000cCD1D384484d4f4AeE9CC47527Dc03e265`. It must be funded on any chain where a deployment is needed. If a deployment fails, check `KNOWN_ISSUES.md` before assuming the job definition is wrong; common causes include pre-EIP-155 transaction rejection, fixed 100 gwei deployer gas price limits, unsupported EVM versions/opcodes, bytecode size limits, unhealthy RPC nodes, and insufficient funds.
