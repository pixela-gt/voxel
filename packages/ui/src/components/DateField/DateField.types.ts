import type { ClassValue, ComponentSize } from '../../types/shared'
import type { InputVariant, InputDensity, InputFocusEffect } from '../Input/Input.types'
import type { DateValue } from 'reka-ui'

export interface DateFieldProps {
  modelValue?: DateValue | null
  defaultValue?: DateValue | null
  placeholder?: DateValue
  disabled?: boolean
  readonly?: boolean
  name?: string
  variant?: InputVariant
  size?: ComponentSize
  density?: InputDensity
  focusEffect?: InputFocusEffect
  errorMessage?: string
  class?: ClassValue
}