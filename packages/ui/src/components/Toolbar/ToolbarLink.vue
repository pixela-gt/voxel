<script setup lang="ts">
import { computed } from 'vue'
import { ToolbarLink as RekaToolbarLink } from 'reka-ui'
import type { ToolbarLinkProps } from './Toolbar.types'

const props = withDefaults(defineProps<ToolbarLinkProps>(), {
  color: 'primary',
  size: 'default',
  density: 'default',
  disabled: false,
})

const linkClasses = computed(() => [
  'voxel-toolbar-link',
  `voxel-toolbar-link--color-${props.color}`,
  `voxel-toolbar-link--size-${props.size}`,
  `voxel-toolbar-link--density-${props.density}`,
  props.class,
])
</script>

<template>
  <RekaToolbarLink
    :disabled="props.disabled"
    :class="linkClasses"
    v-bind="$attrs"
  >
    <slot>{{ props.label }}</slot>
  </RekaToolbarLink>
</template>

<style scoped>
.voxel-toolbar-link {
  @apply inline-flex items-center justify-center whitespace-nowrap font-sans antialiased font-medium;
}

/* Colors */
.voxel-toolbar-link--color-primary {
  @apply text-[var(--color-primary-base)];
}
.voxel-toolbar-link--color-secondary {
  @apply text-[var(--color-secondary-base)];
}

/* Sizes */
.voxel-toolbar-link--size-small {
  @apply text-[12px] leading-[16px] tracking-[0.06px];
}
.voxel-toolbar-link--size-default {
  @apply text-[14px] leading-[20px] tracking-[0.07px];
}
.voxel-toolbar-link--size-large {
  @apply text-[16px] leading-[24px] tracking-[0.08px];
}

/* Density */
.voxel-toolbar-link--size-default.voxel-toolbar-link--density-default {
  @apply gap-[6px] p-[4px];
}
.voxel-toolbar-link--size-default.voxel-toolbar-link--density-dense {
  @apply gap-[6px] px-[4px] py-[2px];
}
.voxel-toolbar-link--size-small.voxel-toolbar-link--density-default {
  @apply gap-[6px] p-[4px];
}
.voxel-toolbar-link--size-small.voxel-toolbar-link--density-dense {
  @apply gap-[6px] px-[4px] py-[2px];
}
.voxel-toolbar-link--size-large.voxel-toolbar-link--density-default {
  @apply gap-[6px] p-[4px];
}
.voxel-toolbar-link--size-large.voxel-toolbar-link--density-dense {
  @apply gap-[6px] px-[4px] py-[2px];
}
</style>
