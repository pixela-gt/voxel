import type {
  ComponentSize,
  AccentColor,
  Density,
  ButtonStyle,
  ClassValue,
  IconValue,
} from '../../types/shared'

export interface IconButtonProps {
  style?: ButtonStyle
  color?: AccentColor
  size?: ComponentSize
  density?: Density
  disabled?: boolean
  loading?: boolean
  icon?: IconValue
  'aria-label'?: string
  class?: ClassValue
}
