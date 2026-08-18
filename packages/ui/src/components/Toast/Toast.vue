<script setup lang="ts">
import { computed } from 'vue'
import { Check, Info, TriangleAlert, X } from '@lucide/vue'
import {
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from 'reka-ui'
import { Icon } from '../Icon'
import type { ToastEntry } from './Toast.types'
import { useToastStore } from '../../composables/useToast'

const props = defineProps<{ toast: ToastEntry }>()

const store = useToastStore()

const variantIcon = computed(() => {
  switch (props.toast.variant) {
    case 'success':
      return Check
    case 'error':
      return X
    case 'warning':
      return TriangleAlert
    default:
      return Info
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
      <Icon :icon="variantIcon" size="default" />
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
      <Icon :icon="X" size="small" />
    </ToastClose>
  </ToastRoot>
</template>

<style>
.voxel-toast {
  @apply flex items-start gap-3 w-[360px] p-4
    bg-[var(--color-surface-base)]
    rounded-lg shadow-[var(--shadow-md)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-toast--info { @apply border-l-4 border-l-[var(--color-info-base)]; }
.voxel-toast--success { @apply border-l-4 border-l-[var(--color-success-base)]; }
.voxel-toast--warning { @apply border-l-4 border-l-[var(--color-warning-base)]; }
.voxel-toast--error { @apply border-l-4 border-l-[var(--color-error-base)]; }

.voxel-toast__icon {
  @apply flex-shrink-0 flex items-center justify-center size-8 rounded-full;
}

.voxel-toast__icon--default {
  @apply bg-[var(--color-grey-100)]/12 text-[var(--color-text-secondary)];
}

.voxel-toast__icon--info {
  @apply bg-[var(--color-info-lighten-1)]/12 text-[var(--color-info-base)];
}

.voxel-toast__icon--success {
  @apply bg-[var(--color-success-lighten-1)]/12 text-[var(--color-success-base)];
}

.voxel-toast__icon--warning {
  @apply bg-[var(--color-warning-lighten-1)]/12 text-[var(--color-warning-base)];
}

.voxel-toast__icon--error {
  @apply bg-[var(--color-error-lighten-1)]/12 text-[var(--color-error-base)];
}

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
.voxel-toast[data-state='open'] {
  animation: voxel-toast-in 0.2s ease-out;
}

.voxel-toast[data-state='closed'] {
  animation: voxel-toast-out 0.2s ease-in forwards;
}

@keyframes voxel-toast-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes voxel-toast-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {

  .voxel-toast[data-state='open'],
  .voxel-toast[data-state='closed'] {
    animation: none;
  }
}
</style>
