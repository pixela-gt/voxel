<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import type { InputProps } from './Input.types'
import type { FormFieldContext } from '../FormField/FormField.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  density: 'default',
  variant: 'outlined',
  focusEffect: 'border',
  disabled: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const slots = useSlots()

const formContext = inject<FormFieldContext | null>(FORM_FIELD_KEY, null)

const effectiveError = computed(() => props.errorMessage ?? formContext?.errorMessage)
const effectiveId = computed(() => formContext?.id)
const describedBy = computed(() => {
  if (!formContext?.id) return undefined
  return effectiveError.value ? `${formContext.id}-error` : `${formContext.id}-hint`
})

const rootClass = computed(() => [
  'voxel-input',
  `voxel-input--variant-${props.variant}`,
  `voxel-input--density-${props.density}`,
  `voxel-input--focus-${props.focusEffect}`,
  {
    'voxel-input--error': !!effectiveError.value,
    'voxel-input--disabled': props.disabled,
  },
  props.class,
])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div :class="rootClass">
    <div v-if="slots.prepend" class="voxel-input__prepend">
      <slot name="prepend" />
    </div>
    <input :id="effectiveId" :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
      :name="name" :aria-invalid="!!effectiveError" :aria-describedby="describedBy" v-bind="$attrs"
      class="voxel-input__field" @input="onInput" />
    <div v-if="slots.append" class="voxel-input__append">
      <slot name="append" />
    </div>
  </div>
</template>

<style scoped>
.voxel-input {
  @apply inline-flex items-center w-full font-sans transition-all duration-[var(--transition-normal)] focus-within:outline-none;
}

/* Outlined */
.voxel-input--variant-outlined {
  @apply bg-[var(--color-surface-background)] border-2 border-[var(--color-grey-200)] rounded-[var(--rounded-2xl)];
}

/* Outlined + default */
.voxel-input--variant-outlined.voxel-input--density-default {
  @apply px-3 py-3 gap-2;
}

/* Outlined + dense */
.voxel-input--variant-outlined.voxel-input--density-dense {
  @apply px-2 py-2 gap-1.5;
}

/* Underlined */
.voxel-input--variant-underlined {
  @apply bg-transparent border-0 border-b-2 border-[var(--color-grey-300)] rounded-none;
}

/* Underlined + default */
.voxel-input--variant-underlined.voxel-input--density-default {
  @apply py-3 gap-2;
}

/* Underlined + dense */
.voxel-input--variant-underlined.voxel-input--density-dense {
  @apply py-2 gap-1.5;
}

/* Ghost */
.voxel-input--variant-ghost {
  @apply bg-transparent border-2 border-transparent rounded-[var(--rounded-2xl)] hover:bg-[var(--color-surface-light)];
}

/* Ghost + default */
.voxel-input--variant-ghost.voxel-input--density-default {
  @apply px-3 py-3 gap-2;
}

/* Ghost + dense */
.voxel-input--variant-ghost.voxel-input--density-dense {
  @apply px-2 py-2 gap-1.5;
}

/* Focus effects — border */
.voxel-input--focus-border:focus-within {
  @apply border-[var(--color-primary-base)]/70;
}

.voxel-input--variant-underlined.voxel-input--focus-border:focus-within {
  @apply border-b-[var(--color-primary-base)]/70;
}

/* Focus effects — elevation */
.voxel-input--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Focus effects — glow */
.voxel-input--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Error — border */
.voxel-input--error.voxel-input--focus-border:focus-within {
  @apply border-[var(--color-error-base)];
}

.voxel-input--error.voxel-input--variant-underlined.voxel-input--focus-border:focus-within {
  @apply border-b-[var(--color-error-base)];
}

/* Error — elevation */
.voxel-input--error.voxel-input--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Error — glow */
.voxel-input--error.voxel-input--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Disabled */
.voxel-input--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-input--disabled.voxel-input--variant-outlined {
  @apply bg-[var(--color-grey-50)] border-[var(--color-grey-200)];
}

.voxel-input--disabled.voxel-input--variant-underlined {
  @apply border-b-[var(--color-grey-200)];
}

.voxel-input--disabled.voxel-input--variant-ghost {
  @apply hover:bg-transparent;
}

/* Field */
.voxel-input__field {
  @apply flex-1 min-w-0 bg-transparent outline-none border-0 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed;
}

.voxel-input__field[type="file"] {
  @apply text-xs;
}

/* Prepend / append */
.voxel-input__prepend,
.voxel-input__append {
  @apply shrink-0 flex items-center justify-center text-[var(--color-text-muted)];
}

.voxel-input--density-default .voxel-input__prepend,
.voxel-input--density-default .voxel-input__append {
  @apply size-5;
}

.voxel-input--density-dense .voxel-input__prepend,
.voxel-input--density-dense .voxel-input__append {
  @apply size-4;
}
</style>
