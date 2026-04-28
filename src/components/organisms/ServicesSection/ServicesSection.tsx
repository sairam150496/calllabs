import { useNavigate } from 'react-router-dom'

import { ServiceCard } from '@/components/molecules/ServiceCard'

import { SERVICES } from './constants'
import type { ServicesSectionProps } from './types'

export const ServicesSection = ({ onServiceClick }: ServicesSectionProps) => {
  const navigate = useNavigate()

  const handleServiceAction = (serviceId: string, link: string) => {
    if (onServiceClick) {
      onServiceClick(serviceId)
    }
    navigate(link)
  }

  return (
    <section className="bg-white py-4 border-t border-gray-200">
      <div className="w-full px-4">
        {/* Section Header */}
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">Our Services</h3>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              buttonText={service.buttonText}
              buttonVariant={service.buttonVariant}
              onAction={() => handleServiceAction(service.id, service.link)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

ServicesSection.displayName = 'ServicesSection'
