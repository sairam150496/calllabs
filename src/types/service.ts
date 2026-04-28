export interface Service {
  id: string
  name: string
  description: string
  icon: string
  buttonText: string
  buttonVariant: 'primary' | 'secondary' | 'accent' | 'outline'
  link: string
}

export type ServiceType =
  | 'tests'
  | 'packages'
  | 'ambulance'
  | 'medicine'
  | 'doctor'
  | 'reminder'
  | 'physiotherapy'
  | 'homeNurse'
