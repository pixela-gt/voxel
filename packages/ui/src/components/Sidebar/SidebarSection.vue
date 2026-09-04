<script setup lang="ts">
import type { ClassValue } from '../../types/shared'

interface SidebarSectionProps {
  class?: ClassValue
}
const props = defineProps<SidebarSectionProps>()
</script>

<template>
  <div class="vx-sidebar-section" :class="props.class">
    <slot />
  </div>
</template>

<style scoped>
.vx-sidebar-section {
  @apply flex flex-col gap-1;
}
</style>
