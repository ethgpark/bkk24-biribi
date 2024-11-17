import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Domain } from '../models/Domain'
import Modal from '../components/Modal'
import RoomTableCounts from '../components/RoomTableCounts'
import ConnectServer from '../components/ConnectServer'

interface RoomsProps {
}

function Rooms({}: RoomsProps) {
  const [connect, setConnect] = useState(false)
  const [domain, setDomain] = useState<Domain | null>(null)

  return (
    <>
      <main>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tables</th>
              <th>Capacity</th>
            </tr>
          </thead>
          {domain != null && domain.rooms.length > 0 && (
            <tbody className="clickable">
              {domain.rooms.map((room) => (
                <tr id={room.id}>
                  <td className="room-id">
                    <Link to={`/room/${domain.name}/${room.id}`}>{room.id}</Link>
                  </td>
                  <td>
                    <Link to={`/room/${domain.name}/${room.id}`}>
                      <RoomTableCounts room={room} />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/room/${domain.name}/${room.id}`}>0/{room.forum}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
          {(domain == null || domain.rooms.length === 0) && (
            <tbody>
              <tr>
                <td colSpan={3}>
                  There are no game rooms available,<br />
                  connect to a server to start.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </main>
      <footer>
        <Modal isOpen={connect}>
          <ConnectServer
            onClose={() => setConnect(false)}
            onDomain={(domain) => setDomain(domain)}
          />
        </Modal>
        <button onClick={() => setConnect(true)}>Connect</button>
      </footer>
    </>
  )
}

export default Rooms
