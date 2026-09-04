<script setup lang="ts">
import { computed } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from 'reka-ui'
import type { CollapsibleProps } from './Collapsible.types'

const props = withDefaults(defineProps<CollapsibleProps>(), {
  open: undefined,
  defaultOpen: undefined,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const rootClass = computed(() => ['voxel-collapsible', props.class])

// Forward open/defaultOpen conditionally to avoid Vue 3 boolean-casting bug
const rootBindings = computed(() => ({
  ...(props.open !== undefined ? { open: props.open } : {}),
  ...(props.defaultOpen !== undefined ? { defaultOpen: props.defaultOpen } : {}),
}))
</script>

<template>
  <CollapsibleRoot
    v-bind="rootBindings"
    :disabled="props.disabled"
    @update:open="(v: boolean) => emit('update:open', v)"
    :class="rootClass"
  >
    <CollapsibleTrigger class="voxel-collapsible__trigger">
      <slot name="trigger" />
      <svg class="voxel-collapsible__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </CollapsibleTrigger>
    <CollapsibleContent class="voxel-collapsible__content">
      <slot />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<style scoped>
.voxel-collapsible {
  @apply inline-flex flex-col w-full;
}

.voxel-collapsible__trigger {
  @apply inline-flex items-center gap-1.5
    text-sm font-medium text-[var(--color-text-primary)]
    cursor-pointer
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2 rounded;
}

.voxel-collapsible__icon {
  @apply text-[var(--color-text-secondary)] transition-transform;
}

[data-state='open'] > .voxel-collapsible__icon,
[data-state='open'] .voxel-collapsible__icon {
  @apply rotate-180;
}

.voxel-collapsible__content {
  @apply overflow-hidden;
  animation: voxel-collapsible-down 200ms ease-out;
}

[data-state='closed'] > .voxel-collapsible__content,
[data-state='closed'] .voxel-collapsible__content {
  animation: voxel-collapsible-up 200ms ease-out;
}

@keyframes voxel-collapsible-down {
  from { height: 0; opacity: 0; }
  to { height: var(--reka-collapsible-content-height); opacity: 1; }
}

@keyframes voxel-collapsible-up {
  from { height: var(--reka-collapsible-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
}
</style>
