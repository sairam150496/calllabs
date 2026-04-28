export enum UserRole {
  GUEST = 'guest',
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export enum AuthStrategy {
  EMAIL_PASSWORD = 'email_password',
  PHONE_OTP = 'phone_otp',
  GOOGLE_OAUTH = 'google_oauth',
  ADMIN_PORTAL = 'admin_portal',
}

export interface User {
  id: string
  email: string
  phone?: string
  firstName: string
  lastName: string
  role: UserRole
  avatar?: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LoginCredentials {
  email?: string
  password?: string
  phone?: string
  otp?: string
  strategy: AuthStrategy
  rememberMe?: boolean
}

export interface RegisterData {
  email: string
  password: string
  phone: string
  firstName: string
  lastName: string
  role?: UserRole
}

export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface OTPVerification {
  phone: string
  otp: string
}

export interface ResetPasswordData {
  token: string
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
