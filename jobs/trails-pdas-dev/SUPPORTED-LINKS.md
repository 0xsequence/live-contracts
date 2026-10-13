# Trails PDAs — supported links

Every cross-chain corridor `trails-api` can currently quote, filtered to the chains
`live-contracts` can deploy to, expressed as the on-chain configuration the new PDA
contracts require.

Source of truth: `0xsequence/trails-api` `lib/routes/`. This file is a derived snapshot —
regenerate it when a provider's route tables change.

## What a link is

A link is one directed `setDestination` call on one bridge adapter, keyed by
`keccak256(tokenIn, dstChainId)`. It is strictly one-directional: A->B and B->A are two
separate calls on two different chains. `tokenOut` is stored as a value, not part of the key,
so an adapter holds exactly one destination per `(tokenIn, dstChainId)` pair.

A corridor is only usable when all of the following exist:

| Requirement | Where | Call |
|---|---|---|
| Adapter registered on the router | source chain | `addBridgeAdapters` / `addLocalAdapters` |
| Destination configured on the adapter | source chain | `setDestination(...)` (adapter owner) |
| Remote inbox known to the router | source chain | `setRemoteInbox(dstChainId, runtime, params)` (router admin) |
| Router deployed with identical inbox init code | destination chain | — |
| `EXECUTOR_ROLE` granted | destination chain | `grantRole` |

`setRemoteInbox` params are `abi.encode(address deployer)` for EVM/Tron and
`abi.encode(bytes32 program, bytes32 routePda)` for Solana. Since the router address is
chain-invariant under ERC-2470 zero salt, every EVM entry carries the same address and a
`setRemoteInboxFallback` covers all of them in one call.

## Deployable chains

`networks.yaml` defines 45 networks; 7 declare a pre-cancun EVM version and are excluded by
`min_evm_version: cancun` (Telos 40/41, HOMEVERSE 19011/40875, SKALE 37084624/324705682/1482601649).
That leaves 22 mainnets and 16 testnets.

| Chain ID | Name | Net |
|---|---|---|
| 1 | Ethereum | mainnet |
| 10 | OP Mainnet | mainnet |
| 56 | BNB Chain | mainnet |
| 100 | Gnosis | mainnet |
| 137 | Polygon PoS | mainnet |
| 143 | Monad | mainnet |
| 146 | Sonic | mainnet |
| 999 | HyperEVM | mainnet |
| 1284 | Moonbeam | mainnet |
| 1868 | Soneium | mainnet |
| 5031 | Somnia | mainnet |
| 5042 | Arc | mainnet |
| 8333 | B3 | mainnet |
| 8453 | Base | mainnet |
| 13371 | Immutable zkEVM | mainnet |
| 33139 | ApeChain | mainnet |
| 42161 | Arbitrum One | mainnet |
| 42170 | Arbitrum Nova | mainnet |
| 42793 | Etherlink | mainnet |
| 43114 | Avalanche | mainnet |
| 80094 | Berachain | mainnet |
| 747474 | Katana | mainnet |
| 97 | BNB Testnet | testnet |
| 1287 | Moonbase Alpha | testnet |
| 1946 | Soneium Minato | testnet |
| 1993 | B3 Sepolia | testnet |
| 10143 | Monad Testnet | testnet |
| 13473 | Immutable zkEVM Testnet | testnet |
| 33111 | Curtis | testnet |
| 43113 | Avalanche Fuji | testnet |
| 50312 | Somnia Testnet | testnet |
| 80002 | Polygon Amoy | testnet |
| 84532 | Base Sepolia | testnet |
| 127823 | Etherlink Testnet | testnet |
| 421614 | Arbitrum Sepolia | testnet |
| 5042002 | Arc Sepolia | testnet |
| 11155111 | Sepolia | testnet |
| 11155420 | OP Sepolia | testnet |

## CCTP — USDC

`CctpAdapter` takes the chain's `TokenMessengerV2` as a constructor argument, so its address
differs per chain and it is **not** in the router's constructor adapter array — it must be
registered post-deploy with `addBridgeAdapters`.

`setDestination(address tokenIn, uint256 dstChainId, address tokenOut, uint32 destinationDomain)`

