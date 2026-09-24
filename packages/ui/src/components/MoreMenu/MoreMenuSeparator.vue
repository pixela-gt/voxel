<script setup lang="ts">
import { DropdownMenuSeparator } from 'reka-ui'
import type { MoreMenuSeparatorProps } from './MoreMenu.types'

const props = defineProps<MoreMenuSeparatorProps>()
</script>

<template>
  <DropdownMenuSeparator :class="['voxel-more-menu__separator', props.class]" />
</template>

<style>
.voxel-more-menu__separator {
  @apply h-px bg-[var(--color-grey-200)] my-1;
}
</style>
