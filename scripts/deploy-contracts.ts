import ora, { Ora } from 'ora'

import { deployers, verifiers } from '@0xsequence/solidity-deployer'
import { JsonRpcProvider } from '@ethersproject/providers'
import { BigNumber, ethers } from 'ethers'
import { writeFile } from 'fs/promises'
import { argv } from 'process'
import { Config, getConfigs } from './config'
import { SEQUENCEMARKETFACTORY_VERIFICATION, SequenceMarketFactory, SequenceMarketInterface } from './factories/marketplace/SequenceMarketFactory'
import { ERC1155ITEMSFACTORY_VERIFICATION, ERC1155ItemsFactory } from './factories/token_library/ERC1155ItemsFactory'
import { ERC20ITEMSFACTORY_VERIFICATION, ERC20ItemsFactory } from './factories/token_library/ERC20ItemsFactory'
import { ERC721ITEMSFACTORY_VERIFICATION, ERC721ItemsFactory } from './factories/token_library/ERC721ItemsFactory'
import {
  TUBPROXY_VERIFICATION,
  TransparentUpgradeableBeaconProxy
} from './factories/token_library/TransparentUpgradeableBeaconProxy'
import { UPGRADEABLEBEACON_VERIFICATION, UpgradeableBeacon } from './factories/token_library/UpgradeableBeacon'
import {
  FactoryV1,
  GuestModuleV1,
  MainModuleUpgradableV1,
  MainModuleV1,
  RequireFreshSignerV1,
  SequenceUtilsV1
} from './factories/v1'
import { FACTORY_V1_VERIFICATION } from './factories/v1/FactoryV1'
import { GUEST_MODULE_V1_VERIFICATION } from './factories/v1/GuestModuleV1'
import { MAIN_MODULE_UPGRADABLE_V1_VERIFICATION } from './factories/v1/MainModuleUpgradableV1'
import { MAIN_MODULE_V1_VERIFICATION } from './factories/v1/MainModuleV1'
import { REQUIRE_FRESH_SIGNER_V1_VERIFICATION } from './factories/v1/RequireFreshSignerV1'
import { SEQUENCE_UTILS_V1_VERIFICATION } from './factories/v1/SequenceUtilsV1'
import { FactoryV2, GuestModuleV2, MainModuleUpgradableV2, MainModuleV2, SequenceUtilsV2, TrustFactory } from './factories/v2'
import { FACTORY_V2_VERIFICATION, WALLET_CREATION_CODE } from './factories/v2/FactoryV2'
import { GUEST_MODULE_V2_VERIFICATION } from './factories/v2/GuestModuleV2'
import { MAIN_MODULE_UPGRADABLE_V2_VERIFICATION } from './factories/v2/MainModuleUpgradableV2'
import { MAIN_MODULE_V2_VERIFICATION } from './factories/v2/MainModuleV2'
import { SEQUENCE_UTILS_V2_VERIFICATION } from './factories/v2/SequenceUtilsV2'
import { deployDeveloperMultisig } from './wallets/DeveloperMultisig'
import { deployGuard } from './wallets/Guard'
import {
  NIFTYSWAP_FACTORY_20_DEFAULT_ADMIN,
  NIFTYSWAP_FACTORY_20_VERIFICATION,
  NiftyswapFactory20
} from './factories/marketplace/NiftyswapFactory20'
import {
  NIFTYSWAP_EXCHANGE_20_WRAPPER_VERIFICATION,
  NiftyswapExchange20Wrapper
} from './factories/marketplace/NiftyswapExchange20Wrapper'
import { TRUST_FACTORY_VERIFICATION } from './factories/v2/commons/TrustFactory'
import { ERC721SALEFACTORY_VERIFICATION, ERC721SaleFactory } from './factories/token_library/ERC721SaleFactory'
import { ERC1155SALEFACTORY_VERIFICATION, ERC1155SaleFactory } from './factories/token_library/ERC1155SaleFactory'
import { MAIN_MODULE_UPGRADABLE_DUO_V2 } from './artifacts/SEQ0001/v2/MainModuleUpgradableDuo'
import { getArtifactFactory } from './utils'
import { MIGRATOR_TO_DUO_V2 } from './artifacts/SEQ0001/v2/MigratorToDuo'
import { MAIN_MODULE_UPGRADABLE_DUO_V1 } from './artifacts/SEQ0001/v1/MainModuleUpgradableDuo'
import { MIGRATOR_TO_DUO_V1 } from './artifacts/SEQ0001/v1/MigratorToDuo'

