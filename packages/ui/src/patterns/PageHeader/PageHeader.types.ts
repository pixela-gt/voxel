import type { ClassValue } from '../../types/shared'

export type PageShellVariant = 'boxy' | 'default'

export interface PageHeaderProps {
  title: string
  description?: string
  variant?: PageShellVariant
  class?: ClassValue
}
