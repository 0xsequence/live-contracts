import { ContractFactory, type ethers } from 'ethers'
import type { VerificationRequest } from 'scripts/types'

// https://github.com/0xsequence/signals-implicit-mode/blob/f5484d80f38dfea5751c39f3a1fca9a475308a7d/src/registry/ImplicitProjectRegistry.sol

const abi = [
  {
    inputs: [],
    name: 'InvalidProjectOwner',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidProjectUrlIndex',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidRedirectUrl',
    type: 'error'
  },
  {
    inputs: [],
    name: 'NotProjectOwner',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ProjectAlreadyClaimed',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ProjectUrlAlreadyExists',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ProjectUrlNotFound',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'projectId',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'ProjectClaimed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'projectId',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'ProjectOwnerTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'projectId',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'urlHash',
        type: 'bytes32'
      }
    ],
    name: 'ProjectUrlAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'projectId',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'urlHash',
        type: 'bytes32'
      }
    ],
    name: 'ProjectUrlRemoved',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'projectId',
        type: 'bytes32'
      },
      {
        internalType: 'string',
        name: 'projectUrl',
        type: 'string'
      }
    ],
    name: 'addProjectUrl',
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
      },
      {
        internalType: 'string[]',
        name: 'projectUrls',
        type: 'string[]'
      }
    ],
    name: 'addProjectUrlBatch',
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
      },
      {
        internalType: 'bytes32',
        name: 'projectUrlHash',
        type: 'bytes32'
      }
    ],
    name: 'addProjectUrlHash',
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
      },
      {
        internalType: 'bytes32[]',
        name: 'projectUrlHashes',
        type: 'bytes32[]'
      }
    ],
    name: 'addProjectUrlHashBatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes12',
        name: 'projectIdUpper',
        type: 'bytes12'
      }
    ],
    name: 'claimProject',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'projectId',
        type: 'bytes32'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'isProjectUrl',
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
        internalType: 'bytes32',
        name: 'projectId',
        type: 'bytes32'
      }
    ],
    name: 'listProjectUrls',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: '',
        type: 'bytes32[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'projectOwner',
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
        name: '',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'projectUrlsList',
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
        name: 'projectId',
        type: 'bytes32'
      },
      {
        internalType: 'string',
        name: 'projectUrl',
        type: 'string'
      }
    ],
    name: 'removeProjectUrl',
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
      },
      {
        internalType: 'bytes32',
        name: 'projectUrlHash',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'urlIdx',
        type: 'uint256'
      }
    ],
    name: 'removeProjectUrlHash',
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
      },
      {
        internalType: 'bytes32[]',
        name: 'projectUrlHashes',
        type: 'bytes32[]'
      },
      {
        internalType: 'uint256[]',
        name: 'urlIdxs',
        type: 'uint256[]'
      }
    ],
    name: 'removeProjectUrlHashBatch',
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
      },
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferProject',
    outputs: [],
    stateMutability: 'nonpayable',
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
        internalType: 'bytes32',
        name: 'projectId',
        type: 'bytes32'
      }
    ],
    name: 'validateAttestation',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]

