<script setup lang="ts">
import { computed } from 'vue'
import type { KbdProps } from './Kbd.types'

const props = withDefaults(defineProps<KbdProps>(), {
  size: 'default',
} as const)

const rootClass = computed(() => [
  'voxel-kbd',
  `voxel-kbd--size-${props.size}`,
  props.class,
])
</script>

<template>
  <kbd :class="rootClass" v-bind="$attrs">
    <slot />
  </kbd>
</template>

<style scoped>
.voxel-kbd {
  @apply inline-flex items-center justify-center
    font-mono font-medium whitespace-nowrap
    bg-[var(--color-grey-100)] border border-[var(--color-grey-300)]
    rounded-[var(--rounded-xs)]
    text-[var(--color-text-primary)];
}

.voxel-kbd--size-small {
  @apply px-1.5 py-0.5 text-[10px] leading-[14px] min-w-[20px];
}

.voxel-kbd--size-default {
  @apply px-2 py-1 text-xs leading-[16px] min-w-[24px];
}

.voxel-kbd--size-large {
  @apply px-2.5 py-1.5 text-sm leading-[20px] min-w-[28px];
}
</style>
