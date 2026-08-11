# @pixela-gt/voxel-cli

CLI for Voxel design system — component docs, tokens, and AI agent tooling.

## Install

```bash
npm install -g @pixela-gt/voxel-cli
```

Or run without installing via `npx`:

```bash
npx tsx packages/cli/src/index.ts <command>
```

## Commands

### `voxel component [name]`

List all components or print docs for a specific component.

```bash
voxel component --list              # List all components
voxel component Button               # Print Button docs
voxel component Button --props       # Props only
voxel component Button --json       # Machine-readable JSON
voxel component Button --dense      # Compact output for AI agents
```

### `voxel tokens [category]`

Print design tokens by category.

```bash
voxel tokens                # List all token categories
voxel tokens colors         # Color tokens
voxel tokens spacing        # Spacing tokens
voxel tokens typography     # Typography tokens
voxel tokens --json         # Machine-readable JSON
voxel tokens colors --dense
```

### `voxel search <query>`

Search components by name, description, or props.

```bash
voxel search "toggle"
voxel search "button" --limit 5
voxel search "toggle" --json
```

### `voxel generate`

Regenerate `components.json` from source. Run this after adding or modifying components.

```bash
voxel generate
```

### `voxel init`

Generate an AI agent skill file for Voxel. Creates a skill file for use with Claude, Cursor, or OpenCode.

```bash
voxel init                           # Default: Claude skill, full coverage
voxel init --target cursor           # Cursor-specific skill
voxel init --target opencode         # OpenCode-specific skill
voxel init --target md               # Markdown file output
voxel init --full                    # Include slots, events, reka-ui mapping
voxel init --framework vue           # Vue only (default: both vue + nuxt)
voxel init --output ./custom-path.md  # Custom output path
```

## Development

```bash
# Link globally for local testing
cd packages/cli
pnpm link --global

# Run dev version directly
npx tsx packages/cli/src/index.ts component --list
```
