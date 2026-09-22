import type { ClassValue } from '../../types/shared'

export type ResponsiveValue<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T; '2xl'?: T }

export interface GridProps {
  cols?: ResponsiveValue<number | string>
  rows?: ResponsiveValue<number | string>
  gap?: ResponsiveValue<number | string>
  align?: ResponsiveValue<string>
  justify?: ResponsiveValue<string>
  class?: ClassValue
}
