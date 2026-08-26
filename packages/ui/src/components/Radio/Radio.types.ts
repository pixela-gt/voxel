import type { ComponentSize, ClassValue } from '../../types/shared'

export interface RadioGroupProps {
  modelValue?: string
  size?: ComponentSize
  disabled?: boolean
  name?: string
  required?: boolean
  /** Visual error state. Also set automatically inside FormField with errorMessage. */
  error?: boolean
  class?: ClassValue
}

export interface RadioItemProps {
  value: string
  size?: ComponentSize
  disabled?: boolean
  label?: string
}
