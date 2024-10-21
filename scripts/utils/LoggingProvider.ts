import { Logger } from '@0xsequence/solidity-deployer'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ConnectionInfo } from 'ethers/lib/utils'
import { Networkish } from '@ethersproject/networks'

export class LoggingProvider extends JsonRpcProvider {
  constructor(
    private logger: Logger | null,
    url?: ConnectionInfo | string,
    network?: Networkish
  ) {
    super(url, network)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  perform(method: string, params: any): Promise<any> {
    this.logger?.log(`>>> ${method} ${JSON.stringify(params)}`)
    return super.perform(method, params).then(result => {
      this.logger?.log(`<<< ${method} ${JSON.stringify(result)}`)
      return result
    })
  }
}
