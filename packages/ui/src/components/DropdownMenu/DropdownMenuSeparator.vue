<script setup lang="ts">
import { DropdownMenuSeparator } from 'reka-ui'
import type { DropdownMenuSeparatorProps } from './DropdownMenu.types'

const props = defineProps<DropdownMenuSeparatorProps>()
</script>

<template>
  <DropdownMenuSeparator :class="['voxel-dropdown-menu__separator', props.class]" />
</template>

<style>
.voxel-dropdown-menu__separator {
  @apply h-px bg-[var(--color-grey-200)] my-1;
}
</style>
