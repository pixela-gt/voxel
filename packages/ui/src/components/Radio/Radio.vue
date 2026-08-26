<script setup lang="ts">
import { computed, inject } from 'vue'
import { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator } from 'reka-ui'
import type { RadioGroupProps } from './Radio.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

interface RadioItemData {
  value: string
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<RadioGroupProps & { items?: RadioItemData[] }>(), {
  size: 'default',
  disabled: false,
  error: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// FormField integration: pick up error state when nested
const formField = inject(FORM_FIELD_KEY, null)
const hasError = computed(() => props.error || !!formField?.errorMessage)

const rootClass = computed(() => [
  'inline-flex items-center gap-2',
  hasError.value && 'voxel-radio-group--error',
])
</script>

<template>
  <RadioGroupRoot
    :value="props.modelValue"
    :disabled="props.disabled"
    :name="props.name"
    :required="props.required"
    @update:modelValue="(v) => v && emit('update:modelValue', v as string)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <RadioGroupItem
      v-for="item in props.items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      :class="['voxel-radio', `voxel-radio--size-${props.size}`]"
    >
      <span :class="['voxel-radio__indicator', `voxel-radio__indicator--size-${props.size}`]">
        <RadioGroupIndicator :class="['voxel-radio__icon', `voxel-radio__icon--size-${props.size}`]">
          <div class="voxel-radio__dot" />
        </RadioGroupIndicator>
      </span>
      <label
        v-if="item.label"
        :class="['voxel-radio__label', `voxel-radio__label--size-${props.size}`]"
      >
        {{ item.label }}
      </label>
    </RadioGroupItem>
    <slot />
  </RadioGroupRoot>
</template>

<style scoped>
.voxel-radio {
  @apply flex items-center cursor-pointer;
}

/* Error parity (BUG-001 audit): red accent on indicators + dots */
.voxel-radio-group--error .voxel-radio__indicator {
  border-color: var(--color-error-base);
}
.voxel-radio-group--error .voxel-radio__dot {
  background: var(--color-error-base);
}

.voxel-radio__indicator {
  @apply flex-shrink-0 flex items-center justify-center;
}
.voxel-radio__indicator--size-small {
  @apply size-4 rounded-[8px] border-[1.5px]
    focus-within:ring-2 focus-within:ring-[var(--color-primary-base)] focus-within:ring-offset-2;
  border-color: color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}
.voxel-radio__indicator--size-default {
  @apply size-5 rounded-[10px] border-[1.5px]
    focus-within:ring-2 focus-within:ring-[var(--color-primary-base)] focus-within:ring-offset-2;
  border-color: color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}
.voxel-radio__indicator--size-large {
  @apply size-6 rounded-[12px] border-[2px]
    focus-within:ring-2 focus-within:ring-[var(--color-primary-base)] focus-within:ring-offset-2;
  border-color: color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

.voxel-radio__icon {
  @apply flex items-center justify-center;
}
.voxel-radio__icon--size-small {
  @apply size-[6px];
}
.voxel-radio__icon--size-default {
  @apply size-[8px];
}
.voxel-radio__icon--size-large {
  @apply size-[10px];
}

.voxel-radio__dot {
  @apply rounded-full size-full;
    background: color-mix(in srgb, var(--color-primary-base) 85%, transparent);
}

.voxel-radio__label {
  @apply font-sans font-normal text-[var(--color-text-primary)] ml-1.5;
}
.voxel-radio__label--size-small {
  @apply text-[11px] leading-[16px] tracking-[0.2px];
}
.voxel-radio__label--size-default {
  @apply text-sm leading-[20px] tracking-[0.07px];
}
.voxel-radio__label--size-large {
  @apply text-base leading-[24px] tracking-[0.08px];
}
</style>
