#!/usr/bin/env node
import { Command } from 'commander'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadRegistry } from './registry.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

function formatProps(props: Record<string, any>): string {
  const lines: string[] = []
  for (const [name, prop] of Object.entries(props)) {
    const def = prop.default !== undefined ? ` (default: ${JSON.stringify(prop.default)})` : ''
    const req = prop.required ? ' **required**' : ''
    lines.push(`  ${name}: ${prop.type}${def}${req}`)
  }
  return lines.join('\n')
}

function formatComponent(name: string, comp: any, dense = false): string {
  if (dense) {
    const propCount = Object.keys(comp.props).length
    return `${name} — ${comp.description} | ${propCount} props | slots: ${comp.slots.join(', ') || 'none'}`
  }

  const lines: string[] = []
  lines.push(`# ${name}`)
  lines.push('')
  lines.push(comp.description)
  lines.push('')
  lines.push(`Category: ${comp.category}`)
  lines.push(`Import: ${comp.import}`)
  lines.push('')

  if (comp.rekaUi.length > 0) {
    lines.push(`reka-ui: ${comp.rekaUi.join(', ')}`)
    lines.push('')
  }

  if (Object.keys(comp.props).length > 0) {
    lines.push('## Props')
    lines.push(formatProps(comp.props))
    lines.push('')
  }

  if (comp.slots.length > 0) {
    lines.push(`## Slots: ${comp.slots.join(', ')}`)
    lines.push('')
  }

  if (comp.events.length > 0) {
    lines.push(`## Events: ${comp.events.join(', ')}`)
    lines.push('')
  }

  return lines.join('\n')
}

const program = new Command()

program
  .name('voxel')
  .description('Voxel design system CLI — component docs, tokens, and agent tooling')
  .version('0.1.0')

program
  .command('component [name]')
  .description('List components or print component docs')
  .option('--props', 'Print only the props table')
  .option('--list', 'List all components')
  .option('--json', 'Output as typed JSON')
  .option('--dense', 'Token-efficient output for AI agents')
  .action((name: string | undefined, options: any) => {
    const registry = loadRegistry()
    const components = registry.components

    if (options.json) {
      if (!name) {
        const list = Object.keys(components).map(n => ({
          name: n,
          description: components[n].description,
          category: components[n].category,
        }))
        console.log(JSON.stringify({ type: 'component.list', data: list }, null, 2))
      } else if (components[name]) {
        const comp = components[name]
        if (options.props) {
          console.log(JSON.stringify({ type: 'component.detail.props', data: { name, props: comp.props } }, null, 2))
        } else {
          console.log(JSON.stringify({ type: 'component.detail', data: comp }, null, 2))
        }
      } else {
        const suggestions = Object.keys(components)
          .filter(n => n.toLowerCase().includes(name.toLowerCase()))
          .map(n => ({ name: n, reason: 'similar name' }))
        console.log(JSON.stringify({
          error: `No component named "${name}"`,
          code: 'ERR_UNKNOWN_COMPONENT',
          suggestions,
        }, null, 2))
        process.exit(1)
      }
      return
    }

    if (!name || options.list) {
      const lines = Object.keys(components).map(n =>
        options.dense
          ? formatComponent(n, components[n], true)
          : `  ${n} — ${components[n].description}`
      )
      console.log('Components:\n')
      console.log(lines.join('\n'))
      return
    }

    if (!components[name]) {
      console.error(`Unknown component: ${name}`)
      console.error(`Available: ${Object.keys(components).join(', ')}`)
      process.exit(1)
    }

    if (options.props) {
      console.log(`${name} props:\n`)
      console.log(formatProps(components[name].props))
    } else {
      console.log(formatComponent(name, components[name], options.dense))
    }
  })

