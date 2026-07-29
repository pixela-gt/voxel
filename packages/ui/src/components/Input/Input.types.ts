import type { ClassValue } from '../../types/shared'

export type InputType =
  | 'text' | 'email' | 'password' | 'number' | 'date'
  | 'file' | 'search' | 'tel' | 'url'

export type InputVariant = 'outlined' | 'underlined' | 'ghost'
export type InputDensity = 'default' | 'dense'
export type InputFocusEffect = 'border' | 'elevation' | 'glow'

export interface InputProps {
  type?: InputType
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
  density?: InputDensity
  variant?: InputVariant
  focusEffect?: InputFocusEffect
  errorMessage?: string
  name?: string
  class?: ClassValue
}
