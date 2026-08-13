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
        composables/            # useTheme.ts
        types/                  # html-attributes.ts, shared.ts
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
- `ComponentNane.story.ts` - Storybook Stories
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
Use the custom types in `src/types/html-attributes.ts` or plain interfaces.

## Component Index

18 components organized by category:

### Actions
- **Button** — Primary action button. Props: style, color, size, density, loading, disabled. Slots: default, prepend-icon, append-icon.
- **IconButton** — Icon-only button. Props: style, color, size, density, loading, disabled, aria-label.
- **Link** — Hyperlink. Props: style (default|underlined), color, size, label, showIcon.
- **ToggleButton** — Toggle button. Props: type (button|icon-button), pressed, value.
- **ToggleButtonGroup** — Group wrapper. Props: modelValue (string[]), type (single|multiple).

### Inputs
- **Checkbox** — Checkbox with label. Props: modelValue (boolean), size, disabled, label.
- **Switch** — Toggle switch. Props: modelValue (boolean), size, disabled, label.
- **RadioGroup** — Radio group. Props: modelValue (string), size, disabled, items.

### Navigation
- **Tabs** — Tabbed interface. Props: modelValue, orientation, activationMode. Slots: list, content-{value}.
- **Accordion** — Collapsible sections. Props: modelValue, type (single|multiple), collapsible.

### Layout
- **Card** — Content container. Props: elevation (flat|sm|md|lg|xl|2xl).
- **Separator** — Divider. Props: orientation, decorative.

### Overlays
- **Dialog** — Modal. Props: title, description. Slots: trigger, content, footer.
- **Drawer** — Side panel. Props: state (expanded|collapsed), title. Slots: content, footer.
- **Tooltip** — Hover tooltip. Props: text, position (top|bottom|left|right), disabled.
- **DropdownMenu** — Dropdown menu. Slots: trigger, item. (placeholder — not yet functional)

### Data Display
- **Avatar** — User avatar. Props: style, size, src, alt.
- **Badge** — Status badge. Props: variant (default|outline|subtle|info|success|warning|error), size, dot.
- **Text** — Typography. Props: tag, variant ({category}-{size}), weight, color.

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
  "./tokens.css": "./dist/tokens/tokens.css",
  "./style.css": "./dist/assets/voxel-ui.css"
}
```

Peer deps: `vue ^3.4.0`, `reka-ui ^2.9.0`, `@lucide/vue ^1.0.0`. All are externalized in build.

## Nuxt Module

The `@pixela/voxel-ui-nuxt` package provides auto-imports for all VX-prefixed components. CSS is injected automatically.

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pixela/voxel-ui-nuxt'],
})
```

Components are auto-imported with the `VX` prefix (e.g., `VXButton`, `VXDialog`).
Composables (`useTheme`, `useThemeConfig`, `useToast`, `useSidebar`) are also auto-imported.

## Known Issues

- ESLint config requires `@eslint/js` and `typescript-eslint` packages (not installed)
- Playground environments not yet created
- `DropdownMenu` is a placeholder — renders hardcoded items, not data-driven

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
