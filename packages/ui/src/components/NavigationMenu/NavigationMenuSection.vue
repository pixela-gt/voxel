<script setup lang="ts">
import type { NavigationMenuSectionProps } from './NavigationMenu.types'

const props = defineProps<NavigationMenuSectionProps>()
</script>

<template>
  <div class="voxel-navigation-menu__section" :class="props.class">
    <slot />
  </div>
</template>
