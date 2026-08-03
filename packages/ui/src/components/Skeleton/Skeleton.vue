<script setup lang="ts">
import { computed } from 'vue'
import type { SkeletonProps } from './Skeleton.types'

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: 'rect',
  count: 1,
} as const)

const styleObject = computed(() => {
  const styles: Record<string, string> = {}
  if (props.width !== undefined) {
    styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height !== undefined) {
    styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return styles
})

const effectiveCount = computed(() => Math.max(1, props.count))
</script>

<template>
  <div
    v-if="effectiveCount === 1"
    aria-hidden="true"
    :class="['voxel-skeleton', `voxel-skeleton--${props.variant}`, props.class]"
    :style="styleObject"
  />
  <div
    v-else
    aria-hidden="true"
    :class="['voxel-skeleton-group', props.class]"
  >
    <div
      v-for="i in effectiveCount"
      :key="i"
      aria-hidden="true"
      :class="[
        'voxel-skeleton',
        `voxel-skeleton--${props.variant}`,
        props.variant === 'text' && i === effectiveCount && effectiveCount > 1 ? 'voxel-skeleton--text-last' : '',
      ]"
      :style="styleObject"
    />
  </div>
</template>

<style scoped>
@keyframes voxel-pulse {
  0%,
    100% {
      opacity: 0.8;
    }
  50% { opacity: 0.2; }
}

.voxel-skeleton {
  @apply bg-[var(--color-surface-light)];
  animation: voxel-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.voxel-skeleton--rect {
  @apply w-full h-4 rounded-[var(--rounded-md)];
}

.voxel-skeleton--text {
  @apply w-full h-[1em] my-1 rounded-[var(--rounded-sm)];
}

.voxel-skeleton--text-last {
  @apply w-4/5;
}

.voxel-skeleton--circle {
  @apply w-12 h-12 rounded-[var(--rounded-full)];
}

.voxel-skeleton-group {
  @apply flex flex-col gap-2 w-full;
}

@media (prefers-reduced-motion: reduce) {
  .voxel-skeleton {
    animation: none;
    opacity: 0.8;
  }
}
</style>
