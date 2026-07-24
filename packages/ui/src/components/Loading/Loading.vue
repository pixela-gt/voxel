<script setup lang="ts">
import { computed } from 'vue'
import type { LoadingProps } from './Loading.types'

const props = withDefaults(defineProps<LoadingProps>(), {
  size: 'default',
})

const classes = computed(() => [
  'voxel-loading',
  `voxel-loading--size-${props.size}`,
  props.class,
])
</script>

<template>
  <span :class="classes" role="status" aria-label="Loading">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20" />
    </svg>
  </span>
</template>

<style scoped>
.voxel-loading {
  @apply inline-flex items-center justify-center;
}
.voxel-loading--size-small { @apply size-4; }
.voxel-loading--size-default { @apply size-5; }
.voxel-loading--size-large { @apply size-6; }
.voxel-loading svg {
  @apply size-full animate-spin;
}
</style>
