<script setup lang="ts">
import { computed, inject, resolveComponent } from 'vue'
import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'
import type { SidebarItemProps } from './Sidebar.types'
import { SIDEBAR_KEY } from './Sidebar.types'

const props = withDefaults(defineProps<SidebarItemProps>(), {
  active: false,
  disabled: false,
  sub: false,
})

const ctx = inject(SIDEBAR_KEY, null)
const collapsed = computed(() => ctx?.collapsed.value ?? false)

const hasBadge = computed(() => props.badge != null && props.badge !== '')

const linkIs = computed(() => {
  if (!props.to) return 'a'
  try {
    return resolveComponent('RouterLink')
  }
  catch {
    return 'a'
  }
})

const linkBind = computed(() => props.to ? { to: props.to } : { href: props.href })

function badgeText(badge: string | number) {
  return typeof badge === 'number' && badge > 99 ? '99+' : String(badge)
}
</script>

<template>
  <Tooltip v-if="collapsed" :text="props.label || ''" position="right">
    <component :is="linkIs" v-bind="linkBind" :class="[
      'vx-sidebar-item',
      'vx-sidebar-item--collapsed',
      {
        'vx-sidebar-item--active': props.active,
        'vx-sidebar-item--disabled': props.disabled,
        'vx-sidebar-item--sub': props.sub,
      },
      props.class,
    ]" :aria-current="props.active ? 'page' : undefined" :aria-disabled="props.disabled ? 'true' : undefined">
      <slot>
        <span class="vx-sidebar-item__content">
          <Icon v-if="props.icon" :icon="props.icon" class="vx-sidebar-item__icon" />
          <span class="vx-sidebar-item__sr-only">{{ props.label }}</span>
          <span v-if="hasBadge" class="vx-sidebar-item__badge" />
        </span>
      </slot>
    </component>
  </Tooltip>

  <component :is="linkIs" v-else v-bind="linkBind" :class="[
    'vx-sidebar-item',
    {
      'vx-sidebar-item--active': props.active,
      'vx-sidebar-item--disabled': props.disabled,
      'vx-sidebar-item--sub': props.sub,
    },
    props.class,
  ]" :aria-current="props.active ? 'page' : undefined" :aria-disabled="props.disabled ? 'true' : undefined">
    <slot>
      <span class="vx-sidebar-item__content">
        <Icon v-if="props.icon" :icon="props.icon" class="vx-sidebar-item__icon" />
        <span class="vx-sidebar-item__label">{{ props.label }}</span>
        <span v-if="hasBadge" class="vx-sidebar-item__badge">
          <slot name="badge">
            {{ badgeText(props.badge!) }}
          </slot>
        </span>
      </span>
    </slot>
  </component>
</template>

<style>
.vx-sidebar-item {
  @apply flex items-center w-full text-sm font-medium no-underline cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1;
  border-right: 2px solid transparent;
  --tw-ring-color: color-mix(in srgb, var(--sidebar-active-color, #ffffff) 50%, transparent);
  color: var(--sidebar-text, #ffffff);
}

.vx-sidebar-item__content {
  @apply flex items-center gap-3 px-4 py-2 w-full;
  position: relative;
}

.vx-sidebar-item--collapsed .vx-sidebar-item__content {
  @apply px-0 justify-center;
}

.vx-sidebar-item:hover:not(.vx-sidebar-item--disabled) {
  background-color: var(--sidebar-hover-bg, rgba(255, 255, 255, 0.1));
}

.vx-sidebar-item--active {
  border-right-color: var(--sidebar-active-color, #ffffff);
  background-color: var(--sidebar-hover-bg, rgba(255, 255, 255, 0.1));
}

.vx-sidebar-item--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.vx-sidebar-item--sub .vx-sidebar-item__content {
  @apply pl-11;
}

.vx-sidebar-item__icon {
  @apply size-5 shrink-0;
}

.vx-sidebar-item__label {
  @apply flex-1 whitespace-nowrap overflow-hidden text-ellipsis;
  opacity: 1;
  transition: opacity 300ms ease;
}

.vx-sidebar-item--collapsed .vx-sidebar-item__label {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
  clip: rect(0, 0, 0, 0);
  opacity: 0;
}

.vx-sidebar-item__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.vx-sidebar-item__badge {
  @apply inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full text-[10px] font-semibold tabular-nums;
  position: relative;
  background-color: var(--sidebar-active-color, #ffffff);
  color: var(--sidebar-bg, #4f46e5);
}

.vx-sidebar-item--collapsed .vx-sidebar-item__badge {
  position: absolute;
  top: 2px;
  left: calc(50% + 10px);
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  min-width: 10px;
  padding: 0;
  font-size: 0;
  color: transparent;
  overflow: hidden;
  border-radius: 50%;
  background-color: var(--sidebar-active-color, #ffffff);
}

/* Dark mode */
.dark .vx-sidebar-item:hover:not(.vx-sidebar-item--disabled) {
  background-color: var(--sidebar-hover-bg-dark, rgba(255, 255, 255, 0.15));
}

.dark .vx-sidebar-item--active {
  background-color: var(--sidebar-hover-bg-dark, rgba(255, 255, 255, 0.15));
  border-right-color: var(--sidebar-active-color-dark, #ffffff);
}

.dark .vx-sidebar-item__badge {
  background-color: var(--sidebar-active-color-dark, #ffffff);
  color: var(--sidebar-bg-dark, #3730a3);
}
</style>
