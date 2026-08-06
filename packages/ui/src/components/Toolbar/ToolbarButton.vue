<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { ToolbarButton as RekaToolbarButton } from 'reka-ui'
import type { ToolbarButtonProps } from './Toolbar.types'
import { Icon } from '../Icon'

const props = withDefaults(defineProps<ToolbarButtonProps>(), {
  variant: undefined,
  color: undefined,
  size: undefined,
  density: undefined,
  disabled: false,
} as const)

const slots = useSlots()

const effectiveSize = computed(() => props.size ?? 'default')
const effectiveVariant = computed(() => props.variant ?? 'default')
const effectiveColor = computed(() => props.color ?? 'primary')
const effectiveDensity = computed(() => props.density ?? 'default')

const classes = computed(() => [
  'voxel-toolbar-button',
  `voxel-toolbar-button--size-${effectiveSize.value}`,
  `voxel-toolbar-button--density-${effectiveDensity.value}`,
  `voxel-toolbar-button--color-${effectiveColor.value}`,
  `voxel-toolbar-button--style-${effectiveVariant.value}`,
  props.class,
])
</script>

<template>
  <RekaToolbarButton
    :disabled="props.disabled"
    :class="classes"
    v-bind="$attrs"
  >
    <span
      v-if="props.prependIcon || slots['prepend-icon']"
      class="voxel-toolbar-button__icon"
      aria-hidden="true"
    >
      <slot name="prepend-icon">
        <Icon :icon="props.prependIcon!" :size="effectiveSize" />
      </slot>
    </span>
    <slot />
    <span
      v-if="props.appendIcon || slots['append-icon']"
      class="voxel-toolbar-button__icon"
      aria-hidden="true"
    >
      <slot name="append-icon">
        <Icon :icon="props.appendIcon!" :size="effectiveSize" />
      </slot>
    </span>
  </RekaToolbarButton>
</template>

<style scoped>
.voxel-toolbar-button {
  @apply inline-flex items-center justify-center whitespace-nowrap font-sans antialiased
    cursor-pointer transition-colors duration-[var(--transition-fast)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed active:opacity-[0.85];
  corner-smoothing: 60%;
}

/* Sizes */
.voxel-toolbar-button--size-small {
  @apply text-xs font-bold tracking-[0.06px] gap-[6px] px-[24px] py-[10px] rounded-[12px];
}
.voxel-toolbar-button--size-small.voxel-toolbar-button--density-dense {
  @apply py-[8px] rounded-[12px];
}
.voxel-toolbar-button--size-default {
  @apply text-sm font-bold tracking-[0.07px] gap-[6px] px-[24px] py-[12px] rounded-[12px];
}
.voxel-toolbar-button--size-default.voxel-toolbar-button--density-dense {
  @apply py-[8px];
}
.voxel-toolbar-button--size-large {
  @apply text-base font-bold tracking-[0.08px] gap-[8px] px-[28px] py-[14px] rounded-[12px];
}
.voxel-toolbar-button--size-large.voxel-toolbar-button--density-dense {
  @apply px-[24px] py-[10px];
}

/* Colors */
.voxel-toolbar-button--color-primary {
  @apply bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)];
}
.voxel-toolbar-button--color-secondary {
  @apply bg-[var(--color-secondary-base)] text-[var(--color-text-on-secondary)];
}
.voxel-toolbar-button--color-success {
  @apply bg-[var(--color-success-base)] text-[var(--color-text-on-success)];
}
.voxel-toolbar-button--color-info {
  @apply bg-[var(--color-info-base)] text-[var(--color-text-on-info)];
}
.voxel-toolbar-button--color-error {
  @apply bg-[var(--color-error-base)] text-[var(--color-text-on-error)];
}
.voxel-toolbar-button--color-warning {
  @apply bg-[var(--color-warning-base)] text-[var(--color-text-on-warning)];
}
.voxel-toolbar-button--color-neutral {
  @apply bg-[var(--color-neutral-base)] text-[var(--color-text-on-neutral)];
}

