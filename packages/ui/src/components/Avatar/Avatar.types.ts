import type { ComponentSize } from '../../types/shared'

export type AvatarStyle = 'default' | 'main'

export interface AvatarProps {
  style?: AvatarStyle
  size?: ComponentSize
  src?: string
  alt?: string
  class?: string | string[] | Record<string, boolean>
}
