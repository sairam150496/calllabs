import { useState } from 'react'
import {
  ArrowRight,
  ChevronDown,
  Clock,
  FileText,
  Headphones,
  Home,
  Mail,
  Shield,
  ShieldCheck,
  Smartphone,
  Tag,
} from 'lucide-react'

import { Button } from '@/components/atoms/Button'
import { Logo } from '@/components/atoms/Logo'
import heroBannerImage from '@/assets/images/hero-banner.png'
import { cn } from '@/helpers/cn'
import { isValidPhone } from '@/helpers/validation'

import {
  BOTTOM_FEATURES,
  DEFAULT_COUNTRY_CODE,
  FOOTER_LINKS,
  LOGIN_TABS,
  PROMO_FEATURES,
  SUBHEADING_FEATURES,
  TRUST_BADGE,
} from './constants'
import type { LoginPageProps } from './types'

export const Login = ({ onSubmit, isLoading = false, error = null }: LoginPageProps) => {
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'mobile' | 'email'>('mobile')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPhoneError(null)

    // Only handle mobile login for now
    if (activeTab !== 'mobile') return

    if (!phone) {
      setPhoneError('Mobile number is required')
      return
    }

    if (!isValidPhone(phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number')
      return
    }

    onSubmit?.(phone)
  }

  const currentYear = new Date().getFullYear()

  // Icon mapping
  const iconMap: Record<string, typeof Home> = {
    home: Home,
    shieldCheck: ShieldCheck,
    fileText: FileText,
    clock: Clock,
    headset: Headphones,
    shield: Shield,
    tag: Tag,
    smartphone: Smartphone,
    mail: Mail,
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50/30 via-white to-green-50/20 flex flex-col overflow-hidden">
      {/* Main Split Container - Full Width, No Margins */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0">

        {/* LEFT PANEL - Promotional */}
        <div className="relative bg-gradient-to-br from-blue-50/40 via-white to-green-50/30 p-4 lg:p-6 xl:p-8 flex flex-col justify-between overflow-hidden">
          <div className="space-y-3 lg:space-y-4">
            {/* Logo & Branding */}
            <div>
              <Logo size="md" showTagline />
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight mb-2">
                Book Lab Tests<br />
                at <span className="text-[#169c43]">Home</span>
              </h1>
              <p className="text-xs lg:text-sm text-gray-600 flex items-center flex-wrap gap-1">
                {SUBHEADING_FEATURES.map((feature, index) => (
                  <span key={feature} className="flex items-center gap-1">
                    {feature}
                    {index < SUBHEADING_FEATURES.length - 1 && <span className="text-gray-400">•</span>}
                  </span>
                ))}
              </p>
            </div>

            {/* 4 Feature Icons - Horizontal Row */}
            <div className="grid grid-cols-4 gap-2 lg:gap-3">
              {PROMO_FEATURES.map((feature) => {
                const IconComponent = iconMap[feature.icon]
                return (
                  <div key={feature.title} className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 mb-1 flex items-center justify-center">
                      <IconComponent size={24} strokeWidth={1.5} className="text-gray-700" />
                    </div>
                    <p className="text-[9px] lg:text-[10px] leading-tight text-gray-700 whitespace-pre-line font-medium">
                      {feature.title}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Hero Illustration Area - Lab Technician with Van */}
            <div className="relative rounded-xl lg:rounded-2xl overflow-hidden">
              <img
                src={heroBannerImage}
                alt="Call Labs - Lab Technician with Blood Sample and Call Labs Van"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Trust Badge */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-md border border-gray-100 p-2 lg:p-3 flex items-center gap-2 lg:gap-3 mt-3 lg:mt-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6 text-[#169c43]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] lg:text-xs font-bold text-gray-900 leading-tight">{TRUST_BADGE.title}</p>
              <p className="text-[9px] lg:text-[10px] text-gray-600 leading-tight">{TRUST_BADGE.subtitle}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-br from-blue-400 to-green-400 border-2 border-white"
                  />
                ))}
              </div>
              <div className="ml-1 w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[#169c43] flex items-center justify-center">
                <span className="text-white text-[9px] lg:text-[10px] font-bold">{TRUST_BADGE.userCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Login Form */}
        <div className="flex items-center justify-center p-4 lg:p-6 xl:p-8 bg-gray-50/30 overflow-hidden">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-4 lg:mb-5">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h2>
              <p className="text-xs lg:text-sm text-gray-600">Login to your account to continue</p>
            </div>

            {/* Login Tabs - KEEPING BOTH TABS AS PER IMAGE */}
            <div className="flex gap-2 mb-4 lg:mb-5">
                {LOGIN_TABS.map((tab) => {
                  const IconComponent = iconMap[tab.icon]
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as 'mobile' | 'email')}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium',
                        isActive
                          ? 'bg-green-50 border-[#169c43] text-[#169c43]'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      )}
                    >
                      <IconComponent size={18} />
                      {tab.label}
                    </button>
                  )
                })}
              </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mobile Number Input */}
              {activeTab === 'mobile' && (
                <div>
                  <label htmlFor="mobile" className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5">
                    Mobile Number
                  </label>
                  <div className={cn(
                    'flex items-center border rounded-lg lg:rounded-xl overflow-hidden transition-all',
                    (phoneError || error) ? 'border-red-500' : 'border-gray-300 focus-within:border-[#169c43] focus-within:ring-2 focus-within:ring-green-100'
                  )}>
                    <div className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3 py-2.5 lg:py-3 bg-gray-50 border-r border-gray-300">
                      <span className="text-base lg:text-lg">🇮🇳</span>
                      <span className="text-xs lg:text-sm font-medium text-gray-700">{DEFAULT_COUNTRY_CODE}</span>
                      <ChevronDown size={14} className="text-gray-400" />
                    </div>
                    <input
                      id="mobile"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value.replace(/\D/g, ''))
                        setPhoneError(null)
                      }}
                      placeholder="Enter your mobile number"
                      className="flex-1 px-3 lg:px-4 py-2.5 lg:py-3 text-xs lg:text-sm outline-none bg-white"
                      maxLength={10}
                    />
                  </div>
                  {(phoneError || error) && (
                    <p className="text-[10px] lg:text-xs text-red-500 mt-1">{phoneError || error}</p>
                  )}
                </div>
              )}

              {/* Email Input - Placeholder */}
              {activeTab === 'email' && (
                <div>
                  <label htmlFor="email" className="block text-xs lg:text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 lg:px-4 py-2.5 lg:py-3 text-xs lg:text-sm border border-gray-300 rounded-lg lg:rounded-xl outline-none focus:border-[#169c43] focus:ring-2 focus:ring-green-100"
                  />
                </div>
              )}

              {/* Send OTP Button */}
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

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 mt-4 lg:mt-5 text-[10px] lg:text-xs text-gray-600">
              <ShieldCheck size={14} className="text-[#169c43]" />
              <span>Your data is 100% secure and encrypted</span>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-4 lg:mt-5 pt-4 lg:pt-5 border-t border-gray-200">
              <p className="text-xs lg:text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="text-[#169c43] font-semibold hover:underline">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Strip - Full Width */}
      <div className="bg-white border-t border-gray-200 py-3 lg:py-4 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {BOTTOM_FEATURES.map((feature) => {
            const IconComponent = iconMap[feature.icon]
            return (
              <div key={feature.title} className="flex items-start gap-2 lg:gap-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-[#169c43] flex items-center justify-center flex-shrink-0">
                  <IconComponent size={18} className="text-[#169c43]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-xs lg:text-sm mb-0.5 leading-tight">{feature.title}</p>
                  <p className="text-[10px] lg:text-xs text-gray-600 leading-tight">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Row - Full Width */}
      <div className="bg-gray-50 border-t border-gray-200 py-2 lg:py-3 px-4">
        <div className="max-w-7xl mx-auto text-center text-[10px] lg:text-xs text-gray-600 flex flex-wrap items-center justify-center gap-2 lg:gap-3">
          <span>© {currentYear} Call Labs. All rights reserved.</span>
          <span className="hidden sm:inline text-gray-400">|</span>
          {FOOTER_LINKS.map((link, index) => (
            <span key={link.label} className="flex items-center gap-2 lg:gap-3">
              <a href={link.href} className="hover:text-[#169c43] transition-colors">
                {link.label}
              </a>
              {index < FOOTER_LINKS.length - 1 && <span className="hidden sm:inline text-gray-400">|</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

Login.displayName = 'Login'
