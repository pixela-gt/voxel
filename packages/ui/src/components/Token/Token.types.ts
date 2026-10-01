import type { ClassValue, IconValue } from '../../types/shared'

export type TokenVariant = 'default' | 'selected' | 'error'

export interface TokenProps {
  label: string
  icon?: IconValue
  variant?: TokenVariant
  disabled?: boolean
  class?: ClassValue
}
