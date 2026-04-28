/**
 * Get WhatsApp chat URL
 * @param message - Optional pre-filled message
 * @returns WhatsApp chat URL
 */
export const getWhatsAppUrl = (message?: string): string => {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER;
  const encodedMessage = message ? encodeURIComponent(message) : ''
  return `https://wa.me/${phone}${encodedMessage ? `?text=${encodedMessage}` : ''}`
}

/**
 * Get phone call URL
 * @returns Tel URL
 */
export const getPhoneUrl = (): string => {
  const phone = import.meta.env.VITE_PHONE_NUMBER;
  return `tel:${phone}`
}

/**
 * Get email URL
 * @param subject - Optional email subject
 * @param body - Optional email body
 * @returns Mailto URL
 */
export const getEmailUrl = (subject?: string, body?: string): string => {
  const email = import.meta.env.VITE_EMAIL
  const params = new URLSearchParams()
  
  if (subject) params.append('subject', subject)
  if (body) params.append('body', body)
  
  const queryString = params.toString()
  return `mailto:${email}${queryString ? `?${queryString}` : ''}`
}

/**
 * Get Google Maps URL for address
 * @returns Google Maps URL
 */
export const getMapsUrl = (): string => {
  const address = import.meta.env.VITE_ADDRESS || '123 Health Street, Your City - 110001'
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}
