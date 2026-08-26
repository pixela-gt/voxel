<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import {
  MonthRangePickerRoot, MonthRangePickerHeader, MonthRangePickerHeading,
  MonthRangePickerPrev, MonthRangePickerNext,
  MonthRangePickerGrid, MonthRangePickerGridBody, MonthRangePickerGridRow,
  MonthRangePickerCell, MonthRangePickerCellTrigger,
} from 'reka-ui'
import type { DateRange } from 'reka-ui'
import type { MonthRangePickerProps } from './MonthRangePicker.types'

const props = withDefaults(defineProps<MonthRangePickerProps>(), { disabled: false } as const)

const emit = defineEmits<{
  'update:modelValue': [value: MonthRangePickerProps['modelValue']]
}>()

const rootClass = computed(() => [
  'voxel-month-range-picker',
  { 'voxel-month-range-picker--disabled': props.disabled },
  props.class,
])
</script>

<template>
  <MonthRangePickerRoot
    v-slot="{ grid }"
    :model-value="modelValue ?? undefined"
    :default-value="defaultValue ?? undefined"
    :placeholder="placeholder"
    :disabled="disabled"
    :locale="locale"
    :class="rootClass"
    @update:modelValue="(v) => emit('update:modelValue', v as DateRange | null)"
  >
    <MonthRangePickerHeader class="voxel-month-range-picker__header">
      <MonthRangePickerPrev class="voxel-month-range-picker__nav" aria-label="Previous year">
        <ChevronLeft class="size-4" />
      </MonthRangePickerPrev>
      <MonthRangePickerHeading class="voxel-month-range-picker__heading" />
      <MonthRangePickerNext class="voxel-month-range-picker__nav" aria-label="Next year">
        <ChevronRight class="size-4" />
      </MonthRangePickerNext>
    </MonthRangePickerHeader>

    <MonthRangePickerGrid class="voxel-month-range-picker__grid">
      <MonthRangePickerGridBody>
        <MonthRangePickerGridRow v-for="(months, index) in grid.rows" :key="`month-${index}`">
          <MonthRangePickerCell v-for="month in months" :key="month.toString()" :date="month" class="voxel-month-range-picker__cell">
            <MonthRangePickerCellTrigger :month="month" class="voxel-month-range-picker__cell-trigger" />
          </MonthRangePickerCell>
        </MonthRangePickerGridRow>
      </MonthRangePickerGridBody>
    </MonthRangePickerGrid>
  </MonthRangePickerRoot>
</template>

<style scoped>
.voxel-month-range-picker {
  @apply inline-block font-sans select-none bg-[var(--color-surface-base)] p-3
    rounded-[var(--rounded-2xl)] shadow-[var(--shadow-sm)];
}
.voxel-month-range-picker__header { @apply flex items-center justify-between px-2 mb-2; }
.voxel-month-range-picker__heading { @apply font-semibold text-sm text-[var(--color-text-primary)]; }
.voxel-month-range-picker__nav {
  @apply inline-flex size-7 items-center justify-center rounded-full text-[var(--color-text-secondary)]
    hover:bg-[var(--color-grey-100)] hover:text-[var(--color-text-primary)]
    disabled:opacity-40 disabled:pointer-events-none;
}
.voxel-month-range-picker__grid { @apply w-full border-spacing-0 border-collapse; }
.voxel-month-range-picker__cell { @apply p-0 text-center; }
.voxel-month-range-picker__cell-trigger {
  @apply inline-flex size-9 items-center justify-center rounded-lg text-sm text-[var(--color-text-primary)]
    hover:bg-[var(--color-grey-100)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-1
    disabled:pointer-events-none disabled:opacity-40
    data-[selected]:bg-[var(--color-primary-base)] data-[selected]:text-[var(--color-text-inverse)]
    data-[highlighted]:bg-[var(--color-primary-base)]/20
    data-[today]:font-bold;
}
/* Range: pill ends on first/last cell, square fill in between */
.voxel-month-range-picker__cell-trigger[data-highlighted]:not([data-highlighted-start]):not([data-highlighted-end]),
.voxel-month-range-picker__cell-trigger[data-selected]:not([data-selection-start]):not([data-selection-end]) {
  border-radius: 0;
  color: var(--color-text-primary);
  background-color: color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}
.voxel-month-range-picker__cell-trigger[data-highlighted-start],
.voxel-month-range-picker__cell-trigger[data-selection-start] {
  border-radius: 0.5rem 0 0 0.5rem;
}
.voxel-month-range-picker__cell-trigger[data-highlighted-end],
.voxel-month-range-picker__cell-trigger[data-selection-end] {
  border-radius: 0 0.5rem 0.5rem 0;
}
.voxel-month-range-picker--disabled { @apply opacity-50 pointer-events-none; }
</style>