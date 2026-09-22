<script setup lang="ts">
import { computed } from 'vue'
import { MoreVertical } from '@lucide/vue'
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from 'reka-ui'
import { Icon } from '../Icon'
import type { MoreMenuProps } from './MoreMenu.types'

const props = withDefaults(defineProps<MoreMenuProps>(), {
  sideOffset: 4,
  align: 'end',
})

const emit = defineEmits<{
  select: [value: string]
  'update:open': [open: boolean]
}>()

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
        <template v-for="(item, idx) in props.items" :key="idx">
          <DropdownMenuSeparator v-if="item.separator" class="voxel-more-menu__separator" />
          <DropdownMenuItem
            v-else
            :disabled="item.disabled"
            class="voxel-more-menu__item"
            :class="{ 'voxel-more-menu__item--destructive': item.destructive }"
            @select="() => item.value && emit('select', item.value)"
          >
            <Icon v-if="item.icon" :icon="item.icon" size="small" class="voxel-more-menu__item-icon" />
            <span>{{ item.label }}</span>
          </DropdownMenuItem>
        </template>
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

.voxel-more-menu__separator {
  @apply h-px bg-[var(--color-grey-200)] my-1;
}
</style>
