import type { ClassValue } from '../../types/shared'

export interface FieldDef {
  key: string
  label?: string
  /** Custom accessor for nested or computed values */
  accessor?: (item: any) => any
}

export type MissingValueBehavior = 'dash' | 'hide' | 'custom'

export interface AttributePresenterProps<T = any> {
  /** The entity object to display */
  item: T
  /** Explicit field definitions. If not provided, all keys from item are used */
  fields?: FieldDef[]
  /** Loading state */
  loading?: boolean
  /** Number of skeleton rows to show when loading */
  skeletonCount?: number
  /** Text to show when item is null/undefined or has no properties */
  emptyText?: string
  /** How to handle missing/null/undefined values */
  missingBehavior?: MissingValueBehavior
  /** Custom fallback value when missingBehavior is 'custom' */
  missingFallback?: string
  /** Card elevation */
  elevation?: 'flat' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Card shadow */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Dense mode for compact styling */
  dense?: boolean
  /** Title displayed above the attribute list */
  title?: string
  class?: ClassValue
}
