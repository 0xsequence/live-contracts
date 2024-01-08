import type { EtherscanVerificationRequest } from '@0xsequence/solidity-deployer'
import { ContractFactory, ethers } from 'ethers'

// https://github.com/0xsequence/marketplace-contracts/blob/13396ba5bd54b7eab6677004f2caa61385e3c1b4/contracts/Orderbook.sol

const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'InvalidAdditionalFees',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidBatchRequest',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'currency',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'InvalidCurrencyApproval',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidExpiry',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256'
      }
    ],
    name: 'InvalidOrderId',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidPrice',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidQuantity',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidRoyalty',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'InvalidTokenApproval',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'contractAddress',
        type: 'address'
      },
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'UnsupportedContractInterface',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenContract',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'fee',
        type: 'uint96'
      }
    ],
    name: 'CustomRoyaltyChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenContract',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantityRemaining',
        type: 'uint256'
      }
    ],
    name: 'OrderAccepted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenContract',
        type: 'address'
      }
    ],
    name: 'OrderCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'creator',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenContract',
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
        internalType: 'bool',
        name: 'isListing',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'currency',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pricePerToken',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'expiry',
        type: 'uint256'
      }
    ],
    name: 'OrderCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256'
      },
      {
        internalType: 'uint256[]',
        name: 'additionalFees',
        type: 'uint256[]'
      },
      {
        internalType: 'address[]',
        name: 'additionalFeeReceivers',
        type: 'address[]'
      }
    ],
    name: 'acceptOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'orderIds',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: 'quantities',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: 'additionalFees',
        type: 'uint256[]'
      },
      {
        internalType: 'address[]',
        name: 'additionalFeeReceivers',
        type: 'address[]'
      }
    ],
    name: 'acceptOrderBatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256'
      }
    ],
    name: 'cancelOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'orderIds',
        type: 'uint256[]'
      }
    ],
    name: 'cancelOrderBatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isListing',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'isERC1155',
            type: 'bool'
          },
          {
            internalType: 'address',
            name: 'tokenContract',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256'
          },
          {
            internalType: 'uint96',
            name: 'expiry',
            type: 'uint96'
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256'
          }
        ],
        internalType: 'struct IOrderbookStorage.OrderRequest',
        name: 'request',
        type: 'tuple'
      }
    ],
    name: 'createOrder',
    outputs: [
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isListing',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'isERC1155',
            type: 'bool'
          },
          {
            internalType: 'address',
            name: 'tokenContract',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256'
          },
          {
            internalType: 'uint96',
            name: 'expiry',
            type: 'uint96'
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256'
          }
        ],
        internalType: 'struct IOrderbookStorage.OrderRequest[]',
        name: 'requests',
        type: 'tuple[]'
      }
    ],
    name: 'createOrderBatch',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'orderIds',
        type: 'uint256[]'
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
      }
    ],
    name: 'customRoyalties',
    outputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        internalType: 'uint96',
        name: 'fee',
        type: 'uint96'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256'
      }
    ],
    name: 'getOrder',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'creator',
            type: 'address'
          },
          {
            internalType: 'bool',
            name: 'isListing',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'isERC1155',
            type: 'bool'
          },
          {
            internalType: 'address',
            name: 'tokenContract',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256'
          },
          {
            internalType: 'uint96',
            name: 'expiry',
            type: 'uint96'
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256'
          }
        ],
        internalType: 'struct IOrderbookStorage.Order',
        name: 'order',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'orderIds',
        type: 'uint256[]'
      }
    ],
    name: 'getOrderBatch',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'creator',
            type: 'address'
          },
          {
            internalType: 'bool',
            name: 'isListing',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'isERC1155',
            type: 'bool'
          },
          {
            internalType: 'address',
            name: 'tokenContract',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256'
          },
          {
            internalType: 'uint96',
            name: 'expiry',
            type: 'uint96'
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256'
          }
        ],
        internalType: 'struct IOrderbookStorage.Order[]',
        name: 'orders',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'cost',
        type: 'uint256'
      }
    ],
    name: 'getRoyaltyInfo',
    outputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'royalty',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256'
      }
    ],
    name: 'isOrderValid',
    outputs: [
      {
        internalType: 'bool',
        name: 'valid',
        type: 'bool'
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'creator',
            type: 'address'
          },
          {
            internalType: 'bool',
            name: 'isListing',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'isERC1155',
            type: 'bool'
          },
          {
            internalType: 'address',
            name: 'tokenContract',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256'
          },
          {
            internalType: 'uint96',
            name: 'expiry',
            type: 'uint96'
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256'
          }
        ],
        internalType: 'struct IOrderbookStorage.Order',
        name: 'order',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'orderIds',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: 'quantities',
        type: 'uint256[]'
      }
    ],
    name: 'isOrderValidBatch',
    outputs: [
      {
        internalType: 'bool[]',
        name: 'valid',
        type: 'bool[]'
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'creator',
            type: 'address'
          },
          {
            internalType: 'bool',
            name: 'isListing',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'isERC1155',
            type: 'bool'
          },
          {
            internalType: 'address',
            name: 'tokenContract',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256'
          },
          {
            internalType: 'uint96',
            name: 'expiry',
            type: 'uint96'
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256'
          }
        ],
        internalType: 'struct IOrderbookStorage.Order[]',
        name: 'orders',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
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
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenContract',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        internalType: 'uint96',
        name: 'fee',
        type: 'uint96'
      }
    ],
    name: 'setRoyaltyInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export class Orderbook extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      abi,
      '0x6080346200007e57601f6200232938819003918201601f19168301916001600160401b0383118484101762000083578084926020946040528339810103126200007e57516001600160a01b03811681036200007e576200006e90620000643362000099565b6001805562000099565b6040516122489081620000e18239f35b600080fd5b634e487b7160e01b600052604160045260246000fd5b600080546001600160a01b039283166001600160a01b03198216811783559216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a356fe6080604052600436101561001257600080fd5b60003560e01c80630bc9b045146110ad5780630db91ab91461107357806336de97421461102d578063386c96e014610fdd5780633c3784b214610f7a5780633e06781414610a1f5780634bf3278d146108ee578063514fcac7146108c45780635e27f141146107ab57806370c6502c146106c7578063715018a61461066e5780638da5cb5b14610645578063ca3e7437146102b7578063d09ef24114610200578063e25cc48c146101955763f2fde38b146100cc57600080fd5b34610190576020366003190112610190576100e56111a8565b6100ed61201f565b6001600160a01b0390811690811561013c57600054826001600160601b0360a01b821617600055167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a3005b60405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608490fd5b600080fd5b34610190576020366003190112610190576004356001600160401b038111610190576101c590369060040161122d565b906101ce612077565b60005b8281106101de5760018055005b806101f66101f06101fb9386866113db565b35611815565b611337565b6101d1565b34610190576020366003190112610190576102196118b3565b506004356000526002602052610120604060002060056040519161023c836112d0565b805460ff60018060a01b03918281168652818160a01c161515602087015260a81c1615156040850152600182015416606084015260028101546080840152600381015460a084015260048101546001600160601b03811660c085015260601c60e084015201546101008201526102b560405180926111be565bf35b3461019057610100366003190112610190576102d1612077565b6044356001600160a01b03811681036101905760e435156106345760a435906001600160601b038216820361019057426001600160601b038316111561062357602435908115908115928381141590816101905780156106135761033d636cdb3d1360e11b5b84611f74565b60043593841515850361019057841561053b5750816101905760643561036a608435928383873393611cbc565b156105085750505b6101905760c4356001600160a01b0381168103610190576020946001600160601b0391604051956103a2876112d0565b3387528515158888015260408701526001600160a01b038481166060880152606435608088015260843560a088015282841660c0880152811660e087015260e435610100870152600454956103f687611337565b6004558660005260028852600561010060406000209260018060a01b0381511684549060ff60a01b8d840151151560a01b169060ff60a81b6040850151151560a81b169269ffffffffffffffffffff60b01b1617171784556001840160018060a01b036060830151168860a01b8254161790556080810151600285015560a081015160038501558660c082015116871960e083015160601b161760048501550151910155604051946064358652151587860152608435604086015260018060a01b0316606085015260e43560808501521660a083015260018060a01b031690827f7bb50e58049edfbc045bc4fe4b78b6dade3ae2416789c5814787af89006345bc60c03393a460018055604051908152f35b604051633e2c0d9b60e11b81526001600160a01b0390941660048501526024840152604483015250336064820152608490fd5b915060843561054c60e435826113bb565b6105716105696064359261056181858a611ad4565b9190506113ce565b809287611ad4565b505060c4356001600160a01b03811691908281036101905761059590823391611b9e565b156105ef575050600092826105e6575b82156105c6575b505015610372575b60405163524f409b60e01b8152600490fd5b600093509150816105da575b5086806105ac565b600191501415866105d2565b811592506105a5565b6064925060405191631184019360e31b835260048301526024820152336044820152fd5b61033d6380ac58cd60e01b610337565b60405162d36c8560e81b8152600490fd5b60405162bfc92160e01b8152600490fd5b34610190576000366003190112610190576000546040516001600160a01b039091168152602090f35b346101905760003660031901126101905761068761201f565b600080546001600160a01b0319811682556001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b34610190576080366003190112610190576001600160401b03600435818111610190576106f890369060040161122d565b90916024358181116101905761071290369060040161122d565b91906044358281116101905761072c90369060040161122d565b90926064359081116101905761074690369060040161122d565b939092610751612077565b8587036107995760005b8781106107685760018055005b806101f6878787878c8f8f98610785816107949b61078d946113db565b35928b6113db565b35906113f8565b61075b565b6040516355ca07b760e11b8152600490fd5b3461019057602080600319360112610190576004356001600160401b038111610190576107dc90369060040161122d565b91906107e7836118f8565b9260005b81811061080d5750505061080960405192828493845283019061125d565b0390f35b8061081c6108bf9284866113db565b3560005260028086526005604060002060405192610839846112d0565b815460018060a01b03808216865260ff60a0928181851c1615158d89015260a81c1615156040870152600184015416916060928387015283015460808601526003830154908501526004820154906001600160601b03821660c08601521c60e084015201546101008201526108ae828861135c565b526108b9818761135c565b50611337565b6107eb565b34610190576020366003190112610190576108dd612077565b6108e8600435611815565b60018055005b34610190576040366003190112610190576001600160401b036004358181116101905761091f90369060040161122d565b916024359081116101905761093890369060040161122d565b80849294036107995761094a82611320565b9261095860405194856112ff565b82845261096483611320565b9460209283860196601f190136883761097c856118f8565b9460005b8181106109d6575050505050604051926040840190604085525180915260608401949060005b8181106109c057858703848701528580610809898861125d565b82511515875295830195918301916001016109a6565b806109fb6109e8610a1a9385896113db565b356109f48387896113db565b3590611948565b610a05838b61135c565b52610a10828b61135c565b9015159052611337565b610980565b34610190576020366003190112610190576001600160401b03806004351161019057366023600435011215610190576004356004013511610190573660246004356004013560081b60043501011161019057610a79612077565b610a8860043560040135611320565b610a9560405191826112ff565b600480350135808252601f1990610aab90611320565b0136602083013760005b600435600401358110610b0757506001808055604051906020820160208352835180915260206040840194019060005b818110610af25784860385f35b82518652602095860195909201918301610ae5565b90610b1b60648360081b6004350101611386565b916101048160081b6004350101351561063457426001600160601b03610b4a60c48460081b600435010161139a565b161115610623576044610b65818360081b60043501016113ae565b15610f6a57610b7c636cdb3d1360e11b5b85611f74565b610b8f60248360081b60043501016113ae565b15610e6557610ba6818360081b60043501016113ae565b93608494858460081b600435010135610bcf60a48660081b600435010135928383863393611cbc565b15610e32575050610e2d9394505b610c02610bf360248560081b60043501016113ae565b928460081b60043501016113ae565b6001600160601b03610c1d60e48660081b6004350101611386565b91610c3160c48760081b600435010161139a565b9060405195610c3f876112d0565b33875215156020870152151560408601526001600160a01b03848116606087015260048035600889901b016084810135608089015260a481013560a08901529390921660c08701529290921660e085015261010401356101008401525491610ca683611337565b6004558260005260056101006002928360205260406000209360018060a01b0382511685549060ff60a01b6020850151151560a01b169060ff60a81b6040860151151560a81b169269ffffffffffffffffffff60b01b1617171785556001850160018060a01b036060840151166001600160601b0360a01b82541617905560808201519085015560a081015160038501556001600160601b0360c0820151166001600160601b031960e083015160601b161760048501550151910155610d7560248460081b60043501016113ae565b906001600160601b03610d9160e48660081b6004350101611386565b610da460c48760081b600435010161139a565b6040805160043560088a901b0160848101358252961515602082015260a4870135918101919091526001600160a01b0392831660608201526101049095013560808601529190911660a08401521690339083907f7bb50e58049edfbc045bc4fe4b78b6dade3ae2416789c5814787af89006345bc9060c090a4610e27828561135c565b52611337565b610ab5565b604051633e2c0d9b60e11b81526001600160a01b0390931660048401526024830152918101919091523360648201528390fd5b919291600435600883901b0160a481013590610e86906101040135826113bb565b610ea461056960848660081b6004350101359261056181858a611ad4565b505060e48460081b6004350101610ec43383610ebf84611386565b611b9e565b15610f31575050610edd828460081b60043501016113ae565b9081610f28575b8115610ef9575b506105b457610e2d92610bdd565b9050610f0d828460081b60043501016113ae565b159081610f1c575b5085610eeb565b60019150141585610f15565b80159150610ee4565b9083610f3e606493611386565b604051631184019360e31b81526001600160a01b03909116600482015260248101929092523390820152fd5b610b7c6380ac58cd60e01b610b76565b34610190576080366003190112610190576001600160401b0360443581811161019057610fab90369060040161122d565b9060643592831161019057610fc76108e893369060040161122d565b929091610fd2612077565b6024356004356113f8565b34610190576020366003190112610190576001600160a01b0380610fff6111a8565b166000908152600360209081526040918290205482519381166001600160a01b0316845260a01c9083015290f35b34610190576060366003190112610190576110566110496111a8565b6044359060243590611ad4565b604080516001600160a01b03939093168352602083019190915290f35b34610190576040366003190112610190576101406102b5611098602435600435611948565b604092919251921515835260208301906111be565b34610190576060366003190112610190576110c66111a8565b6001600160a01b03906024358281169081810361019057604435916001600160601b038316808403610190576110fa61201f565b612710811161119657857f60567f9d30ab22ef3cd7557f56b897c677c80a85c8673a4a5c26eb9349ef8c6095604051936111338561129f565b84526020840192835216958660005260036020526040600020925116906001600160601b0360a01b905160a01b16179055611191604051928392839092916001600160601b03602091604084019560018060a01b0316845216910152565b0390a2005b60405163e0e54ced60e01b8152600490fd5b600435906001600160a01b038216820361019057565b60018060a01b038082511683526020820151151560208401526040820151151560408401528060608301511660608401526080820151608084015260a082015160a08401526001600160601b0360c08301511660c084015260e08201511660e083015261010080910151910152565b9181601f84011215610190578235916001600160401b038311610190576020808501948460051b01011161019057565b90815180825260208080930193019160005b82811061127d575050505090565b90919293826101208261129360019489516111be565b0195019392910161126f565b604081019081106001600160401b038211176112ba57604052565b634e487b7160e01b600052604160045260246000fd5b61012081019081106001600160401b038211176112ba57604052565b6001600160401b0381116112ba57604052565b90601f801991011681019081106001600160401b038211176112ba57604052565b6001600160401b0381116112ba5760051b60200190565b60001981146113465760010190565b634e487b7160e01b600052601160045260246000fd5b80518210156113705760209160051b010190565b634e487b7160e01b600052603260045260246000fd5b356001600160a01b03811681036101905790565b356001600160601b03811681036101905790565b3580151581036101905790565b8181029291811591840414171561134657565b9190820180921161134657565b91908110156113705760051b0190565b9190820391821161134657565b9291949390936000928484526002602052604084206040519061141a826112d0565b600581549160018060a01b038316845260ff8360a01c161515602085015260ff8360a81c161515604085015260018060a01b03600182015416606085015260028101546080850152600381015460a085015260048101546001600160601b03811660c086015260601c60e0850152015461010083015260018060a01b0316156117fc57861580156117ef575b6105b45760c08101516001600160601b0316421015610623578282036116ef5760a081015187036117ce5785855260026020526115046040862060056000918281558260018201558260028201558260038201558260048201550155565b60018060a01b0360608201511697611521886101008401516113bb565b906115318260808501518c611ad4565b9690956020850151151596876000146117c75785516001600160a01b0316985b88156117b65733985b8161176e575b5050508895895b8181106117015750505050506020820151156000146116dd5761158f6080936115a6926113eb565b60e0830151869086906001600160a01b03166120cd565b60408101511561167757015190863b1561167357604051637921219560e11b81526001600160a01b0393841660048201529216602483015260448201526064810184905260a0608482015260a48101829052818160c48183895af1801561166857611651575b5060406003915b838152600260205220015460405192835260208301527f31d57567ab27249f100dd4b9e63a5b14101a489dc9d987c44c0d76508ad076eb60403393a4565b61165b82916112ec565b611665573861160c565b80fd5b6040513d84823e3d90fd5b8380fd5b015191863b1561167357604051632142170760e11b81526001600160a01b039182166004820152911660248201526044810191909152818160648183895af1801561166857916040916003936116ce575b50611613565b6116d7906112ec565b386116c8565b8092116116ef576115a660809261158f565b6040516330fd3c3160e01b8152600490fd5b61170c8183876113db565b359061172161171c8286886113db565b611386565b986001600160a01b038a16158015611766575b6116ef5782611749611761946101f6936113ce565b60e08b0151909b908d906001600160a01b03166120cd565b611567565b508215611734565b91959091156117a457906117858161179c936113eb565b955b60e08801518a906001600160a01b03166120cd565b388080611560565b94908581116111965761179c91611787565b86516001600160a01b03169861155a565b3398611551565b8585526002602052600360408620016117e88882546113eb565b9055611504565b5060a081015187116114a6565b6040516308de01c360e31b815260048101879052602490fd5b600081815260026020526040812080549192916001600160a01b0391908216330361189a579060017fc0362da6f2ff36b382b34aec0814f6b3cdf89f5ef282a1d1f114d0c0b036d596920154169282815260026020526118966040822060056000918281558260018201558260028201558260038201558260048201550155565b80a3565b6040516308de01c360e31b815260048101849052602490fd5b604051906118c0826112d0565b816101006000918281528260208201528260408201528260608201528260808201528260a08201528260c08201528260e08201520152565b9061190282611320565b61190f60405191826112ff565b8281528092611920601f1991611320565b019060005b82811061193157505050565b60209061193c6118b3565b82828501015201611925565b9190916119536118b3565b5060005260026020526040600020916040519261196f846112d0565b80549060018060a01b03928383169384875260ff8460a01c1615159485602089015260ff604089019560a81c161515855281600185015416936060890194855260028101549160808a019283526003820154978860a08c015260056004840154938c60c06001600160601b03871691015260e08d019460601c8552015491826101008d01528615611ab8575b15159889611aa1575b89611a96575b5088611a1d575b50505050505050509190565b909192939495969750600014611a5357505081611a469551151594511690519187511693611cbc565b3880808080808080611a11565b611a9196508395849593611a6f611a87969495611a7c946113bb565b9788925116905190611ad4565b9290505116936113ce565b9085511691611b9e565b611a46565b861115985038611a0a565b60c08c01516001600160601b031642109950611a04565b8996506119fb565b51906001600160a01b038216820361019057565b6040805163152a902d60e11b81526004810193909352602483018490526001600160a01b0394939290918516908281604481855afa90816000918293611b60575b50611b57575050916020611b5392612710946000526003825280600020905190611b3e8261129f565b549687169687825260a01c91829101526113bb565b0490565b95509392505050565b919092508482813d8311611b97575b611b7981836112ff565b8101031261166557506020611b8d82611ac0565b9101519138611b15565b503d611b6f565b6040516370a0823160e01b81526001600160a01b03848116600483015291909116926020918281602481885afa8015611c68578491600091611c74575b5010159384611bec575b5050505090565b604051636eb1769f60e11b81526001600160a01b03929092166004830152306024830152929350918190839060449082905afa908115611c6857600091611c3c575b509050101538808080611be5565b82813d8311611c61575b611c5081836112ff565b810103126116655750518038611c2e565b503d611c46565b6040513d6000823e3d90fd5b91508382813d8311611c9d575b611c8b81836112ff565b81010312611665575083905138611bdb565b503d611c81565b90816020910312610190575180151581036101905790565b93919093611e74576040516331a9108f60e11b8152600481018290526000946001600160a01b0390811694602093879385816024818b5afa899181611e39575b50611dc5575b50506001149586611db6575b5085611d1d575b505050505090565b939450909216301491908215611d3c575b505090503880808080611d15565b60405163e985e9c560e01b81526001600160a01b0391909116600482015230602482015290929091508290829060449082905afa918215611c6857600092611d89575b5050803880611d2e565b611da89250803d10611daf575b611da081836112ff565b810190611ca4565b3880611d7f565b503d611d96565b81965016858416149438611d0e565b60405163020604bf60e21b81526004810192909252975084816024818a5afa60009181611e02575b50611df9575b80611d02565b92506001611df3565b90918682813d8311611e32575b611e1981836112ff565b810103126116655750611e2b90611ac0565b9038611ded565b503d611e0f565b9091508681813d8311611e6d575b611e5181836112ff565b81010312611e6957611e6290611ac0565b9038611cfc565b8980fd5b503d611e47565b9290918015159384611eec575b505082611e8d57505090565b60405163e985e9c560e01b81526001600160a01b039283166004820152306024820152925060209183916044918391165afa908115611c6857600091611ed1575090565b611ee9915060203d8111611daf57611da081836112ff565b90565b604051627eeac760e11b81526001600160a01b0385166004820152602481019190915291935090602081806044810103816001600160a01b0388165afa908115611c6857600091611f43575b501015913880611e81565b906020823d8211611f6c575b81611f5c602093836112ff565b8101031261166557505138611f38565b3d9150611f4f565b90813b611fad575b604051625d185960e41b81526001600160a01b0390921660048301526001600160e01b031916602482015260449150fd5b6040516301ffc9a760e01b81526001600160e01b0319821660048201526020816024816001600160a01b0387165afa60009181611fff575b50611ff1575b50611f7c565b611ffb5782611feb565b5050565b61201891925060203d8111611daf57611da081836112ff565b9038611fe5565b6000546001600160a01b0316330361203357565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b600260015414612088576002600155565b60405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606490fd5b6040516323b872dd60e01b60208083019182526001600160a01b0394851660248401529490931660448201526064808201959095529384529192601f199291906121186084826112ff565b600092839283809351925af1913d15612209573d6001600160401b0381116121f55761214e8560405193601f84011601836112ff565b81528091843d92013e5b816121c5575b50156121675750565b6084906040519062461bcd60e51b82526004820152603160248201527f5472616e7366657248656c7065723a3a7472616e7366657246726f6d3a207472604482015270185b9cd9995c919c9bdb4819985a5b1959607a1b6064820152fd5b805180159250839083156121dd575b5050503861215e565b6121ed9350820181019101611ca4565b3882816121d4565b634e487b7160e01b83526041600452602483fd5b5050606061215856fea26469706673582212206d26ad291ad76856afec60407722dbbe7ff2577be95370fe3ca3f8f9a1e9456e64736f6c63430008130033',
      signer
    )
  }
}

