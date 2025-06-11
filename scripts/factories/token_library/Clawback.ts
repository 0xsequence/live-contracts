import { ContractFactory, type ethers } from 'ethers'
import type { VerificationRequest } from 'scripts/types'

// https://github.com/0xsequence/contracts-library/blob/1353b8c00c6f496342e5948056842ab9d0f0eb36/src/tokens/wrappers/clawback/Clawback.sol

const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'metadataProviderAddr',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'implicitModeValidator',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'implicitModeProjectId',
        type: 'bytes32'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'AccountBalanceOverflow',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ArrayLengthsMismatch',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InsufficientBalance',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidReceiver',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidTemplate',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    name: 'InvalidTemplateChange',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidTokenApproval',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidTokenTransfer',
    type: 'error'
  },
  {
    inputs: [],
    name: 'NotOwnerNorApproved',
    type: 'error'
  },
  {
    inputs: [],
    name: 'TokenLocked',
    type: 'error'
  },
  {
    inputs: [],
    name: 'TokenUnlocked',
    type: 'error'
  },
  {
    inputs: [],
    name: 'TransferToNonERC1155ReceiverImplementer',
    type: 'error'
  },
  {
    inputs: [],
    name: 'TransferToZeroAddress',
    type: 'error'
  },
  {
    inputs: [],
    name: 'Unauthorized',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isApproved',
        type: 'bool'
      }
    ],
    name: 'ApprovalForAll',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'wrappedTokenId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddr',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'holder',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      }
    ],
    name: 'ClawedBack',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'wrappedTokenId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddr',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      }
    ],
    name: 'EmergencyClawedBack',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32'
      }
    ],
    name: 'RoleAdminChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleGranted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleRevoked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'admin',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint56',
        name: 'duration',
        type: 'uint56'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'destructionOnly',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'transferOpen',
        type: 'bool'
      }
    ],
    name: 'TemplateAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'admin',
        type: 'address'
      }
    ],
    name: 'TemplateAdminUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'allowed',
        type: 'bool'
      }
    ],
    name: 'TemplateOperatorUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'transferer',
        type: 'address'
      }
    ],
    name: 'TemplateTransfererAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint56',
        name: 'duration',
        type: 'uint56'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'destructionOnly',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'transferOpen',
        type: 'bool'
      }
    ],
    name: 'TemplateUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]'
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]'
      }
    ],
    name: 'TransferBatch',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'TransferSingle',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'value',
        type: 'string'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      }
    ],
    name: 'URI',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'wrappedTokenId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddr',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'Unwrapped',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'wrappedTokenId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddr',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      }
    ],
    name: 'Wrapped',
    type: 'event'
  },
  {
    inputs: [],
    name: 'BURN_ADDRESS',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address'
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'approvedSigner',
            type: 'address'
          },
          {
            internalType: 'bytes4',
            name: 'identityType',
            type: 'bytes4'
          },
          {
            internalType: 'bytes32',
            name: 'issuerHash',
            type: 'bytes32'
          },
          {
            internalType: 'bytes32',
            name: 'audienceHash',
            type: 'bytes32'
          },
          {
            internalType: 'bytes',
            name: 'applicationData',
            type: 'bytes'
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'redirectUrl',
                type: 'string'
              },
              {
                internalType: 'uint64',
                name: 'issuedAt',
                type: 'uint64'
              }
            ],
            internalType: 'struct AuthData',
            name: 'authData',
            type: 'tuple'
          }
        ],
        internalType: 'struct Attestation',
        name: 'attestation',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes'
          },
          {
            internalType: 'uint256',
            name: 'gasLimit',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'delegateCall',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'onlyFallback',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'behaviorOnError',
            type: 'uint256'
          }
        ],
        internalType: 'struct Payload.Call',
        name: 'call',
        type: 'tuple'
      }
    ],
    name: 'acceptImplicitRequest',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint56',
        name: 'duration',
        type: 'uint56'
      },
      {
        internalType: 'bool',
        name: 'destructionOnly',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'transferOpen',
        type: 'bool'
      }
    ],
    name: 'addTemplate',
    outputs: [
      {
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        internalType: 'address',
        name: 'transferer',
        type: 'address'
      }
    ],
    name: 'addTemplateTransferer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'wrappedTokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      }
    ],
    name: 'addToWrap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: 'result',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'owners',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]'
      }
    ],
    name: 'balanceOfBatch',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'balances',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'wrappedTokenId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'holder',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'clawback',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'wrappedTokenId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'emergencyClawback',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      }
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'getRoleMember',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      }
    ],
    name: 'getRoleMemberCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      }
    ],
    name: 'getTemplate',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'destructionOnly',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'transferOpen',
            type: 'bool'
          },
          {
            internalType: 'uint56',
            name: 'duration',
            type: 'uint56'
          },
          {
            internalType: 'address',
            name: 'admin',
            type: 'address'
          }
        ],
        internalType: 'struct IClawbackFunctions.Template',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'wrappedTokenId',
        type: 'uint256'
      }
    ],
    name: 'getTokenDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'enum IClawbackFunctions.TokenType',
            name: 'tokenType',
            type: 'uint8'
          },
          {
            internalType: 'uint32',
            name: 'templateId',
            type: 'uint32'
          },
          {
            internalType: 'uint56',
            name: 'lockedAt',
            type: 'uint56'
          },
          {
            internalType: 'address',
            name: 'tokenAddr',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256'
          }
        ],
        internalType: 'struct IClawbackFunctions.TokenDetails',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      }
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: 'result',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'metadataProvider',
    outputs: [
      {
        internalType: 'contract IMetadataProvider',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'onERC1155BatchReceived',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'onERC1155Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256[]',
        name: 'wrappedTokenIds',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'wrappedTokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'isApproved',
        type: 'bool'
      }
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'projectId',
        type: 'bytes32'
      }
    ],
    name: 'setImplicitModeProjectId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'validator',
        type: 'address'
      }
    ],
    name: 'setImplicitModeValidator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: '_interfaceID',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'templateOperators',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'templateTransferers',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'wrappedTokenId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'holder',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'unwrap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'metadataProviderAddr',
        type: 'address'
      }
    ],
    name: 'updateMetadataProvider',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        internalType: 'uint56',
        name: 'duration',
        type: 'uint56'
      },
      {
        internalType: 'bool',
        name: 'destructionOnly',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'transferOpen',
        type: 'bool'
      }
    ],
    name: 'updateTemplate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        internalType: 'address',
        name: 'admin',
        type: 'address'
      }
    ],
    name: 'updateTemplateAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'allowed',
        type: 'bool'
      }
    ],
    name: 'updateTemplateOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'wrappedTokenId',
        type: 'uint256'
      }
    ],
    name: 'uri',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'templateId',
        type: 'uint32'
      },
      {
        internalType: 'enum IClawbackFunctions.TokenType',
        name: 'tokenType',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: 'tokenAddr',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      }
    ],
    name: 'wrap',
    outputs: [
      {
        internalType: 'uint256',
        name: 'wrappedTokenId',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export class Clawback extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      abi,
      '6080604052346100335761001d610014610146565b9291909161021b565b610025610038565b615afb6107a88239615afb90f35b61003e565b60405190565b5f80fd5b601f801991011690565b634e487b7160e01b5f52604160045260245ffd5b9061006a90610042565b810190811060018060401b0382111761008257604052565b61004c565b9061009a610093610038565b9283610060565b565b5f80fd5b60018060a01b031690565b6100b4906100a0565b90565b6100c0816100ab565b036100c757565b5f80fd5b905051906100d8826100b7565b565b90565b6100e6816100da565b036100ed57565b5f80fd5b905051906100fe826100dd565b565b60808183031261014157610116825f83016100cb565b9261013e61012784602085016100cb565b9361013581604086016100cb565b936060016100f1565b90565b61009c565b6101646162a38038038061015981610087565b928339810190610100565b90919293565b90565b5f1b90565b61018661018161018b9261016a565b61016d565b6100da565b90565b6101975f610172565b90565b90565b6101b16101ac6101b6926100a0565b61019a565b6100a0565b90565b6101c29061019d565b90565b6101ce906101b9565b90565b906101e260018060a01b039161016d565b9181191691161790565b6101f5906101b9565b90565b90565b9061021061020b610217926101ec565b6101f8565b82546101d1565b9055565b6102469261024d946102419261023961023261018e565b8290610274565b9190916102c2565b6101c5565b60086101fb565b565b610258906100da565b90565b906102659061024f565b5f5260205260405f2090565b90565b9061029661029161029b9361028a818590610372565b600161025b565b610271565b610461565b50565b7f70649ec320b507febad3e8ef750e5f580b9ae32f9f50d4c7b121332c8197153090565b906102d86102dd93926102d361029e565b610274565b610529565b565b151590565b906102ee9061024f565b5f5260205260405f2090565b6103039061019d565b90565b61030f906102fa565b90565b9061031c90610306565b5f5260205260405f2090565b9061033460ff9161016d565b9181191691161790565b610347906102df565b90565b90565b9061036261035d6103699261033e565b61034a565b8254610328565b9055565b5f0190565b610386610380828490610570565b156102df565b61038f575b5050565b6103b060016103ab5f6103a38186906102e4565b018590610312565b61034d565b906103b961059d565b906103f66103f06103ea7f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d9561024f565b92610306565b92610306565b926103ff610038565b806104098161036d565b0390a45f8061038b565b5f90565b6104209061019d565b90565b90565b61043a61043561043f926100a0565b61019a565b610423565b90565b61045661045161045b92610423565b61016d565b6100da565b90565b90565b9061049361048d6104886104835f6104989661047b610413565b500194610417565b610426565b610442565b9161045e565b6106cf565b90565b6104a49061019d565b90565b6104b09061049b565b90565b6104bc9061049b565b90565b90565b906104d76104d26104de926104b3565b6104bf565b82546101d1565b9055565b906104ee5f199161016d565b9181191691161790565b5f1c90565b610506906104f8565b90565b9061051e6105196105259261024f565b6104fd565b82546104e2565b9055565b90610540610539610547936104a7565b60026104c2565b6003610509565b565b60ff1690565b61055b610560916104f8565b610549565b90565b61056d905461054f565b90565b610596915f61058b61059193610584610413565b50826102e4565b01610312565b610563565b90565b5f90565b6105a5610599565b503390565b90565b5f5260205f2090565b634e487b7160e01b5f52603260045260245ffd5b5490565b6105d7816105ca565b8210156105f1576105e96001916105ad565b910201905f90565b6105b6565b1b90565b9190600861061591029161060f5f19846105f6565b926105f6565b9181191691161790565b919061063561063061063d9361024f565b6104fd565b9083546105fa565b9055565b9081549168010000000000000000831015610671578261066991600161066f950181556105ce565b9061061f565b565b61004c565b5490565b906106849061024f565b5f5260205260405f2090565b6106a461069f6106a992610423565b61019a565b610423565b90565b90565b906106c46106bf6106cb92610690565b6106ac565b82546104e2565b9055565b6106d7610413565b506106ec6106e6828490610772565b156102df565b5f1461072c576107226107279261070e6107075f85016105aa565b8290610641565b600161071b5f8501610676565b930161067a565b6106af565b600190565b50505f90565b90565b610741610746916104f8565b610732565b90565b6107539054610735565b90565b61076a61076561076f9261016a565b61019a565b610423565b90565b61079091600161078b92610784610413565b500161067a565b610749565b6107a261079c5f610756565b91610423565b14159056fe60806040526004361015610013575b61179f565b61001d5f3561028b565b8062fdd58e1461028657806301ffc9a7146102815780630a5d17771461027c5780630bb310de146102775780630e89341c146102725780631162d6ca1461026d578063150b7a0214610268578063212857f514610263578063248a9ca31461025e5780632eb2c2d6146102595780632f2ff15d1461025457806336568abe1461024f578063373254a01461024a5780633c8347a8146102455780633f069a43146102405780634e1273f41461023b5780634edaaca8146102365780635a2ec478146102315780635ae684431461022c57806385c20a9d146102275780639010d07c1461022257806391d148541461021d5780639d043a6614610218578063a217fddf14610213578063a22cb4651461020e578063ab42885b14610209578063bc197c8114610204578063c1e03728146101ff578063ca15c873146101fa578063d3d72d2a146101f5578063d547741f146101f0578063d5d9510d146101eb578063e985e9c5146101e6578063ed4c2ac7146101e1578063ee107509146101dc578063ef0ac969146101d7578063f23a6e61146101d2578063f242432a146101cd5763fccc28130361000e5761176a565b61171f565b6116e3565b611640565b611609565b611590565b61155a565b6114f7565b6114a2565b61146d565b6113ca565b611395565b6112ad565b611279565b611245565b6111e3565b611163565b61109a565b611064565b610fdf565b610f2c565b610e9b565b610e66565b610d7f565b610c0e565b610ba0565b610b2a565b610a75565b610a41565b6109d7565b6108c1565b610824565b6107a5565b6106a4565b61066f565b6105b3565b61055a565b6103fc565b610352565b60e01c90565b60405190565b5f80fd5b5f80fd5b5f80fd5b60018060a01b031690565b6102b7906102a3565b90565b6102c3816102ae565b036102ca57565b5f80fd5b905035906102db826102ba565b565b90565b6102e9816102dd565b036102f057565b5f80fd5b90503590610301826102e0565b565b919060408382031261032b578061031f610328925f86016102ce565b936020016102f4565b90565b61029b565b610339906102dd565b9052565b9190610350905f60208501940190610330565b565b346103835761037f61036e610368366004610303565b906117a7565b610376610291565b9182918261033d565b0390f35b610297565b63ffffffff60e01b1690565b61039d81610388565b036103a457565b5f80fd5b905035906103b582610394565b565b906020828203126103d0576103cd915f016103a8565b90565b61029b565b151590565b6103e3906103d5565b9052565b91906103fa905f602085019401906103da565b565b3461042c576104286104176104123660046103b7565b6117cd565b61041f610291565b918291826103e7565b0390f35b610297565b63ffffffff1690565b61044381610431565b0361044a57565b5f80fd5b9050359061045b8261043a565b565b91906040838203126104855780610479610482925f860161044e565b936020016102ce565b90565b61029b565b90565b6104a161049c6104a692610431565b61048a565b610431565b90565b906104b39061048d565b5f5260205260405f2090565b6104d36104ce6104d8926102a3565b61048a565b6102a3565b90565b6104e4906104bf565b90565b6104f0906104db565b90565b906104fd906104e7565b5f5260205260405f2090565b1c90565b60ff1690565b6105239060086105289302610509565b61050d565b90565b906105369154610513565b90565b6105526105579261054d6006935f946104a9565b6104f3565b61052b565b90565b3461058b5761058761057661057036600461045d565b90610539565b61057e610291565b918291826103e7565b0390f35b610297565b906020828203126105a9576105a6915f016102ce565b90565b61029b565b5f0190565b346105e1576105cb6105c6366004610590565b6118f9565b6105d3610291565b806105dd816105ae565b0390f35b610297565b906020828203126105ff576105fc915f016102f4565b90565b61029b565b5190565b60209181520190565b90825f9392825e0152565b601f801991011690565b61064561064e6020936106539361063c81610604565b93848093610608565b95869101610611565b61061c565b0190565b61066c9160208201915f818403910152610626565b90565b3461069f5761069b61068a6106853660046105e6565b611a7f565b610692610291565b91829182610657565b0390f35b610297565b346106d3576106bd6106b736600461045d565b90611d23565b6106c5610291565b806106cf816105ae565b0390f35b610297565b5f80fd5b5f80fd5b5f80fd5b909182601f8301121561071e5781359167ffffffffffffffff831161071957602001926001830284011161071457565b6106e0565b6106dc565b6106d8565b9060808282031261077e5761073a815f84016102ce565b9261074882602085016102ce565b9261075683604083016102f4565b92606082013567ffffffffffffffff81116107795761077592016106e4565b9091565b61029f565b61029b565b61078c90610388565b9052565b91906107a3905f60208501940190610783565b565b346107d9576107d56107c46107bb366004610723565b93929092611e4b565b6107cc610291565b91829182610790565b0390f35b610297565b60808183031261081f576107f4825f83016102f4565b9261081c61080584602085016102ce565b9361081381604086016102ce565b936060016102f4565b90565b61029b565b34610856576108406108373660046107de565b929190916120c8565b610848610291565b80610852816105ae565b0390f35b610297565b90565b6108678161085b565b0361086e57565b5f80fd5b9050359061087f8261085e565b565b9060208282031261089a57610897915f01610872565b90565b61029b565b6108a89061085b565b9052565b91906108bf905f6020850194019061089f565b565b346108f1576108ed6108dc6108d7366004610881565b6121fb565b6108e4610291565b918291826108ac565b0390f35b610297565b909182601f830112156109305781359167ffffffffffffffff831161092b57602001926020830284011161092657565b6106e0565b6106dc565b6106d8565b9160a0838303126109d25761094c825f85016102ce565b9261095a83602083016102ce565b92604082013567ffffffffffffffff81116109cd578161097b9184016108f6565b929093606082013567ffffffffffffffff81116109c8578361099e9184016108f6565b929093608082013567ffffffffffffffff81116109c3576109bf92016106e4565b9091565b61029f565b61029f565b61029f565b61029b565b34610a0f576109f96109ea366004610935565b96959095949194939293612384565b610a01610291565b80610a0b816105ae565b0390f35b610297565b9190604083820312610a3c5780610a30610a39925f8601610872565b936020016102ce565b90565b61029b565b34610a7057610a5a610a54366004610a14565b9061253a565b610a62610291565b80610a6c816105ae565b0390f35b610297565b34610aa457610a8e610a88366004610a14565b906125ee565b610a96610291565b80610aa0816105ae565b0390f35b610297565b60031115610ab357565b5f80fd5b90503590610ac482610aa9565b565b909160c082840312610b2557610ade835f840161044e565b92610aec8160208501610ab7565b92610afa82604083016102ce565b92610b22610b0b84606085016102f4565b93610b1981608086016102f4565b9360a0016102ce565b90565b61029b565b34610b6157610b5d610b4c610b40366004610ac6565b94939093929192612879565b610b54610291565b9182918261033d565b0390f35b610297565b9091606082840312610b9b57610b98610b81845f85016102f4565b93610b8f81602086016102f4565b936040016102ce565b90565b61029b565b34610bcf57610bb9610bb3366004610b66565b916129ad565b610bc1610291565b80610bcb816105ae565b0390f35b610297565b9091606082840312610c0957610c06610bef845f85016102f4565b93610bfd81602086016102ce565b936040016102f4565b90565b61029b565b34610c3d57610c27610c21366004610bd4565b91612a90565b610c2f610291565b80610c39816105ae565b0390f35b610297565b909182601f83011215610c7c5781359167ffffffffffffffff8311610c77576020019260208302840111610c7257565b6106e0565b6106dc565b6106d8565b9091604082840312610cdb575f82013567ffffffffffffffff8111610cd65783610cac918401610c42565b929093602082013567ffffffffffffffff8111610cd157610ccd92016108f6565b9091565b61029f565b61029f565b61029b565b5190565b60209181520190565b60200190565b610cfc906102dd565b9052565b90610d0d81602093610cf3565b0190565b60200190565b90610d34610d2e610d2784610ce0565b8093610ce4565b92610ced565b905f5b818110610d445750505090565b909192610d5d610d576001928651610d00565b94610d11565b9101919091610d37565b610d7c9160208201915f818403910152610d17565b90565b34610db357610daf610d9e610d95366004610c81565b92919091612c63565b610da6610291565b91829182610d67565b0390f35b610297565b90602082820312610dd157610dce915f0161044e565b90565b61029b565b610ddf906103d5565b9052565b66ffffffffffffff1690565b610df890610de3565b9052565b610e05906102ae565b9052565b90606080610e4f93610e215f8201515f860190610dd6565b610e3360208201516020860190610dd6565b610e4560408201516040860190610def565b0151910190610dfc565b565b9190610e64905f60808501940190610e09565b565b34610e9657610e92610e81610e7c366004610db8565b612d26565b610e89610291565b91829182610e51565b0390f35b610297565b34610eca57610eb4610eae366004610bd4565b91612d83565b610ebc610291565b80610ec6816105ae565b0390f35b610297565b610ed8816103d5565b03610edf57565b5f80fd5b90503590610ef082610ecf565b565b9091606082840312610f2757610f24610f0d845f850161044e565b93610f1b81602086016102ce565b93604001610ee3565b90565b61029b565b34610f5b57610f45610f3f366004610ef2565b91612f57565b610f4d610291565b80610f57816105ae565b0390f35b610297565b610f6981610de3565b03610f7057565b5f80fd5b90503590610f8182610f60565b565b9091606082840312610fb857610fb5610f9e845f8501610f74565b93610fac8160208601610ee3565b93604001610ee3565b90565b61029b565b610fc690610431565b9052565b9190610fdd905f60208501940190610fbd565b565b346110105761100c610ffb610ff5366004610f83565b91613131565b611003610291565b91829182610fca565b0390f35b610297565b919060408382031261103d578061103161103a925f8601610872565b936020016102f4565b90565b61029b565b61104b906102ae565b9052565b9190611062905f60208501940190611042565b565b346110955761109161108061107a366004611015565b90613215565b611088610291565b9182918261104f565b0390f35b610297565b346110cb576110c76110b66110b0366004610a14565b9061323d565b6110be610291565b918291826103e7565b0390f35b610297565b5f80fd5b908160c09103126110e25790565b6110d0565b908160e09103126110f55790565b6110d0565b9160608383031261115e57611111825f85016102ce565b92602081013567ffffffffffffffff811161115957836111329183016110d4565b92604082013567ffffffffffffffff81116111545761115192016110e7565b90565b61029f565b61029f565b61029b565b346111945761119061117f6111793660046110fa565b9161359f565b611187610291565b918291826108ac565b0390f35b610297565b5f9103126111a357565b61029b565b90565b5f1b90565b6111c46111bf6111c9926111a8565b6111ab565b61085b565b90565b6111d55f6111b0565b90565b6111e06111cc565b90565b34611213576111f3366004611199565b61120f6111fe6111d8565b611206610291565b918291826108ac565b0390f35b610297565b9190604083820312611240578061123461123d925f86016102ce565b93602001610ee3565b90565b61029b565b346112745761125e611258366004611218565b9061363f565b611266610291565b80611270816105ae565b0390f35b610297565b346112a85761129261128c36600461045d565b90613743565b61129a610291565b806112a4816105ae565b0390f35b610297565b346112cc576112bd366004610935565b9695909594919493929361374f565b610297565b634e487b7160e01b5f52602160045260245ffd5b600311156112ef57565b6112d1565b906112fe826112e5565b565b611309906112f4565b90565b61131590611300565b9052565b61132290610431565b9052565b9060808061137e9361133e5f8201515f86019061130c565b61135060208201516020860190611319565b61136260408201516040860190610def565b61137460608201516060860190610dfc565b0151910190610cf3565b565b9190611393905f60a08501940190611326565b565b346113c5576113c16113b06113ab3660046105e6565b6137d5565b6113b8610291565b91829182611380565b0390f35b610297565b346113fa576113f66113e56113e0366004610881565b6137f4565b6113ed610291565b9182918261033d565b0390f35b610297565b60018060a01b031690565b61141a90600861141f9302610509565b6113ff565b90565b9061142d915461140a565b90565b61143c60085f90611422565b90565b611448906104db565b90565b6114549061143f565b9052565b919061146b905f6020850194019061144b565b565b3461149d5761147d366004611199565b611499611488611430565b611490610291565b91829182611458565b0390f35b610297565b346114d1576114bb6114b5366004610a14565b90613844565b6114c3610291565b806114cd816105ae565b0390f35b610297565b6114ef6114f4926114ea6007935f946104a9565b6104f3565b61052b565b90565b346115285761152461151361150d36600461045d565b906114d6565b61151b610291565b918291826103e7565b0390f35b610297565b91906040838203126115555780611549611552925f86016102ce565b936020016102ce565b90565b61029b565b3461158b5761158761157661157036600461152d565b90613850565b61157e610291565b918291826103e7565b0390f35b610297565b346115be576115a86115a3366004610881565b6138c7565b6115b0610291565b806115ba816105ae565b0390f35b610297565b608081830312611604576115d9825f830161044e565b926116016115ea8460208501610f74565b936115f88160408601610ee3565b93606001610ee3565b90565b61029b565b3461163b5761162561161c3660046115c3565b92919091613c09565b61162d610291565b80611637816105ae565b0390f35b610297565b3461166e57611658611653366004610590565b613cb2565b611660610291565b8061166a816105ae565b0390f35b610297565b91909160a0818403126116de5761168c835f83016102ce565b9261169a81602084016102ce565b926116a882604085016102f4565b926116b683606083016102f4565b92608082013567ffffffffffffffff81116116d9576116d592016106e4565b9091565b61029f565b61029b565b3461171a576117166117056116f9366004611673565b94939093929192613d26565b61170d610291565b91829182610790565b0390f35b610297565b346117545761173e611732366004611673565b94939093929192613d3f565b611746610291565b80611750816105ae565b0390f35b610297565b61dead90565b611767611759565b90565b3461179a5761177a366004611199565b61179661178561175f565b61178d610291565b9182918261104f565b0390f35b610297565b5f80fd5b5f90565b6117af6117a3565b50679a31110384e0b0c96020526014525f5260405f205490565b5f90565b6117d56117c9565b50806117e96117e35f610388565b91610388565b148015611823575b8015611814575b908115611804575b5090565b61180e9150613e98565b5f611800565b5061181e81613e6a565b6117f8565b508061183d6118376212e7c960ea1b610388565b91610388565b146117f1565b7f70649ec320b507febad3e8ef750e5f580b9ae32f9f50d4c7b121332c8197153090565b6118809061187b611876611843565b613ebf565b6118e4565b565b61188b906104bf565b90565b61189790611882565b90565b906118ab60018060a01b03916111ab565b9181191691161790565b6118be90611882565b90565b90565b906118d96118d46118e0926118b5565b6118c1565b825461189a565b9055565b6118f06118f79161188e565b60026118c4565b565b61190290611867565b565b606090565b5f1c90565b61191a61191f91611909565b6113ff565b90565b61192c905461190e565b90565b611938906104db565b90565b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b9061195d9061061c565b810190811067ffffffffffffffff82111761197757604052565b61193f565b60e01b90565b5f80fd5b90611999611992610291565b9283611953565b565b67ffffffffffffffff81116119b9576119b560209161061c565b0190565b61193f565b909291926119d36119ce8261199b565b611986565b938185526020850190828401116119ef576119ed92610611565b565b611982565b9080601f83011215611a1257816020611a0f935191016119be565b90565b6106d8565b90602082820312611a47575f82015167ffffffffffffffff8111611a4257611a3f92016119f4565b90565b61029f565b61029b565b916020611a6d929493611a6660408201965f830190611042565b0190610330565b565b611a77610291565b3d5f823e3d90fd5b611a87611904565b505f611a9b611a966008611922565b61143f565b9163a08206c992611ac7611aae3061192f565b9294611ad2611abb610291565b9687958694859461197c565b845260048401611a4c565b03915afa908115611b0a575f91611ae8575b5090565b611b0491503d805f833e611afc8183611953565b810190611a17565b5f611ae4565b611a6f565b90611b199061048d565b5f5260205260405f2090565b60481c90565b60018060a01b031690565b611b42611b4791611b25565b611b2b565b90565b611b549054611b36565b90565b90611b6d5f611b67846004611b0f565b01611b4a565b611b7f611b79336102ae565b916102ae565b03611b8f57611b8d91611c7c565b565b5f6282b42960e81b815280611ba6600482016105ae565b0390fd5b611bbe611bb9611bc3926111a8565b61048a565b6102a3565b90565b611bcf90611baa565b90565b5f7f41646d696e2063616e6e6f74206265207a65726f206164647265737300000000910152565b611c06601c602092610608565b611c0f81611bd2565b0190565b611c289060208101905f818303910152611bf9565b90565b90565b60481b90565b90611c4f6901000000000000000000600160e81b0391611c2e565b9181191691161790565b90565b90611c71611c6c611c78926104e7565b611c59565b8254611c34565b9055565b81611c97611c91611c8c5f611bc6565b6102ae565b916102ae565b14611d0057611cbc611cb3611cae60048490611b0f565b611c2b565b5f849101611c5c565b611cfb611ce97f494062b7b8bc451d8b05ed1f03a9ee335c1d068d8da6d3be4bc919521633ea079261048d565b92611cf2610291565b9182918261104f565b0390a2565b611d08610291565b631644cc7960e21b815280611d1f60048201611c13565b0390fd5b90611d2d91611b57565b565b5f90565b60a01c90565b611d45611d4a91611d33565b61050d565b90565b611d579054611d39565b90565b1b90565b91906008611d79910291611d7360ff84611d5a565b92611d5a565b9181191691161790565b611d8c906103d5565b90565b90565b9190611da8611da3611db093611d83565b611d8f565b908354611d5e565b9055565b611dc691611dc06117c9565b91611d92565b565b9493929190611de0611dda6008611d4d565b156103d5565b611dfc57611ded95611e34565b90611dfa60146008611db4565b565b5f631e4ec46b60e01b815280611e14600482016105ae565b0390fd5b611e2c611e27611e3192610431565b61197c565b610388565b90565b94505050505050611e4863150b7a02611e18565b90565b90611e6094939291611e5b611d2f565b611dc8565b90565b611e77611e72611e7c926102dd565b61048a565b6102dd565b90565b90611e8990611e63565b5f5260205260405f2090565b60ff1690565b611ea7611eac91611909565b611e95565b90565b611eb99054611e9b565b90565b90611ec6906112f4565b9052565b60081c90565b63ffffffff1690565b611ee5611eea91611eca565b611ed0565b90565b611ef79054611ed9565b90565b90611f0490610431565b9052565b60281c90565b66ffffffffffffff1690565b611f26611f2b91611f08565b611f0e565b90565b611f389054611f1a565b90565b90611f4590610de3565b9052565b60601c90565b611f5b611f6091611f49565b611b2b565b90565b611f6d9054611f4f565b90565b90611f7a906102ae565b9052565b90565b611f8d611f9291611909565b611f7e565b90565b611f9f9054611f81565b90565b90611fac906102dd565b9052565b611fba60a0611986565b90565b906120396120306001611fce611fb0565b94611fe5611fdd5f8301611eaf565b5f8801611ebc565b611ffc611ff35f8301611eed565b60208801611efa565b61201361200a5f8301611f2e565b60408801611f3b565b61202a6120215f8301611f63565b60608801611f70565b01611f95565b60808401611fa2565b565b61204490611fbd565b90565b61205190516112f4565b90565b61205e90516102ae565b90565b61206b90516102dd565b90565b6120789051610431565b90565b909594926120c6946120b56120bf926120ab6080966120a160a088019c5f890190610330565b6020870190610330565b6040850190611042565b6060830190611042565b0190611042565b565b919290926120e06120db60058590611e7f565b61203b565b926120ec848390613ed3565b6120f885828591613ffa565b6121316121065f8601612047565b61211260608701612054565b61211b3061192f565b859061212960808a01612061565b928894614124565b9061213e6020850161206e565b926121ac61215a608061215360608901612054565b9701612061565b9192339761219a61219461218e7f79d388da9ec1f72c92bb2ad45ecebde289617a02bb7f444080c4f946b87584ad98611e63565b9861048d565b986104e7565b986121a3610291565b9586958661207b565b0390a4565b5f90565b6121be9061085b565b90565b906121cb906121b5565b5f5260205260405f2090565b90565b6121e66121eb91611909565b6121d7565b90565b6121f890546121da565b90565b60016122136122199261220c6121b1565b505f6121c1565b016121ee565b90565b5090565b61223461222f612239926111a8565b61048a565b6102dd565b90565b634e487b7160e01b5f52603260045260245ffd5b9190811015612260576020020190565b61223c565b3561226f816102e0565b90565b61227e61228391611909565b61050d565b90565b6122909054612272565b90565b9061229d906103d5565b9052565b6122ad6122b291611eca565b61050d565b90565b6122bf90546122a1565b90565b60101c90565b6122d46122d9916122c2565b611f0e565b90565b6122e690546122c8565b90565b6122f36080611986565b90565b9061235a6123515f6123066122e9565b9461231d612315838301612286565b838801612293565b61233461232b8383016122b5565b60208801612293565b61234b6123428383016122dc565b60408801611f3b565b01611b4a565b60608401611f70565b565b612365906122f6565b90565b61237290516103d5565b90565b600161238191016102dd565b90565b9792949691939695909561239985879061221c565b976123a35f612220565b5b806123b76123b18c6102dd565b916102dd565b10156124f5576123e36123de6123d76123d28a8c8691612250565b612265565b6005611e7f565b61203b565b61241561240f602061240961240460046123fe84880161206e565b90611b0f565b61235c565b01612368565b156103d5565b612429575b5061242490612375565b6123a4565b61246e9061245661245161244a60076124446020860161206e565b906104a9565b33906104f3565b612286565b8d81156124c5575b50908115612493575b50156103d5565b612478575f61241a565b5f6282b42960e81b81528061248f600482016105ae565b0390fd5b6124bf91506124b36124ba916124ad60206007920161206e565b906104a9565b8c906104f3565b612286565b5f612467565b6124ef91506124ea906124e560076124df6020870161206e565b906104a9565b6104f3565b612286565b8d61245e565b509295919490939861250f985096909192939495966144b6565b565b9061252c91612527612522826121fb565b613ebf565b61252e565b565b906125389161471c565b565b9061254491612511565b565b60207f20726f6c657320666f722073656c660000000000000000000000000000000000917f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e63655f8201520152565b6125a0602f604092610608565b6125a981612546565b0190565b6125c29060208101905f818303910152612593565b90565b156125cc57565b6125d4610291565b62461bcd60e51b8152806125ea600482016125ad565b0390fd5b9061261b916126168261261061260a612605614746565b6102ae565b916102ae565b146125c5565b614753565b565b634e487b7160e01b5f52601160045260245ffd5b61263a906102dd565b5f1981146126485760010190565b61261d565b906126595f19916111ab565b9181191691161790565b90565b9061267b61267661268292611e63565b612663565b825461264d565b9055565b61269a61269561269f926102dd565b61048a565b610de3565b90565b6126ac60a0611986565b90565b906126bb60ff916111ab565b9181191691161790565b6126ce906112f4565b90565b90565b906126e96126e46126f0926126c5565b6126d1565b82546126af565b9055565b60081b90565b9061270a64ffffffff00916126f4565b9181191691161790565b90565b9061272c6127276127339261048d565b612714565b82546126fa565b9055565b6127419051610de3565b90565b60281b90565b906127616bffffffffffffff000000000091612744565b9181191691161790565b61277f61277a61278492610de3565b61048a565b610de3565b90565b90565b9061279f61279a6127a69261276b565b612787565b825461274a565b9055565b60601b90565b906127c86bffffffffffffffffffffffff19916127aa565b9181191691161790565b906127e76127e26127ee926104e7565b611c59565b82546127b0565b9055565b906128656080600161286b946128155f820161280f5f8801612047565b906126d4565b61282d5f82016128276020880161206e565b90612717565b6128455f820161283f60408801612737565b9061278a565b61285d5f820161285760608801612054565b906127d2565b019201612061565b90612666565b565b90612877916127f2565b565b9095949193926128876117a3565b5061289e5f61289860048590611b0f565b01611b4a565b6128b86128b26128ad5f611bc6565b6102ae565b916102ae565b1461299157846128d86128d26128cd3061192f565b6102ae565b916102ae565b146129755761297394612949612952926129406128f56009611f95565b61290861290182612631565b6009612666565b9a959361293761291742612686565b91939561292e6129256126a2565b995f8b01611ebc565b60208901611efa565b60408701611f3b565b60608501611f70565b60808301611fa2565b916129688361296360058990611e7f565b61286d565b3386909192936147ea565b565b5f63289aef6960e01b81528061298d600482016105ae565b0390fd5b5f63ec55b8cd60e01b8152806129a9600482016105ae565b0390fd5b90916129c36129be60058490611e7f565b61203b565b926129d060608501612054565b6129ea6129e46129df5f611bc6565b6102ae565b916102ae565b14612a01576129ff93339093909192936147ea565b565b5f63289aef6960e01b815280612a19600482016105ae565b0390fd5b612a31612a2c612a3692610de3565b61048a565b6102dd565b90565b612a48612a4e919392936102dd565b926102dd565b8203918211612a5957565b61261d565b604090612a87612a8e9496959396612a7d60608401985f850190610330565b6020830190610330565b0190611042565b565b90612aa5612aa060058490611e7f565b61203b565b91612ac5612ac06004612aba6020870161206e565b90611b0f565b61235c565b91339281612adb612ad5866102ae565b916102ae565b14155f14612bfa5750612b16612b10612b0b612b046006612afe60208a0161206e565b906104a9565b86906104f3565b612286565b156103d5565b612bdf57612b61905b612b2b81848891613ffa565b612b365f8601612047565b90612b4360608701612054565b90612b4d3061192f565b612b5960808901612061565b928994614124565b612b6d6020840161206e565b91612b866080612b7f60608701612054565b9501612061565b949094612bda612bc8612bc2612bbc7f543d9c4418306f14a6565ce3230cee3f00a80b98413e3d65f7353d341165111f96611e63565b9661048d565b966104e7565b96612bd1610291565b93849384612a5e565b0390a4565b5f6282b42960e81b815280612bf6600482016105ae565b0390fd5b612c34612c2e612c296040612c2242612c1c612c17848d01612737565b612a1d565b90612a39565b9401612737565b612a1d565b916102dd565b10612c4257612b6190612b1f565b5f635a8181f760e01b815280612c5a600482016105ae565b0390fd5b606090565b93929190612c6f612c5e565b508203612cc45760405193828552602085019260051b808481016040525b612c975750505050565b602090038082013560601b679a31110384e0b0c917602052808301355f528060405f205481860152612c8d565b633b800a465f526004601cfd5b5f90565b5f90565b5f90565b612ce56122e9565b90602080808085612cf4612cd1565b815201612cff612cd1565b815201612d0a612cd5565b815201612d15612cd9565b81525050565b612d23612cdd565b90565b612d3d612d4291612d35612d1b565b506004611b0f565b61235c565b90565b612d7a612d8194612d70606094989795612d66608086019a5f870190610330565b6020850190610330565b6040830190611042565b0190611042565b565b9091612d99612d9460058490611e7f565b61203b565b91612da5838590613ed3565b612dde612db35f8501612047565b612dbf60608601612054565b612dc83061192f565b8790612dd660808901612061565b928794614124565b612dea6020840161206e565b91612e036080612dfc60608701612054565b9501612061565b612e563396612e44612e3e612e387fff2df8e90ff02a2d9db7e04f8d968de07ea64c191ae43ce45a5f9405b959e84797611e63565b9761048d565b976104e7565b97612e4d610291565b94859485612d45565b0390a4565b9190612e725f612e6c856004611b0f565b01611b4a565b612e84612e7e336102ae565b916102ae565b03612e9457612e9292612ef2565b565b5f6282b42960e81b815280612eab600482016105ae565b0390fd5b90612ec4612ebf612ecb92611d83565b611d8f565b82546126af565b9055565b916020612ef0929493612ee960408201965f830190611042565b01906103da565b565b612f1183612f0c612f05600685906104a9565b85906104f3565b612eaf565b9091612f3d7f08604e26c94fed86de887d5d0a56997e442e546486d109bea3f0702ac0b94eee9261048d565b92612f52612f49610291565b92839283612ecf565b0390a2565b90612f629291612e5b565b565b5f90565b60a81c90565b612f7a612f7f91612f68565b611ed0565b90565b612f8c9054612f6e565b90565b612f9890610431565b63ffffffff8114612fa95760010190565b61261d565b60a81b90565b90612fc663ffffffff60a81b91612fae565b9181191691161790565b90612fe5612fe0612fec9261048d565b612714565b8254612fb4565b9055565b612ffa6080611986565b90565b9061300a61ff00916126f4565b9181191691161790565b9061302961302461303092611d83565b611d8f565b8254612ffd565b9055565b60101b90565b9061304e68ffffffffffffff000091613034565b9181191691161790565b9061306d6130686130749261276b565b612787565b825461303a565b9055565b906130d260605f6130d89461309a828201613094848801612368565b90612eaf565b6130b28282016130ac60208801612368565b90613014565b6130ca8282016130c460408801612737565b90613058565b019201612054565b90611c5c565b565b906130e491613078565b565b6130ef90610de3565b9052565b61312861312f9461311e606094989795613114608086019a5f870190611042565b60208501906130e6565b60408301906103da565b01906103da565b565b9291909261313d612f64565b506131486008612f82565b61315b61315482612f8f565b6008612fd0565b9333916131af8261319e866131958561318c899361318361317a612ff0565b975f8901612293565b60208701612293565b60408501611f3b565b60608301611f70565b6131aa60048990611b0f565b6130da565b6131f386939192946131e17f62199a0444637449109e0b9ef5b357250c44db005c5cf82caacfa6a04d95345a9561048d565b956131ea610291565b948594856130f3565b0390a2565b5f90565b90613206906121b5565b5f5260205260405f2090565b90565b9061323561323061323a936132286131f8565b5060016131fc565b613212565b614905565b90565b613263915f61325861325e936132516117c9565b50826121c1565b016104f3565b612286565b90565b60018060a01b031690565b61327d61328291611909565b613266565b90565b61328f9054613271565b90565b61329b906104db565b90565b905051906132ab8261085e565b565b906020828203126132c6576132c3915f0161329e565b90565b61029b565b506132da9060208101906102ce565b90565b506132ec9060208101906103a8565b90565b6132f890610388565b9052565b5061330b906020810190610872565b90565b6133179061085b565b9052565b5f80fd5b5f80fd5b5f80fd5b903560016020038236030381121561336857016020813591019167ffffffffffffffff821161336357600182023603831361335e57565b61331f565b61331b565b613323565b60209181520190565b90825f939282370152565b919061339b81613394816133a09561336d565b8095613376565b61061c565b0190565b90356001604003823603038112156133ba570190565b613323565b903560016020038236030381121561340057016020813591019167ffffffffffffffff82116133fb5760018202360383136133f657565b61331f565b61331b565b613323565b60209181520190565b9190613428816134218161342d95613405565b8095613376565b61061c565b0190565b67ffffffffffffffff1690565b61344781613431565b0361344e57565b5f80fd5b9050359061345f8261343e565b565b50613470906020810190613452565b90565b61347c90613431565b9052565b906134bc9060206134b46134aa6040840161349d5f8801886133bf565b908683035f88015261340e565b9482810190613461565b910190613473565b90565b6135679161355961354e60c083016134e56134dc5f8701876132cb565b5f860190610dfc565b6134ff6134f560208701876132dd565b60208601906132ef565b61351961350f60408701876132fc565b604086019061330e565b61353361352960608701876132fc565b606086019061330e565b6135406080860186613327565b908583036080870152613381565b9260a08101906133a4565b9060a0818403910152613480565b90565b93929061359560409161359d9461358860608901925f8a0190611042565b87820360208901526134bf565b94019061089f565b565b91506020906135ac6121b1565b506135bf6135ba6002613285565b613292565b6135eb633808a90b9492946135f66135d760036121ee565b6135df610291565b9788968795869561197c565b85526004850161356a565b03915afa90811561363a575f9161360c575b5090565b61362d915060203d8111613633575b6136258183611953565b8101906132ad565b5f613608565b503d61361b565b611a6f565b901515679a31110384e0b0c960205233601452815f52806034600c20555f5260601b60601c337f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160205fa3565b906136a25f61369c846004611b0f565b01611b4a565b6136b46136ae336102ae565b916102ae565b036136c4576136c2916136df565b565b5f6282b42960e81b8152806136db600482016105ae565b0390fd5b6136ff60016136fa6136f3600785906104a9565b85906104f3565b612eaf565b61373e61372c7fc6133cf134aa77933f3932bfc07d48d996beb1b915060227a25039eaba1136ec9261048d565b92613735610291565b9182918261104f565b0390a2565b9061374d9161368c565b565b613757611d2f565b505f631e4ec46b60e01b815280613770600482016105ae565b0390fd5b5f90565b5f90565b5f90565b613788611fb0565b9060208080808086613798613774565b8152016137a3613778565b8152016137ae612cd5565b8152016137b9612cd9565b8152016137c461377c565b81525050565b6137d2613780565b90565b6137ec6137f1916137e46137ca565b506005611e7f565b61203b565b90565b61381361380e613818926138066117a3565b5060016131fc565b613212565b61493d565b90565b906138369161383161382c826121fb565b613ebf565b613838565b565b9061384291614753565b565b9061384e9161381b565b565b6138586117c9565b50679a31110384e0b0c96020526014525f526034600c205490565b61388c90613887613882611843565b613ebf565b6138ba565b565b61389790611909565b90565b906138af6138aa6138b6926121b5565b61388e565b825461264d565b9055565b6138c590600361389a565b565b6138d090613873565b565b9291906138ea5f6138e4866004611b0f565b01611b4a565b6138fc6138f6336102ae565b916102ae565b0361390c5761390a93613aaf565b565b5f6282b42960e81b815280613923600482016105ae565b0390fd5b60207f7365000000000000000000000000000000000000000000000000000000000000917f4475726174696f6e206d75737420626520657175616c206f72206465637265615f8201520152565b6139816022604092610608565b61398a81613927565b0190565b6139a39060208101905f818303910152613974565b90565b60207f6e6c790000000000000000000000000000000000000000000000000000000000917f43616e6e6f74206368616e67652066726f6d206465737472756374696f6e206f5f8201520152565b613a006023604092610608565b613a09816139a6565b0190565b613a229060208101905f8183039101526139f3565b90565b5f7f43616e6e6f74206368616e67652066726f6d207472616e73666572206f70656e910152565b613a5860208092610608565b613a6181613a25565b0190565b613a7a9060208101905f818303910152613a4c565b90565b604090613aa6613aad9496959396613a9c60608401985f8501906130e6565b60208301906103da565b01906103da565b565b92909192613ac7613ac260048390611b0f565b611c2b565b83613ae4613ade613ad95f85016122dc565b610de3565b91610de3565b11613be657613af45f8201612286565b80613bd6575b613bb357613b095f82016122b5565b80613ba3575b613b8057613b3890613b23855f8301613058565b613b2f865f8301612eaf565b5f849101613014565b91929092613b7b613b697fdf5c5dca5b4a6d52c543b91e2816adb0940818fa2311c7f951535389ba60721a9461048d565b94613b72610291565b93849384613a7d565b0390a2565b613b88610291565b631644cc7960e21b815280613b9f60048201613a65565b0390fd5b50613bae83156103d5565b613b0f565b613bbb610291565b631644cc7960e21b815280613bd260048201613a0d565b0390fd5b50613be185156103d5565b613afa565b613bee610291565b631644cc7960e21b815280613c056004820161398e565b0390fd5b90613c159392916138d2565b565b7fe02a0315b383857ac496e9d2b2546a699afaeb4e5e83a1fdef64376d0b74e5a590565b613c5490613c4f613c4a613c17565b613ebf565b613c9d565b565b613c5f906104bf565b90565b613c6b90613c56565b90565b613c7790613c56565b90565b90565b90613c92613c8d613c9992613c6e565b613c7a565b825461189a565b9055565b613ca9613cb091613c62565b6008613c7d565b565b613cbb90613c3b565b565b959493929190613cd6613cd06008611d4d565b156103d5565b613cf257613ce396613d0e565b90613cf060146008611db4565b565b5f631e4ec46b60e01b815280613d0a600482016105ae565b0390fd5b9550505050505050613d2363f23a6e61611e18565b90565b90613d3c9594939291613d37611d2f565b613cbd565b90565b9492909391613d58613d5360058390611e7f565b61203b565b613d8a613d846020613d7e613d796004613d7384880161206e565b90611b0f565b61235c565b01612368565b156103d5565b613da1575b50613d9f9594909192939461495c565b565b613de490613dce613dc9613dc26007613dbc6020860161206e565b906104a9565b33906104f3565b612286565b8015613e3b575b908115613e09575b50156103d5565b613dee575f613d8f565b5f6282b42960e81b815280613e05600482016105ae565b0390fd5b613e359150613e29613e3091613e2360206007920161206e565b906104a9565b88906104f3565b612286565b5f613ddd565b50613e65613e60613e596007613e536020860161206e565b906104a9565b8a906104f3565b612286565b613dd5565b613e726117c9565b50613e7c81614b1f565b908115613e88575b5090565b613e929150614b5f565b5f613e84565b613ea06117c9565b5060e01c630e89341c8114906301ffc9a763d9b67a2682149114171790565b613ed190613ecb614746565b90614c97565b565b613ef2613eed6004613ee76020850161206e565b90611b0f565b61235c565b90613f25613f1f613f1a613f136006613f0d6020870161206e565b906104a9565b33906104f3565b612286565b156103d5565b613fdf57613f4890613f42613f3d6040429301612737565b612a1d565b90612a39565b613f65613f5f613f5a60408501612737565b612a1d565b916102dd565b1015613fc3575f613f769101612368565b9081613fa0575b50613f8457565b5f631e4ec46b60e01b815280613f9c600482016105ae565b0390fd5b9050613fbb613fb5613fb0611759565b6102ae565b916102ae565b14155f613f7d565b5f63207acd5760e01b815280613fdb600482016105ae565b0390fd5b5f6282b42960e81b815280613ff6600482016105ae565b0390fd5b9091614012926140095f611bc6565b92909192614d30565b565b90565b61402b61402661403092614014565b61048a565b6102dd565b90565b61403c906104bf565b90565b61404890614033565b90565b614054906104db565b90565b5f91031261406157565b61029b565b60409061408f614096949695939661408560608401985f850190611042565b6020830190611042565b0190610330565b565b6140a1906104bf565b90565b6140ad90614098565b90565b6140b9906104db565b90565b60209181520190565b6140d05f80926140bc565b0190565b919361410a6141149294614100614121976140f660a08801985f890190611042565b6020870190611042565b6040850190610330565b6060830190610330565b60808183039101526140c5565b90565b94909193948061413d61413760026112f4565b916112f4565b145f1461420f575090816141596141535f612220565b916102dd565b146141f35761416a61416f916140a4565b6140b0565b9063f242432a93929490823b156141ee575f946141aa869261419f94614193610291565b998a988997889661197c565b8652600486016140d4565b03925af180156141e9576141bd575b505b565b6141dc905f3d81116141e2575b6141d48183611953565b810190614057565b5f6141b9565b503d6141ca565b611a6f565b61193b565b5f63289aef6960e01b81528061420b600482016105ae565b0390fd5b8061422361421d60016112f4565b916112f4565b145f146142f5575061423e6142386001614017565b916102dd565b036142d95761424f6142549161403f565b61404b565b6342842e0e92919392813b156142d4575f6142829161428d8296614276610291565b9889978896879561197c565b855260048501614066565b03925af180156142cf576142a3575b505b6141bb565b6142c2905f3d81116142c8575b6142ba8183611953565b810190614057565b5f61429c565b503d6142b0565b611a6f565b61193b565b5f63289aef6960e01b8152806142f1600482016105ae565b0390fd5b94909293919461430d6143075f6112f4565b916112f4565b145f146143b1576143266143205f612220565b916102dd565b14158015614397575b61437b578061434e6143486143433061192f565b6102ae565b916102ae565b145f14614368575061436292919091614e8d565b5b61429e565b916143769392909192614e2e565b614363565b5f63289aef6960e01b815280614393600482016105ae565b0390fd5b50816143ab6143a55f612220565b916102dd565b1461432f565b5f63289aef6960e01b8152806143c9600482016105ae565b0390fd5b67ffffffffffffffff81116143e55760208091020190565b61193f565b909291926143ff6143fa826143cd565b611986565b938185526020808601920283019281841161443c57915b8383106144235750505050565b6020809161443184866102f4565b815201920191614416565b6106e0565b61444c9136916143ea565b90565b67ffffffffffffffff811161446d5761446960209161061c565b0190565b61193f565b909291926144876144828261444f565b611986565b938185526020850190828401116144a3576144a192613376565b565b611982565b6144b3913691614472565b90565b9693969590949192956144c7614edf565b6146f3575b8287036146e65760601b679a31110384e0b0c9179460601b679a31110384e0b0c91791856020528560601c958360601c9384156146d9578733036146bf575b8860051b805b61466457505050828660207f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb604051604081528b8d8160051b948286936040860152838d6060870137836060018286015260608486010190815201376080339380010190a461457e614eec565b614647575b50813b614594575b50505050505050565b602080809786945f528060c06040519b8c9a63bc197c818c5233868d015260408c015260a060608c01528a8360051b998a9586948593015260e08d01378160c00160808c015260e0828c010192835284830137818060e0010160a08a01520101838152013780010161010401601c604051015f80515af115614639575b63bc197c8160e01b90510361462c575f80808080808061458b565b639c05499b5f526004601cfd5b3d15614611573d5f823e3d90fd5b61465e908690849086908a8c919287948b96614ef9565b5f614583565b60209003808b013583602052818801355f5260405f2080548083116146b25782900390558260205260405f209081549081019081106146a557829155614511565b6301336cea5f526004601cfd5b63f4d678b85f526004601cfd5b335f526034600c205461450b57634b6e7f185f526004601cfd5b63ea553b345f526004601cfd5b633b800a465f526004601cfd5b61471684886147108b879061470a88948c96614441565b50614441565b506144a8565b506144cc565b9061473e61473961474393614732818590614f43565b60016131fc565b613212565b615028565b50565b61474e6131f8565b503390565b9061477561477061477a93614769818590615062565b60016131fc565b613212565b6150f9565b50565b60a01b90565b9061479260ff60a01b9161477d565b9181191691161790565b906147b16147ac6147b892611d83565b611d8f565b8254614783565b9055565b906147ce6147c98361199b565b611986565b918252565b6147dc5f6147bc565b90565b6147e76147d3565b90565b9291906147f96001600861479c565b6148326148075f8601612047565b61481360608701612054565b8461481d3061192f565b9061482a60808a01612061565b928894614124565b61483e60146008611db4565b6148538582859061484d6147df565b92615133565b906148606020850161206e565b926148cd61487c608061487560608901612054565b9701612061565b9192966148bb6148b56148af7f161a59b5b1e2328279324f3f76b54f33d0f0a695c4d3c8264fb38a91041168f797611e63565b9761048d565b976104e7565b976148c4610291565b94859485612d45565b0390a4565b90565b6148e16148e691611909565b611e63565b90565b6148fd6148f8614902926102dd565b61048a565b6102a3565b90565b61493061492b61493a936149265f6149359561491f6131f8565b50016148d2565b615289565b6148d5565b6148e9565b6104db565b90565b6149545f6149599261494d6117a3565b50016148d2565b6152aa565b90565b94909194614968614edf565b614afa575b60601b679a31110384e0b0c9179160601b679a31110384e0b0c917918060205260601c928260601c928315614aed57843303614ad3575b865f5260405f208054808411614ac657839003905560205260405f20805490828201918210614ab95755806020528284337fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6260405fa4614a02614eec565b614a94575b823b614a16575b505050505050565b602094829160405197889663f23a6e618852338989015260408801526060870152608086015260a0808601528160c086015260e085013760c401905f601c8401915af115614a86575b63f23a6e6160e01b905103614a79575f8080808080614a0e565b639c05499b5f526004601cfd5b3d15614a5f573d5f823e3d90fd5b614a9d866152c1565b50614aa7816152c1565b50614ab38583906144a8565b50614a07565b6301336cea5f526004601cfd5b63f4d678b85f526004601cfd5b335f526034600c20546149a457634b6e7f185f526004601cfd5b63ea553b345f526004601cfd5b614b03866152c1565b50614b0d846152c1565b50614b198583906144a8565b5061496d565b614b276117c9565b5080614b42614b3c635a05180f60e01b610388565b91610388565b14908115614b4f575b5090565b614b5991506152e1565b5f614b4b565b614b676117c9565b5080614b82614b7c634e821d3360e11b610388565b91610388565b14908115614b8f575b5090565b614b999150614b1f565b5f614b8b565b90565b614bb6614bb1614bbb92614b9f565b61048a565b6102dd565b90565b905090565b5f7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000910152565b614bf660178092614bbe565b614bff81614bc3565b0190565b614c28614c1f92602092614c1681610604565b94858093614bbe565b93849101610611565b0190565b5f7f206973206d697373696e6720726f6c6520000000000000000000000000000000910152565b614c5f60118092614bbe565b614c6881614c2c565b0190565b614c86614c919392614c80614c8b93614bea565b90614c03565b614c53565b90614c03565b90565b90565b90614cac614ca683839061323d565b156103d5565b614cb4575050565b614d2c91614d0a614ce3614cd3614ccd614d0f9561536f565b936148d5565b614cdd6020614ba2565b906155c0565b91614cfb614cef610291565b93849260208401614c6c565b60208201810382520382611953565b614c94565b614d17610291565b91829162461bcd60e51b835260048301610657565b0390fd5b90929192614d3c614edf565b614e0c575b60601b9081679a31110384e0b0c917602052818160601b148160601b151715614dec575b50825f5260405f2090815491828411614ddf57835f930390558260205260601c337fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62604084a4614db3614eec565b614dbc575b5050565b614dc8614dce926152c1565b506152c1565b50614dd76147df565b505f80614db8565b63f4d678b85f526004601cfd5b5f526034600c205415614dff575f614d65565b634b6e7f185f526004601cfd5b614e15846152c1565b50614e1f836152c1565b50614e286147df565b50614d41565b916040519360605260405260601b602c526323b872dd60601b600c5260205f6064601c82855af1908160015f51141615614e6e575b50505f606052604052565b3d903b15171015614e80575f80614e63565b637939f4245f526004601cfd5b919060145260345263a9059cbb60601b5f5260205f6044601082855af1908160015f51141615614ec0575b50505f603452565b3d903b15171015614ed2575f80614eb8565b6390b8ec185f526004601cfd5b614ee76117c9565b505f90565b614ef46117c9565b505f90565b50509492939093614f08614eec565b614f15575b505050505050565b614f2b614f3193614f3797969092939596614441565b50614441565b506144a8565b505f8080808080614f0d565b614f57614f5182849061323d565b156103d5565b614f60575b5050565b614f816001614f7c5f614f748186906121c1565b0185906104f3565b612eaf565b90614f8a614746565b90614fc7614fc1614fbb7f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d956121b5565b926104e7565b926104e7565b92614fd0610291565b80614fda816105ae565b0390a45f80614f5c565b614fed906104bf565b90565b615004614fff615009926102a3565b61048a565b6102dd565b90565b61502061501b615025926102dd565b6111ab565b61085b565b90565b9061505a61505461504f61504a5f61505f966150426117c9565b500194614fe4565b614ff0565b61500c565b916148d2565b6157d1565b90565b61506d81839061323d565b615076575b5050565b6150965f6150915f6150898186906121c1565b0185906104f3565b612eaf565b9061509f614746565b906150dc6150d66150d07ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b956121b5565b926104e7565b926104e7565b926150e5610291565b806150ef816105ae565b0390a45f80615072565b9061512b61512561512061511b5f615130966151136117c9565b500194614fe4565b614ff0565b61500c565b916148d2565b6158c1565b90565b9192909261513f614edf565b615215575b8260601b801561520857679a31110384e0b0c960205283601452845f5260405f208054908382019182106151fb57558160205260601c5f337fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62604083a46151a9614eec565b6151e2575b6151b7836159c7565b6151c2575b50505050565b6151d9936151cf5f611bc6565b93909192936159d4565b5f8080806151bc565b6151eb846152c1565b506151f5816152c1565b506151ae565b6301336cea5f526004601cfd5b63ea553b345f526004601cfd5b61521e846152c1565b50615228816152c1565b50615144565b5490565b5f5260205f2090565b6152448161522e565b82101561525e57615256600191615232565b910201905f90565b61223c565b6152739060086152789302610509565b6121d7565b90565b906152869154615263565b90565b6152a7915f6152a19261529a6121b1565b500161523b565b9061527b565b90565b5f6152be916152b76117a3565b500161522e565b90565b906152ca612c5e565b506040519160408301604052600183526020830152565b6152e96117c9565b50806153046152fe637965db0b60e01b610388565b91610388565b14908115615311575b5090565b61531b9150615a6a565b5f61530d565b90565b60ff1690565b61533e61533961534392615321565b61048a565b615324565b90565b615350601461532a565b90565b61536761536261536c92615324565b61048a565b6102dd565b90565b61538c6153876153a292615381611904565b50614fe4565b614ff0565b61539c615397615346565b615353565b906155c0565b90565b90565b6153bc6153b76153c1926153a5565b61048a565b6102dd565b90565b6153d36153d9919392936102dd565b926102dd565b916153e58382026102dd565b9281840414901517156153f457565b61261d565b61540861540e919392936102dd565b926102dd565b820180921161541957565b61261d565b9061543061542b8361444f565b611986565b918252565b369037565b9061545f6154478361541e565b92602080615455869361444f565b9201910390615435565b565b600360fc1b90565b5190565b9061547782615469565b81101561548957600160209102010190565b61223c565b600f60fb1b90565b61549f906102dd565b5f81146154ad576001900390565b61261d565b6f181899199a1a9b1b9c1cb0b131b232b360811b90565b6154d16154b2565b90565b90565b6154eb6154e66154f0926154d4565b61048a565b6102dd565b90565b60f81b90565b90565b61551061550b615515926154f9565b61048a565b615324565b90565b6155379061553161552b61553c94615324565b916102dd565b90610509565b6102dd565b90565b5f7f537472696e67733a20686578206c656e67746820696e73756666696369656e74910152565b61557260208092610608565b61557b8161553f565b0190565b6155949060208101905f818303910152615566565b90565b1561559e57565b6155a6610291565b62461bcd60e51b8152806155bc6004820161557f565b0390fd5b91906155ca611904565b506156616156516156006155fb6155eb60026155e687916153a8565b6153c4565b6155f560026153a8565b906153f9565b61543a565b92615609615461565b6156208561561a5f935f1a93612220565b9061546d565b5361562961548e565b6156418561563b6001935f1a93614017565b9061546d565b5361564c60026153a8565b6153c4565b61565b6001614017565b906153f9565b925b836156776156716001614017565b916102dd565b11156156dd576156856154c9565b81615690600f6154d7565b169160108310156156d8576156ac6156cc926156d2941a6154f3565b6156bb859188905f1a9261546d565b536156c660046154fc565b90615518565b93615496565b92615663565b61223c565b6157049293506156ff906156f96156f35f612220565b916102dd565b14615597565b614c94565b90565b90565b5f5260205f2090565b5490565b61572081615713565b82101561573a5761573260019161570a565b910201905f90565b61223c565b9190600861575a9102916157545f1984611d5a565b92611d5a565b9181191691161790565b919061577a615775615782936121b5565b61388e565b90835461573f565b9055565b90815491680100000000000000008310156157b657826157ae9160016157b495018155615717565b90615764565b565b61193f565b906157c5906121b5565b5f5260205260405f2090565b6157d96117c9565b506157ee6157e8828490615a90565b156103d5565b5f1461582e57615824615829926158106158095f8501615707565b8290615786565b600161581d5f850161522e565b93016157bb565b612666565b600190565b50505f90565b634e487b7160e01b5f52603160045260245ffd5b61585a916158546121b1565b91615764565b565b61586581615713565b801561588657600190039061588361587d8383615717565b90615848565b55565b615834565b91906158a161589c6158a993611e63565b612663565b90835461573f565b9055565b6158bf916158b96117a3565b9161588b565b565b6158c96117c9565b506158e06158db6001830184906157bb565b611f95565b90816158f46158ee5f612220565b916102dd565b14155f146159c05761597292600161596d928461591b5f9661591585614017565b90612a39565b61593861592988850161522e565b61593286614017565b90612a39565b8061594b615945846102dd565b916102dd565b03615977575b505050615967615962868301615707565b61585c565b016157bb565b6158ad565b600190565b6159b8926159aa6159966159906159b3948c890161523b565b9061527b565b936159a485918c890161523b565b90615764565b918585016157bb565b612666565b5f8080615951565b5050505f90565b6159cf6117c9565b503b90565b919360209360405195869463f23a6e618652338787015260601b60601c60408601526060850152608084015260a08084015280518091818060c0870152615a56575b505060c401905f601c8401915af115615a48575b63f23a6e6160e01b905103615a3b57565b639c05499b5f526004601cfd5b3d15615a2a573d5f823e3d90fd5b818660e08701920160045afa50805f615a16565b615a726117c9565b50615a8c615a866301ffc9a760e01b610388565b91610388565b1490565b615aae916001615aa992615aa26117c9565b50016157bb565b611f95565b615ac0615aba5f612220565b916102dd565b14159056fea2646970667358221220af7fae341c37cc9397cf42a3229a0b7b624e021a0d6f39a8e2d5a4d6eca3ee3564736f6c634300081b0033',
      signer
    )
  }
}

