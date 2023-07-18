import { UniversalDeployer } from '@0xsequence/deployer'
import { ethers } from 'ethers'

// Note v1 contracts are deployed with the Universal Deployer

export const deployWithUniversalDeployer = async <T extends ethers.ContractFactory>(
  signer: ethers.Signer,
  contractAlias: string,
  contractFactory: new (signer: ethers.Signer) => T,
  ...args: Parameters<T['deploy']>
): Promise<ethers.Contract> => {
  if (!signer.provider) throw new Error('Signer must be connected to a provider')
  const { provider } = signer

  const universalDeployer = new UniversalDeployer('', provider as ethers.providers.JsonRpcProvider)
  const txParams = {
    // gasLimit: BigNumber.from(7500000),
    gasLimit: await provider.getBlock('latest').then(b => b.gasLimit.mul(4).div(10))
    // gasPrice: BigNumber.from(10).pow(8).mul(16)
  }

  return universalDeployer.deploy(contractAlias, contractFactory, txParams, undefined, ...args)
}
