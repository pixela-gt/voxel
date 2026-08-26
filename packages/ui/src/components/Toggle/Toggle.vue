<script setup lang="ts">
import { computed } from 'vue'
import { Toggle as RekaToggle } from 'reka-ui'
import type { ToggleProps } from './Toggle.types'

const props = withDefaults(defineProps<ToggleProps>(), {
  variant: 'button',
  size: 'default',
  disabled: false,
  modelValue: false,
} as const)

const toggleClass = computed(() => [
  'voxel-toggle',
  `voxel-toggle--variant-${props.variant}`,
  `voxel-toggle--size-${props.size}`,
  props.class,
])
</script>

<template>
  <RekaToggle
    v-model="props.modelValue"
    :value="props.value"
    :disabled="props.disabled"
    :class="toggleClass"
    v-bind="$attrs"
  >
    <slot />
  </RekaToggle>
</template>

<style scoped>
.voxel-toggle {
  @apply inline-flex items-center justify-center whitespace-nowrap font-sans antialiased
    transition-colors duration-[var(--transition-fast)] cursor-pointer
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed;
  corner-smoothing: 60%;
}

.voxel-toggle--variant-button {
  @apply px-[24px] py-[12px] rounded-[12px] gap-[6px]
    text-[14px] font-bold tracking-[0.07px]
    bg-transparent text-[var(--color-primary-base)] border border-[var(--color-primary-base)]
    hover:bg-[var(--color-primary-lighten-1)] active:bg-[var(--color-primary-lighten-1)];
}

.voxel-toggle--variant-button[data-state='on'] {
  @apply bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)] border-transparent;
}

.voxel-toggle--variant-icon-button {
  @apply size-[40px] rounded-[20px]
    bg-transparent text-[var(--color-primary-base)]
    hover:bg-[var(--color-primary-lighten-1)] active:bg-[var(--color-primary-lighten-1)];
}

.voxel-toggle--variant-icon-button[data-state='on'] {
  @apply bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)];
}

.voxel-toggle--size-small.voxel-toggle--variant-button {
  @apply px-[20px] py-[8px] rounded-[10px] text-xs gap-[4px];
}

.voxel-toggle--size-small.voxel-toggle--variant-icon-button {
  @apply size-9 rounded-[18px];
}

.voxel-toggle--size-large.voxel-toggle--variant-button {
  @apply px-[28px] py-[14px] rounded-[14px] text-base gap-[8px];
}

.voxel-toggle--size-large.voxel-toggle--variant-icon-button {
  @apply size-11 rounded-[22px];
}
</style>
