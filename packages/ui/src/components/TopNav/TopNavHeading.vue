<script setup lang="ts">
import type { TopNavHeadingProps } from './TopNav.types'

const props = defineProps<TopNavHeadingProps>()
</script>

<template>
  <div :class="['vx-topnav__heading', props.class]">
    <slot />
  </div>
</template>

<style scoped>
.vx-topnav__heading {
  @apply text-lg font-semibold text-[var(--color-text-primary)];
}
</style>
