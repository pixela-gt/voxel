<script setup lang="ts">
import { computed } from 'vue'
import { SplitterGroup } from 'reka-ui'
import type { SplitterGroupProps } from './Splitter.types'

const props = withDefaults(defineProps<SplitterGroupProps>(), {
  keyboardResizeBy: 10,
} as const)

const rootClass = computed(() => [
  'voxel-splitter',
  `voxel-splitter--${props.direction}`,
  props.class,
])
</script>

<template>
  <SplitterGroup
    :direction="props.direction"
    :autoSaveId="props.autoSaveId"
    :keyboardResizeBy="props.keyboardResizeBy"
    :class="rootClass"
    v-bind="$attrs"
  >
    <slot />
  </SplitterGroup>
</template>

<style scoped>
.voxel-splitter {
  @apply flex w-full h-full;
}

.voxel-splitter--vertical {
  @apply flex-col;
}
</style>
