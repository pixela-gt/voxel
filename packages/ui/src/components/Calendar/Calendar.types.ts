import type { ClassValue } from '../../types/shared'
import type { DateValue } from 'reka-ui'

export interface CalendarProps {
  modelValue?: DateValue | null
  defaultValue?: DateValue | null
  placeholder?: DateValue
  disabled?: boolean
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  locale?: string
  fixedWeeks?: boolean
  class?: ClassValue
}