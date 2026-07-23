<script setup lang="ts">
import { computed } from 'vue'
import { ToggleGroupItem } from 'reka-ui'
import type { ComponentSize } from '../../types/shared'

const props = withDefaults(defineProps<{
  value: string
  size?: ComponentSize
  disabled?: boolean
}>(), {
  size: 'default',
  disabled: false,
} as const)

const itemClass = computed(() => [
  'voxel-toggle-group__item',
  `voxel-toggle-group__item--${props.size}`,
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
.voxel-toggle-group__item {
  @apply inline-flex items-center justify-center
    font-sans font-medium text-[var(--color-text-secondary)]
    bg-transparent
    border border-[var(--color-grey-600)]
    rounded-lg
    transition-colors duration-[var(--transition-fast)]
    hover:bg-[var(--color-grey-100)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-toggle-group__item[data-state="on"] {
  @apply bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)]
    border-[var(--color-primary-base)]
    hover:bg-[var(--color-primary-darken-1)];
}

.voxel-toggle-group__item--small {
  @apply h-7 px-2 text-[11px] gap-1;
}

.voxel-toggle-group__item--default {
  @apply h-9 px-3 text-sm gap-1.5;
}

.voxel-toggle-group__item--large {
  @apply h-11 px-4 text-base gap-2;
}
</style>
