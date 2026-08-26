import type { ClassValue } from '../../types/shared'

export interface HoverCardProps {
  open?: boolean
  defaultOpen?: boolean
  openDelay?: number
  closeDelay?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  /** Show the pointing arrow at the panel edge. Default true. */
  showArrow?: boolean
  class?: ClassValue
}
