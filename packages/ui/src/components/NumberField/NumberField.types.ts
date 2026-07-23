import type { ComponentSize } from '../../types/shared'

export interface NumberFieldProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  size?: ComponentSize
  placeholder?: string
}
