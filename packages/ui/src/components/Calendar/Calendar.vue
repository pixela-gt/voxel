<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import {
  CalendarRoot, CalendarHeader, CalendarHeading,
  CalendarPrev, CalendarNext,
  CalendarGrid, CalendarGridHead, CalendarGridRow, CalendarHeadCell,
  CalendarGridBody, CalendarCell, CalendarCellTrigger,
} from 'reka-ui'
import type { CalendarProps } from './Calendar.types'

const props = withDefaults(defineProps<CalendarProps>(), { disabled: false } as const)

const emit = defineEmits<{
  'update:modelValue': [value: CalendarProps['modelValue']]
}>()

const rootClass = computed(() => [
  'voxel-calendar',
  { 'voxel-calendar--disabled': props.disabled },
  props.class,
])
</script>

<template>
  <CalendarRoot
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
    <CalendarHeader class="voxel-calendar__header">
      <CalendarPrev class="voxel-calendar__nav" aria-label="Previous month">
        <ChevronLeft class="size-4" />
      </CalendarPrev>
      <CalendarHeading class="voxel-calendar__heading" />
      <CalendarNext class="voxel-calendar__nav" aria-label="Next month">
        <ChevronRight class="size-4" />
      </CalendarNext>
    </CalendarHeader>

    <CalendarGrid v-for="month in grid" :key="month.value.toString()" class="voxel-calendar__grid">
      <CalendarGridHead>
        <CalendarGridRow>
          <CalendarHeadCell v-for="day in weekDays" :key="day" class="voxel-calendar__head-cell">
            {{ day }}
          </CalendarHeadCell>
        </CalendarGridRow>
      </CalendarGridHead>
      <CalendarGridBody>
        <CalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`">
          <CalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate" class="voxel-calendar__cell">
            <CalendarCellTrigger :day="weekDate" :month="month.value" class="voxel-calendar__cell-trigger" />
          </CalendarCell>
        </CalendarGridRow>
      </CalendarGridBody>
    </CalendarGrid>
  </CalendarRoot>
</template>

<style scoped>
.voxel-calendar {
  @apply inline-block font-sans select-none bg-[var(--color-surface-base)] p-3
    rounded-[var(--rounded-2xl)] shadow-[var(--shadow-sm)];
}
.voxel-calendar__header { @apply flex items-center justify-between px-2 mb-2; }
.voxel-calendar__heading { @apply font-semibold text-sm text-[var(--color-text-primary)]; }
.voxel-calendar__nav {
  @apply inline-flex size-7 items-center justify-center rounded-full text-[var(--color-text-secondary)]
    hover:bg-[var(--color-grey-100)] hover:text-[var(--color-text-primary)]
    disabled:opacity-40 disabled:pointer-events-none;
}
.voxel-calendar__grid { @apply w-full border-spacing-0 border-collapse; }
.voxel-calendar__head-cell { @apply py-1 text-center text-xs font-medium text-[var(--color-text-muted)]; }
.voxel-calendar__cell { @apply p-0 text-center; }
.voxel-calendar__cell-trigger {
  @apply inline-flex size-8 items-center justify-center rounded-full text-sm text-[var(--color-text-primary)]
    hover:bg-[var(--color-grey-100)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-1
    disabled:pointer-events-none disabled:opacity-40
    data-[selected]:bg-[var(--color-primary-base)] data-[selected]:text-[var(--color-text-inverse)]
    data-[today]:font-bold;
}
.voxel-calendar--disabled { @apply opacity-50 pointer-events-none; }
</style>