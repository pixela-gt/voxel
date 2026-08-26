import type { ClassValue, IconValue } from '../../types/shared'

export type PageShellVariant = 'boxy' | 'default'

export interface PageHeaderProps {
  icon?: IconValue
  title: string
  description?: string
  variant?: PageShellVariant
  class?: ClassValue
}
