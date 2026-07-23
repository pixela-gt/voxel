<script setup lang="ts">
import { computed } from 'vue'
import { SplitterPanel } from 'reka-ui'
import type { SplitterPanelProps } from './Splitter.types'

const props = defineProps<SplitterPanelProps>()

const rootClass = computed(() => ['voxel-splitter-panel', props.class])
</script>

<template>
  <SplitterPanel
    :defaultSize="props.defaultSize"
    :minSize="props.minSize"
    :maxSize="props.maxSize"
    :collapsedSize="props.collapsedSize"
    :collapsible="props.collapsible"
    :order="props.order"
    :class="rootClass"
    v-bind="$attrs"
  >
    <slot />
  </SplitterPanel>
</template>

<style scoped>
.voxel-splitter-panel {
  @apply overflow-auto;
}
</style>
