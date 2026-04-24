import type { HealthPackage } from '@/types/package'

import { apiClient } from '../client'
import { mockPackages } from '../mocks/packages'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

export const packagesApi = {
  getAll: async (): Promise<HealthPackage[]> => {
    if (USE_MOCKS) {
      return Promise.resolve(mockPackages)
    }
    const { data } = await apiClient.get('/packages')
    return data
  },

  getById: async (id: string): Promise<HealthPackage> => {
    if (USE_MOCKS) {
      const pkg = mockPackages.find((p) => p.id === id)
      if (!pkg) throw new Error('Package not found')
      return Promise.resolve(pkg)
    }
    const { data } = await apiClient.get(`/packages/${id}`)
    return data
  },
}
