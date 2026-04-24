import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary',
        secondary:
          'bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700 focus-visible:ring-secondary',
        accent:
          'bg-accent text-white hover:bg-accent-600 active:bg-accent-700 focus-visible:ring-accent',
        outline:
          'border-2 border-primary text-primary bg-transparent hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary',
        ghost:
          'bg-transparent hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-400',
        link:
          'bg-transparent text-primary underline-offset-4 hover:underline focus-visible:ring-primary',
      },
      size: {
        sm: 'h-9 px-4 py-2 text-sm',
        md: 'h-11 px-6 py-3 text-base',
        lg: 'h-14 px-8 py-4 text-lg',
        icon: 'h-11 w-11 p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)
