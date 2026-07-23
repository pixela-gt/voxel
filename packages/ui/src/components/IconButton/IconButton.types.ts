import type {
  ComponentSize,
  AccentColor,
  Density,
  ButtonStyle,
  ClassValue,
} from '../../types/shared'

export interface IconButtonProps {
  style?: ButtonStyle
  color?: AccentColor
  size?: ComponentSize
  density?: Density
  disabled?: boolean
  loading?: boolean
  'aria-label'?: string
  class?: ClassValue
}
