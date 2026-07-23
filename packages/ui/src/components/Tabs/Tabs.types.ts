import type { ClassValue } from '../../types/shared'

export interface TabsProps {
  modelValue?: string
  orientation?: 'horizontal' | 'vertical'
  activationMode?: 'automatic' | 'manual'
  class?: ClassValue
}