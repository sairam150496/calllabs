import type { LucideIcon } from 'lucide-react'
import { Calendar, FileCheck, Home, TestTube } from 'lucide-react'

export interface HowItWorksStep {
  step: number
  icon: LucideIcon
  title: string
  description: string
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: 1,
    icon: Calendar,
    title: 'Book Your Test / Service',
    description: 'Select your desired test or service',
  },
  {
    step: 2,
    icon: Home,
    title: 'We Visit Your Home',
    description: 'Our professional team comes to you',
  },
  {
    step: 3,
    icon: TestTube,
    title: 'Sample Collection / Service',
    description: 'Quick and safe sample collection',
  },
  {
    step: 4,
    icon: FileCheck,
    title: 'Get Report Online',
    description: 'Receive reports on your email/app',
  },
] as const
