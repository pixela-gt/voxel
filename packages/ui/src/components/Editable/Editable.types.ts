import type { ClassValue } from '../../types/shared'

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
  class?: ClassValue
}
