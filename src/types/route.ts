import type { UserRole } from './auth'

export interface RouteConfig {
  path: string
  element: React.ComponentType
  isProtected?: boolean
  allowedRoles?: UserRole[]
  redirectIfAuthenticated?: boolean
  children?: RouteConfig[]
}

export interface NavigationItem {
  label: string
  path: string
  icon?: string
  roles?: UserRole[]
  children?: NavigationItem[]
}
