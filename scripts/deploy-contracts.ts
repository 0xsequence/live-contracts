import { Logger, deployers } from '@0xsequence/solidity-deployer'
import { BigNumber, ethers } from 'ethers'
import { writeFile } from 'node:fs/promises'
import { argv } from 'node:process'
import ora, { type Ora } from 'ora'
import { MAIN_MODULE_UPGRADABLE_DUO_V1 } from './artifacts/SEQ0001/v1/MainModuleUpgradableDuo'
import { MIGRATOR_TO_DUO_V1 } from './artifacts/SEQ0001/v1/MigratorToDuo'
import { MAIN_MODULE_UPGRADABLE_DUO_V2 } from './artifacts/SEQ0001/v2/MainModuleUpgradableDuo'
import { MIGRATOR_TO_DUO_V2 } from './artifacts/SEQ0001/v2/MigratorToDuo'
import { type Config, perConfig } from './config'
import { BatchPayableHelper } from './factories/marketplace/BatchPayableHelper'
import { NiftyswapExchange20Wrapper } from './factories/marketplace/NiftyswapExchange20Wrapper'
import { NIFTYSWAP_FACTORY_20_DEFAULT_ADMIN, NiftyswapFactory20 } from './factories/marketplace/NiftyswapFactory20'
import { SequenceMarketFactoryV2 } from './factories/marketplace/SequenceMarketFactoryV2'
import { SequenceMarketV1 } from './factories/marketplace/SequenceMarketV1'
import { Clawback } from './factories/token_library/Clawback'
import { ClawbackMetadata } from './factories/token_library/ClawbackMetadata'
import { ERC1155ItemsFactory } from './factories/token_library/ERC1155ItemsFactory'
import { ERC1155PackFactory } from './factories/token_library/ERC1155PackFactory'
import { ERC1155SaleFactory } from './factories/token_library/ERC1155SaleFactory'
import { ERC1155SoulboundFactory } from './factories/token_library/ERC1155SoulboundFactory'
import { ERC20ItemsFactory } from './factories/token_library/ERC20ItemsFactory'
import { ERC721ItemsFactory } from './factories/token_library/ERC721ItemsFactory'
import { ERC721SaleFactory } from './factories/token_library/ERC721SaleFactory'
import { ERC721SoulboundFactory } from './factories/token_library/ERC721SoulboundFactory'
import { ERC1155OperatorEnforcedFactory } from './factories/token_library/immutable/ERC1155OperatorEnforcedFactory'
import { ERC721OperatorEnforcedFactory } from './factories/token_library/immutable/ERC721OperatorEnforcedFactory'
import { PaymentCombiner } from './factories/token_library/PaymentCombiner'
import { PaymentsFactory } from './factories/token_library/PaymentsFactory'
import {
  FactoryV1,
  GuestModuleV1,
  MainModuleUpgradableV1,
  MainModuleV1,
  RequireFreshSignerV1,
  SequenceUtilsV1
} from './factories/v1'
import { FactoryV2, GuestModuleV2, MainModuleUpgradableV2, MainModuleV2, SequenceUtilsV2, TrustFactory } from './factories/v2'
import { WALLET_CREATION_CODE } from './factories/v2/FactoryV2'
import { WalletProxyHook } from './factories/v2/hooks/WalletProxyHook'
import type { ContractEntry, SequenceEnvironment } from './types'
import { getArtifactFactory } from './utils'
import { LoggingProvider } from './utils/LoggingProvider'
import { verifyContracts } from './verify-contracts'
import { deployDeveloperMultisig } from './wallets/DeveloperMultisig'
import { deployGuard } from './wallets/Guard'
import { deployPaymentsSigner } from './wallets/SequencePaymentsSigner'

