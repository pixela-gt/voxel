import type { ClassValue } from '../../types/shared'

export type TimestampFormat = 'relative' | 'absolute'

export interface TimestampProps {
  datetime: string | Date
  format?: TimestampFormat
  locale?: string
  class?: ClassValue
}
