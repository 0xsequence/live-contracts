import type { EtherscanVerificationRequest } from '@0xsequence/solidity-deployer'
import { ContractFactory, ethers } from 'ethers'

export class FactoryV1 extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_mainModule',
              type: 'address'
            },
            {
              internalType: 'bytes32',
              name: '_salt',
              type: 'bytes32'
            }
          ],
          name: 'deploy',
          outputs: [
            {
              internalType: 'address',
              name: '_contract',
              type: 'address'
            }
          ],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      '0x608060405234801561001057600080fd5b506101c8806100206000396000f3fe60806040526004361061001e5760003560e01c806332c02a1414610023575b600080fd5b61005c6004803603604081101561003957600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610085565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b60008060405180606001604052806028815260200161016b602891398473ffffffffffffffffffffffffffffffffffffffff166040516020018083805190602001908083835b6020831061010857805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe090920191602091820191016100cb565b51815160209384036101000a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0180199092169116179052920193845250604080518085038152938201905282519294508693508401905034f594935050505056fe603a600e3d39601a805130553df3363d3d373d3d3d363d30545af43d82803e903d91601857fd5bf3a26469706673582212209b0bce93afab3297b9ebf4e58fa642ef123d74bcbd3bdb4e48b662eb12b430ca64736f6c63430007060033',
      signer
    )
  }
}

export const FACTORY_V1_VERIFICATION: Omit<EtherscanVerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'contracts/Factory.sol:Factory',
  version: 'v0.7.6+commit.7338295f',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'contracts/Factory.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\nimport "./Wallet.sol";\n\n\ncontract Factory {\n  /**\n   * @notice Will deploy a new wallet instance\n   * @param _mainModule Address of the main module to be used by the wallet\n   * @param _salt Salt used to generate the wallet, which is the imageHash\n   *       of the wallet\'s configuration.\n   * @dev It is recommended to not have more than 200 signers as opcode repricing\n   *      could make transactions impossible to execute as all the signers must be\n   *      passed for each transaction.\n   */\n  function deploy(address _mainModule, bytes32 _salt) public payable returns (address _contract) {\n    bytes memory code = abi.encodePacked(Wallet.creationCode, uint256(_mainModule));\n    assembly { _contract := create2(callvalue(), add(code, 32), mload(code), _salt) }\n  }\n}\n'
      },
      'contracts/Wallet.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.7.6;\n\n/**\n    Minimal upgradeable proxy implementation, delegates all calls to the address\n    defined by the storage slot matching the wallet address.\n\n    Inspired by EIP-1167 Implementation (https://eips.ethereum.org/EIPS/eip-1167)\n\n    deployed code:\n\n        0x00    0x36         0x36      CALLDATASIZE      cds\n        0x01    0x3d         0x3d      RETURNDATASIZE    0 cds\n        0x02    0x3d         0x3d      RETURNDATASIZE    0 0 cds\n        0x03    0x37         0x37      CALLDATACOPY\n        0x04    0x3d         0x3d      RETURNDATASIZE    0\n        0x05    0x3d         0x3d      RETURNDATASIZE    0 0\n        0x06    0x3d         0x3d      RETURNDATASIZE    0 0 0\n        0x07    0x36         0x36      CALLDATASIZE      cds 0 0 0\n        0x08    0x3d         0x3d      RETURNDATASIZE    0 cds 0 0 0\n        0x09    0x30         0x30      ADDRESS           addr 0 cds 0 0 0\n        0x0A    0x54         0x54      SLOAD             imp 0 cds 0 0 0\n        0x0B    0x5a         0x5a      GAS               gas imp 0 cds 0 0 0\n        0x0C    0xf4         0xf4      DELEGATECALL      suc 0\n        0x0D    0x3d         0x3d      RETURNDATASIZE    rds suc 0\n        0x0E    0x82         0x82      DUP3              0 rds suc 0\n        0x0F    0x80         0x80      DUP1              0 0 rds suc 0\n        0x10    0x3e         0x3e      RETURNDATACOPY    suc 0\n        0x11    0x90         0x90      SWAP1             0 suc\n        0x12    0x3d         0x3d      RETURNDATASIZE    rds 0 suc\n        0x13    0x91         0x91      SWAP2             suc 0 rds\n        0x14    0x60 0x18    0x6018    PUSH1             0x18 suc 0 rds\n    /-- 0x16    0x57         0x57      JUMPI             0 rds\n    |   0x17    0xfd         0xfd      REVERT\n    \\-> 0x18    0x5b         0x5b      JUMPDEST          0 rds\n        0x19    0xf3         0xf3      RETURN\n\n    flat deployed code: 0x363d3d373d3d3d363d30545af43d82803e903d91601857fd5bf3\n\n    deploy function:\n\n        0x00    0x60 0x3a    0x603a    PUSH1             0x3a\n        0x02    0x60 0x0e    0x600e    PUSH1             0x0e 0x3a\n        0x04    0x3d         0x3d      RETURNDATASIZE    0 0x0e 0x3a\n        0x05    0x39         0x39      CODECOPY\n        0x06    0x60 0x1a    0x601a    PUSH1             0x1a\n        0x08    0x80         0x80      DUP1              0x1a 0x1a\n        0x09    0x51         0x51      MLOAD             imp 0x1a\n        0x0A    0x30         0x30      ADDRESS           addr imp 0x1a\n        0x0B    0x55         0x55      SSTORE            0x1a\n        0x0C    0x3d         0x3d      RETURNDATASIZE    0 0x1a\n        0x0D    0xf3         0xf3      RETURN\n        [...deployed code]\n\n    flat deploy function: 0x603a600e3d39601a805130553df3363d3d373d3d3d363d30545af43d82803e903d91601857fd5bf3\n*/\nlibrary Wallet {\n  bytes internal constant creationCode = hex"603a600e3d39601a805130553df3363d3d373d3d3d363d30545af43d82803e903d91601857fd5bf3";\n}\n'
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
