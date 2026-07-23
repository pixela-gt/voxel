import type { ClassValue } from '../../types/shared'

export interface ComboboxItem {
  value: string | number
  label?: string
  disabled?: boolean
}

export interface ComboboxGroup {
  label?: string
  items: ComboboxItem[]
}

export interface ComboboxProps {
  modelValue?: string | number | (string | number)[]
  defaultValue?: string | number | (string | number)[]
  open?: boolean
  defaultOpen?: boolean
  multiple?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  placeholder?: string
  size?: 'small' | 'default' | 'large'
  items?: (ComboboxItem | ComboboxGroup)[]
  class?: ClassValue
}
