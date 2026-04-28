import { Navigate } from 'react-router-dom'

import { useAuthStore } from '@/store/authStore'

import type { RoleBasedRouteProps } from './types'

export const RoleBasedRoute = ({ children, allowedRoles }: RoleBasedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuthStore()

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  // Check if user's role is allowed
  const hasPermission = allowedRoles.includes(user.role)

  if (!hasPermission) {
    // Redirect to unauthorized page or user's default dashboard
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}
