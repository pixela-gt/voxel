import type { ClassValue } from '../../types/shared'
import type { DateRange, DateValue } from 'reka-ui'

export interface MonthRangePickerProps {
  modelValue?: DateRange | null
  defaultValue?: DateRange | null
  placeholder?: DateValue
  disabled?: boolean
  locale?: string
  class?: ClassValue
}