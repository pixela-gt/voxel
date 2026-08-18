import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createInterface } from 'node:readline'
import { loadRegistry } from './registry.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export interface SkillOptions {
  target: 'claude' | 'cursor' | 'opencode' | 'md'
  full: boolean
  framework: 'vue' | 'nuxt' | 'both'
  output?: string
  global?: boolean
}

function resolveOutputPath(options: SkillOptions): string {
  if (options.output) return options.output
  switch (options.target) {
    case 'claude': return '.claude/skills/voxel/SKILL.md'
    case 'cursor': return '.cursor/rules/voxel.md'
    case 'opencode':
      return options.global
        ? `${process.env.HOME}/.config/opencode/skills/voxel/SKILL.md`
        : '.opencode/skills/voxel/SKILL.md'
    case 'md': return './voxel.md'
  }
}

function confirmOverwrite(filePath: string): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise(resolve => {
    rl.question(`Overwrite ${filePath}? (y/N) `, answer => {
      rl.close()
      resolve(answer.toLowerCase() === 'y')
    })
  })
}

// --- Section builders ---

function buildFrontmatter(target: string): string {
  if (target === 'claude' || target === 'opencode') {
    return `---
name: voxel-ui
description: Voxel design system — component library, tokens, and patterns for building Vue/Nuxt interfaces
---

`
  }
  return ''
}

function buildSetupSection(framework: string): string {
  const lines: string[] = ['## Setup', '']

  if (framework === 'vue' || framework === 'both') {
    lines.push('### Vue Plugin')
    lines.push('')
    lines.push('```ts')
    lines.push("import { createVoxel } from '@pixela/voxel-ui/plugin'")
    lines.push("import '@pixela/voxel-ui/style.css'")
    lines.push("import '@pixela/voxel-ui/tokens.css'")
    lines.push('')
    lines.push('app.use(createVoxel())')
    lines.push('```')
    lines.push('')
    lines.push('### Direct Import')
    lines.push('')
    lines.push('```ts')
    lines.push("import { Button, Dialog, Card } from '@pixela/voxel-ui'")
    lines.push("import '@pixela/voxel-ui/tokens.css'")
    lines.push("import '@pixela/voxel-ui/style.css'")
    lines.push('```')
    lines.push('')
  }

  if (framework === 'nuxt' || framework === 'both') {
    lines.push('### Nuxt Module')
    lines.push('')
    lines.push('```ts')
    lines.push('// nuxt.config.ts')
    lines.push('export default defineNuxtConfig({')
    lines.push("  modules: ['@pixela/voxel-ui-nuxt'],")
    lines.push('})')
    lines.push('```')
    lines.push('')
    lines.push('Components auto-imported with `Vx` prefix: `VxButton`, `VxDialog`, `VxCard`, etc.')
    lines.push('Composables (`useTheme`, `useThemeConfig`, `useToast`, `useSidebar`) are also auto-imported.')
    lines.push('')
  }

  return lines.join('\n')
}

function groupByCategory(components: Record<string, any>): Record<string, any[]> {
  const grouped: Record<string, any[]> = {}
  for (const comp of Object.values(components)) {
    const cat = (comp as any).category || 'misc'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(comp)
  }
  // Sort categories for stable output
  const sorted: Record<string, any[]> = {}
  for (const key of Object.keys(grouped).sort()) {
    sorted[key] = grouped[key].sort((a: any, b: any) => a.name.localeCompare(b.name))
  }
  return sorted
}

function formatComponentCompact(comp: any): string {
  const propCount = Object.keys(comp.props || {}).length
  return `- **${comp.name}** — ${comp.description} | ${propCount} props`
}

function formatComponentFull(comp: any): string {
  const lines: string[] = []
  lines.push(`### ${comp.name}`)
  lines.push('')
  lines.push(comp.description)
  lines.push('')

  const props = comp.props || {}
  if (Object.keys(props).length > 0) {
    lines.push('**Props:**')
    for (const [name, prop] of Object.entries(props)) {
      const def = (prop as any).default !== undefined ? ` (default: ${JSON.stringify((prop as any).default)})` : ''
      const req = (prop as any).required ? ' **required**' : ''
      lines.push(`- \`${name}\`: \`${(prop as any).type}\`${def}${req}`)
    }
    lines.push('')
  }

  if (comp.slots?.length > 0) {
    lines.push(`**Slots:** ${comp.slots.map((s: string) => `\`${s}\``).join(', ')}`)
    lines.push('')
  }

  if (comp.events?.length > 0) {
    lines.push(`**Events:** ${comp.events.map((e: string) => `\`${e}\``).join(', ')}`)
    lines.push('')
  }

  if (comp.rekaUi?.length > 0) {
    lines.push(`**reka-ui:** ${comp.rekaUi.map((r: string) => `\`${r}\``).join(', ')}`)
    lines.push('')
  }

  return lines.join('\n')
}

function buildComponentSection(components: Record<string, any>, full: boolean): string {
  const grouped = groupByCategory(components)
  const lines: string[] = ['## Components', '']

  for (const [category, comps] of Object.entries(grouped)) {
    lines.push(`### ${category}`)
    lines.push('')
    for (const comp of comps) {
      if (full) {
        lines.push(formatComponentFull(comp))
      } else {
        lines.push(formatComponentCompact(comp))
      }
    }
  }

  return lines.join('\n')
}

