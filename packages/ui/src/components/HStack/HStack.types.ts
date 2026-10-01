import type { ClassValue } from '../../types/shared'
import type { ResponsiveValue } from '../../utils/responsive'

export type { ResponsiveValue } from '../../utils/responsive'

export interface StackProps {
  gap?: ResponsiveValue<number | string>
  align?: ResponsiveValue<string>
  justify?: ResponsiveValue<string>
  wrap?: boolean
  class?: ClassValue
}
