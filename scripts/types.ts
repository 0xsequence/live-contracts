import type { BlockscoutVerificationRequest, EtherscanVerificationRequest } from '@0xsequence/solidity-deployer'

export type VerificationRequest = BlockscoutVerificationRequest & EtherscanVerificationRequest

export type SequenceEnvironment = 'dev' | 'next' | 'prod'

export type ContractName =
  | 'WalletFactoryV2'
  | 'MainModuleV2'
  | 'MainModuleUpgradableV2'
  | 'GuestModuleV2'
  | 'SequenceUtilsV2'
  | 'TrustFactory'
  | 'EternalFactory'
  | 'MainModuleWebAuthnOnly'
  | 'WalletFactoryV1'
  | 'MainModuleV1'
  | 'MainModuleUpgradableV1'
  | 'GuestModuleV1'
  | 'SequenceUtilsV1'
  | 'RequireFreshSignerLibV1'
  | 'ProdGuardV2'
  | 'DevGuardV2'
  | 'ProdGuardV1'
  | 'DevGuardV1'
  | 'DeveloperMultisig'
  | 'NiftyswapFactory20'
  | 'NiftyswapExchange20Wrapper'
  | 'SequenceMarketFactoryV2'
  | 'SequenceMarketV2'
  | 'SequenceMarketV1'
  | 'ERC20ItemsFactory'
  | 'ERC721ItemsFactory'
  | 'ERC1155ItemsFactory'
  | 'ERC721SaleFactory'
  | 'ERC1155SaleFactory'
  | 'ERC721SoulboundFactory'
  | 'ERC1155SoulboundFactory'
  | 'Clawback'
  | 'ClawbackMetadata'
  | 'PaymentCombiner'
  | 'PaymentsFactory'
  | `SequencePaymentsSigner-${SequenceEnvironment}`
  | `SequencePayments-${SequenceEnvironment}`

export type ContractEntry = Partial<Record<ContractName, string>>
