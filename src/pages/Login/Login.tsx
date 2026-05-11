import { LoginFooter } from './components/LoginFooter'
import { DesktopOtpInput } from './desktop/DesktopOtpInput'
import { DesktopPhoneInput } from './desktop/DesktopPhoneInput'
import { DesktopPromoPanel } from './desktop/DesktopPromoPanel'
import { useOtpFlow } from './hooks/useOtpFlow'
import { MobileOtpInput } from './mobile/MobileOtpInput'
import { MobilePhoneInput } from './mobile/MobilePhoneInput'
import type { LoginPageProps } from './types'

export const Login = ({ onSubmit }: LoginPageProps) => {
  const { phone, showOtpInput, isLoading, sendOTP, verifyOTP, resendOTP, changeNumber } = useOtpFlow()

  const handleSendOTP = async (phoneNumber: string) => {
    await sendOTP(phoneNumber)
    onSubmit?.(phoneNumber)
  }

  const handleVerifyOTP = async (otp: string) => {
    await verifyOTP(otp, phone)
  }

  const handleResendOTP = async () => {
    await resendOTP(phone)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50/30 via-white to-green-50/20 flex flex-col overflow-hidden">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0">
        {/* Desktop Promo Panel - Hidden on mobile */}
        <div className="hidden lg:block">
          <DesktopPromoPanel />
        </div>

        {/* Login Form Panel */}
        <div className="flex items-center justify-center p-4 lg:p-6 xl:p-8 bg-gray-50/30 overflow-hidden">
          <div className="w-full max-w-md bg-white rounded-2xl lg:rounded-3xl shadow-2xl border border-gray-100 p-6 lg:p-8">
            {/* Header */}
            <div className="text-center mb-4 lg:mb-5">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h2>
              <p className="text-xs lg:text-sm text-gray-600">Login to your account to continue</p>
            </div>

            {/* Desktop Phone/OTP Input */}
            <div className="hidden lg:block">
              {!showOtpInput ? (
                <DesktopPhoneInput onSendOTP={handleSendOTP} isLoading={isLoading} />
              ) : (
                <DesktopOtpInput
                  phone={phone}
                  onVerifyOTP={handleVerifyOTP}
                  onResendOTP={handleResendOTP}
                  onChangeNumber={changeNumber}
                  isLoading={isLoading}
                />
              )}
            </div>

            {/* Mobile Phone/OTP Input */}
            <div className="lg:hidden">
              {!showOtpInput ? (
                <MobilePhoneInput onSendOTP={handleSendOTP} isLoading={isLoading} />
              ) : (
                <MobileOtpInput
                  phone={phone}
                  onVerifyOTP={handleVerifyOTP}
                  onResendOTP={handleResendOTP}
                  onChangeNumber={changeNumber}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <LoginFooter />
    </div>
  )
}

Login.displayName = 'Login'
