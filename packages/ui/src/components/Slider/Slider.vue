<script setup lang="ts">
import { computed } from 'vue'
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from 'reka-ui'
import type { SliderProps } from './Slider.types'

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  orientation: 'horizontal',
  inverted: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: number[] | undefined]
}>()

const rootClass = computed(() => ['voxel-slider', `voxel-slider--${props.orientation}`])
</script>

<template>
  <SliderRoot
    :modelValue="props.modelValue"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :disabled="props.disabled"
    :orientation="props.orientation"
    :inverted="props.inverted"
    @update:modelValue="emit('update:modelValue', $event)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <SliderTrack class="voxel-slider__track">
      <SliderRange class="voxel-slider__range" />
    </SliderTrack>
    <SliderThumb class="voxel-slider__thumb" />
  </SliderRoot>
</template>

<style scoped>
.voxel-slider {
  @apply relative flex items-center select-none touch-none cursor-pointer;
}

.voxel-slider--horizontal {
  @apply w-full h-5;
}

.voxel-slider--vertical {
  @apply h-full w-5 flex-col;
}

.voxel-slider__track {
  @apply relative grow rounded-full bg-[var(--color-grey-600)];
}

.voxel-slider--horizontal .voxel-slider__track {
  @apply h-1.5;
}

.voxel-slider--vertical .voxel-slider__track {
  @apply w-1.5;
}

.voxel-slider__range {
  @apply absolute rounded-full bg-[var(--color-primary-base)];
}

.voxel-slider--horizontal .voxel-slider__range {
  @apply h-full;
}

.voxel-slider--vertical .voxel-slider__range {
  @apply w-full;
}

.voxel-slider__thumb {
  @apply block rounded-full bg-[var(--color-surface-base)] shadow-md
    transition-transform duration-[var(--transition-fast)]
    hover:scale-110
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-slider--horizontal .voxel-slider__thumb {
  @apply size-5;
}

.voxel-slider--vertical .voxel-slider__thumb {
  @apply size-5;
}
</style>
