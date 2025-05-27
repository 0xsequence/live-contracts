# Sequence Live Contracts

This repository keeps a running record of deployed Sequence contracts and contains scripts to redeploy them.

This can be used to deploy the Sequence stack on a new chain.

Our CI checks that all contracts are correctly deployed on [Sequence's supported chains](https://status.sequence.info).

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
yarn
```

Update the configuration variables.

```sh
cp config.sample.json config.json
# Then manually add your settings
```

### Deployment

Run the deployment script.

```sh
yarn deploy
```

To deploy on a single chain, run the deployment script with the network name as a parameter.

```sh
yarn deploy <network_name>
```

Note `<network_name>` can also be a regex to deploy to multiple related chains. e.g. `yarn deploy "polygon.*"`.

#### Gotcha: EIP-155

The deployment flow relies on pre-[EIP-155](https://eips.ethereum.org/EIPS/eip-155) transactions.
If your selected RPC node enforces EIP-155, deployments will fail.

#### Gotcha: Gas Costs

Deployments of the [Universal Deployer](https://gist.github.com/Agusx1211/de05dabf918d448d315aa018e2572031) and [Singleton Factory](https://eips.ethereum.org/EIPS/eip-2470) use a generated deployer address.
This address is funded with a fixed amount of ETH as per their EIP definition.

Some chains calculate gas differently and may require additional funds to be sent to the deployer address for deployment to continue.
This has been noticed in Optimistic roll up chains such as [Base](https://base.org).

The Universal Deployer and Singleton Factory contracts are deploying using a gas price of `100 gwei`. We unable to deploy to networks with a gas price higher than this.

### Checking Deployment

To check if the Sequence contracts have been deployed on a given network, run the deployment script connected to a wallet without any funds.
A successful run indicates the contracts are already deployer on the network, as the script will fail if a deployment is required.

## Development

Run a local chain with [Anvil](https://github.com/foundry-rs/foundry/tree/master/crates/anvil).

```sh
anvil
```

Configure your environment variables for your local chain settings.

### Adding a New Contract

To add a new contract, create a new contract factory in the `scripts/factories` directory.
Include the contract's ABI, bytecode and deployment source in the factory.

Add the contract name to the `ContractName` type in `scripts/types.ts`.

Update `scripts/deploy-contracts.ts` to:

- Deploy the contract using the factory
- Add the contract address to the `Output addresses` and this README
- Add contract source verification add the end of the script

**Make sure to include logging in each step!**

You can include configuration / initialization steps in the `scripts/deploy-contracts.ts` script if required.

Note: Using the `SingletonDeployer` is the preferred method for deploying contracts.

### Retrieve Source Code

If you have already deployed the contract with another script and want to migrate here, you can retrieve the source code from the Etherscan (or other compatible APIs).

Within `scripts/download-source-code.ts` replace the `addr` variable value with the address of the contract you want to retrieve, and the `etherscanApiUrl` and `etherscanApiKey` variables for the already verified source location.

Then run the following command:

```sh
yarn source
```

The source code will be downloaded to a file called `output.json`.

### Check Deployment

To check if a given contract address has been deployed all configured networks, run the check script with the expected deployment address.

```sh
yarn run check <contract_address>
```

## Addresses

The following is a list of contracts that are deployed by this script.

| Name                           | Address                                    |
| ------------------------------ | ------------------------------------------ |
| WalletFactoryV2                | 0xFaA5c0b14d1bED5C888Ca655B9a8A5911F78eF4A |
| MainModuleV2                   | 0xfBf8f1A5E00034762D928f46d438B947f5d4065d |
| MainModuleUpgradableV2         | 0x4222dcA3974E39A8b41c411FeDDE9b09Ae14b911 |
| GuestModuleV2                  | 0xfea230Ee243f88BC698dD8f1aE93F8301B6cdfaE |
| SequenceUtilsV2                | 0xdbbFa3cB3B087B64F4ef5E3D20Dda2488AA244e6 |
| TrustFactory                   | 0x4483FaA9dEEDd6D6FaCFee9c686f1E394A1280f9 |
| WalletProxyHook                | 0x1f56dbAD5e8319F0DE9a323E24A31b5077dEB1a4 |
| WalletFactoryV1                | 0xf9D09D634Fb818b05149329C1dcCFAeA53639d96 |
| MainModuleV1                   | 0xd01F11855bCcb95f88D7A48492F66410d4637313 |
| MainModuleUpgradableV1         | 0x7EFE6cE415956c5f80C6530cC6cc81b4808F6118 |
| GuestModuleV1                  | 0x02390F3E6E5FD1C6786CB78FD3027C117a9955A7 |
| SequenceUtilsV1                | 0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E |
| RequireFreshSignerLibV1        | 0xE6B9B21C077F382333220a072e4c44280b873907 |
| ProdGuardV2                    | 0x761f5e29944D79d76656323F106CF2efBF5F09e9 |
| DevGuardV2                     | 0x1d76D1D72EC65A9B933745bd0a87cAA0FAc75Af0 |
| ProdGuardV1                    | 0x596aF90CecdBF9A768886E771178fd5561dD27Ab |
| DevGuardV1                     | 0x2ca2380dA88528C6061ACb70aD5222fe455F25DF |
| DeveloperMultisig              | 0x007a47e6BF40C1e0ed5c01aE42fDC75879140bc4 |
| NiftyswapFactory20             | 0x9196b852437D9Ed92d95715dCbdA4533ffC479E0 |
| NiftyswapExchange20Wrapper     | 0x2c944F28965F9A2cd5E69bA7e7520CbbD928258a |
| SequenceMarketFactoryV2        | 0xBDC76d15eA28beB6AF2Cc69b4EFBb4Aa4FB77689 |
| SequenceMarketV2               | 0xfdb42A198a932C8D3B506Ffa5e855bC4b348a712 |
| SequenceMarketV1               | 0xB537a160472183f2150d42EB1c3DD6684A55f74c |
| BatchPayableHelper             | 0x6166c1952c54dEd6b070B4616797E61b6c48A117 |
| ERC20ItemsFactory              | 0x1063cBEe6b3Cd69B49f1B922A0D402f484b39855 |
| ERC721ItemsFactory             | 0x29BCF1043Ca4B2c95aB28082143587896D39D22D |
| ERC1155ItemsFactory            | 0x7364fDEFe24385B2b3869504383c94cF083AcbD6 |
| ERC721SaleFactory              | 0xc412172a99e657609f5f7D4b9Bea37684B8eEE4E |
| ERC1155SaleFactory             | 0x52A6E7236A01B72eeb262d58F7270cb9AeD8Db4B |
| ERC721SoulboundFactory         | 0x2fBFF6fd3C978ab1bBd21b878262c5289a14b6c1 |
| ERC1155SoulboundFactory        | 0xaB069C041FaCAB8f4D747D91EEda5705b5caAB76 |
| ERC1155PackFactory             | 0x305197A57961CB16Df8D7F829Baf6aaF4bfD0d48 |
| ERC721OperatorEnforcedFactory  | 0x5fD880b092bD285873b16335a454D11c062a4689 |
| ERC1155OperatorEnforcedFactory | 0xc89f63389ef3B53D07649D52D47F9E4afcAbb1fB |
| Clawback                       | 0x6F9a2c3E11011b894fae691d5338748f8048467d |
| ClawbackMetadata               | 0x335411eAA9D63251f8c0867600Be4d0C190a3b1f |
| PaymentCombiner                | 0xfe0a269E288051B0815E05Fe192FC888118CB8a2 |
| PaymentsFactory                | 0xdC8dC7d7F0AAfbc5901DA779Ed5aab779F3E7c14 |
| SequencePaymentsSigner-dev     | 0x498399DD85CAa29A42Af499f82b271f1629ba0D7 |
| SequencePayments-dev           | 0xDE280948Af8A9762B6984995C8c3c7F5AEB921Bf |
| SequencePaymentsSigner-next    | 0x51805F2d8719a833C28EAc68aE881B2Eb70c0330 |
| SequencePayments-next          | 0x7AaC049C94E60a71E1aeDA4E1390F6812685eA4f |
| SequencePaymentsSigner-prod    | 0x9061a36CDBD17fFe8115aD34c85F94b624f0Dc0F |
| SequencePayments-prod          | 0x5afd8f6a09FfaD13c914b5977aF48b244279BFc7 |

> [!NOTE] > `ERC721OperatorEnforcedFactory`, `ERC1155OperatorEnforcedFactory` and `WalletProxyHook` are only deployed to Immutable's chains.

## Chains

For a full list of supported chains, see the [Sequence Status Dashboard](https://status.sequence.info/).
