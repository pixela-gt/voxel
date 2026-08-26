<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import {
  DateRangePickerRoot,
  DateRangePickerTrigger, DateRangePickerContent,
  DateRangePickerField, DateRangePickerInput,
  DateRangePickerCalendar, DateRangePickerHeader, DateRangePickerHeading,
  DateRangePickerPrev, DateRangePickerNext,
  DateRangePickerGrid, DateRangePickerGridHead, DateRangePickerGridRow, DateRangePickerHeadCell,
  DateRangePickerGridBody, DateRangePickerCell, DateRangePickerCellTrigger,
} from 'reka-ui'
import type { DateRangePickerProps } from './DateRangePicker.types'

const props = withDefaults(defineProps<DateRangePickerProps>(), { disabled: false } as const)

const emit = defineEmits<{
  'update:modelValue': [value: DateRangePickerProps['modelValue']]
}>()

const rootClass = computed(() => [
  'voxel-date-range-picker',
  { 'voxel-date-range-picker--disabled': props.disabled },
  props.class,
])
</script>

<template>
  <DateRangePickerRoot :model-value="modelValue ?? undefined" :default-value="defaultValue ?? undefined"
    :placeholder="placeholder" :disabled="disabled" :locale="locale" :class="rootClass"
    @update:modelValue="(v) => emit('update:modelValue', v ?? null)">
    <DateRangePickerTrigger class="voxel-date-range-picker__trigger">
      <DateRangePickerField class="voxel-date-range-picker__field">
        <template #default="{ segments }">
          <template v-for="(segment, index) in segments.start" :key="`start-${index}`">
            <DateRangePickerInput type="start" :part="segment.part" class="voxel-date-range-picker__segment">
              {{ segment.value }}
            </DateRangePickerInput>
          </template>
          <span class="voxel-date-range-picker__separator">—</span>
          <template v-for="(segment, index) in segments.end" :key="`end-${index}`">
            <DateRangePickerInput type="end" :part="segment.part" class="voxel-date-range-picker__segment">
              {{ segment.value }}
            </DateRangePickerInput>
          </template>
        </template>
      </DateRangePickerField>
    </DateRangePickerTrigger>

    <DateRangePickerContent side="bottom" :side-offset="4" align="start" class="voxel-date-range-picker__content">
      <DateRangePickerCalendar v-slot="{ weekDays, grid }">
        <DateRangePickerHeader class="voxel-date-range-picker__header">
          <DateRangePickerPrev class="voxel-date-range-picker__nav" aria-label="Previous month">
            <ChevronLeft class="size-4" />
          </DateRangePickerPrev>
          <DateRangePickerHeading class="voxel-date-range-picker__heading" />
          <DateRangePickerNext class="voxel-date-range-picker__nav" aria-label="Next month">
            <ChevronRight class="size-4" />
          </DateRangePickerNext>
        </DateRangePickerHeader>

        <DateRangePickerGrid v-for="month in grid" :key="month.value.toString()" class="voxel-date-range-picker__grid">
          <DateRangePickerGridHead>
            <DateRangePickerGridRow>
              <DateRangePickerHeadCell v-for="day in weekDays" :key="day" class="voxel-date-range-picker__head-cell">
                {{ day }}
              </DateRangePickerHeadCell>
            </DateRangePickerGridRow>
          </DateRangePickerGridHead>
          <DateRangePickerGridBody>
            <DateRangePickerGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`">
              <DateRangePickerCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate"
                class="voxel-date-range-picker__cell">
                <DateRangePickerCellTrigger :day="weekDate" :month="month.value"
                  class="voxel-date-range-picker__cell-trigger" />
              </DateRangePickerCell>
            </DateRangePickerGridRow>
          </DateRangePickerGridBody>
        </DateRangePickerGrid>
      </DateRangePickerCalendar>
    </DateRangePickerContent>
  </DateRangePickerRoot>
</template>

<style>
.voxel-date-range-picker__trigger {
  @apply inline-flex items-center w-full cursor-pointer;
}

.voxel-date-range-picker__field {
  @apply inline-flex w-full items-center gap-1 rounded-lg border border-[var(--color-grey-200)] bg-[var(--color-surface-base)] px-3 py-2 text-sm focus-within:border-[var(--color-primary-base)] focus-within:ring-2 focus-within:ring-[var(--color-primary-base)]/30;
}

.voxel-date-range-picker__segment {
  @apply rounded-sm text-[var(--color-text-primary)] caret-transparent outline-none focus:bg-[var(--color-primary-base)]/20 focus:text-[var(--color-primary-base)];
}

.voxel-date-range-picker__separator {
  @apply text-[var(--color-text-muted)] px-1;
}

.voxel-date-range-picker--disabled .voxel-date-range-picker__field {
  @apply opacity-50 pointer-events-none;
}

.voxel-date-range-picker__content {
  @apply z-50 rounded-xl border border-[var(--color-grey-200)] bg-[var(--color-surface-base)] p-3 shadow-[var(--shadow-sm)] outline-none;
}

.voxel-date-range-picker__header {
  @apply flex items-center justify-between px-2 mb-2;
}

.voxel-date-range-picker__heading {
  @apply font-semibold text-sm text-[var(--color-text-primary)];
}

.voxel-date-range-picker__nav {
  @apply inline-flex size-7 items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-grey-100)] hover:text-[var(--color-text-primary)] disabled:opacity-40 disabled:pointer-events-none;
}

.voxel-date-range-picker__grid {
  @apply w-full border-spacing-0 border-collapse;
}

.voxel-date-range-picker__head-cell {
  @apply py-1 text-center text-xs font-medium text-[var(--color-text-muted)];
}

.voxel-date-range-picker__cell {
  @apply p-0 text-center;
}

.voxel-date-range-picker__cell-trigger {
  @apply inline-flex size-8 items-center justify-center rounded-full text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-grey-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 data-[selected]:bg-[var(--color-primary-base)] data-[selected]:text-[var(--color-text-inverse)] data-[highlighted]:bg-[var(--color-primary-base)]/20 data-[today]:font-bold;
}

/* Range: pill ends on first/last cell, square fill in between */
.voxel-date-range-picker__cell-trigger[data-highlighted]:not([data-highlighted-start]):not([data-highlighted-end]),
.voxel-date-range-picker__cell-trigger[data-selected]:not([data-selection-start]):not([data-selection-end]) {
  border-radius: 0;
  color: var(--color-text-primary);
  background-color: color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

.voxel-date-range-picker__cell-trigger[data-highlighted-start],
.voxel-date-range-picker__cell-trigger[data-selection-start] {
  border-radius: 9999px 0 0 9999px;
}

.voxel-date-range-picker__cell-trigger[data-highlighted-end],
.voxel-date-range-picker__cell-trigger[data-selection-end] {
  border-radius: 0 9999px 9999px 0;
}

.voxel-date-range-picker--disabled {
  @apply opacity-50 pointer-events-none;
}
</style>