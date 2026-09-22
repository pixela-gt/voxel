import type { InjectionKey } from 'vue'
import type { ClassValue, IconValue } from '../../types/shared'

// Root props
export interface MoreMenuProps {
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  class?: ClassValue
}

// Sub-component props
export interface MoreMenuItemProps {
  value?: string
  icon?: IconValue
  disabled?: boolean
  destructive?: boolean
  class?: ClassValue
}

export interface MoreMenuSeparatorProps {
  class?: ClassValue
}

// Context for provide/inject
export interface MoreMenuContext {
  onSelect: (value: string) => void
}

export const MORE_MENU_KEY: InjectionKey<MoreMenuContext> = Symbol('voxelMoreMenu')
