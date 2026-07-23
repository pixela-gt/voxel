import type { ClassValue } from '../../types/shared'

export interface NavigationMenuItem {
  value?: string
  label: string
  href?: string
  description?: string
  items?: NavigationMenuItem[]
}

export interface NavigationMenuProps {
  modelValue?: string
  defaultValue?: string
  orientation?: 'horizontal' | 'vertical'
  delayDuration?: number
  skipDelayDuration?: number
  items?: NavigationMenuItem[]
  class?: ClassValue
}
