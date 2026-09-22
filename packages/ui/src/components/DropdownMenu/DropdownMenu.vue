<script setup lang="ts">
import { computed, provide } from 'vue'
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
} from 'reka-ui'
import type { DropdownMenuProps } from './DropdownMenu.types'
import { DROPDOWN_MENU_KEY } from './DropdownMenu.types'

const props = withDefaults(defineProps<DropdownMenuProps>(), {
  sideOffset: 4,
  align: 'start',
  modal: true,
})

const emit = defineEmits<{
  select: [value: string]
  'update:open': [open: boolean]
}>()

provide(DROPDOWN_MENU_KEY, {
  onSelect: (value: string) => emit('select', value),
})

const rootClass = computed(() => ['voxel-dropdown-menu', props.class])
</script>

<template>
  <DropdownMenuRoot
    :modal="props.modal"
    @update:open="(v: boolean) => emit('update:open', v)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <DropdownMenuTrigger class="voxel-dropdown-menu__trigger">
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent class="voxel-dropdown-menu__content" :side-offset="sideOffset" :align="align">
        <slot />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<style>
.voxel-dropdown-menu {
  @apply inline-flex;
}

.voxel-dropdown-menu__trigger {
  @apply inline-flex items-center justify-center outline-none
    focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-dropdown-menu__content {
  @apply min-w-[160px]
    bg-[var(--color-surface-base)]
    rounded-lg shadow-[var(--shadow-md)]
    border border-[var(--color-grey-200)]
    p-1
    focus-visible:outline-none z-50;
}
</style>
