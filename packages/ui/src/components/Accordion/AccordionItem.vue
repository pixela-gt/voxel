<script setup lang="ts">
import { AccordionItem as RekaAccordionItem } from 'reka-ui'
import type { AccordionItemProps } from './Accordion.types'

const props = withDefaults(defineProps<AccordionItemProps>(), {
  disabled: false,
})
</script>

<template>
  <RekaAccordionItem
    :value="props.value"
    :disabled="props.disabled"
    class="voxel-accordion__item"
    v-bind="$attrs"
  >
    <slot />
  </RekaAccordionItem>
</template>

<style scoped>
.voxel-accordion__item {
  @apply border border-[var(--color-surface-background)] rounded-xl overflow-hidden;
  }
  
  .voxel-accordion__item[data-disabled] {
    @apply cursor-not-allowed;
    filter: grayscale(1);
}
</style>
