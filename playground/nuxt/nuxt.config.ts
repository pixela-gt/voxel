export default defineNuxtConfig({
  ssr: false,

  css: ['@pixela-gt/voxel-ui/style.css'],

  alias: {
    '@pixela-gt/voxel-ui': resolve(__dirname, '../../src/index.ts'),
    '@pixela-gt/voxel-ui/style.css': resolve(__dirname, '../../src/style.css'),
  },
})