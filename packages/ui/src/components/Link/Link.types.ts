import type { ComponentSize, AccentColor, Density, IconValue } from '../../types/shared'

export type LinkStyle = 'default' | 'underlined'

export interface LinkProps {
  style?: LinkStyle
  color?: AccentColor
  size?: ComponentSize
  density?: Density
  disabled?: boolean
  label?: string
  icon?: IconValue
  class?: string
}
