<script setup lang="ts">
import { computed } from 'vue'
import type { ToggleButtonProps } from './ToggleButton.types'

const props = defineProps<ToggleButtonProps>()

const emit = defineEmits<{
  'update:pressed': [value: boolean]
  click: [event: MouseEvent]
}>()

const isIconButton = props.type === 'icon-button'
const isPressed = computed(() => props.pressed ?? false)

function handleClick(event: MouseEvent) {
  if (props.disabled) return
  emit('update:pressed', !props.pressed)
  emit('click', event)
}
</script>

<template>
  <button
    :class="[
      'voxel-toggle-button',
      isIconButton ? 'voxel-toggle-button--icon' : 'voxel-toggle-button--label',
      isPressed && 'voxel-toggle-button--pressed',
      props.disabled && 'voxel-toggle-button--disabled',
    ]"
    :disabled="props.disabled"
    @click="handleClick"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<style scoped>
.voxel-toggle-button {
  @apply inline-flex items-center justify-center whitespace-nowrap font-sans antialiased
    transition-colors duration-[var(--transition-fast)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-toggle-button--icon {
  @apply size-[40px] rounded-[20px]
    bg-transparent text-[var(--color-primary-base)]
    hover:bg-[var(--color-primary-lighten-1)] active:bg-[var(--color-primary-lighten-1)];
}

.voxel-toggle-button--label {
  @apply px-[24px] py-[12px] rounded-[12px] gap-[6px]
    text-[14px] font-bold tracking-[0.07px]
    bg-transparent text-[var(--color-primary-base)] border border-[var(--color-primary-base)]
    hover:bg-[var(--color-primary-lighten-1)] active:bg-[var(--color-primary-lighten-1)];
}

.voxel-toggle-button--pressed.voxel-toggle-button--icon,
.voxel-toggle-button--pressed.voxel-toggle-button--label {
  @apply bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)];
}

.voxel-toggle-button--pressed.voxel-toggle-button--label {
  @apply border-transparent;
}
</style>