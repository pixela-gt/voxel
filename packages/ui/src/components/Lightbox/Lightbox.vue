<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'reka-ui'
import { X, ChevronLeft, ChevronRight } from '@lucide/vue'
import { Icon } from '../Icon'
import type { LightboxProps } from './Lightbox.types'

const props = withDefaults(defineProps<LightboxProps>(), {
  open: undefined,
  defaultOpen: undefined,
} as const)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

// ponytail: skip reka-ui rendering during SSR to avoid dual-Vue-instance crash
const isClient = ref(false)
onMounted(() => { isClient.value = true })

const currentIndex = ref(0)

const isGallery = computed(() => !!props.images?.length)

const activeImage = computed(() => {
  if (isGallery.value) {
    return props.images![currentIndex.value]
  }
  return { src: props.src ?? '', alt: props.alt ?? '', caption: props.caption }
})

function prev() {
  if (!isGallery.value) return
  const len = props.images!.length
  currentIndex.value = (currentIndex.value - 1 + len) % len
}

function next() {
  if (!isGallery.value) return
  const len = props.images!.length
  currentIndex.value = (currentIndex.value + 1) % len
}

function onKeydown(event: KeyboardEvent) {
  if (!isGallery.value) return
  if (event.key === 'ArrowLeft') prev()
  if (event.key === 'ArrowRight') next()
}

// Unified open-state pattern: forward open/defaultOpen conditionally (see Drawer)
const rootBindings = computed(() => ({
  ...(props.open !== undefined ? { open: props.open } : {}),
  ...(props.defaultOpen !== undefined ? { defaultOpen: props.defaultOpen } : {}),
}))

const contentClass = computed(() => ['voxel-lightbox', props.class])
</script>

<template>
  <DialogRoot
    v-if="isClient"
    v-bind="rootBindings"
    @update:open="(v: boolean) => emit('update:open', v)"
  >
    <DialogPortal>
      <DialogOverlay class="voxel-lightbox__overlay" />
      <DialogContent
        :class="contentClass"
        @keydown="onKeydown"
        v-bind="$attrs"
      >
        <DialogTitle class="voxel-lightbox__sr-only">
          {{ activeImage.alt || 'Image lightbox' }}
        </DialogTitle>

        <DialogClose
          class="voxel-lightbox__close"
          aria-label="Close lightbox"
        >
          <span class="voxel-lightbox__close-icon" aria-hidden="true">
            <slot name="close-icon">
              <Icon :icon="props.closeIcon ?? X" />
            </slot>
          </span>
        </DialogClose>

        <button
          v-if="isGallery"
          class="voxel-lightbox__nav voxel-lightbox__nav--prev"
          aria-label="Previous image"
          @click="prev"
        >
          <Icon :icon="ChevronLeft" />
        </button>

        <div class="voxel-lightbox__image-wrapper">
          <img
            v-if="activeImage.src"
            :src="activeImage.src"
            :alt="activeImage.alt"
            class="voxel-lightbox__image"
          />
        </div>

        <button
          v-if="isGallery"
          class="voxel-lightbox__nav voxel-lightbox__nav--next"
          aria-label="Next image"
          @click="next"
        >
          <Icon :icon="ChevronRight" />
        </button>

        <div v-if="activeImage.caption" class="voxel-lightbox__caption-wrapper">
          <DialogDescription class="voxel-lightbox__caption">
            {{ activeImage.caption }}
          </DialogDescription>
        </div>

        <div v-if="isGallery" class="voxel-lightbox__counter" aria-live="polite">
          {{ currentIndex + 1 }} / {{ props.images!.length }}
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.voxel-lightbox__overlay {
  @apply fixed inset-0 bg-black/80 backdrop-blur-sm z-50;
}

.voxel-lightbox {
  @apply fixed inset-0 z-50 flex flex-col items-center justify-center
    p-4 focus-visible:outline-none;
}

.voxel-lightbox__sr-only {
  @apply absolute size-px p-0 -m-px overflow-hidden
    whitespace-nowrap border-0
    [clip:rect(0,0,0,0)];
}

.voxel-lightbox__close {
  @apply absolute top-4 right-4 z-10
    flex items-center justify-center
    size-10 rounded-full
    bg-[var(--color-surface-base)]/80 text-[var(--color-text-primary)]
    hover:bg-[var(--color-surface-base)]
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    transition-colors duration-150
    cursor-pointer;
}

.voxel-lightbox__close-icon {
  @apply size-5;
}

.voxel-lightbox__nav {
  @apply absolute top-1/2 -translate-y-1/2 z-10
    flex items-center justify-center
    size-10 rounded-full
    bg-[var(--color-surface-base)]/80 text-[var(--color-text-primary)]
    hover:bg-[var(--color-surface-base)]
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    transition-colors duration-150
    cursor-pointer;
}

.voxel-lightbox__nav--prev {
  @apply left-4;
}

.voxel-lightbox__nav--next {
  @apply right-4;
}

.voxel-lightbox__image-wrapper {
  @apply flex items-center justify-center max-w-full max-h-[80vh] overflow-hidden;
}

.voxel-lightbox__image {
  @apply max-w-full max-h-[80vh] object-contain rounded-lg;
}

.voxel-lightbox__caption-wrapper {
  @apply mt-4 max-w-xl text-center;
}

.voxel-lightbox__caption {
  @apply text-sm text-[var(--color-text-inverse)] opacity-80;
}

.voxel-lightbox__counter {
  @apply absolute bottom-4 left-1/2 -translate-x-1/2
    text-sm text-[var(--color-text-inverse)] opacity-60;
}
</style>
