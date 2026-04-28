import { getEmailUrl, getMapsUrl, getPhoneUrl } from '@/helpers/contact'

export function FooterContact() {
  return (
    <div className="min-w-[160px]">
      <h3 className="text-sm font-bold text-gray-900 mb-2">Contact Us</h3>
      <ul className="space-y-1.5">
        <li>
          <a
            href={getPhoneUrl()}
            className="text-xs text-gray-600 hover:text-primary transition-colors block leading-tight"
          >
            {import.meta.env.VITE_PHONE_NUMBER}
          </a>
        </li>
        <li>
          <a
            href={getEmailUrl()}
            className="text-xs text-gray-600 hover:text-primary transition-colors block leading-tight"
          >
            {import.meta.env.VITE_EMAIL}
          </a>
        </li>
        <li>
          <a
            href={getMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 hover:text-primary transition-colors block leading-tight"
          >
            {import.meta.env.VITE_ADDRESS}
          </a>
        </li>
      </ul>
    </div>
  )
}

FooterContact.displayName = 'FooterContact'
