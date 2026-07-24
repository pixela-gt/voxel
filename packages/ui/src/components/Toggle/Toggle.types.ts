import type { ClassValue, ComponentSize } from '../../types/shared'

export type ToggleVariant = 'button' | 'icon-button'

export interface ToggleProps {
  modelValue?: boolean | null
  variant?: ToggleVariant
  size?: ComponentSize
  value?: string
  disabled?: boolean
  class?: ClassValue
}
