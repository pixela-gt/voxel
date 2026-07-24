<script setup lang="ts">
import { computed, provide } from 'vue'
import { ToggleGroupRoot } from 'reka-ui'
import type { ToggleGroupContext, ToggleGroupProps } from './ToggleGroup.types'

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
  props.class,
])

provide<ToggleGroupContext>('voxelToggleGroup', { size: props.size })
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
  @apply inline-flex items-center bg-[var(--color-surface-light)]
    p-1 rounded-xl gap-1
    divide-x divide-[var(--color-grey-200)];
}

.voxel-toggle-group--vertical {
  @apply flex-col divide-x-0 divide-y items-stretch gap-1;
}
</style>
