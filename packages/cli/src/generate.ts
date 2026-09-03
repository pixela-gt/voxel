import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { resolve, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const UI_SRC = resolve(__dirname, '../../ui/src')
const UI_OUTPUT = resolve(__dirname, '../../ui/src/components.json')
const BUNDLED_OUTPUT = resolve(__dirname, '../dist/components.json')

interface PropInfo {
  type: string
  default?: string | number | boolean
  required?: boolean
  description?: string
}

interface ComponentInfo {
  name: string
  description: string
  category: string
  props: Record<string, PropInfo>
  slots: string[]
  events: string[]
  rekaUi: string[]
  import: string
}

interface TokenGroup {
  name: string
  tokens: Record<string, string>
}

function extractProps(typesContent: string): Record<string, PropInfo> {
  const props: Record<string, PropInfo> = {}

  // Match interface blocks (allow optional generic between name and `{`)
  const interfaceRegex = /export\s+interface\s+\w+Props(?:<[^>]+>)?\s*\{([^}]+)\}/gs
  let match
  while ((match = interfaceRegex.exec(typesContent)) !== null) {
    const body = match[1]
    const propLines = body.split('\n').filter(l => l.trim() && !l.trim().startsWith('//'))

    for (const line of propLines) {
      // Match: name?: type
      const propMatch = line.match(/(\w+)\??:\s*(.+?)(?:\s*=.*)?$/)
      if (propMatch) {
        const [, name, rawType] = propMatch
        const required = !line.includes('?')
        const type = rawType.trim().replace(/;$/, '')

        props[name] = { type, required }
      }
    }
  }

  return props
}

function extractDefaults(vueContent: string): Record<string, string | number | boolean> {
  const defaults: Record<string, string | number | boolean> = {}

  // Match withDefaults(defineProps<T>(), { ... })
  const defaultsMatch = vueContent.match(/withDefaults\(defineProps<\w+>\(\),\s*\{([^}]+)\}/s)
  if (defaultsMatch) {
    const body = defaultsMatch[1]
    const lines = body.split('\n').filter(l => l.trim())

    for (const line of lines) {
      const defMatch = line.match(/(\w+):\s*(.+?),?\s*$/)
      if (defMatch) {
        const [, name, value] = defMatch
        const trimmed = value.trim().replace(/,$/, '')
        if (trimmed === 'true') defaults[name] = true
        else if (trimmed === 'false') defaults[name] = false
        else if (trimmed.startsWith("'") && trimmed.endsWith("'")) defaults[name] = trimmed.slice(1, -1)
        else if (trimmed.startsWith('"') && trimmed.endsWith('"')) defaults[name] = trimmed.slice(1, -1)
        else if (!isNaN(Number(trimmed))) defaults[name] = Number(trimmed)
        else defaults[name] = trimmed
      }
    }
  }

  // Also check defineProps<T>() without withDefaults (simpler pattern)
  const simplePropsMatch = vueContent.match(/defineProps<(\w+)>\(\)/)
  if (simplePropsMatch && !defaultsMatch) {
    // No defaults, all optional props get no default
  }

  return defaults
}

function extractSlots(vueContent: string): string[] {
  const slots: string[] = []
  const slotRegex = /<slot\s+name="([^"]+)"/g
  let match
  while ((match = slotRegex.exec(vueContent)) !== null) {
    slots.push(match[1])
  }

  // Check for default slot (unnamed <slot />)
  if (vueContent.match(/<slot\s*\/?>/)) {
    const hasDefault = vueContent.match(/<slot\s+name=/)
    if (!hasDefault) {
      slots.unshift('default')
    }
  }

  return [...new Set(slots)]
}

function extractEvents(vueContent: string): string[] {
  const events: string[] = []

  // Match defineEmits<{ ... }>
  const emitsMatch = vueContent.match(/defineEmits<\{([^}]+)\}>/s)
  if (emitsMatch) {
    const body = emitsMatch[1]
    const eventLines = body.split('\n').filter(l => l.trim())
    for (const line of eventLines) {
      const eventMatch = line.match(/(\w+)\s*(?:\(\[.*?\]\))?\s*[,:]/)
      if (eventMatch) {
        events.push(eventMatch[1])
      }
    }
  }

  return events
}

