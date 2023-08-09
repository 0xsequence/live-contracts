import type { EtherscanVerificationRequest } from '@0xsequence/solidity-deployer'
import { ContractFactory, ethers } from 'ethers'

export class SequenceUtilsV2 extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_index',
              type: 'uint256'
            },
            {
              internalType: 'bytes',
              name: '_result',
              type: 'bytes'
            }
          ],
          name: 'CallReverted',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_index',
              type: 'uint256'
            }
          ],
          name: 'DelegateCallNotAllowed',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_index',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: '_requested',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: '_available',
              type: 'uint256'
            }
          ],
          name: 'NotEnoughGas',
          type: 'error'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_addr',
              type: 'address'
            }
          ],
          name: 'callBalanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'callBlockNumber',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_i',
              type: 'uint256'
            }
          ],
          name: 'callBlockhash',
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
          inputs: [],
          name: 'callChainId',
          outputs: [
            {
              internalType: 'uint256',
              name: 'id',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_addr',
              type: 'address'
            }
          ],
          name: 'callCode',
          outputs: [
            {
              internalType: 'bytes',
              name: 'code',
              type: 'bytes'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_addr',
              type: 'address'
            }
          ],
          name: 'callCodeHash',
          outputs: [
            {
              internalType: 'bytes32',
              name: 'codeHash',
              type: 'bytes32'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_addr',
              type: 'address'
            }
          ],
          name: 'callCodeSize',
          outputs: [
            {
              internalType: 'uint256',
              name: 'size',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'callCoinbase',
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
          inputs: [],
          name: 'callDifficulty',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'callGasLeft',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'callGasLimit',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'callGasPrice',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'callOrigin',
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
          inputs: [],
          name: 'callPrevrandao',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'callTimestamp',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: 'bool',
                  name: 'delegateCall',
                  type: 'bool'
                },
                {
                  internalType: 'bool',
                  name: 'revertOnError',
                  type: 'bool'
                },
                {
                  internalType: 'uint256',
                  name: 'gasLimit',
                  type: 'uint256'
                },
                {
                  internalType: 'address',
                  name: 'target',
                  type: 'address'
                },
                {
                  internalType: 'uint256',
                  name: 'value',
                  type: 'uint256'
                },
                {
                  internalType: 'bytes',
                  name: 'data',
                  type: 'bytes'
                }
              ],
              internalType: 'struct IModuleCalls.Transaction[]',
              name: '_txs',
              type: 'tuple[]'
            }
          ],
          name: 'multiCall',
          outputs: [
            {
              internalType: 'bool[]',
              name: '_successes',
              type: 'bool[]'
            },
            {
              internalType: 'bytes[]',
              name: '_results',
              type: 'bytes[]'
            }
          ],
          stateMutability: 'payable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_wallet',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: '_nonce',
              type: 'uint256'
            }
          ],
          name: 'requireMinNonce',
          outputs: [],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_expiration',
              type: 'uint256'
            }
          ],
          name: 'requireNonExpired',
          outputs: [],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      '0x608060405234801561001057600080fd5b50610d7e806100206000396000f3fe6080604052600436106101295760003560e01c8063b7a72531116100a5578063d1db390711610074578063e90f13e711610059578063e90f13e7146102e6578063f209883a146102f9578063ffd7d7411461030c57600080fd5b8063d1db3907146102b4578063d5b5337f146102c757600080fd5b8063b7a7253114610222578063c272d5c314610255578063c39f2d5c14610268578063c66764e11461028757600080fd5b80637f29d538116100fc57806398f9fbc4116100e157806398f9fbc41461020f578063aeea5fb514610222578063b472f0a21461023557600080fd5b80637f29d538146101b9578063984395bc146101db57600080fd5b80630fdecfac1461012e57806343d9c9351461015057806348acd29f14610165578063543196eb1461019a575b600080fd5b34801561013a57600080fd5b50465b6040519081526020015b60405180910390f35b34801561015c57600080fd5b5061013d61032d565b34801561017157600080fd5b5061013d610180366004610855565b73ffffffffffffffffffffffffffffffffffffffff163190565b3480156101a657600080fd5b5061013d6101b5366004610855565b3f90565b3480156101c557600080fd5b506101d96101d4366004610877565b610335565b005b3480156101e757600080fd5b50325b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610147565b34801561021b57600080fd5b50416101ea565b34801561022e57600080fd5b504461013d565b34801561024157600080fd5b506101d9610250366004610890565b6103cc565b34801561026157600080fd5b503a61013d565b34801561027457600080fd5b5061013d610283366004610855565b3b90565b34801561029357600080fd5b506102a76102a2366004610855565b610513565b6040516101479190610928565b3480156102c057600080fd5b504361013d565b3480156102d357600080fd5b5061013d6102e2366004610877565b4090565b3480156102f257600080fd5b504561013d565b34801561030557600080fd5b504261013d565b61031f61031a3660046109f2565b610558565b604051610147929190610bac565b60005a905090565b8042106103c9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f526571756972655574696c7323726571756972654e6f6e457870697265643a2060448201527f455850495245440000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b50565b600080606083901c6bffffffffffffffffffffffff84166040517f8c3f556300000000000000000000000000000000000000000000000000000000815260048101839052919350915060009073ffffffffffffffffffffffffffffffffffffffff861690638c3f556390602401602060405180830381865afa158015610456573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061047a9190610c64565b90508181101561050c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f526571756972655574696c7323726571756972654d696e4e6f6e63653a204e4f60448201527f4e43455f42454c4f575f5245515549524544000000000000000000000000000060648201526084016103c0565b5050505050565b60408051603f833b9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682019092528181529080600060208401853c50919050565b606080825167ffffffffffffffff8111156105755761057561093b565b60405190808252806020026020018201604052801561059e578160200160208202803683370190505b509150825167ffffffffffffffff8111156105bb576105bb61093b565b6040519080825280602002602001820160405280156105ee57816020015b60608152602001906001900390816105d95790505b50905060005b835181101561082657600084828151811061061157610611610c7d565b6020026020010151905080600001511561065a576040517f230d1ccc000000000000000000000000000000000000000000000000000000008152600481018390526024016103c0565b80604001515a10156106b0578181604001515a6040517f2bb3e3ba0000000000000000000000000000000000000000000000000000000081526004810193909352602483019190915260448201526064016103c0565b806060015173ffffffffffffffffffffffffffffffffffffffff16816080015182604001516000146106e65782604001516106e8565b5a5b908360a001516040516106fb9190610cac565b600060405180830381858888f193505050503d8060008114610739576040519150601f19603f3d011682016040523d82523d6000602084013e61073e565b606091505b5085848151811061075157610751610c7d565b6020026020010185858151811061076a5761076a610c7d565b602002602001018290528215151515815250505083828151811061079057610790610c7d565b60200260200101511580156107bf57508482815181106107b2576107b2610c7d565b6020026020010151602001515b1561081357818383815181106107d7576107d7610c7d565b60200260200101516040517f3b4c7a5f0000000000000000000000000000000000000000000000000000000081526004016103c0929190610cc8565b508061081e81610ce9565b9150506105f4565b50915091565b803573ffffffffffffffffffffffffffffffffffffffff8116811461085057600080fd5b919050565b60006020828403121561086757600080fd5b6108708261082c565b9392505050565b60006020828403121561088957600080fd5b5035919050565b600080604083850312156108a357600080fd5b6108ac8361082c565b946020939093013593505050565b60005b838110156108d55781810151838201526020016108bd565b50506000910152565b600081518084526108f68160208601602086016108ba565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061087060208301846108de565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405160c0810167ffffffffffffffff8111828210171561098d5761098d61093b565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156109da576109da61093b565b604052919050565b8035801515811461085057600080fd5b60006020808385031215610a0557600080fd5b823567ffffffffffffffff80821115610a1d57600080fd5b818501915085601f830112610a3157600080fd5b813581811115610a4357610a4361093b565b8060051b610a52858201610993565b9182528381018501918581019089841115610a6c57600080fd5b86860192505b83831015610b9f57823585811115610a8a5760008081fd5b860160c07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0828d038101821315610ac15760008081fd5b610ac961096a565b610ad48b85016109e2565b81526040610ae38186016109e2565b8c830152606080860135828401526080610afe81880161082c565b8285015260a091508187013581850152508486013594508a851115610b235760008081fd5b84860195508f603f870112610b3a57600094508485fd5b8c86013594508a851115610b5057610b5061093b565b610b608d85601f88011601610993565b93508484528f82868801011115610b775760008081fd5b848287018e86013760009484018d019490945250918201528352509186019190860190610a72565b9998505050505050505050565b604080825283519082018190526000906020906060840190828701845b82811015610be7578151151584529284019290840190600101610bc9565b50505083810382850152845180825282820190600581901b8301840187850160005b83811015610c55577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0868403018552610c438383516108de565b94870194925090860190600101610c09565b50909998505050505050505050565b600060208284031215610c7657600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60008251610cbe8184602087016108ba565b9190910192915050565b828152604060208201526000610ce160408301846108de565b949350505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610d41577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b506001019056fea264697066735822122049ef042991a3ec1b25eb7d0bd2d2faaceec6986d39c10052cc3d76bbe0bb4ad664736f6c63430008120033',
      signer
    )
  }
}

