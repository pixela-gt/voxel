<script setup lang="ts">
import type { ButtonProps } from './Button.types'

const props = withDefaults(defineProps<ButtonProps>(), {
  style: 'default',
  color: 'primary',
  size: 'default',
  density: 'default',
  loading: false,
  disabled: false,
  prependIcon: false,
  appendIcon: false,
} as const)
</script>

<template>
  <button
    :class="[
      'voxel-button',
      `voxel-button--${props.size}`,
      `voxel-button--${props.density}`,
      `voxel-button--${props.style}-${props.color}`,
      props.loading && 'voxel-button--loading',
    ]"
    :disabled="props.disabled || props.loading"
    v-bind="$attrs"
  >
    <span v-if="props.loading" class="voxel-button__spinner">
      <svg class="voxel-button__spinner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20" />
      </svg>
    </span>
    <span v-if="props.prependIcon && !props.loading" class="voxel-button__icon" aria-hidden="true">
      <slot name="prepend-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </slot>
    </span>
    <slot />
    <span v-if="props.appendIcon" class="voxel-button__icon" aria-hidden="true">
      <slot name="append-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </slot>
    </span>
  </button>
</template>

<style scoped>
@reference "../../style.css"
.voxel-button {
  @apply inline-flex items-center justify-center whitespace-nowrap font-sans antialiased
    transition-colors duration-[var(--transition-fast)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed active:opacity-[0.85];
}

/* Sizes */
.voxel-button--small {
  @apply text-[12px] font-bold tracking-[0.06px] gap-[6px];
}
.voxel-button--small.voxel-button--default {
  @apply px-[24px] py-[10px] rounded-[12px];
}
.voxel-button--small.voxel-button--dense {
  @apply px-[24px] py-[8px] rounded-[8px];
}

.voxel-button--default {
  @apply text-[14px] font-bold tracking-[0.07px] gap-[6px];
}
.voxel-button--default.voxel-button--default {
  @apply px-[24px] py-[12px] rounded-[12px];
}
.voxel-button--default.voxel-button--dense {
  @apply px-[24px] py-[8px] rounded-[12px];
}

.voxel-button--large {
  @apply text-[16px] font-bold tracking-[0.08px] gap-[8px];
}
.voxel-button--large.voxel-button--default {
  @apply px-[28px] py-[14px] rounded-[12px];
}
.voxel-button--large.voxel-button--dense {
  @apply px-[24px] py-[10px] rounded-[12px];
}

/* Variants */
.voxel-button--default-primary {
  @apply bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)];
}
.voxel-button--default-secondary {
  @apply bg-[var(--color-secondary-base)] text-[var(--color-text-on-secondary)];
}
.voxel-button--outline-primary {
  @apply border border-[var(--color-primary-base)] bg-transparent text-[var(--color-primary-base)];
}
.voxel-button--outline-secondary {
  @apply border border-[var(--color-secondary-base)] bg-transparent text-[var(--color-secondary-base)];
}
.voxel-button--tonal-primary {
  @apply bg-[var(--color-primary-lighten-1)] text-[var(--color-primary-base)];
}
.voxel-button--tonal-secondary {
  @apply bg-[var(--color-secondary-lighten-1)] text-[var(--color-secondary-base)];
}
.voxel-button--text-primary {
  @apply text-[var(--color-primary-base)] bg-transparent;
}
.voxel-button--text-secondary {
  @apply bg-[var(--color-secondary-base)] bg-transparent;
}

/* Elements */
.voxel-button__spinner {
  @apply animate-spin;
}
.voxel-button__spinner-icon {
  @apply size-5;
}
.voxel-button__icon {
  @apply size-[16px];
}
.voxel-button__icon--sm {
  @apply size-[12px];
}
.voxel-button__icon--md {
  @apply size-[16px];
}
.voxel-button__icon--lg {
  @apply size-[16px];
}
</style>