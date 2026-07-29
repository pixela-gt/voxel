<script setup lang="ts">
import { computed, provide, useSlots, useId } from 'vue'
import type { FormFieldProps, FormFieldContext } from './FormField.types'
import { FORM_FIELD_KEY } from './FormField.types'

const props = withDefaults(defineProps<FormFieldProps>(), {
  required: false,
  density: 'default',
} as const)

const slots = useSlots()

const effectiveId = computed(() => props.id ?? useId())
const hintId = computed(() => `${effectiveId.value}-hint`)
const errorId = computed(() => `${effectiveId.value}-error`)
const effectiveError = computed(() => props.errorMessage)

const context = computed<FormFieldContext>(() => ({
  id: effectiveId.value,
  errorMessage: effectiveError.value,
}))

provide(FORM_FIELD_KEY, context.value)

const rootClass = computed(() => [
  'voxel-form-field',
  `voxel-form-field--density-${props.density}`,
  props.class,
])
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <label v-if="props.label" :for="effectiveId" class="voxel-form-field__label">
      {{ props.label }}
      <span v-if="props.required" class="voxel-form-field__required" aria-hidden="true"> *</span>
    </label>
    <slot />
    <p v-if="!effectiveError && (props.hint || slots.hint)" :id="hintId" class="voxel-form-field__hint">
      <slot name="hint">{{ props.hint }}</slot>
    </p>
    <p v-else-if="effectiveError" :id="errorId" class="voxel-form-field__error" role="alert">
      <slot name="hint">{{ effectiveError }}</slot>
    </p>
  </div>
</template>

<style scoped>
.voxel-form-field {
  @apply flex flex-col gap-1 w-full;
}

.voxel-form-field__label {
  @apply font-sans font-bold text-sm text-[var(--color-text-primary)]/80 cursor-pointer;
}

.voxel-form-field--density-dense .voxel-form-field__label {
  @apply text-xs;
}

.voxel-form-field__required {
  @apply text-[var(--color-error-base)] ml-0.5;
}

.voxel-form-field__hint {
  @apply font-sans text-xs leading-[16px] text-[var(--color-text-secondary)]/60;
}

.voxel-form-field--density-dense .voxel-form-field__hint {
  @apply text-[11px] leading-[14px];
}

.voxel-form-field__error {
  @apply font-sans text-xs leading-[16px] text-[var(--color-error-base)];
}

.voxel-form-field--density-dense .voxel-form-field__error {
  @apply text-[11px] leading-[14px];
}
</style>
