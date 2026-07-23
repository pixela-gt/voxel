<script setup lang="ts">
import { computed } from 'vue'
import { Label } from 'reka-ui'
import type { LabelProps } from './Label.types'

const props = withDefaults(defineProps<LabelProps>(), {
  size: 'default',
  disabled: false,
} as const)

const labelClass = computed(() => ['voxel-label', `voxel-label--${props.size}`])
</script>

<template>
  <Label
    :class="labelClass"
    :disabled="props.disabled"
    v-bind="$attrs"
  >
    <slot />
  </Label>
</template>

<style scoped>
.voxel-label {
  @apply font-sans font-medium text-[var(--color-text-primary)]
    cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-label--small {
  @apply text-[11px] leading-[16px] tracking-[0.2px];
}
.voxel-label--default {
  @apply text-sm leading-[20px] tracking-[0.07px];
}
.voxel-label--large {
  @apply text-base leading-[24px] tracking-[0.08px];
}
</style>
