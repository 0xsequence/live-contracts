import { BigNumberish } from 'ethers'
import { readFile } from 'fs/promises'

export type Config = {
  networkName: string
  rpcUrl: string
  deployerPk: string
  guardPatchSecret?: string
  verifierApiUrl?: string
  verifierApiKey?: string
  gasLimit?: BigNumberish
  gasPrice?: BigNumberish
  skipWalletContext?: boolean
  skip?: boolean // Don't deploy
}

export const getConfigs = async (): Promise<Config[]> => {
  const configs = JSON.parse(await readFile('./config.json', 'utf8'))
  if (!Array.isArray(configs)) throw new Error('Invalid config')
  for (const config of configs) {
    if (!config.networkName) throw new Error('Missing networkName')
    if (!config.rpcUrl) throw new Error('Missing rpcUrl')
    if (!config.deployerPk) throw new Error('Missing deployerPk')
  }
  return configs
}
