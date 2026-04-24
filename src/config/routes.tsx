import { UserRole } from '@/types/auth'

/**
 * Route configuration with role-based access control
 * 
 * - Public routes: accessible by anyone
 * - Guest routes: only for non-authenticated users (login, register)
 * - Protected routes: require authentication
 * - Role-based routes: require specific roles
 */

export const PUBLIC_ROUTES = {
  HOME: '/',
  TESTS: '/tests',
  PACKAGES: '/packages',
  AMBULANCE: '/ambulance',
  MEDICINE: '/medicine',
  DOCTOR: '/doctor',
  REMINDER: '/reminder',
  PHYSIOTHERAPY: '/physiotherapy',
  HOME_NURSE: '/home-nurse',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy-policy',
  TERMS: '/terms-conditions',
} as const

export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_OTP: '/verify-otp',
  RESET_PASSWORD: '/reset-password/:token',
} as const

export const PATIENT_ROUTES = {
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  BOOKINGS: '/bookings',
  BOOKING_DETAIL: '/bookings/:id',
  MEDICAL_RECORDS: '/medical-records',
  PRESCRIPTIONS: '/prescriptions',
  REPORTS: '/reports',
  CONSULTATIONS: '/consultations',
  PAYMENTS: '/payments',
} as const

export const DOCTOR_ROUTES = {
  DASHBOARD: '/doctor/dashboard',
  PROFILE: '/doctor/profile',
  APPOINTMENTS: '/doctor/appointments',
  PATIENTS: '/doctor/patients',
  CONSULTATIONS: '/doctor/consultations',
  AVAILABILITY: '/doctor/availability',
} as const

export const NURSE_ROUTES = {
  DASHBOARD: '/nurse/dashboard',
  PROFILE: '/nurse/profile',
  ASSIGNMENTS: '/nurse/assignments',
  SCHEDULE: '/nurse/schedule',
} as const

export const ADMIN_ROUTES = {
  DASHBOARD: '/admin/dashboard',
  USERS: '/admin/users',
  BOOKINGS: '/admin/bookings',
  SERVICES: '/admin/services',
  PACKAGES: '/admin/packages',
  ANALYTICS: '/admin/analytics',
} as const

export const SUPER_ADMIN_ROUTES = {
  DASHBOARD: '/super-admin/dashboard',
  SYSTEM: '/super-admin/system',
  ROLES: '/super-admin/roles',
  LOGS: '/super-admin/logs',
  BACKUPS: '/super-admin/backups',
} as const

// Role-based route access configuration
export const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
  // Patient routes
  [PATIENT_ROUTES.DASHBOARD]: [UserRole.PATIENT, UserRole.ADMIN, UserRole.SUPER_ADMIN],
  [PATIENT_ROUTES.PROFILE]: [UserRole.PATIENT, UserRole.DOCTOR, UserRole.NURSE, UserRole.ADMIN, UserRole.SUPER_ADMIN],
  [PATIENT_ROUTES.BOOKINGS]: [UserRole.PATIENT, UserRole.ADMIN, UserRole.SUPER_ADMIN],
  
  // Doctor routes
  [DOCTOR_ROUTES.DASHBOARD]: [UserRole.DOCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN],
  [DOCTOR_ROUTES.APPOINTMENTS]: [UserRole.DOCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN],
  
  // Nurse routes
  [NURSE_ROUTES.DASHBOARD]: [UserRole.NURSE, UserRole.ADMIN, UserRole.SUPER_ADMIN],
  [NURSE_ROUTES.ASSIGNMENTS]: [UserRole.NURSE, UserRole.ADMIN, UserRole.SUPER_ADMIN],
  
  // Admin routes
  [ADMIN_ROUTES.DASHBOARD]: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  [ADMIN_ROUTES.USERS]: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  [ADMIN_ROUTES.ANALYTICS]: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  
  // Super Admin only routes
  [SUPER_ADMIN_ROUTES.DASHBOARD]: [UserRole.SUPER_ADMIN],
  [SUPER_ADMIN_ROUTES.SYSTEM]: [UserRole.SUPER_ADMIN],
  [SUPER_ADMIN_ROUTES.ROLES]: [UserRole.SUPER_ADMIN],
  [SUPER_ADMIN_ROUTES.LOGS]: [UserRole.SUPER_ADMIN],
  [SUPER_ADMIN_ROUTES.BACKUPS]: [UserRole.SUPER_ADMIN],
}

// Helper function to check if a route requires authentication
export const isProtectedRoute = (path: string): boolean => {
  return Object.keys(ROUTE_PERMISSIONS).some((route) => path.startsWith(route))
}

// Helper function to check if user has access to a route
export const hasRouteAccess = (path: string, userRole: UserRole): boolean => {
  const allowedRoles = ROUTE_PERMISSIONS[path]
  if (!allowedRoles) return true // Public route
  return allowedRoles.includes(userRole)
}

// Get default dashboard route for a user role
export const getDefaultDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case UserRole.PATIENT:
      return PATIENT_ROUTES.DASHBOARD
    case UserRole.DOCTOR:
      return DOCTOR_ROUTES.DASHBOARD
    case UserRole.NURSE:
      return NURSE_ROUTES.DASHBOARD
    case UserRole.ADMIN:
      return ADMIN_ROUTES.DASHBOARD
    case UserRole.SUPER_ADMIN:
      return SUPER_ADMIN_ROUTES.DASHBOARD
    default:
      return PUBLIC_ROUTES.HOME
  }
}
