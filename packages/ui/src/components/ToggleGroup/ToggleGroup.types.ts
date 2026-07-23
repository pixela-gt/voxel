import type { ComponentSize } from '../../types/shared'

export interface ToggleGroupProps {
  modelValue?: string | string[]
  type?: 'single' | 'multiple'
  size?: ComponentSize
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  rovingFocus?: boolean
  loop?: boolean
}

export interface ToggleGroupItemProps {
  value: string
  disabled?: boolean
}
