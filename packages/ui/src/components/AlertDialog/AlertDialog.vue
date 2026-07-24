<script setup lang="ts">
import { computed } from 'vue'
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from 'reka-ui'
import { Icon } from '../Icon'
import type { AlertDialogProps } from './AlertDialog.types'

const props = withDefaults(defineProps<AlertDialogProps>(), {
  variant: 'info',
} as const)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const rootClass = computed(() => ['voxel-alert-dialog', `voxel-alert-dialog--${props.variant}`, props.class])
</script>

<template>
  <AlertDialogRoot
    :open="props.open"
    :defaultOpen="props.defaultOpen"
    @update:open="(v: boolean) => emit('update:open', v)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <AlertDialogTrigger class="voxel-alert-dialog__trigger">
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay class="voxel-alert-dialog__overlay" />
      <AlertDialogContent class="voxel-alert-dialog__content">
        <div class="voxel-alert-dialog__header">
          <div v-if="props.icon" :class="['voxel-alert-dialog__icon', `voxel-alert-dialog__icon--${props.variant}`]">
            <Icon :icon="props.icon" size="default" />
          </div>
          <div class="voxel-alert-dialog__header-content">
            <AlertDialogTitle v-if="props.title" class="voxel-alert-dialog__title">{{ props.title }}</AlertDialogTitle>
            <AlertDialogDescription v-if="props.description" class="voxel-alert-dialog__description">
              {{ props.description }}
            </AlertDialogDescription>
          </div>
        </div>
        <div class="voxel-alert-dialog__body">
          <slot />
        </div>
        <div class="voxel-alert-dialog__footer">
          <slot name="footer">
            <AlertDialogCancel class="voxel-alert-dialog__button voxel-alert-dialog__button--cancel">
              <slot name="cancel">Cancel</slot>
            </AlertDialogCancel>
            <AlertDialogAction class="voxel-alert-dialog__button voxel-alert-dialog__button--action">
              <slot name="action">Continue</slot>
            </AlertDialogAction>
          </slot>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<style scoped>
.voxel-alert-dialog {
  @apply inline-flex;
}

.voxel-alert-dialog__trigger {
  @apply inline-flex items-center;
}

.voxel-alert-dialog__overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm z-50;
}

.voxel-alert-dialog__content {
  @apply fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md
    bg-[var(--color-surface-base)] rounded-2xl shadow-[var(--shadow-xl)] p-6
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-alert-dialog__header {
  @apply flex items-center gap-3 mb-2;
  }
  
  .voxel-alert-dialog__header-content {
    @apply flex flex-col flex-1;
}

.voxel-alert-dialog__icon {
  @apply flex-shrink-0 flex items-center justify-center size-9 rounded-full;
}

.voxel-alert-dialog__icon--info {
  @apply bg-[var(--color-info-lighten-1)]/12 text-[var(--color-info-base)];
}

.voxel-alert-dialog__icon--warning {
  @apply bg-[var(--color-warning-lighten-1)]/12 text-[var(--color-warning-base)];
}

.voxel-alert-dialog__icon--error {
  @apply bg-[var(--color-error-lighten-1)]/12 text-[var(--color-error-base)];
}

.voxel-alert-dialog__icon--success {
  @apply bg-[var(--color-success-lighten-1)]/12 text-[var(--color-success-base)];
}

.voxel-alert-dialog__title {
  @apply text-lg font-semibold text-[var(--color-text-primary)];
}

.voxel-alert-dialog__description {
  @apply mt-1 text-sm text-[var(--color-text-secondary)] leading-relaxed;
}

.voxel-alert-dialog__body {
  @apply mt-2 text-sm text-[var(--color-text-primary)];
}

.voxel-alert-dialog__footer {
  @apply mt-6 flex justify-end gap-2;
}

.voxel-alert-dialog__button {
  @apply inline-flex items-center justify-center px-4 h-9 rounded-lg text-sm font-medium
    transition-colors
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-alert-dialog__button--cancel {
  @apply bg-transparent text-[var(--color-text-secondary)]
    hover:bg-[var(--color-grey-100)] hover:text-[var(--color-text-primary)];
}

.voxel-alert-dialog__button--action {
  @apply text-white;
}

.voxel-alert-dialog--info .voxel-alert-dialog__button--action { @apply bg-[var(--color-info-base)] hover:bg-[var(--color-info-darken-1)]; }
.voxel-alert-dialog--warning .voxel-alert-dialog__button--action { @apply bg-[var(--color-warning-base)] hover:bg-[var(--color-warning-darken-1)]; }
.voxel-alert-dialog--error .voxel-alert-dialog__button--action { @apply bg-[var(--color-error-base)] hover:bg-[var(--color-error-darken-1)]; }
.voxel-alert-dialog--success .voxel-alert-dialog__button--action { @apply bg-[var(--color-success-base)] hover:bg-[var(--color-success-darken-1)]; }
</style>
