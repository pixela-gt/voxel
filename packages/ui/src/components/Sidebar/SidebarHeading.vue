<script setup lang="ts">
import type { ClassValue } from '../../types/shared'

interface SidebarHeadingProps {
  class?: ClassValue
}
const props = defineProps<SidebarHeadingProps>()
</script>

<template>
  <span class="vx-sidebar-heading" :class="props.class">
    <slot />
  </span>
</template>

<style scoped>
.vx-sidebar-heading {
  @apply block px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider opacity-70;
  color: var(--sidebar-text, #ffffff);
}
</style>
