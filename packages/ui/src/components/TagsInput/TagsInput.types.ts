import type { ClassValue } from '../../types/shared'
import type { InputVariant, InputDensity, InputFocusEffect } from '../Input/Input.types'

export interface TagsInputProps {
  modelValue?: string[]
  defaultValue?: string[]
  delimiter?: string | RegExp
  max?: number
  disabled?: boolean
  addOnPaste?: boolean
  addOnBlur?: boolean
  addOnTab?: boolean
  duplicate?: boolean
  placeholder?: string
  size?: 'small' | 'default' | 'large'
  variant?: InputVariant
  density?: InputDensity
  focusEffect?: InputFocusEffect
  errorMessage?: string
  class?: ClassValue
}
