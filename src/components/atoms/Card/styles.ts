import { cva } from 'class-variance-authority'

export const cardVariants = cva('rounded-lg transition-all duration-200', {
  variants: {
    variant: {
      default: 'bg-white border border-gray-200',
      bordered: 'bg-white border-2 border-gray-300',
      elevated: 'bg-white shadow-lg',
      flat: 'bg-gray-50',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    hoverable: {
      true: 'cursor-pointer hover:shadow-xl hover:scale-[1.02]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
    hoverable: false,
  },
})
