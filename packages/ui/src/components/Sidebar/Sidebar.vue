<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, provide, watch } from 'vue'
import type { SidebarProps } from './Sidebar.types'
import { SIDEBAR_KEY } from './Sidebar.types'
import { useSidebar } from '../../composables/useSidebar'
import { Menu, X } from '@lucide/vue'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsed: false,
  visible: true,
  mobileToggle: false,
  breakpoint: '768px',
  ariaLabel: 'Main navigation',
})

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
  'update:visible': [value: boolean]
  close: []
}>()

const sidebar = useSidebar({ id: props.id })

// One-way sync: prop → composable (initialize composable state from prop)
watch(() => props.collapsed, (val) => {
  sidebar.setCollapsed(val)
}, { immediate: true })

watch(() => props.visible, (val) => {
  sidebar.setVisible(val)
}, { immediate: true })

// Two-way sync: composable → prop (emit when composable state changes via toggle/programmatic)
let emitting = false
watch(sidebar.collapsed, (val) => {
  if (!emitting && val !== props.collapsed) {
    emitting = true
    emit('update:collapsed', val)
    emitting = false
  }
})

watch(sidebar.visible, (val) => {
  if (!emitting && val !== props.visible) {
    emitting = true
    emit('update:visible', val)
    emitting = false
  }
})

provide(SIDEBAR_KEY, {
  collapsed: sidebar.collapsed,
  toggle: sidebar.toggle,
  setCollapsed: sidebar.setCollapsed,
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

const rootClass = computed(() => [
  'vx-sidebar',
  {
    'vx-sidebar--collapsed': sidebar.collapsed.value,
    'vx-sidebar--mobile': isMobile.value,
    'vx-sidebar--hidden': isMobile.value && !sidebar.visible.value,
  },
  props.class,
])

function handleBackdropClick() {
  sidebar.hide()
  emit('close')
}
</script>

<template>
  <nav
    :class="rootClass"
    :aria-label="props.ariaLabel"
  >
    <div v-if="$slots.title" class="vx-sidebar__title">
      <slot name="title" />
    </div>

    <div class="vx-sidebar__nav">
      <slot />
    </div>

    <div class="vx-sidebar__bottom">
      <slot name="bottom" />
    </div>

    <button
      v-if="mobileToggle && isMobile"
      type="button"
      class="vx-sidebar__mobile-toggle"
      :aria-label="sidebar.visible.value ? 'Close menu' : 'Open menu'"
      @click="sidebar.visible.value ? sidebar.hide() : sidebar.show()"
    >
      <component :is="sidebar.visible.value ? X : Menu" :size="18" />
    </button>
  </nav>

  <div
    v-if="isMobile"
    class="vx-sidebar__backdrop"
    :class="{ 'vx-sidebar__backdrop--hidden': !sidebar.visible.value }"
    aria-hidden="true"
    @click="handleBackdropClick"
  />
</template>

<style scoped>
.vx-sidebar {
  @apply flex flex-col h-full transition-all duration-300 ease-out;
  width: var(--sidebar-width, 255px);
  background-color: var(--sidebar-bg, #4f46e5);
  color: var(--sidebar-text, #ffffff);
}

.vx-sidebar--collapsed {
  width: var(--sidebar-collapsed-width, 64px);
}

.vx-sidebar--mobile {
  @apply fixed inset-y-0 left-0 z-50;
  width: var(--sidebar-width, 255px);
}

.vx-sidebar--mobile.vx-sidebar--collapsed {
  width: var(--sidebar-width, 255px);
}

.vx-sidebar--mobile.vx-sidebar--hidden {
  @apply -translate-x-full opacity-0 pointer-events-none;
}

.vx-sidebar__title {
  @apply flex items-center justify-center shrink-0 px-4 py-4;
}

.vx-sidebar__nav {
  @apply flex-1 min-h-0 overflow-y-auto py-3;
}

.vx-sidebar__bottom {
  @apply shrink-0 px-2 py-3;
}

.vx-sidebar__mobile-toggle {
  @apply absolute top-4 right-0 z-10
    flex items-center justify-center
    w-9 h-9 rounded-full
    translate-x-1/2
    bg-[var(--color-surface-base)] text-[var(--color-text-primary)]
    border border-[var(--color-grey-200)]
    shadow-md
    cursor-pointer
    transition-colors
    hover:bg-[var(--color-grey-50)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)];
}

.vx-sidebar__backdrop {
  @apply fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity;
}

.vx-sidebar__backdrop--hidden {
  @apply opacity-0 pointer-events-none;
}

.dark .vx-sidebar {
  background-color: var(--sidebar-bg-dark, #3730a3);
  color: var(--sidebar-text-dark, #ffffff);
}
</style>
