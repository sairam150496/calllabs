import { Link } from 'react-router-dom'

import { cn } from '@/helpers/cn'

import type { NavItemProps } from './types'

export const NavItem = ({ label, href, isActive = false, onClick }: NavItemProps) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        'px-4 py-2 text-sm font-medium transition-colors rounded-md',
        'hover:bg-primary-50 hover:text-primary',
        isActive
          ? 'text-primary bg-primary-50'
          : 'text-gray-700 bg-transparent'
      )}
    >
      {label}
    </Link>
  )
}

NavItem.displayName = 'NavItem'
