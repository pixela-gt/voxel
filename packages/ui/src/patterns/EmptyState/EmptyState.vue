<script setup lang="ts">
import type { EmptyStateProps } from './EmptyState.types'
import { Icon } from '../../components/Icon'

const props = withDefaults(defineProps<EmptyStateProps>(), {} as const)
</script>

<template>
  <div :class="['voxel-empty-state', props.class]" v-bind="$attrs">
    <div v-if="props.icon || $slots.icon" class="voxel-empty-state__icon">
      <slot name="icon">
        <Icon v-if="props.icon" :icon="props.icon" class="voxel-empty-state__icon-svg" />
      </slot>
    </div>
    <h3 class="voxel-empty-state__title">{{ props.title }}</h3>
    <p v-if="props.description" class="voxel-empty-state__description">
      {{ props.description }}
    </p>
    <div v-if="$slots.default" class="voxel-empty-state__content">
      <slot />
    </div>
    <div v-if="$slots.action" class="voxel-empty-state__action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.voxel-empty-state {
  @apply flex flex-col items-center justify-center py-12 px-6 text-center;
}

.voxel-empty-state__icon {
  @apply mb-4 text-[var(--color-text-muted)];
}

.voxel-empty-state__icon-svg {
  @apply size-10;
}

.voxel-empty-state__title {
  @apply text-lg font-semibold text-[var(--color-text-primary)] mb-1;
}

.voxel-empty-state__description {
  @apply text-sm text-[var(--color-text-secondary)] max-w-sm mb-4;
}

.voxel-empty-state__content {
  @apply mb-4;
}

.voxel-empty-state__action {
  @apply flex items-center gap-2;
}
</style>
