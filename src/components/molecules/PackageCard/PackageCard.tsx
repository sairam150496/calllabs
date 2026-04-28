import { Check } from 'lucide-react'

import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { formatCurrency } from '@/helpers/format'

import type { PackageCardProps } from './types'

export const PackageCard = ({
  name,
  price,
  originalPrice,
  badge,
  features,
  buttonText = 'Book Now',
  buttonVariant = 'primary',
  isPopular = false,
  onSelect,
}: PackageCardProps) => {
  return (
    <Card
      variant={isPopular ? 'bordered' : 'elevated'}
      padding="sm"
      className={`relative flex flex-col gap-2 border border-gray-200 h-full ${badge ? 'pt-4' : ''}`}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
          <Badge variant="secondary" size="sm">
            <span className="text-xs px-2 py-0.5">{badge}</span>
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-0 text-center">
        <h4 className="text-xs font-semibold text-gray-900">{name}</h4>
        <div className="flex items-baseline justify-center gap-1 mt-0.5">
          <span className="text-lg font-bold text-primary">{formatCurrency(price)}</span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-0.5 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-1">
            <div className="flex-shrink-0 mt-0.5">
              <Check className="h-2.5 w-2.5 text-primary" strokeWidth={3} />
            </div>
            <span className="text-xs text-gray-700 leading-tight">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <Button
        variant={buttonVariant}
        size="sm"
        fullWidth
        onClick={onSelect}
        className="text-xs h-7"
      >
        {buttonText}
      </Button>
    </Card>
  )
}

PackageCard.displayName = 'PackageCard'
