export const MAIN_MODULE_UPGRADABLE_DUO_V2 = {
    "_format": "hh-sol-artifact-1",
    "contractName": "MainModuleUpgradableDuo",
    "sourceName": "contracts/modules/MainModuleUpgradableDuo.sol",
    "abi": [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_space",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_provided",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_current",
            "type": "uint256"
          }
        ],
        "name": "BadNonce",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_code",
            "type": "bytes"
          }
        ],
        "name": "CreateFailed",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "EmptySignature",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "ExternalImageHashIsZero",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "_signature",
            "type": "bytes4"
          }
        ],
        "name": "HookAlreadyExists",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "_signature",
            "type": "bytes4"
          }
        ],
        "name": "HookDoesNotExist",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "ImageHashIsZero",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_implementation",
            "type": "address"
          }
        ],
        "name": "InvalidImplementation",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_hash",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "_addr",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "InvalidNestedSignature",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          },
          {
            "internalType": "bytes32",
            "name": "_s",
            "type": "bytes32"
          }
        ],
        "name": "InvalidSValue",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_hash",
            "type": "bytes32"
          },
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "InvalidSignature",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_flag",
            "type": "uint256"
          }
        ],
        "name": "InvalidSignatureFlag",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "InvalidSignatureLength",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes1",
            "name": "_type",
            "type": "bytes1"
          }
        ],
        "name": "InvalidSignatureType",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "_v",
            "type": "uint256"
          }
        ],
        "name": "InvalidVValue",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "threshold",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_weight",
            "type": "uint256"
          }
        ],
        "name": "LowWeightChainedSignature",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_requested",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_available",
            "type": "uint256"
          }
        ],
        "name": "NotEnoughGas",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "OnlyDelegatecall",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_self",
            "type": "address"
          }
        ],
        "name": "OnlySelfAuth",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "SignerIsAddress0",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "_type",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "_recoverMode",
            "type": "bool"
          }
        ],
        "name": "UnsupportedSignatureType",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_current",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_prev",
            "type": "uint256"
          }
        ],
        "name": "WrongChainedCheckpointOrder",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "_contract",
            "type": "address"
          }
        ],
        "name": "CreatedContract",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "bytes4",
            "name": "_signature",
            "type": "bytes4"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "_implementation",
            "type": "address"
          }
        ],
        "name": "DefinedHook",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "bytes32",
            "name": "newExternalImageHash",
            "type": "bytes32"
          }
        ],
        "name": "ExternalImageHashUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "bytes32",
            "name": "_hash",
            "type": "bytes32"
          }
        ],
        "name": "IPFSRootUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "bytes32",
            "name": "newImageHash",
            "type": "bytes32"
          }
        ],
        "name": "ImageHashUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "newImplementation",
            "type": "address"
          }
        ],
        "name": "ImplementationUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "_space",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "_newNonce",
            "type": "uint256"
          }
        ],
        "name": "NonceChange",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "_tx",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "TxExecuted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "_tx",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "bytes",
            "name": "_reason",
            "type": "bytes"
          }
        ],
        "name": "TxFailed",
        "type": "event"
      },
      {
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "inputs": [],
        "name": "SET_IMAGE_HASH_TYPE_HASH",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "_signature",
            "type": "bytes4"
          },
          {
            "internalType": "address",
            "name": "_implementation",
            "type": "address"
          }
        ],
        "name": "addHook",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_code",
            "type": "bytes"
          }
        ],
        "name": "createContract",
        "outputs": [
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "internalType": "bool",
                "name": "delegateCall",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "revertOnError",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "gasLimit",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "target",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              }
            ],
            "internalType": "struct IModuleCalls.Transaction[]",
            "name": "_txs",
            "type": "tuple[]"
          },
          {
            "internalType": "uint256",
            "name": "_nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "execute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "externalImageHash",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "imageHash",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ipfsRoot",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ipfsRootBytes32",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_hash",
            "type": "bytes32"
          },
          {
            "internalType": "bytes",
            "name": "_signatures",
            "type": "bytes"
          }
        ],
        "name": "isValidSignature",
        "outputs": [
          {
            "internalType": "bytes4",
            "name": "",
            "type": "bytes4"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "_signatures",
            "type": "bytes"
          }
        ],
        "name": "isValidSignature",
        "outputs": [
          {
            "internalType": "bytes4",
            "name": "",
            "type": "bytes4"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "nonce",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
          }
        ],
        "name": "onERC1155BatchReceived",
        "outputs": [
          {
            "internalType": "bytes4",
            "name": "",
            "type": "bytes4"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
          }
        ],
        "name": "onERC1155Received",
        "outputs": [
          {
            "internalType": "bytes4",
            "name": "",
            "type": "bytes4"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
          }
        ],
        "name": "onERC721Received",
        "outputs": [
          {
            "internalType": "bytes4",
            "name": "",
            "type": "bytes4"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "_signature",
            "type": "bytes4"
          }
        ],
        "name": "readHook",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_space",
            "type": "uint256"
          }
        ],
        "name": "readNonce",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "_signature",
            "type": "bytes4"
          }
        ],
        "name": "removeHook",
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
                "name": "delegateCall",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "revertOnError",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "gasLimit",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "target",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              }
            ],
            "internalType": "struct IModuleCalls.Transaction[]",
            "name": "_txs",
            "type": "tuple[]"
          }
        ],
        "name": "selfExecute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_digest",
            "type": "bytes32"
          },
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "signatureRecovery",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "threshold",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "weight",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "imageHash",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "subdigest",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "checkpoint",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "_interfaceID",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_imageHash",
            "type": "bytes32"
          }
        ],
        "name": "updateExternalImageHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_hash",
            "type": "bytes32"
          }
        ],
        "name": "updateIPFSRoot",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_imageHash",
            "type": "bytes32"
          }
        ],
        "name": "updateImageHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_imageHash",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_ipfsRoot",
            "type": "bytes32"
          }
        ],
        "name": "updateImageHashAndIPFS",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_implementation",
            "type": "address"
          }
        ],
        "name": "updateImplementation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ],
    "bytecode": "0x60a060405234801561001057600080fd5b5030608052608051613673610030600039600061095a01526136736000f3fe60806040526004361061019a5760003560e01c8063853c5068116100e1578063a38cef191161008a578063bc197c8111610064578063bc197c81146105cd578063c71f1f9614610615578063d0748f711461062a578063f23a6e611461064a576101a1565b8063a38cef1914610578578063affed0e014610598578063b93ea7ad146105ad576101a1565b80638efa6441116100bb5780638efa64411461052e57806390042baf146105505780639bd58b1614610563576101a1565b8063853c5068146104a65780638976c44c146104ee5780638c3f55631461050e576101a1565b8063295614261161014357806357c56d6b1161011d57806357c56d6b1461043257806361c2926c146104665780637a9a162814610486576101a1565b806329561426146103cf5780634fcf3eca146103ef57806351605d801461040f576101a1565b80631626ba7e116101745780631626ba7e1461034a5780631a9b23371461036a57806320c13b0b146103af576101a1565b806301ffc9a71461027f578063025b22bc146102b4578063150b7a02146102d4576101a1565b366101a157005b6004361061027d5760006101d86000357fffffffff0000000000000000000000000000000000000000000000000000000016610690565b905073ffffffffffffffffffffffffffffffffffffffff81161561027b576000808273ffffffffffffffffffffffffffffffffffffffff16600036604051610221929190612ada565b600060405180830381855af49150503d806000811461025c576040519150601f19603f3d011682016040523d82523d6000602084013e610261565b606091505b50915091508161027357805160208201fd5b805160208201f35b505b005b34801561028b57600080fd5b5061029f61029a366004612b18565b6106e4565b60405190151581526020015b60405180910390f35b3480156102c057600080fd5b5061027d6102cf366004612b5e565b6106ef565b3480156102e057600080fd5b506103196102ef366004612bc2565b7f150b7a020000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016102ab565b34801561035657600080fd5b50610319610365366004612c31565b610741565b34801561037657600080fd5b5061038a610385366004612b18565b610758565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016102ab565b3480156103bb57600080fd5b506103196103ca366004612c7d565b610763565b3480156103db57600080fd5b5061027d6103ea366004612ce9565b61077c565b3480156103fb57600080fd5b5061027d61040a366004612b18565b6107c6565b34801561041b57600080fd5b5061042461088e565b6040519081526020016102ab565b34801561043e57600080fd5b506104247f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d181565b34801561047257600080fd5b5061027d610481366004612d47565b6108bd565b34801561049257600080fd5b5061027d6104a1366004612d89565b610943565b3480156104b257600080fd5b506104c66104c1366004612c31565b610a48565b604080519586526020860194909452928401919091526060830152608082015260a0016102ab565b3480156104fa57600080fd5b5061027d610509366004612ce9565b610c10565b34801561051a57600080fd5b50610424610529366004612ce9565b610ce8565b34801561053a57600080fd5b50610543610d14565b6040516102ab9190612e60565b61038a61055e366004612ea2565b610d95565b34801561056f57600080fd5b50610424610e7f565b34801561058457600080fd5b5061027d610593366004612ce9565b610ea9565b3480156105a457600080fd5b50610424610ef3565b3480156105b957600080fd5b5061027d6105c8366004612f71565b610eff565b3480156105d957600080fd5b506103196105e8366004612fa6565b7fbc197c810000000000000000000000000000000000000000000000000000000098975050505050505050565b34801561062157600080fd5b50610424610fca565b34801561063657600080fd5b5061027d610645366004613061565b610ff4565b34801561065657600080fd5b50610319610665366004613083565b7ff23a6e61000000000000000000000000000000000000000000000000000000009695505050505050565b60006106de7fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1207fffffffff000000000000000000000000000000000000000000000000000000008416611047565b92915050565b60006106de826110a5565b333014610735576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044015b60405180910390fd5b61073e81611101565b50565b600061074e8484846111b5565b90505b9392505050565b60006106de82610690565b600061077185858585611200565b90505b949350505050565b3330146107bd576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b61073e81611263565b333014610807576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b600061081282610690565b73ffffffffffffffffffffffffffffffffffffffff1603610883576040517f1c3812cc0000000000000000000000000000000000000000000000000000000081527fffffffff000000000000000000000000000000000000000000000000000000008216600482015260240161072c565b61073e8160006112f3565b60006108b87fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85490565b905090565b3330146108fe576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b600061093183836040516020016109169291906132a3565b604051602081830303815290604052805190602001206113b3565b905061093e818484611438565b505050565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001630036109b2576040517f0a57d61d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6109bb836115c0565b6000806109f38588886040516020016109d6939291906132eb565b6040516020818303038152906040528051906020012085856116bd565b9150915081610a34578084846040517f8f4a234f00000000000000000000000000000000000000000000000000000000815260040161072c93929190613305565b610a3f818888611438565b50505050505050565b60008060008060008087876000818110610a6457610a6461331f565b909101357fff00000000000000000000000000000000000000000000000000000000000000169150819050610aba57610a9c896113b3565b9250610aa98389896116fb565b92985090965094509150610c059050565b7fff0000000000000000000000000000000000000000000000000000000000000081811601610af957610aec896113b3565b9250610aa983898961174c565b7ffe000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821601610b4b57610aec89611778565b7ffd000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821601610baf57610b9f8989896117e5565b9550955095509550955050610c05565b6040517f6085cd820000000000000000000000000000000000000000000000000000000081527fff000000000000000000000000000000000000000000000000000000000000008216600482015260240161072c565b939792965093509350565b333014610c51576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b80610c88576040517fb24b5b3a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610cb17f8c8764b3a50fee69c9bee6e956047501f434fb0e2349c75844a401a7f2a020d2829055565b6040518181527f1f63199319eff813052575c41087f618aba07b006664fed6c01f7ee9c5716835906020015b60405180910390a150565b60006106de7f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e83611047565b6060610d71610d6c610d24610fca565b6040517f017012200000000000000000000000000000000000000000000000000000000060208201526024810191909152604401604051602081830303815290604052611962565b611b7b565b604051602001610d81919061334e565b604051602081830303815290604052905090565b6000333014610dd8576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b81516020830134f0905073ffffffffffffffffffffffffffffffffffffffff8116610e3157816040517f0d25719100000000000000000000000000000000000000000000000000000000815260040161072c9190612e60565b60405173ffffffffffffffffffffffffffffffffffffffff821681527fa506ad4e7f05eceba62a023c3219e5bd98a615f4fa87e2afb08a2da5cf62bf0c9060200160405180910390a1919050565b60006108b87f8c8764b3a50fee69c9bee6e956047501f434fb0e2349c75844a401a7f2a020d25490565b333014610eea576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b61073e81611ba4565b60006108b86000610ce8565b333014610f40576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b6000610f4b83610690565b73ffffffffffffffffffffffffffffffffffffffff1614610fbc576040517f5b4d6d6a0000000000000000000000000000000000000000000000000000000081527fffffffff000000000000000000000000000000000000000000000000000000008316600482015260240161072c565b610fc682826112f3565b5050565b60006108b87f0eecac93ced8722d209199364cda3bc33da3bc3a23daef6be49ebd780511d0335490565b333014611035576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b61103e82611263565b610fc681611ba4565b6000808383604051602001611066929190918252602082015260400190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152919052805160209091012054949350505050565b60007f2e74b92a000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316016110f857506001919050565b6106de82611bfd565b73ffffffffffffffffffffffffffffffffffffffff81163b611167576040517f0c76093700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8216600482015260240161072c565b61116f813055565b60405173ffffffffffffffffffffffffffffffffffffffff821681527f310ba5f1d2ed074b51e2eccd052a47ae9ab7c6b800d1fca3db3999d6a592ca0390602001610cdd565b6000806111c3858585611c59565b50905080156111f557507f1626ba7e000000000000000000000000000000000000000000000000000000009050610751565b506000949350505050565b6000806112258686604051611216929190612ada565b60405180910390208585611c59565b509050801561125757507f20c13b0b000000000000000000000000000000000000000000000000000000009050610774565b50600095945050505050565b8061129a576040517f4294d12700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6112c37fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf8829055565b6040518181527f307ed6bd941ee9fc80f369c94af5fa11e25bab5102a6140191756c5474a30bfa90602001610cdd565b604080517fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1206020808301919091527fffffffff000000000000000000000000000000000000000000000000000000008516828401819052835180840385018152606084018086528151919093012073ffffffffffffffffffffffffffffffffffffffff8616908190559152608082015290517f0d7fc113eaf016db4681a1ba86d083ce3e0961f321062a75ac2b0aeb33deeed19181900360a00190a15050565b6040517f190100000000000000000000000000000000000000000000000000000000000060208201524660228201527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b166042820152605681018290526000906076015b604051602081830303815290604052805190602001209050919050565b8060005b818110156115b957368484838181106114575761145761331f565b90506020028101906114699190613393565b90506040810135805a10156114be5782815a6040517f2bb3e3ba00000000000000000000000000000000000000000000000000000000815260048101939093526024830191909152604482015260640161072c565b60006114cd60208401846133d1565b1561150c576115056114e56080850160608601612b5e565b83156114f157836114f3565b5a5b61150060a08701876133ec565b611c8a565b9050611547565b61154461151f6080850160608601612b5e565b608085013584156115305784611532565b5a5b61153f60a08801886133ec565b611ca5565b90505b801561158c57877f5c4eeb02dabf8976016ab414d617f9a162936dcace3cdef8c69ef6e262ad5ae78560405161157f91815260200190565b60405180910390a26115ae565b6115ae61159f60408501602086016133d1565b89866115a9611cc2565b611ce1565b50505060010161143c565b5050505050565b606081901c6bffffffffffffffffffffffff821660006115df83610ce8565b905081811461162b576040517f9b6514f400000000000000000000000000000000000000000000000000000000815260048101849052602481018390526044810182905260640161072c565b604080517f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e60208083019190915281830186905282518083038401815260609092019092528051910120600183019081905560408051858152602081018390527f1f180c27086c7a39ea2a7b25239d1ab92348f07ca7bb59d1438fcf527568f881910160405180910390a15050505050565b60008060008060006116d0888888610a48565b509650919450925090508282108015906116ee57506116ee81611d2f565b9450505050935093915050565b600080808061171687611711876006818b613451565b611d3a565b6000908152873560f01c6020818152604080842084526002909a013560e01c908190529890912090999198509695509350505050565b600080808061176787611762876001818b613451565b6116fb565b935093509350935093509350935093565b6040517f190100000000000000000000000000000000000000000000000000000000000060208201526000602282018190527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b166042830152605682018390529060760161141b565b6000808080806004600188013560e81c8261180083836134aa565b90506118128b6104c183868d8f613451565b939b509199509750955093508787101561186a5761183281848b8d613451565b89896040517fb006aba000000000000000000000000000000000000000000000000000000000815260040161072c94939291906134bd565b8092505b888310156119545760038301928a013560e81c915061188d83836134aa565b905060006118af61189d886121d0565b8c8c879086926104c193929190613451565b939c50919a5098509091505088881015611907576118cf82858c8e613451565b8a8a6040517fb006aba000000000000000000000000000000000000000000000000000000000815260040161072c94939291906134bd565b84811061194a576040517f37daf62b000000000000000000000000000000000000000000000000000000008152600481018290526024810186905260440161072c565b935091508161186e565b505050939792965093509350565b8051606090600381901b60006005600483010467ffffffffffffffff81111561198d5761198d612e73565b6040519080825280601f01601f1916602001820160405280156119b7576020820181803683370190505b5090506000806000805b86811015611acb578881815181106119db576119db61331f565b01602001516008948501949390931b60f89390931c92909217915b60058410611ac3576040805180820190915260208082527f6162636465666768696a6b6c6d6e6f707172737475767778797a323334353637818301527ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb90950194601f85871c16908110611a6c57611a6c61331f565b602001015160f81c60f81b858381518110611a8957611a8961331f565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909101906119f6565b6001016119c1565b508215611b6f576040518060400160405280602081526020017f6162636465666768696a6b6c6d6e6f707172737475767778797a3233343536378152508360050383901b601f1681518110611b2257611b2261331f565b602001015160f81c60f81b848281518110611b3f57611b3f61331f565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b50919695505050505050565b606081604051602001611b8e91906134e4565b6040516020818303038152906040529050919050565b611bcd7f0eecac93ced8722d209199364cda3bc33da3bc3a23daef6be49ebd780511d033829055565b6040518181527f20d3ef1b5738a9f6d7beae515432206e7a8e2740ca6dcf46a952190ad01bcb5190602001610cdd565b60007f6ffbd451000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831601611c5057506001919050565b6106de82612204565b6000806000806000611c6c888888610a48565b509650919450925090508282108015906116ee57506116ee81612345565b60006040518284823760008084838989f49695505050505050565b6000604051828482376000808483898b8af1979650505050505050565b60603d604051915060208201818101604052818352816000823e505090565b8315611cef57805160208201fd5b827fab46c69f7f32e1bf09b0725853da82a211e5402a0600296ab499a2fb5ea3b4198383604051611d21929190613529565b60405180910390a250505050565b60006106de8261237c565b60008060005b838110156121c757600181019085013560f81c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101611de157601582019186013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff81169074ff000000000000000000000000000000000000000016811785611dc75780611dd6565b60008681526020829052604090205b955050505050611d40565b80611e775760018201918681013560f81c906043016000611e0d8a611e0884888c8e613451565b6123af565b60ff841697909701969194508491905060a083901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff82161786611e5c5780611e6b565b60008781526020829052604090205b96505050505050611d40565b60028103611f9f576000808784013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff16601586019550909250905060008885013560e81c600386018162ffffff169150809650819250505060008186019050611ef08b848c8c8a908692611eeb93929190613451565b612672565b611f38578a83611f0283898d8f613451565b6040517f9a94623200000000000000000000000000000000000000000000000000000000815260040161072c9493929190613542565b60ff8416979097019694508460a084901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff84161787611f835780611f92565b60008881526020829052604090205b9750505050505050611d40565b60038103611fd257602082019186013583611fba5780611fc9565b60008481526020829052604090205b93505050611d40565b6004810361201e576003808301928781013560e81c9190820101600080611fff8b61171185898d8f613451565b60009889526020526040909720969097019650909350611d4092505050565b600681036121265760008287013560f81c60018401935060ff16905060008784013560f01c60028501945061ffff16905060008885013560e81c600386018162ffffff16915080965081925050506000818601905060008061208c8d8d8d8b90879261171193929190613451565b939850889390925090508482106120a257988501985b604080517f53657175656e6365206e657374656420636f6e6669673a0a0000000000000000602080830191909152603882018490526058820188905260788083018a90528351808403909101815260989092019092528051910120896121085780612117565b60008a81526020829052604090205b99505050505050505050611d40565b60058103612192576020820191860135878103612161577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff94505b600061216c82612859565b9050846121795780612188565b60008581526020829052604090205b9450505050611d40565b6040517fb2505f7c0000000000000000000000000000000000000000000000000000000081526004810182905260240161072c565b50935093915050565b7f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d160009081526020829052604081206106de565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167fec6aba5000000000000000000000000000000000000000000000000000000000148061229757507fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000145b806122e357507fffffffff0000000000000000000000000000000000000000000000000000000082167f150b7a0200000000000000000000000000000000000000000000000000000000145b8061232f57507fffffffff0000000000000000000000000000000000000000000000000000000082167fc0ee0b8a00000000000000000000000000000000000000000000000000000000145b1561233c57506001919050565b6106de82612894565b600081158015906106de57507f8c8764b3a50fee69c9bee6e956047501f434fb0e2349c75844a401a7f2a020d2545b821492915050565b600081158015906106de57507fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf854612374565b6000604282146123ef5782826040517f2ee17a3d00000000000000000000000000000000000000000000000000000000815260040161072c929190613582565b60006124086123ff600185613596565b85013560f81c90565b60ff169050604084013560f81c843560208601357f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a081111561247c578686826040517fad4aac7600000000000000000000000000000000000000000000000000000000815260040161072c939291906135a9565b8260ff16601b1415801561249457508260ff16601c14155b156124d1578686846040517fe578897e00000000000000000000000000000000000000000000000000000000815260040161072c939291906135cd565b6001840361253e576040805160008152602081018083528a905260ff851691810191909152606081018390526080810182905260019060a0015b6020604051602081039080840390855afa15801561252d573d6000803e3d6000fd5b505050602060405103519450612616565b600284036125db576040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101899052600190605c01604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181528282528051602091820120600084529083018083525260ff861690820152606081018490526080810183905260a00161250b565b86868560016040517f9dfba85200000000000000000000000000000000000000000000000000000000815260040161072c94939291906135f4565b73ffffffffffffffffffffffffffffffffffffffff85166126675786866040517f6c1719d200000000000000000000000000000000000000000000000000000000815260040161072c929190613582565b505050509392505050565b60008181036126ad576040517fac241e1100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600083836126bc600182613596565b8181106126cb576126cb61331f565b919091013560f81c91505060018114806126e55750600281145b1561272a578473ffffffffffffffffffffffffffffffffffffffff1661270c8786866123af565b73ffffffffffffffffffffffffffffffffffffffff16149150612850565b600381036128155773ffffffffffffffffffffffffffffffffffffffff8516631626ba7e878660008761275e600182613596565b9261276b93929190613451565b6040518463ffffffff1660e01b815260040161278993929190613305565b602060405180830381865afa1580156127a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127ca9190613620565b7fffffffff00000000000000000000000000000000000000000000000000000000167f1626ba7e00000000000000000000000000000000000000000000000000000000149150612850565b83838260006040517f9dfba85200000000000000000000000000000000000000000000000000000000815260040161072c94939291906135f4565b50949350505050565b6040517f53657175656e636520737461746963206469676573743a0a000000000000000060208201526038810182905260009060580161141b565b60007ffda4dd44000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316016128e757506001919050565b6106de8260007fe4a77bbc000000000000000000000000000000000000000000000000000000007fffffffff0000000000000000000000000000000000000000000000000000000083160161293e57506001919050565b6106de8260007fda44f878000000000000000000000000000000000000000000000000000000007fffffffff0000000000000000000000000000000000000000000000000000000083160161299557506001919050565b6106de8260007fae9fa280000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316016129ec57506001919050565b6106de8260007fffffffff0000000000000000000000000000000000000000000000000000000082167fac6a444e000000000000000000000000000000000000000000000000000000001480612a8357507fffffffff0000000000000000000000000000000000000000000000000000000082167f36e7817500000000000000000000000000000000000000000000000000000000145b15612a9057506001919050565b7f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316146106de565b8183823760009101908152919050565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461073e57600080fd5b600060208284031215612b2a57600080fd5b813561075181612aea565b803573ffffffffffffffffffffffffffffffffffffffff81168114612b5957600080fd5b919050565b600060208284031215612b7057600080fd5b61075182612b35565b60008083601f840112612b8b57600080fd5b50813567ffffffffffffffff811115612ba357600080fd5b602083019150836020828501011115612bbb57600080fd5b9250929050565b600080600080600060808688031215612bda57600080fd5b612be386612b35565b9450612bf160208701612b35565b935060408601359250606086013567ffffffffffffffff811115612c1457600080fd5b612c2088828901612b79565b969995985093965092949392505050565b600080600060408486031215612c4657600080fd5b83359250602084013567ffffffffffffffff811115612c6457600080fd5b612c7086828701612b79565b9497909650939450505050565b60008060008060408587031215612c9357600080fd5b843567ffffffffffffffff80821115612cab57600080fd5b612cb788838901612b79565b90965094506020870135915080821115612cd057600080fd5b50612cdd87828801612b79565b95989497509550505050565b600060208284031215612cfb57600080fd5b5035919050565b60008083601f840112612d1457600080fd5b50813567ffffffffffffffff811115612d2c57600080fd5b6020830191508360208260051b8501011115612bbb57600080fd5b60008060208385031215612d5a57600080fd5b823567ffffffffffffffff811115612d7157600080fd5b612d7d85828601612d02565b90969095509350505050565b600080600080600060608688031215612da157600080fd5b853567ffffffffffffffff80821115612db957600080fd5b612dc589838a01612d02565b9097509550602088013594506040880135915080821115612de557600080fd5b50612c2088828901612b79565b60005b83811015612e0d578181015183820152602001612df5565b50506000910152565b60008151808452612e2e816020860160208601612df2565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006107516020830184612e16565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060208284031215612eb457600080fd5b813567ffffffffffffffff80821115612ecc57600080fd5b818401915084601f830112612ee057600080fd5b813581811115612ef257612ef2612e73565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908382118183101715612f3857612f38612e73565b81604052828152876020848701011115612f5157600080fd5b826020860160208301376000928101602001929092525095945050505050565b60008060408385031215612f8457600080fd5b8235612f8f81612aea565b9150612f9d60208401612b35565b90509250929050565b60008060008060008060008060a0898b031215612fc257600080fd5b612fcb89612b35565b9750612fd960208a01612b35565b9650604089013567ffffffffffffffff80821115612ff657600080fd5b6130028c838d01612d02565b909850965060608b013591508082111561301b57600080fd5b6130278c838d01612d02565b909650945060808b013591508082111561304057600080fd5b5061304d8b828c01612b79565b999c989b5096995094979396929594505050565b6000806040838503121561307457600080fd5b50508035926020909101359150565b60008060008060008060a0878903121561309c57600080fd5b6130a587612b35565b95506130b360208801612b35565b94506040870135935060608701359250608087013567ffffffffffffffff8111156130dd57600080fd5b6130e989828a01612b79565b979a9699509497509295939492505050565b80358015158114612b5957600080fd5b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b81835260006020808501808196508560051b810191508460005b8781101561329657828403895281357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff418836030181126131ad57600080fd5b870160c06131ba826130fb565b151586526131c98783016130fb565b15158688015260408281013590870152606073ffffffffffffffffffffffffffffffffffffffff6131fb828501612b35565b16908701526080828101359087015260a080830135368490037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe101811261324157600080fd5b90920187810192903567ffffffffffffffff81111561325f57600080fd5b80360384131561326e57600080fd5b8282890152613280838901828661310b565b9c89019c9750505092860192505060010161316e565b5091979650505050505050565b60408152600560408201527f73656c663a000000000000000000000000000000000000000000000000000000606082015260806020820152600061074e608083018486613154565b838152604060208201526000610771604083018486613154565b83815260406020820152600061077160408301848661310b565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f697066733a2f2f00000000000000000000000000000000000000000000000000815260008251613386816007850160208701612df2565b9190910160070192915050565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff418336030181126133c757600080fd5b9190910192915050565b6000602082840312156133e357600080fd5b610751826130fb565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261342157600080fd5b83018035915067ffffffffffffffff82111561343c57600080fd5b602001915036819003821315612bbb57600080fd5b6000808585111561346157600080fd5b8386111561346e57600080fd5b5050820193919092039150565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b808201808211156106de576106de61347b565b6060815260006134d160608301868861310b565b6020830194909452506040015292915050565b7f620000000000000000000000000000000000000000000000000000000000000081526000825161351c816001850160208701612df2565b9190910160010192915050565b82815260406020820152600061074e6040830184612e16565b84815273ffffffffffffffffffffffffffffffffffffffff8416602082015260606040820152600061357860608301848661310b565b9695505050505050565b60208152600061074e60208301848661310b565b818103818111156106de576106de61347b565b6040815260006135bd60408301858761310b565b9050826020830152949350505050565b6040815260006135e160408301858761310b565b905060ff83166020830152949350505050565b60608152600061360860608301868861310b565b60208301949094525090151560409091015292915050565b60006020828403121561363257600080fd5b815161075181612aea56fea26469706673582212209ea1f29a81ef04f0d1c452da3db48e1d4423c64089333bd5bf9b44b4cb4b18cf64736f6c63430008120033",
    "deployedBytecode": "0x60806040526004361061019a5760003560e01c8063853c5068116100e1578063a38cef191161008a578063bc197c8111610064578063bc197c81146105cd578063c71f1f9614610615578063d0748f711461062a578063f23a6e611461064a576101a1565b8063a38cef1914610578578063affed0e014610598578063b93ea7ad146105ad576101a1565b80638efa6441116100bb5780638efa64411461052e57806390042baf146105505780639bd58b1614610563576101a1565b8063853c5068146104a65780638976c44c146104ee5780638c3f55631461050e576101a1565b8063295614261161014357806357c56d6b1161011d57806357c56d6b1461043257806361c2926c146104665780637a9a162814610486576101a1565b806329561426146103cf5780634fcf3eca146103ef57806351605d801461040f576101a1565b80631626ba7e116101745780631626ba7e1461034a5780631a9b23371461036a57806320c13b0b146103af576101a1565b806301ffc9a71461027f578063025b22bc146102b4578063150b7a02146102d4576101a1565b366101a157005b6004361061027d5760006101d86000357fffffffff0000000000000000000000000000000000000000000000000000000016610690565b905073ffffffffffffffffffffffffffffffffffffffff81161561027b576000808273ffffffffffffffffffffffffffffffffffffffff16600036604051610221929190612ada565b600060405180830381855af49150503d806000811461025c576040519150601f19603f3d011682016040523d82523d6000602084013e610261565b606091505b50915091508161027357805160208201fd5b805160208201f35b505b005b34801561028b57600080fd5b5061029f61029a366004612b18565b6106e4565b60405190151581526020015b60405180910390f35b3480156102c057600080fd5b5061027d6102cf366004612b5e565b6106ef565b3480156102e057600080fd5b506103196102ef366004612bc2565b7f150b7a020000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016102ab565b34801561035657600080fd5b50610319610365366004612c31565b610741565b34801561037657600080fd5b5061038a610385366004612b18565b610758565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016102ab565b3480156103bb57600080fd5b506103196103ca366004612c7d565b610763565b3480156103db57600080fd5b5061027d6103ea366004612ce9565b61077c565b3480156103fb57600080fd5b5061027d61040a366004612b18565b6107c6565b34801561041b57600080fd5b5061042461088e565b6040519081526020016102ab565b34801561043e57600080fd5b506104247f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d181565b34801561047257600080fd5b5061027d610481366004612d47565b6108bd565b34801561049257600080fd5b5061027d6104a1366004612d89565b610943565b3480156104b257600080fd5b506104c66104c1366004612c31565b610a48565b604080519586526020860194909452928401919091526060830152608082015260a0016102ab565b3480156104fa57600080fd5b5061027d610509366004612ce9565b610c10565b34801561051a57600080fd5b50610424610529366004612ce9565b610ce8565b34801561053a57600080fd5b50610543610d14565b6040516102ab9190612e60565b61038a61055e366004612ea2565b610d95565b34801561056f57600080fd5b50610424610e7f565b34801561058457600080fd5b5061027d610593366004612ce9565b610ea9565b3480156105a457600080fd5b50610424610ef3565b3480156105b957600080fd5b5061027d6105c8366004612f71565b610eff565b3480156105d957600080fd5b506103196105e8366004612fa6565b7fbc197c810000000000000000000000000000000000000000000000000000000098975050505050505050565b34801561062157600080fd5b50610424610fca565b34801561063657600080fd5b5061027d610645366004613061565b610ff4565b34801561065657600080fd5b50610319610665366004613083565b7ff23a6e61000000000000000000000000000000000000000000000000000000009695505050505050565b60006106de7fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1207fffffffff000000000000000000000000000000000000000000000000000000008416611047565b92915050565b60006106de826110a5565b333014610735576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044015b60405180910390fd5b61073e81611101565b50565b600061074e8484846111b5565b90505b9392505050565b60006106de82610690565b600061077185858585611200565b90505b949350505050565b3330146107bd576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b61073e81611263565b333014610807576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b600061081282610690565b73ffffffffffffffffffffffffffffffffffffffff1603610883576040517f1c3812cc0000000000000000000000000000000000000000000000000000000081527fffffffff000000000000000000000000000000000000000000000000000000008216600482015260240161072c565b61073e8160006112f3565b60006108b87fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85490565b905090565b3330146108fe576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b600061093183836040516020016109169291906132a3565b604051602081830303815290604052805190602001206113b3565b905061093e818484611438565b505050565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001630036109b2576040517f0a57d61d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6109bb836115c0565b6000806109f38588886040516020016109d6939291906132eb565b6040516020818303038152906040528051906020012085856116bd565b9150915081610a34578084846040517f8f4a234f00000000000000000000000000000000000000000000000000000000815260040161072c93929190613305565b610a3f818888611438565b50505050505050565b60008060008060008087876000818110610a6457610a6461331f565b909101357fff00000000000000000000000000000000000000000000000000000000000000169150819050610aba57610a9c896113b3565b9250610aa98389896116fb565b92985090965094509150610c059050565b7fff0000000000000000000000000000000000000000000000000000000000000081811601610af957610aec896113b3565b9250610aa983898961174c565b7ffe000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821601610b4b57610aec89611778565b7ffd000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821601610baf57610b9f8989896117e5565b9550955095509550955050610c05565b6040517f6085cd820000000000000000000000000000000000000000000000000000000081527fff000000000000000000000000000000000000000000000000000000000000008216600482015260240161072c565b939792965093509350565b333014610c51576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b80610c88576040517fb24b5b3a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610cb17f8c8764b3a50fee69c9bee6e956047501f434fb0e2349c75844a401a7f2a020d2829055565b6040518181527f1f63199319eff813052575c41087f618aba07b006664fed6c01f7ee9c5716835906020015b60405180910390a150565b60006106de7f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e83611047565b6060610d71610d6c610d24610fca565b6040517f017012200000000000000000000000000000000000000000000000000000000060208201526024810191909152604401604051602081830303815290604052611962565b611b7b565b604051602001610d81919061334e565b604051602081830303815290604052905090565b6000333014610dd8576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b81516020830134f0905073ffffffffffffffffffffffffffffffffffffffff8116610e3157816040517f0d25719100000000000000000000000000000000000000000000000000000000815260040161072c9190612e60565b60405173ffffffffffffffffffffffffffffffffffffffff821681527fa506ad4e7f05eceba62a023c3219e5bd98a615f4fa87e2afb08a2da5cf62bf0c9060200160405180910390a1919050565b60006108b87f8c8764b3a50fee69c9bee6e956047501f434fb0e2349c75844a401a7f2a020d25490565b333014610eea576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b61073e81611ba4565b60006108b86000610ce8565b333014610f40576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b6000610f4b83610690565b73ffffffffffffffffffffffffffffffffffffffff1614610fbc576040517f5b4d6d6a0000000000000000000000000000000000000000000000000000000081527fffffffff000000000000000000000000000000000000000000000000000000008316600482015260240161072c565b610fc682826112f3565b5050565b60006108b87f0eecac93ced8722d209199364cda3bc33da3bc3a23daef6be49ebd780511d0335490565b333014611035576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161072c565b61103e82611263565b610fc681611ba4565b6000808383604051602001611066929190918252602082015260400190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152919052805160209091012054949350505050565b60007f2e74b92a000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316016110f857506001919050565b6106de82611bfd565b73ffffffffffffffffffffffffffffffffffffffff81163b611167576040517f0c76093700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8216600482015260240161072c565b61116f813055565b60405173ffffffffffffffffffffffffffffffffffffffff821681527f310ba5f1d2ed074b51e2eccd052a47ae9ab7c6b800d1fca3db3999d6a592ca0390602001610cdd565b6000806111c3858585611c59565b50905080156111f557507f1626ba7e000000000000000000000000000000000000000000000000000000009050610751565b506000949350505050565b6000806112258686604051611216929190612ada565b60405180910390208585611c59565b509050801561125757507f20c13b0b000000000000000000000000000000000000000000000000000000009050610774565b50600095945050505050565b8061129a576040517f4294d12700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6112c37fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf8829055565b6040518181527f307ed6bd941ee9fc80f369c94af5fa11e25bab5102a6140191756c5474a30bfa90602001610cdd565b604080517fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1206020808301919091527fffffffff000000000000000000000000000000000000000000000000000000008516828401819052835180840385018152606084018086528151919093012073ffffffffffffffffffffffffffffffffffffffff8616908190559152608082015290517f0d7fc113eaf016db4681a1ba86d083ce3e0961f321062a75ac2b0aeb33deeed19181900360a00190a15050565b6040517f190100000000000000000000000000000000000000000000000000000000000060208201524660228201527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b166042820152605681018290526000906076015b604051602081830303815290604052805190602001209050919050565b8060005b818110156115b957368484838181106114575761145761331f565b90506020028101906114699190613393565b90506040810135805a10156114be5782815a6040517f2bb3e3ba00000000000000000000000000000000000000000000000000000000815260048101939093526024830191909152604482015260640161072c565b60006114cd60208401846133d1565b1561150c576115056114e56080850160608601612b5e565b83156114f157836114f3565b5a5b61150060a08701876133ec565b611c8a565b9050611547565b61154461151f6080850160608601612b5e565b608085013584156115305784611532565b5a5b61153f60a08801886133ec565b611ca5565b90505b801561158c57877f5c4eeb02dabf8976016ab414d617f9a162936dcace3cdef8c69ef6e262ad5ae78560405161157f91815260200190565b60405180910390a26115ae565b6115ae61159f60408501602086016133d1565b89866115a9611cc2565b611ce1565b50505060010161143c565b5050505050565b606081901c6bffffffffffffffffffffffff821660006115df83610ce8565b905081811461162b576040517f9b6514f400000000000000000000000000000000000000000000000000000000815260048101849052602481018390526044810182905260640161072c565b604080517f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e60208083019190915281830186905282518083038401815260609092019092528051910120600183019081905560408051858152602081018390527f1f180c27086c7a39ea2a7b25239d1ab92348f07ca7bb59d1438fcf527568f881910160405180910390a15050505050565b60008060008060006116d0888888610a48565b509650919450925090508282108015906116ee57506116ee81611d2f565b9450505050935093915050565b600080808061171687611711876006818b613451565b611d3a565b6000908152873560f01c6020818152604080842084526002909a013560e01c908190529890912090999198509695509350505050565b600080808061176787611762876001818b613451565b6116fb565b935093509350935093509350935093565b6040517f190100000000000000000000000000000000000000000000000000000000000060208201526000602282018190527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b166042830152605682018390529060760161141b565b6000808080806004600188013560e81c8261180083836134aa565b90506118128b6104c183868d8f613451565b939b509199509750955093508787101561186a5761183281848b8d613451565b89896040517fb006aba000000000000000000000000000000000000000000000000000000000815260040161072c94939291906134bd565b8092505b888310156119545760038301928a013560e81c915061188d83836134aa565b905060006118af61189d886121d0565b8c8c879086926104c193929190613451565b939c50919a5098509091505088881015611907576118cf82858c8e613451565b8a8a6040517fb006aba000000000000000000000000000000000000000000000000000000000815260040161072c94939291906134bd565b84811061194a576040517f37daf62b000000000000000000000000000000000000000000000000000000008152600481018290526024810186905260440161072c565b935091508161186e565b505050939792965093509350565b8051606090600381901b60006005600483010467ffffffffffffffff81111561198d5761198d612e73565b6040519080825280601f01601f1916602001820160405280156119b7576020820181803683370190505b5090506000806000805b86811015611acb578881815181106119db576119db61331f565b01602001516008948501949390931b60f89390931c92909217915b60058410611ac3576040805180820190915260208082527f6162636465666768696a6b6c6d6e6f707172737475767778797a323334353637818301527ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb90950194601f85871c16908110611a6c57611a6c61331f565b602001015160f81c60f81b858381518110611a8957611a8961331f565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506001909101906119f6565b6001016119c1565b508215611b6f576040518060400160405280602081526020017f6162636465666768696a6b6c6d6e6f707172737475767778797a3233343536378152508360050383901b601f1681518110611b2257611b2261331f565b602001015160f81c60f81b848281518110611b3f57611b3f61331f565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b50919695505050505050565b606081604051602001611b8e91906134e4565b6040516020818303038152906040529050919050565b611bcd7f0eecac93ced8722d209199364cda3bc33da3bc3a23daef6be49ebd780511d033829055565b6040518181527f20d3ef1b5738a9f6d7beae515432206e7a8e2740ca6dcf46a952190ad01bcb5190602001610cdd565b60007f6ffbd451000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831601611c5057506001919050565b6106de82612204565b6000806000806000611c6c888888610a48565b509650919450925090508282108015906116ee57506116ee81612345565b60006040518284823760008084838989f49695505050505050565b6000604051828482376000808483898b8af1979650505050505050565b60603d604051915060208201818101604052818352816000823e505090565b8315611cef57805160208201fd5b827fab46c69f7f32e1bf09b0725853da82a211e5402a0600296ab499a2fb5ea3b4198383604051611d21929190613529565b60405180910390a250505050565b60006106de8261237c565b60008060005b838110156121c757600181019085013560f81c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101611de157601582019186013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff81169074ff000000000000000000000000000000000000000016811785611dc75780611dd6565b60008681526020829052604090205b955050505050611d40565b80611e775760018201918681013560f81c906043016000611e0d8a611e0884888c8e613451565b6123af565b60ff841697909701969194508491905060a083901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff82161786611e5c5780611e6b565b60008781526020829052604090205b96505050505050611d40565b60028103611f9f576000808784013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff16601586019550909250905060008885013560e81c600386018162ffffff169150809650819250505060008186019050611ef08b848c8c8a908692611eeb93929190613451565b612672565b611f38578a83611f0283898d8f613451565b6040517f9a94623200000000000000000000000000000000000000000000000000000000815260040161072c9493929190613542565b60ff8416979097019694508460a084901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff84161787611f835780611f92565b60008881526020829052604090205b9750505050505050611d40565b60038103611fd257602082019186013583611fba5780611fc9565b60008481526020829052604090205b93505050611d40565b6004810361201e576003808301928781013560e81c9190820101600080611fff8b61171185898d8f613451565b60009889526020526040909720969097019650909350611d4092505050565b600681036121265760008287013560f81c60018401935060ff16905060008784013560f01c60028501945061ffff16905060008885013560e81c600386018162ffffff16915080965081925050506000818601905060008061208c8d8d8d8b90879261171193929190613451565b939850889390925090508482106120a257988501985b604080517f53657175656e6365206e657374656420636f6e6669673a0a0000000000000000602080830191909152603882018490526058820188905260788083018a90528351808403909101815260989092019092528051910120896121085780612117565b60008a81526020829052604090205b99505050505050505050611d40565b60058103612192576020820191860135878103612161577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff94505b600061216c82612859565b9050846121795780612188565b60008581526020829052604090205b9450505050611d40565b6040517fb2505f7c0000000000000000000000000000000000000000000000000000000081526004810182905260240161072c565b50935093915050565b7f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d160009081526020829052604081206106de565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167fec6aba5000000000000000000000000000000000000000000000000000000000148061229757507fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000145b806122e357507fffffffff0000000000000000000000000000000000000000000000000000000082167f150b7a0200000000000000000000000000000000000000000000000000000000145b8061232f57507fffffffff0000000000000000000000000000000000000000000000000000000082167fc0ee0b8a00000000000000000000000000000000000000000000000000000000145b1561233c57506001919050565b6106de82612894565b600081158015906106de57507f8c8764b3a50fee69c9bee6e956047501f434fb0e2349c75844a401a7f2a020d2545b821492915050565b600081158015906106de57507fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf854612374565b6000604282146123ef5782826040517f2ee17a3d00000000000000000000000000000000000000000000000000000000815260040161072c929190613582565b60006124086123ff600185613596565b85013560f81c90565b60ff169050604084013560f81c843560208601357f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a081111561247c578686826040517fad4aac7600000000000000000000000000000000000000000000000000000000815260040161072c939291906135a9565b8260ff16601b1415801561249457508260ff16601c14155b156124d1578686846040517fe578897e00000000000000000000000000000000000000000000000000000000815260040161072c939291906135cd565b6001840361253e576040805160008152602081018083528a905260ff851691810191909152606081018390526080810182905260019060a0015b6020604051602081039080840390855afa15801561252d573d6000803e3d6000fd5b505050602060405103519450612616565b600284036125db576040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101899052600190605c01604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181528282528051602091820120600084529083018083525260ff861690820152606081018490526080810183905260a00161250b565b86868560016040517f9dfba85200000000000000000000000000000000000000000000000000000000815260040161072c94939291906135f4565b73ffffffffffffffffffffffffffffffffffffffff85166126675786866040517f6c1719d200000000000000000000000000000000000000000000000000000000815260040161072c929190613582565b505050509392505050565b60008181036126ad576040517fac241e1100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600083836126bc600182613596565b8181106126cb576126cb61331f565b919091013560f81c91505060018114806126e55750600281145b1561272a578473ffffffffffffffffffffffffffffffffffffffff1661270c8786866123af565b73ffffffffffffffffffffffffffffffffffffffff16149150612850565b600381036128155773ffffffffffffffffffffffffffffffffffffffff8516631626ba7e878660008761275e600182613596565b9261276b93929190613451565b6040518463ffffffff1660e01b815260040161278993929190613305565b602060405180830381865afa1580156127a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127ca9190613620565b7fffffffff00000000000000000000000000000000000000000000000000000000167f1626ba7e00000000000000000000000000000000000000000000000000000000149150612850565b83838260006040517f9dfba85200000000000000000000000000000000000000000000000000000000815260040161072c94939291906135f4565b50949350505050565b6040517f53657175656e636520737461746963206469676573743a0a000000000000000060208201526038810182905260009060580161141b565b60007ffda4dd44000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316016128e757506001919050565b6106de8260007fe4a77bbc000000000000000000000000000000000000000000000000000000007fffffffff0000000000000000000000000000000000000000000000000000000083160161293e57506001919050565b6106de8260007fda44f878000000000000000000000000000000000000000000000000000000007fffffffff0000000000000000000000000000000000000000000000000000000083160161299557506001919050565b6106de8260007fae9fa280000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316016129ec57506001919050565b6106de8260007fffffffff0000000000000000000000000000000000000000000000000000000082167fac6a444e000000000000000000000000000000000000000000000000000000001480612a8357507fffffffff0000000000000000000000000000000000000000000000000000000082167f36e7817500000000000000000000000000000000000000000000000000000000145b15612a9057506001919050565b7f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316146106de565b8183823760009101908152919050565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461073e57600080fd5b600060208284031215612b2a57600080fd5b813561075181612aea565b803573ffffffffffffffffffffffffffffffffffffffff81168114612b5957600080fd5b919050565b600060208284031215612b7057600080fd5b61075182612b35565b60008083601f840112612b8b57600080fd5b50813567ffffffffffffffff811115612ba357600080fd5b602083019150836020828501011115612bbb57600080fd5b9250929050565b600080600080600060808688031215612bda57600080fd5b612be386612b35565b9450612bf160208701612b35565b935060408601359250606086013567ffffffffffffffff811115612c1457600080fd5b612c2088828901612b79565b969995985093965092949392505050565b600080600060408486031215612c4657600080fd5b83359250602084013567ffffffffffffffff811115612c6457600080fd5b612c7086828701612b79565b9497909650939450505050565b60008060008060408587031215612c9357600080fd5b843567ffffffffffffffff80821115612cab57600080fd5b612cb788838901612b79565b90965094506020870135915080821115612cd057600080fd5b50612cdd87828801612b79565b95989497509550505050565b600060208284031215612cfb57600080fd5b5035919050565b60008083601f840112612d1457600080fd5b50813567ffffffffffffffff811115612d2c57600080fd5b6020830191508360208260051b8501011115612bbb57600080fd5b60008060208385031215612d5a57600080fd5b823567ffffffffffffffff811115612d7157600080fd5b612d7d85828601612d02565b90969095509350505050565b600080600080600060608688031215612da157600080fd5b853567ffffffffffffffff80821115612db957600080fd5b612dc589838a01612d02565b9097509550602088013594506040880135915080821115612de557600080fd5b50612c2088828901612b79565b60005b83811015612e0d578181015183820152602001612df5565b50506000910152565b60008151808452612e2e816020860160208601612df2565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006107516020830184612e16565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060208284031215612eb457600080fd5b813567ffffffffffffffff80821115612ecc57600080fd5b818401915084601f830112612ee057600080fd5b813581811115612ef257612ef2612e73565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908382118183101715612f3857612f38612e73565b81604052828152876020848701011115612f5157600080fd5b826020860160208301376000928101602001929092525095945050505050565b60008060408385031215612f8457600080fd5b8235612f8f81612aea565b9150612f9d60208401612b35565b90509250929050565b60008060008060008060008060a0898b031215612fc257600080fd5b612fcb89612b35565b9750612fd960208a01612b35565b9650604089013567ffffffffffffffff80821115612ff657600080fd5b6130028c838d01612d02565b909850965060608b013591508082111561301b57600080fd5b6130278c838d01612d02565b909650945060808b013591508082111561304057600080fd5b5061304d8b828c01612b79565b999c989b5096995094979396929594505050565b6000806040838503121561307457600080fd5b50508035926020909101359150565b60008060008060008060a0878903121561309c57600080fd5b6130a587612b35565b95506130b360208801612b35565b94506040870135935060608701359250608087013567ffffffffffffffff8111156130dd57600080fd5b6130e989828a01612b79565b979a9699509497509295939492505050565b80358015158114612b5957600080fd5b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b81835260006020808501808196508560051b810191508460005b8781101561329657828403895281357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff418836030181126131ad57600080fd5b870160c06131ba826130fb565b151586526131c98783016130fb565b15158688015260408281013590870152606073ffffffffffffffffffffffffffffffffffffffff6131fb828501612b35565b16908701526080828101359087015260a080830135368490037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe101811261324157600080fd5b90920187810192903567ffffffffffffffff81111561325f57600080fd5b80360384131561326e57600080fd5b8282890152613280838901828661310b565b9c89019c9750505092860192505060010161316e565b5091979650505050505050565b60408152600560408201527f73656c663a000000000000000000000000000000000000000000000000000000606082015260806020820152600061074e608083018486613154565b838152604060208201526000610771604083018486613154565b83815260406020820152600061077160408301848661310b565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f697066733a2f2f00000000000000000000000000000000000000000000000000815260008251613386816007850160208701612df2565b9190910160070192915050565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff418336030181126133c757600080fd5b9190910192915050565b6000602082840312156133e357600080fd5b610751826130fb565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261342157600080fd5b83018035915067ffffffffffffffff82111561343c57600080fd5b602001915036819003821315612bbb57600080fd5b6000808585111561346157600080fd5b8386111561346e57600080fd5b5050820193919092039150565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b808201808211156106de576106de61347b565b6060815260006134d160608301868861310b565b6020830194909452506040015292915050565b7f620000000000000000000000000000000000000000000000000000000000000081526000825161351c816001850160208701612df2565b9190910160010192915050565b82815260406020820152600061074e6040830184612e16565b84815273ffffffffffffffffffffffffffffffffffffffff8416602082015260606040820152600061357860608301848661310b565b9695505050505050565b60208152600061074e60208301848661310b565b818103818111156106de576106de61347b565b6040815260006135bd60408301858761310b565b9050826020830152949350505050565b6040815260006135e160408301858761310b565b905060ff83166020830152949350505050565b60608152600061360860608301868861310b565b60208301949094525090151560409091015292915050565b60006020828403121561363257600080fd5b815161075181612aea56fea26469706673582212209ea1f29a81ef04f0d1c452da3db48e1d4423c64089333bd5bf9b44b4cb4b18cf64736f6c63430008120033",
    "linkReferences": {},
    "deployedLinkReferences": {}
  }
  