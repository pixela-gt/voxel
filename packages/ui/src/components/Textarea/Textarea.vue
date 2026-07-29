<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import type { TextareaProps } from './Textarea.types'
import type { FormFieldContext } from '../FormField/FormField.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: false,
  rows: 3,
  variant: 'outlined',
  focusEffect: 'border',
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
  'voxel-textarea',
  `voxel-textarea--variant-${props.variant}`,
  `voxel-textarea--focus-${props.focusEffect}`,
  {
    'voxel-textarea--error': !!effectiveError.value,
    'voxel-textarea--disabled': props.disabled,
  },
  props.class,
])

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div :class="rootClass">
    <div v-if="slots.prepend" class="voxel-textarea__prepend">
      <slot name="prepend" />
    </div>
    <textarea
      :id="effectiveId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :name="name"
      :aria-invalid="!!effectiveError"
      :aria-describedby="describedBy"
      v-bind="$attrs"
      class="voxel-textarea__field"
      @input="onInput"
    />
    <div v-if="slots.append" class="voxel-textarea__append">
      <slot name="append" />
    </div>
  </div>
</template>

<style scoped>
.voxel-textarea {
  @apply inline-flex items-start gap-2 w-full font-sans
    transition-all duration-[var(--transition-normal)]
    focus-within:outline-none;
}

/* Outlined */
.voxel-textarea--variant-outlined {
  @apply bg-[var(--color-surface-background)] border-2 border-[var(--color-grey-200)] rounded-[var(--rounded-2xl)] px-3 py-3;
}

/* Underlined */
.voxel-textarea--variant-underlined {
  @apply bg-transparent border-0 border-b-2 border-[var(--color-grey-300)] rounded-none py-3;
}

/* Ghost */
.voxel-textarea--variant-ghost {
  @apply bg-transparent border-2 border-transparent rounded-[var(--rounded-2xl)] px-3 py-3 hover:bg-[var(--color-surface-light)];
}

/* Focus effects — border */
.voxel-textarea--focus-border:focus-within {
  @apply border-[var(--color-primary-base)]/70;
}

.voxel-textarea--variant-underlined.voxel-textarea--focus-border:focus-within {
  @apply border-b-[var(--color-primary-base)]/70;
}

/* Focus effects — elevation */
.voxel-textarea--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Focus effects — glow */
.voxel-textarea--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Error — border */
.voxel-textarea--error.voxel-textarea--focus-border:focus-within {
  @apply border-[var(--color-error-base)];
}

.voxel-textarea--error.voxel-textarea--variant-underlined.voxel-textarea--focus-border:focus-within {
  @apply border-b-[var(--color-error-base)];
}

/* Error — elevation */
.voxel-textarea--error.voxel-textarea--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Error — glow */
.voxel-textarea--error.voxel-textarea--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Disabled */
.voxel-textarea--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-textarea--disabled.voxel-textarea--variant-outlined {
  @apply bg-[var(--color-grey-50)] border-[var(--color-grey-200)];
}

.voxel-textarea--disabled.voxel-textarea--variant-underlined {
  @apply border-b-[var(--color-grey-200)];
}

.voxel-textarea--disabled.voxel-textarea--variant-ghost {
  @apply hover:bg-transparent;
}

/* Field */
.voxel-textarea__field {
  @apply flex-1 min-w-0 bg-transparent outline-none border-0 resize-y
    text-sm leading-[20px] text-[var(--color-text-primary)]
    placeholder:text-[var(--color-text-muted)]
    min-h-[80px]
    disabled:cursor-not-allowed;
}

/* Prepend / append */
.voxel-textarea__prepend,
.voxel-textarea__append {
  @apply shrink-0 flex items-center justify-center text-[var(--color-text-muted)] size-5;
}
</style>
