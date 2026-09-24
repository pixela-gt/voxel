import type { ClassValue } from '../../types/shared'
import type { CardElevation } from '../Card/Card.types'

export interface ClickableCardProps {
  elevation?: CardElevation
  href?: string
  to?: string
  target?: string
  disabled?: boolean
  tag?: string
  class?: ClassValue
}
