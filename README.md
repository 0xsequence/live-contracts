# Sequence Live Contracts

This repository keeps a running record of deployed Sequence contracts and contains scripts to redeploy them.

This can be used to deploy the Sequence stack on a new chain.

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

#### Gotcha: EIP-155

The deployment flow relies on pre-[EIP-155](https://eips.ethereum.org/EIPS/eip-155) transactions.
If your selected RPC node enforces EIP-155, deployments will fail.

#### Gotcha: Gas Costs

Deployments of the [Universal Deployer](https://gist.github.com/Agusx1211/de05dabf918d448d315aa018e2572031) and [Singleton Factory](https://eips.ethereum.org/EIPS/eip-2470) use a generated deployer address.
This address is funded with a fixed amount of ETH as per their EIP definition.

Some chains calculate gas differently and may require additional funds to be sent to the deployer address for deployment to continue.
This has been noticed in Optimistic roll up chains such as [Base](https://base.org).

### Checking Deployment

To check if the Sequence contracts have been deployed on a given network, run the deployment script connected to a wallet without any funds.
A successful run indicates the contracts are already deployer on the network, as the script will fail if a deployment is required. 

## Development

After installing dependencies please install the git hooks.

```sh
yarn lint:init
```

Run a local chain with [Anvil](https://github.com/foundry-rs/foundry/blob/master/anvil/README.md).

```sh
anvil
```

Configure your environment variables for your local chain settings.

### Adding a New Contract

To add a new contract, create a new contract factory in the `scripts/factories` directory.
Include the contract's ABI, bytecode and deployment source in the factory.

Update `scripts/deploy-contracts.ts` to:

* Deploy the contract using the factory
* Add the contract address to the `Output addresses` and this README
* Add contract source verification add the end of the script

**Make sure to include logging in each step!**

You can include configuration / initialization steps in the `scripts/deploy-contracts.ts` script if required.

Note: Using the `SingletonDeployer` is the preferred method for deploying contracts.

### Retrieve Source Code

If you have already deployed the contract with another script and want to migrate here, you can retrieve the source code from the Etherscan (or other compatible APIs).

First, set the environment variables for `VERIFIER_API_URL` and `VERIFIER_API_KEY`.
Then within `scripts/download-source-code.ts` replace the `addr` variable value with the address of the contract you want to retrieve.

Then run the following command:

```sh
yarn source
```

The source code will be downloaded to a file called `output.json`.

## Addresses

The following is a list of contracts that are deployed by this script.

| Name                      | Address                                    |
|---------------------------|--------------------------------------------|
| WalletFactoryV2           | 0xFaA5c0b14d1bED5C888Ca655B9a8A5911F78eF4A |
| MainModuleV2              | 0xfBf8f1A5E00034762D928f46d438B947f5d4065d |
| MainModuleUpgradableV2    | 0x4222dcA3974E39A8b41c411FeDDE9b09Ae14b911 |
| GuestModuleV2             | 0xfea230Ee243f88BC698dD8f1aE93F8301B6cdfaE |
| SequenceUtilsV2           | 0xdbbFa3cB3B087B64F4ef5E3D20Dda2488AA244e6 |
| WalletFactoryV1           | 0xf9D09D634Fb818b05149329C1dcCFAeA53639d96 |
| MainModuleV1              | 0xd01F11855bCcb95f88D7A48492F66410d4637313 |
| MainModuleUpgradableV1    | 0x7EFE6cE415956c5f80C6530cC6cc81b4808F6118 |
| GuestModuleV1             | 0x02390F3E6E5FD1C6786CB78FD3027C117a9955A7 |
| SequenceUtilsV1           | 0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E |
| RequireFreshSignerLibV1   | 0xE6B9B21C077F382333220a072e4c44280b873907 |
| GuardV2                   | 0x761f5e29944D79d76656323F106CF2efBF5F09e9 |
| GuardV1                   | 0x596aF90CecdBF9A768886E771178fd5561dD27Ab |
| Orderbook                 | 0xfBd41B6C9A86ea01927DD9E26006d7EFc2e66630 |
| DeveloperMultisig         | 0x007a47e6BF40C1e0ed5c01aE42fDC75879140bc4 |
| ERC20ItemsFactory         | 0x393Bb1FE6f98e2b8ABc3deCE71E4ac24fEcb4a1A |
| ERC721ItemsFactory        | 0x3672aA765492c1506Eec865f4bb8c7a452dE6707 |
| ERC1155ItemsFactory       | 0x58D9aBCe49dA36171f0e6af72DA0F2bf9cc2d0cf |
