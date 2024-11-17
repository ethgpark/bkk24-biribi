import { useNavigate } from 'react-router-dom'

interface HomePageProps {}

function HomePage({}: HomePageProps) {
  const navigate = useNavigate()

  return (
    <div className="center">
      <button onClick={() => navigate('/rooms')}>Get Started</button>
    </div>
  )
}

export default HomePage
