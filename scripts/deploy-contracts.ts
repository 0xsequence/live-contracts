import ora from 'ora'

import { JsonRpcProvider } from '@ethersproject/providers'
import { config as dotenvConfig } from 'dotenv'
import { ethers } from 'ethers'
import fs from 'fs'
import { deployGuard } from './factories/deployers/GuardDeployer'
import { deployWithSingletonFactory } from './factories/deployers/SingletonFactory'
import { deployWithUniversalDeployer } from './factories/deployers/UniversalDeployer'
import {
  FactoryV1,
  GuestModuleV1,
  MainModuleUpgradableV1,
  MainModuleV1,
  RequireFreshSignerV1,
  SequenceUtilsV1
} from './factories/v1'
import { FactoryV2, GuestModuleV2, MainModuleUpgradableV2, MainModuleV2, SequenceUtilsV2 } from './factories/v2'

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

  const guestModuleV1 = await deployWithUniversalDeployer(signer, 'GuestModule', GuestModuleV1)
  const mainModuleUpgradeableV1 = await deployWithUniversalDeployer(signer, 'MainModuleUpgradable', MainModuleUpgradableV1)
  const walletFactoryV1 = await deployWithUniversalDeployer(signer, 'WalletFactory', FactoryV1)
  const mainModuleV1 = await deployWithUniversalDeployer(signer, 'MainModule', MainModuleV1, walletFactoryV1.address)
  const sequenceUtilsV1 = await deployWithUniversalDeployer(
    signer,
    'SequenceUtils',
    SequenceUtilsV1,
    walletFactoryV1.address,
    mainModuleV1.address
  )
  const requireFreshSignerLibV1 = await deployWithUniversalDeployer(
    signer,
    'RequireFreshSignerLib',
    RequireFreshSignerV1,
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

  const walletFactoryV2 = await deployWithSingletonFactory(signer, 'Factory', FactoryV2)
  const mainModuleUpgradeableV2 = await deployWithSingletonFactory(signer, 'MainModuleUpgradable', MainModuleUpgradableV2)
  const mainModuleV2 = await deployWithSingletonFactory(
    signer,
    'MainModule',
    MainModuleV2,
    walletFactoryV2.address,
    mainModuleUpgradeableV2.address
  )
  const guestModuleV2 = await deployWithSingletonFactory(signer, 'GuestModule', GuestModuleV2)
  const sequenceUtilsV2 = await deployWithSingletonFactory(signer, 'SequenceUtils', SequenceUtilsV2)

  await deployGuard(
    walletFactoryV2,
    'Guard V2',
    '0x761f5e29944D79d76656323F106CF2efBF5F09e9',
    mainModuleV1.address,
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
