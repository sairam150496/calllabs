import { forwardRef } from 'react'

import { cn } from '@/helpers/cn'

import { cardVariants } from './styles'
import type { CardProps } from './types'

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant, padding, hoverable, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, hoverable }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
