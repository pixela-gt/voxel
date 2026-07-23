<script setup lang="ts">
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'reka-ui'
</script>

<template>
  <DropdownMenuRoot v-bind="$attrs">
    <DropdownMenuTrigger class="voxel-dropdown__trigger">
      <slot name="trigger" />
    </DropdownMenuTrigger>

    <DropdownMenuContent class="voxel-dropdown__content" :side-offset="4">
      <DropdownMenuItem v-for="item in 5" :key="item" class="voxel-dropdown__item">
        <slot name="item" :item="item"> Menu Item {{ item }} </slot>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>

<style scoped>
.voxel-dropdown__trigger {
  @apply inline-flex items-center justify-center gap-1.5 px-6 py-3 text-sm font-bold rounded-xl
    bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)]
    hover:bg-[var(--color-primary-darken-1)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150;
}

.voxel-dropdown__content {
  @apply bg-[var(--color-surface-base)] rounded-[6px] shadow-[var(--shadow-md)]
    border border-[var(--color-grey-200)] min-w-[160px] p-1
    focus-visible:outline-none;
}

.voxel-dropdown__item {
  @apply relative flex items-center gap-2 rounded-[6px] px-2 py-2
    text-[11px] font-medium text-[var(--color-info-base)] outline-none
    focus:bg-[var(--color-primary-lighten-1)] focus:text-[var(--color-primary-base)]
    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed;
}
</style>