export const CLAWBACK_VERIFICATION: Omit<VerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'src/tokens/wrappers/clawback/Clawback.sol:Clawback',
  version: 'v0.8.27+commit.40a35a09',
  licenceType: 'Apache-2.0',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'src/tokens/wrappers/clawback/Clawback.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.19;\n\nimport { IERC721Transfer } from "../../common/IERC721Transfer.sol";\nimport { IMetadataProvider } from "../../common/IMetadataProvider.sol";\nimport { SignalsImplicitModeControlled } from "../../common/SignalsImplicitModeControlled.sol";\nimport { IClawback, IClawbackFunctions } from "./IClawback.sol";\n\nimport { ERC1155 } from "solady/tokens/ERC1155.sol";\nimport { SafeTransferLib } from "solady/utils/SafeTransferLib.sol";\n\ncontract Clawback is ERC1155, IClawback, SignalsImplicitModeControlled {\n\n    bytes32 internal constant METADATA_ADMIN_ROLE = keccak256("METADATA_ADMIN_ROLE");\n\n    // Do not use address(0) as burn address due to common transfer restrictions.\n    address public constant BURN_ADDRESS = address(0x000000000000000000000000000000000000dEaD);\n\n    mapping(uint32 => Template) internal _templates;\n    mapping(uint256 => TokenDetails) internal _tokenDetails;\n\n    mapping(uint32 => mapping(address => bool)) public templateOperators;\n    mapping(uint32 => mapping(address => bool)) public templateTransferers;\n\n    IMetadataProvider public metadataProvider;\n\n    bool private _expectingReceive; // Token receiver guard\n\n    uint32 private _nextTemplateId;\n    uint256 private _nextWrappedTokenId;\n\n    modifier onlyTemplateAdmin(\n        uint32 templateId\n    ) {\n        if (_templates[templateId].admin != msg.sender) {\n            revert Unauthorized();\n        }\n        _;\n    }\n\n    constructor(\n        address owner,\n        address metadataProviderAddr,\n        address implicitModeValidator,\n        bytes32 implicitModeProjectId\n    ) {\n        _grantRole(DEFAULT_ADMIN_ROLE, owner);\n        _initializeImplicitMode(owner, implicitModeValidator, implicitModeProjectId);\n        metadataProvider = IMetadataProvider(metadataProviderAddr);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function getTokenDetails(\n        uint256 wrappedTokenId\n    ) external view returns (TokenDetails memory) {\n        return _tokenDetails[wrappedTokenId];\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function getTemplate(\n        uint32 templateId\n    ) external view returns (Template memory) {\n        return _templates[templateId];\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function wrap(\n        uint32 templateId,\n        TokenType tokenType,\n        address tokenAddr,\n        uint256 tokenId,\n        uint256 amount,\n        address receiver\n    ) external returns (uint256 wrappedTokenId) {\n        if (_templates[templateId].admin == address(0)) {\n            revert InvalidTemplate();\n        }\n        if (tokenAddr == address(this)) {\n            // Prevent rewrapping\n            revert InvalidTokenTransfer();\n        }\n\n        wrappedTokenId = _nextWrappedTokenId++;\n        // solhint-disable-next-line not-rely-on-time\n        TokenDetails memory details = TokenDetails(tokenType, templateId, uint56(block.timestamp), tokenAddr, tokenId);\n        _tokenDetails[wrappedTokenId] = details;\n\n        address sender = msg.sender;\n        _addToWrap(details, wrappedTokenId, sender, amount, receiver);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function addToWrap(uint256 wrappedTokenId, uint256 amount, address receiver) external {\n        TokenDetails memory details = _tokenDetails[wrappedTokenId];\n        if (details.tokenAddr == address(0)) {\n            revert InvalidTokenTransfer();\n        }\n\n        address sender = msg.sender;\n        _addToWrap(details, wrappedTokenId, sender, amount, receiver);\n    }\n\n    function _addToWrap(\n        TokenDetails memory details,\n        uint256 wrappedTokenId,\n        address sender,\n        uint256 amount,\n        address receiver\n    ) internal {\n        _expectingReceive = true;\n        _transferFromOther(details.tokenType, details.tokenAddr, sender, address(this), details.tokenId, amount);\n        delete _expectingReceive;\n\n        _mint(receiver, wrappedTokenId, amount, "");\n\n        emit Wrapped(wrappedTokenId, details.templateId, details.tokenAddr, details.tokenId, amount, sender, receiver);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function unwrap(uint256 wrappedTokenId, address holder, uint256 amount) external {\n        TokenDetails memory details = _tokenDetails[wrappedTokenId];\n        Template memory template = _templates[details.templateId];\n        address sender = msg.sender;\n        if (holder != sender) {\n            // Operators are permitted any time\n            if (!templateOperators[details.templateId][sender]) {\n                revert Unauthorized();\n            }\n            // solhint-disable-next-line not-rely-on-time\n        } else if (block.timestamp - details.lockedAt < template.duration) {\n            revert TokenLocked();\n        }\n\n        _burn(holder, wrappedTokenId, amount);\n        _transferFromOther(details.tokenType, details.tokenAddr, address(this), holder, details.tokenId, amount);\n\n        emit Unwrapped(wrappedTokenId, details.templateId, details.tokenAddr, details.tokenId, amount, sender);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function clawback(uint256 wrappedTokenId, address holder, address receiver, uint256 amount) external {\n        TokenDetails memory details = _tokenDetails[wrappedTokenId];\n        _verifyClawback(details, receiver);\n\n        _burn(holder, wrappedTokenId, amount);\n        _transferFromOther(details.tokenType, details.tokenAddr, address(this), receiver, details.tokenId, amount);\n\n        emit ClawedBack(\n            wrappedTokenId, details.templateId, details.tokenAddr, details.tokenId, amount, msg.sender, holder, receiver\n        );\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function emergencyClawback(uint256 wrappedTokenId, address receiver, uint256 amount) external {\n        TokenDetails memory details = _tokenDetails[wrappedTokenId];\n        _verifyClawback(details, receiver);\n\n        // No burn\n        _transferFromOther(details.tokenType, details.tokenAddr, address(this), receiver, details.tokenId, amount);\n\n        emit EmergencyClawedBack(\n            wrappedTokenId, details.templateId, details.tokenAddr, details.tokenId, amount, msg.sender, receiver\n        );\n    }\n\n    function _verifyClawback(TokenDetails memory details, address receiver) internal view {\n        Template memory template = _templates[details.templateId];\n        if (!templateOperators[details.templateId][msg.sender]) {\n            // Only allowed by operators\n            revert Unauthorized();\n        }\n        // solhint-disable-next-line not-rely-on-time\n        if (block.timestamp - details.lockedAt >= template.duration) {\n            // Must be locked\n            revert TokenUnlocked();\n        }\n        if (template.destructionOnly && receiver != BURN_ADDRESS) {\n            revert InvalidReceiver();\n        }\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function addTemplate(\n        uint56 duration,\n        bool destructionOnly,\n        bool transferOpen\n    ) external returns (uint32 templateId) {\n        templateId = _nextTemplateId++;\n        address admin = msg.sender;\n        _templates[templateId] = Template(destructionOnly, transferOpen, duration, admin);\n        emit TemplateAdded(templateId, admin, duration, destructionOnly, transferOpen);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function updateTemplate(\n        uint32 templateId,\n        uint56 duration,\n        bool destructionOnly,\n        bool transferOpen\n    ) external onlyTemplateAdmin(templateId) {\n        Template storage template = _templates[templateId];\n        if (duration > template.duration) {\n            revert InvalidTemplateChange("Duration must be equal or decrease");\n        }\n        if (template.destructionOnly && !destructionOnly) {\n            revert InvalidTemplateChange("Cannot change from destruction only");\n        }\n        if (template.transferOpen && !transferOpen) {\n            revert InvalidTemplateChange("Cannot change from transfer open");\n        }\n        template.duration = duration;\n        template.destructionOnly = destructionOnly;\n        template.transferOpen = transferOpen;\n        emit TemplateUpdated(templateId, duration, destructionOnly, transferOpen);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function updateTemplateAdmin(uint32 templateId, address admin) external onlyTemplateAdmin(templateId) {\n        if (admin == address(0)) {\n            revert InvalidTemplateChange("Admin cannot be zero address");\n        }\n        Template storage template = _templates[templateId];\n        template.admin = admin;\n        emit TemplateAdminUpdated(templateId, admin);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function addTemplateTransferer(uint32 templateId, address transferer) external onlyTemplateAdmin(templateId) {\n        templateTransferers[templateId][transferer] = true;\n        emit TemplateTransfererAdded(templateId, transferer);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function updateTemplateOperator(\n        uint32 templateId,\n        address operator,\n        bool allowed\n    ) external onlyTemplateAdmin(templateId) {\n        templateOperators[templateId][operator] = allowed;\n        emit TemplateOperatorUpdated(templateId, operator, allowed);\n    }\n\n    /**\n     * Transfer tokens from one address to another.\n     * @param from Source address.\n     * @param to Target address.\n     * @param wrappedTokenId ID of the token type.\n     * @param amount Transfered amount.\n     * @param data Additional data with no specified format.\n     */\n    function safeTransferFrom(\n        address from,\n        address to,\n        uint256 wrappedTokenId,\n        uint256 amount,\n        bytes calldata data\n    ) public override {\n        TokenDetails memory details = _tokenDetails[wrappedTokenId];\n        Template memory template = _templates[details.templateId];\n        if (!template.transferOpen) {\n            bool isTransferer = templateTransferers[details.templateId][msg.sender]\n                || templateTransferers[details.templateId][from] || templateTransferers[details.templateId][to];\n            if (!isTransferer) {\n                // Transfer not allowed\n                revert Unauthorized();\n            }\n        }\n        super.safeTransferFrom(from, to, wrappedTokenId, amount, data);\n    }\n\n    /**\n     * Batch transfer tokens from one address to another.\n     * @param from Source address.\n     * @param to Target address.\n     * @param wrappedTokenIds IDs of the token type.\n     * @param amounts Transfered amounts.\n     * @param data Additional data with no specified format.\n     */\n    function safeBatchTransferFrom(\n        address from,\n        address to,\n        uint256[] calldata wrappedTokenIds,\n        uint256[] calldata amounts,\n        bytes calldata data\n    ) public override {\n        uint256 len = wrappedTokenIds.length;\n        for (uint256 i = 0; i < len;) {\n            uint256 wrappedTokenId = wrappedTokenIds[i];\n            TokenDetails memory details = _tokenDetails[wrappedTokenId];\n            Template memory template = _templates[details.templateId];\n            if (!template.transferOpen) {\n                bool isTransferer = templateTransferers[details.templateId][msg.sender]\n                    || templateTransferers[details.templateId][from] || templateTransferers[details.templateId][to];\n                if (!isTransferer) {\n                    // Transfer not allowed\n                    revert Unauthorized();\n                }\n            }\n            unchecked {\n                ++i;\n            }\n        }\n        super.safeBatchTransferFrom(from, to, wrappedTokenIds, amounts, data);\n    }\n\n    function _transferFromOther(\n        TokenType tokenType,\n        address tokenAddr,\n        address from,\n        address to,\n        uint256 tokenId,\n        uint256 amount\n    ) private {\n        if (tokenType == TokenType.ERC1155) {\n            if (amount == 0) {\n                revert InvalidTokenTransfer();\n            }\n            // ERC-1155\n            ERC1155(tokenAddr).safeTransferFrom(from, to, tokenId, amount, "");\n        } else if (tokenType == TokenType.ERC721) {\n            // ERC721\n            if (amount != 1) {\n                revert InvalidTokenTransfer();\n            }\n            IERC721Transfer(tokenAddr).safeTransferFrom(from, to, tokenId);\n        } else if (tokenType == TokenType.ERC20) {\n            if (tokenId != 0 || amount == 0) {\n                revert InvalidTokenTransfer();\n            }\n            if (from == address(this)) {\n                SafeTransferLib.safeTransfer(tokenAddr, to, amount);\n            } else {\n                SafeTransferLib.safeTransferFrom(tokenAddr, from, to, amount);\n            }\n        } else {\n            revert InvalidTokenTransfer();\n        }\n    }\n\n    // URI\n\n    function updateMetadataProvider(\n        address metadataProviderAddr\n    ) external onlyRole(METADATA_ADMIN_ROLE) {\n        metadataProvider = IMetadataProvider(metadataProviderAddr);\n    }\n\n    function uri(\n        uint256 wrappedTokenId\n    ) public view override returns (string memory) {\n        return metadataProvider.metadata(address(this), wrappedTokenId);\n    }\n\n    // Receiver\n\n    modifier expectedReceive() {\n        if (!_expectingReceive) {\n            revert InvalidReceiver();\n        }\n        _;\n        delete _expectingReceive;\n    }\n\n    function onERC721Received(address, address, uint256, bytes calldata) external expectedReceive returns (bytes4) {\n        return this.onERC721Received.selector;\n    }\n\n    function onERC1155Received(\n        address,\n        address,\n        uint256,\n        uint256,\n        bytes calldata\n    ) external expectedReceive returns (bytes4) {\n        return this.onERC1155Received.selector;\n    }\n\n    function onERC1155BatchReceived(\n        address,\n        address,\n        uint256[] calldata,\n        uint256[] calldata,\n        bytes calldata\n    ) external pure returns (bytes4) {\n        // Unused.\n        revert InvalidReceiver();\n    }\n\n    /// @inheritdoc ERC1155\n    function supportsInterface(\n        bytes4 _interfaceID\n    ) public view virtual override(SignalsImplicitModeControlled, ERC1155) returns (bool) {\n        return _interfaceID == type(IClawback).interfaceId || _interfaceID == type(IClawbackFunctions).interfaceId\n            || SignalsImplicitModeControlled.supportsInterface(_interfaceID) || ERC1155.supportsInterface(_interfaceID);\n    }\n\n}\n'
      },
      'src/tokens/common/IERC721Transfer.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.19;\n\n/// A minimal implementation of the ERC721 transfer interface.\ninterface IERC721Transfer {\n\n    function transferFrom(address from, address to, uint256 tokenId) external;\n    function safeTransferFrom(address from, address to, uint256 tokenId) external;\n\n}\n'
      },
      'src/tokens/common/IMetadataProvider.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.19;\n\ninterface IMetadataProvider {\n\n    /**\n     * Provides the metadata for the given token.\n     * @param tokenAddress The address of the token.\n     * @param tokenId The ID of the token.\n     */\n    function metadata(address tokenAddress, uint256 tokenId) external view returns (string memory);\n\n}\n'
      },
      'src/tokens/common/SignalsImplicitModeControlled.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.19;\n\nimport { AccessControlEnumerable } from "openzeppelin-contracts/contracts/access/AccessControlEnumerable.sol";\nimport {\n    IERC165,\n    IImplicitProjectValidation,\n    SignalsImplicitMode\n} from "signals-implicit-mode/src/helper/SignalsImplicitMode.sol";\n\n/**\n * An abstract contract that allows implicit session access for a given project.\n */\nabstract contract SignalsImplicitModeControlled is AccessControlEnumerable, SignalsImplicitMode {\n\n    bytes32 internal constant _IMPLICIT_MODE_ADMIN_ROLE = keccak256("IMPLICIT_MODE_ADMIN_ROLE");\n\n    function _initializeImplicitMode(address owner, address validator, bytes32 projectId) internal {\n        _grantRole(_IMPLICIT_MODE_ADMIN_ROLE, owner);\n        _initializeSignalsImplicitMode(validator, projectId);\n    }\n\n    /**\n     * Updates the validator for implicit mode validation.\n     * @param validator The validator address.\n     * @notice Only callable by an address with the project admin role.\n     */\n    function setImplicitModeValidator(\n        address validator\n    ) external onlyRole(_IMPLICIT_MODE_ADMIN_ROLE) {\n        _validator = IImplicitProjectValidation(validator);\n    }\n\n    /**\n     * Updates the settings for implicit mode validation.\n     * @param projectId The project id.\n     * @notice Only callable by an address with the project admin role.\n     */\n    function setImplicitModeProjectId(\n        bytes32 projectId\n    ) external onlyRole(_IMPLICIT_MODE_ADMIN_ROLE) {\n        _projectId = projectId;\n    }\n\n    /// @inheritdoc IERC165\n    function supportsInterface(\n        bytes4 interfaceId\n    ) public view virtual override(AccessControlEnumerable, SignalsImplicitMode) returns (bool) {\n        return\n            AccessControlEnumerable.supportsInterface(interfaceId) || SignalsImplicitMode.supportsInterface(interfaceId);\n    }\n\n}\n'
      },
      'src/tokens/wrappers/clawback/IClawback.sol': {
        content:
          "// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.19;\n\ninterface IClawbackFunctions {\n\n    enum TokenType {\n        ERC20,\n        ERC721,\n        ERC1155\n    }\n\n    struct Template {\n        bool destructionOnly;\n        bool transferOpen;\n        uint56 duration;\n        address admin;\n    }\n\n    struct TokenDetails {\n        TokenType tokenType;\n        uint32 templateId;\n        uint56 lockedAt;\n        address tokenAddr;\n        uint256 tokenId; // 0 for ERC20\n    }\n\n    // Wrap functions\n\n    /**\n     * Wraps a token.\n     * @param templateId The template ID.\n     * @param tokenType The token type.\n     * @param tokenAddr The token address.\n     * @param tokenId The token ID.\n     * @param amount The amount to wrap.\n     * @param receiver The receiver of the wrapped token.\n     * @return wrappedTokenId The wrapped token ID.\n     */\n    function wrap(\n        uint32 templateId,\n        TokenType tokenType,\n        address tokenAddr,\n        uint256 tokenId,\n        uint256 amount,\n        address receiver\n    ) external returns (uint256 wrappedTokenId);\n\n    /**\n     * Add more tokens to a wrapping.\n     * @param wrappedTokenId The wrapped token ID.\n     * @param amount The amount to wrap.\n     * @param receiver The receiver of the wrapped token.\n     */\n    function addToWrap(uint256 wrappedTokenId, uint256 amount, address receiver) external;\n\n    /**\n     * Unwraps a token.\n     * @param wrappedTokenId The wrapped token ID.\n     * @param holder The holder of the token.\n     * @param amount The amount to unwrap.\n     * @dev Unwrapped tokens are sent to the wrapped token holder.\n     */\n    function unwrap(uint256 wrappedTokenId, address holder, uint256 amount) external;\n\n    /**\n     * Clawback a token.\n     * @param wrappedTokenId The wrapped token ID.\n     * @param holder The holder of the token.\n     * @param receiver The receiver of the token.\n     * @param amount The amount to clawback.\n     * @notice Only an operator of the template can clawback.\n     * @notice Clawback is only allowed when the token is locked.\n     */\n    function clawback(uint256 wrappedTokenId, address holder, address receiver, uint256 amount) external;\n\n    /**\n     * Clawback unwrapped tokens without burning wrapped tokens.\n     * @param wrappedTokenId The wrapped token ID.\n     * @param receiver The receiver of the token.\n     * @param amount The amount to clawback.\n     * @notice Clawback rules apply.\n     * @notice This function doesn't affect the wrapped token and should only be used when wrapped tokens are logically inaccessible.\n     * @dev Clawing back an incomplete amount will lead to a race when unwrapping remaining tokens.\n     */\n    function emergencyClawback(uint256 wrappedTokenId, address receiver, uint256 amount) external;\n\n    /**\n     * Returns the details of a wrapped token.\n     * @param wrappedTokenId The wrapped token ID.\n     * @return The token details.\n     */\n    function getTokenDetails(\n        uint256 wrappedTokenId\n    ) external view returns (TokenDetails memory);\n\n    // Template functions\n\n    /**\n     * Gets the details of a template.\n     * @param templateId The template ID.\n     * @return The template details.\n     */\n    function getTemplate(\n        uint32 templateId\n    ) external view returns (Template memory);\n\n    /**\n     * Add a new template.\n     * @param duration The duration of the template.\n     * @param destructionOnly Whether the template is for destruction only.\n     * @param transferOpen Whether the template allows transfers.\n     * @return templateId The template ID.\n     * @notice The msg.sender will be set as the admin of this template.\n     */\n    function addTemplate(\n        uint56 duration,\n        bool destructionOnly,\n        bool transferOpen\n    ) external returns (uint32 templateId);\n\n    /**\n     * Update a template.\n     * @param templateId The template ID.\n     * @param duration The duration of the template. Can only be reduced.\n     * @param destructionOnly Whether the template is for destruction only. Can only be updated from false to true.\n     * @param transferOpen Whether the template allows transfers. Can only be updated from false to true.\n     * @notice Only the admin of the template can update it.\n     */\n    function updateTemplate(uint32 templateId, uint56 duration, bool destructionOnly, bool transferOpen) external;\n\n    /**\n     * Add a transferer to a template.\n     * @param templateId The template ID.\n     * @param transferer The address of the transferer.\n     * @notice Only the admin of the template can add a transferer.\n     * @notice Transferers cannot be removed.\n     * @notice Transfers are allowed when the to, from or operator is a template operator, even when the template is not in transferOpen mode.\n     */\n    function addTemplateTransferer(uint32 templateId, address transferer) external;\n\n    /**\n     * Update an operator to a template.\n     * @param templateId The template ID.\n     * @param operator The address of the operator.\n     * @param allowed Whether the operator is allowed.\n     * @notice Only the admin of the template can update an operator.\n     */\n    function updateTemplateOperator(uint32 templateId, address operator, bool allowed) external;\n\n    /**\n     * Transfer a template admin to another address.\n     * @param templateId The template ID.\n     * @param admin The address to transfer the template to.\n     * @notice Only the admin of the template can transfer it.\n     * @dev Transferring to address(0) is not allowed.\n     */\n    function updateTemplateAdmin(uint32 templateId, address admin) external;\n\n}\n\ninterface IClawbackSignals {\n\n    /// @notice Thrown when the template ID is invalid\n    error InvalidTemplate();\n\n    /// @notice Thrown when token has not been approved\n    error InvalidTokenApproval();\n\n    /// @notice Thrown when token transfer is invalid\n    error InvalidTokenTransfer();\n\n    /// @notice Thrown when token is locked\n    error TokenLocked();\n\n    /// @notice Thrown when token is unlocked\n    error TokenUnlocked();\n\n    /// @notice Thrown when the caller is not authorized\n    error Unauthorized();\n\n    /// @notice Thrown when the receiver is invalid\n    error InvalidReceiver();\n\n    /// @notice Thrown when the template change is invalid\n    error InvalidTemplateChange(string);\n\n    /// @notice Emits when a token is wrapped\n    event Wrapped(\n        uint256 indexed wrappedTokenId,\n        uint32 indexed templateId,\n        address indexed tokenAddr,\n        uint256 tokenId,\n        uint256 amount,\n        address sender,\n        address receiver\n    );\n\n    /// @notice Emits when a token is unwrapped\n    event Unwrapped(\n        uint256 indexed wrappedTokenId,\n        uint32 indexed templateId,\n        address indexed tokenAddr,\n        uint256 tokenId,\n        uint256 amount,\n        address sender\n    );\n\n    /// @notice Emits when a token is clawed back\n    event ClawedBack(\n        uint256 indexed wrappedTokenId,\n        uint32 indexed templateId,\n        address indexed tokenAddr,\n        uint256 tokenId,\n        uint256 amount,\n        address operator,\n        address holder,\n        address receiver\n    );\n\n    /// @notice Emits when a token is clawed back via emergency\n    event EmergencyClawedBack(\n        uint256 indexed wrappedTokenId,\n        uint32 indexed templateId,\n        address indexed tokenAddr,\n        uint256 tokenId,\n        uint256 amount,\n        address operator,\n        address receiver\n    );\n\n    /// @notice Emits when a template is added\n    event TemplateAdded(\n        uint32 indexed templateId, address admin, uint56 duration, bool destructionOnly, bool transferOpen\n    );\n\n    /// @notice Emits when a template is updated\n    event TemplateUpdated(uint32 indexed templateId, uint56 duration, bool destructionOnly, bool transferOpen);\n\n    /// @notice Emits when a template admin is updated\n    event TemplateAdminUpdated(uint32 indexed templateId, address admin);\n\n    /// @notice Emits when a transferer is added\n    event TemplateTransfererAdded(uint32 indexed templateId, address transferer);\n\n    /// @notice Emits when an operator is updated\n    event TemplateOperatorUpdated(uint32 indexed templateId, address operator, bool allowed);\n\n}\n\n// solhint-disable-next-line no-empty-blocks\ninterface IClawback is IClawbackFunctions, IClawbackSignals { }\n"
      },
      'lib/solady/src/tokens/ERC1155.sol': {
        content:
          '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.4;\n\n/// @notice Simple ERC1155 implementation.\n/// @author Solady (https://github.com/vectorized/solady/blob/main/src/tokens/ERC1155.sol)\n/// @author Modified from Solmate (https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC1155.sol)\n/// @author Modified from OpenZeppelin (https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC1155/ERC1155.sol)\n///\n/// @dev Note:\n/// - The ERC1155 standard allows for self-approvals.\n///   For performance, this implementation WILL NOT revert for such actions.\n///   Please add any checks with overrides if desired.\n/// - The transfer functions use the identity precompile (0x4)\n///   to copy memory internally.\n///\n/// If you are overriding:\n/// - Make sure all variables written to storage are properly cleaned\n//    (e.g. the bool value for `isApprovedForAll` MUST be either 1 or 0 under the hood).\n/// - Check that the overridden function is actually used in the function you want to\n///   change the behavior of. Much of the code has been manually inlined for performance.\nabstract contract ERC1155 {\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                       CUSTOM ERRORS                        */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev The lengths of the input arrays are not the same.\n    error ArrayLengthsMismatch();\n\n    /// @dev Cannot mint or transfer to the zero address.\n    error TransferToZeroAddress();\n\n    /// @dev The recipient\'s balance has overflowed.\n    error AccountBalanceOverflow();\n\n    /// @dev Insufficient balance.\n    error InsufficientBalance();\n\n    /// @dev Only the token owner or an approved account can manage the tokens.\n    error NotOwnerNorApproved();\n\n    /// @dev Cannot safely transfer to a contract that does not implement\n    /// the ERC1155Receiver interface.\n    error TransferToNonERC1155ReceiverImplementer();\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                           EVENTS                           */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev Emitted when `amount` of token `id` is transferred\n    /// from `from` to `to` by `operator`.\n    event TransferSingle(\n        address indexed operator,\n        address indexed from,\n        address indexed to,\n        uint256 id,\n        uint256 amount\n    );\n\n    /// @dev Emitted when `amounts` of token `ids` are transferred\n    /// from `from` to `to` by `operator`.\n    event TransferBatch(\n        address indexed operator,\n        address indexed from,\n        address indexed to,\n        uint256[] ids,\n        uint256[] amounts\n    );\n\n    /// @dev Emitted when `owner` enables or disables `operator` to manage all of their tokens.\n    event ApprovalForAll(address indexed owner, address indexed operator, bool isApproved);\n\n    /// @dev Emitted when the Uniform Resource Identifier (URI) for token `id`\n    /// is updated to `value`. This event is not used in the base contract.\n    /// You may need to emit this event depending on your URI logic.\n    ///\n    /// See: https://eips.ethereum.org/EIPS/eip-1155#metadata\n    event URI(string value, uint256 indexed id);\n\n    /// @dev `keccak256(bytes("TransferSingle(address,address,address,uint256,uint256)"))`.\n    uint256 private constant _TRANSFER_SINGLE_EVENT_SIGNATURE =\n        0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62;\n\n    /// @dev `keccak256(bytes("TransferBatch(address,address,address,uint256[],uint256[])"))`.\n    uint256 private constant _TRANSFER_BATCH_EVENT_SIGNATURE =\n        0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb;\n\n    /// @dev `keccak256(bytes("ApprovalForAll(address,address,bool)"))`.\n    uint256 private constant _APPROVAL_FOR_ALL_EVENT_SIGNATURE =\n        0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31;\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                          STORAGE                           */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev The `ownerSlotSeed` of a given owner is given by.\n    /// ```\n    ///     let ownerSlotSeed := or(_ERC1155_MASTER_SLOT_SEED, shl(96, owner))\n    /// ```\n    ///\n    /// The balance slot of `owner` is given by.\n    /// ```\n    ///     mstore(0x20, ownerSlotSeed)\n    ///     mstore(0x00, id)\n    ///     let balanceSlot := keccak256(0x00, 0x40)\n    /// ```\n    ///\n    /// The operator approval slot of `owner` is given by.\n    /// ```\n    ///     mstore(0x20, ownerSlotSeed)\n    ///     mstore(0x00, operator)\n    ///     let operatorApprovalSlot := keccak256(0x0c, 0x34)\n    /// ```\n    uint256 private constant _ERC1155_MASTER_SLOT_SEED = 0x9a31110384e0b0c9;\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                      ERC1155 METADATA                      */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev Returns the URI for token `id`.\n    ///\n    /// You can either return the same templated URI for all token IDs,\n    /// (e.g. "https://example.com/api/{id}.json"),\n    /// or return a unique URI for each `id`.\n    ///\n    /// See: https://eips.ethereum.org/EIPS/eip-1155#metadata\n    function uri(uint256 id) public view virtual returns (string memory);\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                          ERC1155                           */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev Returns the amount of `id` owned by `owner`.\n    function balanceOf(address owner, uint256 id) public view virtual returns (uint256 result) {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x20, _ERC1155_MASTER_SLOT_SEED)\n            mstore(0x14, owner)\n            mstore(0x00, id)\n            result := sload(keccak256(0x00, 0x40))\n        }\n    }\n\n    /// @dev Returns whether `operator` is approved to manage the tokens of `owner`.\n    function isApprovedForAll(address owner, address operator)\n        public\n        view\n        virtual\n        returns (bool result)\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x20, _ERC1155_MASTER_SLOT_SEED)\n            mstore(0x14, owner)\n            mstore(0x00, operator)\n            result := sload(keccak256(0x0c, 0x34))\n        }\n    }\n\n    /// @dev Sets whether `operator` is approved to manage the tokens of the caller.\n    ///\n    /// Emits a {ApprovalForAll} event.\n    function setApprovalForAll(address operator, bool isApproved) public virtual {\n        /// @solidity memory-safe-assembly\n        assembly {\n            // Convert to 0 or 1.\n            isApproved := iszero(iszero(isApproved))\n            // Update the `isApproved` for (`msg.sender`, `operator`).\n            mstore(0x20, _ERC1155_MASTER_SLOT_SEED)\n            mstore(0x14, caller())\n            mstore(0x00, operator)\n            sstore(keccak256(0x0c, 0x34), isApproved)\n            // Emit the {ApprovalForAll} event.\n            mstore(0x00, isApproved)\n            // forgefmt: disable-next-line\n            log3(0x00, 0x20, _APPROVAL_FOR_ALL_EVENT_SIGNATURE, caller(), shr(96, shl(96, operator)))\n        }\n    }\n\n    /// @dev Transfers `amount` of `id` from `from` to `to`.\n    ///\n    /// Requirements:\n    /// - `to` cannot be the zero address.\n    /// - `from` must have at least `amount` of `id`.\n    /// - If the caller is not `from`,\n    ///   it must be approved to manage the tokens of `from`.\n    /// - If `to` refers to a smart contract, it must implement\n    ///   {ERC1155-onERC1155Received}, which is called upon a batch transfer.\n    ///\n    /// Emits a {TransferSingle} event.\n    function safeTransferFrom(\n        address from,\n        address to,\n        uint256 id,\n        uint256 amount,\n        bytes calldata data\n    ) public virtual {\n        if (_useBeforeTokenTransfer()) {\n            _beforeTokenTransfer(from, to, _single(id), _single(amount), data);\n        }\n        /// @solidity memory-safe-assembly\n        assembly {\n            let fromSlotSeed := or(_ERC1155_MASTER_SLOT_SEED, shl(96, from))\n            let toSlotSeed := or(_ERC1155_MASTER_SLOT_SEED, shl(96, to))\n            mstore(0x20, fromSlotSeed)\n            // Clear the upper 96 bits.\n            from := shr(96, fromSlotSeed)\n            to := shr(96, toSlotSeed)\n            // Revert if `to` is the zero address.\n            if iszero(to) {\n                mstore(0x00, 0xea553b34) // `TransferToZeroAddress()`.\n                revert(0x1c, 0x04)\n            }\n            // If the caller is not `from`, do the authorization check.\n            if iszero(eq(caller(), from)) {\n                mstore(0x00, caller())\n                if iszero(sload(keccak256(0x0c, 0x34))) {\n                    mstore(0x00, 0x4b6e7f18) // `NotOwnerNorApproved()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n            // Subtract and store the updated balance of `from`.\n            {\n                mstore(0x00, id)\n                let fromBalanceSlot := keccak256(0x00, 0x40)\n                let fromBalance := sload(fromBalanceSlot)\n                if gt(amount, fromBalance) {\n                    mstore(0x00, 0xf4d678b8) // `InsufficientBalance()`.\n                    revert(0x1c, 0x04)\n                }\n                sstore(fromBalanceSlot, sub(fromBalance, amount))\n            }\n            // Increase and store the updated balance of `to`.\n            {\n                mstore(0x20, toSlotSeed)\n                let toBalanceSlot := keccak256(0x00, 0x40)\n                let toBalanceBefore := sload(toBalanceSlot)\n                let toBalanceAfter := add(toBalanceBefore, amount)\n                if lt(toBalanceAfter, toBalanceBefore) {\n                    mstore(0x00, 0x01336cea) // `AccountBalanceOverflow()`.\n                    revert(0x1c, 0x04)\n                }\n                sstore(toBalanceSlot, toBalanceAfter)\n            }\n            // Emit a {TransferSingle} event.\n            mstore(0x20, amount)\n            log4(0x00, 0x40, _TRANSFER_SINGLE_EVENT_SIGNATURE, caller(), from, to)\n        }\n        if (_useAfterTokenTransfer()) {\n            _afterTokenTransfer(from, to, _single(id), _single(amount), data);\n        }\n        /// @solidity memory-safe-assembly\n        assembly {\n            // Do the {onERC1155Received} check if `to` is a smart contract.\n            if extcodesize(to) {\n                // Prepare the calldata.\n                let m := mload(0x40)\n                // `onERC1155Received(address,address,uint256,uint256,bytes)`.\n                mstore(m, 0xf23a6e61)\n                mstore(add(m, 0x20), caller())\n                mstore(add(m, 0x40), from)\n                mstore(add(m, 0x60), id)\n                mstore(add(m, 0x80), amount)\n                mstore(add(m, 0xa0), 0xa0)\n                mstore(add(m, 0xc0), data.length)\n                calldatacopy(add(m, 0xe0), data.offset, data.length)\n                // Revert if the call reverts.\n                if iszero(call(gas(), to, 0, add(m, 0x1c), add(0xc4, data.length), m, 0x20)) {\n                    if returndatasize() {\n                        // Bubble up the revert if the call reverts.\n                        returndatacopy(m, 0x00, returndatasize())\n                        revert(m, returndatasize())\n                    }\n                }\n                // Load the returndata and compare it with the function selector.\n                if iszero(eq(mload(m), shl(224, 0xf23a6e61))) {\n                    mstore(0x00, 0x9c05499b) // `TransferToNonERC1155ReceiverImplementer()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n        }\n    }\n\n    /// @dev Transfers `amounts` of `ids` from `from` to `to`.\n    ///\n    /// Requirements:\n    /// - `to` cannot be the zero address.\n    /// - `from` must have at least `amount` of `id`.\n    /// - `ids` and `amounts` must have the same length.\n    /// - If the caller is not `from`,\n    ///   it must be approved to manage the tokens of `from`.\n    /// - If `to` refers to a smart contract, it must implement\n    ///   {ERC1155-onERC1155BatchReceived}, which is called upon a batch transfer.\n    ///\n    /// Emits a {TransferBatch} event.\n    function safeBatchTransferFrom(\n        address from,\n        address to,\n        uint256[] calldata ids,\n        uint256[] calldata amounts,\n        bytes calldata data\n    ) public virtual {\n        if (_useBeforeTokenTransfer()) {\n            _beforeTokenTransfer(from, to, ids, amounts, data);\n        }\n        /// @solidity memory-safe-assembly\n        assembly {\n            if iszero(eq(ids.length, amounts.length)) {\n                mstore(0x00, 0x3b800a46) // `ArrayLengthsMismatch()`.\n                revert(0x1c, 0x04)\n            }\n            let fromSlotSeed := or(_ERC1155_MASTER_SLOT_SEED, shl(96, from))\n            let toSlotSeed := or(_ERC1155_MASTER_SLOT_SEED, shl(96, to))\n            mstore(0x20, fromSlotSeed)\n            // Clear the upper 96 bits.\n            from := shr(96, fromSlotSeed)\n            to := shr(96, toSlotSeed)\n            // Revert if `to` is the zero address.\n            if iszero(to) {\n                mstore(0x00, 0xea553b34) // `TransferToZeroAddress()`.\n                revert(0x1c, 0x04)\n            }\n            // If the caller is not `from`, do the authorization check.\n            if iszero(eq(caller(), from)) {\n                mstore(0x00, caller())\n                if iszero(sload(keccak256(0x0c, 0x34))) {\n                    mstore(0x00, 0x4b6e7f18) // `NotOwnerNorApproved()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n            // Loop through all the `ids` and update the balances.\n            {\n                for { let i := shl(5, ids.length) } i {} {\n                    i := sub(i, 0x20)\n                    let amount := calldataload(add(amounts.offset, i))\n                    // Subtract and store the updated balance of `from`.\n                    {\n                        mstore(0x20, fromSlotSeed)\n                        mstore(0x00, calldataload(add(ids.offset, i)))\n                        let fromBalanceSlot := keccak256(0x00, 0x40)\n                        let fromBalance := sload(fromBalanceSlot)\n                        if gt(amount, fromBalance) {\n                            mstore(0x00, 0xf4d678b8) // `InsufficientBalance()`.\n                            revert(0x1c, 0x04)\n                        }\n                        sstore(fromBalanceSlot, sub(fromBalance, amount))\n                    }\n                    // Increase and store the updated balance of `to`.\n                    {\n                        mstore(0x20, toSlotSeed)\n                        let toBalanceSlot := keccak256(0x00, 0x40)\n                        let toBalanceBefore := sload(toBalanceSlot)\n                        let toBalanceAfter := add(toBalanceBefore, amount)\n                        if lt(toBalanceAfter, toBalanceBefore) {\n                            mstore(0x00, 0x01336cea) // `AccountBalanceOverflow()`.\n                            revert(0x1c, 0x04)\n                        }\n                        sstore(toBalanceSlot, toBalanceAfter)\n                    }\n                }\n            }\n            // Emit a {TransferBatch} event.\n            {\n                let m := mload(0x40)\n                // Copy the `ids`.\n                mstore(m, 0x40)\n                let n := shl(5, ids.length)\n                mstore(add(m, 0x40), ids.length)\n                calldatacopy(add(m, 0x60), ids.offset, n)\n                // Copy the `amounts`.\n                mstore(add(m, 0x20), add(0x60, n))\n                let o := add(add(m, n), 0x60)\n                mstore(o, ids.length)\n                calldatacopy(add(o, 0x20), amounts.offset, n)\n                // Do the emit.\n                log4(m, add(add(n, n), 0x80), _TRANSFER_BATCH_EVENT_SIGNATURE, caller(), from, to)\n            }\n        }\n        if (_useAfterTokenTransfer()) {\n            _afterTokenTransferCalldata(from, to, ids, amounts, data);\n        }\n        /// @solidity memory-safe-assembly\n        assembly {\n            // Do the {onERC1155BatchReceived} check if `to` is a smart contract.\n            if extcodesize(to) {\n                mstore(0x00, to) // Cache `to` to prevent stack too deep.\n                let m := mload(0x40)\n                // Prepare the calldata.\n                // `onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)`.\n                mstore(m, 0xbc197c81)\n                mstore(add(m, 0x20), caller())\n                mstore(add(m, 0x40), from)\n                // Copy the `ids`.\n                mstore(add(m, 0x60), 0xa0)\n                let n := shl(5, ids.length)\n                mstore(add(m, 0xc0), ids.length)\n                calldatacopy(add(m, 0xe0), ids.offset, n)\n                // Copy the `amounts`.\n                mstore(add(m, 0x80), add(0xc0, n))\n                let o := add(add(m, n), 0xe0)\n                mstore(o, ids.length)\n                calldatacopy(add(o, 0x20), amounts.offset, n)\n                // Copy the `data`.\n                mstore(add(m, 0xa0), add(add(0xe0, n), n))\n                o := add(add(o, n), 0x20)\n                mstore(o, data.length)\n                calldatacopy(add(o, 0x20), data.offset, data.length)\n                let nAll := add(0x104, add(data.length, add(n, n)))\n                // Revert if the call reverts.\n                if iszero(call(gas(), mload(0x00), 0, add(mload(0x40), 0x1c), nAll, m, 0x20)) {\n                    if returndatasize() {\n                        // Bubble up the revert if the call reverts.\n                        returndatacopy(m, 0x00, returndatasize())\n                        revert(m, returndatasize())\n                    }\n                }\n                // Load the returndata and compare it with the function selector.\n                if iszero(eq(mload(m), shl(224, 0xbc197c81))) {\n                    mstore(0x00, 0x9c05499b) // `TransferToNonERC1155ReceiverImplementer()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n        }\n    }\n\n    /// @dev Returns the amounts of `ids` for `owners.\n    ///\n    /// Requirements:\n    /// - `owners` and `ids` must have the same length.\n    function balanceOfBatch(address[] calldata owners, uint256[] calldata ids)\n        public\n        view\n        virtual\n        returns (uint256[] memory balances)\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            if iszero(eq(ids.length, owners.length)) {\n                mstore(0x00, 0x3b800a46) // `ArrayLengthsMismatch()`.\n                revert(0x1c, 0x04)\n            }\n            balances := mload(0x40)\n            mstore(balances, ids.length)\n            let o := add(balances, 0x20)\n            let i := shl(5, ids.length)\n            mstore(0x40, add(i, o))\n            // Loop through all the `ids` and load the balances.\n            for {} i {} {\n                i := sub(i, 0x20)\n                let owner := calldataload(add(owners.offset, i))\n                mstore(0x20, or(_ERC1155_MASTER_SLOT_SEED, shl(96, owner)))\n                mstore(0x00, calldataload(add(ids.offset, i)))\n                mstore(add(o, i), sload(keccak256(0x00, 0x40)))\n            }\n        }\n    }\n\n    /// @dev Returns true if this contract implements the interface defined by `interfaceId`.\n    /// See: https://eips.ethereum.org/EIPS/eip-165\n    /// This function call must use less than 30000 gas.\n    function supportsInterface(bytes4 interfaceId) public view virtual returns (bool result) {\n        /// @solidity memory-safe-assembly\n        assembly {\n            let s := shr(224, interfaceId)\n            // ERC165: 0x01ffc9a7, ERC1155: 0xd9b67a26, ERC1155MetadataURI: 0x0e89341c.\n            result := or(or(eq(s, 0x01ffc9a7), eq(s, 0xd9b67a26)), eq(s, 0x0e89341c))\n        }\n    }\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                  INTERNAL MINT FUNCTIONS                   */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev Mints `amount` of `id` to `to`.\n    ///\n    /// Requirements:\n    /// - `to` cannot be the zero address.\n    /// - If `to` refers to a smart contract, it must implement\n    ///   {ERC1155-onERC1155Received}, which is called upon a batch transfer.\n    ///\n    /// Emits a {TransferSingle} event.\n    function _mint(address to, uint256 id, uint256 amount, bytes memory data) internal virtual {\n        if (_useBeforeTokenTransfer()) {\n            _beforeTokenTransfer(address(0), to, _single(id), _single(amount), data);\n        }\n        /// @solidity memory-safe-assembly\n        assembly {\n            let to_ := shl(96, to)\n            // Revert if `to` is the zero address.\n            if iszero(to_) {\n                mstore(0x00, 0xea553b34) // `TransferToZeroAddress()`.\n                revert(0x1c, 0x04)\n            }\n            // Increase and store the updated balance of `to`.\n            {\n                mstore(0x20, _ERC1155_MASTER_SLOT_SEED)\n                mstore(0x14, to)\n                mstore(0x00, id)\n                let toBalanceSlot := keccak256(0x00, 0x40)\n                let toBalanceBefore := sload(toBalanceSlot)\n                let toBalanceAfter := add(toBalanceBefore, amount)\n                if lt(toBalanceAfter, toBalanceBefore) {\n                    mstore(0x00, 0x01336cea) // `AccountBalanceOverflow()`.\n                    revert(0x1c, 0x04)\n                }\n                sstore(toBalanceSlot, toBalanceAfter)\n            }\n            // Emit a {TransferSingle} event.\n            mstore(0x20, amount)\n            log4(0x00, 0x40, _TRANSFER_SINGLE_EVENT_SIGNATURE, caller(), 0, shr(96, to_))\n        }\n        if (_useAfterTokenTransfer()) {\n            _afterTokenTransfer(address(0), to, _single(id), _single(amount), data);\n        }\n        if (_hasCode(to)) _checkOnERC1155Received(address(0), to, id, amount, data);\n    }\n\n    /// @dev Mints `amounts` of `ids` to `to`.\n    ///\n    /// Requirements:\n    /// - `to` cannot be the zero address.\n    /// - `ids` and `amounts` must have the same length.\n    /// - If `to` refers to a smart contract, it must implement\n    ///   {ERC1155-onERC1155BatchReceived}, which is called upon a batch transfer.\n    ///\n    /// Emits a {TransferBatch} event.\n    function _batchMint(\n        address to,\n        uint256[] memory ids,\n        uint256[] memory amounts,\n        bytes memory data\n    ) internal virtual {\n        if (_useBeforeTokenTransfer()) {\n            _beforeTokenTransfer(address(0), to, ids, amounts, data);\n        }\n        /// @solidity memory-safe-assembly\n        assembly {\n            if iszero(eq(mload(ids), mload(amounts))) {\n                mstore(0x00, 0x3b800a46) // `ArrayLengthsMismatch()`.\n                revert(0x1c, 0x04)\n            }\n            let to_ := shl(96, to)\n            // Revert if `to` is the zero address.\n            if iszero(to_) {\n                mstore(0x00, 0xea553b34) // `TransferToZeroAddress()`.\n                revert(0x1c, 0x04)\n            }\n            // Loop through all the `ids` and update the balances.\n            {\n                mstore(0x20, or(_ERC1155_MASTER_SLOT_SEED, to_))\n                for { let i := shl(5, mload(ids)) } i { i := sub(i, 0x20) } {\n                    let amount := mload(add(amounts, i))\n                    // Increase and store the updated balance of `to`.\n                    {\n                        mstore(0x00, mload(add(ids, i)))\n                        let toBalanceSlot := keccak256(0x00, 0x40)\n                        let toBalanceBefore := sload(toBalanceSlot)\n                        let toBalanceAfter := add(toBalanceBefore, amount)\n                        if lt(toBalanceAfter, toBalanceBefore) {\n                            mstore(0x00, 0x01336cea) // `AccountBalanceOverflow()`.\n                            revert(0x1c, 0x04)\n                        }\n                        sstore(toBalanceSlot, toBalanceAfter)\n                    }\n                }\n            }\n            // Emit a {TransferBatch} event.\n            {\n                let m := mload(0x40)\n                // Copy the `ids`.\n                mstore(m, 0x40)\n                let n := add(0x20, shl(5, mload(ids)))\n                let o := add(m, 0x40)\n                pop(staticcall(gas(), 4, ids, n, o, n))\n                // Copy the `amounts`.\n                mstore(add(m, 0x20), add(0x40, returndatasize()))\n                o := add(o, returndatasize())\n                n := add(0x20, shl(5, mload(amounts)))\n                pop(staticcall(gas(), 4, amounts, n, o, n))\n                n := sub(add(o, returndatasize()), m)\n                // Do the emit.\n                log4(m, n, _TRANSFER_BATCH_EVENT_SIGNATURE, caller(), 0, shr(96, to_))\n            }\n        }\n        if (_useAfterTokenTransfer()) {\n            _afterTokenTransfer(address(0), to, ids, amounts, data);\n        }\n        if (_hasCode(to)) _checkOnERC1155BatchReceived(address(0), to, ids, amounts, data);\n    }\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                  INTERNAL BURN FUNCTIONS                   */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev Equivalent to `_burn(address(0), from, id, amount)`.\n    function _burn(address from, uint256 id, uint256 amount) internal virtual {\n        _burn(address(0), from, id, amount);\n    }\n\n    /// @dev Destroys `amount` of `id` from `from`.\n    ///\n    /// Requirements:\n    /// - `from` must have at least `amount` of `id`.\n    /// - If `by` is not the zero address, it must be either `from`,\n    ///   or approved to manage the tokens of `from`.\n    ///\n    /// Emits a {TransferSingle} event.\n    function _burn(address by, address from, uint256 id, uint256 amount) internal virtual {\n        if (_useBeforeTokenTransfer()) {\n            _beforeTokenTransfer(from, address(0), _single(id), _single(amount), "");\n        }\n        /// @solidity memory-safe-assembly\n        assembly {\n            let from_ := shl(96, from)\n            mstore(0x20, or(_ERC1155_MASTER_SLOT_SEED, from_))\n            // If `by` is not the zero address, and not equal to `from`,\n            // check if it is approved to manage all the tokens of `from`.\n            if iszero(or(iszero(shl(96, by)), eq(shl(96, by), from_))) {\n                mstore(0x00, by)\n                if iszero(sload(keccak256(0x0c, 0x34))) {\n                    mstore(0x00, 0x4b6e7f18) // `NotOwnerNorApproved()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n            // Decrease and store the updated balance of `from`.\n            {\n                mstore(0x00, id)\n                let fromBalanceSlot := keccak256(0x00, 0x40)\n                let fromBalance := sload(fromBalanceSlot)\n                if gt(amount, fromBalance) {\n                    mstore(0x00, 0xf4d678b8) // `InsufficientBalance()`.\n                    revert(0x1c, 0x04)\n                }\n                sstore(fromBalanceSlot, sub(fromBalance, amount))\n            }\n            // Emit a {TransferSingle} event.\n            mstore(0x20, amount)\n            log4(0x00, 0x40, _TRANSFER_SINGLE_EVENT_SIGNATURE, caller(), shr(96, from_), 0)\n        }\n        if (_useAfterTokenTransfer()) {\n            _afterTokenTransfer(from, address(0), _single(id), _single(amount), "");\n        }\n    }\n\n    /// @dev Equivalent to `_batchBurn(address(0), from, ids, amounts)`.\n    function _batchBurn(address from, uint256[] memory ids, uint256[] memory amounts)\n        internal\n        virtual\n    {\n        _batchBurn(address(0), from, ids, amounts);\n    }\n\n    /// @dev Destroys `amounts` of `ids` from `from`.\n    ///\n    /// Requirements:\n    /// - `ids` and `amounts` must have the same length.\n    /// - `from` must have at least `amounts` of `ids`.\n    /// - If `by` is not the zero address, it must be either `from`,\n    ///   or approved to manage the tokens of `from`.\n    ///\n    /// Emits a {TransferBatch} event.\n    function _batchBurn(address by, address from, uint256[] memory ids, uint256[] memory amounts)\n        internal\n        virtual\n    {\n        if (_useBeforeTokenTransfer()) {\n            _beforeTokenTransfer(from, address(0), ids, amounts, "");\n        }\n        /// @solidity memory-safe-assembly\n        assembly {\n            if iszero(eq(mload(ids), mload(amounts))) {\n                mstore(0x00, 0x3b800a46) // `ArrayLengthsMismatch()`.\n                revert(0x1c, 0x04)\n            }\n            let from_ := shl(96, from)\n            mstore(0x20, or(_ERC1155_MASTER_SLOT_SEED, from_))\n            // If `by` is not the zero address, and not equal to `from`,\n            // check if it is approved to manage all the tokens of `from`.\n            let by_ := shl(96, by)\n            if iszero(or(iszero(by_), eq(by_, from_))) {\n                mstore(0x00, by)\n                if iszero(sload(keccak256(0x0c, 0x34))) {\n                    mstore(0x00, 0x4b6e7f18) // `NotOwnerNorApproved()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n            // Loop through all the `ids` and update the balances.\n            {\n                for { let i := shl(5, mload(ids)) } i { i := sub(i, 0x20) } {\n                    let amount := mload(add(amounts, i))\n                    // Decrease and store the updated balance of `from`.\n                    {\n                        mstore(0x00, mload(add(ids, i)))\n                        let fromBalanceSlot := keccak256(0x00, 0x40)\n                        let fromBalance := sload(fromBalanceSlot)\n                        if gt(amount, fromBalance) {\n                            mstore(0x00, 0xf4d678b8) // `InsufficientBalance()`.\n                            revert(0x1c, 0x04)\n                        }\n                        sstore(fromBalanceSlot, sub(fromBalance, amount))\n                    }\n                }\n            }\n            // Emit a {TransferBatch} event.\n            {\n                let m := mload(0x40)\n                // Copy the `ids`.\n                mstore(m, 0x40)\n                let n := add(0x20, shl(5, mload(ids)))\n                let o := add(m, 0x40)\n                pop(staticcall(gas(), 4, ids, n, o, n))\n                // Copy the `amounts`.\n                mstore(add(m, 0x20), add(0x40, returndatasize()))\n                o := add(o, returndatasize())\n                n := add(0x20, shl(5, mload(amounts)))\n                pop(staticcall(gas(), 4, amounts, n, o, n))\n                n := sub(add(o, returndatasize()), m)\n                // Do the emit.\n                log4(m, n, _TRANSFER_BATCH_EVENT_SIGNATURE, caller(), shr(96, from_), 0)\n            }\n        }\n        if (_useAfterTokenTransfer()) {\n            _afterTokenTransfer(from, address(0), ids, amounts, "");\n        }\n    }\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                INTERNAL APPROVAL FUNCTIONS                 */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev Approve or remove the `operator` as an operator for `by`,\n    /// without authorization checks.\n    ///\n    /// Emits a {ApprovalForAll} event.\n    function _setApprovalForAll(address by, address operator, bool isApproved) internal virtual {\n        /// @solidity memory-safe-assembly\n        assembly {\n            // Convert to 0 or 1.\n            isApproved := iszero(iszero(isApproved))\n            // Update the `isApproved` for (`by`, `operator`).\n            mstore(0x20, _ERC1155_MASTER_SLOT_SEED)\n            mstore(0x14, by)\n            mstore(0x00, operator)\n            sstore(keccak256(0x0c, 0x34), isApproved)\n            // Emit the {ApprovalForAll} event.\n            mstore(0x00, isApproved)\n            let m := shr(96, not(0))\n            log3(0x00, 0x20, _APPROVAL_FOR_ALL_EVENT_SIGNATURE, and(m, by), and(m, operator))\n        }\n    }\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                INTERNAL TRANSFER FUNCTIONS                 */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev Equivalent to `_safeTransfer(address(0), from, to, id, amount, data)`.\n    function _safeTransfer(address from, address to, uint256 id, uint256 amount, bytes memory data)\n        internal\n        virtual\n    {\n        _safeTransfer(address(0), from, to, id, amount, data);\n    }\n\n    /// @dev Transfers `amount` of `id` from `from` to `to`.\n    ///\n    /// Requirements:\n    /// - `to` cannot be the zero address.\n    /// - `from` must have at least `amount` of `id`.\n    /// - If `by` is not the zero address, it must be either `from`,\n    ///   or approved to manage the tokens of `from`.\n    /// - If `to` refers to a smart contract, it must implement\n    ///   {ERC1155-onERC1155Received}, which is called upon a batch transfer.\n    ///\n    /// Emits a {TransferSingle} event.\n    function _safeTransfer(\n        address by,\n        address from,\n        address to,\n        uint256 id,\n        uint256 amount,\n        bytes memory data\n    ) internal virtual {\n        if (_useBeforeTokenTransfer()) {\n            _beforeTokenTransfer(from, to, _single(id), _single(amount), data);\n        }\n        /// @solidity memory-safe-assembly\n        assembly {\n            let from_ := shl(96, from)\n            let to_ := shl(96, to)\n            // Revert if `to` is the zero address.\n            if iszero(to_) {\n                mstore(0x00, 0xea553b34) // `TransferToZeroAddress()`.\n                revert(0x1c, 0x04)\n            }\n            mstore(0x20, or(_ERC1155_MASTER_SLOT_SEED, from_))\n            // If `by` is not the zero address, and not equal to `from`,\n            // check if it is approved to manage all the tokens of `from`.\n            let by_ := shl(96, by)\n            if iszero(or(iszero(by_), eq(by_, from_))) {\n                mstore(0x00, by)\n                if iszero(sload(keccak256(0x0c, 0x34))) {\n                    mstore(0x00, 0x4b6e7f18) // `NotOwnerNorApproved()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n            // Subtract and store the updated balance of `from`.\n            {\n                mstore(0x00, id)\n                let fromBalanceSlot := keccak256(0x00, 0x40)\n                let fromBalance := sload(fromBalanceSlot)\n                if gt(amount, fromBalance) {\n                    mstore(0x00, 0xf4d678b8) // `InsufficientBalance()`.\n                    revert(0x1c, 0x04)\n                }\n                sstore(fromBalanceSlot, sub(fromBalance, amount))\n            }\n            // Increase and store the updated balance of `to`.\n            {\n                mstore(0x20, or(_ERC1155_MASTER_SLOT_SEED, to_))\n                let toBalanceSlot := keccak256(0x00, 0x40)\n                let toBalanceBefore := sload(toBalanceSlot)\n                let toBalanceAfter := add(toBalanceBefore, amount)\n                if lt(toBalanceAfter, toBalanceBefore) {\n                    mstore(0x00, 0x01336cea) // `AccountBalanceOverflow()`.\n                    revert(0x1c, 0x04)\n                }\n                sstore(toBalanceSlot, toBalanceAfter)\n            }\n            // Emit a {TransferSingle} event.\n            mstore(0x20, amount)\n            // forgefmt: disable-next-line\n            log4(0x00, 0x40, _TRANSFER_SINGLE_EVENT_SIGNATURE, caller(), shr(96, from_), shr(96, to_))\n        }\n        if (_useAfterTokenTransfer()) {\n            _afterTokenTransfer(from, to, _single(id), _single(amount), data);\n        }\n        if (_hasCode(to)) _checkOnERC1155Received(from, to, id, amount, data);\n    }\n\n    /// @dev Equivalent to `_safeBatchTransfer(address(0), from, to, ids, amounts, data)`.\n    function _safeBatchTransfer(\n        address from,\n        address to,\n        uint256[] memory ids,\n        uint256[] memory amounts,\n        bytes memory data\n    ) internal virtual {\n        _safeBatchTransfer(address(0), from, to, ids, amounts, data);\n    }\n\n    /// @dev Transfers `amounts` of `ids` from `from` to `to`.\n    ///\n    /// Requirements:\n    /// - `to` cannot be the zero address.\n    /// - `ids` and `amounts` must have the same length.\n    /// - `from` must have at least `amounts` of `ids`.\n    /// - If `by` is not the zero address, it must be either `from`,\n    ///   or approved to manage the tokens of `from`.\n    /// - If `to` refers to a smart contract, it must implement\n    ///   {ERC1155-onERC1155BatchReceived}, which is called upon a batch transfer.\n    ///\n    /// Emits a {TransferBatch} event.\n    function _safeBatchTransfer(\n        address by,\n        address from,\n        address to,\n        uint256[] memory ids,\n        uint256[] memory amounts,\n        bytes memory data\n    ) internal virtual {\n        if (_useBeforeTokenTransfer()) {\n            _beforeTokenTransfer(from, to, ids, amounts, data);\n        }\n        /// @solidity memory-safe-assembly\n        assembly {\n            if iszero(eq(mload(ids), mload(amounts))) {\n                mstore(0x00, 0x3b800a46) // `ArrayLengthsMismatch()`.\n                revert(0x1c, 0x04)\n            }\n            let from_ := shl(96, from)\n            let to_ := shl(96, to)\n            // Revert if `to` is the zero address.\n            if iszero(to_) {\n                mstore(0x00, 0xea553b34) // `TransferToZeroAddress()`.\n                revert(0x1c, 0x04)\n            }\n            let fromSlotSeed := or(_ERC1155_MASTER_SLOT_SEED, from_)\n            let toSlotSeed := or(_ERC1155_MASTER_SLOT_SEED, to_)\n            mstore(0x20, fromSlotSeed)\n            // If `by` is not the zero address, and not equal to `from`,\n            // check if it is approved to manage all the tokens of `from`.\n            let by_ := shl(96, by)\n            if iszero(or(iszero(by_), eq(by_, from_))) {\n                mstore(0x00, by)\n                if iszero(sload(keccak256(0x0c, 0x34))) {\n                    mstore(0x00, 0x4b6e7f18) // `NotOwnerNorApproved()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n            // Loop through all the `ids` and update the balances.\n            {\n                for { let i := shl(5, mload(ids)) } i { i := sub(i, 0x20) } {\n                    let amount := mload(add(amounts, i))\n                    // Subtract and store the updated balance of `from`.\n                    {\n                        mstore(0x20, fromSlotSeed)\n                        mstore(0x00, mload(add(ids, i)))\n                        let fromBalanceSlot := keccak256(0x00, 0x40)\n                        let fromBalance := sload(fromBalanceSlot)\n                        if gt(amount, fromBalance) {\n                            mstore(0x00, 0xf4d678b8) // `InsufficientBalance()`.\n                            revert(0x1c, 0x04)\n                        }\n                        sstore(fromBalanceSlot, sub(fromBalance, amount))\n                    }\n                    // Increase and store the updated balance of `to`.\n                    {\n                        mstore(0x20, toSlotSeed)\n                        let toBalanceSlot := keccak256(0x00, 0x40)\n                        let toBalanceBefore := sload(toBalanceSlot)\n                        let toBalanceAfter := add(toBalanceBefore, amount)\n                        if lt(toBalanceAfter, toBalanceBefore) {\n                            mstore(0x00, 0x01336cea) // `AccountBalanceOverflow()`.\n                            revert(0x1c, 0x04)\n                        }\n                        sstore(toBalanceSlot, toBalanceAfter)\n                    }\n                }\n            }\n            // Emit a {TransferBatch} event.\n            {\n                let m := mload(0x40)\n                // Copy the `ids`.\n                mstore(m, 0x40)\n                let n := add(0x20, shl(5, mload(ids)))\n                let o := add(m, 0x40)\n                pop(staticcall(gas(), 4, ids, n, o, n))\n                // Copy the `amounts`.\n                mstore(add(m, 0x20), add(0x40, returndatasize()))\n                o := add(o, returndatasize())\n                n := add(0x20, shl(5, mload(amounts)))\n                pop(staticcall(gas(), 4, amounts, n, o, n))\n                n := sub(add(o, returndatasize()), m)\n                // Do the emit.\n                log4(m, n, _TRANSFER_BATCH_EVENT_SIGNATURE, caller(), shr(96, from_), shr(96, to_))\n            }\n        }\n        if (_useAfterTokenTransfer()) {\n            _afterTokenTransfer(from, to, ids, amounts, data);\n        }\n        if (_hasCode(to)) _checkOnERC1155BatchReceived(from, to, ids, amounts, data);\n    }\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                    HOOKS FOR OVERRIDING                    */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev Override this function to return true if `_beforeTokenTransfer` is used.\n    /// This is to help the compiler avoid producing dead bytecode.\n    function _useBeforeTokenTransfer() internal view virtual returns (bool) {\n        return false;\n    }\n\n    /// @dev Hook that is called before any token transfer.\n    /// This includes minting and burning, as well as batched variants.\n    ///\n    /// The same hook is called on both single and batched variants.\n    /// For single transfers, the length of the `id` and `amount` arrays are 1.\n    function _beforeTokenTransfer(\n        address from,\n        address to,\n        uint256[] memory ids,\n        uint256[] memory amounts,\n        bytes memory data\n    ) internal virtual {}\n\n    /// @dev Override this function to return true if `_afterTokenTransfer` is used.\n    /// This is to help the compiler avoid producing dead bytecode.\n    function _useAfterTokenTransfer() internal view virtual returns (bool) {\n        return false;\n    }\n\n    /// @dev Hook that is called after any token transfer.\n    /// This includes minting and burning, as well as batched variants.\n    ///\n    /// The same hook is called on both single and batched variants.\n    /// For single transfers, the length of the `id` and `amount` arrays are 1.\n    function _afterTokenTransfer(\n        address from,\n        address to,\n        uint256[] memory ids,\n        uint256[] memory amounts,\n        bytes memory data\n    ) internal virtual {}\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                      PRIVATE HELPERS                       */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev Helper for calling the `_afterTokenTransfer` hook.\n    /// This is to help the compiler avoid producing dead bytecode.\n    function _afterTokenTransferCalldata(\n        address from,\n        address to,\n        uint256[] calldata ids,\n        uint256[] calldata amounts,\n        bytes calldata data\n    ) private {\n        if (_useAfterTokenTransfer()) {\n            _afterTokenTransfer(from, to, ids, amounts, data);\n        }\n    }\n\n    /// @dev Returns if `a` has bytecode of non-zero length.\n    function _hasCode(address a) private view returns (bool result) {\n        /// @solidity memory-safe-assembly\n        assembly {\n            result := extcodesize(a) // Can handle dirty upper bits.\n        }\n    }\n\n    /// @dev Perform a call to invoke {IERC1155Receiver-onERC1155Received} on `to`.\n    /// Reverts if the target does not support the function correctly.\n    function _checkOnERC1155Received(\n        address from,\n        address to,\n        uint256 id,\n        uint256 amount,\n        bytes memory data\n    ) private {\n        /// @solidity memory-safe-assembly\n        assembly {\n            // Prepare the calldata.\n            let m := mload(0x40)\n            // `onERC1155Received(address,address,uint256,uint256,bytes)`.\n            mstore(m, 0xf23a6e61)\n            mstore(add(m, 0x20), caller())\n            mstore(add(m, 0x40), shr(96, shl(96, from)))\n            mstore(add(m, 0x60), id)\n            mstore(add(m, 0x80), amount)\n            mstore(add(m, 0xa0), 0xa0)\n            let n := mload(data)\n            mstore(add(m, 0xc0), n)\n            if n { pop(staticcall(gas(), 4, add(data, 0x20), n, add(m, 0xe0), n)) }\n            // Revert if the call reverts.\n            if iszero(call(gas(), to, 0, add(m, 0x1c), add(0xc4, n), m, 0x20)) {\n                if returndatasize() {\n                    // Bubble up the revert if the call reverts.\n                    returndatacopy(m, 0x00, returndatasize())\n                    revert(m, returndatasize())\n                }\n            }\n            // Load the returndata and compare it with the function selector.\n            if iszero(eq(mload(m), shl(224, 0xf23a6e61))) {\n                mstore(0x00, 0x9c05499b) // `TransferToNonERC1155ReceiverImplementer()`.\n                revert(0x1c, 0x04)\n            }\n        }\n    }\n\n    /// @dev Perform a call to invoke {IERC1155Receiver-onERC1155BatchReceived} on `to`.\n    /// Reverts if the target does not support the function correctly.\n    function _checkOnERC1155BatchReceived(\n        address from,\n        address to,\n        uint256[] memory ids,\n        uint256[] memory amounts,\n        bytes memory data\n    ) private {\n        /// @solidity memory-safe-assembly\n        assembly {\n            // Prepare the calldata.\n            let m := mload(0x40)\n            // `onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)`.\n            mstore(m, 0xbc197c81)\n            mstore(add(m, 0x20), caller())\n            mstore(add(m, 0x40), shr(96, shl(96, from)))\n            // Copy the `ids`.\n            mstore(add(m, 0x60), 0xa0)\n            let n := add(0x20, shl(5, mload(ids)))\n            let o := add(m, 0xc0)\n            pop(staticcall(gas(), 4, ids, n, o, n))\n            // Copy the `amounts`.\n            let s := add(0xa0, returndatasize())\n            mstore(add(m, 0x80), s)\n            o := add(o, returndatasize())\n            n := add(0x20, shl(5, mload(amounts)))\n            pop(staticcall(gas(), 4, amounts, n, o, n))\n            // Copy the `data`.\n            mstore(add(m, 0xa0), add(s, returndatasize()))\n            o := add(o, returndatasize())\n            n := add(0x20, mload(data))\n            pop(staticcall(gas(), 4, data, n, o, n))\n            n := sub(add(o, returndatasize()), add(m, 0x1c))\n            // Revert if the call reverts.\n            if iszero(call(gas(), to, 0, add(m, 0x1c), n, m, 0x20)) {\n                if returndatasize() {\n                    // Bubble up the revert if the call reverts.\n                    returndatacopy(m, 0x00, returndatasize())\n                    revert(m, returndatasize())\n                }\n            }\n            // Load the returndata and compare it with the function selector.\n            if iszero(eq(mload(m), shl(224, 0xbc197c81))) {\n                mstore(0x00, 0x9c05499b) // `TransferToNonERC1155ReceiverImplementer()`.\n                revert(0x1c, 0x04)\n            }\n        }\n    }\n\n    /// @dev Returns `x` in an array with a single element.\n    function _single(uint256 x) private pure returns (uint256[] memory result) {\n        /// @solidity memory-safe-assembly\n        assembly {\n            result := mload(0x40)\n            mstore(0x40, add(result, 0x40))\n            mstore(result, 1)\n            mstore(add(result, 0x20), x)\n        }\n    }\n}\n'
      },
      'lib/solady/src/utils/SafeTransferLib.sol': {
        content:
          "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.4;\n\n/// @notice Safe ETH and ERC20 transfer library that gracefully handles missing return values.\n/// @author Solady (https://github.com/vectorized/solady/blob/main/src/utils/SafeTransferLib.sol)\n/// @author Modified from Solmate (https://github.com/transmissions11/solmate/blob/main/src/utils/SafeTransferLib.sol)\n/// @author Permit2 operations from (https://github.com/Uniswap/permit2/blob/main/src/libraries/Permit2Lib.sol)\n///\n/// @dev Note:\n/// - For ETH transfers, please use `forceSafeTransferETH` for DoS protection.\nlibrary SafeTransferLib {\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                       CUSTOM ERRORS                        */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev The ETH transfer has failed.\n    error ETHTransferFailed();\n\n    /// @dev The ERC20 `transferFrom` has failed.\n    error TransferFromFailed();\n\n    /// @dev The ERC20 `transfer` has failed.\n    error TransferFailed();\n\n    /// @dev The ERC20 `approve` has failed.\n    error ApproveFailed();\n\n    /// @dev The ERC20 `totalSupply` query has failed.\n    error TotalSupplyQueryFailed();\n\n    /// @dev The Permit2 operation has failed.\n    error Permit2Failed();\n\n    /// @dev The Permit2 amount must be less than `2**160 - 1`.\n    error Permit2AmountOverflow();\n\n    /// @dev The Permit2 approve operation has failed.\n    error Permit2ApproveFailed();\n\n    /// @dev The Permit2 lockdown operation has failed.\n    error Permit2LockdownFailed();\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                         CONSTANTS                          */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev Suggested gas stipend for contract receiving ETH that disallows any storage writes.\n    uint256 internal constant GAS_STIPEND_NO_STORAGE_WRITES = 2300;\n\n    /// @dev Suggested gas stipend for contract receiving ETH to perform a few\n    /// storage reads and writes, but low enough to prevent griefing.\n    uint256 internal constant GAS_STIPEND_NO_GRIEF = 100000;\n\n    /// @dev The unique EIP-712 domain separator for the DAI token contract.\n    bytes32 internal constant DAI_DOMAIN_SEPARATOR =\n        0xdbb8cf42e1ecb028be3f3dbc922e1d878b963f411dc388ced501601c60f7c6f7;\n\n    /// @dev The address for the WETH9 contract on Ethereum mainnet.\n    address internal constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;\n\n    /// @dev The canonical Permit2 address.\n    /// [Github](https://github.com/Uniswap/permit2)\n    /// [Etherscan](https://etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3)\n    address internal constant PERMIT2 = 0x000000000022D473030F116dDEE9F6B43aC78BA3;\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                       ETH OPERATIONS                       */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    // If the ETH transfer MUST succeed with a reasonable gas budget, use the force variants.\n    //\n    // The regular variants:\n    // - Forwards all remaining gas to the target.\n    // - Reverts if the target reverts.\n    // - Reverts if the current contract has insufficient balance.\n    //\n    // The force variants:\n    // - Forwards with an optional gas stipend\n    //   (defaults to `GAS_STIPEND_NO_GRIEF`, which is sufficient for most cases).\n    // - If the target reverts, or if the gas stipend is exhausted,\n    //   creates a temporary contract to force send the ETH via `SELFDESTRUCT`.\n    //   Future compatible with `SENDALL`: https://eips.ethereum.org/EIPS/eip-4758.\n    // - Reverts if the current contract has insufficient balance.\n    //\n    // The try variants:\n    // - Forwards with a mandatory gas stipend.\n    // - Instead of reverting, returns whether the transfer succeeded.\n\n    /// @dev Sends `amount` (in wei) ETH to `to`.\n    function safeTransferETH(address to, uint256 amount) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            if iszero(call(gas(), to, amount, codesize(), 0x00, codesize(), 0x00)) {\n                mstore(0x00, 0xb12d13eb) // `ETHTransferFailed()`.\n                revert(0x1c, 0x04)\n            }\n        }\n    }\n\n    /// @dev Sends all the ETH in the current contract to `to`.\n    function safeTransferAllETH(address to) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            // Transfer all the ETH and check if it succeeded or not.\n            if iszero(call(gas(), to, selfbalance(), codesize(), 0x00, codesize(), 0x00)) {\n                mstore(0x00, 0xb12d13eb) // `ETHTransferFailed()`.\n                revert(0x1c, 0x04)\n            }\n        }\n    }\n\n    /// @dev Force sends `amount` (in wei) ETH to `to`, with a `gasStipend`.\n    function forceSafeTransferETH(address to, uint256 amount, uint256 gasStipend) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            if lt(selfbalance(), amount) {\n                mstore(0x00, 0xb12d13eb) // `ETHTransferFailed()`.\n                revert(0x1c, 0x04)\n            }\n            if iszero(call(gasStipend, to, amount, codesize(), 0x00, codesize(), 0x00)) {\n                mstore(0x00, to) // Store the address in scratch space.\n                mstore8(0x0b, 0x73) // Opcode `PUSH20`.\n                mstore8(0x20, 0xff) // Opcode `SELFDESTRUCT`.\n                if iszero(create(amount, 0x0b, 0x16)) { revert(codesize(), codesize()) } // For gas estimation.\n            }\n        }\n    }\n\n    /// @dev Force sends all the ETH in the current contract to `to`, with a `gasStipend`.\n    function forceSafeTransferAllETH(address to, uint256 gasStipend) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            if iszero(call(gasStipend, to, selfbalance(), codesize(), 0x00, codesize(), 0x00)) {\n                mstore(0x00, to) // Store the address in scratch space.\n                mstore8(0x0b, 0x73) // Opcode `PUSH20`.\n                mstore8(0x20, 0xff) // Opcode `SELFDESTRUCT`.\n                if iszero(create(selfbalance(), 0x0b, 0x16)) { revert(codesize(), codesize()) } // For gas estimation.\n            }\n        }\n    }\n\n    /// @dev Force sends `amount` (in wei) ETH to `to`, with `GAS_STIPEND_NO_GRIEF`.\n    function forceSafeTransferETH(address to, uint256 amount) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            if lt(selfbalance(), amount) {\n                mstore(0x00, 0xb12d13eb) // `ETHTransferFailed()`.\n                revert(0x1c, 0x04)\n            }\n            if iszero(call(GAS_STIPEND_NO_GRIEF, to, amount, codesize(), 0x00, codesize(), 0x00)) {\n                mstore(0x00, to) // Store the address in scratch space.\n                mstore8(0x0b, 0x73) // Opcode `PUSH20`.\n                mstore8(0x20, 0xff) // Opcode `SELFDESTRUCT`.\n                if iszero(create(amount, 0x0b, 0x16)) { revert(codesize(), codesize()) } // For gas estimation.\n            }\n        }\n    }\n\n    /// @dev Force sends all the ETH in the current contract to `to`, with `GAS_STIPEND_NO_GRIEF`.\n    function forceSafeTransferAllETH(address to) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            // forgefmt: disable-next-item\n            if iszero(call(GAS_STIPEND_NO_GRIEF, to, selfbalance(), codesize(), 0x00, codesize(), 0x00)) {\n                mstore(0x00, to) // Store the address in scratch space.\n                mstore8(0x0b, 0x73) // Opcode `PUSH20`.\n                mstore8(0x20, 0xff) // Opcode `SELFDESTRUCT`.\n                if iszero(create(selfbalance(), 0x0b, 0x16)) { revert(codesize(), codesize()) } // For gas estimation.\n            }\n        }\n    }\n\n    /// @dev Sends `amount` (in wei) ETH to `to`, with a `gasStipend`.\n    function trySafeTransferETH(address to, uint256 amount, uint256 gasStipend)\n        internal\n        returns (bool success)\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            success := call(gasStipend, to, amount, codesize(), 0x00, codesize(), 0x00)\n        }\n    }\n\n    /// @dev Sends all the ETH in the current contract to `to`, with a `gasStipend`.\n    function trySafeTransferAllETH(address to, uint256 gasStipend)\n        internal\n        returns (bool success)\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            success := call(gasStipend, to, selfbalance(), codesize(), 0x00, codesize(), 0x00)\n        }\n    }\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                      ERC20 OPERATIONS                      */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev Sends `amount` of ERC20 `token` from `from` to `to`.\n    /// Reverts upon failure.\n    ///\n    /// The `from` account must have at least `amount` approved for\n    /// the current contract to manage.\n    function safeTransferFrom(address token, address from, address to, uint256 amount) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            let m := mload(0x40) // Cache the free memory pointer.\n            mstore(0x60, amount) // Store the `amount` argument.\n            mstore(0x40, to) // Store the `to` argument.\n            mstore(0x2c, shl(96, from)) // Store the `from` argument.\n            mstore(0x0c, 0x23b872dd000000000000000000000000) // `transferFrom(address,address,uint256)`.\n            let success := call(gas(), token, 0, 0x1c, 0x64, 0x00, 0x20)\n            if iszero(and(eq(mload(0x00), 1), success)) {\n                if iszero(lt(or(iszero(extcodesize(token)), returndatasize()), success)) {\n                    mstore(0x00, 0x7939f424) // `TransferFromFailed()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n            mstore(0x60, 0) // Restore the zero slot to zero.\n            mstore(0x40, m) // Restore the free memory pointer.\n        }\n    }\n\n    /// @dev Sends `amount` of ERC20 `token` from `from` to `to`.\n    ///\n    /// The `from` account must have at least `amount` approved for the current contract to manage.\n    function trySafeTransferFrom(address token, address from, address to, uint256 amount)\n        internal\n        returns (bool success)\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            let m := mload(0x40) // Cache the free memory pointer.\n            mstore(0x60, amount) // Store the `amount` argument.\n            mstore(0x40, to) // Store the `to` argument.\n            mstore(0x2c, shl(96, from)) // Store the `from` argument.\n            mstore(0x0c, 0x23b872dd000000000000000000000000) // `transferFrom(address,address,uint256)`.\n            success := call(gas(), token, 0, 0x1c, 0x64, 0x00, 0x20)\n            if iszero(and(eq(mload(0x00), 1), success)) {\n                success := lt(or(iszero(extcodesize(token)), returndatasize()), success)\n            }\n            mstore(0x60, 0) // Restore the zero slot to zero.\n            mstore(0x40, m) // Restore the free memory pointer.\n        }\n    }\n\n    /// @dev Sends all of ERC20 `token` from `from` to `to`.\n    /// Reverts upon failure.\n    ///\n    /// The `from` account must have their entire balance approved for the current contract to manage.\n    function safeTransferAllFrom(address token, address from, address to)\n        internal\n        returns (uint256 amount)\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            let m := mload(0x40) // Cache the free memory pointer.\n            mstore(0x40, to) // Store the `to` argument.\n            mstore(0x2c, shl(96, from)) // Store the `from` argument.\n            mstore(0x0c, 0x70a08231000000000000000000000000) // `balanceOf(address)`.\n            // Read the balance, reverting upon failure.\n            if iszero(\n                and( // The arguments of `and` are evaluated from right to left.\n                    gt(returndatasize(), 0x1f), // At least 32 bytes returned.\n                    staticcall(gas(), token, 0x1c, 0x24, 0x60, 0x20)\n                )\n            ) {\n                mstore(0x00, 0x7939f424) // `TransferFromFailed()`.\n                revert(0x1c, 0x04)\n            }\n            mstore(0x00, 0x23b872dd) // `transferFrom(address,address,uint256)`.\n            amount := mload(0x60) // The `amount` is already at 0x60. We'll need to return it.\n            // Perform the transfer, reverting upon failure.\n            let success := call(gas(), token, 0, 0x1c, 0x64, 0x00, 0x20)\n            if iszero(and(eq(mload(0x00), 1), success)) {\n                if iszero(lt(or(iszero(extcodesize(token)), returndatasize()), success)) {\n                    mstore(0x00, 0x7939f424) // `TransferFromFailed()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n            mstore(0x60, 0) // Restore the zero slot to zero.\n            mstore(0x40, m) // Restore the free memory pointer.\n        }\n    }\n\n    /// @dev Sends `amount` of ERC20 `token` from the current contract to `to`.\n    /// Reverts upon failure.\n    function safeTransfer(address token, address to, uint256 amount) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x14, to) // Store the `to` argument.\n            mstore(0x34, amount) // Store the `amount` argument.\n            mstore(0x00, 0xa9059cbb000000000000000000000000) // `transfer(address,uint256)`.\n            // Perform the transfer, reverting upon failure.\n            let success := call(gas(), token, 0, 0x10, 0x44, 0x00, 0x20)\n            if iszero(and(eq(mload(0x00), 1), success)) {\n                if iszero(lt(or(iszero(extcodesize(token)), returndatasize()), success)) {\n                    mstore(0x00, 0x90b8ec18) // `TransferFailed()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n            mstore(0x34, 0) // Restore the part of the free memory pointer that was overwritten.\n        }\n    }\n\n    /// @dev Sends all of ERC20 `token` from the current contract to `to`.\n    /// Reverts upon failure.\n    function safeTransferAll(address token, address to) internal returns (uint256 amount) {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x00, 0x70a08231) // Store the function selector of `balanceOf(address)`.\n            mstore(0x20, address()) // Store the address of the current contract.\n            // Read the balance, reverting upon failure.\n            if iszero(\n                and( // The arguments of `and` are evaluated from right to left.\n                    gt(returndatasize(), 0x1f), // At least 32 bytes returned.\n                    staticcall(gas(), token, 0x1c, 0x24, 0x34, 0x20)\n                )\n            ) {\n                mstore(0x00, 0x90b8ec18) // `TransferFailed()`.\n                revert(0x1c, 0x04)\n            }\n            mstore(0x14, to) // Store the `to` argument.\n            amount := mload(0x34) // The `amount` is already at 0x34. We'll need to return it.\n            mstore(0x00, 0xa9059cbb000000000000000000000000) // `transfer(address,uint256)`.\n            // Perform the transfer, reverting upon failure.\n            let success := call(gas(), token, 0, 0x10, 0x44, 0x00, 0x20)\n            if iszero(and(eq(mload(0x00), 1), success)) {\n                if iszero(lt(or(iszero(extcodesize(token)), returndatasize()), success)) {\n                    mstore(0x00, 0x90b8ec18) // `TransferFailed()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n            mstore(0x34, 0) // Restore the part of the free memory pointer that was overwritten.\n        }\n    }\n\n    /// @dev Sets `amount` of ERC20 `token` for `to` to manage on behalf of the current contract.\n    /// Reverts upon failure.\n    function safeApprove(address token, address to, uint256 amount) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x14, to) // Store the `to` argument.\n            mstore(0x34, amount) // Store the `amount` argument.\n            mstore(0x00, 0x095ea7b3000000000000000000000000) // `approve(address,uint256)`.\n            let success := call(gas(), token, 0, 0x10, 0x44, 0x00, 0x20)\n            if iszero(and(eq(mload(0x00), 1), success)) {\n                if iszero(lt(or(iszero(extcodesize(token)), returndatasize()), success)) {\n                    mstore(0x00, 0x3e3f8f73) // `ApproveFailed()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n            mstore(0x34, 0) // Restore the part of the free memory pointer that was overwritten.\n        }\n    }\n\n    /// @dev Sets `amount` of ERC20 `token` for `to` to manage on behalf of the current contract.\n    /// If the initial attempt to approve fails, attempts to reset the approved amount to zero,\n    /// then retries the approval again (some tokens, e.g. USDT, requires this).\n    /// Reverts upon failure.\n    function safeApproveWithRetry(address token, address to, uint256 amount) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x14, to) // Store the `to` argument.\n            mstore(0x34, amount) // Store the `amount` argument.\n            mstore(0x00, 0x095ea7b3000000000000000000000000) // `approve(address,uint256)`.\n            // Perform the approval, retrying upon failure.\n            let success := call(gas(), token, 0, 0x10, 0x44, 0x00, 0x20)\n            if iszero(and(eq(mload(0x00), 1), success)) {\n                if iszero(lt(or(iszero(extcodesize(token)), returndatasize()), success)) {\n                    mstore(0x34, 0) // Store 0 for the `amount`.\n                    mstore(0x00, 0x095ea7b3000000000000000000000000) // `approve(address,uint256)`.\n                    pop(call(gas(), token, 0, 0x10, 0x44, codesize(), 0x00)) // Reset the approval.\n                    mstore(0x34, amount) // Store back the original `amount`.\n                    // Retry the approval, reverting upon failure.\n                    success := call(gas(), token, 0, 0x10, 0x44, 0x00, 0x20)\n                    if iszero(and(eq(mload(0x00), 1), success)) {\n                        // Check the `extcodesize` again just in case the token selfdestructs lol.\n                        if iszero(lt(or(iszero(extcodesize(token)), returndatasize()), success)) {\n                            mstore(0x00, 0x3e3f8f73) // `ApproveFailed()`.\n                            revert(0x1c, 0x04)\n                        }\n                    }\n                }\n            }\n            mstore(0x34, 0) // Restore the part of the free memory pointer that was overwritten.\n        }\n    }\n\n    /// @dev Returns the amount of ERC20 `token` owned by `account`.\n    /// Returns zero if the `token` does not exist.\n    function balanceOf(address token, address account) internal view returns (uint256 amount) {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x14, account) // Store the `account` argument.\n            mstore(0x00, 0x70a08231000000000000000000000000) // `balanceOf(address)`.\n            amount :=\n                mul( // The arguments of `mul` are evaluated from right to left.\n                    mload(0x20),\n                    and( // The arguments of `and` are evaluated from right to left.\n                        gt(returndatasize(), 0x1f), // At least 32 bytes returned.\n                        staticcall(gas(), token, 0x10, 0x24, 0x20, 0x20)\n                    )\n                )\n        }\n    }\n\n    /// @dev Performs a `token.balanceOf(account)` check.\n    /// `implemented` denotes whether the `token` does not implement `balanceOf`.\n    /// `amount` is zero if the `token` does not implement `balanceOf`.\n    function checkBalanceOf(address token, address account)\n        internal\n        view\n        returns (bool implemented, uint256 amount)\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x14, account) // Store the `account` argument.\n            mstore(0x00, 0x70a08231000000000000000000000000) // `balanceOf(address)`.\n            implemented :=\n                and( // The arguments of `and` are evaluated from right to left.\n                    gt(returndatasize(), 0x1f), // At least 32 bytes returned.\n                    staticcall(gas(), token, 0x10, 0x24, 0x20, 0x20)\n                )\n            amount := mul(mload(0x20), implemented)\n        }\n    }\n\n    /// @dev Returns the total supply of the `token`.\n    /// Reverts if the token does not exist or does not implement `totalSupply()`.\n    function totalSupply(address token) internal view returns (uint256 result) {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x00, 0x18160ddd) // `totalSupply()`.\n            if iszero(\n                and(gt(returndatasize(), 0x1f), staticcall(gas(), token, 0x1c, 0x04, 0x00, 0x20))\n            ) {\n                mstore(0x00, 0x54cd9435) // `TotalSupplyQueryFailed()`.\n                revert(0x1c, 0x04)\n            }\n            result := mload(0x00)\n        }\n    }\n\n    /// @dev Sends `amount` of ERC20 `token` from `from` to `to`.\n    /// If the initial attempt fails, try to use Permit2 to transfer the token.\n    /// Reverts upon failure.\n    ///\n    /// The `from` account must have at least `amount` approved for the current contract to manage.\n    function safeTransferFrom2(address token, address from, address to, uint256 amount) internal {\n        if (!trySafeTransferFrom(token, from, to, amount)) {\n            permit2TransferFrom(token, from, to, amount);\n        }\n    }\n\n    /// @dev Sends `amount` of ERC20 `token` from `from` to `to` via Permit2.\n    /// Reverts upon failure.\n    function permit2TransferFrom(address token, address from, address to, uint256 amount)\n        internal\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            let m := mload(0x40)\n            mstore(add(m, 0x74), shr(96, shl(96, token)))\n            mstore(add(m, 0x54), amount)\n            mstore(add(m, 0x34), to)\n            mstore(add(m, 0x20), shl(96, from))\n            // `transferFrom(address,address,uint160,address)`.\n            mstore(m, 0x36c78516000000000000000000000000)\n            let p := PERMIT2\n            let exists := eq(chainid(), 1)\n            if iszero(exists) { exists := iszero(iszero(extcodesize(p))) }\n            if iszero(\n                and(\n                    call(gas(), p, 0, add(m, 0x10), 0x84, codesize(), 0x00),\n                    lt(iszero(extcodesize(token)), exists) // Token has code and Permit2 exists.\n                )\n            ) {\n                mstore(0x00, 0x7939f4248757f0fd) // `TransferFromFailed()` or `Permit2AmountOverflow()`.\n                revert(add(0x18, shl(2, iszero(iszero(shr(160, amount))))), 0x04)\n            }\n        }\n    }\n\n    /// @dev Permit a user to spend a given amount of\n    /// another user's tokens via native EIP-2612 permit if possible, falling\n    /// back to Permit2 if native permit fails or is not implemented on the token.\n    function permit2(\n        address token,\n        address owner,\n        address spender,\n        uint256 amount,\n        uint256 deadline,\n        uint8 v,\n        bytes32 r,\n        bytes32 s\n    ) internal {\n        bool success;\n        /// @solidity memory-safe-assembly\n        assembly {\n            for {} shl(96, xor(token, WETH9)) {} {\n                mstore(0x00, 0x3644e515) // `DOMAIN_SEPARATOR()`.\n                if iszero(\n                    and( // The arguments of `and` are evaluated from right to left.\n                        lt(iszero(mload(0x00)), eq(returndatasize(), 0x20)), // Returns 1 non-zero word.\n                        // Gas stipend to limit gas burn for tokens that don't refund gas when\n                        // an non-existing function is called. 5K should be enough for a SLOAD.\n                        staticcall(5000, token, 0x1c, 0x04, 0x00, 0x20)\n                    )\n                ) { break }\n                // After here, we can be sure that token is a contract.\n                let m := mload(0x40)\n                mstore(add(m, 0x34), spender)\n                mstore(add(m, 0x20), shl(96, owner))\n                mstore(add(m, 0x74), deadline)\n                if eq(mload(0x00), DAI_DOMAIN_SEPARATOR) {\n                    mstore(0x14, owner)\n                    mstore(0x00, 0x7ecebe00000000000000000000000000) // `nonces(address)`.\n                    mstore(\n                        add(m, 0x94),\n                        lt(iszero(amount), staticcall(gas(), token, 0x10, 0x24, add(m, 0x54), 0x20))\n                    )\n                    mstore(m, 0x8fcbaf0c000000000000000000000000) // `IDAIPermit.permit`.\n                    // `nonces` is already at `add(m, 0x54)`.\n                    // `amount != 0` is already stored at `add(m, 0x94)`.\n                    mstore(add(m, 0xb4), and(0xff, v))\n                    mstore(add(m, 0xd4), r)\n                    mstore(add(m, 0xf4), s)\n                    success := call(gas(), token, 0, add(m, 0x10), 0x104, codesize(), 0x00)\n                    break\n                }\n                mstore(m, 0xd505accf000000000000000000000000) // `IERC20Permit.permit`.\n                mstore(add(m, 0x54), amount)\n                mstore(add(m, 0x94), and(0xff, v))\n                mstore(add(m, 0xb4), r)\n                mstore(add(m, 0xd4), s)\n                success := call(gas(), token, 0, add(m, 0x10), 0xe4, codesize(), 0x00)\n                break\n            }\n        }\n        if (!success) simplePermit2(token, owner, spender, amount, deadline, v, r, s);\n    }\n\n    /// @dev Simple permit on the Permit2 contract.\n    function simplePermit2(\n        address token,\n        address owner,\n        address spender,\n        uint256 amount,\n        uint256 deadline,\n        uint8 v,\n        bytes32 r,\n        bytes32 s\n    ) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            let m := mload(0x40)\n            mstore(m, 0x927da105) // `allowance(address,address,address)`.\n            {\n                let addressMask := shr(96, not(0))\n                mstore(add(m, 0x20), and(addressMask, owner))\n                mstore(add(m, 0x40), and(addressMask, token))\n                mstore(add(m, 0x60), and(addressMask, spender))\n                mstore(add(m, 0xc0), and(addressMask, spender))\n            }\n            let p := mul(PERMIT2, iszero(shr(160, amount)))\n            if iszero(\n                and( // The arguments of `and` are evaluated from right to left.\n                    gt(returndatasize(), 0x5f), // Returns 3 words: `amount`, `expiration`, `nonce`.\n                    staticcall(gas(), p, add(m, 0x1c), 0x64, add(m, 0x60), 0x60)\n                )\n            ) {\n                mstore(0x00, 0x6b836e6b8757f0fd) // `Permit2Failed()` or `Permit2AmountOverflow()`.\n                revert(add(0x18, shl(2, iszero(p))), 0x04)\n            }\n            mstore(m, 0x2b67b570) // `Permit2.permit` (PermitSingle variant).\n            // `owner` is already `add(m, 0x20)`.\n            // `token` is already at `add(m, 0x40)`.\n            mstore(add(m, 0x60), amount)\n            mstore(add(m, 0x80), 0xffffffffffff) // `expiration = type(uint48).max`.\n            // `nonce` is already at `add(m, 0xa0)`.\n            // `spender` is already at `add(m, 0xc0)`.\n            mstore(add(m, 0xe0), deadline)\n            mstore(add(m, 0x100), 0x100) // `signature` offset.\n            mstore(add(m, 0x120), 0x41) // `signature` length.\n            mstore(add(m, 0x140), r)\n            mstore(add(m, 0x160), s)\n            mstore(add(m, 0x180), shl(248, v))\n            if iszero( // Revert if token does not have code, or if the call fails.\n            mul(extcodesize(token), call(gas(), p, 0, add(m, 0x1c), 0x184, codesize(), 0x00))) {\n                mstore(0x00, 0x6b836e6b) // `Permit2Failed()`.\n                revert(0x1c, 0x04)\n            }\n        }\n    }\n\n    /// @dev Approves `spender` to spend `amount` of `token` for `address(this)`.\n    function permit2Approve(address token, address spender, uint160 amount, uint48 expiration)\n        internal\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            let addressMask := shr(96, not(0))\n            let m := mload(0x40)\n            mstore(m, 0x87517c45) // `approve(address,address,uint160,uint48)`.\n            mstore(add(m, 0x20), and(addressMask, token))\n            mstore(add(m, 0x40), and(addressMask, spender))\n            mstore(add(m, 0x60), and(addressMask, amount))\n            mstore(add(m, 0x80), and(0xffffffffffff, expiration))\n            if iszero(call(gas(), PERMIT2, 0, add(m, 0x1c), 0xa0, codesize(), 0x00)) {\n                mstore(0x00, 0x324f14ae) // `Permit2ApproveFailed()`.\n                revert(0x1c, 0x04)\n            }\n        }\n    }\n\n    /// @dev Revokes an approval for `token` and `spender` for `address(this)`.\n    function permit2Lockdown(address token, address spender) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            let m := mload(0x40)\n            mstore(m, 0xcc53287f) // `Permit2.lockdown`.\n            mstore(add(m, 0x20), 0x20) // Offset of the `approvals`.\n            mstore(add(m, 0x40), 1) // `approvals.length`.\n            mstore(add(m, 0x60), shr(96, shl(96, token)))\n            mstore(add(m, 0x80), shr(96, shl(96, spender)))\n            if iszero(call(gas(), PERMIT2, 0, add(m, 0x1c), 0xa0, codesize(), 0x00)) {\n                mstore(0x00, 0x96b3de23) // `Permit2LockdownFailed()`.\n                revert(0x1c, 0x04)\n            }\n        }\n    }\n}\n"
      },
      'lib/openzeppelin-contracts/contracts/access/AccessControlEnumerable.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.5.0) (access/AccessControlEnumerable.sol)\n\npragma solidity ^0.8.0;\n\nimport "./IAccessControlEnumerable.sol";\nimport "./AccessControl.sol";\nimport "../utils/structs/EnumerableSet.sol";\n\n/**\n * @dev Extension of {AccessControl} that allows enumerating the members of each role.\n */\nabstract contract AccessControlEnumerable is IAccessControlEnumerable, AccessControl {\n    using EnumerableSet for EnumerableSet.AddressSet;\n\n    mapping(bytes32 => EnumerableSet.AddressSet) private _roleMembers;\n\n    /**\n     * @dev See {IERC165-supportsInterface}.\n     */\n    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {\n        return interfaceId == type(IAccessControlEnumerable).interfaceId || super.supportsInterface(interfaceId);\n    }\n\n    /**\n     * @dev Returns one of the accounts that have `role`. `index` must be a\n     * value between 0 and {getRoleMemberCount}, non-inclusive.\n     *\n     * Role bearers are not sorted in any particular way, and their ordering may\n     * change at any point.\n     *\n     * WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure\n     * you perform all queries on the same block. See the following\n     * https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post]\n     * for more information.\n     */\n    function getRoleMember(bytes32 role, uint256 index) public view virtual override returns (address) {\n        return _roleMembers[role].at(index);\n    }\n\n    /**\n     * @dev Returns the number of accounts that have `role`. Can be used\n     * together with {getRoleMember} to enumerate all bearers of a role.\n     */\n    function getRoleMemberCount(bytes32 role) public view virtual override returns (uint256) {\n        return _roleMembers[role].length();\n    }\n\n    /**\n     * @dev Overload {_grantRole} to track enumerable memberships\n     */\n    function _grantRole(bytes32 role, address account) internal virtual override {\n        super._grantRole(role, account);\n        _roleMembers[role].add(account);\n    }\n\n    /**\n     * @dev Overload {_revokeRole} to track enumerable memberships\n     */\n    function _revokeRole(bytes32 role, address account) internal virtual override {\n        super._revokeRole(role, account);\n        _roleMembers[role].remove(account);\n    }\n}\n'
      },
      'lib/signals-implicit-mode/src/helper/SignalsImplicitMode.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.13;\n\nimport { IImplicitProjectValidation } from "../registry/IImplicitProjectValidation.sol";\n\nimport { ERC165, IERC165 } from "openzeppelin-contracts/contracts/utils/introspection/ERC165.sol";\nimport { Attestation } from "sequence-v3/src/extensions/sessions/implicit/Attestation.sol";\nimport { ISignalsImplicitMode } from "sequence-v3/src/extensions/sessions/implicit/ISignalsImplicitMode.sol";\nimport { Payload } from "sequence-v3/src/modules/Payload.sol";\n\n/// @title SignalsImplicitMode\n/// @author Michael Standen\n/// @notice Base contract for implicit mode validation by project\nabstract contract SignalsImplicitMode is ISignalsImplicitMode, ERC165 {\n\n  IImplicitProjectValidation internal _validator;\n  bytes32 internal _projectId;\n\n  /// @notice Initialize implicit mode validation\n  /// @param validator The IImplicitProjectValidation address\n  /// @param projectId The project id\n  function _initializeSignalsImplicitMode(address validator, bytes32 projectId) internal {\n    _validator = IImplicitProjectValidation(validator);\n    _projectId = projectId;\n  }\n\n  /// @inheritdoc ISignalsImplicitMode\n  function acceptImplicitRequest(\n    address wallet,\n    Attestation calldata attestation,\n    Payload.Call calldata call\n  ) external view returns (bytes32) {\n    _validateImplicitRequest(wallet, attestation, call);\n    return _validator.validateAttestation(wallet, attestation, _projectId);\n  }\n\n  /// @notice Validates an implicit request\n  /// @dev Optional hook for additional validation of the implicit requests\n  /// @param wallet The wallet\'s address\n  /// @param attestation The attestation data\n  /// @param call The call to validate\n  function _validateImplicitRequest(\n    address wallet,\n    Attestation calldata attestation,\n    Payload.Call calldata call\n  ) internal view virtual { }\n\n  /// @inheritdoc IERC165\n  function supportsInterface(\n    bytes4 interfaceId\n  ) public view virtual override returns (bool) {\n    return interfaceId == type(ISignalsImplicitMode).interfaceId || super.supportsInterface(interfaceId);\n  }\n\n}\n'
      },
      'lib/openzeppelin-contracts/contracts/access/IAccessControlEnumerable.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts v4.4.1 (access/IAccessControlEnumerable.sol)\n\npragma solidity ^0.8.0;\n\nimport "./IAccessControl.sol";\n\n/**\n * @dev External interface of AccessControlEnumerable declared to support ERC165 detection.\n */\ninterface IAccessControlEnumerable is IAccessControl {\n    /**\n     * @dev Returns one of the accounts that have `role`. `index` must be a\n     * value between 0 and {getRoleMemberCount}, non-inclusive.\n     *\n     * Role bearers are not sorted in any particular way, and their ordering may\n     * change at any point.\n     *\n     * WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure\n     * you perform all queries on the same block. See the following\n     * https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post]\n     * for more information.\n     */\n    function getRoleMember(bytes32 role, uint256 index) external view returns (address);\n\n    /**\n     * @dev Returns the number of accounts that have `role`. Can be used\n     * together with {getRoleMember} to enumerate all bearers of a role.\n     */\n    function getRoleMemberCount(bytes32 role) external view returns (uint256);\n}\n'
      },
      'lib/openzeppelin-contracts/contracts/access/AccessControl.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.9.0) (access/AccessControl.sol)\n\npragma solidity ^0.8.0;\n\nimport "./IAccessControl.sol";\nimport "../utils/Context.sol";\nimport "../utils/Strings.sol";\nimport "../utils/introspection/ERC165.sol";\n\n/**\n * @dev Contract module that allows children to implement role-based access\n * control mechanisms. This is a lightweight version that doesn\'t allow enumerating role\n * members except through off-chain means by accessing the contract event logs. Some\n * applications may benefit from on-chain enumerability, for those cases see\n * {AccessControlEnumerable}.\n *\n * Roles are referred to by their `bytes32` identifier. These should be exposed\n * in the external API and be unique. The best way to achieve this is by\n * using `public constant` hash digests:\n *\n * ```solidity\n * bytes32 public constant MY_ROLE = keccak256("MY_ROLE");\n * ```\n *\n * Roles can be used to represent a set of permissions. To restrict access to a\n * function call, use {hasRole}:\n *\n * ```solidity\n * function foo() public {\n *     require(hasRole(MY_ROLE, msg.sender));\n *     ...\n * }\n * ```\n *\n * Roles can be granted and revoked dynamically via the {grantRole} and\n * {revokeRole} functions. Each role has an associated admin role, and only\n * accounts that have a role\'s admin role can call {grantRole} and {revokeRole}.\n *\n * By default, the admin role for all roles is `DEFAULT_ADMIN_ROLE`, which means\n * that only accounts with this role will be able to grant or revoke other\n * roles. More complex role relationships can be created by using\n * {_setRoleAdmin}.\n *\n * WARNING: The `DEFAULT_ADMIN_ROLE` is also its own admin: it has permission to\n * grant and revoke this role. Extra precautions should be taken to secure\n * accounts that have been granted it. We recommend using {AccessControlDefaultAdminRules}\n * to enforce additional security measures for this role.\n */\nabstract contract AccessControl is Context, IAccessControl, ERC165 {\n    struct RoleData {\n        mapping(address => bool) members;\n        bytes32 adminRole;\n    }\n\n    mapping(bytes32 => RoleData) private _roles;\n\n    bytes32 public constant DEFAULT_ADMIN_ROLE = 0x00;\n\n    /**\n     * @dev Modifier that checks that an account has a specific role. Reverts\n     * with a standardized message including the required role.\n     *\n     * The format of the revert reason is given by the following regular expression:\n     *\n     *  /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/\n     *\n     * _Available since v4.1._\n     */\n    modifier onlyRole(bytes32 role) {\n        _checkRole(role);\n        _;\n    }\n\n    /**\n     * @dev See {IERC165-supportsInterface}.\n     */\n    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {\n        return interfaceId == type(IAccessControl).interfaceId || super.supportsInterface(interfaceId);\n    }\n\n    /**\n     * @dev Returns `true` if `account` has been granted `role`.\n     */\n    function hasRole(bytes32 role, address account) public view virtual override returns (bool) {\n        return _roles[role].members[account];\n    }\n\n    /**\n     * @dev Revert with a standard message if `_msgSender()` is missing `role`.\n     * Overriding this function changes the behavior of the {onlyRole} modifier.\n     *\n     * Format of the revert message is described in {_checkRole}.\n     *\n     * _Available since v4.6._\n     */\n    function _checkRole(bytes32 role) internal view virtual {\n        _checkRole(role, _msgSender());\n    }\n\n    /**\n     * @dev Revert with a standard message if `account` is missing `role`.\n     *\n     * The format of the revert reason is given by the following regular expression:\n     *\n     *  /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/\n     */\n    function _checkRole(bytes32 role, address account) internal view virtual {\n        if (!hasRole(role, account)) {\n            revert(\n                string(\n                    abi.encodePacked(\n                        "AccessControl: account ",\n                        Strings.toHexString(account),\n                        " is missing role ",\n                        Strings.toHexString(uint256(role), 32)\n                    )\n                )\n            );\n        }\n    }\n\n    /**\n     * @dev Returns the admin role that controls `role`. See {grantRole} and\n     * {revokeRole}.\n     *\n     * To change a role\'s admin, use {_setRoleAdmin}.\n     */\n    function getRoleAdmin(bytes32 role) public view virtual override returns (bytes32) {\n        return _roles[role].adminRole;\n    }\n\n    /**\n     * @dev Grants `role` to `account`.\n     *\n     * If `account` had not been already granted `role`, emits a {RoleGranted}\n     * event.\n     *\n     * Requirements:\n     *\n     * - the caller must have ``role``\'s admin role.\n     *\n     * May emit a {RoleGranted} event.\n     */\n    function grantRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {\n        _grantRole(role, account);\n    }\n\n    /**\n     * @dev Revokes `role` from `account`.\n     *\n     * If `account` had been granted `role`, emits a {RoleRevoked} event.\n     *\n     * Requirements:\n     *\n     * - the caller must have ``role``\'s admin role.\n     *\n     * May emit a {RoleRevoked} event.\n     */\n    function revokeRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {\n        _revokeRole(role, account);\n    }\n\n    /**\n     * @dev Revokes `role` from the calling account.\n     *\n     * Roles are often managed via {grantRole} and {revokeRole}: this function\'s\n     * purpose is to provide a mechanism for accounts to lose their privileges\n     * if they are compromised (such as when a trusted device is misplaced).\n     *\n     * If the calling account had been revoked `role`, emits a {RoleRevoked}\n     * event.\n     *\n     * Requirements:\n     *\n     * - the caller must be `account`.\n     *\n     * May emit a {RoleRevoked} event.\n     */\n    function renounceRole(bytes32 role, address account) public virtual override {\n        require(account == _msgSender(), "AccessControl: can only renounce roles for self");\n\n        _revokeRole(role, account);\n    }\n\n    /**\n     * @dev Grants `role` to `account`.\n     *\n     * If `account` had not been already granted `role`, emits a {RoleGranted}\n     * event. Note that unlike {grantRole}, this function doesn\'t perform any\n     * checks on the calling account.\n     *\n     * May emit a {RoleGranted} event.\n     *\n     * [WARNING]\n     * ====\n     * This function should only be called from the constructor when setting\n     * up the initial roles for the system.\n     *\n     * Using this function in any other way is effectively circumventing the admin\n     * system imposed by {AccessControl}.\n     * ====\n     *\n     * NOTE: This function is deprecated in favor of {_grantRole}.\n     */\n    function _setupRole(bytes32 role, address account) internal virtual {\n        _grantRole(role, account);\n    }\n\n    /**\n     * @dev Sets `adminRole` as ``role``\'s admin role.\n     *\n     * Emits a {RoleAdminChanged} event.\n     */\n    function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal virtual {\n        bytes32 previousAdminRole = getRoleAdmin(role);\n        _roles[role].adminRole = adminRole;\n        emit RoleAdminChanged(role, previousAdminRole, adminRole);\n    }\n\n    /**\n     * @dev Grants `role` to `account`.\n     *\n     * Internal function without access restriction.\n     *\n     * May emit a {RoleGranted} event.\n     */\n    function _grantRole(bytes32 role, address account) internal virtual {\n        if (!hasRole(role, account)) {\n            _roles[role].members[account] = true;\n            emit RoleGranted(role, account, _msgSender());\n        }\n    }\n\n    /**\n     * @dev Revokes `role` from `account`.\n     *\n     * Internal function without access restriction.\n     *\n     * May emit a {RoleRevoked} event.\n     */\n    function _revokeRole(bytes32 role, address account) internal virtual {\n        if (hasRole(role, account)) {\n            _roles[role].members[account] = false;\n            emit RoleRevoked(role, account, _msgSender());\n        }\n    }\n}\n'
      },
      'lib/openzeppelin-contracts/contracts/utils/structs/EnumerableSet.sol': {
        content:
          "// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.9.0) (utils/structs/EnumerableSet.sol)\n// This file was procedurally generated from scripts/generate/templates/EnumerableSet.js.\n\npragma solidity ^0.8.0;\n\n/**\n * @dev Library for managing\n * https://en.wikipedia.org/wiki/Set_(abstract_data_type)[sets] of primitive\n * types.\n *\n * Sets have the following properties:\n *\n * - Elements are added, removed, and checked for existence in constant time\n * (O(1)).\n * - Elements are enumerated in O(n). No guarantees are made on the ordering.\n *\n * ```solidity\n * contract Example {\n *     // Add the library methods\n *     using EnumerableSet for EnumerableSet.AddressSet;\n *\n *     // Declare a set state variable\n *     EnumerableSet.AddressSet private mySet;\n * }\n * ```\n *\n * As of v3.3.0, sets of type `bytes32` (`Bytes32Set`), `address` (`AddressSet`)\n * and `uint256` (`UintSet`) are supported.\n *\n * [WARNING]\n * ====\n * Trying to delete such a structure from storage will likely result in data corruption, rendering the structure\n * unusable.\n * See https://github.com/ethereum/solidity/pull/11843[ethereum/solidity#11843] for more info.\n *\n * In order to clean an EnumerableSet, you can either remove all elements one by one or create a fresh instance using an\n * array of EnumerableSet.\n * ====\n */\nlibrary EnumerableSet {\n    // To implement this library for multiple types with as little code\n    // repetition as possible, we write it in terms of a generic Set type with\n    // bytes32 values.\n    // The Set implementation uses private functions, and user-facing\n    // implementations (such as AddressSet) are just wrappers around the\n    // underlying Set.\n    // This means that we can only create new EnumerableSets for types that fit\n    // in bytes32.\n\n    struct Set {\n        // Storage of set values\n        bytes32[] _values;\n        // Position of the value in the `values` array, plus 1 because index 0\n        // means a value is not in the set.\n        mapping(bytes32 => uint256) _indexes;\n    }\n\n    /**\n     * @dev Add a value to a set. O(1).\n     *\n     * Returns true if the value was added to the set, that is if it was not\n     * already present.\n     */\n    function _add(Set storage set, bytes32 value) private returns (bool) {\n        if (!_contains(set, value)) {\n            set._values.push(value);\n            // The value is stored at length-1, but we add 1 to all indexes\n            // and use 0 as a sentinel value\n            set._indexes[value] = set._values.length;\n            return true;\n        } else {\n            return false;\n        }\n    }\n\n    /**\n     * @dev Removes a value from a set. O(1).\n     *\n     * Returns true if the value was removed from the set, that is if it was\n     * present.\n     */\n    function _remove(Set storage set, bytes32 value) private returns (bool) {\n        // We read and store the value's index to prevent multiple reads from the same storage slot\n        uint256 valueIndex = set._indexes[value];\n\n        if (valueIndex != 0) {\n            // Equivalent to contains(set, value)\n            // To delete an element from the _values array in O(1), we swap the element to delete with the last one in\n            // the array, and then remove the last element (sometimes called as 'swap and pop').\n            // This modifies the order of the array, as noted in {at}.\n\n            uint256 toDeleteIndex = valueIndex - 1;\n            uint256 lastIndex = set._values.length - 1;\n\n            if (lastIndex != toDeleteIndex) {\n                bytes32 lastValue = set._values[lastIndex];\n\n                // Move the last value to the index where the value to delete is\n                set._values[toDeleteIndex] = lastValue;\n                // Update the index for the moved value\n                set._indexes[lastValue] = valueIndex; // Replace lastValue's index to valueIndex\n            }\n\n            // Delete the slot where the moved value was stored\n            set._values.pop();\n\n            // Delete the index for the deleted slot\n            delete set._indexes[value];\n\n            return true;\n        } else {\n            return false;\n        }\n    }\n\n    /**\n     * @dev Returns true if the value is in the set. O(1).\n     */\n    function _contains(Set storage set, bytes32 value) private view returns (bool) {\n        return set._indexes[value] != 0;\n    }\n\n    /**\n     * @dev Returns the number of values on the set. O(1).\n     */\n    function _length(Set storage set) private view returns (uint256) {\n        return set._values.length;\n    }\n\n    /**\n     * @dev Returns the value stored at position `index` in the set. O(1).\n     *\n     * Note that there are no guarantees on the ordering of values inside the\n     * array, and it may change when more values are added or removed.\n     *\n     * Requirements:\n     *\n     * - `index` must be strictly less than {length}.\n     */\n    function _at(Set storage set, uint256 index) private view returns (bytes32) {\n        return set._values[index];\n    }\n\n    /**\n     * @dev Return the entire set in an array\n     *\n     * WARNING: This operation will copy the entire storage to memory, which can be quite expensive. This is designed\n     * to mostly be used by view accessors that are queried without any gas fees. Developers should keep in mind that\n     * this function has an unbounded cost, and using it as part of a state-changing function may render the function\n     * uncallable if the set grows to a point where copying to memory consumes too much gas to fit in a block.\n     */\n    function _values(Set storage set) private view returns (bytes32[] memory) {\n        return set._values;\n    }\n\n    // Bytes32Set\n\n    struct Bytes32Set {\n        Set _inner;\n    }\n\n    /**\n     * @dev Add a value to a set. O(1).\n     *\n     * Returns true if the value was added to the set, that is if it was not\n     * already present.\n     */\n    function add(Bytes32Set storage set, bytes32 value) internal returns (bool) {\n        return _add(set._inner, value);\n    }\n\n    /**\n     * @dev Removes a value from a set. O(1).\n     *\n     * Returns true if the value was removed from the set, that is if it was\n     * present.\n     */\n    function remove(Bytes32Set storage set, bytes32 value) internal returns (bool) {\n        return _remove(set._inner, value);\n    }\n\n    /**\n     * @dev Returns true if the value is in the set. O(1).\n     */\n    function contains(Bytes32Set storage set, bytes32 value) internal view returns (bool) {\n        return _contains(set._inner, value);\n    }\n\n    /**\n     * @dev Returns the number of values in the set. O(1).\n     */\n    function length(Bytes32Set storage set) internal view returns (uint256) {\n        return _length(set._inner);\n    }\n\n    /**\n     * @dev Returns the value stored at position `index` in the set. O(1).\n     *\n     * Note that there are no guarantees on the ordering of values inside the\n     * array, and it may change when more values are added or removed.\n     *\n     * Requirements:\n     *\n     * - `index` must be strictly less than {length}.\n     */\n    function at(Bytes32Set storage set, uint256 index) internal view returns (bytes32) {\n        return _at(set._inner, index);\n    }\n\n    /**\n     * @dev Return the entire set in an array\n     *\n     * WARNING: This operation will copy the entire storage to memory, which can be quite expensive. This is designed\n     * to mostly be used by view accessors that are queried without any gas fees. Developers should keep in mind that\n     * this function has an unbounded cost, and using it as part of a state-changing function may render the function\n     * uncallable if the set grows to a point where copying to memory consumes too much gas to fit in a block.\n     */\n    function values(Bytes32Set storage set) internal view returns (bytes32[] memory) {\n        bytes32[] memory store = _values(set._inner);\n        bytes32[] memory result;\n\n        /// @solidity memory-safe-assembly\n        assembly {\n            result := store\n        }\n\n        return result;\n    }\n\n    // AddressSet\n\n    struct AddressSet {\n        Set _inner;\n    }\n\n    /**\n     * @dev Add a value to a set. O(1).\n     *\n     * Returns true if the value was added to the set, that is if it was not\n     * already present.\n     */\n    function add(AddressSet storage set, address value) internal returns (bool) {\n        return _add(set._inner, bytes32(uint256(uint160(value))));\n    }\n\n    /**\n     * @dev Removes a value from a set. O(1).\n     *\n     * Returns true if the value was removed from the set, that is if it was\n     * present.\n     */\n    function remove(AddressSet storage set, address value) internal returns (bool) {\n        return _remove(set._inner, bytes32(uint256(uint160(value))));\n    }\n\n    /**\n     * @dev Returns true if the value is in the set. O(1).\n     */\n    function contains(AddressSet storage set, address value) internal view returns (bool) {\n        return _contains(set._inner, bytes32(uint256(uint160(value))));\n    }\n\n    /**\n     * @dev Returns the number of values in the set. O(1).\n     */\n    function length(AddressSet storage set) internal view returns (uint256) {\n        return _length(set._inner);\n    }\n\n    /**\n     * @dev Returns the value stored at position `index` in the set. O(1).\n     *\n     * Note that there are no guarantees on the ordering of values inside the\n     * array, and it may change when more values are added or removed.\n     *\n     * Requirements:\n     *\n     * - `index` must be strictly less than {length}.\n     */\n    function at(AddressSet storage set, uint256 index) internal view returns (address) {\n        return address(uint160(uint256(_at(set._inner, index))));\n    }\n\n    /**\n     * @dev Return the entire set in an array\n     *\n     * WARNING: This operation will copy the entire storage to memory, which can be quite expensive. This is designed\n     * to mostly be used by view accessors that are queried without any gas fees. Developers should keep in mind that\n     * this function has an unbounded cost, and using it as part of a state-changing function may render the function\n     * uncallable if the set grows to a point where copying to memory consumes too much gas to fit in a block.\n     */\n    function values(AddressSet storage set) internal view returns (address[] memory) {\n        bytes32[] memory store = _values(set._inner);\n        address[] memory result;\n\n        /// @solidity memory-safe-assembly\n        assembly {\n            result := store\n        }\n\n        return result;\n    }\n\n    // UintSet\n\n    struct UintSet {\n        Set _inner;\n    }\n\n    /**\n     * @dev Add a value to a set. O(1).\n     *\n     * Returns true if the value was added to the set, that is if it was not\n     * already present.\n     */\n    function add(UintSet storage set, uint256 value) internal returns (bool) {\n        return _add(set._inner, bytes32(value));\n    }\n\n    /**\n     * @dev Removes a value from a set. O(1).\n     *\n     * Returns true if the value was removed from the set, that is if it was\n     * present.\n     */\n    function remove(UintSet storage set, uint256 value) internal returns (bool) {\n        return _remove(set._inner, bytes32(value));\n    }\n\n    /**\n     * @dev Returns true if the value is in the set. O(1).\n     */\n    function contains(UintSet storage set, uint256 value) internal view returns (bool) {\n        return _contains(set._inner, bytes32(value));\n    }\n\n    /**\n     * @dev Returns the number of values in the set. O(1).\n     */\n    function length(UintSet storage set) internal view returns (uint256) {\n        return _length(set._inner);\n    }\n\n    /**\n     * @dev Returns the value stored at position `index` in the set. O(1).\n     *\n     * Note that there are no guarantees on the ordering of values inside the\n     * array, and it may change when more values are added or removed.\n     *\n     * Requirements:\n     *\n     * - `index` must be strictly less than {length}.\n     */\n    function at(UintSet storage set, uint256 index) internal view returns (uint256) {\n        return uint256(_at(set._inner, index));\n    }\n\n    /**\n     * @dev Return the entire set in an array\n     *\n     * WARNING: This operation will copy the entire storage to memory, which can be quite expensive. This is designed\n     * to mostly be used by view accessors that are queried without any gas fees. Developers should keep in mind that\n     * this function has an unbounded cost, and using it as part of a state-changing function may render the function\n     * uncallable if the set grows to a point where copying to memory consumes too much gas to fit in a block.\n     */\n    function values(UintSet storage set) internal view returns (uint256[] memory) {\n        bytes32[] memory store = _values(set._inner);\n        uint256[] memory result;\n\n        /// @solidity memory-safe-assembly\n        assembly {\n            result := store\n        }\n\n        return result;\n    }\n}\n"
      },
      'lib/signals-implicit-mode/src/registry/IImplicitProjectValidation.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.13;\n\nimport { Attestation } from "sequence-v3/src/extensions/sessions/implicit/Attestation.sol";\n\n/// @title IImplicitProjectValidation\n/// @author Michael Standen\n/// @notice Interface for contracts supporting validation of implicit sessions for projects\ninterface IImplicitProjectValidation {\n\n  /// @notice Invalid redirect url error\n  error InvalidRedirectUrl();\n\n  /// @notice Check if a project has a code\n  /// @param wallet The wallet address\n  /// @param attestation The attestation\n  /// @param projectId The project id\n  /// @return magic The attestation magic bytes for the wallet address\n  function validateAttestation(\n    address wallet,\n    Attestation calldata attestation,\n    bytes32 projectId\n  ) external view returns (bytes32);\n\n}\n'
      },
      'lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts v4.4.1 (utils/introspection/ERC165.sol)\n\npragma solidity ^0.8.0;\n\nimport "./IERC165.sol";\n\n/**\n * @dev Implementation of the {IERC165} interface.\n *\n * Contracts that want to implement ERC165 should inherit from this contract and override {supportsInterface} to check\n * for the additional interface id that will be supported. For example:\n *\n * ```solidity\n * function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {\n *     return interfaceId == type(MyInterface).interfaceId || super.supportsInterface(interfaceId);\n * }\n * ```\n *\n * Alternatively, {ERC165Storage} provides an easier to use but more expensive implementation.\n */\nabstract contract ERC165 is IERC165 {\n    /**\n     * @dev See {IERC165-supportsInterface}.\n     */\n    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {\n        return interfaceId == type(IERC165).interfaceId;\n    }\n}\n'
      },
      'lib/signals-implicit-mode/lib/sequence-v3/src/extensions/sessions/implicit/Attestation.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.27;\n\nimport { LibBytes } from "../../../utils/LibBytes.sol";\nimport { ACCEPT_IMPLICIT_REQUEST_MAGIC_PREFIX } from "./ISignalsImplicitMode.sol";\n\nusing LibBytes for bytes;\n\n/// @notice Attestation for a specific session\n/// @param approvedSigner Address of the approved signer\n/// @param identityType Identity type\n/// @param issuerHash Hash of the issuer\n/// @param audienceHash Hash of the audience\n/// @param applicationData Unspecified application data\n/// @param authData Auth data\nstruct Attestation {\n  address approvedSigner;\n  bytes4 identityType;\n  bytes32 issuerHash;\n  bytes32 audienceHash;\n  bytes applicationData;\n  AuthData authData;\n}\n\n/// @notice Auth data for an attestation\n/// @param redirectUrl Authorization redirect URL\n/// @param issuedAt Timestamp of the attestation issuance\nstruct AuthData {\n  string redirectUrl;\n  uint64 issuedAt;\n}\n\n/// @title LibAttestation\n/// @author Michael Standen\n/// @notice Library for attestation management\nlibrary LibAttestation {\n\n  /// @notice Hashes an attestation\n  function toHash(\n    Attestation memory attestation\n  ) internal pure returns (bytes32) {\n    return keccak256(toPacked(attestation));\n  }\n\n  /// @notice Decodes an attestation from a packed bytes array\n  /// @param encoded The packed bytes array\n  /// @param pointer The pointer to the start of the attestation\n  /// @return attestation The decoded attestation\n  /// @return newPointer The new pointer to the end of the attestation\n  function fromPacked(\n    bytes calldata encoded,\n    uint256 pointer\n  ) internal pure returns (Attestation memory attestation, uint256 newPointer) {\n    newPointer = pointer;\n    (attestation.approvedSigner, newPointer) = encoded.readAddress(newPointer);\n    (attestation.identityType, newPointer) = encoded.readBytes4(newPointer);\n    (attestation.issuerHash, newPointer) = encoded.readBytes32(newPointer);\n    (attestation.audienceHash, newPointer) = encoded.readBytes32(newPointer);\n    // Application data (arbitrary bytes)\n    uint256 dataSize;\n    (dataSize, newPointer) = encoded.readUint24(newPointer);\n    attestation.applicationData = encoded[newPointer:newPointer + dataSize];\n    newPointer += dataSize;\n    // Auth data\n    (attestation.authData, newPointer) = fromPackedAuthData(encoded, newPointer);\n    return (attestation, newPointer);\n  }\n\n  /// @notice Decodes the auth data from a packed bytes\n  /// @param encoded The packed bytes containing the auth data\n  /// @param pointer The pointer to the start of the auth data within the encoded data\n  /// @return authData The decoded auth data\n  /// @return newPointer The pointer to the end of the auth data within the encoded data\n  function fromPackedAuthData(\n    bytes calldata encoded,\n    uint256 pointer\n  ) internal pure returns (AuthData memory authData, uint256 newPointer) {\n    uint24 redirectUrlLength;\n    (redirectUrlLength, pointer) = encoded.readUint24(pointer);\n    authData.redirectUrl = string(encoded[pointer:pointer + redirectUrlLength]);\n    pointer += redirectUrlLength;\n    (authData.issuedAt, pointer) = encoded.readUint64(pointer);\n    return (authData, pointer);\n  }\n\n  /// @notice Encodes an attestation into a packed bytes array\n  /// @param attestation The attestation to encode\n  /// @return encoded The packed bytes array\n  function toPacked(\n    Attestation memory attestation\n  ) internal pure returns (bytes memory encoded) {\n    return abi.encodePacked(\n      attestation.approvedSigner,\n      attestation.identityType,\n      attestation.issuerHash,\n      attestation.audienceHash,\n      uint24(attestation.applicationData.length),\n      attestation.applicationData,\n      toPackAuthData(attestation.authData)\n    );\n  }\n\n  /// @notice Encodes the auth data into a packed bytes array\n  /// @param authData The auth data to encode\n  /// @return encoded The packed bytes array\n  function toPackAuthData(\n    AuthData memory authData\n  ) internal pure returns (bytes memory encoded) {\n    return abi.encodePacked(uint24(bytes(authData.redirectUrl).length), bytes(authData.redirectUrl), authData.issuedAt);\n  }\n\n  /// @notice Generates the implicit request magic return value\n  /// @param attestation The attestation\n  /// @param wallet The wallet\n  /// @return magic The expected implicit request magic\n  function generateImplicitRequestMagic(Attestation memory attestation, address wallet) internal pure returns (bytes32) {\n    return keccak256(\n      abi.encodePacked(ACCEPT_IMPLICIT_REQUEST_MAGIC_PREFIX, wallet, attestation.audienceHash, attestation.issuerHash)\n    );\n  }\n\n}\n'
      },
      'lib/signals-implicit-mode/lib/sequence-v3/src/extensions/sessions/implicit/ISignalsImplicitMode.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.27;\n\nimport { Payload } from "../../../modules/Payload.sol";\nimport { Attestation } from "./Attestation.sol";\n\n/// @dev Magic prefix for the implicit request\nbytes32 constant ACCEPT_IMPLICIT_REQUEST_MAGIC_PREFIX = keccak256(abi.encodePacked("acceptImplicitRequest"));\n\n/// @title ISignalsImplicitMode\n/// @author Agustin Aguilar, Michael Standen\n/// @notice Interface for the contracts that support implicit mode validation\ninterface ISignalsImplicitMode {\n\n  /// @notice Determines if an implicit request is valid\n  /// @param wallet The wallet\'s address\n  /// @param attestation The attestation data\n  /// @param call The call to validate\n  /// @return magic The hash of the implicit request if valid\n  function acceptImplicitRequest(\n    address wallet,\n    Attestation calldata attestation,\n    Payload.Call calldata call\n  ) external view returns (bytes32 magic);\n\n}\n'
      },
      'lib/signals-implicit-mode/lib/sequence-v3/src/modules/Payload.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.27;\n\nimport { LibBytes } from "../utils/LibBytes.sol";\n\nusing LibBytes for bytes;\n\n/// @title Payload\n/// @author Agustin Aguilar, Michael Standen, William Hua\n/// @notice Library for encoding and decoding payloads\nlibrary Payload {\n\n  /// @notice Error thrown when the kind is invalid\n  error InvalidKind(uint8 kind);\n\n  /// @dev keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")\n  bytes32 private constant EIP712_DOMAIN_TYPEHASH = 0x8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f;\n\n  /// @dev keccak256("Sequence Wallet")\n  bytes32 private constant EIP712_DOMAIN_NAME_SEQUENCE =\n    0x4aa45ca7ad825ceb1bf35643f0a58c295239df563b1b565c2485f96477c56318;\n\n  /// @dev keccak256("3")\n  bytes32 private constant EIP712_DOMAIN_VERSION_SEQUENCE =\n    0x2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de;\n\n  function domainSeparator(bool _noChainId, address _wallet) internal view returns (bytes32 _domainSeparator) {\n    return keccak256(\n      abi.encode(\n        EIP712_DOMAIN_TYPEHASH,\n        EIP712_DOMAIN_NAME_SEQUENCE,\n        EIP712_DOMAIN_VERSION_SEQUENCE,\n        _noChainId ? uint256(0) : uint256(block.chainid),\n        _wallet\n      )\n    );\n  }\n\n  /// @dev keccak256("Call(address to,uint256 value,bytes data,uint256 gasLimit,bool delegateCall,bool onlyFallback,uint256 behaviorOnError)")\n  bytes32 private constant CALL_TYPEHASH = 0x0603985259a953da1f65a522f589c17bd1d0117ec1d3abb7c0788aef251ef437;\n\n  /// @dev keccak256("Calls(Call[] calls,uint256 space,uint256 nonce,address[] wallets)Call(address to,uint256 value,bytes data,uint256 gasLimit,bool delegateCall,bool onlyFallback,uint256 behaviorOnError)")\n  bytes32 private constant CALLS_TYPEHASH = 0x11e1e4079a79a66e4ade50033cfe2678cdd5341d2dfe5ef9513edb1a0be147a2;\n\n  /// @dev keccak256("Message(bytes message,address[] wallets)")\n  bytes32 private constant MESSAGE_TYPEHASH = 0xe19a3b94fc3c7ece3f890d98a99bc422615537a08dea0603fa8425867d87d466;\n\n  /// @dev keccak256("ConfigUpdate(bytes32 imageHash,address[] wallets)")\n  bytes32 private constant CONFIG_UPDATE_TYPEHASH = 0x11fdeb7e8373a1aa96bfac8d0ea91526b2c5d15e5cee20e0543e780258f3e8e4;\n\n  /// @notice Kind of transaction\n  uint8 public constant KIND_TRANSACTIONS = 0x00;\n  /// @notice Kind of digest\n  uint8 public constant KIND_MESSAGE = 0x01;\n  /// @notice Kind of config update\n  uint8 public constant KIND_CONFIG_UPDATE = 0x02;\n  /// @notice Kind of message\n  uint8 public constant KIND_DIGEST = 0x03;\n\n  /// @notice Behavior on error: ignore error\n  uint8 public constant BEHAVIOR_IGNORE_ERROR = 0x00;\n  /// @notice Behavior on error: revert on error\n  uint8 public constant BEHAVIOR_REVERT_ON_ERROR = 0x01;\n  /// @notice Behavior on error: abort on error\n  uint8 public constant BEHAVIOR_ABORT_ON_ERROR = 0x02;\n\n  /// @notice Payload call information\n  /// @param to Address of the target contract\n  /// @param value Value to send with the call\n  /// @param data Data to send with the call\n  /// @param gasLimit Gas limit for the call\n  /// @param delegateCall If the call is a delegate call\n  /// @param onlyFallback If the call should only be executed in an error scenario\n  /// @param behaviorOnError Behavior on error\n  struct Call {\n    address to;\n    uint256 value;\n    bytes data;\n    uint256 gasLimit;\n    bool delegateCall;\n    bool onlyFallback;\n    uint256 behaviorOnError;\n  }\n\n  /// @notice Decoded payload\n  /// @param kind Kind of payload\n  /// @param noChainId If the chain ID should be omitted\n  /// @param calls Array of calls (transaction kind)\n  /// @param space Nonce space for the calls (transaction kind)\n  /// @param nonce Nonce value for the calls (transaction kind)\n  /// @param message Message to validate (message kind)\n  /// @param imageHash Image hash to update to (config update kind)\n  /// @param digest Digest to validate (digest kind)\n  /// @param parentWallets Parent wallets\n  struct Decoded {\n    uint8 kind;\n    bool noChainId;\n    // Transaction kind\n    Call[] calls;\n    uint256 space;\n    uint256 nonce;\n    // Message kind\n    // TODO: Maybe native 721 ?\n    bytes message;\n    // Config update kind\n    bytes32 imageHash;\n    // Digest kind for 1271\n    bytes32 digest;\n    // Parent wallets\n    address[] parentWallets;\n  }\n\n  function fromMessage(\n    bytes memory message\n  ) internal pure returns (Decoded memory _decoded) {\n    _decoded.kind = KIND_MESSAGE;\n    _decoded.message = message;\n  }\n\n  function fromConfigUpdate(\n    bytes32 imageHash\n  ) internal pure returns (Decoded memory _decoded) {\n    _decoded.kind = KIND_CONFIG_UPDATE;\n    _decoded.imageHash = imageHash;\n  }\n\n  function fromDigest(\n    bytes32 digest\n  ) internal pure returns (Decoded memory _decoded) {\n    _decoded.kind = KIND_DIGEST;\n    _decoded.digest = digest;\n  }\n\n  function fromPackedCalls(\n    bytes calldata packed\n  ) internal view returns (Decoded memory _decoded) {\n    _decoded.kind = KIND_TRANSACTIONS;\n\n    // Read the global flag\n    (uint256 globalFlag, uint256 pointer) = packed.readFirstUint8();\n\n    // First bit determines if space is zero or not\n    if (globalFlag & 0x01 == 0x01) {\n      _decoded.space = 0;\n    } else {\n      (_decoded.space, pointer) = packed.readUint160(pointer);\n    }\n\n    // Next 3 bits determine the size of the nonce\n    uint256 nonceSize = (globalFlag >> 1) & 0x07;\n\n    if (nonceSize > 0) {\n      // Read the nonce\n      (_decoded.nonce, pointer) = packed.readUintX(pointer, nonceSize);\n    }\n\n    uint256 numCalls;\n\n    // Bit 5 determines if the batch contains a single call\n    if (globalFlag & 0x10 == 0x10) {\n      numCalls = 1;\n    } else {\n      // Bit 6 determines if the number of calls uses 1 byte or 2 bytes\n      if (globalFlag & 0x20 == 0x20) {\n        (numCalls, pointer) = packed.readUint16(pointer);\n      } else {\n        (numCalls, pointer) = packed.readUint8(pointer);\n      }\n    }\n\n    // Read the calls\n    _decoded.calls = new Call[](numCalls);\n\n    for (uint256 i = 0; i < numCalls; i++) {\n      uint8 flags;\n      (flags, pointer) = packed.readUint8(pointer);\n\n      // First bit determines if this is a call to self\n      // or a call to another address\n      if (flags & 0x01 == 0x01) {\n        // Call to self\n        _decoded.calls[i].to = address(this);\n      } else {\n        // Call to another address\n        (_decoded.calls[i].to, pointer) = packed.readAddress(pointer);\n      }\n\n      // Second bit determines if the call has value or not\n      if (flags & 0x02 == 0x02) {\n        (_decoded.calls[i].value, pointer) = packed.readUint256(pointer);\n      }\n\n      // Third bit determines if the call has data or not\n      if (flags & 0x04 == 0x04) {\n        // 3 bytes determine the size of the calldata\n        uint256 calldataSize;\n        (calldataSize, pointer) = packed.readUint24(pointer);\n        _decoded.calls[i].data = packed[pointer:pointer + calldataSize];\n        pointer += calldataSize;\n      }\n\n      // Fourth bit determines if the call has a gas limit or not\n      if (flags & 0x08 == 0x08) {\n        (_decoded.calls[i].gasLimit, pointer) = packed.readUint256(pointer);\n      }\n\n      // Fifth bit determines if the call is a delegate call or not\n      _decoded.calls[i].delegateCall = (flags & 0x10 == 0x10);\n\n      // Sixth bit determines if the call is fallback only\n      _decoded.calls[i].onlyFallback = (flags & 0x20 == 0x20);\n\n      // Last 2 bits are directly mapped to the behavior on error\n      _decoded.calls[i].behaviorOnError = (flags & 0xC0) >> 6;\n    }\n  }\n\n  function hashCall(\n    Call memory c\n  ) internal pure returns (bytes32) {\n    return keccak256(\n      abi.encode(\n        CALL_TYPEHASH, c.to, c.value, keccak256(c.data), c.gasLimit, c.delegateCall, c.onlyFallback, c.behaviorOnError\n      )\n    );\n  }\n\n  function hashCalls(\n    Call[] memory calls\n  ) internal pure returns (bytes32) {\n    // In EIP712, an array is often hashed as the keccak256 of the concatenated\n    // hashes of each item. So we hash each Call, pack them, and hash again.\n    bytes32[] memory callHashes = new bytes32[](calls.length);\n    for (uint256 i = 0; i < calls.length; i++) {\n      callHashes[i] = hashCall(calls[i]);\n    }\n    return keccak256(abi.encodePacked(callHashes));\n  }\n\n  function toEIP712(\n    Decoded memory _decoded\n  ) internal pure returns (bytes32) {\n    bytes32 walletsHash = keccak256(abi.encodePacked(_decoded.parentWallets));\n\n    if (_decoded.kind == KIND_TRANSACTIONS) {\n      bytes32 callsHash = hashCalls(_decoded.calls);\n      // The top-level struct for Calls might be something like:\n      // Calls(bytes32 callsHash,uint256 space,uint256 nonce,bytes32 walletsHash)\n      return keccak256(abi.encode(CALLS_TYPEHASH, callsHash, _decoded.space, _decoded.nonce, walletsHash));\n    } else if (_decoded.kind == KIND_MESSAGE) {\n      // If you define your top-level as: Message(bytes32 messageHash,bytes32 walletsHash)\n      return keccak256(abi.encode(MESSAGE_TYPEHASH, keccak256(_decoded.message), walletsHash));\n    } else if (_decoded.kind == KIND_CONFIG_UPDATE) {\n      // Top-level: ConfigUpdate(bytes32 imageHash,bytes32 walletsHash)\n      return keccak256(abi.encode(CONFIG_UPDATE_TYPEHASH, _decoded.imageHash, walletsHash));\n    } else if (_decoded.kind == KIND_DIGEST) {\n      // Top-level: Use MESSAGE_TYPEHASH but assume the digest is already the hashed message\n      return keccak256(abi.encode(MESSAGE_TYPEHASH, _decoded.digest, walletsHash));\n    } else {\n      // Unknown kind\n      revert InvalidKind(_decoded.kind);\n    }\n  }\n\n  function hash(\n    Decoded memory _decoded\n  ) internal view returns (bytes32) {\n    bytes32 domain = domainSeparator(_decoded.noChainId, address(this));\n    bytes32 structHash = toEIP712(_decoded);\n    return keccak256(abi.encodePacked("\\x19\\x01", domain, structHash));\n  }\n\n  function hashFor(Decoded memory _decoded, address _wallet) internal view returns (bytes32) {\n    bytes32 domain = domainSeparator(_decoded.noChainId, _wallet);\n    bytes32 structHash = toEIP712(_decoded);\n    return keccak256(abi.encodePacked("\\x19\\x01", domain, structHash));\n  }\n\n}\n'
      },
      'lib/openzeppelin-contracts/contracts/access/IAccessControl.sol': {
        content:
          "// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts v4.4.1 (access/IAccessControl.sol)\n\npragma solidity ^0.8.0;\n\n/**\n * @dev External interface of AccessControl declared to support ERC165 detection.\n */\ninterface IAccessControl {\n    /**\n     * @dev Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole`\n     *\n     * `DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite\n     * {RoleAdminChanged} not being emitted signaling this.\n     *\n     * _Available since v3.1._\n     */\n    event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);\n\n    /**\n     * @dev Emitted when `account` is granted `role`.\n     *\n     * `sender` is the account that originated the contract call, an admin role\n     * bearer except when using {AccessControl-_setupRole}.\n     */\n    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);\n\n    /**\n     * @dev Emitted when `account` is revoked `role`.\n     *\n     * `sender` is the account that originated the contract call:\n     *   - if using `revokeRole`, it is the admin role bearer\n     *   - if using `renounceRole`, it is the role bearer (i.e. `account`)\n     */\n    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);\n\n    /**\n     * @dev Returns `true` if `account` has been granted `role`.\n     */\n    function hasRole(bytes32 role, address account) external view returns (bool);\n\n    /**\n     * @dev Returns the admin role that controls `role`. See {grantRole} and\n     * {revokeRole}.\n     *\n     * To change a role's admin, use {AccessControl-_setRoleAdmin}.\n     */\n    function getRoleAdmin(bytes32 role) external view returns (bytes32);\n\n    /**\n     * @dev Grants `role` to `account`.\n     *\n     * If `account` had not been already granted `role`, emits a {RoleGranted}\n     * event.\n     *\n     * Requirements:\n     *\n     * - the caller must have ``role``'s admin role.\n     */\n    function grantRole(bytes32 role, address account) external;\n\n    /**\n     * @dev Revokes `role` from `account`.\n     *\n     * If `account` had been granted `role`, emits a {RoleRevoked} event.\n     *\n     * Requirements:\n     *\n     * - the caller must have ``role``'s admin role.\n     */\n    function revokeRole(bytes32 role, address account) external;\n\n    /**\n     * @dev Revokes `role` from the calling account.\n     *\n     * Roles are often managed via {grantRole} and {revokeRole}: this function's\n     * purpose is to provide a mechanism for accounts to lose their privileges\n     * if they are compromised (such as when a trusted device is misplaced).\n     *\n     * If the calling account had been granted `role`, emits a {RoleRevoked}\n     * event.\n     *\n     * Requirements:\n     *\n     * - the caller must be `account`.\n     */\n    function renounceRole(bytes32 role, address account) external;\n}\n"
      },
      'lib/openzeppelin-contracts/contracts/utils/Context.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)\n\npragma solidity ^0.8.0;\n\n/**\n * @dev Provides information about the current execution context, including the\n * sender of the transaction and its data. While these are generally available\n * via msg.sender and msg.data, they should not be accessed in such a direct\n * manner, since when dealing with meta-transactions the account sending and\n * paying for execution may not be the actual sender (as far as an application\n * is concerned).\n *\n * This contract is only required for intermediate, library-like contracts.\n */\nabstract contract Context {\n    function _msgSender() internal view virtual returns (address) {\n        return msg.sender;\n    }\n\n    function _msgData() internal view virtual returns (bytes calldata) {\n        return msg.data;\n    }\n}\n'
      },
      'lib/openzeppelin-contracts/contracts/utils/Strings.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.9.0) (utils/Strings.sol)\n\npragma solidity ^0.8.0;\n\nimport "./math/Math.sol";\nimport "./math/SignedMath.sol";\n\n/**\n * @dev String operations.\n */\nlibrary Strings {\n    bytes16 private constant _SYMBOLS = "0123456789abcdef";\n    uint8 private constant _ADDRESS_LENGTH = 20;\n\n    /**\n     * @dev Converts a `uint256` to its ASCII `string` decimal representation.\n     */\n    function toString(uint256 value) internal pure returns (string memory) {\n        unchecked {\n            uint256 length = Math.log10(value) + 1;\n            string memory buffer = new string(length);\n            uint256 ptr;\n            /// @solidity memory-safe-assembly\n            assembly {\n                ptr := add(buffer, add(32, length))\n            }\n            while (true) {\n                ptr--;\n                /// @solidity memory-safe-assembly\n                assembly {\n                    mstore8(ptr, byte(mod(value, 10), _SYMBOLS))\n                }\n                value /= 10;\n                if (value == 0) break;\n            }\n            return buffer;\n        }\n    }\n\n    /**\n     * @dev Converts a `int256` to its ASCII `string` decimal representation.\n     */\n    function toString(int256 value) internal pure returns (string memory) {\n        return string(abi.encodePacked(value < 0 ? "-" : "", toString(SignedMath.abs(value))));\n    }\n\n    /**\n     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.\n     */\n    function toHexString(uint256 value) internal pure returns (string memory) {\n        unchecked {\n            return toHexString(value, Math.log256(value) + 1);\n        }\n    }\n\n    /**\n     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.\n     */\n    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {\n        bytes memory buffer = new bytes(2 * length + 2);\n        buffer[0] = "0";\n        buffer[1] = "x";\n        for (uint256 i = 2 * length + 1; i > 1; --i) {\n            buffer[i] = _SYMBOLS[value & 0xf];\n            value >>= 4;\n        }\n        require(value == 0, "Strings: hex length insufficient");\n        return string(buffer);\n    }\n\n    /**\n     * @dev Converts an `address` with fixed length of 20 bytes to its not checksummed ASCII `string` hexadecimal representation.\n     */\n    function toHexString(address addr) internal pure returns (string memory) {\n        return toHexString(uint256(uint160(addr)), _ADDRESS_LENGTH);\n    }\n\n    /**\n     * @dev Returns true if the two strings are equal.\n     */\n    function equal(string memory a, string memory b) internal pure returns (bool) {\n        return keccak256(bytes(a)) == keccak256(bytes(b));\n    }\n}\n'
      },
      'lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts v4.4.1 (utils/introspection/IERC165.sol)\n\npragma solidity ^0.8.0;\n\n/**\n * @dev Interface of the ERC165 standard, as defined in the\n * https://eips.ethereum.org/EIPS/eip-165[EIP].\n *\n * Implementers can declare support of contract interfaces, which can then be\n * queried by others ({ERC165Checker}).\n *\n * For an implementation, see {ERC165}.\n */\ninterface IERC165 {\n    /**\n     * @dev Returns true if this contract implements the interface defined by\n     * `interfaceId`. See the corresponding\n     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]\n     * to learn more about how these ids are created.\n     *\n     * This function call must use less than 30 000 gas.\n     */\n    function supportsInterface(bytes4 interfaceId) external view returns (bool);\n}\n'
      },
      'lib/signals-implicit-mode/lib/sequence-v3/src/utils/LibBytes.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.18;\n\n/// @title Library for reading data from bytes arrays\n/// @author Agustin Aguilar (aa@horizon.io), Michael Standen (mstan@horizon.io)\n/// @notice This library contains functions for reading data from bytes arrays.\n/// @dev These functions do not check if the input index is within the bounds of the data array.\n/// @dev Reading out of bounds may return dirty values.\nlibrary LibBytes {\n\n  function readFirstUint8(\n    bytes calldata _data\n  ) internal pure returns (uint8 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(_data.offset)\n      a := shr(248, word)\n      newPointer := 1\n    }\n  }\n\n  function readUint8(bytes calldata _data, uint256 _index) internal pure returns (uint8 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := shr(248, word)\n      newPointer := add(_index, 1)\n    }\n  }\n\n  function readUint16(bytes calldata _data, uint256 _index) internal pure returns (uint16 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := shr(240, word)\n      newPointer := add(_index, 2)\n    }\n  }\n\n  function readUint24(bytes calldata _data, uint256 _index) internal pure returns (uint24 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := shr(232, word)\n      newPointer := add(_index, 3)\n    }\n  }\n\n  function readUint64(bytes calldata _data, uint256 _index) internal pure returns (uint64 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := shr(192, word)\n      newPointer := add(_index, 8)\n    }\n  }\n\n  function readUint160(bytes calldata _data, uint256 _index) internal pure returns (uint160 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := shr(96, word)\n      newPointer := add(_index, 20)\n    }\n  }\n\n  function readUint256(bytes calldata _data, uint256 _index) internal pure returns (uint256 a, uint256 newPointer) {\n    assembly {\n      a := calldataload(add(_index, _data.offset))\n      newPointer := add(_index, 32)\n    }\n  }\n\n  function readUintX(\n    bytes calldata _data,\n    uint256 _index,\n    uint256 _length\n  ) internal pure returns (uint256 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      let shift := sub(256, mul(_length, 8))\n      a := and(shr(shift, word), sub(shl(mul(8, _length), 1), 1))\n      newPointer := add(_index, _length)\n    }\n  }\n\n  function readBytes4(bytes calldata _data, uint256 _pointer) internal pure returns (bytes4 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_pointer, _data.offset))\n      a := and(word, 0xffffffff00000000000000000000000000000000000000000000000000000000)\n      newPointer := add(_pointer, 4)\n    }\n  }\n\n  function readBytes32(bytes calldata _data, uint256 _pointer) internal pure returns (bytes32 a, uint256 newPointer) {\n    assembly {\n      a := calldataload(add(_pointer, _data.offset))\n      newPointer := add(_pointer, 32)\n    }\n  }\n\n  function readAddress(bytes calldata _data, uint256 _index) internal pure returns (address a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := and(shr(96, word), 0xffffffffffffffffffffffffffffffffffffffff)\n      newPointer := add(_index, 20)\n    }\n  }\n\n  /// @dev ERC-2098 Compact Signature\n  function readRSVCompact(\n    bytes calldata _data,\n    uint256 _index\n  ) internal pure returns (bytes32 r, bytes32 s, uint8 v, uint256 newPointer) {\n    uint256 yParityAndS;\n    assembly {\n      r := calldataload(add(_index, _data.offset))\n      yParityAndS := calldataload(add(_index, add(_data.offset, 32)))\n      newPointer := add(_index, 64)\n    }\n    uint256 yParity = uint256(yParityAndS >> 255);\n    s = bytes32(uint256(yParityAndS) & ((1 << 255) - 1));\n    v = uint8(yParity) + 27;\n  }\n\n}\n'
      },
      'lib/openzeppelin-contracts/contracts/utils/math/Math.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.9.0) (utils/math/Math.sol)\n\npragma solidity ^0.8.0;\n\n/**\n * @dev Standard math utilities missing in the Solidity language.\n */\nlibrary Math {\n    enum Rounding {\n        Down, // Toward negative infinity\n        Up, // Toward infinity\n        Zero // Toward zero\n    }\n\n    /**\n     * @dev Returns the largest of two numbers.\n     */\n    function max(uint256 a, uint256 b) internal pure returns (uint256) {\n        return a > b ? a : b;\n    }\n\n    /**\n     * @dev Returns the smallest of two numbers.\n     */\n    function min(uint256 a, uint256 b) internal pure returns (uint256) {\n        return a < b ? a : b;\n    }\n\n    /**\n     * @dev Returns the average of two numbers. The result is rounded towards\n     * zero.\n     */\n    function average(uint256 a, uint256 b) internal pure returns (uint256) {\n        // (a + b) / 2 can overflow.\n        return (a & b) + (a ^ b) / 2;\n    }\n\n    /**\n     * @dev Returns the ceiling of the division of two numbers.\n     *\n     * This differs from standard division with `/` in that it rounds up instead\n     * of rounding down.\n     */\n    function ceilDiv(uint256 a, uint256 b) internal pure returns (uint256) {\n        // (a + b - 1) / b can overflow on addition, so we distribute.\n        return a == 0 ? 0 : (a - 1) / b + 1;\n    }\n\n    /**\n     * @notice Calculates floor(x * y / denominator) with full precision. Throws if result overflows a uint256 or denominator == 0\n     * @dev Original credit to Remco Bloemen under MIT license (https://xn--2-umb.com/21/muldiv)\n     * with further edits by Uniswap Labs also under MIT license.\n     */\n    function mulDiv(uint256 x, uint256 y, uint256 denominator) internal pure returns (uint256 result) {\n        unchecked {\n            // 512-bit multiply [prod1 prod0] = x * y. Compute the product mod 2^256 and mod 2^256 - 1, then use\n            // use the Chinese Remainder Theorem to reconstruct the 512 bit result. The result is stored in two 256\n            // variables such that product = prod1 * 2^256 + prod0.\n            uint256 prod0; // Least significant 256 bits of the product\n            uint256 prod1; // Most significant 256 bits of the product\n            assembly {\n                let mm := mulmod(x, y, not(0))\n                prod0 := mul(x, y)\n                prod1 := sub(sub(mm, prod0), lt(mm, prod0))\n            }\n\n            // Handle non-overflow cases, 256 by 256 division.\n            if (prod1 == 0) {\n                // Solidity will revert if denominator == 0, unlike the div opcode on its own.\n                // The surrounding unchecked block does not change this fact.\n                // See https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic.\n                return prod0 / denominator;\n            }\n\n            // Make sure the result is less than 2^256. Also prevents denominator == 0.\n            require(denominator > prod1, "Math: mulDiv overflow");\n\n            ///////////////////////////////////////////////\n            // 512 by 256 division.\n            ///////////////////////////////////////////////\n\n            // Make division exact by subtracting the remainder from [prod1 prod0].\n            uint256 remainder;\n            assembly {\n                // Compute remainder using mulmod.\n                remainder := mulmod(x, y, denominator)\n\n                // Subtract 256 bit number from 512 bit number.\n                prod1 := sub(prod1, gt(remainder, prod0))\n                prod0 := sub(prod0, remainder)\n            }\n\n            // Factor powers of two out of denominator and compute largest power of two divisor of denominator. Always >= 1.\n            // See https://cs.stackexchange.com/q/138556/92363.\n\n            // Does not overflow because the denominator cannot be zero at this stage in the function.\n            uint256 twos = denominator & (~denominator + 1);\n            assembly {\n                // Divide denominator by twos.\n                denominator := div(denominator, twos)\n\n                // Divide [prod1 prod0] by twos.\n                prod0 := div(prod0, twos)\n\n                // Flip twos such that it is 2^256 / twos. If twos is zero, then it becomes one.\n                twos := add(div(sub(0, twos), twos), 1)\n            }\n\n            // Shift in bits from prod1 into prod0.\n            prod0 |= prod1 * twos;\n\n            // Invert denominator mod 2^256. Now that denominator is an odd number, it has an inverse modulo 2^256 such\n            // that denominator * inv = 1 mod 2^256. Compute the inverse by starting with a seed that is correct for\n            // four bits. That is, denominator * inv = 1 mod 2^4.\n            uint256 inverse = (3 * denominator) ^ 2;\n\n            // Use the Newton-Raphson iteration to improve the precision. Thanks to Hensel\'s lifting lemma, this also works\n            // in modular arithmetic, doubling the correct bits in each step.\n            inverse *= 2 - denominator * inverse; // inverse mod 2^8\n            inverse *= 2 - denominator * inverse; // inverse mod 2^16\n            inverse *= 2 - denominator * inverse; // inverse mod 2^32\n            inverse *= 2 - denominator * inverse; // inverse mod 2^64\n            inverse *= 2 - denominator * inverse; // inverse mod 2^128\n            inverse *= 2 - denominator * inverse; // inverse mod 2^256\n\n            // Because the division is now exact we can divide by multiplying with the modular inverse of denominator.\n            // This will give us the correct result modulo 2^256. Since the preconditions guarantee that the outcome is\n            // less than 2^256, this is the final result. We don\'t need to compute the high bits of the result and prod1\n            // is no longer required.\n            result = prod0 * inverse;\n            return result;\n        }\n    }\n\n    /**\n     * @notice Calculates x * y / denominator with full precision, following the selected rounding direction.\n     */\n    function mulDiv(uint256 x, uint256 y, uint256 denominator, Rounding rounding) internal pure returns (uint256) {\n        uint256 result = mulDiv(x, y, denominator);\n        if (rounding == Rounding.Up && mulmod(x, y, denominator) > 0) {\n            result += 1;\n        }\n        return result;\n    }\n\n    /**\n     * @dev Returns the square root of a number. If the number is not a perfect square, the value is rounded down.\n     *\n     * Inspired by Henry S. Warren, Jr.\'s "Hacker\'s Delight" (Chapter 11).\n     */\n    function sqrt(uint256 a) internal pure returns (uint256) {\n        if (a == 0) {\n            return 0;\n        }\n\n        // For our first guess, we get the biggest power of 2 which is smaller than the square root of the target.\n        //\n        // We know that the "msb" (most significant bit) of our target number `a` is a power of 2 such that we have\n        // `msb(a) <= a < 2*msb(a)`. This value can be written `msb(a)=2**k` with `k=log2(a)`.\n        //\n        // This can be rewritten `2**log2(a) <= a < 2**(log2(a) + 1)`\n        // → `sqrt(2**k) <= sqrt(a) < sqrt(2**(k+1))`\n        // → `2**(k/2) <= sqrt(a) < 2**((k+1)/2) <= 2**(k/2 + 1)`\n        //\n        // Consequently, `2**(log2(a) / 2)` is a good first approximation of `sqrt(a)` with at least 1 correct bit.\n        uint256 result = 1 << (log2(a) >> 1);\n\n        // At this point `result` is an estimation with one bit of precision. We know the true value is a uint128,\n        // since it is the square root of a uint256. Newton\'s method converges quadratically (precision doubles at\n        // every iteration). We thus need at most 7 iteration to turn our partial result with one bit of precision\n        // into the expected uint128 result.\n        unchecked {\n            result = (result + a / result) >> 1;\n            result = (result + a / result) >> 1;\n            result = (result + a / result) >> 1;\n            result = (result + a / result) >> 1;\n            result = (result + a / result) >> 1;\n            result = (result + a / result) >> 1;\n            result = (result + a / result) >> 1;\n            return min(result, a / result);\n        }\n    }\n\n    /**\n     * @notice Calculates sqrt(a), following the selected rounding direction.\n     */\n    function sqrt(uint256 a, Rounding rounding) internal pure returns (uint256) {\n        unchecked {\n            uint256 result = sqrt(a);\n            return result + (rounding == Rounding.Up && result * result < a ? 1 : 0);\n        }\n    }\n\n    /**\n     * @dev Return the log in base 2, rounded down, of a positive value.\n     * Returns 0 if given 0.\n     */\n    function log2(uint256 value) internal pure returns (uint256) {\n        uint256 result = 0;\n        unchecked {\n            if (value >> 128 > 0) {\n                value >>= 128;\n                result += 128;\n            }\n            if (value >> 64 > 0) {\n                value >>= 64;\n                result += 64;\n            }\n            if (value >> 32 > 0) {\n                value >>= 32;\n                result += 32;\n            }\n            if (value >> 16 > 0) {\n                value >>= 16;\n                result += 16;\n            }\n            if (value >> 8 > 0) {\n                value >>= 8;\n                result += 8;\n            }\n            if (value >> 4 > 0) {\n                value >>= 4;\n                result += 4;\n            }\n            if (value >> 2 > 0) {\n                value >>= 2;\n                result += 2;\n            }\n            if (value >> 1 > 0) {\n                result += 1;\n            }\n        }\n        return result;\n    }\n\n    /**\n     * @dev Return the log in base 2, following the selected rounding direction, of a positive value.\n     * Returns 0 if given 0.\n     */\n    function log2(uint256 value, Rounding rounding) internal pure returns (uint256) {\n        unchecked {\n            uint256 result = log2(value);\n            return result + (rounding == Rounding.Up && 1 << result < value ? 1 : 0);\n        }\n    }\n\n    /**\n     * @dev Return the log in base 10, rounded down, of a positive value.\n     * Returns 0 if given 0.\n     */\n    function log10(uint256 value) internal pure returns (uint256) {\n        uint256 result = 0;\n        unchecked {\n            if (value >= 10 ** 64) {\n                value /= 10 ** 64;\n                result += 64;\n            }\n            if (value >= 10 ** 32) {\n                value /= 10 ** 32;\n                result += 32;\n            }\n            if (value >= 10 ** 16) {\n                value /= 10 ** 16;\n                result += 16;\n            }\n            if (value >= 10 ** 8) {\n                value /= 10 ** 8;\n                result += 8;\n            }\n            if (value >= 10 ** 4) {\n                value /= 10 ** 4;\n                result += 4;\n            }\n            if (value >= 10 ** 2) {\n                value /= 10 ** 2;\n                result += 2;\n            }\n            if (value >= 10 ** 1) {\n                result += 1;\n            }\n        }\n        return result;\n    }\n\n    /**\n     * @dev Return the log in base 10, following the selected rounding direction, of a positive value.\n     * Returns 0 if given 0.\n     */\n    function log10(uint256 value, Rounding rounding) internal pure returns (uint256) {\n        unchecked {\n            uint256 result = log10(value);\n            return result + (rounding == Rounding.Up && 10 ** result < value ? 1 : 0);\n        }\n    }\n\n    /**\n     * @dev Return the log in base 256, rounded down, of a positive value.\n     * Returns 0 if given 0.\n     *\n     * Adding one to the result gives the number of pairs of hex symbols needed to represent `value` as a hex string.\n     */\n    function log256(uint256 value) internal pure returns (uint256) {\n        uint256 result = 0;\n        unchecked {\n            if (value >> 128 > 0) {\n                value >>= 128;\n                result += 16;\n            }\n            if (value >> 64 > 0) {\n                value >>= 64;\n                result += 8;\n            }\n            if (value >> 32 > 0) {\n                value >>= 32;\n                result += 4;\n            }\n            if (value >> 16 > 0) {\n                value >>= 16;\n                result += 2;\n            }\n            if (value >> 8 > 0) {\n                result += 1;\n            }\n        }\n        return result;\n    }\n\n    /**\n     * @dev Return the log in base 256, following the selected rounding direction, of a positive value.\n     * Returns 0 if given 0.\n     */\n    function log256(uint256 value, Rounding rounding) internal pure returns (uint256) {\n        unchecked {\n            uint256 result = log256(value);\n            return result + (rounding == Rounding.Up && 1 << (result << 3) < value ? 1 : 0);\n        }\n    }\n}\n'
      },
      'lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.8.0) (utils/math/SignedMath.sol)\n\npragma solidity ^0.8.0;\n\n/**\n * @dev Standard signed math utilities missing in the Solidity language.\n */\nlibrary SignedMath {\n    /**\n     * @dev Returns the largest of two signed numbers.\n     */\n    function max(int256 a, int256 b) internal pure returns (int256) {\n        return a > b ? a : b;\n    }\n\n    /**\n     * @dev Returns the smallest of two signed numbers.\n     */\n    function min(int256 a, int256 b) internal pure returns (int256) {\n        return a < b ? a : b;\n    }\n\n    /**\n     * @dev Returns the average of two signed numbers without overflow.\n     * The result is rounded towards zero.\n     */\n    function average(int256 a, int256 b) internal pure returns (int256) {\n        // Formula from the book "Hacker\'s Delight"\n        int256 x = (a & b) + ((a ^ b) >> 1);\n        return x + (int256(uint256(x) >> 255) & (a ^ b));\n    }\n\n    /**\n     * @dev Returns the absolute unsigned value of a signed value.\n     */\n    function abs(int256 n) internal pure returns (uint256) {\n        unchecked {\n            // must be unchecked in order to support `n = type(int256).min`\n            return uint256(n >= 0 ? n : -n);\n        }\n    }\n}\n'
      }
    },
    settings: {
      remappings: [
        '@openzeppelin/contracts/=lib/murky/lib/openzeppelin-contracts/contracts/',
        'ds-test/=lib/openzeppelin-contracts-upgradeable/lib/forge-std/lib/ds-test/src/',
        'erc2470-libs/=lib/erc2470-libs/',
        'erc4626-tests/=lib/openzeppelin-contracts-upgradeable/lib/erc4626-tests/',
        'erc721a/=lib/erc721a/contracts/',
        'forge-std/=lib/forge-std/src/',
        'halmos-cheatcodes/=lib/signals-implicit-mode/lib/sequence-v3/lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/',
        'murky/=lib/murky/',
        'openzeppelin-contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/',
        'openzeppelin-contracts/=lib/openzeppelin-contracts/',
        'openzeppelin/=lib/openzeppelin-contracts-upgradeable/contracts/',
        'sequence-v3/=lib/signals-implicit-mode/lib/sequence-v3/',
        'signals-implicit-mode/=lib/signals-implicit-mode/',
        'solady/=lib/solady/src/'
      ],
      optimizer: {
        enabled: false,
        runs: 200
      },
      metadata: {
        useLiteralContent: true,
        bytecodeHash: 'ipfs',
        appendCBOR: true
      },
      outputSelection: {
        '*': {
          '*': ['evm.bytecode', 'evm.deployedBytecode', 'devdoc', 'userdoc', 'metadata', 'abi']
        }
      },
      evmVersion: 'cancun',
      viaIR: true,
      libraries: {}
    }
  }
}
