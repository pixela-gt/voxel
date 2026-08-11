import type { ClassValue, ComponentSize } from '../../types/shared'
import type { InputVariant, InputDensity, InputFocusEffect } from '../Input/Input.types'
import type { Color, ColorChannel } from 'reka-ui'

export interface ColorFieldProps {
  modelValue?: Color | string | null
  defaultValue?: Color | string | null
  placeholder?: string
  channel?: ColorChannel
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