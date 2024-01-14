import type { EtherscanVerificationRequest } from '@0xsequence/solidity-deployer'
import { ContractFactory, ethers } from 'ethers'

// https://github.com/0xsequence/marketplace-contracts/blob/a057d18653f8c99928220c31db54fa75c386bf68/contracts/SequenceMarket.sol

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
    inputs: [],
    name: 'InvalidCurrency',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      }
    ],
    name: 'InvalidRequestId',
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
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
        internalType: 'address',
        name: 'receiver',
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
    name: 'RequestAccepted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenContract',
        type: 'address'
      }
    ],
    name: 'RequestCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
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
    name: 'RequestCreated',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
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
    name: 'acceptRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'requestIds',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: 'quantities',
        type: 'uint256[]'
      },
      {
        internalType: 'address[]',
        name: 'receivers',
        type: 'address[]'
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
    name: 'acceptRequestBatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      }
    ],
    name: 'cancelRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'requestIds',
        type: 'uint256[]'
      }
    ],
    name: 'cancelRequestBatch',
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
        internalType: 'struct ISequenceMarketStorage.RequestParams',
        name: 'request',
        type: 'tuple'
      }
    ],
    name: 'createRequest',
    outputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
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
        internalType: 'struct ISequenceMarketStorage.RequestParams[]',
        name: 'requests',
        type: 'tuple[]'
      }
    ],
    name: 'createRequestBatch',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'requestIds',
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
        name: 'requestId',
        type: 'uint256'
      }
    ],
    name: 'getRequest',
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
        internalType: 'struct ISequenceMarketStorage.Request',
        name: 'request',
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
        name: 'requestIds',
        type: 'uint256[]'
      }
    ],
    name: 'getRequestBatch',
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
        internalType: 'struct ISequenceMarketStorage.Request[]',
        name: 'requests',
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
        name: 'requestId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256'
      }
    ],
    name: 'isRequestValid',
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
        internalType: 'struct ISequenceMarketStorage.Request',
        name: 'request',
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
        name: 'requestIds',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: 'quantities',
        type: 'uint256[]'
      }
    ],
    name: 'isRequestValidBatch',
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
        internalType: 'struct ISequenceMarketStorage.Request[]',
        name: 'requests',
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