Mainnet and testnet USDC pools are separate networks and must never be linked to each other.

Mainnet: 10 endpoints -> **90 directed links** (full mesh).
Testnet: 8 endpoints -> **56 directed links**.

| Chain ID | Chain | CCTP domain | USDC | Net |
|---|---|---|---|---|
| 1 | Ethereum | 0 | `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` | mainnet |
| 10 | OP Mainnet | 2 | `0x0b2c639c533813f4aa9d7837caf62653d097ff85` | mainnet |
| 137 | Polygon PoS | 7 | `0x3c499c542cef5e3811e1192ce70d8cc03d5c3359` | mainnet |
| 143 | Monad | 15 | `0x754704bc059f8c67012fed69bc8a327a5aafb603` | mainnet |
| 146 | Sonic | 13 | `0x29219dd400f2bf60e5a23d13be72b486d4038894` | mainnet |
| 999 | HyperEVM | 19 | `0xb88339cb7199b77e23db6e890353e22632ba630f` | mainnet |
| 5042 | Arc | 26 | `0x3600000000000000000000000000000000000000` | mainnet |
| 8453 | Base | 6 | `0x833589fcd6edb6e08f4c7c32d4f71b54bda02913` | mainnet |
| 42161 | Arbitrum One | 3 | `0xaf88d065e77c8cc2239327c5edb3a432268e5831` | mainnet |
| 43114 | Avalanche | 1 | `0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e` | mainnet |
| 10143 | Monad Testnet | 15 | `0x534b2f3a21130d7a60830c2df862319e593943a3` | testnet |
| 43113 | Avalanche Fuji | 1 | `0x5425890298aed601595a70ab815c96711a31bc65` | testnet |
| 80002 | Polygon Amoy | 7 | `0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582` | testnet |
| 84532 | Base Sepolia | 6 | `0x036cbd53842c5426634e7929541ec2318f3dcf7e` | testnet |
| 421614 | Arbitrum Sepolia | 3 | `0x75faf114eafb1bdbe2f0316df893fd58ce46aa4d` | testnet |
| 5042002 | Arc Sepolia | 26 | `0x3600000000000000000000000000000000000000` | testnet |
| 11155111 | Sepolia | 0 | `0x1c7d4b196cb0c7b01d743fbc6116a902379c7238` | testnet |
| 11155420 | OP Sepolia | 2 | `0x5fd84259d66cd46123540766be93dfe6d43130d7` | testnet |

Arc (5042 / 5042002) uses the predeploy USDC `0x3600…0000` at the same address on both nets.

## LayerZero / Stargate OFT

`StargateAdapter` and `LayerZeroAdapter` both take only an owner, so both are chain-invariant
and both are already in the router's constructor adapter array.

Stargate: `setDestination(address tokenIn, address pool, uint256 dstChainId, address tokenOut, uint32 eid)`
LayerZero: `setDestination(address tokenIn, address oft, uint256 dstChainId, address tokenOut, uint32 eid)`

`pool`/`oft` is the source-chain contract; `eid` is the **destination** LayerZero endpoint id.

### USDC — 10 endpoints, 90 directed links

| Chain ID | Chain | LZ eid | Token | Pool / OFT |
|---|---|---|---|---|
| 1 | Ethereum | 30101 | `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` | `0xc026395860Db2d07ee33e05fE50ed7bD583189C7` |
| 10 | OP Mainnet | 30111 | `0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85` | `0xcE8CcA271Ebc0533920C83d39F417ED6A0abB7D0` |
| 56 | BNB Chain | 30102 | `0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d` | `0x962Bd449E630b0d928f308Ce63f1A21F02576057` |
| 100 | Gnosis | 30145 | `0x2a22f9c3b484c3629090FeED35F17Ff8F88f76F0` | `0xB1EeAD6959cb5bB9B20417d6689922523B2B86C3` |
| 137 | Polygon PoS | 30109 | `0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359` | `0x9Aa02D4Fae7F58b8E8f34c66E756cC734DAc7fe4` |
| 146 | Sonic | 30332 | `0x29219dd400f2Bf60E5a23d13Be72B486D4038894` | `0xA272fFe20cFfe769CdFc4b63088DCD2C82a2D8F9` |
| 1868 | Soneium | 30340 | `0xbA9986D2381edf1DA03B0B9c1f8b00dc4AacC369` | `0x45f1A95A4D3f3836523F5c83673c797f4d4d263B` |
| 8453 | Base | 30184 | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | `0x27a16dc786820B16E5c9028b75B99F6f604b5d26` |
| 42161 | Arbitrum One | 30110 | `0xaf88d065e77c8cC2239327C5EDb3A432268e5831` | `0xe8CDF27AcD73a434D661C84887215F7598e7d0d3` |
| 43114 | Avalanche | 30106 | `0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E` | `0x5634c4a5FEd09819E3c46D86A965Dd9447d86e47` |

