import type { ClassValue } from '../../types/shared'

export type TopNavVariant = 'default' | 'boxy'

// Root wrapper
export interface TopNavProps {
  variant?: TopNavVariant
  dense?: boolean
  class?: ClassValue
}

// Individual nav item
export interface TopNavItemProps {
  to?: string
  href?: string
  active?: boolean
  disabled?: boolean
  class?: ClassValue
}

// Heading/title
export interface TopNavHeadingProps {
  class?: ClassValue
}
