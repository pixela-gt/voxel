import type { ClassValue, ComponentSize } from '../../types/shared'
import type { InputVariant, InputDensity, InputFocusEffect } from '../Input/Input.types'
import type { TimeValue } from 'reka-ui'

export interface TimeRangeValue {
  start: TimeValue | null
  end: TimeValue | null
}

export interface TimeRangeFieldProps {
  modelValue?: TimeRangeValue | null
  defaultValue?: TimeRangeValue | null
  placeholder?: TimeValue
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
