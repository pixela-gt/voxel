<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import type { ButtonProps } from './Button.types'
import type { ButtonGroupContext } from '../ButtonGroup/ButtonGroup.types'
import { BUTTON_GROUP_KEY } from '../ButtonGroup/ButtonGroup.types'
import { Icon } from '../Icon'
import { Loading } from '../Loading'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: undefined,
  color: undefined,
  size: undefined,
  density: undefined,
  loading: false,
  disabled: false,
} as const)

const slots = useSlots()

const groupContext = inject<ButtonGroupContext | null>(BUTTON_GROUP_KEY, null)

const effectiveVariant = computed(() => props.variant ?? groupContext?.variant ?? 'default')
const effectiveColor = computed(() => props.color ?? groupContext?.color ?? 'primary')
const effectiveSize = computed(() => props.size ?? groupContext?.size ?? 'default')
const effectiveDensity = computed(() => props.density ?? groupContext?.density ?? 'default')
const effectiveDisabled = computed(() => props.disabled || (groupContext?.disabled ?? false))

const classes = computed(() => [
  'voxel-button',
  `voxel-button--size-${effectiveSize.value}`,
  `voxel-button--density-${effectiveDensity.value}`,
  `voxel-button--color-${effectiveColor.value}`,
  `voxel-button--style-${effectiveVariant.value}`,
  { 'voxel-button--loading': props.loading },
  props.class,
])
</script>

<template>
  <button
    :class="classes"
    :disabled="effectiveDisabled || props.loading"
    v-bind="$attrs"
  >
    <Loading v-if="props.loading" :size="effectiveSize" />
    <span
      v-else-if="props.prependIcon || slots['prepend-icon']"
      class="voxel-button__icon"
      aria-hidden="true"
    >
      <slot name="prepend-icon">
        <Icon :icon="props.prependIcon!" :size="effectiveSize" />
      </slot>
    </span>
    <slot />
    <span
      v-if="(props.appendIcon || slots['append-icon']) && !props.loading"
      class="voxel-button__icon"
      aria-hidden="true"
    >
      <slot name="append-icon">
        <Icon :icon="props.appendIcon!" :size="effectiveSize" />
      </slot>
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

.voxel-button--color-success {
  @apply bg-[var(--color-success-base)] text-[var(--color-text-on-success)];
}

.voxel-button--color-info {
  @apply bg-[var(--color-info-base)] text-[var(--color-text-on-info)];
}

.voxel-button--color-error {
  @apply bg-[var(--color-error-base)] text-[var(--color-text-on-error)];
}

.voxel-button--color-warning {
  @apply bg-[var(--color-warning-base)] text-[var(--color-text-on-warning)];
}

.voxel-button--color-neutral {
  @apply bg-[var(--color-neutral-base)] text-[var(--color-text-on-neutral)];
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
.voxel-button--style-outline.voxel-button--color-success {
  @apply border-[var(--color-success-base)] text-[var(--color-success-base)];
}
.voxel-button--style-outline.voxel-button--color-info {
  @apply border-[var(--color-info-base)] text-[var(--color-info-base)];
}
.voxel-button--style-outline.voxel-button--color-error {
  @apply border-[var(--color-error-base)] text-[var(--color-error-base)];
}
.voxel-button--style-outline.voxel-button--color-warning {
  @apply border-[var(--color-warning-base)] text-[var(--color-warning-base)];
}
.voxel-button--style-outline.voxel-button--color-neutral {
  @apply border-[var(--color-neutral-base)] text-[var(--color-neutral-base)];
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
.voxel-button--style-tonal.voxel-button--color-success {
  @apply bg-[var(--color-success-lighten-1)]/12 text-[var(--color-success-base)];
}
.voxel-button--style-tonal.voxel-button--color-info {
  @apply bg-[var(--color-info-lighten-1)]/12 text-[var(--color-info-base)];
}
.voxel-button--style-tonal.voxel-button--color-error {
  @apply bg-[var(--color-error-lighten-1)]/12 text-[var(--color-error-base)];
}
.voxel-button--style-tonal.voxel-button--color-warning {
  @apply bg-[var(--color-warning-lighten-1)]/12 text-[var(--color-warning-base)];
}
.voxel-button--style-tonal.voxel-button--color-neutral {
  @apply bg-[var(--color-neutral-lighten-1)]/12 text-[var(--color-neutral-base)];
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
.voxel-button--style-text.voxel-button--color-success {
  @apply text-[var(--color-success-base)];
}
.voxel-button--style-text.voxel-button--color-info {
  @apply text-[var(--color-info-base)];
}
.voxel-button--style-text.voxel-button--color-error {
  @apply text-[var(--color-error-base)];
}
.voxel-button--style-text.voxel-button--color-warning {
  @apply text-[var(--color-warning-base)];
}
.voxel-button--style-text.voxel-button--color-neutral {
  @apply text-[var(--color-neutral-base)];
}
/* Icon sizing per button size */
.voxel-button--size-small .voxel-button__icon {
  @apply size-4;
}
.voxel-button--size-default .voxel-button__icon {
  @apply size-5;
}
.voxel-button--size-large .voxel-button__icon {
  @apply size-6;
}
</style>

