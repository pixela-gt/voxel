<script setup lang="ts">
import { computed } from 'vue'
import { Avatar } from '../Avatar'
import { VisuallyHidden } from '../VisuallyHidden'
import type { AvatarGroupProps } from './AvatarGroup.types'

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  max: 5,
  size: 'default',
} as const)

const visibleItems = computed(() => props.items.slice(0, props.max))
const overflowCount = computed(() => Math.max(0, props.items.length - props.max))
const hasOverflow = computed(() => overflowCount.value > 0)

const rootClass = computed(() => ['voxel-avatar-group', props.class])

const sizeClass = computed(() => `voxel-avatar-group--size-${props.size}`)
</script>

<template>
  <div :class="[rootClass, sizeClass]" role="group" v-bind="$attrs">
    <Avatar
      v-for="(item, idx) in visibleItems"
      :key="idx"
      v-bind="item"
      :size="item.size ?? props.size"
      class="voxel-avatar-group__avatar"
    />
    <span v-if="hasOverflow" class="voxel-avatar-group__overflow" aria-hidden="true">
      +{{ overflowCount }}
      <VisuallyHidden>{{ overflowCount }} more users</VisuallyHidden>
    </span>
  </div>
</template>

<style scoped>
.voxel-avatar-group {
  @apply inline-flex items-center;
}

.voxel-avatar-group__avatar {
  @apply border-2 border-[var(--color-surface-background)];
}

.voxel-avatar-group__avatar:not(:first-child) {
  @apply -ml-2;
}

.voxel-avatar-group--size-small .voxel-avatar-group__avatar:not(:first-child) {
  @apply -ml-1.5;
}

.voxel-avatar-group--size-large .voxel-avatar-group__avatar:not(:first-child) {
  @apply -ml-2.5;
}

.voxel-avatar-group__overflow {
  @apply inline-flex items-center justify-center
    font-sans font-medium
    bg-[var(--color-grey-200)] text-[var(--color-text-secondary)]
    rounded-full border-2 border-[var(--color-surface-background)]
    -ml-2;
}

.voxel-avatar-group--size-small .voxel-avatar-group__overflow {
  @apply size-6 text-[9px] -ml-1.5;
}

.voxel-avatar-group--size-default .voxel-avatar-group__overflow {
  @apply size-8 text-[11px];
}

.voxel-avatar-group--size-large .voxel-avatar-group__overflow {
  @apply size-10 text-sm -ml-2.5;
}
</style>