export class ImplicitProjectRegistry extends ContractFactory {
  constructor(signer?: ethers.Signer) {
    super(
      abi,
      '6080604052348015600e575f5ffd5b5061225c8061001c5f395ff3fe608060405234801561000f575f5ffd5b50600436106100e8575f3560e01c8063a25acb251161008a578063d9acbe6b11610064578063d9acbe6b14610240578063dac6c58714610270578063ebc27b821461028c578063f4364de6146102bc576100e8565b8063a25acb25146101c4578063d4c9c5c4146101f4578063d4df101814610210576100e8565b80633808a90b116100c65780633808a90b14610140578063520994f11461017057806356cd2b921461018c5780639630aff8146101a8576100e8565b8063065d6c69146100ec5780631b31f01b146101085780632f28c69d14610124575b5f5ffd5b610106600480360381019061010191906113ac565b6102ec565b005b610122600480360381019061011d9190611439565b6103c3565b005b61013e60048036038101906101399190611539565b610469565b005b61015a6004803603810190610155919061160f565b610515565b604051610167919061168a565b60405180910390f35b61018a600480360381019061018591906116a3565b610610565b005b6101a660048036038101906101a191906117bf565b6106b4565b005b6101c260048036038101906101bd9190611819565b610793565b005b6101de60048036038101906101d991906116a3565b610924565b6040516101eb9190611871565b60405180910390f35b61020e6004803603810190610209919061194a565b61094e565b005b61022a60048036038101906102259190611a27565b610b1b565b604051610237919061168a565b60405180910390f35b61025a60048036038101906102559190611a52565b610cde565b604051610267919061168a565b60405180910390f35b61028a60048036038101906102859190611539565b610d09565b005b6102a660048036038101906102a19190611a90565b610e51565b6040516102b39190611aca565b60405180910390f35b6102d660048036038101906102d19190611a90565b610e80565b6040516102e39190611b9a565b60405180910390f35b813373ffffffffffffffffffffffffffffffffffffffff165f5f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610381576040517f7c2411e900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f5b82518110156103bd576103b0848483815181106103a3576103a2611bba565b5b6020026020010151610ee7565b8080600101915050610383565b50505050565b823373ffffffffffffffffffffffffffffffffffffffff165f5f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610458576040517f7c2411e900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610463848484610fe9565b50505050565b813373ffffffffffffffffffffffffffffffffffffffff165f5f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146104fe576040517f7c2411e900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6105108361050b84611187565b610ee7565b505050565b5f5f61057f848060a0019061052a9190611bf3565b805f01906105389190611c1a565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f82011690508083019250505050505050611187565b905060015f8481526020019081526020015f205f8281526020019081526020015f205f9054906101000a900460ff16156105d7576105cf85856105c190611ef2565b6111b690919063ffffffff16565b915050610609565b6040517fd7abef4e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b9392505050565b813373ffffffffffffffffffffffffffffffffffffffff165f5f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146106a5576040517f7c2411e900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106af8383610ee7565b505050565b813373ffffffffffffffffffffffffffffffffffffffff165f5f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610749576040517f7c2411e900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f5b825181101561078d576107808461077b85848151811061076e5761076d611bba565b5b6020026020010151611187565b610ee7565b808060010191505061074b565b50505050565b813373ffffffffffffffffffffffffffffffffffffffff165f5f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610828576040517f7c2411e900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361088d576040517fff7d580d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b815f5f8581526020019081526020015f205f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff16837f7869f0fa3d7efaa83c69bf6de987567787178b8d7e41fea0cadfea68a2e27de560405160405180910390a3505050565b6001602052815f5260405f20602052805f5260405f205f915091509054906101000a900460ff1681565b823373ffffffffffffffffffffffffffffffffffffffff165f5f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146109e3576040517f7c2411e900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8151835114610a1e576040517f526c768700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f5b60018351610a2e9190611f31565b811015610abc5782600182610a439190611f64565b81518110610a5457610a53611bba565b5b6020026020010151838281518110610a6f57610a6e611bba565b5b60200260200101511015610aaf576040517f526c768700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8080600101915050610a20565b505f5b8351811015610b1457610b0785858381518110610adf57610ade611bba565b5b6020026020010151858481518110610afa57610af9611bba565b5b6020026020010151610fe9565b8080600101915050610abf565b5050505050565b5f5f3390505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610b85576040517fff7d580d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8281604051602001610b98929190611ffc565b604051602081830303815290604052610bb090612060565b91505f73ffffffffffffffffffffffffffffffffffffffff165f5f8481526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610c46576040517ffeabeb4b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805f5f8481526020019081526020015f205f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16827f0f01cd0734cc8ed416ac6ca25cb4fe02dbab63f1236af3858deb14a56663623860405160405180910390a350919050565b6002602052815f5260405f208181548110610cf7575f80fd5b905f5260205f20015f91509150505481565b813373ffffffffffffffffffffffffffffffffffffffff165f5f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610d9e576040517f7c2411e900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f610da883611187565b90505f5b60025f8681526020019081526020015f2080549050811015610e19578160025f8781526020019081526020015f208281548110610dec57610deb611bba565b5b905f5260205f20015403610e0c57610e05858383610fe9565b5050610e4c565b8080600101915050610dac565b506040517f4745a4ee00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b5f602052805f5260405f205f915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b606060025f8381526020019081526020015f20805480602002602001604051908101604052809291908181526020018280548015610edb57602002820191905f5260205f20905b815481526020019060010190808311610ec7575b50505050509050919050565b60015f8381526020019081526020015f205f8281526020019081526020015f205f9054906101000a900460ff1615610f4b576040517f2d86c03a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001805f8481526020019081526020015f205f8381526020019081526020015f205f6101000a81548160ff02191690831515021790555060025f8381526020019081526020015f2081908060018154018082558091505060019003905f5260205f20015f909190919091505580827fceac3080d7874c4bba80ceae14b6aa96e0df9d4f673d9e5a352d66444f50206760405160405180910390a35050565b60025f8481526020019081526020015f20805490508110158061103757508160025f8581526020019081526020015f20828154811061102b5761102a611bba565b5b905f5260205f20015414155b1561106e576040517f526c768700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60015f8581526020019081526020015f205f8481526020019081526020015f205f6101000a81548160ff02191690831515021790555060025f8481526020019081526020015f20600160025f8681526020019081526020015f20805490506110d79190611f31565b815481106110e8576110e7611bba565b5b905f5260205f20015460025f8581526020019081526020015f20828154811061111457611113611bba565b5b905f5260205f20018190555060025f8481526020019081526020015f20805480611141576111406120c6565b5b600190038181905f5260205f20015f9055905581837f13d94de535e503661de3c84adf637590f269f37c8d4ed5daabae98376a442a6a60405160405180910390a3505050565b5f816040516020016111999190612145565b604051602081830303815290604052805190602001209050919050565b5f6040516020016111c6906121a5565b6040516020818303038152906040528051906020012082846060015185604001516040516020016111fa94939291906121d9565b60405160208183030381529060405280519060200120905092915050565b5f604051905090565b5f5ffd5b5f5ffd5b5f819050919050565b61123b81611229565b8114611245575f5ffd5b50565b5f8135905061125681611232565b92915050565b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6112a682611260565b810181811067ffffffffffffffff821117156112c5576112c4611270565b5b80604052505050565b5f6112d7611218565b90506112e3828261129d565b919050565b5f67ffffffffffffffff82111561130257611301611270565b5b602082029050602081019050919050565b5f5ffd5b5f611329611324846112e8565b6112ce565b9050808382526020820190506020840283018581111561134c5761134b611313565b5b835b8181101561137557806113618882611248565b84526020840193505060208101905061134e565b5050509392505050565b5f82601f8301126113935761139261125c565b5b81356113a3848260208601611317565b91505092915050565b5f5f604083850312156113c2576113c1611221565b5b5f6113cf85828601611248565b925050602083013567ffffffffffffffff8111156113f0576113ef611225565b5b6113fc8582860161137f565b9150509250929050565b5f819050919050565b61141881611406565b8114611422575f5ffd5b50565b5f813590506114338161140f565b92915050565b5f5f5f606084860312156114505761144f611221565b5b5f61145d86828701611248565b935050602061146e86828701611248565b925050604061147f86828701611425565b9150509250925092565b5f5ffd5b5f67ffffffffffffffff8211156114a7576114a6611270565b5b6114b082611260565b9050602081019050919050565b828183375f83830152505050565b5f6114dd6114d88461148d565b6112ce565b9050828152602081018484840111156114f9576114f8611489565b5b6115048482856114bd565b509392505050565b5f82601f8301126115205761151f61125c565b5b81356115308482602086016114cb565b91505092915050565b5f5f6040838503121561154f5761154e611221565b5b5f61155c85828601611248565b925050602083013567ffffffffffffffff81111561157d5761157c611225565b5b6115898582860161150c565b9150509250929050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6115bc82611593565b9050919050565b6115cc816115b2565b81146115d6575f5ffd5b50565b5f813590506115e7816115c3565b92915050565b5f5ffd5b5f60c08284031215611606576116056115ed565b5b81905092915050565b5f5f5f6060848603121561162657611625611221565b5b5f611633868287016115d9565b935050602084013567ffffffffffffffff81111561165457611653611225565b5b611660868287016115f1565b925050604061167186828701611248565b9150509250925092565b61168481611229565b82525050565b5f60208201905061169d5f83018461167b565b92915050565b5f5f604083850312156116b9576116b8611221565b5b5f6116c685828601611248565b92505060206116d785828601611248565b9150509250929050565b5f67ffffffffffffffff8211156116fb576116fa611270565b5b602082029050602081019050919050565b5f61171e611719846116e1565b6112ce565b9050808382526020820190506020840283018581111561174157611740611313565b5b835b8181101561178857803567ffffffffffffffff8111156117665761176561125c565b5b808601611773898261150c565b85526020850194505050602081019050611743565b5050509392505050565b5f82601f8301126117a6576117a561125c565b5b81356117b684826020860161170c565b91505092915050565b5f5f604083850312156117d5576117d4611221565b5b5f6117e285828601611248565b925050602083013567ffffffffffffffff81111561180357611802611225565b5b61180f85828601611792565b9150509250929050565b5f5f6040838503121561182f5761182e611221565b5b5f61183c85828601611248565b925050602061184d858286016115d9565b9150509250929050565b5f8115159050919050565b61186b81611857565b82525050565b5f6020820190506118845f830184611862565b92915050565b5f67ffffffffffffffff8211156118a4576118a3611270565b5b602082029050602081019050919050565b5f6118c76118c28461188a565b6112ce565b905080838252602082019050602084028301858111156118ea576118e9611313565b5b835b8181101561191357806118ff8882611425565b8452602084019350506020810190506118ec565b5050509392505050565b5f82601f8301126119315761193061125c565b5b81356119418482602086016118b5565b91505092915050565b5f5f5f6060848603121561196157611960611221565b5b5f61196e86828701611248565b935050602084013567ffffffffffffffff81111561198f5761198e611225565b5b61199b8682870161137f565b925050604084013567ffffffffffffffff8111156119bc576119bb611225565b5b6119c88682870161191d565b9150509250925092565b5f7fffffffffffffffffffffffff000000000000000000000000000000000000000082169050919050565b611a06816119d2565b8114611a10575f5ffd5b50565b5f81359050611a21816119fd565b92915050565b5f60208284031215611a3c57611a3b611221565b5b5f611a4984828501611a13565b91505092915050565b5f5f60408385031215611a6857611a67611221565b5b5f611a7585828601611248565b9250506020611a8685828601611425565b9150509250929050565b5f60208284031215611aa557611aa4611221565b5b5f611ab284828501611248565b91505092915050565b611ac4816115b2565b82525050565b5f602082019050611add5f830184611abb565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b611b1581611229565b82525050565b5f611b268383611b0c565b60208301905092915050565b5f602082019050919050565b5f611b4882611ae3565b611b528185611aed565b9350611b5d83611afd565b805f5b83811015611b8d578151611b748882611b1b565b9750611b7f83611b32565b925050600181019050611b60565b5085935050505092915050565b5f6020820190508181035f830152611bb28184611b3e565b905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b5f5ffd5b5f5ffd5b5f5ffd5b5f82356001604003833603038112611c0e57611c0d611be7565b5b80830191505092915050565b5f5f83356001602003843603038112611c3657611c35611be7565b5b80840192508235915067ffffffffffffffff821115611c5857611c57611beb565b5b602083019250600182023603831315611c7457611c73611bef565b5b509250929050565b5f5ffd5b5f5ffd5b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611cb881611c84565b8114611cc2575f5ffd5b50565b5f81359050611cd381611caf565b92915050565b5f67ffffffffffffffff821115611cf357611cf2611270565b5b611cfc82611260565b9050602081019050919050565b5f611d1b611d1684611cd9565b6112ce565b905082815260208101848484011115611d3757611d36611489565b5b611d428482856114bd565b509392505050565b5f82601f830112611d5e57611d5d61125c565b5b8135611d6e848260208601611d09565b91505092915050565b5f67ffffffffffffffff82169050919050565b611d9381611d77565b8114611d9d575f5ffd5b50565b5f81359050611dae81611d8a565b92915050565b5f60408284031215611dc957611dc8611c7c565b5b611dd360406112ce565b90505f82013567ffffffffffffffff811115611df257611df1611c80565b5b611dfe8482850161150c565b5f830152506020611e1184828501611da0565b60208301525092915050565b5f60c08284031215611e3257611e31611c7c565b5b611e3c60c06112ce565b90505f611e4b848285016115d9565b5f830152506020611e5e84828501611cc5565b6020830152506040611e7284828501611248565b6040830152506060611e8684828501611248565b606083015250608082013567ffffffffffffffff811115611eaa57611ea9611c80565b5b611eb684828501611d4a565b60808301525060a082013567ffffffffffffffff811115611eda57611ed9611c80565b5b611ee684828501611db4565b60a08301525092915050565b5f611efd3683611e1d565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f611f3b82611406565b9150611f4683611406565b9250828203905081811115611f5e57611f5d611f04565b5b92915050565b5f611f6e82611406565b9150611f7983611406565b9250828201905080821115611f9157611f90611f04565b5b92915050565b5f819050919050565b611fb1611fac826119d2565b611f97565b82525050565b5f8160601b9050919050565b5f611fcd82611fb7565b9050919050565b5f611fde82611fc3565b9050919050565b611ff6611ff1826115b2565b611fd4565b82525050565b5f6120078285611fa0565b600c820191506120178284611fe5565b6014820191508190509392505050565b5f81519050919050565b5f819050602082019050919050565b5f61204b8251611229565b80915050919050565b5f82821b905092915050565b5f61206a82612027565b8261207484612031565b905061207f81612040565b925060208210156120bf576120ba7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83602003600802612054565b831692505b5050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603160045260245ffd5b5f81519050919050565b5f81905092915050565b8281835e5f83830152505050565b5f61211f826120f3565b61212981856120fd565b9350612139818560208601612107565b80840191505092915050565b5f6121508284612115565b915081905092915050565b7f616363657074496d706c696369745265717565737400000000000000000000005f82015250565b5f61218f6015836120fd565b915061219a8261215b565b601582019050919050565b5f6121af82612183565b9150819050919050565b5f819050919050565b6121d36121ce82611229565b6121b9565b82525050565b5f6121e482876121c2565b6020820191506121f48286611fe5565b60148201915061220482856121c2565b60208201915061221482846121c2565b6020820191508190509594505050505056fea26469706673582212201c1c5f937a09cefe946e373a867e5691109f49a41dec6c6dd2b14c92e28398bd64736f6c634300081c0033',
      signer
    )
  }
}

