export interface BookingFormData {
  name: string
  email: string
  phone: string
  serviceType: string
  date?: string
  time?: string
  address?: string
  notes?: string
}

export interface Booking extends BookingFormData {
  id: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}
