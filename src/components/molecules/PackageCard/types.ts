export interface PackageCardProps {
  name: string
  price: number
  originalPrice?: number
  badge?: string
  features: string[]
  buttonText?: string
  buttonVariant?: 'primary' | 'secondary' | 'accent'
  isPopular?: boolean
  onSelect: () => void
}
