<script setup lang="ts">
import { computed } from 'vue'
import type { AppShellProps } from './AppShell.types'

const props = withDefaults(defineProps<AppShellProps>(), {
  variant: 'default'
} as const)

const classes = computed(() => [
  'voxel-app-shell',
  `voxel-app-shell--${props.variant ?? 'default'}`,
  props.class,
])
</script>

<template>
  <div :class="classes" v-bind="$attrs">
    <div v-if="$slots.sidebar" class="voxel-app-shell__sidebar">
      <slot name="sidebar" />
    </div>
    <div class="voxel-app-shell__body">
      <div v-if="$slots.header" class="voxel-app-shell__header">
        <slot name="header" />
      </div>
      <main class="voxel-app-shell__main">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.voxel-app-shell {
  @apply flex flex-row min-h-screen bg-[var(--color-surface-light)];
}

.voxel-app-shell__header {
  @apply shrink-0;
}

.voxel-app-shell__body {
  @apply flex flex-col flex-1 overflow-hidden;
}

.voxel-app-shell__sidebar {
  @apply shrink-0 overflow-y-auto;
}

.voxel-app-shell__main {
  @apply flex-1 overflow-y-auto;
}
/** Boxy variant */
.voxel-app-shell--boxy {
  @apply gap-2 p-1;
}

.voxel-app-shell--boxy .voxel-app-shell__sidebar,
.voxel-app-shell--boxy .voxel-app-shell__header,
.voxel-app-shell--boxy .voxel-app-shell__main {
  @apply rounded-lg overflow-auto;
}

.voxel-app-shell--boxy .voxel-app-shell__main {
  @apply p-2;
}
/** Inset variant */
.voxel-app-shell--inset {
  @apply bg-[var(--color-surface-base)];
}

.voxel-app-shell--inset .voxel-app-shell__main {
  @apply gap-2 p-2 bg-[var(--color-surface-light)] rounded-lg m-2;
}
</style>
