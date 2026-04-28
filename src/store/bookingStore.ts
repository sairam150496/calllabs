import { create } from 'zustand'

import type { BookingFormData } from '@/types/booking'

interface BookingState {
  currentBooking: BookingFormData | null
  isSubmitting: boolean
  error: string | null
  setCurrentBooking: (booking: BookingFormData | null) => void
  setIsSubmitting: (isSubmitting: boolean) => void
  setError: (error: string | null) => void
  resetBooking: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  currentBooking: null,
  isSubmitting: false,
  error: null,
  
  setCurrentBooking: (booking) => set({ currentBooking: booking }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setError: (error) => set({ error }),
  resetBooking: () => set({ currentBooking: null, isSubmitting: false, error: null }),
}))
