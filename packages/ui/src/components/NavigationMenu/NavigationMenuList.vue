<script setup lang="ts">
import { NavigationMenuList as RekaNavigationMenuList } from 'reka-ui'
import type { NavigationMenuListProps } from './NavigationMenu.types'

defineProps<NavigationMenuListProps>()
</script>

<template>
  <RekaNavigationMenuList class="voxel-navigation-menu__list" v-bind="$attrs">
    <slot />
  </RekaNavigationMenuList>
</template>
