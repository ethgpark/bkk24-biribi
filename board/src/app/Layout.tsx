import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import { Outlet } from 'react-router-dom'

interface LayoutProps {
}

function Layout({}: LayoutProps) {
  return (
    <>
      <header>
        <h1>Biribi</h1>
        <DynamicWidget />
      </header>
      <Outlet />
    </>
  )
}

export default Layout
