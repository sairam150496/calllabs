import { ArrowRight } from 'lucide-react'

import { Icon } from '@/components/atoms/Icon'
import { cn } from '@/helpers/cn'

import { HOW_IT_WORKS_STEPS } from './constants'
import type { HowItWorksSectionProps } from './types'

export const HowItWorksSection = ({ className }: HowItWorksSectionProps) => {
  return (
    <section className={cn('bg-white py-2', className)}>
      <div className="w-full px-4">
        {/* Single Horizontal Line: How It Works | 1 | icon | text | ---> | 2 | icon | text | etc */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* "How It Works" Label */}
          <span className="text-xs font-bold text-gray-900 whitespace-nowrap">How It Works</span>

          {/* Steps in a row */}
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div key={step.step} className="flex items-center gap-2">
              {/* Step Number Circle */}
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">
                {step.step}
              </div>

              {/* Icon */}
              <Icon icon={step.icon} size="sm" variant="primary" className="w-4 h-4" />

              {/* Text */}
              <span className="text-xs text-gray-700 whitespace-nowrap">{step.title}</span>

              {/* Dotted Arrow (hidden on last item) */}
              {index < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="flex items-center gap-0.5 mx-1">
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <ArrowRight className="h-3 w-3 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

HowItWorksSection.displayName = 'HowItWorksSection'