export const ORDERBOOK_VERIFICATION: Omit<EtherscanVerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'contracts/Orderbook.sol:Orderbook',
  version: 'v0.8.19+commit.7dd6d404',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'contracts/Orderbook.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\r\npragma solidity 0.8.19;\r\n\r\nimport {IOrderbook} from "./interfaces/IOrderbook.sol";\r\nimport {IERC721} from "./interfaces/IERC721.sol";\r\nimport {IERC2981} from "./interfaces/IERC2981.sol";\r\nimport {IERC20} from "@0xsequence/erc-1155/contracts/interfaces/IERC20.sol";\r\nimport {IERC165} from "@0xsequence/erc-1155/contracts/interfaces/IERC165.sol";\r\nimport {IERC1155} from "@0xsequence/erc-1155/contracts/interfaces/IERC1155.sol";\r\nimport {TransferHelper} from "@uniswap/lib/contracts/libraries/TransferHelper.sol";\r\nimport {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";\r\nimport {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";\r\n\r\ncontract Orderbook is IOrderbook, Ownable, ReentrancyGuard {\r\n  mapping(uint256 => Order) internal _orders;\r\n  mapping(address => CustomRoyalty) public customRoyalties;\r\n\r\n  uint256 private _nextOrderId;\r\n\r\n  constructor(address _owner) {\r\n    _transferOwnership(_owner);\r\n  }\r\n\r\n  /**\r\n   * Creates an order.\r\n   * @param request The requested order\'s details.\r\n   * @return orderId The ID of the order.\r\n   */\r\n  function createOrder(OrderRequest calldata request) external nonReentrant returns (uint256 orderId) {\r\n    return _createOrder(request);\r\n  }\r\n\r\n  /**\r\n   * Creates orders.\r\n   * @param requests The requested orders\' details.\r\n   * @return orderIds The IDs of the orders.\r\n   */\r\n  function createOrderBatch(OrderRequest[] calldata requests) external nonReentrant returns (uint256[] memory orderIds) {\r\n    uint256 len = requests.length;\r\n    orderIds = new uint256[](len);\r\n    for (uint256 i; i < len; i++) {\r\n      orderIds[i] = _createOrder(requests[i]);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Performs creation of an order.\r\n   * @param request The requested order\'s details.\r\n   * @return orderId The ID of the order.\r\n   */\r\n  function _createOrder(OrderRequest calldata request) internal returns (uint256 orderId) {\r\n    uint256 quantity = request.quantity;\r\n    address tokenContract = request.tokenContract;\r\n\r\n    if (request.pricePerToken == 0) {\r\n      revert InvalidPrice();\r\n    }\r\n    // solhint-disable-next-line not-rely-on-time\r\n    if (request.expiry <= block.timestamp) {\r\n      revert InvalidExpiry();\r\n    }\r\n\r\n    // Check interfaces\r\n    _requireInterface(tokenContract, request.isERC1155 ? type(IERC1155).interfaceId : type(IERC721).interfaceId);\r\n\r\n    if (request.isListing) {\r\n      // Check valid token for listing\r\n      if (!_hasApprovedTokens(request.isERC1155, tokenContract, request.tokenId, quantity, msg.sender)) {\r\n        revert InvalidTokenApproval(tokenContract, request.tokenId, quantity, msg.sender);\r\n      }\r\n    } else {\r\n      // Check approved currency for offer inc royalty\r\n      uint256 total = quantity * request.pricePerToken;\r\n      (, uint256 royaltyAmount) = getRoyaltyInfo(tokenContract, request.tokenId, total);\r\n      total += royaltyAmount;\r\n      getRoyaltyInfo(tokenContract, request.tokenId, total);\r\n      if (!_hasApprovedCurrency(request.currency, total, msg.sender)) {\r\n        revert InvalidCurrencyApproval(request.currency, total, msg.sender);\r\n      }\r\n      // Check quantity. Covered by _hasApprovedTokens for listings\r\n      if ((request.isERC1155 && quantity == 0) || (!request.isERC1155 && quantity != 1)) {\r\n        revert InvalidQuantity();\r\n      }\r\n    }\r\n\r\n    Order memory order = Order({\r\n      isListing: request.isListing,\r\n      isERC1155: request.isERC1155,\r\n      creator: msg.sender,\r\n      tokenContract: tokenContract,\r\n      tokenId: request.tokenId,\r\n      quantity: quantity,\r\n      currency: request.currency,\r\n      pricePerToken: request.pricePerToken,\r\n      expiry: request.expiry\r\n    });\r\n\r\n    orderId = uint256(_nextOrderId);\r\n    _nextOrderId++;\r\n    _orders[orderId] = order;\r\n\r\n    emit OrderCreated(\r\n      orderId,\r\n      msg.sender,\r\n      tokenContract,\r\n      request.tokenId,\r\n      request.isListing,\r\n      quantity,\r\n      request.currency,\r\n      request.pricePerToken,\r\n      request.expiry\r\n      );\r\n\r\n    return orderId;\r\n  }\r\n\r\n  /**\r\n   * Accepts an order.\r\n   * @param orderId The ID of the order.\r\n   * @param quantity The quantity of tokens to accept.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   */\r\n  function acceptOrder(\r\n    uint256 orderId,\r\n    uint256 quantity,\r\n    uint256[] calldata additionalFees,\r\n    address[] calldata additionalFeeReceivers\r\n  )\r\n    external\r\n    nonReentrant\r\n  {\r\n    _acceptOrder(orderId, quantity, additionalFees, additionalFeeReceivers);\r\n  }\r\n\r\n  /**\r\n   * Accepts orders.\r\n   * @param orderIds The IDs of the orders.\r\n   * @param quantities The quantities of tokens to accept.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   * @dev Additional fees are applied to each order.\r\n   */\r\n  function acceptOrderBatch(\r\n    uint256[] calldata orderIds,\r\n    uint256[] calldata quantities,\r\n    uint256[] calldata additionalFees,\r\n    address[] calldata additionalFeeReceivers\r\n  )\r\n    external\r\n    nonReentrant\r\n  {\r\n    uint256 len = orderIds.length;\r\n    if (len != quantities.length) {\r\n      revert InvalidBatchRequest();\r\n    }\r\n\r\n    for (uint256 i; i < len; i++) {\r\n      _acceptOrder(orderIds[i], quantities[i], additionalFees, additionalFeeReceivers);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Performs acceptance of an order.\r\n   * @param orderId The ID of the order.\r\n   * @param quantity The quantity of tokens to accept.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   */\r\n  function _acceptOrder(\r\n    uint256 orderId,\r\n    uint256 quantity,\r\n    uint256[] calldata additionalFees,\r\n    address[] calldata additionalFeeReceivers\r\n  )\r\n    internal\r\n  {\r\n    Order memory order = _orders[orderId];\r\n    if (order.creator == address(0)) {\r\n      // Order cancelled, completed or never existed\r\n      revert InvalidOrderId(orderId);\r\n    }\r\n    if (quantity == 0 || quantity > order.quantity) {\r\n      revert InvalidQuantity();\r\n    }\r\n    if (_isExpired(order)) {\r\n      revert InvalidExpiry();\r\n    }\r\n    if (additionalFees.length != additionalFeeReceivers.length) {\r\n      revert InvalidAdditionalFees();\r\n    }\r\n\r\n    // Update order state\r\n    if (order.quantity == quantity) {\r\n      // Refund some gas\r\n      delete _orders[orderId];\r\n    } else {\r\n      _orders[orderId].quantity -= quantity;\r\n    }\r\n    address tokenContract = order.tokenContract;\r\n\r\n    // Calculate payables\r\n    uint256 remainingCost = order.pricePerToken * quantity;\r\n    (address royaltyRecipient, uint256 royaltyAmount) = getRoyaltyInfo(tokenContract, order.tokenId, remainingCost);\r\n\r\n    address currencyReceiver = order.isListing ? order.creator : msg.sender;\r\n    address tokenReceiver = order.isListing ? msg.sender : order.creator;\r\n\r\n    if (royaltyAmount > 0) {\r\n      if (order.isListing) {\r\n        // Royalties are paid by the maker. This reduces the cost for listings.\r\n        // Underflow prevents fees > cost\r\n        remainingCost -= royaltyAmount;\r\n      } else if (royaltyAmount > remainingCost) {\r\n        // Royalty cannot exceed cost\r\n        revert InvalidRoyalty();\r\n      }\r\n      // Transfer royalties\r\n      TransferHelper.safeTransferFrom(order.currency, tokenReceiver, royaltyRecipient, royaltyAmount);\r\n    }\r\n\r\n    // Transfer additional fees\r\n    uint256 totalFees;\r\n    for (uint256 i; i < additionalFees.length; i++) {\r\n      uint256 fee = additionalFees[i];\r\n      address feeReceiver = additionalFeeReceivers[i];\r\n      if (feeReceiver == address(0) || fee == 0) {\r\n        revert InvalidAdditionalFees();\r\n      }\r\n      totalFees += fee;\r\n      TransferHelper.safeTransferFrom(order.currency, tokenReceiver, feeReceiver, fee);\r\n    }\r\n    if (!order.isListing) {\r\n      // Fees are paid by the taker. This reduces the cost for offers.\r\n      // Underflow prevents fees > cost\r\n      remainingCost -= totalFees;\r\n    } else if (totalFees > remainingCost) {\r\n      // Fees cannot exceed cost - royalties\r\n      revert InvalidAdditionalFees();\r\n    }\r\n\r\n    // Transfer currency\r\n    TransferHelper.safeTransferFrom(order.currency, tokenReceiver, currencyReceiver, remainingCost);\r\n\r\n    // Transfer token\r\n    if (order.isERC1155) {\r\n      IERC1155(tokenContract).safeTransferFrom(currencyReceiver, tokenReceiver, order.tokenId, quantity, "");\r\n    } else {\r\n      IERC721(tokenContract).safeTransferFrom(currencyReceiver, tokenReceiver, order.tokenId);\r\n    }\r\n\r\n    emit OrderAccepted(orderId, msg.sender, tokenContract, quantity, _orders[orderId].quantity);\r\n  }\r\n\r\n  /**\r\n   * Cancels an order.\r\n   * @param orderId The ID of the order.\r\n   */\r\n  function cancelOrder(uint256 orderId) external nonReentrant {\r\n    _cancelOrder(orderId);\r\n  }\r\n\r\n  /**\r\n   * Cancels orders.\r\n   * @param orderIds The IDs of the orders.\r\n   */\r\n  function cancelOrderBatch(uint256[] calldata orderIds) external nonReentrant {\r\n    for (uint256 i; i < orderIds.length; i++) {\r\n      _cancelOrder(orderIds[i]);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Performs cancellation of an order.\r\n   * @param orderId The ID of the order.\r\n   */\r\n  function _cancelOrder(uint256 orderId) internal {\r\n    Order storage order = _orders[orderId];\r\n    if (order.creator != msg.sender) {\r\n      revert InvalidOrderId(orderId);\r\n    }\r\n    address tokenContract = order.tokenContract;\r\n\r\n    // Refund some gas\r\n    delete _orders[orderId];\r\n\r\n    emit OrderCancelled(orderId, tokenContract);\r\n  }\r\n\r\n  /**\r\n   * Gets an order.\r\n   * @param orderId The ID of the order.\r\n   * @return order The order.\r\n   */\r\n  function getOrder(uint256 orderId) external view returns (Order memory order) {\r\n    return _orders[orderId];\r\n  }\r\n\r\n  /**\r\n   * Gets orders.\r\n   * @param orderIds The IDs of the orders.\r\n   * @return orders The orders.\r\n   */\r\n  function getOrderBatch(uint256[] calldata orderIds) external view returns (Order[] memory orders) {\r\n    uint256 len = orderIds.length;\r\n    orders = new Order[](len);\r\n    for (uint256 i; i < len; i++) {\r\n      orders[i] = _orders[orderIds[i]];\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Checks if an order is valid.\r\n   * @param orderId The ID of the order.\r\n   * @param quantity The amount of tokens to exchange. 0 is assumed to be the order\'s available quantity.\r\n   * @return valid The validity of the order.\r\n   * @return order The order.\r\n   * @notice An order is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\r\n   */\r\n  function isOrderValid(uint256 orderId, uint256 quantity) public view returns (bool valid, Order memory order) {\r\n    order = _orders[orderId];\r\n    if (quantity == 0) {\r\n      // 0 is assumed to be max quantity\r\n      quantity = order.quantity;\r\n    }\r\n    valid = order.creator != address(0) && !_isExpired(order) && quantity <= order.quantity;\r\n    if (valid) {\r\n      if (order.isListing) {\r\n        valid = _hasApprovedTokens(order.isERC1155, order.tokenContract, order.tokenId, quantity, order.creator);\r\n      } else {\r\n        // Add royalty\r\n        uint256 cost = order.pricePerToken * quantity;\r\n        (, uint256 royaltyAmount) = getRoyaltyInfo(order.tokenContract, order.tokenId, cost);\r\n        valid = _hasApprovedCurrency(order.currency, cost + royaltyAmount, order.creator);\r\n      }\r\n    }\r\n    return (valid, order);\r\n  }\r\n\r\n  /**\r\n   * Checks if orders are valid.\r\n   * @param orderIds The IDs of the orders.\r\n   * @param quantities The amount of tokens to exchange per order. 0 is assumed to be the order\'s available quantity.\r\n   * @return valid The validities of the orders.\r\n   * @return orders The orders.\r\n   * @notice An order is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\r\n   */\r\n  function isOrderValidBatch(uint256[] calldata orderIds, uint256[] calldata quantities)\r\n    external\r\n    view\r\n    returns (bool[] memory valid, Order[] memory orders)\r\n  {\r\n    uint256 len = orderIds.length;\r\n    if (len != quantities.length) {\r\n      revert InvalidBatchRequest();\r\n    }\r\n    valid = new bool[](len);\r\n    orders = new Order[](len);\r\n    for (uint256 i; i < len; i++) {\r\n      (valid[i], orders[i]) = isOrderValid(orderIds[i], quantities[i]);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Checks if a order has expired.\r\n   * @param order The order to check.\r\n   * @return isExpired True if the order has expired.\r\n   */\r\n  function _isExpired(Order memory order) internal view returns (bool isExpired) {\r\n    // solhint-disable-next-line not-rely-on-time\r\n    return order.expiry <= block.timestamp;\r\n  }\r\n\r\n  /**\r\n   * Will set the royalties fees and recipient for contracts that don\'t support ERC-2981.\r\n   * @param tokenContract The contract the custom royalties apply to.\r\n   * @param recipient Address to send the royalties to.\r\n   * @param fee Fee percentage with a 10000 basis (e.g. 0.3% is 30 and 1% is 100 and 100% is 10000).\r\n   * @dev Can only be called by the owner.\r\n   * @notice This can be called even when the contract supports ERC-2891, but will be ignored if it does.\r\n   */\r\n  function setRoyaltyInfo(address tokenContract, address recipient, uint96 fee) public onlyOwner {\r\n    if (fee > 10000) {\r\n      revert InvalidRoyalty();\r\n    }\r\n    customRoyalties[tokenContract] = CustomRoyalty(recipient, fee);\r\n    emit CustomRoyaltyChanged(tokenContract, recipient, fee);\r\n  }\r\n\r\n  /**\r\n   * Returns the royalty details for the given token and cost.\r\n   * @param tokenContract Address of the token being traded.\r\n   * @param tokenId The ID of the token.\r\n   * @param cost Amount of currency sent/received for the trade.\r\n   * @return recipient Address to send royalties to.\r\n   * @return royalty Amount of currency to be paid as royalties.\r\n   */\r\n  function getRoyaltyInfo(address tokenContract, uint256 tokenId, uint256 cost)\r\n    public\r\n    view\r\n    returns (address recipient, uint256 royalty)\r\n  {\r\n    try IERC2981(address(tokenContract)).royaltyInfo(tokenId, cost) returns (address _r, uint256 _c) {\r\n      return (_r, _c);\r\n    } catch {} // solhint-disable-line no-empty-blocks\r\n\r\n    // Fail over to custom royalty\r\n    CustomRoyalty memory customRoyalty = customRoyalties[tokenContract];\r\n    return (customRoyalty.recipient, customRoyalty.fee * cost / 10000);\r\n  }\r\n\r\n  /**\r\n   * Checks if the amount of currency is approved for transfer exceeds the given amount.\r\n   * @param currency The address of the currency.\r\n   * @param amount The amount of currency.\r\n   * @param who The address of the owner of the currency.\r\n   * @return isValid True if the amount of currency is sufficient and approved for transfer.\r\n   */\r\n  function _hasApprovedCurrency(address currency, uint256 amount, address who) internal view returns (bool isValid) {\r\n    return IERC20(currency).balanceOf(who) >= amount && IERC20(currency).allowance(who, address(this)) >= amount;\r\n  }\r\n\r\n  /**\r\n   * Checks if a token contract is ERC1155 or ERC721 and if the token is owned and approved for transfer.\r\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\r\n   * @param tokenContract The address of the token contract.\r\n   * @param tokenId The ID of the token.\r\n   * @param quantity The quantity of tokens to list.\r\n   * @param who The address of the owner of the token.\r\n   * @return isValid True if the token is owned and approved for transfer.\r\n   * @dev Returns false if the token contract is not ERC1155 or ERC721.\r\n   */\r\n  function _hasApprovedTokens(bool isERC1155, address tokenContract, uint256 tokenId, uint256 quantity, address who)\r\n    internal\r\n    view\r\n    returns (bool isValid)\r\n  {\r\n    address orderbook = address(this);\r\n\r\n    if (isERC1155) {\r\n      // ERC1155\r\n      return quantity > 0 && IERC1155(tokenContract).balanceOf(who, tokenId) >= quantity\r\n        && IERC1155(tokenContract).isApprovedForAll(who, orderbook);\r\n    }\r\n\r\n    // ERC721\r\n    address tokenOwner;\r\n    address operator;\r\n\r\n    try IERC721(tokenContract).ownerOf(tokenId) returns (address _tokenOwner) {\r\n      tokenOwner = _tokenOwner;\r\n\r\n      try IERC721(tokenContract).getApproved(tokenId) returns (address _operator) {\r\n        operator = _operator;\r\n      } catch {} // solhint-disable-line no-empty-blocks\r\n    } catch {} // solhint-disable-line no-empty-blocks\r\n\r\n    return quantity == 1 && who == tokenOwner\r\n      && (operator == orderbook || IERC721(tokenContract).isApprovedForAll(who, orderbook));\r\n  }\r\n\r\n  /**\r\n   * Checks if a contract implements an interface.\r\n   * @param contractAddress The address of the contract.\r\n   * @param interfaceId The interface ID.\r\n   * @dev Reverts if the contract does not implement the interface.\r\n   */\r\n  function _requireInterface(address contractAddress, bytes4 interfaceId) internal view {\r\n    if (contractAddress.code.length != 0) {\r\n      try IERC165(contractAddress).supportsInterface(interfaceId) returns (bool supported) {\r\n        if (supported) {\r\n          // Success\r\n          return;\r\n        }\r\n      } catch {}\r\n    }\r\n    // Fail over\r\n    revert UnsupportedContractInterface(contractAddress, interfaceId);\r\n  }\r\n}\r\n'
      },
      'contracts/interfaces/IOrderbook.sol': {
        content:
          "// SPDX-License-Identifier: Apache-2.0\r\npragma solidity 0.8.19;\r\n\r\ninterface IOrderbookStorage {\r\n  /**\r\n   * Order request parameters.\r\n   * @param isListing True if the order is a listing, false if it is an offer.\r\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\r\n   * @param tokenContract The address of the token contract.\r\n   * @param tokenId The ID of the token.\r\n   * @param quantity The quantity of tokens.\r\n   * @param expiry The expiry of the order.\r\n   * @param currency The address of the currency.\r\n   * @param pricePerToken The price per token, including royalty fees.\r\n   */\r\n  struct OrderRequest {\r\n    bool isListing; // True if the order is a listing, false if it is an offer.\r\n    bool isERC1155; // True if the token is an ERC1155 token, false if it is an ERC721 token.\r\n    address tokenContract;\r\n    uint256 tokenId;\r\n    uint256 quantity;\r\n    uint96 expiry;\r\n    address currency;\r\n    uint256 pricePerToken;\r\n  }\r\n\r\n  /**\r\n   * Order parameters.\r\n   * @param creator The address of the order creator.\r\n   * @param isListing True if the order is a listing, false if it is an offer.\r\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\r\n   * @param tokenContract The address of the token contract.\r\n   * @param tokenId The ID of the token.\r\n   * @param quantity The quantity of tokens.\r\n   * @param expiry The expiry of the order.\r\n   * @param currency The address of the currency.\r\n   * @param pricePerToken The price per token, including royalty fees.\r\n   */\r\n  struct Order {\r\n    address creator;\r\n    bool isListing;\r\n    bool isERC1155;\r\n    address tokenContract;\r\n    uint256 tokenId;\r\n    uint256 quantity;\r\n    uint96 expiry;\r\n    address currency;\r\n    uint256 pricePerToken;\r\n  }\r\n\r\n  /**\r\n   * Custom royalty parameters.\r\n   * @param recipient Address to send the fees to.\r\n   * @param fee Fee percentage with a 10000 basis (e.g. 0.3% is 30 and 1% is 100 and 100% is 10000).\r\n   * @dev Used to store custom royalty settings for contracts do not support ERC2981.\r\n   */\r\n  struct CustomRoyalty {\r\n    address recipient;\r\n    uint96 fee;\r\n  }\r\n}\r\n\r\ninterface IOrderbookFunctions is IOrderbookStorage {\r\n  /**\r\n   * Creates an order.\r\n   * @param request The requested order's details.\r\n   * @return orderId The ID of the order.\r\n   * @notice A listing is when the maker is selling tokens for currency.\r\n   * @notice An offer is when the maker is buying tokens with currency.\r\n   */\r\n  function createOrder(OrderRequest calldata request) external returns (uint256 orderId);\r\n\r\n  /**\r\n   * Creates orders.\r\n   * @param requests The requested orders' details.\r\n   * @return orderIds The IDs of the orders.\r\n   */\r\n  function createOrderBatch(OrderRequest[] calldata requests) external returns (uint256[] memory orderIds);\r\n\r\n  /**\r\n   * Accepts an order.\r\n   * @param orderId The ID of the order.\r\n   * @param quantity The quantity of tokens to accept.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   */\r\n  function acceptOrder(\r\n    uint256 orderId,\r\n    uint256 quantity,\r\n    uint256[] calldata additionalFees,\r\n    address[] calldata additionalFeeReceivers\r\n  )\r\n    external;\r\n\r\n  /**\r\n   * Accepts orders.\r\n   * @param orderIds The IDs of the orders.\r\n   * @param quantities The quantities of tokens to accept.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   */\r\n  function acceptOrderBatch(\r\n    uint256[] calldata orderIds,\r\n    uint256[] calldata quantities,\r\n    uint256[] calldata additionalFees,\r\n    address[] calldata additionalFeeReceivers\r\n  )\r\n    external;\r\n\r\n  /**\r\n   * Cancels an order.\r\n   * @param orderId The ID of the order.\r\n   */\r\n  function cancelOrder(uint256 orderId) external;\r\n\r\n  /**\r\n   * Cancels orders.\r\n   * @param orderIds The IDs of the orders.\r\n   */\r\n  function cancelOrderBatch(uint256[] calldata orderIds) external;\r\n\r\n  /**\r\n   * Gets an order.\r\n   * @param orderId The ID of the order.\r\n   * @return order The order.\r\n   */\r\n  function getOrder(uint256 orderId) external view returns (Order memory order);\r\n\r\n  /**\r\n   * Gets orders.\r\n   * @param orderIds The IDs of the orders.\r\n   * @return orders The orders.\r\n   */\r\n  function getOrderBatch(uint256[] calldata orderIds) external view returns (Order[] memory orders);\r\n\r\n  /**\r\n   * Checks if an order is valid.\r\n   * @param orderId The ID of the order.\r\n   * @param quantity The amount of tokens to exchange. 0 is assumed to be the order's available quantity.\r\n   * @return valid The validity of the order.\r\n   * @return order The order.\r\n   * @notice An order is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\r\n   */\r\n  function isOrderValid(uint256 orderId, uint256 quantity) external view returns (bool valid, Order memory order);\r\n\r\n  /**\r\n   * Checks if orders are valid.\r\n   * @param orderIds The IDs of the orders.\r\n   * @param quantities The amount of tokens to exchange per order. 0 is assumed to be the order's available quantity.\r\n   * @return valid The validities of the orders.\r\n   * @return orders The orders.\r\n   * @notice An order is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\r\n   */\r\n  function isOrderValidBatch(uint256[] calldata orderIds, uint256[] calldata quantities)\r\n    external\r\n    view\r\n    returns (bool[] memory valid, Order[] memory orders);\r\n\r\n  /**\r\n   * Returns the royalty details for the given token and cost.\r\n   * @param tokenContract Address of the token being traded.\r\n   * @param tokenId The ID of the token.\r\n   * @param cost Amount of currency sent/received for the trade.\r\n   * @return recipient Address to send royalties to.\r\n   * @return royalty Amount of currency to be paid as royalties.\r\n   */\r\n  function getRoyaltyInfo(address tokenContract, uint256 tokenId, uint256 cost)\r\n    external\r\n    view\r\n    returns (address recipient, uint256 royalty);\r\n}\r\n\r\ninterface IOrderbookSignals {\r\n  //\r\n  // Events\r\n  //\r\n\r\n  /// Emitted when an Order is created.\r\n  event OrderCreated(\r\n    uint256 indexed orderId,\r\n    address indexed creator,\r\n    address indexed tokenContract,\r\n    uint256 tokenId,\r\n    bool isListing,\r\n    uint256 quantity,\r\n    address currency,\r\n    uint256 pricePerToken,\r\n    uint256 expiry\r\n  );\r\n\r\n  /// Emitted when an Order is accepted.\r\n  event OrderAccepted(\r\n    uint256 indexed orderId,\r\n    address indexed buyer,\r\n    address indexed tokenContract,\r\n    uint256 quantity,\r\n    uint256 quantityRemaining\r\n  );\r\n\r\n  /// Emitted when an Order is cancelled.\r\n  event OrderCancelled(uint256 indexed orderId, address indexed tokenContract);\r\n\r\n  /// Emitted when custom royalty settings are changed.\r\n  event CustomRoyaltyChanged(address indexed tokenContract, address recipient, uint96 fee);\r\n\r\n  //\r\n  // Errors\r\n  //\r\n\r\n  /// Thrown when the contract address does not support the required interface.\r\n  error UnsupportedContractInterface(address contractAddress, bytes4 interfaceId);\r\n\r\n  /// Thrown when the token approval is invalid.\r\n  error InvalidTokenApproval(address tokenContract, uint256 tokenId, uint256 quantity, address owner);\r\n\r\n  /// Thrown when the currency approval is invalid.\r\n  error InvalidCurrencyApproval(address currency, uint256 quantity, address owner);\r\n\r\n  /// Thrown when order id is invalid.\r\n  error InvalidOrderId(uint256 orderId);\r\n\r\n  /// Thrown when the parameters of a batch accept request are invalid.\r\n  error InvalidBatchRequest();\r\n\r\n  /// Thrown when quantity is invalid.\r\n  error InvalidQuantity();\r\n\r\n  /// Thrown when price is invalid.\r\n  error InvalidPrice();\r\n\r\n  /// Thrown when royalty is invalid.\r\n  error InvalidRoyalty();\r\n\r\n  /// Thrown when expiry is invalid.\r\n  error InvalidExpiry();\r\n\r\n  /// Thrown when the additional fees are invalid.\r\n  error InvalidAdditionalFees();\r\n}\r\n\r\n// solhint-disable-next-line no-empty-blocks\r\ninterface IOrderbook is IOrderbookFunctions, IOrderbookSignals {}\r\n"
      },
      'contracts/interfaces/IERC721.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\r\npragma solidity 0.8.19;\r\n\r\ninterface IERC721 {\r\n  event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\r\n  event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);\r\n  event ApprovalForAll(address indexed owner, address indexed operator, bool approved);\r\n\r\n  function balanceOf(address _owner) external view returns (uint256 balance);\r\n  function ownerOf(uint256 _tokenId) external view returns (address owner);\r\n  function safeTransferFrom(address _from, address _to, uint256 _tokenId) external;\r\n  function transferFrom(address _from, address _to, uint256 _tokenId) external;\r\n  function approve(address _to, uint256 _tokenId) external;\r\n  function getApproved(uint256 _tokenId) external view returns (address operator);\r\n  function setApprovalForAll(address _operator, bool _approved) external;\r\n  function isApprovedForAll(address _owner, address _operator) external view returns (bool);\r\n  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata _data) external;\r\n}\r\n'
      },
      'contracts/interfaces/IERC2981.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\r\npragma solidity 0.8.19;\r\n\r\nimport {IERC165} from "@0xsequence/erc-1155/contracts/interfaces/IERC165.sol";\r\n\r\n/**\r\n * @dev Interface for the NFT Royalty Standard\r\n */\r\ninterface IERC2981 is IERC165 {\r\n  /**\r\n   * @notice Called with the sale price to determine how much royalty\r\n   * is owed and to whom.\r\n   * @param _tokenId - the NFT asset queried for royalty information\r\n   * @param _salePrice - the sale price of the NFT asset specified by _tokenId\r\n   * @return receiver - address of who should be sent the royalty payment\r\n   * @return royaltyAmount - the royalty payment amount for _salePrice\r\n   */\r\n  function royaltyInfo(uint256 _tokenId, uint256 _salePrice)\r\n    external\r\n    view\r\n    returns (address receiver, uint256 royaltyAmount);\r\n}\r\n'
      },
      'lib/0xsequence/erc-1155/src/contracts/interfaces/IERC20.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @title ERC20 interface\r\n * @dev see https://eips.ethereum.org/EIPS/eip-20\r\n */\r\ninterface IERC20 {\r\n  function transfer(address to, uint256 value) external returns (bool);\r\n  function approve(address spender, uint256 value) external returns (bool);\r\n  function transferFrom(address from, address to, uint256 value) external returns (bool);\r\n  function totalSupply() external view returns (uint256);\r\n  function balanceOf(address who) external view returns (uint256);\r\n  function allowance(address owner, address spender) external view returns (uint256);\r\n  event Transfer(address indexed from, address indexed to, uint256 value);\r\n  event Approval(address indexed owner, address indexed spender, uint256 value);\r\n}\r\n'
      },
      'lib/0xsequence/erc-1155/src/contracts/interfaces/IERC165.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\n\r\n\r\n/**\r\n * @title ERC165\r\n * @dev https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md\r\n */\r\ninterface IERC165 {\r\n\r\n    /**\r\n     * @notice Query if a contract implements an interface\r\n     * @dev Interface identification is specified in ERC-165. This function\r\n     * uses less than 30,000 gas\r\n     * @param _interfaceId The interface identifier, as specified in ERC-165\r\n     */\r\n    function supportsInterface(bytes4 _interfaceId)\r\n    external\r\n    view\r\n    returns (bool);\r\n}\r\n'
      },
      'lib/0xsequence/erc-1155/src/contracts/interfaces/IERC1155.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\nimport \'./IERC165.sol\';\r\n\r\n\r\ninterface IERC1155 is IERC165 {\r\n\r\n  /****************************************|\r\n  |                 Events                 |\r\n  |_______________________________________*/\r\n\r\n  /**\r\n   * @dev Either TransferSingle or TransferBatch MUST emit when tokens are transferred, including zero amount transfers as well as minting or burning\r\n   *   Operator MUST be msg.sender\r\n   *   When minting/creating tokens, the `_from` field MUST be set to `0x0`\r\n   *   When burning/destroying tokens, the `_to` field MUST be set to `0x0`\r\n   *   The total amount transferred from address 0x0 minus the total amount transferred to 0x0 may be used by clients and exchanges to be added to the "circulating supply" for a given token ID\r\n   *   To broadcast the existence of a token ID with no initial balance, the contract SHOULD emit the TransferSingle event from `0x0` to `0x0`, with the token creator as `_operator`, and a `_amount` of 0\r\n   */\r\n  event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _amount);\r\n\r\n  /**\r\n   * @dev Either TransferSingle or TransferBatch MUST emit when tokens are transferred, including zero amount transfers as well as minting or burning\r\n   *   Operator MUST be msg.sender\r\n   *   When minting/creating tokens, the `_from` field MUST be set to `0x0`\r\n   *   When burning/destroying tokens, the `_to` field MUST be set to `0x0`\r\n   *   The total amount transferred from address 0x0 minus the total amount transferred to 0x0 may be used by clients and exchanges to be added to the "circulating supply" for a given token ID\r\n   *   To broadcast the existence of multiple token IDs with no initial balance, this SHOULD emit the TransferBatch event from `0x0` to `0x0`, with the token creator as `_operator`, and a `_amount` of 0\r\n   */\r\n  event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _amounts);\r\n\r\n  /**\r\n   * @dev MUST emit when an approval is updated\r\n   */\r\n  event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);\r\n\r\n\r\n  /****************************************|\r\n  |                Functions               |\r\n  |_______________________________________*/\r\n\r\n  /**\r\n    * @notice Transfers amount of an _id from the _from address to the _to address specified\r\n    * @dev MUST emit TransferSingle event on success\r\n    * Caller must be approved to manage the _from account\'s tokens (see isApprovedForAll)\r\n    * MUST throw if `_to` is the zero address\r\n    * MUST throw if balance of sender for token `_id` is lower than the `_amount` sent\r\n    * MUST throw on any other error\r\n    * When transfer is complete, this function MUST check if `_to` is a smart contract (code size > 0). If so, it MUST call `onERC1155Received` on `_to` and revert if the return amount is not `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`\r\n    * @param _from    Source address\r\n    * @param _to      Target address\r\n    * @param _id      ID of the token type\r\n    * @param _amount  Transfered amount\r\n    * @param _data    Additional data with no specified format, sent in call to `_to`\r\n    */\r\n  function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _amount, bytes calldata _data) external;\r\n\r\n  /**\r\n    * @notice Send multiple types of Tokens from the _from address to the _to address (with safety call)\r\n    * @dev MUST emit TransferBatch event on success\r\n    * Caller must be approved to manage the _from account\'s tokens (see isApprovedForAll)\r\n    * MUST throw if `_to` is the zero address\r\n    * MUST throw if length of `_ids` is not the same as length of `_amounts`\r\n    * MUST throw if any of the balance of sender for token `_ids` is lower than the respective `_amounts` sent\r\n    * MUST throw on any other error\r\n    * When transfer is complete, this function MUST check if `_to` is a smart contract (code size > 0). If so, it MUST call `onERC1155BatchReceived` on `_to` and revert if the return amount is not `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`\r\n    * Transfers and events MUST occur in the array order they were submitted (_ids[0] before _ids[1], etc)\r\n    * @param _from     Source addresses\r\n    * @param _to       Target addresses\r\n    * @param _ids      IDs of each token type\r\n    * @param _amounts  Transfer amounts per token type\r\n    * @param _data     Additional data with no specified format, sent in call to `_to`\r\n  */\r\n  function safeBatchTransferFrom(address _from, address _to, uint256[] calldata _ids, uint256[] calldata _amounts, bytes calldata _data) external;\r\n\r\n  /**\r\n   * @notice Get the balance of an account\'s Tokens\r\n   * @param _owner  The address of the token holder\r\n   * @param _id     ID of the Token\r\n   * @return        The _owner\'s balance of the Token type requested\r\n   */\r\n  function balanceOf(address _owner, uint256 _id) external view returns (uint256);\r\n\r\n  /**\r\n   * @notice Get the balance of multiple account/token pairs\r\n   * @param _owners The addresses of the token holders\r\n   * @param _ids    ID of the Tokens\r\n   * @return        The _owner\'s balance of the Token types requested (i.e. balance for each (owner, id) pair)\r\n   */\r\n  function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory);\r\n\r\n  /**\r\n   * @notice Enable or disable approval for a third party ("operator") to manage all of caller\'s tokens\r\n   * @dev MUST emit the ApprovalForAll event on success\r\n   * @param _operator  Address to add to the set of authorized operators\r\n   * @param _approved  True if the operator is approved, false to revoke approval\r\n   */\r\n  function setApprovalForAll(address _operator, bool _approved) external;\r\n\r\n  /**\r\n   * @notice Queries the approval status of an operator for a given owner\r\n   * @param _owner     The owner of the Tokens\r\n   * @param _operator  Address of authorized operator\r\n   * @return isOperator True if the operator is approved, false if not\r\n   */\r\n  function isApprovedForAll(address _owner, address _operator) external view returns (bool isOperator);\r\n}\r\n'
      },
      'lib/uniswap-lib/contracts/libraries/TransferHelper.sol': {
        content:
          "// SPDX-License-Identifier: GPL-3.0-or-later\r\n\r\npragma solidity >=0.6.0;\r\n\r\n// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false\r\nlibrary TransferHelper {\r\n    function safeApprove(\r\n        address token,\r\n        address to,\r\n        uint256 value\r\n    ) internal {\r\n        // bytes4(keccak256(bytes('approve(address,uint256)')));\r\n        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));\r\n        require(\r\n            success && (data.length == 0 || abi.decode(data, (bool))),\r\n            'TransferHelper::safeApprove: approve failed'\r\n        );\r\n    }\r\n\r\n    function safeTransfer(\r\n        address token,\r\n        address to,\r\n        uint256 value\r\n    ) internal {\r\n        // bytes4(keccak256(bytes('transfer(address,uint256)')));\r\n        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));\r\n        require(\r\n            success && (data.length == 0 || abi.decode(data, (bool))),\r\n            'TransferHelper::safeTransfer: transfer failed'\r\n        );\r\n    }\r\n\r\n    function safeTransferFrom(\r\n        address token,\r\n        address from,\r\n        address to,\r\n        uint256 value\r\n    ) internal {\r\n        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));\r\n        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));\r\n        require(\r\n            success && (data.length == 0 || abi.decode(data, (bool))),\r\n            'TransferHelper::transferFrom: transferFrom failed'\r\n        );\r\n    }\r\n\r\n    function safeTransferETH(address to, uint256 value) internal {\r\n        (bool success, ) = to.call{value: value}(new bytes(0));\r\n        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');\r\n    }\r\n}\r\n"
      },
      'lib/openzeppelin/contracts/access/Ownable.sol': {
        content:
          '// SPDX-License-Identifier: MIT\r\n// OpenZeppelin Contracts (last updated v4.9.0) (access/Ownable.sol)\r\n\r\npragma solidity ^0.8.0;\r\n\r\nimport "../utils/Context.sol";\r\n\r\n/**\r\n * @dev Contract module which provides a basic access control mechanism, where\r\n * there is an account (an owner) that can be granted exclusive access to\r\n * specific functions.\r\n *\r\n * By default, the owner account will be the one that deploys the contract. This\r\n * can later be changed with {transferOwnership}.\r\n *\r\n * This module is used through inheritance. It will make available the modifier\r\n * `onlyOwner`, which can be applied to your functions to restrict their use to\r\n * the owner.\r\n */\r\nabstract contract Ownable is Context {\r\n    address private _owner;\r\n\r\n    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);\r\n\r\n    /**\r\n     * @dev Initializes the contract setting the deployer as the initial owner.\r\n     */\r\n    constructor() {\r\n        _transferOwnership(_msgSender());\r\n    }\r\n\r\n    /**\r\n     * @dev Throws if called by any account other than the owner.\r\n     */\r\n    modifier onlyOwner() {\r\n        _checkOwner();\r\n        _;\r\n    }\r\n\r\n    /**\r\n     * @dev Returns the address of the current owner.\r\n     */\r\n    function owner() public view virtual returns (address) {\r\n        return _owner;\r\n    }\r\n\r\n    /**\r\n     * @dev Throws if the sender is not the owner.\r\n     */\r\n    function _checkOwner() internal view virtual {\r\n        require(owner() == _msgSender(), "Ownable: caller is not the owner");\r\n    }\r\n\r\n    /**\r\n     * @dev Leaves the contract without owner. It will not be possible to call\r\n     * `onlyOwner` functions. Can only be called by the current owner.\r\n     *\r\n     * NOTE: Renouncing ownership will leave the contract without an owner,\r\n     * thereby disabling any functionality that is only available to the owner.\r\n     */\r\n    function renounceOwnership() public virtual onlyOwner {\r\n        _transferOwnership(address(0));\r\n    }\r\n\r\n    /**\r\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\r\n     * Can only be called by the current owner.\r\n     */\r\n    function transferOwnership(address newOwner) public virtual onlyOwner {\r\n        require(newOwner != address(0), "Ownable: new owner is the zero address");\r\n        _transferOwnership(newOwner);\r\n    }\r\n\r\n    /**\r\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\r\n     * Internal function without access restriction.\r\n     */\r\n    function _transferOwnership(address newOwner) internal virtual {\r\n        address oldOwner = _owner;\r\n        _owner = newOwner;\r\n        emit OwnershipTransferred(oldOwner, newOwner);\r\n    }\r\n}\r\n'
      },
      'lib/openzeppelin/contracts/security/ReentrancyGuard.sol': {
        content:
          '// SPDX-License-Identifier: MIT\r\n// OpenZeppelin Contracts (last updated v4.9.0) (security/ReentrancyGuard.sol)\r\n\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev Contract module that helps prevent reentrant calls to a function.\r\n *\r\n * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier\r\n * available, which can be applied to functions to make sure there are no nested\r\n * (reentrant) calls to them.\r\n *\r\n * Note that because there is a single `nonReentrant` guard, functions marked as\r\n * `nonReentrant` may not call one another. This can be worked around by making\r\n * those functions `private`, and then adding `external` `nonReentrant` entry\r\n * points to them.\r\n *\r\n * TIP: If you would like to learn more about reentrancy and alternative ways\r\n * to protect against it, check out our blog post\r\n * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].\r\n */\r\nabstract contract ReentrancyGuard {\r\n    // Booleans are more expensive than uint256 or any type that takes up a full\r\n    // word because each write operation emits an extra SLOAD to first read the\r\n    // slot\'s contents, replace the bits taken up by the boolean, and then write\r\n    // back. This is the compiler\'s defense against contract upgrades and\r\n    // pointer aliasing, and it cannot be disabled.\r\n\r\n    // The values being non-zero value makes deployment a bit more expensive,\r\n    // but in exchange the refund on every call to nonReentrant will be lower in\r\n    // amount. Since refunds are capped to a percentage of the total\r\n    // transaction\'s gas, it is best to keep them low in cases like this one, to\r\n    // increase the likelihood of the full refund coming into effect.\r\n    uint256 private constant _NOT_ENTERED = 1;\r\n    uint256 private constant _ENTERED = 2;\r\n\r\n    uint256 private _status;\r\n\r\n    constructor() {\r\n        _status = _NOT_ENTERED;\r\n    }\r\n\r\n    /**\r\n     * @dev Prevents a contract from calling itself, directly or indirectly.\r\n     * Calling a `nonReentrant` function from another `nonReentrant`\r\n     * function is not supported. It is possible to prevent this from happening\r\n     * by making the `nonReentrant` function external, and making it call a\r\n     * `private` function that does the actual work.\r\n     */\r\n    modifier nonReentrant() {\r\n        _nonReentrantBefore();\r\n        _;\r\n        _nonReentrantAfter();\r\n    }\r\n\r\n    function _nonReentrantBefore() private {\r\n        // On the first call to nonReentrant, _status will be _NOT_ENTERED\r\n        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");\r\n\r\n        // Any calls to nonReentrant after this point will fail\r\n        _status = _ENTERED;\r\n    }\r\n\r\n    function _nonReentrantAfter() private {\r\n        // By storing the original value once again, a refund is triggered (see\r\n        // https://eips.ethereum.org/EIPS/eip-2200)\r\n        _status = _NOT_ENTERED;\r\n    }\r\n\r\n    /**\r\n     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a\r\n     * `nonReentrant` function in the call stack.\r\n     */\r\n    function _reentrancyGuardEntered() internal view returns (bool) {\r\n        return _status == _ENTERED;\r\n    }\r\n}\r\n'
      },
      'lib/openzeppelin/contracts/utils/Context.sol': {
        content:
          '// SPDX-License-Identifier: MIT\r\n// OpenZeppelin Contracts (last updated v4.9.4) (utils/Context.sol)\r\n\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev Provides information about the current execution context, including the\r\n * sender of the transaction and its data. While these are generally available\r\n * via msg.sender and msg.data, they should not be accessed in such a direct\r\n * manner, since when dealing with meta-transactions the account sending and\r\n * paying for execution may not be the actual sender (as far as an application\r\n * is concerned).\r\n *\r\n * This contract is only required for intermediate, library-like contracts.\r\n */\r\nabstract contract Context {\r\n    function _msgSender() internal view virtual returns (address) {\r\n        return msg.sender;\r\n    }\r\n\r\n    function _msgData() internal view virtual returns (bytes calldata) {\r\n        return msg.data;\r\n    }\r\n\r\n    function _contextSuffixLength() internal view virtual returns (uint256) {\r\n        return 0;\r\n    }\r\n}\r\n'
      }
    },
    settings: {
      remappings: [
        'ds-test/=lib/forge-std/lib/ds-test/src/',
        'forge-std/=lib/forge-std/src/',
        '@0xsequence/erc20-meta-token/=lib/0xsequence/erc20-meta-token/src/',
        '@0xsequence/erc-1155/=lib/0xsequence/erc-1155/src/',
        '@openzeppelin/=lib/openzeppelin/',
        '@uniswap/lib/=lib/uniswap-lib/',
        '0xsequence/=lib/0xsequence/',
        'openzeppelin/=lib/openzeppelin/',
        'uniswap-lib/=lib/uniswap-lib/contracts/'
      ],
      optimizer: {
        enabled: true,
        runs: 200
      },
      metadata: {
        bytecodeHash: 'ipfs',
        appendCBOR: true
      },
      outputSelection: {
        '*': {
          '*': ['evm.bytecode', 'evm.deployedBytecode', 'devdoc', 'userdoc', 'metadata', 'abi']
        }
      },
      evmVersion: 'paris',
      viaIR: true,
      libraries: {}
    }
  }
}
