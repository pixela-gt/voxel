---
"@pixela/voxel-ui": minor
"@pixela/voxel-ui-nuxt": minor
---

Add 8 new Tier-1 components from the Astryx gap analysis:

**New components:**
- **MoreMenu** — overflow actions menu (kebab menu) wrapping reka-ui DropdownMenu primitives; default ellipsis icon trigger, item support for labels/icons/disabled/destructive/separators
- **Banner** + **BannerProvider** — dismissible alert/notification banner with info/success/warning/error variants; in-place rendering (no portal)
- **ClickableCard** — Card with click overlay interaction, keyboard accessible (Enter/Space), supports rendering as link when `href` provided
- **FileInput** — drag-and-drop upload zone with click-to-browse, FormField integration, single/multiple file modes, `accept` filter
- **Grid** — CSS Grid wrapper with responsive prop-driven layout (`cols`, `rows`, `gap`, `align`, `justify`)
- **HStack** — horizontal flex stack with responsive `gap`, `align`, `justify`, `wrap` props
- **VStack** — vertical flex stack with responsive `gap`, `align`, `justify` props
- **VisuallyHidden** — screen-reader-only accessibility helper (CSS clip technique)

**New composables:**
- **useBanner** — composable queue for managing banner notifications (mirrors existing `useToast` pattern)
- **useVisuallyHidden** — returns reactive class string for applying visually-hidden styles to arbitrary elements

**Design details:**
- Grid/HStack/VStack use CSS custom properties for responsive object syntax (`cols={{ sm: 2, md: 4 }}`) to avoid Tailwind JIT purging issues
- MoreMenu bypasses the placeholder DropdownMenu with direct reka-ui primitives
- All components follow the 4-file convention (Component.vue, Component.types.ts, Component.stories.ts, index.ts)
- All components registered in Nuxt module with `Vx` prefix
