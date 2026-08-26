import type { ClassValue, ComponentSize } from '../../types/shared'
import type { Color } from 'reka-ui'

export interface ColorSwatchProps {
  value: Color | string
  label?: string
  size?: ComponentSize
  disabled?: boolean
  class?: ClassValue
}