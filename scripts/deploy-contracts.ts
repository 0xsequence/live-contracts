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
import { deployers, verifiers } from '@0xsequence/solidity-deployer'
import { GUEST_MODULE_V1_VERIFICATION } from './factories/v1/GuestModuleV1'
import { MAIN_MODULE_V1_VERIFICATION } from './factories/v1/MainModuleV1'
import { MAIN_MODULE_UPGRADABLE_V1_VERIFICATION } from './factories/v1/MainModuleUpgradableV1'
import { FACTORY_V1_VERIFICATION } from './factories/v1/FactoryV1'
import { SEQUENCE_UTILS_V1_VERIFICATION } from './factories/v1/SequenceUtilsV1'
import { REQUIRE_FRESH_SIGNER_V1_VERIFICATION } from './factories/v1/RequireFreshSignerV1'
import { FACTORY_V2_VERIFICATION } from './factories/v2/FactoryV2'
import { MAIN_MODULE_V2_VERIFICATION } from './factories/v2/MainModuleV2'
import { MAIN_MODULE_UPGRADABLE_V2_VERIFICATION } from './factories/v2/MainModuleUpgradableV2'
import { GUEST_MODULE_V2_VERIFICATION } from './factories/v2/GuestModuleV2'
import { SEQUENCE_UTILS_V2_VERIFICATION } from './factories/v2/SequenceUtilsV2'

dotenvConfig()

const { RPC_URL, DEPLOYER_PRIVATE_KEY, NETWORK_NAME, VERIFIER_API_URL, VERIFIER_API_KEY } = process.env

export const deployContracts = async (rpcUrl: string, deployerPK: string, networkName?: string): Promise<void> => {
  const prompt = ora()

  const provider = new JsonRpcProvider(rpcUrl)
  const signer = new ethers.Wallet(deployerPK, provider)
  provider.getSigner = () => signer as unknown as ethers.providers.JsonRpcSigner

  prompt.info(`Network Name:           ${networkName}`)
  prompt.info(`Local Deployer Address: ${await signer.getAddress()}`)
  prompt.info(`Local Deployer Balance: ${await signer.getBalance()}`)

  // v1

  prompt.start(`Deploying V1 contracts`)

  const txParams = {
    // gasLimit: BigNumber.from(7500000),
    gasLimit: await provider.getBlock('latest').then(b => b.gasLimit.mul(4).div(10))
    // gasPrice: BigNumber.from(10).pow(8).mul(16)
  }

  const universalDeployer = new deployers.UniversalDeployer(signer, console)

  const walletFactoryV1 = await universalDeployer.deploy('WalletFactory', FactoryV1, 0, txParams)
  const mainModuleV1 = await universalDeployer.deploy('MainModule', MainModuleV1, 0, txParams, walletFactoryV1.address)
  const mainModuleUpgradeableV1 = await universalDeployer.deploy('MainModuleUpgradable', MainModuleUpgradableV1, 0, txParams)
  const guestModuleV1 = await universalDeployer.deploy('GuestModule', GuestModuleV1, 0, txParams)
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

  prompt.succeed(`Deployed V1 contracts`)

  // v2

  prompt.start(`Deploying V2 contracts`)

  const singletonDeployer = new deployers.SingletonDeployer(signer, console) //, undefined, BigNumber.from('30000000000000000'))

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

  prompt.succeed(`Deployed V2 contracts`)

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

  // Verify contracts

  if (!VERIFIER_API_KEY || !VERIFIER_API_URL) {
    prompt.warn('Skipping contract verification.')
    // Exit early
    return
  }

  const verifier = new verifiers.EtherscanVerifier(VERIFIER_API_KEY, VERIFIER_API_URL, console)
  const waitForSuccess = true // One at a time

  const { defaultAbiCoder } = ethers.utils

  // v1

  prompt.start('Verifying V1 contracts')

  await verifier.verifyContract(walletFactoryV1.address, { ...FACTORY_V1_VERIFICATION, waitForSuccess })
  await verifier.verifyContract(mainModuleV1.address, {
    ...MAIN_MODULE_V1_VERIFICATION,
    constructorArgs: defaultAbiCoder.encode(['address'], [walletFactoryV1.address]),
    waitForSuccess
  })
  await verifier.verifyContract(mainModuleUpgradeableV1.address, { ...MAIN_MODULE_UPGRADABLE_V1_VERIFICATION, waitForSuccess })
  await verifier.verifyContract(guestModuleV1.address, { ...GUEST_MODULE_V1_VERIFICATION, waitForSuccess })
  await verifier.verifyContract(sequenceUtilsV1.address, {
    ...SEQUENCE_UTILS_V1_VERIFICATION,
    constructorArgs: defaultAbiCoder.encode(['address', 'address'], [walletFactoryV1.address, mainModuleV1.address]),
    waitForSuccess
  })
  await verifier.verifyContract(requireFreshSignerLibV1.address, {
    ...REQUIRE_FRESH_SIGNER_V1_VERIFICATION,
    constructorArgs: defaultAbiCoder.encode(['address'], [sequenceUtilsV1.address]),
    waitForSuccess
  })

  prompt.succeed('Verified V1 contracts')

  // v2

  prompt.start('Verifying V2 contracts')

  await verifier.verifyContract(walletFactoryV2.address, { ...FACTORY_V2_VERIFICATION, waitForSuccess })
  await verifier.verifyContract(mainModuleUpgradeableV2.address, { ...MAIN_MODULE_UPGRADABLE_V2_VERIFICATION, waitForSuccess })
  await verifier.verifyContract(mainModuleV2.address, {
    ...MAIN_MODULE_V2_VERIFICATION,
    constructorArgs: defaultAbiCoder.encode(['address', 'address'], [walletFactoryV2.address, mainModuleUpgradeableV2.address]),
    waitForSuccess
  })
  await verifier.verifyContract(guestModuleV2.address, { ...GUEST_MODULE_V2_VERIFICATION, waitForSuccess })
  await verifier.verifyContract(sequenceUtilsV2.address, {
    ...SEQUENCE_UTILS_V2_VERIFICATION,
    waitForSuccess
  })

  prompt.succeed('Verified V2 contracts')
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
