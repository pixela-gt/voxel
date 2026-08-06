<script setup lang="ts">
import { computed, inject } from 'vue'
import { ToolbarSeparator as RekaToolbarSeparator } from 'reka-ui'
import type { ToolbarSeparatorProps, ToolbarContext } from './Toolbar.types'
import { TOOLBAR_KEY } from './Toolbar.types'

const props = withDefaults(defineProps<ToolbarSeparatorProps>(), {} as const)

const toolbarContext = inject<ToolbarContext | null>(TOOLBAR_KEY, null)

// Flip orientation: horizontal toolbar → vertical separator, vice versa
const separatorOrientation = computed(() =>
  toolbarContext?.orientation === 'vertical' ? 'horizontal' : 'vertical'
)

const separatorClass = computed(() => [
  'voxel-toolbar-separator',
  `voxel-toolbar-separator--${separatorOrientation.value}`,
  props.class,
])
</script>

<template>
  <RekaToolbarSeparator
    :class="separatorClass"
    v-bind="$attrs"
  />
</template>

<style scoped>
.voxel-toolbar-separator {
  @apply bg-[var(--color-grey-400)] shrink-0;
}

.voxel-toolbar-separator--horizontal {
  @apply h-px w-full;
}

.voxel-toolbar-separator--vertical {
  @apply w-px h-full;
}
</style>
