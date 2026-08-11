<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import {
  RangeCalendarRoot, RangeCalendarHeader, RangeCalendarHeading,
  RangeCalendarPrev, RangeCalendarNext,
  RangeCalendarGrid, RangeCalendarGridHead, RangeCalendarGridRow, RangeCalendarHeadCell,
  RangeCalendarGridBody, RangeCalendarCell, RangeCalendarCellTrigger,
} from 'reka-ui'
import type { RangeCalendarProps } from './RangeCalendar.types'

const props = withDefaults(defineProps<RangeCalendarProps>(), { disabled: false } as const)

const emit = defineEmits<{
  'update:modelValue': [value: RangeCalendarProps['modelValue']]
}>()

const rootClass = computed(() => [
  'voxel-range-calendar',
  { 'voxel-range-calendar--disabled': props.disabled },
  props.class,
])
</script>

<template>
  <RangeCalendarRoot
    v-slot="{ weekDays, grid }"
    :model-value="modelValue ?? undefined"
    :default-value="defaultValue ?? undefined"
    :placeholder="placeholder"
    :disabled="disabled"
    :week-starts-on="weekStartsOn"
    :locale="locale"
    :fixed-weeks="fixedWeeks"
    :class="rootClass"
    @update:modelValue="(v) => emit('update:modelValue', v ?? null)"
  >
    <RangeCalendarHeader class="voxel-range-calendar__header">
      <RangeCalendarPrev class="voxel-range-calendar__nav" aria-label="Previous month">
        <ChevronLeft class="size-4" />
      </RangeCalendarPrev>
      <RangeCalendarHeading class="voxel-range-calendar__heading" />
      <RangeCalendarNext class="voxel-range-calendar__nav" aria-label="Next month">
        <ChevronRight class="size-4" />
      </RangeCalendarNext>
    </RangeCalendarHeader>

    <RangeCalendarGrid v-for="month in grid" :key="month.value.toString()" class="voxel-range-calendar__grid">
      <RangeCalendarGridHead>
        <RangeCalendarGridRow>
          <RangeCalendarHeadCell v-for="day in weekDays" :key="day" class="voxel-range-calendar__head-cell">
            {{ day }}
          </RangeCalendarHeadCell>
        </RangeCalendarGridRow>
      </RangeCalendarGridHead>
      <RangeCalendarGridBody>
        <RangeCalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`">
          <RangeCalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate" class="voxel-range-calendar__cell">
            <RangeCalendarCellTrigger :day="weekDate" :month="month.value" class="voxel-range-calendar__cell-trigger" />
          </RangeCalendarCell>
        </RangeCalendarGridRow>
      </RangeCalendarGridBody>
    </RangeCalendarGrid>
  </RangeCalendarRoot>
</template>

<style scoped>
.voxel-range-calendar {
  @apply inline-block font-sans select-none bg-[var(--color-surface-base)] p-3
    rounded-[var(--rounded-2xl)] shadow-[var(--shadow-sm)];
}
.voxel-range-calendar__header { @apply flex items-center justify-between px-2 mb-2; }
.voxel-range-calendar__heading { @apply font-semibold text-sm text-[var(--color-text-primary)]; }
.voxel-range-calendar__nav {
  @apply inline-flex size-7 items-center justify-center rounded-full text-[var(--color-text-secondary)]
    hover:bg-[var(--color-grey-100)] hover:text-[var(--color-text-primary)]
    disabled:opacity-40 disabled:pointer-events-none;
}
.voxel-range-calendar__grid { @apply w-full border-spacing-0 border-collapse; }
.voxel-range-calendar__head-cell { @apply py-1 text-center text-xs font-medium text-[var(--color-text-muted)]; }
.voxel-range-calendar__cell { @apply p-0 text-center; }
.voxel-range-calendar__cell-trigger {
  @apply inline-flex size-8 items-center justify-center rounded-full text-sm text-[var(--color-text-primary)]
    hover:bg-[var(--color-grey-100)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-1
    disabled:pointer-events-none disabled:opacity-40
    data-[selected]:bg-[var(--color-primary-base)] data-[selected]:text-[var(--color-text-inverse)]
    data-[highlighted]:bg-[var(--color-primary-base)]/20
    data-[today]:font-bold;
}
/* Range: pill ends on first/last cell, square fill in between */
.voxel-range-calendar__cell-trigger[data-highlighted]:not([data-highlighted-start]):not([data-highlighted-end]),
.voxel-range-calendar__cell-trigger[data-selected]:not([data-selection-start]):not([data-selection-end]) {
  border-radius: 0;
  color: var(--color-text-primary);
  background-color: color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}
.voxel-range-calendar__cell-trigger[data-highlighted-start],
.voxel-range-calendar__cell-trigger[data-selection-start] {
  border-radius: 9999px 0 0 9999px;
}
.voxel-range-calendar__cell-trigger[data-highlighted-end],
.voxel-range-calendar__cell-trigger[data-selection-end] {
  border-radius: 0 9999px 9999px 0;
}
.voxel-range-calendar--disabled { @apply opacity-50 pointer-events-none; }
</style>