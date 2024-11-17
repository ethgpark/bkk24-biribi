import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

interface ErrorPageProps {
}

function ErrorPage({}: ErrorPageProps) {
  const error = useRouteError()

  let message = 'An unexpected error has occurred'

  if (error instanceof Error) {
    message = error.message
  }
  if (isRouteErrorResponse(error)) {
    message = error.statusText
  }

  return (
    <div className="center">
      <p>{message}</p>
    </div>
  )
}

export default ErrorPage
