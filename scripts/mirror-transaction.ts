import { ethers } from 'ethers'

export const mirrorTransaction = async (
  signer: ethers.Signer,
  expected: string,
  to: string,
  data: string,
  txParams?: ethers.providers.TransactionRequest
): Promise<{ address: string; deployed: boolean }> => {
  const code = await signer.provider?.getCode(expected)
  if (code !== '0x' && code !== '') {
    return { address: expected, deployed: false }
  }

  const tx = await signer.sendTransaction({ to, data, ...txParams })
  await tx.wait()

  const code2 = await signer.provider?.getCode(to)
  if (code2 === '0x' || code2 === '') {
    throw new Error(`Mirror transaction failed to deploy ${expected}`)
  }

  return { address: to, deployed: true }
}
