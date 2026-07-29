import type { ClassValue } from '../../types/shared'
import type { ColumnDef } from '../DataTable/DataTable.types'

export interface DataTableServerProps<T = any> {
  columns: ColumnDef<T>[]
  items: T[]
  total: number
  page?: number
  pageSize?: number
  loading?: boolean
  class?: ClassValue
}
