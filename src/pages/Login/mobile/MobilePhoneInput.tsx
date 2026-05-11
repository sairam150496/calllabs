import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/atoms/Button'
import { cn } from '@/helpers/cn'
import { isValidPhone } from '@/helpers/validation'

import { DEFAULT_COUNTRY_CODE } from '../constants'

interface MobilePhoneInputProps {
  onSendOTP: (phone: string) => Promise<void>
  isLoading: boolean
}

export const MobilePhoneInput = ({ onSendOTP, isLoading }: MobilePhoneInputProps) => {
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState<string | null>(null)

  const handlePhoneChange = (value: string) => {
    setPhone(value.replace(/\D/g, ''))
    setPhoneError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPhoneError(null)

    if (!phone) {
      setPhoneError('Mobile number is required')
      return
    }

    if (!isValidPhone(phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number')
      return
    }

    try {
      await onSendOTP(phone)
    } catch (error) {
      const err = error as Error
      setPhoneError(err.message || 'Failed to send OTP')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1.5">
          Mobile Number
        </label>
        <div
          className={cn(
            'flex items-center border rounded-xl overflow-hidden transition-all',
            phoneError
              ? 'border-red-500'
              : 'border-gray-300 focus-within:border-[#169c43] focus-within:ring-2 focus-within:ring-green-100'
          )}
        >
          <div className="flex items-center gap-2 px-3 py-3 bg-gray-50 border-r border-gray-300">
            <span className="text-lg">🇮🇳</span>
            <span className="text-sm font-medium text-gray-700">{DEFAULT_COUNTRY_CODE}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
          <input
            id="mobile"
            type="tel"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="Enter mobile number"
            className="flex-1 px-4 py-3 text-base outline-none bg-white"
            maxLength={10}
            disabled={isLoading}
          />
        </div>
        {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
        className="bg-[#169c43] hover:bg-[#148a3a] h-12 text-base font-semibold rounded-xl"
      >
        Send OTP
      </Button>
    </form>
  )
}

MobilePhoneInput.displayName = 'MobilePhoneInput'
