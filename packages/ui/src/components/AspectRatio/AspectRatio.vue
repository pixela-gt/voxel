<script setup lang="ts">
import { computed } from 'vue'
import { AspectRatio } from 'reka-ui'
import type { AspectRatioProps } from './AspectRatio.types'

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: 1,
} as const)

const rootClass = computed(() => ['voxel-aspect-ratio', props.class])
</script>

<template>
  <AspectRatio :ratio="props.ratio" :class="rootClass" v-bind="$attrs">
    <slot />
  </AspectRatio>
</template>

<style scoped>
.voxel-aspect-ratio {
  @apply relative w-full overflow-hidden;
}
</style>
