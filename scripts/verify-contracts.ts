import { verifiers as deploymentVerifiers, Logger } from '@0xsequence/solidity-deployer'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { readFile } from 'fs/promises'
import { argv } from 'node:process'
import ora, { type Ora } from 'ora'
import { type Config, perConfig } from './config'
import { BATCHPAYABLEHELPER_VERIFICATION } from './factories/marketplace/BatchPayableHelper'
import { NIFTYSWAP_EXCHANGE_20_WRAPPER_VERIFICATION } from './factories/marketplace/NiftyswapExchange20Wrapper'
import { NIFTYSWAP_FACTORY_20_DEFAULT_ADMIN, NIFTYSWAP_FACTORY_20_VERIFICATION } from './factories/marketplace/NiftyswapFactory20'
import {
  SequenceMarketFactoryV2,
  SEQUENCEMARKETFACTORYV2_VERIFICATION,
  SequenceMarketV2Interface
} from './factories/marketplace/SequenceMarketFactoryV2'
import { SEQUENCEMARKETV1_VERIFICATION } from './factories/marketplace/SequenceMarketV1'
import { CLAWBACK_VERIFICATION } from './factories/token_library/Clawback'
import { CLAWBACKMETADATA_VERIFICATION } from './factories/token_library/ClawbackMetadata'
import { ERC1155ItemsFactory, ERC1155ITEMSFACTORY_VERIFICATION } from './factories/token_library/ERC1155ItemsFactory'
import { ERC1155PackFactory, ERC1155PACKFACTORY_VERIFICATION } from './factories/token_library/ERC1155PackFactory'
import { ERC1155SaleFactory, ERC1155SALEFACTORY_VERIFICATION } from './factories/token_library/ERC1155SaleFactory'
import { ERC1155SoulboundFactory, ERC1155SOULBOUNDFACTORY_VERIFICATION } from './factories/token_library/ERC1155SoulboundFactory'
import { ERC20ItemsFactory, ERC20ITEMSFACTORY_VERIFICATION } from './factories/token_library/ERC20ItemsFactory'
import { ERC721ItemsFactory, ERC721ITEMSFACTORY_VERIFICATION } from './factories/token_library/ERC721ItemsFactory'
import { ERC721SaleFactory, ERC721SALEFACTORY_VERIFICATION } from './factories/token_library/ERC721SaleFactory'
import { ERC721SoulboundFactory, ERC721SOULBOUNDFACTORY_VERIFICATION } from './factories/token_library/ERC721SoulboundFactory'
import { PaymentCombiner, PAYMENTCOMBINER_VERIFICATION } from './factories/token_library/PaymentCombiner'
import { PAYMENTS_FACTORY_VERIFICATION, PaymentsFactory } from './factories/token_library/PaymentsFactory'
import { UpgradeableBeacon } from './factories/token_library/UpgradeableBeacon'
// import {
//   ERC1155OperatorEnforcedFactory,
//   ERC1155OPERATORENFORCEDFACTORY_VERIFICATION
// } from './factories/token_library/immutable/ERC1155OperatorEnforcedFactory'
// import {
//   ERC721OperatorEnforcedFactory,
//   ERC721OPERATORENFORCEDFACTORY_VERIFICATION
// } from './factories/token_library/immutable/ERC721OperatorEnforcedFactory'
import { FACTORY_V1_VERIFICATION } from './factories/v1/FactoryV1'
import { GUEST_MODULE_V1_VERIFICATION } from './factories/v1/GuestModuleV1'
import { MAIN_MODULE_UPGRADABLE_V1_VERIFICATION } from './factories/v1/MainModuleUpgradableV1'
import { MAIN_MODULE_V1_VERIFICATION } from './factories/v1/MainModuleV1'
import { REQUIRE_FRESH_SIGNER_V1_VERIFICATION } from './factories/v1/RequireFreshSignerV1'
import { SEQUENCE_UTILS_V1_VERIFICATION } from './factories/v1/SequenceUtilsV1'
import { FACTORY_V2_VERIFICATION } from './factories/v2/FactoryV2'
import { GUEST_MODULE_V2_VERIFICATION } from './factories/v2/GuestModuleV2'
import { MAIN_MODULE_UPGRADABLE_V2_VERIFICATION } from './factories/v2/MainModuleUpgradableV2'
import { MAIN_MODULE_V2_VERIFICATION } from './factories/v2/MainModuleV2'
import { SEQUENCE_UTILS_V2_VERIFICATION } from './factories/v2/SequenceUtilsV2'
import { TRUST_FACTORY_VERIFICATION } from './factories/v2/commons/TrustFactory'
import { WALLETPROXYHOOK_VERIFICATION } from './factories/v2/hooks/WalletProxyHook'
import type { ContractEntry, VerificationRequest } from './types'

