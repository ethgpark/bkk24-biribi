import { createRoot } from 'react-dom/client'
import Modal from 'react-modal'
import './styles/index.css'
import App from './app/App.tsx'

Modal.setAppElement('#root')

createRoot(document.getElementById('root')!).render(<App />)