function buildPatternsSection(components: Record<string, any>, full: boolean): string {
  const patterns = Object.values(components).filter(
    (c: any) => c.category === 'layout' || c.category === 'pattern'
  )
  if (patterns.length === 0) return ''

  const lines: string[] = ['## Composition Patterns', '']
  lines.push('Higher-level building blocks that compose base components into common UI structures.')
  lines.push('')

  for (const comp of patterns) {
    if (full) {
      lines.push(formatComponentFull(comp))
    } else {
      const propCount = Object.keys((comp as any).props || {}).length
      const slotCount = (comp as any).slots?.length || 0
      lines.push(`- **${(comp as any).name}** — ${(comp as any).description} | ${propCount} props | ${slotCount} slots`)
    }
  }

  return lines.join('\n')
}

function buildTokensSection(tokens: any[], full: boolean): string {
  const lines: string[] = ['## Design Tokens', '']
  lines.push('All tokens are CSS custom properties. Use via Tailwind or raw CSS.')
  lines.push('')

  for (const group of tokens) {
    lines.push(`### ${group.name}`)
    lines.push('')
    if (full) {
      for (const [name, value] of Object.entries(group.tokens)) {
        lines.push(`- \`${name}\`: \`${value}\``)
      }
    } else {
      const names = Object.keys(group.tokens)
      const preview = names.slice(0, 6).join(', ')
      lines.push(`${names.length} tokens: ${preview}${names.length > 6 ? '...' : ''}`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

function buildLimitationsSection(): string {
  return `## Known Limitations

- **DropdownMenu** — Placeholder component. Renders hardcoded items, not data-driven. Do not use for dynamic menus.
`
}

function buildCliSection(): string {
  return `## Query the CLI

For detail beyond this guide, use the voxel CLI:

\`\`\`bash
voxel component Button          # Full component docs
voxel component Button --props  # Props only
voxel component Button --json   # Machine-readable
voxel search "toggle"           # Search components
voxel tokens colors             # Token values
\`\`\`
`
}

function buildExamplesSection(): string {
  return `## Examples

### Login Form

\`\`\`vue
<template>
  <Card>
    <form @submit.prevent="login">
      <FormField label="Email">
        <Input v-model="email" type="email" placeholder="you@example.com" />
      </FormField>
      <FormField label="Password">
        <Input v-model="password" type="password" />
      </FormField>
      <Button type="submit" :loading="loading">Sign In</Button>
    </form>
  </Card>
</template>
\`\`\`

### Dialog Confirmation

\`\`\`vue
<template>
  <Dialog v-model:open="showConfirm">
    <template #trigger>
      <Button @click="showConfirm = true">Delete Item</Button>
    </template>
    <template #default>
      <Text tag="h3" variant="heading-lg">Confirm Deletion</Text>
      <Text variant="body-md">This action cannot be undone.</Text>
    </template>
    <template #footer>
      <Button variant="outline" @click="showConfirm = false">Cancel</Button>
      <Button color="error" @click="confirmDelete">Delete</Button>
    </template>
  </Dialog>
</template>
\`\`\`

### App Shell with Sidebar

\`\`\`vue
<template>
  <AppShell>
    <template #header>
      <Tabs v-model="activeTab">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      </Tabs>
    </template>
    <template #sidebar>
      <nav>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </template>
    <slot />
  </AppShell>
</template>
\`\`\`

### Data Table View

\`\`\`vue
<template>
  <Card>
    <PageHeader title="Users" description="Manage your team">
      <template #actions>
        <Button>Add User</Button>
      </template>
    </PageHeader>
    <DataTable :columns="columns" :items="users" :page-size="10">
      <template #cell-status="{ row }">
        <Badge :variant="row.status === 'active' ? 'success' : 'default'">
          {{ row.status }}
        </Badge>
      </template>
    </DataTable>
  </Card>
</template>
\`\`\`

### Settings Page

\`\`\`vue
<template>
  <Card>
    <PageHeader title="Settings" description="Manage your preferences" />
    <Separator />
    <FormField label="Dark Mode">
      <Switch v-model="darkMode" />
    </FormField>
    <FormField label="Language">
      <Select v-model="language" :items="languages" />
    </FormField>
    <Separator />
    <Button @click="save">Save Changes</Button>
  </Card>
</template>
\`\`\`
`
}

function buildSkillMarkdown(registry: any, options: SkillOptions): string {
  const sections: string[] = []

  sections.push(buildFrontmatter(options.target))
  sections.push(buildSetupSection(options.framework))
  sections.push(buildComponentSection(registry.components, options.full))
  sections.push(buildPatternsSection(registry.components, options.full))
  sections.push(buildTokensSection(registry.tokens, options.full))
  sections.push(buildLimitationsSection())
  sections.push(buildCliSection())
  sections.push(buildExamplesSection())

  return sections.join('\n')
}

export async function generateSkill(options: SkillOptions): Promise<void> {
  const registry = loadRegistry()
  const content = buildSkillMarkdown(registry, options)
  const filePath = resolveOutputPath(options)

  if (existsSync(filePath)) {
    const ok = await confirmOverwrite(filePath)
    if (!ok) {
      console.log('Aborted.')
      return
    }
  }

  // Ensure directory exists
  const dir = dirname(filePath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  writeFileSync(filePath, content, 'utf-8')
  console.log(`Skill file written to ${filePath}`)
  console.log(`  ${Object.keys(registry.components).length} components, ${registry.tokens.length} token groups`)
}
