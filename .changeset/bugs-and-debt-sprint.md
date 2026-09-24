---
"@pixela/voxel-ui": patch
"@pixela/voxel-ui-nuxt": patch
"@pixela/voxel-cli": patch
---

Fix bugs and resolve design system debt:

**Bug fixes:**
- **CLI init**: Fix `ERR_MODULE_NOT_FOUND` for `skill` module — added `.js` extension to dynamic import for Node ESM compatibility
- **SidebarHeading**: Handle collapsed state — inject sidebar context, hide text and show Tooltip on collapse (follows SidebarItem pattern)
- **NumberField**: Fix focus border not covering increment/decrement buttons — changed CSS selector from `__input:focus-within` to `:focus-within __wrapper`

**Debt fixes:**
- **CLI sub-component discovery**: `generate.ts` now discovers sibling `.vue` files in component directories — SidebarItem, AccordionItem, DropdownMenuItem, TabsList, and 26 other sub-components now appear in `component --list` output
- **Sidebar dark mode tokens**: Migrated `--sidebar-*` tokens to `tokens.css` with `.dark` overrides; removed `--sidebar-*-dark` tokens and `.dark .vx-sidebar*` rules from component files