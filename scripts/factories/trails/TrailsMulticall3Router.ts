import { ContractFactory, type ethers } from 'ethers'
import type { VerificationRequest } from 'scripts/types'

// https://github.com/0xsequence/trails-contracts/blob/f65d27efee0f766c68ee664453523e913addb6bf/broadcast/TrailsMulticall3Router.s.sol/8453/run-1752834875.json

export class TrailsMulticall3Router extends ContractFactory {
  constructor(signer?: ethers.Signer) {
    super(
      [],
      '60a060405234603257600e6040565b60146036565b6106f761005b823960805181818161024c015261065f01526106f790f35b603c565b60405190565b5f80fd5b73ca11bde05977b3631167028862be2a173976ca1160805256fe60806040526004361015610015575b366102dc57005b61001f5f3561003e565b806309c5eabe14610039576394b41e520361000e576102a7565b61020b565b60e01c90565b60405190565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f80fd5b909182601f830112156100985781359167ffffffffffffffff831161009357602001926001830284011161008e57565b61005a565b610056565b610052565b906020828203126100ce575f82013567ffffffffffffffff81116100c9576100c5920161005e565b9091565b61004e565b61004a565b5190565b60209181520190565b60200190565b151590565b6100f4906100e6565b9052565b5190565b60209181520190565b90825f9392825e0152565b601f801991011690565b61013961014260209361014793610130816100f8565b938480936100fc565b95869101610105565b610110565b0190565b61017691602060408201926101665f8201515f8501906100eb565b015190602081840391015261011a565b90565b906101839161014b565b90565b60200190565b906101a0610199836100d3565b80926100d7565b90816101b1602083028401946100e0565b925f915b8383106101c457505050505090565b909192939460206101e66101e083856001950387528951610179565b97610186565b93019301919392906101b5565b6102089160208201915f81840391015261018c565b90565b61023361022261021c36600461009d565b9061064d565b61022a610044565b918291826101f3565b0390f35b5f80fd5b5f91031261024557565b61004a565b7f000000000000000000000000000000000000000000000000000000000000000090565b60018060a01b031690565b6102829061026e565b90565b61028e90610279565b9052565b91906102a5905f60208501940190610285565b565b346102d7576102b736600461023b565b6102d36102c261024a565b6102ca610044565b91829182610292565b0390f35b610237565b5f80fd5b606090565b905090565b90825f939282370152565b9091826103058161030c936102e5565b80936102ea565b0190565b909161031b926102f5565b90565b634e487b7160e01b5f52604160045260245ffd5b9061033c90610110565b810190811067ffffffffffffffff82111761035657604052565b61031e565b9061036e610367610044565b9283610332565b565b67ffffffffffffffff811161038e5761038a602091610110565b0190565b61031e565b906103a56103a083610370565b61035b565b918252565b606090565b3d5f146103ca576103bf3d610393565b903d5f602084013e5b565b6103d26103aa565b906103c8565b60209181520190565b60207f6c65640000000000000000000000000000000000000000000000000000000000917f547261696c734d756c746963616c6c33526f757465723a2063616c6c206661695f8201520152565b61043b60236040926103d8565b610444816103e1565b0190565b61045d9060208101905f81830391015261042e565b90565b1561046757565b61046f610044565b62461bcd60e51b81528061048560048201610448565b0390fd5b67ffffffffffffffff81116104a15760208091020190565b61031e565b5f80fd5b5f80fd5b6104b7816100e6565b036104be57565b5f80fd5b905051906104cf826104ae565b565b5f80fd5b909291926104ea6104e582610370565b61035b565b938185526020850190828401116105065761050492610105565b565b6104d1565b9080601f8301121561052957816020610526935191016104d5565b90565b610052565b91909160408184031261058057610545604061035b565b92610552815f84016104c2565b5f850152602082015167ffffffffffffffff811161057b57610574920161050b565b6020830152565b6104aa565b6104a6565b92919061059961059482610489565b61035b565b93818552602080860192028101918383116105f05781905b8382106105bf575050505050565b815167ffffffffffffffff81116105eb576020916105e0878493870161052e565b8152019101906105b1565b610052565b61005a565b9080601f830112156106135781602061061093519101610585565b90565b610052565b90602082820312610648575f82015167ffffffffffffffff81116106435761064092016105f5565b90565b61004e565b61004a565b5f80916106be9361065c6102e0565b507f00000000000000000000000000000000000000000000000000000000000000009161069361068a610044565b92839283610310565b03915af46106a86106a26103af565b91610460565b60206106b3826100f8565b818301019101610618565b9056fea2646970667358221220c745fcc8228be456513438936d544aa0e26a493039a0820c210f2d0debf2cb2964736f6c634300081e0033',
      signer
    )
  }
}

