export const FACTORY_DEFAULT_ABI = [
  {
    type: 'constructor',
    inputs: [{ name: 'factoryOwner', type: 'address', internalType: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    inputs: [],
    name: 'beacon',
    outputs: [
      {
        internalType: 'contract UpgradeableBeacon',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]
