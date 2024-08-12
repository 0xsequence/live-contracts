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

export type SignerEnvironment = 'dev' | 'test' | 'prod'

type SignerDetails = {
  eoa: string
  expectedAddress: string
}

const SIGNER_DETAILS: Record<SignerEnvironment, SignerDetails> = {
  dev: {
    eoa: '0x508D3586Be412e0C3888f6ae11907473b4A1A381',
    expectedAddress: '0x40D9BDFfdF9409183fD6145b3e60c7d1beFf05fd'
  },
  test: {
    eoa: '0x323Bb7d239bd5c5352b7E745A379971A0E9DB125',
    expectedAddress: '0x84156d2BeA2A480573d571741b3C3979A66ab3f3'
  },
  prod: {
    eoa: 'TODO',
    expectedAddress: 'TODO'
  }
}

const createWalletConfig = (eoa: string) => {
  return v2.coders.config.fromSimple({
    threshold: 1,
    checkpoint: 0,
    signers: [
      {
        address: eoa,
        weight: 1
      }
    ]
  })
}

/**
 * Creates the payments signer Sequence wallet.
 * This wallet is the default signer for a sequence payments contract.
 */
export const deployPaymentsSigner = async (
  signerEnv: SignerEnvironment,
  relayer: ethers.Signer,
  context: commons.context.WalletContext,
  txParams?: ethers.providers.TransactionRequest
): Promise<WalletType> => {
  const { provider } = relayer
  if (!provider) {
    throw new Error('Relayer must be connected to a provider')
  }

  const o = ora().start(`Deploying ${signerEnv} payments signer wallet`)

  const { eoa, expectedAddress } = SIGNER_DETAILS[signerEnv]

  const walletConfig = createWalletConfig(eoa)
  const address = commons.context.addressOf(context, v2.coders.config.imageHashOf(walletConfig))
  if (address !== expectedAddress) {
    throw new Error(`Payments signer address for ${signerEnv} is not correct, expected ${expectedAddress}, got ${address}`)
  }

  const localRelayer = new LocalRelayer(relayer)
  if (txParams) {
    localRelayer.setTransactionOptions(txParams)
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
    relayer: localRelayer
  })

  if (await wallet.reader().isDeployed(wallet.address)) {
    o.warn(`Already deployed ${signerEnv} payments signer wallet at ${wallet.address}`)
  } else {
    const tx = await wallet.deploy()
    if (!tx) {
      throw new Error(`Unable to deploy ${signerEnv} payments signer wallet at ${wallet.address}`)
    }
    await tx.wait()
  }

  o.succeed(`Deployed ${signerEnv} payments signer wallet at ${wallet.address}`)

  return wallet
}
