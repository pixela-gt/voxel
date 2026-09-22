<script setup lang="ts">
import { computed } from 'vue'
import type { GridProps, ResponsiveValue } from './Grid.types'

const props = withDefaults(defineProps<GridProps>(), {
  gap: undefined,
  align: undefined,
  justify: undefined,
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

const gridStyle = computed(() => ({
  display: 'grid',
  ...resolveResponsive(props.cols, 'grid-template-columns', (v) =>
    typeof v === 'number' ? `repeat(${v}, minmax(0, 1fr))` : v
  ),
  ...resolveResponsive(props.rows, 'grid-template-rows', (v) =>
    typeof v === 'number' ? `repeat(${v}, minmax(0, 1fr))` : v
  ),
  ...resolveResponsive(props.gap, 'gap', (v) =>
    typeof v === 'number' ? `calc(var(--space-unit, 4px) * ${v})` : v
  ),
  ...resolveResponsive(props.align, 'align-items', (v) => v),
  ...resolveResponsive(props.justify, 'justify-items', (v) => v),
}))

const rootClass = computed(() => ['voxel-grid', props.class])
</script>

<template>
  <div :class="rootClass" :style="gridStyle" v-bind="$attrs">
    <slot />
  </div>
</template>
