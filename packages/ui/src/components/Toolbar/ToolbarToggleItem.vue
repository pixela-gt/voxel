<script setup lang="ts">
import { computed, inject } from 'vue'
import { ToolbarToggleItem as RekaToolbarToggleItem } from 'reka-ui'
import type { ToolbarToggleItemProps, ToolbarToggleContext } from './Toolbar.types'
import { TOOLBAR_TOGGLE_KEY } from './Toolbar.types'

const props = withDefaults(defineProps<ToolbarToggleItemProps>(), {
  size: undefined,
  disabled: false,
} as const)

const toggleContext = inject<ToolbarToggleContext | null>(TOOLBAR_TOGGLE_KEY, null)

const effectiveSize = computed(() => props.size ?? toggleContext?.size ?? 'default')

const itemClass = computed(() => [
  'voxel-toolbar-toggle-item',
  `voxel-toolbar-toggle-item--size-${effectiveSize.value}`,
  props.class,
])
</script>

<template>
  <RekaToolbarToggleItem
    :value="props.value"
    :disabled="props.disabled"
    :class="itemClass"
    v-bind="$attrs"
  >
    <slot />
  </RekaToolbarToggleItem>
</template>

<style scoped>
.voxel-toolbar-toggle-item {
  @apply inline-flex items-center justify-center
    font-sans font-bold tracking-[0.07px]
    bg-transparent
    text-[var(--color-primary-base)]
    transition-colors duration-[var(--transition-fast)]
    hover:bg-[var(--color-primary-lighten-1)]/12
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed;
  corner-smoothing: 60%;
}

.voxel-toolbar-toggle-item[data-state='on'] {
  @apply bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)];
}

.voxel-toolbar-toggle-item[data-state='on']:hover {
  @apply bg-[var(--color-primary-darken-1)];
}

.voxel-toolbar-toggle-item--size-small {
  @apply px-5 py-1 text-xs rounded-[10px] gap-[4px];
}

.voxel-toolbar-toggle-item--size-default {
  @apply px-6 py-2 text-sm rounded-[12px] gap-[6px];
}

.voxel-toolbar-toggle-item--size-large {
  @apply px-7 py-3 text-base rounded-[14px] gap-[8px];
}
</style>
