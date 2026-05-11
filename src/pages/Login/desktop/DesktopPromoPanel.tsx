import { Clock, FileText, Headphones, Home, Mail, Shield, ShieldCheck, Smartphone, Tag } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Logo } from '@/components/atoms/Logo'
import heroBannerImage from '@/assets/images/hero-banner.png'

import { PROMO_FEATURES, SUBHEADING_FEATURES, TRUST_BADGE } from '../constants'

const ICON_MAP: Record<string, LucideIcon> = {
  home: Home,
  fileText: FileText,
  clock: Clock,
  headset: Headphones,
  shield: Shield,
  shieldCheck: ShieldCheck,
  tag: Tag,
  smartphone: Smartphone,
  mail: Mail,
}

export const DesktopPromoPanel = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50/40 via-white to-green-50/30 p-4 lg:p-6 xl:p-8 flex flex-col justify-between overflow-hidden">
      <div className="space-y-3 lg:space-y-4">
        <div>
          <Logo size="md" showTagline />
        </div>

        <div>
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight mb-2">
            Book Lab Tests
            <br />
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

        <div className="grid grid-cols-4 gap-2 lg:gap-3">
          {PROMO_FEATURES.map((feature) => {
            const IconComponent = ICON_MAP[feature.icon]
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

        <div className="relative rounded-xl lg:rounded-2xl overflow-hidden">
          <img
            src={heroBannerImage}
            alt="Call Labs - Lab Technician with Blood Sample and Call Labs Van"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl lg:rounded-2xl shadow-md border border-gray-100 p-2 lg:p-3 flex items-center gap-2 lg:gap-3 mt-3 lg:mt-4">
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6 text-[#169c43]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] lg:text-xs font-semibold text-gray-900 truncate">{TRUST_BADGE.title}</p>
          <p className="text-[9px] lg:text-[10px] text-gray-600 truncate">{TRUST_BADGE.subtitle}</p>
        </div>
        <div className="flex-shrink-0">
          <div className="flex -space-x-1">
            {TRUST_BADGE.avatars.map((avatar, index) => (
              <div
                key={index}
                className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gray-200 border border-white flex items-center justify-center"
              >
                <span className="text-[8px] lg:text-[9px] font-semibold text-gray-600">{avatar}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

DesktopPromoPanel.displayName = 'DesktopPromoPanel'
