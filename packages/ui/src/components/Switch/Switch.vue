<script setup lang="ts">
import { computed } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import type { SwitchProps } from './Switch.types'

const props = withDefaults(defineProps<SwitchProps>(), {
  size: 'default',
  disabled: false,
  modelValue: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const wrapperClass = computed(() => [
  'voxel-switch__wrapper',
  `voxel-switch__wrapper--size-${props.size}`,
])
const trackClass = computed(() => [
  'voxel-switch',
  `voxel-switch--size-${props.size}`,
  props.modelValue && 'voxel-switch--checked',
])
const thumbClass = computed(() => [
  'voxel-switch__thumb',
  `voxel-switch__thumb--size-${props.size}`,
  props.modelValue && 'voxel-switch__thumb--checked',
])
const labelClass = computed(() => [
  'voxel-switch__label',
  `voxel-switch__label--size-${props.size}`,
  props.class,
])
</script>

<template>
  <div :class="wrapperClass" v-bind="$attrs">
    <SwitchRoot
      v-model="props.modelValue"
      :disabled="props.disabled"
      @update:modelValue="emit('update:modelValue', $event)"
      :class="trackClass"
    >
      <SwitchThumb :class="thumbClass" />
    </SwitchRoot>
    <label v-if="props.label" :class="labelClass">
      {{ props.label }}
    </label>
    <slot />
  </div>
</template>

<style scoped>
.voxel-switch__wrapper--size-small {
  @apply inline-flex items-center gap-[6px];
}
.voxel-switch__wrapper--size-default {
  @apply inline-flex items-center gap-[8px];
}
.voxel-switch__wrapper--size-large {
  @apply inline-flex items-center gap-[8px];
}

.voxel-switch {
  @apply relative inline-flex items-center cursor-pointer
    transition-colors duration-[var(--transition-fast)]
    bg-[var(--color-grey-600)]
    hover:opacity-80
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-switch--checked {
  @apply bg-[var(--color-primary-base)];
}

/* Sizes */
.voxel-switch--size-small {
  @apply h-[16px] w-[28px] rounded-[8px];
}
.voxel-switch--size-default {
  @apply h-[20px] w-[36px] rounded-[10px];
}
.voxel-switch--size-large {
  @apply h-[24px] w-[44px] rounded-[12px];
}

.voxel-switch__thumb {
  @apply rounded-full bg-white shadow-sm transition-transform duration-[var(--transition-fast)]
    translate-x-[2px];
}

.voxel-switch__thumb--checked {
  @apply translate-x-[calc(100%_-_4px)];
}

.voxel-switch__thumb--size-small {
  @apply size-[12px];
}
.voxel-switch__thumb--size-default {
  @apply size-[16px];
}
.voxel-switch__thumb--size-large {
  @apply size-[20px];
}

.voxel-switch__label {
  @apply font-sans font-normal text-[var(--color-text-primary)];
}
.voxel-switch__label--size-small {
  @apply text-[11px] leading-[16px] tracking-[0.2px];
}
.voxel-switch__label--size-default {
  @apply text-sm leading-[20px] tracking-[0.07px];
}
.voxel-switch__label--size-large {
  @apply text-base leading-[24px] tracking-[0.08px];
}
</style>
