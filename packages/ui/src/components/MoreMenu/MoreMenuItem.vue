<script setup lang="ts">
import { computed, inject } from 'vue'
import { DropdownMenuItem } from 'reka-ui'
import { Icon } from '../Icon'
import type { MoreMenuItemProps } from './MoreMenu.types'
import { MORE_MENU_KEY } from './MoreMenu.types'

const props = withDefaults(defineProps<MoreMenuItemProps>(), {
  disabled: false,
})

const ctx = inject(MORE_MENU_KEY, null)

const rootClass = computed(() => [
  'voxel-more-menu__item',
  {
    'voxel-more-menu__item--destructive': props.destructive,
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
    <Icon v-if="props.icon" :icon="props.icon" size="small" class="voxel-more-menu__item-icon" />
    <slot />
  </DropdownMenuItem>
</template>

<style>
.voxel-more-menu__item {
  @apply relative flex items-center gap-2
    rounded-md px-2 py-1.5
    text-sm text-[var(--color-text-primary)]
    cursor-pointer select-none outline-none
    data-[highlighted]:bg-[var(--color-primary-lighten-1)] data-[highlighted]:text-[var(--color-primary-base)]
    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed;
}

.voxel-more-menu__item--destructive {
  @apply text-[var(--color-error-base)]
    data-[highlighted]:bg-[var(--color-error-lighten-1)] data-[highlighted]:text-[var(--color-error-base)];
}

.voxel-more-menu__item-icon {
  @apply text-[var(--color-text-muted)]
    data-[highlighted]:text-[var(--color-primary-base)];
}
</style>
