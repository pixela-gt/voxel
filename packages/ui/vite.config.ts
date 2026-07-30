import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { vueTailwindReference } from './vite-plugins/vue-tailwind-reference'

export default defineConfig({
  plugins: [
    vue(),
    vueTailwindReference(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        plugin: resolve(__dirname, 'src/plugin.ts'),
        'layouts/index': resolve(__dirname, 'src/layouts/index.ts'),
        'patterns/index': resolve(__dirname, 'src/patterns/index.ts'),
        'composables/index': resolve(__dirname, 'src/composables/index.ts'),
      },
      name: 'Voxel-UI',
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.mjs`,
    },
    rollupOptions: {
      external: ['vue', 'reka-ui', '@lucide/vue'],
      output: {
        entryFileNames: '[name].mjs',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'asset'
          if (name === 'style.css') {
            return '[name].[ext]'
          }
          return 'assets/[name].[ext]'
        },
        globals: {
          vue: 'Vue',
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