export const IMPLICITPROJECTREGISTRY_VERIFICATION: Omit<VerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'src/registry/ImplicitProjectRegistry.sol:ImplicitProjectRegistry',
  version: 'v0.8.28+commit.7893614a',
  licenceType: 'Apache-2.0',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'src/registry/ImplicitProjectRegistry.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.13;\n\nimport { IImplicitProjectRegistry } from "./IImplicitProjectRegistry.sol";\nimport { IImplicitProjectValidation } from "./IImplicitProjectValidation.sol";\n\nimport { Attestation, LibAttestation } from "sequence-v3/src/extensions/sessions/implicit/Attestation.sol";\n\n/// @title ImplicitProjectRegistry\n/// @author Michael Standen\n/// @notice Registry of projects supporting implicit sessions\ncontract ImplicitProjectRegistry is IImplicitProjectRegistry {\n\n  using LibAttestation for Attestation;\n\n  /// @notice Project owner\n  mapping(bytes32 => address) public projectOwner;\n\n  /// @notice Project URLs\n  mapping(bytes32 => mapping(bytes32 => bool)) public isProjectUrl;\n  mapping(bytes32 => bytes32[]) public projectUrlsList;\n\n  modifier onlyProjectOwner(\n    bytes32 projectId\n  ) {\n    if (projectOwner[projectId] != msg.sender) {\n      revert IImplicitProjectRegistry.NotProjectOwner();\n    }\n    _;\n  }\n\n  /// @inheritdoc IImplicitProjectRegistry\n  function claimProject(\n    bytes12 projectIdUpper\n  ) public returns (bytes32 projectId) {\n    address owner = msg.sender;\n    if (owner == address(0)) {\n      revert IImplicitProjectRegistry.InvalidProjectOwner();\n    }\n    projectId = bytes32(abi.encodePacked(projectIdUpper, owner));\n    if (projectOwner[projectId] != address(0)) {\n      revert IImplicitProjectRegistry.ProjectAlreadyClaimed();\n    }\n    projectOwner[projectId] = owner;\n    emit IImplicitProjectRegistry.ProjectClaimed(projectId, owner);\n\n    return projectId;\n  }\n\n  /// @inheritdoc IImplicitProjectRegistry\n  function transferProject(bytes32 projectId, address newOwner) public onlyProjectOwner(projectId) {\n    if (newOwner == address(0)) {\n      revert IImplicitProjectRegistry.InvalidProjectOwner();\n    }\n    projectOwner[projectId] = newOwner;\n    emit IImplicitProjectRegistry.ProjectOwnerTransferred(projectId, newOwner);\n  }\n\n  function _addProjectUrlHash(bytes32 projectId, bytes32 projectUrlHash) internal {\n    if (isProjectUrl[projectId][projectUrlHash]) {\n      revert IImplicitProjectRegistry.ProjectUrlAlreadyExists();\n    }\n    isProjectUrl[projectId][projectUrlHash] = true;\n    projectUrlsList[projectId].push(projectUrlHash);\n    emit IImplicitProjectRegistry.ProjectUrlAdded(projectId, projectUrlHash);\n  }\n\n  /// @notice Add a project URL hash\n  /// @param projectId The project id\n  /// @param projectUrlHash The project URL hash\n  function addProjectUrlHash(bytes32 projectId, bytes32 projectUrlHash) external onlyProjectOwner(projectId) {\n    _addProjectUrlHash(projectId, projectUrlHash);\n  }\n\n  /// @notice Add a list of project URL hashes\n  /// @param projectId The project id\n  /// @param projectUrlHashes The project URL hashes\n  function addProjectUrlHashBatch(\n    bytes32 projectId,\n    bytes32[] memory projectUrlHashes\n  ) external onlyProjectOwner(projectId) {\n    for (uint256 i; i < projectUrlHashes.length; i++) {\n      _addProjectUrlHash(projectId, projectUrlHashes[i]);\n    }\n  }\n\n  /// @inheritdoc IImplicitProjectRegistry\n  function addProjectUrl(bytes32 projectId, string memory projectUrl) public onlyProjectOwner(projectId) {\n    _addProjectUrlHash(projectId, _hashUrl(projectUrl));\n  }\n\n  /// @notice Add a list of project URLs\n  /// @param projectId The project id\n  /// @param projectUrls The project URLs\n  function addProjectUrlBatch(bytes32 projectId, string[] memory projectUrls) external onlyProjectOwner(projectId) {\n    for (uint256 i; i < projectUrls.length; i++) {\n      _addProjectUrlHash(projectId, _hashUrl(projectUrls[i]));\n    }\n  }\n\n  function _removeProjectUrlHash(bytes32 projectId, bytes32 projectUrlHash, uint256 urlIdx) internal {\n    if (urlIdx >= projectUrlsList[projectId].length || projectUrlsList[projectId][urlIdx] != projectUrlHash) {\n      revert IImplicitProjectRegistry.InvalidProjectUrlIndex();\n    }\n    isProjectUrl[projectId][projectUrlHash] = false;\n    projectUrlsList[projectId][urlIdx] = projectUrlsList[projectId][projectUrlsList[projectId].length - 1];\n    projectUrlsList[projectId].pop();\n    emit IImplicitProjectRegistry.ProjectUrlRemoved(projectId, projectUrlHash);\n  }\n\n  /// @notice Remove a project URL hash\n  /// @param projectId The project id\n  /// @param projectUrlHash The project URL hash\n  /// @param urlIdx The index of the project URL hash to remove\n  function removeProjectUrlHash(\n    bytes32 projectId,\n    bytes32 projectUrlHash,\n    uint256 urlIdx\n  ) external onlyProjectOwner(projectId) {\n    _removeProjectUrlHash(projectId, projectUrlHash, urlIdx);\n  }\n\n  /// @notice Remove a list of project URL hashes\n  /// @param projectId The project id\n  /// @param projectUrlHashes The project URL hashes\n  /// @param urlIdxs The indexes of the project URL hashes to remove\n  /// @dev The urlIdxs must be sorted in descending order\n  function removeProjectUrlHashBatch(\n    bytes32 projectId,\n    bytes32[] memory projectUrlHashes,\n    uint256[] memory urlIdxs\n  ) external onlyProjectOwner(projectId) {\n    if (projectUrlHashes.length != urlIdxs.length) {\n      revert IImplicitProjectRegistry.InvalidProjectUrlIndex();\n    }\n    // Ensure the urlIdxs are sorted descending to prevent issues with reordering during removals\n    for (uint256 i; i < urlIdxs.length - 1; i++) {\n      if (urlIdxs[i] < urlIdxs[i + 1]) {\n        revert IImplicitProjectRegistry.InvalidProjectUrlIndex();\n      }\n    }\n    for (uint256 i; i < projectUrlHashes.length; i++) {\n      _removeProjectUrlHash(projectId, projectUrlHashes[i], urlIdxs[i]);\n    }\n  }\n\n  /// @inheritdoc IImplicitProjectRegistry\n  /// @dev This function is not optimized. Prefer to use removeProjectUrlHash.\n  function removeProjectUrl(bytes32 projectId, string memory projectUrl) external onlyProjectOwner(projectId) {\n    // Find the index of the project URL hash\n    bytes32 projectUrlHash = _hashUrl(projectUrl);\n    for (uint256 i; i < projectUrlsList[projectId].length; i++) {\n      if (projectUrlsList[projectId][i] == projectUrlHash) {\n        _removeProjectUrlHash(projectId, projectUrlHash, i);\n        return;\n      }\n    }\n    revert IImplicitProjectRegistry.ProjectUrlNotFound();\n  }\n\n  /// @inheritdoc IImplicitProjectRegistry\n  function listProjectUrls(\n    bytes32 projectId\n  ) external view returns (bytes32[] memory) {\n    return projectUrlsList[projectId];\n  }\n\n  /// @inheritdoc IImplicitProjectValidation\n  function validateAttestation(\n    address wallet,\n    Attestation calldata attestation,\n    bytes32 projectId\n  ) external view returns (bytes32) {\n    bytes32 hashedUrl = _hashUrl(attestation.authData.redirectUrl);\n\n    if (isProjectUrl[projectId][hashedUrl]) {\n      return attestation.generateImplicitRequestMagic(wallet);\n    }\n\n    revert IImplicitProjectValidation.InvalidRedirectUrl();\n  }\n\n  function _hashUrl(\n    string memory url\n  ) internal pure returns (bytes32) {\n    return keccak256(abi.encodePacked(url));\n  }\n\n}\n'
      },
      'src/registry/IImplicitProjectRegistry.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.13;\n\nimport { IImplicitProjectValidation } from "./IImplicitProjectValidation.sol";\n\n/// @title IImplicitProjectRegistry\n/// @author Michael Standen\n/// @notice Interface for the registry of projects supporting implicit sessions\ninterface IImplicitProjectRegistry is IImplicitProjectValidation {\n\n  /// @notice Claim a project\n  /// @param projectIdUpper The project id upper\n  /// @return projectId The concatenation of the `projectIdUpper` and the `msg.sender`\n  function claimProject(\n    bytes12 projectIdUpper\n  ) external returns (bytes32 projectId);\n\n  /// @notice Transfer a project\n  /// @param projectId The project id\n  /// @param newOwner The new owner\n  function transferProject(bytes32 projectId, address newOwner) external;\n\n  /// @notice Add a project URL\n  /// @param projectId The project id\n  /// @param projectUrl The project URL\n  function addProjectUrl(bytes32 projectId, string memory projectUrl) external;\n\n  /// @notice Remove a project URL\n  /// @param projectId The project id\n  /// @param projectUrl The project URL\n  function removeProjectUrl(bytes32 projectId, string memory projectUrl) external;\n\n  /// @notice List project URLs\n  /// @param projectId The project id\n  /// @return projectUrls The project URLs\n  function listProjectUrls(\n    bytes32 projectId\n  ) external view returns (bytes32[] memory);\n\n  /// @notice Not project owner error\n  error NotProjectOwner();\n\n  /// @notice Project already claimed error\n  error ProjectAlreadyClaimed();\n\n  /// @notice Invalid project owner error\n  error InvalidProjectOwner();\n\n  /// @notice Project URL not found error\n  error ProjectUrlNotFound();\n\n  /// @notice Project URL already exists error\n  error ProjectUrlAlreadyExists();\n\n  /// @notice Invalid project URL index error\n  error InvalidProjectUrlIndex();\n\n  /// @notice Emitted when a project is claimed\n  event ProjectClaimed(bytes32 indexed projectId, address indexed owner);\n\n  /// @notice Emitted when a project owner is transferred\n  event ProjectOwnerTransferred(bytes32 indexed projectId, address indexed newOwner);\n\n  /// @notice Emitted when a project URL is added\n  event ProjectUrlAdded(bytes32 indexed projectId, bytes32 indexed urlHash);\n\n  /// @notice Emitted when a project URL is removed\n  event ProjectUrlRemoved(bytes32 indexed projectId, bytes32 indexed urlHash);\n\n}\n'
      },
      'src/registry/IImplicitProjectValidation.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.13;\n\nimport { Attestation } from "sequence-v3/src/extensions/sessions/implicit/Attestation.sol";\n\n/// @title IImplicitProjectValidation\n/// @author Michael Standen\n/// @notice Interface for contracts supporting validation of implicit sessions for projects\ninterface IImplicitProjectValidation {\n\n  /// @notice Invalid redirect url error\n  error InvalidRedirectUrl();\n\n  /// @notice Check if a project has a code\n  /// @param wallet The wallet address\n  /// @param attestation The attestation\n  /// @param projectId The project id\n  /// @return magic The attestation magic bytes for the wallet address\n  function validateAttestation(\n    address wallet,\n    Attestation calldata attestation,\n    bytes32 projectId\n  ) external view returns (bytes32);\n\n}\n'
      },
      'lib/sequence-v3/src/extensions/sessions/implicit/Attestation.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.27;\n\nimport { LibBytes } from "../../../utils/LibBytes.sol";\nimport { ACCEPT_IMPLICIT_REQUEST_MAGIC_PREFIX } from "./ISignalsImplicitMode.sol";\n\nusing LibBytes for bytes;\n\n/// @notice Attestation for a specific session\n/// @param approvedSigner Address of the approved signer\n/// @param identityType Identity type\n/// @param issuerHash Hash of the issuer\n/// @param audienceHash Hash of the audience\n/// @param applicationData Unspecified application data\n/// @param authData Auth data\nstruct Attestation {\n  address approvedSigner;\n  bytes4 identityType;\n  bytes32 issuerHash;\n  bytes32 audienceHash;\n  bytes applicationData;\n  AuthData authData;\n}\n\n/// @notice Auth data for an attestation\n/// @param redirectUrl Authorization redirect URL\n/// @param issuedAt Timestamp of the attestation issuance\nstruct AuthData {\n  string redirectUrl;\n  uint64 issuedAt;\n}\n\n/// @title LibAttestation\n/// @author Michael Standen\n/// @notice Library for attestation management\nlibrary LibAttestation {\n\n  /// @notice Hashes an attestation\n  function toHash(\n    Attestation memory attestation\n  ) internal pure returns (bytes32) {\n    return keccak256(toPacked(attestation));\n  }\n\n  /// @notice Decodes an attestation from a packed bytes array\n  /// @param encoded The packed bytes array\n  /// @param pointer The pointer to the start of the attestation\n  /// @return attestation The decoded attestation\n  /// @return newPointer The new pointer to the end of the attestation\n  function fromPacked(\n    bytes calldata encoded,\n    uint256 pointer\n  ) internal pure returns (Attestation memory attestation, uint256 newPointer) {\n    newPointer = pointer;\n    (attestation.approvedSigner, newPointer) = encoded.readAddress(newPointer);\n    (attestation.identityType, newPointer) = encoded.readBytes4(newPointer);\n    (attestation.issuerHash, newPointer) = encoded.readBytes32(newPointer);\n    (attestation.audienceHash, newPointer) = encoded.readBytes32(newPointer);\n    // Application data (arbitrary bytes)\n    uint256 dataSize;\n    (dataSize, newPointer) = encoded.readUint24(newPointer);\n    attestation.applicationData = encoded[newPointer:newPointer + dataSize];\n    newPointer += dataSize;\n    // Auth data\n    (attestation.authData, newPointer) = fromPackedAuthData(encoded, newPointer);\n    return (attestation, newPointer);\n  }\n\n  /// @notice Decodes the auth data from a packed bytes\n  /// @param encoded The packed bytes containing the auth data\n  /// @param pointer The pointer to the start of the auth data within the encoded data\n  /// @return authData The decoded auth data\n  /// @return newPointer The pointer to the end of the auth data within the encoded data\n  function fromPackedAuthData(\n    bytes calldata encoded,\n    uint256 pointer\n  ) internal pure returns (AuthData memory authData, uint256 newPointer) {\n    uint24 redirectUrlLength;\n    (redirectUrlLength, pointer) = encoded.readUint24(pointer);\n    authData.redirectUrl = string(encoded[pointer:pointer + redirectUrlLength]);\n    pointer += redirectUrlLength;\n    (authData.issuedAt, pointer) = encoded.readUint64(pointer);\n    return (authData, pointer);\n  }\n\n  /// @notice Encodes an attestation into a packed bytes array\n  /// @param attestation The attestation to encode\n  /// @return encoded The packed bytes array\n  function toPacked(\n    Attestation memory attestation\n  ) internal pure returns (bytes memory encoded) {\n    return abi.encodePacked(\n      attestation.approvedSigner,\n      attestation.identityType,\n      attestation.issuerHash,\n      attestation.audienceHash,\n      uint24(attestation.applicationData.length),\n      attestation.applicationData,\n      toPackAuthData(attestation.authData)\n    );\n  }\n\n  /// @notice Encodes the auth data into a packed bytes array\n  /// @param authData The auth data to encode\n  /// @return encoded The packed bytes array\n  function toPackAuthData(\n    AuthData memory authData\n  ) internal pure returns (bytes memory encoded) {\n    return abi.encodePacked(uint24(bytes(authData.redirectUrl).length), bytes(authData.redirectUrl), authData.issuedAt);\n  }\n\n  /// @notice Generates the implicit request magic return value\n  /// @param attestation The attestation\n  /// @param wallet The wallet\n  /// @return magic The expected implicit request magic\n  function generateImplicitRequestMagic(Attestation memory attestation, address wallet) internal pure returns (bytes32) {\n    return keccak256(\n      abi.encodePacked(ACCEPT_IMPLICIT_REQUEST_MAGIC_PREFIX, wallet, attestation.audienceHash, attestation.issuerHash)\n    );\n  }\n\n}\n'
      },
      'lib/sequence-v3/src/utils/LibBytes.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.18;\n\n/// @title Library for reading data from bytes arrays\n/// @author Agustin Aguilar (aa@horizon.io), Michael Standen (mstan@horizon.io)\n/// @notice This library contains functions for reading data from bytes arrays.\n/// @dev These functions do not check if the input index is within the bounds of the data array.\n/// @dev Reading out of bounds may return dirty values.\nlibrary LibBytes {\n\n  function readFirstUint8(\n    bytes calldata _data\n  ) internal pure returns (uint8 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(_data.offset)\n      a := shr(248, word)\n      newPointer := 1\n    }\n  }\n\n  function readUint8(bytes calldata _data, uint256 _index) internal pure returns (uint8 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := shr(248, word)\n      newPointer := add(_index, 1)\n    }\n  }\n\n  function readUint16(bytes calldata _data, uint256 _index) internal pure returns (uint16 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := shr(240, word)\n      newPointer := add(_index, 2)\n    }\n  }\n\n  function readUint24(bytes calldata _data, uint256 _index) internal pure returns (uint24 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := shr(232, word)\n      newPointer := add(_index, 3)\n    }\n  }\n\n  function readUint64(bytes calldata _data, uint256 _index) internal pure returns (uint64 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := shr(192, word)\n      newPointer := add(_index, 8)\n    }\n  }\n\n  function readUint160(bytes calldata _data, uint256 _index) internal pure returns (uint160 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := shr(96, word)\n      newPointer := add(_index, 20)\n    }\n  }\n\n  function readUint256(bytes calldata _data, uint256 _index) internal pure returns (uint256 a, uint256 newPointer) {\n    assembly {\n      a := calldataload(add(_index, _data.offset))\n      newPointer := add(_index, 32)\n    }\n  }\n\n  function readUintX(\n    bytes calldata _data,\n    uint256 _index,\n    uint256 _length\n  ) internal pure returns (uint256 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      let shift := sub(256, mul(_length, 8))\n      a := and(shr(shift, word), sub(shl(mul(8, _length), 1), 1))\n      newPointer := add(_index, _length)\n    }\n  }\n\n  function readBytes4(bytes calldata _data, uint256 _pointer) internal pure returns (bytes4 a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_pointer, _data.offset))\n      a := and(word, 0xffffffff00000000000000000000000000000000000000000000000000000000)\n      newPointer := add(_pointer, 4)\n    }\n  }\n\n  function readBytes32(bytes calldata _data, uint256 _pointer) internal pure returns (bytes32 a, uint256 newPointer) {\n    assembly {\n      a := calldataload(add(_pointer, _data.offset))\n      newPointer := add(_pointer, 32)\n    }\n  }\n\n  function readAddress(bytes calldata _data, uint256 _index) internal pure returns (address a, uint256 newPointer) {\n    assembly {\n      let word := calldataload(add(_index, _data.offset))\n      a := and(shr(96, word), 0xffffffffffffffffffffffffffffffffffffffff)\n      newPointer := add(_index, 20)\n    }\n  }\n\n  /// @dev ERC-2098 Compact Signature\n  function readRSVCompact(\n    bytes calldata _data,\n    uint256 _index\n  ) internal pure returns (bytes32 r, bytes32 s, uint8 v, uint256 newPointer) {\n    uint256 yParityAndS;\n    assembly {\n      r := calldataload(add(_index, _data.offset))\n      yParityAndS := calldataload(add(_index, add(_data.offset, 32)))\n      newPointer := add(_index, 64)\n    }\n    uint256 yParity = uint256(yParityAndS >> 255);\n    s = bytes32(uint256(yParityAndS) & ((1 << 255) - 1));\n    v = uint8(yParity) + 27;\n  }\n\n}\n'
      },
      'lib/sequence-v3/src/extensions/sessions/implicit/ISignalsImplicitMode.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.27;\n\nimport { Payload } from "../../../modules/Payload.sol";\nimport { Attestation } from "./Attestation.sol";\n\n/// @dev Magic prefix for the implicit request\nbytes32 constant ACCEPT_IMPLICIT_REQUEST_MAGIC_PREFIX = keccak256(abi.encodePacked("acceptImplicitRequest"));\n\n/// @title ISignalsImplicitMode\n/// @author Agustin Aguilar, Michael Standen\n/// @notice Interface for the contracts that support implicit mode validation\ninterface ISignalsImplicitMode {\n\n  /// @notice Determines if an implicit request is valid\n  /// @param wallet The wallet\'s address\n  /// @param attestation The attestation data\n  /// @param call The call to validate\n  /// @return magic The hash of the implicit request if valid\n  function acceptImplicitRequest(\n    address wallet,\n    Attestation calldata attestation,\n    Payload.Call calldata call\n  ) external view returns (bytes32 magic);\n\n}\n'
      },
      'lib/sequence-v3/src/modules/Payload.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity ^0.8.27;\n\nimport { LibBytes } from "../utils/LibBytes.sol";\n\nusing LibBytes for bytes;\n\n/// @title Payload\n/// @author Agustin Aguilar, Michael Standen, William Hua\n/// @notice Library for encoding and decoding payloads\nlibrary Payload {\n\n  /// @notice Error thrown when the kind is invalid\n  error InvalidKind(uint8 kind);\n\n  /// @dev keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")\n  bytes32 private constant EIP712_DOMAIN_TYPEHASH = 0x8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f;\n\n  /// @dev keccak256("Sequence Wallet")\n  bytes32 private constant EIP712_DOMAIN_NAME_SEQUENCE =\n    0x4aa45ca7ad825ceb1bf35643f0a58c295239df563b1b565c2485f96477c56318;\n\n  /// @dev keccak256("3")\n  bytes32 private constant EIP712_DOMAIN_VERSION_SEQUENCE =\n    0x2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de;\n\n  function domainSeparator(bool _noChainId, address _wallet) internal view returns (bytes32 _domainSeparator) {\n    return keccak256(\n      abi.encode(\n        EIP712_DOMAIN_TYPEHASH,\n        EIP712_DOMAIN_NAME_SEQUENCE,\n        EIP712_DOMAIN_VERSION_SEQUENCE,\n        _noChainId ? uint256(0) : uint256(block.chainid),\n        _wallet\n      )\n    );\n  }\n\n  /// @dev keccak256("Call(address to,uint256 value,bytes data,uint256 gasLimit,bool delegateCall,bool onlyFallback,uint256 behaviorOnError)")\n  bytes32 private constant CALL_TYPEHASH = 0x0603985259a953da1f65a522f589c17bd1d0117ec1d3abb7c0788aef251ef437;\n\n  /// @dev keccak256("Calls(Call[] calls,uint256 space,uint256 nonce,address[] wallets)Call(address to,uint256 value,bytes data,uint256 gasLimit,bool delegateCall,bool onlyFallback,uint256 behaviorOnError)")\n  bytes32 private constant CALLS_TYPEHASH = 0x11e1e4079a79a66e4ade50033cfe2678cdd5341d2dfe5ef9513edb1a0be147a2;\n\n  /// @dev keccak256("Message(bytes message,address[] wallets)")\n  bytes32 private constant MESSAGE_TYPEHASH = 0xe19a3b94fc3c7ece3f890d98a99bc422615537a08dea0603fa8425867d87d466;\n\n  /// @dev keccak256("ConfigUpdate(bytes32 imageHash,address[] wallets)")\n  bytes32 private constant CONFIG_UPDATE_TYPEHASH = 0x11fdeb7e8373a1aa96bfac8d0ea91526b2c5d15e5cee20e0543e780258f3e8e4;\n\n  /// @notice Kind of transaction\n  uint8 public constant KIND_TRANSACTIONS = 0x00;\n  /// @notice Kind of digest\n  uint8 public constant KIND_MESSAGE = 0x01;\n  /// @notice Kind of config update\n  uint8 public constant KIND_CONFIG_UPDATE = 0x02;\n  /// @notice Kind of message\n  uint8 public constant KIND_DIGEST = 0x03;\n\n  /// @notice Behavior on error: ignore error\n  uint8 public constant BEHAVIOR_IGNORE_ERROR = 0x00;\n  /// @notice Behavior on error: revert on error\n  uint8 public constant BEHAVIOR_REVERT_ON_ERROR = 0x01;\n  /// @notice Behavior on error: abort on error\n  uint8 public constant BEHAVIOR_ABORT_ON_ERROR = 0x02;\n\n  /// @notice Payload call information\n  /// @param to Address of the target contract\n  /// @param value Value to send with the call\n  /// @param data Data to send with the call\n  /// @param gasLimit Gas limit for the call\n  /// @param delegateCall If the call is a delegate call\n  /// @param onlyFallback If the call should only be executed in an error scenario\n  /// @param behaviorOnError Behavior on error\n  struct Call {\n    address to;\n    uint256 value;\n    bytes data;\n    uint256 gasLimit;\n    bool delegateCall;\n    bool onlyFallback;\n    uint256 behaviorOnError;\n  }\n\n  /// @notice Decoded payload\n  /// @param kind Kind of payload\n  /// @param noChainId If the chain ID should be omitted\n  /// @param calls Array of calls (transaction kind)\n  /// @param space Nonce space for the calls (transaction kind)\n  /// @param nonce Nonce value for the calls (transaction kind)\n  /// @param message Message to validate (message kind)\n  /// @param imageHash Image hash to update to (config update kind)\n  /// @param digest Digest to validate (digest kind)\n  /// @param parentWallets Parent wallets\n  struct Decoded {\n    uint8 kind;\n    bool noChainId;\n    // Transaction kind\n    Call[] calls;\n    uint256 space;\n    uint256 nonce;\n    // Message kind\n    // TODO: Maybe native 721 ?\n    bytes message;\n    // Config update kind\n    bytes32 imageHash;\n    // Digest kind for 1271\n    bytes32 digest;\n    // Parent wallets\n    address[] parentWallets;\n  }\n\n  function fromMessage(\n    bytes memory message\n  ) internal pure returns (Decoded memory _decoded) {\n    _decoded.kind = KIND_MESSAGE;\n    _decoded.message = message;\n  }\n\n  function fromConfigUpdate(\n    bytes32 imageHash\n  ) internal pure returns (Decoded memory _decoded) {\n    _decoded.kind = KIND_CONFIG_UPDATE;\n    _decoded.imageHash = imageHash;\n  }\n\n  function fromDigest(\n    bytes32 digest\n  ) internal pure returns (Decoded memory _decoded) {\n    _decoded.kind = KIND_DIGEST;\n    _decoded.digest = digest;\n  }\n\n  function fromPackedCalls(\n    bytes calldata packed\n  ) internal view returns (Decoded memory _decoded) {\n    _decoded.kind = KIND_TRANSACTIONS;\n\n    // Read the global flag\n    (uint256 globalFlag, uint256 pointer) = packed.readFirstUint8();\n\n    // First bit determines if space is zero or not\n    if (globalFlag & 0x01 == 0x01) {\n      _decoded.space = 0;\n    } else {\n      (_decoded.space, pointer) = packed.readUint160(pointer);\n    }\n\n    // Next 3 bits determine the size of the nonce\n    uint256 nonceSize = (globalFlag >> 1) & 0x07;\n\n    if (nonceSize > 0) {\n      // Read the nonce\n      (_decoded.nonce, pointer) = packed.readUintX(pointer, nonceSize);\n    }\n\n    uint256 numCalls;\n\n    // Bit 5 determines if the batch contains a single call\n    if (globalFlag & 0x10 == 0x10) {\n      numCalls = 1;\n    } else {\n      // Bit 6 determines if the number of calls uses 1 byte or 2 bytes\n      if (globalFlag & 0x20 == 0x20) {\n        (numCalls, pointer) = packed.readUint16(pointer);\n      } else {\n        (numCalls, pointer) = packed.readUint8(pointer);\n      }\n    }\n\n    // Read the calls\n    _decoded.calls = new Call[](numCalls);\n\n    for (uint256 i = 0; i < numCalls; i++) {\n      uint8 flags;\n      (flags, pointer) = packed.readUint8(pointer);\n\n      // First bit determines if this is a call to self\n      // or a call to another address\n      if (flags & 0x01 == 0x01) {\n        // Call to self\n        _decoded.calls[i].to = address(this);\n      } else {\n        // Call to another address\n        (_decoded.calls[i].to, pointer) = packed.readAddress(pointer);\n      }\n\n      // Second bit determines if the call has value or not\n      if (flags & 0x02 == 0x02) {\n        (_decoded.calls[i].value, pointer) = packed.readUint256(pointer);\n      }\n\n      // Third bit determines if the call has data or not\n      if (flags & 0x04 == 0x04) {\n        // 3 bytes determine the size of the calldata\n        uint256 calldataSize;\n        (calldataSize, pointer) = packed.readUint24(pointer);\n        _decoded.calls[i].data = packed[pointer:pointer + calldataSize];\n        pointer += calldataSize;\n      }\n\n      // Fourth bit determines if the call has a gas limit or not\n      if (flags & 0x08 == 0x08) {\n        (_decoded.calls[i].gasLimit, pointer) = packed.readUint256(pointer);\n      }\n\n      // Fifth bit determines if the call is a delegate call or not\n      _decoded.calls[i].delegateCall = (flags & 0x10 == 0x10);\n\n      // Sixth bit determines if the call is fallback only\n      _decoded.calls[i].onlyFallback = (flags & 0x20 == 0x20);\n\n      // Last 2 bits are directly mapped to the behavior on error\n      _decoded.calls[i].behaviorOnError = (flags & 0xC0) >> 6;\n    }\n  }\n\n  function hashCall(\n    Call memory c\n  ) internal pure returns (bytes32) {\n    return keccak256(\n      abi.encode(\n        CALL_TYPEHASH, c.to, c.value, keccak256(c.data), c.gasLimit, c.delegateCall, c.onlyFallback, c.behaviorOnError\n      )\n    );\n  }\n\n  function hashCalls(\n    Call[] memory calls\n  ) internal pure returns (bytes32) {\n    // In EIP712, an array is often hashed as the keccak256 of the concatenated\n    // hashes of each item. So we hash each Call, pack them, and hash again.\n    bytes32[] memory callHashes = new bytes32[](calls.length);\n    for (uint256 i = 0; i < calls.length; i++) {\n      callHashes[i] = hashCall(calls[i]);\n    }\n    return keccak256(abi.encodePacked(callHashes));\n  }\n\n  function toEIP712(\n    Decoded memory _decoded\n  ) internal pure returns (bytes32) {\n    bytes32 walletsHash = keccak256(abi.encodePacked(_decoded.parentWallets));\n\n    if (_decoded.kind == KIND_TRANSACTIONS) {\n      bytes32 callsHash = hashCalls(_decoded.calls);\n      // The top-level struct for Calls might be something like:\n      // Calls(bytes32 callsHash,uint256 space,uint256 nonce,bytes32 walletsHash)\n      return keccak256(abi.encode(CALLS_TYPEHASH, callsHash, _decoded.space, _decoded.nonce, walletsHash));\n    } else if (_decoded.kind == KIND_MESSAGE) {\n      // If you define your top-level as: Message(bytes32 messageHash,bytes32 walletsHash)\n      return keccak256(abi.encode(MESSAGE_TYPEHASH, keccak256(_decoded.message), walletsHash));\n    } else if (_decoded.kind == KIND_CONFIG_UPDATE) {\n      // Top-level: ConfigUpdate(bytes32 imageHash,bytes32 walletsHash)\n      return keccak256(abi.encode(CONFIG_UPDATE_TYPEHASH, _decoded.imageHash, walletsHash));\n    } else if (_decoded.kind == KIND_DIGEST) {\n      // Top-level: Use MESSAGE_TYPEHASH but assume the digest is already the hashed message\n      return keccak256(abi.encode(MESSAGE_TYPEHASH, _decoded.digest, walletsHash));\n    } else {\n      // Unknown kind\n      revert InvalidKind(_decoded.kind);\n    }\n  }\n\n  function hash(\n    Decoded memory _decoded\n  ) internal view returns (bytes32) {\n    bytes32 domain = domainSeparator(_decoded.noChainId, address(this));\n    bytes32 structHash = toEIP712(_decoded);\n    return keccak256(abi.encodePacked("\\x19\\x01", domain, structHash));\n  }\n\n  function hashFor(Decoded memory _decoded, address _wallet) internal view returns (bytes32) {\n    bytes32 domain = domainSeparator(_decoded.noChainId, _wallet);\n    bytes32 structHash = toEIP712(_decoded);\n    return keccak256(abi.encodePacked("\\x19\\x01", domain, structHash));\n  }\n\n}\n'
      }
    },
    settings: {
      remappings: [
        '@openzeppelin/contracts/=lib/sequence-v3/lib/openzeppelin-contracts/contracts/',
        'erc2470-libs/=lib/erc2470-libs/',
        'erc4626-tests/=lib/sequence-v3/lib/openzeppelin-contracts/lib/erc4626-tests/',
        'forge-std/=lib/forge-std/src/',
        'halmos-cheatcodes/=lib/sequence-v3/lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/',
        'openzeppelin-contracts/=lib/sequence-v3/lib/openzeppelin-contracts/',
        'sequence-v3/=lib/sequence-v3/'
      ],
      optimizer: {
        enabled: false,
        runs: 200
      },
      metadata: {
        useLiteralContent: false,
        bytecodeHash: 'ipfs',
        appendCBOR: true
      },
      outputSelection: {
        '*': {
          '*': ['evm.bytecode', 'evm.deployedBytecode', 'devdoc', 'userdoc', 'metadata', 'abi']
        }
      },
      evmVersion: 'cancun',
      viaIR: false,
      libraries: {}
    }
  }
}
