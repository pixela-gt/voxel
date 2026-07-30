import type { App } from 'vue'
import './tokens/tokens.css'
import './style.css'
import * as components from './index'

export interface VoxelOptions {
  components?: boolean
}

export function createVoxel(options: VoxelOptions = {}) {
  return {
    install(app: App) {
      if (options.components !== false) {
        for (const [name, component] of Object.entries(components)) {
          if (name.startsWith('VX') && typeof component !== 'string') {
            app.component(name, component)
          }
        }
      }
    },
  }
}
