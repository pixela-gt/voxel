import type { ClassValue } from '../../types/shared'
import type { DateRange, DateValue } from 'reka-ui'

export interface RangeCalendarProps {
  modelValue?: DateRange | null
  defaultValue?: DateRange | null
  placeholder?: DateValue
  disabled?: boolean
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  locale?: string
  fixedWeeks?: boolean
  class?: ClassValue
}