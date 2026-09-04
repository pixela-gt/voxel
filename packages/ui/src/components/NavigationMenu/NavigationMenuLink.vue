<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import { NavigationMenuLink as RekaNavigationMenuLink } from 'reka-ui'
import type { NavigationMenuLinkProps } from './NavigationMenu.types'

const props = withDefaults(defineProps<NavigationMenuLinkProps>(), {
  exact: false,
  active: false,
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
  <RekaNavigationMenuLink
    as-child
    :active="props.active"
    class="voxel-navigation-menu__link"
  >
    <component :is="linkIs" v-bind="linkBind">
      <slot />
    </component>
  </RekaNavigationMenuLink>
</template>
