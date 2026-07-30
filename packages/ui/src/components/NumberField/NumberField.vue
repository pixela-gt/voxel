<script setup lang="ts">
import { computed, inject } from 'vue'
import {
  NumberFieldRoot,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
} from 'reka-ui'
import type { NumberFieldProps } from './NumberField.types'
import type { FormFieldContext } from '../FormField/FormField.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'
import { Icon } from '../Icon'

const props = withDefaults(defineProps<NumberFieldProps>(), {
  min: 0,
  max: Infinity,
  step: 1,
  disabled: false,
  size: 'default',
  variant: 'outlined',
  density: 'default',
  focusEffect: 'border',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const formContext = inject<FormFieldContext | null>(FORM_FIELD_KEY, null)

const effectiveError = computed(() => props.errorMessage ?? formContext?.errorMessage)
const effectiveId = computed(() => formContext?.id)
const describedBy = computed(() => {
  if (!formContext?.id) return undefined
  return effectiveError.value ? `${formContext.id}-error` : `${formContext.id}-hint`
})

const rootClass = computed(() => [
  'voxel-number-field',
  `voxel-number-field--variant-${props.variant}`,
  `voxel-number-field--density-${props.density}`,
  `voxel-number-field--focus-${props.focusEffect}`,
  {
    'voxel-number-field--error': !!effectiveError.value,
  },
  props.class,
])
</script>

<template>
  <NumberFieldRoot
    :modelValue="props.modelValue"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :disabled="props.disabled"
    @update:modelValue="emit('update:modelValue', $event)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <div class="voxel-number-field__wrapper">
      <NumberFieldDecrement
        class="voxel-number-field__button voxel-number-field__button--decrement"
      >
        <slot name="decrement-icon">
          <Icon
            v-if="props.decrementIcon"
            :icon="props.decrementIcon"
            size="small"
            class="voxel-number-field__button-icon"
          />
          <svg
            v-else
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="voxel-number-field__button-icon"
          >
            <path d="M3 7H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </slot>
      </NumberFieldDecrement>
      <NumberFieldInput
        :id="effectiveId"
        :placeholder="props.placeholder"
        :aria-invalid="!!effectiveError"
        :aria-describedby="describedBy"
        class="voxel-number-field__input"
      />
      <NumberFieldIncrement
        class="voxel-number-field__button voxel-number-field__button--increment"
      >
        <slot name="increment-icon">
          <Icon
            v-if="props.incrementIcon"
            :icon="props.incrementIcon"
            size="small"
            class="voxel-number-field__button-icon"
          />
          <svg
            v-else
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="voxel-number-field__button-icon"
          >
            <path
              d="M7 3V11M3 7H11"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </slot>
      </NumberFieldIncrement>
    </div>
  </NumberFieldRoot>
</template>

<style scoped>
.voxel-number-field {
  @apply inline-flex;
}

.voxel-number-field__wrapper {
  @apply inline-flex items-center;
}

/* Buttons — Outlined */
.voxel-number-field__button {
  @apply flex items-center justify-center font-sans transition-all duration-[var(--transition-normal)] focus-visible:outline-none;
}

.voxel-number-field--variant-outlined .voxel-number-field__button {
  @apply bg-[var(--color-surface-background)] border-2 border-[var(--color-grey-200)] text-[var(--color-text-secondary)]
    hover:bg-[var(--color-grey-100)] disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-number-field--variant-outlined .voxel-number-field__button--decrement {
  @apply rounded-l-[var(--rounded-2xl)] border-r-0;
}

.voxel-number-field--variant-outlined .voxel-number-field__button--increment {
  @apply rounded-r-[var(--rounded-2xl)] border-l-0;
}

/* Buttons — Underlined */
.voxel-number-field--variant-underlined .voxel-number-field__button {
  @apply bg-transparent border-0 text-[var(--color-text-secondary)]
    hover:bg-[var(--color-grey-100)] disabled:opacity-50 disabled:cursor-not-allowed;
}

/* Buttons — Ghost */
.voxel-number-field--variant-ghost .voxel-number-field__button {
  @apply bg-transparent border-2 border-transparent text-[var(--color-text-secondary)]
    hover:bg-[var(--color-surface-light)] rounded-[var(--rounded-2xl)]
    disabled:opacity-50 disabled:cursor-not-allowed;
}

/* Button icon */
.voxel-number-field__button-icon {
  @apply size-[14px];
}

/* Input — Outlined */
.voxel-number-field__input {
  @apply font-sans text-center bg-transparent outline-none border-0
    text-[var(--color-text-primary)]
    placeholder:text-[var(--color-text-muted)]
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-number-field--variant-outlined .voxel-number-field__input {
  @apply bg-[var(--color-surface-background)] border-y-2 border-[var(--color-grey-200)]
    rounded-none;
}

.voxel-number-field--variant-underlined .voxel-number-field__input {
  @apply bg-transparent border-y-2 border-[var(--color-grey-300)] rounded-none;
}

.voxel-number-field--variant-ghost .voxel-number-field__input {
  @apply bg-transparent border-2 border-transparent rounded-none;
}

/* Density — button size + input size */
.voxel-number-field--density-default .voxel-number-field__button {
  @apply size-9 text-sm;
}

.voxel-number-field--density-dense .voxel-number-field__button {
  @apply size-7 text-[11px];
}

.voxel-number-field--density-default .voxel-number-field__input {
  @apply w-16 h-9 text-sm;
}

.voxel-number-field--density-dense .voxel-number-field__input {
  @apply w-12 h-7 text-[11px];
}

/* Focus effects — border */
.voxel-number-field--focus-border .voxel-number-field__input:focus-within,
.voxel-number-field--focus-border:focus-within .voxel-number-field__input {
  @apply border-[var(--color-primary-base)]/70;
}

.voxel-number-field--variant-underlined.voxel-number-field--focus-border .voxel-number-field__input:focus-within,
.voxel-number-field--variant-underlined.voxel-number-field--focus-border:focus-within .voxel-number-field__input {
  @apply border-b-[var(--color-primary-base)]/70;
}

/* Focus effects — elevation */
.voxel-number-field--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Focus effects — glow */
.voxel-number-field--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Error — border */
.voxel-number-field--error.voxel-number-field--focus-border .voxel-number-field__input:focus-within,
.voxel-number-field--error.voxel-number-field--focus-border:focus-within .voxel-number-field__input {
  @apply border-[var(--color-error-base)];
}

.voxel-number-field--error.voxel-number-field--variant-underlined.voxel-number-field--focus-border .voxel-number-field__input:focus-within,
.voxel-number-field--error.voxel-number-field--variant-underlined.voxel-number-field--focus-border:focus-within .voxel-number-field__input {
  @apply border-b-[var(--color-error-base)];
}

/* Error — elevation */
.voxel-number-field--error.voxel-number-field--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Error — glow */
.voxel-number-field--error.voxel-number-field--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}
</style>
