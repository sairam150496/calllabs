import { useNavigate } from 'react-router-dom'

import { Footer } from '@/components/organisms/Footer'
import { Header } from '@/components/organisms/Header'
import { HeroSection } from '@/components/organisms/HeroSection'
import { HowItWorksSection } from '@/components/organisms/HowItWorksSection'
import { PackagesSection } from '@/components/organisms/PackagesSection'
import { ServicesSection } from '@/components/organisms/ServicesSection'
import { PUBLIC_ROUTES } from '@/config/routes'

export const Home = () => {
  const navigate = useNavigate()

  const handleBookTest = () => {
    navigate(PUBLIC_ROUTES.TESTS)
  }

  const handleCallAmbulance = () => {
    navigate(PUBLIC_ROUTES.AMBULANCE)
  }

  const handleServiceClick = (serviceId: string) => {
    console.log('Service clicked:', serviceId)
  }

  const handlePackageSelect = (packageId: string) => {
    console.log('Package selected:', packageId)
    navigate(PUBLIC_ROUTES.PACKAGES)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection onBookTest={handleBookTest} onCallAmbulance={handleCallAmbulance} />
        <ServicesSection onServiceClick={handleServiceClick} />
        <PackagesSection onPackageSelect={handlePackageSelect} />
        <HowItWorksSection />
      </main>

      <Footer />
    </div>
  )
}

Home.displayName = 'Home'
