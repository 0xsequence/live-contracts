import { ContractFactory, type ethers } from 'ethers'
import type { VerificationRequest } from 'scripts/types'

export class GuestModuleV1 extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      [
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
          anonymous: true,
          inputs: [
            {
              indexed: false,
              internalType: 'bytes32',
              name: '_tx',
              type: 'bytes32'
            }
          ],
          name: 'TxExecuted',
          type: 'event'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'bytes32',
              name: '_tx',
              type: 'bytes32'
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
        }
      ],
      '0x608060405234801561001057600080fd5b50611ddc806100206000396000f3fe60806040526004361061007b5760003560e01c80637a9a16281161004e5780637a9a1628146101255780638c3f55631461014557806390042baf14610172578063affed0e0146101925761007b565b806301ffc9a7146100805780631626ba7e146100b657806320c13b0b146100e357806361c2926c14610103575b600080fd5b34801561008c57600080fd5b506100a061009b366004611677565b6101a7565b6040516100ad91906118be565b60405180910390f35b3480156100c257600080fd5b506100d66100d136600461162d565b6101ba565b6040516100ad91906118eb565b3480156100ef57600080fd5b506100d66100fe3660046116b7565b610233565b34801561010f57600080fd5b5061012361011e366004611590565b61028d565b005b34801561013157600080fd5b506101236101403660046115c3565b6102ce565b34801561015157600080fd5b50610165610160366004611753565b6102f6565b6040516100ad91906118c9565b610185610180366004611720565b610322565b6040516100ad919061189d565b34801561019e57600080fd5b506101656103d6565b60006101b2826103e7565b90505b919050565b60006102046101c885610444565b84848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506104a492505050565b1561022c57507f1626ba7e000000000000000000000000000000000000000000000000000000005b9392505050565b600061025d6101c88686604051808383808284376040519201829003909120935061044492505050565b1561028557507f20c13b0b000000000000000000000000000000000000000000000000000000005b949350505050565b60006102be826040516020016102a39190611a19565b60405160208183030381529060405280519060200120610444565b90506102ca818361069c565b5050565b60006102e4846040516020016102a39190611975565b90506102f0818561069c565b50505050565b60006101b27f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e83610817565b600033301461037c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526027815260200180611d806027913960400191505060405180910390fd5b81516020830134f06040805173ffffffffffffffffffffffffffffffffffffffff8316815290519192507fa506ad4e7f05eceba62a023c3219e5bd98a615f4fa87e2afb08a2da5cf62bf0c919081900360200190a1919050565b60006103e260006102f6565b905090565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f90042baf00000000000000000000000000000000000000000000000000000000141561043b575060016101b5565b6101b282610844565b604080517f19010000000000000000000000000000000000000000000000000000000000006020808301919091524660228301523060601b6042830152605680830194909452825180830390940184526076909101909152815191012090565b60008060006104b2846108a1565b909250905061ffff821660005b855183101561067957600080806104d6898761090f565b975060ff918216945016915060018314156104fe576104f58987610990565b96509050610622565b8261052a57606061050f8a88610a08565b9750905061051d8b82610ab9565b9150828501945050610622565b60028314156105d15761053d8987610990565b96509050600061054d8a88610e43565b975061ffff16905060606105628b8984610eb4565b985090506105718c8483610fa3565b6105c6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526032815260200180611c0b6032913960400191505060405180910390fd5b505092810192610622565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180611b28602c913960400191505060405180910390fd5b848282604051602001808481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff16815260200193505050506040516020818303038152906040528051906020012094505050506104bf565b8361ffff1681101580156106915750610691826111eb565b979650505050505050565b60005b81518110156108125760008282815181106106b657fe5b6020026020010151905060006060826000015115610709576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610700906119bc565b60405180910390fd5b82604001515a1015610747576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070090611918565b826060015173ffffffffffffffffffffffffffffffffffffffff168360800151846040015160001461077d57846040015161077f565b5a5b908560a001516040516107929190611881565b600060405180830381858888f193505050503d80600081146107d0576040519150601f19603f3d011682016040523d82523d6000602084013e6107d5565b606091505b50909250905081156107fc57856040516107ef91906118c9565b60405180910390a0610807565b6108078387836111f1565b50505060010161069f565b505050565b60408051602080820194909452808201929092528051808303820181526060909201905280519101205490565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f389901c7000000000000000000000000000000000000000000000000000000001415610898575060016101b5565b6101b282611241565b6020810151815160f09190911c9060029081111561090a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526027815260200180611b776027913960400191505060405180910390fd5b915091565b8082016020015160f881901c9060f01c60ff166002830183811161092f57fe5b8451811115610989576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180611cdb6026913960400191505060405180910390fd5b9250925092565b8082016020015160601c601482018281116109a757fe5b8351811115610a01576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526023815260200180611b546023913960400191505060405180910390fd5b9250929050565b604080516042808252608082019092526060916000919060208201818036833701905050915082840160200180516020840152602081015160408401526022810151604284015250604283019050828111610a5f57fe5b8351811115610a01576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526023815260200180611c7c6023913960400191505060405180910390fd5b60008151604214610b15576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603a815260200180611aee603a913960400191505060405180910390fd5b600082600184510381518110610b2757fe5b602001015160f81c60f81b60f81c60ff169050600083604081518110610b4957fe5b016020015160f81c90506000610b5f85826112c9565b90506000610b6e8660206112c9565b90507f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0811115610be9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603d815260200180611ab1603d913960400191505060405180910390fd5b8260ff16601b14158015610c0157508260ff16601c14155b15610c57576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603d815260200180611b9e603d913960400191505060405180910390fd5b6001841415610ccb5760018784848460405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015610cba573d6000803e3d6000fd5b505050602060405103519450610dcd565b6002841415610d7c5760018760405160200180807f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250601c018281526020019150506040516020818303038152906040528051906020012084848460405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015610cba573d6000803e3d6000fd5b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603c815260200180611c9f603c913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8516610e39576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526030815260200180611bdb6030913960400191505060405180910390fd5b5050505092915050565b8082016020015160f01c60028201828111610e5a57fe5b8351811115610a01576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180611d226022913960400191505060405180910390fd5b606060008267ffffffffffffffff81118015610ecf57600080fd5b506040519080825280601f01601f191660200182016040528015610efa576020820181803683370190505b509150838501602001600060205b85811015610f2157908201518482015260208101610f08565b8486016020018051939092015190850152525082820183811015610f4157fe5b8451811115610f9b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180611d016021913960400191505060405180910390fd5b935093915050565b60008082600184510381518110610fb657fe5b016020015160f81c90506001811480610fcf5750600281145b15611013578373ffffffffffffffffffffffffffffffffffffffff16610ff58685610ab9565b73ffffffffffffffffffffffffffffffffffffffff161491506111e3565b60038114156111925782517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81018452604080517f1626ba7e000000000000000000000000000000000000000000000000000000008152600481018881526024820192835286516044830152865173ffffffffffffffffffffffffffffffffffffffff891693631626ba7e938b938a9390929160640190602085019080838360005b838110156110cd5781810151838201526020016110b5565b50505050905090810190601f1680156110fa5780820380516001836020036101000a031916815260200191505b50935050505060206040518083038186803b15801561111857600080fd5b505afa15801561112c573d6000803e3d6000fd5b505050506040513d602081101561114257600080fd5b50519084527fffffffff00000000000000000000000000000000000000000000000000000000167f1626ba7e000000000000000000000000000000000000000000000000000000001491506111e3565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603f815260200180611c3d603f913960400191505060405180910390fd5b509392505050565b50600190565b82602001511561120357805160208201fd5b7f3dbd1590ea96dd3253a91f24e64e3a502e1225d602a5731357bc12643070ccd782826040516112349291906118d2565b60405180910390a1505050565b60007fffffffff00000000000000000000000000000000000000000000000000000000821615806112b357507fffffffff0000000000000000000000000000000000000000000000000000000082167f36e7817500000000000000000000000000000000000000000000000000000000145b156112c0575060016101b5565b6101b282611331565b60008160200183511015611328576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603c815260200180611d44603c913960400191505060405180910390fd5b50016020015190565b7fffffffff0000000000000000000000000000000000000000000000000000000081167f01ffc9a70000000000000000000000000000000000000000000000000000000014919050565b803573ffffffffffffffffffffffffffffffffffffffff811681146101b557600080fd5b600082601f8301126113af578081fd5b8135602067ffffffffffffffff808311156113c657fe5b6113d38283850201611a60565b83815282810190868401865b868110156114af578135890160c0807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0838e0301121561141d57898afd5b604080518281018181108a8211171561143257fe5b825261143f848b016114bd565b815261144c8285016114bd565b8a820152606080850135838301526080925061146983860161137b565b9082015260a08481013583830152928401359289841115611488578c8dfd5b6114968f8c8688010161150d565b90820152875250505092850192908501906001016113df565b509098975050505050505050565b803580151581146101b557600080fd5b60008083601f8401126114de578182fd5b50813567ffffffffffffffff8111156114f5578182fd5b602083019150836020828501011115610a0157600080fd5b600082601f83011261151d578081fd5b813567ffffffffffffffff81111561153157fe5b61156260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601611a60565b818152846020838601011115611576578283fd5b816020850160208301379081016020019190915292915050565b6000602082840312156115a1578081fd5b813567ffffffffffffffff8111156115b7578182fd5b6102858482850161139f565b6000806000606084860312156115d7578182fd5b833567ffffffffffffffff808211156115ee578384fd5b6115fa8783880161139f565b9450602086013593506040860135915080821115611616578283fd5b506116238682870161150d565b9150509250925092565b600080600060408486031215611641578283fd5b83359250602084013567ffffffffffffffff81111561165e578283fd5b61166a868287016114cd565b9497909650939450505050565b600060208284031215611688578081fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461022c578182fd5b600080600080604085870312156116cc578081fd5b843567ffffffffffffffff808211156116e3578283fd5b6116ef888389016114cd565b90965094506020870135915080821115611707578283fd5b50611714878288016114cd565b95989497509550505050565b600060208284031215611731578081fd5b813567ffffffffffffffff811115611747578182fd5b6102858482850161150d565b600060208284031215611764578081fd5b5035919050565b60008282518085526020808601955080818302840101818601855b8481101561182a578583037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe00189528151805115158452848101511515858501526040808201519085015260608082015173ffffffffffffffffffffffffffffffffffffffff16908501526080808201519085015260a09081015160c09185018290529061181681860183611837565b9a86019a9450505090830190600101611786565b5090979650505050505050565b6000815180845261184f816020860160208601611a84565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60008251611893818460208701611a84565b9190910192915050565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b901515815260200190565b90815260200190565b6000838252604060208301526102856040830184611837565b7fffffffff0000000000000000000000000000000000000000000000000000000091909116815260200190565b60208082526029908201527f47756573744d6f64756c65235f6578656375746547756573743a204e4f545f4560408201527f4e4f5547485f4741530000000000000000000000000000000000000000000000606082015260800190565b600060408252600660408301527f67756573743a000000000000000000000000000000000000000000000000000060608301526080602083015261022c608083018461176b565b60208082526033908201527f47756573744d6f64756c65235f6578656375746547756573743a2064656c656760408201527f61746543616c6c206e6f7420616c6c6f77656400000000000000000000000000606082015260800190565b600060408252600560408301527f73656c663a00000000000000000000000000000000000000000000000000000060608301526080602083015261022c608083018461176b565b60405181810167ffffffffffffffff81118282101715611a7c57fe5b604052919050565b60005b83811015611a9f578181015183820152602001611a87565b838111156102f0575050600091015256fe5369676e617475726556616c696461746f72237265636f7665725369676e65723a20696e76616c6964207369676e6174757265202773272076616c75655369676e617475726556616c696461746f72237265636f7665725369676e65723a20696e76616c6964207369676e6174757265206c656e6774684d6f64756c6541757468235f7369676e617475726556616c69646174696f6e20494e56414c49445f464c41474c696242797465732372656164416464726573733a204f55545f4f465f424f554e44534c696242797465732372656164466972737455696e7431363a204f55545f4f465f424f554e44535369676e617475726556616c696461746f72237265636f7665725369676e65723a20696e76616c6964207369676e6174757265202776272076616c75655369676e617475726556616c696461746f72237265636f7665725369676e65723a20494e56414c49445f5349474e45524d6f64756c6541757468235f7369676e617475726556616c69646174696f6e3a20494e56414c49445f5349474e41545552455369676e617475726556616c696461746f7223697356616c69645369676e61747572653a20554e535550504f525445445f5349474e41545552455f545950454c696242797465732372656164427974657336363a204f55545f4f465f424f554e44535369676e617475726556616c696461746f72237265636f7665725369676e65723a20554e535550504f525445445f5349474e41545552455f545950454c69624279746573237265616455696e743855696e74383a204f55545f4f465f424f554e44534c69624279746573237265616442797465733a204f55545f4f465f424f554e44534c69624279746573237265616455696e7431363a204f55545f4f465f424f554e44534c696242797465732372656164427974657333323a20475245415445525f4f525f455155414c5f544f5f33325f4c454e4754485f52455155495245444d6f64756c6553656c6641757468236f6e6c7953656c663a204e4f545f415554484f52495a4544a2646970667358221220f5a1de0b650baa2ee828e8766bc6dbd0c74da0cc4735a143852d24f868e4b62464736f6c63430007060033',
      signer
    )
  }
}

