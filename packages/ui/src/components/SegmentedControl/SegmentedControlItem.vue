<script setup lang="ts">
import { computed, inject } from 'vue'
import { ToggleGroupItem } from 'reka-ui'
import type { SegmentedControlContext } from './SegmentedControl.types'
import type { SegmentedControlItemProps } from './SegmentedControlItem.types'

const props = withDefaults(defineProps<SegmentedControlItemProps>(), {
  size: undefined,
  disabled: false,
} as const)

const group = inject<SegmentedControlContext | null>('voxelSegmentedControl', null)

const effectiveSize = computed(() => props.size ?? group?.size ?? 'default')

const itemClass = computed(() => [
  'voxel-segmented-control__item',
  `voxel-segmented-control__item--size-${effectiveSize.value}`,
  props.class,
])
</script>

<template>
  <ToggleGroupItem
    :value="props.value"
    :disabled="props.disabled"
    :class="itemClass"
  >
    <slot />
  </ToggleGroupItem>
</template>

<style scoped>
.voxel-segmented-control__item {
  @apply inline-flex items-center justify-center
    font-sans font-bold tracking-[0.07px]
    bg-transparent text-[var(--color-primary-base)]
    transition-colors duration-150
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed;
  corner-smoothing: 60%;
}

.voxel-segmented-control__item[data-state='on'] {
  @apply text-[var(--color-text-on-primary)];
}

.voxel-segmented-control__item--size-small {
  @apply px-4 py-1 text-xs rounded-md;
}

.voxel-segmented-control__item--size-default {
  @apply px-4 py-2 text-sm rounded-lg;
}

.voxel-segmented-control__item--size-large {
  @apply px-5 py-3 text-base rounded-lg;
}
</style>
