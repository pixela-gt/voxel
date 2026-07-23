<script setup lang="ts">
import { computed } from 'vue'
import type { IconProps } from './Icon.types'

const props = withDefaults(defineProps<IconProps>(), {
  size: 'default',
})

const classes = computed(() => [
  'voxel-icon',
  `voxel-icon--size-${props.size}`,
])
</script>

<template>
  <component :is="props.icon" :class="classes" aria-hidden="true" />
</template>

<style scoped>
.voxel-icon--size-small {
  @apply size-4;
}
.voxel-icon--size-default {
  @apply size-5;
}
.voxel-icon--size-large {
  @apply size-6;
}
</style>
