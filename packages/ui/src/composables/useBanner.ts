import { ref, type Ref } from 'vue'
import type { BannerEntry, BannerOptions } from '../components/Banner/Banner.types'

interface BannerStore {
  banners: Ref<BannerEntry[]>
  push: (options: BannerOptions) => string
  dismiss: (id: string) => void
}

let counter = 0
const nextId = () => `voxel-banner-${++counter}`

const banners = ref<BannerEntry[]>([])

const dismiss = (id: string) => {
  banners.value = banners.value.map((b) => (b.id === id ? { ...b, open: false } : b))
  setTimeout(() => {
    banners.value = banners.value.filter((b) => b.id !== id)
  }, 200)
}

const push = (options: BannerOptions): string => {
  const id = nextId()
  const entry: BannerEntry = {
    id,
    open: true,
    dismissible: options.dismissible ?? true,
    ...options,
  }
  banners.value = [...banners.value, entry]
  if (entry.duration && entry.duration > 0) {
    setTimeout(() => dismiss(id), entry.duration)
  }
  return id
}

const store: BannerStore = { banners, push, dismiss }

// ponytail: module-level singleton, same pattern as useToast
export function provideBannerStore(): BannerStore {
  return store
}

export function useBannerStore(): BannerStore {
  return store
}

export interface UseBanner {
  banner: (options: BannerOptions) => string
  success: (title: string, description?: string) => string
  error: (title: string, description?: string) => string
  warning: (title: string, description?: string) => string
  info: (title: string, description?: string) => string
  dismiss: (id: string) => void
}

export function useBanner(): UseBanner {
  return {
    banner: (options) => store.push(options),
    success: (title, description) => store.push({ title, description, variant: 'success' }),
    error: (title, description) => store.push({ title, description, variant: 'error' }),
    warning: (title, description) => store.push({ title, description, variant: 'warning' }),
    info: (title, description) => store.push({ title, description, variant: 'info' }),
    dismiss: (id) => store.dismiss(id),
  }
}
