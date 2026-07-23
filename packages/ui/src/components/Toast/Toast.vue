<script setup lang="ts">
import { computed } from 'vue'
import {
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from 'reka-ui'
import type { ToastEntry } from './Toast.types'
import { useToastStore } from '../../composables/useToast'

const props = defineProps<{ toast: ToastEntry }>()

const store = useToastStore()

const iconPath = computed(() => {
  switch (props.toast.variant) {
    case 'success':
      return 'M5 12L10 17L20 7'
    case 'error':
      return 'M6 6L18 18M18 6L6 18'
    case 'warning':
      return 'M12 8V13M12 16V16.5'
    default:
      return 'M12 8V13M12 16V16.5'
  }
})

const onOpenChange = (open: boolean) => {
  if (!open) store.dismiss(props.toast.id)
}
</script>

<template>
  <ToastRoot
    :open="toast.open"
    :duration="toast.duration"
    @update:open="onOpenChange"
    :class="['voxel-toast', `voxel-toast--${toast.variant ?? 'default'}`]"
  >
    <div :class="['voxel-toast__icon', `voxel-toast__icon--${toast.variant ?? 'default'}`]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path :d="iconPath" />
      </svg>
    </div>
    <div class="voxel-toast__content">
      <ToastTitle v-if="toast.title" class="voxel-toast__title">{{ toast.title }}</ToastTitle>
      <ToastDescription v-if="toast.description" class="voxel-toast__description">
        {{ toast.description }}
      </ToastDescription>
    </div>
    <ToastAction v-if="$slots.action" alt-text="Action" class="voxel-toast__action">
      <slot name="action" />
    </ToastAction>
    <ToastClose class="voxel-toast__close" aria-label="Close">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3L9 9M9 3L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
    </ToastClose>
  </ToastRoot>
</template>

<style scoped>
.voxel-toast {
  @apply flex items-start gap-3 w-[360px] p-4
    bg-[var(--color-surface-base)]
    rounded-lg shadow-[var(--shadow-md)]
    border
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-toast--default { @apply border-[var(--color-grey-200)]; }
.voxel-toast--info { @apply border-l-4 border-l-[var(--color-info-base)]; }
.voxel-toast--success { @apply border-l-4 border-l-[var(--color-success-base)]; }
.voxel-toast--warning { @apply border-l-4 border-l-[var(--color-warning-base)]; }
.voxel-toast--error { @apply border-l-4 border-l-[var(--color-error-base)]; }

.voxel-toast__icon {
  @apply flex-shrink-0 flex items-center justify-center size-8 rounded-full;
}

.voxel-toast__icon--default { @apply bg-[var(--color-grey-100)] text-[var(--color-text-secondary)]; }
.voxel-toast__icon--info { @apply bg-[var(--color-info-lighten-1)] text-[var(--color-info-base)]; }
.voxel-toast__icon--success { @apply bg-[var(--color-success-lighten-1)] text-[var(--color-success-base)]; }
.voxel-toast__icon--warning { @apply bg-[var(--color-warning-lighten-1)] text-[var(--color-warning-base)]; }
.voxel-toast__icon--error { @apply bg-[var(--color-error-lighten-1)] text-[var(--color-error-base)]; }

.voxel-toast__content {
  @apply flex-1 min-w-0;
}

.voxel-toast__title {
  @apply text-sm font-semibold text-[var(--color-text-primary)];
}

.voxel-toast__description {
  @apply mt-0.5 text-sm text-[var(--color-text-secondary)] leading-snug;
}

.voxel-toast__action {
  @apply inline-flex items-center px-2 h-7 rounded-md
    text-sm font-medium text-[var(--color-primary-base)]
    hover:bg-[var(--color-primary-lighten-1)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)];
}

.voxel-toast__close {
  @apply flex-shrink-0 inline-flex items-center justify-center
    text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
    rounded p-0.5
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)];
}
</style>
