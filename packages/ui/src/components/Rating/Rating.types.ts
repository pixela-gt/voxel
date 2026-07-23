import type { ClassValue } from '../../types/shared'

export interface RatingProps {
  // ponytail: alpha, reka API may shift
  modelValue?: number
  defaultValue?: number
  max?: number
  disabled?: boolean
  required?: boolean
  name?: string
  size?: 'small' | 'default' | 'large'
  class?: ClassValue
}