export const verifyContracts = async (config: Config, walletContextAddrs: ContractEntry): Promise<string | null> => {
  const prompt = ora() as Ora & Logger
  prompt.log = (message: string) => {
    // Log a message and keep spinner running
    const currentText = prompt.text
    prompt.info(message)
    prompt.start(currentText)
  }
  prompt.error = prompt.fail
  prompt.prefixText = config.networkName

  let provider: JsonRpcProvider | undefined
  let etherscanApiUrl: string | undefined
  if (config.rpcUrl) {
    provider = new JsonRpcProvider(config.rpcUrl)
    if (config.etherscanApiKey) {
      const network = await provider.getNetwork()
      etherscanApiUrl = deploymentVerifiers.EtherscanVerifier.getEtherscanApiFromChainId(network.chainId)
    }
  }

  prompt.info(`Network Name:           ${config.networkName}`)
  prompt.info(`Blockscout:             ${config.blockscoutUrl ?? 'N/A'}`)
  prompt.info(`Etherscan:              ${etherscanApiUrl ?? 'N/A'}`)

  // Verify contracts

  if (!config.etherscanApiKey && !config.blockscoutUrl) {
    prompt.warn('Skipping contract verification.\n')
    prompt.stop()
    // Exit early
    return null
  }

  const verifiers: (deploymentVerifiers.EtherscanVerifier | deploymentVerifiers.BlockscoutVerifier)[] = []
  if (config.etherscanApiKey && etherscanApiUrl) {
    verifiers.push(new deploymentVerifiers.EtherscanVerifier(config.etherscanApiKey, etherscanApiUrl, prompt))
  }
  if (config.blockscoutUrl) {
    verifiers.push(new deploymentVerifiers.BlockscoutVerifier(config.blockscoutUrl, prompt))
  }
  const verifyContract = async (address: string | undefined, verification: VerificationRequest) => {
    if (!address) {
      prompt.warn(`Skipping verification of ${verification.contractToVerify}. No address provided\n`)
      return
    }
    // Run these simultaneously
    await Promise.all(verifiers.map(verifier => verifier.verifyContract(address, verification)))
  }

  const waitForSuccess = true // One at a time
  const { defaultAbiCoder } = ethers.utils
  const beacon = new UpgradeableBeacon()

  try {
    if (config.skipWalletContext) {
      prompt.log('Skipping wallet context verification\n')
    } else {
      // v1

      prompt.start('Verifying V1 contracts\n')

      await verifyContract(walletContextAddrs.WalletFactoryV1, { ...FACTORY_V1_VERIFICATION, waitForSuccess })
      await verifyContract(walletContextAddrs.MainModuleV1, {
        ...MAIN_MODULE_V1_VERIFICATION,
        constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.WalletFactoryV1]),
        waitForSuccess
      })
      await verifyContract(walletContextAddrs.MainModuleUpgradableV1, {
        ...MAIN_MODULE_UPGRADABLE_V1_VERIFICATION,
        waitForSuccess
      })
      await verifyContract(walletContextAddrs.GuestModuleV1, { ...GUEST_MODULE_V1_VERIFICATION, waitForSuccess })
      await verifyContract(walletContextAddrs.SequenceUtilsV1, {
        ...SEQUENCE_UTILS_V1_VERIFICATION,
        constructorArgs: defaultAbiCoder.encode(
          ['address', 'address'],
          [walletContextAddrs.WalletFactoryV1, walletContextAddrs.MainModuleV1]
        ),
        waitForSuccess
      })
      await verifyContract(walletContextAddrs.RequireFreshSignerLibV1, {
        ...REQUIRE_FRESH_SIGNER_V1_VERIFICATION,
        constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.SequenceUtilsV1]),
        waitForSuccess
      })

      prompt.succeed('Verified V1 contracts\n')

      // v2

      prompt.start('Verifying V2 contracts\n')

      await verifyContract(walletContextAddrs.WalletFactoryV2, { ...FACTORY_V2_VERIFICATION, waitForSuccess })
      await verifyContract(walletContextAddrs.MainModuleUpgradableV2, {
        ...MAIN_MODULE_UPGRADABLE_V2_VERIFICATION,
        waitForSuccess
      })
      await verifyContract(walletContextAddrs.MainModuleV2, {
        ...MAIN_MODULE_V2_VERIFICATION,
        constructorArgs: defaultAbiCoder.encode(
          ['address', 'address'],
          [walletContextAddrs.WalletFactoryV2, walletContextAddrs.MainModuleUpgradableV2]
        ),
        waitForSuccess
      })
      await verifyContract(walletContextAddrs.GuestModuleV2, { ...GUEST_MODULE_V2_VERIFICATION, waitForSuccess })
      await verifyContract(walletContextAddrs.SequenceUtilsV2, {
        ...SEQUENCE_UTILS_V2_VERIFICATION,
        waitForSuccess
      })

      prompt.succeed('Verified V2 contracts\n')
    }

    // v2 commons

    prompt.start('Verifying V2 commons contracts\n')

    await verifyContract(walletContextAddrs.TrustFactory, { ...TRUST_FACTORY_VERIFICATION, waitForSuccess })

    prompt.succeed('Verified V2 commons contracts\n')

    // v2 hooks

    prompt.start('Verifying V2 hooks contracts\n')

    await verifyContract(walletContextAddrs.WalletProxyHook, { ...WALLETPROXYHOOK_VERIFICATION, waitForSuccess })

    prompt.succeed('Verified V2 hooks contracts\n')

    // Payments

    prompt.start('Verifying Payments contracts\n')

    await verifyContract(walletContextAddrs.PaymentCombiner, { ...PAYMENTCOMBINER_VERIFICATION, waitForSuccess })
    // Verify the implementation
    if (provider && walletContextAddrs.PaymentCombiner) {
      const paymentCombiner = new PaymentCombiner().attach(walletContextAddrs.PaymentCombiner).connect(provider)
      const paymentCombinerImplementationAddress = await paymentCombiner.implementationAddress()
      await verifyContract(paymentCombinerImplementationAddress, {
        ...PAYMENTCOMBINER_VERIFICATION,
        contractToVerify: 'src/payments/PaymentSplitter.sol:PaymentSplitter',
        waitForSuccess
      })
    }

    await verifyContract(walletContextAddrs.PaymentsFactory, {
      ...PAYMENTS_FACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.DeveloperMultisig])
    })
    // Verify the implmentation
    if (provider && walletContextAddrs.PaymentsFactory) {
      const paymentsFactory = new PaymentsFactory().attach(walletContextAddrs.PaymentsFactory).connect(provider)
      const paymentsFactoryBeaconAddress = await paymentsFactory.beacon()
      const paymentsFactoryBeacon = beacon.attach(paymentsFactoryBeaconAddress).connect(provider)
      await verifyContract(await paymentsFactoryBeacon.implementation(), {
        ...PAYMENTS_FACTORY_VERIFICATION,
        contractToVerify: 'src/payments/Payments.sol:Payments',
        waitForSuccess
      })
    }

    prompt.succeed('Verified Payments contracts\n')

    // Niftyswap and Market

    prompt.start('Verifying Market contracts\n')
    await verifyContract(walletContextAddrs.NiftyswapFactory20, {
      ...NIFTYSWAP_FACTORY_20_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [NIFTYSWAP_FACTORY_20_DEFAULT_ADMIN])
    })
    await verifyContract(walletContextAddrs.NiftyswapExchange20Wrapper, {
      ...NIFTYSWAP_EXCHANGE_20_WRAPPER_VERIFICATION,
      waitForSuccess
    })
    await verifyContract(walletContextAddrs.SequenceMarketV1, {
      ...SEQUENCEMARKETV1_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.DeveloperMultisig])
    })
    await verifyContract(walletContextAddrs.SequenceMarketFactoryV2, {
      ...SEQUENCEMARKETFACTORYV2_VERIFICATION,
      waitForSuccess
    })
    if (provider && walletContextAddrs.SequenceMarketFactoryV2) {
      const marketV2Factory = new SequenceMarketFactoryV2().attach(walletContextAddrs.SequenceMarketFactoryV2).connect(provider)
      const marketV2ImplementationAddress = await marketV2Factory.implementation()
      await verifyContract(marketV2ImplementationAddress, {
        ...SEQUENCEMARKETFACTORYV2_VERIFICATION,
        contractToVerify: 'contracts/SequenceMarket.sol:SequenceMarket',
        waitForSuccess
      })
      await verifyContract(walletContextAddrs.SequenceMarketV2, {
        ...SEQUENCEMARKETFACTORYV2_VERIFICATION,
        contractToVerify: 'lib/openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol:ERC1967Proxy',
        waitForSuccess,
        constructorArgs: defaultAbiCoder.encode(
          ['address', 'bytes'],
          [
            marketV2ImplementationAddress,
            SequenceMarketV2Interface.encodeFunctionData('initialize', [walletContextAddrs.DeveloperMultisig])
          ]
        )
      })
    }
    await verifyContract(walletContextAddrs.BatchPayableHelper, {
      ...BATCHPAYABLEHELPER_VERIFICATION,
      waitForSuccess
    })
    prompt.succeed('Verified Market contracts\n')

    // Library contracts

    prompt.start('Verifying Library contracts\n')
    // Factories
    await verifyContract(walletContextAddrs.ERC20ItemsFactory, {
      ...ERC20ITEMSFACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.DeveloperMultisig])
    })
    await verifyContract(walletContextAddrs.ERC721ItemsFactory, {
      ...ERC721ITEMSFACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.DeveloperMultisig])
    })
    await verifyContract(walletContextAddrs.ERC1155ItemsFactory, {
      ...ERC1155ITEMSFACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.DeveloperMultisig])
    })
    await verifyContract(walletContextAddrs.ERC721SaleFactory, {
      ...ERC721SALEFACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.DeveloperMultisig])
    })
    await verifyContract(walletContextAddrs.ERC1155SaleFactory, {
      ...ERC1155SALEFACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.DeveloperMultisig])
    })
    await verifyContract(walletContextAddrs.ERC721SoulboundFactory, {
      ...ERC721SOULBOUNDFACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.DeveloperMultisig])
    })
    await verifyContract(walletContextAddrs.ERC1155SoulboundFactory, {
      ...ERC1155SOULBOUNDFACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.DeveloperMultisig])
    })
    // await verifyContract(walletContextAddrs.ERC721OperatorEnforcedFactory, {
    //   ...ERC721OPERATORENFORCEDFACTORY_VERIFICATION,
    //   waitForSuccess,
    //   constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.DeveloperMultisig])
    // })
    // await verifyContract(walletContextAddrs.ERC1155OperatorEnforcedFactory, {
    //   ...ERC1155OPERATORENFORCEDFACTORY_VERIFICATION,
    //   waitForSuccess,
    //   constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.DeveloperMultisig])
    // })
    await verifyContract(walletContextAddrs.ERC1155PackFactory, {
      ...ERC1155PACKFACTORY_VERIFICATION,
      waitForSuccess,
      constructorArgs: defaultAbiCoder.encode(['address'], [walletContextAddrs.DeveloperMultisig])
    })
    // Token contracts deployed by the factories
    if (provider && walletContextAddrs.ERC20ItemsFactory) {
      const erc20ItemsFactory = new ERC20ItemsFactory().attach(walletContextAddrs.ERC20ItemsFactory).connect(provider)
      const erc20ItemsBeacon = await erc20ItemsFactory.beacon()
      await verifyContract(await beacon.attach(erc20ItemsBeacon).connect(provider).implementation(), {
        ...ERC20ITEMSFACTORY_VERIFICATION,
        contractToVerify: 'src/tokens/ERC20/presets/items/ERC20Items.sol:ERC20Items',
        waitForSuccess
      })
    }
    if (provider && walletContextAddrs.ERC721ItemsFactory) {
      const erc721ItemsFactory = new ERC721ItemsFactory().attach(walletContextAddrs.ERC721ItemsFactory).connect(provider)
      const erc721ItemsBeacon = await erc721ItemsFactory.beacon()
      await verifyContract(await beacon.attach(erc721ItemsBeacon).connect(provider).implementation(), {
        ...ERC721ITEMSFACTORY_VERIFICATION,
        contractToVerify: 'src/tokens/ERC721/presets/items/ERC721Items.sol:ERC721Items',
        waitForSuccess
      })
    }
    if (provider && walletContextAddrs.ERC1155ItemsFactory) {
      const erc1155ItemsFactory = new ERC1155ItemsFactory().attach(walletContextAddrs.ERC1155ItemsFactory).connect(provider)
      const erc1155ItemsBeacon = await erc1155ItemsFactory.beacon()
      const erc1155ItemsImplementation = await beacon.attach(erc1155ItemsBeacon).connect(provider).implementation()
      await verifyContract(erc1155ItemsImplementation, {
        ...ERC1155ITEMSFACTORY_VERIFICATION,
        contractToVerify: 'src/tokens/ERC1155/presets/items/ERC1155Items.sol:ERC1155Items',
        waitForSuccess
      })
    }
    if (provider && walletContextAddrs.ERC721SaleFactory) {
      const erc721SaleFactory = new ERC721SaleFactory().attach(walletContextAddrs.ERC721SaleFactory).connect(provider)
      const erc721SaleBeacon = await erc721SaleFactory.beacon()
      const erc721SaleImplementation = await beacon.attach(erc721SaleBeacon).connect(provider).implementation()
      await verifyContract(erc721SaleImplementation, {
        ...ERC721SALEFACTORY_VERIFICATION,
        contractToVerify: 'src/tokens/ERC721/utility/sale/ERC721Sale.sol:ERC721Sale',
        waitForSuccess
      })
    }
    if (provider && walletContextAddrs.ERC1155SaleFactory) {
      const erc1155SaleFactory = new ERC1155SaleFactory().attach(walletContextAddrs.ERC1155SaleFactory).connect(provider)
      const erc1155SaleBeacon = await erc1155SaleFactory.beacon()
      const erc1155SaleImplementation = await beacon.attach(erc1155SaleBeacon).connect(provider).implementation()
      await verifyContract(erc1155SaleImplementation, {
        ...ERC1155SALEFACTORY_VERIFICATION,
        contractToVerify: 'src/tokens/ERC1155/utility/sale/ERC1155Sale.sol:ERC1155Sale',
        waitForSuccess
      })
    }
    if (provider && walletContextAddrs.ERC721SoulboundFactory) {
      const erc721SoulboundFactory = new ERC721SoulboundFactory()
        .attach(walletContextAddrs.ERC721SoulboundFactory)
        .connect(provider)
      const erc721SoulboundBeacon = await erc721SoulboundFactory.beacon()
      const erc721SoulboundImplementation = await beacon.attach(erc721SoulboundBeacon).connect(provider).implementation()
      await verifyContract(erc721SoulboundImplementation, {
        ...ERC721SOULBOUNDFACTORY_VERIFICATION,
        contractToVerify: 'src/tokens/ERC721/presets/soulbound/ERC721Soulbound.sol:ERC721Soulbound',
        waitForSuccess
      })
    }
    if (provider && walletContextAddrs.ERC1155SoulboundFactory) {
      const erc1155SoulboundFactory = new ERC1155SoulboundFactory()
        .attach(walletContextAddrs.ERC1155SoulboundFactory)
        .connect(provider)
      const erc1155SoulboundBeacon = await erc1155SoulboundFactory.beacon()
      const erc1155SoulboundImplementation = await beacon.attach(erc1155SoulboundBeacon).connect(provider).implementation()
      await verifyContract(erc1155SoulboundImplementation, {
        ...ERC1155SOULBOUNDFACTORY_VERIFICATION,
        contractToVerify: 'src/tokens/ERC1155/presets/soulbound/ERC1155Soulbound.sol:ERC1155Soulbound',
        waitForSuccess
      })
    }
    if (provider && walletContextAddrs.ERC1155PackFactory) {
      const erc1155PackFactory = new ERC1155PackFactory().attach(walletContextAddrs.ERC1155PackFactory).connect(provider)
      const erc1155PackBeacon = await erc1155PackFactory.beacon()
      const erc1155PackImplementation = await beacon.attach(erc1155PackBeacon).connect(provider).implementation()
      await verifyContract(erc1155PackImplementation, {
        ...ERC1155PACKFACTORY_VERIFICATION,
        contractToVerify: 'src/tokens/ERC1155/presets/pack/ERC1155Pack.sol:ERC1155Pack',
        waitForSuccess
      })
    }
    // if (provider && walletContextAddrs.ERC721OperatorEnforcedFactory) {
    //   const erc721OperatorEnforcedFactory = new ERC721OperatorEnforcedFactory()
    //     .attach(walletContextAddrs.ERC721OperatorEnforcedFactory)
    //     .connect(provider)
    //   const erc721OperatorEnforcedBeacon = await erc721OperatorEnforcedFactory.beacon()
    //   const erc721OperatorEnforcedImplementation = await beacon
    //     .attach(erc721OperatorEnforcedBeacon)
    //     .connect(provider)
    //     .implementation()
    //   console.log('erc721OperatorEnforcedImplementation', erc721OperatorEnforcedImplementation)
    //   await verifyContract(erc721OperatorEnforcedImplementation, {
    //     ...ERC721OPERATORENFORCEDFACTORY_VERIFICATION,
    //     contractToVerify: 'src/tokens/ERC721/presets/operator-enforced/ERC721OperatorEnforced.sol:ERC721OperatorEnforced',
    //     waitForSuccess
    //   })
    // }
    // if (provider && walletContextAddrs.ERC1155OperatorEnforcedFactory) {
    //   const erc1155OperatorEnforcedFactory = new ERC1155OperatorEnforcedFactory()
    //     .attach(walletContextAddrs.ERC1155OperatorEnforcedFactory)
    //     .connect(provider)
    //   const erc1155OperatorEnforcedBeacon = await erc1155OperatorEnforcedFactory.beacon()
    //   const erc1155OperatorEnforcedImplementation = await beacon
    //     .attach(erc1155OperatorEnforcedBeacon)
    //     .connect(provider)
    //     .implementation()
    //   await verifyContract(erc1155OperatorEnforcedImplementation, {
    //     ...ERC1155OPERATORENFORCEDFACTORY_VERIFICATION,
    //     contractToVerify: 'src/tokens/ERC1155/presets/operator-enforced/ERC1155OperatorEnforced.sol:ERC1155OperatorEnforced',
    //     waitForSuccess
    //   })
    // }
    // Clawback
    if (walletContextAddrs.ClawbackMetadata) {
      await verifyContract(walletContextAddrs.Clawback, {
        ...CLAWBACK_VERIFICATION,
        waitForSuccess,
        constructorArgs: defaultAbiCoder.encode(
          ['address', 'address'],
          [walletContextAddrs.DeveloperMultisig, walletContextAddrs.ClawbackMetadata]
        )
      })
      await verifyContract(walletContextAddrs.ClawbackMetadata, {
        ...CLAWBACKMETADATA_VERIFICATION,
        waitForSuccess
      })
    }

    prompt.succeed('Verified Library contracts\n')
  } catch (error: unknown) {
    prompt.fail(`Error verifying contracts on ${config.networkName}: ${error}`)
    return (error as Error).message
  }
  return null
}

const verifyContractsWithWalletContext = async (config: Config): Promise<string | null> => {
  // Read the deployment addresses
  const deploymentAddresses = await readFile(`./output_${config.networkName}.json`, 'utf8')
  const walletContextAddrs = JSON.parse(deploymentAddresses) as ContractEntry
  return verifyContracts(config, walletContextAddrs)
}

const main = async () => {
  const filterNetwork = argv.length > 2 ? argv[2] : undefined
  const deployments = await perConfig(verifyContractsWithWalletContext, undefined, filterNetwork)

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
