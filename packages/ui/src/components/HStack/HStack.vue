<script setup lang="ts">
import { computed } from 'vue'
import type { StackProps, ResponsiveValue } from './HStack.types'

const props = withDefaults(defineProps<StackProps>(), {
  gap: undefined,
  align: undefined,
  justify: undefined,
  wrap: false,
})

const breakpointMap: Record<string, string> = {
  sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px',
}

function resolveResponsive<T extends string | number>(
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

const stackStyle = computed(() => ({
  display: 'flex' as const,
  flexDirection: 'row' as const,
  ...(props.wrap ? { flexWrap: 'wrap' as const } : {}),
  ...resolveResponsive(props.gap, 'gap', (v) =>
    typeof v === 'number' ? `calc(var(--space-unit, 4px) * ${v})` : v
  ),
  ...resolveResponsive(props.align, 'align-items', (v) => v),
  ...resolveResponsive(props.justify, 'justify-content', (v) => v),
}))

const rootClass = computed(() => ['voxel-hstack', props.class])
</script>

<template>
  <div :class="rootClass" :style="stackStyle" v-bind="$attrs">
    <slot />
  </div>
</template>
