import { Table } from '../models/Table'
import { Room } from '../models/Room'
import { Domain } from '../models/Domain'

function isTable(data: unknown): data is Table {
  return (
    data != null &&
    typeof data === 'object' &&
    'game' in data &&
    data.game != null &&
    typeof data.game === 'string' &&
    'address' in data &&
    data.address != null &&
    typeof data.address === 'string' &&
    data.address.startsWith('0x')
  )
}

function isRoom(data: unknown): data is Room {
  return (
    data != null &&
    typeof data === 'object' &&
    'id' in data &&
    data.id != null &&
    typeof data.id === 'string' &&
    'forum' in data &&
    data.forum != null &&
    typeof data.forum === 'number' &&
    'tables' in data &&
    data.tables != null &&
    Array.isArray(data.tables) &&
    data.tables.every(isTable)
  )
}

function isDomain(data: unknown): data is Omit<Domain, 'name'> {
  return (
    data != null &&
    typeof data === 'object' &&
    'rooms' in data &&
    data.rooms != null &&
    Array.isArray(data.rooms) &&
    data.rooms.every(isRoom)
  )
}

async function fetchDomain(domain: string, ssl: boolean): Promise<Domain> {
  const response = await fetch(`http${ssl ? 's' : ''}://${domain}/`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error(`Cannot fetch domain ${domain}${ssl ? ' (SSL on)' : ''}`)
  }

  const body: unknown = await response.json()

  if (!isDomain(body)) {
    throw new Error(`Domain response is malformed`)
  }

  return {
    name: domain,
    ...body,
  }
}

export default fetchDomain
