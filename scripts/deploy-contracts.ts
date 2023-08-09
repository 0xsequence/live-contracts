import ora from 'ora'

import { JsonRpcProvider } from '@ethersproject/providers'
import { config as dotenvConfig } from 'dotenv'
import { ethers } from 'ethers'
import fs from 'fs'
import { deployGuard } from './factories/deployers/GuardDeployer'
import {
  FactoryV1,
  GuestModuleV1,
  MainModuleUpgradableV1,
  MainModuleV1,
  RequireFreshSignerV1,
  SequenceUtilsV1
} from './factories/v1'
import { FactoryV2, GuestModuleV2, MainModuleUpgradableV2, MainModuleV2, SequenceUtilsV2 } from './factories/v2'
import { SingletonDeployer, UniversalDeployer } from '@0xsequence/solidity-deployer/dist/src/deployers'

dotenvConfig()

const { RPC_URL, DEPLOYER_PRIVATE_KEY, NETWORK_NAME } = process.env

export const deployContracts = async (rpcUrl: string, deployerPK: string, networkName?: string): Promise<void> => {
  const prompt = ora()

  const provider = new JsonRpcProvider(rpcUrl)
  const signer = new ethers.Wallet(deployerPK, provider)
  provider.getSigner = () => signer as unknown as ethers.providers.JsonRpcSigner

  prompt.info(`Network Name:           ${networkName}`)
  prompt.info(`Local Deployer Address: ${await signer.getAddress()}`)
  prompt.info(`Local Deployer Balance: ${await signer.getBalance()}`)

  // v1

  prompt.info(`Deploying V1 contracts`)
  
  const txParams = {
    // gasLimit: BigNumber.from(7500000),
    gasLimit: await provider.getBlock('latest').then(b => b.gasLimit.mul(4).div(10))
    // gasPrice: BigNumber.from(10).pow(8).mul(16)
  }

  const universalDeployer = new UniversalDeployer(signer, console)

  const guestModuleV1 = await universalDeployer.deploy('GuestModule', GuestModuleV1, 0, txParams)
  const mainModuleUpgradeableV1 = await universalDeployer.deploy('MainModuleUpgradable', MainModuleUpgradableV1, 0, txParams)
  const walletFactoryV1 = await universalDeployer.deploy('WalletFactory', FactoryV1, 0, txParams)
  const mainModuleV1 = await universalDeployer.deploy('MainModule', MainModuleV1, 0, txParams, walletFactoryV1.address)
  const sequenceUtilsV1 = await universalDeployer.deploy(
    'SequenceUtils',
    SequenceUtilsV1,
    0,
    txParams,
    walletFactoryV1.address,
    mainModuleV1.address
  )
  const requireFreshSignerLibV1 = await universalDeployer.deploy(
    'RequireFreshSignerLib',
    RequireFreshSignerV1,
    0,
    txParams,
    sequenceUtilsV1.address
  )

  await deployGuard(
    walletFactoryV1,
    'Guard V1',
    '0x596aF90CecdBF9A768886E771178fd5561dD27Ab',
    mainModuleV1.address,
    '0xc99c1ab359199e4dcbd4603e9b2956d5681241ceb286359cf6a647ca56e6e128'
  )

  // v2

  prompt.info(`Deploying V2 contracts`)

  const singletonDeployer = new SingletonDeployer(signer, console)

  const walletFactoryV2 = await singletonDeployer.deploy('Factory', FactoryV2, 0, txParams)
  const mainModuleUpgradeableV2 = await singletonDeployer.deploy('MainModuleUpgradable', MainModuleUpgradableV2, 0, txParams)
  const mainModuleV2 = await singletonDeployer.deploy(
    'MainModule',
    MainModuleV2,
    0,
    txParams,
    walletFactoryV2.address,
    mainModuleUpgradeableV2.address
  )
  const guestModuleV2 = await singletonDeployer.deploy('GuestModule', GuestModuleV2, 0, txParams)
  const sequenceUtilsV2 = await singletonDeployer.deploy('SequenceUtils', SequenceUtilsV2, 0, txParams)

  await deployGuard(
    walletFactoryV2,
    'Guard V2',
    '0x761f5e29944D79d76656323F106CF2efBF5F09e9',
    mainModuleV2.address,
    '0x6e2f52838722eda7d569b52db277d0d87d36991a6aa9b9657ef9d8f09b0c33f4'
  )

  // Output addresses

  prompt.start(`Writing deployment information to output_${networkName}.json`)
  fs.writeFileSync(
    `./output_${networkName}.json`,
    JSON.stringify(
      [
        { name: 'WalletFactoryV2', address: walletFactoryV2.address },
        { name: 'MainModuleV2', address: mainModuleV2.address },
        { name: 'MainModuleUpgradableV2', address: mainModuleUpgradeableV2.address },
        { name: 'GuestModuleV2', address: guestModuleV2.address },
        { name: 'SequenceUtilsV2', address: sequenceUtilsV2.address },
        { name: 'WalletFactoryV1', address: walletFactoryV1.address },
        { name: 'MainModuleV1', address: mainModuleV1.address },
        { name: 'MainModuleUpgradableV1', address: mainModuleUpgradeableV1.address },
        { name: 'GuestModuleV1', address: guestModuleV1.address },
        { name: 'SequenceUtilsV1', address: sequenceUtilsV1.address },
        { name: 'RequireFreshSignerLibV1', address: requireFreshSignerLibV1.address },
        { name: 'GuardV2', address: '0x761f5e29944D79d76656323F106CF2efBF5F09e9' },
        { name: 'GuardV1', address: '0x596aF90CecdBF9A768886E771178fd5561dD27Ab' }
      ],
      null,
      2
    )
  )
  prompt.succeed()
}

const main = async () => {
  if (!RPC_URL || !DEPLOYER_PRIVATE_KEY) throw new Error('Environment variables not defined')
  await deployContracts(RPC_URL, DEPLOYER_PRIVATE_KEY, NETWORK_NAME)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
