import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export function resolveRegistryPath(baseDir: string = __dirname): string {
  const local = resolve(baseDir, '../../ui/src/components.json')
  if (existsSync(local)) return local

  const bundled = resolve(baseDir, 'components.json')
  if (existsSync(bundled)) return bundled

  throw new Error(
    'Voxel registry not found. Run `voxel generate` inside the voxel repo, ' +
    'or reinstall @pixela/voxel-cli to restore the bundled registry.'
  )
}

export function loadRegistry<T = any>(baseDir?: string): T {
  return JSON.parse(readFileSync(resolveRegistryPath(baseDir), 'utf-8'))
}