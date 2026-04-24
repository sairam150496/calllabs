import { cn } from '@/helpers/cn'

import { badgeVariants } from './styles'
import type { BadgeProps } from './types'

export const Badge = ({ variant, size, className, children, ...props }: BadgeProps) => {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </span>
  )
}

Badge.displayName = 'Badge'
