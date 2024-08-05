import { ContractFactory, type ethers } from 'ethers'
import type { VerificationRequest } from 'scripts/types'

export class MainModuleV2 extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_factory',
              type: 'address'
            },
            {
              internalType: 'address',
              name: '_mainModuleUpgradable',
              type: 'address'
            }
          ],
          stateMutability: 'nonpayable',
          type: 'constructor'
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_space',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: '_provided',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: '_current',
              type: 'uint256'
            }
          ],
          name: 'BadNonce',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'bytes',
              name: '_code',
              type: 'bytes'
            }
          ],
          name: 'CreateFailed',
          type: 'error'
        },
        {
          inputs: [],
          name: 'EmptySignature',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'bytes4',
              name: '_signature',
              type: 'bytes4'
            }
          ],
          name: 'HookAlreadyExists',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'bytes4',
              name: '_signature',
              type: 'bytes4'
            }
          ],
          name: 'HookDoesNotExist',
          type: 'error'
        },
        {
          inputs: [],
          name: 'ImageHashIsZero',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_implementation',
              type: 'address'
            }
          ],
          name: 'InvalidImplementation',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: '_hash',
              type: 'bytes32'
            },
            {
              internalType: 'address',
              name: '_addr',
              type: 'address'
            },
            {
              internalType: 'bytes',
              name: '_signature',
              type: 'bytes'
            }
          ],
          name: 'InvalidNestedSignature',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'bytes',
              name: '_signature',
              type: 'bytes'
            },
            {
              internalType: 'bytes32',
              name: '_s',
              type: 'bytes32'
            }
          ],
          name: 'InvalidSValue',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: '_hash',
              type: 'bytes32'
            },
            {
              internalType: 'bytes',
              name: '_signature',
              type: 'bytes'
            }
          ],
          name: 'InvalidSignature',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_flag',
              type: 'uint256'
            }
          ],
          name: 'InvalidSignatureFlag',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'bytes',
              name: '_signature',
              type: 'bytes'
            }
          ],
          name: 'InvalidSignatureLength',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'bytes1',
              name: '_type',
              type: 'bytes1'
            }
          ],
          name: 'InvalidSignatureType',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'bytes',
              name: '_signature',
              type: 'bytes'
            },
            {
              internalType: 'uint256',
              name: '_v',
              type: 'uint256'
            }
          ],
          name: 'InvalidVValue',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'bytes',
              name: '_signature',
              type: 'bytes'
            },
            {
              internalType: 'uint256',
              name: 'threshold',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: '_weight',
              type: 'uint256'
            }
          ],
          name: 'LowWeightChainedSignature',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_index',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: '_requested',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: '_available',
              type: 'uint256'
            }
          ],
          name: 'NotEnoughGas',
          type: 'error'
        },
        {
          inputs: [],
          name: 'OnlyDelegatecall',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_sender',
              type: 'address'
            },
            {
              internalType: 'address',
              name: '_self',
              type: 'address'
            }
          ],
          name: 'OnlySelfAuth',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'bytes',
              name: '_signature',
              type: 'bytes'
            }
          ],
          name: 'SignerIsAddress0',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'bytes',
              name: '_signature',
              type: 'bytes'
            },
            {
              internalType: 'uint256',
              name: '_type',
              type: 'uint256'
            },
            {
              internalType: 'bool',
              name: '_recoverMode',
              type: 'bool'
            }
          ],
          name: 'UnsupportedSignatureType',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_current',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: '_prev',
              type: 'uint256'
            }
          ],
          name: 'WrongChainedCheckpointOrder',
          type: 'error'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: '_contract',
              type: 'address'
            }
          ],
          name: 'CreatedContract',
          type: 'event'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'bytes4',
              name: '_signature',
              type: 'bytes4'
            },
            {
              indexed: false,
              internalType: 'address',
              name: '_implementation',
              type: 'address'
            }
          ],
          name: 'DefinedHook',
          type: 'event'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'bytes32',
              name: '_hash',
              type: 'bytes32'
            }
          ],
          name: 'IPFSRootUpdated',
          type: 'event'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'bytes32',
              name: 'newImageHash',
              type: 'bytes32'
            }
          ],
          name: 'ImageHashUpdated',
          type: 'event'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'newImplementation',
              type: 'address'
            }
          ],
          name: 'ImplementationUpdated',
          type: 'event'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: '_space',
              type: 'uint256'
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_newNonce',
              type: 'uint256'
            }
          ],
          name: 'NonceChange',
          type: 'event'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: '_imageHash',
              type: 'bytes32'
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_expiration',
              type: 'uint256'
            }
          ],
          name: 'SetExtraImageHash',
          type: 'event'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: '_tx',
              type: 'bytes32'
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_index',
              type: 'uint256'
            }
          ],
          name: 'TxExecuted',
          type: 'event'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: '_tx',
              type: 'bytes32'
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_index',
              type: 'uint256'
            },
            {
              indexed: false,
              internalType: 'bytes',
              name: '_reason',
              type: 'bytes'
            }
          ],
          name: 'TxFailed',
          type: 'event'
        },
        {
          stateMutability: 'payable',
          type: 'fallback'
        },
        {
          inputs: [],
          name: 'FACTORY',
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
          name: 'INIT_CODE_HASH',
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
          inputs: [],
          name: 'SET_IMAGE_HASH_TYPE_HASH',
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
          inputs: [],
          name: 'UPGRADEABLE_IMPLEMENTATION',
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
              internalType: 'bytes4',
              name: '_signature',
              type: 'bytes4'
            },
            {
              internalType: 'address',
              name: '_implementation',
              type: 'address'
            }
          ],
          name: 'addHook',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'bytes32[]',
              name: '_imageHashes',
              type: 'bytes32[]'
            }
          ],
          name: 'clearExtraImageHashes',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'bytes',
              name: '_code',
              type: 'bytes'
            }
          ],
          name: 'createContract',
          outputs: [
            {
              internalType: 'address',
              name: 'addr',
              type: 'address'
            }
          ],
          stateMutability: 'payable',
          type: 'function'
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: 'bool',
                  name: 'delegateCall',
                  type: 'bool'
                },
                {
                  internalType: 'bool',
                  name: 'revertOnError',
                  type: 'bool'
                },
                {
                  internalType: 'uint256',
                  name: 'gasLimit',
                  type: 'uint256'
                },
                {
                  internalType: 'address',
                  name: 'target',
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
                }
              ],
              internalType: 'struct IModuleCalls.Transaction[]',
              name: '_txs',
              type: 'tuple[]'
            },
            {
              internalType: 'uint256',
              name: '_nonce',
              type: 'uint256'
            },
            {
              internalType: 'bytes',
              name: '_signature',
              type: 'bytes'
            }
          ],
          name: 'execute',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: '_imageHash',
              type: 'bytes32'
            }
          ],
          name: 'extraImageHash',
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
          inputs: [],
          name: 'ipfsRoot',
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
          inputs: [],
          name: 'ipfsRootBytes32',
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
              name: '_hash',
              type: 'bytes32'
            },
            {
              internalType: 'bytes',
              name: '_signatures',
              type: 'bytes'
            }
          ],
          name: 'isValidSignature',
          outputs: [
            {
              internalType: 'bytes4',
              name: '',
              type: 'bytes4'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'bytes',
              name: '_data',
              type: 'bytes'
            },
            {
              internalType: 'bytes',
              name: '_signatures',
              type: 'bytes'
            }
          ],
          name: 'isValidSignature',
          outputs: [
            {
              internalType: 'bytes4',
              name: '',
              type: 'bytes4'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'nonce',
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
              internalType: 'bytes4',
              name: '_signature',
              type: 'bytes4'
            }
          ],
          name: 'readHook',
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
              internalType: 'uint256',
              name: '_space',
              type: 'uint256'
            }
          ],
          name: 'readNonce',
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
              internalType: 'bytes4',
              name: '_signature',
              type: 'bytes4'
            }
          ],
          name: 'removeHook',
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
                  name: 'delegateCall',
                  type: 'bool'
                },
                {
                  internalType: 'bool',
                  name: 'revertOnError',
                  type: 'bool'
                },
                {
                  internalType: 'uint256',
                  name: 'gasLimit',
                  type: 'uint256'
                },
                {
                  internalType: 'address',
                  name: 'target',
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
                }
              ],
              internalType: 'struct IModuleCalls.Transaction[]',
              name: '_txs',
              type: 'tuple[]'
            }
          ],
          name: 'selfExecute',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: '_imageHash',
              type: 'bytes32'
            },
            {
              internalType: 'uint256',
              name: '_expiration',
              type: 'uint256'
            }
          ],
          name: 'setExtraImageHash',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: '_digest',
              type: 'bytes32'
            },
            {
              internalType: 'bytes',
              name: '_signature',
              type: 'bytes'
            }
          ],
          name: 'signatureRecovery',
          outputs: [
            {
              internalType: 'uint256',
              name: 'threshold',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'weight',
              type: 'uint256'
            },
            {
              internalType: 'bytes32',
              name: 'imageHash',
              type: 'bytes32'
            },
            {
              internalType: 'bytes32',
              name: 'subdigest',
              type: 'bytes32'
            },
            {
              internalType: 'uint256',
              name: 'checkpoint',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
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
          stateMutability: 'pure',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: '_hash',
              type: 'bytes32'
            }
          ],
          name: 'updateIPFSRoot',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: '_imageHash',
              type: 'bytes32'
            }
          ],
          name: 'updateImageHash',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: '_imageHash',
              type: 'bytes32'
            },
            {
              internalType: 'bytes32',
              name: '_ipfsRoot',
              type: 'bytes32'
            }
          ],
          name: 'updateImageHashAndIPFS',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_implementation',
              type: 'address'
            }
          ],
          name: 'updateImplementation',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          stateMutability: 'payable',
          type: 'receive'
        }
      ],
      '0x6101006040523480156200001257600080fd5b5060405162003a1838038062003a188339810160408190526200003591620000c2565b30608052604080516060810190915260288082528391839160009190620039f060208301396040516200006e91903090602001620000fa565b60408051601f19818403018152919052805160209091012060a052506001600160a01b0391821660c0521660e052506200012e9050565b80516001600160a01b0381168114620000bd57600080fd5b919050565b60008060408385031215620000d657600080fd5b620000e183620000a5565b9150620000f160208401620000a5565b90509250929050565b6000835160005b818110156200011d576020818701810151858301520162000101565b509190910191825250602001919050565b60805160a05160c05160e0516138736200017d600039600081816105b40152611496015260008181610484015261251b015260008181610422015261254c01526000610c5001526138736000f3fe6080604052600436106101bb5760003560e01c80637a9a1628116100ec578063a4ab5f9f1161008a578063bc197c8111610064578063bc197c81146106a0578063c71f1f96146106e8578063d0748f71146106fd578063f23a6e611461071d576101c2565b8063a4ab5f9f1461064b578063affed0e01461066b578063b93ea7ad14610680576101c2565b80638c3f5563116100c65780638c3f5563146105d65780638efa6441146105f657806390042baf14610618578063a38cef191461062b576101c2565b80637a9a16281461053a578063853c50681461055a578063888eeec6146105a2576101c2565b8063257671f5116101595780634598154f116101335780634598154f146104a65780634fcf3eca146104c657806357c56d6b146104e657806361c2926c1461051a576101c2565b8063257671f51461041057806329561426146104525780632dd3100014610472576101c2565b8063150b7a0211610195578063150b7a02146103155780631626ba7e1461038b5780631a9b2337146103ab57806320c13b0b146103f0576101c2565b806301ffc9a7146102a0578063025b22bc146102d5578063038dbaac146102f5576101c2565b366101c257005b6004361061029e5760006101f96000357fffffffff0000000000000000000000000000000000000000000000000000000016610763565b905073ffffffffffffffffffffffffffffffffffffffff81161561029c576000808273ffffffffffffffffffffffffffffffffffffffff16600036604051610242929190612cd1565b600060405180830381855af49150503d806000811461027d576040519150601f19603f3d011682016040523d82523d6000602084013e610282565b606091505b50915091508161029457805160208201fd5b805160208201f35b505b005b3480156102ac57600080fd5b506102c06102bb366004612d0f565b6107b7565b60405190151581526020015b60405180910390f35b3480156102e157600080fd5b5061029e6102f0366004612d55565b6107c2565b34801561030157600080fd5b5061029e610310366004612dbc565b610814565b34801561032157600080fd5b5061035a610330366004612e40565b7f150b7a020000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016102cc565b34801561039757600080fd5b5061035a6103a6366004612eaf565b61091f565b3480156103b757600080fd5b506103cb6103c6366004612d0f565b61096c565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016102cc565b3480156103fc57600080fd5b5061035a61040b366004612efb565b610977565b34801561041c57600080fd5b506104447f000000000000000000000000000000000000000000000000000000000000000081565b6040519081526020016102cc565b34801561045e57600080fd5b5061029e61046d366004612f67565b6109dc565b34801561047e57600080fd5b506103cb7f000000000000000000000000000000000000000000000000000000000000000081565b3480156104b257600080fd5b5061029e6104c1366004612f80565b610a26565b3480156104d257600080fd5b5061029e6104e1366004612d0f565b610aeb565b3480156104f257600080fd5b506104447f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d181565b34801561052657600080fd5b5061029e610535366004612dbc565b610bb3565b34801561054657600080fd5b5061029e610555366004612fa2565b610c39565b34801561056657600080fd5b5061057a610575366004612eaf565b610d3e565b604080519586526020860194909452928401919091526060830152608082015260a0016102cc565b3480156105ae57600080fd5b506103cb7f000000000000000000000000000000000000000000000000000000000000000081565b3480156105e257600080fd5b506104446105f1366004612f67565b610f06565b34801561060257600080fd5b5061060b610f32565b6040516102cc9190613079565b6103cb6106263660046130bb565b610fb3565b34801561063757600080fd5b5061029e610646366004612f67565b61109d565b34801561065757600080fd5b50610444610666366004612f67565b6110e7565b34801561067757600080fd5b506104446110f2565b34801561068c57600080fd5b5061029e61069b36600461318a565b611103565b3480156106ac57600080fd5b5061035a6106bb3660046131bf565b7fbc197c810000000000000000000000000000000000000000000000000000000098975050505050505050565b3480156106f457600080fd5b506104446111ce565b34801561070957600080fd5b5061029e610718366004612f80565b6111f8565b34801561072957600080fd5b5061035a61073836600461327a565b7ff23a6e61000000000000000000000000000000000000000000000000000000009695505050505050565b60006107b17fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1207fffffffff00000000000000000000000000000000000000000000000000000000841661124b565b92915050565b60006107b1826112a9565b333014610808576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044015b60405180910390fd5b61081181611305565b50565b333014610855576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044016107ff565b8060005b81811015610919576000848483818110610875576108756132f2565b9050602002013590506108d5816000604080517f849e7bdc245db17e50b9f43086f1914d70eb4dab6dd89af4d541d53353ad97de602080830191909152818301859052825180830384018152606090920190925280519101208190555050565b807f804f6171d6008d9e16ee3aa0561fec328397f4ba2827a6605db388cfdefa3b0c600060405161090891815260200190565b60405180910390a250600101610859565b50505050565b60008061092d8585856113c0565b509050801561095f57507f1626ba7e000000000000000000000000000000000000000000000000000000009050610965565b50600090505b9392505050565b60006107b182610763565b60008061099c868660405161098d929190612cd1565b604051809103902085856113c0565b50905080156109ce57507f20c13b0b0000000000000000000000000000000000000000000000000000000090506109d4565b50600090505b949350505050565b333014610a1d576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044016107ff565b610811816113fe565b333014610a67576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044016107ff565b604080517f849e7bdc245db17e50b9f43086f1914d70eb4dab6dd89af4d541d53353ad97de602080830191909152818301859052825180830384018152606083019384905280519101208390559082905282907f804f6171d6008d9e16ee3aa0561fec328397f4ba2827a6605db388cfdefa3b0c9060800160405180910390a25050565b333014610b2c576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044016107ff565b6000610b3782610763565b73ffffffffffffffffffffffffffffffffffffffff1603610ba8576040517f1c3812cc0000000000000000000000000000000000000000000000000000000081527fffffffff00000000000000000000000000000000000000000000000000000000821660048201526024016107ff565b6108118160006114ba565b333014610bf4576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044016107ff565b6000610c278383604051602001610c0c9291906134c9565b6040516020818303038152906040528051906020012061157a565b9050610c348184846115ff565b505050565b73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163003610ca8576040517f0a57d61d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610cb183611787565b600080610ce9858888604051602001610ccc93929190613511565b6040516020818303038152906040528051906020012085856113c0565b9150915081610d2a578084846040517f8f4a234f0000000000000000000000000000000000000000000000000000000081526004016107ff93929190613534565b610d358188886115ff565b50505050505050565b60008060008060008087876000818110610d5a57610d5a6132f2565b909101357fff00000000000000000000000000000000000000000000000000000000000000169150819050610db057610d928961157a565b9250610d9f838989611884565b92985090965094509150610efb9050565b7fff0000000000000000000000000000000000000000000000000000000000000081811601610def57610de28961157a565b9250610d9f8389896118d5565b7ffe000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821601610e4157610de289611901565b7ffd000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821601610ea557610e9589898961196e565b9550955095509550955050610efb565b6040517f6085cd820000000000000000000000000000000000000000000000000000000081527fff00000000000000000000000000000000000000000000000000000000000000821660048201526024016107ff565b939792965093509350565b60006107b17f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e8361124b565b6060610f8f610f8a610f426111ce565b6040517f017012200000000000000000000000000000000000000000000000000000000060208201526024810191909152604401604051602081830303815290604052611aeb565b611d04565b604051602001610f9f919061354e565b604051602081830303815290604052905090565b6000333014610ff6576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044016107ff565b81516020830134f0905073ffffffffffffffffffffffffffffffffffffffff811661104f57816040517f0d2571910000000000000000000000000000000000000000000000000000000081526004016107ff9190613079565b60405173ffffffffffffffffffffffffffffffffffffffff821681527fa506ad4e7f05eceba62a023c3219e5bd98a615f4fa87e2afb08a2da5cf62bf0c9060200160405180910390a1919050565b3330146110de576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044016107ff565b61081181611d2d565b60006107b182611d86565b60006110fe6000610f06565b905090565b333014611144576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044016107ff565b600061114f83610763565b73ffffffffffffffffffffffffffffffffffffffff16146111c0576040517f5b4d6d6a0000000000000000000000000000000000000000000000000000000081527fffffffff00000000000000000000000000000000000000000000000000000000831660048201526024016107ff565b6111ca82826114ba565b5050565b60006110fe7f0eecac93ced8722d209199364cda3bc33da3bc3a23daef6be49ebd780511d0335490565b333014611239576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044016107ff565b611242826113fe565b6111ca81611d2d565b600080838360405160200161126a929190918252602082015260400190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152919052805160209091012054949350505050565b60007f2e74b92a000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316016112fc57506001919050565b6107b182611db2565b73ffffffffffffffffffffffffffffffffffffffff81163b61136b576040517f0c76093700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff821660048201526024016107ff565b611373813055565b60405173ffffffffffffffffffffffffffffffffffffffff821681527f310ba5f1d2ed074b51e2eccd052a47ae9ab7c6b800d1fca3db3999d6a592ca03906020015b60405180910390a150565b60008060008060006113d3888888610d3e565b509650919450925090508282108015906113f157506113f181611e0e565b9450505050935093915050565b80611435576040517f4294d12700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61145e7fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf8829055565b6040518181527f307ed6bd941ee9fc80f369c94af5fa11e25bab5102a6140191756c5474a30bfa9060200160405180910390a16108117f0000000000000000000000000000000000000000000000000000000000000000611305565b604080517fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1206020808301919091527fffffffff000000000000000000000000000000000000000000000000000000008516828401819052835180840385018152606084018086528151919093012073ffffffffffffffffffffffffffffffffffffffff8616908190559152608082015290517f0d7fc113eaf016db4681a1ba86d083ce3e0961f321062a75ac2b0aeb33deeed19181900360a00190a15050565b6040517f190100000000000000000000000000000000000000000000000000000000000060208201524660228201527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b166042820152605681018290526000906076015b604051602081830303815290604052805190602001209050919050565b8060005b81811015611780573684848381811061161e5761161e6132f2565b90506020028101906116309190613593565b90506040810135805a10156116855782815a6040517f2bb3e3ba0000000000000000000000000000000000000000000000000000000081526004810193909352602483019190915260448201526064016107ff565b600061169460208401846135d1565b156116d3576116cc6116ac6080850160608601612d55565b83156116b857836116ba565b5a5b6116c760a08701876135ec565b611e19565b905061170e565b61170b6116e66080850160608601612d55565b608085013584156116f757846116f9565b5a5b61170660a08801886135ec565b611e34565b90505b801561175357877f5c4eeb02dabf8976016ab414d617f9a162936dcace3cdef8c69ef6e262ad5ae78560405161174691815260200190565b60405180910390a2611775565b61177561176660408501602086016135d1565b8986611770611e51565b611e70565b505050600101611603565b5050505050565b606081901c6bffffffffffffffffffffffff821660006117a683610f06565b90508181146117f2576040517f9b6514f40000000000000000000000000000000000000000000000000000000081526004810184905260248101839052604481018290526064016107ff565b604080517f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e60208083019190915281830186905282518083038401815260609092019092528051910120600183019081905560408051858152602081018390527f1f180c27086c7a39ea2a7b25239d1ab92348f07ca7bb59d1438fcf527568f881910160405180910390a15050505050565b600080808061189f8761189a876006818b613651565b611ebe565b6000908152873560f01c6020818152604080842084526002909a013560e01c908190529890912090999198509695509350505050565b60008080806118f0876118eb876001818b613651565b611884565b935093509350935093509350935093565b6040517f190100000000000000000000000000000000000000000000000000000000000060208201526000602282018190527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b16604283015260568201839052906076016115e2565b6000808080806004600188013560e81c8261198983836136aa565b905061199b8b61057583868d8f613651565b939b50919950975095509350878710156119f3576119bb81848b8d613651565b89896040517fb006aba00000000000000000000000000000000000000000000000000000000081526004016107ff94939291906136bd565b8092505b88831015611add5760038301928a013560e81c9150611a1683836136aa565b90506000611a38611a2688612354565b8c8c8790869261057593929190613651565b939c50919a5098509091505088881015611a9057611a5882858c8e613651565b8a8a6040517fb006aba00000000000000000000000000000000000000000000000000000000081526004016107ff94939291906136bd565b848110611ad3576040517f37daf62b00000000000000000000000000000000000000000000000000000000815260048101829052602481018690526044016107ff565b93509150816119f7565b505050939792965093509350565b8051606090600381901b60006005600483010467ffffffffffffffff811115611b1657611b1661308c565b6040519080825280601f01601f191660200182016040528015611b40576020820181803683370190505b5090506000806000805b86811015611c5457888181518110611b6457611b646132f2565b01602001516008948501949390931b60f89390931c92909217915b60058410611c4c576040805180820190915260208082527f6162636465666768696a6b6c6d6e6f707172737475767778797a323334353637818301527ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb90950194601f85871c16908110611bf557611bf56132f2565b602001015160f81c60f81b858381518110611c1257611c126132f2565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600190910190611b7f565b600101611b4a565b508215611cf8576040518060400160405280602081526020017f6162636465666768696a6b6c6d6e6f707172737475767778797a3233343536378152508360050383901b601f1681518110611cab57611cab6132f2565b602001015160f81c60f81b848281518110611cc857611cc86132f2565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b50919695505050505050565b606081604051602001611d1791906136e4565b6040516020818303038152906040529050919050565b611d567f0eecac93ced8722d209199364cda3bc33da3bc3a23daef6be49ebd780511d033829055565b6040518181527f20d3ef1b5738a9f6d7beae515432206e7a8e2740ca6dcf46a952190ad01bcb51906020016113b5565b60006107b17f849e7bdc245db17e50b9f43086f1914d70eb4dab6dd89af4d541d53353ad97de8361124b565b60007f6ffbd451000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831601611e0557506001919050565b6107b182612388565b60006107b1826124c9565b60006040518284823760008084838989f49695505050505050565b6000604051828482376000808483898b8af1979650505050505050565b60603d604051915060208201818101604052818352816000823e505090565b8315611e7e57805160208201fd5b827fab46c69f7f32e1bf09b0725853da82a211e5402a0600296ab499a2fb5ea3b4198383604051611eb0929190613729565b60405180910390a250505050565b60008060005b8381101561234b57600181019085013560f81c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101611f6557601582019186013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff81169074ff000000000000000000000000000000000000000016811785611f4b5780611f5a565b60008681526020829052604090205b955050505050611ec4565b80611ffb5760018201918681013560f81c906043016000611f918a611f8c84888c8e613651565b6125f7565b60ff841697909701969194508491905060a083901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff82161786611fe05780611fef565b60008781526020829052604090205b96505050505050611ec4565b60028103612123576000808784013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff16601586019550909250905060008885013560e81c600386018162ffffff1691508096508192505050600081860190506120748b848c8c8a90869261206f93929190613651565b6128ba565b6120bc578a8361208683898d8f613651565b6040517f9a9462320000000000000000000000000000000000000000000000000000000081526004016107ff9493929190613742565b60ff8416979097019694508460a084901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff841617876121075780612116565b60008881526020829052604090205b9750505050505050611ec4565b600381036121565760208201918601358361213e578061214d565b60008481526020829052604090205b93505050611ec4565b600481036121a2576003808301928781013560e81c91908201016000806121838b61189a85898d8f613651565b60009889526020526040909720969097019650909350611ec492505050565b600681036122aa5760008287013560f81c60018401935060ff16905060008784013560f01c60028501945061ffff16905060008885013560e81c600386018162ffffff1691508096508192505050600081860190506000806122108d8d8d8b90879261189a93929190613651565b9398508893909250905084821061222657988501985b604080517f53657175656e6365206e657374656420636f6e6669673a0a0000000000000000602080830191909152603882018490526058820188905260788083018a905283518084039091018152609890920190925280519101208961228c578061229b565b60008a81526020829052604090205b99505050505050505050611ec4565b600581036123165760208201918601358781036122e5577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff94505b60006122f082612aa1565b9050846122fd578061230c565b60008581526020829052604090205b9450505050611ec4565b6040517fb2505f7c000000000000000000000000000000000000000000000000000000008152600481018290526024016107ff565b50935093915050565b7f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d160009081526020829052604081206107b1565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167fec6aba5000000000000000000000000000000000000000000000000000000000148061241b57507fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000145b8061246757507fffffffff0000000000000000000000000000000000000000000000000000000082167f150b7a0200000000000000000000000000000000000000000000000000000000145b806124b357507fffffffff0000000000000000000000000000000000000000000000000000000082167fc0ee0b8a00000000000000000000000000000000000000000000000000000000145b156124c057506001919050565b6107b182612adc565b60006125cb826040517fff0000000000000000000000000000000000000000000000000000000000000060208201527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000060601b166021820152603581018290527f000000000000000000000000000000000000000000000000000000000000000060558201526000903090607501604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152919052805160209091012073ffffffffffffffffffffffffffffffffffffffff161492915050565b156125d857506001919050565b60006125e383611d86565b905080158015906109655750421092915050565b6000604282146126375782826040517f2ee17a3d0000000000000000000000000000000000000000000000000000000081526004016107ff929190613782565b6000612650612647600185613796565b85013560f81c90565b60ff169050604084013560f81c843560208601357f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08111156126c4578686826040517fad4aac760000000000000000000000000000000000000000000000000000000081526004016107ff939291906137a9565b8260ff16601b141580156126dc57508260ff16601c14155b15612719578686846040517fe578897e0000000000000000000000000000000000000000000000000000000081526004016107ff939291906137cd565b60018403612786576040805160008152602081018083528a905260ff851691810191909152606081018390526080810182905260019060a0015b6020604051602081039080840390855afa158015612775573d6000803e3d6000fd5b50505060206040510351945061285e565b60028403612823576040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101899052600190605c01604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181528282528051602091820120600084529083018083525260ff861690820152606081018490526080810183905260a001612753565b86868560016040517f9dfba8520000000000000000000000000000000000000000000000000000000081526004016107ff94939291906137f4565b73ffffffffffffffffffffffffffffffffffffffff85166128af5786866040517f6c1719d20000000000000000000000000000000000000000000000000000000081526004016107ff929190613782565b505050509392505050565b60008181036128f5576040517fac241e1100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008383612904600182613796565b818110612913576129136132f2565b919091013560f81c915050600181148061292d5750600281145b15612972578473ffffffffffffffffffffffffffffffffffffffff166129548786866125f7565b73ffffffffffffffffffffffffffffffffffffffff16149150612a98565b60038103612a5d5773ffffffffffffffffffffffffffffffffffffffff8516631626ba7e87866000876129a6600182613796565b926129b393929190613651565b6040518463ffffffff1660e01b81526004016129d193929190613534565b602060405180830381865afa1580156129ee573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a129190613820565b7fffffffff00000000000000000000000000000000000000000000000000000000167f1626ba7e00000000000000000000000000000000000000000000000000000000149150612a98565b83838260006040517f9dfba8520000000000000000000000000000000000000000000000000000000081526004016107ff94939291906137f4565b50949350505050565b6040517f53657175656e636520737461746963206469676573743a0a00000000000000006020820152603881018290526000906058016115e2565b60007fe4a77bbc000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831601612b2f57506001919050565b6107b18260007f1cbec625000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831601612b8657506001919050565b6107b18260006107b18260007ffda4dd44000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831601612be357506001919050565b6107b18260007fffffffff0000000000000000000000000000000000000000000000000000000082167fac6a444e000000000000000000000000000000000000000000000000000000001480612c7a57507fffffffff0000000000000000000000000000000000000000000000000000000082167f36e7817500000000000000000000000000000000000000000000000000000000145b15612c8757506001919050565b7f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316146107b1565b8183823760009101908152919050565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461081157600080fd5b600060208284031215612d2157600080fd5b813561096581612ce1565b803573ffffffffffffffffffffffffffffffffffffffff81168114612d5057600080fd5b919050565b600060208284031215612d6757600080fd5b61096582612d2c565b60008083601f840112612d8257600080fd5b50813567ffffffffffffffff811115612d9a57600080fd5b6020830191508360208260051b8501011115612db557600080fd5b9250929050565b60008060208385031215612dcf57600080fd5b823567ffffffffffffffff811115612de657600080fd5b612df285828601612d70565b90969095509350505050565b60008083601f840112612e1057600080fd5b50813567ffffffffffffffff811115612e2857600080fd5b602083019150836020828501011115612db557600080fd5b600080600080600060808688031215612e5857600080fd5b612e6186612d2c565b9450612e6f60208701612d2c565b935060408601359250606086013567ffffffffffffffff811115612e9257600080fd5b612e9e88828901612dfe565b969995985093965092949392505050565b600080600060408486031215612ec457600080fd5b83359250602084013567ffffffffffffffff811115612ee257600080fd5b612eee86828701612dfe565b9497909650939450505050565b60008060008060408587031215612f1157600080fd5b843567ffffffffffffffff80821115612f2957600080fd5b612f3588838901612dfe565b90965094506020870135915080821115612f4e57600080fd5b50612f5b87828801612dfe565b95989497509550505050565b600060208284031215612f7957600080fd5b5035919050565b60008060408385031215612f9357600080fd5b50508035926020909101359150565b600080600080600060608688031215612fba57600080fd5b853567ffffffffffffffff80821115612fd257600080fd5b612fde89838a01612d70565b9097509550602088013594506040880135915080821115612ffe57600080fd5b50612e9e88828901612dfe565b60005b8381101561302657818101518382015260200161300e565b50506000910152565b6000815180845261304781602086016020860161300b565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b602081526000610965602083018461302f565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000602082840312156130cd57600080fd5b813567ffffffffffffffff808211156130e557600080fd5b818401915084601f8301126130f957600080fd5b81358181111561310b5761310b61308c565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156131515761315161308c565b8160405282815287602084870101111561316a57600080fd5b826020860160208301376000928101602001929092525095945050505050565b6000806040838503121561319d57600080fd5b82356131a881612ce1565b91506131b660208401612d2c565b90509250929050565b60008060008060008060008060a0898b0312156131db57600080fd5b6131e489612d2c565b97506131f260208a01612d2c565b9650604089013567ffffffffffffffff8082111561320f57600080fd5b61321b8c838d01612d70565b909850965060608b013591508082111561323457600080fd5b6132408c838d01612d70565b909650945060808b013591508082111561325957600080fd5b506132668b828c01612dfe565b999c989b5096995094979396929594505050565b60008060008060008060a0878903121561329357600080fd5b61329c87612d2c565b95506132aa60208801612d2c565b94506040870135935060608701359250608087013567ffffffffffffffff8111156132d457600080fd5b6132e089828a01612dfe565b979a9699509497509295939492505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b80358015158114612d5057600080fd5b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b81835260006020808501808196508560051b810191508460005b878110156134bc57828403895281357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff418836030181126133d357600080fd5b870160c06133e082613321565b151586526133ef878301613321565b15158688015260408281013590870152606073ffffffffffffffffffffffffffffffffffffffff613421828501612d2c565b16908701526080828101359087015260a080830135368490037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe101811261346757600080fd5b90920187810192903567ffffffffffffffff81111561348557600080fd5b80360384131561349457600080fd5b82828901526134a68389018286613331565b9c89019c97505050928601925050600101613394565b5091979650505050505050565b60408152600560408201527f73656c663a00000000000000000000000000000000000000000000000000000060608201526080602082015260006109d460808301848661337a565b83815260406020820152600061352b60408301848661337a565b95945050505050565b83815260406020820152600061352b604083018486613331565b7f697066733a2f2f0000000000000000000000000000000000000000000000000081526000825161358681600785016020870161300b565b9190910160070192915050565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff418336030181126135c757600080fd5b9190910192915050565b6000602082840312156135e357600080fd5b61096582613321565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261362157600080fd5b83018035915067ffffffffffffffff82111561363c57600080fd5b602001915036819003821315612db557600080fd5b6000808585111561366157600080fd5b8386111561366e57600080fd5b5050820193919092039150565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b808201808211156107b1576107b161367b565b6060815260006136d1606083018688613331565b6020830194909452506040015292915050565b7f620000000000000000000000000000000000000000000000000000000000000081526000825161371c81600185016020870161300b565b9190910160010192915050565b8281526040602082015260006109d4604083018461302f565b84815273ffffffffffffffffffffffffffffffffffffffff84166020820152606060408201526000613778606083018486613331565b9695505050505050565b6020815260006109d4602083018486613331565b818103818111156107b1576107b161367b565b6040815260006137bd604083018587613331565b9050826020830152949350505050565b6040815260006137e1604083018587613331565b905060ff83166020830152949350505050565b606081526000613808606083018688613331565b60208301949094525090151560409091015292915050565b60006020828403121561383257600080fd5b815161096581612ce156fea26469706673582212203c8d5199f30c123dff9711c13e6d1af00442c59755d475d5781636aabab62db364736f6c63430008120033603a600e3d39601a805130553df3363d3d373d3d3d363d30545af43d82803e903d91601857fd5bf3',
      signer
    )
  }
}

