import type { ComponentSize, ClassValue } from '../../types/shared'

export interface SwitchProps {
  modelValue?: boolean
  size?: ComponentSize
  disabled?: boolean
  label?: string
  /** Visual error state. Also set automatically inside FormField with errorMessage. */
  error?: boolean
  class?: ClassValue
}
