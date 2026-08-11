<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import {
  YearRangePickerRoot, YearRangePickerHeader, YearRangePickerHeading,
  YearRangePickerPrev, YearRangePickerNext,
  YearRangePickerGrid, YearRangePickerGridBody, YearRangePickerGridRow,
  YearRangePickerCell, YearRangePickerCellTrigger,
} from 'reka-ui'
import type { DateRange } from 'reka-ui'
import type { YearRangePickerProps } from './YearRangePicker.types'

const props = withDefaults(defineProps<YearRangePickerProps>(), { disabled: false } as const)

const emit = defineEmits<{
  'update:modelValue': [value: YearRangePickerProps['modelValue']]
}>()

const rootClass = computed(() => [
  'voxel-year-range-picker',
  { 'voxel-year-range-picker--disabled': props.disabled },
  props.class,
])
</script>

<template>
  <YearRangePickerRoot
    v-slot="{ grid }"
    :model-value="modelValue ?? undefined"
    :default-value="defaultValue ?? undefined"
    :placeholder="placeholder"
    :query-decade="queryDecade"
    :disabled="disabled"
    :locale="locale"
    :class="rootClass"
    @update:modelValue="(v) => emit('update:modelValue', v as DateRange | null)"
  >
    <YearRangePickerHeader class="voxel-year-range-picker__header">
      <YearRangePickerPrev class="voxel-year-range-picker__nav" aria-label="Previous decade">
        <ChevronLeft class="size-4" />
      </YearRangePickerPrev>
      <YearRangePickerHeading class="voxel-year-range-picker__heading" />
      <YearRangePickerNext class="voxel-year-range-picker__nav" aria-label="Next decade">
        <ChevronRight class="size-4" />
      </YearRangePickerNext>
    </YearRangePickerHeader>

    <YearRangePickerGrid class="voxel-year-range-picker__grid">
      <YearRangePickerGridBody>
        <YearRangePickerGridRow v-for="(years, index) in grid.rows" :key="`year-${index}`">
          <YearRangePickerCell v-for="year in years" :key="year.toString()" :date="year" class="voxel-year-range-picker__cell">
            <YearRangePickerCellTrigger :year="year" class="voxel-year-range-picker__cell-trigger" />
          </YearRangePickerCell>
        </YearRangePickerGridRow>
      </YearRangePickerGridBody>
    </YearRangePickerGrid>
  </YearRangePickerRoot>
</template>

<style scoped>
.voxel-year-range-picker {
  @apply inline-block font-sans select-none bg-[var(--color-surface-base)] p-3
    rounded-[var(--rounded-2xl)] shadow-[var(--shadow-sm)];
}
.voxel-year-range-picker__header { @apply flex items-center justify-between px-2 mb-2; }
.voxel-year-range-picker__heading { @apply font-semibold text-sm text-[var(--color-text-primary)]; }
.voxel-year-range-picker__nav {
  @apply inline-flex size-7 items-center justify-center rounded-full text-[var(--color-text-secondary)]
    hover:bg-[var(--color-grey-100)] hover:text-[var(--color-text-primary)]
    disabled:opacity-40 disabled:pointer-events-none;
}
.voxel-year-range-picker__grid { @apply w-full border-spacing-0 border-collapse; }
.voxel-year-range-picker__cell { @apply p-0 text-center; }
.voxel-year-range-picker__cell-trigger {
  @apply inline-flex size-10 items-center justify-center rounded-lg text-sm text-[var(--color-text-primary)]
    hover:bg-[var(--color-grey-100)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-1
    disabled:pointer-events-none disabled:opacity-40
    data-[selected]:bg-[var(--color-primary-base)] data-[selected]:text-[var(--color-text-inverse)]
    data-[highlighted]:bg-[var(--color-primary-base)]/20
    data-[today]:font-bold;
}
/* Range: pill ends on first/last cell, square fill in between */
.voxel-year-range-picker__cell-trigger[data-highlighted]:not([data-highlighted-start]):not([data-highlighted-end]),
.voxel-year-range-picker__cell-trigger[data-selected]:not([data-selection-start]):not([data-selection-end]) {
  border-radius: 0;
  color: var(--color-text-primary);
  background-color: color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}
.voxel-year-range-picker__cell-trigger[data-highlighted-start],
.voxel-year-range-picker__cell-trigger[data-selection-start] {
  border-radius: 0.5rem 0 0 0.5rem;
}
.voxel-year-range-picker__cell-trigger[data-highlighted-end],
.voxel-year-range-picker__cell-trigger[data-selection-end] {
  border-radius: 0 0.5rem 0.5rem 0;
}
.voxel-year-range-picker--disabled { @apply opacity-50 pointer-events-none; }
</style>