export const TRAILSMULTICALL3ROUTER_VERIFICATION: Omit<VerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'src/TrailsMulticall3Router.sol:TrailsMulticall3Router',
  version: 'v0.8.30+commit.73712a01',
  licenceType: 'Apache-2.0',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'src/TrailsMulticall3Router.sol': {
        content:
          '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.24;\n\nimport {IMulticall3} from "forge-std/interfaces/IMulticall3.sol";\n\n/**\n * @title TrailsMulticall3Router\n * @author Shun Kakinoki\n * @notice A wrapper to execute multiple calls via DELEGATECALL to preserve the original msg.sender.\n * @dev This contract mimics the Multicall3 interface but executes sub-calls via DELEGATECALL\n *      to ensure that for the sub-calls, msg.sender is the original caller of this contract.\n *      This is useful for smart contract wallets (intent addresses) that need to control msg.sender.\n */\ncontract TrailsMulticall3Router {\n    // -------------------------------------------------------------------------\n    // Immutable Variables\n    // -------------------------------------------------------------------------\n\n    address public immutable multicall3 = 0xcA11bde05977b3631167028862bE2a173976CA11;\n\n    // -------------------------------------------------------------------------\n    // Functions\n    // -------------------------------------------------------------------------\n\n    /**\n     * @notice Aggregates multiple calls in a single transaction.\n     * @dev See the contract-level documentation for the logic on how the call is performed.\n     * @param data The data to execute.\n     * @return returnResults The result of the execution. (Expects the underlying data returned to be an array of IMulticall3.Result)\n     */\n    function execute(bytes calldata data)\n        public\n        payable\n        returns (IMulticall3.Result[] memory returnResults)\n    {\n        (bool success, bytes memory returnData) = multicall3.delegatecall(data);\n        require(success, "TrailsMulticall3Router: call failed");\n        return abi.decode(returnData, (IMulticall3.Result[]));\n    }\n\n    // -------------------------------------------------------------------------\n    // Receive ETH\n    // -------------------------------------------------------------------------\n\n    /// @notice Receive ETH\n    receive() external payable {}\n}\n'
      },
      'lib/forge-std/src/interfaces/IMulticall3.sol': {
        content:
          '// SPDX-License-Identifier: MIT\npragma solidity >=0.6.2 <0.9.0;\n\npragma experimental ABIEncoderV2;\n\ninterface IMulticall3 {\n    struct Call {\n        address target;\n        bytes callData;\n    }\n\n    struct Call3 {\n        address target;\n        bool allowFailure;\n        bytes callData;\n    }\n\n    struct Call3Value {\n        address target;\n        bool allowFailure;\n        uint256 value;\n        bytes callData;\n    }\n\n    struct Result {\n        bool success;\n        bytes returnData;\n    }\n\n    function aggregate(Call[] calldata calls)\n        external\n        payable\n        returns (uint256 blockNumber, bytes[] memory returnData);\n\n    function aggregate3(Call3[] calldata calls) external payable returns (Result[] memory returnData);\n\n    function aggregate3Value(Call3Value[] calldata calls) external payable returns (Result[] memory returnData);\n\n    function blockAndAggregate(Call[] calldata calls)\n        external\n        payable\n        returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData);\n\n    function getBasefee() external view returns (uint256 basefee);\n\n    function getBlockHash(uint256 blockNumber) external view returns (bytes32 blockHash);\n\n    function getBlockNumber() external view returns (uint256 blockNumber);\n\n    function getChainId() external view returns (uint256 chainid);\n\n    function getCurrentBlockCoinbase() external view returns (address coinbase);\n\n    function getCurrentBlockDifficulty() external view returns (uint256 difficulty);\n\n    function getCurrentBlockGasLimit() external view returns (uint256 gaslimit);\n\n    function getCurrentBlockTimestamp() external view returns (uint256 timestamp);\n\n    function getEthBalance(address addr) external view returns (uint256 balance);\n\n    function getLastBlockHash() external view returns (bytes32 blockHash);\n\n    function tryAggregate(bool requireSuccess, Call[] calldata calls)\n        external\n        payable\n        returns (Result[] memory returnData);\n\n    function tryBlockAndAggregate(bool requireSuccess, Call[] calldata calls)\n        external\n        payable\n        returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData);\n}\n'
      }
    },
    settings: {
      remappings: [
        '@/=src/',
        'test/=test/',
        '@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/',
        'forge-std/=lib/forge-std/src/',
        'lifi-contracts/=lib/contracts/src/',
        'erc2470-libs/=lib/erc2470-libs/',
        'wallet-contracts-v3/=lib/wallet-contracts-v3/src/',
        '@eth-optimism/=lib/contracts/node_modules/@hop-protocol/sdk/node_modules/@eth-optimism/',
        '@memview-sol/=lib/evm-cctp-contracts/lib/memview-sol/',
        '@uniswap/=lib/contracts/node_modules/@uniswap/',
        'Permit2/=lib/contracts/lib/Permit2/',
        'celer-network/=lib/contracts/lib/sgn-v2-contracts/',
        'centre-tokens.git/=lib/evm-cctp-contracts/lib/centre-tokens.git/',
        'contracts/=lib/contracts/src/',
        'create3-factory/=lib/contracts/lib/create3-factory/',
        'ds-test/=lib/evm-cctp-contracts/lib/ds-test/src/',
        'erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/',
        'eth-gas-reporter/=lib/contracts/node_modules/eth-gas-reporter/',
        'evm-cctp-contracts/=lib/evm-cctp-contracts/',
        'forge-gas-snapshot/=lib/contracts/lib/Permit2/lib/forge-gas-snapshot/src/',
        'halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/',
        'lifi/=lib/contracts/src/',
        'memview-sol/=lib/evm-cctp-contracts/lib/memview-sol/contracts/',
        'openzeppelin-contracts/=lib/openzeppelin-contracts/',
        'openzeppelin/=lib/contracts/lib/openzeppelin-contracts/contracts/',
        'permit2/=lib/contracts/lib/Permit2/src/',
        'sgn-v2-contracts/=lib/contracts/lib/sgn-v2-contracts/contracts/',
        'solady/=lib/contracts/lib/solady/src/',
        'solmate/=lib/contracts/lib/solmate/src/'
      ],
      optimizer: {
        enabled: false,
        runs: 200
      },
      metadata: {
        useLiteralContent: false,
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
