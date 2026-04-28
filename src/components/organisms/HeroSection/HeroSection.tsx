import { Phone, TestTube } from 'lucide-react'

import heroBanner from '@/assets/images/hero-banner.png'
import { Button } from '@/components/atoms/Button'
import { TrustBadge } from '@/components/molecules/TrustBadge'

import { TRUST_INDICATORS } from './constants'
import type { HeroSectionProps } from './types'

export const HeroSection = ({ onBookTest, onCallAmbulance }: HeroSectionProps) => {
  return (
    <section className="bg-white">
      <div className="w-full px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-3">
            {/* Heading */}
            <div className="flex flex-col gap-0.5">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                Solution for
              </h2>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary leading-tight">
                Healthy Life
              </h1>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                Book tests, medicines, doctor consultation and many more healthcare services at
                your doorstep.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<TestTube className="h-3.5 w-3.5" />}
                onClick={onBookTest}
                fullWidth
                className="sm:w-auto"
              >
                Book Test
              </Button>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Phone className="h-3.5 w-3.5" />}
                onClick={onCallAmbulance}
                fullWidth
                className="sm:w-auto"
              >
                Call Ambulance
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:gap-1.5">
              {TRUST_INDICATORS.map((indicator, index) => (
                <TrustBadge
                  key={index}
                  icon={indicator.icon}
                  title={indicator.title}
                  variant="compact"
                />
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative w-full h-48 md:h-64 lg:h-80 hidden lg:block">
            <div className="w-full h-full rounded-xl overflow-hidden">
              <img
                src={heroBanner}
                alt="Healthcare Services"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

HeroSection.displayName = 'HeroSection'
