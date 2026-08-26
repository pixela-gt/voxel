<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import {
  MonthPickerRoot, MonthPickerHeader, MonthPickerHeading,
  MonthPickerPrev, MonthPickerNext,
  MonthPickerGrid, MonthPickerGridBody, MonthPickerGridRow,
  MonthPickerCell, MonthPickerCellTrigger,
} from 'reka-ui'
import type { DateValue } from 'reka-ui'
import type { MonthPickerProps } from './MonthPicker.types'

const props = withDefaults(defineProps<MonthPickerProps>(), { disabled: false } as const)

const emit = defineEmits<{
  'update:modelValue': [value: MonthPickerProps['modelValue']]
}>()

const rootClass = computed(() => [
  'voxel-month-picker',
  { 'voxel-month-picker--disabled': props.disabled },
  props.class,
])
</script>

<template>
  <MonthPickerRoot
    v-slot="{ grid }"
    :model-value="modelValue ?? undefined"
    :default-value="defaultValue ?? undefined"
    :placeholder="placeholder"
    :disabled="disabled"
    :locale="locale"
    :class="rootClass"
    @update:modelValue="(v) => emit('update:modelValue', v as DateValue | null)"
  >
    <MonthPickerHeader class="voxel-month-picker__header">
      <MonthPickerPrev class="voxel-month-picker__nav" aria-label="Previous year">
        <ChevronLeft class="size-4" />
      </MonthPickerPrev>
      <MonthPickerHeading class="voxel-month-picker__heading" />
      <MonthPickerNext class="voxel-month-picker__nav" aria-label="Next year">
        <ChevronRight class="size-4" />
      </MonthPickerNext>
    </MonthPickerHeader>

    <MonthPickerGrid class="voxel-month-picker__grid">
      <MonthPickerGridBody>
        <MonthPickerGridRow v-for="(months, index) in grid.rows" :key="`month-${index}`">
          <MonthPickerCell v-for="month in months" :key="month.toString()" :date="month" class="voxel-month-picker__cell">
            <MonthPickerCellTrigger :month="month" class="voxel-month-picker__cell-trigger" />
          </MonthPickerCell>
        </MonthPickerGridRow>
      </MonthPickerGridBody>
    </MonthPickerGrid>
  </MonthPickerRoot>
</template>

<style scoped>
.voxel-month-picker {
  @apply inline-block font-sans select-none bg-[var(--color-surface-base)] p-3
    rounded-[var(--rounded-2xl)] shadow-[var(--shadow-sm)];
}
.voxel-month-picker__header { @apply flex items-center justify-between px-2 mb-2; }
.voxel-month-picker__heading { @apply font-semibold text-sm text-[var(--color-text-primary)]; }
.voxel-month-picker__nav {
  @apply inline-flex size-7 items-center justify-center rounded-full text-[var(--color-text-secondary)]
    hover:bg-[var(--color-grey-100)] hover:text-[var(--color-text-primary)]
    disabled:opacity-40 disabled:pointer-events-none;
}
.voxel-month-picker__grid { @apply w-full border-spacing-0 border-collapse; }
.voxel-month-picker__cell { @apply p-0 text-center; }
.voxel-month-picker__cell-trigger {
  @apply inline-flex size-9 items-center justify-center rounded-lg text-sm text-[var(--color-text-primary)]
    hover:bg-[var(--color-grey-100)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-1
    disabled:pointer-events-none disabled:opacity-40
    data-[selected]:bg-[var(--color-primary-base)] data-[selected]:text-[var(--color-text-inverse)]
    data-[today]:font-bold;
}
.voxel-month-picker--disabled { @apply opacity-50 pointer-events-none; }
</style>