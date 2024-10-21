import { JsonRpcProvider } from '@ethersproject/providers'
import { argv } from 'node:process'
import { Config, perConfig } from './config'
import { BigNumber, ethers } from 'ethers'

type FundsResult = {
  signer: string
  funds: BigNumber
}

// Get the funds of the signer on a given network
export const checkFunds = async (config: Config): Promise<FundsResult | undefined> => {
  try {
    const provider = new JsonRpcProvider({
      url: config.rpcUrl,
      timeout: 60000
    })
    const signer = new ethers.Wallet(config.deployerPk, provider)
    const funds = await signer.getBalance()
    return {
      funds,
      signer: signer.address
    }
  } catch (error) {
    console.error(`Error checking funds on ${config.networkName}`)
    console.error(error)
  }
}

const main = async () => {
  const filterNetwork = argv.length > 2 ? argv[2] : undefined
  const funds = await perConfig(checkFunds, undefined, filterNetwork)
  const longestName = funds.reduce((max, { network }) => Math.max(max, network.length), 0) + 1
  for (const { network, result } of funds) {
    const nameLength = network.length
    if (result === undefined) {
      console.log(`- ${network}${' '.repeat(longestName - nameLength)}Error`)
    } else {
      console.log(
        `- ${network}${' '.repeat(longestName - nameLength)}${result.signer} ${ethers.utils.formatEther(result.funds)} ethers`
      )
    }
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
