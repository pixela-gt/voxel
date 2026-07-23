import type { ClassValue } from '../../types/shared'

export interface AlertDialogProps {
  open?: boolean
  defaultOpen?: boolean
  title?: string
  description?: string
  variant?: 'info' | 'warning' | 'error' | 'success'
  class?: ClassValue
}
