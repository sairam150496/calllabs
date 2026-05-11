import { cn } from '@/helpers/cn'

import { LOGIN_TABS } from '../constants'

interface LoginTabsProps {
  activeTab: 'mobile' | 'email'
  onTabChange: (tab: 'mobile' | 'email') => void
}

export const LoginTabs = ({ activeTab, onTabChange }: LoginTabsProps) => {
  const handleMobileClick = () => {
    onTabChange('mobile')
  }

  const handleEmailClick = () => {
    onTabChange('email')
  }

  return (
    <div className="flex gap-2 mb-4 lg:mb-5">
      {LOGIN_TABS.map((tab) => {
        const isActive = activeTab === tab.value
        const handleClick = tab.value === 'mobile' ? handleMobileClick : handleEmailClick

        return (
          <button
            key={tab.value}
            type="button"
            onClick={handleClick}
            className={cn(
              'flex-1 py-2.5 lg:py-3 px-4 rounded-lg lg:rounded-xl text-xs lg:text-sm font-semibold transition-all',
              isActive
                ? 'bg-[#169c43] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

LoginTabs.displayName = 'LoginTabs'
