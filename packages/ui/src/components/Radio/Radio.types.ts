import type { ComponentSize } from '../../types/shared'

export interface RadioGroupProps {
  modelValue?: string
  size?: ComponentSize
  disabled?: boolean
  name?: string
  required?: boolean
}

export interface RadioItemProps {
  value: string
  size?: ComponentSize
  disabled?: boolean
  label?: string
}