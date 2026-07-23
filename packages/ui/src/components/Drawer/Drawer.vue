<script setup lang="ts">
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from 'reka-ui'
import type { DrawerProps } from './Drawer.types'

const props = withDefaults(defineProps<DrawerProps>(), {
  state: 'expanded',
  title: '',
  description: '',
} as const)

const isCollapsed = props.state === 'collapsed'
</script>

<template>
  <DialogRoot v-bind="$attrs">
    <DialogPortal>
      <DialogOverlay class="voxel-drawer__overlay" />
      <DialogContent :class="['voxel-drawer', isCollapsed && 'voxel-drawer--collapsed']">
        <div class="voxel-drawer__header">
          <DialogTitle v-if="props.title" class="voxel-drawer__title">
            {{ props.title }}
          </DialogTitle>
          <DialogClose class="voxel-drawer__close" aria-label="Close drawer">
            <svg class="voxel-drawer__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </DialogClose>
        </div>
        <div class="voxel-drawer__body">
          <slot name="content" />
        </div>
        <div class="voxel-drawer__footer">
          <slot name="footer" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
@reference "../../style.css"
.voxel-drawer__overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity;
}

.voxel-drawer {
  @apply fixed right-0 top-0 bottom-0 z-50 bg-[var(--color-surface-base)]
    border-l border-[var(--color-primary-darken-1)] flex flex-col
    transition-all duration-300 ease-out w-[255px];
}

.voxel-drawer--collapsed {
  @apply w-[64px];
}

.voxel-drawer__header {
  @apply h-[68px] opacity-80 flex-shrink-0 flex items-center justify-between px-4
    border-b border-[var(--color-primary-darken-1)];
}

.voxel-drawer__title {
  @apply text-base font-medium text-[var(--color-text-primary)];
}

.voxel-drawer__close {
  @apply p-1 rounded-lg hover:bg-[var(--color-grey-100)] text-[var(--color-text-secondary)];
}

.voxel-drawer__close-icon {
  @apply size-5;
}

.voxel-drawer__body {
  @apply flex-1 min-h-0 opacity-80 overflow-auto p-4;
}

.voxel-drawer__footer {
  @apply h-[68px] flex-shrink-0 flex items-center justify-end px-4
    border-t border-[var(--color-primary-darken-1)];
}
</style>