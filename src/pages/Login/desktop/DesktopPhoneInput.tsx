import { useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'

import { Button } from '@/components/atoms/Button'
import { cn } from '@/helpers/cn'
import { isValidPhone } from '@/helpers/validation'

import { DEFAULT_COUNTRY_CODE } from '../constants'

interface DesktopPhoneInputProps {
  onSendOTP: (phone: string) => Promise<void>
  isLoading: boolean
}

export const DesktopPhoneInput = ({ onSendOTP, isLoading }: DesktopPhoneInputProps) => {
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
        <label htmlFor="mobile" className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5">
          Mobile Number
        </label>
        <div
          className={cn(
            'flex items-center border rounded-lg lg:rounded-xl overflow-hidden transition-all',
            phoneError
              ? 'border-red-500'
              : 'border-gray-300 focus-within:border-[#169c43] focus-within:ring-2 focus-within:ring-green-100'
          )}
        >
          <div className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3 py-2.5 lg:py-3 bg-gray-50 border-r border-gray-300">
            <span className="text-base lg:text-lg">🇮🇳</span>
            <span className="text-xs lg:text-sm font-medium text-gray-700">{DEFAULT_COUNTRY_CODE}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
          <input
            id="mobile"
            type="tel"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="Enter your mobile number"
            className="flex-1 px-3 lg:px-4 py-2.5 lg:py-3 text-xs lg:text-sm outline-none bg-white"
            maxLength={10}
            disabled={isLoading}
          />
        </div>
        {phoneError && <p className="text-[10px] lg:text-xs text-red-500 mt-1">{phoneError}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        rightIcon={<ArrowRight size={18} />}
        isLoading={isLoading}
        className="bg-[#169c43] hover:bg-[#148a3a] h-10 lg:h-11 text-xs lg:text-sm font-semibold rounded-lg lg:rounded-xl"
      >
        Send OTP
      </Button>
    </form>
  )
}

DesktopPhoneInput.displayName = 'DesktopPhoneInput'