export const MAIN_MODULE_V2_VERIFICATION: Omit<VerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'contracts/modules/MainModule.sol:MainModule',
  version: 'v0.8.18+commit.87f61d96',
  licenceType: 'Apache-2.0',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'contracts/interfaces/IERC1271Wallet.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\ninterface IERC1271Wallet {\n\n  /**\n   * @notice Verifies whether the provided signature is valid with respect to the provided data\n   * @dev MUST return the correct magic value if the signature provided is valid for the provided data\n   *   > The bytes4 magic value to return when signature is valid is 0x20c13b0b : bytes4(keccak256("isValidSignature(bytes,bytes)")\n   *   > This function MAY modify Ethereum\'s state\n   * @param _data       Arbitrary length data signed on the behalf of address(this)\n   * @param _signature  Signature byte array associated with _data\n   * @return magicValue Magic value 0x20c13b0b if the signature is valid and 0x0 otherwise\n   */\n  function isValidSignature(\n    bytes calldata _data,\n    bytes calldata _signature)\n    external\n    view\n    returns (bytes4 magicValue);\n\n  /**\n   * @notice Verifies whether the provided signature is valid with respect to the provided hash\n   * @dev MUST return the correct magic value if the signature provided is valid for the provided hash\n   *   > The bytes4 magic value to return when signature is valid is 0x20c13b0b : bytes4(keccak256("isValidSignature(bytes,bytes)")\n   *   > This function MAY modify Ethereum\'s state\n   * @param _hash       keccak256 hash that was signed\n   * @param _signature  Signature byte array associated with _data\n   * @return magicValue Magic value 0x20c13b0b if the signature is valid and 0x0 otherwise\n   */\n  function isValidSignature(\n    bytes32 _hash,\n    bytes calldata _signature)\n    external\n    view\n    returns (bytes4 magicValue);\n}'
      },
      'contracts/interfaces/receivers/IERC1155Receiver.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\ninterface IERC1155Receiver {\n  function onERC1155Received(address, address, uint256, uint256, bytes calldata) external returns (bytes4);\n  function onERC1155BatchReceived(address, address, uint256[] calldata, uint256[] calldata, bytes calldata) external returns (bytes4);\n}\n'
      },
      'contracts/interfaces/receivers/IERC223Receiver.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\ninterface IERC223Receiver {\n  function tokenFallback(address, uint256, bytes calldata) external;\n}\n'
      },
      'contracts/interfaces/receivers/IERC721Receiver.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\ninterface IERC721Receiver {\n  function onERC721Received(address, address, uint256, bytes calldata) external returns (bytes4);\n}\n'
      },
      'contracts/modules/commons/Implementation.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n/**\n * @dev Allows modules to access the implementation slot\n */\ncontract Implementation {\n  /**\n   * @notice Updates the Wallet implementation\n   * @param _imp New implementation address\n   * @dev The wallet implementation is stored on the storage slot\n   *   defined by the address of the wallet itself\n   *   WARNING updating this value may break the wallet and users\n   *   must be confident that the new implementation is safe.\n   */\n  function _setImplementation(address _imp) internal {\n    assembly {\n      sstore(address(), _imp)\n    }\n  }\n\n  /**\n   * @notice Returns the Wallet implementation\n   * @return _imp The address of the current Wallet implementation\n   */\n  function _getImplementation() internal view returns (address _imp) {\n    assembly {\n      _imp := sload(address())\n    }\n  }\n}\n'
      },
      'contracts/modules/commons/interfaces/IModuleAuth.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\nabstract contract IModuleAuth {\n  //                        IMAGE_HASH_KEY = keccak256("org.arcadeum.module.auth.upgradable.image.hash");\n  bytes32 internal constant IMAGE_HASH_KEY = bytes32(0xea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf8);\n\n  event ImageHashUpdated(bytes32 newImageHash);\n\n  // Errors\n  error ImageHashIsZero();\n  error InvalidSignatureType(bytes1 _type);\n\n  function _signatureValidation(\n    bytes32 _digest,\n    bytes calldata _signature\n  ) internal virtual view returns (\n    bool isValid,\n    bytes32 subdigest\n  );\n\n  function signatureRecovery(\n    bytes32 _digest,\n    bytes calldata _signature\n  ) public virtual view returns (\n    uint256 threshold,\n    uint256 weight,\n    bytes32 imageHash,\n    bytes32 subdigest,\n    uint256 checkpoint\n  );\n\n  /**\n   * @notice Validates the signature image\n   * @return true if the signature image is valid\n   */\n  function _isValidImage(bytes32) internal virtual view returns (bool) {\n    return false;\n  }\n\n  /**\n   * @notice Updates the signers configuration of the wallet\n   * @param _imageHash New required image hash of the signature\n   */\n  function updateImageHash(bytes32 _imageHash) external virtual;\n\n  /**\n   * @notice Updates the signers configuration of the wallet\n   * @param _imageHash New required image hash of the signature\n   */\n  function _updateImageHash(bytes32 _imageHash) internal virtual;\n}\n'
      },
      'contracts/modules/commons/interfaces/IModuleCalls.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\ninterface IModuleCalls {\n  // Events\n  event TxFailed(bytes32 indexed _tx, uint256 _index, bytes _reason);\n  event TxExecuted(bytes32 indexed _tx, uint256 _index);\n\n  // Errors\n  error NotEnoughGas(uint256 _index, uint256 _requested, uint256 _available);\n  error InvalidSignature(bytes32 _hash, bytes _signature);\n\n  // Transaction structure\n  struct Transaction {\n    bool delegateCall;   // Performs delegatecall\n    bool revertOnError;  // Reverts transaction bundle if tx fails\n    uint256 gasLimit;    // Maximum gas to be forwarded\n    address target;      // Address of the contract to call\n    uint256 value;       // Amount of ETH to pass with the call\n    bytes data;          // calldata to pass\n  }\n\n  /**\n   * @notice Allow wallet owner to execute an action\n   * @param _txs        Transactions to process\n   * @param _nonce      Signature nonce (may contain an encoded space)\n   * @param _signature  Encoded signature\n   */\n  function execute(\n    Transaction[] calldata _txs,\n    uint256 _nonce,\n    bytes calldata _signature\n  ) external;\n\n  /**\n   * @notice Allow wallet to execute an action\n   *   without signing the message\n   * @param _txs  Transactions to execute\n   */\n  function selfExecute(\n    Transaction[] calldata _txs\n  ) external;\n}\n'
      },
      'contracts/modules/commons/interfaces/IModuleCreator.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\ninterface IModuleCreator {\n  error CreateFailed(bytes _code);\n\n  /**\n   * @notice Creates a contract forwarding eth value\n   * @param _code Creation code of the contract\n   * @return addr The address of the created contract\n   */\n  function createContract(bytes calldata _code) external payable returns (address addr);\n}\n'
      },
      'contracts/modules/commons/interfaces/IModuleHooks.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\ninterface IModuleHooks {\n  // Errors\n  error HookAlreadyExists(bytes4 _signature);\n  error HookDoesNotExist(bytes4 _signature);\n\n  // Events\n  event DefinedHook(bytes4 _signature, address _implementation);\n\n  /**\n   * @notice Reads the implementation hook of a signature\n   * @param _signature Signature function\n   * @return The address of the implementation hook, address(0) if none\n  */\n  function readHook(bytes4 _signature) external view returns (address);\n\n  /**\n   * @notice Adds a new hook to handle a given function selector\n   * @param _signature Signature function linked to the hook\n   * @param _implementation Hook implementation contract\n   */\n  function addHook(bytes4 _signature, address _implementation) external;\n\n  /**\n   * @notice Removes a registered hook\n   * @param _signature Signature function linked to the hook\n   */\n  function removeHook(bytes4 _signature) external;\n}\n'
      },
      'contracts/modules/commons/interfaces/IModuleUpdate.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\nabstract contract IModuleUpdate {\n  // Errors\n  error InvalidImplementation(address _implementation);\n\n  /**\n   * @notice Updates the implementation of the base wallet\n   * @param _implementation New main module implementation\n   * @dev WARNING Updating the implementation can brick the wallet\n   */\n  function updateImplementation(address _implementation) external virtual;\n\n  /**\n   * @notice Updates the implementation of the base wallet, used internally.\n   * @param _implementation New main module implementation\n   * @dev WARNING Updating the implementation can brick the wallet\n   */\n  function _updateImplementation(address _implementation) internal virtual;\n}\n'
      },
      'contracts/modules/commons/ModuleAuth.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "../../utils/LibBytes.sol";\nimport "../../interfaces/IERC1271Wallet.sol";\n\nimport "./interfaces/IModuleAuth.sol";\n\nimport "./ModuleERC165.sol";\n\nimport "./submodules/auth/SequenceBaseSig.sol";\nimport "./submodules/auth/SequenceDynamicSig.sol";\nimport "./submodules/auth/SequenceNoChainIdSig.sol";\nimport "./submodules/auth/SequenceChainedSig.sol";\n\n\nabstract contract ModuleAuth is\n  IModuleAuth,\n  ModuleERC165,\n  IERC1271Wallet,\n  SequenceChainedSig\n{\n  using LibBytes for bytes;\n\n  bytes1 internal constant LEGACY_TYPE = hex"00";\n  bytes1 internal constant DYNAMIC_TYPE = hex"01";\n  bytes1 internal constant NO_CHAIN_ID_TYPE = hex"02";\n  bytes1 internal constant CHAINED_TYPE = hex"03";\n\n  bytes4 internal constant SELECTOR_ERC1271_BYTES_BYTES = 0x20c13b0b;\n  bytes4 internal constant SELECTOR_ERC1271_BYTES32_BYTES = 0x1626ba7e;\n\n  /**\n   * @notice Recovers the threshold, weight, imageHash, subdigest, and checkpoint of a signature.\n   * @dev The signature must be prefixed with a type byte, which is used to determine the recovery method.\n   *\n   * @param _digest Digest of the signed data.\n   * @param _signature A Sequence signature.\n   *\n   * @return threshold The required number of signatures needed to consider the signature valid.\n   * @return weight The actual number of signatures collected in the signature.\n   * @return imageHash The imageHash of the configuration that signed the message.\n   * @return subdigest A modified version of the original digest, unique for each wallet/network.\n   * @return checkpoint A nonce that is incremented every time a new configuration is set.\n   */\n  function signatureRecovery(\n    bytes32 _digest,\n    bytes calldata _signature\n  ) public override virtual view returns (\n    uint256 threshold,\n    uint256 weight,\n    bytes32 imageHash,\n    bytes32 subdigest,\n    uint256 checkpoint\n  ) {\n    bytes1 signatureType = _signature[0];\n\n    if (signatureType == LEGACY_TYPE) {\n      // networkId digest + base recover\n      subdigest = SequenceBaseSig.subdigest(_digest);\n      (threshold, weight, imageHash, checkpoint) = SequenceBaseSig.recover(subdigest, _signature);\n      return (threshold, weight, imageHash, subdigest, checkpoint);\n    }\n\n    if (signatureType == DYNAMIC_TYPE) {\n      // networkId digest + dynamic recover\n      subdigest = SequenceBaseSig.subdigest(_digest);\n      (threshold, weight, imageHash, checkpoint) = SequenceDynamicSig.recover(subdigest, _signature);\n      return (threshold, weight, imageHash, subdigest, checkpoint);\n    }\n\n    if (signatureType == NO_CHAIN_ID_TYPE) {\n      // noChainId digest + dynamic recover\n      subdigest = SequenceNoChainIdSig.subdigest(_digest);\n      (threshold, weight, imageHash, checkpoint) = SequenceDynamicSig.recover(subdigest, _signature);\n      return (threshold, weight, imageHash, subdigest, checkpoint);\n    }\n\n    if (signatureType == CHAINED_TYPE) {\n      // original digest + chained recover\n      // (subdigest will be computed in the chained recover)\n      return chainedRecover(_digest, _signature);\n    }\n\n    revert InvalidSignatureType(signatureType);\n  }\n\n  /**\n   * @dev Validates a signature.\n   *\n   * @param _digest Digest of the signed data.\n   * @param _signature A Sequence signature.\n   *\n   * @return isValid Indicates whether the signature is valid or not.\n   * @return subdigest A modified version of the original digest, unique for each wallet/network.\n   */\n  function _signatureValidation(\n    bytes32 _digest,\n    bytes calldata _signature\n  ) internal override virtual view returns (\n    bool isValid,\n    bytes32 subdigest\n  ) {\n    uint256 threshold; uint256 weight; bytes32 imageHash;\n    (threshold, weight, imageHash, subdigest,) = signatureRecovery(_digest, _signature);\n    isValid = weight >= threshold && _isValidImage(imageHash);\n  }\n\n  /**\n   * @notice Verifies whether the provided signature is valid with respect to the provided data\n   * @dev MUST return the correct magic value if the signature provided is valid for the provided data\n   *   > The bytes4 magic value to return when signature is valid is 0x20c13b0b : bytes4(keccak256("isValidSignature(bytes,bytes)"))\n   * @param _data       Arbitrary length data signed on the behalf of address(this)\n   * @param _signatures Signature byte array associated with _data.\n   *                    Encoded as abi.encode(Signature[], Configs)\n   * @return magicValue Magic value 0x20c13b0b if the signature is valid and 0x0 otherwise\n   */\n  function isValidSignature(\n    bytes calldata _data,\n    bytes calldata _signatures\n  ) public override virtual view returns (bytes4) {\n    // Validate signatures\n    (bool isValid,) = _signatureValidation(keccak256(_data), _signatures);\n    if (isValid) {\n      return SELECTOR_ERC1271_BYTES_BYTES;\n    }\n\n    return bytes4(0);\n  }\n\n  /**\n   * @notice Verifies whether the provided signature is valid with respect to the provided hash\n   * @dev MUST return the correct magic value if the signature provided is valid for the provided hash\n   *   > The bytes4 magic value to return when signature is valid is 0x1626ba7e : bytes4(keccak256("isValidSignature(bytes32,bytes)"))\n   * @param _hash       keccak256 hash that was signed\n   * @param _signatures Signature byte array associated with _data.\n   *                    Encoded as abi.encode(Signature[], Configs)\n   * @return magicValue Magic value 0x1626ba7e if the signature is valid and 0x0 otherwise\n   */\n  function isValidSignature(\n    bytes32 _hash,\n    bytes calldata _signatures\n  ) public override virtual view returns (bytes4) {\n    // Validate signatures\n    (bool isValid,) = _signatureValidation(_hash, _signatures);\n    if (isValid) {\n      return SELECTOR_ERC1271_BYTES32_BYTES;\n    }\n\n    return bytes4(0);\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override virtual pure returns (bool) {\n    if (\n      _interfaceID == type(IModuleAuth).interfaceId ||\n      _interfaceID == type(IERC1271Wallet).interfaceId\n    ) {\n      return true;\n    }\n\n    return super.supportsInterface(_interfaceID);\n  }\n\n  /**\n   * @notice Updates the signers configuration of the wallet\n   * @param _imageHash New required image hash of the signature\n   */\n  function updateImageHash(bytes32 _imageHash) external override virtual onlySelf {\n    _updateImageHash(_imageHash);\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleAuthConvenience.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./ModuleSelfAuth.sol";\nimport "./ModuleAuth.sol";\nimport "./ModuleIPFS.sol";\nimport "./ModuleERC165.sol";\n\nimport "../../utils/LibString.sol";\n\n\n\nabstract contract ModuleAuthConvenience is ModuleERC165, ModuleSelfAuth, ModuleAuth, ModuleIPFS {\n\n  /**\n  * @notice Updates the image hash and the IPFS root in a single operation.\n  * @dev These two operations are often performed together, so this function\n  *      allows to save some gas by performing them in a single step.\n  *\n  * @param _imageHash The new image hash to be set.\n  * @param _ipfsRoot The new IPFS root to be set.\n  */\n  function updateImageHashAndIPFS(\n    bytes32 _imageHash,\n    bytes32 _ipfsRoot\n  ) external onlySelf {\n    _updateImageHash(_imageHash);\n    _updateIPFSRoot(_ipfsRoot);\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override (\n    ModuleERC165,\n    ModuleAuth\n  ) virtual pure returns (bool) {\n    if (_interfaceID == type(ModuleAuthConvenience).interfaceId) {\n      return true;\n    }\n\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleAuthFixed.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./ModuleAuth.sol";\nimport "./ModuleUpdate.sol";\nimport "./ModuleSelfAuth.sol";\nimport "./ModuleStorage.sol";\n\nimport "../../Wallet.sol";\n\n/**\n *  Implements ModuleAuth by validating the signature image against\n *  the salt used to deploy the contract\n *\n *  This module allows wallets to be deployed with a default configuration\n *  without using any aditional contract storage\n */\nabstract contract ModuleAuthFixed is ModuleSelfAuth, ModuleAuth, ModuleUpdate {\n  bytes32 public immutable INIT_CODE_HASH;\n  address public immutable FACTORY;\n  address public immutable UPGRADEABLE_IMPLEMENTATION;\n\n  constructor(address _factory, address _mainModuleUpgradeable) {\n    // Build init code hash of the deployed wallets using that module\n    bytes32 initCodeHash = keccak256(abi.encodePacked(Wallet.creationCode, uint256(uint160(address(this)))));\n\n    INIT_CODE_HASH = initCodeHash;\n    FACTORY = _factory;\n    UPGRADEABLE_IMPLEMENTATION = _mainModuleUpgradeable;\n  }\n\n  /**\n   * @notice Updates the configuration of the wallet\n   * @dev In the process of updating the configuration, the wallet implementation\n   *      is updated to the mainModuleUpgradeable, this only happens once in the\n   *      lifetime of the wallet.\n   *\n   * @param _imageHash New required image hash of the signature\n   */\n  function _updateImageHash(bytes32 _imageHash) internal override virtual {\n    // Update imageHash in storage\n    if (_imageHash == bytes32(0)) revert ImageHashIsZero();\n    ModuleStorage.writeBytes32(IMAGE_HASH_KEY, _imageHash);\n    emit ImageHashUpdated(_imageHash);\n\n    // Update wallet implementation to mainModuleUpgradeable\n    _updateImplementation(UPGRADEABLE_IMPLEMENTATION);\n  }\n\n  /**\n   * @notice Validates the signature image with the salt used to deploy the contract\n   * @param _imageHash Hash image of signature\n   * @return true if the signature image is valid\n   */\n  function _isValidImage(bytes32 _imageHash) internal override virtual view returns (bool) {\n    return address(\n      uint160(\n        uint256(\n          keccak256(\n            abi.encodePacked(\n              hex"ff",\n              FACTORY,\n              _imageHash,\n              INIT_CODE_HASH\n            )\n          )\n        )\n      )\n    ) == address(this);\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override(ModuleAuth, ModuleUpdate) virtual pure returns (bool) {\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleCalls.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./ModuleSelfAuth.sol";\nimport "./ModuleStorage.sol";\nimport "./ModuleERC165.sol";\nimport "./ModuleNonce.sol";\nimport "./ModuleOnlyDelegatecall.sol";\n\nimport "./interfaces/IModuleCalls.sol";\nimport "./interfaces/IModuleAuth.sol";\n\nimport "./submodules/nonce/SubModuleNonce.sol";\nimport "./submodules/auth/SequenceBaseSig.sol";\n\nimport "../../utils/LibOptim.sol";\n\n\nabstract contract ModuleCalls is IModuleCalls, IModuleAuth, ModuleERC165, ModuleOnlyDelegatecall, ModuleSelfAuth, ModuleNonce {\n  /**\n   * @notice Allow wallet owner to execute an action\n   * @dev Relayers must ensure that the gasLimit specified for each transaction\n   *      is acceptable to them. A user could specify large enough that it could\n   *      consume all the gas available.\n   * @param _txs        Transactions to process\n   * @param _nonce      Signature nonce (may contain an encoded space)\n   * @param _signature  Encoded signature\n   */\n  function execute(\n    Transaction[] calldata _txs,\n    uint256 _nonce,\n    bytes calldata _signature\n  ) external override virtual onlyDelegatecall {\n    // Validate and update nonce\n    _validateNonce(_nonce);\n\n    // Hash and verify transaction bundle\n    (bool isValid, bytes32 txHash) = _signatureValidation(\n      keccak256(\n        abi.encode(\n          _nonce,\n          _txs\n        )\n      ),\n      _signature\n    );\n\n    if (!isValid) {\n      revert InvalidSignature(txHash, _signature);\n    }\n\n    // Execute the transactions\n    _execute(txHash, _txs);\n  }\n\n  /**\n   * @notice Allow wallet to execute an action\n   *   without signing the message\n   * @param _txs  Transactions to execute\n   */\n  function selfExecute(\n    Transaction[] calldata _txs\n  ) external override virtual onlySelf {\n    // Hash transaction bundle\n    bytes32 txHash = SequenceBaseSig.subdigest(\n      keccak256(\n        abi.encode(\'self:\', _txs)\n      )\n    );\n\n    // Execute the transactions\n    _execute(txHash, _txs);\n  }\n\n  /**\n   * @notice Executes a list of transactions\n   * @param _txHash  Hash of the batch of transactions\n   * @param _txs  Transactions to execute\n   */\n  function _execute(\n    bytes32 _txHash,\n    Transaction[] calldata _txs\n  ) private {\n    unchecked {\n      // Execute transaction\n      uint256 size = _txs.length;\n      for (uint256 i = 0; i < size; i++) {\n        Transaction calldata transaction = _txs[i];\n        uint256 gasLimit = transaction.gasLimit;\n\n        if (gasleft() < gasLimit) revert NotEnoughGas(i, gasLimit, gasleft());\n\n        bool success;\n        if (transaction.delegateCall) {\n          success = LibOptim.delegatecall(\n            transaction.target,\n            gasLimit == 0 ? gasleft() : gasLimit,\n            transaction.data\n          );\n        } else {\n          success = LibOptim.call(\n            transaction.target,\n            transaction.value,\n            gasLimit == 0 ? gasleft() : gasLimit,\n            transaction.data\n          );\n        }\n\n        if (success) {\n          emit TxExecuted(_txHash, i);\n        } else {\n          // Avoid copy of return data until neccesary\n          _revertBytes(\n            transaction.revertOnError,\n            _txHash,\n            i,\n            LibOptim.returnData()\n          );\n        }\n      }\n    }\n  }\n\n  /**\n   * @notice Logs a failed transaction, reverts if the transaction is not optional\n   * @param _revertOnError  Signals if it should revert or just log\n   * @param _txHash         Hash of the transaction\n   * @param _index          Index of the transaction in the batch\n   * @param _reason         Encoded revert message\n   */\n  function _revertBytes(\n    bool _revertOnError,\n    bytes32 _txHash,\n    uint256 _index,\n    bytes memory _reason\n  ) internal {\n    if (_revertOnError) {\n      assembly { revert(add(_reason, 0x20), mload(_reason)) }\n    } else {\n      emit TxFailed(_txHash, _index, _reason);\n    }\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override virtual pure returns (bool) {\n    if (_interfaceID == type(IModuleCalls).interfaceId) {\n      return true;\n    }\n\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleCreator.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./interfaces/IModuleCreator.sol";\n\nimport "./ModuleSelfAuth.sol";\nimport "./ModuleERC165.sol";\n\n\ncontract ModuleCreator is IModuleCreator, ModuleERC165, ModuleSelfAuth {\n  event CreatedContract(address _contract);\n\n  /**\n   * @notice Creates a contract forwarding eth value\n   * @param _code Creation code of the contract\n   * @return addr The address of the created contract\n   */\n  function createContract(bytes memory _code) public override virtual payable onlySelf returns (address addr) {\n    assembly { addr := create(callvalue(), add(_code, 32), mload(_code)) }\n    if (addr == address(0)) revert CreateFailed(_code);\n    emit CreatedContract(addr);\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override virtual pure returns (bool) {\n    if (_interfaceID == type(IModuleCreator).interfaceId) {\n      return true;\n    }\n\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleERC165.sol': {
        content:
          "// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\nabstract contract ModuleERC165 {\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @dev Adding new hooks will not lead to them being reported by this function\n   *      without upgrading the wallet. In addition, developers must ensure that\n   *      all inherited contracts by the main module don't conflict and are accounted\n   *      to be supported by the supportsInterface method.\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) virtual public pure returns (bool) {\n    return _interfaceID == this.supportsInterface.selector;\n  }\n}\n"
      },
      'contracts/modules/commons/ModuleExtraAuth.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./ModuleAuth.sol";\nimport "./ModuleStorage.sol";\nimport "./ModuleSelfAuth.sol";\nimport "./ModuleERC165.sol";\n\n\nabstract contract ModuleExtraAuth is ModuleERC165, ModuleSelfAuth, ModuleAuth {\n  //                       EXTRA_IMAGE_HASH_KEY = keccak256("org.sequence.module.static.auth.extra.image.hash");\n  bytes32 private constant EXTRA_IMAGE_HASH_KEY = bytes32(0x849e7bdc245db17e50b9f43086f1914d70eb4dab6dd89af4d541d53353ad97de);\n\n  event SetExtraImageHash(bytes32 indexed _imageHash, uint256 _expiration);\n\n  function _writeExpirationForImageHash(bytes32 _imageHash, uint256 _expiration) internal {\n    ModuleStorage.writeBytes32Map(EXTRA_IMAGE_HASH_KEY, _imageHash, bytes32(_expiration));\n  }\n\n  function _readExpirationForImageHash(bytes32 _imageHash) internal view returns (uint256 _expiration) {\n    return uint256(ModuleStorage.readBytes32Map(EXTRA_IMAGE_HASH_KEY, _imageHash));\n  }\n\n  function _isValidImage(bytes32 _imageHash) internal override virtual view returns (bool) {\n    if (super._isValidImage(_imageHash)) {\n      return true;\n    }\n\n    uint256 expiration = _readExpirationForImageHash(_imageHash);\n\n    // solhint-disable-next-line not-rely-on-time\n    return expiration != 0 && expiration > block.timestamp;\n  }\n\n  function extraImageHash(bytes32 _imageHash) public view returns (uint256) {\n    return _readExpirationForImageHash(_imageHash);\n  }\n\n  function setExtraImageHash(bytes32 _imageHash, uint256 _expiration) external onlySelf {\n    _writeExpirationForImageHash(_imageHash, _expiration);\n\n    emit SetExtraImageHash(_imageHash, _expiration);\n  }\n\n  function clearExtraImageHashes(bytes32[] calldata _imageHashes) external onlySelf {\n    unchecked {\n      uint256 imageHashesLength = _imageHashes.length;\n      for (uint256 i = 0; i < imageHashesLength; i++) {\n        bytes32 imageHash = _imageHashes[i];\n        _writeExpirationForImageHash(imageHash, 0);\n\n       emit SetExtraImageHash(imageHash, 0);\n      }\n    }\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override (\n    ModuleERC165,\n    ModuleAuth\n  ) virtual pure returns (bool) {\n    if (_interfaceID == type(ModuleExtraAuth).interfaceId) {\n      return true;\n    }\n\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleHooks.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./interfaces/IModuleHooks.sol";\n\nimport "./ModuleSelfAuth.sol";\nimport "./ModuleStorage.sol";\nimport "./ModuleERC165.sol";\n\nimport "../../interfaces/receivers/IERC1155Receiver.sol";\nimport "../../interfaces/receivers/IERC721Receiver.sol";\nimport "../../interfaces/receivers/IERC223Receiver.sol";\n\n\ncontract ModuleHooks is IERC1155Receiver, IERC721Receiver, IModuleHooks, ModuleERC165, ModuleSelfAuth {\n  //                       HOOKS_KEY = keccak256("org.arcadeum.module.hooks.hooks");\n  bytes32 private constant HOOKS_KEY = bytes32(0xbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a120);\n\n  /**\n   * @notice Reads the implementation hook of a signature\n   * @param _signature Signature function\n   * @return The address of the implementation hook, address(0) if none\n  */\n  function readHook(bytes4 _signature) external override virtual view returns (address) {\n    return _readHook(_signature);\n  }\n\n  /**\n   * @notice Adds a new hook to handle a given function selector\n   * @param _signature Signature function linked to the hook\n   * @param _implementation Hook implementation contract\n   * @dev Can\'t overwrite hooks that are part of the main module (those defined below)\n   */\n  function addHook(bytes4 _signature, address _implementation) external override virtual onlySelf {\n    if (_readHook(_signature) != address(0)) revert HookAlreadyExists(_signature);\n    _writeHook(_signature, _implementation);\n  }\n\n  /**\n   * @notice Removes a registered hook\n   * @param _signature Signature function linked to the hook\n   * @dev Can\'t remove hooks that are part of the main module (those defined below)\n   *      without upgrading the wallet\n   */\n  function removeHook(bytes4 _signature) external override virtual onlySelf {\n    if (_readHook(_signature) == address(0)) revert HookDoesNotExist(_signature);\n    _writeHook(_signature, address(0));\n  }\n\n  /**\n   * @notice Reads the implementation hook of a signature\n   * @param _signature Signature function\n   * @return The address of the implementation hook, address(0) if none\n  */\n  function _readHook(bytes4 _signature) private view returns (address) {\n    return address(uint160(uint256(ModuleStorage.readBytes32Map(HOOKS_KEY, _signature))));\n  }\n\n  /**\n   * @notice Writes the implementation hook of a signature\n   * @param _signature Signature function\n   * @param _implementation Hook implementation contract\n  */\n  function _writeHook(bytes4 _signature, address _implementation) private {\n    ModuleStorage.writeBytes32Map(HOOKS_KEY, _signature, bytes32(uint256(uint160(_implementation))));\n    emit DefinedHook(_signature, _implementation);\n  }\n\n  /**\n   * @notice Handle the receipt of a single ERC1155 token type.\n   * @return `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`\n   */\n  function onERC1155Received(\n    address,\n    address,\n    uint256,\n    uint256,\n    bytes calldata\n  ) external override virtual returns (bytes4) {\n    return ModuleHooks.onERC1155Received.selector;\n  }\n\n  /**\n   * @notice Handle the receipt of multiple ERC1155 token types.\n   * @return `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`\n   */\n  function onERC1155BatchReceived(\n    address,\n    address,\n    uint256[] calldata,\n    uint256[] calldata,\n    bytes calldata\n  ) external override virtual returns (bytes4) {\n    return ModuleHooks.onERC1155BatchReceived.selector;\n  }\n\n  /**\n   * @notice Handle the receipt of a single ERC721 token.\n   * @return `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`\n   */\n  function onERC721Received(address, address, uint256, bytes calldata) external override virtual returns (bytes4) {\n    return ModuleHooks.onERC721Received.selector;\n  }\n\n  /**\n   * @notice Routes fallback calls through hooks\n   */\n  fallback() external payable {\n    if (msg.data.length >= 4) {\n      address target = _readHook(msg.sig);\n      if (target != address(0)) {\n        (bool success, bytes memory result) = target.delegatecall(msg.data);\n        assembly {\n          if iszero(success)  {\n            revert(add(result, 0x20), mload(result))\n          }\n\n          return(add(result, 0x20), mload(result))\n        }\n      }\n    }\n  }\n\n  /**\n   * @notice Allows the wallet to receive ETH\n   */\n  receive() external payable { }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override virtual pure returns (bool) {\n    if (\n      _interfaceID == type(IModuleHooks).interfaceId ||\n      _interfaceID == type(IERC1155Receiver).interfaceId ||\n      _interfaceID == type(IERC721Receiver).interfaceId ||\n      _interfaceID == type(IERC223Receiver).interfaceId\n    ) {\n      return true;\n    }\n\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleIPFS.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./ModuleSelfAuth.sol";\nimport "./ModuleStorage.sol";\n\nimport "../../utils/LibString.sol";\n\n\ncontract ModuleIPFS is ModuleSelfAuth {\n  event IPFSRootUpdated(bytes32 _hash);\n\n  //                       IPFS_ROOT_KEY = keccak256("sequence.ipfs.root")\n  bytes32 private constant IPFS_ROOT_KEY = bytes32(0x0eecac93ced8722d209199364cda3bc33da3bc3a23daef6be49ebd780511d033);\n\n  function ipfsRootBytes32() public view returns (bytes32) {\n    return ModuleStorage.readBytes32(IPFS_ROOT_KEY);\n  }\n\n  function ipfsRoot() public view returns (string memory) {\n    return string(\n      abi.encodePacked(\n        "ipfs://",\n        LibString.prefixBase32(\n          LibString.bytesToBase32(\n            abi.encodePacked(\n              hex\'01701220\',\n              ipfsRootBytes32()\n            )\n          )\n        )\n      )\n    );\n  }\n\n  function updateIPFSRoot(bytes32 _hash) external onlySelf {\n    _updateIPFSRoot(_hash);\n  }\n\n  function _updateIPFSRoot(bytes32 _hash) internal {\n    ModuleStorage.writeBytes32(IPFS_ROOT_KEY, _hash);\n    emit IPFSRootUpdated(_hash);\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleNonce.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./ModuleStorage.sol";\n\nimport "./submodules/nonce/SubModuleNonce.sol";\n\n\ncontract ModuleNonce {\n  // Events\n  event NonceChange(uint256 _space, uint256 _newNonce);\n\n  // Errors\n  error BadNonce(uint256 _space, uint256 _provided, uint256 _current);\n\n  //                       NONCE_KEY = keccak256("org.arcadeum.module.calls.nonce");\n  bytes32 private constant NONCE_KEY = bytes32(0x8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e);\n\n  /**\n   * @notice Returns the next nonce of the default nonce space\n   * @dev The default nonce space is 0x00\n   * @return The next nonce\n   */\n  function nonce() external virtual view returns (uint256) {\n    return readNonce(0);\n  }\n\n  /**\n   * @notice Returns the next nonce of the given nonce space\n   * @param _space Nonce space, each space keeps an independent nonce count\n   * @return The next nonce\n   */\n  function readNonce(uint256 _space) public virtual view returns (uint256) {\n    return uint256(ModuleStorage.readBytes32Map(NONCE_KEY, bytes32(_space)));\n  }\n\n  /**\n   * @notice Changes the next nonce of the given nonce space\n   * @param _space Nonce space, each space keeps an independent nonce count\n   * @param _nonce Nonce to write on the space\n   */\n  function _writeNonce(uint256 _space, uint256 _nonce) internal {\n    ModuleStorage.writeBytes32Map(NONCE_KEY, bytes32(_space), bytes32(_nonce));\n  }\n\n  /**\n   * @notice Verify if a nonce is valid\n   * @param _rawNonce Nonce to validate (may contain an encoded space)\n   */\n  function _validateNonce(uint256 _rawNonce) internal virtual {\n    // Retrieve current nonce for this wallet\n    (uint256 space, uint256 providedNonce) = SubModuleNonce.decodeNonce(_rawNonce);\n\n    uint256 currentNonce = readNonce(space);\n    if (currentNonce != providedNonce) {\n      revert BadNonce(space, providedNonce, currentNonce);\n    }\n\n    unchecked {\n      uint256 newNonce = providedNonce + 1;\n\n      _writeNonce(space, newNonce);\n      emit NonceChange(space, newNonce);\n      return;\n    }\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleOnlyDelegatecall.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\ncontract ModuleOnlyDelegatecall {\n  address private immutable self;\n\n  error OnlyDelegatecall();\n\n  constructor() {\n    self = address(this);\n  }\n\n  /**\n   * @notice Modifier that only allows functions to be called via delegatecall.\n   */\n  modifier onlyDelegatecall() {\n    if (address(this) == self) {\n      revert OnlyDelegatecall();\n    }\n    _;\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleSelfAuth.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\ncontract ModuleSelfAuth {\n  error OnlySelfAuth(address _sender, address _self);\n\n  modifier onlySelf() {\n    if (msg.sender != address(this)) {\n      revert OnlySelfAuth(msg.sender, address(this));\n    }\n    _;\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleStorage.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\nlibrary ModuleStorage {\n  function writeBytes32(bytes32 _key, bytes32 _val) internal {\n    assembly { sstore(_key, _val) }\n  }\n\n  function readBytes32(bytes32 _key) internal view returns (bytes32 val) {\n    assembly { val := sload(_key) }\n  }\n\n  function writeBytes32Map(bytes32 _key, bytes32 _subKey, bytes32 _val) internal {\n    bytes32 key = keccak256(abi.encode(_key, _subKey));\n    assembly { sstore(key, _val) }\n  }\n\n  function readBytes32Map(bytes32 _key, bytes32 _subKey) internal view returns (bytes32 val) {\n    bytes32 key = keccak256(abi.encode(_key, _subKey));\n    assembly { val := sload(key) }\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleUpdate.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./interfaces/IModuleUpdate.sol";\n\nimport "./Implementation.sol";\nimport "./ModuleSelfAuth.sol";\nimport "./ModuleERC165.sol";\n\nimport "../../utils/LibAddress.sol";\n\n\ncontract ModuleUpdate is IModuleUpdate, ModuleERC165, ModuleSelfAuth, Implementation {\n  using LibAddress for address;\n\n  event ImplementationUpdated(address newImplementation);\n\n  /**\n   * @notice Updates the implementation of the base wallet\n   * @param _implementation New main module implementation\n   * @dev WARNING Updating the implementation can brick the wallet\n   */\n  function updateImplementation(address _implementation) external override virtual onlySelf {\n    _updateImplementation(_implementation);\n  }\n\n  /**\n   * @notice Updates the implementation of the base wallet, used internally.\n   * @param _implementation New main module implementation\n   * @dev WARNING Updating the implementation can brick the wallet\n   */\n  function _updateImplementation(address _implementation) internal override virtual {\n    if (!_implementation.isContract()) revert InvalidImplementation(_implementation);\n    _setImplementation(_implementation);\n    emit ImplementationUpdated(_implementation);\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override virtual pure returns (bool) {\n    if (_interfaceID == type(IModuleUpdate).interfaceId) {\n      return true;\n    }\n\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/modules/commons/submodules/auth/SequenceBaseSig.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "../../../../utils/SignatureValidator.sol";\nimport "../../../../utils/LibBytesPointer.sol";\nimport "../../../../utils/LibBytes.sol";\nimport "../../../../utils/LibOptim.sol";\n\n\n/**\n * @title SequenceBaseSig Library\n * @author Agustin Aguilar (aa@horizon.io)\n * @notice A Solidity implementation for handling signatures in the Sequence protocol.\n */\nlibrary SequenceBaseSig {\n  using LibBytesPointer for bytes;\n\n  uint256 private constant FLAG_SIGNATURE = 0;\n  uint256 private constant FLAG_ADDRESS = 1;\n  uint256 private constant FLAG_DYNAMIC_SIGNATURE = 2;\n  uint256 private constant FLAG_NODE = 3;\n  uint256 private constant FLAG_BRANCH = 4;\n  uint256 private constant FLAG_SUBDIGEST = 5;\n  uint256 private constant FLAG_NESTED = 6;\n\n  error InvalidNestedSignature(bytes32 _hash, address _addr, bytes _signature);\n  error InvalidSignatureFlag(uint256 _flag);\n\n  /**\n  * @notice Generates a subdigest for the input digest (unique for this wallet and network).\n  * @param _digest The input digest to generate the subdigest from.\n  * @return bytes32 The subdigest generated from the input digest.\n  */\n  function subdigest(\n    bytes32 _digest\n  ) internal view returns (bytes32) {\n    return keccak256(\n      abi.encodePacked(\n        "\\x19\\x01",\n        block.chainid,\n        address(this),\n        _digest\n      )\n    );\n  }\n\n  /**\n  * @notice Generates the leaf for an address and weight.\n  * @dev The leaf is generated by concatenating the address and weight.\n  *\n  * @param _addr The address to generate the leaf for.\n  * @param _weight The weight to generate the leaf for.\n  * @return bytes32 The leaf generated from the address and weight.\n  */\n  function _leafForAddressAndWeight(\n    address _addr,\n    uint96 _weight\n  ) internal pure returns (bytes32) {\n    unchecked {\n      return bytes32(uint256(_weight) << 160 | uint256(uint160(_addr)));\n    }\n  }\n\n  /**\n  * @notice Generates the leaf for a hardcoded subdigest.\n  * @dev The leaf is generated by hashing \'Sequence static digest:\\n\' and the subdigest.\n  * @param _subdigest The subdigest to generate the leaf for.\n  * @return bytes32 The leaf generated from the hardcoded subdigest.\n  */\n  function _leafForHardcodedSubdigest(\n    bytes32 _subdigest\n  ) internal pure returns (bytes32) {\n    return keccak256(abi.encodePacked(\'Sequence static digest:\\n\', _subdigest));\n  }\n\n  /**\n  * @notice Generates the leaf for a nested tree node.\n  * @dev The leaf is generated by hashing \'Sequence nested config:\\n\', the node, the threshold and the weight.\n  *\n  * @param _node The root of the node to generate the leaf for.\n  * @param _threshold The internal threshold of the tree.\n  * @param _weight The external weight of the tree.\n  * @return bytes32 The leaf generated from the nested tree.\n  */\n  function _leafForNested(\n    bytes32 _node,\n    uint256 _threshold,\n    uint256 _weight\n  ) internal pure returns (bytes32) {\n    return keccak256(abi.encodePacked(\'Sequence nested config:\\n\', _node, _threshold, _weight));\n  }\n\n  /**\n   * @notice Returns the weight and root of a signature branch.\n   * @dev If the signature contains a hardcoded subdigest, and it matches the input digest, then the weight is set to 2 ** 256 - 1.\n   *\n   * @param _subdigest The digest to verify the signature against.\n   * @param _signature The signature branch to recover.\n   * @return weight The total weight of the recovered signatures.\n   * @return root The root hash of the recovered configuration.\n   */\n  function recoverBranch(\n    bytes32 _subdigest,\n    bytes calldata _signature\n  ) internal view returns (\n    uint256 weight,\n    bytes32 root\n  ) {\n    unchecked {\n      uint256 rindex;\n\n      // Iterate until the image is completed\n      while (rindex < _signature.length) {\n        // Read next item type\n        uint256 flag;\n        (flag, rindex) = _signature.readUint8(rindex);\n\n        if (flag == FLAG_ADDRESS) {\n          // Read plain address\n          uint8 addrWeight; address addr;\n          (addrWeight, addr, rindex) = _signature.readUint8Address(rindex);\n\n          // Write weight and address to image\n          bytes32 node = _leafForAddressAndWeight(addr, addrWeight);\n          root = root != bytes32(0) ? LibOptim.fkeccak256(root, node) : node;\n          continue;\n        }\n\n        if (flag == FLAG_SIGNATURE) {\n          // Read weight\n          uint8 addrWeight;\n          (addrWeight, rindex) = _signature.readUint8(rindex);\n\n          // Read single signature and recover signer\n          uint256 nrindex = rindex + 66;\n          address addr = SignatureValidator.recoverSigner(_subdigest, _signature[rindex:nrindex]);\n          rindex = nrindex;\n\n          // Acumulate total weight of the signature\n          weight += addrWeight;\n\n          // Write weight and address to image\n          bytes32 node = _leafForAddressAndWeight(addr, addrWeight);\n          root = root != bytes32(0) ? LibOptim.fkeccak256(root, node) : node;\n          continue;\n        }\n\n        if (flag == FLAG_DYNAMIC_SIGNATURE) {\n          // Read signer and weight\n          uint8 addrWeight; address addr;\n          (addrWeight, addr, rindex) = _signature.readUint8Address(rindex);\n\n          // Read signature size\n          uint256 size;\n          (size, rindex) = _signature.readUint24(rindex);\n\n          // Read dynamic size signature\n          uint256 nrindex = rindex + size;\n          if (!SignatureValidator.isValidSignature(_subdigest, addr, _signature[rindex:nrindex])) {\n            revert InvalidNestedSignature(_subdigest, addr, _signature[rindex:nrindex]);\n          }\n          rindex = nrindex;\n\n          // Acumulate total weight of the signature\n          weight += addrWeight;\n\n          // Write weight and address to image\n          bytes32 node = _leafForAddressAndWeight(addr, addrWeight);\n          root = root != bytes32(0) ? LibOptim.fkeccak256(root, node) : node;\n          continue;\n        }\n\n        if (flag == FLAG_NODE) {\n          // Read node hash\n          bytes32 node;\n          (node, rindex) = _signature.readBytes32(rindex);\n          root = root != bytes32(0) ? LibOptim.fkeccak256(root, node) : node;\n          continue;\n        }\n\n        if (flag == FLAG_BRANCH) {\n          // Enter a branch of the signature merkle tree\n          uint256 size;\n          (size, rindex) = _signature.readUint24(rindex);\n          uint256 nrindex = rindex + size;\n\n          uint256 nweight; bytes32 node;\n          (nweight, node) = recoverBranch(_subdigest, _signature[rindex:nrindex]);\n\n          weight += nweight;\n          root = LibOptim.fkeccak256(root, node);\n\n          rindex = nrindex;\n          continue;\n        }\n\n        if (flag == FLAG_NESTED) {\n          // Enter a branch of the signature merkle tree\n          // but with an internal threshold and an external fixed weight\n          uint256 externalWeight;\n          (externalWeight, rindex) = _signature.readUint8(rindex);\n\n          uint256 internalThreshold;\n          (internalThreshold, rindex) = _signature.readUint16(rindex);\n\n          uint256 size;\n          (size, rindex) = _signature.readUint24(rindex);\n          uint256 nrindex = rindex + size;\n\n          uint256 internalWeight; bytes32 internalRoot;\n          (internalWeight, internalRoot) = recoverBranch(_subdigest, _signature[rindex:nrindex]);\n          rindex = nrindex;\n\n          if (internalWeight >= internalThreshold) {\n            weight += externalWeight;\n          }\n\n          bytes32 node = _leafForNested(internalRoot, internalThreshold, externalWeight);\n          root = root != bytes32(0) ? LibOptim.fkeccak256(root, node) : node;\n\n          continue;\n        }\n\n        if (flag == FLAG_SUBDIGEST) {\n          // A hardcoded always accepted digest\n          // it pushes the weight to the maximum\n          bytes32 hardcoded;\n          (hardcoded, rindex) = _signature.readBytes32(rindex);\n          if (hardcoded == _subdigest) {\n            weight = type(uint256).max;\n          }\n\n          bytes32 node = _leafForHardcodedSubdigest(hardcoded);\n          root = root != bytes32(0) ? LibOptim.fkeccak256(root, node) : node;\n          continue;\n        }\n\n        revert InvalidSignatureFlag(flag);\n      }\n    }\n  }\n\n  /**\n   * @notice Returns the threshold, weight, root, and checkpoint of a signature.\n   * @dev To verify the signature, the weight must be greater than or equal to the threshold, and the root\n   *      must match the expected `imageHash` of the wallet.\n   *\n   * @param _subdigest The digest to verify the signature against.\n   * @param _signature The signature to recover.\n   * @return threshold The minimum weight required for the signature to be valid.\n   * @return weight The total weight of the recovered signatures.\n   * @return imageHash The root hash of the recovered configuration\n   * @return checkpoint The checkpoint of the signature.\n   */\n  function recover(\n    bytes32 _subdigest,\n    bytes calldata _signature\n  ) internal view returns (\n    uint256 threshold,\n    uint256 weight,\n    bytes32 imageHash,\n    uint256 checkpoint\n  ) {\n    unchecked {\n      (weight, imageHash) = recoverBranch(_subdigest, _signature[6:]);\n\n      // Threshold & checkpoint are the top nodes\n      // (but they are first on the signature)\n      threshold = LibBytes.readFirstUint16(_signature);\n      checkpoint = LibBytes.readUint32(_signature, 2);\n\n      imageHash = LibOptim.fkeccak256(imageHash, bytes32(threshold));\n      imageHash = LibOptim.fkeccak256(imageHash, bytes32(checkpoint));\n    }\n  }\n}\n'
      },
      'contracts/modules/commons/submodules/auth/SequenceChainedSig.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./SequenceBaseSig.sol";\n\nimport "../../interfaces/IModuleAuth.sol";\n\nimport "../../ModuleSelfAuth.sol";\nimport "../../ModuleStorage.sol";\n\nimport "../../../../utils/LibBytesPointer.sol";\nimport "../../../../utils/LibOptim.sol";\n\n/**\n * @title Sequence chained auth recovery submodule\n * @author Agustin Aguilar (aa@horizon.io)\n * @notice Defines Sequence signatures that work by delegating control to new configurations.\n * @dev The delegations can be chained together, the first signature is the one that is used to validate\n *      the message, the last signature must match the current on-chain configuration of the wallet.\n */\nabstract contract SequenceChainedSig is IModuleAuth, ModuleSelfAuth {\n  using LibBytesPointer for bytes;\n\n  bytes32 public constant SET_IMAGE_HASH_TYPE_HASH = keccak256("SetImageHash(bytes32 imageHash)");\n\n  error LowWeightChainedSignature(bytes _signature, uint256 threshold, uint256 _weight);\n  error WrongChainedCheckpointOrder(uint256 _current, uint256 _prev);\n\n  /**\n   * @notice Defined the special token that must be signed to delegate control to a new configuration.\n   * @param _imageHash The hash of the new configuration.\n   * @return bytes32 The message hash to be signed.\n   */\n  function _hashSetImageHashStruct(bytes32 _imageHash) internal pure returns (bytes32) {\n    return LibOptim.fkeccak256(SET_IMAGE_HASH_TYPE_HASH, _imageHash);\n  }\n\n  /**\n   * @notice Returns the threshold, weight, root, and checkpoint of a (chained) signature.\n   * \n   * @dev This method return the `threshold`, `weight` and `imageHash` of the last signature in the chain.\n   *      Intermediate signatures are validated directly in this method. The `subdigest` is the one of the\n   *      first signature in the chain (since that\'s the one that is used to validate the message).\n   *\n   * @param _digest The digest to recover the signature from.\n   * @param _signature The signature to recover.\n   * @return threshold The threshold of the (last) signature.\n   * @return weight The weight of the (last) signature.\n   * @return imageHash The image hash of the (last) signature.\n   * @return subdigest The subdigest of the (first) signature in the chain.\n   * @return checkpoint The checkpoint of the (last) signature.\n   */\n  function chainedRecover(\n    bytes32 _digest,\n    bytes calldata _signature\n  ) internal view returns (\n    uint256 threshold,\n    uint256 weight,\n    bytes32 imageHash,\n    bytes32 subdigest,\n    uint256 checkpoint\n  ) {\n    uint256 rindex = 1;\n    uint256 sigSize;\n\n    //\n    // First signature out of the loop\n    //\n\n    // First uint24 is the size of the signature\n    (sigSize, rindex) = _signature.readUint24(rindex);\n    uint256 nrindex = sigSize + rindex;\n\n    (\n      threshold,\n      weight,\n      imageHash,\n      subdigest,\n      checkpoint\n    ) = signatureRecovery(\n      _digest,\n      _signature[rindex:nrindex]\n    );\n\n    if (weight < threshold) {\n      revert LowWeightChainedSignature(_signature[rindex:nrindex], threshold, weight);\n    }\n\n    rindex = nrindex;\n\n    // The following signatures are handled by this loop.\n    // This is done this way because the first signature does not have a\n    // checkpoint to be validated against.\n    while (rindex < _signature.length) {\n      // First uint24 is the size of the signature\n      (sigSize, rindex) = _signature.readUint24(rindex);\n      nrindex = sigSize + rindex;\n\n      uint256 nextCheckpoint;\n\n      (\n        threshold,\n        weight,\n        imageHash,,\n        // Do not change the subdigest;\n        // it should remain that of the first signature.\n        nextCheckpoint\n      ) = signatureRecovery(\n        _hashSetImageHashStruct(imageHash),\n        _signature[rindex:nrindex]\n      );\n\n      // Validate signature\n      if (weight < threshold) {\n        revert LowWeightChainedSignature(_signature[rindex:nrindex], threshold, weight);\n      }\n\n      // Checkpoints must be provided in descending order\n      // since the first signature is the one that is used to validate the message\n      // and the last signature is the one that is used to validate the current configuration\n      if (nextCheckpoint >= checkpoint) {\n        revert WrongChainedCheckpointOrder(nextCheckpoint, checkpoint);\n      }\n\n      checkpoint = nextCheckpoint;\n      rindex = nrindex;\n    }\n  }\n}\n'
      },
      'contracts/modules/commons/submodules/auth/SequenceDynamicSig.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./SequenceBaseSig.sol";\n\n\nlibrary SequenceDynamicSig {\n\n  /**\n   * @notice Recover a "dynamically encoded" Sequence signature.\n   * @dev The Signature is stripped of the first byte, which is the encoding flag.\n   *\n   * @param _subdigest The digest of the signature.\n   * @param _signature The Sequence signature.\n   * @return threshold The threshold weight required to validate the signature.\n   * @return weight The weight of the signature.\n   * @return imageHash The hash of the recovered configuration.\n   * @return checkpoint The checkpoint of the configuration.\n   */\n  function recover(\n    bytes32 _subdigest,\n    bytes calldata _signature\n  ) internal view returns (\n    uint256 threshold,\n    uint256 weight,\n    bytes32 imageHash,\n    uint256 checkpoint\n  ) {\n    return SequenceBaseSig.recover(_subdigest, _signature[1:]);\n  }\n}\n'
      },
      'contracts/modules/commons/submodules/auth/SequenceNoChainIdSig.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\nlibrary SequenceNoChainIdSig {\n\n  /**\n   * @notice Computes a subdigest for a Sequence signature that works on all chains.\n   * @dev The subdigest is computed by removing the chain ID from the digest (using 0 instead).\n   * @param _digest The digest of the chain of signatures.\n   * @return bytes32 The subdigest with no chain ID.\n   */\n  function subdigest(bytes32 _digest) internal view returns (bytes32) {\n    return keccak256(\n      abi.encodePacked(\n        "\\x19\\x01",\n        uint256(0),\n        address(this),\n        _digest\n      )\n    );\n  }\n}\n'
      },
      'contracts/modules/commons/submodules/nonce/SubModuleNonce.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\nlibrary SubModuleNonce {\n  // Nonce schema\n  //\n  // - space[160]:nonce[96]\n  //\n  uint256 internal constant NONCE_BITS = 96;\n  bytes32 internal constant NONCE_MASK = bytes32(uint256(type(uint96).max));\n\n  /**\n   * @notice Decodes a raw nonce\n   * @dev Schema: space[160]:type[96]\n   * @param _rawNonce Nonce to be decoded\n   * @return _space The nonce space of the raw nonce\n   * @return _nonce The nonce of the raw nonce\n   */\n  function decodeNonce(uint256 _rawNonce) internal pure returns (\n    uint256 _space,\n    uint256 _nonce\n  ) {\n    unchecked {\n      // Decode nonce\n      _space = _rawNonce >> NONCE_BITS;\n      _nonce = uint256(bytes32(_rawNonce) & NONCE_MASK);\n    }\n  }\n}\n'
      },
      'contracts/modules/MainModule.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./commons/ModuleAuthFixed.sol";\nimport "./commons/ModuleHooks.sol";\nimport "./commons/ModuleCalls.sol";\nimport "./commons/ModuleCreator.sol";\nimport "./commons/ModuleExtraAuth.sol";\nimport "./commons/ModuleAuthConvenience.sol";\n\n\n/**\n * @notice Contains the core functionality Sequence wallets will inherit.\n * @dev If using a new main module, developers must ensure that all inherited\n *      contracts by the main module don\'t conflict and are accounted for to be\n *      supported by the supportsInterface method.\n */\ncontract MainModule is\n  ModuleAuthFixed,\n  ModuleExtraAuth,\n  ModuleCalls,\n  ModuleHooks,\n  ModuleCreator,\n  ModuleAuthConvenience\n{\n  constructor(\n    address _factory,\n    address _mainModuleUpgradable\n  ) ModuleAuthFixed(\n    _factory,\n    _mainModuleUpgradable\n  ) { }\n\n  function _isValidImage(\n    bytes32 _imageHash\n  ) internal override(\n    IModuleAuth,\n    ModuleAuthFixed,\n    ModuleExtraAuth\n  ) view returns (bool) {\n    return super._isValidImage(_imageHash);\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(\n    bytes4 _interfaceID\n  ) public override(\n    ModuleAuthFixed,\n    ModuleAuthConvenience,\n    ModuleCalls,\n    ModuleExtraAuth,\n    ModuleHooks,\n    ModuleCreator\n  ) pure returns (bool) {\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/utils/LibAddress.sol': {
        content:
          "// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\nlibrary LibAddress {\n  /**\n   * @notice Will return true if provided address is a contract\n   * @param account Address to verify if contract or not\n   * @dev This contract will return false if called within the constructor of\n   *      a contract's deployment, as the code is not yet stored on-chain.\n   */\n  function isContract(address account) internal view returns (bool) {\n    uint256 csize;\n    // solhint-disable-next-line no-inline-assembly\n    assembly { csize := extcodesize(account) }\n    return csize != 0;\n  }\n}\n"
      },
      'contracts/utils/LibBytes.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\n/**\n * @title Library for reading data from bytes arrays\n * @author Agustin Aguilar (aa@horizon.io)\n * @notice This library contains functions for reading data from bytes arrays.\n *\n * @dev These functions do not check if the input index is within the bounds of the data array.\n *         Reading out of bounds may return dirty values.\n */\nlibrary LibBytes {\n\n  /**\n   * @notice Returns the bytes32 value at the given index in the input data.\n   * @param data The input data.\n   * @param index The index of the value to retrieve.\n   * @return a The bytes32 value at the given index.\n   */\n  function readBytes32(\n    bytes calldata data,\n    uint256 index\n  ) internal pure returns (\n    bytes32 a\n  ) {\n    assembly {\n      a := calldataload(add(data.offset, index))\n    }\n  }\n\n  /**\n   * @notice Returns the uint8 value at the given index in the input data.\n   * @param data The input data.\n   * @param index The index of the value to retrieve.\n   * @return a The uint8 value at the given index.\n   */\n  function readUint8(\n    bytes calldata data,\n    uint256 index\n  ) internal pure returns (\n    uint8 a\n  ) {\n    assembly {\n      let word := calldataload(add(index, data.offset))\n      a := shr(248, word)\n    }\n  }\n\n  /**\n   * @notice Returns the first uint16 value in the input data.\n   * @param data The input data.\n   * @return a The first uint16 value in the input data.\n   */\n  function readFirstUint16(\n    bytes calldata data\n  ) internal pure returns (\n    uint16 a\n  ) {\n    assembly {\n      let word := calldataload(data.offset)\n      a := shr(240, word)\n    }\n  }\n\n  /**\n   * @notice Returns the uint32 value at the given index in the input data.\n   * @param data The input data.\n   * @param index The index of the value to retrieve.\n   * @return a The uint32 value at the given index.\n   */\n  function readUint32(\n    bytes calldata data,\n    uint256 index\n  ) internal pure returns (\n    uint32 a\n  ) {\n    assembly {\n      let word := calldataload(add(index, data.offset))\n      a := shr(224, word)\n    }\n  }\n}\n'
      },
      'contracts/utils/LibBytesPointer.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\n/**\n * @title Library for reading data from bytes arrays with a pointer\n * @author Agustin Aguilar (aa@horizon.io)\n * @notice This library contains functions for reading data from bytes arrays with a pointer.\n *\n * @dev These functions do not check if the input index is within the bounds of the data array.\n *         Reading out of bounds may return dirty values.\n */\nlibrary LibBytesPointer {\n\n  /**\n   * @dev Returns the first uint16 value in the input data and updates the pointer.\n   * @param _data The input data.\n   * @return a The first uint16 value.\n   * @return newPointer The new pointer.\n   */\n  function readFirstUint16(\n    bytes calldata _data\n  ) internal pure returns (\n    uint16 a,\n    uint256 newPointer\n  ) {\n    assembly {\n      let word := calldataload(_data.offset)\n      a := shr(240, word)\n      newPointer := 2\n    }\n  }\n\n  /**\n   * @notice Returns the uint8 value at the given index in the input data and updates the pointer.\n   * @param _data The input data.\n   * @param _index The index of the value to retrieve.\n   * @return a The uint8 value at the given index.\n   * @return newPointer The new pointer.\n   */\n  function readUint8(\n    bytes calldata _data,\n    uint256 _index\n  ) internal pure returns (\n    uint8 a,\n    uint256 newPointer\n  ) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := shr(248, word)\n      newPointer := add(_index, 1)\n    }\n  }\n\n  /**\n   * @notice Returns the uint8 value and the address at the given index in the input data and updates the pointer.\n   * @param _data The input data.\n   * @param _index The index of the value to retrieve.\n   * @return a The uint8 value at the given index.\n   * @return b The following address value.\n   * @return newPointer The new pointer.\n   */\n  function readUint8Address(\n    bytes calldata _data,\n    uint256 _index\n  ) internal pure returns (\n    uint8 a,\n    address b,\n    uint256 newPointer\n  ) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := shr(248, word)\n      b := and(shr(88, word), 0xffffffffffffffffffffffffffffffffffffffff)\n      newPointer := add(_index, 21)\n    }\n  }\n\n  /**\n   * @notice Returns the uint16 value at the given index in the input data and updates the pointer.\n   * @param _data The input data.\n   * @param _index The index of the value to retrieve.\n   * @return a The uint16 value at the given index.\n   * @return newPointer The new pointer.\n   */\n  function readUint16(\n    bytes calldata _data,\n    uint256 _index\n  ) internal pure returns (\n    uint16 a,\n    uint256 newPointer\n  ) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := and(shr(240, word), 0xffff)\n      newPointer := add(_index, 2)\n    }\n  }\n\n  /**\n   * @notice Returns the uint24 value at the given index in the input data and updates the pointer.\n   * @param _data The input data.\n   * @param _index The index of the value to retrieve.\n   * @return a The uint24 value at the given index.\n   * @return newPointer The new pointer.\n   */\n  function readUint24(\n    bytes calldata _data,\n    uint256 _index\n  ) internal pure returns (\n    uint24 a,\n    uint256 newPointer\n  ) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := and(shr(232, word), 0xffffff)\n      newPointer := add(_index, 3)\n    }\n  }\n\n  /**\n   * @notice Returns the uint64 value at the given index in the input data and updates the pointer.\n   * @param _data The input data.\n   * @param _index The index of the value to retrieve.\n   * @return a The uint64 value at the given index.\n   * @return newPointer The new pointer.\n   */\n  function readUint64(\n    bytes calldata _data,\n    uint256 _index\n  ) internal pure returns (\n    uint64 a,\n    uint256 newPointer\n  ) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := and(shr(192, word), 0xffffffffffffffff)\n      newPointer := add(_index, 8)\n    }\n  }\n\n  /**\n   * @notice Returns the bytes32 value at the given index in the input data and updates the pointer.\n   * @param _data The input data.\n   * @param _pointer The index of the value to retrieve.\n   * @return a The bytes32 value at the given index.\n   * @return newPointer The new pointer.\n   */\n  function readBytes32(\n    bytes calldata _data,\n    uint256 _pointer\n  ) internal pure returns (\n    bytes32 a,\n    uint256 newPointer\n  ) {\n    assembly {\n      a := calldataload(add(_pointer, _data.offset))\n      newPointer := add(_pointer, 32)\n    }\n  }\n}\n'
      },
      'contracts/utils/LibOptim.sol': {
        content:
          "// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n/**\n * @title Library for optimized EVM operations\n * @author Agustin Aguilar (aa@horizon.io)\n * @notice This library contains functions for optimizing certain EVM operations.\n */\nlibrary LibOptim {\n\n  /**\n   * @notice Computes the keccak256 hash of two 32-byte inputs.\n   * @dev It uses only scratch memory space.\n   * @param _a The first 32 bytes of the hash.\n   * @param _b The second 32 bytes of the hash.\n   * @return c The keccak256 hash of the two 32-byte inputs.\n   */\n  function fkeccak256(\n    bytes32 _a,\n    bytes32 _b\n  ) internal pure returns (bytes32 c) {\n    assembly {\n      mstore(0, _a)\n      mstore(32, _b)\n      c := keccak256(0, 64)\n    }\n  }\n\n  /**\n   * @notice Returns the return data from the last call.\n   * @return r The return data from the last call.\n   */\n  function returnData() internal pure returns (bytes memory r) {\n    assembly {\n      let size := returndatasize()\n      r := mload(0x40)\n      let start := add(r, 32)\n      mstore(0x40, add(start, size))\n      mstore(r, size)\n      returndatacopy(start, 0, size)\n    }\n  }\n\n  /**\n   * @notice Calls another contract with the given parameters.\n   * @dev This method doesn't increase the memory pointer.\n   * @param _to The address of the contract to call.\n   * @param _val The value to send to the contract.\n   * @param _gas The amount of gas to provide for the call.\n   * @param _data The data to send to the contract.\n   * @return r The success status of the call.\n   */\n  function call(\n    address _to,\n    uint256 _val,\n    uint256 _gas,\n    bytes calldata _data\n  ) internal returns (bool r) {\n    assembly {\n      let tmp := mload(0x40)\n      calldatacopy(tmp, _data.offset, _data.length)\n\n      r := call(\n        _gas,\n        _to,\n        _val,\n        tmp,\n        _data.length,\n        0,\n        0\n      )\n    }\n  }\n\n  /**\n   * @notice Calls another contract with the given parameters, using delegatecall.\n   * @dev This method doesn't increase the memory pointer.\n   * @param _to The address of the contract to call.\n   * @param _gas The amount of gas to provide for the call.\n   * @param _data The data to send to the contract.\n   * @return r The success status of the call.\n   */\n  function delegatecall(\n    address _to,\n    uint256 _gas,\n    bytes calldata _data\n  ) internal returns (bool r) {\n    assembly {\n      let tmp := mload(0x40)\n      calldatacopy(tmp, _data.offset, _data.length)\n\n      r := delegatecall(\n        _gas,\n        _to,\n        tmp,\n        _data.length,\n        0,\n        0\n      )\n    }\n  }\n}\n"
      },
      'contracts/utils/LibString.sol': {
        content:
          "// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n/**\n * @title Library for string manipulation operations\n * @notice This library contains functions for manipulating strings in Solidity.\n */\nlibrary LibString {\n  bytes private constant ALPHABET_HEX_16 = '0123456789abcdef';\n  bytes private constant ALPHABET_32 = 'abcdefghijklmnopqrstuvwxyz234567';\n\n  /**\n   * @notice Prefixes a hexadecimal string with \"0x\".\n   * @param _hex The hexadecimal string to prefix.\n   * @return The prefixed hexadecimal string.\n   */\n  function prefixHexadecimal(string memory _hex) internal pure returns (string memory) {\n    return string(abi.encodePacked('0x', _hex));\n  }\n\n  /**\n   * @notice Prefixes a base32 string with \"b\".\n   * @param _base32 The base32 string to prefix.\n   * @return The prefixed base32 string.\n   */\n  function prefixBase32(string memory _base32) internal pure returns (string memory) {\n    return string(abi.encodePacked('b', _base32));\n  }\n\n  /**\n   * @notice Converts a byte array to a hexadecimal string.\n   * @param _bytes The byte array to convert.\n   * @return The resulting hexadecimal string.\n   */\n  function bytesToHexadecimal(bytes memory _bytes) internal pure returns (string memory) {\n    uint256 bytesLength = _bytes.length;\n    bytes memory bytesArray = new bytes(bytesLength << 1);\n\n    unchecked {\n      for (uint256 i = 0; i < bytesLength; i++) {\n        uint256 word = uint8(_bytes[i]);\n        uint256 ib = i << 1;\n        bytesArray[ib] = bytes1(ALPHABET_HEX_16[word >> 4]);\n        bytesArray[ib + 1] = bytes1(ALPHABET_HEX_16[word & 0xf]);\n      }\n    }\n\n    return string(bytesArray);\n  }\n\n  /**\n   * @notice Converts a byte array to a base32 string.\n   * @param _bytes The byte array to convert.\n   * @return The resulting base32 string.\n   */\n  function bytesToBase32(bytes memory _bytes) internal pure returns (string memory) {\n    uint256 bytesLength = _bytes.length;\n\n    uint256 t1 = bytesLength << 3;\n\n    unchecked {\n      // base32-encoded length = ceil(# of bits / 5)\n      bytes memory bytesArray = new bytes((t1 + 4) / 5);\n\n      uint256 bits = 0;\n      uint256 buffer = 0;\n      uint256 pointer = 0;\n\n      for (uint256 i = 0; i < bytesLength; i++) {\n        buffer = (buffer << 8) | uint8(_bytes[i]);\n        bits += 8;\n\n        while (bits >= 5) {\n          bits -= 5;\n          bytesArray[pointer] = bytes1(ALPHABET_32[(buffer >> bits) & 0x1f]);\n          pointer++;\n        }\n      }\n\n      if (bits > 0) {\n        bytesArray[pointer] = bytes1(ALPHABET_32[(buffer << (5 - bits)) & 0x1f]);\n      }\n\n      return string(bytesArray);\n    }\n  }\n}\n"
      },
      'contracts/utils/SignatureValidator.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "../interfaces/IERC1271Wallet.sol";\n\nimport "./LibBytes.sol";\n\n/**\n * @dev Contains logic for signature validation.\n * Signatures from wallet contracts assume ERC-1271 support (https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1271.md)\n * Notes: Methods are strongly inspired by contracts in https://github.com/0xProject/0x-monorepo/blob/development/\n */\nlibrary SignatureValidator {\n  // Errors\n  error InvalidSignatureLength(bytes _signature);\n  error EmptySignature();\n  error InvalidSValue(bytes _signature, bytes32 _s);\n  error InvalidVValue(bytes _signature, uint256 _v);\n  error UnsupportedSignatureType(bytes _signature, uint256 _type, bool _recoverMode);\n  error SignerIsAddress0(bytes _signature);\n\n  using LibBytes for bytes;\n\n  /***********************************|\n  |             Variables             |\n  |__________________________________*/\n\n  // bytes4(keccak256("isValidSignature(bytes,bytes)"))\n  bytes4 constant internal ERC1271_MAGICVALUE = 0x20c13b0b;\n\n  // bytes4(keccak256("isValidSignature(bytes32,bytes)"))\n  bytes4 constant internal ERC1271_MAGICVALUE_BYTES32 = 0x1626ba7e;\n\n  // Allowed signature types.\n  uint256 private constant SIG_TYPE_EIP712 = 1;\n  uint256 private constant SIG_TYPE_ETH_SIGN = 2;\n  uint256 private constant SIG_TYPE_WALLET_BYTES32 = 3;\n\n  /***********************************|\n  |        Signature Functions        |\n  |__________________________________*/\n\n /**\n   * @notice Recover the signer of hash, assuming it\'s an EOA account\n   * @dev Only for SignatureType.EIP712 and SignatureType.EthSign signatures\n   * @param _hash      Hash that was signed\n   *   encoded as (bytes32 r, bytes32 s, uint8 v, ... , SignatureType sigType)\n   */\n  function recoverSigner(\n    bytes32 _hash,\n    bytes calldata _signature\n  ) internal pure returns (address signer) {\n    if (_signature.length != 66) revert InvalidSignatureLength(_signature);\n    uint256 signatureType = _signature.readUint8(_signature.length - 1);\n\n    // Variables are not scoped in Solidity.\n    uint8 v = _signature.readUint8(64);\n    bytes32 r = _signature.readBytes32(0);\n    bytes32 s = _signature.readBytes32(32);\n\n    // EIP-2 still allows signature malleability for ecrecover(). Remove this possibility and make the signature\n    // unique. Appendix F in the Ethereum Yellow paper (https://ethereum.github.io/yellowpaper/paper.pdf), defines\n    // the valid range for s in (281): 0 < s < secp256k1n \u00f7 2 + 1, and for v in (282): v \u2208 {27, 28}. Most\n    // signatures from current libraries generate a unique signature with an s-value in the lower half order.\n    //\n    // If your library generates malleable signatures, such as s-values in the upper range, calculate a new s-value\n    // with 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 - s1 and flip v from 27 to 28 or\n    // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept\n    // these malleable signatures as well.\n    //\n    // Source OpenZeppelin\n    // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/cryptography/ECDSA.sol\n\n    if (uint256(s) > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) {\n      revert InvalidSValue(_signature, s);\n    }\n\n    if (v != 27 && v != 28) {\n      revert InvalidVValue(_signature, v);\n    }\n\n    // Signature using EIP712\n    if (signatureType == SIG_TYPE_EIP712) {\n      signer = ecrecover(_hash, v, r, s);\n\n    // Signed using web3.eth_sign() or Ethers wallet.signMessage()\n    } else if (signatureType == SIG_TYPE_ETH_SIGN) {\n      signer = ecrecover(\n        keccak256(abi.encodePacked("\\x19Ethereum Signed Message:\\n32", _hash)),\n        v,\n        r,\n        s\n      );\n\n    } else {\n      // We cannot recover the signer for any other signature type.\n      revert UnsupportedSignatureType(_signature, signatureType, true);\n    }\n\n    // Prevent signer from being 0x0\n    if (signer == address(0x0)) revert SignerIsAddress0(_signature);\n\n    return signer;\n  }\n\n /**\n   * @notice Returns true if the provided signature is valid for the given signer.\n   * @dev Supports SignatureType.EIP712, SignatureType.EthSign, and ERC1271 signatures\n   * @param _hash      Hash that was signed\n   * @param _signer    Address of the signer candidate\n   * @param _signature Signature byte array\n   */\n  function isValidSignature(\n    bytes32 _hash,\n    address _signer,\n    bytes calldata _signature\n  ) internal view returns (bool valid) {\n    if (_signature.length == 0) {\n      revert EmptySignature();\n    }\n\n    uint256 signatureType = uint8(_signature[_signature.length - 1]);\n    if (signatureType == SIG_TYPE_EIP712 || signatureType == SIG_TYPE_ETH_SIGN) {\n      // Recover signer and compare with provided\n      valid = recoverSigner(_hash, _signature) == _signer;\n\n    } else if (signatureType == SIG_TYPE_WALLET_BYTES32) {\n      // Remove signature type before calling ERC1271, restore after call\n      valid = ERC1271_MAGICVALUE_BYTES32 == IERC1271Wallet(_signer).isValidSignature(_hash, _signature[0:_signature.length - 1]);\n\n    } else {\n      // We cannot validate any other signature type.\n      // We revert because we can say nothing about its validity.\n      revert UnsupportedSignatureType(_signature, signatureType, false);\n    }\n  }\n}\n'
      },
      'contracts/Wallet.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n/**\n    Minimal upgradeable proxy implementation, delegates all calls to the address\n    defined by the storage slot matching the wallet address.\n\n    Inspired by EIP-1167 Implementation (https://eips.ethereum.org/EIPS/eip-1167)\n\n    deployed code:\n\n        0x00    0x36         0x36      CALLDATASIZE      cds\n        0x01    0x3d         0x3d      RETURNDATASIZE    0 cds\n        0x02    0x3d         0x3d      RETURNDATASIZE    0 0 cds\n        0x03    0x37         0x37      CALLDATACOPY\n        0x04    0x3d         0x3d      RETURNDATASIZE    0\n        0x05    0x3d         0x3d      RETURNDATASIZE    0 0\n        0x06    0x3d         0x3d      RETURNDATASIZE    0 0 0\n        0x07    0x36         0x36      CALLDATASIZE      cds 0 0 0\n        0x08    0x3d         0x3d      RETURNDATASIZE    0 cds 0 0 0\n        0x09    0x30         0x30      ADDRESS           addr 0 cds 0 0 0\n        0x0A    0x54         0x54      SLOAD             imp 0 cds 0 0 0\n        0x0B    0x5a         0x5a      GAS               gas imp 0 cds 0 0 0\n        0x0C    0xf4         0xf4      DELEGATECALL      suc 0\n        0x0D    0x3d         0x3d      RETURNDATASIZE    rds suc 0\n        0x0E    0x82         0x82      DUP3              0 rds suc 0\n        0x0F    0x80         0x80      DUP1              0 0 rds suc 0\n        0x10    0x3e         0x3e      RETURNDATACOPY    suc 0\n        0x11    0x90         0x90      SWAP1             0 suc\n        0x12    0x3d         0x3d      RETURNDATASIZE    rds 0 suc\n        0x13    0x91         0x91      SWAP2             suc 0 rds\n        0x14    0x60 0x18    0x6018    PUSH1             0x18 suc 0 rds\n    /-- 0x16    0x57         0x57      JUMPI             0 rds\n    |   0x17    0xfd         0xfd      REVERT\n    \\-> 0x18    0x5b         0x5b      JUMPDEST          0 rds\n        0x19    0xf3         0xf3      RETURN\n\n    flat deployed code: 0x363d3d373d3d3d363d30545af43d82803e903d91601857fd5bf3\n\n    deploy function:\n\n        0x00    0x60 0x3a    0x603a    PUSH1             0x3a\n        0x02    0x60 0x0e    0x600e    PUSH1             0x0e 0x3a\n        0x04    0x3d         0x3d      RETURNDATASIZE    0 0x0e 0x3a\n        0x05    0x39         0x39      CODECOPY\n        0x06    0x60 0x1a    0x601a    PUSH1             0x1a\n        0x08    0x80         0x80      DUP1              0x1a 0x1a\n        0x09    0x51         0x51      MLOAD             imp 0x1a\n        0x0A    0x30         0x30      ADDRESS           addr imp 0x1a\n        0x0B    0x55         0x55      SSTORE            0x1a\n        0x0C    0x3d         0x3d      RETURNDATASIZE    0 0x1a\n        0x0D    0xf3         0xf3      RETURN\n        [...deployed code]\n\n    flat deploy function: 0x603a600e3d39601a805130553df3363d3d373d3d3d363d30545af43d82803e903d91601857fd5bf3\n*/\nlibrary Wallet {\n  bytes internal constant creationCode = hex"603a600e3d39601a805130553df3363d3d373d3d3d363d30545af43d82803e903d91601857fd5bf3";\n}\n'
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 500000
      },
      outputSelection: {
        '*': {
          '*': ['evm.bytecode', 'evm.deployedBytecode', 'devdoc', 'userdoc', 'metadata', 'abi']
        }
      },
      libraries: {}
    }
  }
}
