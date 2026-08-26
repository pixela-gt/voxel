# AGENTS.md - @pixela/voxel-ui

## Quick Reference

```bash
# Build
pnpm build                    # Build UI library
pnpm typecheck                # Type-check all packages

# CLI (run from repo root)
npx tsx packages/cli/src/index.ts component --list     # List all components
npx tsx packages/cli/src/index.ts component Button     # Component docs
npx tsx packages/cli/src/index.ts component Button --props  # Props only
npx tsx packages/cli/src/index.ts component Button --json   # Machine-readable
npx tsx packages/cli/src/index.ts search "toggle"      # Search components
npx tsx packages/cli/src/index.ts tokens               # List token categories
npx tsx packages/cli/src/index.ts tokens colors        # Token values
npx tsx packages/cli/src/index.ts generate             # Regenerate components.json

# CLI dev (faster, no build step)
pnpm --filter @pixela/voxel-cli dev component --list
pnpm --filter @pixela/voxel-cli dev component Button
pnpm --filter @pixela/voxel-cli dev search "toggle"
pnpm --filter @pixela/voxel-cli dev tokens
pnpm --filter @pixela/voxel-cli dev generate
```

**Build must succeed before committing.** The build runs `vite build` then `tsc --emitDeclarationOnly`.

## Project Structure

Monorepo using pnpm workspaces.

```
voxel/
  packages/
    ui/                         # @pixela/voxel-ui
      src/
        index.ts                # Barrel exports
        plugin.ts               # Vue plugin for non-Nuxt apps
        tokens/tokens.css       # Design token CSS custom properties
        style.css               # Tailwind + base styles
        components.json         # Generated component registry (do not edit manually)
        components/             # One folder per component:
                                #   ComponentName.vue, ComponentName.types.ts, index.ts
        composables/            # useTheme, useThemeConfig, useToast, useSidebar
        layouts/                # AppShell
        patterns/               # DataTable, DataTableServer, EmptyState, PageHeader
        types/                  # shared.ts
    nuxt/                       # @pixela/voxel-ui-nuxt
      src/
        index.ts                # Nuxt module entry
        module.ts               # defineNuxtModule with addComponent loop
        components.ts           # List of all VX component names
    cli/                        # @pixela/voxel-cli
      src/
        index.ts                # CLI entry point
        generate.ts             # Generates components.json from source
  playground/
    vue/                        # Vue playground
    nuxt/                       # Nuxt playground
```

## Critical Conventions

### CSS Variables: HYPHENATED, not slashed
```css
✅ --color-primary-base
❌ --colors/primary/base
```
All tokens use `--color-*` prefix with hyphens. This is enforced everywhere.

### Component Pattern
Each component folder has 4 files:
- `ComponentName.vue` - SFC implementation
- `ComponentName.stories.ts` - Storybook Stories
- `ComponentName.types.ts` - Exported types (for reuse across packages)
- `index.ts` - Re-exports component + types from `.types.ts`

**Never export types from `.vue` files** - tsc cannot resolve them.

### reka-ui Integration
Components wrap reka-ui primitives. Check reka-ui exports before importing:
```bash
node -e "const r = require('reka-ui'); console.log(Object.keys(r).filter(k => k.startsWith('Accordion')).join('\n'))"
```
Some expected components (e.g., `AccordionItem`) may not exist or have different names.

### Vue 3.5+ Quirk
`HTMLAttributes` is NOT generic in Vue 3.5+. Do not write `HTMLAttributes<HTMLElement>`.
Use the shared types in `src/types/shared.ts` or plain interfaces.

### Vue 3 Boolean Prop Casting
An absent Boolean prop with no default is cast to `false` by Vue 3 (runtime-core
`resolvePropValue`). For controlled/uncontrolled `open`-style props, declare
`open: undefined, defaultOpen: undefined` in `withDefaults` and forward
conditionally (`props.open !== undefined ? { open: props.open } : {}`) so reka-ui's
own `open === undefined` sentinel is preserved. See BUG-008/BUG-009/BUG-010.

