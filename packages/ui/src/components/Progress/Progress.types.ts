import type { ClassValue } from '../../types/shared'

export interface ProgressProps {
  modelValue?: number | null
  max?: number
  indeterminate?: boolean
  size?: 'small' | 'default' | 'large'
  class?: ClassValue
}
