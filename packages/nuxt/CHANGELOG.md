# @pixela/voxel-ui-nuxt

## 0.6.0

### Minor Changes

- 3faeb51: Add 15 new Tier-2 components from the Astryx gap analysis (Batch A + Batch B):
  
  **Batch A — Simple/wrapper components:**
  - **AvatarGroup** — stacked/overlapping avatars with `max` prop and `+N` overflow badge; reuses Avatar, SR-readable overflow count
  - **Kbd** — styled keyboard key element with `size` variants and monospace font; for shortcuts and key combos
  - **Center** — flex wrapper that centers children; `as` prop for element tag, `inline` mode
  - **StatusDot** — small colored status indicator (`online`/`away`/`busy`/`offline`); optional `pulse` animation and SR label via VisuallyHidden
  - **Timestamp** — relative time ("2 min ago") or absolute time display using `Intl.RelativeTimeFormat`; SSR-safe, handles invalid dates gracefully
  - **Token** — inline chip/token with `default`/`selected`/`error` variants; optional icon and remove button
  - **FieldStatus** — validation state indicator (`error`/`warning`/`success`/`info`) with icon + message; composes with FormField
  - **InputGroup** — input wrapper with leading/trailing adornment slots; shared border with focus-within highlight
  - **RadioList** — vertical radio list with label + description per item; composes reka-ui RadioGroup primitives
  - **Stack** — generic flex stack with `orientation` prop (`horizontal`/`vertical`); responsive object syntax for gap/align/justify
  - **FormGrid** — two-column CSS Grid for form rows (label + control); configurable `labelWidth`/`gap`, collapses on small screens
  
  **Batch B — Composite/interactive components:**
  - **SegmentedControl** — segmented button group for exclusive selection; wraps reka-ui ToggleGroup with sliding pill indicator; arrow-key navigation
  - **SelectableCard** — card with selection state; controlled (`modelValue`) and uncontrolled (`defaultSelected`); keyboard accessible; custom `selectedIcon` prop
  - **Carousel** — horizontal scroll carousel with CSS scroll-snap; `slidesPerView` and `gap` props; optional arrows (hide at boundaries) and pagination dots
  - **Lightbox** — full-screen image viewer on reka-ui Dialog; single image or gallery mode with prev/next; Escape to close; SSR-safe
  
  **Refactors:**
  - Extracted shared `resolveResponsive()` utility and `ResponsiveValue<T>` type into `utils/responsive.ts`; Grid, HStack, VStack now import from shared utility instead of duplicating logic
  - Avatar status indicator now delegates to StatusDot component (removed duplicated status CSS)
  
  **Text emphasis & font family tokens:**
  - New `emphasis` text variant (`emphasis-xs/sm/base/lg`) with bold + italic styling
  - 5 role-based font family tokens: `--font-display`, `--font-title`, `--font-heading`, `--font-body`, `--font-emphasis` (all default to `--font-family-sans`)
  - All Text component variants now consume the appropriate font token via Tailwind utilities
  - `useThemeConfig` role-based font keys: `fontFamilyDisplay`, `fontFamilyTitle`, `fontFamilyHeading`, `fontFamilyBody`, `fontFamilyEmphasis`
  - **Breaking change**: `useThemeConfig().setTheme({ fontFamily })` replaced with role-based keys above
  
  **New tokens:**
  - `--color-input-icon` — adornment icon color for InputGroup (defaults to `--color-text-secondary`)
  - `--font-display`, `--font-title`, `--font-heading`, `--font-body`, `--font-emphasis` — role-based font families (default to `--font-family-sans`)
  
  **Bug fixes:**
  - **Timestamp**: handle invalid dates gracefully — renders empty text and omits `datetime` attribute instead of crashing
  - **PageHeader**: title now renders as `h1`
  
  **Design details:**
  - All components follow the 4-file convention (Component.vue, Component.types.ts, Component.stories.ts, index.ts)
  - All components use design tokens; dark mode works via existing token system
  - Token variant renamed from `destructive` to `error` for API consistency with Badge/FieldStatus
  - Stack is independent of HStack/VStack — no breaking changes to existing layout components
  - No new runtime dependencies — Carousel uses CSS scroll-snap
  - Font tokens identical in light and dark mode — no dark-mode overrides

