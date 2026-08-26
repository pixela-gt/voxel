import type { AccentColor, ClassValue, ComponentSize } from '../../types/shared'

export type AvatarStyle = 'default' | 'main'
export type AvatarShape = 'rounded' | 'circle'
export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline'

export interface AvatarProps {
  style?: AvatarStyle
  size?: ComponentSize
  shape?: AvatarShape
  name?: string
  color?: AccentColor
  status?: AvatarStatus
  src?: string
  alt?: string
  class?: ClassValue
}
