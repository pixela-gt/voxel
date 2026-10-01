<script setup lang="ts">
import { computed } from 'vue'
import type { CenterProps } from './Center.types'

const props = withDefaults(defineProps<CenterProps>(), {
  as: 'div',
  inline: false,
} as const)

const rootClass = computed(() => [
  'voxel-center',
  props.inline && 'voxel-center--inline',
  props.class,
])
</script>

<template>
  <component :is="as" :class="rootClass" v-bind="$attrs">
    <slot />
  </component>
</template>

<style scoped>
.voxel-center {
  @apply flex items-center justify-center w-full;
}

.voxel-center--inline {
  @apply inline-flex w-auto;
}
</style>