### Scoped Styles vs reka-ui Fragment Roots
Some reka-ui parts render multi-root Fragments (e.g. `ScrollAreaViewport`), and
Vue only propagates parent scope attributes to single-root children — scoped
selectors on those parts silently never match. Anchor part styles through
`:deep()` from the single-root wrapper, or use global BEM-namespaced styles for
portalled/floating components. See BUG-005/BUG-003.

## Component Index

70+ components, exported with a `VX` prefix (e.g. `VXButton`, `VXDialog`).
Authoritative prop/event/slot docs are generated into `components.json` — use the
CLI instead of hand-maintaining them here:

```bash
npx tsx packages/cli/src/index.ts component Button --props   # props table
npx tsx packages/cli/src/index.ts component Button           # full docs
npx tsx packages/cli/src/index.ts search "toggle"            # search
```

### Actions
Button, IconButton, ButtonGroup, Link, Toggle, ToggleGroup

### Inputs
Checkbox, RadioGroup, Switch, Input, Textarea, FormField, MaskedInput,
NumberField, PinInput

### Selection & Data Entry
Combobox, Select, Listbox, TagsInput, Editable

### Date & Time
Calendar, RangeCalendar, DateField, DateRangeField, DatePicker, DateRangePicker,
MonthPicker, MonthRangePicker, TimeField, TimeRangeField, YearPicker, YearRangePicker

### Color
ColorArea, ColorField, ColorSlider, ColorSwatch, ColorSwatchPicker

### Navigation
Tabs, Accordion, NavigationMenu, Menubar, ContextMenu, Stepper, Tree, Pagination

### Overlays
Dialog, Drawer, DropdownMenu, AlertDialog, Popover, HoverCard, Tooltip, Toast

### Layout
Card, Separator, AppShell, Sidebar, Toolbar, Splitter, AspectRatio

### Data Display
Avatar, Badge, Text, Label, Icon, List, ListItem, Slider, Progress, Skeleton,
Rating, Loading, ScrollArea, Collapsible

### Patterns
PageHeader, EmptyState, DataTable, DataTableServer

### Notable APIs
- **Drawer** — modal panel (was a persistent side panel pre-v0.3). Props: `open`/`defaultOpen` (controlled/uncontrolled), `side` ('left'|'right'), `width` (number|string), `title`, `description`, `closeIcon`.
- **Dialog** — modal. Props: `title`, `description`; slots: `trigger`, `content`, `footer`.
- **DropdownMenu** — placeholder (renders hardcoded items, not data-driven).

## Import Pattern

```typescript
// Vue plugin (recommended for non-Nuxt apps)
import { createVoxel } from '@pixela/voxel-ui/plugin'
import '@pixela/voxel-ui/style.css'
app.use(createVoxel())

// Direct import
import { Button, Dialog, Card } from '@pixela/voxel-ui'
import '@pixela/voxel-ui/tokens.css'
import '@pixela/voxel-ui/style.css'

// Nuxt module (auto-imports)
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pixela/voxel-ui-nuxt'],
})
// Components are auto-imported, no manual imports needed
```

## Design Tokens

All tokens are CSS custom properties. Use via Tailwind or raw CSS.

### Colors
- Semantic: `--color-primary-base`, `--color-secondary-base`, `--color-error-base`, `--color-warning-base`, `--color-success-base`
- Each has `-darken-1` and `-lighten-1` variants
- Surface: `--color-surface-background`, `--color-surface-base`, `--color-surface-light`
- Text: `--color-text-primary`, `--color-text-secondary`, `--color-text-inverse`, `--color-text-muted`

### Typography
- Font: `--font-family-sans` (Outfit, system-ui)
- Sizes: `--font-size-2xs` (11px) through `--font-size-7xl` (71px)

### Spacing (4px grid)
- `--space-1` (4px) through `--space-8` (32px)

### Border Radius
- `--rounded-xs` (4px) through `--rounded-full` (9999px)

