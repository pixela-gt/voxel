# @pixela/voxel-ui-nuxt

Nuxt module for [`@pixela/voxel-ui`](https://www.npmjs.com/package/@pixela/voxel-ui) — auto-imports all components and composables, and injects the design-token CSS.

## Install

```bash
npm install @pixela/voxel-ui-nuxt @pixela/voxel-ui
```

## Setup

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pixela/voxel-ui-nuxt'],
})
```

That's it — components and composables are auto-imported and CSS is injected automatically.

## Usage

Components are auto-imported with a `Vx` prefix:

```vue
<template>
  <VxButton color="primary">Save</VxButton>
  <VxDialog title="Confirm" description="Are you sure?">
    <template #trigger><VxButton>Open</VxButton></template>
  </VxDialog>
</template>
```

Composables are auto-imported too:

```ts
const { theme, setTheme } = useTheme()
const toast = useToast()
const sidebar = useSidebar()
```

> **Naming note:** the Nuxt module registers local names with a `Vx` prefix (`VxButton`), while the underlying `@pixela/voxel-ui` barrel exports use an all-caps `VX` prefix (`VXButton`). Use `<VxButton />` in Nuxt templates and `VXButton` for direct imports.

## Options

Configure via the `voxel` key in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@pixela/voxel-ui-nuxt'],
  voxel: {
    prefix: '',          // prepended to component names
    components: true,    // set false to disable component auto-import
    theme: '~/assets/theme.css', // extra CSS injected after tokens
  },
})
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `prefix` | `string` | `''` | Prepended to auto-imported component names (e.g. `'Ui'` → `<UiVxButton>`) |
| `components` | `boolean` | `true` | Enable component auto-import |
| `theme` | `string` | `undefined` | Path to extra CSS loaded after the token stylesheet |

## License

MIT
