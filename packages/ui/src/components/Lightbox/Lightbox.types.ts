import type { ClassValue, IconValue } from '../../types/shared'

export interface LightboxImage {
  src: string
  alt?: string
  caption?: string
}

export interface LightboxProps {
  open?: boolean
  defaultOpen?: boolean
  src?: string
  alt?: string
  caption?: string
  images?: LightboxImage[]
  closeIcon?: IconValue
  class?: ClassValue
}
