import { resolve } from 'path'

export default defineNuxtConfig({
  ssr: false,

  css: ['@pixela-gt/voxel-ui/style.css'],

  alias: {
    '@pixela-gt/voxel-ui/style.css': resolve(__dirname, '../../packages/ui/src/style.css'),
    '@pixela-gt/voxel-ui': resolve(__dirname, '../../packages/ui/src/index.ts'),
  },
})