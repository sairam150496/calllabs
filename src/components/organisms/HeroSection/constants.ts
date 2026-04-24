import { BadgeCheck, FileText, Home, Shield } from 'lucide-react'

export const TRUST_INDICATORS = [
  {
    icon: BadgeCheck,
    title: 'Affordable Prices',
  },
  {
    icon: Home,
    title: 'Home Sample Collection',
  },
  {
    icon: FileText,
    title: 'Fast & Accurate Reports',
  },
  {
    icon: Shield,
    title: 'Trusted by Thousands',
  },
] as const
