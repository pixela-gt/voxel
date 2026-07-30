<script setup lang="ts">
import { computed, inject } from 'vue'
import type { DateFieldProps } from './DateField.types'
import type { FormFieldContext } from '../FormField/FormField.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

const props = withDefaults(defineProps<DateFieldProps>(), {
  disabled: false,
  readonly: false,
  variant: 'outlined',
  size: 'default',
  density: 'default',
  focusEffect: 'border',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: Date | null]
}>()

const formContext = inject<FormFieldContext | null>(FORM_FIELD_KEY, null)

const effectiveError = computed(() => props.errorMessage ?? formContext?.errorMessage)
const effectiveId = computed(() => formContext?.id)
const describedBy = computed(() => {
  if (!formContext?.id) return undefined
  return effectiveError.value ? `${formContext.id}-error` : `${formContext.id}-hint`
})

const rootClass = computed(() => [
  'voxel-date-field',
  `voxel-date-field--variant-${props.variant}`,
  `voxel-date-field--size-${props.size}`,
  `voxel-date-field--density-${props.density}`,
  `voxel-date-field--focus-${props.focusEffect}`,
  {
    'voxel-date-field--error': !!effectiveError.value,
    'voxel-date-field--disabled': props.disabled,
  },
  props.class,
])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.valueAsDate)
}
</script>

<template>
  <div :class="rootClass">
    <input
      type="date"
      :id="effectiveId"
      :value="modelValue ? modelValue.toISOString().split('T')[0] : ''"
      :placeholder="placeholder ? String(placeholder) : ''"
      :disabled="disabled"
      :readonly="readonly"
      :name="name"
      :aria-invalid="!!effectiveError"
      :aria-describedby="describedBy"
      class="voxel-date-field__input"
      @input="onInput"
    />
  </div>
</template>

<style scoped>
.voxel-date-field {
  @apply inline-flex items-center w-full font-sans transition-all duration-[var(--transition-normal)] focus-within:outline-none;
}

/* Outlined */
.voxel-date-field--variant-outlined {
  @apply bg-[var(--color-surface-background)] border-2 border-[var(--color-grey-200)] rounded-[var(--rounded-2xl)];
}

.voxel-date-field--variant-outlined.voxel-date-field--density-default {
  @apply px-3 py-3 gap-2;
}

.voxel-date-field--variant-outlined.voxel-date-field--density-dense {
  @apply px-2 py-2 gap-1.5;
}

/* Underlined */
.voxel-date-field--variant-underlined {
  @apply bg-transparent border-0 border-b-2 border-[var(--color-grey-300)] rounded-none;
}

.voxel-date-field--variant-underlined.voxel-date-field--density-default {
  @apply py-3 gap-2;
}

.voxel-date-field--variant-underlined.voxel-date-field--density-dense {
  @apply py-2 gap-1.5;
}

/* Ghost */
.voxel-date-field--variant-ghost {
  @apply bg-transparent border-2 border-transparent rounded-[var(--rounded-2xl)] hover:bg-[var(--color-surface-light)];
}

.voxel-date-field--variant-ghost.voxel-date-field--density-default {
  @apply px-3 py-3 gap-2;
}

.voxel-date-field--variant-ghost.voxel-date-field--density-dense {
  @apply px-2 py-2 gap-1.5;
}

/* Focus effects — border */
.voxel-date-field--focus-border:focus-within {
  @apply border-[var(--color-primary-base)]/70;
}

.voxel-date-field--variant-underlined.voxel-date-field--focus-border:focus-within {
  @apply border-b-[var(--color-primary-base)]/70;
}

/* Focus effects — elevation */
.voxel-date-field--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Focus effects — glow */
.voxel-date-field--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Error — border */
.voxel-date-field--error.voxel-date-field--focus-border:focus-within {
  @apply border-[var(--color-error-base)];
}

.voxel-date-field--error.voxel-date-field--variant-underlined.voxel-date-field--focus-border:focus-within {
  @apply border-b-[var(--color-error-base)];
}

/* Error — elevation */
.voxel-date-field--error.voxel-date-field--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Error — glow */
.voxel-date-field--error.voxel-date-field--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Disabled */
.voxel-date-field--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-date-field--disabled.voxel-date-field--variant-outlined {
  @apply bg-[var(--color-grey-50)] border-[var(--color-grey-200)];
}

.voxel-date-field--disabled.voxel-date-field--variant-underlined {
  @apply border-b-[var(--color-grey-200)];
}

.voxel-date-field--disabled.voxel-date-field--variant-ghost {
  @apply hover:bg-transparent;
}

/* Input */
.voxel-date-field__input {
  @apply flex-1 min-w-0 bg-transparent outline-none border-0 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed;
}

/* Size */
.voxel-date-field--size-small .voxel-date-field__input { @apply text-[11px]; }
.voxel-date-field--size-default .voxel-date-field__input { @apply text-sm; }
.voxel-date-field--size-large .voxel-date-field__input { @apply text-base; }
</style>
