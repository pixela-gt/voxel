<script setup lang="ts">
import { AccordionContent as RekaAccordionContent } from 'reka-ui'
import type { AccordionContentProps } from './Accordion.types'

const props = defineProps<AccordionContentProps>()
</script>

<template>
  <RekaAccordionContent class="voxel-accordion__content" :class="props.class" v-bind="$attrs">
    <div class="voxel-accordion__content-inner">
      <slot />
    </div>
  </RekaAccordionContent>
</template>

<style scoped>
.voxel-accordion__content {
  @apply overflow-hidden text-[var(--color-text-secondary)];
}

.voxel-accordion__content[data-state='open'] {
  @apply animate-accordion-down;
}

.voxel-accordion__content[data-state='closed'] {
  @apply animate-accordion-up;
}

.voxel-accordion__content-inner {
  @apply px-4 py-3;
}
</style>
