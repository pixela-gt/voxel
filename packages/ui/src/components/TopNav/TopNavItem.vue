<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import { MenubarMenu, MenubarTrigger } from 'reka-ui'
import type { TopNavItemProps } from './TopNav.types'

const props = withDefaults(defineProps<TopNavItemProps>(), {
  active: false,
  disabled: false,
})

const linkIs = computed(() => {
  if (!props.to) return 'a'
  try { return resolveComponent('NuxtLink') } catch {}
  try { return resolveComponent('RouterLink') } catch {}
  return 'a'
})

const linkBind = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href }
  return {}
})
</script>

<template>
  <MenubarMenu value="item">
    <MenubarTrigger
      as-child
      :disabled="props.disabled"
      :class="['vx-topnav__item', { 'vx-topnav__item--active': props.active }]"
    >
      <component :is="linkIs" v-bind="linkBind">
        <slot />
      </component>
    </MenubarTrigger>
  </MenubarMenu>
</template>

<style scoped>
.vx-topnav__item {
  @apply inline-flex items-center
    px-3 h-9 rounded-md
    text-sm font-medium text-[var(--color-text-primary)]
    no-underline
    cursor-pointer
    transition-colors
    hover:bg-[var(--color-surface-light)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed;
}

.vx-topnav__item--active {
  @apply bg-[var(--color-primary-lighten-1)]/12 text-[var(--color-primary-base)];
}
</style>
