<script setup lang="ts">
import { computed, useSlots, ref, onMounted } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'reka-ui'
import type { DrawerProps } from './Drawer.types'
import { Icon } from '../Icon'

// `open`/`defaultOpen` need an explicit `default: undefined` so Vue does NOT cast
// an absent Boolean prop to `false` (Vue 3 boolean casting). Without this,
// `props.open` is `false` even when the parent never passes it, which would flip
// the drawer into controlled-closed mode and ignore `defaultOpen`.
const props = withDefaults(defineProps<DrawerProps>(), {
  open: undefined,
  defaultOpen: undefined,
  side: 'right',
  title: '',
  description: '',
} as const)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const slots = useSlots()

// ponytail: skip reka-ui rendering during SSR to avoid dual-Vue-instance crash.
// Kept pending verification against Nuxt + reka 2.10.1 (see BUG-006 plan Phase 1).
const isClient = ref(false)
onMounted(() => { isClient.value = true })

// Unified open-state pattern: forward open/defaultOpen conditionally — reka's
// DialogRoot handles controlled vs uncontrolled natively via `passive`.
const rootBindings = computed(() => ({
  ...(props.open !== undefined ? { open: props.open } : {}),
  ...(props.defaultOpen !== undefined ? { defaultOpen: props.defaultOpen } : {}),
}))

const contentClass = computed(() => [
  'voxel-drawer',
  `voxel-drawer--side-${props.side}`,
  props.class,
])

// Inline style wins over the CSS default (w-[255px]) only when width is given.
const contentStyle = computed(() =>
  props.width === undefined
    ? undefined
    : { width: typeof props.width === 'number' ? `${props.width}px` : props.width },
)
</script>

<template>
  <DialogRoot
    v-if="isClient"
    v-bind="rootBindings"
    @update:open="(v: boolean) => emit('update:open', v)"
  >
    <DialogPortal>
      <DialogOverlay class="voxel-drawer__overlay" />
      <DialogContent :class="contentClass" :style="contentStyle" v-bind="$attrs">
        <div class="voxel-drawer__header">
          <div class="voxel-drawer__header-text">
            <DialogTitle v-if="props.title" class="voxel-drawer__title">
              {{ props.title }}
            </DialogTitle>
            <DialogDescription v-if="props.description" class="voxel-drawer__description">
              {{ props.description }}
            </DialogDescription>
          </div>
          <DialogClose
            v-if="props.closeIcon || slots['close-icon']"
            class="voxel-drawer__close"
            aria-label="Close drawer"
          >
            <span class="voxel-drawer__close-icon" aria-hidden="true">
              <slot name="close-icon">
                <Icon :icon="props.closeIcon!" />
              </slot>
            </span>
          </DialogClose>
        </div>
        <div class="voxel-drawer__body">
          <slot name="content" />
        </div>
        <div v-if="slots.footer" class="voxel-drawer__footer">
          <slot name="footer" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style>
.voxel-drawer__overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity;
}

.voxel-drawer {
  @apply fixed top-0 bottom-0 z-50 bg-[var(--color-surface-base)]
    border-[var(--color-grey-200)] flex flex-col
    transition-transform duration-300 ease-out w-[255px];
}

.voxel-drawer--side-right {
  @apply right-0 border-l;
}

.voxel-drawer--side-left {
  @apply left-0 border-r;
}

/* Slide-in/out driven by reka's data-state */
@keyframes voxel-drawer-in-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@keyframes voxel-drawer-out-right {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}
@keyframes voxel-drawer-in-left {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
@keyframes voxel-drawer-out-left {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

.voxel-drawer--side-right[data-state='open'] { animation: voxel-drawer-in-right 300ms ease-out; }
.voxel-drawer--side-right[data-state='closed'] { animation: voxel-drawer-out-right 300ms ease-in forwards; }
.voxel-drawer--side-left[data-state='open'] { animation: voxel-drawer-in-left 300ms ease-out; }
.voxel-drawer--side-left[data-state='closed'] { animation: voxel-drawer-out-left 300ms ease-in forwards; }

.voxel-drawer__header {
  @apply h-[68px] flex-shrink-0 flex items-center justify-between px-4
    border-b border-[var(--color-grey-200)];
}

.voxel-drawer__title {
  @apply text-base font-medium text-[var(--color-text-primary)];
}

.voxel-drawer__description {
  @apply mt-0.5 text-sm text-[var(--color-text-secondary)];
}

.voxel-drawer__close {
  @apply p-1 rounded-lg hover:bg-[var(--color-surface-light)] text-[var(--color-text-secondary)];
}

.voxel-drawer__close-icon {
  @apply size-5;
}

.voxel-drawer__body {
  @apply flex-1 min-h-0 overflow-auto p-4;
}

.voxel-drawer__footer {
  @apply h-[68px] flex-shrink-0 flex items-center justify-end px-4
    border-t border-[var(--color-grey-200)];
}
</style>
