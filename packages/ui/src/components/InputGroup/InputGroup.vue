<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { InputGroupProps } from './InputGroup.types'

const props = defineProps<InputGroupProps>()

const slots = useSlots()

const rootClass = computed(() => ['voxel-input-group', props.class])
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <div v-if="slots.leading" class="voxel-input-group__leading">
      <slot name="leading" />
    </div>
    <div class="voxel-input-group__content">
      <slot />
    </div>
    <div v-if="slots.trailing" class="voxel-input-group__trailing">
      <slot name="trailing" />
    </div>
  </div>
</template>

<style scoped>
.voxel-input-group {
  @apply inline-flex items-stretch w-full
    bg-[var(--color-surface-background)]
    border-2 border-[var(--color-grey-200)]
    rounded-[var(--rounded-2xl)]
    transition-colors duration-[var(--transition-normal)]
    focus-within:border-[var(--color-primary-base)]/70;
}

.voxel-input-group__leading {
  @apply flex items-center justify-center
    pl-3 text-[var(--color-input-icon)];
}

.voxel-input-group__trailing {
  @apply flex items-center justify-center
    pr-3 text-[var(--color-input-icon)];
}

.voxel-input-group__content {
  @apply flex-1 min-w-0;
}

/* Reset inner Input border since InputGroup provides the border */
.voxel-input-group__content :deep(.voxel-input) {
  @apply border-0 rounded-none bg-transparent;
}

.voxel-input-group__content :deep(.voxel-input:focus-within) {
  @apply border-0;
}
</style>
