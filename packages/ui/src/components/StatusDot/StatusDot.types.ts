import type { ClassValue } from '../../types/shared'

export type StatusDotStatus = 'online' | 'offline' | 'away' | 'busy'

export interface StatusDotProps {
  status?: StatusDotStatus
  pulse?: boolean
  label?: string
  class?: ClassValue
}
