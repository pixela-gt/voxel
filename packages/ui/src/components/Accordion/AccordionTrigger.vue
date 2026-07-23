<script setup lang="ts">
import { AccordionTrigger as RekaAccordionTrigger } from 'reka-ui'
import type { AccordionTriggerProps } from './Accordion.types'

const props = defineProps<AccordionTriggerProps>()
</script>

<template>
  <RekaAccordionTrigger
    class="voxel-accordion__trigger"
    :class="props.class"
    v-bind="$attrs"
  >
    <span>
      <slot />
    </span>
    <svg
      class="voxel-accordion__trigger-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
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
  @apply size-5 text-[var(--color-text-secondary)] transition-transform duration-150;
}

.voxel-accordion__trigger[data-state="open"] .voxel-accordion__trigger-icon {
  @apply rotate-180;
}
</style>