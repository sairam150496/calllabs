import { cva } from 'class-variance-authority'

export const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
    },
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
})
