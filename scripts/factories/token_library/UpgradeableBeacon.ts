import { ContractFactory, type ethers } from 'ethers'
import type { VerificationRequest } from 'scripts/types'

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
    name: 'owner',
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
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
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
      '60806040523461002f576100196100146100f4565b610115565b610021610034565b610709610370823961070990f35b61003a565b60405190565b5f80fd5b601f801991011690565b634e487b7160e01b5f52604160045260245ffd5b906100669061003e565b810190811060018060401b0382111761007e57604052565b610048565b9061009661008f610034565b928361005c565b565b5f80fd5b60018060a01b031690565b6100b09061009c565b90565b6100bc816100a7565b036100c357565b5f80fd5b905051906100d4826100b3565b565b906020828203126100ef576100ec915f016100c7565b90565b610098565b610112610a798038038061010781610083565b9283398101906100d6565b90565b61012690610121610128565b610265565b565b610138610133610287565b6102ca565b565b60209181520190565b60207f6e206973206e6f74206120636f6e747261637400000000000000000000000000917f5570677261646561626c65426561636f6e3a20696d706c656d656e746174696f5f8201520152565b61019d603360409261013a565b6101a681610143565b0190565b6101bf9060208101905f818303910152610190565b90565b156101c957565b6101d1610034565b62461bcd60e51b8152806101e7600482016101aa565b0390fd5b5f1b90565b9061020160018060a01b03916101eb565b9181191691161790565b90565b61022261021d6102279261009c565b61020b565b61009c565b90565b6102339061020e565b90565b61023f9061022a565b90565b90565b9061025a61025561026192610236565b610242565b82546101f0565b9055565b6102819061027a6102758261034f565b6101c2565b6001610245565b565b5f90565b61028f610283565b503390565b5f1c90565b60018060a01b031690565b6102b06102b591610294565b610299565b90565b6102c290546102a4565b90565b5f0190565b6102d35f6102b8565b6102dd825f610245565b9061031161030b7f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e093610236565b91610236565b9161031a610034565b80610324816102c5565b0390a3565b5f90565b90565b90565b61034761034261034c92610330565b61020b565b61032d565b90565b610357610329565b503b61036b6103655f610333565b9161032d565b119056fe60806040526004361015610013575b610211565b61001d5f3561006c565b80633659cfe6146100675780635c60da1b14610062578063715018a61461005d5780638da5cb5b146100585763f2fde38b0361000e576101de565b6101a9565b610176565b610141565b6100dd565b60e01c90565b60405190565b5f80fd5b5f80fd5b60018060a01b031690565b61009490610080565b90565b6100a08161008b565b036100a757565b5f80fd5b905035906100b882610097565b565b906020828203126100d3576100d0915f016100ab565b90565b61007c565b5f0190565b3461010b576100f56100f03660046100ba565b6102aa565b6100fd610072565b80610107816100d8565b0390f35b610078565b5f91031261011a57565b61007c565b6101289061008b565b9052565b919061013f905f6020850194019061011f565b565b3461017157610151366004610110565b61016d61015c6102ea565b610164610072565b9182918261012c565b0390f35b610078565b346101a457610186366004610110565b61018e610350565b610196610072565b806101a0816100d8565b0390f35b610078565b346101d9576101b9366004610110565b6101d56101c461035a565b6101cc610072565b9182918261012c565b0390f35b610078565b3461020c576101f66101f13660046100ba565b610463565b6101fe610072565b80610208816100d8565b0390f35b610078565b5f80fd5b610226906102216104ef565b61025f565b565b90565b61023f61023a61024492610080565b610228565b610080565b90565b6102509061022b565b90565b61025c90610247565b90565b61026881610606565b6102927fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b91610253565b9061029b610072565b806102a5816100d8565b0390a2565b6102b390610215565b565b5f90565b5f1c90565b60018060a01b031690565b6102d56102da916102b9565b6102be565b90565b6102e790546102c9565b90565b6102f26102b5565b506102fd60016102dd565b90565b6103086104ef565b61031061033d565b565b90565b61032961032461032e92610312565b610228565b610080565b90565b61033a90610315565b90565b61034e6103495f610331565b610624565b565b610358610300565b565b6103626102b5565b5061036c5f6102dd565b90565b6103809061037b6104ef565b610433565b565b60209181520190565b60207f6464726573730000000000000000000000000000000000000000000000000000917f4f776e61626c653a206e6577206f776e657220697320746865207a65726f20615f8201520152565b6103e56026604092610382565b6103ee8161038b565b0190565b6104079060208101905f8183039101526103d8565b90565b1561041157565b610419610072565b62461bcd60e51b81528061042f600482016103f2565b0390fd5b6104619061045c8161045561044f61044a5f610331565b61008b565b9161008b565b141561040a565b610624565b565b61046c9061036f565b565b5f7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572910152565b6104a160208092610382565b6104aa8161046e565b0190565b6104c39060208101905f818303910152610495565b90565b156104cd57565b6104d5610072565b62461bcd60e51b8152806104eb600482016104ae565b0390fd5b6105196104fa61035a565b61051361050d610508610683565b61008b565b9161008b565b146104c6565b565b60207f6e206973206e6f74206120636f6e747261637400000000000000000000000000917f5570677261646561626c65426561636f6e3a20696d706c656d656e746174696f5f8201520152565b6105756033604092610382565b61057e8161051b565b0190565b6105979060208101905f818303910152610568565b90565b156105a157565b6105a9610072565b62461bcd60e51b8152806105bf60048201610582565b0390fd5b5f1b90565b906105d960018060a01b03916105c3565b9181191691161790565b90565b906105fb6105f661060292610253565b6105e3565b82546105c8565b9055565b6106229061061b610616826106b3565b61059a565b60016105e6565b565b61062d5f6102dd565b610637825f6105e6565b9061066b6106657f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e093610253565b91610253565b91610674610072565b8061067e816100d8565b0390a3565b61068b6102b5565b503390565b5f90565b90565b6106ab6106a66106b092610312565b610228565b610694565b90565b6106bb610690565b503b6106cf6106c95f610697565b91610694565b119056fea2646970667358221220fe4a5eb99a708c9299f6d8db20171a05afd9f65b1bb37523137ed0d30a2c2b6964736f6c634300081b0033',
      signer
    )
  }
}

