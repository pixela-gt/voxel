<script setup lang="ts">
import { computed } from 'vue'
import type { PageHeaderProps } from './PageHeader.types'
import Text from '@/components/Text/Text.vue'
import { Icon } from '@/components/Icon'

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
        <div class="voxel-page-header__heading">
          <Icon v-if="props.icon" :icon="props.icon" class="voxel-page-header__icon" />
          <Text variant="title-lg" weight="bold" class="voxel-page-header__title">{{ props.title }}</Text>
        </div>
        <Text v-if="props.description" variant="body-sm" class="voxel-page-header__description">
          {{ props.description }}
        </Text>
      </div>
    </div>
    <div v-if="$slots.actions" class="voxel-page-header__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.voxel-page-header {
  @apply flex items-start justify-between gap-4 py-4 px-4;
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

.voxel-page-header__heading {
  @apply flex items-center gap-2;
}

.voxel-page-header__icon {
  @apply size-8 shrink-0 text-[var(--color-text-secondary)];
}

.voxel-page-header__title {
  @apply text-[var(--color-text-primary)] leading-tight;
}

.voxel-page-header__description {
  @apply text-[var(--color-text-secondary)] leading-relaxed;
}

.voxel-page-header__actions {
  @apply flex items-center gap-2 shrink-0;
}
</style>