export class SequenceMarket extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      abi,
      '0x6080346200007e57601f6200237f38819003918201601f19168301916001600160401b0383118484101762000083578084926020946040528339810103126200007e57516001600160a01b03811681036200007e576200006e90620000643362000099565b6001805562000099565b60405161229e9081620000e18239f35b600080fd5b634e487b7160e01b600052604160045260246000fd5b600080546001600160a01b039283166001600160a01b03198216811783559216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a356fe6080604052600436101561001257600080fd5b60003560e01c80630bc9b045146110fd57806324dc6bd0146110c35780633015394c1461109f57806336de974214611059578063386c96e014611009578063449768ad14610ed8578063715018a614610e7f5780638da5cb5b14610e56578063956463e514610d3d578063a93c531714610c12578063b056d4ae146106e4578063c58343ef1461062d578063dd0de6ec1461027f578063e6bd720e14610200578063f1f5176c146101955763f2fde38b146100cc57600080fd5b34610190576020366003190112610190576100e56111f8565b6100ed612075565b6001600160a01b0390811690811561013c57600054826001600160601b0360a01b821617600055167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a3005b60405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608490fd5b600080fd5b34610190576020366003190112610190576004356001600160401b038111610190576101c590369060040161127d565b906101ce6120cd565b60005b8281106101de5760018055005b806101f66101f06101fb93868661142b565b3561186b565b611387565b6101d1565b346101905760a0366003190112610190576044356001600160a01b0381168103610190576001600160401b03906064358281116101905761024590369060040161127d565b6084929192359384116101905761026361027994369060040161127d565b93909261026e6120cd565b602435600435611448565b60018055005b3461019057610100366003190112610190576102996120cd565b6044356001600160a01b03811681036101905760e4351561061c5760a435906001600160601b038216820361019057426001600160601b038316111561060b5760243580151514158061019057602435156105fb57610300636cdb3d1360e11b5b83611fca565b60c4356001600160a01b03811681141580610190576001600160a01b038216156105e95760043592831515840361019057831561052e5780610190576084356064356103513383838a602435611d12565b156104f75750505b61019057610190576001600160601b036020946040519361037985611320565b338552151586850152602435151560408501526001600160a01b038581166060860152606435608086015260843560a0860152911660c08401521660e082015260e435610100820152600454916103cf83611387565b60045582600052600284526040600020600560018060a01b03845116938254948782015115159560ff60a81b6040840151151560a81b169160ff60a01b8860a01b169169ffffffffffffffffffff60b01b1617171783556001830160018060a01b036060830151166001600160601b0360a01b82541617905560808101519485600285015560a082015160038501556001600160601b0360c0830151169361010060e0840151936001600160601b03198560601b16871760048401550151938491015560405195865287860152608435604086015260018060a01b03166060850152608084015260a083015260018060a01b031690827fb67ee55b059861d68b3b5640ee51bde6a5d9d849c6ecdb610663cbd4290bdfd560c03393a460018055604051908152f35b604051633e2c0d9b60e11b81526001600160a01b038816600482015260248101919091526044810191909152336064820152608490fd5b505061055661054160e43560843561140b565b61054e8160643587611b2a565b91905061141e565b600090610564338285611bf4565b156105ba57506000602435806105b0575b8015610594575b15610359575b60405163524f409b60e01b8152600490fd5b505060006024351560243561057c57506001608435141561057c565b5060843515610575565b604051631184019360e31b81526001600160a01b03841660048201526024810191909152336044820152606490fd5b604051631eb3268560e31b8152600490fd5b6103006380ac58cd60e01b6102fa565b60405162d36c8560e81b8152600490fd5b60405162bfc92160e01b8152600490fd5b3461019057602036600319011261019057610646611909565b506004356000526002602052610120604060002060056040519161066983611320565b805460ff60018060a01b03918281168652818160a01c161515602087015260a81c1615156040850152600182015416606084015260028101546080840152600381015460a084015260048101546001600160601b03811660c085015260601c60e084015201546101008201526106e2604051809261120e565bf35b34610190576020366003190112610190576001600160401b03806004351161019057366023600435011215610190576004356004013511610190573660246004356004013560081b6004350101116101905761073e6120cd565b61074d60043560040135611370565b61075a604051918261134f565b600480350135808252601f199061077090611370565b0136602083013760005b6004356004013581106107cc57506001808055604051906020820160208352835180915260206040840194019060005b8181106107b75784860385f35b825186526020958601959092019183016107aa565b906107e060648360081b60043501016113d6565b916101048160081b6004350101351561061c57426001600160601b0361080f60c48460081b60043501016113ea565b16111561060b5760449261082b848360081b60043501016113fe565b15610c0257610842636cdb3d1360e11b5b82611fca565b6001600160a01b0361085e600435600885901b0160e4016113d6565b16156105e95761087760248360081b60043501016113fe565b15610afb5761088e848360081b60043501016113fe565b93608494858460081b6004350101356108b760a48660081b600435010135928383873393611d12565b15610acb575050610ac69394505b6108ea6108db60248560081b60043501016113fe565b918460081b60043501016113fe565b6001600160601b0361090560e48660081b60043501016113d6565b9161091960c48760081b60043501016113ea565b906040519461092786611320565b33865215156020860152151560408501526001600160a01b03858116606086015260048035600889901b016084810135608088015260a481013560a08801529390921660c08601529290921660e08401526101040135610100830152549161098e83611387565b6004558260005260026020526040600020600560018060a01b0384511693825494602082015115159560ff60a81b6040840151151560a81b169160ff60a01b8860a01b169169ffffffffffffffffffff60b01b1617171783556001830160018060a01b036060830151166001600160601b0360a01b82541617905560808101519485600285015560a082015160038501556001600160601b0360c0830151169361010060e0840151936001600160601b03198560601b168717600484015501519384910155604051958652602086015260a48760081b600435010135604086015260018060a01b03166060850152608084015260a083015260018060a01b031690827fb67ee55b059861d68b3b5640ee51bde6a5d9d849c6ecdb610663cbd4290bdfd560c03393a4610ac082856113ac565b52611387565b61077a565b604051633e2c0d9b60e11b81526001600160a01b0390941660048501526024840152908201523360648201528390fd5b919291600435600883901b0160a481013590610b3690610b209061010401358361140b565b61054e8160848760081b60043501013586611b2a565b610b533382610b4e60e48860081b60043501016113d6565b611bf4565b15610bbf5750610b6b848460081b60043501016113fe565b9081610bb6575b8115610b87575b5061058257610ac6926108c5565b9050610b9b848460081b60043501016113fe565b159081610baa575b5085610b79565b60019150141585610ba3565b80159150610b72565b60649085610bd660e48760081b60043501016113d6565b604051631184019360e31b81526001600160a01b03909116600482015260248101929092523390820152fd5b6108426380ac58cd60e01b61083c565b346101905760a0366003190112610190576001600160401b0360043581811161019057610c4390369060040161127d565b60243583811161019057610c5b90369060040161127d565b93909160443582811161019057610c7690369060040161127d565b93909260643581811161019057610c9190369060040161127d565b92909160843590811161019057610cac90369060040161127d565b959094610cb76120cd565b898114801590610d33575b610d215760005b818110610cd65760018055005b806101f68989898f8f8f610d16610d11898f95938f958f959d8f9e610d1c9f82610d0391610d0a9561142b565b359861142b565b359461142b565b6113d6565b91611448565b610cc9565b6040516355ca07b760e11b8152600490fd5b5087811415610cc2565b3461019057602080600319360112610190576004356001600160401b03811161019057610d6e90369060040161127d565b9190610d798361194e565b9260005b818110610d9f57505050610d9b6040519282849384528301906112ad565b0390f35b80610dae610e5192848661142b565b3560005260028086526005604060002060405192610dcb84611320565b815460018060a01b03808216865260ff60a0928181851c1615158d89015260a81c1615156040870152600184015416916060928387015283015460808601526003830154908501526004820154906001600160601b03821660c08601521c60e08401520154610100820152610e4082886113ac565b52610e4b81876113ac565b50611387565b610d7d565b34610190576000366003190112610190576000546040516001600160a01b039091168152602090f35b3461019057600036600319011261019057610e98612075565b600080546001600160a01b0319811682556001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b34610190576040366003190112610190576001600160401b0360043581811161019057610f0990369060040161127d565b9160243590811161019057610f2290369060040161127d565b8084929403610d2157610f3482611370565b92610f42604051948561134f565b828452610f4e83611370565b9460209283860196601f1901368837610f668561194e565b9460005b818110610fc0575050505050604051926040840190604085525180915260608401949060005b818110610faa57858703848701528580610d9b89886112ad565b8251151587529583019591830191600101610f90565b80610fe5610fd261100493858961142b565b35610fde83878961142b565b359061199e565b610fef838b6113ac565b52610ffa828b6113ac565b9015159052611387565b610f6a565b34610190576020366003190112610190576001600160a01b038061102b6111f8565b166000908152600360209081526040918290205482519381166001600160a01b0316845260a01c9083015290f35b34610190576060366003190112610190576110826110756111f8565b6044359060243590611b2a565b604080516001600160a01b03939093168352602083019190915290f35b34610190576020366003190112610190576110b86120cd565b61027960043561186b565b34610190576040366003190112610190576101406106e26110e860243560043561199e565b6040929192519215158352602083019061120e565b34610190576060366003190112610190576111166111f8565b6001600160a01b03906024358281169081810361019057604435916001600160601b0383168084036101905761114a612075565b61271081116111e657857f60567f9d30ab22ef3cd7557f56b897c677c80a85c8673a4a5c26eb9349ef8c609560405193611183856112ef565b84526020840192835216958660005260036020526040600020925116906001600160601b0360a01b905160a01b161790556111e1604051928392839092916001600160601b03602091604084019560018060a01b0316845216910152565b0390a2005b60405163e0e54ced60e01b8152600490fd5b600435906001600160a01b038216820361019057565b60018060a01b038082511683526020820151151560208401526040820151151560408401528060608301511660608401526080820151608084015260a082015160a08401526001600160601b0360c08301511660c084015260e08201511660e083015261010080910151910152565b9181601f84011215610190578235916001600160401b038311610190576020808501948460051b01011161019057565b90815180825260208080930193019160005b8281106112cd575050505090565b9091929382610120826112e3600194895161120e565b019501939291016112bf565b604081019081106001600160401b0382111761130a57604052565b634e487b7160e01b600052604160045260246000fd5b61012081019081106001600160401b0382111761130a57604052565b6001600160401b03811161130a57604052565b90601f801991011681019081106001600160401b0382111761130a57604052565b6001600160401b03811161130a5760051b60200190565b60001981146113965760010190565b634e487b7160e01b600052601160045260246000fd5b80518210156113c05760209160051b010190565b634e487b7160e01b600052603260045260246000fd5b356001600160a01b03811681036101905790565b356001600160601b03811681036101905790565b3580151581036101905790565b8181029291811591840414171561139657565b9190820180921161139657565b91908110156113c05760051b0190565b9190820391821161139657565b939594909291946000928584526002602052604084206040519061146b82611320565b600581549160ff60018060a01b03841693848652818160a01c161515602087015260a81c161515604085015260018060a01b03600182015416606085015260028101546080850152600381015460a085015260048101546001600160601b03811660c086015260601c60e08501520154610100830152156118525785158015611845575b6105825760c08101516001600160601b031642101561060b578289036117495787938660a0830151146000146118245787865260026020526115526040872060056000918281558260018201558260028201558260038201558260048201550155565b60018060a01b036060830151169961156f8861010085015161140b565b61157f818d608087015190611b2a565b95909360208601511515978860001461180b5786516001600160a01b031699988a983397915b816117c3575b5050508a948b5b81811061175b57505050505060208401511560001461173657936115dc6115f1939260809661143b565b915b60e08501516001600160a01b0316612123565b6040810151156116d057015190873b156116cc57604051637921219560e11b81526001600160a01b0393841660048201529216602483015260448201526064810183905260a0608482015260a48101829052818160c481838a5af180156116c1576116aa575b5060406003915b8481526002602052200154906040519360018060a01b03168452602084015260408301527f146c7c3a67244cf406ca437a82b2bf587bc02b628b63659c73b4295b8b00e76f60603393a4565b6116b4829161133c565b6116be5738611657565b80fd5b6040513d84823e3d90fd5b8380fd5b015191873b156116cc57604051632142170760e11b81526001600160a01b0391821660048201529116602482015260448101919091528181606481838a5af180156116c15791604091600393611727575b5061165e565b6117309061133c565b38611721565b809111611749576080936115f1926115de565b6040516330fd3c3160e01b8152600490fd5b61176681838761142b565b3590611776610d1182868861142b565b976001600160a01b0389161580156117bb575b611749578261179e6117b6946101f69361141e565b60e08d0151909a908c906001600160a01b0316612123565b6115b2565b508215611789565b91959091156117f957906117da816117f19361143b565b955b60e08a015189906001600160a01b0316612123565b3880806115ab565b94908581116111e6576117f1916117dc565b8651339a506001600160a01b0316988e988a97916115a5565b87865260026020526003604087200161183e88825461143b565b9055611552565b5060a081015186116114ef565b6040516364b4f07960e11b815260048101889052602490fd5b600081815260026020526040812080549192916001600160a01b039190821633036118f0579060017fe0d7665e06e7db1fc500d66d4e3898d1d4a5533d7efe54b352fcdaa177c22783920154169282815260026020526118ec6040822060056000918281558260018201558260028201558260038201558260048201550155565b80a3565b6040516364b4f07960e11b815260048101849052602490fd5b6040519061191682611320565b816101006000918281528260208201528260408201528260608201528260808201528260a08201528260c08201528260e08201520152565b9061195882611370565b611965604051918261134f565b8281528092611976601f1991611370565b019060005b82811061198757505050565b602090611992611909565b8282850101520161197b565b9190916119a9611909565b506000526002602052604060002091604051926119c584611320565b80549060018060a01b03928383169384875260ff8460a01c1615159485602089015260ff604089019560a81c161515855281600185015416936060890194855260028101549160808a019283526003820154978860a08c015260056004840154938c60c06001600160601b03871691015260e08d019460601c8552015491826101008d01528615611b0e575b15159889611af7575b89611aec575b5088611a73575b50505050505050509190565b909192939495969750600014611aa957505081611a9c9551151594511690519187511693611d12565b3880808080808080611a67565b611ae796508395849593611ac5611add969495611ad29461140b565b9788925116905190611b2a565b92905051169361141e565b9085511691611bf4565b611a9c565b861115985038611a60565b60c08c01516001600160601b031642109950611a5a565b899650611a51565b51906001600160a01b038216820361019057565b6040805163152a902d60e11b81526004810193909352602483018490526001600160a01b0394939290918516908281604481855afa90816000918293611bb6575b50611bad575050916020611ba992612710946000526003825280600020905190611b94826112ef565b549687169687825260a01c918291015261140b565b0490565b95509392505050565b919092508482813d8311611bed575b611bcf818361134f565b810103126116be57506020611be382611b16565b9101519138611b6b565b503d611bc5565b6040516370a0823160e01b81526001600160a01b03848116600483015291909116926020918281602481885afa8015611cbe578491600091611cca575b5010159384611c42575b5050505090565b604051636eb1769f60e11b81526001600160a01b03929092166004830152306024830152929350918190839060449082905afa908115611cbe57600091611c92575b509050101538808080611c3b565b82813d8311611cb7575b611ca6818361134f565b810103126116be5750518038611c84565b503d611c9c565b6040513d6000823e3d90fd5b91508382813d8311611cf3575b611ce1818361134f565b810103126116be575083905138611c31565b503d611cd7565b90816020910312610190575180151581036101905790565b93919093611eca576040516331a9108f60e11b8152600481018290526000946001600160a01b0390811694602093879385816024818b5afa899181611e8f575b50611e1b575b50506001149586611e0c575b5085611d73575b505050505090565b939450909216301491908215611d92575b505090503880808080611d6b565b60405163e985e9c560e01b81526001600160a01b0391909116600482015230602482015290929091508290829060449082905afa918215611cbe57600092611ddf575b5050803880611d84565b611dfe9250803d10611e05575b611df6818361134f565b810190611cfa565b3880611dd5565b503d611dec565b81965016858416149438611d64565b60405163020604bf60e21b81526004810192909252975084816024818a5afa60009181611e58575b50611e4f575b80611d58565b92506001611e49565b90918682813d8311611e88575b611e6f818361134f565b810103126116be5750611e8190611b16565b9038611e43565b503d611e65565b9091508681813d8311611ec3575b611ea7818361134f565b81010312611ebf57611eb890611b16565b9038611d52565b8980fd5b503d611e9d565b9290918015159384611f42575b505082611ee357505090565b60405163e985e9c560e01b81526001600160a01b039283166004820152306024820152925060209183916044918391165afa908115611cbe57600091611f27575090565b611f3f915060203d8111611e0557611df6818361134f565b90565b604051627eeac760e11b81526001600160a01b0385166004820152602481019190915291935090602081806044810103816001600160a01b0388165afa908115611cbe57600091611f99575b501015913880611ed7565b906020823d8211611fc2575b81611fb26020938361134f565b810103126116be57505138611f8e565b3d9150611fa5565b90813b612003575b604051625d185960e41b81526001600160a01b0390921660048301526001600160e01b031916602482015260449150fd5b6040516301ffc9a760e01b81526001600160e01b0319821660048201526020816024816001600160a01b0387165afa60009181612055575b50612047575b50611fd2565b6120515782612041565b5050565b61206e91925060203d8111611e0557611df6818361134f565b903861203b565b6000546001600160a01b0316330361208957565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b6002600154146120de576002600155565b60405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606490fd5b6040516323b872dd60e01b60208083019182526001600160a01b0394851660248401529490931660448201526064808201959095529384529192601f1992919061216e60848261134f565b600092839283809351925af1913d1561225f573d6001600160401b03811161224b576121a48560405193601f840116018361134f565b81528091843d92013e5b8161221b575b50156121bd5750565b6084906040519062461bcd60e51b82526004820152603160248201527f5472616e7366657248656c7065723a3a7472616e7366657246726f6d3a207472604482015270185b9cd9995c919c9bdb4819985a5b1959607a1b6064820152fd5b80518015925083908315612233575b505050386121b4565b6122439350820181019101611cfa565b38828161222a565b634e487b7160e01b83526041600452602483fd5b505060606121ae56fea2646970667358221220acc87c0574b917708149b5060886b1eac891d4c35b5b62e55b898a4aa8b94a0364736f6c63430008130033',
      signer
    )
  }
}

