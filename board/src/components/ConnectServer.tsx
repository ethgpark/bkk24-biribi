import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import fetchDomain from '../api/fetchDomain'
import { Domain } from '../models/Domain'

interface ConnectServerProps {
  onClose: () => void
  onDomain: (domain: Domain) => void
}

function ConnectServer({
  onClose: close,
  onDomain: setDomain,
}: ConnectServerProps) {
  const [domainName, setDomainName] = useState('')
  const [connecting, setConnecting] = useState(false)
  const {
    data: domain,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['domain', domainName],
    queryFn: () => fetchDomain(domainName, !domainName.includes('localhost')),
    enabled: connecting,
  })

  const cancel = () => {
    setConnecting(false)
    setDomainName('')
    close()
  }

  const importServer = () => {
    setConnecting(true)
  }

  const connectServer = () => {
    if (domain == null) {
      throw new Error('Cannot connect to server that has no rooms')
    }

    domain.name = domainName

    setConnecting(false)
    setDomain(domain)
    close()
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      {!connecting && (
        <label>Domain
          <input
            type="text"
            name="domain"
            onChange={(event) => setDomainName(event.target.value)}
          />
        </label>
      )}
      {connecting && isLoading && (
        <span>Loading</span>
      )}
      {connecting && isError && (
        <span>Error</span>
      )}
      {connecting && domain != null && (
        <span>There are {domain.rooms.length} rooms in this server.</span>
      )}
      <footer>
        {!connecting && (
          <button onClick={() => importServer()}>Next</button>
        )}
        {connecting && domain != null && (
          <button onClick={() => connectServer()}>Connect</button>
        )}
        <a onClick={() => cancel()}>Cancel</a>
      </footer>
    </form>
  )
}

export default ConnectServer
