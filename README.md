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

Update the environment variables.

```sh
cp .env.example .env
# Then manually add your settings
```

### Deployment

Run the deployment script.

```sh
yarn deploy
```

### Checking Deployment

To check if the Sequence contracts have been deployed on a given network, run the deployment script connected to a wallet without any funds.
A successful run indicates the contracts are already deployer on the network, as the script will fail if a deployment is required. 

## Development

After installing dependencies please install the git hooks.

```sh
yarn lint:init
```
