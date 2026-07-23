import type { Plugin } from 'vite'
import { resolve } from 'path'

/**
 * Vite plugin that auto-injects @reference directives into Vue SFC <style> blocks
 * that use @apply, so individual components don't need to add it manually.
 */
export function vueTailwindReference(): Plugin {
  let root = process.cwd()

  return {
    name: 'vue-tailwind-reference',
    enforce: 'pre',
    configResolved(config) {
      root = config.root
    },
    transform(code, id) {
      if (!id.endsWith('.vue')) return null
      if (!code.includes('@apply')) return null
      if (code.includes('@reference')) return null

      const styleRegex = /(<style[^>]*>)/
      const match = code.match(styleRegex)
      if (!match) return null

      const referencePath = resolve(root, 'src/style.css')
      const inject = `${match[1]}\n@reference "${referencePath}";`
      return {
        code: code.replace(styleRegex, inject),
        map: null,
      }
    },
  }
}
