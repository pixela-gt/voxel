<script setup lang="ts">
import { computed } from 'vue'
import {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from 'reka-ui'
import type { ContextMenuProps } from './ContextMenu.types'

const props = withDefaults(defineProps<ContextMenuProps>(), {
  modal: true,
  pressOpenDelay: 700,
} as const)

const emit = defineEmits<{
  select: [value: string]
  'update:open': [open: boolean]
}>()

const rootClass = computed(() => ['voxel-context-menu', props.class])
</script>

<template>
  <ContextMenuRoot
    :modal="props.modal"
    :pressOpenDelay="props.pressOpenDelay"
    @update:open="(v: boolean) => emit('update:open', v)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <ContextMenuTrigger class="voxel-context-menu__trigger">
      <slot name="trigger">
        <span>Right-click here</span>
      </slot>
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent class="voxel-context-menu__content" :side-offset="4">
        <template v-for="(item, idx) in props.items" :key="idx">
          <ContextMenuSeparator v-if="item.separator" class="voxel-context-menu__separator" />
          <ContextMenuItem
            v-else
            :disabled="item.disabled"
            class="voxel-context-menu__item"
            @select="() => item.value && emit('select', item.value)"
          >
            <span>{{ item.label }}</span>
          </ContextMenuItem>
        </template>
        <slot />
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>

<style>
.voxel-context-menu {
  @apply inline-flex;
}

.voxel-context-menu__trigger {
  @apply inline-flex items-center justify-center
    px-4 py-2 rounded-md
    bg-[var(--color-surface-base)]
    border border-dashed border-[var(--color-grey-400)]
    text-sm text-[var(--color-text-secondary)]
    cursor-context-menu;
}

.voxel-context-menu__content {
  @apply min-w-[180px]
    bg-[var(--color-surface-base)]
    rounded-lg shadow-[var(--shadow-md)]
    border border-[var(--color-grey-200)]
    p-1
    focus-visible:outline-none z-50;
}

.voxel-context-menu__item {
  @apply relative flex items-center gap-2
    rounded-md px-2 py-1.5
    text-sm text-[var(--color-text-primary)]
    cursor-pointer select-none outline-none
    data-[highlighted]:bg-[var(--color-primary-lighten-1)] data-[highlighted]:text-[var(--color-primary-base)]
    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed;
}

.voxel-context-menu__separator {
  @apply h-px bg-[var(--color-grey-200)] my-1;
}
</style>
