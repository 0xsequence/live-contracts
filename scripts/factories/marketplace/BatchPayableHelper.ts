import { ContractFactory, type ethers } from 'ethers'
import type { VerificationRequest } from 'scripts/types'

// https://github.com/0xsequence/marketplace-contracts/blob/26ed8e0142ce0458baab30adec7e96dd1587cdf0/contracts/BatchPayableHelper.sol

const abi = [
  {
    inputs: [],
    name: 'InvalidBatchRequest',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'contract ISequenceMarketFunctions',
        name: 'market',
        type: 'address'
      },
      {
        internalType: 'uint256[]',
        name: 'requestIds',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: 'quantities',
        type: 'uint256[]'
      },
      {
        internalType: 'address[]',
        name: 'recipients',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: 'additionalFees',
        type: 'uint256[]'
      },
      {
        internalType: 'address[]',
        name: 'additionalFeeRecipients',
        type: 'address[]'
      }
    ],
    name: 'acceptRequestBatch',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
]

export class BatchPayableHelper extends ContractFactory {
  constructor(signer: ethers.Signer) {
    super(
      abi,
      '0x6080806040523461001657610360908161001c8239f35b600080fdfe6080604052600436101561001b575b361561001957600080fd5b005b60003560e01c638c7080c90361000e5760c03660031901126102b3576004356001600160a01b03811681036102b35760243567ffffffffffffffff81116102b35761006a9036906004016102d3565b909160443567ffffffffffffffff81116102b35761008c9036906004016102d3565b93909260643567ffffffffffffffff81116102b3576100af9036906004016102d3565b959060843567ffffffffffffffff81116102b3576100d19036906004016102d3565b9167ffffffffffffffff60a435116102b3576100f23660a4356004016102d3565b9490958181148015906102c9575b6102b85760005b818110610142574761011557005b600080808047818115610139575b3390f11561012d57005b6040513d6000823e3d90fd5b506108fc610123565b8a898d61016984610161818961015a828b4799610304565b3597610304565b359289610304565b35906001600160a01b03821682036102b3576001600160a01b038e163b156102b35760405163735eb90760e11b8152600481019490945260248401526001600160a01b0316604483015260a0606483015260a482018890526001600160fb1b0388116102b357818c60e48a60051b8c60c491808d84880137850191820160c086840301608487015252018c60005b8d811061027757506000949184900392849291506001600160a01b03165af1801561012d57610249575b50600019811461023357600101610107565b634e487b7160e01b600052601160045260246000fd5b67ffffffffffffffff81116102615760405238610221565b634e487b7160e01b600052604160045260246000fd5b90935091508235906001600160a01b03821682036102b3576001600160a01b03909116815284928f9260209283019291909101906001016101f7565b600080fd5b6355ca07b760e11b60805260046080fd5b508a811415610100565b9181601f840112156102b35782359167ffffffffffffffff83116102b3576020808501948460051b0101116102b357565b91908110156103145760051b0190565b634e487b7160e01b600052603260045260246000fdfea26469706673582212203d65e458361e6ed154313c1fee4d625f6539a08b82ac3d52e9e20033e8b8691c64736f6c63430008130033',
      signer
    )
  }
}

