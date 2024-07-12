import type { EtherscanVerificationRequest } from '@0xsequence/solidity-deployer'
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
  constructor(signer: ethers.Signer) {
    super(
      abi,
      '0x60803461011a57601f6105ee38819003918201601f19168301916001600160401b0383118484101761011f5780849260209460405283398101031261011a57516001600160a01b03808216919082820361011a576000549160018060a01b0319923384821617600055604051923391167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a33b156100b2575060015416176001556040516104b890816101368239f35b62461bcd60e51b815260206004820152603360248201527f5570677261646561626c65426561636f6e3a20696d706c656d656e746174696f60448201527f6e206973206e6f74206120636f6e7472616374000000000000000000000000006064820152608490fd5b600080fd5b634e487b7160e01b600052604160045260246000fdfe6080604052600436101561001257600080fd5b6000803560e01c80633659cfe6146102ce5780635c60da1b1461027c578063715018a6146101e05780638da5cb5b1461018f5763f2fde38b1461005457600080fd5b3461018c5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261018c5760043573ffffffffffffffffffffffffffffffffffffffff808216809203610188576100ad610403565b8115610104578254827fffffffffffffffffffffffff00000000000000000000000000000000000000008216178455167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152fd5b8280fd5b80fd5b503461018c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261018c5773ffffffffffffffffffffffffffffffffffffffff6020915416604051908152f35b503461018c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261018c57610217610403565b8073ffffffffffffffffffffffffffffffffffffffff81547fffffffffffffffffffffffff000000000000000000000000000000000000000081168355167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b503461018c57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261018c57602073ffffffffffffffffffffffffffffffffffffffff60015416604051908152f35b503461018c5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261018c5760043573ffffffffffffffffffffffffffffffffffffffff81169081810361018857610328610403565b3b1561037f57807fffffffffffffffffffffffff000000000000000000000000000000000000000060015416176001557fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b8280a280f35b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603360248201527f5570677261646561626c65426561636f6e3a20696d706c656d656e746174696f60448201527f6e206973206e6f74206120636f6e7472616374000000000000000000000000006064820152fd5b73ffffffffffffffffffffffffffffffffffffffff60005416330361042457565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fdfea2646970667358221220dc365b16a2b6643d361d2ca2ef711f783ae4b4503a5f52631ea9ce48e88aa6da64736f6c63430008130033',
      signer
    )
  }
}

