import type { ClassValue } from '../../types/shared'
import type { DateValue } from 'reka-ui'

export interface DatePickerProps {
  modelValue?: DateValue | null
  defaultValue?: DateValue | null
  placeholder?: DateValue
  disabled?: boolean
  locale?: string
  class?: ClassValue
}