<script setup lang="ts">
import { computed } from 'vue'
import { VisuallyHidden } from '../VisuallyHidden'
import type { StatusDotProps } from './StatusDot.types'

const props = withDefaults(defineProps<StatusDotProps>(), {
  status: 'online',
  pulse: false,
} as const)

const rootClass = computed(() => [
  'voxel-status-dot',
  `voxel-status-dot--${props.status}`,
  props.pulse && 'voxel-status-dot--pulse',
  props.class,
])
</script>

<template>
  <span :class="rootClass" role="img" v-bind="$attrs">
    <VisuallyHidden v-if="props.label">{{ props.label }}</VisuallyHidden>
  </span>
</template>

<style scoped>
.voxel-status-dot {
  @apply inline-block size-2 rounded-full
    border border-[var(--color-surface-background)];
}

.voxel-status-dot--online { @apply bg-[var(--color-success-base)]; }
.voxel-status-dot--away { @apply bg-[var(--color-warning-base)]; }
.voxel-status-dot--busy { @apply bg-[var(--color-error-base)]; }
.voxel-status-dot--offline { @apply bg-[var(--color-grey-500)]; }

.voxel-status-dot--pulse {
  animation: voxel-status-dot-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes voxel-status-dot-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
