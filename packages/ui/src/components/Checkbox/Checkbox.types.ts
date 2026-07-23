import type { ComponentSize, ClassValue, IconValue } from '../../types/shared'

export interface CheckboxProps {
  modelValue?: boolean
  size?: ComponentSize
  disabled?: boolean
  label?: string
  icon?: IconValue
  class?: ClassValue
}
