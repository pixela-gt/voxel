<script setup lang="ts">
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from 'reka-ui'
import type { AccordionProps } from './Accordion.types'

interface AccordionItemData {
  value: string
  header?: string
}

const props = withDefaults(defineProps<AccordionProps & { items?: AccordionItemData[] }>(), {
  type: 'single',
  collapsible: true,
  disabled: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()
</script>

<template>
  <AccordionRoot
    :type="props.type"
    :collapsible="props.collapsible"
    :disabled="props.disabled"
    :class="['voxel-accordion', { 'voxel-accordion--disabled': props.disabled }]"
    v-model="props.modelValue"
    @update:modelValue="
      (v) => emit('update:modelValue', v ?? (props.type === 'multiple' ? [] : ''))
    "
    v-bind="$attrs"
  >
    <AccordionItem
      v-for="item in props.items"
      :key="item.value"
      :value="item.value"
      class="voxel-accordion__item"
    >
      <AccordionHeader class="voxel-accordion__header">
        <AccordionTrigger class="voxel-accordion__trigger">
          <slot name="header" :item="item">
            {{ item.header ?? item.value }}
          </slot>
          <svg
            class="voxel-accordion__chevron"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent class="voxel-accordion__content">
        <div class="voxel-accordion__body">
          <slot name="content" :item="item"> Content for {{ item.value }} </slot>
        </div>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<style scoped>
.voxel-accordion__item {
  @apply border border-[var(--color-grey-200)] rounded-xl overflow-hidden;
}

.voxel-accordion__header {
  @apply w-full;
}

.voxel-accordion__trigger {
  @apply w-full flex items-center justify-between gap-4 px-4 py-3 text-left
    text-sm font-medium text-[var(--color-text-primary)] bg-[var(--color-surface-base)]
    hover:bg-[var(--color-grey-50)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    transition-colors duration-150;
}

.voxel-accordion__chevron {
  @apply size-5 text-[var(--color-text-secondary)] transition-transform duration-200;
}

.voxel-accordion__chevron[data-state='open'] {
  @apply rotate-180;
}

.voxel-accordion__body {
  @apply pt-2 pb-4 px-4;
}

.voxel-accordion--disabled {
  background-color: rgb(170 179 255 / 0.12);
  border-radius: var(--rounded-xl);
}
</style>
