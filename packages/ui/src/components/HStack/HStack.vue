<script setup lang="ts">
import { computed } from 'vue'
import type { StackProps } from './HStack.types'
import { resolveResponsive } from '../../utils/responsive'

const props = withDefaults(defineProps<StackProps>(), {
  gap: undefined,
  align: undefined,
  justify: undefined,
  wrap: false,
})

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
