import { defineNuxtModule, addComponent, addImports } from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'
import { componentNames } from './components'

export interface VoxelOptions {
  prefix: string
  components: boolean
  theme?: string
}

const module: NuxtModule<VoxelOptions> = defineNuxtModule<VoxelOptions>({
  meta: {
    name: '@pixela-gt/voxel-ui-nuxt',
    configKey: 'voxel',
    compatibility: { nuxt: '>=3.0.0' },
  },
  defaults: {
    prefix: '',
    components: true,
    theme: undefined,
  },
  setup(options, nuxt) {
    // Register components
    if (options.components !== false) {
      for (const name of componentNames) {
        // Map VxButton -> VXButton for the export name
        const exportName = name.replace(/^Vx/, 'VX')
        addComponent({
          name: `${options.prefix}${name}`,
          export: exportName,
          filePath: '@pixela-gt/voxel-ui',
        })
      }
    }

    // Auto-import composables
    addImports([
      { name: 'useTheme', from: '@pixela-gt/voxel-ui' },
      { name: 'useThemeConfig', from: '@pixela-gt/voxel-ui' },
      { name: 'useToast', from: '@pixela-gt/voxel-ui' },
      { name: 'useSidebar', from: '@pixela-gt/voxel-ui' },
    ])

    // Add CSS — tokens first, then style, then user theme overrides
    nuxt.options.css.push('@pixela-gt/voxel-ui/tokens.css')
    nuxt.options.css.push('@pixela-gt/voxel-ui/style.css')
    if (options.theme) {
      nuxt.options.css.push(options.theme)
    }
  },
})

export default module
