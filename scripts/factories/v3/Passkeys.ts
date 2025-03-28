import { ContractFactory, ethers } from 'ethers'

export class Passkeys extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      [
        {
          type: 'function',
          name: 'isValidSapientSignatureCompact',
          inputs: [
            { name: '_digest', type: 'bytes32', internalType: 'bytes32' },
            { name: '_signature', type: 'bytes', internalType: 'bytes' }
          ],
          outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
          stateMutability: 'view'
        },
        {
          type: 'error',
          name: 'InvalidPasskeySignature',
          inputs: [
            {
              name: '_webAuthnAuth',
              type: 'tuple',
              internalType: 'struct WebAuthn.WebAuthnAuth',
              components: [
                { name: 'authenticatorData', type: 'bytes', internalType: 'bytes' },
                { name: 'clientDataJSON', type: 'string', internalType: 'string' },
                { name: 'challengeIndex', type: 'uint256', internalType: 'uint256' },
                { name: 'typeIndex', type: 'uint256', internalType: 'uint256' },
                { name: 'r', type: 'bytes32', internalType: 'bytes32' },
                { name: 's', type: 'bytes32', internalType: 'bytes32' }
              ]
            },
            { name: '_requireUserVerification', type: 'bool', internalType: 'bool' },
            { name: '_x', type: 'bytes32', internalType: 'bytes32' },
            { name: '_y', type: 'bytes32', internalType: 'bytes32' }
          ]
        }
      ],
      '0x6080604052348015600e575f5ffd5b50610f188061001c5f395ff3fe608060405234801561000f575f5ffd5b5060043610610029575f3560e01c8063957d2b231461002d575b5f5ffd5b61004760048036038101906100429190610850565b61005d565b60405161005491906108bc565b60405180910390f35b5f5f5f5f5f5f61006d8888610104565b945094509450945094506100a38960405160200161008b91906108f5565b60405160208183030381529060405285878686610408565b6100ea57848484846040517f12a693e60000000000000000000000000000000000000000000000000000000081526004016100e19493929190610a9f565b60405180910390fd5b6100f684848484610541565b955050505050509392505050565b61010c610779565b5f5f5f5f5f87875f81811061012457610123610ae9565b5b9050013560f81c60f81b90505f60f81b602060f81b82167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916036103c8575f60f81b600160f81b82167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141594505f600180600260f81b841660f81c60ff16901c0160ff1690505f60016002600460f81b851660f81c60ff16901c0160ff1690505f60016003600860f81b861660f81c60ff16901c0160ff1690505f60016004601060f81b871660f81c60ff16901c0160ff1690505f600190505f60f81b604060f81b87167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146102455761023c8d8d83610577565b80925081985050505b5f6102528e8e848961058d565b80935081925050505f81830190508e8e8490839261027293929190610b1e565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f820116905080830192505050505050508d5f018190525080925050505f6102cd8e8e848861058d565b80935081925050505f81830190508e8e849083926102ed93929190610b1e565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f820116905080830192505050505050508d6020018190525080925050506103488d8d838661058d565b8c6040018193508281525050506103618d8d838561058d565b8c6060018193508281525050506103798d8d83610577565b8c6080018193508281525050506103918d8d83610577565b8c60a0018193508281525050506103a98d8d83610577565b809250819a5050506103bc8d8d836105ba565b975050505050506103fd565b878760019080926103db93929190610b1e565b8101906103e89190610e4f565b809650819750829850839950849a5050505050505b509295509295909350565b5f5f5f610417886001806105c8565b90506020860151805160208201604089015160608a01518551600d81017f226368616c6c656e6765223a220000000000000000000000000000000000000060981c8852858482011060228286880101515f1a14168160138a01208286880120141686846014011085851760801c107f2274797065223a22776562617574686e2e67657422000000000000000000000060581c8588015160581c1416169950818852505050508851518a151560021b600117808160218d510151161460208311891616975087156105135760208b510182810180516020600160208701856020868c8c60025afa60011b5afa5199508082523d61050f57fe5b5050505b50505050508215610536576105338287608001518860a0015188886106d2565b92505b505095945050505050565b5f5f61054d8585610765565b90505f8690505f61055e8286610765565b905061056a8382610765565b9350505050949350505050565b5f5f848301359150602083019050935093915050565b5f5f858401356008840261010003600180866008021b0382821c1693508486019250505094509492505050565b5f8184013590509392505050565b6060835180156106ca576003600282010460021b60405192507f4142434445464748494a4b4c4d4e4f505152535455565758595a616263646566601f526106708515027f6768696a6b6c6d6e6f707172737475767778797a303132333435363738392d5f18603f526020830181810183886020010180515f82525b6001156106975760038a0199508951603f8160121c16515f53603f81600c1c1651600153603f8160061c1651600253603f8116516003535f5185526004850194508385106106915750610697565b50610643565b8082526020830160405260038606600204613d3d60f01b81860352808915150290505f8186035280860388525050505050505b509392505050565b5f6040518681528560208201528460408201528360608201528260808201525f5f5260205f60a0836101005afa503d6107305760203d60a0836dd01ea45f9efd5c54f037fa57ea1a5afa503d61072f5763d0d5039b3d526004601cfd5b5b5f516001147f7fffffff800000007fffffffffffffffde737d56d38bcf4279dce5617e3192a886111091505095945050505050565b5f825f528160205260405f20905092915050565b6040518060c0016040528060608152602001606081526020015f81526020015f81526020015f81526020015f81525090565b5f604051905090565b5f5ffd5b5f5ffd5b5f819050919050565b6107ce816107bc565b81146107d8575f5ffd5b50565b5f813590506107e9816107c5565b92915050565b5f5ffd5b5f5ffd5b5f5ffd5b5f5f83601f8401126108105761080f6107ef565b5b8235905067ffffffffffffffff81111561082d5761082c6107f3565b5b602083019150836001820283011115610849576108486107f7565b5b9250929050565b5f5f5f60408486031215610867576108666107b4565b5b5f610874868287016107db565b935050602084013567ffffffffffffffff811115610895576108946107b8565b5b6108a1868287016107fb565b92509250509250925092565b6108b6816107bc565b82525050565b5f6020820190506108cf5f8301846108ad565b92915050565b5f819050919050565b6108ef6108ea826107bc565b6108d5565b82525050565b5f61090082846108de565b60208201915081905092915050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f6109518261090f565b61095b8185610919565b935061096b818560208601610929565b61097481610937565b840191505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f6109a38261097f565b6109ad8185610989565b93506109bd818560208601610929565b6109c681610937565b840191505092915050565b5f819050919050565b6109e3816109d1565b82525050565b6109f2816107bc565b82525050565b5f60c083015f8301518482035f860152610a128282610947565b91505060208301518482036020860152610a2c8282610999565b9150506040830151610a4160408601826109da565b506060830151610a5460608601826109da565b506080830151610a6760808601826109e9565b5060a0830151610a7a60a08601826109e9565b508091505092915050565b5f8115159050919050565b610a9981610a85565b82525050565b5f6080820190508181035f830152610ab781876109f8565b9050610ac66020830186610a90565b610ad360408301856108ad565b610ae060608301846108ad565b95945050505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b5f5ffd5b5f5ffd5b5f5f85851115610b3157610b30610b16565b5b83861115610b4257610b41610b1a565b5b6001850283019150848603905094509492505050565b5f5ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b610b9282610937565b810181811067ffffffffffffffff82111715610bb157610bb0610b5c565b5b80604052505050565b5f610bc36107ab565b9050610bcf8282610b89565b919050565b5f5ffd5b5f5ffd5b5f67ffffffffffffffff821115610bf657610bf5610b5c565b5b610bff82610937565b9050602081019050919050565b828183375f83830152505050565b5f610c2c610c2784610bdc565b610bba565b905082815260208101848484011115610c4857610c47610bd8565b5b610c53848285610c0c565b509392505050565b5f82601f830112610c6f57610c6e6107ef565b5b8135610c7f848260208601610c1a565b91505092915050565b5f67ffffffffffffffff821115610ca257610ca1610b5c565b5b610cab82610937565b9050602081019050919050565b5f610cca610cc584610c88565b610bba565b905082815260208101848484011115610ce657610ce5610bd8565b5b610cf1848285610c0c565b509392505050565b5f82601f830112610d0d57610d0c6107ef565b5b8135610d1d848260208601610cb8565b91505092915050565b610d2f816109d1565b8114610d39575f5ffd5b50565b5f81359050610d4a81610d26565b92915050565b5f60c08284031215610d6557610d64610b58565b5b610d6f60c0610bba565b90505f82013567ffffffffffffffff811115610d8e57610d8d610bd4565b5b610d9a84828501610c5b565b5f83015250602082013567ffffffffffffffff811115610dbd57610dbc610bd4565b5b610dc984828501610cf9565b6020830152506040610ddd84828501610d3c565b6040830152506060610df184828501610d3c565b6060830152506080610e05848285016107db565b60808301525060a0610e19848285016107db565b60a08301525092915050565b610e2e81610a85565b8114610e38575f5ffd5b50565b5f81359050610e4981610e25565b92915050565b5f5f5f5f5f60a08688031215610e6857610e676107b4565b5b5f86013567ffffffffffffffff811115610e8557610e846107b8565b5b610e9188828901610d50565b9550506020610ea288828901610e3b565b9450506040610eb3888289016107db565b9350506060610ec4888289016107db565b9250506080610ed5888289016107db565b915050929550929590935056fea264697066735822122042449dcd4566e37ce28140d839685b525cef843175977316f22c6e6b8283438964736f6c634300081c0033',
      signer
    )
  }
}
