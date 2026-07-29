<script setup lang="ts">
import type { PageHeaderProps } from './PageHeader.types'

const props = withDefaults(defineProps<PageHeaderProps>(), {} as const)
</script>

<template>
  <div :class="['voxel-page-header', props.class]" v-bind="$attrs">
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
  @apply flex items-start justify-between gap-4 py-4;
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
