import type { ClassValue, ComponentSize } from '../../types/shared'
import type { InputVariant, InputDensity, InputFocusEffect } from '../Input/Input.types'
import type { TimeValue } from 'reka-ui'

export interface TimeFieldProps {
  modelValue?: TimeValue | null
  defaultValue?: TimeValue | null
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
