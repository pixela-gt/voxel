# @pixela-gt/voxel-ui

Vue 3 component design system built on [reka-ui](https://reka-ui.com/) with [Tailwind CSS](https://tailwindcss.com/).

## Install

```bash
npm install @pixela-gt/voxel-ui reka-ui
```

Peer dependencies: `vue ^3.4.0`, `reka-ui ^2.9.0`, `@lucide/vue ^1.0.0`.

## Usage

### Vue Plugin (recommended)

```ts
import { createVoxel } from '@pixela-gt/voxel-ui/plugin'
import '@pixela-gt/voxel-ui/style.css'

app.use(createVoxel())
```

Then use components directly in templates:

```vue
<template>
  <VXButton style="tonal" color="primary">Click me</VXButton>
  <VXBadge variant="success">Active</VXBadge>
</template>
```

### Direct Import

```vue
<script setup>
import { VXButton, VXBadge } from '@pixela-gt/voxel-ui'
import '@pixela-gt/voxel-ui/tokens.css'
import '@pixela-gt/voxel-ui/style.css'
</script>
```

### Theming

```ts
import { useTheme } from '@pixela-gt/voxel-ui'

const { theme, setTheme } = useTheme()
setTheme('dark')
```

## Components

| Component | Description |
|-----------|-------------|
| Accordion | Collapsible content sections |
| Avatar | User avatar with image or fallback |
| Badge | Status or label indicator |
| Button | Primary action element |
| Card | Content container with elevation |
| Checkbox | Binary toggle with label |
| Dialog | Modal overlay |
| Drawer | Slide-in panel |
| DropdownMenu | Menu triggered by button |
| IconButton | Icon-only button |
| Link | Navigation anchor |
| RadioGroup | Single-select radio list |
| Separator | Visual divider |
| Switch | Toggle switch with label |
| Tabs | Tabbed content navigation |
| Text | Typography with variants |
| ToggleButton | Pressable toggle button |
| ToggleButtonGroup | Grouped toggle buttons |
| Tooltip | Context hint on hover |

## Development

```bash
pnpm install
pnpm playground:vue    # Vue playground
pnpm playground:nuxt   # Nuxt playground
pnpm storybook         # Storybook
pnpm build             # Build library
```

## License

MIT
