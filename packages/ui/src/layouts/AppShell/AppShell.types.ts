import type { ClassValue } from '../../types/shared'

export type AppShellVariant = 'boxy' | 'default' | 'inset'

export interface AppShellProps {
  class?: ClassValue
  variant?: AppShellVariant
}