/* Styles */
.voxel-toolbar-button--style-outline {
  @apply border bg-transparent;
}
.voxel-toolbar-button--style-outline.voxel-toolbar-button--color-primary {
  @apply border-[var(--color-primary-base)] text-[var(--color-primary-base)];
}
.voxel-toolbar-button--style-outline.voxel-toolbar-button--color-secondary {
  @apply border-[var(--color-secondary-base)] text-[var(--color-secondary-base)];
}
.voxel-toolbar-button--style-outline.voxel-toolbar-button--color-success {
  @apply border-[var(--color-success-base)] text-[var(--color-success-base)];
}
.voxel-toolbar-button--style-outline.voxel-toolbar-button--color-info {
  @apply border-[var(--color-info-base)] text-[var(--color-info-base)];
}
.voxel-toolbar-button--style-outline.voxel-toolbar-button--color-error {
  @apply border-[var(--color-error-base)] text-[var(--color-error-base)];
}
.voxel-toolbar-button--style-outline.voxel-toolbar-button--color-warning {
  @apply border-[var(--color-warning-base)] text-[var(--color-warning-base)];
}
.voxel-toolbar-button--style-outline.voxel-toolbar-button--color-neutral {
  @apply border-[var(--color-neutral-base)] text-[var(--color-neutral-base)];
}
.voxel-toolbar-button--style-tonal {
  @apply bg-[var(--color-primary-lighten-1)]/12;
}
.voxel-toolbar-button--style-tonal.voxel-toolbar-button--color-primary {
  @apply text-[var(--color-primary-base)];
}
.voxel-toolbar-button--style-tonal.voxel-toolbar-button--color-secondary {
  @apply bg-[var(--color-secondary-lighten-1)]/12 text-[var(--color-secondary-base)];
}
.voxel-toolbar-button--style-tonal.voxel-toolbar-button--color-success {
  @apply bg-[var(--color-success-lighten-1)]/12 text-[var(--color-success-base)];
}
.voxel-toolbar-button--style-tonal.voxel-toolbar-button--color-info {
  @apply bg-[var(--color-info-lighten-1)]/12 text-[var(--color-info-base)];
}
.voxel-toolbar-button--style-tonal.voxel-toolbar-button--color-error {
  @apply bg-[var(--color-error-lighten-1)]/12 text-[var(--color-error-base)];
}
.voxel-toolbar-button--style-tonal.voxel-toolbar-button--color-warning {
  @apply bg-[var(--color-warning-lighten-1)]/12 text-[var(--color-warning-base)];
}
.voxel-toolbar-button--style-tonal.voxel-toolbar-button--color-neutral {
  @apply bg-[var(--color-neutral-lighten-1)]/12 text-[var(--color-neutral-base)];
}
.voxel-toolbar-button--style-text {
  @apply bg-transparent;
}
.voxel-toolbar-button--style-text.voxel-toolbar-button--color-primary {
  @apply text-[var(--color-primary-base)];
}
.voxel-toolbar-button--style-text.voxel-toolbar-button--color-secondary {
  @apply text-[var(--color-secondary-base)];
}
.voxel-toolbar-button--style-text.voxel-toolbar-button--color-success {
  @apply text-[var(--color-success-base)];
}
.voxel-toolbar-button--style-text.voxel-toolbar-button--color-info {
  @apply text-[var(--color-info-base)];
}
.voxel-toolbar-button--style-text.voxel-toolbar-button--color-error {
  @apply text-[var(--color-error-base)];
}
.voxel-toolbar-button--style-text.voxel-toolbar-button--color-warning {
  @apply text-[var(--color-warning-base)];
}
.voxel-toolbar-button--style-text.voxel-toolbar-button--color-neutral {
  @apply text-[var(--color-neutral-base)];
}

/* Icon sizing */
.voxel-toolbar-button--size-small .voxel-toolbar-button__icon {
  @apply size-4;
}
.voxel-toolbar-button--size-default .voxel-toolbar-button__icon {
  @apply size-5;
}
.voxel-toolbar-button--size-large .voxel-toolbar-button__icon {
  @apply size-6;
}
</style>
