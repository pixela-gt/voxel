<script setup lang="ts">
import { computed } from 'vue'
import { ColorSliderRoot, ColorSliderTrack, ColorSliderThumb } from 'reka-ui'
import type { ColorSliderProps } from './ColorSlider.types'

const props = withDefaults(defineProps<ColorSliderProps>(), { disabled: false } as const)

const emit = defineEmits<{
  'update:modelValue': [value: ColorSliderProps['modelValue']]
}>()

const rootClass = computed(() => [
  'voxel-color-slider',
  `voxel-color-slider--orientation-${props.orientation ?? 'horizontal'}`,
  { 'voxel-color-slider--disabled': props.disabled },
  props.class,
])
</script>

<template>
  <ColorSliderRoot
    v-model="props.modelValue"
    :default-value="defaultValue"
    :channel="channel"
    :orientation="orientation"
    :inverted="inverted"
    :disabled="disabled"
    :class="rootClass"
    @update:modelValue="(v) => emit('update:modelValue', v as ColorSliderProps['modelValue'])"
  >
    <ColorSliderTrack class="voxel-color-slider__track">
      <ColorSliderThumb class="voxel-color-slider__thumb" />
    </ColorSliderTrack>
  </ColorSliderRoot>
</template>

<style scoped>
.voxel-color-slider--orientation-horizontal {
  @apply block h-4 w-full;
}
.voxel-color-slider--orientation-vertical {
  @apply block h-40 w-4;
}
.voxel-color-slider__track {
  @apply block h-full w-full rounded-full;
}
.voxel-color-slider__thumb {
  @apply size-5 rounded-full border-2 border-white shadow-md;
}
.voxel-color-slider--disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>