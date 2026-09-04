<script setup lang="ts">
import { computed } from 'vue'
import { MenubarRoot } from 'reka-ui'
import type { TopNavProps } from './TopNav.types'

const props = withDefaults(defineProps<TopNavProps>(), {
  variant: 'default',
  dense: false,
})

const rootClass = computed(() => [
  'vx-topnav',
  `vx-topnav--${props.variant}`,
  {
    'vx-topnav--dense': props.dense,
  },
  props.class,
])
</script>

<template>
  <MenubarRoot :class="rootClass" v-bind="$attrs" :loop="false">
    <div class="vx-topnav__start">
      <slot name="start" />
    </div>
    <nav class="vx-topnav__center" aria-label="Main navigation">
      <slot />
    </nav>
    <div class="vx-topnav__end">
      <slot name="end" />
    </div>
  </MenubarRoot>
</template>

<style scoped>
.vx-topnav {
  @apply flex items-center justify-between
    px-4 h-16
    bg-[var(--color-surface-base)]
    border-b border-[var(--color-grey-200)];
}

.vx-topnav--dense {
  @apply h-12;
}

.vx-topnav--boxy {
  @apply rounded-lg shadow-[var(--shadow-lg)];
}

.vx-topnav__start {
  @apply flex items-center gap-4 shrink-0;
}

.vx-topnav__center {
  @apply flex items-center gap-1;
}

.vx-topnav__end {
  @apply flex items-center gap-4 shrink-0;
}
</style>
