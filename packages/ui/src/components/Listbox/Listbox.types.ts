import type { ClassValue } from '../../types/shared'

export interface ListboxItem {
  value: string | number
  label?: string
  disabled?: boolean
}

export interface ListboxGroup {
  label?: string
  items: ListboxItem[]
}

export interface ListboxProps {
  modelValue?: string | number | (string | number)[]
  defaultValue?: string | number | (string | number)[]
  multiple?: boolean
  disabled?: boolean
  highlightOnHover?: boolean
  size?: 'small' | 'default' | 'large'
  items?: (ListboxItem | ListboxGroup)[]
  class?: ClassValue
}
