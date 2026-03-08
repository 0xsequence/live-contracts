# Known Deployment Issues

This file keeps a record of known deployment issues.

## Skipped Issues

The following issues are not actively looking to be resolved and have been skipped in CI. 

### Large Contracts

Affected deployments:

* [factories](jobs/builder/factories_v3.yaml)

Affected networks:

* Telos (40)
* Telos testnet (41)

Some contracts are near the [EIP-170](https://eips.ethereum.org/EIPS/eip-170) contract size limit. For chains with low block sizes, these contracts are unable to be deployed.

### Universal Deployer

Affected deployments:

* [niftyswap](jobs/niftyswap/niftyswap.yaml)
* [sequence v1](jobs/patches/SEQ-0001/seq0001.yaml)
* [guards v1](jobs/sequence_v1/guards-v1.yaml)
* [seq-0001](jobs/patches/SEQ-0001/seq0001.yaml)

Affected networks:

* Berachain (80094)

Early Sequence contract rely on a custom [Universal Deployer](https://gist.github.com/Agusx1211/de05dabf918d448d315aa018e2572031) for deployment. Deploying this deployer requires a particular pre-signed transactions that some chains are unable accept.

Networks listed in this section have not provided a workaround to the pre-signed transaction failure issue.

See `Nick's test` below.

### Arachnid Deterministic Proxy

Affected deployments:

* [p256 verifier (sequence v3 passkeys)](jobs/predeploy/p256-verifier.yaml)

Affected networks:

* Skale Nebula (1482601649)

Similar to the previous known issue, the Arachnid Deterministic Proxy relies on a particular pre-signed deployment transaction. Some networks will have the transaction revert instead of being rejected. This causes the pre-signed transaction's sender's nonce to increment, which blocks all future attempts at submitting the transaction.

Catapult has a `Nick's test` job that automatically runs before these pre-signed transactions to prevent this issue happening in future.

### EIP-6492

Affected deployments:

* [eip-6492](jobs/eip_6492/eip-6492.yaml)

Affected networks:

* Homeverse (19011)
* Homeverse testnet (40875)

The EIP-6492 deployment uses evm version `prague`. Some networks do not yet support the required op codes for this deployment.

For most networks EIP-6492 deployment is not neccessary, as [EIP-6492](https://eips.ethereum.org/EIPS/eip-6492) can be used via `eth_call` without the contract being present on chain. This EIP-6492 deployment is specifically to cater for ZkEVM networks that have trouble with the deployment bundled in the EIP-6492 `eth_call`.

## Debugging Required

### Nick's Test Failed

The `Nick's test` job run before attempting deployments that use pre-signed transactions. This prevents a known issue where some networks will revert the transaction and increment the transaction's sender's nonce. Incrementing the nonce prevents the transaction from being resent. This error indicates that the pre-signed transaction (usually [ERC-2470](https://eips.ethereum.org/EIPS/eip-2470) deployment) will fail. Likely due to [EIP-155](https://eips.ethereum.org/EIPS/eip-155) requirements or network gas price requirements (>100 gwei).

Some network are willing and able to work around these restrictions for the one particular deployment. This is either, whitelisting the transaction, the deployer deployer and through a non-standard state transition.

If the network is unable or unwilling to assist, the related job should be skipped.

### All Nodes Unhealthy

When the network nodes are unhealthy, you may see an "all nodes unhealthy" error. This is typically a temporary issue and the job should be rerun later.

For the following networks we have updated this repo to use public RPC nodes instead:

* Apechain Testnet

### Insufficient Funds

The CI in this repository the deployer address `0x000000cCD1D384484d4f4AeE9CC47527Dc03e265`. It can run out of funds.

### Revm Error

Networks that use REVM sometimes throw an `REVM error`. This error is ambiguous and has been used to show any of the following conditions:

* Insufficient funds
* Unsupport EVM version / opcode
* Bytecode size exceeded
* Transaction type not supported

Manual debugging is required.
