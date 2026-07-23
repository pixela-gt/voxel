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
      `voxel-badge--${props.size}`,
      `voxel-badge--${props.variant}`,
    ]"
    v-bind="$attrs"
  >
    <span
      v-if="props.dot"
      :class="['voxel-badge__dot', `voxel-badge__dot--${props.variant}`]"
      aria-hidden="true"
    />
    <slot />
  </span>
</template>

<style scoped>
@reference "../../style.css"
.voxel-badge {
  @apply inline-flex items-center gap-1 font-sans font-medium whitespace-nowrap rounded-full;
}

/* Sizes */
.voxel-badge--small {
  @apply px-2 py-0.5 text-[11px] leading-[16px] tracking-[0.2px] gap-1;
}

.voxel-badge--default-size {
  @apply px-2.5 py-1 text-xs leading-[20px] tracking-[0.07px] gap-1.5;
}

.voxel-badge--large {
  @apply px-3 py-1.5 text-sm leading-[24px] tracking-[0.08px] gap-2;
}

/* Variants */
.voxel-badge--default {
  @apply bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)];
}

.voxel-badge--outline {
  @apply border border-[var(--color-primary-base)] text-[var(--color-primary-base)] bg-transparent;
}

.voxel-badge--subtle {
  @apply bg-[var(--color-primary-lighten-1)] text-[var(--color-primary-darken-1)];
}

.voxel-badge--info {
  @apply bg-[var(--color-info-base)] text-[var(--color-text-inverse)];
}

.voxel-badge--success {
  @apply bg-[var(--color-success-base)] text-[var(--color-text-inverse)];
}

.voxel-badge--warning {
  @apply bg-[var(--color-warning-base)] text-[var(--color-text-primary)];
}

.voxel-badge--error {
  @apply bg-[var(--color-error-base)] text-[var(--color-text-inverse)];
}

/* Dot */
.voxel-badge__dot {
  @apply size-1.5 rounded-full;
}

.voxel-badge__dot--default {
  @apply bg-[var(--color-text-on-primary)];
}

.voxel-badge__dot--outline {
  @apply bg-[var(--color-primary-base)];
}

.voxel-badge__dot--subtle {
  @apply bg-[var(--color-primary-darken-1)];
}

.voxel-badge__dot--info {
  @apply bg-[var(--color-text-inverse)];
}

.voxel-badge__dot--success {
  @apply bg-[var(--color-text-inverse)];
}

.voxel-badge__dot--warning {
  @apply bg-[var(--color-text-primary)];
}

.voxel-badge__dot--error {
  @apply bg-[var(--color-text-inverse)];
}
</style>