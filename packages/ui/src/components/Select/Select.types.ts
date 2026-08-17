import type { ClassValue } from '../../types/shared'
import type { InputVariant, InputDensity, InputFocusEffect } from '../Input/Input.types'

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
  value?: string | number | (string | number)[] // VeeValidate compatibility
  defaultValue?: string | number | (string | number)[]
  defaultOpen?: boolean
  open?: boolean
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
  items?: (SelectItem | SelectGroup)[]
  class?: ClassValue
}
