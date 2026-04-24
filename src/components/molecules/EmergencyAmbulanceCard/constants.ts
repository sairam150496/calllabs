import { BadgeCheck, Home, Lock, Wallet } from 'lucide-react'

export const EMERGENCY_TRUST_BADGES = [
  {
    icon: BadgeCheck,
    title: 'Verified Professionals',
  },
  {
    icon: Home,
    title: 'Home Sample Collection',
  },
  {
    icon: Lock,
    title: 'Secure & Safe Service',
  },
  {
    icon: Wallet,
    title: 'Affordable Prices',
  },
] as const
