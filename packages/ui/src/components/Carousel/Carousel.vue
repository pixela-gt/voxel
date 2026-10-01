<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { Icon } from '../Icon'
import type { CarouselProps } from './Carousel.types'

const props = withDefaults(defineProps<CarouselProps>(), {
  slidesPerView: 1,
  gap: 16,
  showArrows: true,
  showDots: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const viewportRef = ref<HTMLElement | null>(null)
const slideCount = ref(0)
const currentIndex = ref(props.modelValue ?? 0)
const canPrev = ref(false)
const canNext = ref(false)

let observer: IntersectionObserver | null = null

function updateArrows() {
  const viewport = viewportRef.value
  if (!viewport) return
  canPrev.value = viewport.scrollLeft > 1
  canNext.value = viewport.scrollLeft < viewport.scrollWidth - viewport.clientWidth - 1
}

function getSlides(): HTMLElement[] {
  const viewport = viewportRef.value
  if (!viewport) return []
  return Array.from(viewport.children) as HTMLElement[]
}

function scrollPrev() {
  const slides = getSlides()
  const viewport = viewportRef.value
  if (!slides.length || !viewport) return
  const slideWidth = slides[0].offsetWidth + props.gap
  viewport.scrollBy({ left: -slideWidth, behavior: 'smooth' })
}

function scrollNext() {
  const slides = getSlides()
  const viewport = viewportRef.value
  if (!slides.length || !viewport) return
  const slideWidth = slides[0].offsetWidth + props.gap
  viewport.scrollBy({ left: slideWidth, behavior: 'smooth' })
}

function scrollToIndex(index: number) {
  const slides = getSlides()
  const viewport = viewportRef.value
  if (!slides[index] || !viewport) return
  viewport.scrollTo({ left: slides[index].offsetLeft, behavior: 'smooth' })
}

function onDotClick(index: number) {
  currentIndex.value = index
  if (props.modelValue === undefined) {
    emit('update:modelValue', index)
  }
  scrollToIndex(index)
}

onMounted(() => {
  const viewport = viewportRef.value
  if (!viewport) return

  const slides = getSlides()
  slideCount.value = slides.length

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const index = slides.indexOf(entry.target as HTMLElement)
          if (index !== -1 && index !== currentIndex.value) {
            currentIndex.value = index
            emit('update:modelValue', index)
          }
        }
      }
    },
    { root: viewport, threshold: 0.5 },
  )

  slides.forEach((slide) => observer!.observe(slide))

  viewport.addEventListener('scroll', updateArrows, { passive: true })
  updateArrows()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  viewportRef.value?.removeEventListener('scroll', updateArrows)
})

const dots = computed(() => Array.from({ length: slideCount.value }, (_, i) => i))

const viewportStyle = computed(() => ({
  '--slides-per-view': String(props.slidesPerView),
  '--carousel-gap': `${props.gap}px`,
  gap: `${props.gap}px`,
}))
</script>

<template>
  <div class="voxel-carousel" role="region" aria-roledescription="carousel" v-bind="$attrs">
    <div ref="viewportRef" class="voxel-carousel__viewport" :style="viewportStyle">
      <slot />
    </div>

    <button
      v-if="showArrows && canPrev"
      class="voxel-carousel__arrow voxel-carousel__arrow--prev"
      aria-label="Previous slide"
      @click="scrollPrev"
    >
      <Icon :icon="ChevronLeft" />
    </button>
    <button
      v-if="showArrows && canNext"
      class="voxel-carousel__arrow voxel-carousel__arrow--next"
      aria-label="Next slide"
      @click="scrollNext"
    >
      <Icon :icon="ChevronRight" />
    </button>

    <div v-if="showDots && dots.length > 1" class="voxel-carousel__dots" role="tablist">
      <button
        v-for="i in dots"
        :key="i"
        class="voxel-carousel__dot"
        :class="{ 'voxel-carousel__dot--active': i === currentIndex }"
        role="tab"
        :aria-selected="i === currentIndex"
        :aria-label="`Go to slide ${i + 1}`"
        @click="onDotClick(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.voxel-carousel {
  @apply relative w-full;
}

.voxel-carousel__viewport {
  @apply flex overflow-x-auto
    scroll-smooth snap-x snap-mandatory
    scrollbar-none;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.voxel-carousel__viewport::-webkit-scrollbar {
  @apply hidden;
}

.voxel-carousel__arrow {
  @apply absolute top-1/2 -translate-y-1/2 z-10
    flex items-center justify-center
    size-9 rounded-full
    bg-[var(--color-surface-base)] text-[var(--color-text-secondary)]
    border border-[var(--color-grey-200)]
    shadow-[var(--shadow-sm)]
    hover:bg-[var(--color-surface-light)] hover:text-[var(--color-text-primary)]
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    transition-colors duration-150
    cursor-pointer;
}

.voxel-carousel__arrow--prev {
  @apply left-2;
}

.voxel-carousel__arrow--next {
  @apply right-2;
}

.voxel-carousel__dots {
  @apply flex items-center justify-center gap-2 mt-4;
}

.voxel-carousel__dot {
  @apply size-2 rounded-full
    bg-[var(--color-grey-400)]
    cursor-pointer transition-colors duration-150
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-carousel__dot--active {
  @apply bg-[var(--color-primary-base)];
}
</style>
