import type { ClassValue } from '../../types/shared'

export type ListDensity = 'compact' | 'default' | 'comfortable'
export type SelectionMode = 'none' | 'single' | 'multiple'
export type SelectedValue = string | number | (string | number)[]

export interface ListProps {
  density?: ListDensity
  separated?: boolean
  selectionMode?: SelectionMode
  selected?: SelectedValue
  loading?: boolean
  class?: ClassValue
}

export interface ListEmits {
  (e: 'update:selected', value: SelectedValue): void
}
