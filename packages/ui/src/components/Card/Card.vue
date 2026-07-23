<script setup lang="ts">
import { computed } from 'vue'
import type { CardProps } from './Card.types'

const props = withDefaults(defineProps<CardProps>(), {
  elevation: 'flat',
} as const)

const cardClasses = computed(() => [
  'voxel-card',
  props.elevation !== 'flat' ? `voxel-card--${props.elevation}` : '',
])
</script>

<template>
  <div :class="cardClasses" v-bind="$attrs">
    <slot />
  </div>
</template>

<style scoped>
@reference "../../style.css"
.voxel-card {
  @apply bg-[var(--color-surface-base)] rounded-[var(--rounded-2xl)] p-4 transition-shadow duration-200;
}

.voxel-card--sm {
  @apply shadow-[var(--shadow-sm)];
}
.voxel-card--md {
  @apply shadow-[var(--shadow-md)];
}
.voxel-card--lg {
  @apply shadow-[var(--shadow-lg)];
}
.voxel-card--xl {
  @apply shadow-[var(--shadow-xl)];
}
.voxel-card--2xl {
  @apply shadow-[var(--shadow-2xl)];
}
</style>