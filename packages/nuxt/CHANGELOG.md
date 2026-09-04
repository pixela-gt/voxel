# @pixela/voxel-ui-nuxt

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
