import type { StorybookConfig } from '@storybook/vue3-vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const referencePath = resolve(__dirname, '../src/style.css')

    config.plugins = config.plugins || []
    config.plugins.push({
      name: 'vue-tailwind-reference',
      enforce: 'pre',
      transform(code: string, id: string) {
        if (!id.endsWith('.vue')) return null
        if (!code.includes('@apply')) return null
        if (code.includes('@reference')) return null

        const styleRegex = /(<style[^>]*>)/
        const match = code.match(styleRegex)
        if (!match) return null

        const inject = `${match[1]}\n@reference "${referencePath}";`
        return {
          code: code.replace(styleRegex, inject),
          map: null,
        }
      },
    })

    return config
  },
}

export default config
