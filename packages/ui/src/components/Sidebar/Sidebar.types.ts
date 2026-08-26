import type { InjectionKey, Ref } from 'vue'
import type { ClassValue, IconValue } from '../../types/shared'

// Data types for the items array
export interface SidebarItemData {
  icon: IconValue
  label: string
  to?: string
  href?: string
  badge?: string | number
  active?: boolean
  disabled?: boolean
  sub?: boolean
}

export interface SidebarGroupData {
  icon?: IconValue
  label?: string
  items: SidebarItemData[]
  defaultOpen?: boolean
  disabled?: boolean
}

export type SidebarNavItem = SidebarItemData | SidebarGroupData

export function isSidebarGroup(item: SidebarNavItem): item is SidebarGroupData {
  return 'items' in item && Array.isArray(item.items)
}

export function isSidebarItem(item: SidebarNavItem): item is SidebarItemData {
  return !isSidebarGroup(item)
}

// Component props
export interface SidebarProps {
  items?: SidebarNavItem[]
  collapsed?: boolean
  visible?: boolean
  breakpoint?: string
  ariaLabel?: string
  class?: ClassValue
}

export interface SidebarItemProps {
  icon?: IconValue
  label?: string
  to?: string
  href?: string
  badge?: string | number
  active?: boolean
  disabled?: boolean
  sub?: boolean
  class?: ClassValue
}

export interface SidebarItemGroupProps {
  icon?: IconValue
  label?: string
  defaultOpen?: boolean
  disabled?: boolean
  class?: ClassValue
}

// Context for provide/inject
export interface SidebarContext {
  collapsed: Ref<boolean>
}

export const SIDEBAR_KEY: InjectionKey<SidebarContext> = Symbol('voxelSidebar')
