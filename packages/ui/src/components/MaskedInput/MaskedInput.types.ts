import type { ClassValue } from '../../types/shared'
import type { InputType, InputVariant, InputDensity, InputFocusEffect } from '../Input/Input.types'

export interface MaskedInputProps {
  modelValue?: string
  type?: InputType
  placeholder?: string
  disabled?: boolean
  density?: InputDensity
  variant?: InputVariant
  focusEffect?: InputFocusEffect
  errorMessage?: string
  name?: string
  mask?: string
  class?: ClassValue
}
