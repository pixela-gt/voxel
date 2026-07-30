<script setup lang="ts">
import { computed, inject } from 'vue'
import { PinInputRoot, PinInputInput } from 'reka-ui'
import type { PinInputProps } from './PinInput.types'
import type { FormFieldContext } from '../FormField/FormField.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

const props = withDefaults(defineProps<PinInputProps>(), {
  length: 6,
  type: 'text',
  mask: false,
  disabled: false,
  variant: 'outlined',
  size: 'default',
  density: 'default',
  focusEffect: 'border',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const formContext = inject<FormFieldContext | null>(FORM_FIELD_KEY, null)

const effectiveError = computed(() => props.errorMessage ?? formContext?.errorMessage)
const effectiveId = computed(() => formContext?.id)
const describedBy = computed(() => {
  if (!formContext?.id) return undefined
  return effectiveError.value ? `${formContext.id}-error` : `${formContext.id}-hint`
})

const rootClass = computed(() => [
  'voxel-pin-input',
  `voxel-pin-input--variant-${props.variant}`,
  `voxel-pin-input--size-${props.size}`,
  `voxel-pin-input--density-${props.density}`,
  `voxel-pin-input--focus-${props.focusEffect}`,
  {
    'voxel-pin-input--error': !!effectiveError.value,
    'voxel-pin-input--disabled': props.disabled,
  },
  props.class,
])
</script>

<template>
  <PinInputRoot
    :modelValue="props.modelValue"
    :length="props.length"
    :type="props.type"
    :mask="props.mask"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    @update:modelValue="emit('update:modelValue', $event)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <PinInputInput
      v-for="(_, index) in props.length"
      :key="index"
      :index="index"
      :id="effectiveId"
      :aria-invalid="!!effectiveError"
      :aria-describedby="describedBy"
      class="voxel-pin-input__field"
    />
  </PinInputRoot>
</template>

<style scoped>
.voxel-pin-input {
  @apply inline-flex items-center gap-2 font-sans transition-all duration-[var(--transition-normal)] focus-within:outline-none;
}

/* Outlined */
.voxel-pin-input--variant-outlined {
  @apply bg-[var(--color-surface-background)] border-2 border-[var(--color-grey-200)] rounded-[var(--rounded-2xl)];
}

/* Outlined + default */
.voxel-pin-input--variant-outlined.voxel-pin-input--density-default {
  @apply px-3 py-3 gap-2;
}

/* Outlined + dense */
.voxel-pin-input--variant-outlined.voxel-pin-input--density-dense {
  @apply px-2 py-2 gap-1.5;
}

/* Underlined */
.voxel-pin-input--variant-underlined {
  @apply bg-transparent border-0 border-b-2 border-[var(--color-grey-300)] rounded-none;
}

/* Underlined + default */
.voxel-pin-input--variant-underlined.voxel-pin-input--density-default {
  @apply py-3 gap-2;
}

/* Underlined + dense */
.voxel-pin-input--variant-underlined.voxel-pin-input--density-dense {
  @apply py-2 gap-1.5;
}

/* Ghost */
.voxel-pin-input--variant-ghost {
  @apply bg-transparent border-2 border-transparent rounded-[var(--rounded-2xl)] hover:bg-[var(--color-surface-light)];
}

/* Ghost + default */
.voxel-pin-input--variant-ghost.voxel-pin-input--density-default {
  @apply px-3 py-3 gap-2;
}

/* Ghost + dense */
.voxel-pin-input--variant-ghost.voxel-pin-input--density-dense {
  @apply px-2 py-2 gap-1.5;
}

/* Focus effects — border */
.voxel-pin-input--focus-border:focus-within {
  @apply border-[var(--color-primary-base)]/70;
}

.voxel-pin-input--variant-underlined.voxel-pin-input--focus-border:focus-within {
  @apply border-b-[var(--color-primary-base)]/70;
}

/* Focus effects — elevation */
.voxel-pin-input--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Focus effects — glow */
.voxel-pin-input--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Error — border */
.voxel-pin-input--error.voxel-pin-input--focus-border:focus-within {
  @apply border-[var(--color-error-base)];
}

.voxel-pin-input--error.voxel-pin-input--variant-underlined.voxel-pin-input--focus-border:focus-within {
  @apply border-b-[var(--color-error-base)];
}

/* Error — elevation */
.voxel-pin-input--error.voxel-pin-input--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Error — glow */
.voxel-pin-input--error.voxel-pin-input--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Disabled */
.voxel-pin-input--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-pin-input--disabled.voxel-pin-input--variant-outlined {
  @apply bg-[var(--color-grey-50)] border-[var(--color-grey-200)];
}

.voxel-pin-input--disabled.voxel-pin-input--variant-underlined {
  @apply border-b-[var(--color-grey-200)];
}

.voxel-pin-input--disabled.voxel-pin-input--variant-ghost {
  @apply hover:bg-transparent;
}

/* Field */
.voxel-pin-input__field {
  @apply flex-1 min-w-0 bg-transparent outline-none border-0 text-sm text-center text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed;
}

/* Size variants */
.voxel-pin-input--size-small .voxel-pin-input__field {
  @apply w-8 h-9 text-xs;
}

.voxel-pin-input--size-default .voxel-pin-input__field {
  @apply w-10 h-12 text-sm;
}

.voxel-pin-input--size-large .voxel-pin-input__field {
  @apply w-12 h-14 text-base;
}
</style>
