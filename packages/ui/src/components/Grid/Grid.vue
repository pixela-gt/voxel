<script setup lang="ts">
import { computed } from 'vue'
import type { GridProps } from './Grid.types'
import { resolveResponsive } from '../../utils/responsive'

const props = withDefaults(defineProps<GridProps>(), {
  gap: undefined,
  align: undefined,
  justify: undefined,
})

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
