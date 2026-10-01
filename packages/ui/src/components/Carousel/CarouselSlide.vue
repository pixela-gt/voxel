<script setup lang="ts">
import { computed } from 'vue'
import type { CarouselSlideProps } from './CarouselSlide.types'

const props = defineProps<CarouselSlideProps>()

const slideClass = computed(() => [
  'voxel-carousel__slide',
  props.class,
])
</script>

<template>
  <div :class="slideClass" v-bind="$attrs">
    <slot />
  </div>
</template>

<style scoped>
.voxel-carousel__slide {
  @apply flex-shrink-0 snap-start;
  width: calc((100% - (var(--slides-per-view, 1) - 1) * var(--carousel-gap, 0px)) / var(--slides-per-view, 1));
}
</style>
