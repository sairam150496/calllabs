import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { Icon } from '@/components/atoms/Icon'

import type { ServiceCardProps } from './types'

export const ServiceCard = ({
  icon,
  title,
  description,
  buttonText,
  buttonVariant = 'primary',
  onAction,
}: ServiceCardProps) => {
  return (
    <Card
      variant="elevated"
      padding="md"
      hoverable
      className="flex flex-col items-center text-center gap-3 border border-gray-200"
    >
      <Icon
        icon={icon}
        size="md"
        variant={buttonVariant === 'secondary' ? 'secondary' : buttonVariant === 'accent' ? 'accent' : 'primary'}
        withBackground
      />

      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-gray-900 leading-tight">{title}</h4>
        <p className="text-xs text-gray-600 leading-tight line-clamp-2">{description}</p>
      </div>

      <Button variant={buttonVariant} size="sm" onClick={onAction} className="mt-auto w-full px-2 text-xs">
        {buttonText}
      </Button>
    </Card>
  )
}

ServiceCard.displayName = 'ServiceCard'