export const UPGRADEABLEBEACON_VERIFICATION: Omit<VerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'lib/openzeppelin-contracts/contracts/proxy/beacon/UpgradeableBeacon.sol:UpgradeableBeacon',
  version: 'v0.8.27+commit.40a35a09',
  licenceType: 'Apache-2.0',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'lib/openzeppelin-contracts/contracts/proxy/beacon/UpgradeableBeacon.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts v4.4.1 (proxy/beacon/UpgradeableBeacon.sol)\n\npragma solidity ^0.8.0;\n\nimport "./IBeacon.sol";\nimport "../../access/Ownable.sol";\nimport "../../utils/Address.sol";\n\n/**\n * @dev This contract is used in conjunction with one or more instances of {BeaconProxy} to determine their\n * implementation contract, which is where they will delegate all function calls.\n *\n * An owner is able to change the implementation the beacon points to, thus upgrading the proxies that use this beacon.\n */\ncontract UpgradeableBeacon is IBeacon, Ownable {\n    address private _implementation;\n\n    /**\n     * @dev Emitted when the implementation returned by the beacon is changed.\n     */\n    event Upgraded(address indexed implementation);\n\n    /**\n     * @dev Sets the address of the initial implementation, and the deployer account as the owner who can upgrade the\n     * beacon.\n     */\n    constructor(address implementation_) {\n        _setImplementation(implementation_);\n    }\n\n    /**\n     * @dev Returns the current implementation address.\n     */\n    function implementation() public view virtual override returns (address) {\n        return _implementation;\n    }\n\n    /**\n     * @dev Upgrades the beacon to a new implementation.\n     *\n     * Emits an {Upgraded} event.\n     *\n     * Requirements:\n     *\n     * - msg.sender must be the owner of the contract.\n     * - `newImplementation` must be a contract.\n     */\n    function upgradeTo(address newImplementation) public virtual onlyOwner {\n        _setImplementation(newImplementation);\n        emit Upgraded(newImplementation);\n    }\n\n    /**\n     * @dev Sets the implementation contract address for this beacon\n     *\n     * Requirements:\n     *\n     * - `newImplementation` must be a contract.\n     */\n    function _setImplementation(address newImplementation) private {\n        require(Address.isContract(newImplementation), "UpgradeableBeacon: implementation is not a contract");\n        _implementation = newImplementation;\n    }\n}\n'
      },
      'lib/openzeppelin-contracts/contracts/proxy/beacon/IBeacon.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts v4.4.1 (proxy/beacon/IBeacon.sol)\n\npragma solidity ^0.8.0;\n\n/**\n * @dev This is the interface that {BeaconProxy} expects of its beacon.\n */\ninterface IBeacon {\n    /**\n     * @dev Must return an address that can be used as a delegate call target.\n     *\n     * {BeaconProxy} will check that this address is a contract.\n     */\n    function implementation() external view returns (address);\n}\n'
      },
      'lib/openzeppelin-contracts/contracts/access/Ownable.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.9.0) (access/Ownable.sol)\n\npragma solidity ^0.8.0;\n\nimport "../utils/Context.sol";\n\n/**\n * @dev Contract module which provides a basic access control mechanism, where\n * there is an account (an owner) that can be granted exclusive access to\n * specific functions.\n *\n * By default, the owner account will be the one that deploys the contract. This\n * can later be changed with {transferOwnership}.\n *\n * This module is used through inheritance. It will make available the modifier\n * `onlyOwner`, which can be applied to your functions to restrict their use to\n * the owner.\n */\nabstract contract Ownable is Context {\n    address private _owner;\n\n    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);\n\n    /**\n     * @dev Initializes the contract setting the deployer as the initial owner.\n     */\n    constructor() {\n        _transferOwnership(_msgSender());\n    }\n\n    /**\n     * @dev Throws if called by any account other than the owner.\n     */\n    modifier onlyOwner() {\n        _checkOwner();\n        _;\n    }\n\n    /**\n     * @dev Returns the address of the current owner.\n     */\n    function owner() public view virtual returns (address) {\n        return _owner;\n    }\n\n    /**\n     * @dev Throws if the sender is not the owner.\n     */\n    function _checkOwner() internal view virtual {\n        require(owner() == _msgSender(), "Ownable: caller is not the owner");\n    }\n\n    /**\n     * @dev Leaves the contract without owner. It will not be possible to call\n     * `onlyOwner` functions. Can only be called by the current owner.\n     *\n     * NOTE: Renouncing ownership will leave the contract without an owner,\n     * thereby disabling any functionality that is only available to the owner.\n     */\n    function renounceOwnership() public virtual onlyOwner {\n        _transferOwnership(address(0));\n    }\n\n    /**\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\n     * Can only be called by the current owner.\n     */\n    function transferOwnership(address newOwner) public virtual onlyOwner {\n        require(newOwner != address(0), "Ownable: new owner is the zero address");\n        _transferOwnership(newOwner);\n    }\n\n    /**\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\n     * Internal function without access restriction.\n     */\n    function _transferOwnership(address newOwner) internal virtual {\n        address oldOwner = _owner;\n        _owner = newOwner;\n        emit OwnershipTransferred(oldOwner, newOwner);\n    }\n}\n'
      },
      'lib/openzeppelin-contracts/contracts/utils/Address.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.9.0) (utils/Address.sol)\n\npragma solidity ^0.8.1;\n\n/**\n * @dev Collection of functions related to the address type\n */\nlibrary Address {\n    /**\n     * @dev Returns true if `account` is a contract.\n     *\n     * [IMPORTANT]\n     * ====\n     * It is unsafe to assume that an address for which this function returns\n     * false is an externally-owned account (EOA) and not a contract.\n     *\n     * Among others, `isContract` will return false for the following\n     * types of addresses:\n     *\n     *  - an externally-owned account\n     *  - a contract in construction\n     *  - an address where a contract will be created\n     *  - an address where a contract lived, but was destroyed\n     *\n     * Furthermore, `isContract` will also return true if the target contract within\n     * the same transaction is already scheduled for destruction by `SELFDESTRUCT`,\n     * which only has an effect at the end of a transaction.\n     * ====\n     *\n     * [IMPORTANT]\n     * ====\n     * You shouldn\'t rely on `isContract` to protect against flash loan attacks!\n     *\n     * Preventing calls from contracts is highly discouraged. It breaks composability, breaks support for smart wallets\n     * like Gnosis Safe, and does not provide security since it can be circumvented by calling from a contract\n     * constructor.\n     * ====\n     */\n    function isContract(address account) internal view returns (bool) {\n        // This method relies on extcodesize/address.code.length, which returns 0\n        // for contracts in construction, since the code is only stored at the end\n        // of the constructor execution.\n\n        return account.code.length > 0;\n    }\n\n    /**\n     * @dev Replacement for Solidity\'s `transfer`: sends `amount` wei to\n     * `recipient`, forwarding all available gas and reverting on errors.\n     *\n     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost\n     * of certain opcodes, possibly making contracts go over the 2300 gas limit\n     * imposed by `transfer`, making them unable to receive funds via\n     * `transfer`. {sendValue} removes this limitation.\n     *\n     * https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/[Learn more].\n     *\n     * IMPORTANT: because control is transferred to `recipient`, care must be\n     * taken to not create reentrancy vulnerabilities. Consider using\n     * {ReentrancyGuard} or the\n     * https://solidity.readthedocs.io/en/v0.8.0/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].\n     */\n    function sendValue(address payable recipient, uint256 amount) internal {\n        require(address(this).balance >= amount, "Address: insufficient balance");\n\n        (bool success, ) = recipient.call{value: amount}("");\n        require(success, "Address: unable to send value, recipient may have reverted");\n    }\n\n    /**\n     * @dev Performs a Solidity function call using a low level `call`. A\n     * plain `call` is an unsafe replacement for a function call: use this\n     * function instead.\n     *\n     * If `target` reverts with a revert reason, it is bubbled up by this\n     * function (like regular Solidity function calls).\n     *\n     * Returns the raw returned data. To convert to the expected return value,\n     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].\n     *\n     * Requirements:\n     *\n     * - `target` must be a contract.\n     * - calling `target` with `data` must not revert.\n     *\n     * _Available since v3.1._\n     */\n    function functionCall(address target, bytes memory data) internal returns (bytes memory) {\n        return functionCallWithValue(target, data, 0, "Address: low-level call failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with\n     * `errorMessage` as a fallback revert reason when `target` reverts.\n     *\n     * _Available since v3.1._\n     */\n    function functionCall(\n        address target,\n        bytes memory data,\n        string memory errorMessage\n    ) internal returns (bytes memory) {\n        return functionCallWithValue(target, data, 0, errorMessage);\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\n     * but also transferring `value` wei to `target`.\n     *\n     * Requirements:\n     *\n     * - the calling contract must have an ETH balance of at least `value`.\n     * - the called Solidity function must be `payable`.\n     *\n     * _Available since v3.1._\n     */\n    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {\n        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but\n     * with `errorMessage` as a fallback revert reason when `target` reverts.\n     *\n     * _Available since v3.1._\n     */\n    function functionCallWithValue(\n        address target,\n        bytes memory data,\n        uint256 value,\n        string memory errorMessage\n    ) internal returns (bytes memory) {\n        require(address(this).balance >= value, "Address: insufficient balance for call");\n        (bool success, bytes memory returndata) = target.call{value: value}(data);\n        return verifyCallResultFromTarget(target, success, returndata, errorMessage);\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\n     * but performing a static call.\n     *\n     * _Available since v3.3._\n     */\n    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {\n        return functionStaticCall(target, data, "Address: low-level static call failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\n     * but performing a static call.\n     *\n     * _Available since v3.3._\n     */\n    function functionStaticCall(\n        address target,\n        bytes memory data,\n        string memory errorMessage\n    ) internal view returns (bytes memory) {\n        (bool success, bytes memory returndata) = target.staticcall(data);\n        return verifyCallResultFromTarget(target, success, returndata, errorMessage);\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\n     * but performing a delegate call.\n     *\n     * _Available since v3.4._\n     */\n    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {\n        return functionDelegateCall(target, data, "Address: low-level delegate call failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\n     * but performing a delegate call.\n     *\n     * _Available since v3.4._\n     */\n    function functionDelegateCall(\n        address target,\n        bytes memory data,\n        string memory errorMessage\n    ) internal returns (bytes memory) {\n        (bool success, bytes memory returndata) = target.delegatecall(data);\n        return verifyCallResultFromTarget(target, success, returndata, errorMessage);\n    }\n\n    /**\n     * @dev Tool to verify that a low level call to smart-contract was successful, and revert (either by bubbling\n     * the revert reason or using the provided one) in case of unsuccessful call or if target was not a contract.\n     *\n     * _Available since v4.8._\n     */\n    function verifyCallResultFromTarget(\n        address target,\n        bool success,\n        bytes memory returndata,\n        string memory errorMessage\n    ) internal view returns (bytes memory) {\n        if (success) {\n            if (returndata.length == 0) {\n                // only check isContract if the call was successful and the return data is empty\n                // otherwise we already know that it was a contract\n                require(isContract(target), "Address: call to non-contract");\n            }\n            return returndata;\n        } else {\n            _revert(returndata, errorMessage);\n        }\n    }\n\n    /**\n     * @dev Tool to verify that a low level call was successful, and revert if it wasn\'t, either by bubbling the\n     * revert reason or using the provided one.\n     *\n     * _Available since v4.3._\n     */\n    function verifyCallResult(\n        bool success,\n        bytes memory returndata,\n        string memory errorMessage\n    ) internal pure returns (bytes memory) {\n        if (success) {\n            return returndata;\n        } else {\n            _revert(returndata, errorMessage);\n        }\n    }\n\n    function _revert(bytes memory returndata, string memory errorMessage) private pure {\n        // Look for revert reason and bubble it up if present\n        if (returndata.length > 0) {\n            // The easiest way to bubble the revert reason is using memory via assembly\n            /// @solidity memory-safe-assembly\n            assembly {\n                let returndata_size := mload(returndata)\n                revert(add(32, returndata), returndata_size)\n            }\n        } else {\n            revert(errorMessage);\n        }\n    }\n}\n'
      },
      'lib/openzeppelin-contracts/contracts/utils/Context.sol': {
        content:
          '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)\n\npragma solidity ^0.8.0;\n\n/**\n * @dev Provides information about the current execution context, including the\n * sender of the transaction and its data. While these are generally available\n * via msg.sender and msg.data, they should not be accessed in such a direct\n * manner, since when dealing with meta-transactions the account sending and\n * paying for execution may not be the actual sender (as far as an application\n * is concerned).\n *\n * This contract is only required for intermediate, library-like contracts.\n */\nabstract contract Context {\n    function _msgSender() internal view virtual returns (address) {\n        return msg.sender;\n    }\n\n    function _msgData() internal view virtual returns (bytes calldata) {\n        return msg.data;\n    }\n}\n'
      }
    },
    settings: {
      remappings: [
        '@openzeppelin/contracts/=lib/murky/lib/openzeppelin-contracts/contracts/',
        'ds-test/=lib/openzeppelin-contracts-upgradeable/lib/forge-std/lib/ds-test/src/',
        'erc2470-libs/=lib/erc2470-libs/',
        'erc4626-tests/=lib/openzeppelin-contracts-upgradeable/lib/erc4626-tests/',
        'erc721a/=lib/erc721a/contracts/',
        'forge-std/=lib/forge-std/src/',
        'halmos-cheatcodes/=lib/signals-implicit-mode/lib/sequence-v3/lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/',
        'murky/=lib/murky/',
        'openzeppelin-contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/',
        'openzeppelin-contracts/=lib/openzeppelin-contracts/',
        'openzeppelin/=lib/openzeppelin-contracts-upgradeable/contracts/',
        'sequence-v3/=lib/signals-implicit-mode/lib/sequence-v3/',
        'signals-implicit-mode/=lib/signals-implicit-mode/',
        'solady/=lib/solady/src/'
      ],
      optimizer: {
        enabled: false,
        runs: 200
      },
      metadata: {
        useLiteralContent: true,
        bytecodeHash: 'ipfs',
        appendCBOR: true
      },
      outputSelection: {
        '*': {
          '*': ['evm.bytecode', 'evm.deployedBytecode', 'devdoc', 'userdoc', 'metadata', 'abi']
        }
      },
      evmVersion: 'cancun',
      viaIR: true,
      libraries: {}
    }
  }
}
