<script setup lang="ts">
import { computed } from 'vue'
import type { VStackProps } from './VStack.types'
import { resolveResponsive } from '../../utils/responsive'

const props = withDefaults(defineProps<VStackProps>(), {
  gap: undefined,
  align: undefined,
  justify: undefined,
})

const stackStyle = computed(() => ({
  display: 'flex' as const,
  flexDirection: 'column' as const,
  ...resolveResponsive(props.gap, 'gap', (v) =>
    typeof v === 'number' ? `calc(var(--space-unit, 4px) * ${v})` : v
  ),
  ...resolveResponsive(props.align, 'align-items', (v) => v),
  ...resolveResponsive(props.justify, 'justify-content', (v) => v),
}))

const rootClass = computed(() => ['voxel-vstack', props.class])
</script>

<template>
  <div :class="rootClass" :style="stackStyle" v-bind="$attrs">
    <slot />
  </div>
</template>
