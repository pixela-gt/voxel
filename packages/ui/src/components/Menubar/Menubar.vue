<script setup lang="ts">
import { computed } from 'vue'
import {
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarPortal,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from 'reka-ui'
import type { MenubarProps } from './Menubar.types'

const props = withDefaults(defineProps<MenubarProps>(), {
  loop: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  select: [value: string]
}>()

const rootClass = computed(() => ['voxel-menubar', props.class])
</script>

<template>
  <MenubarRoot
    :modelValue="props.modelValue"
    :defaultValue="props.defaultValue"
    :loop="props.loop"
    @update:modelValue="(v: boolean) => emit('update:modelValue', String(v))"
    :class="rootClass"
    v-bind="$attrs"
  >
    <MenubarMenu v-for="menu in props.items" :key="menu.value" :value="menu.value">
      <MenubarTrigger class="voxel-menubar__trigger" :disabled="menu.disabled">
        {{ menu.label }}
      </MenubarTrigger>
      <MenubarPortal>
        <MenubarContent class="voxel-menubar__content" :side-offset="4" align="start">
          <template v-for="(item, idx) in menu.items ?? []" :key="idx">
            <MenubarSeparator v-if="item.separator" class="voxel-menubar__separator" />
            <MenubarSub v-else-if="item.items?.length">
              <MenubarSubTrigger class="voxel-menubar__item voxel-menubar__item--sub">
                <span>{{ item.label }}</span>
                <svg class="voxel-menubar__chevron" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M4 3L6 5L4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </MenubarSubTrigger>
              <MenubarPortal>
                <MenubarSubContent class="voxel-menubar__content" :side-offset="4" :align-offset="-4">
                  <MenubarItem
                    v-for="sub in item.items"
                    :key="sub.value"
                    :disabled="sub.disabled"
                    class="voxel-menubar__item"
                    @select="() => emit('select', sub.value)"
                  >
                    {{ sub.label }}
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarPortal>
            </MenubarSub>
            <MenubarItem
              v-else
              :disabled="item.disabled"
              class="voxel-menubar__item"
              @select="() => item.value && emit('select', item.value)"
            >
              {{ item.label }}
            </MenubarItem>
          </template>
        </MenubarContent>
      </MenubarPortal>
    </MenubarMenu>
    <slot />
  </MenubarRoot>
</template>

<style scoped>
.voxel-menubar {
  @apply inline-flex items-center gap-1
    bg-[var(--color-surface-base)]
    border border-[var(--color-grey-200)]
    rounded-lg p-1
    shadow-sm;
}

.voxel-menubar__trigger {
  @apply inline-flex items-center justify-center
    px-3 h-8 rounded-md
    text-sm font-medium text-[var(--color-text-primary)]
    cursor-pointer
    transition-colors
    hover:bg-[var(--color-grey-100)]
    data-[state=open]:bg-[var(--color-primary-lighten-1)] data-[state=open]:text-[var(--color-primary-base)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed;
}

.voxel-menubar__content {
  @apply min-w-[200px]
    bg-[var(--color-surface-base)]
    rounded-lg shadow-[var(--shadow-md)]
    border border-[var(--color-grey-200)]
    p-1
    focus-visible:outline-none z-50;
}

.voxel-menubar__item {
  @apply relative flex items-center justify-between gap-4
    rounded-md px-2 py-1.5
    text-sm text-[var(--color-text-primary)]
    cursor-pointer select-none outline-none
    data-[highlighted]:bg-[var(--color-primary-lighten-1)] data-[highlighted]:text-[var(--color-primary-base)]
    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed;
}

.voxel-menubar__item--sub {
  @apply pr-1;
}

.voxel-menubar__chevron {
  @apply text-[var(--color-text-secondary)];
}

.voxel-menubar__separator {
  @apply h-px bg-[var(--color-grey-200)] my-1;
}
</style>
