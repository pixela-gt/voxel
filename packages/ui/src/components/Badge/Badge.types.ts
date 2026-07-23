import type { ComponentSize, ClassValue } from '../../types/shared'

export type BadgeVariant =
  | 'default' | 'outline' | 'subtle' | 'info' | 'success' | 'warning' | 'error'

export interface BadgeProps {
  variant?: BadgeVariant
  size?: ComponentSize
  dot?: boolean
  class?: ClassValue
}
