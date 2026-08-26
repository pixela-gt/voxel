<script setup lang="ts">
import { computed, inject } from 'vue'
import { TimeRangeFieldRoot, TimeRangeFieldInput } from 'reka-ui'
import type { TimeValue } from 'reka-ui'
import type { TimeRangeFieldProps } from './TimeRangeField.types'
import type { FormFieldContext } from '../FormField/FormField.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

const props = withDefaults(defineProps<TimeRangeFieldProps>(), {
  disabled: false,
  readonly: false,
  variant: 'outlined',
  size: 'default',
  density: 'default',
  focusEffect: 'border',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: TimeRangeFieldProps['modelValue']]
}>()

const formContext = inject<FormFieldContext | null>(FORM_FIELD_KEY, null)

const effectiveError = computed(() => props.errorMessage ?? formContext?.errorMessage)
const effectiveId = computed(() => formContext?.id)
const describedBy = computed(() => {
  if (!formContext?.id) return undefined
  return effectiveError.value ? `${formContext.id}-error` : `${formContext.id}-hint`
})

const modelIn = computed(() =>
  props.modelValue == null
    ? undefined
    : { start: props.modelValue.start ?? undefined, end: props.modelValue.end ?? undefined },
)
const defaultIn = computed(() =>
  props.defaultValue == null
    ? undefined
    : { start: props.defaultValue.start ?? undefined, end: props.defaultValue.end ?? undefined },
)

const onUpdateModelValue = (v: { start: TimeValue | undefined; end: TimeValue | undefined } | null | undefined) => {
  emit('update:modelValue', v as TimeRangeFieldProps['modelValue'])
}
const rootClass = computed(() => [
  'voxel-time-range-field',
  `voxel-time-range-field--variant-${props.variant}`,
  `voxel-time-range-field--size-${props.size}`,
  `voxel-time-range-field--density-${props.density}`,
  `voxel-time-range-field--focus-${props.focusEffect}`,
  {
    'voxel-time-range-field--error': !!effectiveError.value,
    'voxel-time-range-field--disabled': props.disabled,
  },
  props.class,
])
</script>

<template>
  <div :class="rootClass">
    <TimeRangeFieldRoot
      class="voxel-time-range-field__group"
      :model-value="modelIn"
      :default-value="defaultIn"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :name="name"
      @update:modelValue="onUpdateModelValue"
    >
      <template #default="{ segments }">
        <template v-for="(segment, index) in segments.start" :key="'start' + index">
          <TimeRangeFieldInput
            type="start"
            :part="segment.part"
            :id="index === 0 ? effectiveId : undefined"
            :aria-invalid="!!effectiveError || undefined"
            :aria-describedby="describedBy"
            :class="{ 'voxel-time-range-field__segment': segment.part !== 'literal' }"
          >
            {{ segment.value }}
          </TimeRangeFieldInput>
        </template>
        <span class="voxel-time-range-field__separator">—</span>
        <template v-for="(segment, index) in segments.end" :key="'end' + index">
          <TimeRangeFieldInput
            type="end"
            :part="segment.part"
            :aria-invalid="!!effectiveError || undefined"
            :aria-describedby="describedBy"
            :class="{ 'voxel-time-range-field__segment': segment.part !== 'literal' }"
          >
            {{ segment.value }}
          </TimeRangeFieldInput>
        </template>
      </template>
    </TimeRangeFieldRoot>
  </div>
</template>

<style scoped>
.voxel-time-range-field {
  @apply inline-flex items-center w-full font-sans transition-all duration-[var(--transition-normal)] focus-within:outline-none;
}

.voxel-time-range-field__group {
  @apply flex items-start flex-1 min-w-0;
}

/* Outlined */
.voxel-time-range-field--variant-outlined {
  @apply bg-[var(--color-surface-background)] border-2 border-[var(--color-grey-200)] rounded-[var(--rounded-2xl)];
}

.voxel-time-range-field--variant-outlined.voxel-time-range-field--density-default {
  @apply px-3 py-3 gap-2;
}

.voxel-time-range-field--variant-outlined.voxel-time-range-field--density-dense {
  @apply px-2 py-2 gap-1.5;
}

/* Underlined */
.voxel-time-range-field--variant-underlined {
  @apply bg-transparent border-0 border-b-2 border-[var(--color-grey-300)] rounded-none;
}

.voxel-time-range-field--variant-underlined.voxel-time-range-field--density-default {
  @apply py-3 gap-2;
}

.voxel-time-range-field--variant-underlined.voxel-time-range-field--density-dense {
  @apply py-2 gap-1.5;
}

/* Ghost */
.voxel-time-range-field--variant-ghost {
  @apply bg-transparent border-2 border-transparent rounded-[var(--rounded-2xl)] hover:bg-[var(--color-surface-light)];
}

.voxel-time-range-field--variant-ghost.voxel-time-range-field--density-default {
  @apply px-3 py-3 gap-2;
}

.voxel-time-range-field--variant-ghost.voxel-time-range-field--density-dense {
  @apply px-2 py-2 gap-1.5;
}

/* Focus effects — border */
.voxel-time-range-field--focus-border:focus-within {
  @apply border-[var(--color-primary-base)]/70;
}

.voxel-time-range-field--variant-underlined.voxel-time-range-field--focus-border:focus-within {
  @apply border-b-[var(--color-primary-base)]/70;
}

/* Focus effects — elevation */
.voxel-time-range-field--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Focus effects — glow */
.voxel-time-range-field--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Error — border */
.voxel-time-range-field--error.voxel-time-range-field--focus-border:focus-within {
  @apply border-[var(--color-error-base)];
}

.voxel-time-range-field--error.voxel-time-range-field--variant-underlined.voxel-time-range-field--focus-border:focus-within {
  @apply border-b-[var(--color-error-base)];
}

/* Error — elevation */
.voxel-time-range-field--error.voxel-time-range-field--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Error — glow */
.voxel-time-range-field--error.voxel-time-range-field--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Disabled */
.voxel-time-range-field--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-time-range-field--disabled.voxel-time-range-field--variant-outlined {
  @apply bg-[var(--color-grey-50)] border-[var(--color-grey-200)];
}

.voxel-time-range-field--disabled.voxel-time-range-field--variant-underlined {
  @apply border-b-[var(--color-grey-200)];
}

.voxel-time-range-field--disabled.voxel-time-range-field--variant-ghost {
  @apply hover:bg-transparent;
}

/* Separator */
.voxel-time-range-field__separator {
  @apply text-[var(--color-text-muted)] px-1;
}

/* Input */
.voxel-time-range-field__segment {
  @apply bg-transparent outline-none border-0 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed;
}

/* Size */
.voxel-time-range-field--size-small .voxel-time-range-field__segment { @apply text-[11px]; }
.voxel-time-range-field--size-default .voxel-time-range-field__segment { @apply text-sm; }
.voxel-time-range-field--size-large .voxel-time-range-field__segment { @apply text-base; }
</style>
