import type { BottomFeature, FeatureItem, TrustBadgeData } from './types'

/**
 * Main promotional features displayed on left panel
 */
export const PROMO_FEATURES: FeatureItem[] = [
  {
    icon: 'home',
    title: 'Home Sample\nCollection',
    description: '',
  },
  {
    icon: 'shieldCheck',
    title: 'NABL\nCertified Labs',
    description: '',
  },
  {
    icon: 'fileText',
    title: 'Accurate\nReports',
    description: '',
  },
  {
    icon: 'clock',
    title: 'Fast\nResults',
    description: '',
  },
]

/**
 * Trust badge information
 */
export const TRUST_BADGE: TrustBadgeData = {
  title: 'Trusted by 10,000+ Families',
  subtitle: 'Across 100+ Cities',
  userCount: '10K+',
}

/**
 * Bottom feature strip items
 */
export const BOTTOM_FEATURES: BottomFeature[] = [
  {
    icon: 'headset',
    title: 'Customer Support',
    description: 'We are here to help you',
  },
  {
    icon: 'shield',
    title: 'Secure & Safe',
    description: 'Your data is protected',
  },
  {
    icon: 'tag',
    title: 'Best Price',
    description: 'Affordable lab tests',
  },
  {
    icon: 'clock',
    title: 'On-time Reports',
    description: 'Reports within 24–48 hrs',
  },
]

/**
 * Subheading features (bullet points)
 */
export const SUBHEADING_FEATURES = [
  'Accurate Reports',
  'Certified Labs',
  'On-time Delivery',
]

/**
 * Login tabs
 */
export const LOGIN_TABS = [
  { id: 'mobile', label: 'Login with Mobile', icon: 'smartphone' },
  { id: 'email', label: 'Login with Email', icon: 'mail' },
] as const

/**
 * Footer links
 */
export const FOOTER_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
]

/**
 * Default country code for phone input
 */
export const DEFAULT_COUNTRY_CODE = '+91'

/**
 * Country code options (for future expansion)
 */
export const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', label: 'India' },
]
