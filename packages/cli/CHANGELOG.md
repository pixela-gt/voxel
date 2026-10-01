# @pixela/voxel-cli

## 0.5.0

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

## 0.4.0

## 0.3.0

### Patch Changes

- c3bc38a: Bundle components.json with the CLI so global installs work; fix main/exports; make init local-first with a --global option.
- da69db2: Read the CLI version from package.json instead of hardcoding it, so `voxel --version` stays in sync with releases.

## 0.2.0

### Minor Changes

- Release v0.2.0
