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
        { type: 'fallback', stateMutability: 'payable' },
        { type: 'receive', stateMutability: 'payable' },
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
          name: 'addHook',
          inputs: [
            { name: 'signature', type: 'bytes4', internalType: 'bytes4' },
            { name: 'implementation', type: 'address', internalType: 'address' }
          ],
          outputs: [],
          stateMutability: 'nonpayable'
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
          name: 'onERC1155BatchReceived',
          inputs: [
            { name: '', type: 'address', internalType: 'address' },
            { name: '', type: 'address', internalType: 'address' },
            { name: '', type: 'uint256[]', internalType: 'uint256[]' },
            { name: '', type: 'uint256[]', internalType: 'uint256[]' },
            { name: '', type: 'bytes', internalType: 'bytes' }
          ],
          outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
          stateMutability: 'pure'
        },
        {
          type: 'function',
          name: 'onERC1155Received',
          inputs: [
            { name: '', type: 'address', internalType: 'address' },
            { name: '', type: 'address', internalType: 'address' },
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'bytes', internalType: 'bytes' }
          ],
          outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
          stateMutability: 'pure'
        },
        {
          type: 'function',
          name: 'onERC721Received',
          inputs: [
            { name: '', type: 'address', internalType: 'address' },
            { name: '', type: 'address', internalType: 'address' },
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'bytes', internalType: 'bytes' }
          ],
          outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
          stateMutability: 'pure'
        },
        {
          type: 'function',
          name: 'readHook',
          inputs: [{ name: 'signature', type: 'bytes4', internalType: 'bytes4' }],
          outputs: [{ name: '', type: 'address', internalType: 'address' }],
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
          name: 'removeHook',
          inputs: [{ name: 'signature', type: 'bytes4', internalType: 'bytes4' }],
          outputs: [],
          stateMutability: 'nonpayable'
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
          name: 'tokenReceived',
          inputs: [
            { name: '', type: 'address', internalType: 'address' },
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'bytes', internalType: 'bytes' }
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
          name: 'DefinedHook',
          inputs: [
            { name: 'signature', type: 'bytes4', indexed: false, internalType: 'bytes4' },
            { name: 'implementation', type: 'address', indexed: false, internalType: 'address' }
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
        { type: 'error', name: 'HookAlreadyExists', inputs: [{ name: 'signature', type: 'bytes4', internalType: 'bytes4' }] },
        { type: 'error', name: 'HookDoesNotExist', inputs: [{ name: 'signature', type: 'bytes4', internalType: 'bytes4' }] },
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
      '0x60e060405234801561000f575f5ffd5b5060405161a6bd38038061a6bd83398181016040528101906100319190610196565b8060405161003e9061012b565b604051809103905ff080158015610057573d5f5f3e3d5ffd5b505f6040518060600160405280602c815260200161a691602c91393073ffffffffffffffffffffffffffffffffffffffff1660405160200161009a92919061023c565b60405160208183030381529060405280519060200120905080608081815250508273ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508173ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff168152505050505050610263565b61512b8061556683390190565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6101658261013c565b9050919050565b6101758161015b565b811461017f575f5ffd5b50565b5f815190506101908161016c565b92915050565b5f602082840312156101ab576101aa610138565b5b5f6101b884828501610182565b91505092915050565b5f81519050919050565b5f81905092915050565b8281835e5f83830152505050565b5f6101ed826101c1565b6101f781856101cb565b93506102078185602086016101d5565b80840191505092915050565b5f819050919050565b5f819050919050565b61023661023182610213565b61021c565b82525050565b5f61024782856101e3565b91506102538284610225565b6020820191508190509392505050565b60805160a05160c0516152c46102a25f395f81816109ff015261186e01525f818161080f0152612ff701525f818161076f015261301901526152c45ff3fe608060405260043610610122575f3560e01c80638943ec021161009f578063b93ea7ad11610063578063b93ea7ad1461049c578063bc197c81146104b8578063ca707850146104f4578063f23a6e6114610530578063f727ef1c1461056c57610129565b80638943ec02146103a35780638c3f5563146103cb5780639f69ef5414610407578063aaf10f4214610431578063ad55366b1461045b57610129565b8063257671f5116100e6578063257671f5146102ef57806329561426146103195780632dd31000146103415780634fcf3eca1461036b5780636ea445771461038757610129565b8063025b22bc14610203578063150b7a021461021f5780631626ba7e1461025b5780631a9b2337146102975780631f6a1eb9146102d357610129565b3661012957005b60045f36905010610201575f61014a5f3690610145919061343c565b610594565b90505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146101ff575f5f8273ffffffffffffffffffffffffffffffffffffffff165f366040516101a89291906134d6565b5f60405180830381855af49150503d805f81146101e0576040519150601f19603f3d011682016040523d82523d5f602084013e6101e5565b606091505b5091509150816101f757805160208201fd5b805160208201f35b505b005b61021d60048036038101906102189190613559565b6105e9565b005b34801561022a575f5ffd5b5061024560048036038101906102409190613618565b610665565b60405161025291906136ab565b60405180910390f35b348015610266575f5ffd5b50610281600480360381019061027c91906136f7565b610679565b60405161028e91906136ab565b60405180910390f35b3480156102a2575f5ffd5b506102bd60048036038101906102b8919061377e565b6106d3565b6040516102ca91906137b8565b60405180910390f35b6102ed60048036038101906102e891906137d1565b6106e4565b005b3480156102fa575f5ffd5b5061030361076d565b604051610310919061385e565b60405180910390f35b348015610324575f5ffd5b5061033f600480360381019061033a9190613877565b610791565b005b34801561034c575f5ffd5b5061035561080d565b60405161036291906137b8565b60405180910390f35b6103856004803603810190610380919061377e565b610831565b005b6103a1600480360381019061039c91906138a2565b610926565b005b3480156103ae575f5ffd5b506103c960048036038101906103c491906138ed565b6109bf565b005b3480156103d6575f5ffd5b506103f160048036038101906103ec919061395e565b6109c5565b6040516103fe9190613998565b60405180910390f35b348015610412575f5ffd5b5061041b6109fd565b60405161042891906137b8565b60405180910390f35b34801561043c575f5ffd5b50610445610a21565b60405161045291906137b8565b60405180910390f35b348015610466575f5ffd5b50610481600480360381019061047c9190613eea565b610a2f565b60405161049396959493929190613f72565b60405180910390f35b6104b660048036038101906104b19190613fd1565b610a6d565b005b3480156104c3575f5ffd5b506104de60048036038101906104d99190614064565b610b63565b6040516104eb91906136ab565b60405180910390f35b3480156104ff575f5ffd5b5061051a60048036038101906105159190613eea565b610b7a565b604051610527919061385e565b60405180910390f35b34801561053b575f5ffd5b506105566004803603810190610551919061413b565b610d29565b60405161056391906136ab565b60405180910390f35b348015610577575f5ffd5b50610592600480360381019061058d9190614212565b610d3e565b005b5f6105e07fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1205f1b837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916610e07565b5f1c9050919050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461065957336040517fa19dbf0000000000000000000000000000000000000000000000000000000000815260040161065091906137b8565b60405180910390fd5b61066281610e3f565b50565b5f63150b7a0260e01b905095945050505050565b5f610682613347565b6003815f019060ff16908160ff1681525050848160e00181815250505f6106aa828686610e82565b509050806106bf575f60e01b925050506106cc565b6320c13b0b60e01b925050505b9392505050565b5f6106dd82610594565b9050919050565b5f6106ef8585610feb565b90506107038160600151826080015161148d565b5f5f610710838686610e82565b915091508161075a578285856040517fa2b6d61b00000000000000000000000000000000000000000000000000000000815260040161075193929190614615565b60405180910390fd5b6107648184611531565b50505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461080157336040517fa19dbf000000000000000000000000000000000000000000000000000000000081526004016107f891906137b8565b60405180910390fd5b61080a816117cb565b50565b7f000000000000000000000000000000000000000000000000000000000000000081565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108a157336040517fa19dbf0000000000000000000000000000000000000000000000000000000000815260040161089891906137b8565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff166108c182610594565b73ffffffffffffffffffffffffffffffffffffffff160361091957806040517f1c3812cc00000000000000000000000000000000000000000000000000000000815260040161091091906136ab565b60405180910390fd5b610923815f611895565b50565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461099657336040517fa19dbf0000000000000000000000000000000000000000000000000000000000815260040161098d91906137b8565b60405180910390fd5b5f6109a18383610feb565b90505f6109ad82611936565b90506109b98183611531565b50505050565b50505050565b5f6109f47f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e5f1b835f1b610e07565b5f1c9050919050565b7f000000000000000000000000000000000000000000000000000000000000000081565b5f610a2a611986565b905090565b5f5f5f5f5f5f610a428989895f5f61198e565b809550819650829750839950849a505050505050610a5f83611ccb565b935093975093979195509350565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610add57336040517fa19dbf00000000000000000000000000000000000000000000000000000000008152600401610ad491906137b8565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff16610afd83610594565b73ffffffffffffffffffffffffffffffffffffffff1614610b5557816040517f5b4d6d6a000000000000000000000000000000000000000000000000000000008152600401610b4c91906136ab565b60405180910390fd5b610b5f8282611895565b5050565b5f63bc197c8160e01b905098975050505050505050565b5f5f600185610100015151610b8f9190614679565b67ffffffffffffffff811115610ba857610ba76139c5565b5b604051908082528060200260200182016040528015610bd65781602001602082028036833780820191505090505b5090505f5f90505b85610100015151811015610c66578561010001518181518110610c0457610c036146ac565b5b6020026020010151828281518110610c1f57610c1e6146ac565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508080600101915050610bde565b5033818661010001515181518110610c8157610c806146ac565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050808561010001819052505f610cd1868686610e82565b50905080610d1a578585856040517ff58cc8b5000000000000000000000000000000000000000000000000000000008152600401610d1193929190614615565b60405180910390fd5b60015f1b925050509392505050565b5f63f23a6e6160e01b90509695505050505050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610dae57336040517fa19dbf00000000000000000000000000000000000000000000000000000000008152600401610da591906137b8565b60405180910390fd5b610dc78383836bffffffffffffffffffffffff16611cdc565b7febf265acfac1c01de588ed7ef49743b9c3ce8d6d1edeaf510a1f5453228515b1838383604051610dfa939291906146e8565b60405180910390a1505050565b5f5f8383604051602001610e1c92919061471d565b604051602081830303815290604052805190602001209050805491505092915050565b610e4881611d3a565b7f310ba5f1d2ed074b51e2eccd052a47ae9ab7c6b800d1fca3db3999d6a592ca0381604051610e7791906137b8565b60405180910390a150565b5f5f5f84845f818110610e9857610e976146ac565b5b9050013560f81c60f81b9050608060f81b608060f81b82167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191603610fb157610ee086611936565b91505f5f610eed84611d40565b9150915042811015610f385783816040517f9fa4fe54000000000000000000000000000000000000000000000000000000008152600401610f2f929190614744565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161480610f9d57503373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b15610fae5760019450505050610fe3565b50505b5f5f5f610fc18989895f5f61198e565b905080985081945082955083965050505050610fdc81611ccb565b9550505050505b935093915050565b610ff3613347565b5f815f019060ff16908160ff16815250505f5f6110108585611d91565b915060ff169150600180831603611030575f83606001818152505061106c565b611045818686611da79290919263ffffffff16565b8173ffffffffffffffffffffffffffffffffffffffff169150846060018193508281525050505b5f6007600184901c1690505f8111156110a95761109b82828888611dd89190939291909392919063ffffffff16565b856080018194508281525050505b5f6010808516036110bd5760019050611115565b6020808516036110f0576110dc838888611e059290919263ffffffff16565b8161ffff1691508094508192505050611114565b611105838888611e249290919263ffffffff16565b8160ff16915080945081925050505b5b8067ffffffffffffffff81111561112f5761112e6139c5565b5b60405190808252806020026020018201604052801561116857816020015b611155613392565b81526020019060019003908161114d5790505b5085604001819052505f5f90505b81811015611482575f611194858a8a611e249290919263ffffffff16565b8096508192505050600180821660ff16036112035730876040015183815181106111c1576111c06146ac565b5b60200260200101515f019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505061126f565b611218858a8a611e3f9290919263ffffffff16565b8860400151848151811061122f5761122e6146ac565b5b60200260200101515f018197508273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050505b600280821660ff16036112bd57611291858a8a611e709290919263ffffffff16565b886040015184815181106112a8576112a76146ac565b5b60200260200101516020018197508281525050505b600480821660ff1603611385575f6112e0868b8b611e869290919263ffffffff16565b8162ffffff16915080975081925050508989879083896113009190614679565b9261130d93929190614773565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f8201169050808301925050505050505088604001518481518110611366576113656146ac565b5b60200260200101516040018190525080866113819190614679565b9550505b600880821660ff16036113d3576113a7858a8a611e709290919263ffffffff16565b886040015184815181106113be576113bd6146ac565b5b60200260200101516060018197508281525050505b601080821660ff1614876040015183815181106113f3576113f26146ac565b5b60200260200101516080019015159081151581525050602080821660ff161487604001518381518110611429576114286146ac565b5b602002602001015160a0019015159081151581525050600660c0821660ff16901c60ff1687604001518381518110611464576114636146ac565b5b602002602001015160c0018181525050508080600101915050611176565b505050505092915050565b5f611497836109c5565b90508181146114e1578282826040517f9b6514f40000000000000000000000000000000000000000000000000000000081526004016114d8939291906147ad565b60405180910390fd5b5f6001830190506114f28482611ea6565b7f1f180c27086c7a39ea2a7b25239d1ab92348f07ca7bb59d1438fcf527568f88184826040516115239291906147e2565b60405180910390a150505050565b5f5f90505f82604001515190505f5f90505b818110156117c4575f84604001518281518110611563576115626146ac565b5b602002602001015190508060a00151801561157c575083155b156115c3575f93507f9ae934bf8a986157c889a24c3b3fa85e74b7e4ee4b1f8fc6e7362cb4c1d19d8b86836040516115b5929190614744565b60405180910390a1506117b7565b5f816060015190505f81141580156115da5750805a105b156116205785835a6040517f2139527400000000000000000000000000000000000000000000000000000000815260040161161793929190614809565b60405180910390fd5b5f8260800151156116525761164b835f01515f841461163f5783611641565b5a5b8560400151611edb565b905061167a565b611677835f015184602001515f851461166b578461166d565b5a5b8660400151611ef0565b90505b8061177a575f60ff168360c00151036116d257600195507f20832642214d5218c6428e71d8d2ddd9ad15a81ad2be8154d8c2e3ab08293fcb88856040516116c2929190614744565b60405180910390a15050506117b7565b600160ff168360c00151036117295786846116eb611f07565b6040517f7f6b0bb10000000000000000000000000000000000000000000000000000000081526004016117209392919061487d565b60405180910390fd5b600260ff168360c0015103611779577f5b5cb72c79981de49f1f950d4d8d62397e2fc2b772e1b788a640025075ab47c38885604051611769929190614744565b60405180910390a15050506117c4565b5b7fec670aed5ee1e72eb3eb601271be4b3f312e71f17eebdf10c1a0ab5a3af30ffd88856040516117ab929190614744565b60405180910390a15050505b8080600101915050611543565b5050505050565b5f5f1b8103611806576040517f4294d12700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6118327fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85f1b82611f25565b7f307ed6bd941ee9fc80f369c94af5fa11e25bab5102a6140191756c5474a30bfa81604051611861919061385e565b60405180910390a16118927f0000000000000000000000000000000000000000000000000000000000000000610e3f565b50565b6118f97fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1205f1b837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168373ffffffffffffffffffffffffffffffffffffffff165f1b611f2c565b7f0d7fc113eaf016db4681a1ba86d083ce3e0961f321062a75ac2b0aeb33deeed1828260405161192a9291906148c0565b60405180910390a15050565b5f5f611946836020015130611f61565b90505f61195284612005565b9050818160405160200161196792919061495b565b6040516020818303038152906040528051906020012092505050919050565b5f3054905090565b5f5f5f5f5f5f5f61199f8b8b611d91565b915060ff1691506119ae6133e3565b60408084161480156119eb57505f73ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff16145b15611b2757611a05828d8d611e3f9290919263ffffffff16565b809350819a50505089611b26575f611a28838e8e611e869290919263ffffffff16565b8162ffffff16915080945081925050505f8d8d85908487611a499190614679565b92611a5693929190614773565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f8201169050808301925050505050505090508a73ffffffffffffffffffffffffffffffffffffffff1663ccce3bc830836040518363ffffffff1660e01b8152600401611ad5929190614991565b6040805180830381865afa158015611aef573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611b139190614a34565b92508184611b219190614679565b935050505b5b600180841603611b6057611b4e8d8a838f8f87908092611b4993929190614773565b612216565b97509750975097509750505050611cbe565b6002808416148d60200190151590811515815250505f6002601c8516901c9050611b9c83828f8f611dd89190939291909392919063ffffffff16565b8094508197505050505f6001600560208616901c611bba9190614679565b9050611bd883828f8f611dd89190939291909392919063ffffffff16565b809450819a50505050611bea8d611936565b9350611c088d858e8e86908092611c0393929190614773565b61245a565b8097508198505050611c1c86895f1b612fc9565b9550611c2a86865f1b612fc9565b9550611c4e868a73ffffffffffffffffffffffffffffffffffffffff165f1b612fc9565b95505f5f1b815f015114158015611c68575085815f015114155b8015611c78575080602001518511155b15611cba57806040517fccbb534f000000000000000000000000000000000000000000000000000000008152600401611cb19190614a8c565b60405180910390fd5b5050505b9550955095509550959050565b5f611cd582612fdd565b9050919050565b611d357fc852adf5e97c2fc3b38f405671e91b7af1697ef0287577f227ef10494c2a8e865f1b846bffffffffffffffffffffffff841660608673ffffffffffffffffffffffffffffffffffffffff16901b175f1b611f2c565b505050565b80305550565b5f5f5f611d6f7fc852adf5e97c2fc3b38f405671e91b7af1697ef0287577f227ef10494c2a8e865f1b85610e07565b5f1c9050606081901c816bffffffffffffffffffffffff169250925050915091565b5f5f83358060f81c925060019150509250929050565b5f5f8483013573ffffffffffffffffffffffffffffffffffffffff8160601c16925060148401915050935093915050565b5f5f858401356008840261010003600180866008021b0382821c1693508486019250505094509492505050565b5f5f8483013561ffff8160f01c16925060028401915050935093915050565b5f5f848301358060f81c925060018401915050935093915050565b5f5f8483013573ffffffffffffffffffffffffffffffffffffffff8160601c16925060148401915050935093915050565b5f5f848301359150602083019050935093915050565b5f5f8483013562ffffff8160e81c16925060038401915050935093915050565b611ed77f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e5f1b835f1b835f1b611f2c565b5050565b5f5f5f8351602085018787f490509392505050565b5f5f5f835160208501878988f19050949350505050565b60603d604051915060208201818101604052818352815f823e505090565b8082555050565b5f8383604051602001611f4092919061471d565b60405160208183030381529060405280519060200120905081815550505050565b5f7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f7f4aa45ca7ad825ceb1bf35643f0a58c295239df563b1b565c2485f96477c563187f2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de85611fd05746611fd2565b5f5b85604051602001611fe7959493929190614aa5565b60405160208183030381529060405280519060200120905092915050565b5f5f612015836101000151613080565b90505f60ff16835f015160ff1603612097575f61203584604001516130ed565b90507f11e1e4079a79a66e4ade50033cfe2678cdd5341d2dfe5ef9513edb1a0be147a2818560600151866080015185604051602001612078959493929190614af6565b6040516020818303038152906040528051906020012092505050612211565b600160ff16835f015160ff1603612106577fe19a3b94fc3c7ece3f890d98a99bc422615537a08dea0603fa8425867d87d4668360a0015180519060200120826040516020016120e893929190614b47565b60405160208183030381529060405280519060200120915050612211565b600260ff16835f015160ff160361216e577f11fdeb7e8373a1aa96bfac8d0ea91526b2c5d15e5cee20e0543e780258f3e8e48360c001518260405160200161215093929190614b47565b60405160208183030381529060405280519060200120915050612211565b600360ff16835f015160ff16036121d6577f402e923b91e918306019e73f589362164a6a059499a504699c66feabbb3e26248360e00151826040516020016121b893929190614b47565b60405160208183030381529060405280519060200120915050612211565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161220890614bd6565b60405180910390fd5b919050565b5f5f5f5f5f612223613347565b6002815f019060ff16908160ff16815250505f5f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90505b898990508210156123e4575f5f61227d848d8d611e869290919263ffffffff16565b8162ffffff169150809550819250505083816122999190614679565b9150505f8b8b905082146122ad575f6122af565b8d5b90505f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84146122df57856122e1565b8f5b9050612301818e8e889087926122f993929190614773565b60018661198e565b50809b50819c50829d50839e50505050508a8a101561236d578c8c8690859261232c93929190614773565b8c8c6040517fb006aba00000000000000000000000000000000000000000000000000000000081526004016123649493929190614bf4565b60405180910390fd5b829450888e5f015103612386575f5f1b8e5f0181815250505b8388106123cc5787846040517f37daf62b0000000000000000000000000000000000000000000000000000000081526004016123c39291906147e2565b60405180910390fd5b888660c001818152505087935082945050505061225b565b5f5f1b8b5f0151141580156123fd57508a602001518511155b1561243f578a6040517fccbb534f0000000000000000000000000000000000000000000000000000000081526004016124369190614a8c565b60405180910390fd5b6124488d611936565b93505050509550955095509550959050565b5f5f5f5b84849050811015612fbf575f61247f828787611e249290919263ffffffff16565b8160ff16915080935081925050505f600460f08316901c90505f81036125d7575f600f831690505f8160ff16036124ce576124c5848989611e249290919263ffffffff16565b80955081925050505b5f5f6124e5868b8b6131679290919263ffffffff16565b8097508193505050612502868b8b6131679290919263ffffffff16565b80975081925050505f60ff82901c5f1c90505f7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff835f1c165f1b90505f601b830190505f60018f8388866040515f81526020016040526040516125689493929190614c41565b6020604051602081039080840390855afa158015612588573d5f5f3e3d5ffd5b5050506020604051035190508660ff168c019b505f6125aa828960ff1661317d565b90505f5f1b8c036125bb57806125c6565b6125c58c82612fc9565b5b9b505050505050505050505061245e565b60018103612662575f600f831690505f8160ff160361260e57612605848989611e249290919263ffffffff16565b80955081925050505b5f612624858a8a611e3f9290919263ffffffff16565b80965081925050505f61263a828460ff1661317d565b90505f5f1b870361264b5780612656565b6126558782612fc9565b5b9650505050505061245e565b60028103612853575f6003831690505f8160ff160361269957612690848989611e249290919263ffffffff16565b80955081925050505b5f6126af858a8a611e3f9290919263ffffffff16565b80965081925050505f6002600c861660ff16901c60ff1690505f6126e587838d8d611dd89190939291909392919063ffffffff16565b80985081925050505f81880190506320c13b0b60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168473ffffffffffffffffffffffffffffffffffffffff16631626ba7e8f8f8f8d90879261274993929190614773565b6040518463ffffffff1660e01b815260040161276793929190614c84565b602060405180830381865afa158015612782573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906127a69190614cc8565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461280f578d8d858e8e6040517ff734863a000000000000000000000000000000000000000000000000000000008152600401612806959493929190614cf3565b60405180910390fd5b8097508460ff168a0199505f612828858760ff1661317d565b90505f5f1b8a036128395780612844565b6128438a82612fc9565b5b9950505050505050505061245e565b6003810361289d575f6128718489896131679290919263ffffffff16565b80955081925050505f5f1b85036128885780612893565b6128928582612fc9565b5b945050505061245e565b6004810361291f575f600f831660ff1690505f6128cc85838b8b611dd89190939291909392919063ffffffff16565b80965081925050505f81860190505f5f6128f88e8e8e8e8c9088926128f393929190614773565b61245a565b91509150829750818a01995061290e8982612fc9565b98508297505050505050505061245e565b60068103612a2f575f6002600c841660ff16901c60ff1690505f810361296357612954848989611e249290919263ffffffff16565b8160ff16915080955081925050505b5f6003841660ff1690505f810361299957612989858a8a611e059290919263ffffffff16565b8161ffff16915080965081925050505b5f6129af868b8b611e869290919263ffffffff16565b8162ffffff16915080975081925050505f81870190505f5f6129e38f8f8f8f8d9088926129de93929190614773565b61245a565b915091508298508482106129f757858b019a505b5f612a038287896131af565b90505f5f1b8b03612a145780612a1f565b612a1e8b82612fc9565b5b9a5050505050505050505061245e565b60058103612ab1575f612a4d8489896131679290919263ffffffff16565b8095508192505050888103612a80577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff95505b5f612a8a826131e4565b90505f5f1b8603612a9b5780612aa6565b612aa58682612fc9565b5b95505050505061245e565b60078103612c17575f600f831690505f8160ff1603612ae857612adf848989611e249290919263ffffffff16565b80955081925050505b5f5f612aff868b8b6131679290919263ffffffff16565b8097508193505050612b1c868b8b6131679290919263ffffffff16565b80975081925050505f60ff82901c5f1c90505f7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff835f1c165f1b90505f601b830190505f60018f604051602001612b739190614d90565b604051602081830303815290604052805190602001208388866040515f8152602001604052604051612ba89493929190614c41565b6020604051602081039080840390855afa158015612bc8573d5f5f3e3d5ffd5b5050506020604051035190508660ff168c019b505f612bea828960ff1661317d565b90505f5f1b8c03612bfb5780612c06565b612c058c82612fc9565b5b9b505050505050505050505061245e565b60088103612cb0575f612c358489896131679290919263ffffffff16565b80955081925050505f612c515f8c61321390919063ffffffff16565b9050808203612c7e577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff96505b5f612c8882613264565b90505f5f1b8703612c995780612ca4565b612ca38782612fc9565b5b9650505050505061245e565b60098103612e19575f6003831690505f8160ff1603612ce757612cde848989611e249290919263ffffffff16565b80955081925050505b5f612cfd858a8a611e3f9290919263ffffffff16565b80965081925050505f5f6002600c871660ff16901c60ff169050612d3387828d8d611dd89190939291909392919063ffffffff16565b8098508193505050505f81870190505f8373ffffffffffffffffffffffffffffffffffffffff1663ca7078508f8e8e8c908792612d7293929190614773565b6040518463ffffffff1660e01b8152600401612d9093929190614db5565b602060405180830381865afa158015612dab573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190612dcf9190614dec565b90508197508460ff168a0199505f612deb858760ff1684613293565b90505f5f1b8a03612dfc5780612e07565b612e068a82612fc9565b5b9950829850505050505050505061245e565b600a8103612f82575f6003831690505f8160ff1603612e5057612e47848989611e249290919263ffffffff16565b80955081925050505b5f612e66858a8a611e3f9290919263ffffffff16565b80965081925050505f6002600c861660ff16901c60ff1690505f612e9c87838d8d611dd89190939291909392919063ffffffff16565b80985081925050505f81880190505f8473ffffffffffffffffffffffffffffffffffffffff1663957d2b238f8f8f8d908792612eda93929190614773565b6040518463ffffffff1660e01b8152600401612ef893929190614c84565b602060405180830381865afa158015612f13573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190612f379190614dec565b90508198508560ff168b019a505f612f53868860ff1684613293565b90505f5f1b8b03612f645780612f6f565b612f6e8b82612fc9565b5b9a5082995050505050505050505061245e565b806040517fb2505f7c000000000000000000000000000000000000000000000000000000008152600401612fb69190613998565b60405180910390fd5b5094509492505050565b5f825f528160205260405f20905092915050565b5f3073ffffffffffffffffffffffffffffffffffffffff167f0000000000000000000000000000000000000000000000000000000000000000837f000000000000000000000000000000000000000000000000000000000000000060405160200161304a93929190614ea6565b604051602081830303815290604052805190602001205f1c73ffffffffffffffffffffffffffffffffffffffff16149050919050565b5f60605f5f90505b83518110156130dc57818482815181106130a5576130a46146ac565b5b60200260200101516040516020016130be929190614eed565b60405160208183030381529060405291508080600101915050613088565b508080519060200120915050919050565b5f60605f5f90505b8351811015613156575f613122858381518110613115576131146146ac565b5b60200260200101516132c8565b90508281604051602001613137929190614f4b565b60405160208183030381529060405292505080806001019150506130f5565b508080519060200120915050919050565b5f5f848301359150602083019050935093915050565b5f8282604051602001613191929190614fdc565b60405160208183030381529060405280519060200120905092915050565b5f8383836040516020016131c59392919061505c565b6040516020818303038152906040528051906020012090509392505050565b5f816040516020016131f691906150ed565b604051602081830303815290604052805190602001209050919050565b5f5f613223846020015184611f61565b90505f61322f85612005565b9050818160405160200161324492919061495b565b604051602081830303815290604052805190602001209250505092915050565b5f81604051602001613276919061515c565b604051602081830303815290604052805190602001209050919050565b5f8383836040516020016132a9939291906151cb565b6040516020818303038152906040528051906020012090509392505050565b5f7f0603985259a953da1f65a522f589c17bd1d0117ec1d3abb7c0788aef251ef437825f01518360200151846040015180519060200120856060015186608001518760a001518860c0015160405160200161332a989796959493929190615212565b604051602081830303815290604052805190602001209050919050565b6040518061012001604052805f60ff1681526020015f15158152602001606081526020015f81526020015f8152602001606081526020015f81526020015f8152602001606081525090565b6040518060e001604052805f73ffffffffffffffffffffffffffffffffffffffff1681526020015f8152602001606081526020015f81526020015f151581526020015f151581526020015f81525090565b60405180604001604052805f81526020015f81525090565b5f82905092915050565b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b5f82821b905092915050565b5f61344783836133fb565b826134528135613405565b925060048210156134925761348d7fffffffff0000000000000000000000000000000000000000000000000000000083600403600802613430565b831692505b505092915050565b5f81905092915050565b828183375f83830152505050565b5f6134bd838561349a565b93506134ca8385846134a4565b82840190509392505050565b5f6134e28284866134b2565b91508190509392505050565b5f604051905090565b5f5ffd5b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f613528826134ff565b9050919050565b6135388161351e565b8114613542575f5ffd5b50565b5f813590506135538161352f565b92915050565b5f6020828403121561356e5761356d6134f7565b5b5f61357b84828501613545565b91505092915050565b5f819050919050565b61359681613584565b81146135a0575f5ffd5b50565b5f813590506135b18161358d565b92915050565b5f5ffd5b5f5ffd5b5f5ffd5b5f5f83601f8401126135d8576135d76135b7565b5b8235905067ffffffffffffffff8111156135f5576135f46135bb565b5b602083019150836001820283011115613611576136106135bf565b5b9250929050565b5f5f5f5f5f60808688031215613631576136306134f7565b5b5f61363e88828901613545565b955050602061364f88828901613545565b9450506040613660888289016135a3565b935050606086013567ffffffffffffffff811115613681576136806134fb565b5b61368d888289016135c3565b92509250509295509295909350565b6136a581613405565b82525050565b5f6020820190506136be5f83018461369c565b92915050565b5f819050919050565b6136d6816136c4565b81146136e0575f5ffd5b50565b5f813590506136f1816136cd565b92915050565b5f5f5f6040848603121561370e5761370d6134f7565b5b5f61371b868287016136e3565b935050602084013567ffffffffffffffff81111561373c5761373b6134fb565b5b613748868287016135c3565b92509250509250925092565b61375d81613405565b8114613767575f5ffd5b50565b5f8135905061377881613754565b92915050565b5f60208284031215613793576137926134f7565b5b5f6137a08482850161376a565b91505092915050565b6137b28161351e565b82525050565b5f6020820190506137cb5f8301846137a9565b92915050565b5f5f5f5f604085870312156137e9576137e86134f7565b5b5f85013567ffffffffffffffff811115613806576138056134fb565b5b613812878288016135c3565b9450945050602085013567ffffffffffffffff811115613835576138346134fb565b5b613841878288016135c3565b925092505092959194509250565b613858816136c4565b82525050565b5f6020820190506138715f83018461384f565b92915050565b5f6020828403121561388c5761388b6134f7565b5b5f613899848285016136e3565b91505092915050565b5f5f602083850312156138b8576138b76134f7565b5b5f83013567ffffffffffffffff8111156138d5576138d46134fb565b5b6138e1858286016135c3565b92509250509250929050565b5f5f5f5f60608587031215613905576139046134f7565b5b5f61391287828801613545565b9450506020613923878288016135a3565b935050604085013567ffffffffffffffff811115613944576139436134fb565b5b613950878288016135c3565b925092505092959194509250565b5f60208284031215613973576139726134f7565b5b5f613980848285016135a3565b91505092915050565b61399281613584565b82525050565b5f6020820190506139ab5f830184613989565b92915050565b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6139fb826139b5565b810181811067ffffffffffffffff82111715613a1a57613a196139c5565b5b80604052505050565b5f613a2c6134ee565b9050613a3882826139f2565b919050565b5f5ffd5b5f60ff82169050919050565b613a5681613a41565b8114613a60575f5ffd5b50565b5f81359050613a7181613a4d565b92915050565b5f8115159050919050565b613a8b81613a77565b8114613a95575f5ffd5b50565b5f81359050613aa681613a82565b92915050565b5f67ffffffffffffffff821115613ac657613ac56139c5565b5b602082029050602081019050919050565b5f5ffd5b5f67ffffffffffffffff821115613af557613af46139c5565b5b613afe826139b5565b9050602081019050919050565b5f613b1d613b1884613adb565b613a23565b905082815260208101848484011115613b3957613b38613ad7565b5b613b448482856134a4565b509392505050565b5f82601f830112613b6057613b5f6135b7565b5b8135613b70848260208601613b0b565b91505092915050565b5f60e08284031215613b8e57613b8d6139b1565b5b613b9860e0613a23565b90505f613ba784828501613545565b5f830152506020613bba848285016135a3565b602083015250604082013567ffffffffffffffff811115613bde57613bdd613a3d565b5b613bea84828501613b4c565b6040830152506060613bfe848285016135a3565b6060830152506080613c1284828501613a98565b60808301525060a0613c2684828501613a98565b60a08301525060c0613c3a848285016135a3565b60c08301525092915050565b5f613c58613c5384613aac565b613a23565b90508083825260208201905060208402830185811115613c7b57613c7a6135bf565b5b835b81811015613cc257803567ffffffffffffffff811115613ca057613c9f6135b7565b5b808601613cad8982613b79565b85526020850194505050602081019050613c7d565b5050509392505050565b5f82601f830112613ce057613cdf6135b7565b5b8135613cf0848260208601613c46565b91505092915050565b5f67ffffffffffffffff821115613d1357613d126139c5565b5b602082029050602081019050919050565b5f613d36613d3184613cf9565b613a23565b90508083825260208201905060208402830185811115613d5957613d586135bf565b5b835b81811015613d825780613d6e8882613545565b845260208401935050602081019050613d5b565b5050509392505050565b5f82601f830112613da057613d9f6135b7565b5b8135613db0848260208601613d24565b91505092915050565b5f6101208284031215613dcf57613dce6139b1565b5b613dda610120613a23565b90505f613de984828501613a63565b5f830152506020613dfc84828501613a98565b602083015250604082013567ffffffffffffffff811115613e2057613e1f613a3d565b5b613e2c84828501613ccc565b6040830152506060613e40848285016135a3565b6060830152506080613e54848285016135a3565b60808301525060a082013567ffffffffffffffff811115613e7857613e77613a3d565b5b613e8484828501613b4c565b60a08301525060c0613e98848285016136e3565b60c08301525060e0613eac848285016136e3565b60e08301525061010082013567ffffffffffffffff811115613ed157613ed0613a3d565b5b613edd84828501613d8c565b6101008301525092915050565b5f5f5f60408486031215613f0157613f006134f7565b5b5f84013567ffffffffffffffff811115613f1e57613f1d6134fb565b5b613f2a86828701613db9565b935050602084013567ffffffffffffffff811115613f4b57613f4a6134fb565b5b613f57868287016135c3565b92509250509250925092565b613f6c81613a77565b82525050565b5f60c082019050613f855f830189613989565b613f926020830188613989565b613f9f6040830187613f63565b613fac606083018661384f565b613fb96080830185613989565b613fc660a083018461384f565b979650505050505050565b5f5f60408385031215613fe757613fe66134f7565b5b5f613ff48582860161376a565b925050602061400585828601613545565b9150509250929050565b5f5f83601f840112614024576140236135b7565b5b8235905067ffffffffffffffff811115614041576140406135bb565b5b60208301915083602082028301111561405d5761405c6135bf565b5b9250929050565b5f5f5f5f5f5f5f5f60a0898b0312156140805761407f6134f7565b5b5f61408d8b828c01613545565b985050602061409e8b828c01613545565b975050604089013567ffffffffffffffff8111156140bf576140be6134fb565b5b6140cb8b828c0161400f565b9650965050606089013567ffffffffffffffff8111156140ee576140ed6134fb565b5b6140fa8b828c0161400f565b9450945050608089013567ffffffffffffffff81111561411d5761411c6134fb565b5b6141298b828c016135c3565b92509250509295985092959890939650565b5f5f5f5f5f5f60a08789031215614155576141546134f7565b5b5f61416289828a01613545565b965050602061417389828a01613545565b955050604061418489828a016135a3565b945050606061419589828a016135a3565b935050608087013567ffffffffffffffff8111156141b6576141b56134fb565b5b6141c289828a016135c3565b92509250509295509295509295565b5f6bffffffffffffffffffffffff82169050919050565b6141f1816141d1565b81146141fb575f5ffd5b50565b5f8135905061420c816141e8565b92915050565b5f5f5f60608486031215614229576142286134f7565b5b5f614236868287016136e3565b935050602061424786828701613545565b9250506040614258868287016141fe565b9150509250925092565b61426b81613a41565b82525050565b61427a81613a77565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b6142b28161351e565b82525050565b6142c181613584565b82525050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f6142f9826142c7565b61430381856142d1565b93506143138185602086016142e1565b61431c816139b5565b840191505092915050565b5f60e083015f83015161433c5f8601826142a9565b50602083015161434f60208601826142b8565b506040830151848203604086015261436782826142ef565b915050606083015161437c60608601826142b8565b50608083015161438f6080860182614271565b5060a08301516143a260a0860182614271565b5060c08301516143b560c08601826142b8565b508091505092915050565b5f6143cb8383614327565b905092915050565b5f602082019050919050565b5f6143e982614280565b6143f3818561428a565b9350836020820285016144058561429a565b805f5b85811015614440578484038952815161442185826143c0565b945061442c836143d3565b925060208a01995050600181019050614408565b50829750879550505050505092915050565b61445b816136c4565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f61449583836142a9565b60208301905092915050565b5f602082019050919050565b5f6144b782614461565b6144c1818561446b565b93506144cc8361447b565b805f5b838110156144fc5781516144e3888261448a565b97506144ee836144a1565b9250506001810190506144cf565b5085935050505092915050565b5f61012083015f83015161451f5f860182614262565b5060208301516145326020860182614271565b506040830151848203604086015261454a82826143df565b915050606083015161455f60608601826142b8565b50608083015161457260808601826142b8565b5060a083015184820360a086015261458a82826142ef565b91505060c083015161459f60c0860182614452565b5060e08301516145b260e0860182614452565b506101008301518482036101008601526145cc82826144ad565b9150508091505092915050565b5f82825260208201905092915050565b5f6145f483856145d9565b93506146018385846134a4565b61460a836139b5565b840190509392505050565b5f6040820190508181035f83015261462d8186614509565b905081810360208301526146428184866145e9565b9050949350505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61468382613584565b915061468e83613584565b92508282019050808211156146a6576146a561464c565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b6146e2816141d1565b82525050565b5f6060820190506146fb5f83018661384f565b61470860208301856137a9565b61471560408301846146d9565b949350505050565b5f6040820190506147305f83018561384f565b61473d602083018461384f565b9392505050565b5f6040820190506147575f83018561384f565b6147646020830184613989565b9392505050565b5f5ffd5b5f5ffd5b5f5f858511156147865761478561476b565b5b838611156147975761479661476f565b5b6001850283019150848603905094509492505050565b5f6060820190506147c05f830186613989565b6147cd6020830185613989565b6147da6040830184613989565b949350505050565b5f6040820190506147f55f830185613989565b6148026020830184613989565b9392505050565b5f6060820190508181035f8301526148218186614509565b90506148306020830185613989565b61483d6040830184613989565b949350505050565b5f61484f826142c7565b61485981856145d9565b93506148698185602086016142e1565b614872816139b5565b840191505092915050565b5f6060820190508181035f8301526148958186614509565b90506148a46020830185613989565b81810360408301526148b68184614845565b9050949350505050565b5f6040820190506148d35f83018561369c565b6148e060208301846137a9565b9392505050565b5f81905092915050565b7f19010000000000000000000000000000000000000000000000000000000000005f82015250565b5f6149256002836148e7565b9150614930826148f1565b600282019050919050565b5f819050919050565b614955614950826136c4565b61493b565b82525050565b5f61496582614919565b91506149718285614944565b6020820191506149818284614944565b6020820191508190509392505050565b5f6040820190506149a45f8301856137a9565b81810360208301526149b68184614845565b90509392505050565b5f815190506149cd816136cd565b92915050565b5f815190506149e18161358d565b92915050565b5f604082840312156149fc576149fb6139b1565b5b614a066040613a23565b90505f614a15848285016149bf565b5f830152506020614a28848285016149d3565b60208301525092915050565b5f60408284031215614a4957614a486134f7565b5b5f614a56848285016149e7565b91505092915050565b604082015f820151614a735f850182614452565b506020820151614a8660208501826142b8565b50505050565b5f604082019050614a9f5f830184614a5f565b92915050565b5f60a082019050614ab85f83018861384f565b614ac5602083018761384f565b614ad2604083018661384f565b614adf6060830185613989565b614aec60808301846137a9565b9695505050505050565b5f60a082019050614b095f83018861384f565b614b16602083018761384f565b614b236040830186613989565b614b306060830185613989565b614b3d608083018461384f565b9695505050505050565b5f606082019050614b5a5f83018661384f565b614b67602083018561384f565b614b74604083018461384f565b949350505050565b5f82825260208201905092915050565b7f556e737570706f72746564206b696e64000000000000000000000000000000005f82015250565b5f614bc0601083614b7c565b9150614bcb82614b8c565b602082019050919050565b5f6020820190508181035f830152614bed81614bb4565b9050919050565b5f6060820190508181035f830152614c0d8186886145e9565b9050614c1c6020830185613989565b614c296040830184613989565b95945050505050565b614c3b81613a41565b82525050565b5f608082019050614c545f83018761384f565b614c616020830186614c32565b614c6e604083018561384f565b614c7b606083018461384f565b95945050505050565b5f604082019050614c975f83018661384f565b8181036020830152614caa8184866145e9565b9050949350505050565b5f81519050614cc281613754565b92915050565b5f60208284031215614cdd57614cdc6134f7565b5b5f614cea84828501614cb4565b91505092915050565b5f6080820190508181035f830152614d0b8188614509565b9050614d1a602083018761384f565b614d2760408301866137a9565b8181036060830152614d3a8184866145e9565b90509695505050505050565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000005f82015250565b5f614d7a601c836148e7565b9150614d8582614d46565b601c82019050919050565b5f614d9a82614d6e565b9150614da68284614944565b60208201915081905092915050565b5f6040820190508181035f830152614dcd8186614509565b90508181036020830152614de28184866145e9565b9050949350505050565b5f60208284031215614e0157614e006134f7565b5b5f614e0e848285016149bf565b91505092915050565b7fff000000000000000000000000000000000000000000000000000000000000005f82015250565b5f614e4b6001836148e7565b9150614e5682614e17565b600182019050919050565b5f8160601b9050919050565b5f614e7782614e61565b9050919050565b5f614e8882614e6d565b9050919050565b614ea0614e9b8261351e565b614e7e565b82525050565b5f614eb082614e3f565b9150614ebc8286614e8f565b601482019150614ecc8285614944565b602082019150614edc8284614944565b602082019150819050949350505050565b5f6040820190508181035f830152614f058185614845565b9050614f1460208301846137a9565b9392505050565b5f614f25826142c7565b614f2f818561349a565b9350614f3f8185602086016142e1565b80840191505092915050565b5f614f568285614f1b565b9150614f628284614944565b6020820191508190509392505050565b7f53657175656e6365207369676e65723a0a0000000000000000000000000000005f82015250565b5f614fa66011836148e7565b9150614fb182614f72565b601182019050919050565b5f819050919050565b614fd6614fd182613584565b614fbc565b82525050565b5f614fe682614f9a565b9150614ff28285614e8f565b6014820191506150028284614fc5565b6020820191508190509392505050565b7f53657175656e6365206e657374656420636f6e6669673a0a00000000000000005f82015250565b5f6150466018836148e7565b915061505182615012565b601882019050919050565b5f6150668261503a565b91506150728286614944565b6020820191506150828285614fc5565b6020820191506150928284614fc5565b602082019150819050949350505050565b7f53657175656e636520737461746963206469676573743a0a00000000000000005f82015250565b5f6150d76018836148e7565b91506150e2826150a3565b601882019050919050565b5f6150f7826150cb565b91506151038284614944565b60208201915081905092915050565b7f53657175656e636520616e792061646472657373207375626469676573743a0a5f82015250565b5f6151466020836148e7565b915061515182615112565b602082019050919050565b5f6151668261513a565b91506151728284614944565b60208201915081905092915050565b7f53657175656e63652073617069656e7420636f6e6669673a0a000000000000005f82015250565b5f6151b56019836148e7565b91506151c082615181565b601982019050919050565b5f6151d5826151a9565b91506151e18286614e8f565b6014820191506151f18285614fc5565b6020820191506152018284614944565b602082019150819050949350505050565b5f610100820190506152265f83018b61384f565b615233602083018a6137a9565b6152406040830189613989565b61524d606083018861384f565b61525a6080830187613989565b61526760a0830186613f63565b61527460c0830185613f63565b61528160e0830184613989565b999850505050505050505056fea264697066735822122029c2dfaf9bf8caa4f501c06d7f4919758391aa8abd5b58287d527bddd7d9e19864736f6c634300081c00336080604052348015600e575f5ffd5b5061510f8061001c5f395ff3fe60806040526004361061010c575f3560e01c80638943ec0211610094578063b93ea7ad11610063578063b93ea7ad14610432578063bc197c811461044e578063ca7078501461048a578063f23a6e61146104c6578063f727ef1c1461050257610113565b80638943ec02146103635780638c3f55631461038b578063aaf10f42146103c7578063ad55366b146103f157610113565b80631f6a1eb9116100db5780631f6a1eb9146102bd57806329561426146102d95780634fcf3eca1461030157806351605d801461031d5780636ea445771461034757610113565b8063025b22bc146101ed578063150b7a02146102095780631626ba7e146102455780631a9b23371461028157610113565b3661011357005b60045f369050106101eb575f6101345f369061012f9190613318565b61052a565b90505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146101e9575f5f8273ffffffffffffffffffffffffffffffffffffffff165f366040516101929291906133b2565b5f60405180830381855af49150503d805f81146101ca576040519150601f19603f3d011682016040523d82523d5f602084013e6101cf565b606091505b5091509150816101e157805160208201fd5b805160208201f35b505b005b61020760048036038101906102029190613435565b61057f565b005b348015610214575f5ffd5b5061022f600480360381019061022a91906134f4565b6105fb565b60405161023c9190613587565b60405180910390f35b348015610250575f5ffd5b5061026b600480360381019061026691906135d3565b61060f565b6040516102789190613587565b60405180910390f35b34801561028c575f5ffd5b506102a760048036038101906102a2919061365a565b610669565b6040516102b49190613694565b60405180910390f35b6102d760048036038101906102d291906136ad565b61067a565b005b3480156102e4575f5ffd5b506102ff60048036038101906102fa919061372b565b610703565b005b61031b6004803603810190610316919061365a565b61077f565b005b348015610328575f5ffd5b50610331610874565b60405161033e9190613765565b60405180910390f35b610361600480360381019061035c919061377e565b6108a5565b005b34801561036e575f5ffd5b50610389600480360381019061038491906137c9565b61093e565b005b348015610396575f5ffd5b506103b160048036038101906103ac919061383a565b610944565b6040516103be9190613874565b60405180910390f35b3480156103d2575f5ffd5b506103db61097c565b6040516103e89190613694565b60405180910390f35b3480156103fc575f5ffd5b5061041760048036038101906104129190613dc6565b61098a565b60405161042996959493929190613e4e565b60405180910390f35b61044c60048036038101906104479190613ead565b6109c8565b005b348015610459575f5ffd5b50610474600480360381019061046f9190613f40565b610abe565b6040516104819190613587565b60405180910390f35b348015610495575f5ffd5b506104b060048036038101906104ab9190613dc6565b610ad5565b6040516104bd9190613765565b60405180910390f35b3480156104d1575f5ffd5b506104ec60048036038101906104e79190614017565b610c84565b6040516104f99190613587565b60405180910390f35b34801561050d575f5ffd5b50610528600480360381019061052391906140ee565b610c99565b005b5f6105767fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1205f1b837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916610d62565b5f1c9050919050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105ef57336040517fa19dbf000000000000000000000000000000000000000000000000000000000081526004016105e69190613694565b60405180910390fd5b6105f881610d9a565b50565b5f63150b7a0260e01b905095945050505050565b5f610618613223565b6003815f019060ff16908160ff1681525050848160e00181815250505f610640828686610ddd565b50905080610655575f60e01b92505050610662565b6320c13b0b60e01b925050505b9392505050565b5f6106738261052a565b9050919050565b5f6106858585610f46565b9050610699816060015182608001516113e8565b5f5f6106a6838686610ddd565b91509150816106f0578285856040517fa2b6d61b0000000000000000000000000000000000000000000000000000000081526004016106e7939291906144f1565b60405180910390fd5b6106fa818461148c565b50505050505050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461077357336040517fa19dbf0000000000000000000000000000000000000000000000000000000000815260040161076a9190613694565b60405180910390fd5b61077c81611726565b50565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107ef57336040517fa19dbf000000000000000000000000000000000000000000000000000000000081526004016107e69190613694565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff1661080f8261052a565b73ffffffffffffffffffffffffffffffffffffffff160361086757806040517f1c3812cc00000000000000000000000000000000000000000000000000000000815260040161085e9190613587565b60405180910390fd5b610871815f6117c7565b50565b5f6108a07fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85f1b611868565b905090565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461091557336040517fa19dbf0000000000000000000000000000000000000000000000000000000000815260040161090c9190613694565b60405180910390fd5b5f6109208383610f46565b90505f61092c82611872565b9050610938818361148c565b50505050565b50505050565b5f6109737f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e5f1b835f1b610d62565b5f1c9050919050565b5f6109856118c2565b905090565b5f5f5f5f5f5f61099d8989895f5f6118ca565b809550819650829750839950849a5050505050506109ba83611c07565b935093975093979195509350565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a3857336040517fa19dbf00000000000000000000000000000000000000000000000000000000008152600401610a2f9190613694565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff16610a588361052a565b73ffffffffffffffffffffffffffffffffffffffff1614610ab057816040517f5b4d6d6a000000000000000000000000000000000000000000000000000000008152600401610aa79190613587565b60405180910390fd5b610aba82826117c7565b5050565b5f63bc197c8160e01b905098975050505050505050565b5f5f600185610100015151610aea9190614555565b67ffffffffffffffff811115610b0357610b026138a1565b5b604051908082528060200260200182016040528015610b315781602001602082028036833780820191505090505b5090505f5f90505b85610100015151811015610bc1578561010001518181518110610b5f57610b5e614588565b5b6020026020010151828281518110610b7a57610b79614588565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508080600101915050610b39565b5033818661010001515181518110610bdc57610bdb614588565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050808561010001819052505f610c2c868686610ddd565b50905080610c75578585856040517ff58cc8b5000000000000000000000000000000000000000000000000000000008152600401610c6c939291906144f1565b60405180910390fd5b60015f1b925050509392505050565b5f63f23a6e6160e01b90509695505050505050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d0957336040517fa19dbf00000000000000000000000000000000000000000000000000000000008152600401610d009190613694565b60405180910390fd5b610d228383836bffffffffffffffffffffffff16611c18565b7febf265acfac1c01de588ed7ef49743b9c3ce8d6d1edeaf510a1f5453228515b1838383604051610d55939291906145c4565b60405180910390a1505050565b5f5f8383604051602001610d779291906145f9565b604051602081830303815290604052805190602001209050805491505092915050565b610da381611c76565b7f310ba5f1d2ed074b51e2eccd052a47ae9ab7c6b800d1fca3db3999d6a592ca0381604051610dd29190613694565b60405180910390a150565b5f5f5f84845f818110610df357610df2614588565b5b9050013560f81c60f81b9050608060f81b608060f81b82167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191603610f0c57610e3b86611872565b91505f5f610e4884611c7c565b9150915042811015610e935783816040517f9fa4fe54000000000000000000000000000000000000000000000000000000008152600401610e8a929190614620565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161480610ef857503373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b15610f095760019450505050610f3e565b50505b5f5f5f610f1c8989895f5f6118ca565b905080985081945082955083965050505050610f3781611c07565b9550505050505b935093915050565b610f4e613223565b5f815f019060ff16908160ff16815250505f5f610f6b8585611ccd565b915060ff169150600180831603610f8b575f836060018181525050610fc7565b610fa0818686611ce39290919263ffffffff16565b8173ffffffffffffffffffffffffffffffffffffffff169150846060018193508281525050505b5f6007600184901c1690505f81111561100457610ff682828888611d149190939291909392919063ffffffff16565b856080018194508281525050505b5f6010808516036110185760019050611070565b60208085160361104b57611037838888611d419290919263ffffffff16565b8161ffff169150809450819250505061106f565b611060838888611d609290919263ffffffff16565b8160ff16915080945081925050505b5b8067ffffffffffffffff81111561108a576110896138a1565b5b6040519080825280602002602001820160405280156110c357816020015b6110b061326e565b8152602001906001900390816110a85790505b5085604001819052505f5f90505b818110156113dd575f6110ef858a8a611d609290919263ffffffff16565b8096508192505050600180821660ff160361115e57308760400151838151811061111c5761111b614588565b5b60200260200101515f019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506111ca565b611173858a8a611d7b9290919263ffffffff16565b8860400151848151811061118a57611189614588565b5b60200260200101515f018197508273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050505b600280821660ff1603611218576111ec858a8a611dac9290919263ffffffff16565b8860400151848151811061120357611202614588565b5b60200260200101516020018197508281525050505b600480821660ff16036112e0575f61123b868b8b611dc29290919263ffffffff16565b8162ffffff169150809750819250505089898790838961125b9190614555565b926112689392919061464f565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f82011690508083019250505050505050886040015184815181106112c1576112c0614588565b5b60200260200101516040018190525080866112dc9190614555565b9550505b600880821660ff160361132e57611302858a8a611dac9290919263ffffffff16565b8860400151848151811061131957611318614588565b5b60200260200101516060018197508281525050505b601080821660ff16148760400151838151811061134e5761134d614588565b5b60200260200101516080019015159081151581525050602080821660ff16148760400151838151811061138457611383614588565b5b602002602001015160a0019015159081151581525050600660c0821660ff16901c60ff16876040015183815181106113bf576113be614588565b5b602002602001015160c00181815250505080806001019150506110d1565b505050505092915050565b5f6113f283610944565b905081811461143c578282826040517f9b6514f400000000000000000000000000000000000000000000000000000000815260040161143393929190614689565b60405180910390fd5b5f60018301905061144d8482611de2565b7f1f180c27086c7a39ea2a7b25239d1ab92348f07ca7bb59d1438fcf527568f881848260405161147e9291906146be565b60405180910390a150505050565b5f5f90505f82604001515190505f5f90505b8181101561171f575f846040015182815181106114be576114bd614588565b5b602002602001015190508060a0015180156114d7575083155b1561151e575f93507f9ae934bf8a986157c889a24c3b3fa85e74b7e4ee4b1f8fc6e7362cb4c1d19d8b8683604051611510929190614620565b60405180910390a150611712565b5f816060015190505f81141580156115355750805a105b1561157b5785835a6040517f21395274000000000000000000000000000000000000000000000000000000008152600401611572939291906146e5565b60405180910390fd5b5f8260800151156115ad576115a6835f01515f841461159a578361159c565b5a5b8560400151611e17565b90506115d5565b6115d2835f015184602001515f85146115c657846115c8565b5a5b8660400151611e2c565b90505b806116d5575f60ff168360c001510361162d57600195507f20832642214d5218c6428e71d8d2ddd9ad15a81ad2be8154d8c2e3ab08293fcb888560405161161d929190614620565b60405180910390a1505050611712565b600160ff168360c0015103611684578684611646611e43565b6040517f7f6b0bb100000000000000000000000000000000000000000000000000000000815260040161167b93929190614759565b60405180910390fd5b600260ff168360c00151036116d4577f5b5cb72c79981de49f1f950d4d8d62397e2fc2b772e1b788a640025075ab47c388856040516116c4929190614620565b60405180910390a150505061171f565b5b7fec670aed5ee1e72eb3eb601271be4b3f312e71f17eebdf10c1a0ab5a3af30ffd8885604051611706929190614620565b60405180910390a15050505b808060010191505061149e565b5050505050565b5f5f1b8103611761576040517f4294d12700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61178d7fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85f1b82611e61565b7f307ed6bd941ee9fc80f369c94af5fa11e25bab5102a6140191756c5474a30bfa816040516117bc9190613765565b60405180910390a150565b61182b7fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1205f1b837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168373ffffffffffffffffffffffffffffffffffffffff165f1b611e68565b7f0d7fc113eaf016db4681a1ba86d083ce3e0961f321062a75ac2b0aeb33deeed1828260405161185c92919061479c565b60405180910390a15050565b5f81549050919050565b5f5f611882836020015130611e9d565b90505f61188e84611f41565b905081816040516020016118a3929190614837565b6040516020818303038152906040528051906020012092505050919050565b5f3054905090565b5f5f5f5f5f5f5f6118db8b8b611ccd565b915060ff1691506118ea6132bf565b604080841614801561192757505f73ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff16145b15611a6357611941828d8d611d7b9290919263ffffffff16565b809350819a50505089611a62575f611964838e8e611dc29290919263ffffffff16565b8162ffffff16915080945081925050505f8d8d859084876119859190614555565b926119929392919061464f565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f8201169050808301925050505050505090508a73ffffffffffffffffffffffffffffffffffffffff1663ccce3bc830836040518363ffffffff1660e01b8152600401611a1192919061486d565b6040805180830381865afa158015611a2b573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611a4f9190614910565b92508184611a5d9190614555565b935050505b5b600180841603611a9c57611a8a8d8a838f8f87908092611a859392919061464f565b612152565b97509750975097509750505050611bfa565b6002808416148d60200190151590811515815250505f6002601c8516901c9050611ad883828f8f611d149190939291909392919063ffffffff16565b8094508197505050505f6001600560208616901c611af69190614555565b9050611b1483828f8f611d149190939291909392919063ffffffff16565b809450819a50505050611b268d611872565b9350611b448d858e8e86908092611b3f9392919061464f565b612396565b8097508198505050611b5886895f1b612f05565b9550611b6686865f1b612f05565b9550611b8a868a73ffffffffffffffffffffffffffffffffffffffff165f1b612f05565b95505f5f1b815f015114158015611ba4575085815f015114155b8015611bb4575080602001518511155b15611bf657806040517fccbb534f000000000000000000000000000000000000000000000000000000008152600401611bed9190614968565b60405180910390fd5b5050505b9550955095509550959050565b5f611c1182612f19565b9050919050565b611c717fc852adf5e97c2fc3b38f405671e91b7af1697ef0287577f227ef10494c2a8e865f1b846bffffffffffffffffffffffff841660608673ffffffffffffffffffffffffffffffffffffffff16901b175f1b611e68565b505050565b80305550565b5f5f5f611cab7fc852adf5e97c2fc3b38f405671e91b7af1697ef0287577f227ef10494c2a8e865f1b85610d62565b5f1c9050606081901c816bffffffffffffffffffffffff169250925050915091565b5f5f83358060f81c925060019150509250929050565b5f5f8483013573ffffffffffffffffffffffffffffffffffffffff8160601c16925060148401915050935093915050565b5f5f858401356008840261010003600180866008021b0382821c1693508486019250505094509492505050565b5f5f8483013561ffff8160f01c16925060028401915050935093915050565b5f5f848301358060f81c925060018401915050935093915050565b5f5f8483013573ffffffffffffffffffffffffffffffffffffffff8160601c16925060148401915050935093915050565b5f5f848301359150602083019050935093915050565b5f5f8483013562ffffff8160e81c16925060038401915050935093915050565b611e137f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e5f1b835f1b835f1b611e68565b5050565b5f5f5f8351602085018787f490509392505050565b5f5f5f835160208501878988f19050949350505050565b60603d604051915060208201818101604052818352815f823e505090565b8082555050565b5f8383604051602001611e7c9291906145f9565b60405160208183030381529060405280519060200120905081815550505050565b5f7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f7f4aa45ca7ad825ceb1bf35643f0a58c295239df563b1b565c2485f96477c563187f2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de85611f0c5746611f0e565b5f5b85604051602001611f23959493929190614981565b60405160208183030381529060405280519060200120905092915050565b5f5f611f51836101000151612f5c565b90505f60ff16835f015160ff1603611fd3575f611f718460400151612fc9565b90507f11e1e4079a79a66e4ade50033cfe2678cdd5341d2dfe5ef9513edb1a0be147a2818560600151866080015185604051602001611fb49594939291906149d2565b604051602081830303815290604052805190602001209250505061214d565b600160ff16835f015160ff1603612042577fe19a3b94fc3c7ece3f890d98a99bc422615537a08dea0603fa8425867d87d4668360a00151805190602001208260405160200161202493929190614a23565b6040516020818303038152906040528051906020012091505061214d565b600260ff16835f015160ff16036120aa577f11fdeb7e8373a1aa96bfac8d0ea91526b2c5d15e5cee20e0543e780258f3e8e48360c001518260405160200161208c93929190614a23565b6040516020818303038152906040528051906020012091505061214d565b600360ff16835f015160ff1603612112577f402e923b91e918306019e73f589362164a6a059499a504699c66feabbb3e26248360e00151826040516020016120f493929190614a23565b6040516020818303038152906040528051906020012091505061214d565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161214490614ab2565b60405180910390fd5b919050565b5f5f5f5f5f61215f613223565b6002815f019060ff16908160ff16815250505f5f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90505b89899050821015612320575f5f6121b9848d8d611dc29290919263ffffffff16565b8162ffffff169150809550819250505083816121d59190614555565b9150505f8b8b905082146121e9575f6121eb565b8d5b90505f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff841461221b578561221d565b8f5b905061223d818e8e889087926122359392919061464f565b6001866118ca565b50809b50819c50829d50839e50505050508a8a10156122a9578c8c869085926122689392919061464f565b8c8c6040517fb006aba00000000000000000000000000000000000000000000000000000000081526004016122a09493929190614ad0565b60405180910390fd5b829450888e5f0151036122c2575f5f1b8e5f0181815250505b8388106123085787846040517f37daf62b0000000000000000000000000000000000000000000000000000000081526004016122ff9291906146be565b60405180910390fd5b888660c0018181525050879350829450505050612197565b5f5f1b8b5f01511415801561233957508a602001518511155b1561237b578a6040517fccbb534f0000000000000000000000000000000000000000000000000000000081526004016123729190614968565b60405180910390fd5b6123848d611872565b93505050509550955095509550959050565b5f5f5f5b84849050811015612efb575f6123bb828787611d609290919263ffffffff16565b8160ff16915080935081925050505f600460f08316901c90505f8103612513575f600f831690505f8160ff160361240a57612401848989611d609290919263ffffffff16565b80955081925050505b5f5f612421868b8b6130439290919263ffffffff16565b809750819350505061243e868b8b6130439290919263ffffffff16565b80975081925050505f60ff82901c5f1c90505f7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff835f1c165f1b90505f601b830190505f60018f8388866040515f81526020016040526040516124a49493929190614b1d565b6020604051602081039080840390855afa1580156124c4573d5f5f3e3d5ffd5b5050506020604051035190508660ff168c019b505f6124e6828960ff16613059565b90505f5f1b8c036124f75780612502565b6125018c82612f05565b5b9b505050505050505050505061239a565b6001810361259e575f600f831690505f8160ff160361254a57612541848989611d609290919263ffffffff16565b80955081925050505b5f612560858a8a611d7b9290919263ffffffff16565b80965081925050505f612576828460ff16613059565b90505f5f1b87036125875780612592565b6125918782612f05565b5b9650505050505061239a565b6002810361278f575f6003831690505f8160ff16036125d5576125cc848989611d609290919263ffffffff16565b80955081925050505b5f6125eb858a8a611d7b9290919263ffffffff16565b80965081925050505f6002600c861660ff16901c60ff1690505f61262187838d8d611d149190939291909392919063ffffffff16565b80985081925050505f81880190506320c13b0b60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168473ffffffffffffffffffffffffffffffffffffffff16631626ba7e8f8f8f8d9087926126859392919061464f565b6040518463ffffffff1660e01b81526004016126a393929190614b60565b602060405180830381865afa1580156126be573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906126e29190614ba4565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461274b578d8d858e8e6040517ff734863a000000000000000000000000000000000000000000000000000000008152600401612742959493929190614bcf565b60405180910390fd5b8097508460ff168a0199505f612764858760ff16613059565b90505f5f1b8a036127755780612780565b61277f8a82612f05565b5b9950505050505050505061239a565b600381036127d9575f6127ad8489896130439290919263ffffffff16565b80955081925050505f5f1b85036127c457806127cf565b6127ce8582612f05565b5b945050505061239a565b6004810361285b575f600f831660ff1690505f61280885838b8b611d149190939291909392919063ffffffff16565b80965081925050505f81860190505f5f6128348e8e8e8e8c90889261282f9392919061464f565b612396565b91509150829750818a01995061284a8982612f05565b98508297505050505050505061239a565b6006810361296b575f6002600c841660ff16901c60ff1690505f810361289f57612890848989611d609290919263ffffffff16565b8160ff16915080955081925050505b5f6003841660ff1690505f81036128d5576128c5858a8a611d419290919263ffffffff16565b8161ffff16915080965081925050505b5f6128eb868b8b611dc29290919263ffffffff16565b8162ffffff16915080975081925050505f81870190505f5f61291f8f8f8f8f8d90889261291a9392919061464f565b612396565b9150915082985084821061293357858b019a505b5f61293f82878961308b565b90505f5f1b8b03612950578061295b565b61295a8b82612f05565b5b9a5050505050505050505061239a565b600581036129ed575f6129898489896130439290919263ffffffff16565b80955081925050508881036129bc577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff95505b5f6129c6826130c0565b90505f5f1b86036129d757806129e2565b6129e18682612f05565b5b95505050505061239a565b60078103612b53575f600f831690505f8160ff1603612a2457612a1b848989611d609290919263ffffffff16565b80955081925050505b5f5f612a3b868b8b6130439290919263ffffffff16565b8097508193505050612a58868b8b6130439290919263ffffffff16565b80975081925050505f60ff82901c5f1c90505f7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff835f1c165f1b90505f601b830190505f60018f604051602001612aaf9190614c6c565b604051602081830303815290604052805190602001208388866040515f8152602001604052604051612ae49493929190614b1d565b6020604051602081039080840390855afa158015612b04573d5f5f3e3d5ffd5b5050506020604051035190508660ff168c019b505f612b26828960ff16613059565b90505f5f1b8c03612b375780612b42565b612b418c82612f05565b5b9b505050505050505050505061239a565b60088103612bec575f612b718489896130439290919263ffffffff16565b80955081925050505f612b8d5f8c6130ef90919063ffffffff16565b9050808203612bba577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff96505b5f612bc482613140565b90505f5f1b8703612bd55780612be0565b612bdf8782612f05565b5b9650505050505061239a565b60098103612d55575f6003831690505f8160ff1603612c2357612c1a848989611d609290919263ffffffff16565b80955081925050505b5f612c39858a8a611d7b9290919263ffffffff16565b80965081925050505f5f6002600c871660ff16901c60ff169050612c6f87828d8d611d149190939291909392919063ffffffff16565b8098508193505050505f81870190505f8373ffffffffffffffffffffffffffffffffffffffff1663ca7078508f8e8e8c908792612cae9392919061464f565b6040518463ffffffff1660e01b8152600401612ccc93929190614c91565b602060405180830381865afa158015612ce7573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190612d0b9190614cc8565b90508197508460ff168a0199505f612d27858760ff168461316f565b90505f5f1b8a03612d385780612d43565b612d428a82612f05565b5b9950829850505050505050505061239a565b600a8103612ebe575f6003831690505f8160ff1603612d8c57612d83848989611d609290919263ffffffff16565b80955081925050505b5f612da2858a8a611d7b9290919263ffffffff16565b80965081925050505f6002600c861660ff16901c60ff1690505f612dd887838d8d611d149190939291909392919063ffffffff16565b80985081925050505f81880190505f8473ffffffffffffffffffffffffffffffffffffffff1663957d2b238f8f8f8d908792612e169392919061464f565b6040518463ffffffff1660e01b8152600401612e3493929190614b60565b602060405180830381865afa158015612e4f573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190612e739190614cc8565b90508198508560ff168b019a505f612e8f868860ff168461316f565b90505f5f1b8b03612ea05780612eab565b612eaa8b82612f05565b5b9a5082995050505050505050505061239a565b806040517fb2505f7c000000000000000000000000000000000000000000000000000000008152600401612ef29190613874565b60405180910390fd5b5094509492505050565b5f825f528160205260405f20905092915050565b5f5f5f1b8214158015612f555750612f527fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85f1b611868565b82145b9050919050565b5f60605f5f90505b8351811015612fb85781848281518110612f8157612f80614588565b5b6020026020010151604051602001612f9a929190614cf3565b60405160208183030381529060405291508080600101915050612f64565b508080519060200120915050919050565b5f60605f5f90505b8351811015613032575f612ffe858381518110612ff157612ff0614588565b5b60200260200101516131a4565b90508281604051602001613013929190614d51565b6040516020818303038152906040529250508080600101915050612fd1565b508080519060200120915050919050565b5f5f848301359150602083019050935093915050565b5f828260405160200161306d929190614e27565b60405160208183030381529060405280519060200120905092915050565b5f8383836040516020016130a193929190614ea7565b6040516020818303038152906040528051906020012090509392505050565b5f816040516020016130d29190614f38565b604051602081830303815290604052805190602001209050919050565b5f5f6130ff846020015184611e9d565b90505f61310b85611f41565b90508181604051602001613120929190614837565b604051602081830303815290604052805190602001209250505092915050565b5f816040516020016131529190614fa7565b604051602081830303815290604052805190602001209050919050565b5f83838360405160200161318593929190615016565b6040516020818303038152906040528051906020012090509392505050565b5f7f0603985259a953da1f65a522f589c17bd1d0117ec1d3abb7c0788aef251ef437825f01518360200151846040015180519060200120856060015186608001518760a001518860c0015160405160200161320698979695949392919061505d565b604051602081830303815290604052805190602001209050919050565b6040518061012001604052805f60ff1681526020015f15158152602001606081526020015f81526020015f8152602001606081526020015f81526020015f8152602001606081525090565b6040518060e001604052805f73ffffffffffffffffffffffffffffffffffffffff1681526020015f8152602001606081526020015f81526020015f151581526020015f151581526020015f81525090565b60405180604001604052805f81526020015f81525090565b5f82905092915050565b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b5f82821b905092915050565b5f61332383836132d7565b8261332e81356132e1565b9250600482101561336e576133697fffffffff000000000000000000000000000000000000000000000000000000008360040360080261330c565b831692505b505092915050565b5f81905092915050565b828183375f83830152505050565b5f6133998385613376565b93506133a6838584613380565b82840190509392505050565b5f6133be82848661338e565b91508190509392505050565b5f604051905090565b5f5ffd5b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f613404826133db565b9050919050565b613414816133fa565b811461341e575f5ffd5b50565b5f8135905061342f8161340b565b92915050565b5f6020828403121561344a576134496133d3565b5b5f61345784828501613421565b91505092915050565b5f819050919050565b61347281613460565b811461347c575f5ffd5b50565b5f8135905061348d81613469565b92915050565b5f5ffd5b5f5ffd5b5f5ffd5b5f5f83601f8401126134b4576134b3613493565b5b8235905067ffffffffffffffff8111156134d1576134d0613497565b5b6020830191508360018202830111156134ed576134ec61349b565b5b9250929050565b5f5f5f5f5f6080868803121561350d5761350c6133d3565b5b5f61351a88828901613421565b955050602061352b88828901613421565b945050604061353c8882890161347f565b935050606086013567ffffffffffffffff81111561355d5761355c6133d7565b5b6135698882890161349f565b92509250509295509295909350565b613581816132e1565b82525050565b5f60208201905061359a5f830184613578565b92915050565b5f819050919050565b6135b2816135a0565b81146135bc575f5ffd5b50565b5f813590506135cd816135a9565b92915050565b5f5f5f604084860312156135ea576135e96133d3565b5b5f6135f7868287016135bf565b935050602084013567ffffffffffffffff811115613618576136176133d7565b5b6136248682870161349f565b92509250509250925092565b613639816132e1565b8114613643575f5ffd5b50565b5f8135905061365481613630565b92915050565b5f6020828403121561366f5761366e6133d3565b5b5f61367c84828501613646565b91505092915050565b61368e816133fa565b82525050565b5f6020820190506136a75f830184613685565b92915050565b5f5f5f5f604085870312156136c5576136c46133d3565b5b5f85013567ffffffffffffffff8111156136e2576136e16133d7565b5b6136ee8782880161349f565b9450945050602085013567ffffffffffffffff811115613711576137106133d7565b5b61371d8782880161349f565b925092505092959194509250565b5f602082840312156137405761373f6133d3565b5b5f61374d848285016135bf565b91505092915050565b61375f816135a0565b82525050565b5f6020820190506137785f830184613756565b92915050565b5f5f60208385031215613794576137936133d3565b5b5f83013567ffffffffffffffff8111156137b1576137b06133d7565b5b6137bd8582860161349f565b92509250509250929050565b5f5f5f5f606085870312156137e1576137e06133d3565b5b5f6137ee87828801613421565b94505060206137ff8782880161347f565b935050604085013567ffffffffffffffff8111156138205761381f6133d7565b5b61382c8782880161349f565b925092505092959194509250565b5f6020828403121561384f5761384e6133d3565b5b5f61385c8482850161347f565b91505092915050565b61386e81613460565b82525050565b5f6020820190506138875f830184613865565b92915050565b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6138d782613891565b810181811067ffffffffffffffff821117156138f6576138f56138a1565b5b80604052505050565b5f6139086133ca565b905061391482826138ce565b919050565b5f5ffd5b5f60ff82169050919050565b6139328161391d565b811461393c575f5ffd5b50565b5f8135905061394d81613929565b92915050565b5f8115159050919050565b61396781613953565b8114613971575f5ffd5b50565b5f813590506139828161395e565b92915050565b5f67ffffffffffffffff8211156139a2576139a16138a1565b5b602082029050602081019050919050565b5f5ffd5b5f67ffffffffffffffff8211156139d1576139d06138a1565b5b6139da82613891565b9050602081019050919050565b5f6139f96139f4846139b7565b6138ff565b905082815260208101848484011115613a1557613a146139b3565b5b613a20848285613380565b509392505050565b5f82601f830112613a3c57613a3b613493565b5b8135613a4c8482602086016139e7565b91505092915050565b5f60e08284031215613a6a57613a6961388d565b5b613a7460e06138ff565b90505f613a8384828501613421565b5f830152506020613a968482850161347f565b602083015250604082013567ffffffffffffffff811115613aba57613ab9613919565b5b613ac684828501613a28565b6040830152506060613ada8482850161347f565b6060830152506080613aee84828501613974565b60808301525060a0613b0284828501613974565b60a08301525060c0613b168482850161347f565b60c08301525092915050565b5f613b34613b2f84613988565b6138ff565b90508083825260208201905060208402830185811115613b5757613b5661349b565b5b835b81811015613b9e57803567ffffffffffffffff811115613b7c57613b7b613493565b5b808601613b898982613a55565b85526020850194505050602081019050613b59565b5050509392505050565b5f82601f830112613bbc57613bbb613493565b5b8135613bcc848260208601613b22565b91505092915050565b5f67ffffffffffffffff821115613bef57613bee6138a1565b5b602082029050602081019050919050565b5f613c12613c0d84613bd5565b6138ff565b90508083825260208201905060208402830185811115613c3557613c3461349b565b5b835b81811015613c5e5780613c4a8882613421565b845260208401935050602081019050613c37565b5050509392505050565b5f82601f830112613c7c57613c7b613493565b5b8135613c8c848260208601613c00565b91505092915050565b5f6101208284031215613cab57613caa61388d565b5b613cb66101206138ff565b90505f613cc58482850161393f565b5f830152506020613cd884828501613974565b602083015250604082013567ffffffffffffffff811115613cfc57613cfb613919565b5b613d0884828501613ba8565b6040830152506060613d1c8482850161347f565b6060830152506080613d308482850161347f565b60808301525060a082013567ffffffffffffffff811115613d5457613d53613919565b5b613d6084828501613a28565b60a08301525060c0613d74848285016135bf565b60c08301525060e0613d88848285016135bf565b60e08301525061010082013567ffffffffffffffff811115613dad57613dac613919565b5b613db984828501613c68565b6101008301525092915050565b5f5f5f60408486031215613ddd57613ddc6133d3565b5b5f84013567ffffffffffffffff811115613dfa57613df96133d7565b5b613e0686828701613c95565b935050602084013567ffffffffffffffff811115613e2757613e266133d7565b5b613e338682870161349f565b92509250509250925092565b613e4881613953565b82525050565b5f60c082019050613e615f830189613865565b613e6e6020830188613865565b613e7b6040830187613e3f565b613e886060830186613756565b613e956080830185613865565b613ea260a0830184613756565b979650505050505050565b5f5f60408385031215613ec357613ec26133d3565b5b5f613ed085828601613646565b9250506020613ee185828601613421565b9150509250929050565b5f5f83601f840112613f0057613eff613493565b5b8235905067ffffffffffffffff811115613f1d57613f1c613497565b5b602083019150836020820283011115613f3957613f3861349b565b5b9250929050565b5f5f5f5f5f5f5f5f60a0898b031215613f5c57613f5b6133d3565b5b5f613f698b828c01613421565b9850506020613f7a8b828c01613421565b975050604089013567ffffffffffffffff811115613f9b57613f9a6133d7565b5b613fa78b828c01613eeb565b9650965050606089013567ffffffffffffffff811115613fca57613fc96133d7565b5b613fd68b828c01613eeb565b9450945050608089013567ffffffffffffffff811115613ff957613ff86133d7565b5b6140058b828c0161349f565b92509250509295985092959890939650565b5f5f5f5f5f5f60a08789031215614031576140306133d3565b5b5f61403e89828a01613421565b965050602061404f89828a01613421565b955050604061406089828a0161347f565b945050606061407189828a0161347f565b935050608087013567ffffffffffffffff811115614092576140916133d7565b5b61409e89828a0161349f565b92509250509295509295509295565b5f6bffffffffffffffffffffffff82169050919050565b6140cd816140ad565b81146140d7575f5ffd5b50565b5f813590506140e8816140c4565b92915050565b5f5f5f60608486031215614105576141046133d3565b5b5f614112868287016135bf565b935050602061412386828701613421565b9250506040614134868287016140da565b9150509250925092565b6141478161391d565b82525050565b61415681613953565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b61418e816133fa565b82525050565b61419d81613460565b82525050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f6141d5826141a3565b6141df81856141ad565b93506141ef8185602086016141bd565b6141f881613891565b840191505092915050565b5f60e083015f8301516142185f860182614185565b50602083015161422b6020860182614194565b506040830151848203604086015261424382826141cb565b91505060608301516142586060860182614194565b50608083015161426b608086018261414d565b5060a083015161427e60a086018261414d565b5060c083015161429160c0860182614194565b508091505092915050565b5f6142a78383614203565b905092915050565b5f602082019050919050565b5f6142c58261415c565b6142cf8185614166565b9350836020820285016142e185614176565b805f5b8581101561431c57848403895281516142fd858261429c565b9450614308836142af565b925060208a019950506001810190506142e4565b50829750879550505050505092915050565b614337816135a0565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f6143718383614185565b60208301905092915050565b5f602082019050919050565b5f6143938261433d565b61439d8185614347565b93506143a883614357565b805f5b838110156143d85781516143bf8882614366565b97506143ca8361437d565b9250506001810190506143ab565b5085935050505092915050565b5f61012083015f8301516143fb5f86018261413e565b50602083015161440e602086018261414d565b506040830151848203604086015261442682826142bb565b915050606083015161443b6060860182614194565b50608083015161444e6080860182614194565b5060a083015184820360a086015261446682826141cb565b91505060c083015161447b60c086018261432e565b5060e083015161448e60e086018261432e565b506101008301518482036101008601526144a88282614389565b9150508091505092915050565b5f82825260208201905092915050565b5f6144d083856144b5565b93506144dd838584613380565b6144e683613891565b840190509392505050565b5f6040820190508181035f83015261450981866143e5565b9050818103602083015261451e8184866144c5565b9050949350505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61455f82613460565b915061456a83613460565b925082820190508082111561458257614581614528565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b6145be816140ad565b82525050565b5f6060820190506145d75f830186613756565b6145e46020830185613685565b6145f160408301846145b5565b949350505050565b5f60408201905061460c5f830185613756565b6146196020830184613756565b9392505050565b5f6040820190506146335f830185613756565b6146406020830184613865565b9392505050565b5f5ffd5b5f5ffd5b5f5f8585111561466257614661614647565b5b838611156146735761467261464b565b5b6001850283019150848603905094509492505050565b5f60608201905061469c5f830186613865565b6146a96020830185613865565b6146b66040830184613865565b949350505050565b5f6040820190506146d15f830185613865565b6146de6020830184613865565b9392505050565b5f6060820190508181035f8301526146fd81866143e5565b905061470c6020830185613865565b6147196040830184613865565b949350505050565b5f61472b826141a3565b61473581856144b5565b93506147458185602086016141bd565b61474e81613891565b840191505092915050565b5f6060820190508181035f83015261477181866143e5565b90506147806020830185613865565b81810360408301526147928184614721565b9050949350505050565b5f6040820190506147af5f830185613578565b6147bc6020830184613685565b9392505050565b5f81905092915050565b7f19010000000000000000000000000000000000000000000000000000000000005f82015250565b5f6148016002836147c3565b915061480c826147cd565b600282019050919050565b5f819050919050565b61483161482c826135a0565b614817565b82525050565b5f614841826147f5565b915061484d8285614820565b60208201915061485d8284614820565b6020820191508190509392505050565b5f6040820190506148805f830185613685565b81810360208301526148928184614721565b90509392505050565b5f815190506148a9816135a9565b92915050565b5f815190506148bd81613469565b92915050565b5f604082840312156148d8576148d761388d565b5b6148e260406138ff565b90505f6148f18482850161489b565b5f830152506020614904848285016148af565b60208301525092915050565b5f60408284031215614925576149246133d3565b5b5f614932848285016148c3565b91505092915050565b604082015f82015161494f5f85018261432e565b5060208201516149626020850182614194565b50505050565b5f60408201905061497b5f83018461493b565b92915050565b5f60a0820190506149945f830188613756565b6149a16020830187613756565b6149ae6040830186613756565b6149bb6060830185613865565b6149c86080830184613685565b9695505050505050565b5f60a0820190506149e55f830188613756565b6149f26020830187613756565b6149ff6040830186613865565b614a0c6060830185613865565b614a196080830184613756565b9695505050505050565b5f606082019050614a365f830186613756565b614a436020830185613756565b614a506040830184613756565b949350505050565b5f82825260208201905092915050565b7f556e737570706f72746564206b696e64000000000000000000000000000000005f82015250565b5f614a9c601083614a58565b9150614aa782614a68565b602082019050919050565b5f6020820190508181035f830152614ac981614a90565b9050919050565b5f6060820190508181035f830152614ae98186886144c5565b9050614af86020830185613865565b614b056040830184613865565b95945050505050565b614b178161391d565b82525050565b5f608082019050614b305f830187613756565b614b3d6020830186614b0e565b614b4a6040830185613756565b614b576060830184613756565b95945050505050565b5f604082019050614b735f830186613756565b8181036020830152614b868184866144c5565b9050949350505050565b5f81519050614b9e81613630565b92915050565b5f60208284031215614bb957614bb86133d3565b5b5f614bc684828501614b90565b91505092915050565b5f6080820190508181035f830152614be781886143e5565b9050614bf66020830187613756565b614c036040830186613685565b8181036060830152614c168184866144c5565b90509695505050505050565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000005f82015250565b5f614c56601c836147c3565b9150614c6182614c22565b601c82019050919050565b5f614c7682614c4a565b9150614c828284614820565b60208201915081905092915050565b5f6040820190508181035f830152614ca981866143e5565b90508181036020830152614cbe8184866144c5565b9050949350505050565b5f60208284031215614cdd57614cdc6133d3565b5b5f614cea8482850161489b565b91505092915050565b5f6040820190508181035f830152614d0b8185614721565b9050614d1a6020830184613685565b9392505050565b5f614d2b826141a3565b614d358185613376565b9350614d458185602086016141bd565b80840191505092915050565b5f614d5c8285614d21565b9150614d688284614820565b6020820191508190509392505050565b7f53657175656e6365207369676e65723a0a0000000000000000000000000000005f82015250565b5f614dac6011836147c3565b9150614db782614d78565b601182019050919050565b5f8160601b9050919050565b5f614dd882614dc2565b9050919050565b5f614de982614dce565b9050919050565b614e01614dfc826133fa565b614ddf565b82525050565b5f819050919050565b614e21614e1c82613460565b614e07565b82525050565b5f614e3182614da0565b9150614e3d8285614df0565b601482019150614e4d8284614e10565b6020820191508190509392505050565b7f53657175656e6365206e657374656420636f6e6669673a0a00000000000000005f82015250565b5f614e916018836147c3565b9150614e9c82614e5d565b601882019050919050565b5f614eb182614e85565b9150614ebd8286614820565b602082019150614ecd8285614e10565b602082019150614edd8284614e10565b602082019150819050949350505050565b7f53657175656e636520737461746963206469676573743a0a00000000000000005f82015250565b5f614f226018836147c3565b9150614f2d82614eee565b601882019050919050565b5f614f4282614f16565b9150614f4e8284614820565b60208201915081905092915050565b7f53657175656e636520616e792061646472657373207375626469676573743a0a5f82015250565b5f614f916020836147c3565b9150614f9c82614f5d565b602082019050919050565b5f614fb182614f85565b9150614fbd8284614820565b60208201915081905092915050565b7f53657175656e63652073617069656e7420636f6e6669673a0a000000000000005f82015250565b5f6150006019836147c3565b915061500b82614fcc565b601982019050919050565b5f61502082614ff4565b915061502c8286614df0565b60148201915061503c8285614e10565b60208201915061504c8284614820565b602082019150819050949350505050565b5f610100820190506150715f83018b613756565b61507e602083018a613685565b61508b6040830189613865565b6150986060830188613756565b6150a56080830187613865565b6150b260a0830186613e3f565b6150bf60c0830185613e3f565b6150cc60e0830184613865565b999850505050505050505056fea2646970667358221220b6049667609a832a90bbaec2d8549c97c88a6adfe1df55491468c762932d4ae664736f6c634300081c0033603e600e3d39601e805130553df33d3d34601c57363d3d373d363d30545af43d82803e903d91601c57fd5bf3',
      signer
    )
  }
}
