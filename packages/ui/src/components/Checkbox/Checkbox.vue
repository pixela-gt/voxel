<script setup lang="ts">
import { computed } from 'vue'
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui'
import type { CheckboxProps } from './Checkbox.types'

const props = withDefaults(defineProps<CheckboxProps>(), {
  size: 'default',
  disabled: false,
  modelValue: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const checked = computed(() => props.modelValue)

const indicatorClass = computed(() => [
  'voxel-checkbox__indicator',
  `voxel-checkbox__indicator--${props.size}`,
  checked.value && 'voxel-checkbox__indicator--checked',
])
const iconClass = computed(() => ['voxel-checkbox__icon', `voxel-checkbox__icon--${props.size}`])
const labelClass = computed(() => ['voxel-checkbox__label', `voxel-checkbox__label--${props.size}`])
</script>

<template>
  <div class="voxel-checkbox__wrapper" v-bind="$attrs">
    <CheckboxRoot
      :checked="checked"
      :disabled="props.disabled"
      @update:checked="(v: boolean) => emit('update:modelValue', v)"
      class="voxel-checkbox"
    >
      <CheckboxIndicator :class="indicatorClass">
        <svg :class="iconClass" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 8L7 12L13 4" />
        </svg>
      </CheckboxIndicator>
    </CheckboxRoot>
    <label v-if="props.label" :class="labelClass">
      {{ props.label }}
    </label>
    <slot />
  </div>
</template>

<style scoped>
@reference "../../style.css"
.voxel-checkbox__wrapper {
  @apply inline-flex items-center gap-[6px];
}

.voxel-checkbox {
  @apply relative flex-shrink-0 cursor-pointer;
}

.voxel-checkbox__indicator {
  @apply border border-[1.5px] border-[var(--color-grey-400)] flex items-center justify-center
    transition-all duration-[var(--transition-fast)]
    hover:border-[var(--color-primary-base)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-checkbox__indicator--checked {
  @apply bg-[var(--color-primary-base)] border-[var(--color-primary-base)];
}

/* Sizes */
.voxel-checkbox__indicator--small {
  @apply size-4 rounded-[4px];
}
.voxel-checkbox__indicator--default {
  @apply size-5 rounded-[5px];
}
.voxel-checkbox__indicator--large {
  @apply size-6 rounded-[6px];
}

.voxel-checkbox__icon--small {
  @apply size-[10px];
}
.voxel-checkbox__icon--default {
  @apply size-[12px];
}
.voxel-checkbox__icon--large {
  @apply size-[14px];
}

.voxel-checkbox__label {
  @apply font-sans font-normal text-[var(--color-text-primary)];
}
.voxel-checkbox__label--small {
  @apply text-[11px] leading-[16px] tracking-[0.2px];
}
.voxel-checkbox__label--default {
  @apply text-sm leading-[20px] tracking-[0.07px];
}
.voxel-checkbox__label--large {
  @apply text-base leading-[24px] tracking-[0.08px];
}
</style>