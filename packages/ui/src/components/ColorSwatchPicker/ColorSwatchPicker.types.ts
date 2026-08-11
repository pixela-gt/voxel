import type { ClassValue } from '../../types/shared'

export interface ColorSwatchPickerProps {
  colors: string[]
  modelValue?: string | string[]
  defaultValue?: string | string[]
  multiple?: boolean
  disabled?: boolean
  class?: ClassValue
}