function extractRekaUi(vueContent: string): string[] {
  const imports: string[] = []
  const rekaMatch = vueContent.match(/import\s*\{([^}]+)\}\s*from\s*['"]reka-ui['"]/)
  if (rekaMatch) {
    const items = rekaMatch[1].split(',').map(s => s.trim()).filter(Boolean)
    imports.push(...items)
  }
  return imports
}

function inferCategory(name: string, sourceDir?: string): string {
  if (sourceDir === 'layouts') return 'layout'
  if (sourceDir === 'patterns') return 'pattern'

  const categories: Record<string, string[]> = {
    actions: ['Button', 'IconButton', 'Link', 'Toggle', 'ToggleGroup'],
    inputs: [
      'Checkbox',
      'Switch',
      'RadioGroup',
      'RadioItem',
      'Input',
      'Textarea',
      'FormField',
      'MaskedInput',
    ],
    navigation: [
      'Tabs', 'TabsList', 'TabsTrigger', 'TabsContent', 'Accordion',
      'Sidebar', 'SidebarItem', 'SidebarItemGroup', 'SidebarSection', 'SidebarHeading', 'SidebarCollapseButton',
      'NavigationMenu', 'NavigationMenuList', 'NavigationMenuItem', 'NavigationMenuTrigger',
      'NavigationMenuContent', 'NavigationMenuLink', 'NavigationMenuSection',
    ],
    layout: ['Card', 'Separator', 'Drawer'],
    overlays: ['Dialog', 'Tooltip', 'DropdownMenu'],
    data: ['Avatar', 'Badge', 'Text'],
  }

  for (const [cat, names] of Object.entries(categories)) {
    if (names.includes(name)) return cat
  }
  return 'misc'
}

function extractTokens(cssContent: string): TokenGroup[] {
  const groups: TokenGroup[] = []

  // Extract the :root block
  const rootMatch = cssContent.match(/:root\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s)
  if (!rootMatch) return groups

  const rootContent = rootMatch[1]

  // Group by comment sections
  const sections = rootContent.split(/\/\*\s*(.+?)\s*\*\//g)

  let currentGroup = 'general'
  const tokenGroups: Record<string, Record<string, string>> = {}

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i]
    if (i % 2 === 1) {
      // This is a comment (section name)
      currentGroup = section.trim()
      if (!tokenGroups[currentGroup]) tokenGroups[currentGroup] = {}
    } else {
      // This is content with tokens
      const tokenMatches = section.matchAll(/(--[\w-]+):\s*([^;]+);/g)
      for (const match of tokenMatches) {
        const [, name, value] = match
        if (!tokenGroups[currentGroup]) tokenGroups[currentGroup] = {}
        tokenGroups[currentGroup][name] = value.trim()
      }
    }
  }

  for (const [name, tokens] of Object.entries(tokenGroups)) {
    if (Object.keys(tokens).length > 0) {
      groups.push({ name, tokens })
    }
  }

  return groups
}

function scanDirectory(baseDir: string, sourceDir: string, components: Record<string, ComponentInfo>): void {
  if (!existsSync(baseDir)) return

  const dirs = readdirSync(baseDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  for (const dir of dirs) {
    const dirPath = join(baseDir, dir)
    const typesFile = join(dirPath, `${dir}.types.ts`)
    const vueFile = join(dirPath, `${dir}.vue`)

    if (!existsSync(typesFile) || !existsSync(vueFile)) continue

    const typesContent = readFileSync(typesFile, 'utf-8')
    const vueContent = readFileSync(vueFile, 'utf-8')

    const props = extractProps(typesContent)
    const defaults = extractDefaults(vueContent)
    const slots = extractSlots(vueContent)
    const events = extractEvents(vueContent)
    const rekaUi = extractRekaUi(vueContent)

    // Apply defaults to props
    for (const [name, prop] of Object.entries(props)) {
      if (name in defaults) {
        prop.default = defaults[name]
      }
    }

    // Try to get description from types file comments
    let description = `${dir} ${sourceDir === 'components' ? 'component' : sourceDir.slice(0, -1)}`
    const descMatch = typesContent.match(/\/\/\s*(.+)/)
    if (descMatch) description = descMatch[1]

    const category = inferCategory(dir, sourceDir)

    components[dir] = {
      name: dir,
      description,
      category,
      props,
      slots,
      events,
      rekaUi,
      import: `import { ${dir} } from '@pixela/voxel-ui'`,
    }
  }
}

function generate(): void {
  const components: Record<string, ComponentInfo> = {}

  // Scan components, layouts, and patterns directories
  scanDirectory(join(UI_SRC, 'components'), 'components', components)
  scanDirectory(join(UI_SRC, 'layouts'), 'layouts', components)
  scanDirectory(join(UI_SRC, 'patterns'), 'patterns', components)

  // Extract tokens
  const tokensFile = join(UI_SRC, 'tokens', 'tokens.css')
  let tokens: TokenGroup[] = []
  if (existsSync(tokensFile)) {
    const cssContent = readFileSync(tokensFile, 'utf-8')
    tokens = extractTokens(cssContent)
  }

  const output = {
    version: 1,
    generated: new Date().toISOString(),
    components,
    tokens,
  }

  const jsonStr = JSON.stringify(output, null, 2)
  writeFileSync(UI_OUTPUT, jsonStr)
  mkdirSync(dirname(BUNDLED_OUTPUT), { recursive: true })
  writeFileSync(BUNDLED_OUTPUT, jsonStr)

  console.log(`Generated ${UI_OUTPUT} and ${BUNDLED_OUTPUT}`)
  console.log(`  ${Object.keys(components).length} components`)
  console.log(`  ${tokens.length} token groups`)
}

generate()
