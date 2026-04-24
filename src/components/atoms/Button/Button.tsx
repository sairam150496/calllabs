import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

import { cn } from '@/helpers/cn'

import { buttonVariants } from './styles'
import type { ButtonProps } from './types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      fullWidth,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
