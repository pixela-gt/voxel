// Shared responsive object syntax utility
// Used by Grid, HStack, VStack, Stack, Center to resolve responsive values into CSS

export type ResponsiveValue<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T; '2xl'?: T }

export const breakpointMap: Record<string, string> = {
  sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px',
}

export function resolveResponsive<T extends string | number>(
  value: ResponsiveValue<T> | undefined,
  cssProp: string,
  transform: (v: T) => string,
): Record<string, string> {
  if (value === undefined || value === null) return {}
  if (typeof value !== 'object') return { [cssProp]: transform(value) }
  const result: Record<string, string> = {}
  for (const [bp, val] of Object.entries(value)) {
    if (bp === 'base') {
      result[cssProp] = transform(val as T)
    } else {
      result[`@media (min-width: ${breakpointMap[bp]})`] = `${cssProp}: ${transform(val as T)}`
    }
  }
  return result
}
