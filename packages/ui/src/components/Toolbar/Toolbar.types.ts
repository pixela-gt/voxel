import type { InjectionKey } from 'vue'
import type {
  ComponentSize,
  AccentColor,
  Density,
  ButtonStyle,
  ClassValue,
  IconValue,
} from '../../types/shared'

// Root
export interface ToolbarProps {
  orientation?: 'horizontal' | 'vertical'
  class?: ClassValue
}

export interface ToolbarContext {
  orientation: 'horizontal' | 'vertical'
}

export const TOOLBAR_KEY: InjectionKey<ToolbarContext> = Symbol('voxelToolbar')

// Button
export interface ToolbarButtonProps {
  variant?: ButtonStyle
  color?: AccentColor
  size?: ComponentSize
  density?: Density
  disabled?: boolean
  prependIcon?: IconValue
  appendIcon?: IconValue
  class?: ClassValue
}

// Link
export interface ToolbarLinkProps {
  color?: AccentColor
  size?: ComponentSize
  density?: Density
  disabled?: boolean
  label?: string
  class?: ClassValue
}

// Separator
export interface ToolbarSeparatorProps {
  class?: ClassValue
}

// ToggleGroup
export interface ToolbarToggleGroupProps {
  modelValue?: string | string[]
  type?: 'single' | 'multiple'
  disabled?: boolean
  rovingFocus?: boolean
  loop?: boolean
  class?: ClassValue
}

// ToggleItem
export interface ToolbarToggleItemProps {
  value: string
  size?: ComponentSize
  disabled?: boolean
  class?: ClassValue
}

export interface ToolbarToggleContext {
  size: ComponentSize
}

export const TOOLBAR_TOGGLE_KEY: InjectionKey<ToolbarToggleContext> = Symbol('voxelToolbarToggle')
