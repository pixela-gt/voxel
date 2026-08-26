import type {
  ComponentSize,
  AccentColor,
  Density,
  IconValue,
  ClassValue,
} from '../../types/shared'

export type LinkStyle = 'default' | 'underlined'

export interface LinkProps {
  style?: LinkStyle
  color?: AccentColor
  size?: ComponentSize
  density?: Density
  disabled?: boolean
  to?: string
  label?: string
  icon?: IconValue
  class?: ClassValue
}
