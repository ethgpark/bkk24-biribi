import { ReactNode } from 'react'
import { useAccount } from 'wagmi'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core'

interface AuthenticatedProps {
  children: ReactNode
}

function Authenticated({ children }: AuthenticatedProps) {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="center">
        <DynamicWidget />
      </div>
    )
  }

  return children
}

export default Authenticated
