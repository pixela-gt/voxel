import type { ClassValue } from '../../types/shared'
import type { Color, ColorChannel, ColorSpace } from 'reka-ui'

export interface ColorAreaProps {
  modelValue?: Color | string
  defaultValue?: Color | string
  colorSpace?: ColorSpace
  xChannel?: ColorChannel
  yChannel?: ColorChannel
  xName?: string
  yName?: string
  disabled?: boolean
  class?: ClassValue
}