import { FOOTER_LINKS } from '../constants'

export const LoginFooter = () => {
  return (
    <div className="bg-gray-50 border-t py-2 lg:py-3 px-4">
      <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] lg:text-xs text-gray-600">
        {FOOTER_LINKS.map((link, index) => (
          <span key={link.label} className="flex items-center gap-2">
            <a href={link.href} className="hover:text-[#169c43] transition-colors">
              {link.label}
            </a>
            {index < FOOTER_LINKS.length - 1 && <span className="hidden sm:inline text-gray-400">|</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

LoginFooter.displayName = 'LoginFooter'
