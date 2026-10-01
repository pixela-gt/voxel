import type { ComponentSize, ClassValue } from '../../types/shared'
import type { AvatarProps } from '../Avatar/Avatar.types'

export interface AvatarGroupProps {
  items: AvatarProps[]
  max?: number
  size?: ComponentSize
  class?: ClassValue
}
