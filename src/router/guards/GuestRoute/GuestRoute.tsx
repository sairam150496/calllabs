import { Navigate } from 'react-router-dom'

import { useAuthStore } from '@/store/authStore'
import { UserRole } from '@/types/auth'

import type { GuestRouteProps } from './types'

// Helper to get default dashboard based on role
const getDefaultDashboard = (role: UserRole): string => {
  switch (role) {
    case UserRole.PATIENT:
      return '/dashboard'
    case UserRole.DOCTOR:
      return '/doctor/dashboard'
    case UserRole.NURSE:
      return '/nurse/dashboard'
    case UserRole.ADMIN:
      return '/admin/dashboard'
    case UserRole.SUPER_ADMIN:
      return '/super-admin/dashboard'
    default:
      return '/'
  }
}

export const GuestRoute = ({ children }: GuestRouteProps) => {
  const { isAuthenticated, user } = useAuthStore()

  // If already authenticated, redirect to appropriate dashboard
  if (isAuthenticated && user) {
    const redirectTo = sessionStorage.getItem('redirect_after_login') || getDefaultDashboard(user.role)
    sessionStorage.removeItem('redirect_after_login')
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}
