import type { InjectionKey } from 'vue'
import type { ClassValue, IconValue } from '../../types/shared'

// Root props
export interface DropdownMenuProps {
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  modal?: boolean
  class?: ClassValue
}

// Sub-component props
export interface DropdownMenuItemProps {
  value?: string
  icon?: IconValue
  disabled?: boolean
  destructive?: boolean
  class?: ClassValue
}

export interface DropdownMenuSeparatorProps {
  class?: ClassValue
}

// Context for provide/inject
export interface DropdownMenuContext {
  onSelect: (value: string) => void
}

export const DROPDOWN_MENU_KEY: InjectionKey<DropdownMenuContext> = Symbol('voxelDropdownMenu')