### Patch Changes

- Updated dependencies [3faeb51]
  - @pixela/voxel-ui@0.6.0

## 0.5.0

### Minor Changes

- c751c8f: Add 8 new Tier-1 components from the Astryx gap analysis:
  
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

### Patch Changes

- bd578e9: Fix bugs and resolve design system debt:
  
  **Bug fixes:**
  - **CLI init**: Fix `ERR_MODULE_NOT_FOUND` for `skill` module — added `.js` extension to dynamic import for Node ESM compatibility
  - **SidebarHeading**: Handle collapsed state — inject sidebar context, hide text and show Tooltip on collapse (follows SidebarItem pattern)
  - **NumberField**: Fix focus border not covering increment/decrement buttons — changed CSS selector from `__input:focus-within` to `:focus-within __wrapper`
  
  **Debt fixes:**
  - **CLI sub-component discovery**: `generate.ts` now discovers sibling `.vue` files in component directories — SidebarItem, AccordionItem, DropdownMenuItem, TabsList, and 26 other sub-components now appear in `component --list` output
  - **Sidebar dark mode tokens**: Migrated `--sidebar-*` tokens to `tokens.css` with `.dark` overrides; removed `--sidebar-*-dark` tokens and `.dark .vx-sidebar*` rules from component files
- Updated dependencies [bd578e9]
- Updated dependencies [c751c8f]
  - @pixela/voxel-ui@0.5.0

## 0.4.2

### Patch Changes

- Add controlledValue prop to NumberField for VeeValidate compatibility
- Updated dependencies
  - @pixela/voxel-ui@0.4.2

## 0.4.1

### Patch Changes

- Updated dependencies [ad58569]
  - @pixela/voxel-ui@0.4.1

## 0.4.0

### Minor Changes

- 596e622: Navigation components overhaul: NavigationMenu, Sidebar, Breadcrumb, TopNav, MobileNav
  
  **Breaking changes:**
  - NavigationMenu: Removed `:items` prop — compose sub-components as children instead
  - Sidebar: Removed `:items` prop — compose `<SidebarItem>` / `<SidebarItemGroup>` as children instead
  
  **New components:**
  - Breadcrumb + BreadcrumbItem — configurable separators with leading/trailing control
  - TopNav + TopNavItem + TopNavHeading — reka-ui Menubar wrapping with start/center/end slots; `variant` (default/boxy) and `dense` props
  - MobileNav + MobileNavToggle — responsive Drawer wrapper that only renders below configurable breakpoint; `open`/`defaultOpen` flow through `$attrs` to Drawer (avoids Vue 3 boolean-casting bug)
  - AttributePresenter — admin detail view pattern for displaying entity properties as label-value pairs; supports nested object flattening, loading/empty states, custom slots, `dense` mode, `shadow` prop, and optional `title` prop
  
  **NavigationMenu migration:**
  ```vue
  <!-- Before -->
  <NavigationMenu :items="items" />
  
  <!-- After -->
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem value="products">
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="#">Product A</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
  ```
  
  **Sidebar migration:**
  ```vue
  <!-- Before -->
  <Sidebar :items="items" />
  
  <!-- After -->
  <Sidebar>
    <SidebarItem :icon="Home" label="Home" href="#" active />
    <SidebarItem :icon="Settings" label="Settings" href="#" />
  </Sidebar>
  ```

### Patch Changes

- Updated dependencies [596e622]
  - @pixela/voxel-ui@0.4.0

## 0.3.0

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @pixela/voxel-ui@0.3.0

## 0.2.0

### Minor Changes

- Release v0.2.0

### Patch Changes

- Updated dependencies
  - @pixela/voxel-ui@0.2.0
