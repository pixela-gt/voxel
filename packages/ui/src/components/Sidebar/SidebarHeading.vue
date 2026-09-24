<script setup lang="ts">
import { computed, inject } from 'vue'
import { Tooltip } from '../Tooltip'
import { SIDEBAR_KEY } from './Sidebar.types'
import type { ClassValue } from '../../types/shared'

interface SidebarHeadingProps {
  class?: ClassValue
}
const props = defineProps<SidebarHeadingProps>()

const ctx = inject(SIDEBAR_KEY, null)
const collapsed = computed(() => ctx?.collapsed.value ?? false)
</script>

<template>
  <Tooltip v-if="collapsed" :text="($slots.default?.()[0]?.children as string) || ''" position="right">
    <span class="vx-sidebar-heading" :class="props.class">
      <span class="vx-sidebar-heading__sr-only">
        <slot />
      </span>
    </span>
  </Tooltip>

  <span v-else class="vx-sidebar-heading" :class="props.class">
    <slot />
  </span>
</template>

<style scoped>
.vx-sidebar-heading {
  @apply block px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider opacity-70;
  color: var(--sidebar-text);
}

.vx-sidebar-heading__sr-only {
  @apply sr-only;
}
</style>
