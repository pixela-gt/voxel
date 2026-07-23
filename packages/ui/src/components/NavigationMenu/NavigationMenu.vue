<script setup lang="ts">
import { computed } from 'vue'
import {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from 'reka-ui'
import type { NavigationMenuProps } from './NavigationMenu.types'

const props = withDefaults(defineProps<NavigationMenuProps>(), {
  orientation: 'horizontal',
  delayDuration: 200,
  skipDelayDuration: 300,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const rootClass = computed(() => ['voxel-navigation-menu', `voxel-navigation-menu--${props.orientation}`, props.class])
</script>

<template>
  <NavigationMenuRoot
    :modelValue="props.modelValue"
    :defaultValue="props.defaultValue"
    :orientation="props.orientation"
    :delayDuration="props.delayDuration"
    :skipDelayDuration="props.skipDelayDuration"
    @update:modelValue="(v: string) => emit('update:modelValue', v)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <NavigationMenuList class="voxel-navigation-menu__list">
      <template v-for="(item, idx) in props.items ?? []" :key="idx">
        <NavigationMenuItem v-if="item.items?.length" :value="item.value">
          <NavigationMenuTrigger class="voxel-navigation-menu__trigger">
            {{ item.label }}
            <svg class="voxel-navigation-menu__caret" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 4L5 6L7 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </NavigationMenuTrigger>
          <NavigationMenuContent class="voxel-navigation-menu__content">
            <ul class="voxel-navigation-menu__sub-list">
              <li v-for="(sub, subIdx) in item.items" :key="subIdx" class="voxel-navigation-menu__sub-item">
                <NavigationMenuLink :href="sub.href" class="voxel-navigation-menu__link">
                  <div class="voxel-navigation-menu__link-label">{{ sub.label }}</div>
                  <p v-if="sub.description" class="voxel-navigation-menu__link-description">{{ sub.description }}</p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem v-else>
          <NavigationMenuLink :href="item.href" class="voxel-navigation-menu__link voxel-navigation-menu__link--inline">
            {{ item.label }}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </template>
      <slot />
    </NavigationMenuList>
    <NavigationMenuIndicator class="voxel-navigation-menu__indicator">
      <div class="voxel-navigation-menu__indicator-arrow" />
    </NavigationMenuIndicator>
    <NavigationMenuViewport class="voxel-navigation-menu__viewport" />
  </NavigationMenuRoot>
</template>

<style scoped>
.voxel-navigation-menu {
  @apply relative w-full;
}

.voxel-navigation-menu__list {
  @apply inline-flex items-center gap-1
    list-none m-0 p-0;
}

.voxel-navigation-menu--vertical .voxel-navigation-menu__list {
  @apply flex-col items-stretch;
}

.voxel-navigation-menu__trigger {
  @apply inline-flex items-center gap-1
    px-3 h-9 rounded-md
    text-sm font-medium text-[var(--color-text-primary)]
    cursor-pointer
    transition-colors
    hover:bg-[var(--color-grey-100)]
    data-[state=open]:bg-[var(--color-primary-lighten-1)] data-[state=open]:text-[var(--color-primary-base)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-navigation-menu__caret {
  @apply text-[var(--color-text-secondary)] transition-transform;
}

[data-state='open'] > .voxel-navigation-menu__caret,
[data-state='open'] .voxel-navigation-menu__caret {
  @apply rotate-180;
}

.voxel-navigation-menu__content {
  @apply p-3
    bg-[var(--color-surface-base)]
    rounded-lg shadow-[var(--shadow-md)]
    border border-[var(--color-grey-200)]
    focus-visible:outline-none;
}

.voxel-navigation-menu__sub-list {
  @apply flex flex-col gap-1 list-none m-0 p-0
    min-w-[200px];
}

.voxel-navigation-menu__sub-item {
  @apply list-none;
}

.voxel-navigation-menu__link {
  @apply flex flex-col gap-0.5
    px-3 py-2 rounded-md
    no-underline
    cursor-pointer
    transition-colors
    hover:bg-[var(--color-primary-lighten-1)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-navigation-menu__link--inline {
  @apply inline-flex items-center
    px-3 h-9 rounded-md
    text-sm font-medium text-[var(--color-text-primary)]
    hover:bg-[var(--color-grey-100)];
}

.voxel-navigation-menu__link-label {
  @apply text-sm font-medium text-[var(--color-text-primary)];
}

.voxel-navigation-menu__link-description {
  @apply text-xs text-[var(--color-text-secondary)] leading-snug;
}

.voxel-navigation-menu__indicator {
  @apply flex items-end justify-center
    h-2 top-full
    transition-all
    overflow-hidden z-50;
}

.voxel-navigation-menu__indicator-arrow {
  @apply relative top-[70%] size-2 rotate-45
    bg-[var(--color-surface-base)]
    border-r border-b border-[var(--color-grey-200)];
}

.voxel-navigation-menu__viewport {
  @apply absolute top-full left-0
    flex justify-center
    w-full;
}
</style>
