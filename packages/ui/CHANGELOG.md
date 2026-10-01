# @pixela/voxel-ui

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

## 0.4.2

### Patch Changes

- Add controlledValue prop to NumberField for VeeValidate compatibility

## 0.4.1

### Patch Changes

- ad58569: fix(Select): wire `value` prop for vee-validate compatibility and fix Storybook docs

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

## 0.3.0

### Minor Changes

- New additive component APIs:
  
  - `Avatar`: `shape`, `initials`, `color`, and `status` props
  - `AspectRatio`: named `preset` ratios (`square`/`video`/`photo`/`portrait`/`wide`) and `asChild`
  - `Drawer`: `width`, `description`, and `side` props
  - `Popover`: `showClose`, `closeIcon`, `side`, and `align` props
  - `HoverCard`: `showArrow`, `side`, and `align` props
  - `Radio`: `error` prop

### Patch Changes

- Bug fixes across components:
  
  - Restore uncontrolled open state for `Drawer`, `Popover`, and `HoverCard` (Vue boolean-prop casting was forcing controlled-closed mode)
  - `ScrollArea`: constrain the viewport so wheel/trackpad scrolling works
  - `NavigationMenu`: anchor floating panels to their trigger and render the indicator in both orientations
  - `Checkbox`/`Switch`: correct state handling and `FormField` id/error integration
  - `Pagination`: darken ellipsis contrast and use the shared `Icon` pattern

## 0.2.0

### Minor Changes

- Release v0.2.0
