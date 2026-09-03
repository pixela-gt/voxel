import type { ClassValue } from '../../types/shared'

// Root
export interface NavigationMenuProps {
  modelValue?: string
  defaultValue?: string
  orientation?: 'horizontal' | 'vertical'
  delayDuration?: number
  skipDelayDuration?: number
  class?: ClassValue
}

// List (wraps NavigationMenuList)
export interface NavigationMenuListProps {
  class?: ClassValue
}

// Item (wraps NavigationMenuItem)
export interface NavigationMenuItemProps {
  value?: string
  class?: ClassValue
}

// Trigger (wraps NavigationMenuTrigger)
export interface NavigationMenuTriggerProps {
  class?: ClassValue
}

// Content (wraps NavigationMenuContent) — no class prop; Vue handles via $attrs
export interface NavigationMenuContentProps {}

// Link (wraps NavigationMenuLink, adds router support) — no class prop; Vue handles via $attrs
export interface NavigationMenuLinkProps {
  to?: string
  href?: string
  active?: boolean
  exact?: boolean
  description?: string
}

// Section (presentational wrapper)
export interface NavigationMenuSectionProps {
  class?: ClassValue
}
