import { Loader2 } from 'lucide-react'

import { cn } from '@/helpers/cn'

import { spinnerVariants } from './styles'
import type { SpinnerProps } from './types'

export const Spinner = ({ size, variant, className, ...props }: SpinnerProps) => {
  return (
    <div className={cn('flex items-center justify-center', className)} {...props}>
      <Loader2 className={spinnerVariants({ size, variant })} />
    </div>
  )
}

Spinner.displayName = 'Spinner'
