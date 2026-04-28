import { EmergencyAmbulanceCard } from '@/components/molecules/EmergencyAmbulanceCard'
import { PackageCard } from '@/components/molecules/PackageCard'
import { getPhoneUrl } from '@/helpers/contact'

import { HEALTH_PACKAGES } from './constants'
import type { PackagesSectionProps } from './types'

export const PackagesSection = ({ onPackageSelect }: PackagesSectionProps) => {
  const handlePackageSelect = (packageId: string) => {
    if (onPackageSelect) {
      onPackageSelect(packageId)
    }
  }

  const handleCallAmbulance = () => {
    window.location.href = getPhoneUrl()
  }

  return (
    <section className="bg-gray-50 py-4">
      <div className="w-full px-4">
        {/* Health Checkup Packages Header */}
        <div className="mb-3">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            Health Checkup Packages
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left side: 3 Package Cards - 45% width */}
          <div className="w-full lg:w-[45%]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {HEALTH_PACKAGES.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  name={pkg.name}
                  price={pkg.price}
                  originalPrice={pkg.originalPrice}
                  badge={pkg.badge}
                  features={pkg.features}
                  buttonText={pkg.buttonText}
                  buttonVariant={pkg.buttonVariant}
                  isPopular={pkg.isPopular}
                  onSelect={() => handlePackageSelect(pkg.id)}
                />
              ))}
            </div>
          </div>

          {/* Right side: Emergency Ambulance - 55% width */}
          <div className="w-full lg:w-[55%]">
            <EmergencyAmbulanceCard onCallNow={handleCallAmbulance} />
          </div>
        </div>
      </div>
    </section>
  )
}

PackagesSection.displayName = 'PackagesSection'
