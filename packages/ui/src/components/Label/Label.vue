<script setup lang="ts">
import { computed } from 'vue'
import { Label } from 'reka-ui'
import type { LabelProps } from './Label.types'

const props = withDefaults(defineProps<LabelProps>(), {
  size: 'default',
  disabled: false,
} as const)

const labelClass = computed(() => ['voxel-label', `voxel-label--size-${props.size}`])
</script>

<template>
  <Label :class="labelClass" :disabled="props.disabled" v-bind="$attrs">
    <slot />
  </Label>
</template>

<style scoped>
.voxel-label {
  @apply font-sans font-medium text-[var(--color-text-primary)]
    cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-label--size-small {
  @apply text-[11px] leading-[16px] tracking-[0.2px];
}
.voxel-label--size-default {
  @apply text-sm leading-[20px] tracking-[0.07px];
}
.voxel-label--size-large {
  @apply text-base leading-[24px] tracking-[0.08px];
}
</style>
