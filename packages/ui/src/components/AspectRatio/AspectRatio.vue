<script setup lang="ts">
import { computed } from 'vue'
import { AspectRatio } from 'reka-ui'
import type { AspectRatioProps } from './AspectRatio.types'

const PRESET_RATIOS = {
  square: 1,
  video: 16 / 9,
  photo: 4 / 3,
  portrait: 3 / 4,
  wide: 21 / 9,
} as const

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: undefined,
  preset: undefined,
  asChild: false,
} as const)

// numeric wins over preset (ticket decision)
const effective = computed(() => props.ratio ?? PRESET_RATIOS[props.preset ?? 'square'])
// own root div required: reka renders its padding wrapper internally and puts
// $attrs on the inner absolute layer, so consumer sizing classes must live here
const rootClass = computed(() => ['voxel-aspect-ratio', props.class])
</script>

<template>
  <div :class="rootClass">
    <AspectRatio :ratio="effective" :as-child="props.asChild">
      <slot />
    </AspectRatio>
  </div>
</template>

<style scoped>
.voxel-aspect-ratio {
  @apply relative overflow-hidden;
}
</style>