### Shadows
- `--shadow-sm` through `--shadow-2xl`

## useTheme Composable

```typescript
import { useTheme } from '@pixela/voxel-ui'

const { theme, resolvedTheme, setTheme } = useTheme()
// theme: 'light' | 'dark' | 'system'
// resolvedTheme: 'light' | 'dark' (actual applied theme)
// setTheme(mode): change theme, persists to localStorage
```

## Customizing Theme

### CSS Override (zero-code)
Override CSS custom properties in your app's CSS after importing tokens:

```css
@import '@pixela/voxel-ui/tokens.css';

:root {
  --color-primary-base: #ff0000;
  --color-secondary-base: #00ff00;
  --font-family-sans: 'Inter', sans-serif;
}
```

Lighten/darken variants must be defined manually: `--color-primary-darken-1`, `--color-primary-lighten-1`.

### useThemeConfig Composable (runtime)
Programmatic control with auto-generated color scales:

```typescript
import { useThemeConfig } from '@pixela/voxel-ui'

const { setTheme, resetTheme } = useThemeConfig()

setTheme({
  colors: { primary: '#ff0000', secondary: '#00ff00' },
  fontFamily: 'Inter',
})

resetTheme() // removes overrides, reverts to tokens.css defaults
```

Auto-generates `--color-{name}-darken-1` and `--color-{name}-lighten-1` via `color-mix()`.

Available color keys: `primary`, `secondary`, `info`, `error`, `warning`, `success`.

## Package Exports

```json
{
  ".": { "types": "./dist/index.d.ts", "import": "./dist/index.mjs" },
  "./plugin": { "types": "./dist/plugin.d.ts", "import": "./dist/plugin.mjs" },
  "./layouts": { "types": "./dist/layouts/index.d.ts", "import": "./dist/layouts/index.mjs" },
  "./patterns": { "types": "./dist/patterns/index.d.ts", "import": "./dist/patterns/index.mjs" },
  "./composables": { "types": "./dist/composables/index.d.ts", "import": "./dist/composables/index.mjs" },
  "./tokens.css": "./dist/tokens/tokens.css",
  "./style.css": "./dist/assets/voxel-ui.css"
}
```

Peer deps: `vue ^3.4.0`, `@lucide/vue ^1.0.0`. `reka-ui` is a direct dependency. All are externalized in build.

## Nuxt Module

The `@pixela/voxel-ui-nuxt` package provides auto-imports for all VX-prefixed components. CSS is injected automatically.

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pixela/voxel-ui-nuxt'],
})
```

Components are auto-imported with a `Vx` prefix by default (e.g., `<VxButton />`,
`<VxDialog />`) — configurable via the `prefix` option. Note the module registers
local names with a `Vx` prefix while the barrel exports use `VX` (`VXButton`), so
direct imports and Nuxt auto-imports use different casing.

Composables (`useTheme`, `useThemeConfig`, `useToast`, `useSidebar`) are also auto-imported.

Module options (via the `voxel` config key): `prefix` (string, default `''`),
`components` (boolean, default `true`), `theme` (path to extra CSS injected after tokens).

## Known Issues

- `DropdownMenu` is a placeholder — renders hardcoded items, not data-driven
- `Combobox`/`Collapsible`/`AlertDialog` still forward `open`/`defaultOpen` without
  `default: undefined` (Vue boolean-casting bug) — tracked in BUG-010, not yet fixed
- CLI version string is hardcoded (`version('0.1.0')` in `packages/cli/src/index.ts`) —
  does not auto-sync with package.json

## Release Workflow

Uses [Changesets](https://changesets.dev) for version management.

### Making a changeset
```bash
pnpm changeset
# Select packages changed, bump type, description
```

### Publishing (automated)
1. Add changeset files with your PR
2. Merge to main → changesets/action creates "Version Packages" PR
3. Merge version PR → packages published to npm + GitHub Packages

### Manual release
```bash
pnpm version   # apply changesets, bump versions
pnpm release   # build + publish
```