program
  .command('tokens [category]')
  .description('Print design tokens')
  .option('--json', 'Output as typed JSON')
  .option('--dense', 'Token-efficient output')
  .action((category: string | undefined, options: any) => {
    const registry = loadRegistry()
    const tokens = registry.tokens

    if (options.json) {
      if (!category) {
        console.log(JSON.stringify({ type: 'tokens.list', data: tokens }, null, 2))
      } else {
        const group = tokens.find((t: any) => t.name.toLowerCase().includes(category.toLowerCase()))
        if (group) {
          console.log(JSON.stringify({ type: 'tokens.detail', data: group }, null, 2))
        } else {
          console.log(JSON.stringify({
            error: `No token category matching "${category}"`,
            code: 'ERR_UNKNOWN_TOKEN_CATEGORY',
          }, null, 2))
          process.exit(1)
        }
      }
      return
    }

    if (!category) {
      console.log('Token categories:\n')
      for (const group of tokens) {
        const count = Object.keys(group.tokens).length
        console.log(`  ${group.name} (${count} tokens)`)
      }
      return
    }

    const group = tokens.find((t: any) => t.name.toLowerCase().includes(category.toLowerCase()))
    if (!group) {
      console.error(`Unknown token category: ${category}`)
      console.error(`Available: ${tokens.map((t: any) => t.name).join(', ')}`)
      process.exit(1)
    }

    console.log(`${group.name} tokens:\n`)
    for (const [name, value] of Object.entries(group.tokens)) {
      if (options.dense) {
        console.log(`  ${name}: ${value}`)
      } else {
        console.log(`  ${name} = ${value}`)
      }
    }
  })

program
  .command('search <query>')
  .description('Search across components')
  .option('--json', 'Output as typed JSON')
  .option('--limit <n>', 'Max results', '10')
  .action((query: string, options: any) => {
    const registry = loadRegistry()
    const components = registry.components
    const q = query.toLowerCase()

    const results = Object.values(components)
      .map((comp: any) => {
        let score = 0
        if (comp.name.toLowerCase().includes(q)) score += 10
        if (comp.name.toLowerCase().startsWith(q)) score += 5
        if (comp.description.toLowerCase().includes(q)) score += 3
        if (comp.category.toLowerCase().includes(q)) score += 2

        const propNames = Object.keys(comp.props || {})
        if (propNames.some(p => p.toLowerCase().includes(q))) score += 1

        return { ...comp, score }
      })
      .filter((c: any) => c.score > 0)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, Number(options.limit))

    if (options.json) {
      console.log(JSON.stringify({
        type: 'search',
        data: {
          query,
          results: results.map((r: any) => ({
            name: r.name,
            description: r.description,
            category: r.category,
            score: r.score,
          })),
        },
      }, null, 2))
      return
    }

    if (results.length === 0) {
      console.log(`No results for "${query}"`)
      return
    }

    console.log(`Results for "${query}":\n`)
    for (const r of results) {
      console.log(`  [${r.category}] ${r.name}`)
      console.log(`    ${r.description}`)
      console.log(`    → voxel component ${r.name}`)
      console.log('')
    }
  })

program
  .command('generate')
  .description('Regenerate components.json from source')
  .action(async () => {
    const { existsSync } = await import('node:fs')
    const uiSrc = resolve(__dirname, '../../ui/src')
    if (!existsSync(uiSrc)) {
      console.error('voxel generate must be run inside the voxel monorepo (packages/ui/src not found).')
      process.exit(1)
    }
    const { execSync } = await import('node:child_process')
    const scriptPath = resolve(__dirname, 'generate.ts')
    execSync(`npx tsx "${scriptPath}"`, { stdio: 'inherit', cwd: resolve(__dirname, '../..') })
  })

program
  .command('init')
  .description('Generate an AI agent skill file for voxel')
  .option('--target <target>', 'Skill target: claude, cursor, opencode, md', 'claude')
  .option('--full', 'Full depth: slots, events, reka-ui mapping, complete tokens')
  .option('--framework <framework>', 'Framework coverage: vue, nuxt, both', 'both')
  .option('--output <path>', 'Custom output path (overrides target default)')
  .option('--global', 'Install skill to user-level config (opencode only)')
  .action(async (options: any) => {
    const { generateSkill } = await import('./skill')
    await generateSkill({ ...options, global: options.global })
  })

program.parse()
