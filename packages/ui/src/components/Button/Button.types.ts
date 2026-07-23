import type { ComponentSize, AccentColor, Density, ButtonStyle, ClassValue } from '../../types/shared'

export interface ButtonProps {
  style?: ButtonStyle
  color?: AccentColor
  size?: ComponentSize
  density?: Density
  prependIcon?: boolean
  appendIcon?: boolean
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  class?: ClassValue
}