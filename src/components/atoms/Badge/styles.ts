import { cva } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-100 text-primary-700 border border-primary-200',
        secondary: 'bg-secondary-100 text-secondary-700 border border-secondary-200',
        accent: 'bg-accent-100 text-accent-700 border border-accent-200',
        success: 'bg-green-100 text-green-700 border border-green-200',
        warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
        danger: 'bg-red-100 text-red-700 border border-red-200',
        neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
)
