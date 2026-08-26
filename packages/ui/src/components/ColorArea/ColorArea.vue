<script setup lang="ts">
import { computed } from 'vue'
import { ColorAreaRoot, ColorAreaArea, ColorAreaThumb } from 'reka-ui'
import type { ColorAreaProps } from './ColorArea.types'

const props = withDefaults(defineProps<ColorAreaProps>(), { disabled: false } as const)

const emit = defineEmits<{
  'update:modelValue': [value: ColorAreaProps['modelValue']]
}>()

const rootClass = computed(() => [
  'voxel-color-area',
  { 'voxel-color-area--disabled': props.disabled },
  props.class,
])
</script>

<template>
  <ColorAreaRoot
    v-model="props.modelValue"
    :default-value="defaultValue"
    :color-space="colorSpace"
    :x-channel="xChannel"
    :y-channel="yChannel"
    :x-name="xName"
    :y-name="yName"
    :disabled="disabled"
    :class="rootClass"
    @update:modelValue="(v) => emit('update:modelValue', v as ColorAreaProps['modelValue'])"
  >
    <template #default="{ style }">
      <ColorAreaArea :style="style" class="voxel-color-area__area" />
      <ColorAreaThumb class="voxel-color-area__thumb" />
    </template>
  </ColorAreaRoot>
</template>

<style scoped>
.voxel-color-area {
  @apply relative inline-block rounded-lg;
}
.voxel-color-area__area {
  @apply block h-full w-full cursor-pointer rounded-lg;
}
.voxel-color-area__thumb {
  @apply size-4 rounded-full border-2 border-white shadow-md;
}
.voxel-color-area--disabled {
  @apply opacity-50 cursor-not-allowed;
}
.voxel-color-area--disabled .voxel-color-area__area {
  @apply cursor-not-allowed;
}
</style>