import type { ClassValue } from '../../types/shared'

export type FieldStatusType = 'error' | 'warning' | 'success' | 'info'

export interface FieldStatusProps {
  status?: FieldStatusType
  message?: string
  class?: ClassValue
}
