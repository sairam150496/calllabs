import type { Booking, BookingFormData } from '@/types/booking'

import { apiClient } from '../client'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

export const bookingApi = {
  create: async (data: BookingFormData): Promise<Booking> => {
    if (USE_MOCKS) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      return Promise.resolve({
        id: Math.random().toString(36).substring(7),
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }
    const { data: response } = await apiClient.post('/bookings', data)
    return response
  },

  getById: async (id: string): Promise<Booking> => {
    if (USE_MOCKS) {
      throw new Error('Mock booking details not implemented')
    }
    const { data } = await apiClient.get(`/bookings/${id}`)
    return data
  },
}
