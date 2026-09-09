# @pixela/voxel-ui

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