const DEBUG = argv.includes('--debug')

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

  if (!config.guardPatchSecret) {
    prompt.warn('Missing patch secret, skipping guard migrations')
  }

  try {
    const provider = new LoggingProvider(DEBUG ? prompt : null, {
      url: config.rpcUrl,
      timeout: 60000 // 1 minute timeout
    })
    const signer = new ethers.Wallet(config.deployerPk, provider)
    provider.getSigner = () => signer as unknown as ethers.providers.JsonRpcSigner

    const txParams = {
      gasPrice: config.gasPrice ? BigNumber.from(config.gasPrice) : undefined, // Automated gas price
      // gasPrice: (await provider.getGasPrice()).mul(3).div(2), // 1.5x gas price
      gasLimit: config.gasLimit ? BigNumber.from(config.gasLimit) : undefined // Automated gas limit
      // gasLimit: await provider.getBlock('latest').then(b => b.gasLimit.mul(4).div(10)),
    }

    prompt.info(`Network Name:           ${config.networkName}`)
    prompt.info(`Chain Id: ${(await provider.getNetwork()).chainId}`)
    prompt.info(`Gas price (network): ${await provider.getGasPrice()}`)
    prompt.info(`Gas price (used): ${txParams.gasPrice ?? 'auto'}`)
    prompt.info(`Gas limit (used): ${txParams.gasLimit ?? 'auto'}`)
    prompt.info(`Local Deployer Address: ${await signer.getAddress()}`)
    prompt.info(`Local Deployer Balance: ${await signer.getBalance()}`)

    const pendingNonce = await signer.getTransactionCount('pending')
    const nonce = await signer.getTransactionCount()
    if (nonce !== pendingNonce) {
      prompt.fail(`Signer has pending transactions, ${nonce} !== ${pendingNonce}, aborting`)
      return 'Signer has pending transactions'
    }

    // Run a test deployment to check if the deployers will work without bricking them...
    try {
      const testDeployer = new deployers.TestDeployer(signer, prompt)
      await testDeployer.deploy('WalletFactory', FactoryV1, 0, txParams)
    } catch (e) {
      prompt.fail('Test deployment failed, aborting')
      console.error(e)
      return 'Test deployment failed'
    }

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

      prompt.start('Deploying V1 contracts\n')

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
      prompt.start('Deploying SEQ-0001 MainModuleUpgradableDuo v1\n')
      const mainModuleUpgradableDuoV1 = await universalDeployer.deploy(
        'MainModuleUpgradableDuo',
        getArtifactFactory(MAIN_MODULE_UPGRADABLE_DUO_V1),
        0,
        txParams
      )
      prompt.succeed(`Deployed SEQ-0001 MainModuleUpgradableDuo v1: ${mainModuleUpgradableDuoV1.address}\n`)

      prompt.start('Deploying SEQ-0001 MainModuleUpgradableDuo v2\n')
      const mainModuleUpgradableDuoV2 = await singletonDeployer.deploy(
        'MainModuleUpgradableDuo',
        getArtifactFactory(MAIN_MODULE_UPGRADABLE_DUO_V2),
        0,
        txParams
      )
      prompt.succeed(`Deployed SEQ-0001 MainModuleUpgradableDuo v2: ${mainModuleUpgradableDuoV2.address}\n`)

      prompt.start('Deploying migrator for SEQ-0001 v1\n')
      const migratorToDuoV1 = await universalDeployer.deploy(
        'MainModuleUpgradableDuoMigrator',
        getArtifactFactory(MIGRATOR_TO_DUO_V1),
        0,
        txParams,
        mainModuleUpgradableDuoV1.address,
        '0x596aF90CecdBF9A768886E771178fd5561dD27Ab',
        '0x5ca5d4cb6696df530c26b130a8fd86276a111f6696b3a8f2e76ff5edf94a2d84',
        '0xc99c1ab359199e4dcbd4603e9b2956d5681241ceb286359cf6a647ca56e6e128'
      )
      prompt.succeed(`Deployed migrator for SEQ-0001 v1: ${migratorToDuoV1.address}\n`)

      prompt.start('Deploying migrator for SEQ-0001 v2\n')
      const migratorToDuoV2 = await singletonDeployer.deploy(
        'MainModuleUpgradableDuoMigrator',
        getArtifactFactory(MIGRATOR_TO_DUO_V2),
        0,
        txParams,
        mainModuleUpgradableDuoV2.address,
        '0x761f5e29944D79d76656323F106CF2efBF5F09e9',
        '0xacb659ac7f85fbbce197005235ced2d040c7b02942a9dfae647582393d5a4e83',
        '0x6e2f52838722eda7d569b52db277d0d87d36991a6aa9b9657ef9d8f09b0c33f4'
      )
      prompt.succeed(`Deployed migrator for SEQ-0001 v2: ${migratorToDuoV2.address}\n`)

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

      prompt.succeed('Deployed V1 contracts\n')

      // v2

      prompt.start('Deploying V2 contracts\n')

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

      prompt.succeed('Deployed V2 contracts\n')

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

    prompt.start('Deploying V2 commons contracts\n')

    const trustFactory = await singletonDeployer.deploy('TrustFactory', TrustFactory, 0, txParams)

    prompt.succeed('Deployed V2 commons contracts\n')

    let walletProxyHookAddress: string | undefined
    if (config.immutableFactories) {
      prompt.start('Deploying V2 hooks contracts\n')
      // This hook is only relevant for immutable networks
      walletProxyHookAddress = (await singletonDeployer.deploy('WalletProxyHook', WalletProxyHook, 0, txParams)).address
      prompt.succeed('Deployed V2 hooks contracts\n')
    }

    // Sequence development multisig

    prompt.start('Deploying Sequence development multisig\n')

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
    prompt.succeed('Deployed Sequence development multisig\n')

    // Payments

    prompt.start('Deploying Sequence Payments contracts\n')

    const paymentCombiner = await singletonDeployer.deploy('PaymentCombiner', PaymentCombiner, 0, txParams)

    type PaymentsDeployment = {
      env: SequenceEnvironment
      signerAddr: string
      paymentsAddr: string
    }
    const paymentsDeployments: PaymentsDeployment[] = []

    const paymentsFactory = await universalDeployer.deploy(
      'PaymentsFactory',
      PaymentsFactory,
      0,
      txParams,
      developerMultisig.address
    )
    for (const paymentsEnv of config.paymentsSignerEnvs) {
      prompt.start(`Deploying Sequence ${paymentsEnv} Payments\n`)
      const { address: paymentsSignerAddr } = await deployPaymentsSigner(paymentsEnv, signer, v2WalletContext, txParams)
      const paymentsAddr = (
        await paymentsFactory.functions.determineAddress(developerMultisig.address, developerMultisig.address, paymentsSignerAddr)
      )[0]
      if ((await signer.provider.getCode(paymentsAddr)) === '0x') {
        const paymentsDeployTx = await paymentsFactory.functions.deploy(
          developerMultisig.address,
          developerMultisig.address,
          paymentsSignerAddr,
          txParams
        )
        await paymentsDeployTx.wait()
      }
      prompt.log(`Sequence ${paymentsEnv} Payments deployed at ${paymentsAddr}\n`)
      paymentsDeployments.push({ env: paymentsEnv, signerAddr: paymentsSignerAddr, paymentsAddr })
    }

    prompt.succeed('Deployed Sequence Payments contracts\n')

    // Niftyswap and Market contracts

    prompt.start('Deploying Market contracts\n')
    const niftyFactory = await universalDeployer.deploy(
      'NiftyswapFactory20',
      NiftyswapFactory20,
      0,
      txParams,
      NIFTYSWAP_FACTORY_20_DEFAULT_ADMIN
    ) // Use Universal deployer for consistency
    const niftyWrapper = await singletonDeployer.deploy('NiftyExchange20Wrapper', NiftyswapExchange20Wrapper, 0, txParams)
    const marketV1 = await singletonDeployer.deploy('SequenceMarket', SequenceMarketV1, 0, txParams, developerMultisig.address)
    const marketFactoryV2 = await singletonDeployer.deploy('SequenceMarketFactory', SequenceMarketFactoryV2, 0, txParams)
    prompt.log('Deploying SequenceMarketV2\n')
    const salt = ethers.constants.HashZero
    const marketV2Address = (await marketFactoryV2.functions.predictAddress(salt, developerMultisig.address))[0]
    if ((await signer.provider.getCode(marketV2Address)) === '0x') {
      const marketV2DeployTx = await marketFactoryV2.functions.deploy(salt, developerMultisig.address, txParams)
      await marketV2DeployTx.wait()
    }
    prompt.log(`SequenceMarketV2 deployed at ${marketV2Address}\n`)
    const batchPayableHelper = await singletonDeployer.deploy('BatchPayableHelper', BatchPayableHelper, 0, txParams)
    prompt.succeed('Deployed Market contracts\n')

    // Contracts library

    prompt.start('Deploying Library contracts\n')
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
    const erc721SoulboundFactory = await singletonDeployer.deploy(
      'ERC721SoulboundFactory',
      ERC721SoulboundFactory,
      0,
      txParams,
      developerMultisig.address
    )
    const erc1155SoulboundFactory = await singletonDeployer.deploy(
      'ERC1155SoulboundFactory',
      ERC1155SoulboundFactory,
      0,
      txParams,
      developerMultisig.address
    )
    let erc721OperatorEnforcedFactoryAddress: string | undefined
    let erc1155OperatorEnforcedFactoryAddress: string | undefined
    if (config.immutableFactories) {
      const immutableERC721Factory = await singletonDeployer.deploy(
        'ERC721OperatorEnforcedFactory',
        ERC721OperatorEnforcedFactory,
        0,
        txParams,
        developerMultisig.address
      )
      erc721OperatorEnforcedFactoryAddress = immutableERC721Factory.address
      const erc1155OperatorEnforcedFactory = await singletonDeployer.deploy(
        'ERC1155OperatorEnforcedFactory',
        ERC1155OperatorEnforcedFactory,
        0,
        txParams,
        developerMultisig.address
      )
      erc1155OperatorEnforcedFactoryAddress = erc1155OperatorEnforcedFactory.address
    }
    const clawbackMetadata = await singletonDeployer.deploy('ClawbackMetadata', ClawbackMetadata, 0, txParams)
    const clawback = await singletonDeployer.deploy(
      'Clawback',
      Clawback,
      0,
      txParams,
      developerMultisig.address,
      clawbackMetadata.address
    )
    const erc1155PackFactory = await singletonDeployer.deploy(
      'ERC1155PackFactory',
      ERC1155PackFactory,
      0,
      txParams,
      developerMultisig.address
    )

    prompt.succeed('Deployed Library contracts\n')

    // Output addresses

    prompt.start(`Writing deployment information to output_${config.networkName}.json\n`)
    const contractEntries: ContractEntry = {
      WalletFactoryV2: walletContextAddrs.WalletFactoryV2,
      MainModuleV2: walletContextAddrs.MainModuleV2,
      MainModuleUpgradableV2: walletContextAddrs.MainModuleUpgradableV2,
      GuestModuleV2: walletContextAddrs.GuestModuleV2,
      SequenceUtilsV2: walletContextAddrs.SequenceUtilsV2,
      TrustFactory: trustFactory.address,
      WalletProxyHook: walletProxyHookAddress,
      WalletFactoryV1: walletContextAddrs.WalletFactoryV1,
      MainModuleV1: walletContextAddrs.MainModuleV1,
      MainModuleUpgradableV1: walletContextAddrs.MainModuleUpgradableV1,
      GuestModuleV1: walletContextAddrs.GuestModuleV1,
      SequenceUtilsV1: walletContextAddrs.SequenceUtilsV1,
      RequireFreshSignerLibV1: walletContextAddrs.RequireFreshSignerLibV1,
      ProdGuardV2: '0x761f5e29944D79d76656323F106CF2efBF5F09e9',
      DevGuardV2: '0x1d76D1D72EC65A9B933745bd0a87cAA0FAc75Af0',
      ProdGuardV1: '0x596aF90CecdBF9A768886E771178fd5561dD27Ab',
      DevGuardV1: '0x2ca2380dA88528C6061ACb70aD5222fe455F25DF',
      DeveloperMultisig: developerMultisig.address,
      NiftyswapFactory20: niftyFactory.address,
      NiftyswapExchange20Wrapper: niftyWrapper.address,
      SequenceMarketFactoryV2: marketFactoryV2.address,
      SequenceMarketV2: marketV2Address,
      SequenceMarketV1: marketV1.address,
      BatchPayableHelper: batchPayableHelper.address,
      ERC20ItemsFactory: erc20ItemsFactory.address,
      ERC721ItemsFactory: erc721ItemsFactory.address,
      ERC1155ItemsFactory: erc1155ItemsFactory.address,
      ERC721SaleFactory: erc721SaleFactory.address,
      ERC1155SaleFactory: erc1155SaleFactory.address,
      ERC721SoulboundFactory: erc721SoulboundFactory.address,
      ERC1155SoulboundFactory: erc1155SoulboundFactory.address,
      ERC721OperatorEnforcedFactory: erc721OperatorEnforcedFactoryAddress,
      ERC1155OperatorEnforcedFactory: erc1155OperatorEnforcedFactoryAddress,
      Clawback: clawback.address,
      ClawbackMetadata: clawbackMetadata.address,
      PaymentCombiner: paymentCombiner.address,
      PaymentsFactory: paymentsFactory.address,
      ERC1155PackFactory: erc1155PackFactory.address
    }
    for (const { env, signerAddr, paymentsAddr } of paymentsDeployments) {
      contractEntries[`SequencePaymentsSigner-${env}`] = signerAddr
      contractEntries[`SequencePayments-${env}`] = paymentsAddr
    }

    await writeFile(`./output_${config.networkName}.json`, JSON.stringify(contractEntries, null, 2))
    prompt.succeed(`Wrote deployment information to output_${config.networkName}.json\n`)

    // Verify contracts
    await verifyContracts(config, contractEntries)
  } catch (error: unknown) {
    console.error('Error deploying contracts on', config.networkName, error)

    // Check for insufficient funds error
    const errorMessage = (error as Error).message ?? ''
    const fundsErrorMatches = [
      /insufficient funds for gas \* price \+ value: balance (\d+), tx cost (\d+), overshot (\d+)/i,
      /insufficient funds for gas \* price \+ value:.*?have (\d+) want (\d+)/i
    ]

    for (const pattern of fundsErrorMatches) {
      const match = errorMessage.match(pattern)
      if (match) {
        try {
          const balance = BigNumber.from(match[1])
          const txCost = BigNumber.from(match[2])
          const shortMessage = `Insufficient funds: need ${ethers.utils.formatEther(txCost)} native tokens, have ${ethers.utils.formatEther(balance)} native tokens`
          prompt.fail(`Error deploying contracts on ${config.networkName}: ${shortMessage}`)
          return shortMessage
        } catch (error) {
          console.error('Error parsing funds error message:', error)
        }
      }
    }

    prompt.fail(`Error deploying contracts on ${config.networkName}: ${error}`)
    return errorMessage
  }
  return null
}

const main = async () => {
  if (DEBUG) {
    argv.splice(argv.indexOf('--debug'), 1)
  }

  const filterNetwork = argv.length > 2 ? argv[2] : undefined
  const deployments = await perConfig(deployContracts, undefined, filterNetwork)

  // List successful deployments
  for (const { network, result } of deployments) {
    const err = result
    if (err === null) {
      console.log(`- [X] ${network}`)
    } else {
      console.error(`- [ ] ${network}: ${err.substring(0, 200)}`)
    }
  }
}

if (require.main === module) {
  main()
    .then(() => {
      process.exit(0)
    })
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}
