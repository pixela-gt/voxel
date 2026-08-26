import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const referencePath = resolve(__dirname, '../../packages/ui/src/style.css')

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'vue-tailwind-reference',
      enforce: 'pre',
      transform(code, id) {
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
    },
  ],
  resolve: {
    alias: {
      '@pixela/voxel-ui/style.css': resolve(__dirname, '../../packages/ui/src/style.css'),
      '@pixela/voxel-ui': resolve(__dirname, '../../packages/ui/src/index.ts'),
    },
  },
})
