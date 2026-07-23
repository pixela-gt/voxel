import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@pixela-gt/voxel-ui': resolve(__dirname, '../../packages/ui/src/index.ts'),
      '@pixela-gt/voxel-ui/style.css': resolve(__dirname, '../../packages/ui/src/style.css'),
    },
  },
})