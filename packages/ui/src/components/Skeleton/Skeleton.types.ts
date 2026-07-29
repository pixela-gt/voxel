import type { ClassValue } from '../../types/shared'

export type SkeletonVariant = 'rect' | 'text' | 'circle'

export interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  count?: number
  class?: ClassValue
}
