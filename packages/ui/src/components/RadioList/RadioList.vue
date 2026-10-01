<script setup lang="ts">
import { computed, inject } from 'vue'
import { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator } from 'reka-ui'
import type { RadioListProps } from './RadioList.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

const props = withDefaults(defineProps<RadioListProps>(), {
  size: 'default',
  disabled: false,
  error: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const formField = inject(FORM_FIELD_KEY, null)
const hasError = computed(() => props.error || !!formField?.errorMessage)

const rootClass = computed(() => [
  'voxel-radio-list',
  hasError.value && 'voxel-radio-list--error',
  props.class,
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
    <div
      v-for="item in props.items"
      :key="item.value"
      :class="['voxel-radio-list__item', `voxel-radio-list__item--size-${props.size}`]"
    >
      <RadioGroupItem
        :value="item.value"
        :disabled="item.disabled || props.disabled"
        :class="['voxel-radio-list__radio', `voxel-radio-list__radio--size-${props.size}`]"
      >
        <span :class="['voxel-radio-list__indicator', `voxel-radio-list__indicator--size-${props.size}`]">
          <RadioGroupIndicator :class="['voxel-radio-list__icon', `voxel-radio-list__icon--size-${props.size}`]">
            <div class="voxel-radio-list__dot" />
          </RadioGroupIndicator>
        </span>
      </RadioGroupItem>
      <div class="voxel-radio-list__text">
        <label
          v-if="item.label"
          :class="['voxel-radio-list__label', `voxel-radio-list__label--size-${props.size}`]"
        >
          {{ item.label }}
        </label>
        <p
          v-if="item.description"
          :class="['voxel-radio-list__description', `voxel-radio-list__description--size-${props.size}`]"
        >
          {{ item.description }}
        </p>
      </div>
    </div>
    <slot />
  </RadioGroupRoot>
</template>

<style scoped>
.voxel-radio-list {
  @apply flex flex-col gap-3;
}

.voxel-radio-list--error .voxel-radio-list__indicator {
  border-color: var(--color-error-base);
}
.voxel-radio-list--error .voxel-radio-list__dot {
  background: var(--color-error-base);
}

.voxel-radio-list__item {
  @apply flex items-start gap-2 cursor-pointer;
}

.voxel-radio-list__radio {
  @apply flex-shrink-0 mt-0.5;
}

.voxel-radio-list__indicator {
  @apply flex items-center justify-center border
    bg-[var(--color-surface-base)];
  border-color: color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

.voxel-radio-list__indicator--size-small {
  @apply size-4 rounded-[8px] border-[1.5px]
    focus-within:ring-2 focus-within:ring-[var(--color-primary-base)] focus-within:ring-offset-2;
}
.voxel-radio-list__indicator--size-default {
  @apply size-5 rounded-[10px] border-[1.5px]
    focus-within:ring-2 focus-within:ring-[var(--color-primary-base)] focus-within:ring-offset-2;
}
.voxel-radio-list__indicator--size-large {
  @apply size-6 rounded-[12px] border-[2px]
    focus-within:ring-2 focus-within:ring-[var(--color-primary-base)] focus-within:ring-offset-2;
}

.voxel-radio-list__item[data-state='checked'] .voxel-radio-list__indicator,
.voxel-radio-list__radio[data-state='checked'] .voxel-radio-list__indicator {
  border-color: var(--color-primary-base);
}

.voxel-radio-list__icon {
  @apply flex items-center justify-center;
}
.voxel-radio-list__icon--size-small {
  @apply size-[6px];
}
.voxel-radio-list__icon--size-default {
  @apply size-[8px];
}
.voxel-radio-list__icon--size-large {
  @apply size-[10px];
}

.voxel-radio-list__dot {
  @apply rounded-full size-full;
  background: color-mix(in srgb, var(--color-primary-base) 85%, transparent);
}

.voxel-radio-list__text {
  @apply flex flex-col gap-0.5;
}

.voxel-radio-list__label {
  @apply font-sans font-normal text-[var(--color-text-primary)] cursor-pointer;
}
.voxel-radio-list__label--size-small {
  @apply text-[11px] leading-[16px] tracking-[0.2px];
}
.voxel-radio-list__label--size-default {
  @apply text-sm leading-[20px] tracking-[0.07px];
}
.voxel-radio-list__label--size-large {
  @apply text-base leading-[24px] tracking-[0.08px];
}

.voxel-radio-list__description {
  @apply font-sans text-[var(--color-text-secondary)]/70 pl-0;
}
.voxel-radio-list__description--size-small {
  @apply text-[10px] leading-[14px];
}
.voxel-radio-list__description--size-default {
  @apply text-xs leading-[16px];
}
.voxel-radio-list__description--size-large {
  @apply text-sm leading-[20px];
}
</style>
