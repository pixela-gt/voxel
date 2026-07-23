<script setup lang="ts">
import { TabsContent as RekaTabsContent } from 'reka-ui'

interface TabsContentProps {
  value: string
}

const props = defineProps<TabsContentProps>()
</script>

<template>
  <RekaTabsContent
    :value="props.value"
    class="voxel-tabs__content"
    v-bind="$attrs"
  >
    <slot />
  </RekaTabsContent>
</template>

<style scoped>
@reference "../../style.css"
.voxel-tabs__content {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}
</style>