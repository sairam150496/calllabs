import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogIn, LogOut, Menu, MessageCircle, Phone, User as UserIcon, X } from 'lucide-react'

import { Button } from '@/components/atoms/Button'
import { Logo } from '@/components/atoms/Logo'
import { NavItem } from '@/components/molecules/NavItem'
import { MAIN_NAVIGATION } from '@/config/navigation'
import { AUTH_ROUTES, PUBLIC_ROUTES } from '@/config/routes'
import { cn } from '@/helpers/cn'
import { getPhoneUrl, getWhatsAppUrl } from '@/helpers/contact'
import { useAuthStore } from '@/store/authStore'

import type { HeaderProps } from './types'

export const Header = ({ isTransparent = false }: HeaderProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const { isAuthenticated, user, logout } = useAuthStore()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate(PUBLIC_ROUTES.HOME)
  }

  const handleLogin = () => {
    navigate(AUTH_ROUTES.LOGIN)
  }

  const handleWhatsAppClick = () => {
    window.open(getWhatsAppUrl(), '_blank')
  }

  const handleEmergencyClick = () => {
    window.location.href = getPhoneUrl()
  }

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu)
  }

  const handleWhatsAppMobileClick = () => {
    window.open(getWhatsAppUrl(), '_blank')
    setIsMobileMenuOpen(false)
  }

  const handleEmergencyMobileClick = () => {
    window.location.href = getPhoneUrl()
    setIsMobileMenuOpen(false)
  }

  const handleLoginMobileClick = () => {
    handleLogin()
    setIsMobileMenuOpen(false)
  }

  const handleLogoutClick = () => {
    handleLogout()
    setIsMobileMenuOpen(false)
  }

  // Get phone number display (last 4 digits with mask)
  const getPhoneDisplay = () => {
    if (!user?.phone) return 'User'
    const phone = user.phone
    return `+91 ****${phone.slice(-4)}`
  }

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
              onClick={handleWhatsAppClick}
            >
              WhatsApp
            </Button>

            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Phone className="h-3.5 w-3.5" />}
              onClick={handleEmergencyClick}
            >
              Emergency
            </Button>

            {/* Auth Button - Show login if not authenticated */}
            {!isAuthenticated ? (
              <Button
                variant="primary"
                size="sm"
                leftIcon={<LogIn className="h-3.5 w-3.5" />}
                onClick={handleLogin}
                className="bg-[#169c43] hover:bg-[#148a3a]"
              >
                Sign In
              </Button>
            ) : (
              /* User Menu - Show when authenticated */
              <div className="relative">
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="User menu"
                >
                  <UserIcon className="w-5 h-5 text-[#169c43]" />
                  <span className="text-sm font-medium text-gray-700">
                    {getPhoneDisplay()}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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
                onClick={handleWhatsAppMobileClick}
              >
                WhatsApp
              </Button>

              <Button
                variant="secondary"
                size="md"
                fullWidth
                leftIcon={<Phone className="h-4 w-4" />}
                onClick={handleEmergencyMobileClick}
              >
                Emergency
              </Button>

              {/* Mobile Auth Button */}
              {!isAuthenticated ? (
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  leftIcon={<LogIn className="h-4 w-4" />}
                  onClick={handleLoginMobileClick}
                  className="bg-[#169c43] hover:bg-[#148a3a]"
                >
                  Sign In
                </Button>
              ) : (
                /* Mobile User Section */
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-3 px-3 py-2 mb-2 bg-gray-50 rounded-lg">
                    <UserIcon className="w-6 h-6 text-[#169c43]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {getPhoneDisplay()}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    leftIcon={<LogOut className="h-4 w-4" />}
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

Header.displayName = 'Header'
