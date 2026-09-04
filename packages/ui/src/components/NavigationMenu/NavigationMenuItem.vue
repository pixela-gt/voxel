<script setup lang="ts">
import { NavigationMenuItem as RekaNavigationMenuItem } from 'reka-ui'
import type { NavigationMenuItemProps } from './NavigationMenu.types'

const props = defineProps<NavigationMenuItemProps>()
</script>

<template>
  <RekaNavigationMenuItem :value="props.value" v-bind="$attrs">
    <slot />
  </RekaNavigationMenuItem>
</template>
