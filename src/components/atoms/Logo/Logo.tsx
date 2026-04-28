import logoImage from '@/assets/images/logo.png'
import { cn } from '@/helpers/cn'

import { DEFAULT_TAGLINE, LOGO_COLOR_CLASSES, LOGO_SIZE_CLASSES } from './constants'
import type { LogoProps } from './types'

export const Logo = ({
  size = 'md',
  showTagline = false,
  variant = 'default',
  className,
  ...props
}: LogoProps) => {
  const tagline = import.meta.env.VITE_APP_TAGLINE || DEFAULT_TAGLINE

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {/* Logo Image */}
      <img
        src={logoImage}
        alt="Call Labs"
        className={cn('object-contain', LOGO_SIZE_CLASSES[size].image)}
      />

      {/* Tagline */}
      {showTagline && (
        <div
          className={cn(
            'font-normal',
            LOGO_SIZE_CLASSES[size].tagline,
            LOGO_COLOR_CLASSES[variant].tagline
          )}
        >
          {tagline}
        </div>
      )}
    </div>
  )
}

Logo.displayName = 'Logo'
