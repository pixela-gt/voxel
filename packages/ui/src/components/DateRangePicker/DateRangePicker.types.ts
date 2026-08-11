import type { ClassValue } from '../../types/shared'
import type { DateValue, DateRange } from 'reka-ui'

export interface DateRangePickerProps {
  modelValue?: DateRange | null
  defaultValue?: DateRange | null
  placeholder?: DateValue
  disabled?: boolean
  locale?: string
  class?: ClassValue
}