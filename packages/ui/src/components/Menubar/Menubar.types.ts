import type { ClassValue } from '../../types/shared'

export interface MenubarItem {
  value: string
  label: string
  items?: MenubarItem[]
  disabled?: boolean
  separator?: boolean
}

export interface MenubarProps {
  modelValue?: string
  defaultValue?: string
  items?: MenubarItem[]
  loop?: boolean
  class?: ClassValue
}
