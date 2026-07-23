import type { ClassValue } from '../../types/shared'

export interface SliderProps {
  modelValue?: number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  inverted?: boolean
  class?: ClassValue
}