interface Logger {
  log(message: string): void
  error(message: string): void
}

export const deployContracts = async (config: Config): Promise<string | null> => {
  const prompt = ora() as Ora & Logger
  prompt.log = (message: string) => {
    // Log a message and keep spinner running
    const currentText = prompt.text
    prompt.info(message)
    prompt.start(currentText)
  }
  prompt.error = prompt.fail
  prompt.prefixText = config.networkName

  try {
    if (!config.guardPatchSecret) {
      throw new Error('Missing guard patch secret')
    }

    const provider = new JsonRpcProvider({
      url: config.rpcUrl,
      timeout: 60000 // 1 minute timeout
    })
    const signer = new ethers.Wallet(config.deployerPk, provider)
    provider.getSigner = () => signer as unknown as ethers.providers.JsonRpcSigner

    const txParams = {
      gasPrice: config.gasPrice ? BigNumber.from(config.gasPrice) : undefined, // Automated gas price
      // gasPrice: (await provider.getGasPrice()).mul(3).div(2), // 1.5x gas price
      gasLimit: config.gasLimit
        ? BigNumber.from(config.gasLimit)
        : await provider.getBlock('latest').then(b => b.gasLimit.mul(4).div(10))
      // gasPrice: BigNumber.from(10).pow(8).mul(16)
    }

    prompt.info(`Network Name:           ${config.networkName}`)
    prompt.info(`Chain Id: ${(await provider.getNetwork()).chainId}`)
    prompt.info(`Gas price (network): ${await provider.getGasPrice()}`)
    prompt.info(`Gas price (used): ${txParams.gasPrice ?? 'auto'}`)
    prompt.info(`Gas limit (used): ${txParams.gasLimit ?? 'auto'}`)
    prompt.info(`Local Deployer Address: ${await signer.getAddress()}`)
    prompt.info(`Local Deployer Balance: ${await signer.getBalance()}`)

    const universalDeployer = new deployers.UniversalDeployer(signer, prompt) //, undefined, BigNumber.from('35000000000000000'))
    const singletonDeployer = new deployers.SingletonDeployer(signer, prompt) //, undefined, BigNumber.from('30000000000000000'))

    let walletContextAddrs = {
      WalletFactoryV2: '0xFaA5c0b14d1bED5C888Ca655B9a8A5911F78eF4A',
      MainModuleV2: '0xfBf8f1A5E00034762D928f46d438B947f5d4065d',
      MainModuleUpgradableV2: '0x4222dcA3974E39A8b41c411FeDDE9b09Ae14b911',
      GuestModuleV2: '0xfea230Ee243f88BC698dD8f1aE93F8301B6cdfaE',
      SequenceUtilsV2: '0xdbbFa3cB3B087B64F4ef5E3D20Dda2488AA244e6',
      WalletFactoryV1: '0xf9D09D634Fb818b05149329C1dcCFAeA53639d96',
      MainModuleV1: '0xd01F11855bCcb95f88D7A48492F66410d4637313',
      MainModuleUpgradableV1: '0x7EFE6cE415956c5f80C6530cC6cc81b4808F6118',
      GuestModuleV1: '0x02390F3E6E5FD1C6786CB78FD3027C117a9955A7',
      SequenceUtilsV1: '0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E',
      RequireFreshSignerLibV1: '0xE6B9B21C077F382333220a072e4c44280b873907'
    }

    if (config.skipWalletContext) {
      prompt.log('Skipping wallet context deployment\n')
    } else {
      // v1

      prompt.start(`Deploying V1 contracts\n`)

      const walletFactoryV1 = await universalDeployer.deploy('WalletFactory', FactoryV1, 0, txParams)
      const mainModuleV1 = await universalDeployer.deploy('MainModule', MainModuleV1, 0, txParams, walletFactoryV1.address)
      const mainModuleUpgradableV1 = await universalDeployer.deploy('MainModuleUpgradable', MainModuleUpgradableV1, 0, txParams)
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

      // SEQ-0001 patch
      prompt.start("Deploying SEQ-0001 MainModuleUpgradableDuo v1\n")
      const mainModuleUpgradableDuoV1 = await universalDeployer.deploy('MainModuleUpgradableDuo', getArtifactFactory(MAIN_MODULE_UPGRADABLE_DUO_V1), 0, txParams)
      prompt.succeed("Deployed SEQ-0001 MainModuleUpgradableDuo v1: " + mainModuleUpgradableDuoV1.address + "\n")

      prompt.start("Deploying SEQ-0001 MainModuleUpgradableDuo v2\n")
      const mainModuleUpgradableDuoV2 = await singletonDeployer.deploy('MainModuleUpgradableDuo', getArtifactFactory(MAIN_MODULE_UPGRADABLE_DUO_V2), 0, txParams)
      prompt.succeed("Deployed SEQ-0001 MainModuleUpgradableDuo v2: " + mainModuleUpgradableDuoV2.address + "\n")

      prompt.start("Deploying migrator for SEQ-0001 v1\n")
      const migratorToDuoV1 = await universalDeployer.deploy(
        'MainModuleUpgradableDuoMigrator',
        getArtifactFactory(MIGRATOR_TO_DUO_V1),
        0,
        txParams,
        mainModuleUpgradableDuoV1.address,
        "0x596aF90CecdBF9A768886E771178fd5561dD27Ab",
        "0x5ca5d4cb6696df530c26b130a8fd86276a111f6696b3a8f2e76ff5edf94a2d84",
        "0xc99c1ab359199e4dcbd4603e9b2956d5681241ceb286359cf6a647ca56e6e128"
      )
      prompt.succeed("Deployed migrator for SEQ-0001 v1: " + migratorToDuoV1.address + "\n")

      prompt.start("Deploying migrator for SEQ-0001 v2\n")
      const migratorToDuoV2 = await singletonDeployer.deploy(
        'MainModuleUpgradableDuoMigrator',
        getArtifactFactory(MIGRATOR_TO_DUO_V2),
        0,
        txParams,
        mainModuleUpgradableDuoV2.address,
        "0x761f5e29944D79d76656323F106CF2efBF5F09e9",
        "0xacb659ac7f85fbbce197005235ced2d040c7b02942a9dfae647582393d5a4e83",
        "0x6e2f52838722eda7d569b52db277d0d87d36991a6aa9b9657ef9d8f09b0c33f4"
      )
      prompt.succeed("Deployed migrator for SEQ-0001 v2: " + migratorToDuoV2.address + "\n")

      // v1 prod

      await deployGuard(
        walletFactoryV1,
        'prod',
        1,
        '0x596aF90CecdBF9A768886E771178fd5561dD27Ab',
        mainModuleV1.address,
        '0xc99c1ab359199e4dcbd4603e9b2956d5681241ceb286359cf6a647ca56e6e128',
        config.guardPatchSecret,
        txParams
      )

      // v1 dev

      await deployGuard(
        walletFactoryV1,
        'dev',
        1,
        '0x2ca2380dA88528C6061ACb70aD5222fe455F25DF',
        mainModuleV1.address,
        '0x6af209e2a5cca04bfdb4839aba939f715b1840930508af89e7692b21ddecd9b6',
        config.guardPatchSecret,
        txParams
      )

      prompt.succeed(`Deployed V1 contracts\n`)

      // v2

      prompt.start(`Deploying V2 contracts\n`)

      const walletFactoryV2 = await singletonDeployer.deploy('Factory', FactoryV2, 0, txParams)
      const mainModuleUpgradableV2 = await singletonDeployer.deploy('MainModuleUpgradable', MainModuleUpgradableV2, 0, txParams)
      const mainModuleV2 = await singletonDeployer.deploy(
        'MainModule',
        MainModuleV2,
        0,
        txParams,
        walletFactoryV2.address,
        mainModuleUpgradableV2.address
      )
      const guestModuleV2 = await singletonDeployer.deploy('GuestModule', GuestModuleV2, 0, txParams)
      const sequenceUtilsV2 = await singletonDeployer.deploy('SequenceUtils', SequenceUtilsV2, 0, txParams)

      // v2 prod

      await deployGuard(
        walletFactoryV2,
        'prod',
        2,
        '0x761f5e29944D79d76656323F106CF2efBF5F09e9',
        mainModuleV2.address,
        '0x6e2f52838722eda7d569b52db277d0d87d36991a6aa9b9657ef9d8f09b0c33f4',
        config.guardPatchSecret,
        txParams
      )

      // v2 dev

      await deployGuard(
        walletFactoryV2,
        'dev',
        2,
        '0x1d76D1D72EC65A9B933745bd0a87cAA0FAc75Af0',
        mainModuleV2.address,
        '0x5106c13e87f7f4f67c44fee666525c1859ad193b997694fd294c53d7c2a465f6',
        config.guardPatchSecret,
        txParams
      )

      prompt.succeed(`Deployed V2 contracts\n`)

      walletContextAddrs = {
        WalletFactoryV2: walletFactoryV2.address,
        MainModuleV2: mainModuleV2.address,
        MainModuleUpgradableV2: mainModuleUpgradableV2.address,
        GuestModuleV2: guestModuleV2.address,
        SequenceUtilsV2: sequenceUtilsV2.address,
        WalletFactoryV1: walletFactoryV1.address,
        MainModuleV1: mainModuleV1.address,
        MainModuleUpgradableV1: mainModuleUpgradableV1.address,
        GuestModuleV1: guestModuleV1.address,
        SequenceUtilsV1: sequenceUtilsV1.address,
        RequireFreshSignerLibV1: requireFreshSignerLibV1.address
      }
    }

    prompt.start(`Deploying V2 commons contracts\n`)

    const trustFactory = await singletonDeployer.deploy('TrustFactory', TrustFactory, 0, txParams)

    prompt.succeed(`Deployed V2 commons contracts\n`)

    // Sequence development multisig

    prompt.start(`Deploying Sequence development multisig\n`)

    const v2WalletContext = {
      version: 2,
      factory: walletContextAddrs.WalletFactoryV2,
      mainModule: walletContextAddrs.MainModuleV2,
      mainModuleUpgradable: walletContextAddrs.MainModuleUpgradableV2,
      guestModule: walletContextAddrs.GuestModuleV2,
      sequenceUtils: walletContextAddrs.SequenceUtilsV2,
      walletCreationCode: WALLET_CREATION_CODE
    }
    const developerMultisig = await deployDeveloperMultisig(signer, v2WalletContext, txParams)
    prompt.succeed(`Deployed Sequence development multisig\n`)

    // Niftyswap and Market contracts

    prompt.start(`Deploying Market contracts\n`)
    const niftyFactory = await universalDeployer.deploy(
      'NiftyswapFactory20',
      NiftyswapFactory20,
      0,
      txParams,
      NIFTYSWAP_FACTORY_20_DEFAULT_ADMIN
    ) // Use Universal deployer for consistency
    const niftyWrapper = await singletonDeployer.deploy('NiftyExchange20Wrapper', NiftyswapExchange20Wrapper, 0, txParams)
    const marketFactory = await singletonDeployer.deploy('SequenceMarketFactory', SequenceMarketFactory, 0, txParams)
    prompt.log(`Deploying SequenceMarket\n`)
    const salt = ethers.constants.HashZero
    const marketAddress = (await marketFactory.functions.predictAddress(salt, developerMultisig.address))[0]
    if (await signer.provider.getCode(marketAddress) === '0x') {
      const marketDeployTx = await marketFactory.functions.deploy(salt, developerMultisig.address, txParams)
      await marketDeployTx.wait()
    }
    prompt.log(`Market deployed at ${marketAddress}\n`)
    prompt.succeed(`Deployed Market contracts\n`)

    // Contracts library

    prompt.start(`Deploying Library contracts\n`)
    const erc20ItemsFactory = await singletonDeployer.deploy(
      'ERC20ItemsFactory',
      ERC20ItemsFactory,
      0,
      txParams,
      developerMultisig.address
    )
    const erc721ItemsFactory = await singletonDeployer.deploy(
      'ERC721ItemsFactory',
      ERC721ItemsFactory,
      0,
      txParams,
      developerMultisig.address
    )
    const erc1155ItemsFactory = await singletonDeployer.deploy(
      'ERC1155ItemsFactory',
      ERC1155ItemsFactory,
      0,
      txParams,
      developerMultisig.address
    )
    const erc721SaleFactory = await singletonDeployer.deploy(
      'ERC721SaleFactory',
      ERC721SaleFactory,
      0,
      txParams,
      developerMultisig.address
    )
    const erc1155SaleFactory = await singletonDeployer.deploy(
      'ERC1155SaleFactory',
      ERC1155SaleFactory,
      0,
      txParams,
      developerMultisig.address
    )
    prompt.succeed(`Deployed Library contracts\n`)

    // Output addresses

    prompt.start(`Writing deployment information to output_${config.networkName}.json\n`)
    await writeFile(
      `./output_${config.networkName}.json`,
      JSON.stringify(
        [
          { name: 'WalletFactoryV2', address: walletContextAddrs.WalletFactoryV2 },
          { name: 'MainModuleV2', address: walletContextAddrs.MainModuleV2 },
          { name: 'MainModuleUpgradableV2', address: walletContextAddrs.MainModuleUpgradableV2 },
          { name: 'GuestModuleV2', address: walletContextAddrs.GuestModuleV2 },
          { name: 'SequenceUtilsV2', address: walletContextAddrs.SequenceUtilsV2 },
          { name: 'TrustFactory', address: trustFactory.address },
          { name: 'WalletFactoryV1', address: walletContextAddrs.WalletFactoryV1 },
          { name: 'MainModuleV1', address: walletContextAddrs.MainModuleV1 },
          { name: 'MainModuleUpgradableV1', address: walletContextAddrs.MainModuleUpgradableV1 },
          { name: 'GuestModuleV1', address: walletContextAddrs.GuestModuleV1 },
          { name: 'SequenceUtilsV1', address: walletContextAddrs.SequenceUtilsV1 },
          { name: 'RequireFreshSignerLibV1', address: walletContextAddrs.RequireFreshSignerLibV1 },
          { name: 'ProdGuardV2', address: '0x761f5e29944D79d76656323F106CF2efBF5F09e9' },
          { name: 'DevGuardV2', address: '0x1d76D1D72EC65A9B933745bd0a87cAA0FAc75Af0' },
          { name: 'ProdGuardV1', address: '0x596aF90CecdBF9A768886E771178fd5561dD27Ab' },
          { name: 'DevGuardV1', address: '0x2ca2380dA88528C6061ACb70aD5222fe455F25DF' },
          { name: 'DeveloperMultisig', address: developerMultisig.address },
          { name: 'NiftyswapFactory20', address: niftyFactory.address },
          { name: 'NiftyExchange20Wrapper', address: niftyWrapper.address },
          { name: 'SequenceMarketFactory', address: marketFactory.address },
          { name: 'SequenceMarket', address: marketAddress },
          { name: 'ERC20ItemsFactory', address: erc20ItemsFactory.address },
          { name: 'ERC721ItemsFactory', address: erc721ItemsFactory.address },
          { name: 'ERC1155ItemsFactory', address: erc1155ItemsFactory.address },
          { name: 'ERC721SaleFactory', address: erc721SaleFactory.address },
          { name: 'ERC1155SaleFactory', address: erc1155SaleFactory.address },
        ],
        null,
        2
      )
    )
    prompt.succeed(`Wrote deployment information to output_${config.networkName}.json\n`)

    // Verify contracts

    if (!config.verifierApiUrl || !config.verifierApiKey) {
      prompt.warn('Skipping contract verification.\n')
      prompt.stop()
      // Exit early
      return null
    }

    const verifier = new verifiers.EtherscanVerifier(config.verifierApiKey, config.verifierApiUrl, prompt)
    const waitForSuccess = true // One at a time

    const { defaultAbiCoder } = ethers.utils

    if (config.skipWalletContext) {
      prompt.log('Skipping wallet context verification\n')
    } else {
      // v1

      prompt.start('Verifying V1 contracts\n')

      await verifier.verifyContract(walletContextAddrs.WalletFactoryV1, { ...FACTORY_V1_VERIFICATION, waitForSuccess })
      await verifier.verifyContract(walletContextAddrs.MainModuleV1, {
        ...MAIN_MODULE_V1_VERIFICATION,
        constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.WalletFactoryV1]),
        waitForSuccess
      })
      await verifier.verifyContract(walletContextAddrs.MainModuleUpgradableV1, {
        ...MAIN_MODULE_UPGRADABLE_V1_VERIFICATION,
        waitForSuccess
      })
      await verifier.verifyContract(walletContextAddrs.GuestModuleV1, { ...GUEST_MODULE_V1_VERIFICATION, waitForSuccess })
      await verifier.verifyContract(walletContextAddrs.SequenceUtilsV1, {
        ...SEQUENCE_UTILS_V1_VERIFICATION,
        constructorArgs: defaultAbiCoder.encode(
          ['address', 'address'],
          [walletContextAddrs.WalletFactoryV1, walletContextAddrs.MainModuleV1]
        ),
        waitForSuccess
      })
      await verifier.verifyContract(walletContextAddrs.RequireFreshSignerLibV1, {
        ...REQUIRE_FRESH_SIGNER_V1_VERIFICATION,
        constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.SequenceUtilsV1]),
        waitForSuccess
      })

      prompt.succeed('Verified V1 contracts\n')

      // v2

      prompt.start('Verifying V2 contracts\n')

      await verifier.verifyContract(walletContextAddrs.WalletFactoryV2, { ...FACTORY_V2_VERIFICATION, waitForSuccess })
      await verifier.verifyContract(walletContextAddrs.MainModuleUpgradableV2, {
        ...MAIN_MODULE_UPGRADABLE_V2_VERIFICATION,
        waitForSuccess
      })
      await verifier.verifyContract(walletContextAddrs.MainModuleV2, {
        ...MAIN_MODULE_V2_VERIFICATION,
        constructorArgs: defaultAbiCoder.encode(
          ['address', 'address'],
          [walletContextAddrs.WalletFactoryV2, walletContextAddrs.MainModuleUpgradableV2]
        ),
        waitForSuccess
      })
      await verifier.verifyContract(walletContextAddrs.GuestModuleV2, { ...GUEST_MODULE_V2_VERIFICATION, waitForSuccess })
      await verifier.verifyContract(walletContextAddrs.SequenceUtilsV2, {
        ...SEQUENCE_UTILS_V2_VERIFICATION,
        waitForSuccess
      })

      prompt.succeed('Verified V2 contracts\n')
    }

    // v2 commons

    prompt.start('Verifying V2 commons contracts\n')

    await verifier.verifyContract(trustFactory.address, { ...TRUST_FACTORY_VERIFICATION, waitForSuccess })

    prompt.succeed('Verified V2 commons contracts\n')

    // Niftyswap and Market

    prompt.start('Verifying Market contracts\n')
    await verifier.verifyContract(niftyFactory.address, {
      ...NIFTYSWAP_FACTORY_20_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [NIFTYSWAP_FACTORY_20_DEFAULT_ADMIN])
    })
    await verifier.verifyContract(niftyWrapper.address, { ...NIFTYSWAP_EXCHANGE_20_WRAPPER_VERIFICATION, waitForSuccess })
    await verifier.verifyContract(marketFactory.address, {
      ...SEQUENCEMARKETFACTORY_VERIFICATION,
      waitForSuccess
    })
    const marketImplementationAddress = await marketFactory.implementation()
    await verifier.verifyContract(marketImplementationAddress, {
      ...SEQUENCEMARKETFACTORY_VERIFICATION,
      contractToVerify: 'contracts/SequenceMarket.sol:SequenceMarket',
      waitForSuccess
    })
    await verifier.verifyContract(marketAddress, {
      ...SEQUENCEMARKETFACTORY_VERIFICATION,
      contractToVerify: 'lib/openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol:ERC1967Proxy',
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address', 'bytes'], [marketImplementationAddress, SequenceMarketInterface.encodeFunctionData('initialize', [developerMultisig.address])])
    })
    prompt.succeed('Verified Market contracts\n')

    // Library contracts

    prompt.start(`Verifying Library contracts\n`)
    // Factories
    await verifier.verifyContract(erc20ItemsFactory.address, {
      ...ERC20ITEMSFACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [developerMultisig.address])
    })
    await verifier.verifyContract(erc721ItemsFactory.address, {
      ...ERC721ITEMSFACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [developerMultisig.address])
    })
    await verifier.verifyContract(erc1155ItemsFactory.address, {
      ...ERC1155ITEMSFACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [developerMultisig.address])
    })
    await verifier.verifyContract(erc721SaleFactory.address, {
      ...ERC721SALEFACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [developerMultisig.address])
    })
    await verifier.verifyContract(erc1155SaleFactory.address, {
      ...ERC1155SALEFACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [developerMultisig.address])
    })
    // Also deploy the TUBProxy for verification purposes
    const tubProxy = await singletonDeployer.deploy(
      'TransparentUpgradeableBeaconProxy',
      TransparentUpgradeableBeaconProxy,
      0,
      txParams
    )
    // Token contracts deployed by the factories
    const beacon = new UpgradeableBeacon(signer)
    await verifier.verifyContract(await beacon.attach(await erc20ItemsFactory.beacon()).implementation(), {
      ...ERC20ITEMSFACTORY_VERIFICATION,
      contractToVerify: 'src/tokens/ERC20/presets/items/ERC20Items.sol:ERC20Items',
      waitForSuccess
    })
    await verifier.verifyContract(await beacon.attach(await erc721ItemsFactory.beacon()).implementation(), {
      ...ERC721ITEMSFACTORY_VERIFICATION,
      contractToVerify: 'src/tokens/ERC721/presets/items/ERC721Items.sol:ERC721Items',
      waitForSuccess
    })
    const erc1155ItemsBeacon = await erc1155ItemsFactory.beacon()
    const erc1155ItemsImplementation = await beacon.attach(erc1155ItemsBeacon).implementation()
    await verifier.verifyContract(erc1155ItemsImplementation, {
      ...ERC1155ITEMSFACTORY_VERIFICATION,
      contractToVerify: 'src/tokens/ERC1155/presets/items/ERC1155Items.sol:ERC1155Items',
      waitForSuccess
    })
    const erc721SaleImplementation = await beacon.attach(await erc721SaleFactory.beacon()).implementation()
    await verifier.verifyContract(erc721SaleImplementation, {
      ...ERC721SALEFACTORY_VERIFICATION,
      contractToVerify: 'src/tokens/ERC721/utility/sale/ERC721Sale.sol:ERC721Sale',
      waitForSuccess
    })
    const erc1155SaleImplementation = await beacon.attach(await erc1155SaleFactory.beacon()).implementation()
    await verifier.verifyContract(erc1155SaleImplementation, {
      ...ERC1155SALEFACTORY_VERIFICATION,
      contractToVerify: 'src/tokens/ERC1155/utility/sale/ERC1155Sale.sol:ERC1155Sale',
      waitForSuccess
    })
    // Proxies
    await verifier.verifyContract(erc1155ItemsBeacon, {
      ...UPGRADEABLEBEACON_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [erc1155ItemsImplementation])
    })
    await verifier.verifyContract(tubProxy.address, {
      ...TUBPROXY_VERIFICATION,
      waitForSuccess
    })

    prompt.succeed(`Verified Library contracts\n`)
  } catch (error: unknown) {
    prompt.fail(`Error deploying contracts on ${config.networkName}: ${error}`)
    return (error as Error).message
  }
  return null
}

const main = async () => {
  let configs = await getConfigs()

  if (argv.length > 2) {
    // Filter network
    const networkName = argv[2]
    console.log(`Deploying to ${networkName} only`)
    const networkRegex = new RegExp(`^${networkName}$`, 'i')
    configs = configs.filter(config => networkRegex.test(config.networkName))
  } else {
    configs = configs.filter(config => config.skip !== true)
    console.log(`Deploying to ${configs.length} networks`)
  }
  const deployments = configs.map(config => ({ network: config.networkName, deployment: deployContracts(config) }))
  await Promise.all(deployments.map(({ deployment }) => deployment))

  // List successful deployments
  for (const { network, deployment } of deployments) {
    const err = await deployment
    if (err === null) {
      console.log(`- [X] ${network}`)
    } else {
      console.error(`- [ ] ${network}: ${err.substring(0, 200)}`)
    }
  }
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
