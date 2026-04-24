import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, MessageCircle, Phone, X } from 'lucide-react'

import { Button } from '@/components/atoms/Button'
import { Logo } from '@/components/atoms/Logo'
import { NavItem } from '@/components/molecules/NavItem'
import { MAIN_NAVIGATION } from '@/config/navigation'
import { PUBLIC_ROUTES } from '@/config/routes'
import { cn } from '@/helpers/cn'
import { getPhoneUrl, getWhatsAppUrl } from '@/helpers/contact'

import type { HeaderProps } from './types'

export const Header = ({ isTransparent = false }: HeaderProps) => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-200',
        isTransparent
          ? 'bg-white/80 backdrop-blur-md border-gray-200/50'
          : 'bg-white border-gray-200'
      )}
    >
      <div className="w-full">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to={PUBLIC_ROUTES.HOME}>
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {MAIN_NAVIGATION.map((item) => (
              <NavItem
                key={item.path}
                label={item.label}
                href={item.path}
                isActive={location.pathname === item.path}
              />
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<MessageCircle className="h-3.5 w-3.5" />}
              onClick={() => window.open(getWhatsAppUrl(), '_blank')}
            >
              WhatsApp
            </Button>

            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Phone className="h-3.5 w-3.5" />}
              onClick={() => window.location.href = getPhoneUrl()}
            >
              Emergency
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="flex flex-col p-4 gap-2">
              {MAIN_NAVIGATION.map((item) => (
                <NavItem
                  key={item.path}
                  label={item.label}
                  href={item.path}
                  isActive={location.pathname === item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </nav>

            <div className="flex flex-col gap-2 p-4 border-t border-gray-200">
              <Button
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<MessageCircle className="h-4 w-4" />}
                onClick={() => {
                  window.open(getWhatsAppUrl(), '_blank')
                  setIsMobileMenuOpen(false)
                }}
              >
                WhatsApp
              </Button>

              <Button
                variant="secondary"
                size="md"
                fullWidth
                leftIcon={<Phone className="h-4 w-4" />}
                onClick={() => {
                  window.location.href = getPhoneUrl()
                  setIsMobileMenuOpen(false)
                }}
              >
                Emergency
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

Header.displayName = 'Header'
