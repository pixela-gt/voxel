import type { ClassValue } from '../../types/shared'
import type { InputVariant, InputFocusEffect } from '../Input/Input.types'

export interface TextareaProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  rows?: number
  variant?: InputVariant
  focusEffect?: InputFocusEffect
  errorMessage?: string
  name?: string
  class?: ClassValue
}
