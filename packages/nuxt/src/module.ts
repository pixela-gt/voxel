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
    name: '@pixela/voxel-ui-nuxt',
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
          filePath: '@pixela/voxel-ui',
        })
      }
    }

    // Auto-import composables
    addImports([
      { name: 'useTheme', from: '@pixela/voxel-ui' },
      { name: 'useThemeConfig', from: '@pixela/voxel-ui' },
      { name: 'useToast', from: '@pixela/voxel-ui' },
      { name: 'useSidebar', from: '@pixela/voxel-ui' },
    ])

    // Add CSS — tokens first, then style, then user theme overrides
    nuxt.options.css.push('@pixela/voxel-ui/tokens.css')
    nuxt.options.css.push('@pixela/voxel-ui/style.css')
    if (options.theme) {
      nuxt.options.css.push(options.theme)
    }
  },
})

export default module
