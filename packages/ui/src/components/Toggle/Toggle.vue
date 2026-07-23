<script setup lang="ts">
import { computed } from 'vue'
import { Toggle } from 'reka-ui'
import type { ToggleProps } from './Toggle.types'

const props = withDefaults(defineProps<ToggleProps>(), {
  size: 'default',
  disabled: false,
  modelValue: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const toggleClass = computed(() => [
  'voxel-toggle',
  `voxel-toggle--${props.size}`,
  props.modelValue && 'voxel-toggle--pressed',
])
</script>

<template>
  <Toggle
    v-model="props.modelValue"
    :disabled="props.disabled"
    @update:modelValue="emit('update:modelValue', $event)"
    :class="toggleClass"
    v-bind="$attrs"
  >
    <slot />
  </Toggle>
</template>

<style scoped>
.voxel-toggle {
  @apply inline-flex items-center justify-center
    font-sans font-medium text-[var(--color-text-secondary)]
    bg-transparent
    border border-[var(--color-grey-600)]
    rounded-lg
    transition-colors duration-[var(--transition-fast)]
    hover:bg-[var(--color-grey-100)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-toggle--pressed {
  @apply bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)]
    border-[var(--color-primary-base)]
    hover:bg-[var(--color-primary-darken-1)];
}

.voxel-toggle--small {
  @apply h-7 px-2 text-[11px] gap-1;
}

.voxel-toggle--default {
  @apply h-9 px-3 text-sm gap-1.5;
}

.voxel-toggle--large {
  @apply h-11 px-4 text-base gap-2;
}
</style>
