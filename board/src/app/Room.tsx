import { useParams } from 'react-router-dom'

interface RoomProps {
}

function Room({}: RoomProps) {
  const { domain, id } = useParams()

  return (
    <>
    </>
  )
}

export default Room
