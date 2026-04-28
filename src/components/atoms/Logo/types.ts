import type { HTMLAttributes } from 'react'

export interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
  variant?: 'default' | 'white'
}
