import type { ClassValue } from '../../types/shared'

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
  class?: ClassValue
}
