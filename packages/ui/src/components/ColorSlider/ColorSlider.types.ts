import type { ClassValue } from '../../types/shared'
import type { Color, ColorChannel } from 'reka-ui'

export interface ColorSliderProps {
  modelValue?: Color | string
  defaultValue?: Color | string
  channel: ColorChannel
  orientation?: 'horizontal' | 'vertical'
  inverted?: boolean
  disabled?: boolean
  class?: ClassValue
}