export interface LoginFormData {
  phone: string
}

export interface FeatureItem {
  icon: string
  title: string
  description: string
}

export interface TrustBadgeData {
  title: string
  subtitle: string
  userCount: string
  avatars: string[]
}

export interface BottomFeature {
  icon: string
  title: string
  description: string
}

export interface LoginPageProps {
  onSubmit?: (phone: string) => void
  isLoading?: boolean
  error?: string | null
}
