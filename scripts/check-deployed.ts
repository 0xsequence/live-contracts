import { JsonRpcProvider } from '@ethersproject/providers'
import { argv } from 'node:process'
import { Config, perConfig } from './config'

// Check if a contract is deployed on a network
export const checkDeployed = async (config: Config, address: string): Promise<boolean> => {
  try {
    const provider = new JsonRpcProvider({
      url: config.rpcUrl,
      timeout: 60000
    })
    return (await provider.getCode(address)) !== '0x'
  } catch (error) {
    console.error(`Error checking ${address} on ${config.networkName}`)
    console.error(error)
    return false
  }
}

const main = async () => {
  if (argv.length <= 2) {
    console.error('Please provide an address to check')
    process.exit(1)
  }

  const deployments = await perConfig(checkDeployed, argv[2])
  for (const { network, result } of deployments) {
    console.log(`- [${result ? 'X' : ' '}] ${network}`)
  }
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
