<script setup lang="ts">
import { computed } from 'vue'
import type { ListItemProps } from './ListItem.types'
import { useListContext } from '../List/useListContext'

const props = withDefaults(defineProps<ListItemProps>(), {
  disabled: false,
} as const)

const ctx = useListContext()

const active = computed(() => {
  if (!ctx || !props.value) return false
  return ctx.isItemSelected(props.value)
})

const isSelectable = computed(() => {
  if (!ctx) return false
  return ctx.selectionMode.value !== 'none' && !props.disabled
})

function handleClick() {
  if (!isSelectable.value || !props.value) return
  ctx!.selectItem(props.value)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleClick()
  }
}

const rootClasses = computed(() => [
  'voxel-list-item',
  ctx && `voxel-list-item--density-${ctx.density.value}`,
  {
    'voxel-list-item--active': active.value,
    'voxel-list-item--disabled': props.disabled,
    'voxel-list-item--selectable': isSelectable.value,
  },
  props.class,
])
</script>

<template>
  <div
    role="listitem"
    :class="rootClasses"
    :tabindex="isSelectable ? 0 : undefined"
    :aria-selected="active"
    :aria-disabled="props.disabled"
    v-bind="$attrs"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <slot name="prepend" />
    <div class="voxel-list-item__content">
      <slot />
      <slot name="secondary" />
    </div>
    <slot name="append" />
  </div>
</template>

<style scoped>
.voxel-list-item {
  @apply flex items-center gap-[var(--space-3)] rounded-[var(--rounded-md)]
    text-[var(--color-text-primary)] font-sans select-none;
}

/* Density variants */
.voxel-list-item--density-compact {
  @apply px-[var(--space-2)] py-[var(--space-1)];
}

.voxel-list-item--density-default {
  @apply px-[var(--space-3)] py-[var(--space-2)];
}

.voxel-list-item--density-comfortable {
  @apply px-[var(--space-4)] py-[var(--space-3)];
}

/* States */
.voxel-list-item--selectable {
  @apply cursor-pointer;
}

.voxel-list-item--selectable:hover {
  @apply bg-[var(--color-surface-light)];
}

.voxel-list-item--selectable:focus-visible {
  @apply outline-none ring-2 ring-[var(--color-primary-base)] ring-offset-2;
}

.voxel-list-item--active {
  @apply bg-[var(--color-primary-lighten-1)] text-[var(--color-primary-darken-1)];
}

.voxel-list-item--disabled {
  @apply opacity-50 cursor-not-allowed pointer-events-none;
}

/* Content area */
.voxel-list-item__content {
  @apply flex flex-col flex-1 min-w-0;
}

/* Slot default renders as primary content */
.voxel-list-item__content > :deep(*) {
  @apply text-[var(--font-size-sm)] leading-[var(--space-5)];
}

/* Secondary text */
.voxel-list-item__content > :deep(.voxel-list-item__secondary) {
  @apply text-[var(--font-size-xs)] text-[var(--color-text-muted)] leading-[var(--space-4)] mt-0.5;
}
</style>
