import type { HTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'primary' | 'secondary' | 'accent'
  withBackground?: boolean
}
