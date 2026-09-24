<script setup lang="ts">
import { computed, provide } from 'vue'
import { MoreVertical } from '@lucide/vue'
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
} from 'reka-ui'
import { Icon } from '../Icon'
import type { MoreMenuProps } from './MoreMenu.types'
import { MORE_MENU_KEY } from './MoreMenu.types'

const props = withDefaults(defineProps<MoreMenuProps>(), {
  sideOffset: 4,
  align: 'end',
})

const emit = defineEmits<{
  select: [value: string]
  'update:open': [open: boolean]
}>()

provide(MORE_MENU_KEY, {
  onSelect: (value: string) => emit('select', value),
})

const rootClass = computed(() => ['voxel-more-menu', props.class])
</script>

<template>
  <DropdownMenuRoot
    @update:open="(v: boolean) => emit('update:open', v)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <DropdownMenuTrigger class="voxel-more-menu__trigger">
      <slot name="trigger">
        <Icon :icon="MoreVertical" size="default" />
      </slot>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent class="voxel-more-menu__content" :side-offset="sideOffset" :align="align">
        <slot />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<style>
.voxel-more-menu {
  @apply inline-flex;
}

.voxel-more-menu__trigger {
  @apply inline-flex items-center justify-center
    size-9 rounded-[18px]
    text-[var(--color-text-secondary)]
    hover:bg-[var(--color-grey-100)] hover:text-[var(--color-text-primary)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    transition-colors duration-[var(--transition-fast)];
}

.voxel-more-menu__content {
  @apply min-w-[160px]
    bg-[var(--color-surface-base)]
    rounded-lg shadow-[var(--shadow-md)]
    border border-[var(--color-grey-200)]
    p-1
    focus-visible:outline-none z-50;
}
</style>
