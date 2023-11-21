import type { EtherscanVerificationRequest } from '@0xsequence/solidity-deployer'
import { ContractFactory, ethers } from 'ethers'

const abi = [
  {
    "inputs": [],
    "name": "InvalidAdditionalFees",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidBatchRequest",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "currency",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "InvalidCurrencyApproval",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidExpiry",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "orderId",
        "type": "bytes32"
      }
    ],
    "name": "InvalidOrderId",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidPrice",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidQuantity",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidRoyalty",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "InvalidTokenApproval",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "orderId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "tokenContract",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quantityRemaining",
        "type": "uint256"
      }
    ],
    "name": "OrderAccepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "orderId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "tokenContract",
        "type": "address"
      }
    ],
    "name": "OrderCancelled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "orderId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "tokenContract",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isListing",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "currency",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "pricePerToken",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "expiry",
        "type": "uint256"
      }
    ],
    "name": "OrderCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "orderId",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "additionalFees",
        "type": "uint256[]"
      },
      {
        "internalType": "address[]",
        "name": "additionalFeeReceivers",
        "type": "address[]"
      }
    ],
    "name": "acceptOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "orderIds",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint256[]",
        "name": "quantities",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "additionalFees",
        "type": "uint256[]"
      },
      {
        "internalType": "address[]",
        "name": "additionalFeeReceivers",
        "type": "address[]"
      }
    ],
    "name": "acceptOrderBatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "orderId",
        "type": "bytes32"
      }
    ],
    "name": "cancelOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "orderIds",
        "type": "bytes32[]"
      }
    ],
    "name": "cancelOrderBatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "isListing",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isERC1155",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "tokenContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint96",
            "name": "expiry",
            "type": "uint96"
          },
          {
            "internalType": "address",
            "name": "currency",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "pricePerToken",
            "type": "uint256"
          }
        ],
        "internalType": "struct IOrderbookStorage.OrderRequest",
        "name": "request",
        "type": "tuple"
      }
    ],
    "name": "createOrder",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "orderId",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "isListing",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isERC1155",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "tokenContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint96",
            "name": "expiry",
            "type": "uint96"
          },
          {
            "internalType": "address",
            "name": "currency",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "pricePerToken",
            "type": "uint256"
          }
        ],
        "internalType": "struct IOrderbookStorage.OrderRequest[]",
        "name": "requests",
        "type": "tuple[]"
      }
    ],
    "name": "createOrderBatch",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "orderIds",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "orderId",
        "type": "bytes32"
      }
    ],
    "name": "getOrder",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isListing",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isERC1155",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "tokenContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint96",
            "name": "expiry",
            "type": "uint96"
          },
          {
            "internalType": "address",
            "name": "currency",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "pricePerToken",
            "type": "uint256"
          }
        ],
        "internalType": "struct IOrderbookStorage.Order",
        "name": "order",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "orderIds",
        "type": "bytes32[]"
      }
    ],
    "name": "getOrderBatch",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isListing",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isERC1155",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "tokenContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint96",
            "name": "expiry",
            "type": "uint96"
          },
          {
            "internalType": "address",
            "name": "currency",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "pricePerToken",
            "type": "uint256"
          }
        ],
        "internalType": "struct IOrderbookStorage.Order[]",
        "name": "orders",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "cost",
        "type": "uint256"
      }
    ],
    "name": "getRoyaltyInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "royalty",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isListing",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isERC1155",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "tokenContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint96",
            "name": "expiry",
            "type": "uint96"
          },
          {
            "internalType": "address",
            "name": "currency",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "pricePerToken",
            "type": "uint256"
          }
        ],
        "internalType": "struct IOrderbookStorage.Order",
        "name": "order",
        "type": "tuple"
      }
    ],
    "name": "hashOrder",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "orderId",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "orderId",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      }
    ],
    "name": "isOrderValid",
    "outputs": [
      {
        "internalType": "bool",
        "name": "valid",
        "type": "bool"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isListing",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isERC1155",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "tokenContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint96",
            "name": "expiry",
            "type": "uint96"
          },
          {
            "internalType": "address",
            "name": "currency",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "pricePerToken",
            "type": "uint256"
          }
        ],
        "internalType": "struct IOrderbookStorage.Order",
        "name": "order",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "orderIds",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint256[]",
        "name": "quantities",
        "type": "uint256[]"
      }
    ],
    "name": "isOrderValidBatch",
    "outputs": [
      {
        "internalType": "bool[]",
        "name": "valid",
        "type": "bool[]"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isListing",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isERC1155",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "tokenContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint96",
            "name": "expiry",
            "type": "uint96"
          },
          {
            "internalType": "address",
            "name": "currency",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "pricePerToken",
            "type": "uint256"
          }
        ],
        "internalType": "struct IOrderbookStorage.Order[]",
        "name": "orders",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export class Orderbook extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      abi,
      '0x6080806040523461001b576001600055611ca190816100218239f35b600080fdfe6040608081526004908136101561001557600080fd5b60009060e08235811c90816311b3a9a1146108ea5781631d7f5dc11461088257816336de9742146108325781633e067814146106795781635778472a146105c65781637489ec23146105a15781639e57f089146104c0578163ab15be1e146103b2578163ca3e7437146102fa578163db7ebd521461023957508063eb6d6208146101d25763edbeb66d146100a857600080fd5b346101ce57806003193601126101ce576001600160401b039280358481116101ca576100d79036908301610a28565b936024359081116101ca576100ee91369101610a28565b8351936101126100fd86610a11565b9561010a855197886109f0565b808752610a11565b602086810191601f190136833761012983516114c5565b94865b845181101561017c57806101586101466101779388610b8f565b51610151838a610b8f565b5190611515565b610162838b610b8f565b5261016d828c610b8f565b9015159052610b6a565b61012c565b508791878792805194818601918652518091526060850195915b8181106101b4578587038487015285806101b08988610b28565b0390f35b8251151587529583019591830191600101610196565b8380fd5b5080fd5b8284346101ce5760803660031901126101ce576001600160401b03906044358281116101ca576102059036908301610a28565b6064359283116101ca5761021f6102329336908401610ac2565b91610228611b03565b6024359035610f10565b6001815580f35b8284346102f3576101203660031901126102f3578151926102598461098f565b610261610a8b565b845260243580151581036102f657602085015260443580151581036102f657848401526001600160a01b039160643583811681036101ce576060860152608435608086015260a43560a086015260c4356001600160601b03811681036101ce5760c086015260e43592831683036102f35750830152610104356101008301526020916102ec906113c6565b9051908152f35b80fd5b8280fd5b9050346102f6576101003660031901126102f65781519361031a856109c1565b3580151581036101ca57845260243580151581036101ca5760208501526001600160a01b0360443581811681036103ae57838601526064356060860152608435608086015260a4356001600160601b03811681036103ae5760a086015260c43590811681036101ca57846001926103a69260c0602098015260e435908201526103a1611b03565b610bcc565b925551908152f35b8480fd5b92919050346101ce57602092836003193601126102f65784356001600160401b0381116101ca576103e69036908701610a28565b936103f185516114c5565b95845b86518110156104ae578061040b6104a99289610b8f565b518752600180855260058789208851926104248461098f565b81549060018060a01b0390818316865260ff60a0938181861c1615158c89015260a81c1615158c8701528301541690606091828601526002830154608086015260038301549085015286820154906001600160601b03821660c08601521c888401520154610100820152610498828b610b8f565b526104a3818a610b8f565b50610b6a565b6103f4565b8451838152806101b08186018b610b28565b505091346101ce5760803660031901126101ce576001600160401b039080358281116101ca576104f39036908301610a28565b6024358381116103ae5761050a9036908401610a28565b9160443584811161059d576105229036908301610a28565b9360643590811161059d5761053a9036908301610ac2565b95610543611b03565b8251845103610590575050835b8151811015610588578061057e878661056c6105839587610b8f565b516105778589610b8f565b5190610f10565b610b6a565b610550565b846001815580f35b516355ca07b760e11b8152fd5b8580fd5b8385346101ce5760203660031901126101ce57610232906105c0611b03565b35611341565b84929150346101ca5760203660031901126101ca579060056106779282610120966105ef611480565b5086358152600160205220908351956106078761098f565b825460ff60018060a01b03918281168a52818160a01c16151560208b015260a81c16151586890152600184015416606088015260028301546080880152600383015460a08801528201546001600160601b03811660c088015260601c908601520154610100840152518092610920565bf35b848385346102f357602092836003193601126101ce578035906001600160401b0382116102f657366023830112156102f6578101356106b781610a11565b956106c4855197886109f0565b81875260248688019260081b840101923684116103ae57602401915b83831061079757505050506106f3611b03565b83519161071761070284610a11565b9361070f835195866109f0565b808552610a11565b83850190601f1901368237825b8651811015610759578061074461073e610754938a610b8f565b51610bcc565b61074e8288610b8f565b52610b6a565b610724565b50918490846001928383558451948186019282875251809352850195925b8281106107845785870386f35b8351875295810195928101928401610777565b610100833603126103ae5785516107ad816109c1565b6107b684610ab5565b81526107c3888501610ab5565b888201526107d2878501610aa1565b87820152606080850135908201526080808501359082015260a080850135906001600160601b038216820361082e5782015261010091889160c0610817878201610aa1565b9082015284860135858201528152019201916106e0565b8780fd5b5050346101ce5760603660031901126101ce576101b090610861610854610a8b565b60443590602435906116a1565b91516001600160a01b03909116815260208101919091529081906040820190565b8385346101ce5760203660031901126101ce578035906001600160401b0382116102f6576108b291369101610a28565b906108bb611b03565b805b82518110156108e2578061057e6108d76108dd9386610b8f565b51611341565b6108bd565b506001815580f35b505090346102f357816003193601126102f35750610677610912610140936024359035611515565b909251921515835260208301905b60018060a01b038082511683526020820151151560208401526040820151151560408401528060608301511660608401526080820151608084015260a082015160a08401526001600160601b0360c08301511660c084015260e08201511660e083015261010080910151910152565b61012081019081106001600160401b038211176109ab57604052565b634e487b7160e01b600052604160045260246000fd5b61010081019081106001600160401b038211176109ab57604052565b6001600160401b0381116109ab57604052565b90601f801991011681019081106001600160401b038211176109ab57604052565b6001600160401b0381116109ab5760051b60200190565b81601f82011215610a8657803591610a3f83610a11565b92610a4d60405194856109f0565b808452602092838086019260051b820101928311610a86578301905b828210610a77575050505090565b81358152908301908301610a69565b600080fd5b600435906001600160a01b0382168203610a8657565b35906001600160a01b0382168203610a8657565b35908115158203610a8657565b81601f82011215610a8657803591610ad983610a11565b92610ae760405194856109f0565b808452602092838086019260051b820101928311610a86578301905b828210610b11575050505090565b838091610b1d84610aa1565b815201910190610b03565b90815180825260208080930193019160005b828110610b48575050505090565b909192938261012082610b5e6001948951610920565b01950193929101610b3a565b6000198114610b795760010190565b634e487b7160e01b600052601160045260246000fd5b8051821015610ba35760209160051b010190565b634e487b7160e01b600052603260045260246000fd5b81810292918115918404141715610b7957565b608081015160018060a01b0360408301511660e083015115610ee5576001600160601b0360a084015116421015610ed457825115610e205760208301511515610c1e606085019184835185339361184b565b15610df657505b82511515926020810151151560608201519060018060a01b0360c0840151169060e0840151926001600160601b0360a0860151169160405198610c678a61098f565b338a5260208a0152604089015285606089015260808801528560a088015260c087015260e0860152610100850152610c9e846113c6565b6000818152600160205260409020549094906001600160a01b0316610ddd5760a085927f33486539396cec5240d5163754eae7a17388e0bdf25c5e19a67dd2dc808bee17928460005260016020526005610100604060002092600180871b0381511684549060ff881b60208401511515891b169060ff60a81b6040850151151560a81b169269ffffffffffffffffffff60b01b16171717845560018401600180881b036060830151166001600160601b03881b825416179055608081015160028501558581015160038501556001600160601b0360c0820151166001600160601b031960e083015160601b1617600485015501519101556060810151958151151591600180851b0360c0820151166001600160601b038560e084015193015116926040519485526020850152604084015260608301526080820152a490565b604051636b798d5160e11b815260048101869052602490fd5b916084925160405192633e2c0d9b60e11b8452600484015260248301526044820152336064820152fd5b610e2e60e084015183610bb9565b60c084018051610e4a90339084906001600160a01b031661172d565b15610ea257505060208301511580159081610e99575b8115610e80575b5015610c25575b60405163524f409b60e01b8152600490fd5b905080610e8e575b38610e67565b506001821415610e88565b83159150610e60565b51604051631184019360e31b81526001600160a01b039091166004820152602481019190915233604482015260649150fd5b60405162d36c8560e81b8152600490fd5b60405162bfc92160e01b8152600490fd5b91908203918211610b7957565b91908201809211610b7957565b9290926000928184526001602052604084209560405196610f308861098f565b600581549160018060a01b0383168a5260ff8360a01c16151560208b015260ff8360a81c16151560408b015260018060a01b0360018201541660608b0152600281015460808b0152600381015460a08b015260048101546001600160601b03811660c08c015260601c60e08b0152015461010089015260018060a01b031615611328578515801561131b575b610e6e5760c08701516001600160601b0316421015610ed45781518451036110e65760a087015186036112fa57828552600160205261101c6040862060056000918281558260018201558260028201558260038201558260048201550155565b60018060a01b03606088015116611038876101008a0151610bb9565b966110488860808b0151846116a1565b9590978a6020810151151597886000146112f35781516001600160a01b03169a5b89156112e25733995b82611282575b50505050809881995b87518b1015611100576110948b89610b8f565b519a6001600160a01b036110a8828d610b8f565b511691821580156110f8575b6110e6578c8f9d938c6110cd6110e09661057e95610f03565b9f60e060018060a01b0391015116611b26565b99611081565b6040516330fd3c3160e01b8152600490fd5b508c156110b4565b949a92985095509593999197506020820151156000146112705761112960809361114092610ef6565b60e0830151869086906001600160a01b0316611b26565b60408101511561120a57015190863b156101ca57604051637921219560e11b81526001600160a01b0393841660048201529216602483015260448201526064810184905260a0608482015260a48101829052818160c48183895af180156111ff576111eb575b5060406003915b838152600160205220015460405192835260208301527fee8994dd528933eef611b5296329e91a2114785c0faa4459e48bce428f6d5a7960403393a4565b6111f582916109dd565b6102f357386111a6565b6040513d84823e3d90fd5b015191863b156101ca576040516323b872dd60e01b81526001600160a01b039182166004820152911660248201526044810191909152818160648183895af180156111ff5791604091600393611261575b506111ad565b61126a906109dd565b3861125b565b8092116110e657611140608092611129565b9c9091929c6000146112bb57908961129e846112b29594610ef6565b9d5b60e001516001600160a01b0316611b26565b8a388080611078565b9b50908b81116112d0576112b291898e6112a0565b60405163e0e54ced60e01b8152600490fd5b82516001600160a01b031699611072565b339a611069565b828552600160205260036040862001611314878254610ef6565b905561101c565b5060a08701518611610fbc565b604051636b798d5160e11b815260048101849052602490fd5b600081815260016020526040812080549192916001600160a01b03919082163303611328579060017fa6eb7cdc219e1518ced964e9a34e61d68a94e4f1569db3e84256ba981ba52753920154169282815260016020526113c26040822060056000918281558260018201558260028201558260038201558260048201550155565b80a3565b80519060208101511515916040820151151592606083015192608081015160a082015160c08301519161010060e0850151940151956040519760208901996001600160601b03199788809460601b168c5260f81b60348b015260f81b60358a015260601b166036880152604a870152606a8601526001600160601b0360a01b9060a01b16608a85015260601b16609683015260aa82015260aa815260e081018181106001600160401b038211176109ab5760405251902090565b6040519061148d8261098f565b816101006000918281528260208201528260408201528260608201528260808201528260a08201528260c08201528260e08201520152565b906114cf82610a11565b6114dc60405191826109f0565b82815280926114ed601f1991610a11565b019060005b8281106114fe57505050565b602090611509611480565b828285010152016114f2565b919091611520611480565b5060005260016020526040600020916040519261153c8461098f565b80549060018060a01b03928383169384875260ff8460a01c1615159485602089015260ff604089019560a81c161515855281600185015416936060890194855260028101549160808a019283526003820154978860a08c015260056004840154938c60c06001600160601b03871691015260e08d019460601c8552015491826101008d01528615611685575b1515988961166e575b89611663575b50886115ea575b50505050505050509190565b90919293949596975060001461162057505081611613955115159451169051918751169361184b565b38808080808080806115de565b61165e9650839584959361163c61165496949561164994610bb9565b97889251169051906116a1565b929050511693610f03565b908551169161172d565b611613565b8611159850386115d7565b60c08c01516001600160601b0316421099506115d1565b8996506115c8565b51906001600160a01b0382168203610a8657565b929160446040928351958693849263152a902d60e11b84526004840152602483015260018060a01b03165afa918260009182946116eb575b506116e75750600091508190565b9190565b919093506040823d8211611725575b81611707604093836109f0565b810103126102f35750602061171b8261168d565b91015192386116d9565b3d91506116fa565b6040516370a0823160e01b81526001600160a01b03848116600483015291909116926020918281602481885afa80156117f7578491600091611803575b501015938461177b575b5050505090565b604051636eb1769f60e11b81526001600160a01b03929092166004830152306024830152929350918190839060449082905afa9081156117f7576000916117cb575b509050101538808080611774565b82813d83116117f0575b6117df81836109f0565b810103126102f357505180386117bd565b503d6117d5565b6040513d6000823e3d90fd5b91508382813d831161182c575b61181a81836109f0565b810103126102f357508390513861176a565b503d611810565b90816020910312610a8657518015158103610a865790565b93919093611a03576040516331a9108f60e11b8152600481018290526000946001600160a01b0390811694602093879385816024818b5afa8991816119c8575b50611954575b50506001149586611945575b50856118ac575b505050505090565b9394509092163014919082156118cb575b5050905038808080806118a4565b60405163e985e9c560e01b81526001600160a01b0391909116600482015230602482015290929091508290829060449082905afa9182156117f757600092611918575b50508038806118bd565b6119379250803d1061193e575b61192f81836109f0565b810190611833565b388061190e565b503d611925565b8196501685841614943861189d565b60405163020604bf60e21b81526004810192909252975084816024818a5afa60009181611991575b50611988575b80611891565b92506001611982565b90918682813d83116119c1575b6119a881836109f0565b810103126102f357506119ba9061168d565b903861197c565b503d61199e565b9091508681813d83116119fc575b6119e081836109f0565b810103126119f8576119f19061168d565b903861188b565b8980fd5b503d6119d6565b9290918015159384611a7b575b505082611a1c57505090565b60405163e985e9c560e01b81526001600160a01b039283166004820152306024820152925060209183916044918391165afa9081156117f757600091611a60575090565b611a78915060203d811161193e5761192f81836109f0565b90565b604051627eeac760e11b81526001600160a01b0385166004820152602481019190915291935090602081806044810103816001600160a01b0388165afa9081156117f757600091611ad2575b501015913880611a10565b906020823d8211611afb575b81611aeb602093836109f0565b810103126102f357505138611ac7565b3d9150611ade565b600260005414611b14576002600055565b604051633ee5aeb560e01b8152600490fd5b6040516323b872dd60e01b60208083019182526001600160a01b0394851660248401529490931660448201526064808201959095529384529192601f19929190611b716084826109f0565b600092839283809351925af1913d15611c62573d6001600160401b038111611c4e57611ba78560405193601f84011601836109f0565b81528091843d92013e5b81611c1e575b5015611bc05750565b6084906040519062461bcd60e51b82526004820152603160248201527f5472616e7366657248656c7065723a3a7472616e7366657246726f6d3a207472604482015270185b9cd9995c919c9bdb4819985a5b1959607a1b6064820152fd5b80518015925083908315611c36575b50505038611bb7565b611c469350820181019101611833565b388281611c2d565b634e487b7160e01b83526041600452602483fd5b50506060611bb156fea264697066735822122024f565bf8b515ed1174d4b3536d25866dd7b3a4371b0e886febd4abb86bfe0e664736f6c63430008140033',
      signer
    )
  }
}

