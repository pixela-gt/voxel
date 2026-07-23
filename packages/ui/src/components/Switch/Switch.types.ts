import type { ComponentSize, ClassValue } from '../../types/shared'

export interface SwitchProps {
  modelValue?: boolean
  size?: ComponentSize
  disabled?: boolean
  label?: string
  class?: ClassValue
}
