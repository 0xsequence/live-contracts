import { ContractFactory, ethers } from 'ethers'

export class Stage1Module extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      [
        {
          type: 'constructor',
          inputs: [{ name: '_factory', type: 'address', internalType: 'address' }],
          stateMutability: 'nonpayable'
        },
        {
          type: 'function',
          name: 'FACTORY',
          inputs: [],
          outputs: [{ name: '', type: 'address', internalType: 'address' }],
          stateMutability: 'view'
        },
        {
          type: 'function',
          name: 'INIT_CODE_HASH',
          inputs: [],
          outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
          stateMutability: 'view'
        },
        {
          type: 'function',
          name: 'STAGE_2_IMPLEMENTATION',
          inputs: [],
          outputs: [{ name: '', type: 'address', internalType: 'address' }],
          stateMutability: 'view'
        },
        {
          type: 'function',
          name: 'execute',
          inputs: [
            { name: '_payload', type: 'bytes', internalType: 'bytes' },
            { name: '_signature', type: 'bytes', internalType: 'bytes' }
          ],
          outputs: [],
          stateMutability: 'nonpayable'
        },
        {
          type: 'function',
          name: 'getImplementation',
          inputs: [],
          outputs: [{ name: '', type: 'address', internalType: 'address' }],
          stateMutability: 'view'
        },
        {
          type: 'function',
          name: 'isValidSapientSignature',
          inputs: [
            {
              name: '_payload',
              type: 'tuple',
              internalType: 'struct Payload.Decoded',
              components: [
                { name: 'kind', type: 'uint8', internalType: 'uint8' },
                { name: 'noChainId', type: 'bool', internalType: 'bool' },
                {
                  name: 'calls',
                  type: 'tuple[]',
                  internalType: 'struct Payload.Call[]',
                  components: [
                    { name: 'to', type: 'address', internalType: 'address' },
                    { name: 'value', type: 'uint256', internalType: 'uint256' },
                    { name: 'data', type: 'bytes', internalType: 'bytes' },
                    { name: 'gasLimit', type: 'uint256', internalType: 'uint256' },
                    { name: 'delegateCall', type: 'bool', internalType: 'bool' },
                    { name: 'onlyFallback', type: 'bool', internalType: 'bool' },
                    { name: 'behaviorOnError', type: 'uint256', internalType: 'uint256' }
                  ]
                },
                { name: 'space', type: 'uint256', internalType: 'uint256' },
                { name: 'nonce', type: 'uint256', internalType: 'uint256' },
                { name: 'message', type: 'bytes', internalType: 'bytes' },
                { name: 'imageHash', type: 'bytes32', internalType: 'bytes32' },
                { name: 'digest', type: 'bytes32', internalType: 'bytes32' },
                { name: 'parentWallets', type: 'address[]', internalType: 'address[]' }
              ]
            },
            { name: '_signature', type: 'bytes', internalType: 'bytes' }
          ],
          outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
          stateMutability: 'view'
        },
        {
          type: 'function',
          name: 'isValidSignature',
          inputs: [
            { name: '_hash', type: 'bytes32', internalType: 'bytes32' },
            { name: '_signature', type: 'bytes', internalType: 'bytes' }
          ],
          outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
          stateMutability: 'view'
        },
        {
          type: 'function',
          name: 'readNonce',
          inputs: [{ name: '_space', type: 'uint256', internalType: 'uint256' }],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view'
        },
        {
          type: 'function',
          name: 'recoverPartialSignature',
          inputs: [
            {
              name: '_payload',
              type: 'tuple',
              internalType: 'struct Payload.Decoded',
              components: [
                { name: 'kind', type: 'uint8', internalType: 'uint8' },
                { name: 'noChainId', type: 'bool', internalType: 'bool' },
                {
                  name: 'calls',
                  type: 'tuple[]',
                  internalType: 'struct Payload.Call[]',
                  components: [
                    { name: 'to', type: 'address', internalType: 'address' },
                    { name: 'value', type: 'uint256', internalType: 'uint256' },
                    { name: 'data', type: 'bytes', internalType: 'bytes' },
                    { name: 'gasLimit', type: 'uint256', internalType: 'uint256' },
                    { name: 'delegateCall', type: 'bool', internalType: 'bool' },
                    { name: 'onlyFallback', type: 'bool', internalType: 'bool' },
                    { name: 'behaviorOnError', type: 'uint256', internalType: 'uint256' }
                  ]
                },
                { name: 'space', type: 'uint256', internalType: 'uint256' },
                { name: 'nonce', type: 'uint256', internalType: 'uint256' },
                { name: 'message', type: 'bytes', internalType: 'bytes' },
                { name: 'imageHash', type: 'bytes32', internalType: 'bytes32' },
                { name: 'digest', type: 'bytes32', internalType: 'bytes32' },
                { name: 'parentWallets', type: 'address[]', internalType: 'address[]' }
              ]
            },
            { name: '_signature', type: 'bytes', internalType: 'bytes' }
          ],
          outputs: [
            { name: 'threshold', type: 'uint256', internalType: 'uint256' },
            { name: 'weight', type: 'uint256', internalType: 'uint256' },
            { name: 'isValidImage', type: 'bool', internalType: 'bool' },
            { name: 'imageHash', type: 'bytes32', internalType: 'bytes32' },
            { name: 'checkpoint', type: 'uint256', internalType: 'uint256' },
            { name: 'opHash', type: 'bytes32', internalType: 'bytes32' }
          ],
          stateMutability: 'view'
        },
        {
          type: 'function',
          name: 'selfExecute',
          inputs: [{ name: '_payload', type: 'bytes', internalType: 'bytes' }],
          outputs: [],
          stateMutability: 'nonpayable'
        },
        {
          type: 'function',
          name: 'setStaticSignature',
          inputs: [
            { name: '_hash', type: 'bytes32', internalType: 'bytes32' },
            { name: '_address', type: 'address', internalType: 'address' },
            { name: '_timestamp', type: 'uint96', internalType: 'uint96' }
          ],
          outputs: [],
          stateMutability: 'nonpayable'
        },
        {
          type: 'function',
          name: 'updateImageHash',
          inputs: [{ name: '_imageHash', type: 'bytes32', internalType: 'bytes32' }],
          outputs: [],
          stateMutability: 'nonpayable'
        },
        {
          type: 'function',
          name: 'updateImplementation',
          inputs: [{ name: '_implementation', type: 'address', internalType: 'address' }],
          outputs: [],
          stateMutability: 'nonpayable'
        },
        {
          type: 'event',
          name: 'Aborted',
          inputs: [
            { name: '_opHash', type: 'bytes32', indexed: false, internalType: 'bytes32' },
            { name: '_index', type: 'uint256', indexed: false, internalType: 'uint256' }
          ],
          anonymous: false
        },
        {
          type: 'event',
          name: 'Failed',
          inputs: [
            { name: '_opHash', type: 'bytes32', indexed: false, internalType: 'bytes32' },
            { name: '_index', type: 'uint256', indexed: false, internalType: 'uint256' }
          ],
          anonymous: false
        },
        {
          type: 'event',
          name: 'ImageHashUpdated',
          inputs: [{ name: 'newImageHash', type: 'bytes32', indexed: false, internalType: 'bytes32' }],
          anonymous: false
        },
        {
          type: 'event',
          name: 'ImplementationUpdated',
          inputs: [{ name: 'newImplementation', type: 'address', indexed: false, internalType: 'address' }],
          anonymous: false
        },
        {
          type: 'event',
          name: 'NonceChange',
          inputs: [
            { name: '_space', type: 'uint256', indexed: false, internalType: 'uint256' },
            { name: '_newNonce', type: 'uint256', indexed: false, internalType: 'uint256' }
          ],
          anonymous: false
        },
        {
          type: 'event',
          name: 'Skipped',
          inputs: [
            { name: '_opHash', type: 'bytes32', indexed: false, internalType: 'bytes32' },
            { name: '_index', type: 'uint256', indexed: false, internalType: 'uint256' }
          ],
          anonymous: false
        },
        {
          type: 'event',
          name: 'StaticSignatureSet',
          inputs: [
            { name: '_hash', type: 'bytes32', indexed: false, internalType: 'bytes32' },
            { name: '_address', type: 'address', indexed: false, internalType: 'address' },
            { name: '_timestamp', type: 'uint96', indexed: false, internalType: 'uint96' }
          ],
          anonymous: false
        },
        {
          type: 'event',
          name: 'Success',
          inputs: [
            { name: '_opHash', type: 'bytes32', indexed: false, internalType: 'bytes32' },
            { name: '_index', type: 'uint256', indexed: false, internalType: 'uint256' }
          ],
          anonymous: false
        },
        {
          type: 'error',
          name: 'BadNonce',
          inputs: [
            { name: '_space', type: 'uint256', internalType: 'uint256' },
            { name: '_provided', type: 'uint256', internalType: 'uint256' },
            { name: '_current', type: 'uint256', internalType: 'uint256' }
          ]
        },
        { type: 'error', name: 'ImageHashIsZero', inputs: [] },
        {
          type: 'error',
          name: 'InvalidNestedSignature',
          inputs: [
            {
              name: '_payload',
              type: 'tuple',
              internalType: 'struct Payload.Decoded',
              components: [
                { name: 'kind', type: 'uint8', internalType: 'uint8' },
                { name: 'noChainId', type: 'bool', internalType: 'bool' },
                {
                  name: 'calls',
                  type: 'tuple[]',
                  internalType: 'struct Payload.Call[]',
                  components: [
                    { name: 'to', type: 'address', internalType: 'address' },
                    { name: 'value', type: 'uint256', internalType: 'uint256' },
                    { name: 'data', type: 'bytes', internalType: 'bytes' },
                    { name: 'gasLimit', type: 'uint256', internalType: 'uint256' },
                    { name: 'delegateCall', type: 'bool', internalType: 'bool' },
                    { name: 'onlyFallback', type: 'bool', internalType: 'bool' },
                    { name: 'behaviorOnError', type: 'uint256', internalType: 'uint256' }
                  ]
                },
                { name: 'space', type: 'uint256', internalType: 'uint256' },
                { name: 'nonce', type: 'uint256', internalType: 'uint256' },
                { name: 'message', type: 'bytes', internalType: 'bytes' },
                { name: 'imageHash', type: 'bytes32', internalType: 'bytes32' },
                { name: 'digest', type: 'bytes32', internalType: 'bytes32' },
                { name: 'parentWallets', type: 'address[]', internalType: 'address[]' }
              ]
            },
            { name: '_subdigest', type: 'bytes32', internalType: 'bytes32' },
            { name: '_signer', type: 'address', internalType: 'address' },
            { name: '_signature', type: 'bytes', internalType: 'bytes' }
          ]
        },
        {
          type: 'error',
          name: 'InvalidSapientSignature',
          inputs: [
            {
              name: '_payload',
              type: 'tuple',
              internalType: 'struct Payload.Decoded',
              components: [
                { name: 'kind', type: 'uint8', internalType: 'uint8' },
                { name: 'noChainId', type: 'bool', internalType: 'bool' },
                {
                  name: 'calls',
                  type: 'tuple[]',
                  internalType: 'struct Payload.Call[]',
                  components: [
                    { name: 'to', type: 'address', internalType: 'address' },
                    { name: 'value', type: 'uint256', internalType: 'uint256' },
                    { name: 'data', type: 'bytes', internalType: 'bytes' },
                    { name: 'gasLimit', type: 'uint256', internalType: 'uint256' },
                    { name: 'delegateCall', type: 'bool', internalType: 'bool' },
                    { name: 'onlyFallback', type: 'bool', internalType: 'bool' },
                    { name: 'behaviorOnError', type: 'uint256', internalType: 'uint256' }
                  ]
                },
                { name: 'space', type: 'uint256', internalType: 'uint256' },
                { name: 'nonce', type: 'uint256', internalType: 'uint256' },
                { name: 'message', type: 'bytes', internalType: 'bytes' },
                { name: 'imageHash', type: 'bytes32', internalType: 'bytes32' },
                { name: 'digest', type: 'bytes32', internalType: 'bytes32' },
                { name: 'parentWallets', type: 'address[]', internalType: 'address[]' }
              ]
            },
            { name: '_signature', type: 'bytes', internalType: 'bytes' }
          ]
        },
        {
          type: 'error',
          name: 'InvalidSignature',
          inputs: [
            {
              name: '_payload',
              type: 'tuple',
              internalType: 'struct Payload.Decoded',
              components: [
                { name: 'kind', type: 'uint8', internalType: 'uint8' },
                { name: 'noChainId', type: 'bool', internalType: 'bool' },
                {
                  name: 'calls',
                  type: 'tuple[]',
                  internalType: 'struct Payload.Call[]',
                  components: [
                    { name: 'to', type: 'address', internalType: 'address' },
                    { name: 'value', type: 'uint256', internalType: 'uint256' },
                    { name: 'data', type: 'bytes', internalType: 'bytes' },
                    { name: 'gasLimit', type: 'uint256', internalType: 'uint256' },
                    { name: 'delegateCall', type: 'bool', internalType: 'bool' },
                    { name: 'onlyFallback', type: 'bool', internalType: 'bool' },
                    { name: 'behaviorOnError', type: 'uint256', internalType: 'uint256' }
                  ]
                },
                { name: 'space', type: 'uint256', internalType: 'uint256' },
                { name: 'nonce', type: 'uint256', internalType: 'uint256' },
                { name: 'message', type: 'bytes', internalType: 'bytes' },
                { name: 'imageHash', type: 'bytes32', internalType: 'bytes32' },
                { name: 'digest', type: 'bytes32', internalType: 'bytes32' },
                { name: 'parentWallets', type: 'address[]', internalType: 'address[]' }
              ]
            },
            { name: '_signature', type: 'bytes', internalType: 'bytes' }
          ]
        },
        { type: 'error', name: 'InvalidSignatureFlag', inputs: [{ name: '_flag', type: 'uint256', internalType: 'uint256' }] },
        { type: 'error', name: 'InvalidSignatureType', inputs: [{ name: '_type', type: 'bytes1', internalType: 'bytes1' }] },
        {
          type: 'error',
          name: 'InvalidStaticSignature',
          inputs: [
            { name: '_opHash', type: 'bytes32', internalType: 'bytes32' },
            { name: '_expires', type: 'uint256', internalType: 'uint256' }
          ]
        },
        {
          type: 'error',
          name: 'LowWeightChainedSignature',
          inputs: [
            { name: '_signature', type: 'bytes', internalType: 'bytes' },
            { name: '_threshold', type: 'uint256', internalType: 'uint256' },
            { name: '_weight', type: 'uint256', internalType: 'uint256' }
          ]
        },
        {
          type: 'error',
          name: 'NotEnoughGas',
          inputs: [
            {
              name: '_payload',
              type: 'tuple',
              internalType: 'struct Payload.Decoded',
              components: [
                { name: 'kind', type: 'uint8', internalType: 'uint8' },
                { name: 'noChainId', type: 'bool', internalType: 'bool' },
                {
                  name: 'calls',
                  type: 'tuple[]',
                  internalType: 'struct Payload.Call[]',
                  components: [
                    { name: 'to', type: 'address', internalType: 'address' },
                    { name: 'value', type: 'uint256', internalType: 'uint256' },
                    { name: 'data', type: 'bytes', internalType: 'bytes' },
                    { name: 'gasLimit', type: 'uint256', internalType: 'uint256' },
                    { name: 'delegateCall', type: 'bool', internalType: 'bool' },
                    { name: 'onlyFallback', type: 'bool', internalType: 'bool' },
                    { name: 'behaviorOnError', type: 'uint256', internalType: 'uint256' }
                  ]
                },
                { name: 'space', type: 'uint256', internalType: 'uint256' },
                { name: 'nonce', type: 'uint256', internalType: 'uint256' },
                { name: 'message', type: 'bytes', internalType: 'bytes' },
                { name: 'imageHash', type: 'bytes32', internalType: 'bytes32' },
                { name: 'digest', type: 'bytes32', internalType: 'bytes32' },
                { name: 'parentWallets', type: 'address[]', internalType: 'address[]' }
              ]
            },
            { name: '_index', type: 'uint256', internalType: 'uint256' },
            { name: '_gasLeft', type: 'uint256', internalType: 'uint256' }
          ]
        },
        { type: 'error', name: 'OnlySelf', inputs: [{ name: '_sender', type: 'address', internalType: 'address' }] },
        {
          type: 'error',
          name: 'Reverted',
          inputs: [
            {
              name: '_payload',
              type: 'tuple',
              internalType: 'struct Payload.Decoded',
              components: [
                { name: 'kind', type: 'uint8', internalType: 'uint8' },
                { name: 'noChainId', type: 'bool', internalType: 'bool' },
                {
                  name: 'calls',
                  type: 'tuple[]',
                  internalType: 'struct Payload.Call[]',
                  components: [
                    { name: 'to', type: 'address', internalType: 'address' },
                    { name: 'value', type: 'uint256', internalType: 'uint256' },
                    { name: 'data', type: 'bytes', internalType: 'bytes' },
                    { name: 'gasLimit', type: 'uint256', internalType: 'uint256' },
                    { name: 'delegateCall', type: 'bool', internalType: 'bool' },
                    { name: 'onlyFallback', type: 'bool', internalType: 'bool' },
                    { name: 'behaviorOnError', type: 'uint256', internalType: 'uint256' }
                  ]
                },
                { name: 'space', type: 'uint256', internalType: 'uint256' },
                { name: 'nonce', type: 'uint256', internalType: 'uint256' },
                { name: 'message', type: 'bytes', internalType: 'bytes' },
                { name: 'imageHash', type: 'bytes32', internalType: 'bytes32' },
                { name: 'digest', type: 'bytes32', internalType: 'bytes32' },
                { name: 'parentWallets', type: 'address[]', internalType: 'address[]' }
              ]
            },
            { name: '_index', type: 'uint256', internalType: 'uint256' },
            { name: '_returnData', type: 'bytes', internalType: 'bytes' }
          ]
        },
        {
          type: 'error',
          name: 'UnusedSnapshot',
          inputs: [
            {
              name: '_snapshot',
              type: 'tuple',
              internalType: 'struct Snapshot',
              components: [
                { name: 'imageHash', type: 'bytes32', internalType: 'bytes32' },
                { name: 'checkpoint', type: 'uint256', internalType: 'uint256' }
              ]
            }
          ]
        },
        {
          type: 'error',
          name: 'WrongChainedCheckpointOrder',
          inputs: [
            { name: '_nextCheckpoint', type: 'uint256', internalType: 'uint256' },
            { name: '_checkpoint', type: 'uint256', internalType: 'uint256' }
          ]
        }
      ],
      '0x60e060405234801561000f575f5ffd5b5060405161920f38038061920f83398181016040528101906100319190610196565b8060405161003e9061012b565b604051809103905ff080158015610057573d5f5f3e3d5ffd5b505f6040518060600160405280602881526020016191e7602891393073ffffffffffffffffffffffffffffffffffffffff1660405160200161009a92919061023c565b60405160208183030381529060405280519060200120905080608081815250508273ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508173ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff168152505050505050610263565b6146da80614b0d83390190565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6101658261013c565b9050919050565b6101758161015b565b811461017f575f5ffd5b50565b5f815190506101908161016c565b92915050565b5f602082840312156101ab576101aa610138565b5b5f6101b884828501610182565b91505092915050565b5f81519050919050565b5f81905092915050565b8281835e5f83830152505050565b5f6101ed826101c1565b6101f781856101cb565b93506102078185602086016101d5565b80840191505092915050565b5f819050919050565b5f819050919050565b61023661023182610213565b61021c565b82525050565b5f61024782856101e3565b91506102538284610225565b6020820191508190509392505050565b60805160a05160c05161486b6102a25f395f8181610590015261128901525f818161049b015261297401525f81816103fb0152612996015261486b5ff3fe608060405234801561000f575f5ffd5b50600436106100cd575f3560e01c80636ea445771161008a578063aaf10f4211610064578063aaf10f42146101fb578063ad55366b14610219578063ca7078501461024e578063f727ef1c1461027e576100cd565b80636ea44577146101915780638c3f5563146101ad5780639f69ef54146101dd576100cd565b8063025b22bc146100d15780631626ba7e146100ed5780631f6a1eb91461011d578063257671f51461013957806329561426146101575780632dd3100014610173575b5f5ffd5b6100eb60048036038101906100e69190612e18565b61029a565b005b61010760048036038101906101029190612ed7565b610316565b6040516101149190612f6e565b60405180910390f35b61013760048036038101906101329190612f87565b610370565b005b6101416103f9565b60405161014e9190613014565b60405180910390f35b610171600480360381019061016c919061302d565b61041d565b005b61017b610499565b6040516101889190613067565b60405180910390f35b6101ab60048036038101906101a69190613080565b6104bd565b005b6101c760048036038101906101c291906130fe565b610556565b6040516101d49190613138565b60405180910390f35b6101e561058e565b6040516101f29190613067565b60405180910390f35b6102036105b2565b6040516102109190613067565b60405180910390f35b610233600480360381019061022e9190613698565b6105c0565b60405161024596959493929190613720565b60405180910390f35b61026860048036038101906102639190613698565b6105fe565b6040516102759190613014565b60405180910390f35b610298600480360381019061029391906137c0565b6107ad565b005b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461030a57336040517fa19dbf000000000000000000000000000000000000000000000000000000000081526004016103019190613067565b60405180910390fd5b61031381610876565b50565b5f61031f612cf9565b6003815f019060ff16908160ff1681525050848160e00181815250505f6103478286866108b9565b5090508061035c575f60e01b92505050610369565b6320c13b0b60e01b925050505b9392505050565b5f61037b8585610a22565b905061038f81606001518260800151610ec4565b5f5f61039c8386866108b9565b91509150816103e6578285856040517fa2b6d61b0000000000000000000000000000000000000000000000000000000081526004016103dd93929190613bc3565b60405180910390fd5b6103f08184610f68565b50505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461048d57336040517fa19dbf000000000000000000000000000000000000000000000000000000000081526004016104849190613067565b60405180910390fd5b610496816111e6565b50565b7f000000000000000000000000000000000000000000000000000000000000000081565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461052d57336040517fa19dbf000000000000000000000000000000000000000000000000000000000081526004016105249190613067565b60405180910390fd5b5f6105388383610a22565b90505f610544826112b0565b90506105508183610f68565b50505050565b5f6105857f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e5f1b835f1b611300565b5f1c9050919050565b7f000000000000000000000000000000000000000000000000000000000000000081565b5f6105bb611338565b905090565b5f5f5f5f5f5f6105d38989895f5f611340565b809550819650829750839950849a5050505050506105f08361167d565b935093975093979195509350565b5f5f6001856101000151516106139190613c27565b67ffffffffffffffff81111561062c5761062b613165565b5b60405190808252806020026020018201604052801561065a5781602001602082028036833780820191505090505b5090505f5f90505b856101000151518110156106ea57856101000151818151811061068857610687613c5a565b5b60200260200101518282815181106106a3576106a2613c5a565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508080600101915050610662565b503381866101000151518151811061070557610704613c5a565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050808561010001819052505f6107558686866108b9565b5090508061079e578585856040517ff58cc8b500000000000000000000000000000000000000000000000000000000815260040161079593929190613bc3565b60405180910390fd5b60015f1b925050509392505050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461081d57336040517fa19dbf000000000000000000000000000000000000000000000000000000000081526004016108149190613067565b60405180910390fd5b6108368383836bffffffffffffffffffffffff1661168e565b7febf265acfac1c01de588ed7ef49743b9c3ce8d6d1edeaf510a1f5453228515b183838360405161086993929190613c96565b60405180910390a1505050565b61087f816116ec565b7f310ba5f1d2ed074b51e2eccd052a47ae9ab7c6b800d1fca3db3999d6a592ca03816040516108ae9190613067565b60405180910390a150565b5f5f5f84845f8181106108cf576108ce613c5a565b5b9050013560f81c60f81b9050608060f81b608060f81b82167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916036109e857610917866112b0565b91505f5f610924846116f2565b915091504281101561096f5783816040517f9fa4fe54000000000000000000000000000000000000000000000000000000008152600401610966929190613ccb565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614806109d457503373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b156109e55760019450505050610a1a565b50505b5f5f5f6109f88989895f5f611340565b905080985081945082955083965050505050610a138161167d565b9550505050505b935093915050565b610a2a612cf9565b5f815f019060ff16908160ff16815250505f5f610a478585611743565b915060ff169150600180831603610a67575f836060018181525050610aa3565b610a7c8186866117599290919263ffffffff16565b8173ffffffffffffffffffffffffffffffffffffffff169150846060018193508281525050505b5f6007600184901c1690505f811115610ae057610ad28282888861178a9190939291909392919063ffffffff16565b856080018194508281525050505b5f601080851603610af45760019050610b4c565b602080851603610b2757610b138388886117b79290919263ffffffff16565b8161ffff1691508094508192505050610b4b565b610b3c8388886117d69290919263ffffffff16565b8160ff16915080945081925050505b5b8067ffffffffffffffff811115610b6657610b65613165565b5b604051908082528060200260200182016040528015610b9f57816020015b610b8c612d44565b815260200190600190039081610b845790505b5085604001819052505f5f90505b81811015610eb9575f610bcb858a8a6117d69290919263ffffffff16565b8096508192505050600180821660ff1603610c3a573087604001518381518110610bf857610bf7613c5a565b5b60200260200101515f019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050610ca6565b610c4f858a8a6117f19290919263ffffffff16565b88604001518481518110610c6657610c65613c5a565b5b60200260200101515f018197508273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050505b600280821660ff1603610cf457610cc8858a8a6118229290919263ffffffff16565b88604001518481518110610cdf57610cde613c5a565b5b60200260200101516020018197508281525050505b600480821660ff1603610dbc575f610d17868b8b6118389290919263ffffffff16565b8162ffffff1691508097508192505050898987908389610d379190613c27565b92610d4493929190613cfa565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f8201169050808301925050505050505088604001518481518110610d9d57610d9c613c5a565b5b6020026020010151604001819052508086610db89190613c27565b9550505b600880821660ff1603610e0a57610dde858a8a6118229290919263ffffffff16565b88604001518481518110610df557610df4613c5a565b5b60200260200101516060018197508281525050505b601080821660ff161487604001518381518110610e2a57610e29613c5a565b5b60200260200101516080019015159081151581525050602080821660ff161487604001518381518110610e6057610e5f613c5a565b5b602002602001015160a0019015159081151581525050600660c0821660ff16901c60ff1687604001518381518110610e9b57610e9a613c5a565b5b602002602001015160c0018181525050508080600101915050610bad565b505050505092915050565b5f610ece83610556565b9050818114610f18578282826040517f9b6514f4000000000000000000000000000000000000000000000000000000008152600401610f0f93929190613d34565b60405180910390fd5b5f600183019050610f298482611858565b7f1f180c27086c7a39ea2a7b25239d1ab92348f07ca7bb59d1438fcf527568f8818482604051610f5a929190613d69565b60405180910390a150505050565b5f5f90505f82604001515190505f5f90505b818110156111df575f84604001518281518110610f9a57610f99613c5a565b5b602002602001015190508060a001518015610fb3575083155b15610ffa575f93507fa7df37e35254f22900087bd61c5b68001c8f034f7e924ec565af11317d7ee0f78683604051610fec929190613ccb565b60405180910390a1506111d2565b5f816060015190505f81141580156110115750805a105b156110575785835a6040517f2139527400000000000000000000000000000000000000000000000000000000815260040161104e93929190613d90565b60405180910390fd5b5f82608001511561107b57611074835f015183856040015161188d565b9050611095565b611092835f015184602001518486604001516118a2565b90505b80611195575f60ff168360c00151036110ed57600195507fe64040c2a394fc50904b208b60495abbcf56a8eff89806cada4162c27dd5f64388856040516110dd929190613ccb565b60405180910390a15050506111d2565b600160ff168360c00151036111445786846111066118b9565b6040517f7f6b0bb100000000000000000000000000000000000000000000000000000000815260040161113b93929190613e04565b60405180910390fd5b600260ff168360c0015103611194577f6cd433d189cb0ff58b321e23f3e510c9d0f019f2230a2066e50962d4f867c0a88885604051611184929190613ccb565b60405180910390a15050506111df565b5b7f2fd98f16e3e0ef7b9373ea49ea6b76b871c7f2aa1e2c222747ef5bfb26de18b388856040516111c6929190613ccb565b60405180910390a15050505b8080600101915050610f7a565b5050505050565b5f5f1b8103611221576040517f4294d12700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61124d7fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85f1b826118d7565b7f307ed6bd941ee9fc80f369c94af5fa11e25bab5102a6140191756c5474a30bfa8160405161127c9190613014565b60405180910390a16112ad7f0000000000000000000000000000000000000000000000000000000000000000610876565b50565b5f5f6112c08360200151306118de565b90505f6112cc84611982565b905081816040516020016112e1929190613ebb565b6040516020818303038152906040528051906020012092505050919050565b5f5f8383604051602001611315929190613ef1565b604051602081830303815290604052805190602001209050805491505092915050565b5f3054905090565b5f5f5f5f5f5f5f6113518b8b611743565b915060ff169150611360612d95565b604080841614801561139d57505f73ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff16145b156114d9576113b7828d8d6117f19290919263ffffffff16565b809350819a505050896114d8575f6113da838e8e6118389290919263ffffffff16565b8162ffffff16915080945081925050505f8d8d859084876113fb9190613c27565b9261140893929190613cfa565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f8201169050808301925050505050505090508a73ffffffffffffffffffffffffffffffffffffffff1663ccce3bc830836040518363ffffffff1660e01b8152600401611487929190613f18565b6040805180830381865afa1580156114a1573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906114c59190613fbb565b925081846114d39190613c27565b935050505b5b600180841603611512576115008d8a838f8f879080926114fb93929190613cfa565b611b93565b97509750975097509750505050611670565b6002808416148d60200190151590811515815250505f6002601c8516901c905061154e83828f8f61178a9190939291909392919063ffffffff16565b8094508197505050505f6001600560208616901c61156c9190613c27565b905061158a83828f8f61178a9190939291909392919063ffffffff16565b809450819a5050505061159c8d6112b0565b93506115ba8d858e8e869080926115b593929190613cfa565b611dd7565b80975081985050506115ce86895f1b612946565b95506115dc86865f1b612946565b9550611600868a73ffffffffffffffffffffffffffffffffffffffff165f1b612946565b95505f5f1b815f01511415801561161a575085815f015114155b801561162a575080602001518511155b1561166c57806040517fccbb534f0000000000000000000000000000000000000000000000000000000081526004016116639190614013565b60405180910390fd5b5050505b9550955095509550959050565b5f6116878261295a565b9050919050565b6116e77fc852adf5e97c2fc3b38f405671e91b7af1697ef0287577f227ef10494c2a8e865f1b846bffffffffffffffffffffffff841660608673ffffffffffffffffffffffffffffffffffffffff16901b175f1b6129fd565b505050565b80305550565b5f5f5f6117217fc852adf5e97c2fc3b38f405671e91b7af1697ef0287577f227ef10494c2a8e865f1b85611300565b5f1c9050606081901c816bffffffffffffffffffffffff169250925050915091565b5f5f83358060f81c925060019150509250929050565b5f5f8483013573ffffffffffffffffffffffffffffffffffffffff8160601c16925060148401915050935093915050565b5f5f858401356008840261010003600180866008021b0382821c1693508486019250505094509492505050565b5f5f8483013561ffff8160f01c16925060028401915050935093915050565b5f5f848301358060f81c925060018401915050935093915050565b5f5f8483013573ffffffffffffffffffffffffffffffffffffffff8160601c16925060148401915050935093915050565b5f5f848301359150602083019050935093915050565b5f5f8483013562ffffff8160e81c16925060038401915050935093915050565b6118897f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e5f1b835f1b835f1b6129fd565b5050565b5f5f5f8351602085018787f490509392505050565b5f5f5f835160208501878988f19050949350505050565b60603d604051915060208201818101604052818352815f823e505090565b8082555050565b5f7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f7f4aa45ca7ad825ceb1bf35643f0a58c295239df563b1b565c2485f96477c563187f2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de8561194d574661194f565b5f5b8560405160200161196495949392919061402c565b60405160208183030381529060405280519060200120905092915050565b5f5f611992836101000151612a32565b90505f60ff16835f015160ff1603611a14575f6119b28460400151612a9f565b90507f11e1e4079a79a66e4ade50033cfe2678cdd5341d2dfe5ef9513edb1a0be147a28185606001518660800151856040516020016119f595949392919061407d565b6040516020818303038152906040528051906020012092505050611b8e565b600160ff16835f015160ff1603611a83577fe19a3b94fc3c7ece3f890d98a99bc422615537a08dea0603fa8425867d87d4668360a001518051906020012082604051602001611a65939291906140ce565b60405160208183030381529060405280519060200120915050611b8e565b600260ff16835f015160ff1603611aeb577f11fdeb7e8373a1aa96bfac8d0ea91526b2c5d15e5cee20e0543e780258f3e8e48360c0015182604051602001611acd939291906140ce565b60405160208183030381529060405280519060200120915050611b8e565b600360ff16835f015160ff1603611b53577f402e923b91e918306019e73f589362164a6a059499a504699c66feabbb3e26248360e0015182604051602001611b35939291906140ce565b60405160208183030381529060405280519060200120915050611b8e565b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b859061415d565b60405180910390fd5b919050565b5f5f5f5f5f611ba0612cf9565b6002815f019060ff16908160ff16815250505f5f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90505b89899050821015611d61575f5f611bfa848d8d6118389290919263ffffffff16565b8162ffffff16915080955081925050508381611c169190613c27565b9150505f8b8b90508214611c2a575f611c2c565b8d5b90505f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8414611c5c5785611c5e565b8f5b9050611c7e818e8e88908792611c7693929190613cfa565b600186611340565b50809b50819c50829d50839e50505050508a8a1015611cea578c8c86908592611ca993929190613cfa565b8c8c6040517fb006aba0000000000000000000000000000000000000000000000000000000008152600401611ce1949392919061417b565b60405180910390fd5b829450888e5f015103611d03575f5f1b8e5f0181815250505b838810611d495787846040517f37daf62b000000000000000000000000000000000000000000000000000000008152600401611d40929190613d69565b60405180910390fd5b888660c0018181525050879350829450505050611bd8565b5f5f1b8b5f015114158015611d7a57508a602001518511155b15611dbc578a6040517fccbb534f000000000000000000000000000000000000000000000000000000008152600401611db39190614013565b60405180910390fd5b611dc58d6112b0565b93505050509550955095509550959050565b5f5f5f5b8484905081101561293c575f611dfc8287876117d69290919263ffffffff16565b8160ff16915080935081925050505f600460f08316901c90505f8103611f54575f600f831690505f8160ff1603611e4b57611e428489896117d69290919263ffffffff16565b80955081925050505b5f5f611e62868b8b612b199290919263ffffffff16565b8097508193505050611e7f868b8b612b199290919263ffffffff16565b80975081925050505f60ff82901c5f1c90505f7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff835f1c165f1b90505f601b830190505f60018f8388866040515f8152602001604052604051611ee594939291906141c8565b6020604051602081039080840390855afa158015611f05573d5f5f3e3d5ffd5b5050506020604051035190508660ff168c019b505f611f27828960ff16612b2f565b90505f5f1b8c03611f385780611f43565b611f428c82612946565b5b9b5050505050505050505050611ddb565b60018103611fdf575f600f831690505f8160ff1603611f8b57611f828489896117d69290919263ffffffff16565b80955081925050505b5f611fa1858a8a6117f19290919263ffffffff16565b80965081925050505f611fb7828460ff16612b2f565b90505f5f1b8703611fc85780611fd3565b611fd28782612946565b5b96505050505050611ddb565b600281036121d0575f6003831690505f8160ff16036120165761200d8489896117d69290919263ffffffff16565b80955081925050505b5f61202c858a8a6117f19290919263ffffffff16565b80965081925050505f6002600c861660ff16901c60ff1690505f61206287838d8d61178a9190939291909392919063ffffffff16565b80985081925050505f81880190506320c13b0b60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168473ffffffffffffffffffffffffffffffffffffffff16631626ba7e8f8f8f8d9087926120c693929190613cfa565b6040518463ffffffff1660e01b81526004016120e49392919061420b565b602060405180830381865afa1580156120ff573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906121239190614265565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461218c578d8d858e8e6040517ff734863a000000000000000000000000000000000000000000000000000000008152600401612183959493929190614290565b60405180910390fd5b8097508460ff168a0199505f6121a5858760ff16612b2f565b90505f5f1b8a036121b657806121c1565b6121c08a82612946565b5b99505050505050505050611ddb565b6003810361221a575f6121ee848989612b199290919263ffffffff16565b80955081925050505f5f1b85036122055780612210565b61220f8582612946565b5b9450505050611ddb565b6004810361229c575f600f831660ff1690505f61224985838b8b61178a9190939291909392919063ffffffff16565b80965081925050505f81860190505f5f6122758e8e8e8e8c90889261227093929190613cfa565b611dd7565b91509150829750818a01995061228b8982612946565b985082975050505050505050611ddb565b600681036123ac575f6002600c841660ff16901c60ff1690505f81036122e0576122d18489896117d69290919263ffffffff16565b8160ff16915080955081925050505b5f6003841660ff1690505f810361231657612306858a8a6117b79290919263ffffffff16565b8161ffff16915080965081925050505b5f61232c868b8b6118389290919263ffffffff16565b8162ffffff16915080975081925050505f81870190505f5f6123608f8f8f8f8d90889261235b93929190613cfa565b611dd7565b9150915082985084821061237457858b019a505b5f612380828789612b61565b90505f5f1b8b03612391578061239c565b61239b8b82612946565b5b9a50505050505050505050611ddb565b6005810361242e575f6123ca848989612b199290919263ffffffff16565b80955081925050508881036123fd577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff95505b5f61240782612b96565b90505f5f1b86036124185780612423565b6124228682612946565b5b955050505050611ddb565b60078103612594575f600f831690505f8160ff16036124655761245c8489896117d69290919263ffffffff16565b80955081925050505b5f5f61247c868b8b612b199290919263ffffffff16565b8097508193505050612499868b8b612b199290919263ffffffff16565b80975081925050505f60ff82901c5f1c90505f7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff835f1c165f1b90505f601b830190505f60018f6040516020016124f0919061432d565b604051602081830303815290604052805190602001208388866040515f815260200160405260405161252594939291906141c8565b6020604051602081039080840390855afa158015612545573d5f5f3e3d5ffd5b5050506020604051035190508660ff168c019b505f612567828960ff16612b2f565b90505f5f1b8c036125785780612583565b6125828c82612946565b5b9b5050505050505050505050611ddb565b6008810361262d575f6125b2848989612b199290919263ffffffff16565b80955081925050505f6125ce5f8c612bc590919063ffffffff16565b90508082036125fb577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff96505b5f61260582612c16565b90505f5f1b87036126165780612621565b6126208782612946565b5b96505050505050611ddb565b60098103612796575f6003831690505f8160ff16036126645761265b8489896117d69290919263ffffffff16565b80955081925050505b5f61267a858a8a6117f19290919263ffffffff16565b80965081925050505f5f6002600c871660ff16901c60ff1690506126b087828d8d61178a9190939291909392919063ffffffff16565b8098508193505050505f81870190505f8373ffffffffffffffffffffffffffffffffffffffff1663ca7078508f8e8e8c9087926126ef93929190613cfa565b6040518463ffffffff1660e01b815260040161270d93929190614352565b602060405180830381865afa158015612728573d5f5f3e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061274c9190614389565b90508197508460ff168a0199505f612768858760ff1684612c45565b90505f5f1b8a036127795780612784565b6127838a82612946565b5b99508298505050505050505050611ddb565b600a81036128ff575f6003831690505f8160ff16036127cd576127c48489896117d69290919263ffffffff16565b80955081925050505b5f6127e3858a8a6117f19290919263ffffffff16565b80965081925050505f6002600c861660ff16901c60ff1690505f61281987838d8d61178a9190939291909392919063ffffffff16565b80985081925050505f81880190505f8473ffffffffffffffffffffffffffffffffffffffff1663957d2b238f8f8f8d90879261285793929190613cfa565b6040518463ffffffff1660e01b81526004016128759392919061420b565b602060405180830381865afa158015612890573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906128b49190614389565b90508198508560ff168b019a505f6128d0868860ff1684612c45565b90505f5f1b8b036128e157806128ec565b6128eb8b82612946565b5b9a50829950505050505050505050611ddb565b806040517fb2505f7c0000000000000000000000000000000000000000000000000000000081526004016129339190613138565b60405180910390fd5b5094509492505050565b5f825f528160205260405f20905092915050565b5f3073ffffffffffffffffffffffffffffffffffffffff167f0000000000000000000000000000000000000000000000000000000000000000837f00000000000000000000000000000000000000000000000000000000000000006040516020016129c793929190614443565b604051602081830303815290604052805190602001205f1c73ffffffffffffffffffffffffffffffffffffffff16149050919050565b5f8383604051602001612a11929190613ef1565b60405160208183030381529060405280519060200120905081815550505050565b5f60605f5f90505b8351811015612a8e5781848281518110612a5757612a56613c5a565b5b6020026020010151604051602001612a7092919061448a565b60405160208183030381529060405291508080600101915050612a3a565b508080519060200120915050919050565b5f60605f5f90505b8351811015612b08575f612ad4858381518110612ac757612ac6613c5a565b5b6020026020010151612c7a565b90508281604051602001612ae99291906144f2565b6040516020818303038152906040529250508080600101915050612aa7565b508080519060200120915050919050565b5f5f848301359150602083019050935093915050565b5f8282604051602001612b43929190614583565b60405160208183030381529060405280519060200120905092915050565b5f838383604051602001612b7793929190614603565b6040516020818303038152906040528051906020012090509392505050565b5f81604051602001612ba89190614694565b604051602081830303815290604052805190602001209050919050565b5f5f612bd58460200151846118de565b90505f612be185611982565b90508181604051602001612bf6929190613ebb565b604051602081830303815290604052805190602001209250505092915050565b5f81604051602001612c289190614703565b604051602081830303815290604052805190602001209050919050565b5f838383604051602001612c5b93929190614772565b6040516020818303038152906040528051906020012090509392505050565b5f7f0603985259a953da1f65a522f589c17bd1d0117ec1d3abb7c0788aef251ef437825f01518360200151846040015180519060200120856060015186608001518760a001518860c00151604051602001612cdc9897969594939291906147b9565b604051602081830303815290604052805190602001209050919050565b6040518061012001604052805f60ff1681526020015f15158152602001606081526020015f81526020015f8152602001606081526020015f81526020015f8152602001606081525090565b6040518060e001604052805f73ffffffffffffffffffffffffffffffffffffffff1681526020015f8152602001606081526020015f81526020015f151581526020015f151581526020015f81525090565b60405180604001604052805f81526020015f81525090565b5f604051905090565b5f5ffd5b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f612de782612dbe565b9050919050565b612df781612ddd565b8114612e01575f5ffd5b50565b5f81359050612e1281612dee565b92915050565b5f60208284031215612e2d57612e2c612db6565b5b5f612e3a84828501612e04565b91505092915050565b5f819050919050565b612e5581612e43565b8114612e5f575f5ffd5b50565b5f81359050612e7081612e4c565b92915050565b5f5ffd5b5f5ffd5b5f5ffd5b5f5f83601f840112612e9757612e96612e76565b5b8235905067ffffffffffffffff811115612eb457612eb3612e7a565b5b602083019150836001820283011115612ed057612ecf612e7e565b5b9250929050565b5f5f5f60408486031215612eee57612eed612db6565b5b5f612efb86828701612e62565b935050602084013567ffffffffffffffff811115612f1c57612f1b612dba565b5b612f2886828701612e82565b92509250509250925092565b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b612f6881612f34565b82525050565b5f602082019050612f815f830184612f5f565b92915050565b5f5f5f5f60408587031215612f9f57612f9e612db6565b5b5f85013567ffffffffffffffff811115612fbc57612fbb612dba565b5b612fc887828801612e82565b9450945050602085013567ffffffffffffffff811115612feb57612fea612dba565b5b612ff787828801612e82565b925092505092959194509250565b61300e81612e43565b82525050565b5f6020820190506130275f830184613005565b92915050565b5f6020828403121561304257613041612db6565b5b5f61304f84828501612e62565b91505092915050565b61306181612ddd565b82525050565b5f60208201905061307a5f830184613058565b92915050565b5f5f6020838503121561309657613095612db6565b5b5f83013567ffffffffffffffff8111156130b3576130b2612dba565b5b6130bf85828601612e82565b92509250509250929050565b5f819050919050565b6130dd816130cb565b81146130e7575f5ffd5b50565b5f813590506130f8816130d4565b92915050565b5f6020828403121561311357613112612db6565b5b5f613120848285016130ea565b91505092915050565b613132816130cb565b82525050565b5f60208201905061314b5f830184613129565b92915050565b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b61319b82613155565b810181811067ffffffffffffffff821117156131ba576131b9613165565b5b80604052505050565b5f6131cc612dad565b90506131d88282613192565b919050565b5f5ffd5b5f60ff82169050919050565b6131f6816131e1565b8114613200575f5ffd5b50565b5f81359050613211816131ed565b92915050565b5f8115159050919050565b61322b81613217565b8114613235575f5ffd5b50565b5f8135905061324681613222565b92915050565b5f67ffffffffffffffff82111561326657613265613165565b5b602082029050602081019050919050565b5f5ffd5b5f67ffffffffffffffff82111561329557613294613165565b5b61329e82613155565b9050602081019050919050565b828183375f83830152505050565b5f6132cb6132c68461327b565b6131c3565b9050828152602081018484840111156132e7576132e6613277565b5b6132f28482856132ab565b509392505050565b5f82601f83011261330e5761330d612e76565b5b813561331e8482602086016132b9565b91505092915050565b5f60e0828403121561333c5761333b613151565b5b61334660e06131c3565b90505f61335584828501612e04565b5f830152506020613368848285016130ea565b602083015250604082013567ffffffffffffffff81111561338c5761338b6131dd565b5b613398848285016132fa565b60408301525060606133ac848285016130ea565b60608301525060806133c084828501613238565b60808301525060a06133d484828501613238565b60a08301525060c06133e8848285016130ea565b60c08301525092915050565b5f6134066134018461324c565b6131c3565b9050808382526020820190506020840283018581111561342957613428612e7e565b5b835b8181101561347057803567ffffffffffffffff81111561344e5761344d612e76565b5b80860161345b8982613327565b8552602085019450505060208101905061342b565b5050509392505050565b5f82601f83011261348e5761348d612e76565b5b813561349e8482602086016133f4565b91505092915050565b5f67ffffffffffffffff8211156134c1576134c0613165565b5b602082029050602081019050919050565b5f6134e46134df846134a7565b6131c3565b9050808382526020820190506020840283018581111561350757613506612e7e565b5b835b81811015613530578061351c8882612e04565b845260208401935050602081019050613509565b5050509392505050565b5f82601f83011261354e5761354d612e76565b5b813561355e8482602086016134d2565b91505092915050565b5f610120828403121561357d5761357c613151565b5b6135886101206131c3565b90505f61359784828501613203565b5f8301525060206135aa84828501613238565b602083015250604082013567ffffffffffffffff8111156135ce576135cd6131dd565b5b6135da8482850161347a565b60408301525060606135ee848285016130ea565b6060830152506080613602848285016130ea565b60808301525060a082013567ffffffffffffffff811115613626576136256131dd565b5b613632848285016132fa565b60a08301525060c061364684828501612e62565b60c08301525060e061365a84828501612e62565b60e08301525061010082013567ffffffffffffffff81111561367f5761367e6131dd565b5b61368b8482850161353a565b6101008301525092915050565b5f5f5f604084860312156136af576136ae612db6565b5b5f84013567ffffffffffffffff8111156136cc576136cb612dba565b5b6136d886828701613567565b935050602084013567ffffffffffffffff8111156136f9576136f8612dba565b5b61370586828701612e82565b92509250509250925092565b61371a81613217565b82525050565b5f60c0820190506137335f830189613129565b6137406020830188613129565b61374d6040830187613711565b61375a6060830186613005565b6137676080830185613129565b61377460a0830184613005565b979650505050505050565b5f6bffffffffffffffffffffffff82169050919050565b61379f8161377f565b81146137a9575f5ffd5b50565b5f813590506137ba81613796565b92915050565b5f5f5f606084860312156137d7576137d6612db6565b5b5f6137e486828701612e62565b93505060206137f586828701612e04565b9250506040613806868287016137ac565b9150509250925092565b613819816131e1565b82525050565b61382881613217565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b61386081612ddd565b82525050565b61386f816130cb565b82525050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f6138a782613875565b6138b1818561387f565b93506138c181856020860161388f565b6138ca81613155565b840191505092915050565b5f60e083015f8301516138ea5f860182613857565b5060208301516138fd6020860182613866565b5060408301518482036040860152613915828261389d565b915050606083015161392a6060860182613866565b50608083015161393d608086018261381f565b5060a083015161395060a086018261381f565b5060c083015161396360c0860182613866565b508091505092915050565b5f61397983836138d5565b905092915050565b5f602082019050919050565b5f6139978261382e565b6139a18185613838565b9350836020820285016139b385613848565b805f5b858110156139ee57848403895281516139cf858261396e565b94506139da83613981565b925060208a019950506001810190506139b6565b50829750879550505050505092915050565b613a0981612e43565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f613a438383613857565b60208301905092915050565b5f602082019050919050565b5f613a6582613a0f565b613a6f8185613a19565b9350613a7a83613a29565b805f5b83811015613aaa578151613a918882613a38565b9750613a9c83613a4f565b925050600181019050613a7d565b5085935050505092915050565b5f61012083015f830151613acd5f860182613810565b506020830151613ae0602086018261381f565b5060408301518482036040860152613af8828261398d565b9150506060830151613b0d6060860182613866565b506080830151613b206080860182613866565b5060a083015184820360a0860152613b38828261389d565b91505060c0830151613b4d60c0860182613a00565b5060e0830151613b6060e0860182613a00565b50610100830151848203610100860152613b7a8282613a5b565b9150508091505092915050565b5f82825260208201905092915050565b5f613ba28385613b87565b9350613baf8385846132ab565b613bb883613155565b840190509392505050565b5f6040820190508181035f830152613bdb8186613ab7565b90508181036020830152613bf0818486613b97565b9050949350505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f613c31826130cb565b9150613c3c836130cb565b9250828201905080821115613c5457613c53613bfa565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b613c908161377f565b82525050565b5f606082019050613ca95f830186613005565b613cb66020830185613058565b613cc36040830184613c87565b949350505050565b5f604082019050613cde5f830185613005565b613ceb6020830184613129565b9392505050565b5f5ffd5b5f5ffd5b5f5f85851115613d0d57613d0c613cf2565b5b83861115613d1e57613d1d613cf6565b5b6001850283019150848603905094509492505050565b5f606082019050613d475f830186613129565b613d546020830185613129565b613d616040830184613129565b949350505050565b5f604082019050613d7c5f830185613129565b613d896020830184613129565b9392505050565b5f6060820190508181035f830152613da88186613ab7565b9050613db76020830185613129565b613dc46040830184613129565b949350505050565b5f613dd682613875565b613de08185613b87565b9350613df081856020860161388f565b613df981613155565b840191505092915050565b5f6060820190508181035f830152613e1c8186613ab7565b9050613e2b6020830185613129565b8181036040830152613e3d8184613dcc565b9050949350505050565b5f81905092915050565b7f19010000000000000000000000000000000000000000000000000000000000005f82015250565b5f613e85600283613e47565b9150613e9082613e51565b600282019050919050565b5f819050919050565b613eb5613eb082612e43565b613e9b565b82525050565b5f613ec582613e79565b9150613ed18285613ea4565b602082019150613ee18284613ea4565b6020820191508190509392505050565b5f604082019050613f045f830185613005565b613f116020830184613005565b9392505050565b5f604082019050613f2b5f830185613058565b8181036020830152613f3d8184613dcc565b90509392505050565b5f81519050613f5481612e4c565b92915050565b5f81519050613f68816130d4565b92915050565b5f60408284031215613f8357613f82613151565b5b613f8d60406131c3565b90505f613f9c84828501613f46565b5f830152506020613faf84828501613f5a565b60208301525092915050565b5f60408284031215613fd057613fcf612db6565b5b5f613fdd84828501613f6e565b91505092915050565b604082015f820151613ffa5f850182613a00565b50602082015161400d6020850182613866565b50505050565b5f6040820190506140265f830184613fe6565b92915050565b5f60a08201905061403f5f830188613005565b61404c6020830187613005565b6140596040830186613005565b6140666060830185613129565b6140736080830184613058565b9695505050505050565b5f60a0820190506140905f830188613005565b61409d6020830187613005565b6140aa6040830186613129565b6140b76060830185613129565b6140c46080830184613005565b9695505050505050565b5f6060820190506140e15f830186613005565b6140ee6020830185613005565b6140fb6040830184613005565b949350505050565b5f82825260208201905092915050565b7f556e737570706f72746564206b696e64000000000000000000000000000000005f82015250565b5f614147601083614103565b915061415282614113565b602082019050919050565b5f6020820190508181035f8301526141748161413b565b9050919050565b5f6060820190508181035f830152614194818688613b97565b90506141a36020830185613129565b6141b06040830184613129565b95945050505050565b6141c2816131e1565b82525050565b5f6080820190506141db5f830187613005565b6141e860208301866141b9565b6141f56040830185613005565b6142026060830184613005565b95945050505050565b5f60408201905061421e5f830186613005565b8181036020830152614231818486613b97565b9050949350505050565b61424481612f34565b811461424e575f5ffd5b50565b5f8151905061425f8161423b565b92915050565b5f6020828403121561427a57614279612db6565b5b5f61428784828501614251565b91505092915050565b5f6080820190508181035f8301526142a88188613ab7565b90506142b76020830187613005565b6142c46040830186613058565b81810360608301526142d7818486613b97565b90509695505050505050565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000005f82015250565b5f614317601c83613e47565b9150614322826142e3565b601c82019050919050565b5f6143378261430b565b91506143438284613ea4565b60208201915081905092915050565b5f6040820190508181035f83015261436a8186613ab7565b9050818103602083015261437f818486613b97565b9050949350505050565b5f6020828403121561439e5761439d612db6565b5b5f6143ab84828501613f46565b91505092915050565b7fff000000000000000000000000000000000000000000000000000000000000005f82015250565b5f6143e8600183613e47565b91506143f3826143b4565b600182019050919050565b5f8160601b9050919050565b5f614414826143fe565b9050919050565b5f6144258261440a565b9050919050565b61443d61443882612ddd565b61441b565b82525050565b5f61444d826143dc565b9150614459828661442c565b6014820191506144698285613ea4565b6020820191506144798284613ea4565b602082019150819050949350505050565b5f6040820190508181035f8301526144a28185613dcc565b90506144b16020830184613058565b9392505050565b5f81905092915050565b5f6144cc82613875565b6144d681856144b8565b93506144e681856020860161388f565b80840191505092915050565b5f6144fd82856144c2565b91506145098284613ea4565b6020820191508190509392505050565b7f53657175656e6365207369676e65723a0a0000000000000000000000000000005f82015250565b5f61454d601183613e47565b915061455882614519565b601182019050919050565b5f819050919050565b61457d614578826130cb565b614563565b82525050565b5f61458d82614541565b9150614599828561442c565b6014820191506145a9828461456c565b6020820191508190509392505050565b7f53657175656e6365206e657374656420636f6e6669673a0a00000000000000005f82015250565b5f6145ed601883613e47565b91506145f8826145b9565b601882019050919050565b5f61460d826145e1565b91506146198286613ea4565b602082019150614629828561456c565b602082019150614639828461456c565b602082019150819050949350505050565b7f53657175656e636520737461746963206469676573743a0a00000000000000005f82015250565b5f61467e601883613e47565b91506146898261464a565b601882019050919050565b5f61469e82614672565b91506146aa8284613ea4565b60208201915081905092915050565b7f53657175656e636520616e792061646472657373207375626469676573743a0a5f82015250565b5f6146ed602083613e47565b91506146f8826146b9565b602082019050919050565b5f61470d826146e1565b91506147198284613ea4565b60208201915081905092915050565b7f53657175656e63652073617069656e7420636f6e6669673a0a000000000000005f82015250565b5f61475c601983613e47565b915061476782614728565b601982019050919050565b5f61477c82614750565b9150614788828661442c565b601482019150614798828561456c565b6020820191506147a88284613ea4565b602082019150819050949350505050565b5f610100820190506147cd5f83018b613005565b6147da602083018a613058565b6147e76040830189613129565b6147f46060830188613005565b6148016080830187613129565b61480e60a0830186613711565b61481b60c0830185613711565b61482860e0830184613129565b999850505050505050505056fea2646970667358221220f41a2cafcfaaf9a434d101136c270da163ce69d7f9b39ccf8b5293b3277b06f264736f6c634300081c00336080604052348015600e575f5ffd5b506146be8061001c5f395ff3fe608060405234801561000f575f5ffd5b50600436106100a7575f3560e01c80636ea445771161006f5780636ea445771461014d5780638c3f556314610169578063aaf10f4214610199578063ad55366b146101b7578063ca707850146101ec578063f727ef1c1461021c576100a7565b8063025b22bc146100ab5780631626ba7e146100c75780631f6a1eb9146100f7578063295614261461011357806351605d801461012f575b5f5ffd5b6100c560048036038101906100c09190612cfc565b610238565b005b6100e160048036038101906100dc9190612dbb565b6102b4565b6040516100ee9190612e52565b60405180910390f35b610111600480360381019061010c9190612e6b565b61030e565b005b61012d60048036038101906101289190612ee9565b610397565b005b610137610413565b6040516101449190612f23565b60405180910390f35b61016760048036038101906101629190612f3c565b610444565b005b610183600480360381019061017e9190612fba565b6104dd565b6040516101909190612ff4565b60405180910390f35b6101a1610515565b6040516101ae919061301c565b60405180910390f35b6101d160048036038101906101cc919061357c565b610523565b6040516101e396959493929190613604565b60405180910390f35b6102066004803603810190610201919061357c565b610561565b6040516102139190612f23565b60405180910390f35b610236600480360381019061023191906136a4565b610710565b005b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102a857336040517fa19dbf0000000000000000000000000000000000000000000000000000000000815260040161029f919061301c565b60405180910390fd5b6102b1816107d9565b50565b5f6102bd612bdd565b6003815f019060ff16908160ff1681525050848160e00181815250505f6102e582868661081c565b509050806102fa575f60e01b92505050610307565b6320c13b0b60e01b925050505b9392505050565b5f6103198585610985565b905061032d81606001518260800151610e27565b5f5f61033a83868661081c565b9150915081610384578285856040517fa2b6d61b00000000000000000000000000000000000000000000000000000000815260040161037b93929190613aa7565b60405180910390fd5b61038e8184610ecb565b50505050505050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461040757336040517fa19dbf000000000000000000000000000000000000000000000000000000000081526004016103fe919061301c565b60405180910390fd5b61041081611149565b50565b5f61043f7fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85f1b6111ea565b905090565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104b457336040517fa19dbf000000000000000000000000000000000000000000000000000000000081526004016104ab919061301c565b60405180910390fd5b5f6104bf8383610985565b90505f6104cb826111f4565b90506104d78183610ecb565b50505050565b5f61050c7f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e5f1b835f1b611244565b5f1c9050919050565b5f61051e61127c565b905090565b5f5f5f5f5f5f6105368989895f5f611284565b809550819650829750839950849a505050505050610553836115c1565b935093975093979195509350565b5f5f6001856101000151516105769190613b0b565b67ffffffffffffffff81111561058f5761058e613049565b5b6040519080825280602002602001820160405280156105bd5781602001602082028036833780820191505090505b5090505f5f90505b8561010001515181101561064d5785610100015181815181106105eb576105ea613b3e565b5b602002602001015182828151811061060657610605613b3e565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505080806001019150506105c5565b503381866101000151518151811061066857610667613b3e565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050808561010001819052505f6106b886868661081c565b50905080610701578585856040517ff58cc8b50000000000000000000000000000000000000000000000000000000081526004016106f893929190613aa7565b60405180910390fd5b60015f1b925050509392505050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461078057336040517fa19dbf00000000000000000000000000000000000000000000000000000000008152600401610777919061301c565b60405180910390fd5b6107998383836bffffffffffffffffffffffff166115d2565b7febf265acfac1c01de588ed7ef49743b9c3ce8d6d1edeaf510a1f5453228515b18383836040516107cc93929190613b7a565b60405180910390a1505050565b6107e281611630565b7f310ba5f1d2ed074b51e2eccd052a47ae9ab7c6b800d1fca3db3999d6a592ca0381604051610811919061301c565b60405180910390a150565b5f5f5f84845f81811061083257610831613b3e565b5b9050013560f81c60f81b9050608060f81b608060f81b82167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19160361094b5761087a866111f4565b91505f5f61088784611636565b91509150428110156108d25783816040517f9fa4fe540000000000000000000000000000000000000000000000000000000081526004016108c9929190613baf565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16148061093757503373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b15610948576001945050505061097d565b50505b5f5f5f61095b8989895f5f611284565b905080985081945082955083965050505050610976816115c1565b9550505050505b935093915050565b61098d612bdd565b5f815f019060ff16908160ff16815250505f5f6109aa8585611687565b915060ff1691506001808316036109ca575f836060018181525050610a06565b6109df81868661169d9290919263ffffffff16565b8173ffffffffffffffffffffffffffffffffffffffff169150846060018193508281525050505b5f6007600184901c1690505f811115610a4357610a35828288886116ce9190939291909392919063ffffffff16565b856080018194508281525050505b5f601080851603610a575760019050610aaf565b602080851603610a8a57610a768388886116fb9290919263ffffffff16565b8161ffff1691508094508192505050610aae565b610a9f83888861171a9290919263ffffffff16565b8160ff16915080945081925050505b5b8067ffffffffffffffff811115610ac957610ac8613049565b5b604051908082528060200260200182016040528015610b0257816020015b610aef612c28565b815260200190600190039081610ae75790505b5085604001819052505f5f90505b81811015610e1c575f610b2e858a8a61171a9290919263ffffffff16565b8096508192505050600180821660ff1603610b9d573087604001518381518110610b5b57610b5a613b3e565b5b60200260200101515f019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050610c09565b610bb2858a8a6117359290919263ffffffff16565b88604001518481518110610bc957610bc8613b3e565b5b60200260200101515f018197508273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050505b600280821660ff1603610c5757610c2b858a8a6117669290919263ffffffff16565b88604001518481518110610c4257610c41613b3e565b5b60200260200101516020018197508281525050505b600480821660ff1603610d1f575f610c7a868b8b61177c9290919263ffffffff16565b8162ffffff1691508097508192505050898987908389610c9a9190613b0b565b92610ca793929190613bde565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f8201169050808301925050505050505088604001518481518110610d0057610cff613b3e565b5b6020026020010151604001819052508086610d1b9190613b0b565b9550505b600880821660ff1603610d6d57610d41858a8a6117669290919263ffffffff16565b88604001518481518110610d5857610d57613b3e565b5b60200260200101516060018197508281525050505b601080821660ff161487604001518381518110610d8d57610d8c613b3e565b5b60200260200101516080019015159081151581525050602080821660ff161487604001518381518110610dc357610dc2613b3e565b5b602002602001015160a0019015159081151581525050600660c0821660ff16901c60ff1687604001518381518110610dfe57610dfd613b3e565b5b602002602001015160c0018181525050508080600101915050610b10565b505050505092915050565b5f610e31836104dd565b9050818114610e7b578282826040517f9b6514f4000000000000000000000000000000000000000000000000000000008152600401610e7293929190613c18565b60405180910390fd5b5f600183019050610e8c848261179c565b7f1f180c27086c7a39ea2a7b25239d1ab92348f07ca7bb59d1438fcf527568f8818482604051610ebd929190613c4d565b60405180910390a150505050565b5f5f90505f82604001515190505f5f90505b81811015611142575f84604001518281518110610efd57610efc613b3e565b5b602002602001015190508060a001518015610f16575083155b15610f5d575f93507fa7df37e35254f22900087bd61c5b68001c8f034f7e924ec565af11317d7ee0f78683604051610f4f929190613baf565b60405180910390a150611135565b5f816060015190505f8114158015610f745750805a105b15610fba5785835a6040517f21395274000000000000000000000000000000000000000000000000000000008152600401610fb193929190613c74565b60405180910390fd5b5f826080015115610fde57610fd7835f01518385604001516117d1565b9050610ff8565b610ff5835f015184602001518486604001516117e6565b90505b806110f8575f60ff168360c001510361105057600195507fe64040c2a394fc50904b208b60495abbcf56a8eff89806cada4162c27dd5f6438885604051611040929190613baf565b60405180910390a1505050611135565b600160ff168360c00151036110a75786846110696117fd565b6040517f7f6b0bb100000000000000000000000000000000000000000000000000000000815260040161109e93929190613ce8565b60405180910390fd5b600260ff168360c00151036110f7577f6cd433d189cb0ff58b321e23f3e510c9d0f019f2230a2066e50962d4f867c0a888856040516110e7929190613baf565b60405180910390a1505050611142565b5b7f2fd98f16e3e0ef7b9373ea49ea6b76b871c7f2aa1e2c222747ef5bfb26de18b38885604051611129929190613baf565b60405180910390a15050505b8080600101915050610edd565b5050505050565b5f5f1b8103611184576040517f4294d12700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6111b07fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85f1b8261181b565b7f307ed6bd941ee9fc80f369c94af5fa11e25bab5102a6140191756c5474a30bfa816040516111df9190612f23565b60405180910390a150565b5f81549050919050565b5f5f611204836020015130611822565b90505f611210846118c6565b90508181604051602001611225929190613d9f565b6040516020818303038152906040528051906020012092505050919050565b5f5f8383604051602001611259929190613dd5565b604051602081830303815290604052805190602001209050805491505092915050565b5f3054905090565b5f5f5f5f5f5f5f6112958b8b611687565b915060ff1691506112a4612c79565b60408084161480156112e157505f73ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff16145b1561141d576112fb828d8d6117359290919263ffffffff16565b809350819a5050508961141c575f61131e838e8e61177c9290919263ffffffff16565b8162ffffff16915080945081925050505f8d8d8590848761133f9190613b0b565b9261134c93929190613bde565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f8201169050808301925050505050505090508a73ffffffffffffffffffffffffffffffffffffffff1663ccce3bc830836040518363ffffffff1660e01b81526004016113cb929190613dfc565b6040805180830381865afa1580156113e5573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906114099190613e9f565b925081846114179190613b0b565b935050505b5b600180841603611456576114448d8a838f8f8790809261143f93929190613bde565b611ad7565b975097509750975097505050506115b4565b6002808416148d60200190151590811515815250505f6002601c8516901c905061149283828f8f6116ce9190939291909392919063ffffffff16565b8094508197505050505f6001600560208616901c6114b09190613b0b565b90506114ce83828f8f6116ce9190939291909392919063ffffffff16565b809450819a505050506114e08d6111f4565b93506114fe8d858e8e869080926114f993929190613bde565b611d1b565b809750819850505061151286895f1b61288a565b955061152086865f1b61288a565b9550611544868a73ffffffffffffffffffffffffffffffffffffffff165f1b61288a565b95505f5f1b815f01511415801561155e575085815f015114155b801561156e575080602001518511155b156115b057806040517fccbb534f0000000000000000000000000000000000000000000000000000000081526004016115a79190613ef7565b60405180910390fd5b5050505b9550955095509550959050565b5f6115cb8261289e565b9050919050565b61162b7fc852adf5e97c2fc3b38f405671e91b7af1697ef0287577f227ef10494c2a8e865f1b846bffffffffffffffffffffffff841660608673ffffffffffffffffffffffffffffffffffffffff16901b175f1b6128e1565b505050565b80305550565b5f5f5f6116657fc852adf5e97c2fc3b38f405671e91b7af1697ef0287577f227ef10494c2a8e865f1b85611244565b5f1c9050606081901c816bffffffffffffffffffffffff169250925050915091565b5f5f83358060f81c925060019150509250929050565b5f5f8483013573ffffffffffffffffffffffffffffffffffffffff8160601c16925060148401915050935093915050565b5f5f858401356008840261010003600180866008021b0382821c1693508486019250505094509492505050565b5f5f8483013561ffff8160f01c16925060028401915050935093915050565b5f5f848301358060f81c925060018401915050935093915050565b5f5f8483013573ffffffffffffffffffffffffffffffffffffffff8160601c16925060148401915050935093915050565b5f5f848301359150602083019050935093915050565b5f5f8483013562ffffff8160e81c16925060038401915050935093915050565b6117cd7f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e5f1b835f1b835f1b6128e1565b5050565b5f5f5f8351602085018787f490509392505050565b5f5f5f835160208501878988f19050949350505050565b60603d604051915060208201818101604052818352815f823e505090565b8082555050565b5f7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f7f4aa45ca7ad825ceb1bf35643f0a58c295239df563b1b565c2485f96477c563187f2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de856118915746611893565b5f5b856040516020016118a8959493929190613f10565b60405160208183030381529060405280519060200120905092915050565b5f5f6118d6836101000151612916565b90505f60ff16835f015160ff1603611958575f6118f68460400151612983565b90507f11e1e4079a79a66e4ade50033cfe2678cdd5341d2dfe5ef9513edb1a0be147a2818560600151866080015185604051602001611939959493929190613f61565b6040516020818303038152906040528051906020012092505050611ad2565b600160ff16835f015160ff16036119c7577fe19a3b94fc3c7ece3f890d98a99bc422615537a08dea0603fa8425867d87d4668360a0015180519060200120826040516020016119a993929190613fb2565b60405160208183030381529060405280519060200120915050611ad2565b600260ff16835f015160ff1603611a2f577f11fdeb7e8373a1aa96bfac8d0ea91526b2c5d15e5cee20e0543e780258f3e8e48360c0015182604051602001611a1193929190613fb2565b60405160208183030381529060405280519060200120915050611ad2565b600360ff16835f015160ff1603611a97577f402e923b91e918306019e73f589362164a6a059499a504699c66feabbb3e26248360e0015182604051602001611a7993929190613fb2565b60405160208183030381529060405280519060200120915050611ad2565b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ac990614041565b60405180910390fd5b919050565b5f5f5f5f5f611ae4612bdd565b6002815f019060ff16908160ff16815250505f5f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90505b89899050821015611ca5575f5f611b3e848d8d61177c9290919263ffffffff16565b8162ffffff16915080955081925050508381611b5a9190613b0b565b9150505f8b8b90508214611b6e575f611b70565b8d5b90505f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8414611ba05785611ba2565b8f5b9050611bc2818e8e88908792611bba93929190613bde565b600186611284565b50809b50819c50829d50839e50505050508a8a1015611c2e578c8c86908592611bed93929190613bde565b8c8c6040517fb006aba0000000000000000000000000000000000000000000000000000000008152600401611c25949392919061405f565b60405180910390fd5b829450888e5f015103611c47575f5f1b8e5f0181815250505b838810611c8d5787846040517f37daf62b000000000000000000000000000000000000000000000000000000008152600401611c84929190613c4d565b60405180910390fd5b888660c0018181525050879350829450505050611b1c565b5f5f1b8b5f015114158015611cbe57508a602001518511155b15611d00578a6040517fccbb534f000000000000000000000000000000000000000000000000000000008152600401611cf79190613ef7565b60405180910390fd5b611d098d6111f4565b93505050509550955095509550959050565b5f5f5f5b84849050811015612880575f611d4082878761171a9290919263ffffffff16565b8160ff16915080935081925050505f600460f08316901c90505f8103611e98575f600f831690505f8160ff1603611d8f57611d8684898961171a9290919263ffffffff16565b80955081925050505b5f5f611da6868b8b6129fd9290919263ffffffff16565b8097508193505050611dc3868b8b6129fd9290919263ffffffff16565b80975081925050505f60ff82901c5f1c90505f7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff835f1c165f1b90505f601b830190505f60018f8388866040515f8152602001604052604051611e2994939291906140ac565b6020604051602081039080840390855afa158015611e49573d5f5f3e3d5ffd5b5050506020604051035190508660ff168c019b505f611e6b828960ff16612a13565b90505f5f1b8c03611e7c5780611e87565b611e868c8261288a565b5b9b5050505050505050505050611d1f565b60018103611f23575f600f831690505f8160ff1603611ecf57611ec684898961171a9290919263ffffffff16565b80955081925050505b5f611ee5858a8a6117359290919263ffffffff16565b80965081925050505f611efb828460ff16612a13565b90505f5f1b8703611f0c5780611f17565b611f16878261288a565b5b96505050505050611d1f565b60028103612114575f6003831690505f8160ff1603611f5a57611f5184898961171a9290919263ffffffff16565b80955081925050505b5f611f70858a8a6117359290919263ffffffff16565b80965081925050505f6002600c861660ff16901c60ff1690505f611fa687838d8d6116ce9190939291909392919063ffffffff16565b80985081925050505f81880190506320c13b0b60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168473ffffffffffffffffffffffffffffffffffffffff16631626ba7e8f8f8f8d90879261200a93929190613bde565b6040518463ffffffff1660e01b8152600401612028939291906140ef565b602060405180830381865afa158015612043573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906120679190614149565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146120d0578d8d858e8e6040517ff734863a0000000000000000000000000000000000000000000000000000000081526004016120c7959493929190614174565b60405180910390fd5b8097508460ff168a0199505f6120e9858760ff16612a13565b90505f5f1b8a036120fa5780612105565b6121048a8261288a565b5b99505050505050505050611d1f565b6003810361215e575f6121328489896129fd9290919263ffffffff16565b80955081925050505f5f1b85036121495780612154565b612153858261288a565b5b9450505050611d1f565b600481036121e0575f600f831660ff1690505f61218d85838b8b6116ce9190939291909392919063ffffffff16565b80965081925050505f81860190505f5f6121b98e8e8e8e8c9088926121b493929190613bde565b611d1b565b91509150829750818a0199506121cf898261288a565b985082975050505050505050611d1f565b600681036122f0575f6002600c841660ff16901c60ff1690505f81036122245761221584898961171a9290919263ffffffff16565b8160ff16915080955081925050505b5f6003841660ff1690505f810361225a5761224a858a8a6116fb9290919263ffffffff16565b8161ffff16915080965081925050505b5f612270868b8b61177c9290919263ffffffff16565b8162ffffff16915080975081925050505f81870190505f5f6122a48f8f8f8f8d90889261229f93929190613bde565b611d1b565b915091508298508482106122b857858b019a505b5f6122c4828789612a45565b90505f5f1b8b036122d557806122e0565b6122df8b8261288a565b5b9a50505050505050505050611d1f565b60058103612372575f61230e8489896129fd9290919263ffffffff16565b8095508192505050888103612341577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff95505b5f61234b82612a7a565b90505f5f1b860361235c5780612367565b612366868261288a565b5b955050505050611d1f565b600781036124d8575f600f831690505f8160ff16036123a9576123a084898961171a9290919263ffffffff16565b80955081925050505b5f5f6123c0868b8b6129fd9290919263ffffffff16565b80975081935050506123dd868b8b6129fd9290919263ffffffff16565b80975081925050505f60ff82901c5f1c90505f7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff835f1c165f1b90505f601b830190505f60018f6040516020016124349190614211565b604051602081830303815290604052805190602001208388866040515f815260200160405260405161246994939291906140ac565b6020604051602081039080840390855afa158015612489573d5f5f3e3d5ffd5b5050506020604051035190508660ff168c019b505f6124ab828960ff16612a13565b90505f5f1b8c036124bc57806124c7565b6124c68c8261288a565b5b9b5050505050505050505050611d1f565b60088103612571575f6124f68489896129fd9290919263ffffffff16565b80955081925050505f6125125f8c612aa990919063ffffffff16565b905080820361253f577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff96505b5f61254982612afa565b90505f5f1b870361255a5780612565565b612564878261288a565b5b96505050505050611d1f565b600981036126da575f6003831690505f8160ff16036125a85761259f84898961171a9290919263ffffffff16565b80955081925050505b5f6125be858a8a6117359290919263ffffffff16565b80965081925050505f5f6002600c871660ff16901c60ff1690506125f487828d8d6116ce9190939291909392919063ffffffff16565b8098508193505050505f81870190505f8373ffffffffffffffffffffffffffffffffffffffff1663ca7078508f8e8e8c90879261263393929190613bde565b6040518463ffffffff1660e01b815260040161265193929190614236565b602060405180830381865afa15801561266c573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190612690919061426d565b90508197508460ff168a0199505f6126ac858760ff1684612b29565b90505f5f1b8a036126bd57806126c8565b6126c78a8261288a565b5b99508298505050505050505050611d1f565b600a8103612843575f6003831690505f8160ff16036127115761270884898961171a9290919263ffffffff16565b80955081925050505b5f612727858a8a6117359290919263ffffffff16565b80965081925050505f6002600c861660ff16901c60ff1690505f61275d87838d8d6116ce9190939291909392919063ffffffff16565b80985081925050505f81880190505f8473ffffffffffffffffffffffffffffffffffffffff1663957d2b238f8f8f8d90879261279b93929190613bde565b6040518463ffffffff1660e01b81526004016127b9939291906140ef565b602060405180830381865afa1580156127d4573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906127f8919061426d565b90508198508560ff168b019a505f612814868860ff1684612b29565b90505f5f1b8b036128255780612830565b61282f8b8261288a565b5b9a50829950505050505050505050611d1f565b806040517fb2505f7c0000000000000000000000000000000000000000000000000000000081526004016128779190612ff4565b60405180910390fd5b5094509492505050565b5f825f528160205260405f20905092915050565b5f5f5f1b82141580156128da57506128d77fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85f1b6111ea565b82145b9050919050565b5f83836040516020016128f5929190613dd5565b60405160208183030381529060405280519060200120905081815550505050565b5f60605f5f90505b8351811015612972578184828151811061293b5761293a613b3e565b5b6020026020010151604051602001612954929190614298565b6040516020818303038152906040529150808060010191505061291e565b508080519060200120915050919050565b5f60605f5f90505b83518110156129ec575f6129b88583815181106129ab576129aa613b3e565b5b6020026020010151612b5e565b905082816040516020016129cd929190614300565b604051602081830303815290604052925050808060010191505061298b565b508080519060200120915050919050565b5f5f848301359150602083019050935093915050565b5f8282604051602001612a279291906143d6565b60405160208183030381529060405280519060200120905092915050565b5f838383604051602001612a5b93929190614456565b6040516020818303038152906040528051906020012090509392505050565b5f81604051602001612a8c91906144e7565b604051602081830303815290604052805190602001209050919050565b5f5f612ab9846020015184611822565b90505f612ac5856118c6565b90508181604051602001612ada929190613d9f565b604051602081830303815290604052805190602001209250505092915050565b5f81604051602001612b0c9190614556565b604051602081830303815290604052805190602001209050919050565b5f838383604051602001612b3f939291906145c5565b6040516020818303038152906040528051906020012090509392505050565b5f7f0603985259a953da1f65a522f589c17bd1d0117ec1d3abb7c0788aef251ef437825f01518360200151846040015180519060200120856060015186608001518760a001518860c00151604051602001612bc098979695949392919061460c565b604051602081830303815290604052805190602001209050919050565b6040518061012001604052805f60ff1681526020015f15158152602001606081526020015f81526020015f8152602001606081526020015f81526020015f8152602001606081525090565b6040518060e001604052805f73ffffffffffffffffffffffffffffffffffffffff1681526020015f8152602001606081526020015f81526020015f151581526020015f151581526020015f81525090565b60405180604001604052805f81526020015f81525090565b5f604051905090565b5f5ffd5b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f612ccb82612ca2565b9050919050565b612cdb81612cc1565b8114612ce5575f5ffd5b50565b5f81359050612cf681612cd2565b92915050565b5f60208284031215612d1157612d10612c9a565b5b5f612d1e84828501612ce8565b91505092915050565b5f819050919050565b612d3981612d27565b8114612d43575f5ffd5b50565b5f81359050612d5481612d30565b92915050565b5f5ffd5b5f5ffd5b5f5ffd5b5f5f83601f840112612d7b57612d7a612d5a565b5b8235905067ffffffffffffffff811115612d9857612d97612d5e565b5b602083019150836001820283011115612db457612db3612d62565b5b9250929050565b5f5f5f60408486031215612dd257612dd1612c9a565b5b5f612ddf86828701612d46565b935050602084013567ffffffffffffffff811115612e0057612dff612c9e565b5b612e0c86828701612d66565b92509250509250925092565b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b612e4c81612e18565b82525050565b5f602082019050612e655f830184612e43565b92915050565b5f5f5f5f60408587031215612e8357612e82612c9a565b5b5f85013567ffffffffffffffff811115612ea057612e9f612c9e565b5b612eac87828801612d66565b9450945050602085013567ffffffffffffffff811115612ecf57612ece612c9e565b5b612edb87828801612d66565b925092505092959194509250565b5f60208284031215612efe57612efd612c9a565b5b5f612f0b84828501612d46565b91505092915050565b612f1d81612d27565b82525050565b5f602082019050612f365f830184612f14565b92915050565b5f5f60208385031215612f5257612f51612c9a565b5b5f83013567ffffffffffffffff811115612f6f57612f6e612c9e565b5b612f7b85828601612d66565b92509250509250929050565b5f819050919050565b612f9981612f87565b8114612fa3575f5ffd5b50565b5f81359050612fb481612f90565b92915050565b5f60208284031215612fcf57612fce612c9a565b5b5f612fdc84828501612fa6565b91505092915050565b612fee81612f87565b82525050565b5f6020820190506130075f830184612fe5565b92915050565b61301681612cc1565b82525050565b5f60208201905061302f5f83018461300d565b92915050565b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b61307f82613039565b810181811067ffffffffffffffff8211171561309e5761309d613049565b5b80604052505050565b5f6130b0612c91565b90506130bc8282613076565b919050565b5f5ffd5b5f60ff82169050919050565b6130da816130c5565b81146130e4575f5ffd5b50565b5f813590506130f5816130d1565b92915050565b5f8115159050919050565b61310f816130fb565b8114613119575f5ffd5b50565b5f8135905061312a81613106565b92915050565b5f67ffffffffffffffff82111561314a57613149613049565b5b602082029050602081019050919050565b5f5ffd5b5f67ffffffffffffffff82111561317957613178613049565b5b61318282613039565b9050602081019050919050565b828183375f83830152505050565b5f6131af6131aa8461315f565b6130a7565b9050828152602081018484840111156131cb576131ca61315b565b5b6131d684828561318f565b509392505050565b5f82601f8301126131f2576131f1612d5a565b5b813561320284826020860161319d565b91505092915050565b5f60e082840312156132205761321f613035565b5b61322a60e06130a7565b90505f61323984828501612ce8565b5f83015250602061324c84828501612fa6565b602083015250604082013567ffffffffffffffff8111156132705761326f6130c1565b5b61327c848285016131de565b604083015250606061329084828501612fa6565b60608301525060806132a48482850161311c565b60808301525060a06132b88482850161311c565b60a08301525060c06132cc84828501612fa6565b60c08301525092915050565b5f6132ea6132e584613130565b6130a7565b9050808382526020820190506020840283018581111561330d5761330c612d62565b5b835b8181101561335457803567ffffffffffffffff81111561333257613331612d5a565b5b80860161333f898261320b565b8552602085019450505060208101905061330f565b5050509392505050565b5f82601f83011261337257613371612d5a565b5b81356133828482602086016132d8565b91505092915050565b5f67ffffffffffffffff8211156133a5576133a4613049565b5b602082029050602081019050919050565b5f6133c86133c38461338b565b6130a7565b905080838252602082019050602084028301858111156133eb576133ea612d62565b5b835b8181101561341457806134008882612ce8565b8452602084019350506020810190506133ed565b5050509392505050565b5f82601f83011261343257613431612d5a565b5b81356134428482602086016133b6565b91505092915050565b5f610120828403121561346157613460613035565b5b61346c6101206130a7565b90505f61347b848285016130e7565b5f83015250602061348e8482850161311c565b602083015250604082013567ffffffffffffffff8111156134b2576134b16130c1565b5b6134be8482850161335e565b60408301525060606134d284828501612fa6565b60608301525060806134e684828501612fa6565b60808301525060a082013567ffffffffffffffff81111561350a576135096130c1565b5b613516848285016131de565b60a08301525060c061352a84828501612d46565b60c08301525060e061353e84828501612d46565b60e08301525061010082013567ffffffffffffffff811115613563576135626130c1565b5b61356f8482850161341e565b6101008301525092915050565b5f5f5f6040848603121561359357613592612c9a565b5b5f84013567ffffffffffffffff8111156135b0576135af612c9e565b5b6135bc8682870161344b565b935050602084013567ffffffffffffffff8111156135dd576135dc612c9e565b5b6135e986828701612d66565b92509250509250925092565b6135fe816130fb565b82525050565b5f60c0820190506136175f830189612fe5565b6136246020830188612fe5565b61363160408301876135f5565b61363e6060830186612f14565b61364b6080830185612fe5565b61365860a0830184612f14565b979650505050505050565b5f6bffffffffffffffffffffffff82169050919050565b61368381613663565b811461368d575f5ffd5b50565b5f8135905061369e8161367a565b92915050565b5f5f5f606084860312156136bb576136ba612c9a565b5b5f6136c886828701612d46565b93505060206136d986828701612ce8565b92505060406136ea86828701613690565b9150509250925092565b6136fd816130c5565b82525050565b61370c816130fb565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b61374481612cc1565b82525050565b61375381612f87565b82525050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f61378b82613759565b6137958185613763565b93506137a5818560208601613773565b6137ae81613039565b840191505092915050565b5f60e083015f8301516137ce5f86018261373b565b5060208301516137e1602086018261374a565b50604083015184820360408601526137f98282613781565b915050606083015161380e606086018261374a565b5060808301516138216080860182613703565b5060a083015161383460a0860182613703565b5060c083015161384760c086018261374a565b508091505092915050565b5f61385d83836137b9565b905092915050565b5f602082019050919050565b5f61387b82613712565b613885818561371c565b9350836020820285016138978561372c565b805f5b858110156138d257848403895281516138b38582613852565b94506138be83613865565b925060208a0199505060018101905061389a565b50829750879550505050505092915050565b6138ed81612d27565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f613927838361373b565b60208301905092915050565b5f602082019050919050565b5f613949826138f3565b61395381856138fd565b935061395e8361390d565b805f5b8381101561398e578151613975888261391c565b975061398083613933565b925050600181019050613961565b5085935050505092915050565b5f61012083015f8301516139b15f8601826136f4565b5060208301516139c46020860182613703565b50604083015184820360408601526139dc8282613871565b91505060608301516139f1606086018261374a565b506080830151613a04608086018261374a565b5060a083015184820360a0860152613a1c8282613781565b91505060c0830151613a3160c08601826138e4565b5060e0830151613a4460e08601826138e4565b50610100830151848203610100860152613a5e828261393f565b9150508091505092915050565b5f82825260208201905092915050565b5f613a868385613a6b565b9350613a9383858461318f565b613a9c83613039565b840190509392505050565b5f6040820190508181035f830152613abf818661399b565b90508181036020830152613ad4818486613a7b565b9050949350505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f613b1582612f87565b9150613b2083612f87565b9250828201905080821115613b3857613b37613ade565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b613b7481613663565b82525050565b5f606082019050613b8d5f830186612f14565b613b9a602083018561300d565b613ba76040830184613b6b565b949350505050565b5f604082019050613bc25f830185612f14565b613bcf6020830184612fe5565b9392505050565b5f5ffd5b5f5ffd5b5f5f85851115613bf157613bf0613bd6565b5b83861115613c0257613c01613bda565b5b6001850283019150848603905094509492505050565b5f606082019050613c2b5f830186612fe5565b613c386020830185612fe5565b613c456040830184612fe5565b949350505050565b5f604082019050613c605f830185612fe5565b613c6d6020830184612fe5565b9392505050565b5f6060820190508181035f830152613c8c818661399b565b9050613c9b6020830185612fe5565b613ca86040830184612fe5565b949350505050565b5f613cba82613759565b613cc48185613a6b565b9350613cd4818560208601613773565b613cdd81613039565b840191505092915050565b5f6060820190508181035f830152613d00818661399b565b9050613d0f6020830185612fe5565b8181036040830152613d218184613cb0565b9050949350505050565b5f81905092915050565b7f19010000000000000000000000000000000000000000000000000000000000005f82015250565b5f613d69600283613d2b565b9150613d7482613d35565b600282019050919050565b5f819050919050565b613d99613d9482612d27565b613d7f565b82525050565b5f613da982613d5d565b9150613db58285613d88565b602082019150613dc58284613d88565b6020820191508190509392505050565b5f604082019050613de85f830185612f14565b613df56020830184612f14565b9392505050565b5f604082019050613e0f5f83018561300d565b8181036020830152613e218184613cb0565b90509392505050565b5f81519050613e3881612d30565b92915050565b5f81519050613e4c81612f90565b92915050565b5f60408284031215613e6757613e66613035565b5b613e7160406130a7565b90505f613e8084828501613e2a565b5f830152506020613e9384828501613e3e565b60208301525092915050565b5f60408284031215613eb457613eb3612c9a565b5b5f613ec184828501613e52565b91505092915050565b604082015f820151613ede5f8501826138e4565b506020820151613ef1602085018261374a565b50505050565b5f604082019050613f0a5f830184613eca565b92915050565b5f60a082019050613f235f830188612f14565b613f306020830187612f14565b613f3d6040830186612f14565b613f4a6060830185612fe5565b613f57608083018461300d565b9695505050505050565b5f60a082019050613f745f830188612f14565b613f816020830187612f14565b613f8e6040830186612fe5565b613f9b6060830185612fe5565b613fa86080830184612f14565b9695505050505050565b5f606082019050613fc55f830186612f14565b613fd26020830185612f14565b613fdf6040830184612f14565b949350505050565b5f82825260208201905092915050565b7f556e737570706f72746564206b696e64000000000000000000000000000000005f82015250565b5f61402b601083613fe7565b915061403682613ff7565b602082019050919050565b5f6020820190508181035f8301526140588161401f565b9050919050565b5f6060820190508181035f830152614078818688613a7b565b90506140876020830185612fe5565b6140946040830184612fe5565b95945050505050565b6140a6816130c5565b82525050565b5f6080820190506140bf5f830187612f14565b6140cc602083018661409d565b6140d96040830185612f14565b6140e66060830184612f14565b95945050505050565b5f6040820190506141025f830186612f14565b8181036020830152614115818486613a7b565b9050949350505050565b61412881612e18565b8114614132575f5ffd5b50565b5f815190506141438161411f565b92915050565b5f6020828403121561415e5761415d612c9a565b5b5f61416b84828501614135565b91505092915050565b5f6080820190508181035f83015261418c818861399b565b905061419b6020830187612f14565b6141a8604083018661300d565b81810360608301526141bb818486613a7b565b90509695505050505050565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000005f82015250565b5f6141fb601c83613d2b565b9150614206826141c7565b601c82019050919050565b5f61421b826141ef565b91506142278284613d88565b60208201915081905092915050565b5f6040820190508181035f83015261424e818661399b565b90508181036020830152614263818486613a7b565b9050949350505050565b5f6020828403121561428257614281612c9a565b5b5f61428f84828501613e2a565b91505092915050565b5f6040820190508181035f8301526142b08185613cb0565b90506142bf602083018461300d565b9392505050565b5f81905092915050565b5f6142da82613759565b6142e481856142c6565b93506142f4818560208601613773565b80840191505092915050565b5f61430b82856142d0565b91506143178284613d88565b6020820191508190509392505050565b7f53657175656e6365207369676e65723a0a0000000000000000000000000000005f82015250565b5f61435b601183613d2b565b915061436682614327565b601182019050919050565b5f8160601b9050919050565b5f61438782614371565b9050919050565b5f6143988261437d565b9050919050565b6143b06143ab82612cc1565b61438e565b82525050565b5f819050919050565b6143d06143cb82612f87565b6143b6565b82525050565b5f6143e08261434f565b91506143ec828561439f565b6014820191506143fc82846143bf565b6020820191508190509392505050565b7f53657175656e6365206e657374656420636f6e6669673a0a00000000000000005f82015250565b5f614440601883613d2b565b915061444b8261440c565b601882019050919050565b5f61446082614434565b915061446c8286613d88565b60208201915061447c82856143bf565b60208201915061448c82846143bf565b602082019150819050949350505050565b7f53657175656e636520737461746963206469676573743a0a00000000000000005f82015250565b5f6144d1601883613d2b565b91506144dc8261449d565b601882019050919050565b5f6144f1826144c5565b91506144fd8284613d88565b60208201915081905092915050565b7f53657175656e636520616e792061646472657373207375626469676573743a0a5f82015250565b5f614540602083613d2b565b915061454b8261450c565b602082019050919050565b5f61456082614534565b915061456c8284613d88565b60208201915081905092915050565b7f53657175656e63652073617069656e7420636f6e6669673a0a000000000000005f82015250565b5f6145af601983613d2b565b91506145ba8261457b565b601982019050919050565b5f6145cf826145a3565b91506145db828661439f565b6014820191506145eb82856143bf565b6020820191506145fb8284613d88565b602082019150819050949350505050565b5f610100820190506146205f83018b612f14565b61462d602083018a61300d565b61463a6040830189612fe5565b6146476060830188612f14565b6146546080830187612fe5565b61466160a08301866135f5565b61466e60c08301856135f5565b61467b60e0830184612fe5565b999850505050505050505056fea2646970667358221220730ca8e0671081823f59b3656973e199cdd9e2f72cf7c19f659de70016462e0664736f6c634300081c0033603a600e3d39601a805130553df3363d3d373d3d3d363d30545af43d82803e903d91601857fd5bf3',
      signer
    )
  }
}
