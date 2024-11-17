import process from 'node:process'
import 'dotenv/config'
import type { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox-viem'

const { CHAIN_ID, RPC_URL, PRIVATE_KEY } = process.env

if (!CHAIN_ID || !RPC_URL || !PRIVATE_KEY) {
  throw new Error('Missing .env')
}

const config: HardhatUserConfig = {
  solidity: '0.8.27',
  networks: {
    l2: {
      chainId: parseInt(CHAIN_ID),
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
}

export default config
