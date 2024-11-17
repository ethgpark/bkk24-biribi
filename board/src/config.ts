import { defineChain } from 'viem'
import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'

const scrollDevnet = defineChain({
  id: 2_227_728,
  name: 'Scroll Devnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://l1sload-rpc.scroll.io'],
      webSocket: ['wss://l1sload-rpc.scroll.io'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://l1sload-blockscout.scroll.io' },
  },
  contracts: {
    l1sload: {
      address: '0x0000000000000000000000000000000000000101',
    },
    l1blocks: {
      address: '0x5300000000000000000000000000000000000001',
    },
  },
})

const config = createConfig({
  multiInjectedProviderDiscovery: false,
  chains: [sepolia, scrollDevnet],
  transports: {
    [sepolia.id]: http(),
    [scrollDevnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const L1 = sepolia
export const L2 = scrollDevnet

export default config
