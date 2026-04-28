import { authApi } from './services/authApi'
import { bookingApi } from './services/bookingApi'
import { packagesApi } from './services/packagesApi'
import { servicesApi } from './services/servicesApi'

export { apiClient } from './client'
export { authApi } from './services/authApi'
export { bookingApi } from './services/bookingApi'
export { packagesApi } from './services/packagesApi'
export { servicesApi } from './services/servicesApi'

export const api = {
  auth: authApi,
  services: servicesApi,
  packages: packagesApi,
  booking: bookingApi,
}