export const GUEST_MODULE_V1_VERIFICATION: Omit<VerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'contracts/modules/GuestModule.sol:GuestModule',
  version: 'v0.7.6+commit.7338295f',
  licenceType: 'Apache-2.0',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'contracts/modules/GuestModule.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\npragma experimental ABIEncoderV2;\n\nimport "../utils/SignatureValidator.sol";\n\nimport "./commons/Implementation.sol";\nimport "./commons/ModuleAuth.sol";\nimport "./commons/ModuleHooks.sol";\nimport "./commons/ModuleCalls.sol";\nimport "./commons/ModuleUpdate.sol";\nimport "./commons/ModuleCreator.sol";\n\nimport "../interfaces/receivers/IERC1155Receiver.sol";\nimport "../interfaces/receivers/IERC721Receiver.sol";\n\nimport "../interfaces/IERC1271Wallet.sol";\n\n\n/**\n * GuestModule implements an Arcadeum wallet without signatures, nonce or replay protection.\n * executing transactions using this wallet is not an authenticated process, and can be done by any address.\n *\n * @notice This contract is completely public with no security, designed to execute pre-signed transactions\n *   and use Arcadeum tools without using the wallets.\n */\ncontract GuestModule is\n  ModuleAuth,\n  ModuleCalls,\n  ModuleCreator\n{\n  /**\n   * @notice Allow any caller to execute an action\n   * @param _txs Transactions to process\n   */\n  function execute(\n    Transaction[] memory _txs,\n    uint256,\n    bytes memory\n  ) public override {\n    // Hash transaction bundle\n    bytes32 txHash = _subDigest(keccak256(abi.encode(\'guest:\', _txs)));\n\n    // Execute the transactions\n    _executeGuest(txHash, _txs);\n  }\n\n  /**\n   * @notice Allow any caller to execute an action\n   * @param _txs Transactions to process\n   */\n  function selfExecute(\n    Transaction[] memory _txs\n  ) public override {\n    // Hash transaction bundle\n    bytes32 txHash = _subDigest(keccak256(abi.encode(\'self:\', _txs)));\n\n    // Execute the transactions\n    _executeGuest(txHash, _txs);\n  }\n\n  /**\n   * @notice Executes a list of transactions\n   * @param _txHash  Hash of the batch of transactions\n   * @param _txs  Transactions to execute\n   */\n  function _executeGuest(\n    bytes32 _txHash,\n    Transaction[] memory _txs\n  ) private {\n    // Execute transaction\n    for (uint256 i = 0; i < _txs.length; i++) {\n      Transaction memory transaction = _txs[i];\n\n      bool success;\n      bytes memory result;\n\n      require(!transaction.delegateCall, \'GuestModule#_executeGuest: delegateCall not allowed\');\n      require(gasleft() >= transaction.gasLimit, "GuestModule#_executeGuest: NOT_ENOUGH_GAS");\n\n      // solhint-disable\n      (success, result) = transaction.target.call{\n        value: transaction.value,\n        gas: transaction.gasLimit == 0 ? gasleft() : transaction.gasLimit\n      }(transaction.data);\n      // solhint-enable\n\n      if (success) {\n        emit TxExecuted(_txHash);\n      } else {\n        _revertBytes(transaction, _txHash, result);\n      }\n    }\n  }\n\n  /**\n   * @notice Validates any signature image, because the wallet is public and has now owner.\n   * @return true, all signatures are valid.\n   */\n  function _isValidImage(bytes32) internal override view returns (bool) {\n    return true;\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(\n    bytes4 _interfaceID\n  ) public override (\n    ModuleAuth,\n    ModuleCalls,\n    ModuleCreator\n  ) pure returns (bool) {\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/utils/SignatureValidator.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\nimport "../interfaces/IERC1271Wallet.sol";\n\nimport "./LibBytes.sol";\n\n/**\n * @dev Contains logic for signature validation.\n * Signatures from wallet contracts assume ERC-1271 support (https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1271.md)\n * Notes: Methods are strongly inspired by contracts in https://github.com/0xProject/0x-monorepo/blob/development/\n */\ncontract SignatureValidator {\n  using LibBytes for bytes;\n\n  /***********************************|\n  |             Variables             |\n  |__________________________________*/\n\n  // bytes4(keccak256("isValidSignature(bytes,bytes)"))\n  bytes4 constant internal ERC1271_MAGICVALUE = 0x20c13b0b;\n\n  // bytes4(keccak256("isValidSignature(bytes32,bytes)"))\n  bytes4 constant internal ERC1271_MAGICVALUE_BYTES32 = 0x1626ba7e;\n\n  // Allowed signature types.\n  uint256 private constant SIG_TYPE_EIP712 = 1;\n  uint256 private constant SIG_TYPE_ETH_SIGN = 2;\n  uint256 private constant SIG_TYPE_WALLET_BYTES32 = 3;\n\n  /***********************************|\n  |        Signature Functions        |\n  |__________________________________*/\n\n /**\n   * @notice Recover the signer of hash, assuming it\'s an EOA account\n   * @dev Only for SignatureType.EIP712 and SignatureType.EthSign signatures\n   * @param _hash      Hash that was signed\n   *   encoded as (bytes32 r, bytes32 s, uint8 v, ... , SignatureType sigType)\n   */\n  function recoverSigner(\n    bytes32 _hash,\n    bytes memory _signature\n  ) internal pure returns (address signer) {\n    require(_signature.length == 66, "SignatureValidator#recoverSigner: invalid signature length");\n    uint256 signatureType = uint8(_signature[_signature.length - 1]);\n\n    // Variables are not scoped in Solidity.\n    uint8 v = uint8(_signature[64]);\n    bytes32 r = _signature.readBytes32(0);\n    bytes32 s = _signature.readBytes32(32);\n\n    // EIP-2 still allows signature malleability for ecrecover(). Remove this possibility and make the signature\n    // unique. Appendix F in the Ethereum Yellow paper (https://ethereum.github.io/yellowpaper/paper.pdf), defines\n    // the valid range for s in (281): 0 < s < secp256k1n \u00f7 2 + 1, and for v in (282): v \u2208 {27, 28}. Most\n    // signatures from current libraries generate a unique signature with an s-value in the lower half order.\n    //\n    // If your library generates malleable signatures, such as s-values in the upper range, calculate a new s-value\n    // with 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 - s1 and flip v from 27 to 28 or\n    // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept\n    // these malleable signatures as well.\n    //\n    // Source OpenZeppelin\n    // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/cryptography/ECDSA.sol\n\n    if (uint256(s) > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) {\n      revert("SignatureValidator#recoverSigner: invalid signature \'s\' value");\n    }\n\n    if (v != 27 && v != 28) {\n      revert("SignatureValidator#recoverSigner: invalid signature \'v\' value");\n    }\n\n    // Signature using EIP712\n    if (signatureType == SIG_TYPE_EIP712) {\n      signer = ecrecover(_hash, v, r, s);\n\n    // Signed using web3.eth_sign() or Ethers wallet.signMessage()\n    } else if (signatureType == SIG_TYPE_ETH_SIGN) {\n      signer = ecrecover(\n        keccak256(abi.encodePacked("\\x19Ethereum Signed Message:\\n32", _hash)),\n        v,\n        r,\n        s\n      );\n\n    } else {\n      // Anything other signature types are illegal (We do not return false because\n      // the signature may actually be valid, just not in a format\n      // that we currently support. In this case returning false\n      // may lead the caller to incorrectly believe that the\n      // signature was invalid.)\n      revert("SignatureValidator#recoverSigner: UNSUPPORTED_SIGNATURE_TYPE");\n    }\n\n    // Prevent signer from being 0x0\n    require(\n      signer != address(0x0),\n      "SignatureValidator#recoverSigner: INVALID_SIGNER"\n    );\n\n    return signer;\n  }\n\n /**\n   * @notice Returns true if the provided signature is valid for the given signer.\n   * @dev Supports SignatureType.EIP712, SignatureType.EthSign, and ERC1271 signatures\n   * @param _hash      Hash that was signed\n   * @param _signer    Address of the signer candidate\n   * @param _signature Signature byte array\n   */\n  function isValidSignature(\n    bytes32 _hash,\n    address _signer,\n    bytes memory _signature\n  ) internal view returns (bool valid) {\n    uint256 signatureType = uint8(_signature[_signature.length - 1]);\n\n    if (signatureType == SIG_TYPE_EIP712 || signatureType == SIG_TYPE_ETH_SIGN) {\n      // Recover signer and compare with provided\n      valid = recoverSigner(_hash, _signature) == _signer;\n\n    } else if (signatureType == SIG_TYPE_WALLET_BYTES32) {\n      // Remove signature type before calling ERC1271, restore after call\n      uint256 prevSize; assembly { prevSize := mload(_signature) mstore(_signature, sub(prevSize, 1)) }\n      valid = ERC1271_MAGICVALUE_BYTES32 == IERC1271Wallet(_signer).isValidSignature(_hash, _signature);\n      assembly { mstore(_signature, prevSize) }\n\n    } else {\n      // Anything other signature types are illegal (We do not return false because\n      // the signature may actually be valid, just not in a format\n      // that we currently support. In this case returning false\n      // may lead the caller to incorrectly believe that the\n      // signature was invalid.)\n      revert("SignatureValidator#isValidSignature: UNSUPPORTED_SIGNATURE_TYPE");\n    }\n  }\n}\n'
      },
      'contracts/modules/commons/Implementation.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\n/**\n * @dev Allows modules to access the implementation slot\n */\ncontract Implementation {\n  /**\n   * @notice Updates the Wallet implementation\n   * @param _imp New implementation address\n   * @dev The wallet implementation is stored on the storage slot\n   *   defined by the address of the wallet itself\n   *   WARNING updating this value may break the wallet and users\n   *   must be confident that the new implementation is safe.\n   */\n  function _setImplementation(address _imp) internal {\n    assembly {\n      sstore(address(), _imp)\n    }\n  }\n\n  /**\n   * @notice Returns the Wallet implementation\n   * @return _imp The address of the current Wallet implementation\n   */\n  function _getImplementation() internal view returns (address _imp) {\n    assembly {\n      _imp := sload(address())\n    }\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleAuth.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\nimport "../../utils/LibBytes.sol";\nimport "../../utils/SignatureValidator.sol";\nimport "../../interfaces/IERC1271Wallet.sol";\n\nimport "./interfaces/IModuleAuth.sol";\n\nimport "./ModuleERC165.sol";\n\n\nabstract contract ModuleAuth is IModuleAuth, ModuleERC165, SignatureValidator, IERC1271Wallet {\n  using LibBytes for bytes;\n\n  uint256 private constant FLAG_SIGNATURE = 0;\n  uint256 private constant FLAG_ADDRESS = 1;\n  uint256 private constant FLAG_DYNAMIC_SIGNATURE = 2;\n\n  bytes4 private constant SELECTOR_ERC1271_BYTES_BYTES = 0x20c13b0b;\n  bytes4 private constant SELECTOR_ERC1271_BYTES32_BYTES = 0x1626ba7e;\n\n  /**\n   * @notice Verify if signer is default wallet owner\n   * @param _hash       Hashed signed message\n   * @param _signature  Array of signatures with signers ordered\n   *                    like the the keys in the multisig configs\n   *\n   * @dev The signature must be solidity packed and contain the total number of owners,\n   *      the threshold, the weight and either the address or a signature for each owner.\n   *\n   *      Each weight & (address or signature) pair is prefixed by a flag that signals if such pair\n   *      contains an address or a signature. The aggregated weight of the signatures must surpass the threshold.\n   *\n   *      Flag types:\n   *        0x00 - Signature\n   *        0x01 - Address\n   *\n   *      E.g:\n   *      abi.encodePacked(\n   *        uint16 threshold,\n   *        uint8 01,  uint8 weight_1, address signer_1,\n   *        uint8 00, uint8 weight_2, bytes signature_2,\n   *        ...\n   *        uint8 01,  uint8 weight_5, address signer_5\n   *      )\n   */\n  function _signatureValidation(\n    bytes32 _hash,\n    bytes memory _signature\n  )\n    internal override view returns (bool)\n  {\n    (\n      uint16 threshold,  // required threshold signature\n      uint256 rindex     // read index\n    ) = _signature.readFirstUint16();\n\n    // Start image hash generation\n    bytes32 imageHash = bytes32(uint256(threshold));\n\n    // Acumulated weight of signatures\n    uint256 totalWeight;\n\n    // Iterate until the image is completed\n    while (rindex < _signature.length) {\n      // Read next item type and addrWeight\n      uint256 flag; uint256 addrWeight; address addr;\n      (flag, addrWeight, rindex) = _signature.readUint8Uint8(rindex);\n\n      if (flag == FLAG_ADDRESS) {\n        // Read plain address\n        (addr, rindex) = _signature.readAddress(rindex);\n      } else if (flag == FLAG_SIGNATURE) {\n        // Read single signature and recover signer\n        bytes memory signature;\n        (signature, rindex) = _signature.readBytes66(rindex);\n        addr = recoverSigner(_hash, signature);\n\n        // Acumulate total weight of the signature\n        totalWeight += addrWeight;\n      } else if (flag == FLAG_DYNAMIC_SIGNATURE) {\n        // Read signer\n        (addr, rindex) = _signature.readAddress(rindex);\n\n        // Read signature size\n        uint256 size;\n        (size, rindex) = _signature.readUint16(rindex);\n\n        // Read dynamic size signature\n        bytes memory signature;\n        (signature, rindex) = _signature.readBytes(rindex, size);\n        require(isValidSignature(_hash, addr, signature), "ModuleAuth#_signatureValidation: INVALID_SIGNATURE");\n\n        // Acumulate total weight of the signature\n        totalWeight += addrWeight;\n      } else {\n        revert("ModuleAuth#_signatureValidation INVALID_FLAG");\n      }\n\n      // Write weight and address to image\n      imageHash = keccak256(abi.encode(imageHash, addrWeight, addr));\n    }\n\n    return totalWeight >= threshold && _isValidImage(imageHash);\n  }\n\n  /**\n   * @notice Validates the signature image\n   * @param _imageHash Hashed image of signature\n   * @return true if the signature image is valid\n   */\n  function _isValidImage(bytes32 _imageHash) internal virtual view returns (bool);\n\n  /**\n   * @notice Will hash _data to be signed (similar to EIP-712)\n   * @param _digest Pre-final digest\n   * @return hashed data for this wallet\n   */\n  function _subDigest(bytes32 _digest) internal override view returns (bytes32) {\n    uint256 chainId; assembly { chainId := chainid() }\n    return keccak256(\n      abi.encodePacked(\n        "\\x19\\x01",\n        chainId,\n        address(this),\n        _digest\n      )\n    );\n  }\n\n  /**\n   * @notice Verifies whether the provided signature is valid with respect to the provided data\n   * @dev MUST return the correct magic value if the signature provided is valid for the provided data\n   *   > The bytes4 magic value to return when signature is valid is 0x20c13b0b : bytes4(keccak256("isValidSignature(bytes,bytes)"))\n   * @param _data       Arbitrary length data signed on the behalf of address(this)\n   * @param _signatures Signature byte array associated with _data.\n   *                    Encoded as abi.encode(Signature[], Configs)\n   * @return magicValue Magic value 0x20c13b0b if the signature is valid and 0x0 otherwise\n   */\n  function isValidSignature(\n    bytes calldata _data,\n    bytes calldata _signatures\n  ) external override view returns (bytes4) {\n    // Validate signatures\n    if (_signatureValidation(_subDigest(keccak256(_data)), _signatures)) {\n      return SELECTOR_ERC1271_BYTES_BYTES;\n    }\n  }\n\n  /**\n   * @notice Verifies whether the provided signature is valid with respect to the provided hash\n   * @dev MUST return the correct magic value if the signature provided is valid for the provided hash\n   *   > The bytes4 magic value to return when signature is valid is 0x1626ba7e : bytes4(keccak256("isValidSignature(bytes32,bytes)"))\n   * @param _hash       keccak256 hash that was signed\n   * @param _signatures Signature byte array associated with _data.\n   *                    Encoded as abi.encode(Signature[], Configs)\n   * @return magicValue Magic value 0x1626ba7e if the signature is valid and 0x0 otherwise\n   */\n  function isValidSignature(\n    bytes32 _hash,\n    bytes calldata _signatures\n  ) external override view returns (bytes4) {\n    // Validate signatures\n    if (_signatureValidation(_subDigest(_hash), _signatures)) {\n      return SELECTOR_ERC1271_BYTES32_BYTES;\n    }\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override virtual pure returns (bool) {\n    if (\n      _interfaceID == type(IModuleAuth).interfaceId ||\n      _interfaceID == type(IERC1271Wallet).interfaceId\n    ) {\n      return true;\n    }\n\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleHooks.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\nimport "./interfaces/IModuleHooks.sol";\n\nimport "./ModuleSelfAuth.sol";\nimport "./ModuleStorage.sol";\nimport "./ModuleERC165.sol";\n\nimport "../../interfaces/receivers/IERC1155Receiver.sol";\nimport "../../interfaces/receivers/IERC721Receiver.sol";\nimport "../../interfaces/receivers/IERC223Receiver.sol";\n\n\ncontract ModuleHooks is IERC1155Receiver, IERC721Receiver, IModuleHooks, ModuleERC165, ModuleSelfAuth {\n  //                       HOOKS_KEY = keccak256("org.arcadeum.module.hooks.hooks");\n  bytes32 private constant HOOKS_KEY = bytes32(0xbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a120);\n\n  /**\n   * @notice Reads the implementation hook of a signature\n   * @param _signature Signature function\n   * @return The address of the implementation hook, address(0) if none\n  */\n  function readHook(bytes4 _signature) external override view returns (address) {\n    return _readHook(_signature);\n  }\n\n  /**\n   * @notice Adds a new hook to handle a given function selector\n   * @param _signature Signature function linked to the hook\n   * @param _implementation Hook implementation contract\n   * @dev Can\'t overwrite hooks that are part of the mainmodule (those defined below)\n   */\n  function addHook(bytes4 _signature, address _implementation) external override onlySelf {\n    require(_readHook(_signature) == address(0), "ModuleHooks#addHook: HOOK_ALREADY_REGISTERED");\n    _writeHook(_signature, _implementation);\n  }\n\n  /**\n   * @notice Removes a registered hook\n   * @param _signature Signature function linked to the hook\n   * @dev Can\'t remove hooks that are part of the mainmodule (those defined below) \n   *      without upgrading the wallet\n   */\n  function removeHook(bytes4 _signature) external override onlySelf {\n    require(_readHook(_signature) != address(0), "ModuleHooks#removeHook: HOOK_NOT_REGISTERED");\n    _writeHook(_signature, address(0));\n  }\n\n  /**\n   * @notice Reads the implementation hook of a signature\n   * @param _signature Signature function\n   * @return The address of the implementation hook, address(0) if none\n  */\n  function _readHook(bytes4 _signature) private view returns (address) {\n    return address(uint256(ModuleStorage.readBytes32Map(HOOKS_KEY, _signature)));\n  }\n\n  /**\n   * @notice Writes the implementation hook of a signature\n   * @param _signature Signature function\n   * @param _implementation Hook implementation contract\n  */\n  function _writeHook(bytes4 _signature, address _implementation) private {\n    ModuleStorage.writeBytes32Map(HOOKS_KEY, _signature, bytes32(uint256(_implementation)));\n  }\n\n  /**\n   * @notice Handle the receipt of a single ERC1155 token type.\n   * @return `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`\n   */\n  function onERC1155Received(\n    address,\n    address,\n    uint256,\n    uint256,\n    bytes calldata\n  ) external override returns (bytes4) {\n    return ModuleHooks.onERC1155Received.selector;\n  }\n\n  /**\n   * @notice Handle the receipt of multiple ERC1155 token types.\n   * @return `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`\n   */\n  function onERC1155BatchReceived(\n    address,\n    address,\n    uint256[] calldata,\n    uint256[] calldata,\n    bytes calldata\n  ) external override returns (bytes4) {\n    return ModuleHooks.onERC1155BatchReceived.selector;\n  }\n\n  /**\n   * @notice Handle the receipt of a single ERC721 token.\n   * @return `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`\n   */\n  function onERC721Received(address, address, uint256, bytes calldata) external override returns (bytes4) {\n    return ModuleHooks.onERC721Received.selector;\n  }\n\n  /**\n   * @notice Routes fallback calls through hooks\n   */\n  fallback() external payable {\n    address target = _readHook(msg.sig);\n    if (target != address(0)) {\n      (bool success, bytes memory result) = target.delegatecall(msg.data);\n      assembly {\n        if iszero(success)  {\n          revert(add(result, 0x20), mload(result))\n        }\n\n        return(add(result, 0x20), mload(result))\n      }\n    }\n  }\n\n  /**\n   * @notice Allows the wallet to receive ETH\n   */\n  receive() external payable { }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override virtual pure returns (bool) {\n    if (\n      _interfaceID == type(IModuleHooks).interfaceId ||\n      _interfaceID == type(IERC1155Receiver).interfaceId ||\n      _interfaceID == type(IERC721Receiver).interfaceId ||\n      _interfaceID == type(IERC223Receiver).interfaceId\n    ) {\n      return true;\n    }\n\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleCalls.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\npragma experimental ABIEncoderV2;\n\nimport "./ModuleSelfAuth.sol";\nimport "./ModuleStorage.sol";\nimport "./ModuleERC165.sol";\n\nimport "./interfaces/IModuleCalls.sol";\nimport "./interfaces/IModuleAuth.sol";\n\n\nabstract contract ModuleCalls is IModuleCalls, IModuleAuth, ModuleERC165, ModuleSelfAuth {\n  //                       NONCE_KEY = keccak256("org.arcadeum.module.calls.nonce");\n  bytes32 private constant NONCE_KEY = bytes32(0x8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e);\n\n  uint256 private constant NONCE_BITS = 96;\n  bytes32 private constant NONCE_MASK = bytes32((1 << NONCE_BITS) - 1);\n\n  /**\n   * @notice Returns the next nonce of the default nonce space\n   * @dev The default nonce space is 0x00\n   * @return The next nonce\n   */\n  function nonce() external override virtual view returns (uint256) {\n    return readNonce(0);\n  }\n\n  /**\n   * @notice Returns the next nonce of the given nonce space\n   * @param _space Nonce space, each space keeps an independent nonce count\n   * @return The next nonce\n   */\n  function readNonce(uint256 _space) public override virtual view returns (uint256) {\n    return uint256(ModuleStorage.readBytes32Map(NONCE_KEY, bytes32(_space)));\n  }\n\n  /**\n   * @notice Changes the next nonce of the given nonce space\n   * @param _space Nonce space, each space keeps an independent nonce count\n   * @param _nonce Nonce to write on the space\n   */\n  function _writeNonce(uint256 _space, uint256 _nonce) private {\n    ModuleStorage.writeBytes32Map(NONCE_KEY, bytes32(_space), bytes32(_nonce));\n  }\n\n  /**\n   * @notice Allow wallet owner to execute an action\n   * @dev Relayers must ensure that the gasLimit specified for each transaction\n   *      is acceptable to them. A user could specify large enough that it could\n   *      consume all the gas available.\n   * @param _txs        Transactions to process\n   * @param _nonce      Signature nonce (may contain an encoded space)\n   * @param _signature  Encoded signature\n   */\n  function execute(\n    Transaction[] memory _txs,\n    uint256 _nonce,\n    bytes memory _signature\n  ) public override virtual {\n    // Validate and update nonce\n    _validateNonce(_nonce);\n\n    // Hash transaction bundle\n    bytes32 txHash = _subDigest(keccak256(abi.encode(_nonce, _txs)));\n\n    // Verify that signatures are valid\n    require(\n      _signatureValidation(txHash, _signature),\n      "ModuleCalls#execute: INVALID_SIGNATURE"\n    );\n\n    // Execute the transactions\n    _execute(txHash, _txs);\n  }\n\n  /**\n   * @notice Allow wallet to execute an action\n   *   without signing the message\n   * @param _txs  Transactions to execute\n   */\n  function selfExecute(\n    Transaction[] memory _txs\n  ) public override virtual onlySelf {\n    // Hash transaction bundle\n    bytes32 txHash = _subDigest(keccak256(abi.encode(\'self:\', _txs)));\n\n    // Execute the transactions\n    _execute(txHash, _txs);\n  }\n\n  /**\n   * @notice Executes a list of transactions\n   * @param _txHash  Hash of the batch of transactions\n   * @param _txs  Transactions to execute\n   */\n  function _execute(\n    bytes32 _txHash,\n    Transaction[] memory _txs\n  ) private {\n    // Execute transaction\n    for (uint256 i = 0; i < _txs.length; i++) {\n      Transaction memory transaction = _txs[i];\n\n      bool success;\n      bytes memory result;\n\n      require(gasleft() >= transaction.gasLimit, "ModuleCalls#_execute: NOT_ENOUGH_GAS");\n\n      if (transaction.delegateCall) {\n        (success, result) = transaction.target.delegatecall{\n          gas: transaction.gasLimit == 0 ? gasleft() : transaction.gasLimit\n        }(transaction.data);\n      } else {\n        (success, result) = transaction.target.call{\n          value: transaction.value,\n          gas: transaction.gasLimit == 0 ? gasleft() : transaction.gasLimit\n        }(transaction.data);\n      }\n\n      if (success) {\n        emit TxExecuted(_txHash);\n      } else {\n        _revertBytes(transaction, _txHash, result);\n      }\n    }\n  }\n\n  /**\n   * @notice Verify if a nonce is valid\n   * @param _rawNonce Nonce to validate (may contain an encoded space)\n   * @dev A valid nonce must be above the last one used\n   *   with a maximum delta of 100\n   */\n  function _validateNonce(uint256 _rawNonce) private {\n    // Retrieve current nonce for this wallet\n    (uint256 space, uint256 providedNonce) = _decodeNonce(_rawNonce);\n    uint256 currentNonce = readNonce(space);\n\n    // Verify if nonce is valid\n    require(\n      providedNonce == currentNonce,\n      "MainModule#_auth: INVALID_NONCE"\n    );\n\n    // Update signature nonce\n    uint256 newNonce = providedNonce + 1;\n    _writeNonce(space, newNonce);\n    emit NonceChange(space, newNonce);\n  }\n\n  /**\n   * @notice Logs a failed transaction, reverts if the transaction is not optional\n   * @param _tx      Transaction that is reverting\n   * @param _txHash  Hash of the transaction\n   * @param _reason  Encoded revert message\n   */\n  function _revertBytes(\n    Transaction memory _tx,\n    bytes32 _txHash,\n    bytes memory _reason\n  ) internal {\n    if (_tx.revertOnError) {\n      assembly { revert(add(_reason, 0x20), mload(_reason)) }\n    } else {\n      emit TxFailed(_txHash, _reason);\n    }\n  }\n\n  /**\n   * @notice Decodes a raw nonce\n   * @dev A raw nonce is encoded using the first 160 bits for the space\n   *  and the last 96 bits for the nonce\n   * @param _rawNonce Nonce to be decoded\n   * @return _space The nonce space of the raw nonce\n   * @return _nonce The nonce of the raw nonce\n   */\n  function _decodeNonce(uint256 _rawNonce) private pure returns (uint256 _space, uint256 _nonce) {\n    _nonce = uint256(bytes32(_rawNonce) & NONCE_MASK);\n    _space = _rawNonce >> NONCE_BITS;\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override virtual pure returns (bool) {\n    if (_interfaceID == type(IModuleCalls).interfaceId) {\n      return true;\n    }\n\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleUpdate.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\nimport "./interfaces/IModuleUpdate.sol";\n\nimport "./Implementation.sol";\nimport "./ModuleSelfAuth.sol";\nimport "./ModuleERC165.sol";\n\nimport "../../utils/LibAddress.sol";\n\n\ncontract ModuleUpdate is IModuleUpdate, ModuleERC165, ModuleSelfAuth, Implementation {\n  using LibAddress for address;\n\n  event ImplementationUpdated(address newImplementation);\n\n  /**\n   * @notice Updates the implementation of the base wallet\n   * @param _implementation New main module implementation\n   * @dev WARNING Updating the implementation can brick the wallet\n   */\n  function updateImplementation(address _implementation) external override onlySelf {\n    require(_implementation.isContract(), "ModuleUpdate#updateImplementation: INVALID_IMPLEMENTATION");\n    _setImplementation(_implementation);\n    emit ImplementationUpdated(_implementation);\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override virtual pure returns (bool) {\n    if (_interfaceID == type(IModuleUpdate).interfaceId) {\n      return true;\n    }\n\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleCreator.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\nimport "./interfaces/IModuleCreator.sol";\n\nimport "./ModuleSelfAuth.sol";\nimport "./ModuleERC165.sol";\n\n\ncontract ModuleCreator is IModuleCreator, ModuleERC165, ModuleSelfAuth {\n  event CreatedContract(address _contract);\n\n  /**\n   * @notice Creates a contract forwarding eth value\n   * @param _code Creation code of the contract\n   * @return addr The address of the created contract\n   */\n  function createContract(bytes memory _code) public override payable onlySelf returns (address addr) {\n    assembly { addr := create(callvalue(), add(_code, 32), mload(_code)) }\n    emit CreatedContract(addr);\n  }\n\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) public override virtual pure returns (bool) {\n    if (_interfaceID == type(IModuleCreator).interfaceId) {\n      return true;\n    }\n\n    return super.supportsInterface(_interfaceID);\n  }\n}\n'
      },
      'contracts/interfaces/receivers/IERC1155Receiver.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\n\ninterface IERC1155Receiver {\n  function onERC1155Received(address, address, uint256, uint256, bytes calldata) external returns (bytes4);\n  function onERC1155BatchReceived(address, address, uint256[] calldata, uint256[] calldata, bytes calldata) external returns (bytes4);\n}\n'
      },
      'contracts/interfaces/receivers/IERC721Receiver.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\n\ninterface IERC721Receiver {\n  function onERC721Received(address, address, uint256, bytes calldata) external returns (bytes4);\n}\n'
      },
      'contracts/interfaces/IERC1271Wallet.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\n\ninterface IERC1271Wallet {\n\n  /**\n   * @notice Verifies whether the provided signature is valid with respect to the provided data\n   * @dev MUST return the correct magic value if the signature provided is valid for the provided data\n   *   > The bytes4 magic value to return when signature is valid is 0x20c13b0b : bytes4(keccak256("isValidSignature(bytes,bytes)")\n   *   > This function MAY modify Ethereum\'s state\n   * @param _data       Arbitrary length data signed on the behalf of address(this)\n   * @param _signature  Signature byte array associated with _data\n   * @return magicValue Magic value 0x20c13b0b if the signature is valid and 0x0 otherwise\n   */\n  function isValidSignature(\n    bytes calldata _data,\n    bytes calldata _signature)\n    external\n    view\n    returns (bytes4 magicValue);\n\n  /**\n   * @notice Verifies whether the provided signature is valid with respect to the provided hash\n   * @dev MUST return the correct magic value if the signature provided is valid for the provided hash\n   *   > The bytes4 magic value to return when signature is valid is 0x20c13b0b : bytes4(keccak256("isValidSignature(bytes,bytes)")\n   *   > This function MAY modify Ethereum\'s state\n   * @param _hash       keccak256 hash that was signed\n   * @param _signature  Signature byte array associated with _data\n   * @return magicValue Magic value 0x20c13b0b if the signature is valid and 0x0 otherwise\n   */\n  function isValidSignature(\n    bytes32 _hash,\n    bytes calldata _signature)\n    external\n    view\n    returns (bytes4 magicValue);\n}'
      },
      'contracts/utils/LibBytes.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\nlibrary LibBytes {\n  using LibBytes for bytes;\n\n  /***********************************|\n  |        Read Bytes Functions       |\n  |__________________________________*/\n\n  /**\n   * @dev Read firsts uint16 value.\n   * @param data Byte array to be read.\n   * @return a uint16 value of data at index zero.\n   * @return newIndex Updated index after reading the values.\n   */\n  function readFirstUint16(\n    bytes memory data\n  ) internal pure returns (\n    uint16 a,\n    uint256 newIndex\n  ) {\n    assembly {\n      let word := mload(add(32, data))\n      a := shr(240, word)\n      newIndex := 2\n    }\n    require(2 <= data.length, "LibBytes#readFirstUint16: OUT_OF_BOUNDS");\n  }\n\n  /**\n   * @dev Reads consecutive bool (8 bits) and uint8 values.\n   * @param data Byte array to be read.\n   * @param index Index in byte array of uint8 and uint8 values.\n   * @return a uint8 value of data at given index.\n   * @return b uint8 value of data at given index + 8.\n   * @return newIndex Updated index after reading the values.\n   */\n  function readUint8Uint8(\n    bytes memory data,\n    uint256 index\n  ) internal pure returns (\n    uint8 a,\n    uint8 b,\n    uint256 newIndex\n  ) {\n    assembly {\n      let word := mload(add(index, add(32, data)))\n      a := shr(248, word)\n      b := and(shr(240, word), 0xff)\n      newIndex := add(index, 2)\n    }\n    assert(newIndex > index);\n    require(newIndex <= data.length, "LibBytes#readUint8Uint8: OUT_OF_BOUNDS");\n  }\n\n  /**\n   * @dev Reads an address value from a position in a byte array.\n   * @param data Byte array to be read.\n   * @param index Index in byte array of address value.\n   * @return a address value of data at given index.\n   * @return newIndex Updated index after reading the value.\n   */\n  function readAddress(\n    bytes memory data,\n    uint256 index\n  ) internal pure returns (\n    address a,\n    uint256 newIndex\n  ) {\n    assembly {\n      let word := mload(add(index, add(32, data)))\n      a := and(shr(96, word), 0xffffffffffffffffffffffffffffffffffffffff)\n      newIndex := add(index, 20)\n    }\n    assert(newIndex > index);\n    require(newIndex <= data.length, "LibBytes#readAddress: OUT_OF_BOUNDS");\n  }\n\n  /**\n   * @dev Reads 66 bytes from a position in a byte array.\n   * @param data Byte array to be read.\n   * @param index Index in byte array of 66 bytes value.\n   * @return a 66 bytes bytes array value of data at given index.\n   * @return newIndex Updated index after reading the value.\n   */\n  function readBytes66(\n    bytes memory data,\n    uint256 index\n  ) internal pure returns (\n    bytes memory a,\n    uint256 newIndex\n  ) {\n    a = new bytes(66);\n    assembly {\n      let offset := add(32, add(data, index))\n      mstore(add(a, 32), mload(offset))\n      mstore(add(a, 64), mload(add(offset, 32)))\n      mstore(add(a, 66), mload(add(offset, 34)))\n      newIndex := add(index, 66)\n    }\n    assert(newIndex > index);\n    require(newIndex <= data.length, "LibBytes#readBytes66: OUT_OF_BOUNDS");\n  }\n\n  /**\n   * @dev Reads a bytes32 value from a position in a byte array.\n   * @param b Byte array containing a bytes32 value.\n   * @param index Index in byte array of bytes32 value.\n   * @return result bytes32 value from byte array.\n   */\n  function readBytes32(\n    bytes memory b,\n    uint256 index\n  )\n    internal\n    pure\n    returns (bytes32 result)\n  {\n    require(\n      b.length >= index + 32,\n      "LibBytes#readBytes32: GREATER_OR_EQUAL_TO_32_LENGTH_REQUIRED"\n    );\n\n    // Arrays are prefixed by a 256 bit length parameter\n    uint256 pos = index + 32;\n\n    // Read the bytes32 from array memory\n    assembly {\n      result := mload(add(b, pos))\n    }\n    return result;\n  }\n\n  /**\n   * @dev Reads an uint16 value from a position in a byte array.\n   * @param data Byte array to be read.\n   * @param index Index in byte array of uint16 value.\n   * @return a uint16 value of data at given index.\n   * @return newIndex Updated index after reading the value.\n   */\n  function readUint16(\n    bytes memory data,\n    uint256 index\n  ) internal pure returns (uint16 a, uint256 newIndex) {\n    assembly {\n      let word := mload(add(index, add(32, data)))\n      a := and(shr(240, word), 0xffff)\n      newIndex := add(index, 2)\n    }\n    assert(newIndex > index);\n    require(newIndex <= data.length, "LibBytes#readUint16: OUT_OF_BOUNDS");\n  }\n\n  /**\n   * @dev Reads bytes from a position in a byte array.\n   * @param data Byte array to be read.\n   * @param index Index in byte array of bytes value.\n   * @param size Number of bytes to read.\n   * @return a bytes bytes array value of data at given index.\n   * @return newIndex Updated index after reading the value.\n   */\n  function readBytes(\n    bytes memory data,\n    uint256 index,\n    uint256 size\n  ) internal pure returns (bytes memory a, uint256 newIndex) {\n    a = new bytes(size);\n\n    assembly {\n      let offset := add(32, add(data, index))\n\n      let i := 0 let n := 32\n      // Copy each word, except last one\n      for { } lt(n, size) { i := n n := add(n, 32) } {\n        mstore(add(a, n), mload(add(offset, i)))\n      }\n\n      // Load word after new array\n      let suffix := add(a, add(32, size))\n      let suffixWord := mload(suffix)\n\n      // Copy last word, overwrites after array \n      mstore(add(a, n), mload(add(offset, i)))\n\n      // Restore after array\n      mstore(suffix, suffixWord)\n\n      newIndex := add(index, size)\n    }\n\n    assert(newIndex >= index);\n    require(newIndex <= data.length, "LibBytes#readBytes: OUT_OF_BOUNDS");\n  }\n}\n'
      },
      'contracts/modules/commons/interfaces/IModuleAuth.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\n\nabstract contract IModuleAuth {\n  /**\n   * @notice Hashed _data to be signed\n   * @param _digest Pre-final digest\n   * @return hashed data for this wallet\n   */\n  function _subDigest(\n    bytes32 _digest\n  ) internal virtual view returns (bytes32);\n\n  /**\n   * @notice Verify if signer is default wallet owner\n   * @param _hash Hashed signed message\n   * @param _signature Encoded signature\n   * @return True is the signature is valid\n   */\n  function _signatureValidation(\n    bytes32 _hash,\n    bytes memory _signature\n  ) internal virtual view returns (bool);\n}\n'
      },
      'contracts/modules/commons/ModuleERC165.sol': {
        content:
          "// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\npragma experimental ABIEncoderV2;\n\n\nabstract contract ModuleERC165 {\n  /**\n   * @notice Query if a contract implements an interface\n   * @param _interfaceID The interface identifier, as specified in ERC-165\n   * @dev Adding new hooks will not lead to them being reported by this function\n   *      without upgrading the wallet. In addition, developpers must ensure that \n   *      all inherited contracts by the mainmodule don't conflict and are accounted\n   *      to be supported by the supportsInterface method.\n   * @return `true` if the contract implements `_interfaceID`\n   */\n  function supportsInterface(bytes4 _interfaceID) virtual public pure returns (bool) {\n    return _interfaceID == this.supportsInterface.selector;\n  }\n}\n"
      },
      'contracts/modules/commons/interfaces/IModuleHooks.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\n\ninterface IModuleHooks {\n  /**\n   * @notice Reads the implementation hook of a signature\n   * @param _signature Signature function\n   * @return The address of the implementation hook, address(0) if none\n  */\n  function readHook(bytes4 _signature) external view returns (address);\n\n  /**\n   * @notice Adds a new hook to handle a given function selector\n   * @param _signature Signature function linked to the hook\n   * @param _implementation Hook implementation contract\n   */\n  function addHook(bytes4 _signature, address _implementation) external;\n\n  /**\n   * @notice Removes a registered hook\n   * @param _signature Signature function linked to the hook\n   */\n  function removeHook(bytes4 _signature) external;\n}\n'
      },
      'contracts/modules/commons/ModuleSelfAuth.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\n\ncontract ModuleSelfAuth {\n  modifier onlySelf() {\n    require(msg.sender == address(this), "ModuleSelfAuth#onlySelf: NOT_AUTHORIZED");\n    _;\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleStorage.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\n\nlibrary ModuleStorage {\n  function writeBytes32(bytes32 _key, bytes32 _val) internal {\n    assembly { sstore(_key, _val) }\n  }\n\n  function readBytes32(bytes32 _key) internal view returns (bytes32 val) {\n    assembly { val := sload(_key) }\n  }\n\n  function writeBytes32Map(bytes32 _key, bytes32 _subKey, bytes32 _val) internal {\n    bytes32 key = keccak256(abi.encode(_key, _subKey));\n    assembly { sstore(key, _val) }\n  }\n\n  function readBytes32Map(bytes32 _key, bytes32 _subKey) internal view returns (bytes32 val) {\n    bytes32 key = keccak256(abi.encode(_key, _subKey));\n    assembly { val := sload(key) }\n  }\n}\n'
      },
      'contracts/interfaces/receivers/IERC223Receiver.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\n\ninterface IERC223Receiver {\n  function tokenFallback(address, uint256, bytes calldata) external;\n}\n'
      },
      'contracts/modules/commons/interfaces/IModuleCalls.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\npragma experimental ABIEncoderV2;\n\n\ninterface IModuleCalls {\n  // Events\n  event NonceChange(uint256 _space, uint256 _newNonce);\n  event TxFailed(bytes32 _tx, bytes _reason);\n  event TxExecuted(bytes32 _tx) anonymous;\n\n  // Transaction structure\n  struct Transaction {\n    bool delegateCall;   // Performs delegatecall\n    bool revertOnError;  // Reverts transaction bundle if tx fails\n    uint256 gasLimit;    // Maximum gas to be forwarded\n    address target;      // Address of the contract to call\n    uint256 value;       // Amount of ETH to pass with the call\n    bytes data;          // calldata to pass\n  }\n\n  /**\n   * @notice Returns the next nonce of the default nonce space\n   * @dev The default nonce space is 0x00\n   * @return The next nonce\n   */\n  function nonce() external view returns (uint256);\n\n  /**\n   * @notice Returns the next nonce of the given nonce space\n   * @param _space Nonce space, each space keeps an independent nonce count\n   * @return The next nonce\n   */\n  function readNonce(uint256 _space) external view returns (uint256);\n\n  /**\n   * @notice Allow wallet owner to execute an action\n   * @param _txs        Transactions to process\n   * @param _nonce      Signature nonce (may contain an encoded space)\n   * @param _signature  Encoded signature\n   */\n  function execute(\n    Transaction[] calldata _txs,\n    uint256 _nonce,\n    bytes calldata _signature\n  ) external;\n\n  /**\n   * @notice Allow wallet to execute an action\n   *   without signing the message\n   * @param _txs  Transactions to execute\n   */\n  function selfExecute(\n    Transaction[] calldata _txs\n  ) external;\n}\n'
      },
      'contracts/modules/commons/interfaces/IModuleUpdate.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\n\ninterface IModuleUpdate {\n  /**\n   * @notice Updates the implementation of the base wallet\n   * @param _implementation New main module implementation\n   * @dev WARNING Updating the implementation can brick the wallet\n   */\n  function updateImplementation(address _implementation) external;\n}\n'
      },
      'contracts/utils/LibAddress.sol': {
        content:
          "// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\n\nlibrary LibAddress {\n  /**\n   * @notice Will return true if provided address is a contract\n   * @param account Address to verify if contract or not\n   * @dev This contract will return false if called within the constructor of\n   *      a contract's deployment, as the code is not yet stored on-chain.\n   */\n  function isContract(address account) internal view returns (bool) {\n    uint256 csize;\n    // solhint-disable-next-line no-inline-assembly\n    assembly { csize := extcodesize(account) }\n    return csize != 0;\n  }\n}\n"
      },
      'contracts/modules/commons/interfaces/IModuleCreator.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\n\ninterface IModuleCreator {\n  /**\n   * @notice Creates a contract forwarding eth value\n   * @param _code Creation code of the contract\n   * @return addr The address of the created contract\n   */\n  function createContract(bytes calldata _code) external payable returns (address addr);\n}\n'
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
        details: {
          yul: true
        }
      },
      outputSelection: {
        '*': {
          '*': ['evm.bytecode', 'evm.deployedBytecode', 'abi']
        }
      },
      libraries: {}
    }
  }
}
