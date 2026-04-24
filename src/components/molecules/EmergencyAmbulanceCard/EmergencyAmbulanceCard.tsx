import { Phone } from 'lucide-react'

import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { Icon } from '@/components/atoms/Icon'

import { EMERGENCY_TRUST_BADGES } from './constants'
import type { EmergencyAmbulanceCardProps } from './types'

export const EmergencyAmbulanceCard = ({ onCallNow }: EmergencyAmbulanceCardProps) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Emergency Card - Horizontal Layout */}
      <Card variant="elevated" padding="sm" className="bg-secondary-50 border-2 border-secondary-200">
        <div className="flex items-center gap-3">
          {/* Left: Text Content */}
          <div className="flex-1">
            <h4 className="text-sm font-bold text-secondary leading-tight">24/7 Emergency</h4>
            <h5 className="text-xs font-semibold text-secondary-700 mb-1">Ambulance Service</h5>
            <p className="text-xs text-secondary-600 mb-2">
              Fast Response. Anytime. Anywhere.
            </p>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Phone className="h-3 w-3" />}
              onClick={onCallNow}
              className="text-xs h-7"
            >
              Call Now
            </Button>
          </div>

          {/* Right: Ambulance Image */}
          <div className="flex-shrink-0">
            <div className="text-5xl">🚑</div>
          </div>
        </div>
      </Card>

      {/* Trust Badges - Combined Green Background */}
      <div className="bg-green-50 rounded-lg px-4 py-3 border border-green-100">
        <div className="flex items-center gap-6 flex-wrap justify-center">
          {EMERGENCY_TRUST_BADGES.map((badge, index) => (
            <div key={index} className="flex items-center gap-2">
              <Icon icon={badge.icon} size="md" variant="primary" className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{badge.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

EmergencyAmbulanceCard.displayName = 'EmergencyAmbulanceCard'
