import { cva } from 'class-variance-authority'

/**
 * Page wrapper background with gradient
 */
export const pageWrapperVariants = cva(
  'min-h-screen bg-gradient-to-br from-white via-green-50/30 to-green-100/20 relative overflow-hidden'
)

/**
 * Main split container card
 */
export const splitContainerVariants = cva(
  'grid grid-cols-1 lg:grid-cols-2 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-2xl overflow-hidden',
  {
    variants: {
      size: {
        default: 'rounded-3xl',
        large: 'rounded-[2rem]',
      },
    },
    defaultVariants: {
      size: 'large',
    },
  }
)

/**
 * Promotional left section background
 */
export const promoSectionVariants = cva(
  'relative bg-gradient-to-br from-green-50 via-white to-green-100/50 p-8 lg:p-12 flex flex-col justify-between'
)

/**
 * Login form section
 */
export const loginSectionVariants = cva(
  'flex items-center justify-center p-8 lg:p-12 bg-white'
)

/**
 * Phone input group container
 */
export const phoneInputGroupVariants = cva(
  'flex items-stretch h-14 border border-gray-300 rounded-xl overflow-hidden transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
  {
    variants: {
      error: {
        true: 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20',
        false: '',
      },
    },
    defaultVariants: {
      error: false,
    },
  }
)

/**
 * Country code selector button
 */
export const countryCodeButtonVariants = cva(
  'flex items-center gap-2 px-4 bg-gray-50 border-r border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors'
)

/**
 * Phone number input field
 */
export const phoneInputVariants = cva(
  'flex-1 px-4 text-base border-none outline-none bg-white placeholder:text-gray-400'
)

/**
 * Trust card floating badge
 */
export const trustCardVariants = cva(
  'bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex items-center gap-4'
)

/**
 * Feature grid layout
 */
export const featureGridVariants = cva(
  'grid gap-4',
  {
    variants: {
      columns: {
        2: 'grid-cols-2',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      },
    },
    defaultVariants: {
      columns: 2,
    },
  }
)

/**
 * Decorative background elements
 */
export const decorativeCircleVariants = cva(
  'absolute rounded-full blur-3xl opacity-20 pointer-events-none',
  {
    variants: {
      color: {
        green: 'bg-green-400',
        blue: 'bg-blue-400',
        purple: 'bg-purple-400',
      },
      size: {
        sm: 'w-32 h-32',
        md: 'w-48 h-48',
        lg: 'w-64 h-64',
      },
    },
    defaultVariants: {
      color: 'green',
      size: 'md',
    },
  }
)

/**
 * Bottom feature strip
 */
export const featureStripVariants = cva(
  'bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-6'
)

/**
 * Footer row
 */
export const footerRowVariants = cva(
  'text-center text-sm text-gray-600 flex flex-wrap items-center justify-center gap-4'
)
