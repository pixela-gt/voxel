<script setup lang="ts">
import { computed } from 'vue'
import {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from 'reka-ui'
import type { NavigationMenuProps } from './NavigationMenu.types'

const props = withDefaults(defineProps<NavigationMenuProps>(), {
  orientation: 'horizontal',
  delayDuration: 200,
  skipDelayDuration: 300,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const rootClass = computed(() => ['voxel-navigation-menu', `voxel-navigation-menu--${props.orientation}`, props.class])
</script>

<template>
  <NavigationMenuRoot
    :modelValue="props.modelValue"
    :defaultValue="props.defaultValue"
    :orientation="props.orientation"
    :delayDuration="props.delayDuration"
    :skipDelayDuration="props.skipDelayDuration"
    @update:modelValue="(v: string) => emit('update:modelValue', v)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <NavigationMenuList class="voxel-navigation-menu__list">
      <template v-for="(item, idx) in props.items ?? []" :key="idx">
        <NavigationMenuItem v-if="item.items?.length" :value="item.value">
          <NavigationMenuTrigger class="voxel-navigation-menu__trigger">
            {{ item.label }}
            <svg class="voxel-navigation-menu__caret" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 4L5 6L7 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </NavigationMenuTrigger>
          <NavigationMenuContent class="voxel-navigation-menu__content">
            <ul class="voxel-navigation-menu__sub-list">
              <li v-for="(sub, subIdx) in item.items" :key="subIdx" class="voxel-navigation-menu__sub-item">
                <NavigationMenuLink :href="sub.href" class="voxel-navigation-menu__link">
                  <div class="voxel-navigation-menu__link-label">{{ sub.label }}</div>
                  <p v-if="sub.description" class="voxel-navigation-menu__link-description">{{ sub.description }}</p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem v-else>
          <NavigationMenuLink :href="item.href" class="voxel-navigation-menu__link voxel-navigation-menu__link--inline">
            {{ item.label }}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </template>
      <slot />
    </NavigationMenuList>
    <NavigationMenuIndicator class="voxel-navigation-menu__indicator">
      <div class="voxel-navigation-menu__indicator-arrow" />
    </NavigationMenuIndicator>
    <NavigationMenuViewport class="voxel-navigation-menu__viewport" />
  </NavigationMenuRoot>
</template>

<style>
.voxel-navigation-menu {
  @apply relative w-full;
}

.voxel-navigation-menu__list {
  @apply inline-flex items-center gap-1
    list-none m-0 p-0;
}

.voxel-navigation-menu--vertical .voxel-navigation-menu__list {
  @apply flex-col items-stretch;
}

.voxel-navigation-menu__trigger {
  @apply inline-flex items-center gap-1
    px-3 h-9 rounded-md
    text-sm font-medium text-[var(--color-text-primary)]
    cursor-pointer
    transition-colors
    hover:bg-[var(--color-grey-100)]
    data-[state=open]:bg-[var(--color-primary-lighten-1)]/12 data-[state=open]:text-[var(--color-primary-base)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-navigation-menu__caret {
  @apply text-[var(--color-text-secondary)] transition-transform;
}

[data-state='open'] > .voxel-navigation-menu__caret,
[data-state='open'] .voxel-navigation-menu__caret {
  @apply rotate-180;
}

.voxel-navigation-menu__sub-list {
  @apply flex flex-col gap-1 list-none m-0 p-0
    min-w-[200px];
}

.voxel-navigation-menu__sub-item {
  @apply list-none;
}

.voxel-navigation-menu__link {
  @apply flex flex-col gap-0.5
    px-3 py-2 rounded-md
    no-underline
    cursor-pointer
    transition-colors
    hover:bg-[var(--color-primary-lighten-1)]/12
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-navigation-menu__link--inline {
  @apply inline-flex items-center
    px-3 h-9 rounded-md
    text-sm font-medium text-[var(--color-text-primary)]
    hover:bg-[var(--color-grey-100)];
}

.voxel-navigation-menu__link-label {
  @apply text-sm font-medium text-[var(--color-text-primary)];
}

.voxel-navigation-menu__link-description {
  @apply text-xs text-[var(--color-text-secondary)] leading-snug;
}

/* Plain open/close (first open, Esc dismiss). Declared BEFORE the
   data-motion rules below so directional hand-off wins on switch. */
@keyframes voxel-navmenu-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes voxel-navmenu-out {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-4px); }
}
.voxel-navigation-menu__content[data-state='open'] {
  animation: voxel-navmenu-in var(--transition-normal, 200ms) ease-out;
}
.voxel-navigation-menu__content[data-state='closed'] {
  animation: voxel-navmenu-out var(--transition-fast, 150ms) ease-in;
}

/* Directional hand-off when moving between triggers while the menu is open.
   Must stay AFTER the data-state rules above — both attribute selectors have
   equal specificity, so source order decides which animation applies. */
@keyframes voxel-navmenu-enter-from-left {
  from { opacity: 0; transform: translateX(-24px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes voxel-navmenu-enter-from-right {
  from { opacity: 0; transform: translateX(24px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes voxel-navmenu-exit-to-left {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-24px); }
}
@keyframes voxel-navmenu-exit-to-right {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(24px); }
}

.voxel-navigation-menu__content[data-motion='from-start'] { animation: voxel-navmenu-enter-from-left var(--transition-normal, 200ms) ease; }
.voxel-navigation-menu__content[data-motion='from-end'] { animation: voxel-navmenu-enter-from-right var(--transition-normal, 200ms) ease; }
.voxel-navigation-menu__content[data-motion='to-start'] { animation: voxel-navmenu-exit-to-left var(--transition-normal, 200ms) ease forwards; }
.voxel-navigation-menu__content[data-motion='to-end'] { animation: voxel-navmenu-exit-to-right var(--transition-normal, 200ms) ease forwards; }

/* ── Indicator (caret/marker) ──────────────────────────────────────────────
   Official reka pattern: position via translateX(var(--indicator-position)),
   NOT `left` — and it must stack ABOVE the viewport (which mounts later in
   DOM), or the panel paints straight over the arrow. */
.voxel-navigation-menu__indicator {
  @apply absolute top-full left-0 z-50 h-[10px];
  width: var(--reka-navigation-menu-indicator-size);
  transform: translateX(var(--reka-navigation-menu-indicator-position));
  transition: transform 200ms ease;
}

/* Solid ▲ built with the classic border trick — no rotation, no overflow
   clipping, so the full shape always renders. Base sits flush on the
   panel's top edge. Shadow mirrors --shadow-xl's two layers exactly (same
   offsets/blur/tint); drop-shadow can't express the token's negative
   spread, and chaining is how multi-layer filters compose. */
.voxel-navigation-menu__indicator-arrow {
  @apply absolute bottom-0 left-1/2 -translate-x-1/2;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid var(--color-surface-base);
  filter: drop-shadow(0 8px 10px rgba(170, 179, 255, 0.12))
    drop-shadow(0 20px 25px rgba(170, 179, 255, 0.1));
}

/* ── Viewport ──────────────────────────────────────────────────────────────
   Sized purely by reka's vars. Top margin = 10px indicator strip + 6px air,
   so the ▲ — and its large downward xl drop-shadow tail — stay fully clear
   of the panel body instead of bleeding onto its top edge. */
.voxel-navigation-menu__viewport {
  @apply absolute top-full left-0 z-40 mt-[16px];
  width: var(--reka-navigation-menu-viewport-width);
  height: var(--reka-navigation-menu-viewport-height);
  transition: width 200ms ease, height 200ms ease;
}

/* ── Content: pinned to the viewport's top-left so panels never drift
   horizontally when their size differs (the "jumping"). Absolute also keeps
   natural size for reka's measurement — no stretch feedback loop.
   Borderless + tinted shadow-xl (Card's near-max elevation) so the floating
   panel lifts clearly off the page. ── */
.voxel-navigation-menu__content {
  @apply absolute top-0 left-0 p-3
    bg-[var(--color-surface-base)]/12
    rounded-lg shadow-[var(--shadow-xl)]
    focus-visible:outline-none;
}

/* ── Vertical overrides ────────────────────────────────────────────────────
   MUST stay after the base rules above — equal specificity, so source order
   decides. Vertical mirrors horizontal: strip hugs the panel's leading edge,
   ▲ becomes ◀ pointing back at the active trigger, and the panel is offset
   by strip (10px) + air (6px) so the marker + shadow tail stay fully clear.
   w-fit shrink-wraps the root around the list — otherwise `left-full`
   resolves against the full-width container and flings the panel away. */
.voxel-navigation-menu--vertical {
  @apply w-fit;
}

.voxel-navigation-menu--vertical .voxel-navigation-menu__viewport {
  top: 0;
  left: 100%;
  margin: 0 0 0 16px;
}

/* Strip spans the active trigger's row: reka sets --size to trigger height
   and --position to its offsetTop in vertical mode. */
.voxel-navigation-menu--vertical .voxel-navigation-menu__indicator {
  @apply flex items-center;
  top: 0;
  left: 100%;
  width: 10px;
  height: var(--reka-navigation-menu-indicator-size);
  transform: translateY(var(--reka-navigation-menu-indicator-position));
}

/* ◀ pointing at the hovered trigger; base touches the panel side */
.voxel-navigation-menu--vertical .voxel-navigation-menu__indicator-arrow {
  right: 0;
  left: auto;
  bottom: auto;
  top: 50%;
  transform: translateY(-50%);
  translate: none;
  width: 0;
  height: 0;
  border-left: 0 solid transparent;
  border-right: 7px solid var(--color-surface-base);
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
}
</style>
