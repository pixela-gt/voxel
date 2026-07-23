import type { ClassValue } from '../../types/shared'

export interface StepperProps {
  modelValue?: number
  defaultValue?: number
  orientation?: 'horizontal' | 'vertical'
  linear?: boolean
  size?: 'small' | 'default' | 'large'
  class?: ClassValue
}

export interface StepperItemProps {
  step: number
  title?: string
  description?: string
  disabled?: boolean
  completed?: boolean
  class?: ClassValue
}
