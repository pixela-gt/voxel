<script setup lang="ts">
import { computed } from 'vue'
import type { FormGridProps } from './FormGrid.types'

const props = withDefaults(defineProps<FormGridProps>(), {
  labelWidth: '150px',
  gap: '12px',
} as const)

const rootClass = computed(() => ['voxel-form-grid', props.class])

const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `${props.labelWidth} 1fr`,
  gap: props.gap,
}))
</script>

<template>
  <div :class="rootClass" :style="gridStyle" v-bind="$attrs">
    <slot />
  </div>
</template>

<style scoped>
.voxel-form-grid {
  @apply w-full;
}

@media (max-width: 640px) {
  .voxel-form-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