### USDT — 6 endpoints, 30 directed links

| Chain ID | Chain | LZ eid | Token | Pool / OFT |
|---|---|---|---|---|
| 1 | Ethereum | 30101 | `0xdAC17F958D2ee523a2206206994597C13D831ec7` | `0x933597a323Eb81cAe705C5bC29985172fd5A3973` |
| 10 | OP Mainnet | 30111 | `0x94b008aA00579c1307B0EF2c499aD98a8ce58e58` | `0x19cFCE47eD54a88614648DC3f19A5980097007dD` |
| 56 | BNB Chain | 30102 | `0x55d398326f99059fF775485246999027B3197955` | `0x138EB30f73BC423c6455C53df6D89CB01d9eBc63` |
| 137 | Polygon PoS | 30109 | `0xc2132D05D31c914a87C6611C10748AEb04B58e8F` | `0xd47b03ee6d86Cf251ee7860FB2ACf9f91B9fD4d7` |
| 42161 | Arbitrum One | 30110 | `0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9` | `0xcE8CcA271Ebc0533920C83d39F417ED6A0abB7D0` |
| 43114 | Avalanche | 30106 | `0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7` | `0x12dC9256Acc9895B076f6638D628382881e62CeE` |

### WETH — 6 endpoints, 30 directed links

| Chain ID | Chain | LZ eid | Token | Pool / OFT |
|---|---|---|---|---|
| 1 | Ethereum | 30101 | `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` | `0x77b2043768d28E9C9aB44E1aBfC95944bcE57931` |
| 10 | OP Mainnet | 30111 | `0x4200000000000000000000000000000000000006` | `0xe8CDF27AcD73a434D661C84887215F7598e7d0d3` |
| 100 | Gnosis | 30145 | `0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1` | `0xe9aBA835f813ca05E50A6C0ce65D0D74390F7dE7` |
| 1868 | Soneium | 30340 | `0x4200000000000000000000000000000000000006` | `0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590` |
| 8453 | Base | 30184 | `0x4200000000000000000000000000000000000006` | `0xdc181Bd607330aeeBEF6ea62e03e5e1Fb4B6F7C7` |
| 42161 | Arbitrum One | 30110 | `0x82aF49447D8a07e3bd95BD0d56f35241523fBab1` | `0xA45B5130f36CDcA45667738e2a258AB09f4A5f7F` |

### SOMI — 4 endpoints, 12 directed links

| Chain ID | Chain | LZ eid | Token | Pool / OFT |
|---|---|---|---|---|
| 1 | Ethereum | 30101 | `0x1B0F6590d21dc02B92ad3A7D00F8884dC4f1aed9` | `0x1B0F6590d21dc02B92ad3A7D00F8884dC4f1aed9` |
| 56 | BNB Chain | 30102 | `0xa9616e5e23EC1582c2828B025bEcf3Ef610e266F` | `0xa9616e5e23EC1582c2828B025bEcf3Ef610e266F` |
| 5031 | Somnia | 30380 | `0x0000000000000000000000000000000000000000` | `0xC3D4E9Ac47D7f37bB07C2f8355Bb4940DEA3bbC3` |
| 8453 | Base | 30184 | `0x47636b3188774a3E7273D85A537b9bA4Ee7b2535` | `0x47636b3188774a3E7273D85A537b9bA4Ee7b2535` |

### KAT — 3 endpoints, 6 directed links

