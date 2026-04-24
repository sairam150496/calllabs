import { cn } from '@/helpers/cn'

import { ICON_SIZE_MAP } from './constants'
import { iconWrapperVariants } from './styles'
import type { IconProps } from './types'

export const Icon = ({
  icon: IconComponent,
  size = 'md',
  variant,
  withBackground,
  className,
  ...props
}: IconProps) => {
  return (
    <div
      className={cn(iconWrapperVariants({ size, variant, withBackground }), className)}
      {...props}
    >
      <IconComponent size={ICON_SIZE_MAP[size]} strokeWidth={2} />
    </div>
  )
}

Icon.displayName = 'Icon'
