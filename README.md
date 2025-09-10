# Sequence Live Contracts

This repository keeps a running record of deployed Sequence contracts and contains the [catapult](https://github.com/0xsequence/catapult) jobs to deploy and verify them. This can be used to deploy the Sequence stack on a new chain.

The CI loads all networks defined in `networks.yaml` and generates a matrix of jobs; each job runs the deployment script for a given network. **Testnets** run automatically on each PR, while **Mainnets** only run when the code is merged into **main** (or are manually triggered by a collaborator).

The CI uses the address `0x000000cCD1D384484d4f4AeE9CC47527Dc03e265` to send the transactions. It must be funded on all networks; if this address does not have funds on one of the networks, that network will fail to perform any deployments. The CI also depends on Sequence nodes; their status can be found on [Sequence's supported chains](https://status.sequence.info).

[![Deploy CI](https://github.com/0xsequence/live-contracts/actions/workflows/deploy.yml/badge.svg)](https://github.com/0xsequence/live-contracts/actions/workflows/deploy.yml)

## Usage

### Set Up

Clone the repo.

```sh
git clone https://github.com/0xsequence/live-contracts.git
cd live-contracts
```

Install dependencies.

```sh
pnpm install
```

### Deployment

Run the deployment script.

```sh
pnpm run deploy
```

To deploy on a single chain, run the deployment script with the network name as a parameter.

```sh
pnpm run deploy --network <chain_id>
```

To deploy for a single job, run the deployment with the job name as a positional argument.

```sh
pnpm run deploy --network <chain_id> <job_name>
```

#### Gotcha: EIP-155

The deployment flow relies on pre-[EIP-155](https://eips.ethereum.org/EIPS/eip-155) transactions.
If your selected RPC node enforces EIP-155, deployments will fail.

#### Gotcha: Gas Costs

Deployments of the [Universal Deployer](https://gist.github.com/Agusx1211/de05dabf918d448d315aa018e2572031) and [Singleton Factory](https://eips.ethereum.org/EIPS/eip-2470) use a generated deployer address.
This address is funded with a fixed amount of ETH as per their EIP definition.

Some chains calculate gas differently and may require additional funds to be sent to the deployer address for deployment to continue.
This has been noticed in optimistic rollup chains such as [Base](https://base.org).

The Universal Deployer and Singleton Factory contracts are deployed using a gas price of `100 gwei`. We are unable to deploy to networks with a gas price higher than this.

### Checking Deployment

To check if the Sequence contracts have been deployed on a given network, run the deployment script connected to a wallet without any funds.
A successful run indicates that the contracts are already deployed on the network, as the script will fail if a deployment is required.

## Development

Run a local chain with [Anvil](https://github.com/foundry-rs/foundry/tree/master/crates/anvil).

```sh
anvil
```

Run the deploy script pointing it to the Anvil node:

```sh
pnpm run deploy --rpc-url http://localhost:8545/
```

### Adding a New Contract

#### 1. Obtain the build info

To add a new contract, build it while generating the `build-info` artifacts. This can be done in Foundry by passing the `--build-info` flag when building:

```sh
forge build --build-info
```

This will generate a new file under `out/build-info`; a single file is enough for all the contracts built in a given project.

#### 2. Add the build-info

In the `jobs` path in this repository, you can either use an existing path that fits the category of contract that you need to deploy, or you can create a new path. There, upload your `build-info` JSON file into the `build-info` subdirectory.

#### 3. Create a new job

Create a new job YAML file in the working directory, following this format:

```yaml
name: "your-job-name"
version: "1" # Only increase the version if the job itself changes, always start at 1
description: "a short description of what your job does"

# Jobs can depend on other jobs, and access their outputs
# depends_on: ["other-job"]

actions:
  - name: "name-of-your-task"
    template: "erc-2470" # sequence-universal-deployer-2 and nano-universal-deployer are also available
    arguments:
      salt: "{{salt-zero}}"
      # If the contract has no constructor arguments, just pass the creation code
      # creationCode: "{{Contract(./build-info/your-build-info.json:YourContractName).creationCode}}"
      creationCode:
        type: "constructor-encode"
        arguments:
          creationCode: "{{Contract(./build-info/your-build-info.json:YourContractName).creationCode}}"
          types: ["address"] # This is an example constructor
          values: ["{{developer-multisig-01}}"]
    output: true # If output is not set, catapult won't save the address of this deployment
```

#### 4. Verify the contracts

Contracts can be verified automatically on Etherscan and Sourcify. The same build-info file is used for this task.

```yaml
actions:
  # ...
  - name: "verify-your-contract"
    type: "verify-contract"
    # Must depend on the task that originally deploys the contract
    # or else it may not have access to the deployed contract address
    depends_on: ["name-of-your-task"]
    arguments:
      address: "{{name-of-your-task.address}}"
      contract: "{{Contract(./build-info/your-build-info.json:YourContractName)}}"
      constructorArguments: # Do not include `constructorArguments` if the contract has no constructor
        type: "constructor-encode"
        arguments:
          types: ["address"]
          values: ["{{developer-multisig-01}}"]
    output: false
```

### Retrieve Source Code

If you have already deployed the contract with another script and want to migrate here, you can retrieve the source code from Etherscan. This will automatically attempt to download the source code and re-compile it using the original compiler version, re-generating the build-info.

```sh
pnpm -s run download-build-info --etherscan-api-key <your-etherscan-api-key> --address <original-contract-address> --network <chain-id>
```

This command prints the build info, which can be piped into a build-info JSON file.

> NOTICE: Some old Solidity versions do not generate the correct deterministic build-info; reconstruct the `artifacts` in that case.

## Addresses

The following is a list of contracts that are deployed by this script.

```
┌─────────────────────┬───────────────────────────────────┬────────────────────────────────────────────┐
│ Job                 │ Name                              │ Address                                    │
├─────────────────────┼───────────────────────────────────┼────────────────────────────────────────────┤
│ clawback            │ Clawback                          │ 0x6F9a2c3E11011b894fae691d5338748f8048467d │
│ clawback            │ ClawbackMetadata                  │ 0x335411eAA9D63251f8c0867600Be4d0C190a3b1f │
│ developer-multisig  │ DeveloperMultisig                 │ 0x007a47e6BF40C1e0ed5c01aE42fDC75879140bc4 │
│ factories           │ Erc1155Factory                    │ 0x024b9949FeD1c8dd7154DE653456d64Aa1093384 │
│ factories           │ Erc1155PackFactory                │ 0x5B2f47ee798eee52cE184C9eC4d60873185836d8 │
│ factories           │ Erc1155SaleFactory                │ 0xFb89C8A7DF9A1e0299088C3fC46fd87D3FcbcDBd │
│ factories           │ Erc1155SoulboundFactory           │ 0xCCbB517AaCAb6680A2ad08ef5A593677dDE17284 │
│ factories           │ Erc20Factory                      │ 0x1063cBEe6b3Cd69B49f1B922A0D402f484b39855 │
│ factories           │ Erc721Factory                     │ 0xC6064FfBaDB0687Da29721C8EC02ACa71e735a3e │
│ factories           │ Erc721SaleFactory                 │ 0x2Ce46243FAb9d688CcC2B1F1B8D2c464e87A2076 │
│ factories           │ Erc721SoulboundFactory            │ 0x718476DcFf820113B30fE4196905c7720F3c8a4e │
│ guards-v1           │ DevGuardV1                        │ 0x2ca2380dA88528C6061ACb70aD5222fe455F25DF │
│ guards-v1           │ ProdGuardV1                       │ 0x596aF90CecdBF9A768886E771178fd5561dD27Ab │
│ guards-v2           │ DevGuardV2                        │ 0x1d76D1D72EC65A9B933745bd0a87cAA0FAc75Af0 │
│ guards-v2           │ ProdGuardV2                       │ 0x761f5e29944D79d76656323F106CF2efBF5F09e9 │
│ immutable-factories │ Erc1155OperatorEnforcedFactory    │ 0xc89f63389ef3B53D07649D52D47F9E4afcAbb1fB │
│ immutable-factories │ Erc712OperatorEnforcedFactory     │ 0x5fD880b092bD285873b16335a454D11c062a4689 │
│ implicit-registry   │ ImplicitRegistryDev               │ 0x652d9299715E22820222247E8b780144771404Fe │
│ implicit-registry   │ ImplicitRegistryNext              │ 0x5AF4A31EDA6598B6877184bfAb1578B9c1400b93 │
│ implicit-registry   │ ImplicitRegistryProd              │ 0x0D9Ff8C6c3C7E0f32bE6B2DbE1d8cF20BE3d13F4 │
│ marketplace-v1      │ MarketV1                          │ 0xB537a160472183f2150d42EB1c3DD6684A55f74c │
│ marketplace-v2      │ BatchPayableHelperV2              │ 0x6166c1952c54dEd6b070B4616797E61b6c48A117 │
│ marketplace-v2      │ MarketFactoryV2                   │ 0xBDC76d15eA28beB6AF2Cc69b4EFBb4Aa4FB77689 │
│ marketplace-v2      │ MarketV2                          │ 0xfdb42A198a932C8D3B506Ffa5e855bC4b348a712 │
│ niftyswap           │ Exchange20Wrapper                 │ 0x2c944F28965F9A2cd5E69bA7e7520CbbD928258a │
│ niftyswap           │ Factory20                         │ 0x9196b852437D9Ed92d95715dCbdA4533ffC479E0 │
│ payments            │ PaymentCombiner                   │ 0xfe0a269E288051B0815E05Fe192FC888118CB8a2 │
│ payments            │ PaymentSignerDev                  │ 0x498399DD85CAa29A42Af499f82b271f1629ba0D7 │
│ payments            │ PaymentSignerNext                 │ 0x51805F2d8719a833C28EAc68aE881B2Eb70c0330 │
│ payments            │ PaymentSignerProd                 │ 0x9061a36CDBD17fFe8115aD34c85F94b624f0Dc0F │
│ proxy-hook          │ WalletProxyHook                   │ 0x1f56dbAD5e8319F0DE9a323E24A31b5077dEB1a4 │
│ SEQ-0001            │ SequenceMainModuleUpgradableDuoV1 │ 0x94Fb1E5196B4eE5A1c9ad737a505CE12bAe7Ca85 │
│ SEQ-0001            │ SequenceMainModuleUpgradableDuoV2 │ 0x4f8ce847174b32cBe21b3887Be894e0DEBC28952 │
│ sequence_v3/beta_0  │ GuestV3                           │ 0x54d766e7C3544E5A1De2552b3A255280b91F4502 │
│ sequence_v3/beta_0  │ PasskeysV3                        │ 0x48D39130812Dc0F49C7E10Aa42503B5d76057f1a │
│ sequence_v3/beta_0  │ SequenceV3/beta0FactoryV3         │ 0xBd0F8abD58B4449B39C57Ac9D5C67433239aC447 │
│ sequence_v3/beta_0  │ Stage1V3                          │ 0x108aEa2e459299F99788cC9069759ce3472aC31B │
│ sequence_v3/beta_0  │ Stage2.valueV3                    │ 0xbB9B8E12A391751B997b0a3faa84bb5e2367f154 │
│ sequence_v3/beta_1  │ PasskeysV3                        │ 0x8f26281dB84C18aAeEa8a53F94c835393229d296 │
│ sequence_v3/beta_1  │ RecoveryV3                        │ 0xd98da48C4FF9c19742eA5856A277424557C863a6 │
│ sequence_v3/beta_1  │ SequenceV3/beta1FactoryV3         │ 0xe828630697817291140D6B7A42a2c3b7277bE45a │
│ sequence_v3/beta_1  │ SessionsV3                        │ 0x06aa3a8F781F2be39b888Ac8a639c754aEe9dA29 │
│ sequence_v3/beta_1  │ Stage1V3                          │ 0x2a4fB19F66F1427A5E363Bf1bB3be27b9A9ACC39 │
│ sequence_v3/beta_1  │ Stage2.valueV3                    │ 0xe1299E4456b267123F7Aba29B72C2164ff501BDa │
│ sequence_v3/beta_2  │ PasskeysV3                        │ 0x4491845806B757D67BE05BbD877Cab101B9bee5C │
│ sequence_v3/beta_2  │ RecoveryV3                        │ 0xdED857b9b5142832634129aFfc1D67cD106b927c │
│ sequence_v3/beta_2  │ SequenceV3/beta2FactoryV3         │ 0xFE14B91dE3c5Ca74c4D24608EBcD4B2848aA6010 │
│ sequence_v3/beta_2  │ SessionsV3                        │ 0x06aa3a8F781F2be39b888Ac8a639c754aEe9dA29 │
│ sequence_v3/beta_2  │ Stage1Module433707V3              │ 0x8Ae58FCc0Ee9b32994CA52c9854deb969DC8fa2A │
│ sequence_v3/beta_2  │ Stage1ModuleV3                    │ 0xC906F90A51705d57F3b924ca4563c0C5E138AaB6 │
│ sequence_v3/beta_2  │ Stage2Module.valueV3              │ 0x43C572027DC17277fd2561f25d16F351aDEa5eE6 │
│ sequence_v3/beta_2  │ Stage2Module433707.valueV3        │ 0x30f8e3AceAcDEac8a3F28935D87FD58DC5f71ad2 │
│ sequence_v3/beta_3  │ GuestV3                           │ 0x6aE2a1Bb476CF8C50ab09499b99Ec36056c53B6D │
│ sequence_v3/beta_3  │ SequenceV3/beta3FactoryV3         │ 0xBd0F8abD58B4449B39C57Ac9D5C67433239aC447 │
│ sequence_v3/beta_3  │ SessionsV3                        │ 0xDfB66323C6485eE10d81A0fa60BaEbbbA732Ba0a │
│ sequence_v3/beta_3  │ Stage1ModuleV3                    │ 0x53bA242E7C2501839DF2972c75075dc693176Cd0 │
│ sequence_v3/beta_3  │ Stage2Module.valueV3              │ 0xa29874c88b8Fd557e42219B04b0CeC693e1712f5 │
│ sequence_v3/beta_4  │ GuestV3                           │ 0xf3c7175460BeD3340A1c4dc700fD6C8Cd3F56250 │
│ sequence_v3/beta_4  │ PasskeysV3                        │ 0x4491845806B757D67BE05BbD877Cab101B9bee5C │
│ sequence_v3/beta_4  │ RecoveryV3                        │ 0xdED857b9b5142832634129aFfc1D67cD106b927c │
│ sequence_v3/beta_4  │ SequenceV3/beta4FactoryV3         │ 0xFE14B91dE3c5Ca74c4D24608EBcD4B2848aA6010 │
│ sequence_v3/beta_4  │ SessionsV3                        │ 0xEA73a50606683e708891481648E352F2868F075D │
│ sequence_v3/beta_4  │ Stage1Module433707V3              │ 0xA2a2fec0B4bFC40F3d0da3507c60F1814fc39003 │
│ sequence_v3/beta_4  │ Stage1ModuleV3                    │ 0xB5a06253D3b44F37972F4299dbF10f9358e0994e │
│ sequence_v3/beta_4  │ Stage2Module.valueV3              │ 0xe565eBe2E2bA8cB788447E66246e56Dc50CeA73c │
│ sequence_v3/beta_4  │ Stage2Module433707.valueV3        │ 0x19830fD49F752064080d334273Db04fa7EBa30F0 │
│ sequence-v1         │ GuestModuleV1                     │ 0x02390F3E6E5FD1C6786CB78FD3027C117a9955A7 │
│ sequence-v1         │ MainModuleUpgradeableV1           │ 0x7EFE6cE415956c5f80C6530cC6cc81b4808F6118 │
│ sequence-v1         │ MainModuleV1                      │ 0xd01F11855bCcb95f88D7A48492F66410d4637313 │
│ sequence-v1         │ RequireFreshSignerV1              │ 0xE6B9B21C077F382333220a072e4c44280b873907 │
│ sequence-v1         │ SequenceFactoryV1                 │ 0xf9D09D634Fb818b05149329C1dcCFAeA53639d96 │
│ sequence-v1         │ SequenceUtilsV1                   │ 0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E │
│ sequence-v2         │ GuestModuleV2                     │ 0xfea230Ee243f88BC698dD8f1aE93F8301B6cdfaE │
│ sequence-v2         │ MainModuleUpgradableV2            │ 0x4222dcA3974E39A8b41c411FeDDE9b09Ae14b911 │
│ sequence-v2         │ MainModuleV2                      │ 0xfBf8f1A5E00034762D928f46d438B947f5d4065d │
│ sequence-v2         │ SequenceFactoryV2                 │ 0xFaA5c0b14d1bED5C888Ca655B9a8A5911F78eF4A │
│ sequence-v2         │ SequenceUtilsV2                   │ 0xdbbFa3cB3B087B64F4ef5E3D20Dda2488AA244e6 │
│ value-forwarder     │ ValueForwarder                    │ 0xABAAd93EeE2a569cF0632f39B10A9f5D734777ca │
│ waas-trust-factory  │ TrustFactory                      │ 0x4483FaA9dEEDd6D6FaCFee9c686f1E394A1280f9 │
└─────────────────────┴───────────────────────────────────┴────────────────────────────────────────────┘
```

> `ERC721OperatorEnforcedFactory`, `ERC1155OperatorEnforcedFactory` and `WalletProxyHook` are only deployed on Immutable's chains.

> To obtain this table, run the deployment (without errors) and then run `pnpm -s run gen-table`.

## Chains

For a full list of supported chains, see the [Sequence Status Dashboard](https://status.sequence.info/).
