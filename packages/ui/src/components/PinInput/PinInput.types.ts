import type { ClassValue, ComponentSize } from '../../types/shared'
import type { InputVariant, InputDensity, InputFocusEffect } from '../Input/Input.types'

export interface PinInputProps {
  modelValue?: string[]
  length?: number
  type?: 'text' | 'number'
  mask?: boolean
  placeholder?: string
  disabled?: boolean
  variant?: InputVariant
  size?: ComponentSize
  density?: InputDensity
  focusEffect?: InputFocusEffect
  errorMessage?: string
  name?: string
  class?: ClassValue
}
