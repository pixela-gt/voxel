<script setup lang="ts">
import { computed } from 'vue'
import { PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent, PopoverArrow, PopoverClose } from 'reka-ui'
import type { PopoverProps } from './Popover.types'
import { Icon } from '../Icon'

// `open`/`defaultOpen` need `default: undefined` so Vue does NOT cast an absent
// Boolean prop to `false` (Vue 3 boolean casting). Without this, `props.open` is
// `false` even when unset, forcing reka into controlled-closed mode.
const props = withDefaults(defineProps<PopoverProps>(), {
  open: undefined,
  defaultOpen: undefined,
  modal: false,
  showClose: true,
} as const)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const rootClass = computed(() => ['voxel-popover', props.class])

// Unified open-state pattern (see BUG-008/BUG-009): forward open/defaultOpen
// conditionally so reka's own controlled/uncontrolled handling stays intact
// (reka's sentinel is `open === undefined`, preserved by the defaults above).
const rootBindings = computed(() => ({
  ...(props.open !== undefined ? { open: props.open } : {}),
  ...(props.defaultOpen !== undefined ? { defaultOpen: props.defaultOpen } : {}),
}))
</script>

<template>
  <PopoverRoot
    v-bind="rootBindings"
    :modal="props.modal"
    @update:open="(v: boolean) => emit('update:open', v)"
    :class="rootClass"
  >
    <PopoverTrigger as-child>
      <slot />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        class="voxel-popover__content"
        :side-offset="8"
        :side="props.side"
        :align="props.align"
      >
        <slot name="content" />
        <PopoverArrow class="voxel-popover__arrow" />
        <PopoverClose v-if="props.showClose" class="voxel-popover__close" aria-label="Close">
          <span class="voxel-popover__close-icon" aria-hidden="true">
            <slot name="close-icon">
              <Icon v-if="props.closeIcon" :icon="props.closeIcon" />
              <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3L9 9M9 3L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
            </slot>
          </span>
        </PopoverClose>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style>
.voxel-popover {
  @apply inline-flex;
}

.voxel-popover__content {
  @apply bg-[var(--color-surface-base)]
    rounded-lg shadow-[var(--shadow-md)]
    p-4
    text-sm text-[var(--color-text-primary)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    z-50;
  max-width: 320px;
}

.voxel-popover__arrow {
  @apply fill-[var(--color-surface-base)] size-2.5;
}

.voxel-popover__close {
  @apply absolute top-2 right-2 inline-flex items-center justify-center
    text-[var(--color-text-secondary)]
    hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-light)]
    rounded p-0.5
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)];
}

.voxel-popover__close-icon {
  @apply flex items-center justify-center size-4;
}

.voxel-popover__close-icon > * {
  @apply size-full;
}
</style>
