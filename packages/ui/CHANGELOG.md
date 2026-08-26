# @pixela/voxel-ui

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
