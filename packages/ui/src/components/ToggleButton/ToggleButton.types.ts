import type { ClassValue } from '../../types/shared'

export interface ToggleButtonProps {
  type?: 'button' | 'icon-button'
  pressed?: boolean
  disabled?: boolean
  value?: string
  class?: ClassValue
}

export interface ToggleButtonGroupProps {
  modelValue?: string[]
  type?: 'single' | 'multiple'
}