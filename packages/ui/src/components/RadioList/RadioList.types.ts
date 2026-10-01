import type { ComponentSize, ClassValue } from '../../types/shared'

export interface RadioListItem {
  value: string
  label?: string
  description?: string
  disabled?: boolean
}

export interface RadioListProps {
  items: RadioListItem[]
  modelValue?: string
  size?: ComponentSize
  disabled?: boolean
  name?: string
  required?: boolean
  error?: boolean
  class?: ClassValue
}
