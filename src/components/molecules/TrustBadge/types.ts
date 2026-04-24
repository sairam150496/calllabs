import type { LucideIcon } from 'lucide-react'

export interface TrustBadgeProps {
  icon: LucideIcon
  title: string
  variant?: 'default' | 'compact'
  iconBgColor?: string
  iconColor?: string
}
