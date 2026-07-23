<script setup lang="ts">
import { computed } from 'vue'
import { StepperRoot } from 'reka-ui'
import type { StepperProps } from './Stepper.types'

const props = withDefaults(defineProps<StepperProps>(), {
  defaultValue: 1,
  orientation: 'horizontal',
  linear: true,
  size: 'default',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const rootClass = computed(() => ['voxel-stepper', `voxel-stepper--${props.orientation}`, `voxel-stepper--size-${props.size}`, props.class])
</script>

<template>
  <StepperRoot
    :modelValue="props.modelValue"
    :defaultValue="props.defaultValue"
    :orientation="props.orientation"
    :linear="props.linear"
    @update:modelValue="(v: number | undefined) => emit('update:modelValue', v ?? 1)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <slot />
  </StepperRoot>
</template>

<style scoped>
.voxel-stepper {
  @apply flex gap-2;
}

.voxel-stepper--horizontal {
  @apply flex-row;
}

.voxel-stepper--vertical {
  @apply flex-col;
}
</style>
