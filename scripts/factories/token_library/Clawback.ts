import { ContractFactory, type ethers } from 'ethers'
import type { VerificationRequest } from 'scripts/types'

// https://github.com/0xsequence/contracts-library/blob/cf0a57481afc5d993595028a5e4a7f87172a2ba3/src/tokens/wrappers/clawback/Clawback.sol

const abi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'ownerAddr', type: 'address', internalType: 'address' },
      {
        name: 'metadataProviderAddr',
        type: 'address',
        internalType: 'address'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'BURN_ADDRESS',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'addTemplate',
    inputs: [
      { name: 'duration', type: 'uint56', internalType: 'uint56' },
      { name: 'destructionOnly', type: 'bool', internalType: 'bool' },
      { name: 'transferOpen', type: 'bool', internalType: 'bool' }
    ],
    outputs: [{ name: 'templateId', type: 'uint32', internalType: 'uint32' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'addTemplateTransferer',
    inputs: [
      { name: 'templateId', type: 'uint32', internalType: 'uint32' },
      { name: 'transferer', type: 'address', internalType: 'address' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'addToWrap',
    inputs: [
      {
        name: 'wrappedTokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      { name: 'receiver', type: 'address', internalType: 'address' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      { name: '_owner', type: 'address', internalType: 'address' },
      { name: '_id', type: 'uint256', internalType: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'balanceOfBatch',
    inputs: [
      { name: '_owners', type: 'address[]', internalType: 'address[]' },
      { name: '_ids', type: 'uint256[]', internalType: 'uint256[]' }
    ],
    outputs: [{ name: '', type: 'uint256[]', internalType: 'uint256[]' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'clawback',
    inputs: [
      {
        name: 'wrappedTokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      { name: 'holder', type: 'address', internalType: 'address' },
      { name: 'receiver', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'emergencyClawback',
    inputs: [
      {
        name: 'wrappedTokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      { name: 'receiver', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'getTemplate',
    inputs: [{ name: 'templateId', type: 'uint32', internalType: 'uint32' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IClawbackFunctions.Template',
        components: [
          {
            name: 'destructionOnly',
            type: 'bool',
            internalType: 'bool'
          },
          { name: 'transferOpen', type: 'bool', internalType: 'bool' },
          { name: 'duration', type: 'uint56', internalType: 'uint56' },
          { name: 'admin', type: 'address', internalType: 'address' }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getTokenDetails',
    inputs: [
      {
        name: 'wrappedTokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IClawbackFunctions.TokenDetails',
        components: [
          {
            name: 'tokenType',
            type: 'uint8',
            internalType: 'enum IClawbackFunctions.TokenType'
          },
          {
            name: 'templateId',
            type: 'uint32',
            internalType: 'uint32'
          },
          { name: 'lockedAt', type: 'uint56', internalType: 'uint56' },
          {
            name: 'tokenAddr',
            type: 'address',
            internalType: 'address'
          },
          { name: 'tokenId', type: 'uint256', internalType: 'uint256' }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'isApprovedForAll',
    inputs: [
      { name: '_owner', type: 'address', internalType: 'address' },
      { name: '_operator', type: 'address', internalType: 'address' }
    ],
    outputs: [{ name: 'isOperator', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'metadataProvider',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IMetadataProvider'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'onERC1155BatchReceived',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256[]', internalType: 'uint256[]' },
      { name: '', type: 'uint256[]', internalType: 'uint256[]' },
      { name: '', type: 'bytes', internalType: 'bytes' }
    ],
    outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'onERC1155Received',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'bytes', internalType: 'bytes' }
    ],
    outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'onERC721Received',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'bytes', internalType: 'bytes' }
    ],
    outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'safeBatchTransferFrom',
    inputs: [
      { name: 'from', type: 'address', internalType: 'address' },
      { name: 'to', type: 'address', internalType: 'address' },
      {
        name: 'wrappedTokenIds',
        type: 'uint256[]',
        internalType: 'uint256[]'
      },
      { name: 'amounts', type: 'uint256[]', internalType: 'uint256[]' },
      { name: 'data', type: 'bytes', internalType: 'bytes' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      { name: 'from', type: 'address', internalType: 'address' },
      { name: 'to', type: 'address', internalType: 'address' },
      {
        name: 'wrappedTokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      { name: 'data', type: 'bytes', internalType: 'bytes' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'setApprovalForAll',
    inputs: [
      { name: '_operator', type: 'address', internalType: 'address' },
      { name: '_approved', type: 'bool', internalType: 'bool' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [{ name: '_interfaceID', type: 'bytes4', internalType: 'bytes4' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'templateOperators',
    inputs: [
      { name: '', type: 'uint32', internalType: 'uint32' },
      { name: '', type: 'address', internalType: 'address' }
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'templateTransferers',
    inputs: [
      { name: '', type: 'uint32', internalType: 'uint32' },
      { name: '', type: 'address', internalType: 'address' }
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'unwrap',
    inputs: [
      {
        name: 'wrappedTokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      { name: 'holder', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'updateMetadataProvider',
    inputs: [
      {
        name: 'metadataProviderAddr',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'updateTemplate',
    inputs: [
      { name: 'templateId', type: 'uint32', internalType: 'uint32' },
      { name: 'duration', type: 'uint56', internalType: 'uint56' },
      { name: 'destructionOnly', type: 'bool', internalType: 'bool' },
      { name: 'transferOpen', type: 'bool', internalType: 'bool' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'updateTemplateAdmin',
    inputs: [
      { name: 'templateId', type: 'uint32', internalType: 'uint32' },
      { name: 'admin', type: 'address', internalType: 'address' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'updateTemplateOperator',
    inputs: [
      { name: 'templateId', type: 'uint32', internalType: 'uint32' },
      { name: 'operator', type: 'address', internalType: 'address' },
      { name: 'allowed', type: 'bool', internalType: 'bool' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'uri',
    inputs: [
      {
        name: 'wrappedTokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'wrap',
    inputs: [
      { name: 'templateId', type: 'uint32', internalType: 'uint32' },
      {
        name: 'tokenType',
        type: 'uint8',
        internalType: 'enum IClawbackFunctions.TokenType'
      },
      { name: 'tokenAddr', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      { name: 'receiver', type: 'address', internalType: 'address' }
    ],
    outputs: [
      {
        name: 'wrappedTokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      {
        name: '_owner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: '_operator',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: '_approved',
        type: 'bool',
        indexed: false,
        internalType: 'bool'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'ClawedBack',
    inputs: [
      {
        name: 'wrappedTokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      {
        name: 'templateId',
        type: 'uint32',
        indexed: true,
        internalType: 'uint32'
      },
      {
        name: 'tokenAddr',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'operator',
        type: 'address',
        indexed: false,
        internalType: 'address'
      },
      {
        name: 'holder',
        type: 'address',
        indexed: false,
        internalType: 'address'
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: false,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'EmergencyClawedBack',
    inputs: [
      {
        name: 'wrappedTokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      {
        name: 'templateId',
        type: 'uint32',
        indexed: true,
        internalType: 'uint32'
      },
      {
        name: 'tokenAddr',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'operator',
        type: 'address',
        indexed: false,
        internalType: 'address'
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: false,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TemplateAdded',
    inputs: [
      {
        name: 'templateId',
        type: 'uint32',
        indexed: true,
        internalType: 'uint32'
      },
      {
        name: 'admin',
        type: 'address',
        indexed: false,
        internalType: 'address'
      },
      {
        name: 'duration',
        type: 'uint56',
        indexed: false,
        internalType: 'uint56'
      },
      {
        name: 'destructionOnly',
        type: 'bool',
        indexed: false,
        internalType: 'bool'
      },
      {
        name: 'transferOpen',
        type: 'bool',
        indexed: false,
        internalType: 'bool'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TemplateAdminUpdated',
    inputs: [
      {
        name: 'templateId',
        type: 'uint32',
        indexed: true,
        internalType: 'uint32'
      },
      {
        name: 'admin',
        type: 'address',
        indexed: false,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TemplateOperatorUpdated',
    inputs: [
      {
        name: 'templateId',
        type: 'uint32',
        indexed: true,
        internalType: 'uint32'
      },
      {
        name: 'operator',
        type: 'address',
        indexed: false,
        internalType: 'address'
      },
      {
        name: 'allowed',
        type: 'bool',
        indexed: false,
        internalType: 'bool'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TemplateTransfererAdded',
    inputs: [
      {
        name: 'templateId',
        type: 'uint32',
        indexed: true,
        internalType: 'uint32'
      },
      {
        name: 'transferer',
        type: 'address',
        indexed: false,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TemplateUpdated',
    inputs: [
      {
        name: 'templateId',
        type: 'uint32',
        indexed: true,
        internalType: 'uint32'
      },
      {
        name: 'duration',
        type: 'uint56',
        indexed: false,
        internalType: 'uint56'
      },
      {
        name: 'destructionOnly',
        type: 'bool',
        indexed: false,
        internalType: 'bool'
      },
      {
        name: 'transferOpen',
        type: 'bool',
        indexed: false,
        internalType: 'bool'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TransferBatch',
    inputs: [
      {
        name: '_operator',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: '_from',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: '_to',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: '_ids',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]'
      },
      {
        name: '_amounts',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TransferSingle',
    inputs: [
      {
        name: '_operator',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: '_from',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: '_to',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: '_id',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: '_amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'URI',
    inputs: [
      {
        name: '_uri',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: '_id',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Unwrapped',
    inputs: [
      {
        name: 'wrappedTokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      {
        name: 'templateId',
        type: 'uint32',
        indexed: true,
        internalType: 'uint32'
      },
      {
        name: 'tokenAddr',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'sender',
        type: 'address',
        indexed: false,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Wrapped',
    inputs: [
      {
        name: 'wrappedTokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      {
        name: 'templateId',
        type: 'uint32',
        indexed: true,
        internalType: 'uint32'
      },
      {
        name: 'tokenAddr',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'sender',
        type: 'address',
        indexed: false,
        internalType: 'address'
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: false,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  { type: 'error', name: 'InvalidReceiver', inputs: [] },
  { type: 'error', name: 'InvalidTemplate', inputs: [] },
  {
    type: 'error',
    name: 'InvalidTemplateChange',
    inputs: [{ name: '', type: 'string', internalType: 'string' }]
  },
  { type: 'error', name: 'InvalidTokenApproval', inputs: [] },
  { type: 'error', name: 'InvalidTokenTransfer', inputs: [] },
  { type: 'error', name: 'TokenLocked', inputs: [] },
  { type: 'error', name: 'TokenUnlocked', inputs: [] },
  { type: 'error', name: 'Unauthorized', inputs: [] }
]

export class Clawback extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      abi,
      '0x608034620000a057601f6200360438819003918201601f19168301916001600160401b03831184841017620000a5578084926040948552833981010312620000a057620000706200005e60206200005684620000bb565b9301620000bb565b916200006a33620000d0565b620000d0565b600780546001600160a01b0319166001600160a01b03929092169190911790556040516134ec9081620001188239f35b600080fd5b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b0382168203620000a057565b600080546001600160a01b039283166001600160a01b03198216811783559216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a356fe6080604090808252600436101561001557600080fd5b60003560e01c908162fdd58e146127d65750806301ffc9a7146127835780630a5d1777146127205780630e89341c1461260a5780631162d6ca146124c3578063150b7a021461241f578063212857f5146122f65780632eb2c2d614611c9b578063373254a014611afa5780633c8347a814611a415780633f069a43146118625780634e1273f4146116565780634edaaca81461158f5780635a2ec478146114695780635ae684431461135c578063715018a6146112de57806385c20a9d146110855780638da5cb5b14611050578063a22cb46514610f9b578063ab42885b14610eac578063bc197c8114610e09578063c1e0372814610cf5578063d3d72d2a14610cc0578063d5d9510d14610c5d578063e985e9c514610bfd578063ee107509146108bf578063ef0ac9691461085a578063f23a6e611461078d578063f242432a146102ae578063f2fde38b146101965763fccc28131461017557600080fd5b34610191576000600319360112610191576020905161dead8152f35b600080fd5b5034610191576020600319360112610191576101b0612824565b6101b8612c11565b73ffffffffffffffffffffffffffffffffffffffff80911691821561022b5750600054827fffffffffffffffffffffffff0000000000000000000000000000000000000000821617600055167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a3005b608490517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152fd5b50346101915760a0600319360112610191576102c8612824565b6102d0612847565b9060443560643560843567ffffffffffffffff8111610191576102f7903690600401612aa0565b8260005260209460048652606087806000209681519761031689612934565b8054908a60ff9a6103298c851682612c90565b6080600163ffffffff94858760081c169484019685885266ffffffffffffff998a8260281c16908601528a1c8a850152015491015260005260038b528a8c6000208d8051916103778361297f565b54968d8816151583528d8860081c1615938415908401528760101c169082015273ffffffffffffffffffffffffffffffffffffffff9687809760481c169101526106d9575b505016958633149081156106b9575b50156106365781169283156105b357856000526001875287600020856000528752876000206103fb828254612feb565b90558360005260018752876000208560005287528760002061041e828254612f70565b905583868951878152838a8201527fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628b3392a461045b5a92612fb5565b61046157005b600087946104bd968a51978896879586937ff23a6e61000000000000000000000000000000000000000000000000000000009c8d865233600487015260248601526044850152606484015260a0608484015260a48301906128c3565b0393f180156105a8577fffffffff000000000000000000000000000000000000000000000000000000009160009161057b575b5016036104f957005b60849151907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152603a60248201527f45524331313535235f63616c6c6f6e4552433131353552656365697665643a2060448201527f494e56414c49445f4f4e5f524543454956455f4d4553534147450000000000006064820152fd5b61059b9150843d86116105a1575b61059381836129af565b810190612f7d565b386104f0565b503d610589565b84513d6000823e3d90fd5b6084878951907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152602b60248201527f4552433131353523736166655472616e7366657246726f6d3a20494e56414c4960448201527f445f524543495049454e540000000000000000000000000000000000000000006064820152fd5b6084878951907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152602a60248201527f4552433131353523736166655472616e7366657246726f6d3a20494e56414c4960448201527f445f4f50455241544f52000000000000000000000000000000000000000000006064820152fd5b9050866000526002885288600020336000528852886000205416386103cb565b818192939450511660005260068a528a600020336000528a52888b6000205416918215610767575b8215610741575b50501561071857819038806103bc565b600489517f82b42900000000000000000000000000000000000000000000000000000000008152fd5b909150511660005260068852886000208284166000528852868960002054163880610708565b91508082511660005260068a528a6000208484166000528a52888b600020541691610701565b50346101915760a0600319360112610191576107a7612824565b506107b0612847565b5060843567ffffffffffffffff8111610191576107d1903690600401612906565b50506007549060ff8260a01c1615610831577fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff60209216600755517ff23a6e61000000000000000000000000000000000000000000000000000000008152f35b600490517f1e4ec46b000000000000000000000000000000000000000000000000000000008152fd5b346101915760206003193601126101915773ffffffffffffffffffffffffffffffffffffffff610888612824565b610890612c11565b167fffffffffffffffffffffffff00000000000000000000000000000000000000006007541617600755600080f35b5034610191576080600319360112610191576108d961288d565b906024359166ffffffffffffff9182841692838503610191576108fa612b52565b6064358015928315958683036101915763ffffffff1697886000526020946003865273ffffffffffffffffffffffffffffffffffffffff876000205460481c163303610bd457896000526003865286600020928354908160101c168a11610b515760ff811680610b49575b610ac65760081c60ff169081610abe575b50610a62576060969492826109e7610a51937fdf5c5dca5b4a6d52c543b91e2816adb0940818fa2311c7f951535389ba60721a9b999795907fffffffffffffffffffffffffffffffffffffffffffffff00000000000000ffff68ffffffffffffff000083549260101b169116179055565b610a1c84829060ff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0083541691151516179055565b907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff61ff00835492151560081b169116179055565b8251948552151590840152820152a2005b6064858751907f591331e400000000000000000000000000000000000000000000000000000000825280600483015260248201527f43616e6e6f74206368616e67652066726f6d207472616e73666572206f70656e6044820152fd5b905038610976565b6084878951907f591331e40000000000000000000000000000000000000000000000000000000082526004820152602360248201527f43616e6e6f74206368616e67652066726f6d206465737472756374696f6e206f60448201527f6e6c7900000000000000000000000000000000000000000000000000000000006064820152fd5b508515610965565b6084878951907f591331e40000000000000000000000000000000000000000000000000000000082526004820152602260248201527f4475726174696f6e206d75737420626520657175616c206f722064656372656160448201527f73650000000000000000000000000000000000000000000000000000000000006064820152fd5b600487517f82b42900000000000000000000000000000000000000000000000000000000008152fd5b5034610191578060031936011261019157602090610c19612824565b610c21612847565b9073ffffffffffffffffffffffffffffffffffffffff80911660005260028452826000209116600052825260ff81600020541690519015158152f35b5034610191578060031936011261019157602090610c7961288d565b63ffffffff610c86612847565b91166000526006835273ffffffffffffffffffffffffffffffffffffffff826000209116600052825260ff81600020541690519015158152f35b50346101915760006003193601126101915760209073ffffffffffffffffffffffffffffffffffffffff600754169051908152f35b503461019157602060031936011261019157600060808251610d1681612934565b82815282602082015282848201528260608201520152600435600052600460205280600020815190610d4782612934565b805492610d5760ff851684612c90565b602083019363ffffffff91828260081c16865280850193600166ffffffffffffff91828560281c168752606088019460601c85520154946080870195865282519651946003861015610dda5760a09873ffffffffffffffffffffffffffffffffffffffff9689525116602088015251169085015251166060830152516080820152f35b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b50346101915760a060031936011261019157610e23612824565b50610e2c612847565b5067ffffffffffffffff9060443582811161019157610e4f903690600401612b70565b505060643582811161019157610e69903690600401612b70565b505060843591821161019157610e8460049236908401612906565b5050517f1e4ec46b000000000000000000000000000000000000000000000000000000008152fd5b5034610191578060031936011261019157610ec561288d565b63ffffffff610ed2612847565b91169182600052600360205273ffffffffffffffffffffffffffffffffffffffff80826000205460481c163303610f7257916020917fc6133cf134aa77933f3932bfc07d48d996beb1b915060227a25039eaba1136ec938560005260068452816000209216918260005283528060002060017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0082541617905551908152a2005b600482517f82b42900000000000000000000000000000000000000000000000000000000008152fd5b5034610191578060031936011261019157610fb4612824565b90610fbd612b61565b9033600052600260205273ffffffffffffffffffffffffffffffffffffffff816000209316928360005260205261102282826000209060ff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0083541691151516179055565b5190151581527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a3005b50346101915760006003193601126101915760209073ffffffffffffffffffffffffffffffffffffffff600054169051908152f35b50346101915760606003193601126101915760043566ffffffffffffff91828216809203610191576110b5612b61565b926110be612b52565b936007549063ffffffff94858360a81c169586146112af5760209686946112956080947f62199a0444637449109e0b9ef5b357250c44db005c5cf82caacfa6a04d95345a967fffffffffffffff00000000ffffffffffffffffffffffffffffffffffffffffff78ffffffff00000000000000000000000000000000000000000060018b0160a81b1691161760075573ffffffffffffffffffffffffffffffffffffffff886112478b51936111718561297f565b1515958685528c8f61120d908701991515998a81526111d9838901938d855260608a019733895260005260206003905260002098511515899060ff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0083541691151516179055565b5187547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff1690151560081b61ff0016178755565b5185547fffffffffffffffffffffffffffffffffffffffffffffff00000000000000ffff16911660101b68ffffffffffffff000016178455565b5182547fffffff0000000000000000000000000000000000000000ffffffffffffffffff16911660481b7cffffffffffffffffffffffffffffffffffffffff00000000000000000016179055565b86519233845289840152868301526060820152a251908152f35b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b34610191576000600319360112610191576112f7612c11565b600073ffffffffffffffffffffffffffffffffffffffff81547fffffffffffffffffffffffff000000000000000000000000000000000000000081168355167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b50346101915760606003193601126101915761137661288d565b9061137f612847565b9063ffffffff61138d612b52565b93169182600052600360205273ffffffffffffffffffffffffffffffffffffffff9384836000205460481c1633036114405783947f08604e26c94fed86de887d5d0a56997e442e546486d109bea3f0702ac0b94eee946000526005602052836000209216918260005260205261143181846000209060ff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0083541691151516179055565b825191825215156020820152a2005b600483517f82b42900000000000000000000000000000000000000000000000000000000008152fd5b50346101915761147836612ae7565b92826000939293526004602052806000209080519461149686612934565b8254946114a660ff871688612c90565b6020870190600163ffffffff95868960081c16845266ffffffffffffff8960281c16868b015260608a019860601c8952015497608081019889526114ea828261306a565b516003811015610dda577fff2df8e90ff02a2d9db7e04f8d968de07ea64c191ae43ce45a5f9405b959e8479561158a93611545868c868d9673ffffffffffffffffffffffffffffffffffffffff809851169251923091613163565b5116975116975193519384933391859290949360609260808501968552602085015273ffffffffffffffffffffffffffffffffffffffff809216604085015216910152565b0390a4005b50346101915760206003193601126101915760809063ffffffff6115b161288d565b6000606084516115c08161297f565b82815282602082015282868201520152166000526003602052806000208151906115e98261297f565b549060ff8216151592838252602082019160ff8460081c1615158352818101606066ffffffffffffff92838760101c168352019373ffffffffffffffffffffffffffffffffffffffff809660481c1685528351968752511515602087015251169084015251166060820152f35b503461019157806003193601126101915760043567ffffffffffffffff91828211610191573660238301121561019157816004013592611695846129f0565b926116a2835194856129af565b84845260209460248686019160051b8301019136831161019157602401905b82821061183657505050602435908111610191576116e3903690600401612a08565b82518151036117b3578251937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe061173161171c876129f0565b96611729865198896129af565b8088526129f0565b01368287013760005b845181101561179d578073ffffffffffffffffffffffffffffffffffffffff6117666117989388612bce565b5116600052600183528460002061177d8286612bce565b51600052835284600020546117928289612bce565b52612ba1565b61173a565b8351828152806117af81850189612b1e565b0390f35b6084848351907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152602c60248201527f455243313135352362616c616e63654f6642617463683a20494e56414c49445f60448201527f41525241595f4c454e47544800000000000000000000000000000000000000006064820152fd5b813573ffffffffffffffffffffffffffffffffffffffff811681036101915781529086019086016116c1565b50346101915761187136612ae7565b82600094939294526004602052826000209383519161188f83612934565b85549461189f60ff871685612c90565b63ffffffff96878760081c1697602086019589875283810192600166ffffffffffffff91828c60281c168652606084019b60601c8c5201549a608083019b8c52600052600360205284600020908551916118f88361297f565b549460ff86161515835260ff8660081c161515602084015286830192828760101c168452606073ffffffffffffffffffffffffffffffffffffffff809860481c1691015233868a161415600014611a0257505050818751166000526005602052836000203360005260205260ff846000205416156119d9575b61197c858988612ff8565b51956003871015610dda576119bf858b6060987f543d9c4418306f14a6565ce3230cee3f00a80b98413e3d65f7353d341165111f9a878e51169251923091613163565b5116965116965191815192835260208301523390820152a4005b600484517f82b42900000000000000000000000000000000000000000000000000000000008152fd5b81611a0f91511642612feb565b915116111561197157600484517f5a8181f7000000000000000000000000000000000000000000000000000000008152fd5b503461019157606060031936011261019157600435611a5e61286a565b9080600052600460205282600020835190611a7882612934565b60018154611a8960ff821685612c90565b63ffffffff8160081c16602085015266ffffffffffffff8160281c168785015260601c918260608501520154608083015215611ad157611acf9350602435913391612c9c565b005b600484517f289aef69000000000000000000000000000000000000000000000000000000008152fd5b50346101915760c060031936011261019157611b1461288d565b9060243590600382101561019157611b2a61286a565b60a4359373ffffffffffffffffffffffffffffffffffffffff9081861686036101915763ffffffff169182600052600360205281846000205460481c1615611c72571693308514611c495760085493611b8285612ba1565b600855611b9a845191611b9483612934565b82612c90565b602081019283528381019266ffffffffffffff421684526060820196875260808201906064358252866000526004602052856000209183516003811015610dda57602099611c439760ff7fffffffffffffffffffffffffffffffffffffffff0000000000000000000000006bffffffffffffff000000000064ffffffff006001985160081b16935160281b16935160601b16931617171783555191015560843590853391612c9c565b51908152f35b600483517f289aef69000000000000000000000000000000000000000000000000000000008152fd5b600484517fec55b8cd000000000000000000000000000000000000000000000000000000008152fd5b50346101915760a060031936011261019157611cb5612824565b611cbd612847565b9160449167ffffffffffffffff90833582811161019157611ce2903690600401612a08565b606495863584811161019157611cfc903690600401612a08565b9360843590811161019157611d15903690600401612aa0565b825160005b81811061218357505073ffffffffffffffffffffffffffffffffffffffff908185163314801561215f575b156120dd578183161561205b578351865103611fd957835160005b818110611f535750508651878152611d7a88820186612b1e565b908082036020820152838516917f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8589169280611db833948d612b1e565b0390a45a94611dc684612fb5565b611dcc57005b82918851978896879586947fbc197c810000000000000000000000000000000000000000000000000000000086523360048701521660248501528b840160a0905260a48401611e1a91612b1e565b838103600319018d850152611e2e91612b1e565b828103600319016084840152611e43916128c3565b039216600090602095f1908115611f48577fbc197c8100000000000000000000000000000000000000000000000000000000917fffffffff0000000000000000000000000000000000000000000000000000000091600091611f2a575b501603611ea957005b6084927f45524331313535235f63616c6c6f6e45524331313535426174636852656365697f7665643a20494e56414c49445f4f4e5f524543454956455f4d455353414745009251937f08c379a000000000000000000000000000000000000000000000000000000000855260206004860152603f6024860152840152820152fd5b611f42915060203d81116105a15761059381836129af565b38611ea0565b82513d6000823e3d90fd5b80611f61611fd4928a612bce565b518589166000526001906020908282528c600020611f7f858c612bce565b516000528252611f948d600020918254612feb565b9055611fa0838c612bce565b519187891660005281528b60002090611fb9848b612bce565b5160005252611fcd8b600020918254612f70565b9055612ba1565b611d60565b6084887f494e56414c49445f4152524159535f4c454e47544800000000000000000000008b7f45524331313535235f7361666542617463685472616e7366657246726f6d3a208b51937f08c379a00000000000000000000000000000000000000000000000000000000085526020600486015260356024860152840152820152fd5b6084887f4e56414c49445f524543495049454e54000000000000000000000000000000008b7f45524331313535237361666542617463685472616e7366657246726f6d3a20498b51937f08c379a00000000000000000000000000000000000000000000000000000000085526020600486015260306024860152840152820152fd5b6084887f4e56414c49445f4f50455241544f5200000000000000000000000000000000008b7f45524331313535237361666542617463685472616e7366657246726f6d3a20498b51937f08c379a000000000000000000000000000000000000000000000000000000000855260206004860152602f6024860152840152820152fd5b508185166000526002602052866000203360005260205260ff876000205416611d45565b61218d8186612bce565b51600052602090600482528689600020928a516121a981612934565b8454918c60ff936121bc85821685612c90565b63ffffffff906008948282871c16918582019280845266ffffffffffffff92838360281c1687820152606092831c8382015260806001809e0154910152600052600386528460002090888651926122128461297f565b548099828216151585521c1615928315888401528860101c168683015273ffffffffffffffffffffffffffffffffffffffff809860481c1691015261225f575b5050505050505001611d1a565b8181511660005260069283855280600020336000528552868160002054169788156122cf575b505086156122a5575b5050505050501561071857863880808c8180612252565b90919293949550511660005281528b6000209188166000525289600020541638808080808061228e565b82985083889351166000528486528682600020911660005285526000205416958f8e612285565b503461019157608060031936011261019157600435612313612847565b9061231c61286a565b9260643592826000526004602052816000209382519561233b87612934565b85549561234b60ff881689612c90565b6020880193600163ffffffff92838a60081c16875266ffffffffffffff8a60281c16888c015260608b019960601c8a5201549860808101998a5261238f848261306a565b61239a858984612ff8565b51906003821015610dda577f79d388da9ec1f72c92bb2ad45ecebde289617a02bb7f444080c4f946b87584ad9689859460a0986123f9898f73ffffffffffffffffffffffffffffffffffffffff9a8b998a809851169251923091613163565b51169a51169a5195815196875260208701523390860152166060840152166080820152a4005b503461019157608060031936011261019157612439612824565b50612442612847565b5060643567ffffffffffffffff811161019157612463903690600401612906565b50506007549060ff8260a01c1615610831577fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff60209216600755517f150b7a02000000000000000000000000000000000000000000000000000000008152f35b50346101915780600319360112610191576124dc61288d565b63ffffffff6124e9612847565b91169182600052600360205273ffffffffffffffffffffffffffffffffffffffff80826000205460481c163303610f725782169182156125ad57916020916125a67f494062b7b8bc451d8b05ed1f03a9ee335c1d068d8da6d3be4bc919521633ea0794866000526003855282600020907fffffff0000000000000000000000000000000000000000ffffffffffffffffff7cffffffffffffffffffffffffffffffffffffffff00000000000000000083549260481b169116179055565b51908152a2005b606482517f591331e400000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f41646d696e2063616e6e6f74206265207a65726f2061646472657373000000006044820152fd5b50346101915760208060031936011261019157604491600073ffffffffffffffffffffffffffffffffffffffff600754168251948580927fa08206c900000000000000000000000000000000000000000000000000000000825230600483015260043560248301525afa92831561271557600093612697575b506117af90519282849384528301906128c3565b9092503d806000833e6126aa81836129af565b81019082818303126101915780519067ffffffffffffffff821161019157019080601f83011215610191578151916126e183612a66565b916126ee865193846129af565b838352848483010111610191576117af9261270e918580850191016128a0565b9290612683565b50513d6000823e3d90fd5b503461019157806003193601126101915760209061273c61288d565b63ffffffff612749612847565b91166000526005835273ffffffffffffffffffffffffffffffffffffffff826000209116600052825260ff81600020541690519015158152f35b503461019157602060031936011261019157600435907fffffffff0000000000000000000000000000000000000000000000000000000082168203610191576127cd6020926133a9565b90519015158152f35b90503461019157816003193601126101915760209173ffffffffffffffffffffffffffffffffffffffff612808612824565b1660005260018352806000206024356000528352600020548152f35b6004359073ffffffffffffffffffffffffffffffffffffffff8216820361019157565b6024359073ffffffffffffffffffffffffffffffffffffffff8216820361019157565b6044359073ffffffffffffffffffffffffffffffffffffffff8216820361019157565b6004359063ffffffff8216820361019157565b60005b8381106128b35750506000910152565b81810151838201526020016128a3565b907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f6020936128ff815180928187528780880191016128a0565b0116010190565b9181601f840112156101915782359167ffffffffffffffff8311610191576020838186019501011161019157565b60a0810190811067ffffffffffffffff82111761295057604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6080810190811067ffffffffffffffff82111761295057604052565b67ffffffffffffffff811161295057604052565b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff82111761295057604052565b67ffffffffffffffff81116129505760051b60200190565b81601f8201121561019157803591612a1f836129f0565b92612a2d60405194856129af565b808452602092838086019260051b820101928311610191578301905b828210612a57575050505090565b81358152908301908301612a49565b67ffffffffffffffff811161295057601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b81601f8201121561019157803590612ab782612a66565b92612ac560405194856129af565b8284526020838301011161019157816000926020809301838601378301015290565b6003196060910112610191576004359060243573ffffffffffffffffffffffffffffffffffffffff81168103610191579060443590565b90815180825260208080930193019160005b828110612b3e575050505090565b835185529381019392810192600101612b30565b60443590811515820361019157565b60243590811515820361019157565b9181601f840112156101915782359167ffffffffffffffff8311610191576020808501948460051b01011161019157565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146112af5760010190565b8051821015612be25760209160051b010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b73ffffffffffffffffffffffffffffffffffffffff600054163303612c3257565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b6003821015610dda5752565b93929091937fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff93740100000000000000000000000000000000000000008560075416176007558151956003871015610dda57606083019573ffffffffffffffffffffffffffffffffffffffff90612d2186838a5116608088019b868d51923092613163565b600754166007556040938451906020918281019080821067ffffffffffffffff8311176129505789918852600090818152858816808352600186528983208484528652898320612d728c8254612f70565b905580838b518681528d898201527fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628d3392a45a90612db08a612fb5565b612e25575b5050505091015197519851945194855250602084019490945273ffffffffffffffffffffffffffffffffffffffff908116604084015216606082015293169263ffffffff909216917f161a59b5b1e2328279324f3f76b54f33d0f0a695c4d3c8264fb38a91041168f790608090a4565b9186918c85612e82958e518097819682957ff23a6e61000000000000000000000000000000000000000000000000000000009c8d85523360048601528660248601526044850152606484015260a0608484015260a48301906128c3565b0393f1918215612f6557907fffffffff0000000000000000000000000000000000000000000000000000000092612f48575b501603612ec5578738808080612db5565b6084828751907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152603a60248201527f45524331313535235f63616c6c6f6e4552433131353552656365697665643a2060448201527f494e56414c49445f4f4e5f524543454956455f4d4553534147450000000000006064820152fd5b612f5f9150853d87116105a15761059381836129af565b38612eb4565b8951903d90823e3d90fd5b919082018092116112af57565b9081602091031261019157517fffffffff00000000000000000000000000000000000000000000000000000000811681036101915790565b3f8015159081612fc3575090565b7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4709150141590565b919082039182116112af57565b9073ffffffffffffffffffffffffffffffffffffffff60009392169182845260016020526040842082855260205260408420613035828254612feb565b905560405191825260208201527fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6260403392a4565b90602082019163ffffffff908184511691600092835260036020526040948584209260ff8780519561309b8761297f565b549682881615158752828860081c16151560208801528187019566ffffffffffffff95868a60101c16885273ffffffffffffffffffffffffffffffffffffffff809a60481c1660608a015251168152600560205281812033825260205220541615610bd457818761310f9201511642612feb565b915116111561313a57511515918261312b575b50506108315750565b61dead92501614153880613122565b600484517f207acd57000000000000000000000000000000000000000000000000000000008152fd5b949092946003811015610dda5760028103613247575090811561321d5773ffffffffffffffffffffffffffffffffffffffff80931693843b156101915760009460c493869286604051998a9889977ff242432a0000000000000000000000000000000000000000000000000000000089521660048801521660248601526044850152606484015260a060848401528160a48401525af18015613211576132065750565b61320f9061299b565b565b6040513d6000823e3d90fd5b60046040517f289aef69000000000000000000000000000000000000000000000000000000008152fd5b600181036132ca575060010361321d5773ffffffffffffffffffffffffffffffffffffffff80921690813b1561019157600060649281958560405198899788967f42842e0e00000000000000000000000000000000000000000000000000000000885216600487015216602485015260448401525af18015613211576132065750565b909492939061321d57158015906133a1575b61321d5773ffffffffffffffffffffffffffffffffffffffff8116300361334857509060109260209260145260345260446000938480936fa9059cbb00000000000000000000000082525af13d15600183511417161561333b57603452565b6390b8ec1890526004601cfd5b601c600060209460649382956040519860605260405260601b602c526f23b872dd000000000000000000000000600c525af13d15600160005114171615613393576000606052604052565b637939f4246000526004601cfd5b5083156132dc565b7fffffffff000000000000000000000000000000000000000000000000000000008116801590811561341e575b81156133f4575b506133ee576133eb90613448565b90565b50600190565b7f0e89341c00000000000000000000000000000000000000000000000000000000915014386133dd565b7f4b9f240000000000000000000000000000000000000000000000000000000000811491506133d6565b7fffffffff00000000000000000000000000000000000000000000000000000000167fd9b67a260000000000000000000000000000000000000000000000000000000081146133ee577f01ffc9a700000000000000000000000000000000000000000000000000000000149056fea26469706673582212207e26596b14c241abcaf80bde9035e73c238e3c8ff7760092ab5ad748eeda43f964736f6c63430008130033',
      signer
    )
  }
}

export const CLAWBACK_VERIFICATION: Omit<VerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'src/tokens/wrappers/clawback/Clawback.sol:Clawback',
  version: 'v0.8.19+commit.7dd6d404',
  licenceType: 'Apache-2.0',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'lib/0xsequence/erc-1155/src/contracts/interfaces/IERC1155.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\nimport \'./IERC165.sol\';\r\n\r\n\r\ninterface IERC1155 is IERC165 {\r\n\r\n  /****************************************|\r\n  |                 Events                 |\r\n  |_______________________________________*/\r\n\r\n  /**\r\n   * @dev Either TransferSingle or TransferBatch MUST emit when tokens are transferred, including zero amount transfers as well as minting or burning\r\n   *   Operator MUST be msg.sender\r\n   *   When minting/creating tokens, the `_from` field MUST be set to `0x0`\r\n   *   When burning/destroying tokens, the `_to` field MUST be set to `0x0`\r\n   *   The total amount transferred from address 0x0 minus the total amount transferred to 0x0 may be used by clients and exchanges to be added to the "circulating supply" for a given token ID\r\n   *   To broadcast the existence of a token ID with no initial balance, the contract SHOULD emit the TransferSingle event from `0x0` to `0x0`, with the token creator as `_operator`, and a `_amount` of 0\r\n   */\r\n  event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _amount);\r\n\r\n  /**\r\n   * @dev Either TransferSingle or TransferBatch MUST emit when tokens are transferred, including zero amount transfers as well as minting or burning\r\n   *   Operator MUST be msg.sender\r\n   *   When minting/creating tokens, the `_from` field MUST be set to `0x0`\r\n   *   When burning/destroying tokens, the `_to` field MUST be set to `0x0`\r\n   *   The total amount transferred from address 0x0 minus the total amount transferred to 0x0 may be used by clients and exchanges to be added to the "circulating supply" for a given token ID\r\n   *   To broadcast the existence of multiple token IDs with no initial balance, this SHOULD emit the TransferBatch event from `0x0` to `0x0`, with the token creator as `_operator`, and a `_amount` of 0\r\n   */\r\n  event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _amounts);\r\n\r\n  /**\r\n   * @dev MUST emit when an approval is updated\r\n   */\r\n  event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);\r\n\r\n\r\n  /****************************************|\r\n  |                Functions               |\r\n  |_______________________________________*/\r\n\r\n  /**\r\n    * @notice Transfers amount of an _id from the _from address to the _to address specified\r\n    * @dev MUST emit TransferSingle event on success\r\n    * Caller must be approved to manage the _from account\'s tokens (see isApprovedForAll)\r\n    * MUST throw if `_to` is the zero address\r\n    * MUST throw if balance of sender for token `_id` is lower than the `_amount` sent\r\n    * MUST throw on any other error\r\n    * When transfer is complete, this function MUST check if `_to` is a smart contract (code size > 0). If so, it MUST call `onERC1155Received` on `_to` and revert if the return amount is not `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`\r\n    * @param _from    Source address\r\n    * @param _to      Target address\r\n    * @param _id      ID of the token type\r\n    * @param _amount  Transfered amount\r\n    * @param _data    Additional data with no specified format, sent in call to `_to`\r\n    */\r\n  function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _amount, bytes calldata _data) external;\r\n\r\n  /**\r\n    * @notice Send multiple types of Tokens from the _from address to the _to address (with safety call)\r\n    * @dev MUST emit TransferBatch event on success\r\n    * Caller must be approved to manage the _from account\'s tokens (see isApprovedForAll)\r\n    * MUST throw if `_to` is the zero address\r\n    * MUST throw if length of `_ids` is not the same as length of `_amounts`\r\n    * MUST throw if any of the balance of sender for token `_ids` is lower than the respective `_amounts` sent\r\n    * MUST throw on any other error\r\n    * When transfer is complete, this function MUST check if `_to` is a smart contract (code size > 0). If so, it MUST call `onERC1155BatchReceived` on `_to` and revert if the return amount is not `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`\r\n    * Transfers and events MUST occur in the array order they were submitted (_ids[0] before _ids[1], etc)\r\n    * @param _from     Source addresses\r\n    * @param _to       Target addresses\r\n    * @param _ids      IDs of each token type\r\n    * @param _amounts  Transfer amounts per token type\r\n    * @param _data     Additional data with no specified format, sent in call to `_to`\r\n  */\r\n  function safeBatchTransferFrom(address _from, address _to, uint256[] calldata _ids, uint256[] calldata _amounts, bytes calldata _data) external;\r\n\r\n  /**\r\n   * @notice Get the balance of an account\'s Tokens\r\n   * @param _owner  The address of the token holder\r\n   * @param _id     ID of the Token\r\n   * @return        The _owner\'s balance of the Token type requested\r\n   */\r\n  function balanceOf(address _owner, uint256 _id) external view returns (uint256);\r\n\r\n  /**\r\n   * @notice Get the balance of multiple account/token pairs\r\n   * @param _owners The addresses of the token holders\r\n   * @param _ids    ID of the Tokens\r\n   * @return        The _owner\'s balance of the Token types requested (i.e. balance for each (owner, id) pair)\r\n   */\r\n  function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory);\r\n\r\n  /**\r\n   * @notice Enable or disable approval for a third party ("operator") to manage all of caller\'s tokens\r\n   * @dev MUST emit the ApprovalForAll event on success\r\n   * @param _operator  Address to add to the set of authorized operators\r\n   * @param _approved  True if the operator is approved, false to revoke approval\r\n   */\r\n  function setApprovalForAll(address _operator, bool _approved) external;\r\n\r\n  /**\r\n   * @notice Queries the approval status of an operator for a given owner\r\n   * @param _owner     The owner of the Tokens\r\n   * @param _operator  Address of authorized operator\r\n   * @return isOperator True if the operator is approved, false if not\r\n   */\r\n  function isApprovedForAll(address _owner, address _operator) external view returns (bool isOperator);\r\n}\r\n'
      },
      'lib/0xsequence/erc-1155/src/contracts/interfaces/IERC1155Metadata.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\n\r\n\r\ninterface IERC1155Metadata {\r\n\r\n  event URI(string _uri, uint256 indexed _id);\r\n\r\n  /****************************************|\r\n  |                Functions               |\r\n  |_______________________________________*/\r\n\r\n  /**\r\n   * @notice A distinct Uniform Resource Identifier (URI) for a given token.\r\n   * @dev URIs are defined in RFC 3986.\r\n   *      URIs are assumed to be deterministically generated based on token ID\r\n   *      Token IDs are assumed to be represented in their hex format in URIs\r\n   * @return URI string\r\n   */\r\n  function uri(uint256 _id) external view returns (string memory);\r\n}\r\n'
      },
      'lib/0xsequence/erc-1155/src/contracts/interfaces/IERC1155TokenReceiver.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev ERC-1155 interface for accepting safe transfers.\r\n */\r\ninterface IERC1155TokenReceiver {\r\n\r\n  /**\r\n   * @notice Handle the receipt of a single ERC1155 token type\r\n   * @dev An ERC1155-compliant smart contract MUST call this function on the token recipient contract, at the end of a `safeTransferFrom` after the balance has been updated\r\n   * This function MAY throw to revert and reject the transfer\r\n   * Return of other amount than the magic value MUST result in the transaction being reverted\r\n   * Note: The token contract address is always the message sender\r\n   * @param _operator  The address which called the `safeTransferFrom` function\r\n   * @param _from      The address which previously owned the token\r\n   * @param _id        The id of the token being transferred\r\n   * @param _amount    The amount of tokens being transferred\r\n   * @param _data      Additional data with no specified format\r\n   * @return           `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`\r\n   */\r\n  function onERC1155Received(address _operator, address _from, uint256 _id, uint256 _amount, bytes calldata _data) external returns(bytes4);\r\n\r\n  /**\r\n   * @notice Handle the receipt of multiple ERC1155 token types\r\n   * @dev An ERC1155-compliant smart contract MUST call this function on the token recipient contract, at the end of a `safeBatchTransferFrom` after the balances have been updated\r\n   * This function MAY throw to revert and reject the transfer\r\n   * Return of other amount than the magic value WILL result in the transaction being reverted\r\n   * Note: The token contract address is always the message sender\r\n   * @param _operator  The address which called the `safeBatchTransferFrom` function\r\n   * @param _from      The address which previously owned the token\r\n   * @param _ids       An array containing ids of each token being transferred\r\n   * @param _amounts   An array containing amounts of each token being transferred\r\n   * @param _data      Additional data with no specified format\r\n   * @return           `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`\r\n   */\r\n  function onERC1155BatchReceived(address _operator, address _from, uint256[] calldata _ids, uint256[] calldata _amounts, bytes calldata _data) external returns(bytes4);\r\n}\r\n'
      },
      'lib/0xsequence/erc-1155/src/contracts/interfaces/IERC165.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\n\r\n\r\n/**\r\n * @title ERC165\r\n * @dev https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md\r\n */\r\ninterface IERC165 {\r\n\r\n    /**\r\n     * @notice Query if a contract implements an interface\r\n     * @dev Interface identification is specified in ERC-165. This function\r\n     * uses less than 30,000 gas\r\n     * @param _interfaceId The interface identifier, as specified in ERC-165\r\n     */\r\n    function supportsInterface(bytes4 _interfaceId)\r\n    external\r\n    view\r\n    returns (bool);\r\n}\r\n'
      },
      'lib/0xsequence/erc-1155/src/contracts/tokens/ERC1155/ERC1155.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\n\r\nimport "../../interfaces/IERC1155TokenReceiver.sol";\r\nimport "../../interfaces/IERC1155.sol";\r\nimport "../../utils/Address.sol";\r\nimport "../../utils/ERC165.sol";\r\n\r\n/**\r\n * @dev Implementation of Multi-Token Standard contract\r\n */\r\ncontract ERC1155 is IERC1155, ERC165 {\r\n  using Address for address;\r\n\r\n  /***********************************|\r\n  |        Variables and Events       |\r\n  |__________________________________*/\r\n\r\n  // onReceive function signatures\r\n  bytes4 constant internal ERC1155_RECEIVED_VALUE = 0xf23a6e61;\r\n  bytes4 constant internal ERC1155_BATCH_RECEIVED_VALUE = 0xbc197c81;\r\n\r\n  // Objects balances\r\n  mapping (address => mapping(uint256 => uint256)) internal balances;\r\n\r\n  // Operator Functions\r\n  mapping (address => mapping(address => bool)) internal operators;\r\n\r\n\r\n  /***********************************|\r\n  |     Public Transfer Functions     |\r\n  |__________________________________*/\r\n\r\n  /**\r\n   * @notice Transfers amount amount of an _id from the _from address to the _to address specified\r\n   * @param _from    Source address\r\n   * @param _to      Target address\r\n   * @param _id      ID of the token type\r\n   * @param _amount  Transfered amount\r\n   * @param _data    Additional data with no specified format, sent in call to `_to`\r\n   */\r\n  function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _amount, bytes memory _data)\r\n    public virtual override\r\n  {\r\n    require((msg.sender == _from) || isApprovedForAll(_from, msg.sender), "ERC1155#safeTransferFrom: INVALID_OPERATOR");\r\n    require(_to != address(0),"ERC1155#safeTransferFrom: INVALID_RECIPIENT");\r\n\r\n    _safeTransferFrom(_from, _to, _id, _amount);\r\n    _callonERC1155Received(_from, _to, _id, _amount, gasleft(), _data);\r\n  }\r\n\r\n  /**\r\n   * @notice Send multiple types of Tokens from the _from address to the _to address (with safety call)\r\n   * @param _from     Source addresses\r\n   * @param _to       Target addresses\r\n   * @param _ids      IDs of each token type\r\n   * @param _amounts  Transfer amounts per token type\r\n   * @param _data     Additional data with no specified format, sent in call to `_to`\r\n   */\r\n  function safeBatchTransferFrom(address _from, address _to, uint256[] memory _ids, uint256[] memory _amounts, bytes memory _data)\r\n    public virtual override\r\n  {\r\n    // Requirements\r\n    require((msg.sender == _from) || isApprovedForAll(_from, msg.sender), "ERC1155#safeBatchTransferFrom: INVALID_OPERATOR");\r\n    require(_to != address(0), "ERC1155#safeBatchTransferFrom: INVALID_RECIPIENT");\r\n\r\n    _safeBatchTransferFrom(_from, _to, _ids, _amounts);\r\n    _callonERC1155BatchReceived(_from, _to, _ids, _amounts, gasleft(), _data);\r\n  }\r\n\r\n\r\n  /***********************************|\r\n  |    Internal Transfer Functions    |\r\n  |__________________________________*/\r\n\r\n  /**\r\n   * @notice Transfers amount amount of an _id from the _from address to the _to address specified\r\n   * @param _from    Source address\r\n   * @param _to      Target address\r\n   * @param _id      ID of the token type\r\n   * @param _amount  Transfered amount\r\n   */\r\n  function _safeTransferFrom(address _from, address _to, uint256 _id, uint256 _amount)\r\n    internal virtual\r\n  {\r\n    // Update balances\r\n    balances[_from][_id] -= _amount;\r\n    balances[_to][_id] += _amount;\r\n\r\n    // Emit event\r\n    emit TransferSingle(msg.sender, _from, _to, _id, _amount);\r\n  }\r\n\r\n  /**\r\n   * @notice Verifies if receiver is contract and if so, calls (_to).onERC1155Received(...)\r\n   */\r\n  function _callonERC1155Received(address _from, address _to, uint256 _id, uint256 _amount, uint256 _gasLimit, bytes memory _data)\r\n    internal virtual\r\n  {\r\n    // Check if recipient is contract\r\n    if (_to.isContract()) {\r\n      bytes4 retval = IERC1155TokenReceiver(_to).onERC1155Received{gas: _gasLimit}(msg.sender, _from, _id, _amount, _data);\r\n      require(retval == ERC1155_RECEIVED_VALUE, "ERC1155#_callonERC1155Received: INVALID_ON_RECEIVE_MESSAGE");\r\n    }\r\n  }\r\n\r\n  /**\r\n   * @notice Send multiple types of Tokens from the _from address to the _to address (with safety call)\r\n   * @param _from     Source addresses\r\n   * @param _to       Target addresses\r\n   * @param _ids      IDs of each token type\r\n   * @param _amounts  Transfer amounts per token type\r\n   */\r\n  function _safeBatchTransferFrom(address _from, address _to, uint256[] memory _ids, uint256[] memory _amounts)\r\n    internal virtual\r\n  {\r\n    require(_ids.length == _amounts.length, "ERC1155#_safeBatchTransferFrom: INVALID_ARRAYS_LENGTH");\r\n\r\n    // Number of transfer to execute\r\n    uint256 nTransfer = _ids.length;\r\n\r\n    // Executing all transfers\r\n    for (uint256 i = 0; i < nTransfer; i++) {\r\n      // Update storage balance of previous bin\r\n      balances[_from][_ids[i]] -= _amounts[i];\r\n      balances[_to][_ids[i]] += _amounts[i];\r\n    }\r\n\r\n    // Emit event\r\n    emit TransferBatch(msg.sender, _from, _to, _ids, _amounts);\r\n  }\r\n\r\n  /**\r\n   * @notice Verifies if receiver is contract and if so, calls (_to).onERC1155BatchReceived(...)\r\n   */\r\n  function _callonERC1155BatchReceived(address _from, address _to, uint256[] memory _ids, uint256[] memory _amounts, uint256 _gasLimit, bytes memory _data)\r\n    internal virtual\r\n  {\r\n    // Pass data if recipient is contract\r\n    if (_to.isContract()) {\r\n      bytes4 retval = IERC1155TokenReceiver(_to).onERC1155BatchReceived{gas: _gasLimit}(msg.sender, _from, _ids, _amounts, _data);\r\n      require(retval == ERC1155_BATCH_RECEIVED_VALUE, "ERC1155#_callonERC1155BatchReceived: INVALID_ON_RECEIVE_MESSAGE");\r\n    }\r\n  }\r\n\r\n\r\n  /***********************************|\r\n  |         Operator Functions        |\r\n  |__________________________________*/\r\n\r\n  /**\r\n   * @notice Enable or disable approval for a third party ("operator") to manage all of caller\'s tokens\r\n   * @param _operator  Address to add to the set of authorized operators\r\n   * @param _approved  True if the operator is approved, false to revoke approval\r\n   */\r\n  function setApprovalForAll(address _operator, bool _approved)\r\n    external virtual override\r\n  {\r\n    // Update operator status\r\n    operators[msg.sender][_operator] = _approved;\r\n    emit ApprovalForAll(msg.sender, _operator, _approved);\r\n  }\r\n\r\n  /**\r\n   * @notice Queries the approval status of an operator for a given owner\r\n   * @param _owner     The owner of the Tokens\r\n   * @param _operator  Address of authorized operator\r\n   * @return isOperator True if the operator is approved, false if not\r\n   */\r\n  function isApprovedForAll(address _owner, address _operator)\r\n    public view virtual override returns (bool isOperator)\r\n  {\r\n    return operators[_owner][_operator];\r\n  }\r\n\r\n\r\n  /***********************************|\r\n  |         Balance Functions         |\r\n  |__________________________________*/\r\n\r\n  /**\r\n   * @notice Get the balance of an account\'s Tokens\r\n   * @param _owner  The address of the token holder\r\n   * @param _id     ID of the Token\r\n   * @return The _owner\'s balance of the Token type requested\r\n   */\r\n  function balanceOf(address _owner, uint256 _id)\r\n    public view virtual override returns (uint256)\r\n  {\r\n    return balances[_owner][_id];\r\n  }\r\n\r\n  /**\r\n   * @notice Get the balance of multiple account/token pairs\r\n   * @param _owners The addresses of the token holders\r\n   * @param _ids    ID of the Tokens\r\n   * @return        The _owner\'s balance of the Token types requested (i.e. balance for each (owner, id) pair)\r\n   */\r\n  function balanceOfBatch(address[] memory _owners, uint256[] memory _ids)\r\n    public view virtual override returns (uint256[] memory)\r\n  {\r\n    require(_owners.length == _ids.length, "ERC1155#balanceOfBatch: INVALID_ARRAY_LENGTH");\r\n\r\n    // Variables\r\n    uint256[] memory batchBalances = new uint256[](_owners.length);\r\n\r\n    // Iterate over each owner and token ID\r\n    for (uint256 i = 0; i < _owners.length; i++) {\r\n      batchBalances[i] = balances[_owners[i]][_ids[i]];\r\n    }\r\n\r\n    return batchBalances;\r\n  }\r\n\r\n\r\n  /***********************************|\r\n  |          ERC165 Functions         |\r\n  |__________________________________*/\r\n\r\n  /**\r\n   * @notice Query if a contract implements an interface\r\n   * @param _interfaceID  The interface identifier, as specified in ERC-165\r\n   * @return `true` if the contract implements `_interfaceID` and\r\n   */\r\n  function supportsInterface(bytes4 _interfaceID) public view virtual override(ERC165, IERC165) returns (bool) {\r\n    if (_interfaceID == type(IERC1155).interfaceId) {\r\n      return true;\r\n    }\r\n    return super.supportsInterface(_interfaceID);\r\n  }\r\n}\r\n'
      },
      'lib/0xsequence/erc-1155/src/contracts/tokens/ERC1155/ERC1155MintBurn.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\nimport "./ERC1155.sol";\r\n\r\n\r\n/**\r\n * @dev Multi-Fungible Tokens with minting and burning methods. These methods assume\r\n *      a parent contract to be executed as they are `internal` functions\r\n */\r\ncontract ERC1155MintBurn is ERC1155 {\r\n\r\n  /****************************************|\r\n  |            Minting Functions           |\r\n  |_______________________________________*/\r\n\r\n  /**\r\n   * @notice Mint _amount of tokens of a given id\r\n   * @param _to      The address to mint tokens to\r\n   * @param _id      Token id to mint\r\n   * @param _amount  The amount to be minted\r\n   * @param _data    Data to pass if receiver is contract\r\n   */\r\n  function _mint(address _to, uint256 _id, uint256 _amount, bytes memory _data)\r\n    internal virtual\r\n  {\r\n    // Add _amount\r\n    balances[_to][_id] += _amount;\r\n\r\n    // Emit event\r\n    emit TransferSingle(msg.sender, address(0x0), _to, _id, _amount);\r\n\r\n    // Calling onReceive method if recipient is contract\r\n    _callonERC1155Received(address(0x0), _to, _id, _amount, gasleft(), _data);\r\n  }\r\n\r\n  /**\r\n   * @notice Mint tokens for each ids in _ids\r\n   * @param _to       The address to mint tokens to\r\n   * @param _ids      Array of ids to mint\r\n   * @param _amounts  Array of amount of tokens to mint per id\r\n   * @param _data    Data to pass if receiver is contract\r\n   */\r\n  function _batchMint(address _to, uint256[] memory _ids, uint256[] memory _amounts, bytes memory _data)\r\n    internal virtual\r\n  {\r\n    require(_ids.length == _amounts.length, "ERC1155MintBurn#batchMint: INVALID_ARRAYS_LENGTH");\r\n\r\n    // Number of mints to execute\r\n    uint256 nMint = _ids.length;\r\n\r\n     // Executing all minting\r\n    for (uint256 i = 0; i < nMint; i++) {\r\n      // Update storage balance\r\n      balances[_to][_ids[i]] += _amounts[i];\r\n    }\r\n\r\n    // Emit batch mint event\r\n    emit TransferBatch(msg.sender, address(0x0), _to, _ids, _amounts);\r\n\r\n    // Calling onReceive method if recipient is contract\r\n    _callonERC1155BatchReceived(address(0x0), _to, _ids, _amounts, gasleft(), _data);\r\n  }\r\n\r\n\r\n  /****************************************|\r\n  |            Burning Functions           |\r\n  |_______________________________________*/\r\n\r\n  /**\r\n   * @notice Burn _amount of tokens of a given token id\r\n   * @param _from    The address to burn tokens from\r\n   * @param _id      Token id to burn\r\n   * @param _amount  The amount to be burned\r\n   */\r\n  function _burn(address _from, uint256 _id, uint256 _amount)\r\n    internal virtual\r\n  {\r\n    //Substract _amount\r\n    balances[_from][_id] -= _amount;\r\n\r\n    // Emit event\r\n    emit TransferSingle(msg.sender, _from, address(0x0), _id, _amount);\r\n  }\r\n\r\n  /**\r\n   * @notice Burn tokens of given token id for each (_ids[i], _amounts[i]) pair\r\n   * @param _from     The address to burn tokens from\r\n   * @param _ids      Array of token ids to burn\r\n   * @param _amounts  Array of the amount to be burned\r\n   */\r\n  function _batchBurn(address _from, uint256[] memory _ids, uint256[] memory _amounts)\r\n    internal virtual\r\n  {\r\n    // Number of mints to execute\r\n    uint256 nBurn = _ids.length;\r\n    require(nBurn == _amounts.length, "ERC1155MintBurn#batchBurn: INVALID_ARRAYS_LENGTH");\r\n\r\n    // Executing all minting\r\n    for (uint256 i = 0; i < nBurn; i++) {\r\n      // Update storage balance\r\n      balances[_from][_ids[i]] -= _amounts[i];\r\n    }\r\n\r\n    // Emit batch mint event\r\n    emit TransferBatch(msg.sender, _from, address(0x0), _ids, _amounts);\r\n  }\r\n}\r\n'
      },
      'lib/0xsequence/erc-1155/src/contracts/utils/Address.sol': {
        content:
          'pragma solidity ^0.8.0;\r\n\r\n/**\r\n * Utility library of inline functions on addresses\r\n */\r\nlibrary Address {\r\n\r\n  // Default hash for EOA accounts returned by extcodehash\r\n  bytes32 constant internal ACCOUNT_HASH = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;\r\n\r\n  /**\r\n   * Returns whether the target address is a contract\r\n   * @dev This function will return false if invoked during the constructor of a contract.\r\n   * @param _address address of the account to check\r\n   * @return Whether the target address is a contract\r\n   */\r\n  function isContract(address _address) internal view returns (bool) {\r\n    bytes32 codehash;\r\n\r\n    // Currently there is no better way to check if there is a contract in an address\r\n    // than to check the size of the code at that address or if it has a non-zero code hash or account hash\r\n    assembly { codehash := extcodehash(_address) }\r\n    return (codehash != 0x0 && codehash != ACCOUNT_HASH);\r\n  }\r\n}\r\n'
      },
      'lib/0xsequence/erc-1155/src/contracts/utils/ERC165.sol': {
        content:
          'pragma solidity ^0.8.0;\r\nimport "../interfaces/IERC165.sol";\r\n\r\nabstract contract ERC165 is IERC165 {\r\n  /**\r\n   * @notice Query if a contract implements an interface\r\n   * @param _interfaceID The interface identifier, as specified in ERC-165\r\n   * @return `true` if the contract implements `_interfaceID`\r\n   */\r\n  function supportsInterface(bytes4 _interfaceID) public view virtual override returns (bool) {\r\n    return _interfaceID == this.supportsInterface.selector;\r\n  }\r\n}\r\n'
      },
      'lib/openzeppelin/contracts/access/Ownable.sol': {
        content:
          '// SPDX-License-Identifier: MIT\r\n// OpenZeppelin Contracts (last updated v4.9.0) (access/Ownable.sol)\r\n\r\npragma solidity ^0.8.0;\r\n\r\nimport "../utils/Context.sol";\r\n\r\n/**\r\n * @dev Contract module which provides a basic access control mechanism, where\r\n * there is an account (an owner) that can be granted exclusive access to\r\n * specific functions.\r\n *\r\n * By default, the owner account will be the one that deploys the contract. This\r\n * can later be changed with {transferOwnership}.\r\n *\r\n * This module is used through inheritance. It will make available the modifier\r\n * `onlyOwner`, which can be applied to your functions to restrict their use to\r\n * the owner.\r\n */\r\nabstract contract Ownable is Context {\r\n    address private _owner;\r\n\r\n    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);\r\n\r\n    /**\r\n     * @dev Initializes the contract setting the deployer as the initial owner.\r\n     */\r\n    constructor() {\r\n        _transferOwnership(_msgSender());\r\n    }\r\n\r\n    /**\r\n     * @dev Throws if called by any account other than the owner.\r\n     */\r\n    modifier onlyOwner() {\r\n        _checkOwner();\r\n        _;\r\n    }\r\n\r\n    /**\r\n     * @dev Returns the address of the current owner.\r\n     */\r\n    function owner() public view virtual returns (address) {\r\n        return _owner;\r\n    }\r\n\r\n    /**\r\n     * @dev Throws if the sender is not the owner.\r\n     */\r\n    function _checkOwner() internal view virtual {\r\n        require(owner() == _msgSender(), "Ownable: caller is not the owner");\r\n    }\r\n\r\n    /**\r\n     * @dev Leaves the contract without owner. It will not be possible to call\r\n     * `onlyOwner` functions. Can only be called by the current owner.\r\n     *\r\n     * NOTE: Renouncing ownership will leave the contract without an owner,\r\n     * thereby disabling any functionality that is only available to the owner.\r\n     */\r\n    function renounceOwnership() public virtual onlyOwner {\r\n        _transferOwnership(address(0));\r\n    }\r\n\r\n    /**\r\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\r\n     * Can only be called by the current owner.\r\n     */\r\n    function transferOwnership(address newOwner) public virtual onlyOwner {\r\n        require(newOwner != address(0), "Ownable: new owner is the zero address");\r\n        _transferOwnership(newOwner);\r\n    }\r\n\r\n    /**\r\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\r\n     * Internal function without access restriction.\r\n     */\r\n    function _transferOwnership(address newOwner) internal virtual {\r\n        address oldOwner = _owner;\r\n        _owner = newOwner;\r\n        emit OwnershipTransferred(oldOwner, newOwner);\r\n    }\r\n}\r\n'
      },
      'lib/openzeppelin/contracts/utils/Context.sol': {
        content:
          '// SPDX-License-Identifier: MIT\r\n// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)\r\n\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev Provides information about the current execution context, including the\r\n * sender of the transaction and its data. While these are generally available\r\n * via msg.sender and msg.data, they should not be accessed in such a direct\r\n * manner, since when dealing with meta-transactions the account sending and\r\n * paying for execution may not be the actual sender (as far as an application\r\n * is concerned).\r\n *\r\n * This contract is only required for intermediate, library-like contracts.\r\n */\r\nabstract contract Context {\r\n    function _msgSender() internal view virtual returns (address) {\r\n        return msg.sender;\r\n    }\r\n\r\n    function _msgData() internal view virtual returns (bytes calldata) {\r\n        return msg.data;\r\n    }\r\n}\r\n'
      },
      'lib/solady/src/utils/SafeTransferLib.sol': {
        content:
          "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.4;\n\n/// @notice Safe ETH and ERC20 transfer library that gracefully handles missing return values.\n/// @author Solady (https://github.com/vectorized/solady/blob/main/src/utils/SafeTransferLib.sol)\n/// @author Modified from Solmate (https://github.com/transmissions11/solmate/blob/main/src/utils/SafeTransferLib.sol)\n/// @author Permit2 operations from (https://github.com/Uniswap/permit2/blob/main/src/libraries/Permit2Lib.sol)\n///\n/// @dev Note:\n/// - For ETH transfers, please use `forceSafeTransferETH` for DoS protection.\n/// - For ERC20s, this implementation won't check that a token has code,\n///   responsibility is delegated to the caller.\nlibrary SafeTransferLib {\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                       CUSTOM ERRORS                        */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev The ETH transfer has failed.\n    error ETHTransferFailed();\n\n    /// @dev The ERC20 `transferFrom` has failed.\n    error TransferFromFailed();\n\n    /// @dev The ERC20 `transfer` has failed.\n    error TransferFailed();\n\n    /// @dev The ERC20 `approve` has failed.\n    error ApproveFailed();\n\n    /// @dev The Permit2 operation has failed.\n    error Permit2Failed();\n\n    /// @dev The Permit2 amount must be less than `2**160 - 1`.\n    error Permit2AmountOverflow();\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                         CONSTANTS                          */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev Suggested gas stipend for contract receiving ETH that disallows any storage writes.\n    uint256 internal constant GAS_STIPEND_NO_STORAGE_WRITES = 2300;\n\n    /// @dev Suggested gas stipend for contract receiving ETH to perform a few\n    /// storage reads and writes, but low enough to prevent griefing.\n    uint256 internal constant GAS_STIPEND_NO_GRIEF = 100000;\n\n    /// @dev The unique EIP-712 domain domain separator for the DAI token contract.\n    bytes32 internal constant DAI_DOMAIN_SEPARATOR =\n        0xdbb8cf42e1ecb028be3f3dbc922e1d878b963f411dc388ced501601c60f7c6f7;\n\n    /// @dev The address for the WETH9 contract on Ethereum mainnet.\n    address internal constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;\n\n    /// @dev The canonical Permit2 address.\n    /// [Github](https://github.com/Uniswap/permit2)\n    /// [Etherscan](https://etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3)\n    address internal constant PERMIT2 = 0x000000000022D473030F116dDEE9F6B43aC78BA3;\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                       ETH OPERATIONS                       */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    // If the ETH transfer MUST succeed with a reasonable gas budget, use the force variants.\n    //\n    // The regular variants:\n    // - Forwards all remaining gas to the target.\n    // - Reverts if the target reverts.\n    // - Reverts if the current contract has insufficient balance.\n    //\n    // The force variants:\n    // - Forwards with an optional gas stipend\n    //   (defaults to `GAS_STIPEND_NO_GRIEF`, which is sufficient for most cases).\n    // - If the target reverts, or if the gas stipend is exhausted,\n    //   creates a temporary contract to force send the ETH via `SELFDESTRUCT`.\n    //   Future compatible with `SENDALL`: https://eips.ethereum.org/EIPS/eip-4758.\n    // - Reverts if the current contract has insufficient balance.\n    //\n    // The try variants:\n    // - Forwards with a mandatory gas stipend.\n    // - Instead of reverting, returns whether the transfer succeeded.\n\n    /// @dev Sends `amount` (in wei) ETH to `to`.\n    function safeTransferETH(address to, uint256 amount) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            if iszero(call(gas(), to, amount, codesize(), 0x00, codesize(), 0x00)) {\n                mstore(0x00, 0xb12d13eb) // `ETHTransferFailed()`.\n                revert(0x1c, 0x04)\n            }\n        }\n    }\n\n    /// @dev Sends all the ETH in the current contract to `to`.\n    function safeTransferAllETH(address to) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            // Transfer all the ETH and check if it succeeded or not.\n            if iszero(call(gas(), to, selfbalance(), codesize(), 0x00, codesize(), 0x00)) {\n                mstore(0x00, 0xb12d13eb) // `ETHTransferFailed()`.\n                revert(0x1c, 0x04)\n            }\n        }\n    }\n\n    /// @dev Force sends `amount` (in wei) ETH to `to`, with a `gasStipend`.\n    function forceSafeTransferETH(address to, uint256 amount, uint256 gasStipend) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            if lt(selfbalance(), amount) {\n                mstore(0x00, 0xb12d13eb) // `ETHTransferFailed()`.\n                revert(0x1c, 0x04)\n            }\n            if iszero(call(gasStipend, to, amount, codesize(), 0x00, codesize(), 0x00)) {\n                mstore(0x00, to) // Store the address in scratch space.\n                mstore8(0x0b, 0x73) // Opcode `PUSH20`.\n                mstore8(0x20, 0xff) // Opcode `SELFDESTRUCT`.\n                if iszero(create(amount, 0x0b, 0x16)) { revert(codesize(), codesize()) } // For gas estimation.\n            }\n        }\n    }\n\n    /// @dev Force sends all the ETH in the current contract to `to`, with a `gasStipend`.\n    function forceSafeTransferAllETH(address to, uint256 gasStipend) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            if iszero(call(gasStipend, to, selfbalance(), codesize(), 0x00, codesize(), 0x00)) {\n                mstore(0x00, to) // Store the address in scratch space.\n                mstore8(0x0b, 0x73) // Opcode `PUSH20`.\n                mstore8(0x20, 0xff) // Opcode `SELFDESTRUCT`.\n                if iszero(create(selfbalance(), 0x0b, 0x16)) { revert(codesize(), codesize()) } // For gas estimation.\n            }\n        }\n    }\n\n    /// @dev Force sends `amount` (in wei) ETH to `to`, with `GAS_STIPEND_NO_GRIEF`.\n    function forceSafeTransferETH(address to, uint256 amount) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            if lt(selfbalance(), amount) {\n                mstore(0x00, 0xb12d13eb) // `ETHTransferFailed()`.\n                revert(0x1c, 0x04)\n            }\n            if iszero(call(GAS_STIPEND_NO_GRIEF, to, amount, codesize(), 0x00, codesize(), 0x00)) {\n                mstore(0x00, to) // Store the address in scratch space.\n                mstore8(0x0b, 0x73) // Opcode `PUSH20`.\n                mstore8(0x20, 0xff) // Opcode `SELFDESTRUCT`.\n                if iszero(create(amount, 0x0b, 0x16)) { revert(codesize(), codesize()) } // For gas estimation.\n            }\n        }\n    }\n\n    /// @dev Force sends all the ETH in the current contract to `to`, with `GAS_STIPEND_NO_GRIEF`.\n    function forceSafeTransferAllETH(address to) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            // forgefmt: disable-next-item\n            if iszero(call(GAS_STIPEND_NO_GRIEF, to, selfbalance(), codesize(), 0x00, codesize(), 0x00)) {\n                mstore(0x00, to) // Store the address in scratch space.\n                mstore8(0x0b, 0x73) // Opcode `PUSH20`.\n                mstore8(0x20, 0xff) // Opcode `SELFDESTRUCT`.\n                if iszero(create(selfbalance(), 0x0b, 0x16)) { revert(codesize(), codesize()) } // For gas estimation.\n            }\n        }\n    }\n\n    /// @dev Sends `amount` (in wei) ETH to `to`, with a `gasStipend`.\n    function trySafeTransferETH(address to, uint256 amount, uint256 gasStipend)\n        internal\n        returns (bool success)\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            success := call(gasStipend, to, amount, codesize(), 0x00, codesize(), 0x00)\n        }\n    }\n\n    /// @dev Sends all the ETH in the current contract to `to`, with a `gasStipend`.\n    function trySafeTransferAllETH(address to, uint256 gasStipend)\n        internal\n        returns (bool success)\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            success := call(gasStipend, to, selfbalance(), codesize(), 0x00, codesize(), 0x00)\n        }\n    }\n\n    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n    /*                      ERC20 OPERATIONS                      */\n    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n    /// @dev Sends `amount` of ERC20 `token` from `from` to `to`.\n    /// Reverts upon failure.\n    ///\n    /// The `from` account must have at least `amount` approved for\n    /// the current contract to manage.\n    function safeTransferFrom(address token, address from, address to, uint256 amount) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            let m := mload(0x40) // Cache the free memory pointer.\n            mstore(0x60, amount) // Store the `amount` argument.\n            mstore(0x40, to) // Store the `to` argument.\n            mstore(0x2c, shl(96, from)) // Store the `from` argument.\n            mstore(0x0c, 0x23b872dd000000000000000000000000) // `transferFrom(address,address,uint256)`.\n            // Perform the transfer, reverting upon failure.\n            if iszero(\n                and( // The arguments of `and` are evaluated from right to left.\n                    or(eq(mload(0x00), 1), iszero(returndatasize())), // Returned 1 or nothing.\n                    call(gas(), token, 0, 0x1c, 0x64, 0x00, 0x20)\n                )\n            ) {\n                mstore(0x00, 0x7939f424) // `TransferFromFailed()`.\n                revert(0x1c, 0x04)\n            }\n            mstore(0x60, 0) // Restore the zero slot to zero.\n            mstore(0x40, m) // Restore the free memory pointer.\n        }\n    }\n\n    /// @dev Sends `amount` of ERC20 `token` from `from` to `to`.\n    ///\n    /// The `from` account must have at least `amount` approved for the current contract to manage.\n    function trySafeTransferFrom(address token, address from, address to, uint256 amount)\n        internal\n        returns (bool success)\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            let m := mload(0x40) // Cache the free memory pointer.\n            mstore(0x60, amount) // Store the `amount` argument.\n            mstore(0x40, to) // Store the `to` argument.\n            mstore(0x2c, shl(96, from)) // Store the `from` argument.\n            mstore(0x0c, 0x23b872dd000000000000000000000000) // `transferFrom(address,address,uint256)`.\n            success :=\n                and( // The arguments of `and` are evaluated from right to left.\n                    or(eq(mload(0x00), 1), iszero(returndatasize())), // Returned 1 or nothing.\n                    call(gas(), token, 0, 0x1c, 0x64, 0x00, 0x20)\n                )\n            mstore(0x60, 0) // Restore the zero slot to zero.\n            mstore(0x40, m) // Restore the free memory pointer.\n        }\n    }\n\n    /// @dev Sends all of ERC20 `token` from `from` to `to`.\n    /// Reverts upon failure.\n    ///\n    /// The `from` account must have their entire balance approved for the current contract to manage.\n    function safeTransferAllFrom(address token, address from, address to)\n        internal\n        returns (uint256 amount)\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            let m := mload(0x40) // Cache the free memory pointer.\n            mstore(0x40, to) // Store the `to` argument.\n            mstore(0x2c, shl(96, from)) // Store the `from` argument.\n            mstore(0x0c, 0x70a08231000000000000000000000000) // `balanceOf(address)`.\n            // Read the balance, reverting upon failure.\n            if iszero(\n                and( // The arguments of `and` are evaluated from right to left.\n                    gt(returndatasize(), 0x1f), // At least 32 bytes returned.\n                    staticcall(gas(), token, 0x1c, 0x24, 0x60, 0x20)\n                )\n            ) {\n                mstore(0x00, 0x7939f424) // `TransferFromFailed()`.\n                revert(0x1c, 0x04)\n            }\n            mstore(0x00, 0x23b872dd) // `transferFrom(address,address,uint256)`.\n            amount := mload(0x60) // The `amount` is already at 0x60. We'll need to return it.\n            // Perform the transfer, reverting upon failure.\n            if iszero(\n                and( // The arguments of `and` are evaluated from right to left.\n                    or(eq(mload(0x00), 1), iszero(returndatasize())), // Returned 1 or nothing.\n                    call(gas(), token, 0, 0x1c, 0x64, 0x00, 0x20)\n                )\n            ) {\n                mstore(0x00, 0x7939f424) // `TransferFromFailed()`.\n                revert(0x1c, 0x04)\n            }\n            mstore(0x60, 0) // Restore the zero slot to zero.\n            mstore(0x40, m) // Restore the free memory pointer.\n        }\n    }\n\n    /// @dev Sends `amount` of ERC20 `token` from the current contract to `to`.\n    /// Reverts upon failure.\n    function safeTransfer(address token, address to, uint256 amount) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x14, to) // Store the `to` argument.\n            mstore(0x34, amount) // Store the `amount` argument.\n            mstore(0x00, 0xa9059cbb000000000000000000000000) // `transfer(address,uint256)`.\n            // Perform the transfer, reverting upon failure.\n            if iszero(\n                and( // The arguments of `and` are evaluated from right to left.\n                    or(eq(mload(0x00), 1), iszero(returndatasize())), // Returned 1 or nothing.\n                    call(gas(), token, 0, 0x10, 0x44, 0x00, 0x20)\n                )\n            ) {\n                mstore(0x00, 0x90b8ec18) // `TransferFailed()`.\n                revert(0x1c, 0x04)\n            }\n            mstore(0x34, 0) // Restore the part of the free memory pointer that was overwritten.\n        }\n    }\n\n    /// @dev Sends all of ERC20 `token` from the current contract to `to`.\n    /// Reverts upon failure.\n    function safeTransferAll(address token, address to) internal returns (uint256 amount) {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x00, 0x70a08231) // Store the function selector of `balanceOf(address)`.\n            mstore(0x20, address()) // Store the address of the current contract.\n            // Read the balance, reverting upon failure.\n            if iszero(\n                and( // The arguments of `and` are evaluated from right to left.\n                    gt(returndatasize(), 0x1f), // At least 32 bytes returned.\n                    staticcall(gas(), token, 0x1c, 0x24, 0x34, 0x20)\n                )\n            ) {\n                mstore(0x00, 0x90b8ec18) // `TransferFailed()`.\n                revert(0x1c, 0x04)\n            }\n            mstore(0x14, to) // Store the `to` argument.\n            amount := mload(0x34) // The `amount` is already at 0x34. We'll need to return it.\n            mstore(0x00, 0xa9059cbb000000000000000000000000) // `transfer(address,uint256)`.\n            // Perform the transfer, reverting upon failure.\n            if iszero(\n                and( // The arguments of `and` are evaluated from right to left.\n                    or(eq(mload(0x00), 1), iszero(returndatasize())), // Returned 1 or nothing.\n                    call(gas(), token, 0, 0x10, 0x44, 0x00, 0x20)\n                )\n            ) {\n                mstore(0x00, 0x90b8ec18) // `TransferFailed()`.\n                revert(0x1c, 0x04)\n            }\n            mstore(0x34, 0) // Restore the part of the free memory pointer that was overwritten.\n        }\n    }\n\n    /// @dev Sets `amount` of ERC20 `token` for `to` to manage on behalf of the current contract.\n    /// Reverts upon failure.\n    function safeApprove(address token, address to, uint256 amount) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x14, to) // Store the `to` argument.\n            mstore(0x34, amount) // Store the `amount` argument.\n            mstore(0x00, 0x095ea7b3000000000000000000000000) // `approve(address,uint256)`.\n            // Perform the approval, reverting upon failure.\n            if iszero(\n                and( // The arguments of `and` are evaluated from right to left.\n                    or(eq(mload(0x00), 1), iszero(returndatasize())), // Returned 1 or nothing.\n                    call(gas(), token, 0, 0x10, 0x44, 0x00, 0x20)\n                )\n            ) {\n                mstore(0x00, 0x3e3f8f73) // `ApproveFailed()`.\n                revert(0x1c, 0x04)\n            }\n            mstore(0x34, 0) // Restore the part of the free memory pointer that was overwritten.\n        }\n    }\n\n    /// @dev Sets `amount` of ERC20 `token` for `to` to manage on behalf of the current contract.\n    /// If the initial attempt to approve fails, attempts to reset the approved amount to zero,\n    /// then retries the approval again (some tokens, e.g. USDT, requires this).\n    /// Reverts upon failure.\n    function safeApproveWithRetry(address token, address to, uint256 amount) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x14, to) // Store the `to` argument.\n            mstore(0x34, amount) // Store the `amount` argument.\n            mstore(0x00, 0x095ea7b3000000000000000000000000) // `approve(address,uint256)`.\n            // Perform the approval, retrying upon failure.\n            if iszero(\n                and( // The arguments of `and` are evaluated from right to left.\n                    or(eq(mload(0x00), 1), iszero(returndatasize())), // Returned 1 or nothing.\n                    call(gas(), token, 0, 0x10, 0x44, 0x00, 0x20)\n                )\n            ) {\n                mstore(0x34, 0) // Store 0 for the `amount`.\n                mstore(0x00, 0x095ea7b3000000000000000000000000) // `approve(address,uint256)`.\n                pop(call(gas(), token, 0, 0x10, 0x44, codesize(), 0x00)) // Reset the approval.\n                mstore(0x34, amount) // Store back the original `amount`.\n                // Retry the approval, reverting upon failure.\n                if iszero(\n                    and(\n                        or(eq(mload(0x00), 1), iszero(returndatasize())), // Returned 1 or nothing.\n                        call(gas(), token, 0, 0x10, 0x44, 0x00, 0x20)\n                    )\n                ) {\n                    mstore(0x00, 0x3e3f8f73) // `ApproveFailed()`.\n                    revert(0x1c, 0x04)\n                }\n            }\n            mstore(0x34, 0) // Restore the part of the free memory pointer that was overwritten.\n        }\n    }\n\n    /// @dev Returns the amount of ERC20 `token` owned by `account`.\n    /// Returns zero if the `token` does not exist.\n    function balanceOf(address token, address account) internal view returns (uint256 amount) {\n        /// @solidity memory-safe-assembly\n        assembly {\n            mstore(0x14, account) // Store the `account` argument.\n            mstore(0x00, 0x70a08231000000000000000000000000) // `balanceOf(address)`.\n            amount :=\n                mul( // The arguments of `mul` are evaluated from right to left.\n                    mload(0x20),\n                    and( // The arguments of `and` are evaluated from right to left.\n                        gt(returndatasize(), 0x1f), // At least 32 bytes returned.\n                        staticcall(gas(), token, 0x10, 0x24, 0x20, 0x20)\n                    )\n                )\n        }\n    }\n\n    /// @dev Sends `amount` of ERC20 `token` from `from` to `to`.\n    /// If the initial attempt fails, try to use Permit2 to transfer the token.\n    /// Reverts upon failure.\n    ///\n    /// The `from` account must have at least `amount` approved for the current contract to manage.\n    function safeTransferFrom2(address token, address from, address to, uint256 amount) internal {\n        if (!trySafeTransferFrom(token, from, to, amount)) {\n            permit2TransferFrom(token, from, to, amount);\n        }\n    }\n\n    /// @dev Sends `amount` of ERC20 `token` from `from` to `to` via Permit2.\n    /// Reverts upon failure.\n    function permit2TransferFrom(address token, address from, address to, uint256 amount)\n        internal\n    {\n        /// @solidity memory-safe-assembly\n        assembly {\n            let m := mload(0x40)\n            mstore(add(m, 0x74), shr(96, shl(96, token)))\n            mstore(add(m, 0x54), amount)\n            mstore(add(m, 0x34), to)\n            mstore(add(m, 0x20), shl(96, from))\n            // `transferFrom(address,address,uint160,address)`.\n            mstore(m, 0x36c78516000000000000000000000000)\n            let p := PERMIT2\n            let exists := eq(chainid(), 1)\n            if iszero(exists) { exists := iszero(iszero(extcodesize(p))) }\n            if iszero(and(call(gas(), p, 0, add(m, 0x10), 0x84, codesize(), 0x00), exists)) {\n                mstore(0x00, 0x7939f4248757f0fd) // `TransferFromFailed()` or `Permit2AmountOverflow()`.\n                revert(add(0x18, shl(2, iszero(iszero(shr(160, amount))))), 0x04)\n            }\n        }\n    }\n\n    /// @dev Permit a user to spend a given amount of\n    /// another user's tokens via native EIP-2612 permit if possible, falling\n    /// back to Permit2 if native permit fails or is not implemented on the token.\n    function permit2(\n        address token,\n        address owner,\n        address spender,\n        uint256 amount,\n        uint256 deadline,\n        uint8 v,\n        bytes32 r,\n        bytes32 s\n    ) internal {\n        bool success;\n        /// @solidity memory-safe-assembly\n        assembly {\n            for {} shl(96, xor(token, WETH9)) {} {\n                mstore(0x00, 0x3644e515) // `DOMAIN_SEPARATOR()`.\n                if iszero(\n                    and( // The arguments of `and` are evaluated from right to left.\n                        lt(iszero(mload(0x00)), eq(returndatasize(), 0x20)), // Returns 1 non-zero word.\n                        // Gas stipend to limit gas burn for tokens that don't refund gas when\n                        // an non-existing function is called. 5K should be enough for a SLOAD.\n                        staticcall(5000, token, 0x1c, 0x04, 0x00, 0x20)\n                    )\n                ) { break }\n                // After here, we can be sure that token is a contract.\n                let m := mload(0x40)\n                mstore(add(m, 0x34), spender)\n                mstore(add(m, 0x20), shl(96, owner))\n                mstore(add(m, 0x74), deadline)\n                if eq(mload(0x00), DAI_DOMAIN_SEPARATOR) {\n                    mstore(0x14, owner)\n                    mstore(0x00, 0x7ecebe00000000000000000000000000) // `nonces(address)`.\n                    mstore(add(m, 0x94), staticcall(gas(), token, 0x10, 0x24, add(m, 0x54), 0x20))\n                    mstore(m, 0x8fcbaf0c000000000000000000000000) // `IDAIPermit.permit`.\n                    // `nonces` is already at `add(m, 0x54)`.\n                    // `1` is already stored at `add(m, 0x94)`.\n                    mstore(add(m, 0xb4), and(0xff, v))\n                    mstore(add(m, 0xd4), r)\n                    mstore(add(m, 0xf4), s)\n                    success := call(gas(), token, 0, add(m, 0x10), 0x104, codesize(), 0x00)\n                    break\n                }\n                mstore(m, 0xd505accf000000000000000000000000) // `IERC20Permit.permit`.\n                mstore(add(m, 0x54), amount)\n                mstore(add(m, 0x94), and(0xff, v))\n                mstore(add(m, 0xb4), r)\n                mstore(add(m, 0xd4), s)\n                success := call(gas(), token, 0, add(m, 0x10), 0xe4, codesize(), 0x00)\n                break\n            }\n        }\n        if (!success) simplePermit2(token, owner, spender, amount, deadline, v, r, s);\n    }\n\n    /// @dev Simple permit on the Permit2 contract.\n    function simplePermit2(\n        address token,\n        address owner,\n        address spender,\n        uint256 amount,\n        uint256 deadline,\n        uint8 v,\n        bytes32 r,\n        bytes32 s\n    ) internal {\n        /// @solidity memory-safe-assembly\n        assembly {\n            let m := mload(0x40)\n            mstore(m, 0x927da105) // `allowance(address,address,address)`.\n            {\n                let addressMask := shr(96, not(0))\n                mstore(add(m, 0x20), and(addressMask, owner))\n                mstore(add(m, 0x40), and(addressMask, token))\n                mstore(add(m, 0x60), and(addressMask, spender))\n                mstore(add(m, 0xc0), and(addressMask, spender))\n            }\n            let p := mul(PERMIT2, iszero(shr(160, amount)))\n            if iszero(\n                and( // The arguments of `and` are evaluated from right to left.\n                    gt(returndatasize(), 0x5f), // Returns 3 words: `amount`, `expiration`, `nonce`.\n                    staticcall(gas(), p, add(m, 0x1c), 0x64, add(m, 0x60), 0x60)\n                )\n            ) {\n                mstore(0x00, 0x6b836e6b8757f0fd) // `Permit2Failed()` or `Permit2AmountOverflow()`.\n                revert(add(0x18, shl(2, iszero(p))), 0x04)\n            }\n            mstore(m, 0x2b67b570) // `Permit2.permit` (PermitSingle variant).\n            // `owner` is already `add(m, 0x20)`.\n            // `token` is already at `add(m, 0x40)`.\n            mstore(add(m, 0x60), amount)\n            mstore(add(m, 0x80), 0xffffffffffff) // `expiration = type(uint48).max`.\n            // `nonce` is already at `add(m, 0xa0)`.\n            // `spender` is already at `add(m, 0xc0)`.\n            mstore(add(m, 0xe0), deadline)\n            mstore(add(m, 0x100), 0x100) // `signature` offset.\n            mstore(add(m, 0x120), 0x41) // `signature` length.\n            mstore(add(m, 0x140), r)\n            mstore(add(m, 0x160), s)\n            mstore(add(m, 0x180), shl(248, v))\n            if iszero(call(gas(), p, 0, add(m, 0x1c), 0x184, codesize(), 0x00)) {\n                mstore(0x00, 0x6b836e6b) // `Permit2Failed()`.\n                revert(0x1c, 0x04)\n            }\n        }\n    }\n}\n"
      },
      'src/tokens/common/IERC721Transfer.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.19;\n\n/// A minimal implementation of the ERC721 transfer interface.\ninterface IERC721Transfer {\n\n  function transferFrom(address from, address to, uint256 tokenId) external;\n  function safeTransferFrom(address from, address to, uint256 tokenId) external;\n\n}\n'
      },
      'src/tokens/common/IMetadataProvider.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.19;\n\ninterface IMetadataProvider {\n    /**\n     * Provides the metadata for the given token.\n     * @param tokenAddress The address of the token.\n     * @param tokenId The ID of the token.\n     */\n    function metadata(address tokenAddress, uint256 tokenId) external view returns (string memory);\n}\n'
      },
      'src/tokens/wrappers/clawback/Clawback.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.19;\n\nimport {IClawback, IClawbackFunctions} from "./IClawback.sol";\nimport {IERC721Transfer} from "../../common/IERC721Transfer.sol";\nimport {IMetadataProvider} from "../../common/IMetadataProvider.sol";\n\nimport {IERC1155} from "@0xsequence/erc-1155/contracts/interfaces/IERC1155.sol";\nimport {IERC165} from "@0xsequence/erc-1155/contracts/interfaces/IERC165.sol";\nimport {IERC1155Metadata} from "@0xsequence/erc-1155/contracts/interfaces/IERC1155Metadata.sol";\nimport {ERC1155, ERC1155MintBurn} from "@0xsequence/erc-1155/contracts/tokens/ERC1155/ERC1155MintBurn.sol";\n\nimport {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";\n\nimport {SafeTransferLib} from "solady/utils/SafeTransferLib.sol";\n\ncontract Clawback is Ownable, ERC1155MintBurn, IERC1155Metadata, IClawback {\n    // Do not use address(0) as burn address due to common transfer restrictions.\n    address public constant BURN_ADDRESS = address(0x000000000000000000000000000000000000dEaD);\n\n    mapping(uint32 => Template) internal _templates;\n    mapping(uint256 => TokenDetails) internal _tokenDetails;\n\n    mapping(uint32 => mapping(address => bool)) public templateOperators;\n    mapping(uint32 => mapping(address => bool)) public templateTransferers;\n\n    IMetadataProvider public metadataProvider;\n\n    bool private _expectingReceive; // Token receiver guard\n\n    uint32 private _nextTemplateId;\n    uint256 private _nextWrappedTokenId;\n\n    modifier onlyTemplateAdmin(uint32 templateId) {\n        if (_templates[templateId].admin != msg.sender) {\n            revert Unauthorized();\n        }\n        _;\n    }\n\n    constructor(address ownerAddr, address metadataProviderAddr) {\n        _transferOwnership(ownerAddr);\n        metadataProvider = IMetadataProvider(metadataProviderAddr);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function getTokenDetails(uint256 wrappedTokenId) external view returns (TokenDetails memory) {\n        return _tokenDetails[wrappedTokenId];\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function getTemplate(uint32 templateId) external view returns (Template memory) {\n        return _templates[templateId];\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function wrap(\n        uint32 templateId,\n        TokenType tokenType,\n        address tokenAddr,\n        uint256 tokenId,\n        uint256 amount,\n        address receiver\n    ) external returns (uint256 wrappedTokenId) {\n        if (_templates[templateId].admin == address(0)) {\n            revert InvalidTemplate();\n        }\n        if (tokenAddr == address(this)) {\n            // Prevent rewrapping\n            revert InvalidTokenTransfer();\n        }\n\n        wrappedTokenId = _nextWrappedTokenId++;\n        // solhint-disable-next-line not-rely-on-time\n        TokenDetails memory details = TokenDetails(tokenType, templateId, uint56(block.timestamp), tokenAddr, tokenId);\n        _tokenDetails[wrappedTokenId] = details;\n\n        address sender = msg.sender;\n        _addToWrap(details, wrappedTokenId, sender, amount, receiver);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function addToWrap(uint256 wrappedTokenId, uint256 amount, address receiver) external {\n        TokenDetails memory details = _tokenDetails[wrappedTokenId];\n        if (details.tokenAddr == address(0)) {\n            revert InvalidTokenTransfer();\n        }\n\n        address sender = msg.sender;\n        _addToWrap(details, wrappedTokenId, sender, amount, receiver);\n    }\n\n    function _addToWrap(\n        TokenDetails memory details,\n        uint256 wrappedTokenId,\n        address sender,\n        uint256 amount,\n        address receiver\n    ) internal {\n        _expectingReceive = true;\n        _transferFromOther(details.tokenType, details.tokenAddr, sender, address(this), details.tokenId, amount);\n        delete _expectingReceive;\n\n        _mint(receiver, wrappedTokenId, amount, "");\n\n        emit Wrapped(wrappedTokenId, details.templateId, details.tokenAddr, details.tokenId, amount, sender, receiver);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function unwrap(uint256 wrappedTokenId, address holder, uint256 amount) external {\n        TokenDetails memory details = _tokenDetails[wrappedTokenId];\n        Template memory template = _templates[details.templateId];\n        address sender = msg.sender;\n        if (holder != sender) {\n            // Operators are permitted any time\n            if (!templateOperators[details.templateId][sender]) {\n                revert Unauthorized();\n            }\n            // solhint-disable-next-line not-rely-on-time\n        } else if (block.timestamp - details.lockedAt < template.duration) {\n            revert TokenLocked();\n        }\n\n        _burn(holder, wrappedTokenId, amount);\n        _transferFromOther(details.tokenType, details.tokenAddr, address(this), holder, details.tokenId, amount);\n\n        emit Unwrapped(wrappedTokenId, details.templateId, details.tokenAddr, details.tokenId, amount, sender);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function clawback(uint256 wrappedTokenId, address holder, address receiver, uint256 amount) external {\n        TokenDetails memory details = _tokenDetails[wrappedTokenId];\n        _verifyClawback(details, receiver);\n\n        _burn(holder, wrappedTokenId, amount);\n        _transferFromOther(details.tokenType, details.tokenAddr, address(this), receiver, details.tokenId, amount);\n\n        emit ClawedBack(\n            wrappedTokenId, details.templateId, details.tokenAddr, details.tokenId, amount, msg.sender, holder, receiver\n        );\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function emergencyClawback(uint256 wrappedTokenId, address receiver, uint256 amount) external {\n        TokenDetails memory details = _tokenDetails[wrappedTokenId];\n        _verifyClawback(details, receiver);\n\n        // No burn\n        _transferFromOther(details.tokenType, details.tokenAddr, address(this), receiver, details.tokenId, amount);\n\n        emit EmergencyClawedBack(\n            wrappedTokenId, details.templateId, details.tokenAddr, details.tokenId, amount, msg.sender, receiver\n        );\n    }\n\n    function _verifyClawback(TokenDetails memory details, address receiver) internal view {\n        Template memory template = _templates[details.templateId];\n        if (!templateOperators[details.templateId][msg.sender]) {\n            // Only allowed by operators\n            revert Unauthorized();\n        }\n        // solhint-disable-next-line not-rely-on-time\n        if (block.timestamp - details.lockedAt >= template.duration) {\n            // Must be locked\n            revert TokenUnlocked();\n        }\n        if (template.destructionOnly && receiver != BURN_ADDRESS) {\n            revert InvalidReceiver();\n        }\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function addTemplate(uint56 duration, bool destructionOnly, bool transferOpen) external returns (uint32 templateId) {\n        templateId = _nextTemplateId++;\n        address admin = msg.sender;\n        _templates[templateId] = Template(destructionOnly, transferOpen, duration, admin);\n        emit TemplateAdded(templateId, admin, duration, destructionOnly, transferOpen);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function updateTemplate(uint32 templateId, uint56 duration, bool destructionOnly, bool transferOpen)\n        external\n        onlyTemplateAdmin(templateId)\n    {\n        Template storage template = _templates[templateId];\n        if (duration > template.duration) {\n            revert InvalidTemplateChange("Duration must be equal or decrease");\n        }\n        if (template.destructionOnly && !destructionOnly) {\n            revert InvalidTemplateChange("Cannot change from destruction only");\n        }\n        if (template.transferOpen && !transferOpen) {\n            revert InvalidTemplateChange("Cannot change from transfer open");\n        }\n        template.duration = duration;\n        template.destructionOnly = destructionOnly;\n        template.transferOpen = transferOpen;\n        emit TemplateUpdated(templateId, duration, destructionOnly, transferOpen);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function updateTemplateAdmin(uint32 templateId, address admin) external onlyTemplateAdmin(templateId) {\n        if (admin == address(0)) {\n            revert InvalidTemplateChange("Admin cannot be zero address");\n        }\n        Template storage template = _templates[templateId];\n        template.admin = admin;\n        emit TemplateAdminUpdated(templateId, admin);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function addTemplateTransferer(uint32 templateId, address transferer) external onlyTemplateAdmin(templateId) {\n        templateTransferers[templateId][transferer] = true;\n        emit TemplateTransfererAdded(templateId, transferer);\n    }\n\n    /// @inheritdoc IClawbackFunctions\n    function updateTemplateOperator(uint32 templateId, address operator, bool allowed)\n        external\n        onlyTemplateAdmin(templateId)\n    {\n        templateOperators[templateId][operator] = allowed;\n        emit TemplateOperatorUpdated(templateId, operator, allowed);\n    }\n\n    /**\n     * Transfer tokens from one address to another.\n     * @param from Source address.\n     * @param to Target address.\n     * @param wrappedTokenId ID of the token type.\n     * @param amount Transfered amount.\n     * @param data Additional data with no specified format.\n     */\n    function safeTransferFrom(address from, address to, uint256 wrappedTokenId, uint256 amount, bytes memory data)\n        public\n        override\n    {\n        TokenDetails memory details = _tokenDetails[wrappedTokenId];\n        Template memory template = _templates[details.templateId];\n        if (!template.transferOpen) {\n            bool isTransferer = templateTransferers[details.templateId][msg.sender]\n                || templateTransferers[details.templateId][from] || templateTransferers[details.templateId][to];\n            if (!isTransferer) {\n                // Transfer not allowed\n                revert Unauthorized();\n            }\n        }\n        super.safeTransferFrom(from, to, wrappedTokenId, amount, data);\n    }\n\n    /**\n     * Batch transfer tokens from one address to another.\n     * @param from Source address.\n     * @param to Target address.\n     * @param wrappedTokenIds IDs of the token type.\n     * @param amounts Transfered amounts.\n     * @param data Additional data with no specified format.\n     */\n    function safeBatchTransferFrom(\n        address from,\n        address to,\n        uint256[] memory wrappedTokenIds,\n        uint256[] memory amounts,\n        bytes memory data\n    ) public override {\n        uint256 len = wrappedTokenIds.length;\n        for (uint256 i = 0; i < len;) {\n            uint256 wrappedTokenId = wrappedTokenIds[i];\n            TokenDetails memory details = _tokenDetails[wrappedTokenId];\n            Template memory template = _templates[details.templateId];\n            if (!template.transferOpen) {\n                bool isTransferer = templateTransferers[details.templateId][msg.sender]\n                    || templateTransferers[details.templateId][from] || templateTransferers[details.templateId][to];\n                if (!isTransferer) {\n                    // Transfer not allowed\n                    revert Unauthorized();\n                }\n            }\n            unchecked { ++i; }\n        }\n        super.safeBatchTransferFrom(from, to, wrappedTokenIds, amounts, data);\n    }\n\n    function _transferFromOther(\n        TokenType tokenType,\n        address tokenAddr,\n        address from,\n        address to,\n        uint256 tokenId,\n        uint256 amount\n    ) private {\n        if (tokenType == TokenType.ERC1155) {\n            if (amount == 0) {\n                revert InvalidTokenTransfer();\n            }\n            // ERC-1155\n            IERC1155(tokenAddr).safeTransferFrom(from, to, tokenId, amount, "");\n        } else if (tokenType == TokenType.ERC721) {\n            // ERC721\n            if (amount != 1) {\n                revert InvalidTokenTransfer();\n            }\n            IERC721Transfer(tokenAddr).safeTransferFrom(from, to, tokenId);\n        } else if (tokenType == TokenType.ERC20) {\n            if (tokenId != 0 || amount == 0) {\n                revert InvalidTokenTransfer();\n            }\n            if (from == address(this)) {\n                SafeTransferLib.safeTransfer(tokenAddr, to, amount);\n            } else {\n                SafeTransferLib.safeTransferFrom(tokenAddr, from, to, amount);\n            }\n        } else {\n            revert InvalidTokenTransfer();\n        }\n    }\n\n    // URI\n\n    function updateMetadataProvider(address metadataProviderAddr) external onlyOwner {\n        metadataProvider = IMetadataProvider(metadataProviderAddr);\n    }\n\n    function uri(uint256 wrappedTokenId) external view override returns (string memory) {\n        return metadataProvider.metadata(address(this), wrappedTokenId);\n    }\n\n    // Receiver\n\n    modifier expectedReceive() {\n        if (!_expectingReceive) {\n            revert InvalidReceiver();\n        }\n        _;\n        delete _expectingReceive;\n    }\n\n    function onERC721Received(address, address, uint256, bytes calldata) external expectedReceive returns (bytes4) {\n        return this.onERC721Received.selector;\n    }\n\n    function onERC1155Received(address, address, uint256, uint256, bytes calldata)\n        external\n        expectedReceive\n        returns (bytes4)\n    {\n        return this.onERC1155Received.selector;\n    }\n\n    function onERC1155BatchReceived(address, address, uint256[] calldata, uint256[] calldata, bytes calldata)\n        external\n        pure\n        returns (bytes4)\n    {\n        // Unused.\n        revert InvalidReceiver();\n    }\n\n    /// @inheritdoc IERC165\n    function supportsInterface(bytes4 _interfaceID) public view virtual override returns (bool) {\n        if (\n            _interfaceID == type(IClawback).interfaceId || _interfaceID == type(IClawbackFunctions).interfaceId\n                || _interfaceID == type(IERC1155Metadata).interfaceId\n        ) {\n            return true;\n        }\n        return super.supportsInterface(_interfaceID);\n    }\n}\n'
      },
      'src/tokens/wrappers/clawback/IClawback.sol': {
        content:
          "// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.19;\n\ninterface IClawbackFunctions {\n    enum TokenType {\n        ERC20,\n        ERC721,\n        ERC1155\n    }\n\n    struct Template {\n        bool destructionOnly;\n        bool transferOpen;\n        uint56 duration;\n        address admin;\n    }\n\n    struct TokenDetails {\n        TokenType tokenType;\n        uint32 templateId;\n        uint56 lockedAt;\n        address tokenAddr;\n        uint256 tokenId; // 0 for ERC20\n    }\n\n    // Wrap functions\n\n    /**\n     * Wraps a token.\n     * @param templateId The template ID.\n     * @param tokenType The token type.\n     * @param tokenAddr The token address.\n     * @param tokenId The token ID.\n     * @param amount The amount to wrap.\n     * @param receiver The receiver of the wrapped token.\n     * @return wrappedTokenId The wrapped token ID.\n     */\n    function wrap(\n        uint32 templateId,\n        TokenType tokenType,\n        address tokenAddr,\n        uint256 tokenId,\n        uint256 amount,\n        address receiver\n    ) external returns (uint256 wrappedTokenId);\n\n    /**\n     * Add more tokens to a wrapping.\n     * @param wrappedTokenId The wrapped token ID.\n     * @param amount The amount to wrap.\n     * @param receiver The receiver of the wrapped token.\n     */\n    function addToWrap(uint256 wrappedTokenId, uint256 amount, address receiver) external;\n\n    /**\n     * Unwraps a token.\n     * @param wrappedTokenId The wrapped token ID.\n     * @param holder The holder of the token.\n     * @param amount The amount to unwrap.\n     * @dev Unwrapped tokens are sent to the wrapped token holder.\n     */\n    function unwrap(uint256 wrappedTokenId, address holder, uint256 amount) external;\n\n    /**\n     * Clawback a token.\n     * @param wrappedTokenId The wrapped token ID.\n     * @param holder The holder of the token.\n     * @param receiver The receiver of the token.\n     * @param amount The amount to clawback.\n     * @notice Only an operator of the template can clawback.\n     * @notice Clawback is only allowed when the token is locked.\n     */\n    function clawback(uint256 wrappedTokenId, address holder, address receiver, uint256 amount) external;\n\n    /**\n     * Clawback unwrapped tokens without burning wrapped tokens.\n     * @param wrappedTokenId The wrapped token ID.\n     * @param receiver The receiver of the token.\n     * @param amount The amount to clawback.\n     * @notice Clawback rules apply.\n     * @notice This function doesn't affect the wrapped token and should only be used when wrapped tokens are logically inaccessible.\n     * @dev Clawing back an incomplete amount will lead to a race when unwrapping remaining tokens.\n     */\n    function emergencyClawback(uint256 wrappedTokenId, address receiver, uint256 amount) external;\n\n    /**\n     * Returns the details of a wrapped token.\n     * @param wrappedTokenId The wrapped token ID.\n     * @return The token details.\n     */\n    function getTokenDetails(uint256 wrappedTokenId) external view returns (TokenDetails memory);\n\n    // Template functions\n\n    /**\n     * Gets the details of a template.\n     * @param templateId The template ID.\n     * @return The template details.\n     */\n    function getTemplate(uint32 templateId) external view returns (Template memory);\n\n    /**\n     * Add a new template.\n     * @param duration The duration of the template.\n     * @param destructionOnly Whether the template is for destruction only.\n     * @param transferOpen Whether the template allows transfers.\n     * @return templateId The template ID.\n     * @notice The msg.sender will be set as the admin of this template.\n     */\n    function addTemplate(uint56 duration, bool destructionOnly, bool transferOpen)\n        external\n        returns (uint32 templateId);\n\n    /**\n     * Update a template.\n     * @param templateId The template ID.\n     * @param duration The duration of the template. Can only be reduced.\n     * @param destructionOnly Whether the template is for destruction only. Can only be updated from false to true.\n     * @param transferOpen Whether the template allows transfers. Can only be updated from false to true.\n     * @notice Only the admin of the template can update it.\n     */\n    function updateTemplate(uint32 templateId, uint56 duration, bool destructionOnly, bool transferOpen) external;\n\n    /**\n     * Add a transferer to a template.\n     * @param templateId The template ID.\n     * @param transferer The address of the transferer.\n     * @notice Only the admin of the template can add a transferer.\n     * @notice Transferers cannot be removed.\n     * @notice Transfers are allowed when the to, from or operator is a template operator, even when the template is not in transferOpen mode.\n     */\n    function addTemplateTransferer(uint32 templateId, address transferer) external;\n\n    /**\n     * Update an operator to a template.\n     * @param templateId The template ID.\n     * @param operator The address of the operator.\n     * @param allowed Whether the operator is allowed.\n     * @notice Only the admin of the template can update an operator.\n     */\n    function updateTemplateOperator(uint32 templateId, address operator, bool allowed) external;\n\n    /**\n     * Transfer a template admin to another address.\n     * @param templateId The template ID.\n     * @param admin The address to transfer the template to.\n     * @notice Only the admin of the template can transfer it.\n     * @dev Transferring to address(0) is not allowed.\n     */\n    function updateTemplateAdmin(uint32 templateId, address admin) external;\n}\n\ninterface IClawbackSignals {\n    /// @notice Thrown when the template ID is invalid\n    error InvalidTemplate();\n\n    /// @notice Thrown when token has not been approved\n    error InvalidTokenApproval();\n\n    /// @notice Thrown when token transfer is invalid\n    error InvalidTokenTransfer();\n\n    /// @notice Thrown when token is locked\n    error TokenLocked();\n\n    /// @notice Thrown when token is unlocked\n    error TokenUnlocked();\n\n    /// @notice Thrown when the caller is not authorized\n    error Unauthorized();\n\n    /// @notice Thrown when the receiver is invalid\n    error InvalidReceiver();\n\n    /// @notice Thrown when the template change is invalid\n    error InvalidTemplateChange(string);\n\n    /// @notice Emits when a token is wrapped\n    event Wrapped(\n        uint256 indexed wrappedTokenId,\n        uint32 indexed templateId,\n        address indexed tokenAddr,\n        uint256 tokenId,\n        uint256 amount,\n        address sender,\n        address receiver\n    );\n\n    /// @notice Emits when a token is unwrapped\n    event Unwrapped(\n        uint256 indexed wrappedTokenId,\n        uint32 indexed templateId,\n        address indexed tokenAddr,\n        uint256 tokenId,\n        uint256 amount,\n        address sender\n    );\n\n    /// @notice Emits when a token is clawed back\n    event ClawedBack(\n        uint256 indexed wrappedTokenId,\n        uint32 indexed templateId,\n        address indexed tokenAddr,\n        uint256 tokenId,\n        uint256 amount,\n        address operator,\n        address holder,\n        address receiver\n    );\n\n    /// @notice Emits when a token is clawed back via emergency\n    event EmergencyClawedBack(\n        uint256 indexed wrappedTokenId,\n        uint32 indexed templateId,\n        address indexed tokenAddr,\n        uint256 tokenId,\n        uint256 amount,\n        address operator,\n        address receiver\n    );\n\n    /// @notice Emits when a template is added\n    event TemplateAdded(\n        uint32 indexed templateId, address admin, uint56 duration, bool destructionOnly, bool transferOpen\n    );\n\n    /// @notice Emits when a template is updated\n    event TemplateUpdated(uint32 indexed templateId, uint56 duration, bool destructionOnly, bool transferOpen);\n\n    /// @notice Emits when a template admin is updated\n    event TemplateAdminUpdated(uint32 indexed templateId, address admin);\n\n    /// @notice Emits when a transferer is added\n    event TemplateTransfererAdded(uint32 indexed templateId, address transferer);\n\n    /// @notice Emits when an operator is updated\n    event TemplateOperatorUpdated(uint32 indexed templateId, address operator, bool allowed);\n}\n\n// solhint-disable-next-line no-empty-blocks\ninterface IClawback is IClawbackFunctions, IClawbackSignals {}\n"
      }
    },
    settings: {
      evmVersion: 'paris',
      libraries: {},
      metadata: { bytecodeHash: 'ipfs' },
      optimizer: { enabled: true, runs: 20000 },
      remappings: [
        '0xsequence/=lib/0xsequence/',
        '@0xsequence/contracts-library/=src/',
        '@0xsequence/erc-1155/=lib/0xsequence/erc-1155/src/',
        '@0xsequence/erc20-meta-token/=lib/0xsequence/erc20-meta-token/src/',
        '@openzeppelin/=lib/openzeppelin/',
        'chiru-labs/=lib/chiru-labs/',
        'ds-test/=lib/forge-std/lib/ds-test/src/',
        'erc721a-upgradeable/=lib/chiru-labs/erc721a-upgradeable/',
        'erc721a/=lib/chiru-labs/erc721a/',
        'forge-std/=lib/forge-std/src/',
        'murky/=lib/murky/src/',
        'openzeppelin-contracts/=lib/murky/lib/openzeppelin-contracts/',
        'openzeppelin/=lib/openzeppelin/',
        'solady/=lib/solady/src/'
      ],
      viaIR: true,
      outputSelection: {
        '*': {
          '*': ['evm.bytecode', 'evm.deployedBytecode', 'devdoc', 'userdoc', 'metadata', 'abi']
        }
      }
    }
  }
}
