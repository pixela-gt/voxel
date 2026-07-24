import type { InjectionKey } from 'vue'
import type {
  ComponentSize,
  AccentColor,
  Density,
  ButtonStyle,
  ClassValue,
} from '../../types/shared'

export interface ButtonGroupProps {
  variant?: ButtonStyle
  color?: AccentColor
  size?: ComponentSize
  density?: Density
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  separators?: boolean
  flat?: boolean
  class?: ClassValue
}

export interface ButtonGroupContext {
  variant?: ButtonStyle
  color?: AccentColor
  size?: ComponentSize
  density?: Density
  disabled?: boolean
}

export const BUTTON_GROUP_KEY: InjectionKey<ButtonGroupContext> = Symbol('voxelButtonGroup')
