<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { IconButtonProps } from './IconButton.types'
import { Icon } from '../Icon'
import { Loading } from '../Loading'

const props = withDefaults(defineProps<IconButtonProps>(), {
  variant: 'default',
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
  `voxel-icon-button--style-${props.variant}`,
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
    <Loading v-if="props.loading" size="small" />
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
  @apply bg-[var(--color-primary-lighten-1)]/12 text-[var(--color-primary-base)];
}
.voxel-icon-button--color-secondary.voxel-icon-button--style-tonal {
  @apply bg-[var(--color-secondary-lighten-1)]/12 text-[var(--color-secondary-base)];
}
.voxel-icon-button--color-primary.voxel-icon-button--style-text {
  @apply text-[var(--color-primary-base)] bg-transparent;
}
.voxel-icon-button--color-secondary.voxel-icon-button--style-text {
  @apply text-[var(--color-secondary-base)] bg-transparent;
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
