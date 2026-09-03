---
"@pixela/voxel-ui": minor
"@pixela/voxel-ui-nuxt": minor
---

Breaking rebuild of NavigationMenu as modular sub-component family with router support

**Breaking changes:**
- Removed `:items` prop from NavigationMenu — compose sub-components as children instead
- Removed `NavigationMenuItem` type (items-array) — use component props directly
- Added `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuSection` sub-components
- `NavigationMenuLink` adds `to`/`active`/`exact` props for router support (auto-detects NuxtLink/RouterLink)

**Migration:**
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
