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
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Voxel-UI',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', 'reka-ui', '@lucide/vue'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].mjs',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'tokens.css') {
            return 'tokens/[name].[ext]'
          }
          return 'assets/[name].[ext]'
        },
        globals: {
          vue: 'Vue',
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
