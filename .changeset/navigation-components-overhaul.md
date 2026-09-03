---
"@pixela/voxel-ui": minor
"@pixela/voxel-ui-nuxt": minor
---

Navigation components overhaul: NavigationMenu, Sidebar, Breadcrumb, TopNav, MobileNav

**Breaking changes:**
- NavigationMenu: Removed `:items` prop — compose sub-components as children instead
- Sidebar: Removed `:items` prop — compose `<SidebarItem>` / `<SidebarItemGroup>` as children instead

**New components:**
- Breadcrumb + BreadcrumbItem — configurable separators with leading/trailing control
- TopNav + TopNavItem + TopNavHeading — reka-ui Menubar wrapping with start/center/end slots
- MobileNav + MobileNavToggle — responsive Drawer wrapper that only renders below configurable breakpoint; `open`/`defaultOpen` flow through `$attrs` to Drawer (avoids Vue 3 boolean-casting bug)

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
