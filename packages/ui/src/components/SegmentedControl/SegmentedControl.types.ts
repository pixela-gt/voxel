import type { ClassValue, ComponentSize } from '../../types/shared'

export interface SegmentedControlProps {
  modelValue?: string
  size?: ComponentSize
  disabled?: boolean
  class?: ClassValue
}

export interface SegmentedControlContext {
  size: ComponentSize
  activeValue: string | undefined
}
