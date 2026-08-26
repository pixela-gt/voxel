# @pixela/voxel-ui

Accessible Vue 3 component library built on [reka-ui](https://reka-ui.com) primitives, styled with Tailwind CSS and a token-based design system.

## Install

```bash
npm install @pixela/voxel-ui
```

Peer dependencies (required alongside the library):

```bash
npm install vue @lucide/vue
```

## Quick start

### Vue plugin (recommended)

Registers all `VX*` components globally and imports the CSS (tokens + base styles).

```ts
import { createApp } from 'vue'
import { createVoxel } from '@pixela/voxel-ui/plugin'

const app = createApp(App)
app.use(createVoxel())
```

### Direct import

```ts
import { VXButton, VXDialog } from '@pixela/voxel-ui'
import '@pixela/voxel-ui/tokens.css'
import '@pixela/voxel-ui/style.css'
```

### Nuxt

Use the dedicated module — see [`@pixela/voxel-ui-nuxt`](https://www.npmjs.com/package/@pixela/voxel-ui-nuxt).

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pixela/voxel-ui-nuxt'],
})
```

## Components

70+ components across actions, inputs, pickers, navigation, overlays, layout, data display, and application patterns — all exported with a `VX` prefix.

```vue
<VXButton color="primary">Save</VXButton>
<VXDialog title="Confirm" description="Are you sure?">
  <template #trigger><VXButton>Open</VXButton></template>
</VXDialog>
```

See the Storybook or the CLI for the full list and prop docs:

```bash
npx @pixela/voxel-cli component --list
```

## Composables

```ts
import { useTheme, useThemeConfig, useToast, useSidebar } from '@pixela/voxel-ui'
```

| Composable | Purpose |
| --- | --- |
| `useTheme()` | Light/dark/system mode with localStorage persistence |
| `useThemeConfig()` | Runtime theme overrides with auto-generated color scales |
| `useToast()` | Programmatic toast notifications |
| `useSidebar()` | Sidebar open/collapse state |

## Theming

### CSS override (zero-code)

Override CSS custom properties in your app's CSS after importing tokens:

```css
@import '@pixela/voxel-ui/tokens.css';

:root {
  --color-primary-base: #ff0000;
  --color-primary-darken-1: #cc0000;
  --color-primary-lighten-1: #ff3333;
  --font-family-sans: 'Inter', sans-serif;
}
```

### Runtime overrides

```ts
import { useThemeConfig } from '@pixela/voxel-ui'

const { setTheme, resetTheme } = useThemeConfig()

setTheme({
  colors: { primary: '#ff0000', secondary: '#00ff00' },
  fontFamily: 'Inter',
})

resetTheme() // removes overrides, reverts to tokens.css defaults
```

## Development

```bash
pnpm build       # build the library
pnpm typecheck   # type-check
pnpm storybook   # run Storybook
```

## License

MIT
