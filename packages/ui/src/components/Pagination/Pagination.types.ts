import type { ClassValue } from '../../types/shared'

export interface PaginationProps {
  page?: number
  defaultPage?: number
  total: number
  itemsPerPage: number
  siblingCount?: number
  showEdges?: boolean
  disabled?: boolean
  size?: 'small' | 'default' | 'large'
  class?: ClassValue
}
