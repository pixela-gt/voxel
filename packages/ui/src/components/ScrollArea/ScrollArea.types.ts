import type { ClassValue } from '../../types/shared'

export type ScrollAreaType = 'auto' | 'always' | 'scroll' | 'hover'

export interface ScrollAreaProps {
  type?: ScrollAreaType
  scrollHideDelay?: number
  class?: ClassValue
}
