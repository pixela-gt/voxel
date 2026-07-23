<script setup lang="ts">
import { TabsTrigger as RekaTabsTrigger } from 'reka-ui'

interface TabsTriggerProps {
  value: string
  disabled?: boolean
}

const props = withDefaults(defineProps<TabsTriggerProps>(), {
  disabled: false,
})
</script>

<template>
  <RekaTabsTrigger
    :value="props.value"
    :disabled="props.disabled"
    class="voxel-tabs__trigger"
    v-bind="$attrs"
  >
    <slot />
  </RekaTabsTrigger>
</template>

<style scoped>
.voxel-tabs__trigger {
  @apply relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-tabs__trigger[data-state="active"] {
  @apply bg-white shadow-sm text-[var(--color-primary-base)];
}

.voxel-tabs__trigger[data-state="inactive"] {
  @apply text-[var(--color-text-secondary)];
}

.voxel-tabs__trigger[data-state="inactive"]:hover {
  @apply text-[var(--color-text-primary)];
}
</style>