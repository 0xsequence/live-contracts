import { BigNumber, ethers } from 'ethers'
import ora from 'ora'

// Note v2 contracts are deployed with the Singleton Factory

const singletonFactoryFactory = {
  address: '0xce0042B868300000d44A59004Da54A005ffdcf9f',
  abi: [
    {
      constant: false,
      inputs: [
        {
          internalType: 'bytes',
          type: 'bytes'
        },
        {
          internalType: 'bytes32',
          type: 'bytes32'
        }
      ],
      name: 'deploy',
      outputs: [
        {
          internalType: 'address payable',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
}
const singletonFactoryDeployTx =
  '0xf9016c8085174876e8008303c4d88080b90154608060405234801561001057600080fd5b50610134806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80634af63f0214602d575b600080fd5b60cf60048036036040811015604157600080fd5b810190602081018135640100000000811115605b57600080fd5b820183602082011115606c57600080fd5b80359060200191846001830284011164010000000083111715608d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550509135925060eb915050565b604080516001600160a01b039092168252519081900360200190f35b6000818351602085016000f5939250505056fea26469706673582212206b44f8a82cb6b156bfcc3dc6aadd6df4eefd204bc928a4397fd15dacf6d5320564736f6c634300060200331b83247000822470'
const singletonFactoryDeployer = '0xBb6e024b9cFFACB947A71991E386681B1Cd1477D'

export const deployWithSingletonFactory = async <T extends ethers.ContractFactory>(
  signer: ethers.Signer,
  contractAlias: string,
  contract: new (...args: [signer: ethers.Signer]) => T,
  ...args: Parameters<T['deploy']>
): Promise<ethers.Contract> => {
  if (!signer.provider) throw new Error('Signer must be connected to a provider')
  const { provider } = signer
  let o = ora()

  const singletonFactory = new ethers.Contract(singletonFactoryFactory.address, singletonFactoryFactory.abi, signer)

  // Build contract data
  const c = new contract(signer)
  const { data } = c.getDeployTransaction(...args)
  if (!data) {
    throw new Error(`no data for ${contractAlias}`)
  }
  const address = ethers.utils.getAddress(
    ethers.utils.hexDataSlice(
      ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ['bytes1', 'address', 'bytes32', 'bytes32'],
          ['0xff', singletonFactory.address, ethers.constants.HashZero, ethers.utils.keccak256(data)]
        )
      ),
      12
    )
  )

  // Check deployed
  if (ethers.utils.arrayify(await provider.getCode(address)).length > 0) {
    o.warn(`ALREADY DEPLOYED: ${contractAlias}`)
    return c.attach(address)
  }

  // Deploy singleton factory if required
  if (ethers.utils.arrayify(await provider.getCode(singletonFactory.address)).length <= 2) {
    o = ora().start(`Deploying singleton factory`)
    // Deploy singleton deployer
    const deployerBal = BigNumber.from('24700000000000000')
    if ((await provider.getBalance(singletonFactoryDeployer)).lt(deployerBal)) {
      o.info('Funding singleton factory deployer')
      const tx = await signer.sendTransaction({
        to: singletonFactoryDeployer,
        value: deployerBal
      })
      await tx.wait()
      o.info('Funded. Deploying singleton factory')
    }
    const tx = await provider.sendTransaction(singletonFactoryDeployTx)
    await tx.wait()
    o.succeed(`Deployed singleton factory`)
  }

  // Do deployment
  o = ora().start(`Deploying ${contractAlias}`)

  const maxGasLimit = await provider.getBlock('latest').then(b => b.gasLimit.mul(4).div(10))

  const tx = await singletonFactory.deploy(data, ethers.constants.HashZero, { gasLimit: maxGasLimit })
  await tx.wait()

  // Double check
  if (ethers.utils.arrayify(await provider.getCode(address)).length === 0) {
    throw new Error(`Failed to deploy ${contractAlias}`)
  }

  o.succeed(`Deployed ${contractAlias} at ${address}`)

  return c.attach(address)
}
