import type { ClassValue } from '../../types/shared'

export type AspectRatioPreset = 'square' | 'video' | 'photo' | 'portrait' | 'wide'

/** Numeric `ratio` wins over `preset` when both are provided. */
export interface AspectRatioProps {
  ratio?: number
  preset?: AspectRatioPreset
  /** Forwarded to the underlying reka-ui Primitive. */
  asChild?: boolean
  class?: ClassValue
}
