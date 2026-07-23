import type { ClassValue } from '../../types/shared'

export interface ContextMenuItem {
  label?: string
  value?: string
  disabled?: boolean
  separator?: boolean
}

export interface ContextMenuProps {
  modal?: boolean
  pressOpenDelay?: number
  items?: ContextMenuItem[]
  class?: ClassValue
}
