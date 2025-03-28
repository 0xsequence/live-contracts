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
          stateMutability: 'payable'
        },
        {
          type: 'function',
          name: 'execute',
          inputs: [
            { name: '_payload', type: 'bytes', internalType: 'bytes' },
            { name: '_signature', type: 'bytes', internalType: 'bytes' }
          ],
          outputs: [],
          stateMutability: 'payable'
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
          name: 'recoverSapientSignature',
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
          name: 'removeHook',
          inputs: [{ name: 'signature', type: 'bytes4', internalType: 'bytes4' }],
          outputs: [],
          stateMutability: 'payable'
        },
        {
          type: 'function',
          name: 'selfExecute',
          inputs: [{ name: '_payload', type: 'bytes', internalType: 'bytes' }],
          outputs: [],
          stateMutability: 'payable'
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
          stateMutability: 'payable'
        },
        {
          type: 'event',
          name: 'CallAborted',
          inputs: [
            { name: '_opHash', type: 'bytes32', indexed: false, internalType: 'bytes32' },
            { name: '_index', type: 'uint256', indexed: false, internalType: 'uint256' },
            { name: '_returnData', type: 'bytes', indexed: false, internalType: 'bytes' }
          ],
          anonymous: false
        },
        {
          type: 'event',
          name: 'CallFailed',
          inputs: [
            { name: '_opHash', type: 'bytes32', indexed: false, internalType: 'bytes32' },
            { name: '_index', type: 'uint256', indexed: false, internalType: 'uint256' },
            { name: '_returnData', type: 'bytes', indexed: false, internalType: 'bytes' }
          ],
          anonymous: false
        },
        {
          type: 'event',
          name: 'CallSkipped',
          inputs: [
            { name: '_opHash', type: 'bytes32', indexed: false, internalType: 'bytes32' },
            { name: '_index', type: 'uint256', indexed: false, internalType: 'uint256' }
          ],
          anonymous: false
        },
        {
          type: 'event',
          name: 'CallSuccess',
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
          name: 'StaticSignatureSet',
          inputs: [
            { name: '_hash', type: 'bytes32', indexed: false, internalType: 'bytes32' },
            { name: '_address', type: 'address', indexed: false, internalType: 'address' },
            { name: '_timestamp', type: 'uint96', indexed: false, internalType: 'uint96' }
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
          name: 'InvalidSignatureWeight',
          inputs: [
            { name: '_threshold', type: 'uint256', internalType: 'uint256' },
            { name: '_weight', type: 'uint256', internalType: 'uint256' }
          ]
        },
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
      '0x60e060405234801561000f575f5ffd5b5060405161a9d738038061a9d783398181016040528101906100319190610196565b8060405161003e9061012b565b604051809103905ff080158015610057573d5f5f3e3d5ffd5b505f6040518060600160405280602c815260200161a9ab602c91393073ffffffffffffffffffffffffffffffffffffffff1660405160200161009a92919061023c565b60405160208183030381529060405280519060200120905080608081815250508273ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508173ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff168152505050505050610263565b6152b8806156f383390190565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6101658261013c565b9050919050565b6101758161015b565b811461017f575f5ffd5b50565b5f815190506101908161016c565b92915050565b5f602082840312156101ab576101aa610138565b5b5f6101b884828501610182565b91505092915050565b5f81519050919050565b5f81905092915050565b8281835e5f83830152505050565b5f6101ed826101c1565b6101f781856101cb565b93506102078185602086016101d5565b80840191505092915050565b5f819050919050565b5f819050919050565b61023661023182610213565b61021c565b82525050565b5f61024782856101e3565b91506102538284610225565b6020820191508190509392505050565b60805160a05160c0516154516102a25f395f8181610bba015261195901525f81816109c401526130e201525f8181610924015261310401526154515ff3fe608060405260043610610122575f3560e01c80636ea445771161009f578063ad55366b11610063578063ad55366b14610497578063b93ea7ad146104d8578063bc197c81146104f4578063f23a6e6114610530578063f727ef1c1461056c57610129565b80636ea44577146103c35780638943ec02146103df5780638c3f5563146104075780639f69ef5414610443578063aaf10f421461046d57610129565b80631f6a1eb9116100e65780631f6a1eb91461030f578063257671f51461032b57806329561426146103555780632dd310001461037d5780634fcf3eca146103a757610129565b8063025b22bc1461020357806313792a4a1461021f578063150b7a021461025b5780631626ba7e146102975780631a9b2337146102d357610129565b3661012957005b60045f36905010610201575f61014a5f36906101459190613527565b610594565b90505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146101ff575f5f8273ffffffffffffffffffffffffffffffffffffffff165f366040516101a89291906135c1565b5f60405180830381855af49150503d805f81146101e0576040519150601f19603f3d011682016040523d82523d5f602084013e6101e5565b606091505b5091509150816101f757805160208201fd5b805160208201f35b505b005b61021d60048036038101906102189190613644565b6105e9565b005b34801561022a575f5ffd5b5061024560048036038101906102409190613c6f565b610665565b6040516102529190613cf7565b60405180910390f35b348015610266575f5ffd5b50610281600480360381019061027c9190613d10565b610814565b60405161028e9190613da3565b60405180910390f35b3480156102a2575f5ffd5b506102bd60048036038101906102b89190613dbc565b610828565b6040516102ca9190613da3565b60405180910390f35b3480156102de575f5ffd5b506102f960048036038101906102f49190613e43565b610882565b6040516103069190613e7d565b60405180910390f35b61032960048036038101906103249190613e96565b610893565b005b348015610336575f5ffd5b5061033f610922565b60405161034c9190613cf7565b60405180910390f35b348015610360575f5ffd5b5061037b60048036038101906103769190613f14565b610946565b005b348015610388575f5ffd5b506103916109c2565b60405161039e9190613e7d565b60405180910390f35b6103c160048036038101906103bc9190613e43565b6109e6565b005b6103dd60048036038101906103d89190613f3f565b610adb565b005b3480156103ea575f5ffd5b5061040560048036038101906104009190613f8a565b610b7a565b005b348015610412575f5ffd5b5061042d60048036038101906104289190613ffb565b610b80565b60405161043a9190614035565b60405180910390f35b34801561044e575f5ffd5b50610457610bb8565b6040516104649190613e7d565b60405180910390f35b348015610478575f5ffd5b50610481610bdc565b60405161048e9190613e7d565b60405180910390f35b3480156104a2575f5ffd5b506104bd60048036038101906104b89190613c6f565b610bea565b6040516104cf9695949392919061405d565b60405180910390f35b6104f260048036038101906104ed91906140bc565b610c28565b005b3480156104ff575f5ffd5b5061051a6004803603810190610515919061414f565b610d1e565b6040516105279190613da3565b60405180910390f35b34801561053b575f5ffd5b5061055660048036038101906105519190614226565b610d35565b6040516105639190613da3565b60405180910390f35b348015610577575f5ffd5b50610592600480360381019061058d91906142fd565b610d4a565b005b5f6105e07fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1205f1b837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916610e13565b5f1c9050919050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461065957336040517fa19dbf000000000000000000000000000000000000000000000000000000000081526004016106509190613e7d565b60405180910390fd5b61066281610e4b565b50565b5f5f60018561010001515161067a919061437a565b67ffffffffffffffff81111561069357610692613683565b5b6040519080825280602002602001820160405280156106c15781602001602082028036833780820191505090505b5090505f5f90505b856101000151518110156107515785610100015181815181106106ef576106ee6143ad565b5b602002602001015182828151811061070a576107096143ad565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505080806001019150506106c9565b503381866101000151518151811061076c5761076b6143ad565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050808561010001819052505f6107bc868686610e8e565b50905080610805578585856040517ff58cc8b50000000000000000000000000000000000000000000000000000000081526004016107fc9392919061478d565b60405180910390fd5b60015f1b925050509392505050565b5f63150b7a0260e01b905095945050505050565b5f610831613432565b6003815f019060ff16908160ff1681525050848160e00181815250505f610859828686610e8e565b5090508061086e575f60e01b9250505061087b565b6320c13b0b60e01b925050505b9392505050565b5f61088c82610594565b9050919050565b5f5a90505f6108a2868661103e565b90506108b6816060015182608001516114e0565b5f5f6108c3838787610e8e565b915091508161090d578286866040517fa2b6d61b0000000000000000000000000000000000000000000000000000000081526004016109049392919061478d565b60405180910390fd5b610918848285611584565b5050505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146109b657336040517fa19dbf000000000000000000000000000000000000000000000000000000000081526004016109ad9190613e7d565b60405180910390fd5b6109bf816118b6565b50565b7f000000000000000000000000000000000000000000000000000000000000000081565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a5657336040517fa19dbf00000000000000000000000000000000000000000000000000000000008152600401610a4d9190613e7d565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff16610a7682610594565b73ffffffffffffffffffffffffffffffffffffffff1603610ace57806040517f1c3812cc000000000000000000000000000000000000000000000000000000008152600401610ac59190613da3565b60405180910390fd5b610ad8815f611980565b50565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b4b57336040517fa19dbf00000000000000000000000000000000000000000000000000000000008152600401610b429190613e7d565b60405180910390fd5b5f5a90505f610b5a848461103e565b90505f610b6682611a21565b9050610b73838284611584565b5050505050565b50505050565b5f610baf7f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e5f1b835f1b610e13565b5f1c9050919050565b7f000000000000000000000000000000000000000000000000000000000000000081565b5f610be5611a71565b905090565b5f5f5f5f5f5f610bfd8989895f5f611a79565b809550819650829750839950849a505050505050610c1a83611db6565b935093975093979195509350565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c9857336040517fa19dbf00000000000000000000000000000000000000000000000000000000008152600401610c8f9190613e7d565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff16610cb883610594565b73ffffffffffffffffffffffffffffffffffffffff1614610d1057816040517f5b4d6d6a000000000000000000000000000000000000000000000000000000008152600401610d079190613da3565b60405180910390fd5b610d1a8282611980565b5050565b5f63bc197c8160e01b905098975050505050505050565b5f63f23a6e6160e01b90509695505050505050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610dba57336040517fa19dbf00000000000000000000000000000000000000000000000000000000008152600401610db19190613e7d565b60405180910390fd5b610dd38383836bffffffffffffffffffffffff16611dc7565b7febf265acfac1c01de588ed7ef49743b9c3ce8d6d1edeaf510a1f5453228515b1838383604051610e06939291906147d3565b60405180910390a1505050565b5f5f8383604051602001610e28929190614808565b604051602081830303815290604052805190602001209050805491505092915050565b610e5481611e25565b7f310ba5f1d2ed074b51e2eccd052a47ae9ab7c6b800d1fca3db3999d6a592ca0381604051610e839190613e7d565b60405180910390a150565b5f5f5f84845f818110610ea457610ea36143ad565b5b9050013560f81c60f81b9050608060f81b608060f81b82167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191603610fbd57610eec86611a21565b91505f5f610ef984611e2b565b9150915042811015610f445783816040517f9fa4fe54000000000000000000000000000000000000000000000000000000008152600401610f3b92919061482f565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161480610fa957503373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b15610fba5760019450505050611036565b50505b5f5f5f610fcd8989895f5f611a79565b905080985081945082955083965050505050828210156110265782826040517ffd41fcba00000000000000000000000000000000000000000000000000000000815260040161101d929190614856565b60405180910390fd5b61102f81611db6565b9550505050505b935093915050565b611046613432565b5f815f019060ff16908160ff16815250505f5f6110638585611e7c565b915060ff169150600180831603611083575f8360600181815250506110bf565b611098818686611e929290919263ffffffff16565b8173ffffffffffffffffffffffffffffffffffffffff169150846060018193508281525050505b5f6007600184901c1690505f8111156110fc576110ee82828888611ec39190939291909392919063ffffffff16565b856080018194508281525050505b5f6010808516036111105760019050611168565b6020808516036111435761112f838888611ef09290919263ffffffff16565b8161ffff1691508094508192505050611167565b611158838888611f0f9290919263ffffffff16565b8160ff16915080945081925050505b5b8067ffffffffffffffff81111561118257611181613683565b5b6040519080825280602002602001820160405280156111bb57816020015b6111a861347d565b8152602001906001900390816111a05790505b5085604001819052505f5f90505b818110156114d5575f6111e7858a8a611f0f9290919263ffffffff16565b8096508192505050600180821660ff1603611256573087604001518381518110611214576112136143ad565b5b60200260200101515f019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506112c2565b61126b858a8a611f2a9290919263ffffffff16565b88604001518481518110611282576112816143ad565b5b60200260200101515f018197508273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050505b600280821660ff1603611310576112e4858a8a611f5b9290919263ffffffff16565b886040015184815181106112fb576112fa6143ad565b5b60200260200101516020018197508281525050505b600480821660ff16036113d8575f611333868b8b611f719290919263ffffffff16565b8162ffffff1691508097508192505050898987908389611353919061437a565b9261136093929190614885565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f82011690508083019250505050505050886040015184815181106113b9576113b86143ad565b5b60200260200101516040018190525080866113d4919061437a565b9550505b600880821660ff1603611426576113fa858a8a611f5b9290919263ffffffff16565b88604001518481518110611411576114106143ad565b5b60200260200101516060018197508281525050505b601080821660ff161487604001518381518110611446576114456143ad565b5b60200260200101516080019015159081151581525050602080821660ff16148760400151838151811061147c5761147b6143ad565b5b602002602001015160a0019015159081151581525050600660c0821660ff16901c60ff16876040015183815181106114b7576114b66143ad565b5b602002602001015160c00181815250505080806001019150506111c9565b505050505092915050565b5f6114ea83610b80565b9050818114611534578282826040517f9b6514f400000000000000000000000000000000000000000000000000000000815260040161152b939291906148bf565b60405180910390fd5b5f6001830190506115458482611f91565b7f1f180c27086c7a39ea2a7b25239d1ab92348f07ca7bb59d1438fcf527568f8818482604051611576929190614856565b60405180910390a150505050565b5f5f90505f82604001515190505f5f90505b818110156118ae575f846040015182815181106115b6576115b56143ad565b5b6020026020010151905083156115ce575f9350611618565b8060a0015115611617577f9ae934bf8a986157c889a24c3b3fa85e74b7e4ee4b1f8fc6e7362cb4c1d19d8b868360405161160992919061482f565b60405180910390a1506118a1565b5b5f816060015190505f811415801561162f5750805a105b156116755785835a6040517f2139527400000000000000000000000000000000000000000000000000000000815260040161166c939291906148f4565b60405180910390fd5b5f82608001511561172a57611723835f01515f84146116945783611696565b5a5b634c4e814c60e01b8b8d898b8e606001518b604001516040516024016116c196959493929190614968565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611fc6565b9050611752565b61174f835f015184602001515f85146117435784611745565b5a5b8660400151611fdb565b90505b80611864575f60ff168360c00151036117b357600195507f115f347c00e69f252cd6b63c4f81022a9564c6befe8aa719cb74640a4a306f0d8885611794611ff2565b6040516117a3939291906149ce565b60405180910390a15050506118a1565b600160ff168360c001510361180a5786846117cc611ff2565b6040517f7f6b0bb100000000000000000000000000000000000000000000000000000000815260040161180193929190614a0a565b60405180910390fd5b600260ff168360c0015103611863577fc2c704302430fe0dc8d95f272e2f4e54bbbc51a3327fd5d75ab41f9fc8fd129b8885611844611ff2565b604051611853939291906149ce565b60405180910390a15050506118ae565b5b7f5a589b1d8062f33451d29cae3dabd9b2e36c62aee644178c600977ca8dda661a888560405161189592919061482f565b60405180910390a15050505b8080600101915050611596565b505050505050565b5f5f1b81036118f1576040517f4294d12700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61191d7fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85f1b82612010565b7f307ed6bd941ee9fc80f369c94af5fa11e25bab5102a6140191756c5474a30bfa8160405161194c9190613cf7565b60405180910390a161197d7f0000000000000000000000000000000000000000000000000000000000000000610e4b565b50565b6119e47fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1205f1b837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168373ffffffffffffffffffffffffffffffffffffffff165f1b612017565b7f0d7fc113eaf016db4681a1ba86d083ce3e0961f321062a75ac2b0aeb33deeed18282604051611a15929190614a4d565b60405180910390a15050565b5f5f611a3183602001513061204c565b90505f611a3d846120f0565b90508181604051602001611a52929190614ae8565b6040516020818303038152906040528051906020012092505050919050565b5f3054905090565b5f5f5f5f5f5f5f611a8a8b8b611e7c565b915060ff169150611a996134ce565b6040808416148015611ad657505f73ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff16145b15611c1257611af0828d8d611f2a9290919263ffffffff16565b809350819a50505089611c11575f611b13838e8e611f719290919263ffffffff16565b8162ffffff16915080945081925050505f8d8d85908487611b34919061437a565b92611b4193929190614885565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f8201169050808301925050505050505090508a73ffffffffffffffffffffffffffffffffffffffff1663ccce3bc830836040518363ffffffff1660e01b8152600401611bc0929190614b1e565b6040805180830381865afa158015611bda573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611bfe9190614bc1565b92508184611c0c919061437a565b935050505b5b600180841603611c4b57611c398d8a838f8f87908092611c3493929190614885565b612301565b97509750975097509750505050611da9565b6002808416148d60200190151590811515815250505f6002601c8516901c9050611c8783828f8f611ec39190939291909392919063ffffffff16565b8094508197505050505f6001600560208616901c611ca5919061437a565b9050611cc383828f8f611ec39190939291909392919063ffffffff16565b809450819a50505050611cd58d611a21565b9350611cf38d858e8e86908092611cee93929190614885565b612545565b8097508198505050611d0786895f1b6130b4565b9550611d1586865f1b6130b4565b9550611d39868a73ffffffffffffffffffffffffffffffffffffffff165f1b6130b4565b95505f5f1b815f015114158015611d53575085815f015114155b8015611d63575080602001518511155b15611da557806040517fccbb534f000000000000000000000000000000000000000000000000000000008152600401611d9c9190614c19565b60405180910390fd5b5050505b9550955095509550959050565b5f611dc0826130c8565b9050919050565b611e207fc852adf5e97c2fc3b38f405671e91b7af1697ef0287577f227ef10494c2a8e865f1b846bffffffffffffffffffffffff841660608673ffffffffffffffffffffffffffffffffffffffff16901b175f1b612017565b505050565b80305550565b5f5f5f611e5a7fc852adf5e97c2fc3b38f405671e91b7af1697ef0287577f227ef10494c2a8e865f1b85610e13565b5f1c9050606081901c816bffffffffffffffffffffffff169250925050915091565b5f5f83358060f81c925060019150509250929050565b5f5f8483013573ffffffffffffffffffffffffffffffffffffffff8160601c16925060148401915050935093915050565b5f5f858401356008840261010003600180866008021b0382821c1693508486019250505094509492505050565b5f5f8483013561ffff8160f01c16925060028401915050935093915050565b5f5f848301358060f81c925060018401915050935093915050565b5f5f8483013573ffffffffffffffffffffffffffffffffffffffff8160601c16925060148401915050935093915050565b5f5f848301359150602083019050935093915050565b5f5f8483013562ffffff8160e81c16925060038401915050935093915050565b611fc27f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e5f1b835f1b835f1b612017565b5050565b5f5f5f8351602085018787f490509392505050565b5f5f5f835160208501878988f19050949350505050565b60603d604051915060208201818101604052818352815f823e505090565b8082555050565b5f838360405160200161202b929190614808565b60405160208183030381529060405280519060200120905081815550505050565b5f7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f7f4aa45ca7ad825ceb1bf35643f0a58c295239df563b1b565c2485f96477c563187f2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de856120bb57466120bd565b5f5b856040516020016120d2959493929190614c32565b60405160208183030381529060405280519060200120905092915050565b5f5f61210083610100015161316b565b90505f60ff16835f015160ff1603612182575f61212084604001516131d8565b90507f11e1e4079a79a66e4ade50033cfe2678cdd5341d2dfe5ef9513edb1a0be147a2818560600151866080015185604051602001612163959493929190614c83565b60405160208183030381529060405280519060200120925050506122fc565b600160ff16835f015160ff16036121f1577fe19a3b94fc3c7ece3f890d98a99bc422615537a08dea0603fa8425867d87d4668360a0015180519060200120826040516020016121d393929190614cd4565b604051602081830303815290604052805190602001209150506122fc565b600260ff16835f015160ff1603612259577f11fdeb7e8373a1aa96bfac8d0ea91526b2c5d15e5cee20e0543e780258f3e8e48360c001518260405160200161223b93929190614cd4565b604051602081830303815290604052805190602001209150506122fc565b600360ff16835f015160ff16036122c1577fe19a3b94fc3c7ece3f890d98a99bc422615537a08dea0603fa8425867d87d4668360e00151826040516020016122a393929190614cd4565b604051602081830303815290604052805190602001209150506122fc565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016122f390614d63565b60405180910390fd5b919050565b5f5f5f5f5f61230e613432565b6002815f019060ff16908160ff16815250505f5f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90505b898990508210156124cf575f5f612368848d8d611f719290919263ffffffff16565b8162ffffff16915080955081925050508381612384919061437a565b9150505f8b8b90508214612398575f61239a565b8d5b90505f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84146123ca57856123cc565b8f5b90506123ec818e8e889087926123e493929190614885565b600186611a79565b50809b50819c50829d50839e50505050508a8a1015612458578c8c8690859261241793929190614885565b8c8c6040517fb006aba000000000000000000000000000000000000000000000000000000000815260040161244f9493929190614d81565b60405180910390fd5b829450888e5f015103612471575f5f1b8e5f0181815250505b8388106124b75787846040517f37daf62b0000000000000000000000000000000000000000000000000000000081526004016124ae929190614856565b60405180910390fd5b888660c0018181525050879350829450505050612346565b5f5f1b8b5f0151141580156124e857508a602001518511155b1561252a578a6040517fccbb534f0000000000000000000000000000000000000000000000000000000081526004016125219190614c19565b60405180910390fd5b6125338d611a21565b93505050509550955095509550959050565b5f5f5f5b848490508110156130aa575f61256a828787611f0f9290919263ffffffff16565b8160ff16915080935081925050505f600460f08316901c90505f81036126c2575f600f831690505f8160ff16036125b9576125b0848989611f0f9290919263ffffffff16565b80955081925050505b5f5f6125d0868b8b6132529290919263ffffffff16565b80975081935050506125ed868b8b6132529290919263ffffffff16565b80975081925050505f60ff82901c5f1c90505f7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff835f1c165f1b90505f601b830190505f60018f8388866040515f81526020016040526040516126539493929190614dce565b6020604051602081039080840390855afa158015612673573d5f5f3e3d5ffd5b5050506020604051035190508660ff168c019b505f612695828960ff16613268565b90505f5f1b8c036126a657806126b1565b6126b08c826130b4565b5b9b5050505050505050505050612549565b6001810361274d575f600f831690505f8160ff16036126f9576126f0848989611f0f9290919263ffffffff16565b80955081925050505b5f61270f858a8a611f2a9290919263ffffffff16565b80965081925050505f612725828460ff16613268565b90505f5f1b87036127365780612741565b61274087826130b4565b5b96505050505050612549565b6002810361293e575f6003831690505f8160ff16036127845761277b848989611f0f9290919263ffffffff16565b80955081925050505b5f61279a858a8a611f2a9290919263ffffffff16565b80965081925050505f6002600c861660ff16901c60ff1690505f6127d087838d8d611ec39190939291909392919063ffffffff16565b80985081925050505f81880190506320c13b0b60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168473ffffffffffffffffffffffffffffffffffffffff16631626ba7e8f8f8f8d90879261283493929190614885565b6040518463ffffffff1660e01b815260040161285293929190614e11565b602060405180830381865afa15801561286d573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906128919190614e55565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146128fa578d8d858e8e6040517ff734863a0000000000000000000000000000000000000000000000000000000081526004016128f1959493929190614e80565b60405180910390fd5b8097508460ff168a0199505f612913858760ff16613268565b90505f5f1b8a03612924578061292f565b61292e8a826130b4565b5b99505050505050505050612549565b60038103612988575f61295c8489896132529290919263ffffffff16565b80955081925050505f5f1b8503612973578061297e565b61297d85826130b4565b5b9450505050612549565b60048103612a0a575f600f831660ff1690505f6129b785838b8b611ec39190939291909392919063ffffffff16565b80965081925050505f81860190505f5f6129e38e8e8e8e8c9088926129de93929190614885565b612545565b91509150829750818a0199506129f989826130b4565b985082975050505050505050612549565b60068103612b1a575f6002600c841660ff16901c60ff1690505f8103612a4e57612a3f848989611f0f9290919263ffffffff16565b8160ff16915080955081925050505b5f6003841660ff1690505f8103612a8457612a74858a8a611ef09290919263ffffffff16565b8161ffff16915080965081925050505b5f612a9a868b8b611f719290919263ffffffff16565b8162ffffff16915080975081925050505f81870190505f5f612ace8f8f8f8f8d908892612ac993929190614885565b612545565b91509150829850848210612ae257858b019a505b5f612aee82878961329a565b90505f5f1b8b03612aff5780612b0a565b612b098b826130b4565b5b9a50505050505050505050612549565b60058103612b9c575f612b388489896132529290919263ffffffff16565b8095508192505050888103612b6b577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff95505b5f612b75826132cf565b90505f5f1b8603612b865780612b91565b612b9086826130b4565b5b955050505050612549565b60078103612d02575f600f831690505f8160ff1603612bd357612bca848989611f0f9290919263ffffffff16565b80955081925050505b5f5f612bea868b8b6132529290919263ffffffff16565b8097508193505050612c07868b8b6132529290919263ffffffff16565b80975081925050505f60ff82901c5f1c90505f7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff835f1c165f1b90505f601b830190505f60018f604051602001612c5e9190614f1d565b604051602081830303815290604052805190602001208388866040515f8152602001604052604051612c939493929190614dce565b6020604051602081039080840390855afa158015612cb3573d5f5f3e3d5ffd5b5050506020604051035190508660ff168c019b505f612cd5828960ff16613268565b90505f5f1b8c03612ce65780612cf1565b612cf08c826130b4565b5b9b5050505050505050505050612549565b60088103612d9b575f612d208489896132529290919263ffffffff16565b80955081925050505f612d3c5f8c6132fe90919063ffffffff16565b9050808203612d69577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff96505b5f612d738261334f565b90505f5f1b8703612d845780612d8f565b612d8e87826130b4565b5b96505050505050612549565b60098103612f04575f6003831690505f8160ff1603612dd257612dc9848989611f0f9290919263ffffffff16565b80955081925050505b5f612de8858a8a611f2a9290919263ffffffff16565b80965081925050505f5f6002600c871660ff16901c60ff169050612e1e87828d8d611ec39190939291909392919063ffffffff16565b8098508193505050505f81870190505f8373ffffffffffffffffffffffffffffffffffffffff166313792a4a8f8e8e8c908792612e5d93929190614885565b6040518463ffffffff1660e01b8152600401612e7b93929190614f42565b602060405180830381865afa158015612e96573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190612eba9190614f79565b90508197508460ff168a0199505f612ed6858760ff168461337e565b90505f5f1b8a03612ee75780612ef2565b612ef18a826130b4565b5b99508298505050505050505050612549565b600a810361306d575f6003831690505f8160ff1603612f3b57612f32848989611f0f9290919263ffffffff16565b80955081925050505b5f612f51858a8a611f2a9290919263ffffffff16565b80965081925050505f6002600c861660ff16901c60ff1690505f612f8787838d8d611ec39190939291909392919063ffffffff16565b80985081925050505f81880190505f8473ffffffffffffffffffffffffffffffffffffffff1663898bd9218f8f8f8d908792612fc593929190614885565b6040518463ffffffff1660e01b8152600401612fe393929190614e11565b602060405180830381865afa158015612ffe573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906130229190614f79565b90508198508560ff168b019a505f61303e868860ff168461337e565b90505f5f1b8b0361304f578061305a565b6130598b826130b4565b5b9a50829950505050505050505050612549565b806040517fb2505f7c0000000000000000000000000000000000000000000000000000000081526004016130a19190614035565b60405180910390fd5b5094509492505050565b5f825f528160205260405f20905092915050565b5f3073ffffffffffffffffffffffffffffffffffffffff167f0000000000000000000000000000000000000000000000000000000000000000837f000000000000000000000000000000000000000000000000000000000000000060405160200161313593929190615033565b604051602081830303815290604052805190602001205f1c73ffffffffffffffffffffffffffffffffffffffff16149050919050565b5f60605f5f90505b83518110156131c757818482815181106131905761318f6143ad565b5b60200260200101516040516020016131a992919061507a565b60405160208183030381529060405291508080600101915050613173565b508080519060200120915050919050565b5f60605f5f90505b8351811015613241575f61320d858381518110613200576131ff6143ad565b5b60200260200101516133b3565b905082816040516020016132229291906150d8565b60405160208183030381529060405292505080806001019150506131e0565b508080519060200120915050919050565b5f5f848301359150602083019050935093915050565b5f828260405160200161327c929190615169565b60405160208183030381529060405280519060200120905092915050565b5f8383836040516020016132b0939291906151e9565b6040516020818303038152906040528051906020012090509392505050565b5f816040516020016132e1919061527a565b604051602081830303815290604052805190602001209050919050565b5f5f61330e84602001518461204c565b90505f61331a856120f0565b9050818160405160200161332f929190614ae8565b604051602081830303815290604052805190602001209250505092915050565b5f8160405160200161336191906152e9565b604051602081830303815290604052805190602001209050919050565b5f83838360405160200161339493929190615358565b6040516020818303038152906040528051906020012090509392505050565b5f7f0603985259a953da1f65a522f589c17bd1d0117ec1d3abb7c0788aef251ef437825f01518360200151846040015180519060200120856060015186608001518760a001518860c0015160405160200161341598979695949392919061539f565b604051602081830303815290604052805190602001209050919050565b6040518061012001604052805f60ff1681526020015f15158152602001606081526020015f81526020015f8152602001606081526020015f81526020015f8152602001606081525090565b6040518060e001604052805f73ffffffffffffffffffffffffffffffffffffffff1681526020015f8152602001606081526020015f81526020015f151581526020015f151581526020015f81525090565b60405180604001604052805f81526020015f81525090565b5f82905092915050565b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b5f82821b905092915050565b5f61353283836134e6565b8261353d81356134f0565b9250600482101561357d576135787fffffffff000000000000000000000000000000000000000000000000000000008360040360080261351b565b831692505b505092915050565b5f81905092915050565b828183375f83830152505050565b5f6135a88385613585565b93506135b583858461358f565b82840190509392505050565b5f6135cd82848661359d565b91508190509392505050565b5f604051905090565b5f5ffd5b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f613613826135ea565b9050919050565b61362381613609565b811461362d575f5ffd5b50565b5f8135905061363e8161361a565b92915050565b5f60208284031215613659576136586135e2565b5b5f61366684828501613630565b91505092915050565b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6136b982613673565b810181811067ffffffffffffffff821117156136d8576136d7613683565b5b80604052505050565b5f6136ea6135d9565b90506136f682826136b0565b919050565b5f5ffd5b5f60ff82169050919050565b613714816136ff565b811461371e575f5ffd5b50565b5f8135905061372f8161370b565b92915050565b5f8115159050919050565b61374981613735565b8114613753575f5ffd5b50565b5f8135905061376481613740565b92915050565b5f5ffd5b5f67ffffffffffffffff82111561378857613787613683565b5b602082029050602081019050919050565b5f5ffd5b5f819050919050565b6137af8161379d565b81146137b9575f5ffd5b50565b5f813590506137ca816137a6565b92915050565b5f5ffd5b5f67ffffffffffffffff8211156137ee576137ed613683565b5b6137f782613673565b9050602081019050919050565b5f613816613811846137d4565b6136e1565b905082815260208101848484011115613832576138316137d0565b5b61383d84828561358f565b509392505050565b5f82601f8301126138595761385861376a565b5b8135613869848260208601613804565b91505092915050565b5f60e082840312156138875761388661366f565b5b61389160e06136e1565b90505f6138a084828501613630565b5f8301525060206138b3848285016137bc565b602083015250604082013567ffffffffffffffff8111156138d7576138d66136fb565b5b6138e384828501613845565b60408301525060606138f7848285016137bc565b606083015250608061390b84828501613756565b60808301525060a061391f84828501613756565b60a08301525060c0613933848285016137bc565b60c08301525092915050565b5f61395161394c8461376e565b6136e1565b9050808382526020820190506020840283018581111561397457613973613799565b5b835b818110156139bb57803567ffffffffffffffff8111156139995761399861376a565b5b8086016139a68982613872565b85526020850194505050602081019050613976565b5050509392505050565b5f82601f8301126139d9576139d861376a565b5b81356139e984826020860161393f565b91505092915050565b5f819050919050565b613a04816139f2565b8114613a0e575f5ffd5b50565b5f81359050613a1f816139fb565b92915050565b5f67ffffffffffffffff821115613a3f57613a3e613683565b5b602082029050602081019050919050565b5f613a62613a5d84613a25565b6136e1565b90508083825260208201905060208402830185811115613a8557613a84613799565b5b835b81811015613aae5780613a9a8882613630565b845260208401935050602081019050613a87565b5050509392505050565b5f82601f830112613acc57613acb61376a565b5b8135613adc848260208601613a50565b91505092915050565b5f6101208284031215613afb57613afa61366f565b5b613b066101206136e1565b90505f613b1584828501613721565b5f830152506020613b2884828501613756565b602083015250604082013567ffffffffffffffff811115613b4c57613b4b6136fb565b5b613b58848285016139c5565b6040830152506060613b6c848285016137bc565b6060830152506080613b80848285016137bc565b60808301525060a082013567ffffffffffffffff811115613ba457613ba36136fb565b5b613bb084828501613845565b60a08301525060c0613bc484828501613a11565b60c08301525060e0613bd884828501613a11565b60e08301525061010082013567ffffffffffffffff811115613bfd57613bfc6136fb565b5b613c0984828501613ab8565b6101008301525092915050565b5f5ffd5b5f5f83601f840112613c2f57613c2e61376a565b5b8235905067ffffffffffffffff811115613c4c57613c4b613c16565b5b602083019150836001820283011115613c6857613c67613799565b5b9250929050565b5f5f5f60408486031215613c8657613c856135e2565b5b5f84013567ffffffffffffffff811115613ca357613ca26135e6565b5b613caf86828701613ae5565b935050602084013567ffffffffffffffff811115613cd057613ccf6135e6565b5b613cdc86828701613c1a565b92509250509250925092565b613cf1816139f2565b82525050565b5f602082019050613d0a5f830184613ce8565b92915050565b5f5f5f5f5f60808688031215613d2957613d286135e2565b5b5f613d3688828901613630565b9550506020613d4788828901613630565b9450506040613d58888289016137bc565b935050606086013567ffffffffffffffff811115613d7957613d786135e6565b5b613d8588828901613c1a565b92509250509295509295909350565b613d9d816134f0565b82525050565b5f602082019050613db65f830184613d94565b92915050565b5f5f5f60408486031215613dd357613dd26135e2565b5b5f613de086828701613a11565b935050602084013567ffffffffffffffff811115613e0157613e006135e6565b5b613e0d86828701613c1a565b92509250509250925092565b613e22816134f0565b8114613e2c575f5ffd5b50565b5f81359050613e3d81613e19565b92915050565b5f60208284031215613e5857613e576135e2565b5b5f613e6584828501613e2f565b91505092915050565b613e7781613609565b82525050565b5f602082019050613e905f830184613e6e565b92915050565b5f5f5f5f60408587031215613eae57613ead6135e2565b5b5f85013567ffffffffffffffff811115613ecb57613eca6135e6565b5b613ed787828801613c1a565b9450945050602085013567ffffffffffffffff811115613efa57613ef96135e6565b5b613f0687828801613c1a565b925092505092959194509250565b5f60208284031215613f2957613f286135e2565b5b5f613f3684828501613a11565b91505092915050565b5f5f60208385031215613f5557613f546135e2565b5b5f83013567ffffffffffffffff811115613f7257613f716135e6565b5b613f7e85828601613c1a565b92509250509250929050565b5f5f5f5f60608587031215613fa257613fa16135e2565b5b5f613faf87828801613630565b9450506020613fc0878288016137bc565b935050604085013567ffffffffffffffff811115613fe157613fe06135e6565b5b613fed87828801613c1a565b925092505092959194509250565b5f602082840312156140105761400f6135e2565b5b5f61401d848285016137bc565b91505092915050565b61402f8161379d565b82525050565b5f6020820190506140485f830184614026565b92915050565b61405781613735565b82525050565b5f60c0820190506140705f830189614026565b61407d6020830188614026565b61408a604083018761404e565b6140976060830186613ce8565b6140a46080830185614026565b6140b160a0830184613ce8565b979650505050505050565b5f5f604083850312156140d2576140d16135e2565b5b5f6140df85828601613e2f565b92505060206140f085828601613630565b9150509250929050565b5f5f83601f84011261410f5761410e61376a565b5b8235905067ffffffffffffffff81111561412c5761412b613c16565b5b60208301915083602082028301111561414857614147613799565b5b9250929050565b5f5f5f5f5f5f5f5f60a0898b03121561416b5761416a6135e2565b5b5f6141788b828c01613630565b98505060206141898b828c01613630565b975050604089013567ffffffffffffffff8111156141aa576141a96135e6565b5b6141b68b828c016140fa565b9650965050606089013567ffffffffffffffff8111156141d9576141d86135e6565b5b6141e58b828c016140fa565b9450945050608089013567ffffffffffffffff811115614208576142076135e6565b5b6142148b828c01613c1a565b92509250509295985092959890939650565b5f5f5f5f5f5f60a087890312156142405761423f6135e2565b5b5f61424d89828a01613630565b965050602061425e89828a01613630565b955050604061426f89828a016137bc565b945050606061428089828a016137bc565b935050608087013567ffffffffffffffff8111156142a1576142a06135e6565b5b6142ad89828a01613c1a565b92509250509295509295509295565b5f6bffffffffffffffffffffffff82169050919050565b6142dc816142bc565b81146142e6575f5ffd5b50565b5f813590506142f7816142d3565b92915050565b5f5f5f60608486031215614314576143136135e2565b5b5f61432186828701613a11565b935050602061433286828701613630565b9250506040614343868287016142e9565b9150509250925092565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6143848261379d565b915061438f8361379d565b92508282019050808211156143a7576143a661434d565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b6143e3816136ff565b82525050565b6143f281613735565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b61442a81613609565b82525050565b6144398161379d565b82525050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f6144718261443f565b61447b8185614449565b935061448b818560208601614459565b61449481613673565b840191505092915050565b5f60e083015f8301516144b45f860182614421565b5060208301516144c76020860182614430565b50604083015184820360408601526144df8282614467565b91505060608301516144f46060860182614430565b50608083015161450760808601826143e9565b5060a083015161451a60a08601826143e9565b5060c083015161452d60c0860182614430565b508091505092915050565b5f614543838361449f565b905092915050565b5f602082019050919050565b5f614561826143f8565b61456b8185614402565b93508360208202850161457d85614412565b805f5b858110156145b857848403895281516145998582614538565b94506145a48361454b565b925060208a01995050600181019050614580565b50829750879550505050505092915050565b6145d3816139f2565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f61460d8383614421565b60208301905092915050565b5f602082019050919050565b5f61462f826145d9565b61463981856145e3565b9350614644836145f3565b805f5b8381101561467457815161465b8882614602565b975061466683614619565b925050600181019050614647565b5085935050505092915050565b5f61012083015f8301516146975f8601826143da565b5060208301516146aa60208601826143e9565b50604083015184820360408601526146c28282614557565b91505060608301516146d76060860182614430565b5060808301516146ea6080860182614430565b5060a083015184820360a08601526147028282614467565b91505060c083015161471760c08601826145ca565b5060e083015161472a60e08601826145ca565b506101008301518482036101008601526147448282614625565b9150508091505092915050565b5f82825260208201905092915050565b5f61476c8385614751565b935061477983858461358f565b61478283613673565b840190509392505050565b5f6040820190508181035f8301526147a58186614681565b905081810360208301526147ba818486614761565b9050949350505050565b6147cd816142bc565b82525050565b5f6060820190506147e65f830186613ce8565b6147f36020830185613e6e565b61480060408301846147c4565b949350505050565b5f60408201905061481b5f830185613ce8565b6148286020830184613ce8565b9392505050565b5f6040820190506148425f830185613ce8565b61484f6020830184614026565b9392505050565b5f6040820190506148695f830185614026565b6148766020830184614026565b9392505050565b5f5ffd5b5f5ffd5b5f5f858511156148985761489761487d565b5b838611156148a9576148a8614881565b5b6001850283019150848603905094509492505050565b5f6060820190506148d25f830186614026565b6148df6020830185614026565b6148ec6040830184614026565b949350505050565b5f6060820190508181035f83015261490c8186614681565b905061491b6020830185614026565b6149286040830184614026565b949350505050565b5f61493a8261443f565b6149448185614751565b9350614954818560208601614459565b61495d81613673565b840191505092915050565b5f60c08201905061497b5f830189613ce8565b6149886020830188614026565b6149956040830187614026565b6149a26060830186614026565b6149af6080830185614026565b81810360a08301526149c18184614930565b9050979650505050505050565b5f6060820190506149e15f830186613ce8565b6149ee6020830185614026565b8181036040830152614a008184614930565b9050949350505050565b5f6060820190508181035f830152614a228186614681565b9050614a316020830185614026565b8181036040830152614a438184614930565b9050949350505050565b5f604082019050614a605f830185613d94565b614a6d6020830184613e6e565b9392505050565b5f81905092915050565b7f19010000000000000000000000000000000000000000000000000000000000005f82015250565b5f614ab2600283614a74565b9150614abd82614a7e565b600282019050919050565b5f819050919050565b614ae2614add826139f2565b614ac8565b82525050565b5f614af282614aa6565b9150614afe8285614ad1565b602082019150614b0e8284614ad1565b6020820191508190509392505050565b5f604082019050614b315f830185613e6e565b8181036020830152614b438184614930565b90509392505050565b5f81519050614b5a816139fb565b92915050565b5f81519050614b6e816137a6565b92915050565b5f60408284031215614b8957614b8861366f565b5b614b9360406136e1565b90505f614ba284828501614b4c565b5f830152506020614bb584828501614b60565b60208301525092915050565b5f60408284031215614bd657614bd56135e2565b5b5f614be384828501614b74565b91505092915050565b604082015f820151614c005f8501826145ca565b506020820151614c136020850182614430565b50505050565b5f604082019050614c2c5f830184614bec565b92915050565b5f60a082019050614c455f830188613ce8565b614c526020830187613ce8565b614c5f6040830186613ce8565b614c6c6060830185614026565b614c796080830184613e6e565b9695505050505050565b5f60a082019050614c965f830188613ce8565b614ca36020830187613ce8565b614cb06040830186614026565b614cbd6060830185614026565b614cca6080830184613ce8565b9695505050505050565b5f606082019050614ce75f830186613ce8565b614cf46020830185613ce8565b614d016040830184613ce8565b949350505050565b5f82825260208201905092915050565b7f556e737570706f72746564206b696e64000000000000000000000000000000005f82015250565b5f614d4d601083614d09565b9150614d5882614d19565b602082019050919050565b5f6020820190508181035f830152614d7a81614d41565b9050919050565b5f6060820190508181035f830152614d9a818688614761565b9050614da96020830185614026565b614db66040830184614026565b95945050505050565b614dc8816136ff565b82525050565b5f608082019050614de15f830187613ce8565b614dee6020830186614dbf565b614dfb6040830185613ce8565b614e086060830184613ce8565b95945050505050565b5f604082019050614e245f830186613ce8565b8181036020830152614e37818486614761565b9050949350505050565b5f81519050614e4f81613e19565b92915050565b5f60208284031215614e6a57614e696135e2565b5b5f614e7784828501614e41565b91505092915050565b5f6080820190508181035f830152614e988188614681565b9050614ea76020830187613ce8565b614eb46040830186613e6e565b8181036060830152614ec7818486614761565b90509695505050505050565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000005f82015250565b5f614f07601c83614a74565b9150614f1282614ed3565b601c82019050919050565b5f614f2782614efb565b9150614f338284614ad1565b60208201915081905092915050565b5f6040820190508181035f830152614f5a8186614681565b90508181036020830152614f6f818486614761565b9050949350505050565b5f60208284031215614f8e57614f8d6135e2565b5b5f614f9b84828501614b4c565b91505092915050565b7fff000000000000000000000000000000000000000000000000000000000000005f82015250565b5f614fd8600183614a74565b9150614fe382614fa4565b600182019050919050565b5f8160601b9050919050565b5f61500482614fee565b9050919050565b5f61501582614ffa565b9050919050565b61502d61502882613609565b61500b565b82525050565b5f61503d82614fcc565b9150615049828661501c565b6014820191506150598285614ad1565b6020820191506150698284614ad1565b602082019150819050949350505050565b5f6040820190508181035f8301526150928185614930565b90506150a16020830184613e6e565b9392505050565b5f6150b28261443f565b6150bc8185613585565b93506150cc818560208601614459565b80840191505092915050565b5f6150e382856150a8565b91506150ef8284614ad1565b6020820191508190509392505050565b7f53657175656e6365207369676e65723a0a0000000000000000000000000000005f82015250565b5f615133601183614a74565b915061513e826150ff565b601182019050919050565b5f819050919050565b61516361515e8261379d565b615149565b82525050565b5f61517382615127565b915061517f828561501c565b60148201915061518f8284615152565b6020820191508190509392505050565b7f53657175656e6365206e657374656420636f6e6669673a0a00000000000000005f82015250565b5f6151d3601883614a74565b91506151de8261519f565b601882019050919050565b5f6151f3826151c7565b91506151ff8286614ad1565b60208201915061520f8285615152565b60208201915061521f8284615152565b602082019150819050949350505050565b7f53657175656e636520737461746963206469676573743a0a00000000000000005f82015250565b5f615264601883614a74565b915061526f82615230565b601882019050919050565b5f61528482615258565b91506152908284614ad1565b60208201915081905092915050565b7f53657175656e636520616e792061646472657373207375626469676573743a0a5f82015250565b5f6152d3602083614a74565b91506152de8261529f565b602082019050919050565b5f6152f3826152c7565b91506152ff8284614ad1565b60208201915081905092915050565b7f53657175656e63652073617069656e7420636f6e6669673a0a000000000000005f82015250565b5f615342601983614a74565b915061534d8261530e565b601982019050919050565b5f61536282615336565b915061536e828661501c565b60148201915061537e8285615152565b60208201915061538e8284614ad1565b602082019150819050949350505050565b5f610100820190506153b35f83018b613ce8565b6153c0602083018a613e6e565b6153cd6040830189614026565b6153da6060830188613ce8565b6153e76080830187614026565b6153f460a083018661404e565b61540160c083018561404e565b61540e60e0830184614026565b999850505050505050505056fea26469706673582212202c184f3fda3a6bd871b57d7811a2ea423c8b5f4a6490201f70de48166d05494a64736f6c634300081c00336080604052348015600e575f5ffd5b5061529c8061001c5f395ff3fe60806040526004361061010c575f3560e01c80636ea4457711610094578063ad55366b11610063578063ad55366b1461042d578063b93ea7ad1461046e578063bc197c811461048a578063f23a6e61146104c6578063f727ef1c1461050257610113565b80636ea44577146103835780638943ec021461039f5780638c3f5563146103c7578063aaf10f421461040357610113565b80631a9b2337116100db5780631a9b2337146102bd5780631f6a1eb9146102f957806329561426146103155780634fcf3eca1461033d57806351605d801461035957610113565b8063025b22bc146101ed57806313792a4a14610209578063150b7a02146102455780631626ba7e1461028157610113565b3661011357005b60045f369050106101eb575f6101345f369061012f9190613403565b61052a565b90505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146101e9575f5f8273ffffffffffffffffffffffffffffffffffffffff165f3660405161019292919061349d565b5f60405180830381855af49150503d805f81146101ca576040519150601f19603f3d011682016040523d82523d5f602084013e6101cf565b606091505b5091509150816101e157805160208201fd5b805160208201f35b505b005b61020760048036038101906102029190613520565b61057f565b005b348015610214575f5ffd5b5061022f600480360381019061022a9190613b4b565b6105fb565b60405161023c9190613bd3565b60405180910390f35b348015610250575f5ffd5b5061026b60048036038101906102669190613bec565b6107aa565b6040516102789190613c7f565b60405180910390f35b34801561028c575f5ffd5b506102a760048036038101906102a29190613c98565b6107be565b6040516102b49190613c7f565b60405180910390f35b3480156102c8575f5ffd5b506102e360048036038101906102de9190613d1f565b610818565b6040516102f09190613d59565b60405180910390f35b610313600480360381019061030e9190613d72565b610829565b005b348015610320575f5ffd5b5061033b60048036038101906103369190613df0565b6108b8565b005b61035760048036038101906103529190613d1f565b610934565b005b348015610364575f5ffd5b5061036d610a29565b60405161037a9190613bd3565b60405180910390f35b61039d60048036038101906103989190613e1b565b610a5a565b005b3480156103aa575f5ffd5b506103c560048036038101906103c09190613e66565b610af9565b005b3480156103d2575f5ffd5b506103ed60048036038101906103e89190613ed7565b610aff565b6040516103fa9190613f11565b60405180910390f35b34801561040e575f5ffd5b50610417610b37565b6040516104249190613d59565b60405180910390f35b348015610438575f5ffd5b50610453600480360381019061044e9190613b4b565b610b45565b60405161046596959493929190613f39565b60405180910390f35b61048860048036038101906104839190613f98565b610b83565b005b348015610495575f5ffd5b506104b060048036038101906104ab919061402b565b610c79565b6040516104bd9190613c7f565b60405180910390f35b3480156104d1575f5ffd5b506104ec60048036038101906104e79190614102565b610c90565b6040516104f99190613c7f565b60405180910390f35b34801561050d575f5ffd5b50610528600480360381019061052391906141d9565b610ca5565b005b5f6105767fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1205f1b837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916610d6e565b5f1c9050919050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105ef57336040517fa19dbf000000000000000000000000000000000000000000000000000000000081526004016105e69190613d59565b60405180910390fd5b6105f881610da6565b50565b5f5f6001856101000151516106109190614256565b67ffffffffffffffff8111156106295761062861355f565b5b6040519080825280602002602001820160405280156106575781602001602082028036833780820191505090505b5090505f5f90505b856101000151518110156106e757856101000151818151811061068557610684614289565b5b60200260200101518282815181106106a05761069f614289565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050808060010191505061065f565b503381866101000151518151811061070257610701614289565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050808561010001819052505f610752868686610de9565b5090508061079b578585856040517ff58cc8b500000000000000000000000000000000000000000000000000000000815260040161079293929190614669565b60405180910390fd5b60015f1b925050509392505050565b5f63150b7a0260e01b905095945050505050565b5f6107c761330e565b6003815f019060ff16908160ff1681525050848160e00181815250505f6107ef828686610de9565b50905080610804575f60e01b92505050610811565b6320c13b0b60e01b925050505b9392505050565b5f6108228261052a565b9050919050565b5f5a90505f6108388686610f99565b905061084c8160600151826080015161143b565b5f5f610859838787610de9565b91509150816108a3578286866040517fa2b6d61b00000000000000000000000000000000000000000000000000000000815260040161089a93929190614669565b60405180910390fd5b6108ae8482856114df565b5050505050505050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461092857336040517fa19dbf0000000000000000000000000000000000000000000000000000000000815260040161091f9190613d59565b60405180910390fd5b61093181611811565b50565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146109a457336040517fa19dbf0000000000000000000000000000000000000000000000000000000000815260040161099b9190613d59565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff166109c48261052a565b73ffffffffffffffffffffffffffffffffffffffff1603610a1c57806040517f1c3812cc000000000000000000000000000000000000000000000000000000008152600401610a139190613c7f565b60405180910390fd5b610a26815f6118b2565b50565b5f610a557fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85f1b611953565b905090565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610aca57336040517fa19dbf00000000000000000000000000000000000000000000000000000000008152600401610ac19190613d59565b60405180910390fd5b5f5a90505f610ad98484610f99565b90505f610ae58261195d565b9050610af28382846114df565b5050505050565b50505050565b5f610b2e7f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e5f1b835f1b610d6e565b5f1c9050919050565b5f610b406119ad565b905090565b5f5f5f5f5f5f610b588989895f5f6119b5565b809550819650829750839950849a505050505050610b7583611cf2565b935093975093979195509350565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610bf357336040517fa19dbf00000000000000000000000000000000000000000000000000000000008152600401610bea9190613d59565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff16610c138361052a565b73ffffffffffffffffffffffffffffffffffffffff1614610c6b57816040517f5b4d6d6a000000000000000000000000000000000000000000000000000000008152600401610c629190613c7f565b60405180910390fd5b610c7582826118b2565b5050565b5f63bc197c8160e01b905098975050505050505050565b5f63f23a6e6160e01b90509695505050505050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d1557336040517fa19dbf00000000000000000000000000000000000000000000000000000000008152600401610d0c9190613d59565b60405180910390fd5b610d2e8383836bffffffffffffffffffffffff16611d03565b7febf265acfac1c01de588ed7ef49743b9c3ce8d6d1edeaf510a1f5453228515b1838383604051610d61939291906146af565b60405180910390a1505050565b5f5f8383604051602001610d839291906146e4565b604051602081830303815290604052805190602001209050805491505092915050565b610daf81611d61565b7f310ba5f1d2ed074b51e2eccd052a47ae9ab7c6b800d1fca3db3999d6a592ca0381604051610dde9190613d59565b60405180910390a150565b5f5f5f84845f818110610dff57610dfe614289565b5b9050013560f81c60f81b9050608060f81b608060f81b82167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191603610f1857610e478661195d565b91505f5f610e5484611d67565b9150915042811015610e9f5783816040517f9fa4fe54000000000000000000000000000000000000000000000000000000008152600401610e9692919061470b565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161480610f0457503373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b15610f155760019450505050610f91565b50505b5f5f5f610f288989895f5f6119b5565b90508098508194508295508396505050505082821015610f815782826040517ffd41fcba000000000000000000000000000000000000000000000000000000008152600401610f78929190614732565b60405180910390fd5b610f8a81611cf2565b9550505050505b935093915050565b610fa161330e565b5f815f019060ff16908160ff16815250505f5f610fbe8585611db8565b915060ff169150600180831603610fde575f83606001818152505061101a565b610ff3818686611dce9290919263ffffffff16565b8173ffffffffffffffffffffffffffffffffffffffff169150846060018193508281525050505b5f6007600184901c1690505f8111156110575761104982828888611dff9190939291909392919063ffffffff16565b856080018194508281525050505b5f60108085160361106b57600190506110c3565b60208085160361109e5761108a838888611e2c9290919263ffffffff16565b8161ffff16915080945081925050506110c2565b6110b3838888611e4b9290919263ffffffff16565b8160ff16915080945081925050505b5b8067ffffffffffffffff8111156110dd576110dc61355f565b5b60405190808252806020026020018201604052801561111657816020015b611103613359565b8152602001906001900390816110fb5790505b5085604001819052505f5f90505b81811015611430575f611142858a8a611e4b9290919263ffffffff16565b8096508192505050600180821660ff16036111b157308760400151838151811061116f5761116e614289565b5b60200260200101515f019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505061121d565b6111c6858a8a611e669290919263ffffffff16565b886040015184815181106111dd576111dc614289565b5b60200260200101515f018197508273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050505b600280821660ff160361126b5761123f858a8a611e979290919263ffffffff16565b8860400151848151811061125657611255614289565b5b60200260200101516020018197508281525050505b600480821660ff1603611333575f61128e868b8b611ead9290919263ffffffff16565b8162ffffff16915080975081925050508989879083896112ae9190614256565b926112bb93929190614761565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f820116905080830192505050505050508860400151848151811061131457611313614289565b5b602002602001015160400181905250808661132f9190614256565b9550505b600880821660ff160361138157611355858a8a611e979290919263ffffffff16565b8860400151848151811061136c5761136b614289565b5b60200260200101516060018197508281525050505b601080821660ff1614876040015183815181106113a1576113a0614289565b5b60200260200101516080019015159081151581525050602080821660ff1614876040015183815181106113d7576113d6614289565b5b602002602001015160a0019015159081151581525050600660c0821660ff16901c60ff168760400151838151811061141257611411614289565b5b602002602001015160c0018181525050508080600101915050611124565b505050505092915050565b5f61144583610aff565b905081811461148f578282826040517f9b6514f40000000000000000000000000000000000000000000000000000000081526004016114869392919061479b565b60405180910390fd5b5f6001830190506114a08482611ecd565b7f1f180c27086c7a39ea2a7b25239d1ab92348f07ca7bb59d1438fcf527568f88184826040516114d1929190614732565b60405180910390a150505050565b5f5f90505f82604001515190505f5f90505b81811015611809575f8460400151828151811061151157611510614289565b5b602002602001015190508315611529575f9350611573565b8060a0015115611572577f9ae934bf8a986157c889a24c3b3fa85e74b7e4ee4b1f8fc6e7362cb4c1d19d8b868360405161156492919061470b565b60405180910390a1506117fc565b5b5f816060015190505f811415801561158a5750805a105b156115d05785835a6040517f213952740000000000000000000000000000000000000000000000000000000081526004016115c7939291906147d0565b60405180910390fd5b5f8260800151156116855761167e835f01515f84146115ef57836115f1565b5a5b634c4e814c60e01b8b8d898b8e606001518b6040015160405160240161161c96959493929190614844565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611f02565b90506116ad565b6116aa835f015184602001515f851461169e57846116a0565b5a5b8660400151611f17565b90505b806117bf575f60ff168360c001510361170e57600195507f115f347c00e69f252cd6b63c4f81022a9564c6befe8aa719cb74640a4a306f0d88856116ef611f2e565b6040516116fe939291906148aa565b60405180910390a15050506117fc565b600160ff168360c0015103611765578684611727611f2e565b6040517f7f6b0bb100000000000000000000000000000000000000000000000000000000815260040161175c939291906148e6565b60405180910390fd5b600260ff168360c00151036117be577fc2c704302430fe0dc8d95f272e2f4e54bbbc51a3327fd5d75ab41f9fc8fd129b888561179f611f2e565b6040516117ae939291906148aa565b60405180910390a1505050611809565b5b7f5a589b1d8062f33451d29cae3dabd9b2e36c62aee644178c600977ca8dda661a88856040516117f092919061470b565b60405180910390a15050505b80806001019150506114f1565b505050505050565b5f5f1b810361184c576040517f4294d12700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6118787fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85f1b82611f4c565b7f307ed6bd941ee9fc80f369c94af5fa11e25bab5102a6140191756c5474a30bfa816040516118a79190613bd3565b60405180910390a150565b6119167fbe27a319efc8734e89e26ba4bc95f5c788584163b959f03fa04e2d7ab4b9a1205f1b837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168373ffffffffffffffffffffffffffffffffffffffff165f1b611f53565b7f0d7fc113eaf016db4681a1ba86d083ce3e0961f321062a75ac2b0aeb33deeed18282604051611947929190614929565b60405180910390a15050565b5f81549050919050565b5f5f61196d836020015130611f88565b90505f6119798461202c565b9050818160405160200161198e9291906149c4565b6040516020818303038152906040528051906020012092505050919050565b5f3054905090565b5f5f5f5f5f5f5f6119c68b8b611db8565b915060ff1691506119d56133aa565b6040808416148015611a1257505f73ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff16145b15611b4e57611a2c828d8d611e669290919263ffffffff16565b809350819a50505089611b4d575f611a4f838e8e611ead9290919263ffffffff16565b8162ffffff16915080945081925050505f8d8d85908487611a709190614256565b92611a7d93929190614761565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f8201169050808301925050505050505090508a73ffffffffffffffffffffffffffffffffffffffff1663ccce3bc830836040518363ffffffff1660e01b8152600401611afc9291906149fa565b6040805180830381865afa158015611b16573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611b3a9190614a9d565b92508184611b489190614256565b935050505b5b600180841603611b8757611b758d8a838f8f87908092611b7093929190614761565b61223d565b97509750975097509750505050611ce5565b6002808416148d60200190151590811515815250505f6002601c8516901c9050611bc383828f8f611dff9190939291909392919063ffffffff16565b8094508197505050505f6001600560208616901c611be19190614256565b9050611bff83828f8f611dff9190939291909392919063ffffffff16565b809450819a50505050611c118d61195d565b9350611c2f8d858e8e86908092611c2a93929190614761565b612481565b8097508198505050611c4386895f1b612ff0565b9550611c5186865f1b612ff0565b9550611c75868a73ffffffffffffffffffffffffffffffffffffffff165f1b612ff0565b95505f5f1b815f015114158015611c8f575085815f015114155b8015611c9f575080602001518511155b15611ce157806040517fccbb534f000000000000000000000000000000000000000000000000000000008152600401611cd89190614af5565b60405180910390fd5b5050505b9550955095509550959050565b5f611cfc82613004565b9050919050565b611d5c7fc852adf5e97c2fc3b38f405671e91b7af1697ef0287577f227ef10494c2a8e865f1b846bffffffffffffffffffffffff841660608673ffffffffffffffffffffffffffffffffffffffff16901b175f1b611f53565b505050565b80305550565b5f5f5f611d967fc852adf5e97c2fc3b38f405671e91b7af1697ef0287577f227ef10494c2a8e865f1b85610d6e565b5f1c9050606081901c816bffffffffffffffffffffffff169250925050915091565b5f5f83358060f81c925060019150509250929050565b5f5f8483013573ffffffffffffffffffffffffffffffffffffffff8160601c16925060148401915050935093915050565b5f5f858401356008840261010003600180866008021b0382821c1693508486019250505094509492505050565b5f5f8483013561ffff8160f01c16925060028401915050935093915050565b5f5f848301358060f81c925060018401915050935093915050565b5f5f8483013573ffffffffffffffffffffffffffffffffffffffff8160601c16925060148401915050935093915050565b5f5f848301359150602083019050935093915050565b5f5f8483013562ffffff8160e81c16925060038401915050935093915050565b611efe7f8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e5f1b835f1b835f1b611f53565b5050565b5f5f5f8351602085018787f490509392505050565b5f5f5f835160208501878988f19050949350505050565b60603d604051915060208201818101604052818352815f823e505090565b8082555050565b5f8383604051602001611f679291906146e4565b60405160208183030381529060405280519060200120905081815550505050565b5f7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f7f4aa45ca7ad825ceb1bf35643f0a58c295239df563b1b565c2485f96477c563187f2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de85611ff75746611ff9565b5f5b8560405160200161200e959493929190614b0e565b60405160208183030381529060405280519060200120905092915050565b5f5f61203c836101000151613047565b90505f60ff16835f015160ff16036120be575f61205c84604001516130b4565b90507f11e1e4079a79a66e4ade50033cfe2678cdd5341d2dfe5ef9513edb1a0be147a281856060015186608001518560405160200161209f959493929190614b5f565b6040516020818303038152906040528051906020012092505050612238565b600160ff16835f015160ff160361212d577fe19a3b94fc3c7ece3f890d98a99bc422615537a08dea0603fa8425867d87d4668360a00151805190602001208260405160200161210f93929190614bb0565b60405160208183030381529060405280519060200120915050612238565b600260ff16835f015160ff1603612195577f11fdeb7e8373a1aa96bfac8d0ea91526b2c5d15e5cee20e0543e780258f3e8e48360c001518260405160200161217793929190614bb0565b60405160208183030381529060405280519060200120915050612238565b600360ff16835f015160ff16036121fd577fe19a3b94fc3c7ece3f890d98a99bc422615537a08dea0603fa8425867d87d4668360e00151826040516020016121df93929190614bb0565b60405160208183030381529060405280519060200120915050612238565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161222f90614c3f565b60405180910390fd5b919050565b5f5f5f5f5f61224a61330e565b6002815f019060ff16908160ff16815250505f5f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90505b8989905082101561240b575f5f6122a4848d8d611ead9290919263ffffffff16565b8162ffffff169150809550819250505083816122c09190614256565b9150505f8b8b905082146122d4575f6122d6565b8d5b90505f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84146123065785612308565b8f5b9050612328818e8e8890879261232093929190614761565b6001866119b5565b50809b50819c50829d50839e50505050508a8a1015612394578c8c8690859261235393929190614761565b8c8c6040517fb006aba000000000000000000000000000000000000000000000000000000000815260040161238b9493929190614c5d565b60405180910390fd5b829450888e5f0151036123ad575f5f1b8e5f0181815250505b8388106123f35787846040517f37daf62b0000000000000000000000000000000000000000000000000000000081526004016123ea929190614732565b60405180910390fd5b888660c0018181525050879350829450505050612282565b5f5f1b8b5f01511415801561242457508a602001518511155b15612466578a6040517fccbb534f00000000000000000000000000000000000000000000000000000000815260040161245d9190614af5565b60405180910390fd5b61246f8d61195d565b93505050509550955095509550959050565b5f5f5f5b84849050811015612fe6575f6124a6828787611e4b9290919263ffffffff16565b8160ff16915080935081925050505f600460f08316901c90505f81036125fe575f600f831690505f8160ff16036124f5576124ec848989611e4b9290919263ffffffff16565b80955081925050505b5f5f61250c868b8b61312e9290919263ffffffff16565b8097508193505050612529868b8b61312e9290919263ffffffff16565b80975081925050505f60ff82901c5f1c90505f7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff835f1c165f1b90505f601b830190505f60018f8388866040515f815260200160405260405161258f9493929190614caa565b6020604051602081039080840390855afa1580156125af573d5f5f3e3d5ffd5b5050506020604051035190508660ff168c019b505f6125d1828960ff16613144565b90505f5f1b8c036125e257806125ed565b6125ec8c82612ff0565b5b9b5050505050505050505050612485565b60018103612689575f600f831690505f8160ff16036126355761262c848989611e4b9290919263ffffffff16565b80955081925050505b5f61264b858a8a611e669290919263ffffffff16565b80965081925050505f612661828460ff16613144565b90505f5f1b8703612672578061267d565b61267c8782612ff0565b5b96505050505050612485565b6002810361287a575f6003831690505f8160ff16036126c0576126b7848989611e4b9290919263ffffffff16565b80955081925050505b5f6126d6858a8a611e669290919263ffffffff16565b80965081925050505f6002600c861660ff16901c60ff1690505f61270c87838d8d611dff9190939291909392919063ffffffff16565b80985081925050505f81880190506320c13b0b60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168473ffffffffffffffffffffffffffffffffffffffff16631626ba7e8f8f8f8d90879261277093929190614761565b6040518463ffffffff1660e01b815260040161278e93929190614ced565b602060405180830381865afa1580156127a9573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906127cd9190614d31565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614612836578d8d858e8e6040517ff734863a00000000000000000000000000000000000000000000000000000000815260040161282d959493929190614d5c565b60405180910390fd5b8097508460ff168a0199505f61284f858760ff16613144565b90505f5f1b8a03612860578061286b565b61286a8a82612ff0565b5b99505050505050505050612485565b600381036128c4575f61289884898961312e9290919263ffffffff16565b80955081925050505f5f1b85036128af57806128ba565b6128b98582612ff0565b5b9450505050612485565b60048103612946575f600f831660ff1690505f6128f385838b8b611dff9190939291909392919063ffffffff16565b80965081925050505f81860190505f5f61291f8e8e8e8e8c90889261291a93929190614761565b612481565b91509150829750818a0199506129358982612ff0565b985082975050505050505050612485565b60068103612a56575f6002600c841660ff16901c60ff1690505f810361298a5761297b848989611e4b9290919263ffffffff16565b8160ff16915080955081925050505b5f6003841660ff1690505f81036129c0576129b0858a8a611e2c9290919263ffffffff16565b8161ffff16915080965081925050505b5f6129d6868b8b611ead9290919263ffffffff16565b8162ffffff16915080975081925050505f81870190505f5f612a0a8f8f8f8f8d908892612a0593929190614761565b612481565b91509150829850848210612a1e57858b019a505b5f612a2a828789613176565b90505f5f1b8b03612a3b5780612a46565b612a458b82612ff0565b5b9a50505050505050505050612485565b60058103612ad8575f612a7484898961312e9290919263ffffffff16565b8095508192505050888103612aa7577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff95505b5f612ab1826131ab565b90505f5f1b8603612ac25780612acd565b612acc8682612ff0565b5b955050505050612485565b60078103612c3e575f600f831690505f8160ff1603612b0f57612b06848989611e4b9290919263ffffffff16565b80955081925050505b5f5f612b26868b8b61312e9290919263ffffffff16565b8097508193505050612b43868b8b61312e9290919263ffffffff16565b80975081925050505f60ff82901c5f1c90505f7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff835f1c165f1b90505f601b830190505f60018f604051602001612b9a9190614df9565b604051602081830303815290604052805190602001208388866040515f8152602001604052604051612bcf9493929190614caa565b6020604051602081039080840390855afa158015612bef573d5f5f3e3d5ffd5b5050506020604051035190508660ff168c019b505f612c11828960ff16613144565b90505f5f1b8c03612c225780612c2d565b612c2c8c82612ff0565b5b9b5050505050505050505050612485565b60088103612cd7575f612c5c84898961312e9290919263ffffffff16565b80955081925050505f612c785f8c6131da90919063ffffffff16565b9050808203612ca5577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff96505b5f612caf8261322b565b90505f5f1b8703612cc05780612ccb565b612cca8782612ff0565b5b96505050505050612485565b60098103612e40575f6003831690505f8160ff1603612d0e57612d05848989611e4b9290919263ffffffff16565b80955081925050505b5f612d24858a8a611e669290919263ffffffff16565b80965081925050505f5f6002600c871660ff16901c60ff169050612d5a87828d8d611dff9190939291909392919063ffffffff16565b8098508193505050505f81870190505f8373ffffffffffffffffffffffffffffffffffffffff166313792a4a8f8e8e8c908792612d9993929190614761565b6040518463ffffffff1660e01b8152600401612db793929190614e1e565b602060405180830381865afa158015612dd2573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190612df69190614e55565b90508197508460ff168a0199505f612e12858760ff168461325a565b90505f5f1b8a03612e235780612e2e565b612e2d8a82612ff0565b5b99508298505050505050505050612485565b600a8103612fa9575f6003831690505f8160ff1603612e7757612e6e848989611e4b9290919263ffffffff16565b80955081925050505b5f612e8d858a8a611e669290919263ffffffff16565b80965081925050505f6002600c861660ff16901c60ff1690505f612ec387838d8d611dff9190939291909392919063ffffffff16565b80985081925050505f81880190505f8473ffffffffffffffffffffffffffffffffffffffff1663898bd9218f8f8f8d908792612f0193929190614761565b6040518463ffffffff1660e01b8152600401612f1f93929190614ced565b602060405180830381865afa158015612f3a573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190612f5e9190614e55565b90508198508560ff168b019a505f612f7a868860ff168461325a565b90505f5f1b8b03612f8b5780612f96565b612f958b82612ff0565b5b9a50829950505050505050505050612485565b806040517fb2505f7c000000000000000000000000000000000000000000000000000000008152600401612fdd9190613f11565b60405180910390fd5b5094509492505050565b5f825f528160205260405f20905092915050565b5f5f5f1b8214158015613040575061303d7fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85f1b611953565b82145b9050919050565b5f60605f5f90505b83518110156130a3578184828151811061306c5761306b614289565b5b6020026020010151604051602001613085929190614e80565b6040516020818303038152906040529150808060010191505061304f565b508080519060200120915050919050565b5f60605f5f90505b835181101561311d575f6130e98583815181106130dc576130db614289565b5b602002602001015161328f565b905082816040516020016130fe929190614ede565b60405160208183030381529060405292505080806001019150506130bc565b508080519060200120915050919050565b5f5f848301359150602083019050935093915050565b5f8282604051602001613158929190614fb4565b60405160208183030381529060405280519060200120905092915050565b5f83838360405160200161318c93929190615034565b6040516020818303038152906040528051906020012090509392505050565b5f816040516020016131bd91906150c5565b604051602081830303815290604052805190602001209050919050565b5f5f6131ea846020015184611f88565b90505f6131f68561202c565b9050818160405160200161320b9291906149c4565b604051602081830303815290604052805190602001209250505092915050565b5f8160405160200161323d9190615134565b604051602081830303815290604052805190602001209050919050565b5f838383604051602001613270939291906151a3565b6040516020818303038152906040528051906020012090509392505050565b5f7f0603985259a953da1f65a522f589c17bd1d0117ec1d3abb7c0788aef251ef437825f01518360200151846040015180519060200120856060015186608001518760a001518860c001516040516020016132f19897969594939291906151ea565b604051602081830303815290604052805190602001209050919050565b6040518061012001604052805f60ff1681526020015f15158152602001606081526020015f81526020015f8152602001606081526020015f81526020015f8152602001606081525090565b6040518060e001604052805f73ffffffffffffffffffffffffffffffffffffffff1681526020015f8152602001606081526020015f81526020015f151581526020015f151581526020015f81525090565b60405180604001604052805f81526020015f81525090565b5f82905092915050565b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b5f82821b905092915050565b5f61340e83836133c2565b8261341981356133cc565b92506004821015613459576134547fffffffff00000000000000000000000000000000000000000000000000000000836004036008026133f7565b831692505b505092915050565b5f81905092915050565b828183375f83830152505050565b5f6134848385613461565b935061349183858461346b565b82840190509392505050565b5f6134a9828486613479565b91508190509392505050565b5f604051905090565b5f5ffd5b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6134ef826134c6565b9050919050565b6134ff816134e5565b8114613509575f5ffd5b50565b5f8135905061351a816134f6565b92915050565b5f60208284031215613535576135346134be565b5b5f6135428482850161350c565b91505092915050565b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6135958261354f565b810181811067ffffffffffffffff821117156135b4576135b361355f565b5b80604052505050565b5f6135c66134b5565b90506135d2828261358c565b919050565b5f5ffd5b5f60ff82169050919050565b6135f0816135db565b81146135fa575f5ffd5b50565b5f8135905061360b816135e7565b92915050565b5f8115159050919050565b61362581613611565b811461362f575f5ffd5b50565b5f813590506136408161361c565b92915050565b5f5ffd5b5f67ffffffffffffffff8211156136645761366361355f565b5b602082029050602081019050919050565b5f5ffd5b5f819050919050565b61368b81613679565b8114613695575f5ffd5b50565b5f813590506136a681613682565b92915050565b5f5ffd5b5f67ffffffffffffffff8211156136ca576136c961355f565b5b6136d38261354f565b9050602081019050919050565b5f6136f26136ed846136b0565b6135bd565b90508281526020810184848401111561370e5761370d6136ac565b5b61371984828561346b565b509392505050565b5f82601f83011261373557613734613646565b5b81356137458482602086016136e0565b91505092915050565b5f60e082840312156137635761376261354b565b5b61376d60e06135bd565b90505f61377c8482850161350c565b5f83015250602061378f84828501613698565b602083015250604082013567ffffffffffffffff8111156137b3576137b26135d7565b5b6137bf84828501613721565b60408301525060606137d384828501613698565b60608301525060806137e784828501613632565b60808301525060a06137fb84828501613632565b60a08301525060c061380f84828501613698565b60c08301525092915050565b5f61382d6138288461364a565b6135bd565b905080838252602082019050602084028301858111156138505761384f613675565b5b835b8181101561389757803567ffffffffffffffff81111561387557613874613646565b5b808601613882898261374e565b85526020850194505050602081019050613852565b5050509392505050565b5f82601f8301126138b5576138b4613646565b5b81356138c584826020860161381b565b91505092915050565b5f819050919050565b6138e0816138ce565b81146138ea575f5ffd5b50565b5f813590506138fb816138d7565b92915050565b5f67ffffffffffffffff82111561391b5761391a61355f565b5b602082029050602081019050919050565b5f61393e61393984613901565b6135bd565b9050808382526020820190506020840283018581111561396157613960613675565b5b835b8181101561398a5780613976888261350c565b845260208401935050602081019050613963565b5050509392505050565b5f82601f8301126139a8576139a7613646565b5b81356139b884826020860161392c565b91505092915050565b5f61012082840312156139d7576139d661354b565b5b6139e26101206135bd565b90505f6139f1848285016135fd565b5f830152506020613a0484828501613632565b602083015250604082013567ffffffffffffffff811115613a2857613a276135d7565b5b613a34848285016138a1565b6040830152506060613a4884828501613698565b6060830152506080613a5c84828501613698565b60808301525060a082013567ffffffffffffffff811115613a8057613a7f6135d7565b5b613a8c84828501613721565b60a08301525060c0613aa0848285016138ed565b60c08301525060e0613ab4848285016138ed565b60e08301525061010082013567ffffffffffffffff811115613ad957613ad86135d7565b5b613ae584828501613994565b6101008301525092915050565b5f5ffd5b5f5f83601f840112613b0b57613b0a613646565b5b8235905067ffffffffffffffff811115613b2857613b27613af2565b5b602083019150836001820283011115613b4457613b43613675565b5b9250929050565b5f5f5f60408486031215613b6257613b616134be565b5b5f84013567ffffffffffffffff811115613b7f57613b7e6134c2565b5b613b8b868287016139c1565b935050602084013567ffffffffffffffff811115613bac57613bab6134c2565b5b613bb886828701613af6565b92509250509250925092565b613bcd816138ce565b82525050565b5f602082019050613be65f830184613bc4565b92915050565b5f5f5f5f5f60808688031215613c0557613c046134be565b5b5f613c128882890161350c565b9550506020613c238882890161350c565b9450506040613c3488828901613698565b935050606086013567ffffffffffffffff811115613c5557613c546134c2565b5b613c6188828901613af6565b92509250509295509295909350565b613c79816133cc565b82525050565b5f602082019050613c925f830184613c70565b92915050565b5f5f5f60408486031215613caf57613cae6134be565b5b5f613cbc868287016138ed565b935050602084013567ffffffffffffffff811115613cdd57613cdc6134c2565b5b613ce986828701613af6565b92509250509250925092565b613cfe816133cc565b8114613d08575f5ffd5b50565b5f81359050613d1981613cf5565b92915050565b5f60208284031215613d3457613d336134be565b5b5f613d4184828501613d0b565b91505092915050565b613d53816134e5565b82525050565b5f602082019050613d6c5f830184613d4a565b92915050565b5f5f5f5f60408587031215613d8a57613d896134be565b5b5f85013567ffffffffffffffff811115613da757613da66134c2565b5b613db387828801613af6565b9450945050602085013567ffffffffffffffff811115613dd657613dd56134c2565b5b613de287828801613af6565b925092505092959194509250565b5f60208284031215613e0557613e046134be565b5b5f613e12848285016138ed565b91505092915050565b5f5f60208385031215613e3157613e306134be565b5b5f83013567ffffffffffffffff811115613e4e57613e4d6134c2565b5b613e5a85828601613af6565b92509250509250929050565b5f5f5f5f60608587031215613e7e57613e7d6134be565b5b5f613e8b8782880161350c565b9450506020613e9c87828801613698565b935050604085013567ffffffffffffffff811115613ebd57613ebc6134c2565b5b613ec987828801613af6565b925092505092959194509250565b5f60208284031215613eec57613eeb6134be565b5b5f613ef984828501613698565b91505092915050565b613f0b81613679565b82525050565b5f602082019050613f245f830184613f02565b92915050565b613f3381613611565b82525050565b5f60c082019050613f4c5f830189613f02565b613f596020830188613f02565b613f666040830187613f2a565b613f736060830186613bc4565b613f806080830185613f02565b613f8d60a0830184613bc4565b979650505050505050565b5f5f60408385031215613fae57613fad6134be565b5b5f613fbb85828601613d0b565b9250506020613fcc8582860161350c565b9150509250929050565b5f5f83601f840112613feb57613fea613646565b5b8235905067ffffffffffffffff81111561400857614007613af2565b5b60208301915083602082028301111561402457614023613675565b5b9250929050565b5f5f5f5f5f5f5f5f60a0898b031215614047576140466134be565b5b5f6140548b828c0161350c565b98505060206140658b828c0161350c565b975050604089013567ffffffffffffffff811115614086576140856134c2565b5b6140928b828c01613fd6565b9650965050606089013567ffffffffffffffff8111156140b5576140b46134c2565b5b6140c18b828c01613fd6565b9450945050608089013567ffffffffffffffff8111156140e4576140e36134c2565b5b6140f08b828c01613af6565b92509250509295985092959890939650565b5f5f5f5f5f5f60a0878903121561411c5761411b6134be565b5b5f61412989828a0161350c565b965050602061413a89828a0161350c565b955050604061414b89828a01613698565b945050606061415c89828a01613698565b935050608087013567ffffffffffffffff81111561417d5761417c6134c2565b5b61418989828a01613af6565b92509250509295509295509295565b5f6bffffffffffffffffffffffff82169050919050565b6141b881614198565b81146141c2575f5ffd5b50565b5f813590506141d3816141af565b92915050565b5f5f5f606084860312156141f0576141ef6134be565b5b5f6141fd868287016138ed565b935050602061420e8682870161350c565b925050604061421f868287016141c5565b9150509250925092565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61426082613679565b915061426b83613679565b925082820190508082111561428357614282614229565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b6142bf816135db565b82525050565b6142ce81613611565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b614306816134e5565b82525050565b61431581613679565b82525050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f61434d8261431b565b6143578185614325565b9350614367818560208601614335565b6143708161354f565b840191505092915050565b5f60e083015f8301516143905f8601826142fd565b5060208301516143a3602086018261430c565b50604083015184820360408601526143bb8282614343565b91505060608301516143d0606086018261430c565b5060808301516143e360808601826142c5565b5060a08301516143f660a08601826142c5565b5060c083015161440960c086018261430c565b508091505092915050565b5f61441f838361437b565b905092915050565b5f602082019050919050565b5f61443d826142d4565b61444781856142de565b935083602082028501614459856142ee565b805f5b8581101561449457848403895281516144758582614414565b945061448083614427565b925060208a0199505060018101905061445c565b50829750879550505050505092915050565b6144af816138ce565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f6144e983836142fd565b60208301905092915050565b5f602082019050919050565b5f61450b826144b5565b61451581856144bf565b9350614520836144cf565b805f5b8381101561455057815161453788826144de565b9750614542836144f5565b925050600181019050614523565b5085935050505092915050565b5f61012083015f8301516145735f8601826142b6565b50602083015161458660208601826142c5565b506040830151848203604086015261459e8282614433565b91505060608301516145b3606086018261430c565b5060808301516145c6608086018261430c565b5060a083015184820360a08601526145de8282614343565b91505060c08301516145f360c08601826144a6565b5060e083015161460660e08601826144a6565b506101008301518482036101008601526146208282614501565b9150508091505092915050565b5f82825260208201905092915050565b5f614648838561462d565b935061465583858461346b565b61465e8361354f565b840190509392505050565b5f6040820190508181035f830152614681818661455d565b9050818103602083015261469681848661463d565b9050949350505050565b6146a981614198565b82525050565b5f6060820190506146c25f830186613bc4565b6146cf6020830185613d4a565b6146dc60408301846146a0565b949350505050565b5f6040820190506146f75f830185613bc4565b6147046020830184613bc4565b9392505050565b5f60408201905061471e5f830185613bc4565b61472b6020830184613f02565b9392505050565b5f6040820190506147455f830185613f02565b6147526020830184613f02565b9392505050565b5f5ffd5b5f5ffd5b5f5f8585111561477457614773614759565b5b838611156147855761478461475d565b5b6001850283019150848603905094509492505050565b5f6060820190506147ae5f830186613f02565b6147bb6020830185613f02565b6147c86040830184613f02565b949350505050565b5f6060820190508181035f8301526147e8818661455d565b90506147f76020830185613f02565b6148046040830184613f02565b949350505050565b5f6148168261431b565b614820818561462d565b9350614830818560208601614335565b6148398161354f565b840191505092915050565b5f60c0820190506148575f830189613bc4565b6148646020830188613f02565b6148716040830187613f02565b61487e6060830186613f02565b61488b6080830185613f02565b81810360a083015261489d818461480c565b9050979650505050505050565b5f6060820190506148bd5f830186613bc4565b6148ca6020830185613f02565b81810360408301526148dc818461480c565b9050949350505050565b5f6060820190508181035f8301526148fe818661455d565b905061490d6020830185613f02565b818103604083015261491f818461480c565b9050949350505050565b5f60408201905061493c5f830185613c70565b6149496020830184613d4a565b9392505050565b5f81905092915050565b7f19010000000000000000000000000000000000000000000000000000000000005f82015250565b5f61498e600283614950565b91506149998261495a565b600282019050919050565b5f819050919050565b6149be6149b9826138ce565b6149a4565b82525050565b5f6149ce82614982565b91506149da82856149ad565b6020820191506149ea82846149ad565b6020820191508190509392505050565b5f604082019050614a0d5f830185613d4a565b8181036020830152614a1f818461480c565b90509392505050565b5f81519050614a36816138d7565b92915050565b5f81519050614a4a81613682565b92915050565b5f60408284031215614a6557614a6461354b565b5b614a6f60406135bd565b90505f614a7e84828501614a28565b5f830152506020614a9184828501614a3c565b60208301525092915050565b5f60408284031215614ab257614ab16134be565b5b5f614abf84828501614a50565b91505092915050565b604082015f820151614adc5f8501826144a6565b506020820151614aef602085018261430c565b50505050565b5f604082019050614b085f830184614ac8565b92915050565b5f60a082019050614b215f830188613bc4565b614b2e6020830187613bc4565b614b3b6040830186613bc4565b614b486060830185613f02565b614b556080830184613d4a565b9695505050505050565b5f60a082019050614b725f830188613bc4565b614b7f6020830187613bc4565b614b8c6040830186613f02565b614b996060830185613f02565b614ba66080830184613bc4565b9695505050505050565b5f606082019050614bc35f830186613bc4565b614bd06020830185613bc4565b614bdd6040830184613bc4565b949350505050565b5f82825260208201905092915050565b7f556e737570706f72746564206b696e64000000000000000000000000000000005f82015250565b5f614c29601083614be5565b9150614c3482614bf5565b602082019050919050565b5f6020820190508181035f830152614c5681614c1d565b9050919050565b5f6060820190508181035f830152614c7681868861463d565b9050614c856020830185613f02565b614c926040830184613f02565b95945050505050565b614ca4816135db565b82525050565b5f608082019050614cbd5f830187613bc4565b614cca6020830186614c9b565b614cd76040830185613bc4565b614ce46060830184613bc4565b95945050505050565b5f604082019050614d005f830186613bc4565b8181036020830152614d1381848661463d565b9050949350505050565b5f81519050614d2b81613cf5565b92915050565b5f60208284031215614d4657614d456134be565b5b5f614d5384828501614d1d565b91505092915050565b5f6080820190508181035f830152614d74818861455d565b9050614d836020830187613bc4565b614d906040830186613d4a565b8181036060830152614da381848661463d565b90509695505050505050565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000005f82015250565b5f614de3601c83614950565b9150614dee82614daf565b601c82019050919050565b5f614e0382614dd7565b9150614e0f82846149ad565b60208201915081905092915050565b5f6040820190508181035f830152614e36818661455d565b90508181036020830152614e4b81848661463d565b9050949350505050565b5f60208284031215614e6a57614e696134be565b5b5f614e7784828501614a28565b91505092915050565b5f6040820190508181035f830152614e98818561480c565b9050614ea76020830184613d4a565b9392505050565b5f614eb88261431b565b614ec28185613461565b9350614ed2818560208601614335565b80840191505092915050565b5f614ee98285614eae565b9150614ef582846149ad565b6020820191508190509392505050565b7f53657175656e6365207369676e65723a0a0000000000000000000000000000005f82015250565b5f614f39601183614950565b9150614f4482614f05565b601182019050919050565b5f8160601b9050919050565b5f614f6582614f4f565b9050919050565b5f614f7682614f5b565b9050919050565b614f8e614f89826134e5565b614f6c565b82525050565b5f819050919050565b614fae614fa982613679565b614f94565b82525050565b5f614fbe82614f2d565b9150614fca8285614f7d565b601482019150614fda8284614f9d565b6020820191508190509392505050565b7f53657175656e6365206e657374656420636f6e6669673a0a00000000000000005f82015250565b5f61501e601883614950565b915061502982614fea565b601882019050919050565b5f61503e82615012565b915061504a82866149ad565b60208201915061505a8285614f9d565b60208201915061506a8284614f9d565b602082019150819050949350505050565b7f53657175656e636520737461746963206469676573743a0a00000000000000005f82015250565b5f6150af601883614950565b91506150ba8261507b565b601882019050919050565b5f6150cf826150a3565b91506150db82846149ad565b60208201915081905092915050565b7f53657175656e636520616e792061646472657373207375626469676573743a0a5f82015250565b5f61511e602083614950565b9150615129826150ea565b602082019050919050565b5f61513e82615112565b915061514a82846149ad565b60208201915081905092915050565b7f53657175656e63652073617069656e7420636f6e6669673a0a000000000000005f82015250565b5f61518d601983614950565b915061519882615159565b601982019050919050565b5f6151ad82615181565b91506151b98286614f7d565b6014820191506151c98285614f9d565b6020820191506151d982846149ad565b602082019150819050949350505050565b5f610100820190506151fe5f83018b613bc4565b61520b602083018a613d4a565b6152186040830189613f02565b6152256060830188613bc4565b6152326080830187613f02565b61523f60a0830186613f2a565b61524c60c0830185613f2a565b61525960e0830184613f02565b999850505050505050505056fea2646970667358221220538229a1f0a356aee59581aeaaa62911af2ba8afeb74063d10359e984290b50e64736f6c634300081c0033603e600e3d39601e805130553df33d3d34601c57363d3d373d363d30545af43d82803e903d91601c57fd5bf3',
      signer
    )
  }
}
