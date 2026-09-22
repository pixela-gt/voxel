import type { Component } from 'vue'
import type { ClassValue } from '../../types/shared'

export interface MoreMenuItem {
  label?: string
  value?: string
  icon?: Component
  disabled?: boolean
  destructive?: boolean
  separator?: boolean
}

export interface MoreMenuProps {
  items?: MoreMenuItem[]
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  class?: ClassValue
}
