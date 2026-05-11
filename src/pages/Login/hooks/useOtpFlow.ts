import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PUBLIC_ROUTES } from '@/config/routes'
import { useAuthStore } from '@/store/authStore'
import { UserRole } from '@/types/auth'

interface UseOtpFlowReturn {
  phone: string
  setPhone: (phone: string) => void
  showOtpInput: boolean
  isLoading: boolean
  sendOTP: (phoneNumber: string) => Promise<void>
  verifyOTP: (otp: string, phoneNumber: string) => Promise<void>
  resendOTP: (phoneNumber: string) => Promise<void>
  changeNumber: () => void
}

export const useOtpFlow = (): UseOtpFlowReturn => {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const [phone, setPhone] = useState('')
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sendOTP = async (phoneNumber: string): Promise<void> => {
    setIsLoading(true)
    try {
      const { api } = await import('@/api')
      await api.auth.sendOTP(phoneNumber)
      setPhone(phoneNumber)
      setShowOtpInput(true)
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOTP = async (otp: string, phoneNumber: string): Promise<void> => {
    setIsLoading(true)
    try {
      const { api } = await import('@/api')
      const response = await api.auth.verifyOTP({ phone: phoneNumber, otp })

      if (response.verified) {
        const user = {
          id: phoneNumber,
          email: '',
          phone: phoneNumber,
          firstName: '',
          lastName: '',
          role: UserRole.PATIENT,
          isVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        const tokens = {
          accessToken: 'temp-token',
          refreshToken: 'temp-refresh-token',
          expiresIn: 3600,
        }

        login(user, tokens)
        navigate(PUBLIC_ROUTES.HOME)
      } else {
        throw new Error('OTP verification failed')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const resendOTP = async (phoneNumber: string): Promise<void> => {
    setIsLoading(true)
    try {
      const { api } = await import('@/api')
      await api.auth.sendOTP(phoneNumber)
    } finally {
      setIsLoading(false)
    }
  }

  const changeNumber = (): void => {
    setShowOtpInput(false)
    setPhone('')
  }

  return {
    phone,
    setPhone,
    showOtpInput,
    isLoading,
    sendOTP,
    verifyOTP,
    resendOTP,
    changeNumber,
  }
}
