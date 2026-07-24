import type { ClassValue } from '../../types/shared'
import type {
  TooltipContentProps,
  TooltipProviderProps,
  TooltipRootProps,
} from 'reka-ui'

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

export type TooltipProps = TooltipRootProps &
  TooltipProviderProps &
  Omit<TooltipContentProps, 'side'> & {
    text?: string
    position?: TooltipPosition
    class?: ClassValue
  }
