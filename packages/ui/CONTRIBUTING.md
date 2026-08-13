# Contributing to @pixela/voxel-ui

## Adding a Storybook story

Every component folder under `packages/ui/src/components/<Name>/` should have a colocated `<Name>.stories.ts` file. Stories power design review, regression catching, and onboarding.

### Pattern

1. Import `Meta, StoryObj` from `@storybook/vue3` and the component from its SFC.
2. Declare `Meta<typeof Component>` with:
  - `title: 'Components/<Name>'`
  - `component`
  - `tags: ['autodocs']`
  - `argTypes` for every public prop **except `class`** (skip it — noise)
3. Export a `Story` type alias: `type Story = StoryObj<typeof meta>`
4. Add a `Default` story and one story per meaningful prop variant (`Small`, `Disabled`, `Outline`, etc.). No exhaustive matrix.
5. For v-model components, use `withVModel` from `.story-helpers.ts` to wire `args.modelValue` into a local ref.
6. For interactive components, add at least one story with a `play()` function from `@storybook/test` that exercises the primary interaction.
7. For slot-bearing components, render realistic content in the default story's template.
8. For compound components with sub-components (e.g. `TabsList`, `AccordionItem`, `SplitterPanel`), demo the sub-components **inline as children** in the top-level story's template. Do **not** create separate story files for them.

### Iconography

Use `@lucide/vue` for any decorative icons in story examples. Matches the existing pattern in `Button.stories.ts`.

### Imports

```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import Component from './Component.vue'
// For v-model wiring:
import { withVModel } from '../.story-helpers'
```

### Verification

```bash
pnpm --filter @pixela/voxel-ui build-storybook
pnpm --filter @pixela/voxel-ui typecheck
pnpm --filter @pixela/voxel-ui storybook
```

Open the story in the browser, verify the a11y panel reports no violations on the Default story, and check that any `play()` story completes without error.

### See also

- `AGENTS.md` — component pattern, build commands, design tokens
- `thoughts/tickets/feature_storybook_stories_for_all_components.md` — the originating ticket
- `thoughts/plans/feature-storybook-stories-for-all-components.md` — the implementation plan
