import type { ReactNode } from 'react'

import type { UserRole } from '@/types/auth'

export interface RoleBasedRouteProps {
  children: ReactNode
  allowedRoles: UserRole[]
}
