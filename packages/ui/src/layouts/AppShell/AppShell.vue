<script setup lang="ts">
import type { AppShellProps } from './AppShell.types'

const props = withDefaults(defineProps<AppShellProps>(), {} as const)
</script>

<template>
  <div :class="['voxel-app-shell', props.class]" v-bind="$attrs">
    <div v-if="$slots.header" class="voxel-app-shell__header">
      <slot name="header" />
    </div>
    <div class="voxel-app-shell__body">
      <div v-if="$slots.sidebar" class="voxel-app-shell__sidebar">
        <slot name="sidebar" />
      </div>
      <main class="voxel-app-shell__main">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.voxel-app-shell {
  @apply flex flex-col min-h-screen;
}

.voxel-app-shell__header {
  @apply shrink-0;
}

.voxel-app-shell__body {
  @apply flex flex-1 overflow-hidden bg-[var(--color-surface-light)];
}

.voxel-app-shell__sidebar {
  @apply shrink-0 overflow-y-auto;
}

.voxel-app-shell__main {
  @apply flex-1 overflow-y-auto;
}
</style>
