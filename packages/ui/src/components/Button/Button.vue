<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { ButtonProps } from './Button.types'

const props = withDefaults(defineProps<ButtonProps>(), {
  buttonStyle: 'default',
  color: 'primary',
  size: 'default',
  density: 'default',
  loading: false,
  disabled: false,
} as const)

const slots = useSlots()

const classes = computed(() => [
  'voxel-button',
  `voxel-button--size-${props.size}`,
  `voxel-button--density-${props.density}`,
  `voxel-button--color-${props.color}`,
  `voxel-button--style-${props.buttonStyle}`,
  { 'voxel-button--loading': props.loading },
])
</script>

<template>
  <button
    :class="classes"
    :disabled="props.disabled || props.loading"
    v-bind="$attrs"
  >
    <span v-if="props.loading" class="voxel-button__spinner">
      <svg class="voxel-button__spinner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20" />
      </svg>
    </span>
    <span v-if="slots['prepend-icon'] && !props.loading" class="voxel-button__icon" aria-hidden="true">
      <slot name="prepend-icon" />
    </span>
    <slot />
    <span v-if="slots['append-icon']" class="voxel-button__icon" aria-hidden="true">
      <slot name="append-icon" />
    </span>
  </button>
</template>

<style scoped>
.voxel-button {
  @apply inline-flex items-center justify-center whitespace-nowrap font-sans antialiased
    cursor-pointer transition-colors duration-[var(--transition-fast)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed active:opacity-[0.85];
  corner-smoothing: 60%;
}

/* Sizes + Density (padding/roundness applies to all styles) */
.voxel-button--size-small {
  @apply text-xs font-bold tracking-[0.06px] gap-[6px] px-[24px] py-[10px] rounded-[12px];
}
.voxel-button--size-small.voxel-button--density-dense {
  @apply py-[8px] rounded-[12px];
}
.voxel-button--size-default {
  @apply text-sm font-bold tracking-[0.07px] gap-[6px] px-[24px] py-[12px] rounded-[12px];
}

.voxel-button--size-default.voxel-button--density-dense {
  @apply py-[8px];
}

.voxel-button--size-large {
  @apply text-base font-bold tracking-[0.08px] gap-[8px] px-[28px] py-[14px] rounded-[12px];
}
.voxel-button--size-large.voxel-button--density-dense {
  @apply px-[24px] py-[10px];
}
/* Colors */
.voxel-button--color-primary {
  @apply bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)];
}

.voxel-button--color-secondary {
  @apply bg-[var(--color-secondary-base)] text-[var(--color-text-on-secondary)];
}

/* Styles */
.voxel-button--style-outline {
  @apply border bg-transparent;
}
.voxel-button--style-outline.voxel-button--color-primary {
  @apply border-[var(--color-primary-base)] text-[var(--color-primary-base)];
}
.voxel-button--style-outline.voxel-button--color-secondary {
  @apply border-[var(--color-secondary-base)] text-[var(--color-secondary-base)];
}
.voxel-button--style-tonal {
  @apply bg-[var(--color-primary-lighten-1)]/12;
}
.voxel-button--style-tonal.voxel-button--color-primary {
  @apply text-[var(--color-primary-base)];
}
.voxel-button--style-tonal.voxel-button--color-secondary {
  @apply bg-[var(--color-secondary-lighten-1)]/12 text-[var(--color-secondary-base)];
}
.voxel-button--style-text {
  @apply bg-transparent;
}
.voxel-button--style-text.voxel-button--color-primary {
  @apply text-[var(--color-primary-base)];
}
.voxel-button--style-text.voxel-button--color-secondary {
  @apply text-[var(--color-secondary-base)];
}
/* Icon sizing per button size */
.voxel-button--size-small .voxel-button__icon {
  @apply size-[12px];
}
.voxel-button--size-default .voxel-button__icon,
.voxel-button--size-large .voxel-button__icon {
  @apply size-[16px];
}

/* Elements */
.voxel-button__spinner {
  @apply animate-spin;
}
.voxel-button__spinner-icon {
  @apply size-5;
}
</style>

