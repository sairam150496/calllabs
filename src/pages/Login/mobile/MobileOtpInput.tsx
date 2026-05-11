import { useState } from 'react'

import { Button } from '@/components/atoms/Button'
import { cn } from '@/helpers/cn'

interface MobileOtpInputProps {
  phone: string
  onVerifyOTP: (otp: string) => Promise<void>
  onResendOTP: () => Promise<void>
  onChangeNumber: () => void
  isLoading: boolean
}

export const MobileOtpInput = ({
  phone,
  onVerifyOTP,
  onResendOTP,
  onChangeNumber,
  isLoading,
}: MobileOtpInputProps) => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [otpError, setOtpError] = useState<string | null>(null)

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setOtpError(null)

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-mobile-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-mobile-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 4)

    if (!/^\d+$/.test(pastedData)) return

    const newOtp = pastedData.split('').concat(['', '', '', '']).slice(0, 4)
    setOtp(newOtp)
    setOtpError(null)

    const lastIndex = Math.min(pastedData.length, 3)
    const targetInput = document.getElementById(`otp-mobile-${lastIndex}`)
    targetInput?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOtpError(null)

    const otpString = otp.join('')

    if (!otpString || otpString.length < 4) {
      setOtpError('Please enter all 4 digits')
      return
    }

    try {
      await onVerifyOTP(otpString)
    } catch (error) {
      const err = error as Error & { response?: { data?: { message?: string } } }
      const errorMessage = err.response?.data?.message || err.message || 'Invalid OTP'
      setOtpError(errorMessage)
    }
  }

  const handleResend = async () => {
    setOtpError(null)
    setOtp(['', '', '', ''])
    try {
      await onResendOTP()
    } catch (error) {
      const err = error as Error
      setOtpError(err.message || 'Failed to resend OTP')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="otp-mobile-0" className="block text-sm font-medium text-gray-700">
            Enter OTP
          </label>
          <button
            type="button"
            onClick={onChangeNumber}
            className="text-xs text-[#169c43] font-medium hover:underline"
          >
            Change Number
          </button>
        </div>
        <p className="text-xs text-gray-600 mb-3">OTP sent to +91 {phone}</p>

        <div className="flex gap-3 justify-center mb-3">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              id={`otp-mobile-${index}`}
              type="text"
              inputMode="numeric"
              value={otp[index]}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              onPaste={index === 0 ? handleOtpPaste : undefined}
              maxLength={1}
              disabled={isLoading}
              className={cn(
                'w-14 h-14 text-center text-2xl font-semibold border-2 rounded-xl outline-none transition-all',
                otpError
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:border-[#169c43] focus:ring-2 focus:ring-green-100 bg-white'
              )}
            />
          ))}
        </div>

        {otpError && <p className="text-xs text-red-500 mt-1 text-center">{otpError}</p>}

        <div className="text-center mt-3">
          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="text-xs text-[#169c43] font-medium hover:underline disabled:opacity-50"
          >
            Resend OTP
          </button>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
        className="bg-[#169c43] hover:bg-[#148a3a] h-12 text-base font-semibold rounded-xl"
      >
        Verify OTP
      </Button>
    </form>
  )
}

MobileOtpInput.displayName = 'MobileOtpInput'
