import type {
  AuthTokens,
  ChangePasswordData,
  LoginCredentials,
  OTPVerification,
  RegisterData,
  ResetPasswordData,
  User,
} from '@/types/auth'
import { UserRole } from '@/types/auth'

import { apiClient } from '../client'
import { mockOTPs, mockPasswords, mockUsers } from '../mocks/users'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

// Generate mock JWT token
const generateMockToken = (userId: string): string => {
  return `mock_jwt_token_${userId}_${Date.now()}`
}

// Generate mock tokens
const generateMockTokens = (userId: string): AuthTokens => {
  return {
    accessToken: generateMockToken(userId),
    refreshToken: generateMockToken(`refresh_${userId}`),
    expiresIn: 900, // 15 minutes
  }
}

export const authApi = {
  // Login with email/password or phone/OTP
  login: async (credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> => {
    if (USE_MOCKS) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Email/Password login
      if (credentials.email && credentials.password) {
        const user = mockUsers.find((u) => u.email === credentials.email)
        const validPassword = mockPasswords[credentials.email] === credentials.password

        if (!user || !validPassword) {
          throw new Error('Invalid email or password')
        }

        const tokens = generateMockTokens(user.id)
        
        // Store in localStorage if remember me
        if (credentials.rememberMe) {
          localStorage.setItem('auth_token', tokens.accessToken)
          localStorage.setItem('refresh_token', tokens.refreshToken)
        }

        return { user, tokens }
      }

      // Phone/OTP login
      if (credentials.phone && credentials.otp) {
        const user = mockUsers.find((u) => u.phone === credentials.phone)
        const validOTP = mockOTPs[credentials.phone] === credentials.otp

        if (!user || !validOTP) {
          throw new Error('Invalid phone or OTP')
        }

        const tokens = generateMockTokens(user.id)
        return { user, tokens }
      }

      throw new Error('Invalid credentials')
    }

    const { data } = await apiClient.post('/auth/login', credentials)
    return data
  },

  // Register new user
  register: async (data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> => {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      const existingUser = mockUsers.find(
        (u) => u.email === data.email || u.phone === data.phone
      )

      if (existingUser) {
        throw new Error('User already exists')
      }

      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role || UserRole.PATIENT,
        isVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const tokens = generateMockTokens(newUser.id)
      return { user: newUser, tokens }
    }

    const { data: response } = await apiClient.post('/auth/register', data)
    return response
  },

  // Send OTP to phone
  sendOTP: async (phone: string): Promise<{ phoneNumber: string; expiresAt: string; message: string }> => {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 min from now
      return {
        phoneNumber: phone,
        expiresAt,
        message: `OTP has been sent to your mobile number`,
      }
    }

    const { data } = await apiClient.post('/otp/send', { phoneNumber: phone })
    return data.data
  },

  // Verify OTP
  verifyOTP: async (data: OTPVerification): Promise<{
    phoneNumber: string;
    expiresAt: string;
    message: string;
    verified: boolean;
    verifiedAt: string
  }> => {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const validOTP = mockOTPs[data.phone] === data.otp

      if (!validOTP) {
        const error: any = new Error('Invalid OTP')
        error.response = {
          data: {
            error: 'Bad Request',
            errorCode: 'INVALID_OTP',
            message: 'Invalid OTP',
            status: 400,
          }
        }
        throw error
      }

      return {
        phoneNumber: data.phone,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        message: 'OTP verified successfully',
        verified: true,
        verifiedAt: new Date().toISOString(),
      }
    }

    const { data: response } = await apiClient.post('/otp/verify', { phoneNumber: data.phone, otp: data.otp })
    return response.data
  },

  // Logout
  logout: async (): Promise<void> => {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
      return
    }

    await apiClient.post('/auth/logout')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const userId = refreshToken.split('_')[2]
      return generateMockTokens(userId)
    }

    const { data } = await apiClient.post('/auth/refresh', { refreshToken })
    return data
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      // Return first patient user as default
      return mockUsers[0]
    }

    const { data } = await apiClient.get('/auth/me')
    return data
  },

  // Forgot password - send reset link
  forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const user = mockUsers.find((u) => u.email === email)

      if (!user) {
        throw new Error('User not found')
      }

      return {
        success: true,
        message: 'Password reset link sent to your email',
      }
    }

    const { data } = await apiClient.post('/auth/forgot-password', { email })
    return data
  },

  // Reset password with token
  resetPassword: async (data: ResetPasswordData): Promise<{ success: boolean }> => {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (data.newPassword !== data.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      return { success: true }
    }

    const { data: response } = await apiClient.post('/auth/reset-password', data)
    return response
  },

  // Change password (authenticated user)
  changePassword: async (data: ChangePasswordData): Promise<{ success: boolean }> => {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (data.newPassword !== data.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      return { success: true }
    }

    const { data: response } = await apiClient.post('/auth/change-password', data)
    return response
  },
}
