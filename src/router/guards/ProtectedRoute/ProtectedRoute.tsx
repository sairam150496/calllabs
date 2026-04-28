import { Navigate, useLocation } from 'react-router-dom'

import { useAuthStore } from '@/store/authStore'

import type { ProtectedRouteProps } from './types'

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthStore()
  const location = useLocation()

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  // If not authenticated, redirect to login and save the intended destination
  if (!isAuthenticated) {
    // Save the current location to redirect back after login
    sessionStorage.setItem('redirect_after_login', location.pathname)
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
