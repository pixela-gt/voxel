import type { ClassValue } from '../../types/shared'

export type DrawerState = 'expanded' | 'collapsed'

export interface DrawerProps {
  state?: DrawerState
  title?: string
  description?: string
  class?: ClassValue
}
