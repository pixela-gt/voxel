import type { ClassValue, ComponentSize } from '../../types/shared'
import type { InputVariant, InputDensity, InputFocusEffect } from '../Input/Input.types'

export interface TimeFieldProps {
  modelValue?: any | null
  defaultValue?: any | null
  placeholder?: any
  disabled?: boolean
  readonly?: boolean
  name?: string
  variant?: InputVariant
  size?: ComponentSize
  density?: InputDensity
  focusEffect?: InputFocusEffect
  errorMessage?: string
  class?: ClassValue
}
