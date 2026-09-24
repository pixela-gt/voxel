import type { ClassValue } from '../../types/shared'
import type { ResponsiveValue } from '../HStack/HStack.types'

export type { ResponsiveValue } from '../HStack/HStack.types'

export interface VStackProps {
  gap?: ResponsiveValue<number | string>
  align?: ResponsiveValue<string>
  justify?: ResponsiveValue<string>
  class?: ClassValue
}
