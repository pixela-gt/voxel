<script setup lang="ts">
import { TabsList as RekaTabsList } from 'reka-ui'
import type { TabsProps } from './Tabs.types'

const props = withDefaults(defineProps<Pick<TabsProps, 'orientation'>>(), {
  orientation: 'horizontal',
})
</script>

<template>
  <RekaTabsList
    :orientation="props.orientation"
    class="voxel-tabs__list"
    :class="{
      'voxel-tabs__list--vertical': props.orientation === 'vertical',
    }"
    v-bind="$attrs"
  >
    <slot />
  </RekaTabsList>
</template>

<style scoped>
.voxel-tabs__list {
  @apply inline-flex items-center bg-[var(--color-grey-100)] rounded-xl p-1;
}

.voxel-tabs__list--vertical {
  @apply flex-col;
}
</style>