<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { IconProps } from './Icon.types'

const props = withDefaults(defineProps<IconProps>(), {
  size: 'default',
})

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const classes = computed(() => [
  'voxel-icon',
  `voxel-icon--size-${props.size}`,
])
</script>

<template>
  <!-- SSR and before mount: render placeholder with correct size -->
  <span v-if="!mounted" :class="classes" aria-hidden="true" />
  <!-- Client-side: render actual icon -->
  <component v-else :is="props.icon" :class="classes" aria-hidden="true" />
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
