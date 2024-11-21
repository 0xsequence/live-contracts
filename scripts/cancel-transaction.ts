import { Logger } from '@0xsequence/solidity-deployer'
import { BigNumber, ethers } from 'ethers'
import { argv } from 'node:process'
import ora, { type Ora } from 'ora'
import { type Config, getConfigs } from './config'
import { LoggingProvider } from './utils/LoggingProvider'

export const cancelTransaction = async (config: Config, nonce: number, txHash?: string): Promise<string | null> => {
  const prompt = ora() as Ora & Logger
  prompt.log = (message: string) => {
    // Log a message and keep spinner running
    const currentText = prompt.text
    prompt.info(message)
    prompt.start(currentText)
  }
  prompt.error = prompt.fail
  prompt.prefixText = config.networkName

  if (!config.guardPatchSecret) {
    prompt.warn('Missing patch secret, skipping guard migrations')
  }

  try {
    const provider = new LoggingProvider(prompt, {
      url: config.rpcUrl,
      timeout: 60000 // 1 minute timeout
    })
    const signer = new ethers.Wallet(config.deployerPk, provider)
    provider.getSigner = () => signer as unknown as ethers.providers.JsonRpcSigner

    prompt.info(`Network Name: ${config.networkName}`)
    prompt.info(`Chain Id: ${(await provider.getNetwork()).chainId}`)
    prompt.info(`Local Deployer Address: ${await signer.getAddress()}`)
    prompt.info(`Local Deployer Balance: ${await signer.getBalance()}`)
    prompt.info(`Gas price (network): ${await provider.getGasPrice()}`)

    // Provider check nonce
    const providerNonce = await provider.getTransactionCount(await signer.getAddress())
    if (providerNonce < nonce) {
      prompt.fail(`Nonce mismatch: ${providerNonce} vs ${nonce}`)
      return 'Nonce mismatch'
    }
    prompt.info(`Provider nonce: ${providerNonce}`)

    // Provider get pending transaction
    let pendingTx: ethers.providers.TransactionResponse | undefined
    if (txHash) {
      prompt.info(`Transaction hash: ${txHash}`)
      pendingTx = await provider.getTransaction(txHash)
      prompt.info(`Pending transaction: ${JSON.stringify(pendingTx, null, 2)}`)
      if (pendingTx.nonce !== nonce) {
        prompt.fail(`Nonce mismatch: ${pendingTx.nonce} vs ${nonce}`)
        return 'Nonce mismatch'
      }
    }
    const txParams = {
      // Use gas price if pending tx is not provided
      gasPrice: pendingTx ? undefined : await provider.getGasPrice(),
      maxFeePerGas: pendingTx?.maxFeePerGas?.mul(12).div(10),
      maxPriorityFeePerGas: pendingTx?.maxPriorityFeePerGas?.mul(12).div(10)
    }
    prompt.info(`Tx params: ${JSON.stringify(txParams, null, 2)}`)

    // Create a transaction that sends 0 ETH to the deployer
    const tx = await signer.sendTransaction({
      to: await signer.getAddress(),
      value: BigNumber.from(0),
      nonce,
      ...txParams
    })
    await tx.wait()
  } catch (error: unknown) {
    console.error('Error cancelling transaction on', config.networkName, error)
    prompt.fail(`Error cancelling transaction on ${config.networkName}: ${error}`)
    return (error as Error).message
  }
  return null
}

const main = async () => {
  if (argv.length < 4) {
    console.error('Usage: ts-node cancel-transaction.ts <network> <nonce> [txHash]')
    process.exit(1)
  }

  const filterNetwork = argv[2]
  const nonce = parseInt(argv[3])
  const txHash = argv.length > 4 ? argv[4] : undefined
  let configs = await getConfigs()
  if (filterNetwork) {
    configs = configs.filter(config => config.networkName === filterNetwork)
  }
  if (configs.length !== 1) {
    console.error(`Found ${configs.length} networks for ${filterNetwork}`)
    process.exit(1)
  }
  const cancelResult = await cancelTransaction(configs[0], nonce, txHash)

  // Log result
  const err = cancelResult
  if (!err) {
    console.log(`Cancelled transaction ${nonce} on ${configs[0].networkName}`)
  } else {
    console.error(`Error cancelling transaction ${nonce} on ${configs[0].networkName}: ${err.substring(0, 200)}`)
  }
}

if (require.main === module) {
  main()
    .then(() => {
      process.exit(0)
    })
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}
