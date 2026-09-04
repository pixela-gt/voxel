<script setup lang="ts">
import { computed, inject } from 'vue'
import { Icon } from '../Icon'
import { Collapsible } from '../Collapsible'
import { Tooltip } from '../Tooltip'
import type { SidebarItemGroupProps } from './Sidebar.types'
import { SIDEBAR_KEY } from './Sidebar.types'

const props = withDefaults(defineProps<SidebarItemGroupProps>(), {
  defaultOpen: false,
  disabled: false,
})

const ctx = inject(SIDEBAR_KEY, null)
const collapsed = computed(() => ctx?.collapsed.value ?? false)

const groupClass = computed(() => [
  'vx-sidebar-group',
  collapsed.value ? 'vx-sidebar-group--collapsed' : '',
].filter(Boolean).join(' '))
</script>

<template>
  <Collapsible
    :defaultOpen="props.defaultOpen"
    :disabled="props.disabled"
    :class="groupClass"
  >
    <template #trigger>
      <slot name="trigger">
        <Tooltip v-if="collapsed" :text="props.label || ''" position="right">
          <span class="vx-sidebar-item vx-sidebar-item--collapsed vx-sidebar-group__trigger">
            <span class="vx-sidebar-item__content">
              <Icon v-if="props.icon" :icon="props.icon" class="vx-sidebar-item__icon" />
              <span class="vx-sidebar-item__sr-only">{{ props.label }}</span>
            </span>
          </span>
        </Tooltip>
        <span v-else class="vx-sidebar-item vx-sidebar-group__trigger">
          <span class="vx-sidebar-item__content">
            <Icon v-if="props.icon" :icon="props.icon" class="vx-sidebar-item__icon" />
            <span class="vx-sidebar-item__label">{{ props.label }}</span>
          </span>
        </span>
      </slot>
    </template>

    <div class="vx-sidebar-group__content">
      <slot />
    </div>
  </Collapsible>
</template>

<style scoped>
.vx-sidebar-group__trigger {
  @apply flex w-full text-left;
}

.vx-sidebar-group__trigger .vx-sidebar-item__content {
  @apply flex-1 justify-start items-start text-left;
}

.vx-sidebar-group__trigger .vx-sidebar-item:hover {
  background-color: transparent !important;
}

.vx-sidebar-group__content {
  @apply flex flex-col gap-1 mt-1;
}

.vx-sidebar-group :deep(.voxel-collapsible) {
  @apply flex flex-col w-full;
}

.vx-sidebar-group :deep(.voxel-collapsible__trigger) {
  @apply !flex !items-center !justify-start !text-left !w-full !px-0 !py-0;
  color: var(--sidebar-text, #ffffff);
  background: transparent;
}

.vx-sidebar-group :deep(.voxel-collapsible__icon) {
  @apply size-4 shrink-0 transition-all duration-200;
  opacity: 0.7;
  color: var(--sidebar-text, #ffffff);
}

.vx-sidebar-group :deep(.voxel-collapsible__trigger:hover .voxel-collapsible__icon) {
  opacity: 1;
}

.vx-sidebar-group--collapsed :deep(.voxel-collapsible__icon) {
  @apply hidden;
}
</style>
