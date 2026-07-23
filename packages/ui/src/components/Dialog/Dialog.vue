<script setup lang="ts">
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'reka-ui'
import type { DialogProps } from './Dialog.types'

const props = defineProps<DialogProps>()
</script>

<template>
  <DialogRoot v-bind="$attrs">
    <DialogTrigger class="voxel-dialog__trigger">
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="voxel-dialog__overlay" />
      <DialogContent class="voxel-dialog__content">
        <div class="voxel-dialog__header">
          <div>
            <DialogTitle v-if="props.title" class="voxel-dialog__title">
              {{ props.title }}
            </DialogTitle>
            <DialogDescription v-if="props.description" class="voxel-dialog__description">
              {{ props.description }}
            </DialogDescription>
          </div>
          <DialogClose class="voxel-dialog__close" aria-label="Close dialog">
            <svg
              class="voxel-dialog__close-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </DialogClose>
        </div>

        <div class="voxel-dialog__body">
          <slot name="content" />
        </div>

        <div class="voxel-dialog__footer">
          <slot name="footer" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.voxel-dialog__trigger {
  @apply inline-flex items-center justify-center gap-1.5 px-6 py-3 text-sm font-bold rounded-xl
    bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)]
    hover:bg-[var(--color-primary-darken-1)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150;
}

.voxel-dialog__overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity;
}

.voxel-dialog__content {
  @apply fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg
    bg-[var(--color-surface-base)] rounded-2xl shadow-[var(--shadow-xl)] p-6
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-dialog__header {
  @apply flex items-start justify-between gap-4 mb-4;
}

.voxel-dialog__title {
  @apply text-lg font-semibold text-[var(--color-text-primary)];
}

.voxel-dialog__description {
  @apply mt-1 text-sm text-[var(--color-text-secondary)];
}

.voxel-dialog__close {
  @apply p-1 rounded-lg text-[var(--color-text-secondary)]
    hover:bg-[var(--color-grey-100)] hover:text-[var(--color-text-primary)] transition-colors;
}

.voxel-dialog__close-icon {
  @apply size-5;
}

.voxel-dialog__body {
  @apply min-h-[100px];
}

.voxel-dialog__footer {
  @apply mt-6 flex justify-end gap-2;
}
</style>