export const UPGRADEABLEBEACON_VERIFICATION: Omit<EtherscanVerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'node_modules/@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol:UpgradeableBeacon',
  version: 'v0.8.19+commit.7dd6d404',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'node_modules/@openzeppelin/contracts/access/Ownable.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.7.0) (access/Ownable.sol)\n\npragma solidity ^0.8.0;\n\nimport "../utils/Context.sol";\n\n/**\n * @dev Contract module which provides a basic access control mechanism, where\n * there is an account (an owner) that can be granted exclusive access to\n * specific functions.\n *\n * By default, the owner account will be the one that deploys the contract. This\n * can later be changed with {transferOwnership}.\n *\n * This module is used through inheritance. It will make available the modifier\n * `onlyOwner`, which can be applied to your functions to restrict their use to\n * the owner.\n */\nabstract contract Ownable is Context {\n    address private _owner;\n\n    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);\n\n    /**\n     * @dev Initializes the contract setting the deployer as the initial owner.\n     */\n    constructor() {\n        _transferOwnership(_msgSender());\n    }\n\n    /**\n     * @dev Throws if called by any account other than the owner.\n     */\n    modifier onlyOwner() {\n        _checkOwner();\n        _;\n    }\n\n    /**\n     * @dev Returns the address of the current owner.\n     */\n    function owner() public view virtual returns (address) {\n        return _owner;\n    }\n\n    /**\n     * @dev Throws if the sender is not the owner.\n     */\n    function _checkOwner() internal view virtual {\n        require(owner() == _msgSender(), "Ownable: caller is not the owner");\n    }\n\n    /**\n     * @dev Leaves the contract without owner. It will not be possible to call\n     * `onlyOwner` functions anymore. Can only be called by the current owner.\n     *\n     * NOTE: Renouncing ownership will leave the contract without an owner,\n     * thereby removing any functionality that is only available to the owner.\n     */\n    function renounceOwnership() public virtual onlyOwner {\n        _transferOwnership(address(0));\n    }\n\n    /**\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\n     * Can only be called by the current owner.\n     */\n    function transferOwnership(address newOwner) public virtual onlyOwner {\n        require(newOwner != address(0), "Ownable: new owner is the zero address");\n        _transferOwnership(newOwner);\n    }\n\n    /**\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\n     * Internal function without access restriction.\n     */\n    function _transferOwnership(address newOwner) internal virtual {\n        address oldOwner = _owner;\n        _owner = newOwner;\n        emit OwnershipTransferred(oldOwner, newOwner);\n    }\n}\n'
      },
      'node_modules/@openzeppelin/contracts/proxy/beacon/IBeacon.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts v4.4.1 (proxy/beacon/IBeacon.sol)\n\npragma solidity ^0.8.0;\n\n/**\n * @dev This is the interface that {BeaconProxy} expects of its beacon.\n */\ninterface IBeacon {\n    /**\n     * @dev Must return an address that can be used as a delegate call target.\n     *\n     * {BeaconProxy} will check that this address is a contract.\n     */\n    function implementation() external view returns (address);\n}\n'
      },
      'node_modules/@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts v4.4.1 (proxy/beacon/UpgradeableBeacon.sol)\n\npragma solidity ^0.8.0;\n\nimport "./IBeacon.sol";\nimport "../../access/Ownable.sol";\nimport "../../utils/Address.sol";\n\n/**\n * @dev This contract is used in conjunction with one or more instances of {BeaconProxy} to determine their\n * implementation contract, which is where they will delegate all function calls.\n *\n * An owner is able to change the implementation the beacon points to, thus upgrading the proxies that use this beacon.\n */\ncontract UpgradeableBeacon is IBeacon, Ownable {\n    address private _implementation;\n\n    /**\n     * @dev Emitted when the implementation returned by the beacon is changed.\n     */\n    event Upgraded(address indexed implementation);\n\n    /**\n     * @dev Sets the address of the initial implementation, and the deployer account as the owner who can upgrade the\n     * beacon.\n     */\n    constructor(address implementation_) {\n        _setImplementation(implementation_);\n    }\n\n    /**\n     * @dev Returns the current implementation address.\n     */\n    function implementation() public view virtual override returns (address) {\n        return _implementation;\n    }\n\n    /**\n     * @dev Upgrades the beacon to a new implementation.\n     *\n     * Emits an {Upgraded} event.\n     *\n     * Requirements:\n     *\n     * - msg.sender must be the owner of the contract.\n     * - `newImplementation` must be a contract.\n     */\n    function upgradeTo(address newImplementation) public virtual onlyOwner {\n        _setImplementation(newImplementation);\n        emit Upgraded(newImplementation);\n    }\n\n    /**\n     * @dev Sets the implementation contract address for this beacon\n     *\n     * Requirements:\n     *\n     * - `newImplementation` must be a contract.\n     */\n    function _setImplementation(address newImplementation) private {\n        require(Address.isContract(newImplementation), "UpgradeableBeacon: implementation is not a contract");\n        _implementation = newImplementation;\n    }\n}\n'
      },
      'node_modules/@openzeppelin/contracts/utils/Address.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.8.0) (utils/Address.sol)\n\npragma solidity ^0.8.1;\n\n/**\n * @dev Collection of functions related to the address type\n */\nlibrary Address {\n    /**\n     * @dev Returns true if `account` is a contract.\n     *\n     * [IMPORTANT]\n     * ====\n     * It is unsafe to assume that an address for which this function returns\n     * false is an externally-owned account (EOA) and not a contract.\n     *\n     * Among others, `isContract` will return false for the following\n     * types of addresses:\n     *\n     *  - an externally-owned account\n     *  - a contract in construction\n     *  - an address where a contract will be created\n     *  - an address where a contract lived, but was destroyed\n     * ====\n     *\n     * [IMPORTANT]\n     * ====\n     * You shouldn\'t rely on `isContract` to protect against flash loan attacks!\n     *\n     * Preventing calls from contracts is highly discouraged. It breaks composability, breaks support for smart wallets\n     * like Gnosis Safe, and does not provide security since it can be circumvented by calling from a contract\n     * constructor.\n     * ====\n     */\n    function isContract(address account) internal view returns (bool) {\n        // This method relies on extcodesize/address.code.length, which returns 0\n        // for contracts in construction, since the code is only stored at the end\n        // of the constructor execution.\n\n        return account.code.length > 0;\n    }\n\n    /**\n     * @dev Replacement for Solidity\'s `transfer`: sends `amount` wei to\n     * `recipient`, forwarding all available gas and reverting on errors.\n     *\n     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost\n     * of certain opcodes, possibly making contracts go over the 2300 gas limit\n     * imposed by `transfer`, making them unable to receive funds via\n     * `transfer`. {sendValue} removes this limitation.\n     *\n     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].\n     *\n     * IMPORTANT: because control is transferred to `recipient`, care must be\n     * taken to not create reentrancy vulnerabilities. Consider using\n     * {ReentrancyGuard} or the\n     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].\n     */\n    function sendValue(address payable recipient, uint256 amount) internal {\n        require(address(this).balance >= amount, "Address: insufficient balance");\n\n        (bool success, ) = recipient.call{value: amount}("");\n        require(success, "Address: unable to send value, recipient may have reverted");\n    }\n\n    /**\n     * @dev Performs a Solidity function call using a low level `call`. A\n     * plain `call` is an unsafe replacement for a function call: use this\n     * function instead.\n     *\n     * If `target` reverts with a revert reason, it is bubbled up by this\n     * function (like regular Solidity function calls).\n     *\n     * Returns the raw returned data. To convert to the expected return value,\n     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].\n     *\n     * Requirements:\n     *\n     * - `target` must be a contract.\n     * - calling `target` with `data` must not revert.\n     *\n     * _Available since v3.1._\n     */\n    function functionCall(address target, bytes memory data) internal returns (bytes memory) {\n        return functionCallWithValue(target, data, 0, "Address: low-level call failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with\n     * `errorMessage` as a fallback revert reason when `target` reverts.\n     *\n     * _Available since v3.1._\n     */\n    function functionCall(\n        address target,\n        bytes memory data,\n        string memory errorMessage\n    ) internal returns (bytes memory) {\n        return functionCallWithValue(target, data, 0, errorMessage);\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\n     * but also transferring `value` wei to `target`.\n     *\n     * Requirements:\n     *\n     * - the calling contract must have an ETH balance of at least `value`.\n     * - the called Solidity function must be `payable`.\n     *\n     * _Available since v3.1._\n     */\n    function functionCallWithValue(\n        address target,\n        bytes memory data,\n        uint256 value\n    ) internal returns (bytes memory) {\n        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but\n     * with `errorMessage` as a fallback revert reason when `target` reverts.\n     *\n     * _Available since v3.1._\n     */\n    function functionCallWithValue(\n        address target,\n        bytes memory data,\n        uint256 value,\n        string memory errorMessage\n    ) internal returns (bytes memory) {\n        require(address(this).balance >= value, "Address: insufficient balance for call");\n        (bool success, bytes memory returndata) = target.call{value: value}(data);\n        return verifyCallResultFromTarget(target, success, returndata, errorMessage);\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\n     * but performing a static call.\n     *\n     * _Available since v3.3._\n     */\n    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {\n        return functionStaticCall(target, data, "Address: low-level static call failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\n     * but performing a static call.\n     *\n     * _Available since v3.3._\n     */\n    function functionStaticCall(\n        address target,\n        bytes memory data,\n        string memory errorMessage\n    ) internal view returns (bytes memory) {\n        (bool success, bytes memory returndata) = target.staticcall(data);\n        return verifyCallResultFromTarget(target, success, returndata, errorMessage);\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\n     * but performing a delegate call.\n     *\n     * _Available since v3.4._\n     */\n    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {\n        return functionDelegateCall(target, data, "Address: low-level delegate call failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\n     * but performing a delegate call.\n     *\n     * _Available since v3.4._\n     */\n    function functionDelegateCall(\n        address target,\n        bytes memory data,\n        string memory errorMessage\n    ) internal returns (bytes memory) {\n        (bool success, bytes memory returndata) = target.delegatecall(data);\n        return verifyCallResultFromTarget(target, success, returndata, errorMessage);\n    }\n\n    /**\n     * @dev Tool to verify that a low level call to smart-contract was successful, and revert (either by bubbling\n     * the revert reason or using the provided one) in case of unsuccessful call or if target was not a contract.\n     *\n     * _Available since v4.8._\n     */\n    function verifyCallResultFromTarget(\n        address target,\n        bool success,\n        bytes memory returndata,\n        string memory errorMessage\n    ) internal view returns (bytes memory) {\n        if (success) {\n            if (returndata.length == 0) {\n                // only check isContract if the call was successful and the return data is empty\n                // otherwise we already know that it was a contract\n                require(isContract(target), "Address: call to non-contract");\n            }\n            return returndata;\n        } else {\n            _revert(returndata, errorMessage);\n        }\n    }\n\n    /**\n     * @dev Tool to verify that a low level call was successful, and revert if it wasn\'t, either by bubbling the\n     * revert reason or using the provided one.\n     *\n     * _Available since v4.3._\n     */\n    function verifyCallResult(\n        bool success,\n        bytes memory returndata,\n        string memory errorMessage\n    ) internal pure returns (bytes memory) {\n        if (success) {\n            return returndata;\n        } else {\n            _revert(returndata, errorMessage);\n        }\n    }\n\n    function _revert(bytes memory returndata, string memory errorMessage) private pure {\n        // Look for revert reason and bubble it up if present\n        if (returndata.length > 0) {\n            // The easiest way to bubble the revert reason is using memory via assembly\n            /// @solidity memory-safe-assembly\n            assembly {\n                let returndata_size := mload(returndata)\n                revert(add(32, returndata), returndata_size)\n            }\n        } else {\n            revert(errorMessage);\n        }\n    }\n}\n'
      },
      'node_modules/@openzeppelin/contracts/utils/Context.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)\n\npragma solidity ^0.8.0;\n\n/**\n * @dev Provides information about the current execution context, including the\n * sender of the transaction and its data. While these are generally available\n * via msg.sender and msg.data, they should not be accessed in such a direct\n * manner, since when dealing with meta-transactions the account sending and\n * paying for execution may not be the actual sender (as far as an application\n * is concerned).\n *\n * This contract is only required for intermediate, library-like contracts.\n */\nabstract contract Context {\n    function _msgSender() internal view virtual returns (address) {\n        return msg.sender;\n    }\n\n    function _msgData() internal view virtual returns (bytes calldata) {\n        return msg.data;\n    }\n}\n'
      }
    },
    settings: {
      evmVersion: 'paris',
      libraries: {},
      metadata: { bytecodeHash: 'ipfs' },
      optimizer: { enabled: true, runs: 20000 },
      remappings: [
        ':@0xsequence/contracts-library/=src/',
        ':@0xsequence/erc-1155/=node_modules/@0xsequence/erc-1155/',
        ':@0xsequence/erc20-meta-token/=node_modules/@0xsequence/erc20-meta-token/',
        ':@openzeppelin/=node_modules/@openzeppelin/',
        ':ds-test/=lib/forge-std/lib/ds-test/src/',
        ':erc721a-upgradeable/=node_modules/erc721a-upgradeable/',
        ':erc721a/=node_modules/erc721a/',
        ':forge-std/=lib/forge-std/src/',
        ':murky/=lib/murky/src/',
        ':openzeppelin-contracts/=lib/murky/lib/openzeppelin-contracts/'
      ],
      viaIR: true,
      outputSelection: {
        '*': {
          '*': ['evm.bytecode', 'evm.deployedBytecode', 'devdoc', 'userdoc', 'metadata', 'abi']
        }
      }
    }
  }
}
