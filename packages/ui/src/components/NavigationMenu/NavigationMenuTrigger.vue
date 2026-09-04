<script setup lang="ts">
import { NavigationMenuTrigger as RekaNavigationMenuTrigger } from 'reka-ui'
import type { NavigationMenuTriggerProps } from './NavigationMenu.types'

defineProps<NavigationMenuTriggerProps>()
</script>

<template>
  <RekaNavigationMenuTrigger class="voxel-navigation-menu__trigger" v-bind="$attrs">
    <slot />
    <svg class="voxel-navigation-menu__caret" width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M3 4L5 6L7 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </RekaNavigationMenuTrigger>
</template>
