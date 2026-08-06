<script setup lang="ts">
import { computed, provide } from 'vue'
import { ToolbarRoot } from 'reka-ui'
import type { ToolbarContext, ToolbarProps } from './Toolbar.types'
import { TOOLBAR_KEY } from './Toolbar.types'

const props = withDefaults(defineProps<ToolbarProps>(), {
  orientation: 'horizontal',
} as const)

provide<ToolbarContext>(TOOLBAR_KEY, {
  orientation: props.orientation,
})

const rootClass = computed(() => [
  'voxel-toolbar',
  `voxel-toolbar--${props.orientation}`,
  props.class,
])
</script>

<template>
  <ToolbarRoot
    :orientation="props.orientation"
    :class="rootClass"
    v-bind="$attrs"
  >
    <slot />
  </ToolbarRoot>
</template>

<style scoped>
.voxel-toolbar {
  @apply inline-flex items-center gap-1;
}

.voxel-toolbar--vertical {
  @apply flex-col items-stretch;
}
</style>
