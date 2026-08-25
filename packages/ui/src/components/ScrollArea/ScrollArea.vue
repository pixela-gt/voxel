<script setup lang="ts">
import { computed } from 'vue'
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from 'reka-ui'
import type { ScrollAreaProps } from './ScrollArea.types'

const props = withDefaults(defineProps<ScrollAreaProps>(), {
  type: 'hover',
  scrollHideDelay: 600,
} as const)

const rootClass = computed(() => ['voxel-scroll-area', props.class])
</script>

<template>
  <ScrollAreaRoot
    :type="props.type"
    :scrollHideDelay="props.scrollHideDelay"
    :class="rootClass"
    v-bind="$attrs"
  >
    <ScrollAreaViewport class="voxel-scroll-area__viewport">
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="vertical" class="voxel-scroll-area__scrollbar voxel-scroll-area__scrollbar--vertical">
      <ScrollAreaThumb class="voxel-scroll-area__thumb" />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar orientation="horizontal" class="voxel-scroll-area__scrollbar voxel-scroll-area__scrollbar--horizontal">
      <ScrollAreaThumb class="voxel-scroll-area__thumb" />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner class="voxel-scroll-area__corner" />
  </ScrollAreaRoot>
</template>

<style scoped>
.voxel-scroll-area {
  @apply relative w-full h-full overflow-hidden;
}

/* reka's ScrollAreaViewport renders a multi-root fragment (content div +
   injected <style>), so parent scoped attrs never land on its elements —
   plain scoped selectors silently miss and e.g. height:100% never applies,
   leaving the viewport unconstrained and wheel-scrolling dead.
   Anchor every part rule through :deep() from our single-root Root instead. */
.voxel-scroll-area :deep(.voxel-scroll-area__viewport) {
  @apply w-full h-full rounded-[inherit];
}

.voxel-scroll-area :deep(.voxel-scroll-area__scrollbar) {
  @apply flex select-none touch-none p-0.5
    bg-transparent
    transition-colors;
}

.voxel-scroll-area :deep(.voxel-scroll-area__scrollbar--vertical) {
  @apply w-2 h-full;
}

.voxel-scroll-area :deep(.voxel-scroll-area__scrollbar--horizontal) {
  @apply h-2 flex-col;
}

.voxel-scroll-area :deep(.voxel-scroll-area__thumb) {
  @apply relative flex-1 rounded-full
    bg-[var(--color-grey-400)];
}

.voxel-scroll-area :deep(.voxel-scroll-area__corner) {
  @apply bg-transparent;
}
</style>
