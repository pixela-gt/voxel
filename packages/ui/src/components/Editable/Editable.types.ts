import type { ClassValue } from '../../types/shared'
import type { InputVariant, InputDensity, InputFocusEffect } from '../Input/Input.types'

export interface EditableProps {
  modelValue?: string | null
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  submitMode?: 'blur' | 'enter' | 'both' | 'none'
  activationMode?: 'focus' | 'dblclick' | 'none'
  selectOnFocus?: boolean
  maxLength?: number
  startWithEditMode?: boolean
  size?: 'small' | 'default' | 'large'
  variant?: InputVariant
  density?: InputDensity
  focusEffect?: InputFocusEffect
  errorMessage?: string
  class?: ClassValue
}
