<script setup lang="ts">
import { inject } from 'vue'
import { SIDEBAR_KEY } from './Sidebar.types'
import { Icon } from '../Icon'
import type { ClassValue, IconValue } from '../../types/shared'

interface SidebarCollapseButtonProps {
  icon?: IconValue
  class?: ClassValue
}
const props = defineProps<SidebarCollapseButtonProps>()

const ctx = inject(SIDEBAR_KEY)
if (!ctx) throw new Error('SidebarCollapseButton must be used inside Sidebar')
</script>

<template>
  <button
    type="button"
    class="vx-sidebar-collapse-button"
    :class="props.class"
    @click="ctx.toggle()"
    :aria-label="ctx.collapsed.value ? 'Expand sidebar' : 'Collapse sidebar'"
  >
    <slot>
      <Icon v-if="props.icon" :icon="props.icon" class="vx-sidebar-collapse-button__icon" />
    </slot>
  </button>
</template>

<style scoped>
.vx-sidebar-collapse-button {
  @apply flex items-center justify-center w-full h-9 rounded-md cursor-pointer
    hover:bg-white/10
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
    transition-colors duration-200;
  color: var(--sidebar-text, #ffffff);
  --tw-ring-color: color-mix(in srgb, var(--sidebar-active-color, #ffffff) 50%, transparent);
}

.vx-sidebar-collapse-button__icon {
  @apply size-5 shrink-0 transition-transform duration-200;
}
</style>
