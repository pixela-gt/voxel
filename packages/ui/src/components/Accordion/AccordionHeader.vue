<script setup lang="ts">
import { AccordionHeader as RekaAccordionHeader } from 'reka-ui'
import type { AccordionHeaderProps } from './Accordion.types'

const props = defineProps<AccordionHeaderProps>()
</script>

<template>
  <RekaAccordionHeader
    class="voxel-accordion__header"
    :class="props.class"
    v-bind="$attrs"
  >
    <slot />
  </RekaAccordionHeader>
</template>

<style scoped>
.voxel-accordion__header {
  @apply bg-[var(--color-grey-50)] px-4 py-3;
}
</style>