import type { ClassValue, ComponentSize } from '../../types/shared'

export interface SegmentedControlItemProps {
  value: string
  size?: ComponentSize
  disabled?: boolean
  class?: ClassValue
}
