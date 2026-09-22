<script setup lang="ts">
import { computed, inject } from 'vue'
import { DropdownMenuItem } from 'reka-ui'
import { Icon } from '../Icon'
import type { DropdownMenuItemProps } from './DropdownMenu.types'
import { DROPDOWN_MENU_KEY } from './DropdownMenu.types'

const props = withDefaults(defineProps<DropdownMenuItemProps>(), {
  disabled: false,
})

const ctx = inject(DROPDOWN_MENU_KEY, null)

const rootClass = computed(() => [
  'voxel-dropdown-menu__item',
  {
    'voxel-dropdown-menu__item--destructive': props.destructive,
  },
  props.class,
])
</script>

<template>
  <DropdownMenuItem
    :disabled="disabled"
    :class="rootClass"
    @select="() => props.value && ctx?.onSelect(props.value)"
  >
    <Icon v-if="props.icon" :icon="props.icon" size="small" class="voxel-dropdown-menu__item-icon" />
    <slot />
  </DropdownMenuItem>
</template>

<style>
.voxel-dropdown-menu__item {
  @apply relative flex items-center gap-2
    rounded-md px-2 py-1.5
    text-sm text-[var(--color-text-primary)]
    cursor-pointer select-none outline-none
    data-[highlighted]:bg-[var(--color-primary-lighten-1)] data-[highlighted]:text-[var(--color-primary-base)]
    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed;
}

.voxel-dropdown-menu__item--destructive {
  @apply text-[var(--color-error-base)]
    data-[highlighted]:bg-[var(--color-error-lighten-1)] data-[highlighted]:text-[var(--color-error-base)];
}

.voxel-dropdown-menu__item-icon {
  @apply text-[var(--color-text-muted)]
    data-[highlighted]:text-[var(--color-primary-base)];
}
</style>
