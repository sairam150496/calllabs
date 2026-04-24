import { Link } from 'react-router-dom'

import { FOOTER_SERVICE_LINKS } from '@/config/navigation'

export function FooterServices() {
  return (
    <div className="min-w-[140px]">
      <h3 className="text-sm font-bold text-gray-900 mb-2">Our Services</h3>
      <ul className="space-y-1.5">
        {FOOTER_SERVICE_LINKS.slice(0, 4).map((link) => (
          <li key={link.label} className="flex items-center gap-1.5">
            <svg
              className="h-3 w-3 text-primary flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <Link
              to={link.path}
              className="text-xs text-gray-600 hover:text-primary transition-colors leading-tight"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

FooterServices.displayName = 'FooterServices'
