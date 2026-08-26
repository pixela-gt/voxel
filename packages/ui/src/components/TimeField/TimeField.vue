<script setup lang="ts">
import { computed, inject } from 'vue'
import { TimeFieldRoot, TimeFieldInput } from 'reka-ui'
import type { TimeFieldProps } from './TimeField.types'
import type { FormFieldContext } from '../FormField/FormField.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

const props = withDefaults(defineProps<TimeFieldProps>(), {
  disabled: false,
  readonly: false,
  variant: 'outlined',
  size: 'default',
  density: 'default',
  focusEffect: 'border',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: TimeFieldProps['modelValue']]
}>()

const formContext = inject<FormFieldContext | null>(FORM_FIELD_KEY, null)

const effectiveError = computed(() => props.errorMessage ?? formContext?.errorMessage)
const effectiveId = computed(() => formContext?.id)
const describedBy = computed(() => {
  if (!formContext?.id) return undefined
  return effectiveError.value ? `${formContext.id}-error` : `${formContext.id}-hint`
})

const rootClass = computed(() => [
  'voxel-time-field',
  `voxel-time-field--variant-${props.variant}`,
  `voxel-time-field--size-${props.size}`,
  `voxel-time-field--density-${props.density}`,
  `voxel-time-field--focus-${props.focusEffect}`,
  {
    'voxel-time-field--error': !!effectiveError.value,
    'voxel-time-field--disabled': props.disabled,
  },
  props.class,
])
</script>

<template>
  <div :class="rootClass">
    <TimeFieldRoot
      v-model="props.modelValue"
      class="voxel-time-field__group"
      :default-value="defaultValue ?? undefined"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :name="name"
      @update:modelValue="(v) => emit('update:modelValue', v)"
    >
      <template #default="{ segments }">
        <template v-for="(segment, index) in segments" :key="index">
          <TimeFieldInput
            :part="segment.part"
            :id="index === 0 ? effectiveId : undefined"
            :aria-invalid="!!effectiveError || undefined"
            :aria-describedby="describedBy"
            :class="{ 'voxel-time-field__segment': segment.part !== 'literal' }"
          >
            {{ segment.value }}
          </TimeFieldInput>
        </template>
      </template>
    </TimeFieldRoot>
  </div>
</template>

<style scoped>
.voxel-time-field {
  @apply inline-flex items-center w-full font-sans transition-all duration-[var(--transition-normal)] focus-within:outline-none;
}

.voxel-time-field__group {
  @apply flex items-start flex-1 min-w-0;
}

/* Outlined */
.voxel-time-field--variant-outlined {
  @apply bg-[var(--color-surface-background)] border-2 border-[var(--color-grey-200)] rounded-[var(--rounded-2xl)];
}

.voxel-time-field--variant-outlined.voxel-time-field--density-default {
  @apply px-3 py-3 gap-2;
}

.voxel-time-field--variant-outlined.voxel-time-field--density-dense {
  @apply px-2 py-2 gap-1.5;
}

/* Underlined */
.voxel-time-field--variant-underlined {
  @apply bg-transparent border-0 border-b-2 border-[var(--color-grey-300)] rounded-none;
}

.voxel-time-field--variant-underlined.voxel-time-field--density-default {
  @apply py-3 gap-2;
}

.voxel-time-field--variant-underlined.voxel-time-field--density-dense {
  @apply py-2 gap-1.5;
}

/* Ghost */
.voxel-time-field--variant-ghost {
  @apply bg-transparent border-2 border-transparent rounded-[var(--rounded-2xl)] hover:bg-[var(--color-surface-light)];
}

.voxel-time-field--variant-ghost.voxel-time-field--density-default {
  @apply px-3 py-3 gap-2;
}

.voxel-time-field--variant-ghost.voxel-time-field--density-dense {
  @apply px-2 py-2 gap-1.5;
}

/* Focus effects — border */
.voxel-time-field--focus-border:focus-within {
  @apply border-[var(--color-primary-base)]/70;
}

.voxel-time-field--variant-underlined.voxel-time-field--focus-border:focus-within {
  @apply border-b-[var(--color-primary-base)]/70;
}

/* Focus effects — elevation */
.voxel-time-field--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Focus effects — glow */
.voxel-time-field--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Error — border */
.voxel-time-field--error.voxel-time-field--focus-border:focus-within {
  @apply border-[var(--color-error-base)];
}

.voxel-time-field--error.voxel-time-field--variant-underlined.voxel-time-field--focus-border:focus-within {
  @apply border-b-[var(--color-error-base)];
}

/* Error — elevation */
.voxel-time-field--error.voxel-time-field--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Error — glow */
.voxel-time-field--error.voxel-time-field--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Disabled */
.voxel-time-field--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-time-field--disabled.voxel-time-field--variant-outlined {
  @apply bg-[var(--color-grey-50)] border-[var(--color-grey-200)];
}

.voxel-time-field--disabled.voxel-time-field--variant-underlined {
  @apply border-b-[var(--color-grey-200)];
}

.voxel-time-field--disabled.voxel-time-field--variant-ghost {
  @apply hover:bg-transparent;
}

/* Input */
.voxel-time-field__segment {
  @apply bg-transparent outline-none border-0 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed;
}

/* Size */
.voxel-time-field--size-small .voxel-time-field__segment { @apply text-[11px]; }
.voxel-time-field--size-default .voxel-time-field__segment { @apply text-sm; }
.voxel-time-field--size-large .voxel-time-field__segment { @apply text-base; }
</style>
