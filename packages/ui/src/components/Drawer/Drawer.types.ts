import type { ClassValue, IconValue } from '../../types/shared'

export type DrawerState = 'expanded' | 'collapsed'

export interface DrawerProps {
  state?: DrawerState
  title?: string
  description?: string
  closeIcon?: IconValue
  class?: ClassValue
}
