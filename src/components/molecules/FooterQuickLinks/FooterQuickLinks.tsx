import { Link } from 'react-router-dom'

import { FOOTER_QUICK_LINKS } from '@/config/navigation'

export function FooterQuickLinks() {
  // Split links into 3 columns (4 items each)
  const column1 = FOOTER_QUICK_LINKS.slice(0, 4)
  const column2 = FOOTER_QUICK_LINKS.slice(4, 8)
  const column3 = FOOTER_QUICK_LINKS.slice(8, 12)

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full lg:w-auto">
      {/* Column 1 */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-2">Quick Links</h3>
        <ul className="space-y-1">
          {column1.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-xs text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 2 */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-2 invisible">Links</h3>
        <ul className="space-y-1">
          {column2.map((link, index) => (
            <li key={`${link.path}-${index}`}>
              <Link
                to={link.path}
                className="text-xs text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 3 */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-2 invisible">Links</h3>
        <ul className="space-y-1">
          {column3.map((link, index) => (
            <li key={`${link.path}-${index}`}>
              <Link
                to={link.path}
                className="text-xs text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

FooterQuickLinks.displayName = 'FooterQuickLinks'
