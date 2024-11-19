import { ContractFactory, type ethers } from 'ethers'
import type { VerificationRequest } from 'scripts/types'

// https://github.com/0xsequence/wallet-contracts/blob/cb4e5aef9b22cb278b8da39e5419eed2b6d6714b/contracts/EternalFactory.sol

const abi = [
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
    name: 'deployEternal',
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
]

export class EternalFactory extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      abi,
      '0x608060405234801561001057600080fd5b5061014d806100206000396000f3fe60806040526004361061001e5760003560e01c8063cadc5a6514610023575b600080fd5b6100366100313660046100d2565b61005f565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b600061006b8383610072565b9392505050565b600061006b6000848460006c5af43d3d93803e602a57fd5bf36021528260145273602c3d8160093d39f33d3d3d3d363d3d37363d73600052816035600c86f59050806100c65763301164256000526004601cfd5b60006021529392505050565b600080604083850312156100e557600080fd5b823573ffffffffffffffffffffffffffffffffffffffff8116811461010957600080fd5b94602093909301359350505056fea264697066735822122060a7aed5e026952306c313d21ea3562afa078521b20facaba4577ba19bed748064736f6c63430008130033',
      signer
    )
  }
}

export const ETERNALFACTORY_VERIFICATION: Omit<VerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'contracts/EternalFactory.sol:EternalFactory',
  version: 'v0.8.19+commit.7dd6d404',
  licenceType: 'Apache-2.0',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'contracts/EternalFactory.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.19;\n\nimport "./utils/LibClone.sol";\n\n\ncontract EternalFactory {\n  function deployEternal(address _mainModule, bytes32 _salt) public payable returns (address _contract) {\n    return LibClone.cloneDeterministic(_mainModule, _salt);\n  }\n}\n'
      },
      'contracts/utils/LibClone.sol': {
        content:
          '// SPDX-License-Identifier: MIT\npragma solidity 0.8.19;\n\n/// @notice Minimal proxy library.\n/// @author Solady (https://github.com/vectorized/solady/blob/main/src/utils/LibClone.sol)\n/// @author Minimal proxy by 0age (https://github.com/0age)\n/// @author Clones with immutable args by wighawag, zefram.eth, Saw-mon & Natalie\n/// (https://github.com/Saw-mon-and-Natalie/clones-with-immutable-args)\n/// @author Minimal ERC1967 proxy by jtriley-eth (https://github.com/jtriley-eth/minimum-viable-proxy)\n///\n/// @dev Minimal proxy:\n/// Although the sw0nt pattern saves 5 gas over the erc-1167 pattern during runtime,\n/// it is not supported out-of-the-box on Etherscan. Hence, we choose to use the 0age pattern,\n/// which saves 4 gas over the erc-1167 pattern during runtime, and has the smallest bytecode.\n//\nlibrary LibClone {\n\n  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n  /*             CUSTOM ERRORS                                  */\n  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n  /// @dev Unable to deploy the clone.\n  error DeploymentFailed();\n\n  /// @dev The salt must start with either the zero address or `by`.\n  error SaltDoesNotStartWith();\n\n  /// @dev The ETH transfer has failed.\n  error ETHTransferFailed();\n\n  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n  /*          MINIMAL PROXY OPERATIONS                          */\n  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n  /// @dev Deploys a clone of `implementation`.\n  function clone(address implementation) internal returns (address instance) {\n    instance = clone(0, implementation);\n  }\n\n  /// @dev Deploys a clone of `implementation`.\n  /// Deposits `value` ETH during deployment.\n  function clone(uint256 value, address implementation) internal returns (address instance) {\n    /// @solidity memory-safe-assembly\n    assembly {\n    /**\n      * --------------------------------------------------------------------------+\n      * CREATION (9 bytes)                                                        |\n      * --------------------------------------------------------------------------|\n      * Opcode     | Mnemonic          | Stack     | Memory                       |\n      * --------------------------------------------------------------------------|\n      * 60 runSize | PUSH1 runSize     | r         |                              |\n      * 3d         | RETURNDATASIZE    | 0 r       |                              |\n      * 81         | DUP2              | r 0 r     |                              |\n      * 60 offset  | PUSH1 offset      | o r 0 r   |                              |\n      * 3d         | RETURNDATASIZE    | 0 o r 0 r |                              |\n      * 39         | CODECOPY          | 0 r       | [0..runSize): runtime code   |\n      * f3         | RETURN            |           | [0..runSize): runtime code   |\n      * --------------------------------------------------------------------------|\n      * RUNTIME (44 bytes)                                                        |\n      * --------------------------------------------------------------------------|\n      * Opcode  | Mnemonic       | Stack                  | Memory                |\n      * --------------------------------------------------------------------------|\n      *                                                                           |\n      * ::: keep some values in stack ::::::::::::::::::::::::::::::::::::::::::: |\n      * 3d      | RETURNDATASIZE | 0                      |                       |\n      * 3d      | RETURNDATASIZE | 0 0                    |                       |\n      * 3d      | RETURNDATASIZE | 0 0 0                  |                       |\n      * 3d      | RETURNDATASIZE | 0 0 0 0                |                       |\n      *                                                                           |\n      * ::: copy calldata to memory ::::::::::::::::::::::::::::::::::::::::::::: |\n      * 36      | CALLDATASIZE   | cds 0 0 0 0            |                       |\n      * 3d      | RETURNDATASIZE | 0 cds 0 0 0 0          |                       |\n      * 3d      | RETURNDATASIZE | 0 0 cds 0 0 0 0        |                       |\n      * 37      | CALLDATACOPY   | 0 0 0 0                | [0..cds): calldata    |\n      *                                                                           |\n      * ::: delegate call to the implementation contract :::::::::::::::::::::::: |\n      * 36      | CALLDATASIZE   | cds 0 0 0 0            | [0..cds): calldata    |\n      * 3d      | RETURNDATASIZE | 0 cds 0 0 0 0          | [0..cds): calldata    |\n      * 73 addr | PUSH20 addr    | addr 0 cds 0 0 0 0     | [0..cds): calldata    |\n      * 5a      | GAS            | gas addr 0 cds 0 0 0 0 | [0..cds): calldata    |\n      * f4      | DELEGATECALL   | success 0 0            | [0..cds): calldata    |\n      *                                                                           |\n      * ::: copy return data to memory :::::::::::::::::::::::::::::::::::::::::: |\n      * 3d      | RETURNDATASIZE | rds success 0 0        | [0..cds): calldata    |\n      * 3d      | RETURNDATASIZE | rds rds success 0 0    | [0..cds): calldata    |\n      * 93      | SWAP4          | 0 rds success 0 rds    | [0..cds): calldata    |\n      * 80      | DUP1           | 0 0 rds success 0 rds  | [0..cds): calldata    |\n      * 3e      | RETURNDATACOPY | success 0 rds          | [0..rds): returndata  |\n      *                                                                           |\n      * 60 0x2a | PUSH1 0x2a     | 0x2a success 0 rds     | [0..rds): returndata  |\n      * 57      | JUMPI          | 0 rds                  | [0..rds): returndata  |\n      *                                                                           |\n      * ::: revert :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: |\n      * fd      | REVERT         |                        | [0..rds): returndata  |\n      *                                                                           |\n      * ::: return :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: |\n      * 5b      | JUMPDEST       | 0 rds                  | [0..rds): returndata  |\n      * f3      | RETURN         |                        | [0..rds): returndata  |\n      * --------------------------------------------------------------------------+\n      */\n      mstore(0x21, 0x5af43d3d93803e602a57fd5bf3)\n      mstore(0x14, implementation)\n      mstore(0x00, 0x602c3d8160093d39f33d3d3d3d363d3d37363d73)\n      instance := create(value, 0x0c, 0x35)\n      if iszero(instance) {\n        mstore(0x00, 0x30116425) // `DeploymentFailed()`.\n        revert(0x1c, 0x04)\n      }\n      mstore(0x21, 0) // Restore the overwritten part of the free memory pointer.\n    }\n  }\n\n  /// @dev Deploys a deterministic clone of `implementation` with `salt`.\n  function cloneDeterministic(address implementation, bytes32 salt)\n    internal\n    returns (address instance)\n  {\n    instance = cloneDeterministic(0, implementation, salt);\n  }\n\n  /// @dev Deploys a deterministic clone of `implementation` with `salt`.\n  /// Deposits `value` ETH during deployment.\n  function cloneDeterministic(uint256 value, address implementation, bytes32 salt)\n    internal\n    returns (address instance)\n  {\n    /// @solidity memory-safe-assembly\n    assembly {\n      mstore(0x21, 0x5af43d3d93803e602a57fd5bf3)\n      mstore(0x14, implementation)\n      mstore(0x00, 0x602c3d8160093d39f33d3d3d3d363d3d37363d73)\n      instance := create2(value, 0x0c, 0x35, salt)\n      if iszero(instance) {\n        mstore(0x00, 0x30116425) // `DeploymentFailed()`.\n        revert(0x1c, 0x04)\n      }\n      mstore(0x21, 0) // Restore the overwritten part of the free memory pointer.\n    }\n  }\n\n  /// @dev Returns the initialization code of the clone of `implementation`.\n  function initCode(address implementation) internal pure returns (bytes memory result) {\n    /// @solidity memory-safe-assembly\n    assembly {\n      result := mload(0x40)\n      mstore(add(result, 0x40), 0x5af43d3d93803e602a57fd5bf30000000000000000000000)\n      mstore(add(result, 0x28), implementation)\n      mstore(add(result, 0x14), 0x602c3d8160093d39f33d3d3d3d363d3d37363d73)\n      mstore(result, 0x35) // Store the length.\n      mstore(0x40, add(result, 0x60)) // Allocate memory.\n    }\n  }\n\n  /// @dev Returns the initialization code hash of the clone of `implementation`.\n  /// Used for mining vanity addresses with create2crunch.\n  function initCodeHash(address implementation) internal pure returns (bytes32 hash) {\n    /// @solidity memory-safe-assembly\n    assembly {\n      mstore(0x21, 0x5af43d3d93803e602a57fd5bf3)\n      mstore(0x14, implementation)\n      mstore(0x00, 0x602c3d8160093d39f33d3d3d3d363d3d37363d73)\n      hash := keccak256(0x0c, 0x35)\n      mstore(0x21, 0) // Restore the overwritten part of the free memory pointer.\n    }\n  }\n\n  /// @dev Returns the address of the deterministic clone of `implementation`,\n  /// with `salt` by `deployer`.\n  /// Note: The returned result has dirty upper 96 bits. Please clean if used in assembly.\n  function predictDeterministicAddress(address implementation, bytes32 salt, address deployer)\n    internal\n    pure\n    returns (address predicted)\n  {\n    bytes32 hash = initCodeHash(implementation);\n    predicted = predictDeterministicAddress(hash, salt, deployer);\n  }\n\n  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/\n  /*            OTHER OPERATIONS                                */\n  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/\n\n  /// @dev Returns the address when a contract with initialization code hash,\n  /// `hash`, is deployed with `salt`, by `deployer`.\n  /// Note: The returned result has dirty upper 96 bits. Please clean if used in assembly.\n  function predictDeterministicAddress(bytes32 hash, bytes32 salt, address deployer)\n    internal\n    pure\n    returns (address predicted)\n  {\n    /// @solidity memory-safe-assembly\n    assembly {\n      // Compute and store the bytecode hash.\n      mstore8(0x00, 0xff) // Write the prefix.\n      mstore(0x35, hash)\n      mstore(0x01, shl(96, deployer))\n      mstore(0x15, salt)\n      predicted := keccak256(0x00, 0x55)\n      mstore(0x35, 0) // Restore the overwritten part of the free memory pointer.\n    }\n  }\n}\n'
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000000
      },
      outputSelection: {
        '*': {
          '*': ['evm.bytecode', 'evm.deployedBytecode', 'devdoc', 'userdoc', 'metadata', 'abi']
        }
      },
      evmVersion: 'paris',
      viaIR: false,
      libraries: {},
      remappings: [
        'ds-test/=lib/forge-std/lib/ds-test/src/',
        'forge-std/=lib/forge-std/src/',
        '@ensdomains/=node_modules/@ensdomains/',
        'eth-gas-reporter/=node_modules/eth-gas-reporter/',
        'foundry-huff/=lib/foundry-huff/src/',
        'hardhat/=node_modules/hardhat/',
        'solidity-stringutils/=lib/foundry-huff/lib/solidity-stringutils/',
        'stringutils/=lib/foundry-huff/lib/solidity-stringutils/'
      ]
    }
  }
}
