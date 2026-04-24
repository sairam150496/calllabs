import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

import { Button } from '@/components/atoms/Button'
import { PUBLIC_ROUTES } from '@/config/routes'

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to={PUBLIC_ROUTES.HOME}>
          <Button variant="primary" size="lg" leftIcon={<Home className="h-5 w-5" />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

NotFound.displayName = 'NotFound'
