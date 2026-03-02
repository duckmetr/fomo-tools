import axios from 'axios'

const apiHash = 'dbd3310133bdd46d6fe59bb52817005d'
const apiKey = 'cfded29b5bde95f37f9e39c753983677c2dd6210177d76360d8524944c70d8dd'
const apiTime = '1771005203'

export const api = axios.create({
  baseURL: 'https://api.fomofighters.xyz',
  headers: {
    accept: '*/*',
    'accept-language': 'uk,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
    'api-hash': apiHash,
    'api-key': apiKey,
    'api-time': apiTime,
    'content-type': 'application/json',
    'is-beta-server': 'null',
    priority: 'u=1, i'
    // 'sec-ch-ua':
    //   '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144", "Microsoft Edge WebView2";v="144"',
    // 'sec-ch-ua-mobile': '?0',
    // 'sec-ch-ua-platform': '"Windows"',
    // 'sec-fetch-dest': 'empty',
    // 'sec-fetch-mode': 'cors',
    // 'sec-fetch-site': 'same-site',
    // Referer: 'https://game.fomofighters.xyz/'
  }
})