export const ORDERBOOK_VERIFICATION: Omit<EtherscanVerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'contracts/Orderbook.sol:Orderbook',
  version: 'v0.8.20+commit.a1b79de6',
  compilerInput: {
    "language": "Solidity",
    "sources": {
      "contracts/Orderbook.sol": {
        "content": "// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.20;\n\nimport {IOrderbook} from \"./interfaces/IOrderbook.sol\";\nimport {IERC721} from \"./interfaces/IERC721.sol\";\nimport {IERC2981} from \"./interfaces/IERC2981.sol\";\nimport {IERC20} from \"@0xsequence/erc-1155/contracts/interfaces/IERC20.sol\";\nimport {IERC1155} from \"@0xsequence/erc-1155/contracts/interfaces/IERC1155.sol\";\nimport {TransferHelper} from \"@uniswap/lib/contracts/libraries/TransferHelper.sol\";\nimport {ReentrancyGuard} from \"@openzeppelin/contracts/utils/ReentrancyGuard.sol\";\n\ncontract Orderbook is IOrderbook, ReentrancyGuard {\n  mapping(bytes32 => Order) internal _orders;\n\n  /**\n   * Creates an order.\n   * @param request The requested order's details.\n   * @return orderId The ID of the order.\n   */\n  function createOrder(OrderRequest memory request) external nonReentrant returns (bytes32 orderId) {\n    return _createOrder(request);\n  }\n\n  /**\n   * Creates orders.\n   * @param requests The requested orders' details.\n   * @return orderIds The IDs of the orders.\n   */\n  function createOrderBatch(OrderRequest[] memory requests) external nonReentrant returns (bytes32[] memory orderIds) {\n    orderIds = new bytes32[](requests.length);\n    for (uint256 i; i < requests.length; i++) {\n      orderIds[i] = _createOrder(requests[i]);\n    }\n  }\n\n  /**\n   * Performs creation of an order.\n   * @param request The requested order's details.\n   * @return orderId The ID of the order.\n   */\n  function _createOrder(OrderRequest memory request) internal returns (bytes32 orderId) {\n    uint256 quantity = request.quantity;\n    address tokenContract = request.tokenContract;\n\n    if (request.pricePerToken == 0) {\n      revert InvalidPrice();\n    }\n    // solhint-disable-next-line not-rely-on-time\n    if (request.expiry <= block.timestamp) {\n      revert InvalidExpiry();\n    }\n\n    if (request.isListing) {\n      // Check valid token for listing\n      if (!_hasApprovedTokens(request.isERC1155, tokenContract, request.tokenId, quantity, msg.sender)) {\n        revert InvalidTokenApproval(tokenContract, request.tokenId, quantity, msg.sender);\n      }\n    } else {\n      // Check approved currency for offer\n      uint256 total = quantity * request.pricePerToken;\n      if (!_hasApprovedCurrency(request.currency, total, msg.sender)) {\n        revert InvalidCurrencyApproval(request.currency, total, msg.sender);\n      }\n      // Check quantity. Covered by _hasApprovedTokens for listings\n      if ((request.isERC1155 && quantity == 0) || (!request.isERC1155 && quantity != 1)) {\n        revert InvalidQuantity();\n      }\n    }\n\n    Order memory order = Order({\n      isListing: request.isListing,\n      isERC1155: request.isERC1155,\n      creator: msg.sender,\n      tokenContract: tokenContract,\n      tokenId: request.tokenId,\n      quantity: quantity,\n      currency: request.currency,\n      pricePerToken: request.pricePerToken,\n      expiry: request.expiry\n    });\n    orderId = hashOrder(order);\n\n    if (_orders[orderId].creator != address(0)) {\n      // Collision\n      revert InvalidOrderId(orderId);\n    }\n    _orders[orderId] = order;\n\n    emit OrderCreated(\n      orderId,\n      tokenContract,\n      request.tokenId,\n      request.isListing,\n      quantity,\n      request.currency,\n      request.pricePerToken,\n      request.expiry\n      );\n\n    return orderId;\n  }\n\n  /**\n   * Accepts an order.\n   * @param orderId The ID of the order.\n   * @param quantity The quantity of tokens to accept.\n   * @param additionalFees The additional fees to pay.\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\n   */\n  function acceptOrder(\n    bytes32 orderId,\n    uint256 quantity,\n    uint256[] memory additionalFees,\n    address[] memory additionalFeeReceivers\n  )\n    external\n    nonReentrant\n  {\n    _acceptOrder(orderId, quantity, additionalFees, additionalFeeReceivers);\n  }\n\n  /**\n   * Accepts orders.\n   * @param orderIds The IDs of the orders.\n   * @param quantities The quantities of tokens to accept.\n   * @param additionalFees The additional fees to pay.\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\n   * @dev Additional fees are applied to each order.\n   */\n  function acceptOrderBatch(\n    bytes32[] memory orderIds,\n    uint256[] memory quantities,\n    uint256[] memory additionalFees,\n    address[] memory additionalFeeReceivers\n  )\n    external\n    nonReentrant\n  {\n    if (orderIds.length != quantities.length) {\n      revert InvalidBatchRequest();\n    }\n\n    for (uint256 i; i < orderIds.length; i++) {\n      _acceptOrder(orderIds[i], quantities[i], additionalFees, additionalFeeReceivers);\n    }\n  }\n\n  /**\n   * Performs acceptance of an order.\n   * @param orderId The ID of the order.\n   * @param quantity The quantity of tokens to accept.\n   * @param additionalFees The additional fees to pay.\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\n   */\n  function _acceptOrder(\n    bytes32 orderId,\n    uint256 quantity,\n    uint256[] memory additionalFees,\n    address[] memory additionalFeeReceivers\n  )\n    internal\n  {\n    Order memory order = _orders[orderId];\n    if (order.creator == address(0)) {\n      // Order cancelled, completed or never existed\n      revert InvalidOrderId(orderId);\n    }\n    if (quantity == 0 || quantity > order.quantity) {\n      revert InvalidQuantity();\n    }\n    if (_isExpired(order)) {\n      revert InvalidExpiry();\n    }\n    if (additionalFees.length != additionalFeeReceivers.length) {\n      revert InvalidAdditionalFees();\n    }\n\n    // Update order state\n    if (order.quantity == quantity) {\n      // Refund some gas\n      delete _orders[orderId];\n    } else {\n      _orders[orderId].quantity -= quantity;\n    }\n    address tokenContract = order.tokenContract;\n\n    // Calculate payables\n    uint256 remainingCost = order.pricePerToken * quantity;\n    (address royaltyRecipient, uint256 royaltyAmount) = getRoyaltyInfo(tokenContract, order.tokenId, remainingCost);\n\n    address currencyReceiver = order.isListing ? order.creator : msg.sender;\n    address tokenReceiver = order.isListing ? msg.sender : order.creator;\n\n    if (royaltyAmount > 0) {\n      if (order.isListing) {\n        // Royalties are paid by the maker. This reduces the cost for listings.\n        // Underflow prevents fees > cost\n        remainingCost -= royaltyAmount;\n      } else if (royaltyAmount > remainingCost) {\n        // Royalty cannot exceed cost\n        revert InvalidRoyalty();\n      }\n      // Transfer royalties\n      TransferHelper.safeTransferFrom(order.currency, tokenReceiver, royaltyRecipient, royaltyAmount);\n    }\n\n    // Transfer additional fees\n    uint256 totalFees;\n    for (uint256 i; i < additionalFees.length; i++) {\n      uint256 fee = additionalFees[i];\n      address feeReceiver = additionalFeeReceivers[i];\n      if (feeReceiver == address(0) || fee == 0) {\n        revert InvalidAdditionalFees();\n      }\n      totalFees += fee;\n      TransferHelper.safeTransferFrom(order.currency, tokenReceiver, feeReceiver, fee);\n    }\n    if (!order.isListing) {\n      // Fees are paid by the taker. This reduces the cost for offers.\n      // Underflow prevents fees > cost\n      remainingCost -= totalFees;\n    } else if (totalFees > remainingCost) {\n      // Fees cannot exceed cost - royalties\n      revert InvalidAdditionalFees();\n    }\n\n    // Transfer currency\n    TransferHelper.safeTransferFrom(order.currency, tokenReceiver, currencyReceiver, remainingCost);\n\n    // Transfer token\n    if (order.isERC1155) {\n      IERC1155(tokenContract).safeTransferFrom(currencyReceiver, tokenReceiver, order.tokenId, quantity, \"\");\n    } else {\n      IERC721(tokenContract).transferFrom(currencyReceiver, tokenReceiver, order.tokenId);\n    }\n\n    emit OrderAccepted(orderId, msg.sender, tokenContract, quantity, _orders[orderId].quantity);\n  }\n\n  /**\n   * Cancels an order.\n   * @param orderId The ID of the order.\n   */\n  function cancelOrder(bytes32 orderId) external nonReentrant {\n    _cancelOrder(orderId);\n  }\n\n  /**\n   * Cancels orders.\n   * @param orderIds The IDs of the orders.\n   */\n  function cancelOrderBatch(bytes32[] memory orderIds) external nonReentrant {\n    for (uint256 i; i < orderIds.length; i++) {\n      _cancelOrder(orderIds[i]);\n    }\n  }\n\n  /**\n   * Performs cancellation of an order.\n   * @param orderId The ID of the order.\n   */\n  function _cancelOrder(bytes32 orderId) internal {\n    Order storage order = _orders[orderId];\n    if (order.creator != msg.sender) {\n      revert InvalidOrderId(orderId);\n    }\n    address tokenContract = order.tokenContract;\n\n    // Refund some gas\n    delete _orders[orderId];\n\n    emit OrderCancelled(orderId, tokenContract);\n  }\n\n  /**\n   * Deterministically create the orderId for the given order.\n   * @param order The order.\n   * @return orderId The ID of the order.\n   */\n  function hashOrder(Order memory order) public pure returns (bytes32 orderId) {\n    return keccak256(\n      abi.encodePacked(\n        order.creator,\n        order.isListing,\n        order.isERC1155,\n        order.tokenContract,\n        order.tokenId,\n        order.quantity,\n        order.expiry,\n        order.currency,\n        order.pricePerToken\n      )\n    );\n  }\n\n  /**\n   * Gets an order.\n   * @param orderId The ID of the order.\n   * @return order The order.\n   */\n  function getOrder(bytes32 orderId) external view returns (Order memory order) {\n    return _orders[orderId];\n  }\n\n  /**\n   * Gets orders.\n   * @param orderIds The IDs of the orders.\n   * @return orders The orders.\n   */\n  function getOrderBatch(bytes32[] memory orderIds) external view returns (Order[] memory orders) {\n    orders = new Order[](orderIds.length);\n    for (uint256 i; i < orderIds.length; i++) {\n      orders[i] = _orders[orderIds[i]];\n    }\n  }\n\n  /**\n   * Checks if an order is valid.\n   * @param orderId The ID of the order.\n   * @param quantity The amount of tokens to exchange. 0 is assumed to be the order's available quantity.\n   * @return valid The validity of the order.\n   * @return order The order.\n   * @notice An order is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\n   */\n  function isOrderValid(bytes32 orderId, uint256 quantity) public view returns (bool valid, Order memory order) {\n    order = _orders[orderId];\n    if (quantity == 0) {\n      // 0 is assumed to be max quantity\n      quantity = order.quantity;\n    }\n    valid = order.creator != address(0) && !_isExpired(order) && quantity <= order.quantity;\n    if (valid) {\n      if (order.isListing) {\n        valid = _hasApprovedTokens(order.isERC1155, order.tokenContract, order.tokenId, quantity, order.creator);\n      } else {\n        // Add royalty\n        uint256 cost = order.pricePerToken * quantity;\n        (, uint256 royaltyAmount) = getRoyaltyInfo(order.tokenContract, order.tokenId, cost);\n        valid = _hasApprovedCurrency(order.currency, cost + royaltyAmount, order.creator);\n      }\n    }\n    return (valid, order);\n  }\n\n  /**\n   * Checks if orders are valid.\n   * @param orderIds The IDs of the orders.\n   * @param quantities The amount of tokens to exchange per order. 0 is assumed to be the order's available quantity.\n   * @return valid The validities of the orders.\n   * @return orders The orders.\n   * @notice An order is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\n   */\n  function isOrderValidBatch(bytes32[] memory orderIds, uint256[] memory quantities)\n    external\n    view\n    returns (bool[] memory valid, Order[] memory orders)\n  {\n    valid = new bool[](orderIds.length);\n    orders = new Order[](orderIds.length);\n    for (uint256 i; i < orderIds.length; i++) {\n      (valid[i], orders[i]) = isOrderValid(orderIds[i], quantities[i]);\n    }\n  }\n\n  /**\n   * Checks if a order has expired.\n   * @param order The order to check.\n   * @return isExpired True if the order has expired.\n   */\n  function _isExpired(Order memory order) internal view returns (bool isExpired) {\n    // solhint-disable-next-line not-rely-on-time\n    return order.expiry <= block.timestamp;\n  }\n\n  /**\n   * Will return how much of currency need to be paid for the royalty.\n   * @param tokenContract Address of the erc-1155 token being traded\n   * @param tokenId ID of the erc-1155 token being traded\n   * @param cost Amount of currency sent/received for the trade\n   * @return recipient Address that will be able to claim the royalty\n   * @return royalty Amount of currency that will be sent to royalty recipient\n   */\n  function getRoyaltyInfo(address tokenContract, uint256 tokenId, uint256 cost)\n    public\n    view\n    returns (address recipient, uint256 royalty)\n  {\n    try IERC2981(address(tokenContract)).royaltyInfo(tokenId, cost) returns (address _r, uint256 _c) {\n      return (_r, _c);\n    } catch {} // solhint-disable-line no-empty-blocks\n    return (address(0), 0);\n  }\n\n  /**\n   * Checks if the amount of currency is approved for transfer exceeds the given amount.\n   * @param currency The address of the currency.\n   * @param amount The amount of currency.\n   * @param owner The address of the owner of the currency.\n   * @return isValid True if the amount of currency is sufficient and approved for transfer.\n   */\n  function _hasApprovedCurrency(address currency, uint256 amount, address owner) internal view returns (bool isValid) {\n    return IERC20(currency).balanceOf(owner) >= amount && IERC20(currency).allowance(owner, address(this)) >= amount;\n  }\n\n  /**\n   * Checks if a token contract is ERC1155 or ERC721 and if the token is owned and approved for transfer.\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\n   * @param tokenContract The address of the token contract.\n   * @param tokenId The ID of the token.\n   * @param quantity The quantity of tokens to list.\n   * @param owner The address of the owner of the token.\n   * @return isValid True if the token is owned and approved for transfer.\n   * @dev Returns false if the token contract is not ERC1155 or ERC721.\n   */\n  function _hasApprovedTokens(bool isERC1155, address tokenContract, uint256 tokenId, uint256 quantity, address owner)\n    internal\n    view\n    returns (bool isValid)\n  {\n    address orderbook = address(this);\n\n    if (isERC1155) {\n      // ERC1155\n      return quantity > 0 && IERC1155(tokenContract).balanceOf(owner, tokenId) >= quantity\n        && IERC1155(tokenContract).isApprovedForAll(owner, orderbook);\n    }\n\n    // ERC721\n    address tokenOwner;\n    address operator;\n\n    try IERC721(tokenContract).ownerOf(tokenId) returns (address _tokenOwner) {\n      tokenOwner = _tokenOwner;\n\n      try IERC721(tokenContract).getApproved(tokenId) returns (address _operator) {\n        operator = _operator;\n      } catch {} // solhint-disable-line no-empty-blocks\n    } catch {} // solhint-disable-line no-empty-blocks\n\n    return quantity == 1 && owner == tokenOwner\n      && (operator == orderbook || IERC721(tokenContract).isApprovedForAll(owner, orderbook));\n  }\n}\n"
      },
      "contracts/interfaces/IOrderbook.sol": {
        "content": "// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.20;\n\ninterface IOrderbookStorage {\n  /**\n   * Order request parameters.\n   * @param isListing True if the order is a listing, false if it is an offer.\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\n   * @param tokenContract The address of the token contract.\n   * @param tokenId The ID of the token.\n   * @param quantity The quantity of tokens.\n   * @param expiry The expiry of the order.\n   * @param currency The address of the currency.\n   * @param pricePerToken The price per token, including royalty fees.\n   */\n  struct OrderRequest {\n    bool isListing; // True if the order is a listing, false if it is an offer.\n    bool isERC1155; // True if the token is an ERC1155 token, false if it is an ERC721 token.\n    address tokenContract;\n    uint256 tokenId;\n    uint256 quantity;\n    uint96 expiry;\n    address currency;\n    uint256 pricePerToken;\n  }\n\n  /**\n   * Order parameters.\n   * @param creator The address of the order creator.\n   * @param isListing True if the order is a listing, false if it is an offer.\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\n   * @param tokenContract The address of the token contract.\n   * @param tokenId The ID of the token.\n   * @param quantity The quantity of tokens.\n   * @param expiry The expiry of the order.\n   * @param currency The address of the currency.\n   * @param pricePerToken The price per token, including royalty fees.\n   */\n  struct Order {\n    address creator;\n    bool isListing;\n    bool isERC1155;\n    address tokenContract;\n    uint256 tokenId;\n    uint256 quantity;\n    uint96 expiry;\n    address currency;\n    uint256 pricePerToken;\n  }\n}\n\ninterface IOrderbookFunctions is IOrderbookStorage {\n  /**\n   * Creates an order.\n   * @param request The requested order's details.\n   * @return orderId The ID of the order.\n   * @notice A listing is when the maker is selling tokens for currency.\n   * @notice An offer is when the maker is buying tokens with currency.\n   */\n  function createOrder(OrderRequest memory request) external returns (bytes32 orderId);\n\n  /**\n   * Creates orders.\n   * @param requests The requested orders' details.\n   * @return orderIds The IDs of the orders.\n   */\n  function createOrderBatch(OrderRequest[] memory requests) external returns (bytes32[] memory orderIds);\n\n  /**\n   * Accepts an order.\n   * @param orderId The ID of the order.\n   * @param quantity The quantity of tokens to accept.\n   * @param additionalFees The additional fees to pay.\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\n   */\n  function acceptOrder(\n    bytes32 orderId,\n    uint256 quantity,\n    uint256[] memory additionalFees,\n    address[] memory additionalFeeReceivers\n  )\n    external;\n\n  /**\n   * Accepts orders.\n   * @param orderIds The IDs of the orders.\n   * @param quantities The quantities of tokens to accept.\n   * @param additionalFees The additional fees to pay.\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\n   */\n  function acceptOrderBatch(\n    bytes32[] memory orderIds,\n    uint256[] memory quantities,\n    uint256[] memory additionalFees,\n    address[] memory additionalFeeReceivers\n  )\n    external;\n\n  /**\n   * Cancels an order.\n   * @param orderId The ID of the order.\n   */\n  function cancelOrder(bytes32 orderId) external;\n\n  /**\n   * Cancels orders.\n   * @param orderIds The IDs of the orders.\n   */\n  function cancelOrderBatch(bytes32[] memory orderIds) external;\n\n  /**\n   * Gets an order.\n   * @param orderId The ID of the order.\n   * @return order The order.\n   */\n  function getOrder(bytes32 orderId) external view returns (Order memory order);\n\n  /**\n   * Gets orders.\n   * @param orderIds The IDs of the orders.\n   * @return orders The orders.\n   */\n  function getOrderBatch(bytes32[] memory orderIds) external view returns (Order[] memory orders);\n\n  /**\n   * Checks if an order is valid.\n   * @param orderId The ID of the order.\n   * @param quantity The amount of tokens to exchange. 0 is assumed to be the order's available quantity.\n   * @return valid The validity of the order.\n   * @return order The order.\n   * @notice An order is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\n   */\n  function isOrderValid(bytes32 orderId, uint256 quantity) external view returns (bool valid, Order memory order);\n\n  /**\n   * Checks if orders are valid.\n   * @param orderIds The IDs of the orders.\n   * @param quantities The amount of tokens to exchange per order. 0 is assumed to be the order's available quantity.\n   * @return valid The validities of the orders.\n   * @return orders The orders.\n   * @notice An order is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\n   */\n  function isOrderValidBatch(bytes32[] memory orderIds, uint256[] memory quantities)\n    external\n    view\n    returns (bool[] memory valid, Order[] memory orders);\n}\n\ninterface IOrderbookSignals {\n  //\n  // Events\n  //\n\n  /// Emitted when an Order is created.\n  event OrderCreated(\n    bytes32 indexed orderId,\n    address indexed tokenContract,\n    uint256 indexed tokenId,\n    bool isListing,\n    uint256 quantity,\n    address currency,\n    uint256 pricePerToken,\n    uint256 expiry\n  );\n\n  /// Emitted when an Order is accepted.\n  event OrderAccepted(\n    bytes32 indexed orderId,\n    address indexed buyer,\n    address indexed tokenContract,\n    uint256 quantity,\n    uint256 quantityRemaining\n  );\n\n  /// Emitted when an Order is cancelled.\n  event OrderCancelled(bytes32 indexed orderId, address indexed tokenContract);\n\n  //\n  // Errors\n  //\n\n  /// Thrown when the token approval is invalid.\n  error InvalidTokenApproval(address tokenContract, uint256 tokenId, uint256 quantity, address owner);\n\n  /// Thrown when the currency approval is invalid.\n  error InvalidCurrencyApproval(address currency, uint256 quantity, address owner);\n\n  /// Thrown when order id is invalid.\n  error InvalidOrderId(bytes32 orderId);\n\n  /// Thrown when the parameters of a batch accept request are invalid.\n  error InvalidBatchRequest();\n\n  /// Thrown when quantity is invalid.\n  error InvalidQuantity();\n\n  /// Thrown when price is invalid.\n  error InvalidPrice();\n\n  /// Thrown when royalty is invalid.\n  error InvalidRoyalty();\n\n  /// Thrown when expiry is invalid.\n  error InvalidExpiry();\n\n  /// Thrown when the additional fees are invalid.\n  error InvalidAdditionalFees();\n}\n\n// solhint-disable-next-line no-empty-blocks\ninterface IOrderbook is IOrderbookFunctions, IOrderbookSignals {}\n"
      },
      "contracts/interfaces/IERC721.sol": {
        "content": "// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.20;\n\ninterface IERC721 {\n  event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\n  event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);\n  event ApprovalForAll(address indexed owner, address indexed operator, bool approved);\n\n  function balanceOf(address _owner) external view returns (uint256 balance);\n  function ownerOf(uint256 _tokenId) external view returns (address owner);\n  function safeTransferFrom(address _from, address _to, uint256 _tokenId) external;\n  function transferFrom(address _from, address _to, uint256 _tokenId) external;\n  function approve(address _to, uint256 _tokenId) external;\n  function getApproved(uint256 _tokenId) external view returns (address operator);\n  function setApprovalForAll(address _operator, bool _approved) external;\n  function isApprovedForAll(address _owner, address _operator) external view returns (bool);\n  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata _data) external;\n}\n"
      },
      "contracts/interfaces/IERC2981.sol": {
        "content": "// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.20;\n\nimport {IERC165} from \"@0xsequence/erc-1155/contracts/interfaces/IERC165.sol\";\n\n/**\n * @dev Interface for the NFT Royalty Standard\n */\ninterface IERC2981 is IERC165 {\n  /**\n   * @notice Called with the sale price to determine how much royalty\n   * is owed and to whom.\n   * @param _tokenId - the NFT asset queried for royalty information\n   * @param _salePrice - the sale price of the NFT asset specified by _tokenId\n   * @return receiver - address of who should be sent the royalty payment\n   * @return royaltyAmount - the royalty payment amount for _salePrice\n   */\n  function royaltyInfo(uint256 _tokenId, uint256 _salePrice)\n    external\n    view\n    returns (address receiver, uint256 royaltyAmount);\n}\n"
      },
      "lib/0xsequence/erc-1155/src/contracts/interfaces/IERC20.sol": {
        "content": "// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @title ERC20 interface\r\n * @dev see https://eips.ethereum.org/EIPS/eip-20\r\n */\r\ninterface IERC20 {\r\n  function transfer(address to, uint256 value) external returns (bool);\r\n  function approve(address spender, uint256 value) external returns (bool);\r\n  function transferFrom(address from, address to, uint256 value) external returns (bool);\r\n  function totalSupply() external view returns (uint256);\r\n  function balanceOf(address who) external view returns (uint256);\r\n  function allowance(address owner, address spender) external view returns (uint256);\r\n  event Transfer(address indexed from, address indexed to, uint256 value);\r\n  event Approval(address indexed owner, address indexed spender, uint256 value);\r\n}\r\n"
      },
      "lib/0xsequence/erc-1155/src/contracts/interfaces/IERC1155.sol": {
        "content": "// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\nimport './IERC165.sol';\r\n\r\n\r\ninterface IERC1155 is IERC165 {\r\n\r\n  /****************************************|\r\n  |                 Events                 |\r\n  |_______________________________________*/\r\n\r\n  /**\r\n   * @dev Either TransferSingle or TransferBatch MUST emit when tokens are transferred, including zero amount transfers as well as minting or burning\r\n   *   Operator MUST be msg.sender\r\n   *   When minting/creating tokens, the `_from` field MUST be set to `0x0`\r\n   *   When burning/destroying tokens, the `_to` field MUST be set to `0x0`\r\n   *   The total amount transferred from address 0x0 minus the total amount transferred to 0x0 may be used by clients and exchanges to be added to the \"circulating supply\" for a given token ID\r\n   *   To broadcast the existence of a token ID with no initial balance, the contract SHOULD emit the TransferSingle event from `0x0` to `0x0`, with the token creator as `_operator`, and a `_amount` of 0\r\n   */\r\n  event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _amount);\r\n\r\n  /**\r\n   * @dev Either TransferSingle or TransferBatch MUST emit when tokens are transferred, including zero amount transfers as well as minting or burning\r\n   *   Operator MUST be msg.sender\r\n   *   When minting/creating tokens, the `_from` field MUST be set to `0x0`\r\n   *   When burning/destroying tokens, the `_to` field MUST be set to `0x0`\r\n   *   The total amount transferred from address 0x0 minus the total amount transferred to 0x0 may be used by clients and exchanges to be added to the \"circulating supply\" for a given token ID\r\n   *   To broadcast the existence of multiple token IDs with no initial balance, this SHOULD emit the TransferBatch event from `0x0` to `0x0`, with the token creator as `_operator`, and a `_amount` of 0\r\n   */\r\n  event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _amounts);\r\n\r\n  /**\r\n   * @dev MUST emit when an approval is updated\r\n   */\r\n  event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);\r\n\r\n\r\n  /****************************************|\r\n  |                Functions               |\r\n  |_______________________________________*/\r\n\r\n  /**\r\n    * @notice Transfers amount of an _id from the _from address to the _to address specified\r\n    * @dev MUST emit TransferSingle event on success\r\n    * Caller must be approved to manage the _from account's tokens (see isApprovedForAll)\r\n    * MUST throw if `_to` is the zero address\r\n    * MUST throw if balance of sender for token `_id` is lower than the `_amount` sent\r\n    * MUST throw on any other error\r\n    * When transfer is complete, this function MUST check if `_to` is a smart contract (code size > 0). If so, it MUST call `onERC1155Received` on `_to` and revert if the return amount is not `bytes4(keccak256(\"onERC1155Received(address,address,uint256,uint256,bytes)\"))`\r\n    * @param _from    Source address\r\n    * @param _to      Target address\r\n    * @param _id      ID of the token type\r\n    * @param _amount  Transfered amount\r\n    * @param _data    Additional data with no specified format, sent in call to `_to`\r\n    */\r\n  function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _amount, bytes calldata _data) external;\r\n\r\n  /**\r\n    * @notice Send multiple types of Tokens from the _from address to the _to address (with safety call)\r\n    * @dev MUST emit TransferBatch event on success\r\n    * Caller must be approved to manage the _from account's tokens (see isApprovedForAll)\r\n    * MUST throw if `_to` is the zero address\r\n    * MUST throw if length of `_ids` is not the same as length of `_amounts`\r\n    * MUST throw if any of the balance of sender for token `_ids` is lower than the respective `_amounts` sent\r\n    * MUST throw on any other error\r\n    * When transfer is complete, this function MUST check if `_to` is a smart contract (code size > 0). If so, it MUST call `onERC1155BatchReceived` on `_to` and revert if the return amount is not `bytes4(keccak256(\"onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)\"))`\r\n    * Transfers and events MUST occur in the array order they were submitted (_ids[0] before _ids[1], etc)\r\n    * @param _from     Source addresses\r\n    * @param _to       Target addresses\r\n    * @param _ids      IDs of each token type\r\n    * @param _amounts  Transfer amounts per token type\r\n    * @param _data     Additional data with no specified format, sent in call to `_to`\r\n  */\r\n  function safeBatchTransferFrom(address _from, address _to, uint256[] calldata _ids, uint256[] calldata _amounts, bytes calldata _data) external;\r\n\r\n  /**\r\n   * @notice Get the balance of an account's Tokens\r\n   * @param _owner  The address of the token holder\r\n   * @param _id     ID of the Token\r\n   * @return        The _owner's balance of the Token type requested\r\n   */\r\n  function balanceOf(address _owner, uint256 _id) external view returns (uint256);\r\n\r\n  /**\r\n   * @notice Get the balance of multiple account/token pairs\r\n   * @param _owners The addresses of the token holders\r\n   * @param _ids    ID of the Tokens\r\n   * @return        The _owner's balance of the Token types requested (i.e. balance for each (owner, id) pair)\r\n   */\r\n  function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory);\r\n\r\n  /**\r\n   * @notice Enable or disable approval for a third party (\"operator\") to manage all of caller's tokens\r\n   * @dev MUST emit the ApprovalForAll event on success\r\n   * @param _operator  Address to add to the set of authorized operators\r\n   * @param _approved  True if the operator is approved, false to revoke approval\r\n   */\r\n  function setApprovalForAll(address _operator, bool _approved) external;\r\n\r\n  /**\r\n   * @notice Queries the approval status of an operator for a given owner\r\n   * @param _owner     The owner of the Tokens\r\n   * @param _operator  Address of authorized operator\r\n   * @return isOperator True if the operator is approved, false if not\r\n   */\r\n  function isApprovedForAll(address _owner, address _operator) external view returns (bool isOperator);\r\n}\r\n"
      },
      "lib/uniswap-lib/contracts/libraries/TransferHelper.sol": {
        "content": "// SPDX-License-Identifier: GPL-3.0-or-later\r\n\r\npragma solidity >=0.6.0;\r\n\r\n// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false\r\nlibrary TransferHelper {\r\n    function safeApprove(\r\n        address token,\r\n        address to,\r\n        uint256 value\r\n    ) internal {\r\n        // bytes4(keccak256(bytes('approve(address,uint256)')));\r\n        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));\r\n        require(\r\n            success && (data.length == 0 || abi.decode(data, (bool))),\r\n            'TransferHelper::safeApprove: approve failed'\r\n        );\r\n    }\r\n\r\n    function safeTransfer(\r\n        address token,\r\n        address to,\r\n        uint256 value\r\n    ) internal {\r\n        // bytes4(keccak256(bytes('transfer(address,uint256)')));\r\n        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));\r\n        require(\r\n            success && (data.length == 0 || abi.decode(data, (bool))),\r\n            'TransferHelper::safeTransfer: transfer failed'\r\n        );\r\n    }\r\n\r\n    function safeTransferFrom(\r\n        address token,\r\n        address from,\r\n        address to,\r\n        uint256 value\r\n    ) internal {\r\n        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));\r\n        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));\r\n        require(\r\n            success && (data.length == 0 || abi.decode(data, (bool))),\r\n            'TransferHelper::transferFrom: transferFrom failed'\r\n        );\r\n    }\r\n\r\n    function safeTransferETH(address to, uint256 value) internal {\r\n        (bool success, ) = to.call{value: value}(new bytes(0));\r\n        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');\r\n    }\r\n}\r\n"
      },
      "lib/openzeppelin/contracts/utils/ReentrancyGuard.sol": {
        "content": "// SPDX-License-Identifier: MIT\r\n// OpenZeppelin Contracts (last updated v4.9.0) (security/ReentrancyGuard.sol)\r\n\r\npragma solidity ^0.8.20;\r\n\r\n/**\r\n * @dev Contract module that helps prevent reentrant calls to a function.\r\n *\r\n * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier\r\n * available, which can be applied to functions to make sure there are no nested\r\n * (reentrant) calls to them.\r\n *\r\n * Note that because there is a single `nonReentrant` guard, functions marked as\r\n * `nonReentrant` may not call one another. This can be worked around by making\r\n * those functions `private`, and then adding `external` `nonReentrant` entry\r\n * points to them.\r\n *\r\n * TIP: If you would like to learn more about reentrancy and alternative ways\r\n * to protect against it, check out our blog post\r\n * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].\r\n */\r\nabstract contract ReentrancyGuard {\r\n    // Booleans are more expensive than uint256 or any type that takes up a full\r\n    // word because each write operation emits an extra SLOAD to first read the\r\n    // slot's contents, replace the bits taken up by the boolean, and then write\r\n    // back. This is the compiler's defense against contract upgrades and\r\n    // pointer aliasing, and it cannot be disabled.\r\n\r\n    // The values being non-zero value makes deployment a bit more expensive,\r\n    // but in exchange the refund on every call to nonReentrant will be lower in\r\n    // amount. Since refunds are capped to a percentage of the total\r\n    // transaction's gas, it is best to keep them low in cases like this one, to\r\n    // increase the likelihood of the full refund coming into effect.\r\n    uint256 private constant NOT_ENTERED = 1;\r\n    uint256 private constant ENTERED = 2;\r\n\r\n    uint256 private _status;\r\n\r\n    /**\r\n     * @dev Unauthorized reentrant call.\r\n     */\r\n    error ReentrancyGuardReentrantCall();\r\n\r\n    constructor() {\r\n        _status = NOT_ENTERED;\r\n    }\r\n\r\n    /**\r\n     * @dev Prevents a contract from calling itself, directly or indirectly.\r\n     * Calling a `nonReentrant` function from another `nonReentrant`\r\n     * function is not supported. It is possible to prevent this from happening\r\n     * by making the `nonReentrant` function external, and making it call a\r\n     * `private` function that does the actual work.\r\n     */\r\n    modifier nonReentrant() {\r\n        _nonReentrantBefore();\r\n        _;\r\n        _nonReentrantAfter();\r\n    }\r\n\r\n    function _nonReentrantBefore() private {\r\n        // On the first call to nonReentrant, _status will be NOT_ENTERED\r\n        if (_status == ENTERED) {\r\n            revert ReentrancyGuardReentrantCall();\r\n        }\r\n\r\n        // Any calls to nonReentrant after this point will fail\r\n        _status = ENTERED;\r\n    }\r\n\r\n    function _nonReentrantAfter() private {\r\n        // By storing the original value once again, a refund is triggered (see\r\n        // https://eips.ethereum.org/EIPS/eip-2200)\r\n        _status = NOT_ENTERED;\r\n    }\r\n\r\n    /**\r\n     * @dev Returns true if the reentrancy guard is currently set to \"entered\", which indicates there is a\r\n     * `nonReentrant` function in the call stack.\r\n     */\r\n    function _reentrancyGuardEntered() internal view returns (bool) {\r\n        return _status == ENTERED;\r\n    }\r\n}\r\n"
      },
      "lib/0xsequence/erc-1155/src/contracts/interfaces/IERC165.sol": {
        "content": "// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\n\r\n\r\n/**\r\n * @title ERC165\r\n * @dev https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md\r\n */\r\ninterface IERC165 {\r\n\r\n    /**\r\n     * @notice Query if a contract implements an interface\r\n     * @dev Interface identification is specified in ERC-165. This function\r\n     * uses less than 30,000 gas\r\n     * @param _interfaceId The interface identifier, as specified in ERC-165\r\n     */\r\n    function supportsInterface(bytes4 _interfaceId)\r\n    external\r\n    view\r\n    returns (bool);\r\n}\r\n"
      }
    },
    "settings": {
      "remappings": [
        "0xsequence/=lib/0xsequence/",
        "@0xsequence/erc-1155/=lib/0xsequence/erc-1155/src/",
        "@0xsequence/erc20-meta-token/=lib/0xsequence/erc20-meta-token/src/",
        "@openzeppelin/=lib/openzeppelin/",
        "@openzeppelin/contracts/=lib/openzeppelin/contracts/",
        "@uniswap/lib/=lib/uniswap-lib/",
        "ds-test/=lib/forge-std/lib/ds-test/src/",
        "forge-std/=lib/forge-std/src/",
        "openzeppelin/=lib/openzeppelin/",
        "uniswap-lib/=lib/uniswap-lib/contracts/"
      ],
      "optimizer": {
        "enabled": true,
        "runs": 200
      },
      "metadata": {
        "bytecodeHash": "ipfs",
        "appendCBOR": true
      },
      "outputSelection": {
        "*": {
          "*": [
            "evm.bytecode",
            "evm.deployedBytecode",
            "devdoc",
            "userdoc",
            "metadata",
            "abi"
          ]
        }
      },
      "evmVersion": "paris",
      "viaIR": true,
      "libraries": {}
    }
  }
}
