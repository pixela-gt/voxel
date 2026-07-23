<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { IconButtonProps } from './IconButton.types'
import { Icon } from '../Icon'

const props = withDefaults(defineProps<IconButtonProps>(), {
  style: 'default',
  color: 'primary',
  size: 'default',
  density: 'default',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const slots = useSlots()

const iconButtonClasses = computed(() => [
  'voxel-icon-button',
  `voxel-icon-button--size-${props.size}`,
  `voxel-icon-button--density-${props.density}`,
  `voxel-icon-button--style-${props.style}`,
  `voxel-icon-button--color-${props.color}`,
  props.class,
])

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="iconButtonClasses"
    :disabled="props.disabled || props.loading"
    :aria-label="props['aria-label']"
    @click="handleClick"
  >
    <span v-if="props.loading" class="voxel-icon-button__spinner" aria-hidden="true">
      <svg
        class="voxel-icon-button__spinner-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
    <span v-else-if="props.icon || slots.default" class="voxel-icon-button__icon" aria-hidden="true">
      <slot>
        <Icon :icon="props.icon!" :size="props.size" />
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
.voxel-icon-button--color-primary.voxel-icon-button--style-outline {
  @apply border border-[var(--color-primary-base)] bg-transparent text-[var(--color-primary-base)];
}
.voxel-icon-button--color-secondary.voxel-icon-button--style-outline {
  @apply border border-[var(--color-secondary-base)] bg-transparent text-[var(--color-secondary-base)];
}
.voxel-icon-button--color-primary.voxel-icon-button--style-tonal {
  @apply bg-[var(--color-primary-lighten-1)] text-[var(--color-primary-base)];
}
.voxel-icon-button--color-secondary.voxel-icon-button--style-tonal {
  @apply bg-[var(--color-secondary-lighten-1)] text-[var(--color-secondary-base)];
}
.voxel-icon-button--color-primary.voxel-icon-button--style-text {
  @apply text-[var(--color-primary-base)] bg-transparent;
}
.voxel-icon-button--color-secondary.voxel-icon-button--style-text {
  @apply text-[var(--color-secondary-base)] bg-transparent;
}

/* Elements */
.voxel-icon-button__spinner {
  @apply animate-spin;
}
.voxel-icon-button__spinner-icon {
  @apply size-4;
}
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
