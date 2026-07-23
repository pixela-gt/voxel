import type { ComponentSize } from '../../types/shared'

export interface CheckboxProps {
  modelValue?: boolean
  size?: ComponentSize
  disabled?: boolean
  label?: string
  class?: string | string[] | Record<string, boolean>
}