<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent, PopoverArrow, PopoverClose } from 'reka-ui'
import type { PopoverProps } from './Popover.types'

const props = withDefaults(defineProps<PopoverProps>(), {
  modal: false,
} as const)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const rootClass = computed(() => ['voxel-popover', props.class])

const controlled = computed(() => props.open !== undefined)
const isOpen = ref(props.open ?? props.defaultOpen ?? false)

watch(() => props.open, (v) => {
  if (v !== undefined) isOpen.value = v
})

function onUpdateOpen(v: boolean) {
  if (props.open === undefined) isOpen.value = v
  emit('update:open', v)
}
</script>

<template>
  <PopoverRoot
    v-bind="controlled ? { open: isOpen } : { defaultOpen: props.defaultOpen }"
    :modal="props.modal"
    @update:open="onUpdateOpen"
    :class="rootClass"
  >
    <PopoverTrigger as-child>
      <slot />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent class="voxel-popover__content" :side-offset="8">
        <slot name="content" />
        <PopoverArrow class="voxel-popover__arrow" />
        <PopoverClose class="voxel-popover__close" aria-label="Close">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3L9 9M9 3L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
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
    hover:text-[var(--color-text-primary)] hover:bg-[var(--color-grey-100)]
    rounded p-0.5
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)];
}
</style>
