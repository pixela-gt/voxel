<script setup lang="ts">
import { computed } from 'vue'
import { NumberFieldRoot, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement } from 'reka-ui'
import type { NumberFieldProps } from './NumberField.types'

const props = withDefaults(defineProps<NumberFieldProps>(), {
  min: 0,
  max: Infinity,
  step: 1,
  disabled: false,
  size: 'default',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const rootClass = computed(() => ['voxel-number-field', `voxel-number-field--${props.size}`])
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
      <NumberFieldDecrement class="voxel-number-field__button voxel-number-field__button--decrement">
        <slot name="decrement-icon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </slot>
      </NumberFieldDecrement>
      <NumberFieldInput
        :placeholder="props.placeholder"
        class="voxel-number-field__input"
      />
      <NumberFieldIncrement class="voxel-number-field__button voxel-number-field__button--increment">
        <slot name="increment-icon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 3V11M3 7H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
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

.voxel-number-field__button {
  @apply flex items-center justify-center
    bg-[var(--color-surface-base)]
    border border-[var(--color-grey-600)]
    text-[var(--color-text-secondary)]
    transition-colors duration-[var(--transition-fast)]
    hover:bg-[var(--color-grey-100)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-number-field--small .voxel-number-field__button {
  @apply size-7 text-[11px];
}
.voxel-number-field--default .voxel-number-field__button {
  @apply size-9 text-sm;
}
.voxel-number-field--large .voxel-number-field__button {
  @apply size-11 text-base;
}

.voxel-number-field__button--decrement {
  @apply rounded-l-lg border-r-0;
}

.voxel-number-field__button--increment {
  @apply rounded-r-lg border-l-0;
}

.voxel-number-field__input {
  @apply font-sans text-center
    bg-[var(--color-surface-base)]
    border-y border-[var(--color-grey-600)]
    text-[var(--color-text-primary)]
    focus:outline-none focus:border-[var(--color-primary-base)] focus:ring-2 focus:ring-[var(--color-primary-base)]
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-number-field--small .voxel-number-field__input {
  @apply w-12 h-7 text-[11px];
}
.voxel-number-field--default .voxel-number-field__input {
  @apply w-16 h-9 text-sm;
}
.voxel-number-field--large .voxel-number-field__input {
  @apply w-20 h-11 text-base;
}
</style>
