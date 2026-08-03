<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import type { IconButtonProps } from './IconButton.types'
import type { ButtonGroupContext } from '../ButtonGroup/ButtonGroup.types'
import { BUTTON_GROUP_KEY } from '../ButtonGroup/ButtonGroup.types'
import { Icon } from '../Icon'
import { Loading } from '../Loading'

const props = withDefaults(defineProps<IconButtonProps>(), {
  variant: undefined,
  color: undefined,
  size: undefined,
  density: undefined,
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const slots = useSlots()

const groupContext = inject<ButtonGroupContext | null>(BUTTON_GROUP_KEY, null)

const effectiveVariant = computed(() => props.variant ?? groupContext?.variant ?? 'default')
const effectiveColor = computed(() => props.color ?? groupContext?.color ?? 'primary')
const effectiveSize = computed(() => props.size ?? groupContext?.size ?? 'default')
const effectiveDensity = computed(() => props.density ?? groupContext?.density ?? 'default')
const effectiveDisabled = computed(() => props.disabled || (groupContext?.disabled ?? false))

const iconButtonClasses = computed(() => [
  'voxel-icon-button',
  `voxel-icon-button--size-${effectiveSize.value}`,
  `voxel-icon-button--density-${effectiveDensity.value}`,
  `voxel-icon-button--style-${effectiveVariant.value}`,
  `voxel-icon-button--color-${effectiveColor.value}`,
  props.class,
])

function handleClick(event: MouseEvent) {
  if (!effectiveDisabled.value && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="iconButtonClasses"
    :disabled="effectiveDisabled || props.loading"
    :aria-label="props['aria-label']"
    @click="handleClick"
  >
    <Loading v-if="props.loading" size="small" />
    <span v-else-if="props.icon || slots.default" class="voxel-icon-button__icon" aria-hidden="true">
      <slot>
        <Icon :icon="props.icon!" :size="effectiveSize" />
      </slot>
    </span>
  </button>
</template>

<style scoped>
.voxel-icon-button {
  @apply inline-flex items-center justify-center flex-shrink-0 font-sans
    transition-colors duration-[var(--transition-fast)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed;
  corner-smoothing: 60%;
}

/* Sizes */
.voxel-icon-button--size-small.voxel-icon-button--density-default {
  @apply size-9 rounded-[18px];
}
.voxel-icon-button--size-small.voxel-icon-button--density-dense {
  @apply size-8 rounded-[16px];
}
.voxel-icon-button--size-default.voxel-icon-button--density-default {
  @apply size-10 rounded-[20px];
}
.voxel-icon-button--size-default.voxel-icon-button--density-dense {
  @apply size-8 rounded-[16px];
}
.voxel-icon-button--size-large.voxel-icon-button--density-default {
  @apply size-11 rounded-[22px];
}
.voxel-icon-button--size-large.voxel-icon-button--density-dense {
  @apply size-9 rounded-[18px];
}

/* Variants */
.voxel-icon-button--color-primary.voxel-icon-button--style-default {
  @apply bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)];
}
.voxel-icon-button--color-secondary.voxel-icon-button--style-default {
  @apply bg-[var(--color-secondary-base)] text-[var(--color-text-on-secondary)];
}
.voxel-icon-button--color-success.voxel-icon-button--style-default {
  @apply bg-[var(--color-success-base)] text-[var(--color-text-on-success)];
}
.voxel-icon-button--color-info.voxel-icon-button--style-default {
  @apply bg-[var(--color-info-base)] text-[var(--color-text-on-info)];
}
.voxel-icon-button--color-error.voxel-icon-button--style-default {
  @apply bg-[var(--color-error-base)] text-[var(--color-text-on-error)];
}
.voxel-icon-button--color-warning.voxel-icon-button--style-default {
  @apply bg-[var(--color-warning-base)] text-[var(--color-text-on-warning)];
}
.voxel-icon-button--color-neutral.voxel-icon-button--style-default {
  @apply bg-[var(--color-neutral-base)] text-[var(--color-text-on-neutral)];
}
.voxel-icon-button--color-primary.voxel-icon-button--style-outline {
  @apply border border-[var(--color-primary-base)] bg-transparent text-[var(--color-primary-base)];
}
.voxel-icon-button--color-secondary.voxel-icon-button--style-outline {
  @apply border border-[var(--color-secondary-base)] bg-transparent text-[var(--color-secondary-base)];
}
.voxel-icon-button--color-success.voxel-icon-button--style-outline {
  @apply border border-[var(--color-success-base)] bg-transparent text-[var(--color-success-base)];
}
.voxel-icon-button--color-info.voxel-icon-button--style-outline {
  @apply border border-[var(--color-info-base)] bg-transparent text-[var(--color-info-base)];
}
.voxel-icon-button--color-error.voxel-icon-button--style-outline {
  @apply border border-[var(--color-error-base)] bg-transparent text-[var(--color-error-base)];
}
.voxel-icon-button--color-warning.voxel-icon-button--style-outline {
  @apply border border-[var(--color-warning-base)] bg-transparent text-[var(--color-warning-base)];
}
.voxel-icon-button--color-neutral.voxel-icon-button--style-outline {
  @apply border border-[var(--color-neutral-base)] bg-transparent text-[var(--color-neutral-base)];
}
.voxel-icon-button--color-primary.voxel-icon-button--style-tonal {
  @apply bg-[var(--color-primary-lighten-1)]/12 text-[var(--color-primary-base)];
}
.voxel-icon-button--color-secondary.voxel-icon-button--style-tonal {
  @apply bg-[var(--color-secondary-lighten-1)]/12 text-[var(--color-secondary-base)];
}
.voxel-icon-button--color-success.voxel-icon-button--style-tonal {
  @apply bg-[var(--color-success-lighten-1)]/12 text-[var(--color-success-base)];
}
.voxel-icon-button--color-info.voxel-icon-button--style-tonal {
  @apply bg-[var(--color-info-lighten-1)]/12 text-[var(--color-info-base)];
}
.voxel-icon-button--color-error.voxel-icon-button--style-tonal {
  @apply bg-[var(--color-error-lighten-1)]/12 text-[var(--color-error-base)];
}
.voxel-icon-button--color-warning.voxel-icon-button--style-tonal {
  @apply bg-[var(--color-warning-lighten-1)]/12 text-[var(--color-warning-base)];
}
.voxel-icon-button--color-neutral.voxel-icon-button--style-tonal {
  @apply bg-[var(--color-neutral-lighten-1)]/12 text-[var(--color-neutral-base)];
}
.voxel-icon-button--color-primary.voxel-icon-button--style-text {
  @apply text-[var(--color-primary-base)] bg-transparent;
}
.voxel-icon-button--color-secondary.voxel-icon-button--style-text {
  @apply text-[var(--color-secondary-base)] bg-transparent;
}
.voxel-icon-button--color-success.voxel-icon-button--style-text {
  @apply text-[var(--color-success-base)] bg-transparent;
}
.voxel-icon-button--color-info.voxel-icon-button--style-text {
  @apply text-[var(--color-info-base)] bg-transparent;
}
.voxel-icon-button--color-error.voxel-icon-button--style-text {
  @apply text-[var(--color-error-base)] bg-transparent;
}
.voxel-icon-button--color-warning.voxel-icon-button--style-text {
  @apply text-[var(--color-warning-base)] bg-transparent;
}
.voxel-icon-button--color-neutral.voxel-icon-button--style-text {
  @apply text-[var(--color-neutral-base)] bg-transparent;
}

/* Elements */
.voxel-icon-button__icon {
  @apply inline-flex items-center justify-center;
}
.voxel-icon-button--size-small .voxel-icon-button__icon {
  @apply size-4;
}
.voxel-icon-button--size-default .voxel-icon-button__icon {
  @apply size-5;
}
.voxel-icon-button--size-large .voxel-icon-button__icon {
  @apply size-6;
}
</style>
