import type { ClassValue } from '../../types/shared'

export interface SelectItem {
  value: string | number
  label?: string
  disabled?: boolean
}

export interface SelectGroup {
  label?: string
  items: SelectItem[]
}

export interface SelectProps {
  modelValue?: string | number | (string | number)[]
  defaultValue?: string | number | (string | number)[]
  defaultOpen?: boolean
  open?: boolean
  multiple?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  placeholder?: string
  size?: 'small' | 'default' | 'large'
  items?: (SelectItem | SelectGroup)[]
  class?: ClassValue
}
