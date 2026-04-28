import { cn } from '@/helpers/cn'

import type { TrustBadgeProps } from './types'

export const TrustBadge = ({
  icon: IconComponent,
  title,
  variant = 'default',
  iconBgColor = 'bg-primary',
  iconColor = 'text-white',
}: TrustBadgeProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 bg-white rounded-lg w-full md:w-auto',
        variant === 'compact' ? 'px-2.5 py-2' : 'px-3 py-2'
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          'flex items-center justify-center rounded-full flex-shrink-0',
          iconBgColor,
          iconColor,
          variant === 'compact' ? 'w-7 h-7 md:w-8 md:h-8' : 'w-8 h-8 md:w-10 md:h-10'
        )}
      >
        <IconComponent className={variant === 'compact' ? 'w-4 h-4' : 'w-4 h-4 md:w-5 md:h-5'} />
      </div>

      {/* Title */}
      <span
        className={cn(
          'font-medium text-gray-700 leading-tight flex-1',
          variant === 'compact' ? 'text-xs md:text-sm' : 'text-sm md:text-base'
        )}
      >
        {title}
      </span>
    </div>
  )
}

TrustBadge.displayName = 'TrustBadge'
