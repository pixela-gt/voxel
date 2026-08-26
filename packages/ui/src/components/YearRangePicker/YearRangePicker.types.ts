import type { ClassValue } from '../../types/shared'
import type { DateRange, DateValue } from 'reka-ui'

export interface YearRangePickerProps {
  modelValue?: DateRange | null
  defaultValue?: DateRange | null
  placeholder?: DateValue
  queryDecade?: number
  disabled?: boolean
  locale?: string
  class?: ClassValue
}