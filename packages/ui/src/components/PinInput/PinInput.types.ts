import type { ClassValue } from '../../types/shared'

export interface PinInputProps {
  modelValue?: string[]
  length?: number
  type?: 'text' | 'number'
  mask?: boolean
  placeholder?: string
  disabled?: boolean
  class?: ClassValue
}
