<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, provide } from 'vue'
import type { SidebarProps } from './Sidebar.types'
import { isSidebarGroup, isSidebarItem, SIDEBAR_KEY } from './Sidebar.types'
import SidebarItem from './SidebarItem.vue'
import SidebarItemGroup from './SidebarItemGroup.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsed: false,
  visible: true,
  breakpoint: '768px',
  ariaLabel: 'Main navigation',
})

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
  'update:visible': [value: boolean]
  close: []
}>()

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

provide(SIDEBAR_KEY, {
  collapsed: computed(() => props.collapsed),
})

const rootClass = computed(() => [
  'vx-sidebar',
  {
    'vx-sidebar--collapsed': props.collapsed,
    'vx-sidebar--mobile': isMobile.value,
    'vx-sidebar--hidden': isMobile.value && !props.visible,
  },
  props.class,
])

function handleBackdropClick() {
  emit('update:visible', false)
  emit('close')
}
</script>

<template>
  <div v-bind="$attrs" class="vx-sidebar-root">
    <nav
      :class="rootClass"
      :aria-label="props.ariaLabel"
    >
      <div v-if="$slots.title" class="vx-sidebar__title">
        <slot name="title" />
      </div>

      <div class="vx-sidebar__nav">
        <template v-for="(item, idx) in props.items" :key="idx">
          <SidebarItem
            v-if="isSidebarItem(item)"
            :icon="item.icon"
            :label="item.label"
            :href="item.href || item.to"
            :badge="item.badge"
            :active="item.active"
            :disabled="item.disabled"
            :sub="item.sub"
          />
          <SidebarItemGroup
            v-else-if="isSidebarGroup(item)"
            :icon="item.icon"
            :label="item.label"
            :defaultOpen="item.defaultOpen"
            :disabled="item.disabled"
          >
            <SidebarItem
              v-for="(sub, subIdx) in item.items"
              :key="subIdx"
              :icon="sub.icon"
              :label="sub.label"
              :href="sub.href || sub.to"
              :badge="sub.badge"
              :active="sub.active"
              :disabled="sub.disabled"
              sub
            />
          </SidebarItemGroup>
        </template>
        <slot />
      </div>

      <div class="vx-sidebar__bottom">
        <slot name="bottom" />
      </div>
    </nav>

    <div
      v-if="isMobile"
      class="vx-sidebar__backdrop"
      :class="{ 'vx-sidebar__backdrop--hidden': !props.visible }"
      aria-hidden="true"
      @click="handleBackdropClick"
    />
  </div>
</template>

<style scoped>
.vx-sidebar-root {
  position: inherit;
  z-index: inherit;
}

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
  @apply absolute inset-y-0 left-0 z-50;
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

.vx-sidebar__backdrop {
  @apply absolute inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity;
}

.vx-sidebar__backdrop--hidden {
  @apply opacity-0 pointer-events-none;
}

.dark .vx-sidebar {
  background-color: var(--sidebar-bg-dark, #3730a3);
  color: var(--sidebar-text-dark, #ffffff);
}
</style>
