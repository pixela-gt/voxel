<script setup lang="ts">
import { computed } from 'vue'
import { ColorSwatch as RekaColorSwatch } from 'reka-ui'
import type { ColorSwatchProps } from './ColorSwatch.types'

const props = withDefaults(defineProps<ColorSwatchProps>(), { size: 'default' } as const)

const rootClass = computed(() => [
  'voxel-color-swatch',
  `voxel-color-swatch--size-${props.size}`,
  { 'voxel-color-swatch--disabled': props.disabled },
  props.class,
])
</script>

<template>
  <RekaColorSwatch
    :color="value"
    :label="label"
    :class="rootClass"
  />
</template>

<style scoped>
.voxel-color-swatch {
  @apply inline-block rounded-lg;
  background: var(--reka-color-swatch-color);
}
.voxel-color-swatch--size-small { @apply size-4 rounded-md; }
.voxel-color-swatch--size-default { @apply size-6; }
.voxel-color-swatch--size-large { @apply size-8; }
.voxel-color-swatch--disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>