export const SEQUENCE_UTILS_V2_VERIFICATION: Omit<EtherscanVerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'contracts/modules/utils/SequenceUtils.sol:SequenceUtils',
  version: 'v0.8.18+commit.87f61d96',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'contracts/modules/commons/interfaces/IModuleCalls.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\ninterface IModuleCalls {\n  // Events\n  event TxFailed(bytes32 indexed _tx, uint256 _index, bytes _reason);\n  event TxExecuted(bytes32 indexed _tx, uint256 _index);\n\n  // Errors\n  error NotEnoughGas(uint256 _index, uint256 _requested, uint256 _available);\n  error InvalidSignature(bytes32 _hash, bytes _signature);\n\n  // Transaction structure\n  struct Transaction {\n    bool delegateCall;   // Performs delegatecall\n    bool revertOnError;  // Reverts transaction bundle if tx fails\n    uint256 gasLimit;    // Maximum gas to be forwarded\n    address target;      // Address of the contract to call\n    uint256 value;       // Amount of ETH to pass with the call\n    bytes data;          // calldata to pass\n  }\n\n  /**\n   * @notice Allow wallet owner to execute an action\n   * @param _txs        Transactions to process\n   * @param _nonce      Signature nonce (may contain an encoded space)\n   * @param _signature  Encoded signature\n   */\n  function execute(\n    Transaction[] calldata _txs,\n    uint256 _nonce,\n    bytes calldata _signature\n  ) external;\n\n  /**\n   * @notice Allow wallet to execute an action\n   *   without signing the message\n   * @param _txs  Transactions to execute\n   */\n  function selfExecute(\n    Transaction[] calldata _txs\n  ) external;\n}\n'
      },
      'contracts/modules/commons/ModuleNonce.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./ModuleStorage.sol";\n\nimport "./submodules/nonce/SubModuleNonce.sol";\n\n\ncontract ModuleNonce {\n  // Events\n  event NonceChange(uint256 _space, uint256 _newNonce);\n\n  // Errors\n  error BadNonce(uint256 _space, uint256 _provided, uint256 _current);\n\n  //                       NONCE_KEY = keccak256("org.arcadeum.module.calls.nonce");\n  bytes32 private constant NONCE_KEY = bytes32(0x8d0bf1fd623d628c741362c1289948e57b3e2905218c676d3e69abee36d6ae2e);\n\n  /**\n   * @notice Returns the next nonce of the default nonce space\n   * @dev The default nonce space is 0x00\n   * @return The next nonce\n   */\n  function nonce() external virtual view returns (uint256) {\n    return readNonce(0);\n  }\n\n  /**\n   * @notice Returns the next nonce of the given nonce space\n   * @param _space Nonce space, each space keeps an independent nonce count\n   * @return The next nonce\n   */\n  function readNonce(uint256 _space) public virtual view returns (uint256) {\n    return uint256(ModuleStorage.readBytes32Map(NONCE_KEY, bytes32(_space)));\n  }\n\n  /**\n   * @notice Changes the next nonce of the given nonce space\n   * @param _space Nonce space, each space keeps an independent nonce count\n   * @param _nonce Nonce to write on the space\n   */\n  function _writeNonce(uint256 _space, uint256 _nonce) internal {\n    ModuleStorage.writeBytes32Map(NONCE_KEY, bytes32(_space), bytes32(_nonce));\n  }\n\n  /**\n   * @notice Verify if a nonce is valid\n   * @param _rawNonce Nonce to validate (may contain an encoded space)\n   */\n  function _validateNonce(uint256 _rawNonce) internal virtual {\n    // Retrieve current nonce for this wallet\n    (uint256 space, uint256 providedNonce) = SubModuleNonce.decodeNonce(_rawNonce);\n\n    uint256 currentNonce = readNonce(space);\n    if (currentNonce != providedNonce) {\n      revert BadNonce(space, providedNonce, currentNonce);\n    }\n\n    unchecked {\n      uint256 newNonce = providedNonce + 1;\n\n      _writeNonce(space, newNonce);\n      emit NonceChange(space, newNonce);\n      return;\n    }\n  }\n}\n'
      },
      'contracts/modules/commons/ModuleStorage.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\nlibrary ModuleStorage {\n  function writeBytes32(bytes32 _key, bytes32 _val) internal {\n    assembly { sstore(_key, _val) }\n  }\n\n  function readBytes32(bytes32 _key) internal view returns (bytes32 val) {\n    assembly { val := sload(_key) }\n  }\n\n  function writeBytes32Map(bytes32 _key, bytes32 _subKey, bytes32 _val) internal {\n    bytes32 key = keccak256(abi.encode(_key, _subKey));\n    assembly { sstore(key, _val) }\n  }\n\n  function readBytes32Map(bytes32 _key, bytes32 _subKey) internal view returns (bytes32 val) {\n    bytes32 key = keccak256(abi.encode(_key, _subKey));\n    assembly { val := sload(key) }\n  }\n}\n'
      },
      'contracts/modules/commons/submodules/nonce/SubModuleNonce.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\n\nlibrary SubModuleNonce {\n  // Nonce schema\n  //\n  // - space[160]:nonce[96]\n  //\n  uint256 internal constant NONCE_BITS = 96;\n  bytes32 internal constant NONCE_MASK = bytes32(uint256(type(uint96).max));\n\n  /**\n   * @notice Decodes a raw nonce\n   * @dev Schema: space[160]:type[96]\n   * @param _rawNonce Nonce to be decoded\n   * @return _space The nonce space of the raw nonce\n   * @return _nonce The nonce of the raw nonce\n   */\n  function decodeNonce(uint256 _rawNonce) internal pure returns (\n    uint256 _space,\n    uint256 _nonce\n  ) {\n    unchecked {\n      // Decode nonce\n      _space = _rawNonce >> NONCE_BITS;\n      _nonce = uint256(bytes32(_rawNonce) & NONCE_MASK);\n    }\n  }\n}\n'
      },
      'contracts/modules/utils/MultiCallUtils.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "../commons/interfaces/IModuleCalls.sol";\n\n\ncontract MultiCallUtils {\n  // Errors\n  error DelegateCallNotAllowed(uint256 _index);\n  error CallReverted(uint256 _index, bytes _result);\n\n  function multiCall(\n    IModuleCalls.Transaction[] memory _txs\n  ) public payable returns (\n    bool[] memory _successes,\n    bytes[] memory _results\n  ) {\n    _successes = new bool[](_txs.length);\n    _results = new bytes[](_txs.length);\n\n    for (uint256 i = 0; i < _txs.length; i++) {\n      IModuleCalls.Transaction memory transaction = _txs[i];\n\n      if (transaction.delegateCall) revert DelegateCallNotAllowed(i);\n      if (gasleft() < transaction.gasLimit) revert IModuleCalls.NotEnoughGas(i, transaction.gasLimit, gasleft());\n\n      // solhint-disable\n      (_successes[i], _results[i]) = transaction.target.call{\n        value: transaction.value,\n        gas: transaction.gasLimit == 0 ? gasleft() : transaction.gasLimit\n      }(transaction.data);\n      // solhint-enable\n\n      if (!_successes[i] && _txs[i].revertOnError) revert CallReverted(i, _results[i]);\n    }\n  }\n\n  // ///\n  // Globals\n  // ///\n\n  function callBlockhash(uint256 _i) external view returns (bytes32) {\n    return blockhash(_i);\n  }\n\n  function callCoinbase() external view returns (address) {\n    return block.coinbase;\n  }\n\n  function callDifficulty() external view returns (uint256) {\n    return block.prevrandao; // old block.difficulty\n  }\n\n  function callPrevrandao() external view returns (uint256) {\n    return block.prevrandao;\n  }\n\n  function callGasLimit() external view returns (uint256) {\n    return block.gaslimit;\n  }\n\n  function callBlockNumber() external view returns (uint256) {\n    return block.number;\n  }\n\n  function callTimestamp() external view returns (uint256) {\n    return block.timestamp;\n  }\n\n  function callGasLeft() external view returns (uint256) {\n    return gasleft();\n  }\n\n  function callGasPrice() external view returns (uint256) {\n    return tx.gasprice;\n  }\n\n  function callOrigin() external view returns (address) {\n    return tx.origin;\n  }\n\n  function callBalanceOf(address _addr) external view returns (uint256) {\n    return _addr.balance;\n  }\n\n  function callCodeSize(address _addr) external view returns (uint256 size) {\n    assembly { size := extcodesize(_addr) }\n  }\n\n  function callCode(address _addr) external view returns (bytes memory code) {\n    assembly {\n      let size := extcodesize(_addr)\n      code := mload(0x40)\n      mstore(0x40, add(code, and(add(add(size, 0x20), 0x1f), not(0x1f))))\n      mstore(code, size)\n      extcodecopy(_addr, add(code, 0x20), 0, size)\n    }\n  }\n\n  function callCodeHash(address _addr) external view returns (bytes32 codeHash) {\n    assembly { codeHash := extcodehash(_addr) }\n  }\n\n  function callChainId() external view returns (uint256 id) {\n    assembly { id := chainid() }\n  }\n}\n'
      },
      'contracts/modules/utils/RequireUtils.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "../commons/ModuleNonce.sol";\nimport "../commons/submodules/nonce/SubModuleNonce.sol";\n\n\ncontract RequireUtils {\n  /**\n   * @notice Validates that a given expiration hasn\'t expired\n   * @dev Used as an optional transaction on a Sequence batch, to create expirable transactions.\n   *\n   * @param _expiration  Expiration to check\n   */\n  function requireNonExpired(uint256 _expiration) external view {\n    require(block.timestamp < _expiration, "RequireUtils#requireNonExpired: EXPIRED");\n  }\n\n  /**\n   * @notice Validates that a given wallet has reached a given nonce\n   * @dev Used as an optional transaction on a Sequence batch, to define transaction execution order\n   *\n   * @param _wallet Sequence wallet\n   * @param _nonce  Required nonce\n   */\n  function requireMinNonce(address _wallet, uint256 _nonce) external view {\n    (uint256 space, uint256 nonce) = SubModuleNonce.decodeNonce(_nonce);\n    uint256 currentNonce = ModuleNonce(_wallet).readNonce(space);\n    require(currentNonce >= nonce, "RequireUtils#requireMinNonce: NONCE_BELOW_REQUIRED");\n  }\n}\n'
      },
      'contracts/modules/utils/SequenceUtils.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.18;\n\nimport "./MultiCallUtils.sol";\nimport "./RequireUtils.sol";\n\n\ncontract SequenceUtils is\n  MultiCallUtils,\n  RequireUtils\n{ }\n'
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 500000
      },
      outputSelection: {
        '*': {
          '*': ['evm.bytecode', 'evm.deployedBytecode', 'devdoc', 'userdoc', 'metadata', 'abi']
        }
      },
      libraries: {}
    }
  }
}
