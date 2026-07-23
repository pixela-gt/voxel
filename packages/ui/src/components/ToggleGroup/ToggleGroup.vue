<script setup lang="ts">
import { computed } from 'vue'
import { ToggleGroupRoot } from 'reka-ui'
import type { ToggleGroupProps } from './ToggleGroup.types'

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  type: 'single',
  size: 'default',
  disabled: false,
  orientation: 'horizontal',
  rovingFocus: true,
  loop: true,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

const rootClass = computed(() => [
  'voxel-toggle-group',
  `voxel-toggle-group--${props.orientation}`,
])
</script>

<template>
  <ToggleGroupRoot
    :modelValue="props.modelValue"
    :type="props.type"
    :disabled="props.disabled"
    :orientation="props.orientation"
    :rovingFocus="props.rovingFocus"
    :loop="props.loop"
    @update:modelValue="emit('update:modelValue', $event as string | string[])"
    :class="rootClass"
    v-bind="$attrs"
  >
    <slot />
  </ToggleGroupRoot>
</template>

<style scoped>
.voxel-toggle-group {
  @apply inline-flex items-center gap-1;
}

.voxel-toggle-group--vertical {
  @apply flex-col;
}
</style>
