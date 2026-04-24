import type { HealthPackage } from '@/types/package'

export const mockPackages: HealthPackage[] = [
  {
    id: '1',
    name: 'Basic Checkup',
    price: 1199,
    features: [
      '30+ Tests Included',
      'CBC, Sugar, Urine, Lipid Profile',
      'Liver Function, Kidney Function',
      'Thyroid Profile & more',
    ],
    buttonText: 'Book Now',
    buttonVariant: 'primary',
    isPopular: false,
  },
  {
    id: '2',
    name: 'Full Body Checkup',
    price: 599,
    badge: 'MOST POPULAR',
    features: [
      '50+ Tests Included',
      'Thyroid, Liver, Kidney, Heart',
      'Diabetes Screening, Vitamin D, B12',
      'Lipid, Diabetic & more',
    ],
    buttonText: 'Book Now',
    buttonVariant: 'primary',
    isPopular: true,
  },
  {
    id: '3',
    name: 'Advanced Checkup',
    price: 1799,
    features: [
      '80+ Tests Included',
      'Full Body Screening',
      'Hormones, Cardiac Risk Markers',
      'Cancer Markers & more',
    ],
    buttonText: 'Book Now',
    buttonVariant: 'accent',
    isPopular: false,
  },
]
