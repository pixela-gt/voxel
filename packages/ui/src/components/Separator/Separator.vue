<script setup lang="ts">
import { Separator } from 'reka-ui'
import type { SeparatorProps } from './Separator.types'

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: true,
} as const)
</script>

<template>
  <Separator
    :orientation="props.orientation"
    :decorative="props.decorative"
    :class="['voxel-separator', `voxel-separator--${props.orientation}`]"
    v-bind="$attrs"
  />
</template>

<style scoped>
.voxel-separator {
  @apply bg-[var(--color-grey-400)] shrink-0;
}

.voxel-separator--horizontal {
  @apply h-px w-full;
}

.voxel-separator--vertical {
  @apply w-px h-full;
}
</style>