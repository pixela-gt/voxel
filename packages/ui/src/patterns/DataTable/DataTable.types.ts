import type { ClassValue } from '../../types/shared'

export type SortDirection = 'asc' | 'desc' | null

export interface ColumnDef<T = any> {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string | number
  accessor?: (row: T) => any
}

export interface DataTableProps<T = any> {
  columns: ColumnDef<T>[]
  items: T[]
  pageSize?: number
  loading?: boolean
  class?: ClassValue
  /** Server mode: total records across all pages */
  total?: number
  /** Server mode: current page (v-model) */
  page?: number
  /** Server mode: emit page changes */
  onPageChange?: (page: number) => void
}
