<script setup lang="ts">
import { computed } from 'vue'
import type { PageHeaderProps } from './PageHeader.types'

const props = withDefaults(defineProps<PageHeaderProps>(), {} as const)

const classes = computed(() => [
  'voxel-page-header',
  `voxel-page-header--${props.variant ?? 'default'}`,
  props.class,
])
</script>

<template>
  <div :class="classes" v-bind="$attrs">
    <div class="voxel-page-header__left">
      <slot name="prepend" />
      <div class="voxel-page-header__text">
        <h1 class="voxel-page-header__title">{{ props.title }}</h1>
        <p v-if="props.description" class="voxel-page-header__description">
          {{ props.description }}
        </p>
      </div>
    </div>
    <div v-if="$slots.actions" class="voxel-page-header__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.voxel-page-header {
  @apply flex items-start justify-between gap-4 py-4 px-2;
}

.voxel-page-header--boxy {
  @apply bg-[var(--color-bg-secondary)] rounded-lg shadow-[var(--shadow-lg)];
}

.voxel-page-header__left {
  @apply flex items-start gap-3;
}

.voxel-page-header__text {
  @apply flex flex-col gap-1;
}

.voxel-page-header__title {
  @apply text-xl font-semibold text-[var(--color-text-primary)] leading-tight;
}

.voxel-page-header__description {
  @apply text-sm text-[var(--color-text-secondary)] leading-relaxed;
}

.voxel-page-header__actions {
  @apply flex items-center gap-2 shrink-0;
}
</style>
