import type {
  ComponentSize,
  AccentColor,
  Density,
  ButtonStyle,
  ClassValue,
  IconValue,
} from '../../types/shared'

export interface ButtonProps {
  variant?: ButtonStyle
  color?: AccentColor
  size?: ComponentSize
  density?: Density
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  prependIcon?: IconValue
  appendIcon?: IconValue
  class?: ClassValue
}
