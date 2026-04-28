/**
 * Validate email address
 * @param email - Email address to validate
 * @returns True if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate Indian phone number
 * @param phone - Phone number to validate
 * @returns True if valid, false otherwise
 */
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '')
  // Accept 10 digits or 12 digits starting with 91
  return cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith('91'))
}

/**
 * Validate required field
 * @param value - Value to check
 * @returns True if not empty, false otherwise
 */
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0
}

/**
 * Validate minimum length
 * @param value - Value to check
 * @param minLength - Minimum required length
 * @returns True if meets minimum length, false otherwise
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength
}

/**
 * Validate maximum length
 * @param value - Value to check
 * @param maxLength - Maximum allowed length
 * @returns True if within maximum length, false otherwise
 */
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength
}
