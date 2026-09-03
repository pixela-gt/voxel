---
"@pixela/voxel-ui": minor
"@pixela/voxel-ui-nuxt": minor
---

Breaking rebuild of Sidebar as modular sub-component family

**Breaking changes:**
- Removed `:items` prop from Sidebar — compose `<SidebarItem>` / `<SidebarItemGroup>` as children instead
- Removed `SidebarItemData`, `SidebarGroupData`, `SidebarNavItem` types — use component props directly
- Removed `isSidebarGroup` / `isSidebarItem` type guards — no longer needed
- Added `SidebarSection`, `SidebarHeading`, `SidebarCollapseButton` sub-components
- `useSidebar` composable now accepts `{ id }` for multi-sidebar support (keyed instance registry)

**Migration:**
```vue
<!-- Before -->
<Sidebar :items="items" />

<!-- After -->
<Sidebar>
  <SidebarItem :icon="Home" label="Home" href="#" active />
  <SidebarItem :icon="Settings" label="Settings" href="#" />
</Sidebar>
```
