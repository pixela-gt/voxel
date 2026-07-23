<script setup lang="ts">
import { computed } from 'vue'
import { ProgressRoot, ProgressIndicator } from 'reka-ui'
import type { ProgressProps } from './Progress.types'

const props = withDefaults(defineProps<ProgressProps>(), {
  max: 100,
  size: 'default',
} as const)

const rootClass = computed(() => ['voxel-progress', `voxel-progress--size-${props.size}`, props.class])
const isIndeterminate = computed(() => props.indeterminate || props.modelValue === null || props.modelValue === undefined)
</script>

<template>
  <ProgressRoot
    :modelValue="props.modelValue ?? undefined"
    :max="props.max"
    :class="rootClass"
    v-bind="$attrs"
  >
    <ProgressIndicator
      :class="['voxel-progress__indicator', isIndeterminate && 'voxel-progress__indicator--indeterminate']"
      :style="!isIndeterminate ? { transform: `translateX(-${100 - ((props.modelValue ?? 0) / props.max) * 100}%)` } : undefined"
    />
  </ProgressRoot>
</template>

<style scoped>
.voxel-progress {
  @apply relative w-full overflow-hidden
    bg-[var(--color-grey-200)]
    rounded-full;
}

.voxel-progress--size-small { @apply h-1; }
.voxel-progress--size-default { @apply h-2; }
.voxel-progress--size-large { @apply h-3; }

.voxel-progress__indicator {
  @apply h-full
    bg-[var(--color-primary-base)]
    rounded-full
    transition-transform duration-[var(--transition-fast)];
  width: 100%;
  transform: translateX(-100%);
}

.voxel-progress__indicator--indeterminate {
  @apply absolute top-0 left-0;
  width: 30%;
  animation: voxel-progress-indeterminate 1.4s ease-in-out infinite;
}

@keyframes voxel-progress-indeterminate {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0%); }
  100% { transform: translateX(330%); }
}
</style>
