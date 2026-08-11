<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import {
  DatePickerRoot,
  DatePickerTrigger, DatePickerContent,
  DatePickerField, DatePickerInput,
  DatePickerCalendar, DatePickerHeader, DatePickerHeading,
  DatePickerPrev, DatePickerNext,
  DatePickerGrid, DatePickerGridHead, DatePickerGridRow, DatePickerHeadCell,
  DatePickerGridBody, DatePickerCell, DatePickerCellTrigger,
} from 'reka-ui'
import type { DatePickerProps } from './DatePicker.types'

const props = withDefaults(defineProps<DatePickerProps>(), { disabled: false } as const)

const emit = defineEmits<{
  'update:modelValue': [value: DatePickerProps['modelValue']]
}>()

const rootClass = computed(() => [
  'voxel-date-picker',
  { 'voxel-date-picker--disabled': props.disabled },
  props.class,
])
</script>

<template>
  <DatePickerRoot :model-value="modelValue ?? undefined" :default-value="defaultValue ?? undefined"
    :placeholder="placeholder" :disabled="disabled" :locale="locale" :class="rootClass"
    @update:modelValue="(v) => emit('update:modelValue', v ?? null)">
    <DatePickerTrigger class="voxel-date-picker__trigger">
      <DatePickerField class="voxel-date-picker__field">
        <template #default="{ segments }">
          <template v-for="(segment, index) in segments" :key="index">
            <DatePickerInput :part="segment.part" class="voxel-date-picker__segment" />
          </template>
        </template>
      </DatePickerField>
    </DatePickerTrigger>

    <DatePickerContent side="bottom" :side-offset="4" align="start" class="voxel-date-picker__content">
      <DatePickerCalendar v-slot="{ weekDays, grid }">
        <DatePickerHeader class="voxel-date-picker__header">
          <DatePickerPrev class="voxel-date-picker__nav" aria-label="Previous month">
            <ChevronLeft class="size-4" />
          </DatePickerPrev>
          <DatePickerHeading class="voxel-date-picker__heading" />
          <DatePickerNext class="voxel-date-picker__nav" aria-label="Next month">
            <ChevronRight class="size-4" />
          </DatePickerNext>
        </DatePickerHeader>

        <DatePickerGrid v-for="month in grid" :key="month.value.toString()" class="voxel-date-picker__grid">
          <DatePickerGridHead>
            <DatePickerGridRow>
              <DatePickerHeadCell v-for="day in weekDays" :key="day" class="voxel-date-picker__head-cell">
                {{ day }}
              </DatePickerHeadCell>
            </DatePickerGridRow>
          </DatePickerGridHead>
          <DatePickerGridBody>
            <DatePickerGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`">
              <DatePickerCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate"
                class="voxel-date-picker__cell">
                <DatePickerCellTrigger :day="weekDate" :month="month.value" class="voxel-date-picker__cell-trigger" />
              </DatePickerCell>
            </DatePickerGridRow>
          </DatePickerGridBody>
        </DatePickerGrid>
      </DatePickerCalendar>
    </DatePickerContent>
  </DatePickerRoot>
</template>

<style>
.voxel-date-picker__trigger {
  @apply inline-flex items-center w-full cursor-pointer;
}

.voxel-date-picker__field {
  @apply inline-flex w-full items-center gap-1 rounded-lg border border-[var(--color-grey-200)] bg-[var(--color-surface-base)] px-3 py-2 text-sm focus-within:border-[var(--color-primary-base)] focus-within:ring-2 focus-within:ring-[var(--color-primary-base)]/30;
}

.voxel-date-picker__segment {
  @apply rounded-sm text-[var(--color-text-primary)] caret-transparent outline-none focus:bg-[var(--color-primary-base)]/20 focus:text-[var(--color-primary-base)];
}

.voxel-date-picker--disabled .voxel-date-picker__field {
  @apply opacity-50 pointer-events-none;
}

.voxel-date-picker__content {
  @apply z-50 rounded-xl border border-[var(--color-grey-200)] bg-[var(--color-surface-base)] p-3 shadow-[var(--shadow-sm)] outline-none;
}

.voxel-date-picker__header {
  @apply flex items-center justify-between px-2 mb-2;
}

.voxel-date-picker__heading {
  @apply font-semibold text-sm text-[var(--color-text-primary)];
}

.voxel-date-picker__nav {
  @apply inline-flex size-7 items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-grey-100)] hover:text-[var(--color-text-primary)] disabled:opacity-40 disabled:pointer-events-none;
}

.voxel-date-picker__grid {
  @apply w-full border-spacing-0 border-collapse;
}

.voxel-date-picker__head-cell {
  @apply py-1 text-center text-xs font-medium text-[var(--color-text-muted)];
}

.voxel-date-picker__cell {
  @apply p-0 text-center;
}

.voxel-date-picker__cell-trigger {
  @apply inline-flex size-8 items-center justify-center rounded-full text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-grey-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 data-[selected]:bg-[var(--color-primary-base)] data-[selected]:text-[var(--color-text-inverse)] data-[today]:font-bold;
}
</style>