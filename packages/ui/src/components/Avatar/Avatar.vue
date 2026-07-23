<script setup lang="ts">
import { AvatarRoot, AvatarImage, AvatarFallback } from 'reka-ui'
import type { AvatarProps } from './Avatar.types'

const props = withDefaults(defineProps<AvatarProps>(), {
  style: 'default',
} as const)
</script>

<template>
  <AvatarRoot :class="['voxel-avatar', `voxel-avatar--style-${props.style}`, props.class]">
    <AvatarImage v-if="props.src" :src="props.src" :alt="props.alt" class="voxel-avatar__image" />
    <AvatarFallback class="voxel-avatar__fallback">
      <slot>
        <svg
          class="voxel-avatar__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      </slot>
    </AvatarFallback>
    <div v-if="props.style === 'main'" class="voxel-avatar__shadow voxel-avatar__shadow--1" />
    <div v-if="props.style === 'main'" class="voxel-avatar__shadow voxel-avatar__shadow--2" />
  </AvatarRoot>
</template>

<style scoped>
.voxel-avatar {
  @apply relative size-8 rounded-[8px] overflow-hidden bg-[var(--color-grey-950)];
}

.voxel-avatar--style-main {
  /* main variant has shadow layers */
}

.voxel-avatar__image {
  @apply absolute inset-0 size-full object-cover;
}

.voxel-avatar__fallback {
  @apply flex items-center justify-center size-full;
}

.voxel-avatar__icon {
  @apply size-4 text-white;
}

.voxel-avatar__shadow {
  @apply absolute size-8 bg-[var(--color-grey-600)];
}
.voxel-avatar__shadow--1 {
  @apply -left-[1px] -top-[4px] rounded-[6px];
}
.voxel-avatar__shadow--2 {
  @apply -left-0 -top-[1px] rounded-[8px];
}
</style>
