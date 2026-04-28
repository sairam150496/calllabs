import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/atoms/Button'
import { Footer } from '@/components/organisms/Footer'
import { Header } from '@/components/organisms/Header'
import { PUBLIC_ROUTES } from '@/config/routes'

interface ComingSoonProps {
  title: string
}

export const ComingSoon = ({ title }: ComingSoonProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-16">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-6">🚧</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 mb-8">
            This page is under construction. We're working hard to bring you this feature soon!
          </p>
          <Link to={PUBLIC_ROUTES.HOME}>
            <Button variant="primary" size="lg" leftIcon={<ArrowLeft className="h-5 w-5" />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

ComingSoon.displayName = 'ComingSoon'
