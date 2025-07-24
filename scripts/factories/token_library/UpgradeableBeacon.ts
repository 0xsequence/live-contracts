import { ContractFactory, type ethers } from 'ethers'

const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'implementation_',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'implementation',
        type: 'address'
      }
    ],
    name: 'Upgraded',
    type: 'event'
  },
  {
    inputs: [],
    name: 'implementation',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address'
      }
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export class UpgradeableBeacon extends ContractFactory {
  constructor(signer?: ethers.Signer) {
    super(
      abi,
      '0x60803461011a57601f6105ee38819003918201601f19168301916001600160401b0383118484101761011f5780849260209460405283398101031261011a57516001600160a01b03808216919082820361011a576000549160018060a01b0319923384821617600055604051923391167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a33b156100b2575060015416176001556040516104b890816101368239f35b62461bcd60e51b815260206004820152603360248201527f5570677261646561626c65426561636f6e3a20696d706c656d656e746174696f60448201527f6e206973206e6f74206120636f6e7472616374000000000000000000000000006064820152608490fd5b600080fd5b634e487b7160e01b600052604160045260246000fdfe6080604052600436101561001257600080fd5b6000803560e01c80633659cfe6146102ce5780635c60da1b1461027c578063715018a6146101e05780638da5cb5b1461018f5763f2fde38b1461005457600080fd5b3461018c5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261018c5760043573ffffffffffffffffffffffffffffffffffffffff808216809203610188576100ad610403565b8115610104578254827fffffffffffffffffffffffff00000000000000000000000000000000000000008216178455167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152fd5b8280fd5b80fd5b503461018c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261018c5773ffffffffffffffffffffffffffffffffffffffff6020915416604051908152f35b503461018c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261018c57610217610403565b8073ffffffffffffffffffffffffffffffffffffffff81547fffffffffffffffffffffffff000000000000000000000000000000000000000081168355167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b503461018c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261018c57602073ffffffffffffffffffffffffffffffffffffffff60015416604051908152f35b503461018c5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261018c5760043573ffffffffffffffffffffffffffffffffffffffff81169081810361018857610328610403565b3b1561037f57807fffffffffffffffffffffffff000000000000000000000000000000000000000060015416176001557fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b8280a280f35b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603360248201527f5570677261646561626c65426561636f6e3a20696d706c656d656e746174696f60448201527f6e206973206e6f74206120636f6e7472616374000000000000000000000000006064820152fd5b73ffffffffffffffffffffffffffffffffffffffff60005416330361042457565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fdfea2646970667358221220dc365b16a2b6643d361d2ca2ef711f783ae4b4503a5f52631ea9ce48e88aa6da64736f6c63430008130033',
      signer
    )
  }
}
