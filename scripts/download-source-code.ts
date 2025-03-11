import axios from 'axios'
import fs from 'node:fs'

type ApiAction = 'getsourcecode' | 'getabi'

async function downloadJsonFromApi(
  apiUrlBase: string,
  apiKey: string,
  contractAddr: string,
  action: ApiAction,
  outputFile: string
): Promise<void> {
  const apiUrl = `${apiUrlBase}?module=contract&action=${action}&apikey=${apiKey}&address=${contractAddr}`
  try {
    const response = await axios.get(apiUrl)
    if (response.status !== 200) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    let parsedJsonData: unknown
    if (action === 'getsourcecode') {
      const jsonData = response.data.result[0].SourceCode
      const cleanedJsonData = jsonData.slice(1, -1) // Fix formatting
      parsedJsonData = JSON.parse(cleanedJsonData)
    } else if (action === 'getabi') {
      const jsonData = response.data.result
      parsedJsonData = JSON.parse(jsonData)
    }

    fs.writeFileSync(outputFile, JSON.stringify(parsedJsonData, null, 2))

    console.log(`JSON data downloaded and saved to ${outputFile}`)
  } catch (error) {
    console.error(`Error downloading or saving JSON data: ${error}`)
  }
}

//FIXME Change these values to match your contract
const etherscanApiUrl = 'https://api-amoy.polygonscan.com/api'
const etherscanApiKey = 'XXX'
const addr = '0xfE35E34a6FC1B90B3175B077aF6824276989ce77'

downloadJsonFromApi(etherscanApiUrl, etherscanApiKey, addr, 'getsourcecode', 'source_output.json')
downloadJsonFromApi(etherscanApiUrl, etherscanApiKey, addr, 'getabi', 'source_abi.json')
