import type { ClassValue } from '../../types/shared'
import type { InputVariant, InputDensity, InputFocusEffect } from '../Input/Input.types'

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
  variant?: InputVariant
  density?: InputDensity
  focusEffect?: InputFocusEffect
  errorMessage?: string
  items?: (ComboboxItem | ComboboxGroup)[]
  class?: ClassValue
}
