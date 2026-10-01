<script setup lang="ts">
import { computed, ref } from 'vue'
import { Check } from '@lucide/vue'
import { Card } from '../Card'
import { Icon } from '../Icon'
import type { SelectableCardProps } from './SelectableCard.types'

const props = withDefaults(defineProps<SelectableCardProps>(), {
  modelValue: undefined,
  defaultSelected: undefined,
  elevation: 'flat',
  disabled: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// ponytail: undefined defaults preserve Vue 3 boolean-casting sentinel (see Drawer)
const internalSelected = ref(props.defaultSelected ?? false)

const isSelected = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalSelected.value,
)

function toggle() {
  if (props.disabled) return
  const next = !isSelected.value
  if (props.modelValue === undefined) {
    internalSelected.value = next
  }
  emit('update:modelValue', next)
}

function onClick() {
  toggle()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggle()
  }
}

const rootClass = computed(() => [
  'voxel-selectable-card',
  {
    'voxel-selectable-card--selected': isSelected.value,
    'voxel-selectable-card--disabled': props.disabled,
  },
])
</script>

<template>
  <div
    :class="rootClass"
    role="checkbox"
    :aria-checked="isSelected"
    :tabindex="disabled ? -1 : 0"
    @click="onClick"
    @keydown="onKeydown"
  >
    <Card :elevation="elevation" class="voxel-selectable-card__inner">
      <slot />
    </Card>
    <span v-if="isSelected" class="voxel-selectable-card__check" aria-hidden="true">
      <Icon :icon="props.selectedIcon ?? Check" size="small" />
    </span>
  </div>
</template>

<style scoped>
.voxel-selectable-card {
  @apply relative block rounded-[var(--rounded-2xl)] outline-none
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    cursor-pointer
    transition-all duration-150;
}

.voxel-selectable-card--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-selectable-card--selected {
  @apply ring-2 ring-[var(--color-primary-base)] ring-offset-2;
}

.voxel-selectable-card__inner {
  @apply relative z-10 h-full;
}

.voxel-selectable-card--selected .voxel-selectable-card__inner {
  @apply bg-[var(--color-primary-base)]/4;
}

.voxel-selectable-card__check {
  @apply absolute top-2 right-2 z-20 flex items-center justify-center
    size-5 rounded-full
    bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)];
}
</style>
