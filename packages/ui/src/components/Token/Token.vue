<script setup lang="ts">
import { computed } from 'vue'
import { X } from '@lucide/vue'
import { Icon } from '../Icon'
import type { TokenProps } from './Token.types'

const props = withDefaults(defineProps<TokenProps>(), {
  variant: 'default',
  disabled: false,
} as const)

const emit = defineEmits<{
  remove: []
}>()

const rootClass = computed(() => [
  'voxel-token',
  `voxel-token--variant-${props.variant}`,
  {
    'voxel-token--disabled': props.disabled,
  },
  props.class,
])
</script>

<template>
  <span :class="rootClass" v-bind="$attrs">
    <Icon v-if="props.icon" :icon="props.icon" size="small" class="voxel-token__icon" />
    <span class="voxel-token__label">{{ props.label }}</span>
    <button
      type="button"
      class="voxel-token__remove"
      :disabled="props.disabled"
      aria-label="Remove token"
      @click="!props.disabled && emit('remove')"
    >
      <Icon :icon="X" size="small" />
    </button>
  </span>
</template>

<style scoped>
.voxel-token {
  @apply inline-flex items-center gap-1
    font-sans font-medium whitespace-nowrap
    rounded-[var(--rounded-md)] border
    text-[var(--color-text-primary)]
    bg-[var(--color-surface-light)]
    border-[var(--color-grey-200)]
    px-2 py-0.5 text-xs;
}

.voxel-token--variant-default {
  @apply bg-[var(--color-surface-light)] border-[var(--color-grey-200)] text-[var(--color-text-primary)];
}

.voxel-token--variant-selected {
  @apply bg-[var(--color-primary-base)] border-[var(--color-primary-base)] text-[var(--color-text-on-primary)];
}

.voxel-token--variant-error {
  @apply bg-[var(--color-error-base)] border-[var(--color-error-base)] text-[var(--color-text-inverse)];
}

.voxel-token--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-token__icon {
  @apply text-[var(--color-text-muted)];
}

.voxel-token--variant-selected .voxel-token__icon {
  @apply text-[var(--color-text-on-primary)];
}

.voxel-token--variant-error .voxel-token__icon {
  @apply text-[var(--color-text-inverse)];
}

.voxel-token__label {
  @apply leading-[16px];
}

.voxel-token__remove {
  @apply inline-flex items-center justify-center
    size-4 rounded-full
    text-[var(--color-text-muted)]
    hover:bg-[var(--color-grey-200)]
    hover:text-[var(--color-text-primary)]
    transition-colors duration-[var(--transition-fast)]
    disabled:cursor-not-allowed;
}

.voxel-token--variant-selected .voxel-token__remove {
  @apply text-[var(--color-text-on-primary)]
    hover:bg-[var(--color-primary-darken-1)];
}

.voxel-token--variant-error .voxel-token__remove {
  @apply text-[var(--color-text-inverse)]
    hover:bg-[var(--color-error-darken-1)] hover:text-[var(--color-text-inverse)];
}
</style>
