<script setup lang="ts">
import { computed } from 'vue'
import { RatingRoot, RatingItem, RatingItemIndicator } from 'reka-ui'
import type { RatingProps } from './Rating.types'

const props = withDefaults(defineProps<RatingProps>(), {
  max: 5,
  disabled: false,
  size: 'default',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'change': [value: number]
}>()

const rootClass = computed(() => ['voxel-rating', `voxel-rating--size-${props.size}`, props.class])
const items = computed(() => Array.from({ length: props.max }, (_, i) => i + 1))
</script>

<template>
  <!-- ponytail: alpha, reka API may shift -->
  <RatingRoot
    :modelValue="props.modelValue"
    :defaultValue="props.defaultValue"
    :max="props.max"
    :disabled="props.disabled"
    :required="props.required"
    :name="props.name"
    @update:modelValue="(v: number) => emit('update:modelValue', v)"
    @change="(v: number) => emit('change', v)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <RatingItem v-for="i in items" :key="i" :item="i" class="voxel-rating__item">
      <RatingItemIndicator :step="i" class="voxel-rating__indicator">
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.9 8.6L22 9.2L16.5 13.9L18.2 21L12 17.3L5.8 21L7.5 13.9L2 9.2L9.1 8.6L12 2Z" />
        </svg>
      </RatingItemIndicator>
      <svg class="voxel-rating__outline" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.9 8.6L22 9.2L16.5 13.9L18.2 21L12 17.3L5.8 21L7.5 13.9L2 9.2L9.1 8.6L12 2Z" />
      </svg>
    </RatingItem>
  </RatingRoot>
</template>

<style scoped>
.voxel-rating {
  @apply inline-flex items-center gap-1;
}

.voxel-rating--size-small .voxel-rating__item { @apply size-4; }
.voxel-rating--size-default .voxel-rating__item { @apply size-6; }
.voxel-rating--size-large .voxel-rating__item { @apply size-8; }

.voxel-rating__item {
  @apply relative inline-flex items-center justify-center
    text-[var(--color-grey-300)]
    cursor-pointer
    transition-colors
    hover:text-[var(--color-primary-lighten-1)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2 rounded-sm
    data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50;
}

.voxel-rating__indicator {
  @apply absolute inset-0 flex items-center justify-center text-[var(--color-warning-base)];
}

.voxel-rating__outline {
  @apply fill-transparent;
}
</style>
