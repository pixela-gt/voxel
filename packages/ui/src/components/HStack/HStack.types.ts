import type { ClassValue } from '../../types/shared'

export type ResponsiveValue<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T; '2xl'?: T }

export interface StackProps {
  gap?: ResponsiveValue<number | string>
  align?: ResponsiveValue<string>
  justify?: ResponsiveValue<string>
  wrap?: boolean
  class?: ClassValue
}
