import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { resolveRegistryPath } from '../src/registry'

let root: string
let distDir: string
beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'voxel-reg-'))
  distDir = join(root, 'packages', 'cli', 'dist')
  mkdirSync(distDir, { recursive: true })
})
afterEach(() => { rmSync(root, { recursive: true, force: true }) })

describe('resolveRegistryPath', () => {
  it('prefers the local ui/src/components.json when present', () => {
    const uiSrc = join(root, 'packages', 'ui', 'src')
    mkdirSync(uiSrc, { recursive: true })
    const localPath = join(uiSrc, 'components.json')
    writeFileSync(localPath, '{}')
    expect(resolveRegistryPath(distDir)).toBe(localPath)
  })

  it('falls back to the bundled dist/components.json', () => {
    const bundledPath = join(distDir, 'components.json')
    writeFileSync(bundledPath, '{}')
    expect(resolveRegistryPath(distDir)).toBe(bundledPath)
  })

  it('throws a friendly error when neither exists', () => {
    expect(() => resolveRegistryPath(distDir)).toThrow(/registry not found/)
  })
})
