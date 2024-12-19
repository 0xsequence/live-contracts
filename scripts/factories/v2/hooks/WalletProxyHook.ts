import { ContractFactory, type ethers } from 'ethers'
import type { VerificationRequest } from 'scripts/types'

// https://github.com/0xsequence/wallet-contracts/blob/0bf7d0da7086e94f69532745736a2ba9483926a3/contracts/hooks/WalletProxyHook.sol

const abi = [
  {
    type: 'function',
    name: 'PROXY_getImplementation',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view'
  }
]

export class WalletProxyHook extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      abi,
      '0x6080604052348015600f57600080fd5b5060938061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80639061112714602d575b600080fd5b6033604f565b6040516001600160a01b03909116815260200160405180910390f35b60006058305490565b90509056fea26469706673582212205e5b3dcc81089fa0894293288dd67392e8f0fc11d103648a44d034698b9883ae64736f6c63430008120033',
      signer
    )
  }
}

export const WALLETPROXYHOOK_VERIFICATION: Omit<VerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'contracts/hooks/WalletProxyHook.sol:WalletProxyHook',
  version: 'v0.8.18+commit.87f61d96',
  licenceType: 'Apache-2.0',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'contracts/hooks/WalletProxyHook.sol': {
        content:
          "// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport {IWalletProxy} from './interfaces/IWalletProxy.sol';\nimport {Implementation} from '../modules/commons/Implementation.sol';\n\ncontract WalletProxyHook is IWalletProxy, Implementation {\n  /// @inheritdoc IWalletProxy\n  function PROXY_getImplementation() public view returns (address) {\n    return _getImplementation();\n  }\n}\n"
      },
      'contracts/hooks/interfaces/IWalletProxy.sol': {
        content:
          "// Copyright Immutable Pty Ltd 2018 - 2023\n// SPDX-License-Identifier: Apache 2.0\n// https://github.com/immutable/contracts/blob/a04f7ecb8a79ad8f1b67f73f770e0545deb6cba2/contracts/allowlist/IWalletProxy.sol\npragma solidity 0.8.18;\n\n// Interface to retrieve the implemention stored inside the Proxy contract\n/// Interface for Passport Wallet's proxy contract.\ninterface IWalletProxy {\n    // Returns the current implementation address used by the proxy contract\n    // solhint-disable-next-line func-name-mixedcase\n    function PROXY_getImplementation() external view returns (address);\n}\n"
      },
      'contracts/modules/commons/Implementation.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n/**\n * @dev Allows modules to access the implementation slot\n */\ncontract Implementation {\n  /**\n   * @notice Updates the Wallet implementation\n   * @param _imp New implementation address\n   * @dev The wallet implementation is stored on the storage slot\n   *   defined by the address of the wallet itself\n   *   WARNING updating this value may break the wallet and users\n   *   must be confident that the new implementation is safe.\n   */\n  function _setImplementation(address _imp) internal {\n    assembly {\n      sstore(address(), _imp)\n    }\n  }\n\n  /**\n   * @notice Returns the Wallet implementation\n   * @return _imp The address of the current Wallet implementation\n   */\n  function _getImplementation() internal view returns (address _imp) {\n    assembly {\n      _imp := sload(address())\n    }\n  }\n}\n'
      }
    },
    settings: {
      optimizer: { enabled: true, runs: 200 },
      metadata: { bytecodeHash: 'ipfs' },
      evmVersion: 'paris',
      libraries: {},
      remappings: [
        '@ensdomains/=node_modules/@ensdomains/',
        'ds-test/=lib/forge-std/lib/ds-test/src/',
        'eth-gas-reporter/=node_modules/eth-gas-reporter/',
        'forge-std/=lib/forge-std/src/',
        'foundry-huff/=lib/foundry-huff/src/',
        'hardhat/=node_modules/hardhat/',
        'solidity-stringutils/=lib/foundry-huff/lib/solidity-stringutils/',
        'stringutils/=lib/foundry-huff/lib/solidity-stringutils/'
      ],
      outputSelection: {
        '*': {
          '*': ['evm.bytecode', 'evm.deployedBytecode', 'devdoc', 'userdoc', 'metadata', 'abi']
        }
      }
    }
  }
}
