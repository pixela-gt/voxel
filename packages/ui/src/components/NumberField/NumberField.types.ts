import type { ClassValue, ComponentSize, IconValue } from '../../types/shared'
import type { InputVariant, InputDensity, InputFocusEffect } from '../Input/Input.types'

export interface NumberFieldProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  size?: ComponentSize
  variant?: InputVariant
  density?: InputDensity
  focusEffect?: InputFocusEffect
  errorMessage?: string
  placeholder?: string
  decrementIcon?: IconValue
  incrementIcon?: IconValue
  class?: ClassValue
}