export const BATCHPAYABLEHELPER_VERIFICATION: Omit<VerificationRequest, 'waitForSuccess'> = {
  contractToVerify: 'contracts/BatchPayableHelper.sol:BatchPayableHelper',
  version: 'v0.8.19+commit.7dd6d404',
  licenceType: 'Apache-2.0',
  compilerInput: {
    language: 'Solidity',
    sources: {
      'contracts/BatchPayableHelper.sol': {
        content:
          '// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.19;\n\nimport {ISequenceMarketFunctions} from "./interfaces/ISequenceMarket.sol";\n\nerror InvalidBatchRequest();\n\ncontract BatchPayableHelper {\n  /**\n   * Accepts requests.\n   * @param market The market to accept requests on.\n   * @param requestIds The IDs of the requests.\n   * @param quantities The quantities of tokens to accept.\n   * @param recipients The recipients of the accepted tokens.\n   * @param additionalFees The additional fees to pay.\n   * @param additionalFeeRecipients The addresses to send the additional fees to.\n   * @dev Additional fees are applied to each request.\n   */\n  function acceptRequestBatch(\n    ISequenceMarketFunctions market,\n    uint256[] calldata requestIds,\n    uint256[] calldata quantities,\n    address[] calldata recipients,\n    uint256[] calldata additionalFees,\n    address[] calldata additionalFeeRecipients\n  ) external payable {\n    if (requestIds.length != quantities.length || requestIds.length != recipients.length) {\n      revert InvalidBatchRequest();\n    }\n\n    for (uint256 i = 0; i < requestIds.length; i++) {\n      market.acceptRequest{value: address(this).balance}(\n        requestIds[i], quantities[i], recipients[i], additionalFees, additionalFeeRecipients\n      );\n    }\n\n    // Return any remaining ETH\n    if (address(this).balance > 0) {\n      payable(msg.sender).transfer(address(this).balance);\n    }\n  }\n\n  receive() external payable {}\n}\n'
      },
      'contracts/interfaces/ISequenceMarket.sol': {
        content:
          "// SPDX-License-Identifier: Apache-2.0\npragma solidity 0.8.19;\n\ninterface ISequenceMarketStorage {\n  /**\n   * Request parameters.\n   * @param isListing True if the request is a listing, false if it is an offer.\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\n   * @param tokenContract The address of the token contract.\n   * @param tokenId The ID of the token.\n   * @param quantity The quantity of tokens.\n   * @param expiry The expiry of the request.\n   * @param currency The address of the currency. address(0) for native token.\n   * @param pricePerToken The price per token, including royalty fees.\n   */\n  struct RequestParams {\n    bool isListing;\n    bool isERC1155;\n    address tokenContract;\n    uint256 tokenId;\n    uint256 quantity;\n    uint96 expiry;\n    address currency;\n    uint256 pricePerToken;\n  }\n\n  /**\n   * Request storage.\n   * @param creator The address of the request creator.\n   * @param isListing True if the request is a listing, false if it is an offer.\n   * @param isERC1155 True if the token is an ERC1155 token, false if it is an ERC721 token.\n   * @param tokenContract The address of the token contract.\n   * @param tokenId The ID of the token.\n   * @param quantity The quantity of tokens.\n   * @param expiry The expiry of the request.\n   * @param currency The address of the currency. address(0) for native token.\n   * @param pricePerToken The price per token, including royalty fees.\n   */\n  struct Request {\n    address creator;\n    bool isListing;\n    bool isERC1155;\n    address tokenContract;\n    uint256 tokenId;\n    uint256 quantity;\n    uint96 expiry;\n    address currency;\n    uint256 pricePerToken;\n  }\n\n  /**\n   * Custom royalty parameters.\n   * @param recipient Address to send the fees to.\n   * @param fee Fee percentage with a 10000 basis (e.g. 0.3% is 30 and 1% is 100 and 100% is 10000).\n   * @dev Used to store custom royalty settings for contracts do not support ERC2981.\n   */\n  struct CustomRoyalty {\n    address recipient;\n    uint96 fee;\n  }\n}\n\ninterface ISequenceMarketFunctions is ISequenceMarketStorage {\n  /**\n   * Creates a request.\n   * @param request The request's details.\n   * @return requestId The ID of the request.\n   * @notice A listing is when the maker is selling tokens for currency.\n   * @notice An offer is when the maker is buying tokens with currency.\n   */\n  function createRequest(RequestParams calldata request) external returns (uint256 requestId);\n\n  /**\n   * Creates requests.\n   * @param requests The requests' details.\n   * @return requestIds The IDs of the requests.\n   */\n  function createRequestBatch(RequestParams[] calldata requests) external returns (uint256[] memory requestIds);\n\n  /**\n   * Accepts a request.\n   * @param requestId The ID of the request.\n   * @param quantity The quantity of tokens to accept.\n   * @param recipient The recipient of the accepted tokens.\n   * @param additionalFees The additional fees to pay.\n   * @param additionalFeeRecipients The addresses to send the additional fees to.\n   */\n  function acceptRequest(\n    uint256 requestId,\n    uint256 quantity,\n    address recipient,\n    uint256[] calldata additionalFees,\n    address[] calldata additionalFeeRecipients\n  )\n    external payable;\n\n  /**\n   * Accepts requests.\n   * @param requestIds The IDs of the requests.\n   * @param quantities The quantities of tokens to accept.\n   * @param recipients The recipients of the accepted tokens.\n   * @param additionalFees The additional fees to pay.\n   * @param additionalFeeRecipients The addresses to send the additional fees to.\n   * @dev Additional fees are applied to each request.\n   */\n  function acceptRequestBatch(\n    uint256[] calldata requestIds,\n    uint256[] calldata quantities,\n    address[] calldata recipients,\n    uint256[] calldata additionalFees,\n    address[] calldata additionalFeeRecipients\n  )\n    external;\n\n  /**\n   * Cancels a request.\n   * @param requestId The ID of the request.\n   */\n  function cancelRequest(uint256 requestId) external;\n\n  /**\n   * Cancels requests.\n   * @param requestIds The IDs of the requests.\n   */\n  function cancelRequestBatch(uint256[] calldata requestIds) external;\n\n  /**\n   * Gets a request.\n   * @param requestId The ID of the request.\n   * @return request The request.\n   */\n  function getRequest(uint256 requestId) external view returns (Request memory request);\n\n  /**\n   * Gets requests.\n   * @param requestIds The IDs of the requests.\n   * @return requests The requests.\n   */\n  function getRequestBatch(uint256[] calldata requestIds) external view returns (Request[] memory requests);\n\n  /**\n   * Invalidates all current requests for the msg.sender.\n   */\n  function invalidateRequests() external;\n\n  /**\n   * Invalidates all current requests for a given `tokenContract` for the msg.sender.\n   */\n  function invalidateRequests(address tokenContract) external;\n\n  /**\n   * Checks if a request is valid.\n   * @param requestId The ID of the request.\n   * @param quantity The amount of tokens to exchange. 0 is assumed to be the request's available quantity.\n   * @return valid The validity of the request.\n   * @return request The request.\n   * @notice A request is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\n   */\n  function isRequestValid(uint256 requestId, uint256 quantity) external view returns (bool valid, Request memory request);\n\n  /**\n   * Checks if requests are valid.\n   * @param requestIds The IDs of the requests.\n   * @param quantities The amount of tokens to exchange per request. 0 is assumed to be the request's available quantity.\n   * @return valid The validities of the requests.\n   * @return requests The requests.\n   * @notice A request is valid if it is active, has not expired and give amount of tokens (currency for offers, tokens for listings) are transferrable.\n   */\n  function isRequestValidBatch(uint256[] calldata requestIds, uint256[] calldata quantities)\n    external\n    view\n    returns (bool[] memory valid, Request[] memory requests);\n\n  /**\n   * Returns the royalty details for the given token and cost.\n   * @param tokenContract Address of the token being traded.\n   * @param tokenId The ID of the token.\n   * @param cost Amount of currency sent/received for the trade.\n   * @return recipient Address to send royalties to.\n   * @return royalty Amount of currency to be paid as royalties.\n   */\n  function getRoyaltyInfo(address tokenContract, uint256 tokenId, uint256 cost)\n    external\n    view\n    returns (address recipient, uint256 royalty);\n}\n\ninterface ISequenceMarketSignals {\n  //\n  // Events\n  //\n\n  /// Emitted when a request is created.\n  event RequestCreated(\n    uint256 indexed requestId,\n    address indexed creator,\n    address indexed tokenContract,\n    uint256 tokenId,\n    bool isListing,\n    uint256 quantity,\n    address currency,\n    uint256 pricePerToken,\n    uint256 expiry\n  );\n\n  /// Emitted when a request is accepted.\n  event RequestAccepted(\n    uint256 indexed requestId,\n    address indexed buyer,\n    address indexed tokenContract,\n    address recipient,\n    uint256 quantity,\n    uint256 quantityRemaining\n  );\n\n  /// Emitted when a request is cancelled.\n  event RequestCancelled(uint256 indexed requestId, address indexed tokenContract);\n\n  /// Emitted when a user bulk invalidates requests.\n  event RequestsInvalidated(address indexed creator, uint256 indexed invalidatedBefore);\n\n  /// Emitted when a user bulk invalidates requests.\n  event RequestsInvalidated(address indexed creator, address indexed tokenContract, uint256 indexed invalidatedBefore);\n\n  /// Emitted when custom royalty settings are changed.\n  event CustomRoyaltyChanged(address indexed tokenContract, address recipient, uint96 fee);\n\n  //\n  // Errors\n  //\n\n  /// Thrown when the contract address does not support the required interface.\n  error UnsupportedContractInterface(address contractAddress, bytes4 interfaceId);\n\n  /// Thrown when the token approval is invalid.\n  error InvalidTokenApproval(address tokenContract, uint256 tokenId, uint256 quantity, address owner);\n\n  /// Thrown when the currency address is invalid.\n  error InvalidCurrency();\n\n  /// Thrown when the currency approval is invalid.\n  error InvalidCurrencyApproval(address currency, uint256 quantity, address owner);\n\n  /// Thrown when request id is invalid.\n  error InvalidRequestId(uint256 requestId);\n\n  /// Thrown when the parameters of a batch accept request are invalid.\n  error InvalidBatchRequest();\n\n  /// Thrown when quantity is invalid.\n  error InvalidQuantity();\n\n  /// Thrown when price is invalid.\n  error InvalidPrice();\n\n  /// Thrown when royalty is invalid.\n  error InvalidRoyalty();\n\n  /// Thrown when expiry is invalid.\n  error InvalidExpiry();\n\n  /// Thrown when request has been explicitly invalidated.\n  error Invalidated();\n\n  /// Thrown when the additional fees are invalid.\n  error InvalidAdditionalFees();\n}\n\n// solhint-disable-next-line no-empty-blocks\ninterface ISequenceMarket is ISequenceMarketFunctions, ISequenceMarketSignals {}\n"
      }
    },
    settings: {
      remappings: [
        'ds-test/=lib/forge-std/lib/ds-test/src/',
        'forge-std/=lib/forge-std/src/',
        '@0xsequence/erc20-meta-token/=lib/0xsequence/erc20-meta-token/src/',
        '@0xsequence/erc-1155/=lib/0xsequence/erc-1155/src/',
        '@openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/contracts/',
        '@openzeppelin/contracts/=lib/openzeppelin/contracts/',
        '@uniswap/lib/=lib/uniswap-lib/',
        '0xsequence/=lib/0xsequence/',
        'erc4626-tests/=lib/openzeppelin/lib/erc4626-tests/',
        'openzeppelin-contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/',
        'openzeppelin/=lib/openzeppelin/',
        'uniswap-lib/=lib/uniswap-lib/contracts/'
      ],
      optimizer: {
        enabled: true,
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
      evmVersion: 'paris',
      viaIR: true,
      libraries: {}
    }
  }
}
