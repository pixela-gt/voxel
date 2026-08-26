import type { ClassValue, IconValue } from '../../types/shared'

export interface DrawerProps {
  /** Controlled open state. When provided the drawer is fully controlled. */
  open?: boolean
  /** Uncontrolled initial state. Ignored when `open` is provided. */
  defaultOpen?: boolean
  /** Edge the panel slides in from. Defaults to `'right'`. */
  side?: 'left' | 'right'
  /** Panel width. Numbers become px; strings pass through (e.g. `'40rem'`). Defaults to 255px. */
  width?: number | string
  title?: string
  description?: string
  closeIcon?: IconValue
  class?: ClassValue
}
