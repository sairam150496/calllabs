import { cva } from 'class-variance-authority'

export const iconWrapperVariants = cva('inline-flex items-center justify-center rounded-full', {
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-12 w-12',
      lg: 'h-16 w-16',
      xl: 'h-20 w-20',
    },
    variant: {
      default: 'text-gray-600',
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
    },
    withBackground: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      withBackground: true,
      className: 'bg-primary-50',
    },
    {
      variant: 'secondary',
      withBackground: true,
      className: 'bg-secondary-50',
    },
    {
      variant: 'accent',
      withBackground: true,
      className: 'bg-accent-50',
    },
    {
      variant: 'default',
      withBackground: true,
      className: 'bg-gray-100',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'default',
    withBackground: false,
  },
})
