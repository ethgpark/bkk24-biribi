import { createBrowserRouter } from 'react-router-dom'
import Layout from './app/Layout'
import ErrorPage from './app/ErrorPage'
import HomePage from './app/HomePage'
import Rooms from './app/Rooms'
import Room from './app/Room'

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/rooms',
        element: <Rooms />,
      },
      {
        path: '/room/:domain/:id',
        element: <Room />,
      },
    ],
  },
])

export default router
