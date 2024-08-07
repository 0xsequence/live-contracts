import { ContractFactory, type ethers } from 'ethers'
import type { VerificationRequest } from 'scripts/types'

export class GuestModuleV2 extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      [
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
          inputs: [
            {
              internalType: 'uint256',
              name: '_index',
              type: 'uint256'
            }
          ],
          name: 'DelegateCallNotAllowed',
          type: 'error'
        },
        {
          inputs: [],
          name: 'EmptySignature',
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
          name: 'NotSupported',
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
              name: '',
              type: 'uint256'
            },
            {
              internalType: 'bytes',
              name: '',
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
              name: '_imageHash',
              type: 'bytes32'
            }
          ],
          name: 'updateImageHash',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      '0x60a060405234801561001057600080fd5b50306080526080516121de61002d600039600050506121de6000f3fe6080604052600436106100bc5760003560e01c806361c2926c116100745780638c3f55631161004e5780638c3f55631461025357806390042baf14610273578063affed0e0146102ab57600080fd5b806361c2926c146101cb5780637a9a1628146101eb578063853c50681461020b57600080fd5b806320c13b0b116100a557806320c13b0b14610147578063295614261461016757806357c56d6b1461018957600080fd5b806301ffc9a7146100c15780631626ba7e146100f6575b600080fd5b3480156100cd57600080fd5b506100e16100dc366004611880565b6102c0565b60405190151581526020015b60405180910390f35b34801561010257600080fd5b506101166101113660046118e6565b6102d1565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016100ed565b34801561015357600080fd5b50610116610162366004611932565b61031e565b34801561017357600080fd5b5061018761018236600461199e565b610383565b005b34801561019557600080fd5b506101bd7f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d181565b6040519081526020016100ed565b3480156101d757600080fd5b506101876101e63660046119fc565b6103d5565b3480156101f757600080fd5b50610187610206366004611a3e565b61041a565b34801561021757600080fd5b5061022b6102263660046118e6565b610447565b604080519586526020860194909452928401919091526060830152608082015260a0016100ed565b34801561025f57600080fd5b506101bd61026e36600461199e565b61060f565b610286610281366004611ae7565b61063b565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100ed565b3480156102b757600080fd5b506101bd610725565b60006102cb82610736565b92915050565b6000806102df858585610792565b509050801561031157507f1626ba7e000000000000000000000000000000000000000000000000000000009050610317565b50600090505b9392505050565b6000806103438686604051610334929190611bb6565b60405180910390208585610792565b509050801561037557507f20c13b0b00000000000000000000000000000000000000000000000000000000905061037b565b50600090505b949350505050565b3330146103c9576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044015b60405180910390fd5b6103d2816107ca565b50565b600061040883836040516020016103ed929190611d97565b604051602081830303815290604052805190602001206107fc565b9050610415818484610881565b505050565b600061043286866040516020016103ed929190611ddf565b905061043f818787610881565b505050505050565b6000806000806000808787600081811061046357610463611e27565b909101357fff000000000000000000000000000000000000000000000000000000000000001691508190506104b95761049b896107fc565b92506104a8838989610a0e565b929850909650945091506106049050565b7fff00000000000000000000000000000000000000000000000000000000000000818116016104f8576104eb896107fc565b92506104a8838989610a5f565b7ffe000000000000000000000000000000000000000000000000000000000000007fff0000000000000000000000000000000000000000000000000000000000000082160161054a576104eb89610a8b565b7ffd000000000000000000000000000000000000000000000000000000000000007fff000000000000000000000000000000000000000000000000000000000000008216016105ae5761059e898989610af8565b9550955095509550955050610604565b6040517f6085cd820000000000000000000000000000000000000000000000000000000081527fff00000000000000000000000000000000000000000000000000000000000000821660048201526024016103c0565b939792965093509350565b60006102cb7f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e83610c75565b600033301461067e576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044016103c0565b81516020830134f0905073ffffffffffffffffffffffffffffffffffffffff81166106d757816040517f0d2571910000000000000000000000000000000000000000000000000000000081526004016103c09190611eba565b60405173ffffffffffffffffffffffffffffffffffffffff821681527fa506ad4e7f05eceba62a023c3219e5bd98a615f4fa87e2afb08a2da5cf62bf0c9060200160405180910390a1919050565b6000610731600061060f565b905090565b60007f6ffbd451000000000000000000000000000000000000000000000000000000007fffffffff0000000000000000000000000000000000000000000000000000000083160161078957506001919050565b6102cb82610cd3565b60008060008060006107a5888888610447565b509650919450925090508282108015906107bd575060015b9450505050935093915050565b6040517fa038794000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f190100000000000000000000000000000000000000000000000000000000000060208201524660228201527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b166042820152605681018290526000906076015b604051602081830303815290604052805190602001209050919050565b8060005b81811015610a0757368484838181106108a0576108a0611e27565b90506020028101906108b29190611ecd565b90506108c16020820182611f0b565b156108fb576040517f230d1ccc000000000000000000000000000000000000000000000000000000008152600481018390526024016103c0565b6040810135805a101561094e5782815a6040517f2bb3e3ba0000000000000000000000000000000000000000000000000000000081526004810193909352602483019190915260448201526064016103c0565b60006109886109636080850160608601611f26565b608085013584156109745784610976565b5a5b61098360a0880188611f41565b610d2f565b905080156109cf57877f5c4eeb02dabf8976016ab414d617f9a162936dcace3cdef8c69ef6e262ad5ae7856040516109c291815260200190565b60405180910390a26109f1565b6109f16109e26040850160208601611f0b565b89866109ec610d4c565b610d6b565b50505080806109ff90611fd5565b915050610885565b5050505050565b6000808080610a2987610a24876006818b61200d565b610db9565b6000908152873560f01c6020818152604080842084526002909a013560e01c908190529890912090999198509695509350505050565b6000808080610a7a87610a75876001818b61200d565b610a0e565b935093509350935093509350935093565b6040517f190100000000000000000000000000000000000000000000000000000000000060208201526000602282018190527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b1660428301526056820183905290607601610864565b6000808080806004600188013560e81c82610b138383612037565b9050610b258b61022683868d8f61200d565b939b5091995097509550935087871015610b7d57610b4581848b8d61200d565b89896040517fb006aba00000000000000000000000000000000000000000000000000000000081526004016103c0949392919061204a565b8092505b88831015610c675760038301928a013560e81c9150610ba08383612037565b90506000610bc2610bb08861124f565b8c8c879086926102269392919061200d565b939c50919a5098509091505088881015610c1a57610be282858c8e61200d565b8a8a6040517fb006aba00000000000000000000000000000000000000000000000000000000081526004016103c0949392919061204a565b848110610c5d576040517f37daf62b00000000000000000000000000000000000000000000000000000000815260048101829052602481018690526044016103c0565b9350915081610b81565b505050939792965093509350565b6000808383604051602001610c94929190918252602082015260400190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152919052805160209091012054949350505050565b60007fe4a77bbc000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831601610d2657506001919050565b6102cb82611283565b6000604051828482376000808483898b8af1979650505050505050565b60603d604051915060208201818101604052818352816000823e505090565b8315610d7957805160208201fd5b827fab46c69f7f32e1bf09b0725853da82a211e5402a0600296ab499a2fb5ea3b4198383604051610dab929190612071565b60405180910390a250505050565b60008060005b8381101561124657600181019085013560f81c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101610e6057601582019186013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff81169074ff000000000000000000000000000000000000000016811785610e465780610e55565b60008681526020829052604090205b955050505050610dbf565b80610ef65760018201918681013560f81c906043016000610e8c8a610e8784888c8e61200d565b61136d565b60ff841697909701969194508491905060a083901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff82161786610edb5780610eea565b60008781526020829052604090205b96505050505050610dbf565b6002810361101e576000808784013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff16601586019550909250905060008885013560e81c600386018162ffffff169150809650819250505060008186019050610f6f8b848c8c8a908692610f6a9392919061200d565b611630565b610fb7578a83610f8183898d8f61200d565b6040517f9a9462320000000000000000000000000000000000000000000000000000000081526004016103c0949392919061208a565b60ff8416979097019694508460a084901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff841617876110025780611011565b60008881526020829052604090205b9750505050505050610dbf565b60038103611051576020820191860135836110395780611048565b60008481526020829052604090205b93505050610dbf565b6004810361109d576003808301928781013560e81c919082010160008061107e8b610a2485898d8f61200d565b60009889526020526040909720969097019650909350610dbf92505050565b600681036111a55760008287013560f81c60018401935060ff16905060008784013560f01c60028501945061ffff16905060008885013560e81c600386018162ffffff16915080965081925050506000818601905060008061110b8d8d8d8b908792610a249392919061200d565b9398508893909250905084821061112157988501985b604080517f53657175656e6365206e657374656420636f6e6669673a0a0000000000000000602080830191909152603882018490526058820188905260788083018a90528351808403909101815260989092019092528051910120896111875780611196565b60008a81526020829052604090205b99505050505050505050610dbf565b600581036112115760208201918601358781036111e0577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff94505b60006111eb82611817565b9050846111f85780611207565b60008581526020829052604090205b9450505050610dbf565b6040517fb2505f7c000000000000000000000000000000000000000000000000000000008152600481018290526024016103c0565b50935093915050565b7f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d160009081526020829052604081206102cb565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167fac6a444e00000000000000000000000000000000000000000000000000000000148061131657507fffffffff0000000000000000000000000000000000000000000000000000000082167f36e7817500000000000000000000000000000000000000000000000000000000145b1561132357506001919050565b7f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316146102cb565b6000604282146113ad5782826040517f2ee17a3d0000000000000000000000000000000000000000000000000000000081526004016103c09291906120ca565b60006113c66113bd6001856120de565b85013560f81c90565b60ff169050604084013560f81c843560208601357f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a081111561143a578686826040517fad4aac760000000000000000000000000000000000000000000000000000000081526004016103c0939291906120f1565b8260ff16601b1415801561145257508260ff16601c14155b1561148f578686846040517fe578897e0000000000000000000000000000000000000000000000000000000081526004016103c093929190612115565b600184036114fc576040805160008152602081018083528a905260ff851691810191909152606081018390526080810182905260019060a0015b6020604051602081039080840390855afa1580156114eb573d6000803e3d6000fd5b5050506020604051035194506115d4565b60028403611599576040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101899052600190605c01604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181528282528051602091820120600084529083018083525260ff861690820152606081018490526080810183905260a0016114c9565b86868560016040517f9dfba8520000000000000000000000000000000000000000000000000000000081526004016103c0949392919061213c565b73ffffffffffffffffffffffffffffffffffffffff85166116255786866040517f6c1719d20000000000000000000000000000000000000000000000000000000081526004016103c09291906120ca565b505050509392505050565b600081810361166b576040517fac241e1100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000838361167a6001826120de565b81811061168957611689611e27565b919091013560f81c91505060018114806116a35750600281145b156116e8578473ffffffffffffffffffffffffffffffffffffffff166116ca87868661136d565b73ffffffffffffffffffffffffffffffffffffffff1614915061180e565b600381036117d35773ffffffffffffffffffffffffffffffffffffffff8516631626ba7e878660008761171c6001826120de565b926117299392919061200d565b6040518463ffffffff1660e01b815260040161174793929190612168565b602060405180830381865afa158015611764573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611788919061218b565b7fffffffff00000000000000000000000000000000000000000000000000000000167f1626ba7e0000000000000000000000000000000000000000000000000000000014915061180e565b83838260006040517f9dfba8520000000000000000000000000000000000000000000000000000000081526004016103c0949392919061213c565b50949350505050565b6040517f53657175656e636520737461746963206469676573743a0a0000000000000000602082015260388101829052600090605801610864565b7fffffffff00000000000000000000000000000000000000000000000000000000811681146103d257600080fd5b60006020828403121561189257600080fd5b813561031781611852565b60008083601f8401126118af57600080fd5b50813567ffffffffffffffff8111156118c757600080fd5b6020830191508360208285010111156118df57600080fd5b9250929050565b6000806000604084860312156118fb57600080fd5b83359250602084013567ffffffffffffffff81111561191957600080fd5b6119258682870161189d565b9497909650939450505050565b6000806000806040858703121561194857600080fd5b843567ffffffffffffffff8082111561196057600080fd5b61196c8883890161189d565b9096509450602087013591508082111561198557600080fd5b506119928782880161189d565b95989497509550505050565b6000602082840312156119b057600080fd5b5035919050565b60008083601f8401126119c957600080fd5b50813567ffffffffffffffff8111156119e157600080fd5b6020830191508360208260051b85010111156118df57600080fd5b60008060208385031215611a0f57600080fd5b823567ffffffffffffffff811115611a2657600080fd5b611a32858286016119b7565b90969095509350505050565b600080600080600060608688031215611a5657600080fd5b853567ffffffffffffffff80821115611a6e57600080fd5b611a7a89838a016119b7565b9097509550602088013594506040880135915080821115611a9a57600080fd5b50611aa78882890161189d565b969995985093965092949392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060208284031215611af957600080fd5b813567ffffffffffffffff80821115611b1157600080fd5b818401915084601f830112611b2557600080fd5b813581811115611b3757611b37611ab8565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908382118183101715611b7d57611b7d611ab8565b81604052828152876020848701011115611b9657600080fd5b826020860160208301376000928101602001929092525095945050505050565b8183823760009101908152919050565b80358015158114611bd657600080fd5b919050565b803573ffffffffffffffffffffffffffffffffffffffff81168114611bd657600080fd5b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b81835260006020808501808196508560051b810191508460005b87811015611d8a57828403895281357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff41883603018112611ca157600080fd5b870160c0611cae82611bc6565b15158652611cbd878301611bc6565b15158688015260408281013590870152606073ffffffffffffffffffffffffffffffffffffffff611cef828501611bdb565b16908701526080828101359087015260a080830135368490037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1018112611d3557600080fd5b90920187810192903567ffffffffffffffff811115611d5357600080fd5b803603841315611d6257600080fd5b8282890152611d748389018286611bff565b9c89019c97505050928601925050600101611c62565b5091979650505050505050565b60408152600560408201527f73656c663a000000000000000000000000000000000000000000000000000000606082015260806020820152600061037b608083018486611c48565b60408152600660408201527f67756573743a0000000000000000000000000000000000000000000000000000606082015260806020820152600061037b608083018486611c48565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000815180845260005b81811015611e7c57602081850181015186830182015201611e60565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b6020815260006103176020830184611e56565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff41833603018112611f0157600080fd5b9190910192915050565b600060208284031215611f1d57600080fd5b61031782611bc6565b600060208284031215611f3857600080fd5b61031782611bdb565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112611f7657600080fd5b83018035915067ffffffffffffffff821115611f9157600080fd5b6020019150368190038213156118df57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361200657612006611fa6565b5060010190565b6000808585111561201d57600080fd5b8386111561202a57600080fd5b5050820193919092039150565b808201808211156102cb576102cb611fa6565b60608152600061205e606083018688611bff565b6020830194909452506040015292915050565b82815260406020820152600061037b6040830184611e56565b84815273ffffffffffffffffffffffffffffffffffffffff841660208201526060604082015260006120c0606083018486611bff565b9695505050505050565b60208152600061037b602083018486611bff565b818103818111156102cb576102cb611fa6565b604081526000612105604083018587611bff565b9050826020830152949350505050565b604081526000612129604083018587611bff565b905060ff83166020830152949350505050565b606081526000612150606083018688611bff565b60208301949094525090151560409091015292915050565b838152604060208201526000612182604083018486611bff565b95945050505050565b60006020828403121561219d57600080fd5b81516103178161185256fea26469706673582212200896636ab1dae9ad33c5080d1044c3c12105a6d4bc196fd0009bf12ed3b0f85364736f6c63430008120033',
      signer
    )
  }
}