export const SEQUENCE_MARKET_VERIFICATION: Omit<EtherscanVerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'contracts/SequenceMarket.sol:SequenceMarket',
  version: 'v0.8.19+commit.7dd6d404',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'contracts/SequenceMarket.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\r\npragma solidity 0.8.19;\r\n\r\nimport {ISequenceMarket} from "./interfaces/ISequenceMarket.sol";\r\nimport {IERC721} from "./interfaces/IERC721.sol";\r\nimport {IERC2981} from "./interfaces/IERC2981.sol";\r\nimport {IERC20} from "@0xsequence/erc-1155/contracts/interfaces/IERC20.sol";\r\nimport {IERC165} from "@0xsequence/erc-1155/contracts/interfaces/IERC165.sol";\r\nimport {IERC1155} from "@0xsequence/erc-1155/contracts/interfaces/IERC1155.sol";\r\nimport {TransferHelper} from "@uniswap/lib/contracts/libraries/TransferHelper.sol";\r\nimport {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";\r\nimport {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";\r\n\r\ncontract SequenceMarket is ISequenceMarket, Ownable, ReentrancyGuard {\r\n  mapping(uint256 => Request) internal _requests;\r\n  mapping(address => CustomRoyalty) public customRoyalties;\r\n\r\n  uint256 private _nextRequestId;\r\n\r\n  constructor(address _owner) {\r\n    _transferOwnership(_owner);\r\n  }\r\n\r\n  /**\r\n   * Creates a request.\r\n   * @param request The request\'s details.\r\n   * @return requestId The ID of the request.\r\n   */\r\n  function createRequest(RequestParams calldata request) external nonReentrant returns (uint256 requestId) {\r\n    return _createRequest(request);\r\n  }\r\n\r\n  /**\r\n   * Creates requests.\r\n   * @param requests The requests\' details.\r\n   * @return requestIds The IDs of the requests.\r\n   */\r\n  function createRequestBatch(RequestParams[] calldata requests) external nonReentrant returns (uint256[] memory requestIds) {\r\n    uint256 len = requests.length;\r\n    requestIds = new uint256[](len);\r\n    for (uint256 i; i < len; i++) {\r\n      requestIds[i] = _createRequest(requests[i]);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Performs creation of a request.\r\n   * @param params The request\'s params.\r\n   * @return requestId The ID of the request.\r\n   */\r\n  function _createRequest(RequestParams calldata params) internal returns (uint256 requestId) {\r\n    uint256 quantity = params.quantity;\r\n    address tokenContract = params.tokenContract;\r\n\r\n    if (params.pricePerToken == 0) {\r\n      revert InvalidPrice();\r\n    }\r\n    // solhint-disable-next-line not-rely-on-time\r\n    if (params.expiry <= block.timestamp) {\r\n      revert InvalidExpiry();\r\n    }\r\n\r\n    // Check interfaces\r\n    _requireInterface(tokenContract, params.isERC1155 ? type(IERC1155).interfaceId : type(IERC721).interfaceId);\r\n    if (params.currency == address(0)) {\r\n      revert InvalidCurrency();\r\n    }\r\n\r\n    if (params.isListing) {\r\n      // Check valid token for listing\r\n      if (!_hasApprovedTokens(params.isERC1155, tokenContract, params.tokenId, quantity, msg.sender)) {\r\n        revert InvalidTokenApproval(tokenContract, params.tokenId, quantity, msg.sender);\r\n      }\r\n    } else {\r\n      // Check approved currency for offer inc royalty\r\n      uint256 total = quantity * params.pricePerToken;\r\n      (, uint256 royaltyAmount) = getRoyaltyInfo(tokenContract, params.tokenId, total);\r\n      total += royaltyAmount;\r\n      if (!_hasApprovedCurrency(params.currency, total, msg.sender)) {\r\n        revert InvalidCurrencyApproval(params.currency, total, msg.sender);\r\n      }\r\n      // Check quantity. Covered by _hasApprovedTokens for listings\r\n      if ((params.isERC1155 && quantity == 0) || (!params.isERC1155 && quantity != 1)) {\r\n        revert InvalidQuantity();\r\n      }\r\n    }\r\n\r\n    Request memory request = Request({\r\n      isListing: params.isListing,\r\n      isERC1155: params.isERC1155,\r\n      creator: msg.sender,\r\n      tokenContract: tokenContract,\r\n      tokenId: params.tokenId,\r\n      quantity: quantity,\r\n      currency: params.currency,\r\n      pricePerToken: params.pricePerToken,\r\n      expiry: params.expiry\r\n    });\r\n\r\n    requestId = uint256(_nextRequestId);\r\n    _nextRequestId++;\r\n    _requests[requestId] = request;\r\n\r\n    emit RequestCreated(\r\n      requestId,\r\n      msg.sender,\r\n      tokenContract,\r\n      request.tokenId,\r\n      request.isListing,\r\n      quantity,\r\n      request.currency,\r\n      request.pricePerToken,\r\n      request.expiry\r\n      );\r\n\r\n    return requestId;\r\n  }\r\n\r\n  /**\r\n   * Accepts a request.\r\n   * @param requestId The ID of the request.\r\n   * @param quantity The quantity of tokens to accept.\r\n   * @param receiver The receiver of the accepted tokens.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   */\r\n  function acceptRequest(\r\n    uint256 requestId,\r\n    uint256 quantity,\r\n    address receiver,\r\n    uint256[] calldata additionalFees,\r\n    address[] calldata additionalFeeReceivers\r\n  )\r\n    external\r\n    nonReentrant\r\n  {\r\n    _acceptRequest(requestId, quantity, receiver, additionalFees, additionalFeeReceivers);\r\n  }\r\n\r\n  /**\r\n   * Accepts requests.\r\n   * @param requestIds The IDs of the requests.\r\n   * @param quantities The quantities of tokens to accept.\r\n   * @param receivers The receivers of the accepted tokens.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   * @dev Additional fees are applied to each request.\r\n   */\r\n  function acceptRequestBatch(\r\n    uint256[] calldata requestIds,\r\n    uint256[] calldata quantities,\r\n    address[] calldata receivers,\r\n    uint256[] calldata additionalFees,\r\n    address[] calldata additionalFeeReceivers\r\n  )\r\n    external\r\n    nonReentrant\r\n  {\r\n    uint256 len = requestIds.length;\r\n    if (len != quantities.length || len != receivers.length) {\r\n      revert InvalidBatchRequest();\r\n    }\r\n\r\n    for (uint256 i; i < len; i++) {\r\n      _acceptRequest(requestIds[i], quantities[i], receivers[i], additionalFees, additionalFeeReceivers);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Performs acceptance of a request.\r\n   * @param requestId The ID of the request.\r\n   * @param quantity The quantity of tokens to accept.\r\n   * @param receiver The receiver of the accepted tokens.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   */\r\n  function _acceptRequest(\r\n    uint256 requestId,\r\n    uint256 quantity,\r\n    address receiver,\r\n    uint256[] calldata additionalFees,\r\n    address[] calldata additionalFeeReceivers\r\n  )\r\n    internal\r\n  {\r\n    Request memory request = _requests[requestId];\r\n    if (request.creator == address(0)) {\r\n      // Request cancelled, completed or never existed\r\n      revert InvalidRequestId(requestId);\r\n    }\r\n    if (quantity == 0 || quantity > request.quantity) {\r\n      revert InvalidQuantity();\r\n    }\r\n    if (_isExpired(request)) {\r\n      revert InvalidExpiry();\r\n    }\r\n    if (additionalFees.length != additionalFeeReceivers.length) {\r\n      revert InvalidAdditionalFees();\r\n    }\r\n\r\n    // Update request state\r\n    if (request.quantity == quantity) {\r\n      // Refund some gas\r\n      delete _requests[requestId];\r\n    } else {\r\n      _requests[requestId].quantity -= quantity;\r\n    }\r\n    address tokenContract = request.tokenContract;\r\n\r\n    // Calculate payables\r\n    uint256 remainingCost = request.pricePerToken * quantity;\r\n    (address royaltyRecipient, uint256 royaltyAmount) = getRoyaltyInfo(tokenContract, request.tokenId, remainingCost);\r\n\r\n    address currencySender;\r\n    address currencyReceiver;\r\n    address tokenSender;\r\n    address tokenReceiver;\r\n    if (request.isListing) {\r\n      currencySender = msg.sender;\r\n      currencyReceiver = request.creator;\r\n      tokenSender = request.creator;\r\n      tokenReceiver = receiver;\r\n    } else {\r\n      currencySender = request.creator;\r\n      currencyReceiver = receiver;\r\n      tokenSender = msg.sender;\r\n      tokenReceiver = request.creator;\r\n    }\r\n\r\n    if (royaltyAmount > 0) {\r\n      if (request.isListing) {\r\n        // Royalties are paid by the maker. This reduces the cost for listings.\r\n        // Underflow prevents fees > cost\r\n        remainingCost -= royaltyAmount;\r\n      } else if (royaltyAmount > remainingCost) {\r\n        // Royalty cannot exceed cost\r\n        revert InvalidRoyalty();\r\n      }\r\n      // Transfer royalties\r\n      TransferHelper.safeTransferFrom(request.currency, currencySender, royaltyRecipient, royaltyAmount);\r\n    }\r\n\r\n    // Transfer additional fees\r\n    uint256 totalFees;\r\n    for (uint256 i; i < additionalFees.length; i++) {\r\n      uint256 fee = additionalFees[i];\r\n      address feeReceiver = additionalFeeReceivers[i];\r\n      if (feeReceiver == address(0) || fee == 0) {\r\n        revert InvalidAdditionalFees();\r\n      }\r\n      totalFees += fee;\r\n      TransferHelper.safeTransferFrom(request.currency, currencySender, feeReceiver, fee);\r\n    }\r\n    if (!request.isListing) {\r\n      // Fees are paid by the taker. This reduces the cost for offers.\r\n      // Underflow prevents fees > cost\r\n      remainingCost -= totalFees;\r\n    } else if (totalFees > remainingCost) {\r\n      // Fees cannot exceed cost - royalties\r\n      revert InvalidAdditionalFees();\r\n    }\r\n\r\n    // Transfer currency\r\n    TransferHelper.safeTransferFrom(request.currency, currencySender, currencyReceiver, remainingCost);\r\n\r\n    // Transfer token\r\n    if (request.isERC1155) {\r\n      IERC1155(tokenContract).safeTransferFrom(tokenSender, tokenReceiver, request.tokenId, quantity, "");\r\n    } else {\r\n      IERC721(tokenContract).safeTransferFrom(tokenSender, tokenReceiver, request.tokenId);\r\n    }\r\n\r\n    emit RequestAccepted(requestId, msg.sender, tokenContract, receiver, quantity, _requests[requestId].quantity);\r\n  }\r\n\r\n  /**\r\n   * Cancels a request.\r\n   * @param requestId The ID of the request.\r\n   */\r\n  function cancelRequest(uint256 requestId) external nonReentrant {\r\n    _cancelRequest(requestId);\r\n  }\r\n\r\n  /**\r\n   * Cancels requests.\r\n   * @param requestIds The IDs of the requests.\r\n   */\r\n  function cancelRequestBatch(uint256[] calldata requestIds) external nonReentrant {\r\n    for (uint256 i; i < requestIds.length; i++) {\r\n      _cancelRequest(requestIds[i]);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Performs cancellation of a request.\r\n   * @param requestId The ID of the request.\r\n   */\r\n  function _cancelRequest(uint256 requestId) internal {\r\n    Request storage request = _requests[requestId];\r\n    if (request.creator != msg.sender) {\r\n      revert InvalidRequestId(requestId);\r\n    }\r\n    address tokenContract = request.tokenContract;\r\n\r\n    // Refund some gas\r\n    delete _requests[requestId];\r\n\r\n    emit RequestCancelled(requestId, tokenContract);\r\n  }\r\n\r\n  /**\r\n   * Gets a request.\r\n   * @param requestId The ID of the request.\r\n   * @return request The request.\r\n   */\r\n  function getRequest(uint256 requestId) external view returns (Request memory request) {\r\n    return _requests[requestId];\r\n  }\r\n\r\n  /**\r\n   * Gets requests.\r\n   * @param requestIds The IDs of the requests.\r\n   * @return requests The requests.\r\n   */\r\n  function getRequestBatch(uint256[] calldata requestIds) external view returns (Request[] memory requests) {\r\n    uint256 len = requestIds.length;\r\n    requests = new Request[](len);\r\n    for (uint256 i; i < len; i++) {\r\n      requests[i] = _requests[requestIds[i]];\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Checks if a request is valid.\r\n   * @param requestId The ID of the request.\r\n   * @param quantity The amount of tokens to exchange. 0 is assumed to be the request\'s available quantity.\r\n   * @return valid The validity of the request.\r\n   * @return request The request.\r\n   * @notice A request is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\r\n   */\r\n  function isRequestValid(uint256 requestId, uint256 quantity) public view returns (bool valid, Request memory request) {\r\n    request = _requests[requestId];\r\n    if (quantity == 0) {\r\n      // 0 is assumed to be max quantity\r\n      quantity = request.quantity;\r\n    }\r\n    valid = request.creator != address(0) && !_isExpired(request) && quantity <= request.quantity;\r\n    if (valid) {\r\n      if (request.isListing) {\r\n        valid = _hasApprovedTokens(request.isERC1155, request.tokenContract, request.tokenId, quantity, request.creator);\r\n      } else {\r\n        // Add royalty\r\n        uint256 cost = request.pricePerToken * quantity;\r\n        (, uint256 royaltyAmount) = getRoyaltyInfo(request.tokenContract, request.tokenId, cost);\r\n        valid = _hasApprovedCurrency(request.currency, cost + royaltyAmount, request.creator);\r\n      }\r\n    }\r\n    return (valid, request);\r\n  }\r\n\r\n  /**\r\n   * Checks if requests are valid.\r\n   * @param requestIds The IDs of the requests.\r\n   * @param quantities The amount of tokens to exchange per request. 0 is assumed to be the request\'s available quantity.\r\n   * @return valid The validities of the requests.\r\n   * @return requests The requests.\r\n   * @notice A request is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\r\n   */\r\n  function isRequestValidBatch(uint256[] calldata requestIds, uint256[] calldata quantities)\r\n    external\r\n    view\r\n    returns (bool[] memory valid, Request[] memory requests)\r\n  {\r\n    uint256 len = requestIds.length;\r\n    if (len != quantities.length) {\r\n      revert InvalidBatchRequest();\r\n    }\r\n    valid = new bool[](len);\r\n    requests = new Request[](len);\r\n    for (uint256 i; i < len; i++) {\r\n      (valid[i], requests[i]) = isRequestValid(requestIds[i], quantities[i]);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Checks if a request has expired.\r\n   * @param request The request to check.\r\n   * @return isExpired True if the request has expired.\r\n   */\r\n  function _isExpired(Request memory request) internal view returns (bool isExpired) {\r\n    // solhint-disable-next-line not-rely-on-time\r\n    return request.expiry <= block.timestamp;\r\n  }\r\n\r\n  /**\r\n   * Will set the royalties fees and recipient for contracts that don\'t support ERC-2981.\r\n   * @param tokenContract The contract the custom royalties apply to.\r\n   * @param recipient Address to send the royalties to.\r\n   * @param fee Fee percentage with a 10000 basis (e.g. 0.3% is 30 and 1% is 100 and 100% is 10000).\r\n   * @dev Can only be called by the owner.\r\n   * @notice This can be called even when the contract supports ERC-2891, but will be ignored if it does.\r\n   */\r\n  function setRoyaltyInfo(address tokenContract, address recipient, uint96 fee) public onlyOwner {\r\n    if (fee > 10000) {\r\n      revert InvalidRoyalty();\r\n    }\r\n    customRoyalties[tokenContract] = CustomRoyalty(recipient, fee);\r\n    emit CustomRoyaltyChanged(tokenContract, recipient, fee);\r\n  }\r\n\r\n  /**\r\n   * Returns the royalty details for the given token and cost.\r\n   * @param tokenContract Address of the token being traded.\r\n   * @param tokenId The ID of the token.\r\n   * @param cost Amount of currency sent/received for the trade.\r\n   * @return recipient Address to send royalties to.\r\n   * @return royalty Amount of currency to be paid as royalties.\r\n   */\r\n  function getRoyaltyInfo(address tokenContract, uint256 tokenId, uint256 cost)\r\n    public\r\n    view\r\n    returns (address recipient, uint256 royalty)\r\n  {\r\n    try IERC2981(address(tokenContract)).royaltyInfo(tokenId, cost) returns (address _r, uint256 _c) {\r\n      return (_r, _c);\r\n    } catch {} // solhint-disable-line no-empty-blocks\r\n\r\n    // Fail over to custom royalty\r\n    CustomRoyalty memory customRoyalty = customRoyalties[tokenContract];\r\n    return (customRoyalty.recipient, customRoyalty.fee * cost / 10000);\r\n  }\r\n\r\n  /**\r\n   * Checks if the amount of currency is approved for transfer exceeds the given amount.\r\n   * @param currency The address of the currency.\r\n   * @param amount The amount of currency.\r\n   * @param who The address of the owner of the currency.\r\n   * @return isValid True if the amount of currency is sufficient and approved for transfer.\r\n   */\r\n  function _hasApprovedCurrency(address currency, uint256 amount, address who) internal view returns (bool isValid) {\r\n    return IERC20(currency).balanceOf(who) >= amount && IERC20(currency).allowance(who, address(this)) >= amount;\r\n  }\r\n\r\n  /**\r\n   * Checks if a token contract is ERC1155 or ERC721 and if the token is owned and approved for transfer.\r\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\r\n   * @param tokenContract The address of the token contract.\r\n   * @param tokenId The ID of the token.\r\n   * @param quantity The quantity of tokens to list.\r\n   * @param who The address of the owner of the token.\r\n   * @return isValid True if the token is owned and approved for transfer.\r\n   * @dev Returns false if the token contract is not ERC1155 or ERC721.\r\n   */\r\n  function _hasApprovedTokens(bool isERC1155, address tokenContract, uint256 tokenId, uint256 quantity, address who)\r\n    internal\r\n    view\r\n    returns (bool isValid)\r\n  {\r\n    address market = address(this);\r\n\r\n    if (isERC1155) {\r\n      // ERC1155\r\n      return quantity > 0 && IERC1155(tokenContract).balanceOf(who, tokenId) >= quantity\r\n        && IERC1155(tokenContract).isApprovedForAll(who, market);\r\n    }\r\n\r\n    // ERC721\r\n    address tokenOwner;\r\n    address operator;\r\n\r\n    try IERC721(tokenContract).ownerOf(tokenId) returns (address _tokenOwner) {\r\n      tokenOwner = _tokenOwner;\r\n\r\n      try IERC721(tokenContract).getApproved(tokenId) returns (address _operator) {\r\n        operator = _operator;\r\n      } catch {} // solhint-disable-line no-empty-blocks\r\n    } catch {} // solhint-disable-line no-empty-blocks\r\n\r\n    return quantity == 1 && who == tokenOwner\r\n      && (operator == market || IERC721(tokenContract).isApprovedForAll(who, market));\r\n  }\r\n\r\n  /**\r\n   * Checks if a contract implements an interface.\r\n   * @param contractAddress The address of the contract.\r\n   * @param interfaceId The interface ID.\r\n   * @dev Reverts if the contract does not implement the interface.\r\n   */\r\n  function _requireInterface(address contractAddress, bytes4 interfaceId) internal view {\r\n    if (contractAddress.code.length != 0) {\r\n      try IERC165(contractAddress).supportsInterface(interfaceId) returns (bool supported) {\r\n        if (supported) {\r\n          // Success\r\n          return;\r\n        }\r\n      } catch {}\r\n    }\r\n    // Fail over\r\n    revert UnsupportedContractInterface(contractAddress, interfaceId);\r\n  }\r\n}\r\n'
      },
      'contracts/interfaces/ISequenceMarket.sol': {
        content:
          "// SPDX-License-Identifier: Apache-2.0\r\npragma solidity 0.8.19;\r\n\r\ninterface ISequenceMarketStorage {\r\n  /**\r\n   * Request parameters.\r\n   * @param isListing True if the request is a listing, false if it is an offer.\r\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\r\n   * @param tokenContract The address of the token contract.\r\n   * @param tokenId The ID of the token.\r\n   * @param quantity The quantity of tokens.\r\n   * @param expiry The expiry of the request.\r\n   * @param currency The address of the currency.\r\n   * @param pricePerToken The price per token, including royalty fees.\r\n   */\r\n  struct RequestParams {\r\n    bool isListing; // True if the request is a listing, false if it is an offer.\r\n    bool isERC1155; // True if the token is an ERC1155 token, false if it is an ERC721 token.\r\n    address tokenContract;\r\n    uint256 tokenId;\r\n    uint256 quantity;\r\n    uint96 expiry;\r\n    address currency;\r\n    uint256 pricePerToken;\r\n  }\r\n\r\n  /**\r\n   * Request storage.\r\n   * @param creator The address of the request creator.\r\n   * @param isListing True if the request is a listing, false if it is an offer.\r\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\r\n   * @param tokenContract The address of the token contract.\r\n   * @param tokenId The ID of the token.\r\n   * @param quantity The quantity of tokens.\r\n   * @param expiry The expiry of the request.\r\n   * @param currency The address of the currency.\r\n   * @param pricePerToken The price per token, including royalty fees.\r\n   */\r\n  struct Request {\r\n    address creator;\r\n    bool isListing;\r\n    bool isERC1155;\r\n    address tokenContract;\r\n    uint256 tokenId;\r\n    uint256 quantity;\r\n    uint96 expiry;\r\n    address currency;\r\n    uint256 pricePerToken;\r\n  }\r\n\r\n  /**\r\n   * Custom royalty parameters.\r\n   * @param recipient Address to send the fees to.\r\n   * @param fee Fee percentage with a 10000 basis (e.g. 0.3% is 30 and 1% is 100 and 100% is 10000).\r\n   * @dev Used to store custom royalty settings for contracts do not support ERC2981.\r\n   */\r\n  struct CustomRoyalty {\r\n    address recipient;\r\n    uint96 fee;\r\n  }\r\n}\r\n\r\ninterface ISequenceMarketFunctions is ISequenceMarketStorage {\r\n  /**\r\n   * Creates a request.\r\n   * @param request The request's details.\r\n   * @return requestId The ID of the request.\r\n   * @notice A listing is when the maker is selling tokens for currency.\r\n   * @notice An offer is when the maker is buying tokens with currency.\r\n   */\r\n  function createRequest(RequestParams calldata request) external returns (uint256 requestId);\r\n\r\n  /**\r\n   * Creates requests.\r\n   * @param requests The requests' details.\r\n   * @return requestIds The IDs of the requests.\r\n   */\r\n  function createRequestBatch(RequestParams[] calldata requests) external returns (uint256[] memory requestIds);\r\n\r\n  /**\r\n   * Accepts a request.\r\n   * @param requestId The ID of the request.\r\n   * @param quantity The quantity of tokens to accept.\r\n   * @param receiver The receiver of the accepted tokens.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   */\r\n  function acceptRequest(\r\n    uint256 requestId,\r\n    uint256 quantity,\r\n    address receiver,\r\n    uint256[] calldata additionalFees,\r\n    address[] calldata additionalFeeReceivers\r\n  )\r\n    external;\r\n\r\n  /**\r\n   * Accepts requests.\r\n   * @param requestIds The IDs of the requests.\r\n   * @param quantities The quantities of tokens to accept.\r\n   * @param receivers The receivers of the accepted tokens.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   * @dev Additional fees are applied to each request.\r\n   */\r\n  function acceptRequestBatch(\r\n    uint256[] calldata requestIds,\r\n    uint256[] calldata quantities,\r\n    address[] calldata receivers,\r\n    uint256[] calldata additionalFees,\r\n    address[] calldata additionalFeeReceivers\r\n  )\r\n    external;\r\n\r\n  /**\r\n   * Cancels a request.\r\n   * @param requestId The ID of the request.\r\n   */\r\n  function cancelRequest(uint256 requestId) external;\r\n\r\n  /**\r\n   * Cancels requests.\r\n   * @param requestIds The IDs of the requests.\r\n   */\r\n  function cancelRequestBatch(uint256[] calldata requestIds) external;\r\n\r\n  /**\r\n   * Gets a request.\r\n   * @param requestId The ID of the request.\r\n   * @return request The request.\r\n   */\r\n  function getRequest(uint256 requestId) external view returns (Request memory request);\r\n\r\n  /**\r\n   * Gets requests.\r\n   * @param requestIds The IDs of the requests.\r\n   * @return requests The requests.\r\n   */\r\n  function getRequestBatch(uint256[] calldata requestIds) external view returns (Request[] memory requests);\r\n\r\n  /**\r\n   * Checks if a request is valid.\r\n   * @param requestId The ID of the request.\r\n   * @param quantity The amount of tokens to exchange. 0 is assumed to be the request's available quantity.\r\n   * @return valid The validity of the request.\r\n   * @return request The request.\r\n   * @notice A request is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\r\n   */\r\n  function isRequestValid(uint256 requestId, uint256 quantity) external view returns (bool valid, Request memory request);\r\n\r\n  /**\r\n   * Checks if requests are valid.\r\n   * @param requestIds The IDs of the requests.\r\n   * @param quantities The amount of tokens to exchange per request. 0 is assumed to be the request's available quantity.\r\n   * @return valid The validities of the requests.\r\n   * @return requests The requests.\r\n   * @notice A request is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\r\n   */\r\n  function isRequestValidBatch(uint256[] calldata requestIds, uint256[] calldata quantities)\r\n    external\r\n    view\r\n    returns (bool[] memory valid, Request[] memory requests);\r\n\r\n  /**\r\n   * Returns the royalty details for the given token and cost.\r\n   * @param tokenContract Address of the token being traded.\r\n   * @param tokenId The ID of the token.\r\n   * @param cost Amount of currency sent/received for the trade.\r\n   * @return recipient Address to send royalties to.\r\n   * @return royalty Amount of currency to be paid as royalties.\r\n   */\r\n  function getRoyaltyInfo(address tokenContract, uint256 tokenId, uint256 cost)\r\n    external\r\n    view\r\n    returns (address recipient, uint256 royalty);\r\n}\r\n\r\ninterface ISequenceMarketSignals {\r\n  //\r\n  // Events\r\n  //\r\n\r\n  /// Emitted when a request is created.\r\n  event RequestCreated(\r\n    uint256 indexed requestId,\r\n    address indexed creator,\r\n    address indexed tokenContract,\r\n    uint256 tokenId,\r\n    bool isListing,\r\n    uint256 quantity,\r\n    address currency,\r\n    uint256 pricePerToken,\r\n    uint256 expiry\r\n  );\r\n\r\n  /// Emitted when a request is accepted.\r\n  event RequestAccepted(\r\n    uint256 indexed requestId,\r\n    address indexed buyer,\r\n    address indexed tokenContract,\r\n    address receiver,\r\n    uint256 quantity,\r\n    uint256 quantityRemaining\r\n  );\r\n\r\n  /// Emitted when a request is cancelled.\r\n  event RequestCancelled(uint256 indexed requestId, address indexed tokenContract);\r\n\r\n  /// Emitted when custom royalty settings are changed.\r\n  event CustomRoyaltyChanged(address indexed tokenContract, address recipient, uint96 fee);\r\n\r\n  //\r\n  // Errors\r\n  //\r\n\r\n  /// Thrown when the contract address does not support the required interface.\r\n  error UnsupportedContractInterface(address contractAddress, bytes4 interfaceId);\r\n\r\n  /// Thrown when the token approval is invalid.\r\n  error InvalidTokenApproval(address tokenContract, uint256 tokenId, uint256 quantity, address owner);\r\n\r\n  /// Thrown when the currency address is invalid.\r\n  error InvalidCurrency();\r\n\r\n  /// Thrown when the currency approval is invalid.\r\n  error InvalidCurrencyApproval(address currency, uint256 quantity, address owner);\r\n\r\n  /// Thrown when request id is invalid.\r\n  error InvalidRequestId(uint256 requestId);\r\n\r\n  /// Thrown when the parameters of a batch accept request are invalid.\r\n  error InvalidBatchRequest();\r\n\r\n  /// Thrown when quantity is invalid.\r\n  error InvalidQuantity();\r\n\r\n  /// Thrown when price is invalid.\r\n  error InvalidPrice();\r\n\r\n  /// Thrown when royalty is invalid.\r\n  error InvalidRoyalty();\r\n\r\n  /// Thrown when expiry is invalid.\r\n  error InvalidExpiry();\r\n\r\n  /// Thrown when the additional fees are invalid.\r\n  error InvalidAdditionalFees();\r\n}\r\n\r\n// solhint-disable-next-line no-empty-blocks\r\ninterface ISequenceMarket is ISequenceMarketFunctions, ISequenceMarketSignals {}\r\n"
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
