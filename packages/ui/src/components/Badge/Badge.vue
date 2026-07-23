<script setup lang="ts">
import type { BadgeProps } from './Badge.types'

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  size: 'default',
  dot: false,
} as const)
</script>

<template>
  <span
    :class="[
      'voxel-badge',
      `voxel-badge--size-${props.size}`,
      `voxel-badge--variant-${props.variant}`,
      props.class,
    ]"
    v-bind="$attrs"
  >
    <span
      v-if="props.dot"
      :class="['voxel-badge__dot', `voxel-badge__dot--variant-${props.variant}`]"
      aria-hidden="true"
    />
    <slot />
  </span>
</template>

<style scoped>
.voxel-badge {
  @apply inline-flex items-center gap-1 font-sans font-medium whitespace-nowrap rounded-full;
}

/* Sizes */
.voxel-badge--size-small {
  @apply px-2 py-0.5 text-[11px] leading-[16px] tracking-[0.2px] gap-1;
}

.voxel-badge--size-default {
  @apply px-2.5 py-1 text-xs leading-[20px] tracking-[0.07px] gap-1.5;
}

.voxel-badge--size-large {
  @apply px-3 py-1.5 text-sm leading-[24px] tracking-[0.08px] gap-2;
}

/* Variants */
.voxel-badge--variant-default {
  @apply bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)];
}

.voxel-badge--variant-outline {
  @apply border border-[var(--color-primary-base)] text-[var(--color-primary-base)] bg-transparent;
}

.voxel-badge--variant-subtle {
  @apply bg-[var(--color-primary-lighten-1)] text-[var(--color-primary-darken-1)];
}

.voxel-badge--variant-info {
  @apply bg-[var(--color-info-base)] text-[var(--color-text-inverse)];
}

.voxel-badge--variant-success {
  @apply bg-[var(--color-success-base)] text-[var(--color-text-inverse)];
}

.voxel-badge--variant-warning {
  @apply bg-[var(--color-warning-base)] text-[var(--color-text-primary)];
}

.voxel-badge--variant-error {
  @apply bg-[var(--color-error-base)] text-[var(--color-text-inverse)];
}

/* Dot */
.voxel-badge__dot {
  @apply size-1.5 rounded-full;
}

.voxel-badge__dot--variant-default {
  @apply bg-[var(--color-text-on-primary)];
}

.voxel-badge__dot--variant-outline {
  @apply bg-[var(--color-primary-base)];
}

.voxel-badge__dot--variant-subtle {
  @apply bg-[var(--color-primary-darken-1)];
}

.voxel-badge__dot--variant-info {
  @apply bg-[var(--color-text-inverse)];
}

.voxel-badge__dot--variant-success {
  @apply bg-[var(--color-text-inverse)];
}

.voxel-badge__dot--variant-warning {
  @apply bg-[var(--color-text-primary)];
}

.voxel-badge__dot--variant-error {
  @apply bg-[var(--color-text-inverse)];
}
</style>