| Chain ID | Chain | LZ eid | Token | Pool / OFT |
|---|---|---|---|---|
| 1 | Ethereum | 30101 | `0x8F051Ca72a3440d83B18E71C3E59676203aB8f91` | `0x8F051Ca72a3440d83B18E71C3E59676203aB8f91` |
| 8453 | Base | 30184 | `0xD5390300c5DB71F80d46f0fA9983Fc72D4d1e3da` | `0xD5390300c5DB71F80d46f0fA9983Fc72D4d1e3da` |
| 747474 | Katana | 30375 | `0x7F1f4b4b29f5058fA32CC7a97141b8D7e5ABDC2d` | `0x8F051Ca72a3440d83B18E71C3E59676203aB8f91` |

### WBTC — 1 endpoints, 0 directed links

| Chain ID | Chain | LZ eid | Token | Pool / OFT |
|---|---|---|---|---|
| 1 | Ethereum | 30101 | `0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599` | `0x8d09C41229F07AD098ffB5faD239Dd87D2c131D4` |

**OFT total: 168 directed links.** WBTC has a single deployable endpoint (Ethereum) and
therefore no links; it needs a second supported chain before it is configurable.

## Hyperlane warp routes

The registry yields 1576 directed rows between deployable chains, collapsing to
**769 unique `(srcChain, tokenIn, dstChain)` adapter keys** across 116 warp route ids.

**142 of those keys collide** — two or more warp routes serve the same
`(tokenIn, dstChainId)` pair with different routers or different `tokenOut`. The adapter can
hold only one, so each collision needs a manual choice before it can be configured.
Unambiguous keys: **627**.

`setDestination(address tokenIn, address router, uint256 dstChainId, address tokenOut, uint32 destinationDomain, ...)`

The adapter reads and stores the local router's `sourceScale` at set time and reverts
`RouterScaleChanged` at execution if it later differs — a scale change on any warp router
requires re-running `setDestination` for every link that uses it.

Token distribution of the directed rows:

| Symbol | Rows |
|---|---|
| USDC | 723 |
| USDT | 161 |
| ETH | 69 |
| USDCSTAGE | 56 |
| LITKEY | 42 |
| LUMIA | 42 |
| ezETH | 36 |
| EZETHSTAGE | 36 |
| vbUSDC | 31 |
| vbUSDT | 31 |
| USD₮0 | 24 |
| USDT0 | 20 |
| HYPER | 20 |
| HYPERSTAGE | 20 |
| NES | 20 |
| oUSDT | 16 |
| oUSDTSTAGE | 16 |
| DAI | 12 |
| ETHSTAGE | 12 |
| FLT | 12 |

Per-source-chain unique key counts:

| Chain ID | Chain | Keys |
|---|---|---|
| 1 | Ethereum | 129 |
| 10 | OP Mainnet | 79 |
| 56 | BNB Chain | 94 |
| 100 | Gnosis | 6 |
| 137 | Polygon PoS | 68 |
| 143 | Monad | 22 |
| 146 | Sonic | 22 |
| 999 | HyperEVM | 39 |
| 1868 | Soneium | 11 |
| 8453 | Base | 111 |
| 13371 | Immutable zkEVM | 1 |
| 33139 | ApeChain | 3 |
| 42161 | Arbitrum One | 96 |
| 43114 | Avalanche | 40 |
| 80094 | Berachain | 14 |
| 84532 | Base Sepolia | 6 |
| 421614 | Arbitrum Sepolia | 5 |
| 747474 | Katana | 16 |
| 11155111 | Sepolia | 4 |
| 11155420 | OP Sepolia | 3 |

Full row-level detail is too large for this file; regenerate it from the trails-api registry
(`lib/routes/hyperlane/registry/routes_gen.go` and siblings).

## Local adapters (same-chain, no links)

`WethAdapter`, `UniswapV2/V3/V4Adapter` and `FeeAdapter` are local adapters: they act only on
the chain they are deployed to and have **no `setDestination` and no setters at all**. Every
knob is a constructor immutable, so reconfiguring one means redeploying it and re-registering.

They are not in the router constructor (their addresses are chain-specific, which would move
the router address), so each needs an `addLocalAdapters` call on its chain. **No job does this
today — it is the largest outstanding gap.**

### WETH — wrap/unwrap, 19 deployable chains

