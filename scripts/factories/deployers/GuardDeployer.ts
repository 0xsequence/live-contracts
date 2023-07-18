import { Contract, ethers } from 'ethers'
import ora from 'ora'

export const deployGuard = async (
  factory: Contract,
  guardAlias: string,
  guardAddr: string,
  mainModuleAddr: string,
  salt: string
): Promise<void> => {
  if (!factory.hasOwnProperty('deploy')) throw new Error('Factory must have a deploy method')
  if (!factory.signer.provider) throw new Error('Signer must be connected to a provider')
  const { provider } = factory.signer

  const o = ora().start(`Deploying ${guardAlias}`)

  if (ethers.utils.arrayify(await provider.getCode(guardAddr)).length > 0) {
    o.warn(`ALREADY DEPLOYED: ${guardAlias}`)
    return
  }

  const txParams = {
    // gasLimit: BigNumber.from(7500000),
    gasLimit: await provider.getBlock('latest').then(b => b.gasLimit.mul(4).div(10))
    // gasPrice: BigNumber.from(10).pow(8).mul(16)
  }
  const tx = await factory.deploy(mainModuleAddr, salt, txParams)
  await tx.wait()

  // Double check
  if (ethers.utils.arrayify(await provider.getCode(guardAddr)).length === 0) {
    throw new Error(`Failed to deploy ${guardAlias}`)
  }

  o.succeed(`Deployed ${guardAlias} at ${guardAddr}`)
}
