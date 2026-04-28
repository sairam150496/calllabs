import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AuthState, AuthTokens, User } from '@/types/auth'

interface AuthStore extends AuthState {
  // Actions
  login: (user: User, tokens: AuthTokens) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  refreshTokens: (tokens: AuthTokens) => void
  hasRole: (roles: string | string[]) => boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: (user, tokens) => {
        set({
          user,
          tokens,
          isAuthenticated: true,
          error: null,
        })
      },

      // Logout action
      logout: () => {
        // Clear localStorage
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('redirect_after_login')
        
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          error: null,
        })
      },

      // Update user profile
      updateUser: (userData) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          })
        }
      },

      // Set loading state
      setLoading: (isLoading) => {
        set({ isLoading })
      },

      // Set error
      setError: (error) => {
        set({ error, isLoading: false })
      },

      // Clear error
      clearError: () => {
        set({ error: null })
      },

      // Refresh tokens
      refreshTokens: (tokens) => {
        set({ tokens })
        localStorage.setItem('auth_token', tokens.accessToken)
        localStorage.setItem('refresh_token', tokens.refreshToken)
      },

      // Check if user has required role(s)
      hasRole: (roles) => {
        const user = get().user
        if (!user) return false

        const roleArray = Array.isArray(roles) ? roles : [roles]
        return roleArray.includes(user.role)
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
