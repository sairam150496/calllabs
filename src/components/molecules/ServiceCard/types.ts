import type { LucideIcon } from 'lucide-react'

export interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  buttonText: string
  buttonVariant?: 'primary' | 'secondary' | 'accent' | 'outline'
  onAction: () => void
}
