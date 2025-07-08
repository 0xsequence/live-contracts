import { Wallet } from '@0xsequence/wallet'
import { BigNumber, type ethers } from 'ethers'
import { Orchestrator } from '@0xsequence/signhub'
import { commons, v2 } from '@0xsequence/core'
import { LocalRelayer } from '@0xsequence/relayer'
import { subDigestOf } from '@0xsequence/utils'
import ora from 'ora'

export type WalletType = Wallet<
  v2.config.WalletConfig,
  v2.signature.Signature,
  v2.signature.UnrecoveredSignature | v2.signature.UnrecoveredChainedSignature
>

const V1_SIGNERS = [
  '0xF278B8e1515FBAF4F6dB5361ac1FEaE955160996',
  '0x0C885789f0642CA123008F961d19C9813DA11b24',
  '0x857CDfb0922bd51ca873340a9325F43F1233BEB8',
  '0x31eabd463f98D2Da85710aB0d5AfFdC47280320C'
]

const V2_SIGNERS = [
  '0x857CDfb0922bd51ca873340a9325F43F1233BEB8', // aa@horizon.io
  '0x0C885789f0642CA123008F961d19C9813DA11b24', // mstan@horizon.io
  '0xE5F90DF2B653B37b97f6525Fb08A3D88Ab7b8480', // pk@horizon.io
  '0xEB5EeE1F1650b821E0d3a87C1341d85b3a16EA72' // tpin@horizon.io
]

const makeWalletConfig = (signers: string[], checkpoint: number) => ({
  threshold: 2,
  checkpoint,
  signers: signers.map(address => ({
    address,
    weight: 1
  }))
})

const WALLET_CONFIG_V1 = makeWalletConfig(V1_SIGNERS, 0)
const WALLET_CONFIG_V2 = makeWalletConfig(V2_SIGNERS, 1)

const UPDATE_NONCE = BigNumber.from('0x019562960be2000000000000000000000000')
const WALLET_CONFIG_V2_SIGNATURE_PARTS = new Map([
  [
    '0x0C885789f0642CA123008F961d19C9813DA11b24',
    {
      signature:
        '0x532f9f3ec8ea00bb50f796a1dfc6527cee327da81b1c83604eee9df0e63324135b0557560e3865ec30bd45d6d65ab15739a19ae9b25fdce775e0a6a079679db21b02',
      isDynamic: false
    }
  ],
  [
    '0x857CDfb0922bd51ca873340a9325F43F1233BEB8',
    {
      signature:
        '0xab1aa550998c44021cc2aae569425cf5d41dc35c641db0802f658a5752c073bf01bba1a4d6b1dfb97c0f2fceb50ad607a889b38a18851fa27097d2f938749ff11b02',
      isDynamic: false
    }
  ]
])

const EXPECTED_ADDRESS = '0x007a47e6BF40C1e0ed5c01aE42fDC75879140bc4'

/**
 * Creates the developer multisig Sequence wallet.
 * This wallet is the owner of Sequence managed contracts, such as Builder Factory contracts.
 * The signers of this multisig wallet are Sequence developers.
 */
export const deployDeveloperMultisig = async (
  signer: ethers.Signer,
  context: commons.context.WalletContext,
  txParams?: ethers.providers.TransactionRequest
): Promise<WalletType> => {
  const { provider } = signer
  if (!provider) {
    throw new Error('Signer must be connected to a provider')
  }

  const o = ora().start('Deploying developer multisig wallet')

  const walletConfig = v2.coders.config.fromSimple(WALLET_CONFIG_V1)
  const imageHash = v2.coders.config.imageHashOf(walletConfig)
  const address = commons.context.addressOf(context, imageHash)
  if (address !== EXPECTED_ADDRESS) {
    throw new Error('Developer multisig address is not correct')
  }

  const relayer = new LocalRelayer(signer)
  if (txParams) {
    relayer.setTransactionOptions(txParams)
  }

  const chainId = (await provider.getNetwork()).chainId

  const wallet = new Wallet({
    coders: {
      signature: v2.signature.SignatureCoder,
      config: v2.config.ConfigCoder
    },
    context: context,
    config: walletConfig,
    chainId,
    address,
    orchestrator: new Orchestrator([]),
    provider,
    relayer
  })

  if (await wallet.reader().isDeployed(wallet.address)) {
    o.warn(`Already deployed developer multisig wallet at ${wallet.address}`)
  } else {
    const deployTx = await wallet.buildDeployTransaction()
    if (!deployTx) {
      throw new Error(`Unable to build deploy transaction for developer multisig wallet at ${wallet.address}`)
    }
    const txContent = deployTx.transactions[0]
    const tx = await signer.sendTransaction({
      to: txContent.to,
      data: txContent.data,
      gasLimit: txParams?.gasLimit,
      gasPrice: txParams?.gasPrice
    })
    // const tx = await wallet.deploy()
    if (!tx) {
      throw new Error(`Unable to deploy developer multisig wallet at ${wallet.address}`)
    }
    await tx.wait()
    o.info(`Deployed developer multisig wallet at ${wallet.address}`)
  }

  await updateDeveloperMultisig(wallet, o)

  o.succeed(`Deployed and updated developer multisig wallet at ${wallet.address}`)

  return wallet
}

const updateDeveloperMultisig = async (wallet: WalletType, o: ora.Ora): Promise<WalletType> => {
  const configV2 = v2.coders.config.fromSimple(WALLET_CONFIG_V2)
  const imageHash = v2.coders.config.imageHashOf(configV2)

  // Check current image hash on chain
  const currentImageHash = await wallet.reader().imageHash(wallet.address)
  if (currentImageHash === imageHash) {
    o.info('Developer multisig already updated')
    wallet.setConfig(configV2)
    return wallet
  }

  const transactions = [
    {
      to: wallet.address,
      data: `0x29561426${imageHash.slice(2)}`,
      gasLimit: 0,
      delegateCall: false,
      revertOnError: true,
      value: 0
    }
  ]
  const digest = commons.transaction.digestOfTransactions(UPDATE_NONCE, transactions)
  const subdigest = subDigestOf(wallet.address, 0, digest)

  const signature = v2.coders.signature.encodeSigners(wallet.config, WALLET_CONFIG_V2_SIGNATURE_PARTS, [subdigest], 0).encoded

  const bundle: commons.transaction.SignedTransactionBundle = {
    intent: {
      id: subdigest,
      wallet: wallet.address
    },
    chainId: wallet.chainId,
    transactions,
    entrypoint: wallet.address,
    nonce: UPDATE_NONCE,
    signature
  }

  const tx = await wallet.sendSignedTransaction(bundle)
  if (!tx) {
    throw new Error(`Unable to build update configuration transaction for developer multisig wallet at ${wallet.address}`)
  }
  await tx.wait()

  wallet.setConfig(configV2)
  return wallet
}
