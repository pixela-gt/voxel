import type { ClassValue, IconValue } from '../../types/shared'

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
  /** Renders the built-in top-right close button. Defaults to true. */
  showClose?: boolean
  /** Custom close icon component (rendered via the shared Icon component). */
  closeIcon?: IconValue
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  class?: ClassValue
}
