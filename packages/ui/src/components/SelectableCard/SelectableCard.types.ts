import type { ClassValue, IconValue } from '../../types/shared'
import type { CardElevation } from '../Card/Card.types'

export interface SelectableCardProps {
  modelValue?: boolean
  defaultSelected?: boolean
  selectedIcon?: IconValue
  elevation?: CardElevation
  disabled?: boolean
  class?: ClassValue
}
