<script setup lang="ts">
import { useSlots } from 'vue'
import { AccordionTrigger as RekaAccordionTrigger } from 'reka-ui'
import type { AccordionTriggerProps } from './Accordion.types'
import { Icon } from '../Icon'

const props = defineProps<AccordionTriggerProps>()
const slots = useSlots()
</script>

<template>
  <RekaAccordionTrigger class="voxel-accordion__trigger" :class="props.class" v-bind="$attrs">
    <span>
      <slot />
    </span>
    <span
      v-if="props.icon || slots.icon"
      class="voxel-accordion__trigger-icon"
      aria-hidden="true"
    >
      <slot name="icon">
        <Icon :icon="props.icon!" />
      </slot>
    </span>
    <svg
      class="voxel-accordion__trigger-icon voxel-accordion__trigger-icon--default"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  </RekaAccordionTrigger>
</template>

<style scoped>
.voxel-accordion__trigger {
  @apply flex items-center justify-between w-full text-left font-sans font-medium text-[var(--color-text-primary)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-accordion__trigger-icon {
  @apply size-5 text-[var(--color-text-secondary)] transition-transform duration-150 inline-flex items-center justify-center;
}

.voxel-accordion__trigger[data-state='open'] .voxel-accordion__trigger-icon--default {
  @apply rotate-180;
}
.voxel-accordion__trigger[data-disabled] {
  @apply cursor-not-allowed;
}
.voxel-accordion__trigger[data-disabled]:hover {
  @apply bg-[var(--color-surface-base)];
}
</style>
