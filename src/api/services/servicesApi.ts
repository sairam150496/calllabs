import type { Service } from '@/types/service'

import { apiClient } from '../client'
import { mockServices } from '../mocks/services'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

export const servicesApi = {
  getAll: async (): Promise<Service[]> => {
    if (USE_MOCKS) {
      return Promise.resolve(mockServices)
    }
    const { data } = await apiClient.get('/services')
    return data
  },

  getById: async (id: string): Promise<Service> => {
    if (USE_MOCKS) {
      const service = mockServices.find((s) => s.id === id)
      if (!service) throw new Error('Service not found')
      return Promise.resolve(service)
    }
    const { data } = await apiClient.get(`/services/${id}`)
    return data
  },
}
