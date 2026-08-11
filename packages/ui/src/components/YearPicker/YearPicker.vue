<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import {
  YearPickerRoot, YearPickerHeader, YearPickerHeading,
  YearPickerPrev, YearPickerNext,
  YearPickerGrid, YearPickerGridBody, YearPickerGridRow,
  YearPickerCell, YearPickerCellTrigger,
} from 'reka-ui'
import type { DateValue } from 'reka-ui'
import type { YearPickerProps } from './YearPicker.types'

const props = withDefaults(defineProps<YearPickerProps>(), { disabled: false } as const)

const emit = defineEmits<{
  'update:modelValue': [value: YearPickerProps['modelValue']]
}>()

const rootClass = computed(() => [
  'voxel-year-picker',
  { 'voxel-year-picker--disabled': props.disabled },
  props.class,
])
</script>

<template>
  <YearPickerRoot
    v-slot="{ grid }"
    :model-value="modelValue ?? undefined"
    :default-value="defaultValue ?? undefined"
    :placeholder="placeholder"
    :query-decade="queryDecade"
    :disabled="disabled"
    :locale="locale"
    :class="rootClass"
    @update:modelValue="(v) => emit('update:modelValue', v as DateValue | null)"
  >
    <YearPickerHeader class="voxel-year-picker__header">
      <YearPickerPrev class="voxel-year-picker__nav" aria-label="Previous decade">
        <ChevronLeft class="size-4" />
      </YearPickerPrev>
      <YearPickerHeading class="voxel-year-picker__heading" />
      <YearPickerNext class="voxel-year-picker__nav" aria-label="Next decade">
        <ChevronRight class="size-4" />
      </YearPickerNext>
    </YearPickerHeader>

    <YearPickerGrid class="voxel-year-picker__grid">
      <YearPickerGridBody>
        <YearPickerGridRow v-for="(years, index) in grid.rows" :key="`year-${index}`">
          <YearPickerCell v-for="year in years" :key="year.toString()" :date="year" class="voxel-year-picker__cell">
            <YearPickerCellTrigger :year="year" class="voxel-year-picker__cell-trigger" />
          </YearPickerCell>
        </YearPickerGridRow>
      </YearPickerGridBody>
    </YearPickerGrid>
  </YearPickerRoot>
</template>

<style scoped>
.voxel-year-picker {
  @apply inline-block font-sans select-none bg-[var(--color-surface-base)] p-3
    rounded-[var(--rounded-2xl)] shadow-[var(--shadow-sm)];
}
.voxel-year-picker__header { @apply flex items-center justify-between px-2 mb-2; }
.voxel-year-picker__heading { @apply font-semibold text-sm text-[var(--color-text-primary)]; }
.voxel-year-picker__nav {
  @apply inline-flex size-7 items-center justify-center rounded-full text-[var(--color-text-secondary)]
    hover:bg-[var(--color-grey-100)] hover:text-[var(--color-text-primary)]
    disabled:opacity-40 disabled:pointer-events-none;
}
.voxel-year-picker__grid { @apply w-full border-spacing-0 border-collapse; }
.voxel-year-picker__cell { @apply p-0 text-center; }
.voxel-year-picker__cell-trigger {
  @apply inline-flex size-10 items-center justify-center rounded-lg text-sm text-[var(--color-text-primary)]
    hover:bg-[var(--color-grey-100)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-1
    disabled:pointer-events-none disabled:opacity-40
    data-[selected]:bg-[var(--color-primary-base)] data-[selected]:text-[var(--color-text-inverse)]
    data-[today]:font-bold;
}
.voxel-year-picker--disabled { @apply opacity-50 pointer-events-none; }
</style>