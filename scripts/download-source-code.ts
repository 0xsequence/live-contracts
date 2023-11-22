import axios from 'axios';
import fs from 'fs';

async function downloadJsonFromApi(apiUrl: string, outputFile: string): Promise<void> {
  try {
    const response = await axios.get(apiUrl)
    if (response.status !== 200) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const jsonData = response.data.result[0].SourceCode
    const cleanedJsonData = jsonData.slice(1, -1) // Fix formatting
    const parsedJsonData = JSON.parse(cleanedJsonData)

    fs.writeFileSync(outputFile, JSON.stringify(parsedJsonData, null, 2))

    console.log(`JSON data downloaded and saved to ${outputFile}`)
  } catch (error) {
    console.error(`Error downloading or saving JSON data: ${error}`)
  }
}

//FIXME Change these values to match your contract
const verifierApiUrl = 'https://api-sepolia.etherscan.io/api'
const verifierApiKey = 'XXX'
const addr = '0x105430acDFE0bf65cD0331DFc2FB2420Ace73895'

const outputFile = 'output.json'
const apiUrl = `${verifierApiUrl}?module=contract&action=getsourcecode&apikey=${verifierApiKey}&address=${addr}`

downloadJsonFromApi(apiUrl, outputFile);
