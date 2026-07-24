import type { ClassValue, IconValue } from '../../types/shared'

export interface AlertDialogProps {
  open?: boolean
  defaultOpen?: boolean
  title?: string
  description?: string
  variant?: 'info' | 'warning' | 'error' | 'success'
  icon?: IconValue
  class?: ClassValue
}
