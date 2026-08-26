<script setup lang="ts">
import { computed, inject } from 'vue'
import { DateRangeFieldRoot, DateRangeFieldInput } from 'reka-ui'
import type { DateRangeFieldProps } from './DateRangeField.types'
import type { FormFieldContext } from '../FormField/FormField.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

const props = withDefaults(defineProps<DateRangeFieldProps>(), {
  disabled: false,
  readonly: false,
  variant: 'outlined',
  size: 'default',
  density: 'default',
  focusEffect: 'border',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: DateRangeFieldProps['modelValue']]
}>()

const formContext = inject<FormFieldContext | null>(FORM_FIELD_KEY, null)

const effectiveError = computed(() => props.errorMessage ?? formContext?.errorMessage)
const effectiveId = computed(() => formContext?.id)
const describedBy = computed(() => {
  if (!formContext?.id) return undefined
  return effectiveError.value ? `${formContext.id}-error` : `${formContext.id}-hint`
})

const rootClass = computed(() => [
  'voxel-date-range-field',
  `voxel-date-range-field--variant-${props.variant}`,
  `voxel-date-range-field--size-${props.size}`,
  `voxel-date-range-field--density-${props.density}`,
  `voxel-date-range-field--focus-${props.focusEffect}`,
  {
    'voxel-date-range-field--error': !!effectiveError.value,
    'voxel-date-range-field--disabled': props.disabled,
  },
  props.class,
])
</script>

<template>
  <div :class="rootClass">
    <DateRangeFieldRoot
      v-model="props.modelValue"
      class="voxel-date-range-field__group"
      :default-value="defaultValue ?? undefined"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :name="name"
      @update:modelValue="(v) => emit('update:modelValue', v)"
    >
      <template #default="{ segments }">
        <template v-for="(segment, index) in segments.start" :key="'start' + index">
          <DateRangeFieldInput
            type="start"
            :part="segment.part"
            :id="index === 0 ? effectiveId : undefined"
            :aria-invalid="!!effectiveError || undefined"
            :aria-describedby="describedBy"
            :class="{ 'voxel-date-range-field__segment': segment.part !== 'literal' }"
          >
            {{ segment.value }}
          </DateRangeFieldInput>
        </template>
        <span class="voxel-date-range-field__separator">—</span>
        <template v-for="(segment, index) in segments.end" :key="'end' + index">
          <DateRangeFieldInput
            type="end"
            :part="segment.part"
            :aria-invalid="!!effectiveError || undefined"
            :aria-describedby="describedBy"
            :class="{ 'voxel-date-range-field__segment': segment.part !== 'literal' }"
          >
            {{ segment.value }}
          </DateRangeFieldInput>
        </template>
      </template>
    </DateRangeFieldRoot>
  </div>
</template>

<style scoped>
.voxel-date-range-field {
  @apply inline-flex items-center w-full font-sans transition-all duration-[var(--transition-normal)] focus-within:outline-none;
}

.voxel-date-range-field__group {
  @apply flex items-start flex-1 min-w-0;
}

/* Outlined */
.voxel-date-range-field--variant-outlined {
  @apply bg-[var(--color-surface-background)] border-2 border-[var(--color-grey-200)] rounded-[var(--rounded-2xl)];
}

.voxel-date-range-field--variant-outlined.voxel-date-range-field--density-default {
  @apply px-3 py-3 gap-2;
}

.voxel-date-range-field--variant-outlined.voxel-date-range-field--density-dense {
  @apply px-2 py-2 gap-1.5;
}

/* Underlined */
.voxel-date-range-field--variant-underlined {
  @apply bg-transparent border-0 border-b-2 border-[var(--color-grey-300)] rounded-none;
}

.voxel-date-range-field--variant-underlined.voxel-date-range-field--density-default {
  @apply py-3 gap-2;
}

.voxel-date-range-field--variant-underlined.voxel-date-range-field--density-dense {
  @apply py-2 gap-1.5;
}

/* Ghost */
.voxel-date-range-field--variant-ghost {
  @apply bg-transparent border-2 border-transparent rounded-[var(--rounded-2xl)] hover:bg-[var(--color-surface-light)];
}

.voxel-date-range-field--variant-ghost.voxel-date-range-field--density-default {
  @apply px-3 py-3 gap-2;
}

.voxel-date-range-field--variant-ghost.voxel-date-range-field--density-dense {
  @apply px-2 py-2 gap-1.5;
}

/* Focus effects — border */
.voxel-date-range-field--focus-border:focus-within {
  @apply border-[var(--color-primary-base)]/70;
}

.voxel-date-range-field--variant-underlined.voxel-date-range-field--focus-border:focus-within {
  @apply border-b-[var(--color-primary-base)]/70;
}

/* Focus effects — elevation */
.voxel-date-range-field--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Focus effects — glow */
.voxel-date-range-field--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Error — border */
.voxel-date-range-field--error.voxel-date-range-field--focus-border:focus-within {
  @apply border-[var(--color-error-base)];
}

.voxel-date-range-field--error.voxel-date-range-field--variant-underlined.voxel-date-range-field--focus-border:focus-within {
  @apply border-b-[var(--color-error-base)];
}

/* Error — elevation */
.voxel-date-range-field--error.voxel-date-range-field--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Error — glow */
.voxel-date-range-field--error.voxel-date-range-field--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Disabled */
.voxel-date-range-field--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-date-range-field--disabled.voxel-date-range-field--variant-outlined {
  @apply bg-[var(--color-grey-50)] border-[var(--color-grey-200)];
}

.voxel-date-range-field--disabled.voxel-date-range-field--variant-underlined {
  @apply border-b-[var(--color-grey-200)];
}

.voxel-date-range-field--disabled.voxel-date-range-field--variant-ghost {
  @apply hover:bg-transparent;
}

/* Separator */
.voxel-date-range-field__separator {
  @apply text-[var(--color-text-muted)] px-1;
}

/* Input */
.voxel-date-range-field__segment {
  @apply bg-transparent outline-none border-0 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed;
}

/* Size */
.voxel-date-range-field--size-small .voxel-date-range-field__segment { @apply text-[11px]; }
.voxel-date-range-field--size-default .voxel-date-range-field__segment { @apply text-sm; }
.voxel-date-range-field--size-large .voxel-date-range-field__segment { @apply text-base; }
</style>