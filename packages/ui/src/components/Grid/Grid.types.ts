import type { ClassValue } from '../../types/shared'
import type { ResponsiveValue } from '../../utils/responsive'

export type { ResponsiveValue } from '../../utils/responsive'

export interface GridProps {
  cols?: ResponsiveValue<number | string>
  rows?: ResponsiveValue<number | string>
  gap?: ResponsiveValue<number | string>
  align?: ResponsiveValue<string>
  justify?: ResponsiveValue<string>
  class?: ClassValue
}
