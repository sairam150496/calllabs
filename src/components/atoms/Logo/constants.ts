export const LOGO_SIZE_CLASSES = {
  sm: {
    image: 'h-12',
    tagline: 'text-xs',
  },
  md: {
    image: 'h-16',
    tagline: 'text-sm',
  },
  lg: {
    image: 'h-20',
    tagline: 'text-base',
  },
} as const

export const LOGO_COLOR_CLASSES = {
  default: {
    tagline: 'text-gray-600',
  },
  white: {
    tagline: 'text-white/80',
  },
} as const

export const DEFAULT_TAGLINE = 'Solution for Healthy Life'
