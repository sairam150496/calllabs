import { PUBLIC_ROUTES } from './routes'

/**
 * Main navigation items for header
 */
export const MAIN_NAVIGATION = [
  { label: 'Home', path: PUBLIC_ROUTES.HOME },
  { label: 'Tests', path: PUBLIC_ROUTES.TESTS },
  { label: 'Packages', path: PUBLIC_ROUTES.PACKAGES },
  { label: 'Ambulance', path: PUBLIC_ROUTES.AMBULANCE },
  { label: 'Medicine', path: PUBLIC_ROUTES.MEDICINE },
  { label: 'Doctor', path: PUBLIC_ROUTES.DOCTOR },
  { label: 'Reminder', path: PUBLIC_ROUTES.REMINDER },
  { label: 'Physiotherapy', path: PUBLIC_ROUTES.PHYSIOTHERAPY },
  { label: 'Home Nurse', path: PUBLIC_ROUTES.HOME_NURSE },
  { label: 'Contact', path: PUBLIC_ROUTES.CONTACT },
] as const

/**
 * Quick links for footer
 */
export const FOOTER_QUICK_LINKS = [
  { label: 'Home', path: PUBLIC_ROUTES.HOME },
  { label: 'Tests', path: PUBLIC_ROUTES.TESTS },
  { label: 'Packages', path: PUBLIC_ROUTES.PACKAGES },
  { label: 'Ambulance', path: PUBLIC_ROUTES.AMBULANCE },
  { label: 'Medicine', path: PUBLIC_ROUTES.MEDICINE },
  { label: 'Doctor', path: PUBLIC_ROUTES.DOCTOR },
  { label: 'Contact', path: PUBLIC_ROUTES.CONTACT },
  { label: 'Physiotherapy', path: PUBLIC_ROUTES.PHYSIOTHERAPY },
  { label: 'Home Nurse', path: PUBLIC_ROUTES.HOME_NURSE },
  { label: 'Contact', path: PUBLIC_ROUTES.CONTACT },
  { label: 'Terms & Conditions', path: PUBLIC_ROUTES.TERMS },
  { label: 'Privacy Policy', path: PUBLIC_ROUTES.PRIVACY },
] as const

/**
 * Service links for footer
 */
export const FOOTER_SERVICE_LINKS = [
  { label: 'Diagnostic Tests', path: PUBLIC_ROUTES.TESTS },
  { label: 'Health Packages', path: PUBLIC_ROUTES.PACKAGES },
  { label: 'Home Collection', path: PUBLIC_ROUTES.TESTS },
  { label: 'Doctor Consultation', path: PUBLIC_ROUTES.DOCTOR },
  { label: 'Ambulance Service', path: PUBLIC_ROUTES.AMBULANCE },
  { label: 'Medicine Delivery', path: PUBLIC_ROUTES.MEDICINE },
  { label: 'Physiotherapy', path: PUBLIC_ROUTES.PHYSIOTHERAPY },
  { label: 'Home Nurse Service', path: PUBLIC_ROUTES.HOME_NURSE },
] as const

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  facebook: '#',
  instagram: '#',
  youtube: '#',
  linkedin: '#',
} as const
