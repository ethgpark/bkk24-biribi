import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import config, { L1, L2 } from '../config'
import router from '../router'

const queryClient = new QueryClient()

function App() {
  return (
    <DynamicContextProvider
      settings={{
        appName: 'Biribi',
        appLogoUrl: '/biribi.png',
        environmentId: import.meta.env.VITE_DYNAMIC_ENV_ID,
        walletConnectors: [EthereumWalletConnectors],
        walletConnectPreferredChains: [
          `eip155:${L1.id}`,
          `eip155:${L2.id}`,
        ],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <RouterProvider router={router} />
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  )
}

export default App
