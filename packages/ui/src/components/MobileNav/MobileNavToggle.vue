<script setup lang="ts">
import { Menu } from '@lucide/vue'
import type { MobileNavToggleProps } from './MobileNav.types'

const props = withDefaults(defineProps<MobileNavToggleProps>(), {
  ariaLabel: 'Toggle navigation',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    type="button"
    :class="['vx-mobilenav__toggle', props.class]"
    :aria-label="props.ariaLabel"
    @click="(e: MouseEvent) => emit('click', e)"
  >
    <slot>
      <component :is="props.icon || Menu" :size="20" />
    </slot>
  </button>
</template>

<style scoped>
.vx-mobilenav__toggle {
  @apply inline-flex items-center justify-center
    w-10 h-10 rounded-md
    text-[var(--color-text-primary)]
    cursor-pointer
    transition-colors
    hover:bg-[var(--color-surface-light)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}
</style>
