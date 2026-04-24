export interface HealthPackage {
  id: string
  name: string
  price: number
  originalPrice?: number
  badge?: string
  features: string[]
  buttonText: string
  buttonVariant: 'primary' | 'secondary' | 'accent'
  isPopular?: boolean
}

export interface PackageFeature {
  text: string
  included: boolean
}
