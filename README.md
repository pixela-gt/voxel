# Voxel

Accessible Vue 3 design system monorepo — a component library, its Nuxt module, and a CLI for component docs and AI-agent tooling. Built on [reka-ui](https://reka-ui.com) primitives, styled with Tailwind CSS and a token-based design system.

## Packages

| Package | Description |
| --- | --- |
| [`@pixela/voxel-ui`](./packages/ui) | Component library — 70+ Vue components, composables, and design tokens |
| [`@pixela/voxel-ui-nuxt`](./packages/nuxt) | Nuxt module with auto-imports for all components and composables |
| [`@pixela/voxel-cli`](./packages/cli) | CLI for component docs, tokens, and AI-agent skill generation |

## Quick start

### Vue

```bash
npm install @pixela/voxel-ui vue @lucide/vue
```

```ts
import { createApp } from 'vue'
import { createVoxel } from '@pixela/voxel-ui/plugin'

app.use(createVoxel())
```

```vue
<template>
  <VXButton color="primary">Save</VXButton>
</template>
```

### Nuxt

```bash
npm install @pixela/voxel-ui-nuxt @pixela/voxel-ui
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pixela/voxel-ui-nuxt'],
})
```

```vue
<template>
  <VxButton color="primary">Save</VxButton>
</template>
```

### CLI

```bash
npx @pixela/voxel-cli component --list
npx @pixela/voxel-cli tokens colors
npx @pixela/voxel-cli search "toggle"
```

Each package's README has full usage, API, and theming documentation.

## Development

```bash
pnpm install            # install workspace dependencies
pnpm build              # build @pixela/voxel-ui
pnpm typecheck          # type-check all packages
pnpm storybook          # run Storybook (packages/ui)
pnpm playground:vue     # Vue playground
pnpm playground:nuxt    # Nuxt playground
pnpm generate           # regenerate the components.json registry
```

## Release

Versioning and publishing use [Changesets](https://changesets.dev):

```bash
pnpm changeset   # create a changeset describing your change
pnpm version     # apply changesets and bump versions
pnpm release     # build + publish
```

## License

MIT
