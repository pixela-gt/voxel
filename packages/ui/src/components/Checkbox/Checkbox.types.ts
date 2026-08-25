import type { ComponentSize, ClassValue, IconValue } from '../../types/shared'

export interface CheckboxProps {
  modelValue?: boolean
  size?: ComponentSize
  disabled?: boolean
  label?: string
  icon?: IconValue
  /** Renders the dash state instead of unchecked (maps to reka's indeterminate). */
  indeterminate?: boolean
  /** Visual error state. Also set automatically inside FormField with errorMessage. */
  error?: boolean
  class?: ClassValue
}
