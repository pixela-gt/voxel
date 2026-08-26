import type { ClassValue } from '../../types/shared'
import type { DateValue } from 'reka-ui'

export interface YearPickerProps {
  modelValue?: DateValue | null
  defaultValue?: DateValue | null
  placeholder?: DateValue
  queryDecade?: number
  disabled?: boolean
  locale?: string
  class?: ClassValue
}