<script setup lang="ts">
import { computed } from 'vue'
import { SplitterResizeHandle, injectSplitterGroupContext } from 'reka-ui'
import type { SplitterResizeHandleProps } from './Splitter.types'

const props = defineProps<SplitterResizeHandleProps>()

const groupContext = injectSplitterGroupContext()
const direction = computed(() => groupContext?.direction.value ?? 'horizontal')

const rootClass = computed(() => [
  'voxel-splitter-handle',
  `voxel-splitter-handle--${direction.value}`,
  props.class,
])
</script>

<template>
  <SplitterResizeHandle
    :disabled="props.disabled"
    :class="rootClass"
    v-bind="$attrs"
  >
    <span class="voxel-splitter-handle__grip" aria-hidden="true" />
  </SplitterResizeHandle>
</template>

<style scoped>
.voxel-splitter-handle {
  @apply relative flex items-center justify-center
    bg-[var(--color-grey-100)]
    hover:bg-[var(--color-primary-lighten-1)]/20
    transition-colors
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    data-[resize-handle-state='hover']:bg-[var(--color-primary-lighten-1)]/20
    data-[resize-handle-state='drag']:bg-[var(--color-primary-lighten-1)]/20;
}

.voxel-splitter-handle--horizontal {
  @apply w-1 h-full cursor-col-resize;
}

.voxel-splitter-handle--vertical {
  @apply w-full h-1 cursor-row-resize;
}

.voxel-splitter-handle__grip {
  @apply absolute rounded-full bg-[var(--color-grey-400)];
}

.voxel-splitter-handle--horizontal .voxel-splitter-handle__grip {
  @apply w-1 h-8;
}

.voxel-splitter-handle--vertical .voxel-splitter-handle__grip {
  @apply h-1 w-8;
}
</style>
