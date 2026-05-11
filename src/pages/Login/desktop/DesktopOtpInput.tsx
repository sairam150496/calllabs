import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/atoms/Button'
import { cn } from '@/helpers/cn'

interface DesktopOtpInputProps {
  phone: string
  onVerifyOTP: (otp: string) => Promise<void>
  onResendOTP: () => Promise<void>
  onChangeNumber: () => void
  isLoading: boolean
}

export const DesktopOtpInput = ({
  phone,
  onVerifyOTP,
  onResendOTP,
  onChangeNumber,
  isLoading,
}: DesktopOtpInputProps) => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [otpError, setOtpError] = useState<string | null>(null)

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setOtpError(null)

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
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
    const targetInput = document.getElementById(`otp-${lastIndex}`)
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
      console.log('Verifying OTP:', otpString)
      await onVerifyOTP(otpString)
      console.log('OTP verification completed successfully')
    } catch (error) {
      console.error('OTP verification error:', error)
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
          <label htmlFor="otp-0" className="block text-xs lg:text-sm font-medium text-gray-700">
            Enter OTP
          </label>
          <button
            type="button"
            onClick={onChangeNumber}
            className="text-[10px] lg:text-xs text-[#169c43] font-medium hover:underline"
          >
            Change Number
          </button>
        </div>
        <p className="text-[10px] lg:text-xs text-gray-600 mb-3">OTP sent to +91 {phone}</p>

        <div className="flex gap-2 lg:gap-3 justify-center mb-3">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              value={otp[index]}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              onPaste={index === 0 ? handleOtpPaste : undefined}
              maxLength={1}
              disabled={isLoading}
              className={cn(
                'w-12 h-12 lg:w-14 lg:h-14 text-center text-lg lg:text-xl font-semibold border-2 rounded-lg lg:rounded-xl outline-none transition-all',
                otpError
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:border-[#169c43] focus:ring-2 focus:ring-green-100 bg-white'
              )}
            />
          ))}
        </div>

        {otpError && <p className="text-[10px] lg:text-xs text-red-500 mt-1 text-center">{otpError}</p>}

        <div className="text-center mt-3">
          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="text-[10px] lg:text-xs text-[#169c43] font-medium hover:underline disabled:opacity-50"
          >
            Resend OTP
          </button>
        </div>
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
        Verify OTP
      </Button>
    </form>
  )
}

DesktopOtpInput.displayName = 'DesktopOtpInput'
