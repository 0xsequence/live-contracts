import type { EtherscanVerificationRequest } from '@0xsequence/solidity-deployer'
import { ContractFactory, ethers } from 'ethers'

// https://github.com/0xsequence/marketplace-contracts/blob/f0d352260da928e54406fd41c5821ea644b22de2/contracts/Orderbook.sol

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
        "name": "creator",
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
      '0x6080806040523461001b576001600055611cb290816100218239f35b600080fdfe6040608081526004908136101561001557600080fd5b60009060e08235811c90816311b3a9a1146108ea5781631d7f5dc11461088257816336de9742146108325781633e067814146106795781635778472a146105c65781637489ec23146105a15781639e57f089146104c0578163ab15be1e146103b2578163ca3e7437146102fa578163db7ebd521461023957508063eb6d6208146101d25763edbeb66d146100a857600080fd5b346101ce57806003193601126101ce576001600160401b039280358481116101ca576100d79036908301610a28565b936024359081116101ca576100ee91369101610a28565b8351936101126100fd86610a11565b9561010a855197886109f0565b808752610a11565b602086810191601f190136833761012983516114d6565b94865b845181101561017c57806101586101466101779388610b8f565b51610151838a610b8f565b5190611526565b610162838b610b8f565b5261016d828c610b8f565b9015159052610b6a565b61012c565b508791878792805194818601918652518091526060850195915b8181106101b4578587038487015285806101b08988610b28565b0390f35b8251151587529583019591830191600101610196565b8380fd5b5080fd5b8284346101ce5760803660031901126101ce576001600160401b03906044358281116101ca576102059036908301610a28565b6064359283116101ca5761021f6102329336908401610ac2565b91610228611b14565b6024359035610f21565b6001815580f35b8284346102f3576101203660031901126102f3578151926102598461098f565b610261610a8b565b845260243580151581036102f657602085015260443580151581036102f657848401526001600160a01b039160643583811681036101ce576060860152608435608086015260a43560a086015260c4356001600160601b03811681036101ce5760c086015260e43592831683036102f35750830152610104356101008301526020916102ec906113d7565b9051908152f35b80fd5b8280fd5b9050346102f6576101003660031901126102f65781519361031a856109c1565b3580151581036101ca57845260243580151581036101ca5760208501526001600160a01b0360443581811681036103ae57838601526064356060860152608435608086015260a4356001600160601b03811681036103ae5760a086015260c43590811681036101ca57846001926103a69260c0602098015260e435908201526103a1611b14565b610bcc565b925551908152f35b8480fd5b92919050346101ce57602092836003193601126102f65784356001600160401b0381116101ca576103e69036908701610a28565b936103f185516114d6565b95845b86518110156104ae578061040b6104a99289610b8f565b518752600180855260058789208851926104248461098f565b81549060018060a01b0390818316865260ff60a0938181861c1615158c89015260a81c1615158c8701528301541690606091828601526002830154608086015260038301549085015286820154906001600160601b03821660c08601521c888401520154610100820152610498828b610b8f565b526104a3818a610b8f565b50610b6a565b6103f4565b8451838152806101b08186018b610b28565b505091346101ce5760803660031901126101ce576001600160401b039080358281116101ca576104f39036908301610a28565b6024358381116103ae5761050a9036908401610a28565b9160443584811161059d576105229036908301610a28565b9360643590811161059d5761053a9036908301610ac2565b95610543611b14565b8251845103610590575050835b8151811015610588578061057e878661056c6105839587610b8f565b516105778589610b8f565b5190610f21565b610b6a565b610550565b846001815580f35b516355ca07b760e11b8152fd5b8580fd5b8385346101ce5760203660031901126101ce57610232906105c0611b14565b35611352565b84929150346101ca5760203660031901126101ca579060056106779282610120966105ef611491565b5086358152600160205220908351956106078761098f565b825460ff60018060a01b03918281168a52818160a01c16151560208b015260a81c16151586890152600184015416606088015260028301546080880152600383015460a08801528201546001600160601b03811660c088015260601c908601520154610100840152518092610920565bf35b848385346102f357602092836003193601126101ce578035906001600160401b0382116102f657366023830112156102f6578101356106b781610a11565b956106c4855197886109f0565b81875260248688019260081b840101923684116103ae57602401915b83831061079757505050506106f3611b14565b83519161071761070284610a11565b9361070f835195866109f0565b808552610a11565b83850190601f1901368237825b8651811015610759578061074461073e610754938a610b8f565b51610bcc565b61074e8288610b8f565b52610b6a565b610724565b50918490846001928383558451948186019282875251809352850195925b8281106107845785870386f35b8351875295810195928101928401610777565b610100833603126103ae5785516107ad816109c1565b6107b684610ab5565b81526107c3888501610ab5565b888201526107d2878501610aa1565b87820152606080850135908201526080808501359082015260a080850135906001600160601b038216820361082e5782015261010091889160c0610817878201610aa1565b9082015284860135858201528152019201916106e0565b8780fd5b5050346101ce5760603660031901126101ce576101b090610861610854610a8b565b60443590602435906116b2565b91516001600160a01b03909116815260208101919091529081906040820190565b8385346101ce5760203660031901126101ce578035906001600160401b0382116102f6576108b291369101610a28565b906108bb611b14565b805b82518110156108e2578061057e6108d76108dd9386610b8f565b51611352565b6108bd565b506001815580f35b505090346102f357816003193601126102f35750610677610912610140936024359035611526565b909251921515835260208301905b60018060a01b038082511683526020820151151560208401526040820151151560408401528060608301511660608401526080820151608084015260a082015160a08401526001600160601b0360c08301511660c084015260e08201511660e083015261010080910151910152565b61012081019081106001600160401b038211176109ab57604052565b634e487b7160e01b600052604160045260246000fd5b61010081019081106001600160401b038211176109ab57604052565b6001600160401b0381116109ab57604052565b90601f801991011681019081106001600160401b038211176109ab57604052565b6001600160401b0381116109ab5760051b60200190565b81601f82011215610a8657803591610a3f83610a11565b92610a4d60405194856109f0565b808452602092838086019260051b820101928311610a86578301905b828210610a77575050505090565b81358152908301908301610a69565b600080fd5b600435906001600160a01b0382168203610a8657565b35906001600160a01b0382168203610a8657565b35908115158203610a8657565b81601f82011215610a8657803591610ad983610a11565b92610ae760405194856109f0565b808452602092838086019260051b820101928311610a86578301905b828210610b11575050505090565b838091610b1d84610aa1565b815201910190610b03565b90815180825260208080930193019160005b828110610b48575050505090565b909192938261012082610b5e6001948951610920565b01950193929101610b3a565b6000198114610b795760010190565b634e487b7160e01b600052601160045260246000fd5b8051821015610ba35760209160051b010190565b634e487b7160e01b600052603260045260246000fd5b81810292918115918404141715610b7957565b60808101519060018060a01b036040820151169060e081015115610ef6576001600160601b0360a082015116421015610ee557805115610e315760208101511515610c20606083019185835186339361185c565b15610e0657505b80511515926020820151151560608301519060018060a01b0360c0850151169060e0850151926001600160601b0360a0870151169160405198610c698a61098f565b338a5260208a0152604089015286606089015260808801528360a088015260c087015260e0860152610100850152610ca0846113d7565b6000818152600160205260409020549094906001600160a01b0316610ded57846000526001602052600561010060406000209260018060a01b0381511684549060ff60a01b6020840151151560a01b169060ff60a81b6040850151151560a81b169269ffffffffffffffffffff60b01b1617171784556001840160018060a01b036060830151166001600160601b0360a01b8254161790556080810151600285015560a081015160038501556001600160601b0360c0820151166001600160601b031960e083015160601b161760048501550151910155606082015191805115159160018060a01b0360c083015116906001600160601b0360a060e08501519401511693604051958652602086015260408501526060840152608083015260a0820152827f0d668357479ad55342ec3f5ac644c7593a9ed6cb24b6b47d8a02ea1f716f03a160c03393a490565b604051636b798d5160e11b815260048101869052602490fd5b60849391505160405192633e2c0d9b60e11b8452600484015260248301526044820152336064820152fd5b610e3f60e082015184610bb9565b60c082018051610e5b90339084906001600160a01b031661173e565b15610eb357505060208101511580159081610eaa575b8115610e91575b5015610c27575b60405163524f409b60e01b8152600490fd5b905080610e9f575b38610e78565b506001831415610e99565b84159150610e71565b51604051631184019360e31b81526001600160a01b039091166004820152602481019190915233604482015260649150fd5b60405162d36c8560e81b8152600490fd5b60405162bfc92160e01b8152600490fd5b91908203918211610b7957565b91908201809211610b7957565b9290926000928184526001602052604084209560405196610f418861098f565b600581549160018060a01b0383168a5260ff8360a01c16151560208b015260ff8360a81c16151560408b015260018060a01b0360018201541660608b0152600281015460808b0152600381015460a08b015260048101546001600160601b03811660c08c015260601c60e08b0152015461010089015260018060a01b031615611339578515801561132c575b610e7f5760c08701516001600160601b0316421015610ee55781518451036110f75760a0870151860361130b57828552600160205261102d6040862060056000918281558260018201558260028201558260038201558260048201550155565b60018060a01b03606088015116611049876101008a0151610bb9565b966110598860808b0151846116b2565b9590978a6020810151151597886000146113045781516001600160a01b03169a5b89156112f35733995b82611293575b50505050809881995b87518b1015611111576110a58b89610b8f565b519a6001600160a01b036110b9828d610b8f565b51169182158015611109575b6110f7578c8f9d938c6110de6110f19661057e95610f14565b9f60e060018060a01b0391015116611b37565b99611092565b6040516330fd3c3160e01b8152600490fd5b508c156110c5565b949a92985095509593999197506020820151156000146112815761113a60809361115192610f07565b60e0830151869086906001600160a01b0316611b37565b60408101511561121b57015190863b156101ca57604051637921219560e11b81526001600160a01b0393841660048201529216602483015260448201526064810184905260a0608482015260a48101829052818160c48183895af18015611210576111fc575b5060406003915b838152600160205220015460405192835260208301527fee8994dd528933eef611b5296329e91a2114785c0faa4459e48bce428f6d5a7960403393a4565b61120682916109dd565b6102f357386111b7565b6040513d84823e3d90fd5b015191863b156101ca576040516323b872dd60e01b81526001600160a01b039182166004820152911660248201526044810191909152818160648183895af180156112105791604091600393611272575b506111be565b61127b906109dd565b3861126c565b8092116110f75761115160809261113a565b9c9091929c6000146112cc5790896112af846112c39594610f07565b9d5b60e001516001600160a01b0316611b37565b8a388080611089565b9b50908b81116112e1576112c391898e6112b1565b60405163e0e54ced60e01b8152600490fd5b82516001600160a01b031699611083565b339a61107a565b828552600160205260036040862001611325878254610f07565b905561102d565b5060a08701518611610fcd565b604051636b798d5160e11b815260048101849052602490fd5b600081815260016020526040812080549192916001600160a01b03919082163303611339579060017fa6eb7cdc219e1518ced964e9a34e61d68a94e4f1569db3e84256ba981ba52753920154169282815260016020526113d36040822060056000918281558260018201558260028201558260038201558260048201550155565b80a3565b80519060208101511515916040820151151592606083015192608081015160a082015160c08301519161010060e0850151940151956040519760208901996001600160601b03199788809460601b168c5260f81b60348b015260f81b60358a015260601b166036880152604a870152606a8601526001600160601b0360a01b9060a01b16608a85015260601b16609683015260aa82015260aa815260e081018181106001600160401b038211176109ab5760405251902090565b6040519061149e8261098f565b816101006000918281528260208201528260408201528260608201528260808201528260a08201528260c08201528260e08201520152565b906114e082610a11565b6114ed60405191826109f0565b82815280926114fe601f1991610a11565b019060005b82811061150f57505050565b60209061151a611491565b82828501015201611503565b919091611531611491565b5060005260016020526040600020916040519261154d8461098f565b80549060018060a01b03928383169384875260ff8460a01c1615159485602089015260ff604089019560a81c161515855281600185015416936060890194855260028101549160808a019283526003820154978860a08c015260056004840154938c60c06001600160601b03871691015260e08d019460601c8552015491826101008d01528615611696575b1515988961167f575b89611674575b50886115fb575b50505050505050509190565b90919293949596975060001461163157505081611624955115159451169051918751169361185c565b38808080808080806115ef565b61166f9650839584959361164d61166596949561165a94610bb9565b97889251169051906116b2565b929050511693610f14565b908551169161173e565b611624565b8611159850386115e8565b60c08c01516001600160601b0316421099506115e2565b8996506115d9565b51906001600160a01b0382168203610a8657565b929160446040928351958693849263152a902d60e11b84526004840152602483015260018060a01b03165afa918260009182946116fc575b506116f85750600091508190565b9190565b919093506040823d8211611736575b81611718604093836109f0565b810103126102f35750602061172c8261169e565b91015192386116ea565b3d915061170b565b6040516370a0823160e01b81526001600160a01b03848116600483015291909116926020918281602481885afa8015611808578491600091611814575b501015938461178c575b5050505090565b604051636eb1769f60e11b81526001600160a01b03929092166004830152306024830152929350918190839060449082905afa908115611808576000916117dc575b509050101538808080611785565b82813d8311611801575b6117f081836109f0565b810103126102f357505180386117ce565b503d6117e6565b6040513d6000823e3d90fd5b91508382813d831161183d575b61182b81836109f0565b810103126102f357508390513861177b565b503d611821565b90816020910312610a8657518015158103610a865790565b93919093611a14576040516331a9108f60e11b8152600481018290526000946001600160a01b0390811694602093879385816024818b5afa8991816119d9575b50611965575b50506001149586611956575b50856118bd575b505050505090565b9394509092163014919082156118dc575b5050905038808080806118b5565b60405163e985e9c560e01b81526001600160a01b0391909116600482015230602482015290929091508290829060449082905afa91821561180857600092611929575b50508038806118ce565b6119489250803d1061194f575b61194081836109f0565b810190611844565b388061191f565b503d611936565b819650168584161494386118ae565b60405163020604bf60e21b81526004810192909252975084816024818a5afa600091816119a2575b50611999575b806118a2565b92506001611993565b90918682813d83116119d2575b6119b981836109f0565b810103126102f357506119cb9061169e565b903861198d565b503d6119af565b9091508681813d8311611a0d575b6119f181836109f0565b81010312611a0957611a029061169e565b903861189c565b8980fd5b503d6119e7565b9290918015159384611a8c575b505082611a2d57505090565b60405163e985e9c560e01b81526001600160a01b039283166004820152306024820152925060209183916044918391165afa90811561180857600091611a71575090565b611a89915060203d811161194f5761194081836109f0565b90565b604051627eeac760e11b81526001600160a01b0385166004820152602481019190915291935090602081806044810103816001600160a01b0388165afa90811561180857600091611ae3575b501015913880611a21565b906020823d8211611b0c575b81611afc602093836109f0565b810103126102f357505138611ad8565b3d9150611aef565b600260005414611b25576002600055565b604051633ee5aeb560e01b8152600490fd5b6040516323b872dd60e01b60208083019182526001600160a01b0394851660248401529490931660448201526064808201959095529384529192601f19929190611b826084826109f0565b600092839283809351925af1913d15611c73573d6001600160401b038111611c5f57611bb88560405193601f84011601836109f0565b81528091843d92013e5b81611c2f575b5015611bd15750565b6084906040519062461bcd60e51b82526004820152603160248201527f5472616e7366657248656c7065723a3a7472616e7366657246726f6d3a207472604482015270185b9cd9995c919c9bdb4819985a5b1959607a1b6064820152fd5b80518015925083908315611c47575b50505038611bc8565b611c579350820181019101611844565b388281611c3e565b634e487b7160e01b83526041600452602483fd5b50506060611bc256fea264697066735822122098b3f03e6785e6e7bc143224607b917e3f869b11823b38447ac1d1730d13437464736f6c63430008140033',
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
        "content": "// SPDX-License-Identifier: Apache-2.0\r\npragma solidity 0.8.20;\r\n\r\nimport {IOrderbook} from \"./interfaces/IOrderbook.sol\";\r\nimport {IERC721} from \"./interfaces/IERC721.sol\";\r\nimport {IERC2981} from \"./interfaces/IERC2981.sol\";\r\nimport {IERC20} from \"@0xsequence/erc-1155/contracts/interfaces/IERC20.sol\";\r\nimport {IERC1155} from \"@0xsequence/erc-1155/contracts/interfaces/IERC1155.sol\";\r\nimport {TransferHelper} from \"@uniswap/lib/contracts/libraries/TransferHelper.sol\";\r\nimport {ReentrancyGuard} from \"@openzeppelin/contracts/utils/ReentrancyGuard.sol\";\r\n\r\ncontract Orderbook is IOrderbook, ReentrancyGuard {\r\n  mapping(bytes32 => Order) internal _orders;\r\n\r\n  /**\r\n   * Creates an order.\r\n   * @param request The requested order's details.\r\n   * @return orderId The ID of the order.\r\n   */\r\n  function createOrder(OrderRequest memory request) external nonReentrant returns (bytes32 orderId) {\r\n    return _createOrder(request);\r\n  }\r\n\r\n  /**\r\n   * Creates orders.\r\n   * @param requests The requested orders' details.\r\n   * @return orderIds The IDs of the orders.\r\n   */\r\n  function createOrderBatch(OrderRequest[] memory requests) external nonReentrant returns (bytes32[] memory orderIds) {\r\n    orderIds = new bytes32[](requests.length);\r\n    for (uint256 i; i < requests.length; i++) {\r\n      orderIds[i] = _createOrder(requests[i]);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Performs creation of an order.\r\n   * @param request The requested order's details.\r\n   * @return orderId The ID of the order.\r\n   */\r\n  function _createOrder(OrderRequest memory request) internal returns (bytes32 orderId) {\r\n    uint256 quantity = request.quantity;\r\n    address tokenContract = request.tokenContract;\r\n\r\n    if (request.pricePerToken == 0) {\r\n      revert InvalidPrice();\r\n    }\r\n    // solhint-disable-next-line not-rely-on-time\r\n    if (request.expiry <= block.timestamp) {\r\n      revert InvalidExpiry();\r\n    }\r\n\r\n    if (request.isListing) {\r\n      // Check valid token for listing\r\n      if (!_hasApprovedTokens(request.isERC1155, tokenContract, request.tokenId, quantity, msg.sender)) {\r\n        revert InvalidTokenApproval(tokenContract, request.tokenId, quantity, msg.sender);\r\n      }\r\n    } else {\r\n      // Check approved currency for offer\r\n      uint256 total = quantity * request.pricePerToken;\r\n      if (!_hasApprovedCurrency(request.currency, total, msg.sender)) {\r\n        revert InvalidCurrencyApproval(request.currency, total, msg.sender);\r\n      }\r\n      // Check quantity. Covered by _hasApprovedTokens for listings\r\n      if ((request.isERC1155 && quantity == 0) || (!request.isERC1155 && quantity != 1)) {\r\n        revert InvalidQuantity();\r\n      }\r\n    }\r\n\r\n    Order memory order = Order({\r\n      isListing: request.isListing,\r\n      isERC1155: request.isERC1155,\r\n      creator: msg.sender,\r\n      tokenContract: tokenContract,\r\n      tokenId: request.tokenId,\r\n      quantity: quantity,\r\n      currency: request.currency,\r\n      pricePerToken: request.pricePerToken,\r\n      expiry: request.expiry\r\n    });\r\n    orderId = hashOrder(order);\r\n\r\n    if (_orders[orderId].creator != address(0)) {\r\n      // Collision\r\n      revert InvalidOrderId(orderId);\r\n    }\r\n    _orders[orderId] = order;\r\n\r\n    emit OrderCreated(\r\n      orderId,\r\n      msg.sender,\r\n      tokenContract,\r\n      request.tokenId,\r\n      request.isListing,\r\n      quantity,\r\n      request.currency,\r\n      request.pricePerToken,\r\n      request.expiry\r\n      );\r\n\r\n    return orderId;\r\n  }\r\n\r\n  /**\r\n   * Accepts an order.\r\n   * @param orderId The ID of the order.\r\n   * @param quantity The quantity of tokens to accept.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   */\r\n  function acceptOrder(\r\n    bytes32 orderId,\r\n    uint256 quantity,\r\n    uint256[] memory additionalFees,\r\n    address[] memory additionalFeeReceivers\r\n  )\r\n    external\r\n    nonReentrant\r\n  {\r\n    _acceptOrder(orderId, quantity, additionalFees, additionalFeeReceivers);\r\n  }\r\n\r\n  /**\r\n   * Accepts orders.\r\n   * @param orderIds The IDs of the orders.\r\n   * @param quantities The quantities of tokens to accept.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   * @dev Additional fees are applied to each order.\r\n   */\r\n  function acceptOrderBatch(\r\n    bytes32[] memory orderIds,\r\n    uint256[] memory quantities,\r\n    uint256[] memory additionalFees,\r\n    address[] memory additionalFeeReceivers\r\n  )\r\n    external\r\n    nonReentrant\r\n  {\r\n    if (orderIds.length != quantities.length) {\r\n      revert InvalidBatchRequest();\r\n    }\r\n\r\n    for (uint256 i; i < orderIds.length; i++) {\r\n      _acceptOrder(orderIds[i], quantities[i], additionalFees, additionalFeeReceivers);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Performs acceptance of an order.\r\n   * @param orderId The ID of the order.\r\n   * @param quantity The quantity of tokens to accept.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   */\r\n  function _acceptOrder(\r\n    bytes32 orderId,\r\n    uint256 quantity,\r\n    uint256[] memory additionalFees,\r\n    address[] memory additionalFeeReceivers\r\n  )\r\n    internal\r\n  {\r\n    Order memory order = _orders[orderId];\r\n    if (order.creator == address(0)) {\r\n      // Order cancelled, completed or never existed\r\n      revert InvalidOrderId(orderId);\r\n    }\r\n    if (quantity == 0 || quantity > order.quantity) {\r\n      revert InvalidQuantity();\r\n    }\r\n    if (_isExpired(order)) {\r\n      revert InvalidExpiry();\r\n    }\r\n    if (additionalFees.length != additionalFeeReceivers.length) {\r\n      revert InvalidAdditionalFees();\r\n    }\r\n\r\n    // Update order state\r\n    if (order.quantity == quantity) {\r\n      // Refund some gas\r\n      delete _orders[orderId];\r\n    } else {\r\n      _orders[orderId].quantity -= quantity;\r\n    }\r\n    address tokenContract = order.tokenContract;\r\n\r\n    // Calculate payables\r\n    uint256 remainingCost = order.pricePerToken * quantity;\r\n    (address royaltyRecipient, uint256 royaltyAmount) = getRoyaltyInfo(tokenContract, order.tokenId, remainingCost);\r\n\r\n    address currencyReceiver = order.isListing ? order.creator : msg.sender;\r\n    address tokenReceiver = order.isListing ? msg.sender : order.creator;\r\n\r\n    if (royaltyAmount > 0) {\r\n      if (order.isListing) {\r\n        // Royalties are paid by the maker. This reduces the cost for listings.\r\n        // Underflow prevents fees > cost\r\n        remainingCost -= royaltyAmount;\r\n      } else if (royaltyAmount > remainingCost) {\r\n        // Royalty cannot exceed cost\r\n        revert InvalidRoyalty();\r\n      }\r\n      // Transfer royalties\r\n      TransferHelper.safeTransferFrom(order.currency, tokenReceiver, royaltyRecipient, royaltyAmount);\r\n    }\r\n\r\n    // Transfer additional fees\r\n    uint256 totalFees;\r\n    for (uint256 i; i < additionalFees.length; i++) {\r\n      uint256 fee = additionalFees[i];\r\n      address feeReceiver = additionalFeeReceivers[i];\r\n      if (feeReceiver == address(0) || fee == 0) {\r\n        revert InvalidAdditionalFees();\r\n      }\r\n      totalFees += fee;\r\n      TransferHelper.safeTransferFrom(order.currency, tokenReceiver, feeReceiver, fee);\r\n    }\r\n    if (!order.isListing) {\r\n      // Fees are paid by the taker. This reduces the cost for offers.\r\n      // Underflow prevents fees > cost\r\n      remainingCost -= totalFees;\r\n    } else if (totalFees > remainingCost) {\r\n      // Fees cannot exceed cost - royalties\r\n      revert InvalidAdditionalFees();\r\n    }\r\n\r\n    // Transfer currency\r\n    TransferHelper.safeTransferFrom(order.currency, tokenReceiver, currencyReceiver, remainingCost);\r\n\r\n    // Transfer token\r\n    if (order.isERC1155) {\r\n      IERC1155(tokenContract).safeTransferFrom(currencyReceiver, tokenReceiver, order.tokenId, quantity, \"\");\r\n    } else {\r\n      IERC721(tokenContract).transferFrom(currencyReceiver, tokenReceiver, order.tokenId);\r\n    }\r\n\r\n    emit OrderAccepted(orderId, msg.sender, tokenContract, quantity, _orders[orderId].quantity);\r\n  }\r\n\r\n  /**\r\n   * Cancels an order.\r\n   * @param orderId The ID of the order.\r\n   */\r\n  function cancelOrder(bytes32 orderId) external nonReentrant {\r\n    _cancelOrder(orderId);\r\n  }\r\n\r\n  /**\r\n   * Cancels orders.\r\n   * @param orderIds The IDs of the orders.\r\n   */\r\n  function cancelOrderBatch(bytes32[] memory orderIds) external nonReentrant {\r\n    for (uint256 i; i < orderIds.length; i++) {\r\n      _cancelOrder(orderIds[i]);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Performs cancellation of an order.\r\n   * @param orderId The ID of the order.\r\n   */\r\n  function _cancelOrder(bytes32 orderId) internal {\r\n    Order storage order = _orders[orderId];\r\n    if (order.creator != msg.sender) {\r\n      revert InvalidOrderId(orderId);\r\n    }\r\n    address tokenContract = order.tokenContract;\r\n\r\n    // Refund some gas\r\n    delete _orders[orderId];\r\n\r\n    emit OrderCancelled(orderId, tokenContract);\r\n  }\r\n\r\n  /**\r\n   * Deterministically create the orderId for the given order.\r\n   * @param order The order.\r\n   * @return orderId The ID of the order.\r\n   */\r\n  function hashOrder(Order memory order) public pure returns (bytes32 orderId) {\r\n    return keccak256(\r\n      abi.encodePacked(\r\n        order.creator,\r\n        order.isListing,\r\n        order.isERC1155,\r\n        order.tokenContract,\r\n        order.tokenId,\r\n        order.quantity,\r\n        order.expiry,\r\n        order.currency,\r\n        order.pricePerToken\r\n      )\r\n    );\r\n  }\r\n\r\n  /**\r\n   * Gets an order.\r\n   * @param orderId The ID of the order.\r\n   * @return order The order.\r\n   */\r\n  function getOrder(bytes32 orderId) external view returns (Order memory order) {\r\n    return _orders[orderId];\r\n  }\r\n\r\n  /**\r\n   * Gets orders.\r\n   * @param orderIds The IDs of the orders.\r\n   * @return orders The orders.\r\n   */\r\n  function getOrderBatch(bytes32[] memory orderIds) external view returns (Order[] memory orders) {\r\n    orders = new Order[](orderIds.length);\r\n    for (uint256 i; i < orderIds.length; i++) {\r\n      orders[i] = _orders[orderIds[i]];\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Checks if an order is valid.\r\n   * @param orderId The ID of the order.\r\n   * @param quantity The amount of tokens to exchange. 0 is assumed to be the order's available quantity.\r\n   * @return valid The validity of the order.\r\n   * @return order The order.\r\n   * @notice An order is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\r\n   */\r\n  function isOrderValid(bytes32 orderId, uint256 quantity) public view returns (bool valid, Order memory order) {\r\n    order = _orders[orderId];\r\n    if (quantity == 0) {\r\n      // 0 is assumed to be max quantity\r\n      quantity = order.quantity;\r\n    }\r\n    valid = order.creator != address(0) && !_isExpired(order) && quantity <= order.quantity;\r\n    if (valid) {\r\n      if (order.isListing) {\r\n        valid = _hasApprovedTokens(order.isERC1155, order.tokenContract, order.tokenId, quantity, order.creator);\r\n      } else {\r\n        // Add royalty\r\n        uint256 cost = order.pricePerToken * quantity;\r\n        (, uint256 royaltyAmount) = getRoyaltyInfo(order.tokenContract, order.tokenId, cost);\r\n        valid = _hasApprovedCurrency(order.currency, cost + royaltyAmount, order.creator);\r\n      }\r\n    }\r\n    return (valid, order);\r\n  }\r\n\r\n  /**\r\n   * Checks if orders are valid.\r\n   * @param orderIds The IDs of the orders.\r\n   * @param quantities The amount of tokens to exchange per order. 0 is assumed to be the order's available quantity.\r\n   * @return valid The validities of the orders.\r\n   * @return orders The orders.\r\n   * @notice An order is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\r\n   */\r\n  function isOrderValidBatch(bytes32[] memory orderIds, uint256[] memory quantities)\r\n    external\r\n    view\r\n    returns (bool[] memory valid, Order[] memory orders)\r\n  {\r\n    valid = new bool[](orderIds.length);\r\n    orders = new Order[](orderIds.length);\r\n    for (uint256 i; i < orderIds.length; i++) {\r\n      (valid[i], orders[i]) = isOrderValid(orderIds[i], quantities[i]);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Checks if a order has expired.\r\n   * @param order The order to check.\r\n   * @return isExpired True if the order has expired.\r\n   */\r\n  function _isExpired(Order memory order) internal view returns (bool isExpired) {\r\n    // solhint-disable-next-line not-rely-on-time\r\n    return order.expiry <= block.timestamp;\r\n  }\r\n\r\n  /**\r\n   * Will return how much of currency need to be paid for the royalty.\r\n   * @param tokenContract Address of the erc-1155 token being traded\r\n   * @param tokenId ID of the erc-1155 token being traded\r\n   * @param cost Amount of currency sent/received for the trade\r\n   * @return recipient Address that will be able to claim the royalty\r\n   * @return royalty Amount of currency that will be sent to royalty recipient\r\n   */\r\n  function getRoyaltyInfo(address tokenContract, uint256 tokenId, uint256 cost)\r\n    public\r\n    view\r\n    returns (address recipient, uint256 royalty)\r\n  {\r\n    try IERC2981(address(tokenContract)).royaltyInfo(tokenId, cost) returns (address _r, uint256 _c) {\r\n      return (_r, _c);\r\n    } catch {} // solhint-disable-line no-empty-blocks\r\n    return (address(0), 0);\r\n  }\r\n\r\n  /**\r\n   * Checks if the amount of currency is approved for transfer exceeds the given amount.\r\n   * @param currency The address of the currency.\r\n   * @param amount The amount of currency.\r\n   * @param owner The address of the owner of the currency.\r\n   * @return isValid True if the amount of currency is sufficient and approved for transfer.\r\n   */\r\n  function _hasApprovedCurrency(address currency, uint256 amount, address owner) internal view returns (bool isValid) {\r\n    return IERC20(currency).balanceOf(owner) >= amount && IERC20(currency).allowance(owner, address(this)) >= amount;\r\n  }\r\n\r\n  /**\r\n   * Checks if a token contract is ERC1155 or ERC721 and if the token is owned and approved for transfer.\r\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\r\n   * @param tokenContract The address of the token contract.\r\n   * @param tokenId The ID of the token.\r\n   * @param quantity The quantity of tokens to list.\r\n   * @param owner The address of the owner of the token.\r\n   * @return isValid True if the token is owned and approved for transfer.\r\n   * @dev Returns false if the token contract is not ERC1155 or ERC721.\r\n   */\r\n  function _hasApprovedTokens(bool isERC1155, address tokenContract, uint256 tokenId, uint256 quantity, address owner)\r\n    internal\r\n    view\r\n    returns (bool isValid)\r\n  {\r\n    address orderbook = address(this);\r\n\r\n    if (isERC1155) {\r\n      // ERC1155\r\n      return quantity > 0 && IERC1155(tokenContract).balanceOf(owner, tokenId) >= quantity\r\n        && IERC1155(tokenContract).isApprovedForAll(owner, orderbook);\r\n    }\r\n\r\n    // ERC721\r\n    address tokenOwner;\r\n    address operator;\r\n\r\n    try IERC721(tokenContract).ownerOf(tokenId) returns (address _tokenOwner) {\r\n      tokenOwner = _tokenOwner;\r\n\r\n      try IERC721(tokenContract).getApproved(tokenId) returns (address _operator) {\r\n        operator = _operator;\r\n      } catch {} // solhint-disable-line no-empty-blocks\r\n    } catch {} // solhint-disable-line no-empty-blocks\r\n\r\n    return quantity == 1 && owner == tokenOwner\r\n      && (operator == orderbook || IERC721(tokenContract).isApprovedForAll(owner, orderbook));\r\n  }\r\n}\r\n"
      },
      "contracts/interfaces/IERC2981.sol": {
        "content": "// SPDX-License-Identifier: Apache-2.0\r\npragma solidity 0.8.20;\r\n\r\nimport {IERC165} from \"@0xsequence/erc-1155/contracts/interfaces/IERC165.sol\";\r\n\r\n/**\r\n * @dev Interface for the NFT Royalty Standard\r\n */\r\ninterface IERC2981 is IERC165 {\r\n  /**\r\n   * @notice Called with the sale price to determine how much royalty\r\n   * is owed and to whom.\r\n   * @param _tokenId - the NFT asset queried for royalty information\r\n   * @param _salePrice - the sale price of the NFT asset specified by _tokenId\r\n   * @return receiver - address of who should be sent the royalty payment\r\n   * @return royaltyAmount - the royalty payment amount for _salePrice\r\n   */\r\n  function royaltyInfo(uint256 _tokenId, uint256 _salePrice)\r\n    external\r\n    view\r\n    returns (address receiver, uint256 royaltyAmount);\r\n}\r\n"
      },
      "contracts/interfaces/IERC721.sol": {
        "content": "// SPDX-License-Identifier: Apache-2.0\r\npragma solidity 0.8.20;\r\n\r\ninterface IERC721 {\r\n  event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\r\n  event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);\r\n  event ApprovalForAll(address indexed owner, address indexed operator, bool approved);\r\n\r\n  function balanceOf(address _owner) external view returns (uint256 balance);\r\n  function ownerOf(uint256 _tokenId) external view returns (address owner);\r\n  function safeTransferFrom(address _from, address _to, uint256 _tokenId) external;\r\n  function transferFrom(address _from, address _to, uint256 _tokenId) external;\r\n  function approve(address _to, uint256 _tokenId) external;\r\n  function getApproved(uint256 _tokenId) external view returns (address operator);\r\n  function setApprovalForAll(address _operator, bool _approved) external;\r\n  function isApprovedForAll(address _owner, address _operator) external view returns (bool);\r\n  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata _data) external;\r\n}\r\n"
      },
      "contracts/interfaces/IOrderbook.sol": {
        "content": "// SPDX-License-Identifier: Apache-2.0\r\npragma solidity 0.8.20;\r\n\r\ninterface IOrderbookStorage {\r\n  /**\r\n   * Order request parameters.\r\n   * @param isListing True if the order is a listing, false if it is an offer.\r\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\r\n   * @param tokenContract The address of the token contract.\r\n   * @param tokenId The ID of the token.\r\n   * @param quantity The quantity of tokens.\r\n   * @param expiry The expiry of the order.\r\n   * @param currency The address of the currency.\r\n   * @param pricePerToken The price per token, including royalty fees.\r\n   */\r\n  struct OrderRequest {\r\n    bool isListing; // True if the order is a listing, false if it is an offer.\r\n    bool isERC1155; // True if the token is an ERC1155 token, false if it is an ERC721 token.\r\n    address tokenContract;\r\n    uint256 tokenId;\r\n    uint256 quantity;\r\n    uint96 expiry;\r\n    address currency;\r\n    uint256 pricePerToken;\r\n  }\r\n\r\n  /**\r\n   * Order parameters.\r\n   * @param creator The address of the order creator.\r\n   * @param isListing True if the order is a listing, false if it is an offer.\r\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\r\n   * @param tokenContract The address of the token contract.\r\n   * @param tokenId The ID of the token.\r\n   * @param quantity The quantity of tokens.\r\n   * @param expiry The expiry of the order.\r\n   * @param currency The address of the currency.\r\n   * @param pricePerToken The price per token, including royalty fees.\r\n   */\r\n  struct Order {\r\n    address creator;\r\n    bool isListing;\r\n    bool isERC1155;\r\n    address tokenContract;\r\n    uint256 tokenId;\r\n    uint256 quantity;\r\n    uint96 expiry;\r\n    address currency;\r\n    uint256 pricePerToken;\r\n  }\r\n}\r\n\r\ninterface IOrderbookFunctions is IOrderbookStorage {\r\n  /**\r\n   * Creates an order.\r\n   * @param request The requested order's details.\r\n   * @return orderId The ID of the order.\r\n   * @notice A listing is when the maker is selling tokens for currency.\r\n   * @notice An offer is when the maker is buying tokens with currency.\r\n   */\r\n  function createOrder(OrderRequest memory request) external returns (bytes32 orderId);\r\n\r\n  /**\r\n   * Creates orders.\r\n   * @param requests The requested orders' details.\r\n   * @return orderIds The IDs of the orders.\r\n   */\r\n  function createOrderBatch(OrderRequest[] memory requests) external returns (bytes32[] memory orderIds);\r\n\r\n  /**\r\n   * Accepts an order.\r\n   * @param orderId The ID of the order.\r\n   * @param quantity The quantity of tokens to accept.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   */\r\n  function acceptOrder(\r\n    bytes32 orderId,\r\n    uint256 quantity,\r\n    uint256[] memory additionalFees,\r\n    address[] memory additionalFeeReceivers\r\n  )\r\n    external;\r\n\r\n  /**\r\n   * Accepts orders.\r\n   * @param orderIds The IDs of the orders.\r\n   * @param quantities The quantities of tokens to accept.\r\n   * @param additionalFees The additional fees to pay.\r\n   * @param additionalFeeReceivers The addresses to send the additional fees to.\r\n   */\r\n  function acceptOrderBatch(\r\n    bytes32[] memory orderIds,\r\n    uint256[] memory quantities,\r\n    uint256[] memory additionalFees,\r\n    address[] memory additionalFeeReceivers\r\n  )\r\n    external;\r\n\r\n  /**\r\n   * Cancels an order.\r\n   * @param orderId The ID of the order.\r\n   */\r\n  function cancelOrder(bytes32 orderId) external;\r\n\r\n  /**\r\n   * Cancels orders.\r\n   * @param orderIds The IDs of the orders.\r\n   */\r\n  function cancelOrderBatch(bytes32[] memory orderIds) external;\r\n\r\n  /**\r\n   * Gets an order.\r\n   * @param orderId The ID of the order.\r\n   * @return order The order.\r\n   */\r\n  function getOrder(bytes32 orderId) external view returns (Order memory order);\r\n\r\n  /**\r\n   * Gets orders.\r\n   * @param orderIds The IDs of the orders.\r\n   * @return orders The orders.\r\n   */\r\n  function getOrderBatch(bytes32[] memory orderIds) external view returns (Order[] memory orders);\r\n\r\n  /**\r\n   * Checks if an order is valid.\r\n   * @param orderId The ID of the order.\r\n   * @param quantity The amount of tokens to exchange. 0 is assumed to be the order's available quantity.\r\n   * @return valid The validity of the order.\r\n   * @return order The order.\r\n   * @notice An order is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\r\n   */\r\n  function isOrderValid(bytes32 orderId, uint256 quantity) external view returns (bool valid, Order memory order);\r\n\r\n  /**\r\n   * Checks if orders are valid.\r\n   * @param orderIds The IDs of the orders.\r\n   * @param quantities The amount of tokens to exchange per order. 0 is assumed to be the order's available quantity.\r\n   * @return valid The validities of the orders.\r\n   * @return orders The orders.\r\n   * @notice An order is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\r\n   */\r\n  function isOrderValidBatch(bytes32[] memory orderIds, uint256[] memory quantities)\r\n    external\r\n    view\r\n    returns (bool[] memory valid, Order[] memory orders);\r\n}\r\n\r\ninterface IOrderbookSignals {\r\n  //\r\n  // Events\r\n  //\r\n\r\n  /// Emitted when an Order is created.\r\n  event OrderCreated(\r\n    bytes32 indexed orderId,\r\n    address indexed creator,\r\n    address indexed tokenContract,\r\n    uint256 tokenId,\r\n    bool isListing,\r\n    uint256 quantity,\r\n    address currency,\r\n    uint256 pricePerToken,\r\n    uint256 expiry\r\n  );\r\n\r\n  /// Emitted when an Order is accepted.\r\n  event OrderAccepted(\r\n    bytes32 indexed orderId,\r\n    address indexed buyer,\r\n    address indexed tokenContract,\r\n    uint256 quantity,\r\n    uint256 quantityRemaining\r\n  );\r\n\r\n  /// Emitted when an Order is cancelled.\r\n  event OrderCancelled(bytes32 indexed orderId, address indexed tokenContract);\r\n\r\n  //\r\n  // Errors\r\n  //\r\n\r\n  /// Thrown when the token approval is invalid.\r\n  error InvalidTokenApproval(address tokenContract, uint256 tokenId, uint256 quantity, address owner);\r\n\r\n  /// Thrown when the currency approval is invalid.\r\n  error InvalidCurrencyApproval(address currency, uint256 quantity, address owner);\r\n\r\n  /// Thrown when order id is invalid.\r\n  error InvalidOrderId(bytes32 orderId);\r\n\r\n  /// Thrown when the parameters of a batch accept request are invalid.\r\n  error InvalidBatchRequest();\r\n\r\n  /// Thrown when quantity is invalid.\r\n  error InvalidQuantity();\r\n\r\n  /// Thrown when price is invalid.\r\n  error InvalidPrice();\r\n\r\n  /// Thrown when royalty is invalid.\r\n  error InvalidRoyalty();\r\n\r\n  /// Thrown when expiry is invalid.\r\n  error InvalidExpiry();\r\n\r\n  /// Thrown when the additional fees are invalid.\r\n  error InvalidAdditionalFees();\r\n}\r\n\r\n// solhint-disable-next-line no-empty-blocks\r\ninterface IOrderbook is IOrderbookFunctions, IOrderbookSignals {}\r\n"
      },
      "lib/0xsequence/erc-1155/src/contracts/interfaces/IERC1155.sol": {
        "content": "// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\nimport './IERC165.sol';\r\n\r\n\r\ninterface IERC1155 is IERC165 {\r\n\r\n  /****************************************|\r\n  |                 Events                 |\r\n  |_______________________________________*/\r\n\r\n  /**\r\n   * @dev Either TransferSingle or TransferBatch MUST emit when tokens are transferred, including zero amount transfers as well as minting or burning\r\n   *   Operator MUST be msg.sender\r\n   *   When minting/creating tokens, the `_from` field MUST be set to `0x0`\r\n   *   When burning/destroying tokens, the `_to` field MUST be set to `0x0`\r\n   *   The total amount transferred from address 0x0 minus the total amount transferred to 0x0 may be used by clients and exchanges to be added to the \"circulating supply\" for a given token ID\r\n   *   To broadcast the existence of a token ID with no initial balance, the contract SHOULD emit the TransferSingle event from `0x0` to `0x0`, with the token creator as `_operator`, and a `_amount` of 0\r\n   */\r\n  event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _amount);\r\n\r\n  /**\r\n   * @dev Either TransferSingle or TransferBatch MUST emit when tokens are transferred, including zero amount transfers as well as minting or burning\r\n   *   Operator MUST be msg.sender\r\n   *   When minting/creating tokens, the `_from` field MUST be set to `0x0`\r\n   *   When burning/destroying tokens, the `_to` field MUST be set to `0x0`\r\n   *   The total amount transferred from address 0x0 minus the total amount transferred to 0x0 may be used by clients and exchanges to be added to the \"circulating supply\" for a given token ID\r\n   *   To broadcast the existence of multiple token IDs with no initial balance, this SHOULD emit the TransferBatch event from `0x0` to `0x0`, with the token creator as `_operator`, and a `_amount` of 0\r\n   */\r\n  event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _amounts);\r\n\r\n  /**\r\n   * @dev MUST emit when an approval is updated\r\n   */\r\n  event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);\r\n\r\n\r\n  /****************************************|\r\n  |                Functions               |\r\n  |_______________________________________*/\r\n\r\n  /**\r\n    * @notice Transfers amount of an _id from the _from address to the _to address specified\r\n    * @dev MUST emit TransferSingle event on success\r\n    * Caller must be approved to manage the _from account's tokens (see isApprovedForAll)\r\n    * MUST throw if `_to` is the zero address\r\n    * MUST throw if balance of sender for token `_id` is lower than the `_amount` sent\r\n    * MUST throw on any other error\r\n    * When transfer is complete, this function MUST check if `_to` is a smart contract (code size > 0). If so, it MUST call `onERC1155Received` on `_to` and revert if the return amount is not `bytes4(keccak256(\"onERC1155Received(address,address,uint256,uint256,bytes)\"))`\r\n    * @param _from    Source address\r\n    * @param _to      Target address\r\n    * @param _id      ID of the token type\r\n    * @param _amount  Transfered amount\r\n    * @param _data    Additional data with no specified format, sent in call to `_to`\r\n    */\r\n  function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _amount, bytes calldata _data) external;\r\n\r\n  /**\r\n    * @notice Send multiple types of Tokens from the _from address to the _to address (with safety call)\r\n    * @dev MUST emit TransferBatch event on success\r\n    * Caller must be approved to manage the _from account's tokens (see isApprovedForAll)\r\n    * MUST throw if `_to` is the zero address\r\n    * MUST throw if length of `_ids` is not the same as length of `_amounts`\r\n    * MUST throw if any of the balance of sender for token `_ids` is lower than the respective `_amounts` sent\r\n    * MUST throw on any other error\r\n    * When transfer is complete, this function MUST check if `_to` is a smart contract (code size > 0). If so, it MUST call `onERC1155BatchReceived` on `_to` and revert if the return amount is not `bytes4(keccak256(\"onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)\"))`\r\n    * Transfers and events MUST occur in the array order they were submitted (_ids[0] before _ids[1], etc)\r\n    * @param _from     Source addresses\r\n    * @param _to       Target addresses\r\n    * @param _ids      IDs of each token type\r\n    * @param _amounts  Transfer amounts per token type\r\n    * @param _data     Additional data with no specified format, sent in call to `_to`\r\n  */\r\n  function safeBatchTransferFrom(address _from, address _to, uint256[] calldata _ids, uint256[] calldata _amounts, bytes calldata _data) external;\r\n\r\n  /**\r\n   * @notice Get the balance of an account's Tokens\r\n   * @param _owner  The address of the token holder\r\n   * @param _id     ID of the Token\r\n   * @return        The _owner's balance of the Token type requested\r\n   */\r\n  function balanceOf(address _owner, uint256 _id) external view returns (uint256);\r\n\r\n  /**\r\n   * @notice Get the balance of multiple account/token pairs\r\n   * @param _owners The addresses of the token holders\r\n   * @param _ids    ID of the Tokens\r\n   * @return        The _owner's balance of the Token types requested (i.e. balance for each (owner, id) pair)\r\n   */\r\n  function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory);\r\n\r\n  /**\r\n   * @notice Enable or disable approval for a third party (\"operator\") to manage all of caller's tokens\r\n   * @dev MUST emit the ApprovalForAll event on success\r\n   * @param _operator  Address to add to the set of authorized operators\r\n   * @param _approved  True if the operator is approved, false to revoke approval\r\n   */\r\n  function setApprovalForAll(address _operator, bool _approved) external;\r\n\r\n  /**\r\n   * @notice Queries the approval status of an operator for a given owner\r\n   * @param _owner     The owner of the Tokens\r\n   * @param _operator  Address of authorized operator\r\n   * @return isOperator True if the operator is approved, false if not\r\n   */\r\n  function isApprovedForAll(address _owner, address _operator) external view returns (bool isOperator);\r\n}\r\n"
      },
      "lib/0xsequence/erc-1155/src/contracts/interfaces/IERC165.sol": {
        "content": "// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\n\r\n\r\n/**\r\n * @title ERC165\r\n * @dev https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md\r\n */\r\ninterface IERC165 {\r\n\r\n    /**\r\n     * @notice Query if a contract implements an interface\r\n     * @dev Interface identification is specified in ERC-165. This function\r\n     * uses less than 30,000 gas\r\n     * @param _interfaceId The interface identifier, as specified in ERC-165\r\n     */\r\n    function supportsInterface(bytes4 _interfaceId)\r\n    external\r\n    view\r\n    returns (bool);\r\n}\r\n"
      },
      "lib/0xsequence/erc-1155/src/contracts/interfaces/IERC20.sol": {
        "content": "// SPDX-License-Identifier: Apache-2.0\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @title ERC20 interface\r\n * @dev see https://eips.ethereum.org/EIPS/eip-20\r\n */\r\ninterface IERC20 {\r\n  function transfer(address to, uint256 value) external returns (bool);\r\n  function approve(address spender, uint256 value) external returns (bool);\r\n  function transferFrom(address from, address to, uint256 value) external returns (bool);\r\n  function totalSupply() external view returns (uint256);\r\n  function balanceOf(address who) external view returns (uint256);\r\n  function allowance(address owner, address spender) external view returns (uint256);\r\n  event Transfer(address indexed from, address indexed to, uint256 value);\r\n  event Approval(address indexed owner, address indexed spender, uint256 value);\r\n}\r\n"
      },
      "lib/openzeppelin/contracts/utils/ReentrancyGuard.sol": {
        "content": "// SPDX-License-Identifier: MIT\r\n// OpenZeppelin Contracts (last updated v4.9.0) (security/ReentrancyGuard.sol)\r\n\r\npragma solidity ^0.8.20;\r\n\r\n/**\r\n * @dev Contract module that helps prevent reentrant calls to a function.\r\n *\r\n * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier\r\n * available, which can be applied to functions to make sure there are no nested\r\n * (reentrant) calls to them.\r\n *\r\n * Note that because there is a single `nonReentrant` guard, functions marked as\r\n * `nonReentrant` may not call one another. This can be worked around by making\r\n * those functions `private`, and then adding `external` `nonReentrant` entry\r\n * points to them.\r\n *\r\n * TIP: If you would like to learn more about reentrancy and alternative ways\r\n * to protect against it, check out our blog post\r\n * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].\r\n */\r\nabstract contract ReentrancyGuard {\r\n    // Booleans are more expensive than uint256 or any type that takes up a full\r\n    // word because each write operation emits an extra SLOAD to first read the\r\n    // slot's contents, replace the bits taken up by the boolean, and then write\r\n    // back. This is the compiler's defense against contract upgrades and\r\n    // pointer aliasing, and it cannot be disabled.\r\n\r\n    // The values being non-zero value makes deployment a bit more expensive,\r\n    // but in exchange the refund on every call to nonReentrant will be lower in\r\n    // amount. Since refunds are capped to a percentage of the total\r\n    // transaction's gas, it is best to keep them low in cases like this one, to\r\n    // increase the likelihood of the full refund coming into effect.\r\n    uint256 private constant NOT_ENTERED = 1;\r\n    uint256 private constant ENTERED = 2;\r\n\r\n    uint256 private _status;\r\n\r\n    /**\r\n     * @dev Unauthorized reentrant call.\r\n     */\r\n    error ReentrancyGuardReentrantCall();\r\n\r\n    constructor() {\r\n        _status = NOT_ENTERED;\r\n    }\r\n\r\n    /**\r\n     * @dev Prevents a contract from calling itself, directly or indirectly.\r\n     * Calling a `nonReentrant` function from another `nonReentrant`\r\n     * function is not supported. It is possible to prevent this from happening\r\n     * by making the `nonReentrant` function external, and making it call a\r\n     * `private` function that does the actual work.\r\n     */\r\n    modifier nonReentrant() {\r\n        _nonReentrantBefore();\r\n        _;\r\n        _nonReentrantAfter();\r\n    }\r\n\r\n    function _nonReentrantBefore() private {\r\n        // On the first call to nonReentrant, _status will be NOT_ENTERED\r\n        if (_status == ENTERED) {\r\n            revert ReentrancyGuardReentrantCall();\r\n        }\r\n\r\n        // Any calls to nonReentrant after this point will fail\r\n        _status = ENTERED;\r\n    }\r\n\r\n    function _nonReentrantAfter() private {\r\n        // By storing the original value once again, a refund is triggered (see\r\n        // https://eips.ethereum.org/EIPS/eip-2200)\r\n        _status = NOT_ENTERED;\r\n    }\r\n\r\n    /**\r\n     * @dev Returns true if the reentrancy guard is currently set to \"entered\", which indicates there is a\r\n     * `nonReentrant` function in the call stack.\r\n     */\r\n    function _reentrancyGuardEntered() internal view returns (bool) {\r\n        return _status == ENTERED;\r\n    }\r\n}\r\n"
      },
      "lib/uniswap-lib/contracts/libraries/TransferHelper.sol": {
        "content": "// SPDX-License-Identifier: GPL-3.0-or-later\r\n\r\npragma solidity >=0.6.0;\r\n\r\n// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false\r\nlibrary TransferHelper {\r\n    function safeApprove(\r\n        address token,\r\n        address to,\r\n        uint256 value\r\n    ) internal {\r\n        // bytes4(keccak256(bytes('approve(address,uint256)')));\r\n        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));\r\n        require(\r\n            success && (data.length == 0 || abi.decode(data, (bool))),\r\n            'TransferHelper::safeApprove: approve failed'\r\n        );\r\n    }\r\n\r\n    function safeTransfer(\r\n        address token,\r\n        address to,\r\n        uint256 value\r\n    ) internal {\r\n        // bytes4(keccak256(bytes('transfer(address,uint256)')));\r\n        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));\r\n        require(\r\n            success && (data.length == 0 || abi.decode(data, (bool))),\r\n            'TransferHelper::safeTransfer: transfer failed'\r\n        );\r\n    }\r\n\r\n    function safeTransferFrom(\r\n        address token,\r\n        address from,\r\n        address to,\r\n        uint256 value\r\n    ) internal {\r\n        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));\r\n        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));\r\n        require(\r\n            success && (data.length == 0 || abi.decode(data, (bool))),\r\n            'TransferHelper::transferFrom: transferFrom failed'\r\n        );\r\n    }\r\n\r\n    function safeTransferETH(address to, uint256 value) internal {\r\n        (bool success, ) = to.call{value: value}(new bytes(0));\r\n        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');\r\n    }\r\n}\r\n"
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
