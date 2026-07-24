import type { ClassValue, ComponentSize } from '../../types/shared'

export interface ToggleGroupProps {
  modelValue?: string | string[]
  type?: 'single' | 'multiple'
  size?: ComponentSize
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  rovingFocus?: boolean
  loop?: boolean
  class?: ClassValue
}

export interface ToggleGroupItemProps {
  value: string
  size?: ComponentSize
  disabled?: boolean
  class?: ClassValue
}

export interface ToggleGroupContext {
  size: ComponentSize
}
