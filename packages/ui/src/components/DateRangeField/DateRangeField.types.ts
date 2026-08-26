import type { ClassValue, ComponentSize } from '../../types/shared'
import type { InputVariant, InputDensity, InputFocusEffect } from '../Input/Input.types'
import type { DateValue, DateRange } from 'reka-ui'

export interface DateRangeFieldProps {
  modelValue?: DateRange | null
  defaultValue?: DateRange | null
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