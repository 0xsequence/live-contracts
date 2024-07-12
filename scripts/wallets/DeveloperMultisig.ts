import { Wallet } from '@0xsequence/wallet'
import type { ethers } from 'ethers'
import { Orchestrator } from '@0xsequence/signhub'
import { commons, v2 } from '@0xsequence/core'
import { LocalRelayer } from '@0xsequence/relayer'
import ora from 'ora'

export type WalletType = Wallet<
  v2.config.WalletConfig,
  v2.signature.Signature,
  v2.signature.UnrecoveredSignature | v2.signature.UnrecoveredChainedSignature
>

const WALLET_CONFIG = {
  threshold: 2,
  checkpoint: 0,
  signers: [
    {
      // my@horizon.io
      address: '0xF278B8e1515FBAF4F6dB5361ac1FEaE955160996',
      weight: 1
    },
    {
      // mstan@horizon.io
      address: '0x0C885789f0642CA123008F961d19C9813DA11b24',
      weight: 1
    },
    {
      // aa@horizon.io
      address: '0x857CDfb0922bd51ca873340a9325F43F1233BEB8',
      weight: 1
    },
    {
      // pc@horizon.io
      address: '0x31eabd463f98D2Da85710aB0d5AfFdC47280320C',
      weight: 1
    }
  ]
}

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

  const o = ora().start("Deploying developer multisig wallet")

  const walletConfig = v2.coders.config.fromSimple(WALLET_CONFIG)
  const address = commons.context.addressOf(context, v2.coders.config.imageHashOf(walletConfig))
  if (address !== EXPECTED_ADDRESS) {
    throw new Error('Developer multisig address is not correct')
  }

  const relayer = new LocalRelayer(signer)
  if (txParams) {
    relayer.setTransactionOptions(txParams)
  }

  const wallet = new Wallet({
    coders: {
      signature: v2.signature.SignatureCoder,
      config: v2.config.ConfigCoder
    },
    context: context,
    config: walletConfig,
    chainId: (await provider.getNetwork()).chainId,
    address,
    orchestrator: new Orchestrator([]),
    provider,
    relayer
  })

  if (await wallet.reader().isDeployed(wallet.address)) {
    o.warn(`Already deployed developer multisig wallet at ${wallet.address}`)
  } else {
    const tx = await wallet.deploy()
    if (!tx) {
      throw new Error(`Unable to deploy developer multisig wallet at ${wallet.address}`)
    }
    await tx.wait()
  }

  o.succeed(`Deployed developer multisig wallet at ${wallet.address}`)

  return wallet
}
