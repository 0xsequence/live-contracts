import { Guard } from '@0xsequence/guard'
import { Contract, ethers } from 'ethers'
import ora from 'ora'

export const deployGuard = async (
  factory: Contract,
  guardEnv: 'prod' | 'dev',
  guardVersion: number,
  guardAddr: string,
  mainModuleAddr: string,
  salt: string,
  secret?: string,
  txParams?: ethers.providers.TransactionRequest
): Promise<void> => {
  const guardAlias = `${guardEnv} guard v${guardVersion}`

  if (!factory.hasOwnProperty('deploy')) throw new Error('Factory must have a deploy method')

  const { signer } = factory
  if (!signer) throw new Error('Factory must be connected to a signer')
  const { provider } = signer
  if (!provider) throw new Error('Signer must be connected to a provider')

  const o = ora().start(`Deploying ${guardAlias}`)

  if (ethers.utils.arrayify(await provider.getCode(guardAddr)).length > 0) {
    o.warn(`ALREADY DEPLOYED: ${guardAlias}`)
  } else {
    const params = {
      // gasLimit: BigNumber.from(7500000),
      gasLimit: await provider.getBlock('latest').then(b => b.gasLimit.mul(4).div(10)),
      // gasPrice: BigNumber.from(10).pow(8).mul(16),
      ...txParams
    }
    const tx = await factory.deploy(mainModuleAddr, salt, params)
    await tx.wait()

    // Double check
    if (ethers.utils.arrayify(await provider.getCode(guardAddr)).length === 0) {
      throw new Error(`Failed to deploy ${guardAlias}`)
    }
  }

  if (secret) {
    try {
      const externalImageHash = await provider.call({ to: guardAddr, data: ethers.utils.hexDataSlice(ethers.utils.keccak256(ethers.utils.toUtf8Bytes('externalImageHash()')), 0, 4) })

      if (externalImageHash === '0x') {
        const guard = new Guard(`https://${guardEnv === 'prod' ? 'guard' : 'dev-guard'}.sequence.app`, global.fetch)

        const { txs } = await guard.patch({
          signer: guardAddr,
          chainId: (await provider.getNetwork()).chainId,
          secret
        })

        const response = await signer.sendTransaction(txs)

        const receipt = await response.wait()

        o.info(`Migrated ${guardAlias} to dual image hash implementation in transaction ${receipt.transactionHash}`)
      } else {
        o.warn(`ALREADY MIGRATED: ${guardAlias}`)
      }
    } catch (error) {
      o.warn(`UNSURE IF ALREADY MIGRATED: ${error}`)
    }
  }

  o.succeed(`Deployed ${guardAlias} at ${guardAddr}`)
}
