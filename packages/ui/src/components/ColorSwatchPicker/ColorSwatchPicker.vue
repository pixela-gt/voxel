<script setup lang="ts">
import { computed } from 'vue'
import {
  ColorSwatchPickerRoot,
  ColorSwatchPickerItem,
  ColorSwatchPickerItemSwatch,
  ColorSwatchPickerItemIndicator,
} from 'reka-ui'
import { Check } from '@lucide/vue'
import type { ColorSwatchPickerProps } from './ColorSwatchPicker.types'

const props = withDefaults(defineProps<ColorSwatchPickerProps>(), {
  multiple: false,
  disabled: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

const rootClass = computed(() => [
  'voxel-color-swatch-picker',
  { 'voxel-color-swatch-picker--disabled': props.disabled },
  props.class,
])
</script>

<template>
  <ColorSwatchPickerRoot :model-value="props.modelValue" :default-value="defaultValue" :multiple="multiple"
    :disabled="disabled" :class="rootClass"
    @update:modelValue="(v) => emit('update:modelValue', v as string | string[])">
    <ColorSwatchPickerItem v-for="color in colors" :key="color" :value="color" class="voxel-color-swatch-picker__item">
      <ColorSwatchPickerItemSwatch class="voxel-color-swatch-picker__swatch" />
      <ColorSwatchPickerItemIndicator class="voxel-color-swatch-picker__indicator">
        <Check class="size-3.5" />
      </ColorSwatchPickerItemIndicator>
    </ColorSwatchPickerItem>
  </ColorSwatchPickerRoot>
</template>

<style>
.voxel-color-swatch-picker {
  @apply inline-flex flex-wrap items-center gap-2;
}

.voxel-color-swatch-picker__item {
  @apply relative inline-flex items-center justify-center cursor-pointer;
}

.voxel-color-swatch-picker__swatch {
  @apply size-6 rounded-lg;
  background: var(--reka-color-swatch-color);
}

.voxel-color-swatch-picker__indicator {
  @apply pointer-events-none absolute text-white;
}

.voxel-color-swatch-picker--disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>