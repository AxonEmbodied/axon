import type { ReactNode } from 'react'

export function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'brand' | 'warning' }) {
  const variants = {
    default: 'bg-ax-sunken text-ax-text-secondary',
    brand: 'bg-ax-brand-subtle text-ax-brand',
    warning: 'bg-ax-warning-subtle text-ax-warning',
  }
  return (
    <span className={`font-mono text-micro px-2 py-0.5 rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}
