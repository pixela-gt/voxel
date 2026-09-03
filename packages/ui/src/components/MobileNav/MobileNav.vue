<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Drawer } from '../Drawer'
import type { MobileNavProps } from './MobileNav.types'

const props = withDefaults(defineProps<MobileNavProps>(), {
  breakpoint: '768px',
  title: '',
})

const isMobile = ref(false)
let mediaQuery: MediaQueryList | null = null

function updateMatches() {
  isMobile.value = mediaQuery?.matches ?? false
}

onMounted(() => {
  mediaQuery = window.matchMedia(`(max-width: ${props.breakpoint})`)
  updateMatches()
  mediaQuery.addEventListener('change', updateMatches)
})

onUnmounted(() => {
  mediaQuery?.removeEventListener('change', updateMatches)
})

// Only render Drawer on mobile
const showDrawer = computed(() => isMobile.value)

// ponytail: filter undefined from class array to avoid type mismatch with Drawer's ClassValue
const drawerClass = computed(() => ['vx-mobilenav', props.class].filter(Boolean).join(' '))
</script>

<template>
  <Drawer
    v-if="showDrawer"
    side="left"
    :class="drawerClass"
    v-bind="$attrs"
  >
    <template #content>
      <slot />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </Drawer>
</template>

<style scoped>
.vx-mobilenav {
  /* MobileNav-specific overrides if needed */
}
</style>