export const GUEST_MODULE_V2_VERIFICATION: Omit<VerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'contracts/modules/GuestModule.sol:GuestModule',
  version: 'v0.8.18+commit.87f61d96',
  licenceType: 'Apache-2.0',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'contracts/interfaces/IERC1271Wallet.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\ninterface IERC1271Wallet {\n\n  /**\n   * @notice Verifies whether the provided signature is valid with respect to the provided data\n   * @dev MUST return the correct magic value if the signature provided is valid for the provided data\n   *   > The bytes4 magic value to return when signature is valid is 0x20c13b0b : bytes4(keccak256("isValidSignature(bytes,bytes)")\n   *   > This function MAY modify Ethereum\'s state\n   * @param _data       Arbitrary length data signed on the behalf of address(this)\n   * @param _signature  Signature byte array associated with _data\n   * @return magicValue Magic value 0x20c13b0b if the signature is valid and 0x0 otherwise\n   */\n  function isValidSignature(\n    bytes calldata _data,\n    bytes calldata _signature)\n    external\n    view\n    returns (bytes4 magicValue);\n\n  /**\n   * @notice Verifies whether the provided signature is valid with respect to the provided hash\n   * @dev MUST return the correct magic value if the signature provided is valid for the provided hash\n   *   > The bytes4 magic value to return when signature is valid is 0x20c13b0b : bytes4(keccak256("isValidSignature(bytes,bytes)")\n   *   > This function MAY modify Ethereum\'s state\n   * @param _hash       keccak256 hash that was signed\n   * @param _signature  Signature byte array associated with _data\n   * @return magicValue Magic value 0x20c13b0b if the signature is valid and 0x0 otherwise\n   */\n  function isValidSignature(\n    bytes32 _hash,\n    bytes calldata _signature)\n    external\n    view\n    returns (bytes4 magicValue);\n}'
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
      'contracts/modules/commons/ModuleAuth.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "../../utils/LibBytes.sol";\nimport "../../interfaces/IERC1271Wallet.sol";\n\nimport "./interfaces/IModuleAuth.sol";\n\nimport "./ModuleERC165.sol";\n\nimport "./submodules/auth/SequenceBaseSig.sol";\nimport "./submodules/auth/SequenceDynamicSig.sol";\nimport "./submodules/auth/SequenceNoChainIdSig.sol";\nimport "./submodules/auth/SequenceChainedSig.sol";\n\n\nabstract contract ModuleAuth is\n  IModuleAuth,\n  ModuleERC165,\n  IERC1271Wallet,\n  SequenceChainedSig\n{\n  using LibBytes for bytes;\n\n  bytes1 internal constant LEGACY_TYPE = hex"00";\n  bytes1 internal constant DYNAMIC_TYPE = hex"01";\n  bytes1 internal constant NO_CHAIN_ID_TYPE = hex"02";\n  bytes1 internal constant CHAINED_TYPE = hex"03";\n\n  bytes4 internal constant SELECTOR_ERC1271_BYTES_BYTES = 0x20c13b0b;\n  bytes4 internal constant SELECTOR_ERC1271_BYTES32_BYTES = 0x1626ba7e;\n\n  /**\n   * @notice Recovers the threshold, weight, imageHash, subdigest, and checkpoint of a signature.\n   * @dev The signature must be prefixed with a type byte, which is used to determine the recovery method.\n   *\n   * @param _digest Digest of the signed data.\n   * @param _signature A Sequence signature.\n   *\n   * @return threshold The required number of signatures needed to consider the signature valid.\n   * @return weight The actual number of signatures collected in the signature.\n   * @return imageHash The imageHash of the configuration that signed the message.\n   * @return subdigest A modified version of the original digest, unique for each wallet/network.\n   * @return checkpoint A nonce that is incremented every time a new configuration is set.\n   */\n  function signatureRecovery(\n    bytes32 _digest,\n    bytes calldata _signature\n  ) public override virtual view returns (\n    uint256 threshold,\n    uint256 weight,\n    bytes32 imageHash,\n    bytes32 subdigest,\n    uint256 checkpoint\n  ) {\n    bytes1 signatureType = _signature[0];\n\n    if (signatureType == LEGACY_TYPE) {\n      // networkId digest + base recover\n      subdigest = SequenceBaseSig.subdigest(_digest);\n      (threshold, weight, imageHash, checkpoint) = SequenceBaseSig.recover(subdigest, _signature);\n      return (threshold, weight, imageHash, subdigest, checkpoint);\n    }\n\n    if (signatureType == DYNAMIC_TYPE) {\n      // networkId digest + dynamic recover\n      subdigest = SequenceBaseSig.subdigest(_digest);\n      (threshold, weight, imageHash, checkpoint) = SequenceDynamicSig.recover(subdigest, _signature);\n      return (threshold, weight, imageHash, subdigest, checkpoint);\n    }\n\n    if (signatureType == NO_CHAIN_ID_TYPE) {\n      // noChainId digest + dynamic recover\n      subdigest = SequenceNoChainIdSig.subdigest(_digest);\n      (threshold, weight, imageHash, checkpoint) = SequenceDynamicSig.recover(subdigest, _signature);\n      return (threshold, weight, imageHash, subdigest, checkpoint);\n    }\n\n    if (signatureType == CHAINED_TYPE) {\n      // original digest + chained recover\n      // (subdigest will be computed in the chained recover)\n      return chainedRecover(_digest, _signature);\n    }\n\n    revert InvalidSignatureType(signatureType);\n  }\n\n  /**\n   * @dev Validates a signature.\n   *\n   * @param _digest Digest of the signed data.\n   * @param _signature A Sequence signature.\n   *\n   * @return isValid Indicates whether the signature is valid or not.\n   * @return subdigest A modified version of the original digest, unique for each wallet/network.\n   */\n  function _signatureValidation(\n    bytes32 _digest,\n    bytes calldata _signature\n  ) internal override virtual view returns (\n    bool isValid,\n    bytes32 subdigest\n  ) {\n    uint256 threshold; uint256 weight; bytes32 imageHash;\n    (threshold, weight, imageHash, subdigest,) = signatureRecovery(_digest, _signature);\n    isValid = weight >= threshold && _isValidImage(imageHash);\n  }\n\n  /**\n   * @notice Verifies whether the provided signature is valid with respect to the provided data\n   * @dev MUST return the correct magic value if the signature provided is valid for the provided data\n   *   > The bytes4 magic value to return when signature is valid is 0x20c13b0b : bytes4(keccak256("isValidSignature(bytes,bytes)"))\n   * @param _data       Arbitrary length data signed on the behalf of address(this)\n   * @param _signatures Signature byte array associated with _data.\n   *                    Encoded as abi.encode(Signature[], Configs)\n   * @return magicValue Magic value 0x20c13b0b if the signature is valid and 0x0 otherwise\n   */\n  function isValidSignature(\n    bytes calldata _data,\n    bytes calldata _signatures\n  ) public override virtual view returns (bytes4) {\n    // Validate signatures\n    (bool isValid,) = _signatureValidation(keccak256(_data), _signatures);\n    if (isValid) {\n      return SELECTOR_ERC1271_BYTES_BYTES;\n    }\n\n    return bytes4(0);\n  }\n\n  /**\n   * @notice Verifies whether the provided signature is valid with respect to the provided hash\n   * @dev MUST return the correct magic value if the signature provided is valid for the provided hash\n   *   > The bytes4 magic value to return when signature is valid is 0x1626ba7e : bytes4(keccak256("isValidSignature(bytes32,bytes)"))\n   * @param _hash       keccak256 hash that was signed\n   * @param _signatures Signature byte array associated with _data.\n   *                    Encoded as abi.encode(Signature[], Configs)\n   * @return magicValue Magic value 0x1626ba7e if the signature is valid and 0x0 otherwise\n   */\n  function isValidSignature(\n    bytes32 _hash,\n    bytes calldata _signatures\n  ) public override virtual view returns (bytes4) {\n    // Validate signatures\n    (bool isValid,) = _signatureValidation(_hash, _signatures);\n    if (isValid) {\n      return SELECTOR_ERC1271_BYTES32_BYTES;\n    }\n\n    return bytes4(0);\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override virtual pure returns (bool) {\n    if (\n      _interfaceID == type(IModuleAuth).interfaceId ||\n      _interfaceID == type(IERC1271Wallet).interfaceId\n    ) {\n      return true;\n    }\n\n    return super.supportsInterface(_interfaceID);\n  }\n\n  /**\n   * @notice Updates the signers configuration of the wallet\n   * @param _imageHash New required image hash of the signature\n   */\n  function updateImageHash(bytes32 _imageHash) external override virtual onlySelf {\n    _updateImageHash(_imageHash);\n  }\n}\n'
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
      'contracts/modules/GuestModule.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "../utils/LibOptim.sol";\n\nimport "./commons/submodules/auth/SequenceBaseSig.sol";\n\nimport "./commons/ModuleAuth.sol";\nimport "./commons/ModuleCalls.sol";\nimport "./commons/ModuleCreator.sol";\n\n\n/**\n * GuestModule implements a Sequence wallet without signatures, nonce or replay protection.\n * executing transactions using this wallet is not an authenticated process, and can be done by any address.\n *\n * @notice This contract is completely public with no security, designed to execute pre-signed transactions\n *   and use Sequence tools without using the wallets.\n */\ncontract GuestModule is\n  ModuleAuth,\n  ModuleCalls,\n  ModuleCreator\n{\n  error DelegateCallNotAllowed(uint256 _index);\n  error NotSupported();\n\n  /**\n   * @notice Allow any caller to execute an action\n   * @param _txs Transactions to process\n   */\n  function execute(\n    Transaction[] calldata _txs,\n    uint256,\n    bytes calldata\n  ) public override {\n    // Hash transaction bundle\n    bytes32 txHash = SequenceBaseSig.subdigest(keccak256(abi.encode(\'guest:\', _txs)));\n\n    // Execute the transactions\n    _executeGuest(txHash, _txs);\n  }\n\n  /**\n   * @notice Allow any caller to execute an action\n   * @param _txs Transactions to process\n   */\n  function selfExecute(\n    Transaction[] calldata _txs\n  ) public override {\n    // Hash transaction bundle\n    bytes32 txHash = SequenceBaseSig.subdigest(keccak256(abi.encode(\'self:\', _txs)));\n\n    // Execute the transactions\n    _executeGuest(txHash, _txs);\n  }\n\n  /**\n   * @notice Executes a list of transactions\n   * @param _txHash  Hash of the batch of transactions\n   * @param _txs  Transactions to execute\n   */\n  function _executeGuest(\n    bytes32 _txHash,\n    Transaction[] calldata _txs\n  ) private {\n    // Execute transaction\n    uint256 size = _txs.length;\n    for (uint256 i = 0; i < size; i++) {\n      Transaction calldata transaction = _txs[i];\n\n      if (transaction.delegateCall) revert DelegateCallNotAllowed(i);\n\n      uint256 gasLimit = transaction.gasLimit;\n      if (gasleft() < gasLimit) revert NotEnoughGas(i, gasLimit, gasleft());\n\n      bool success = LibOptim.call(\n        transaction.target,\n        transaction.value,\n        gasLimit == 0 ? gasleft() : gasLimit,\n        transaction.data\n      );\n\n      if (success) {\n        emit TxExecuted(_txHash, i);\n      } else {\n        _revertBytes(\n          transaction.revertOnError,\n          _txHash,\n          i,\n          LibOptim.returnData()\n        );\n      }\n    }\n  }\n\n  /**\n   * @notice Validates any signature image, because the wallet is public and has no owner.\n   * @return true, all signatures are valid.\n   */\n  function _isValidImage(bytes32) internal override pure returns (bool) {\n    return true;\n  }\n\n  /**\n   * Not supported.\n   */\n  function _updateImageHash(bytes32) internal override virtual {\n    revert NotSupported();\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(\n    bytes4 _interfaceID\n  ) public override (\n    ModuleAuth,\n    ModuleCalls,\n    ModuleCreator\n  ) pure returns (bool) {\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
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
      'contracts/utils/SignatureValidator.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "../interfaces/IERC1271Wallet.sol";\n\nimport "./LibBytes.sol";\n\n/**\n * @dev Contains logic for signature validation.\n * Signatures from wallet contracts assume ERC-1271 support (https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1271.md)\n * Notes: Methods are strongly inspired by contracts in https://github.com/0xProject/0x-monorepo/blob/development/\n */\nlibrary SignatureValidator {\n  // Errors\n  error InvalidSignatureLength(bytes _signature);\n  error EmptySignature();\n  error InvalidSValue(bytes _signature, bytes32 _s);\n  error InvalidVValue(bytes _signature, uint256 _v);\n  error UnsupportedSignatureType(bytes _signature, uint256 _type, bool _recoverMode);\n  error SignerIsAddress0(bytes _signature);\n\n  using LibBytes for bytes;\n\n  /***********************************|\n  |             Variables             |\n  |__________________________________*/\n\n  // bytes4(keccak256("isValidSignature(bytes,bytes)"))\n  bytes4 constant internal ERC1271_MAGICVALUE = 0x20c13b0b;\n\n  // bytes4(keccak256("isValidSignature(bytes32,bytes)"))\n  bytes4 constant internal ERC1271_MAGICVALUE_BYTES32 = 0x1626ba7e;\n\n  // Allowed signature types.\n  uint256 private constant SIG_TYPE_EIP712 = 1;\n  uint256 private constant SIG_TYPE_ETH_SIGN = 2;\n  uint256 private constant SIG_TYPE_WALLET_BYTES32 = 3;\n\n  /***********************************|\n  |        Signature Functions        |\n  |__________________________________*/\n\n /**\n   * @notice Recover the signer of hash, assuming it\'s an EOA account\n   * @dev Only for SignatureType.EIP712 and SignatureType.EthSign signatures\n   * @param _hash      Hash that was signed\n   *   encoded as (bytes32 r, bytes32 s, uint8 v, ... , SignatureType sigType)\n   */\n  function recoverSigner(\n    bytes32 _hash,\n    bytes calldata _signature\n  ) internal pure returns (address signer) {\n    if (_signature.length != 66) revert InvalidSignatureLength(_signature);\n    uint256 signatureType = _signature.readUint8(_signature.length - 1);\n\n    // Variables are not scoped in Solidity.\n    uint8 v = _signature.readUint8(64);\n    bytes32 r = _signature.readBytes32(0);\n    bytes32 s = _signature.readBytes32(32);\n\n    // EIP-2 still allows signature malleability for ecrecover(). Remove this possibility and make the signature\n    // unique. Appendix F in the Ethereum Yellow paper (https://ethereum.github.io/yellowpaper/paper.pdf), defines\n    // the valid range for s in (281): 0 < s < secp256k1n \u00f7 2 + 1, and for v in (282): v \u2208 {27, 28}. Most\n    // signatures from current libraries generate a unique signature with an s-value in the lower half order.\n    //\n    // If your library generates malleable signatures, such as s-values in the upper range, calculate a new s-value\n    // with 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 - s1 and flip v from 27 to 28 or\n    // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept\n    // these malleable signatures as well.\n    //\n    // Source OpenZeppelin\n    // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/cryptography/ECDSA.sol\n\n    if (uint256(s) > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) {\n      revert InvalidSValue(_signature, s);\n    }\n\n    if (v != 27 && v != 28) {\n      revert InvalidVValue(_signature, v);\n    }\n\n    // Signature using EIP712\n    if (signatureType == SIG_TYPE_EIP712) {\n      signer = ecrecover(_hash, v, r, s);\n\n    // Signed using web3.eth_sign() or Ethers wallet.signMessage()\n    } else if (signatureType == SIG_TYPE_ETH_SIGN) {\n      signer = ecrecover(\n        keccak256(abi.encodePacked("\\x19Ethereum Signed Message:\\n32", _hash)),\n        v,\n        r,\n        s\n      );\n\n    } else {\n      // We cannot recover the signer for any other signature type.\n      revert UnsupportedSignatureType(_signature, signatureType, true);\n    }\n\n    // Prevent signer from being 0x0\n    if (signer == address(0x0)) revert SignerIsAddress0(_signature);\n\n    return signer;\n  }\n\n /**\n   * @notice Returns true if the provided signature is valid for the given signer.\n   * @dev Supports SignatureType.EIP712, SignatureType.EthSign, and ERC1271 signatures\n   * @param _hash      Hash that was signed\n   * @param _signer    Address of the signer candidate\n   * @param _signature Signature byte array\n   */\n  function isValidSignature(\n    bytes32 _hash,\n    address _signer,\n    bytes calldata _signature\n  ) internal view returns (bool valid) {\n    if (_signature.length == 0) {\n      revert EmptySignature();\n    }\n\n    uint256 signatureType = uint8(_signature[_signature.length - 1]);\n    if (signatureType == SIG_TYPE_EIP712 || signatureType == SIG_TYPE_ETH_SIGN) {\n      // Recover signer and compare with provided\n      valid = recoverSigner(_hash, _signature) == _signer;\n\n    } else if (signatureType == SIG_TYPE_WALLET_BYTES32) {\n      // Remove signature type before calling ERC1271, restore after call\n      valid = ERC1271_MAGICVALUE_BYTES32 == IERC1271Wallet(_signer).isValidSignature(_hash, _signature[0:_signature.length - 1]);\n\n    } else {\n      // We cannot validate any other signature type.\n      // We revert because we can say nothing about its validity.\n      revert UnsupportedSignatureType(_signature, signatureType, false);\n    }\n  }\n}\n'
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
