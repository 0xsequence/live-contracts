import type { BigNumberish } from 'ethers'
import { readFile } from 'node:fs/promises'
import { SequenceEnvironment } from './types'
import { config as dotenvConfig } from 'dotenv'

export type Config = {
  networkName: string
  rpcUrl: string
  deployerPk: string
  guardPatchSecret?: string
  paymentsSignerEnvs: SequenceEnvironment[]
  etherscanApiUrl?: string
  etherscanApiKey?: string
  blockscoutUrl?: string
  gasLimit?: BigNumberish
  gasPrice?: BigNumberish
  skipWalletContext?: boolean
  skip?: boolean // Don't deploy
  immutableFactories?: boolean
}

export const getConfigs = async (): Promise<Config[]> => {
  dotenvConfig()

  const configs = JSON.parse(await readFile('./config.json', 'utf8'))
  if (!Array.isArray(configs)) throw new Error('Invalid config')

  for (const config of configs) {
    if (!config.networkName) throw new Error('Missing networkName')
    if (!config.rpcUrl) throw new Error('Missing rpcUrl')

    if (process.env.DEPLOYER_PRIVATE_KEY) {
      // Override deployerPk in config with env var
      config.deployerPk = process.env.DEPLOYER_PRIVATE_KEY
    }
    if (!config.deployerPk) throw new Error('Missing deployerPk')

    if (!config.paymentsSignerEnvs) {
      config.paymentsSignerEnvs = ['dev', 'next', 'prod'] // Default to all
    }
  }
  return configs
}

type ResultWithNetwork<T> = { network: string; result: T }

export const perConfig = async <T, Args>(
  fn: (config: Config, args: Args) => Promise<T>,
  args: Args,
  filterNetwork?: string
): Promise<ResultWithNetwork<T>[]> => {
  let configs = await getConfigs()
  if (filterNetwork) {
    console.log(`Using ${filterNetwork} only`)
    const networkRegex = new RegExp(`^${filterNetwork}$`, 'i')
    configs = configs.filter(config => networkRegex.test(config.networkName))
  } else {
    configs = configs.filter(config => config.skip !== true)
  }
  console.log(`Using ${configs.length} networks`)

  return await Promise.all(
    configs.map(async config => ({
      network: config.networkName,
      result: await fn(config, args)
    }))
  )
}
