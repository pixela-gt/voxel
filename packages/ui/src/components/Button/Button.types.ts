import type {
  ComponentSize,
  AccentColor,
  Density,
  ButtonStyle,
  ClassValue,
} from '../../types/shared'

export interface ButtonProps {
  buttonStyle?: ButtonStyle
  color?: AccentColor
  size?: ComponentSize
  density?: Density
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  class?: ClassValue
}