| Chain ID | Chain | Wrapped native |
|---|---|---|
| 1 | Ethereum | `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` |
| 10 | OP Mainnet | `0x4200000000000000000000000000000000000006` |
| 56 | BNB Chain | `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c` |
| 100 | Gnosis | `0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d` |
| 137 | Polygon PoS | `0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270` |
| 146 | Sonic | `0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38` |
| 999 | HyperEVM | `0x5555555555555555555555555555555555555555` |
| 1868 | Soneium | `0x4200000000000000000000000000000000000006` |
| 5031 | Somnia | `0x046EDe9564A72571df6F5e44d0405360c0f4dCab` |
| 8453 | Base | `0x4200000000000000000000000000000000000006` |
| 42161 | Arbitrum One | `0x82aF49447D8a07e3bd95BD0d56f35241523fBab1` |
| 43114 | Avalanche | `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7` |
| 80002 | Polygon Amoy | `0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889` |
| 80094 | Berachain | `0x6969696969696969696969696969696969696969` |
| 84532 | Base Sepolia | `0x4200000000000000000000000000000000000006` |
| 421614 | Arbitrum Sepolia | `0x980B62Da83eFf3D4576C647993b0c1D7faf17c73` |
| 747474 | Katana | `0xee7d8bcfb72bc1880d0cf19822eb0a2e6577ab62` |
| 11155111 | Sepolia | `0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9` |
| 11155420 | OP Sepolia | `0x4200000000000000000000000000000000000006` |

### Uniswap v4

`constants/trails-pdas.constants.yaml` carries a `PoolManager` for 9 mainnets and 3 testnets;
the job skips any chain without an entry. The pool shape is fixed at fee 3000 / tick spacing 60 /
no hooks.

## Providers with no static links

These providers resolve routes from a remote API per quote, so there is no table to mirror
on chain. They either need no adapter configuration, or a different kind of it.

| Provider | Mechanism | On-chain configuration needed |
|---|---|---|
| Relay | `api.relay.link` per quote | `RelayAdapter(relayDepository, originRelayChainId)` is chain-specific, plus `setSolver` allowlist and `setDestination` per corridor. A route is dead until its solver is approved. |
| LiFi | `li.quest/v1` | none — no PDA adapter exists |
| 0x | `api.0x.org` | none — no PDA adapter exists |
| Sushi | `api.sushi.com` | none — no PDA adapter exists |
| Everlong | `swap.foreverlong.io` | none — no PDA adapter exists |
| LZ transfer | `transfer.layerzero-api.com` | covered by `LayerZeroAdapter` links above |
| gas.zip | snapshot of `backend.gas.zip/v2/chains`, re-synced at runtime | none — native gas only, no adapter |
| OIF | snapshot of the OZ solver `/assets` | `OifAdapter(inputSettler)` is chain-specific; `setWindows` is global with `expiryWindow <= 1 days`; 4 static assets |

`gas.zip` accounts for 17,484 of the 22,051 raw static links in trails-api but has no PDA
adapter, which is why the real configuration burden is three orders of magnitude smaller than
the raw route count.

## Totals

| Adapter | Mainnet links | Testnet links | Notes |
|---|---|---|---|
| CCTP | 90 | 56 | full mesh, USDC only |
| Stargate / LayerZero OFT | 168 | 0 | USDC 90, USDT 30, WETH 30, SOMI 12, KAT 6 |
| Hyperlane | 751 | 18 | 142 keys collide and need a manual pick |
| OVault composer / stargate | 0 | 0 | deployed, no destinations identified in trails-api |
| Relay | 0 | 0 | dynamic; needs solver allowlist first |

Excluding Hyperlane, **258 mainnet links**. With Hyperlane's unambiguous keys, **885**.

## Current state in live-contracts

Configured today: a 4x3 Stargate USDC mesh over Polygon, OP, Arbitrum and Base — 12 of the 258.

Not yet configured:

- every CCTP link (the adapter has no job at all)
- every LayerZero, OVault-composer and OVault-stargate link
- Stargate beyond USDC and beyond those 4 chains
- `addLocalAdapters` for the WETH and Uniswap v4 adapters on all 19 / 12 chains
- `setRemoteInbox` / `setRemoteInboxFallback` on every chain

