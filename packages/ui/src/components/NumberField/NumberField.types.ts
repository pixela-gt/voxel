import type { ComponentSize, IconValue } from '../../types/shared'

export interface NumberFieldProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  size?: ComponentSize
  placeholder?: string
  decrementIcon?: IconValue
  incrementIcon?: IconValue
}
