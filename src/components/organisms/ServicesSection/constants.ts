import type { LucideIcon } from 'lucide-react'
import { Activity, Ambulance, Bell, Gift, Heart, Pill, Stethoscope, TestTube } from 'lucide-react'

export interface ServiceItem {
  id: string
  icon: LucideIcon
  title: string
  description: string
  buttonText: string
  buttonVariant: 'primary' | 'secondary' | 'accent' | 'outline'
  link: string
}

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    icon: TestTube,
    title: 'Tests',
    description: 'Book lab tests at home',
    buttonText: 'Book Now',
    buttonVariant: 'primary',
    link: '/tests',
  },
  {
    id: '2',
    icon: Gift,
    title: 'Packages',
    description: 'Health checkup packages',
    buttonText: 'View Packages',
    buttonVariant: 'outline',
    link: '/packages',
  },
  {
    id: '3',
    icon: Ambulance,
    title: 'Ambulance',
    description: '24/7 Emergency Ambulance Service',
    buttonText: 'Call Now',
    buttonVariant: 'secondary',
    link: '/ambulance',
  },
  {
    id: '4',
    icon: Pill,
    title: 'Medicine',
    description: 'Order medicines on your doorstep',
    buttonText: 'Order Now',
    buttonVariant: 'primary',
    link: '/medicine',
  },
  {
    id: '5',
    icon: Stethoscope,
    title: 'Doctor',
    description: 'Consult experienced doctors online',
    buttonText: 'Consult Now',
    buttonVariant: 'outline',
    link: '/doctor',
  },
  {
    id: '6',
    icon: Bell,
    title: 'Reminder',
    description: 'Medicine & pill reminders',
    buttonText: 'Set Reminder',
    buttonVariant: 'outline',
    link: '/reminder',
  },
  {
    id: '7',
    icon: Activity,
    title: 'Physiotherapy',
    description: 'Book physiotherapy sessions at home',
    buttonText: 'Book Session',
    buttonVariant: 'accent',
    link: '/physiotherapy',
  },
  {
    id: '8',
    icon: Heart,
    title: 'Home Nurse',
    description: 'Trained nurses at home',
    buttonText: 'Book Nurse',
    buttonVariant: 'secondary',
    link: '/home-nurse',
  },
] as const
