<script setup lang="ts">
import { NavigationMenuContent as RekaNavigationMenuContent } from 'reka-ui'
import type { NavigationMenuContentProps } from './NavigationMenu.types'

defineProps<NavigationMenuContentProps>()
</script>

<template>
  <RekaNavigationMenuContent class="voxel-navigation-menu__content" v-bind="$attrs">
    <slot />
  </RekaNavigationMenuContent>
</template>
