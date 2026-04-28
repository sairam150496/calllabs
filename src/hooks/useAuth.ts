import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '@/api'
import { getDefaultDashboardRoute } from '@/config/routes'
import { useAuthStore } from '@/store/authStore'
import type { ChangePasswordData, LoginCredentials, RegisterData } from '@/types/auth'

export const useAuth = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading, error, login, logout, setLoading, setError, clearError, hasRole } = useAuthStore()

  // Login handler
  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setLoading(true)
        clearError()

        const { user, tokens } = await api.auth.login(credentials)
        login(user, tokens)

        // Get redirect path or default dashboard
        const redirectTo = sessionStorage.getItem('redirect_after_login') || getDefaultDashboardRoute(user.role)
        sessionStorage.removeItem('redirect_after_login')
        
        navigate(redirectTo)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Login failed'
        setError(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [login, navigate, setLoading, setError, clearError]
  )

  // Register handler
  const handleRegister = useCallback(
    async (data: RegisterData) => {
      try {
        setLoading(true)
        clearError()

        const { user, tokens } = await api.auth.register(data)
        login(user, tokens)

        // Redirect to default dashboard after registration
        const redirectTo = getDefaultDashboardRoute(user.role)
        navigate(redirectTo)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Registration failed'
        setError(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [login, navigate, setLoading, setError, clearError]
  )

  // Logout handler
  const handleLogout = useCallback(async () => {
    try {
      setLoading(true)
      await api.auth.logout()
      logout()
      navigate('/')
    } catch (err) {
      console.error('Logout error:', err)
      // Force logout even if API call fails
      logout()
      navigate('/')
    } finally {
      setLoading(false)
    }
  }, [logout, navigate, setLoading])

  // Send OTP
  const sendOTP = useCallback(
    async (phone: string) => {
      try {
        setLoading(true)
        clearError()
        const result = await api.auth.sendOTP(phone)
        return result
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to send OTP'
        setError(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError, clearError]
  )

  // Verify OTP
  const verifyOTP = useCallback(
    async (phone: string, otp: string) => {
      try {
        setLoading(true)
        clearError()
        const result = await api.auth.verifyOTP({ phone, otp })
        return result
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Invalid OTP'
        setError(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError, clearError]
  )

  // Forgot password
  const forgotPassword = useCallback(
    async (email: string) => {
      try {
        setLoading(true)
        clearError()
        const result = await api.auth.forgotPassword(email)
        return result
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to send reset link'
        setError(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError, clearError]
  )

  // Change password
  const changePassword = useCallback(
    async (data: ChangePasswordData) => {
      try {
        setLoading(true)
        clearError()
        const result = await api.auth.changePassword(data)
        return result
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to change password'
        setError(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError, clearError]
  )

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
    sendOTP,
    verifyOTP,
    forgotPassword,
    changePassword,
    hasRole,
    clearError,
  }
}
