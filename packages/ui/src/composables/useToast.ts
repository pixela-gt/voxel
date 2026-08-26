import { ref, type Ref } from 'vue'
import type { ToastEntry, ToastOptions } from '../components/Toast/Toast.types'

interface ToastStore {
  toasts: Ref<ToastEntry[]>
  push: (options: ToastOptions) => string
  dismiss: (id: string) => void
}

let counter = 0
const nextId = () => `voxel-toast-${++counter}`

const toasts = ref<ToastEntry[]>([])

const dismiss = (id: string) => {
  toasts.value = toasts.value.map((t) => (t.id === id ? { ...t, open: false } : t))
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }, 200)
}

const push = (options: ToastOptions): string => {
  const id = nextId()
  const entry: ToastEntry = {
    id,
    open: true,
    duration: options.duration ?? 5000,
    ...options,
  }
  toasts.value = [...toasts.value, entry]
  if (entry.duration > 0) {
    setTimeout(() => dismiss(id), entry.duration)
  }
  return id
}

const store: ToastStore = { toasts, push, dismiss }

// ponytail: module-level singleton so useToast() works without a ToastProvider,
// mirroring useTheme/useSidebar. If per-instance scoping is ever needed, convert
// back to provide/inject keyed on a store instance.
export function provideToastStore(): ToastStore {
  return store
}

export function useToastStore(): ToastStore {
  return store
}

export interface UseToast {
  toast: (options: ToastOptions) => string
  success: (title: string, description?: string) => string
  error: (title: string, description?: string) => string
  warning: (title: string, description?: string) => string
  info: (title: string, description?: string) => string
  dismiss: (id: string) => void
}

export function useToast(): UseToast {
  return {
    toast: (options) => store.push(options),
    success: (title, description) => store.push({ title, description, variant: 'success' }),
    error: (title, description) => store.push({ title, description, variant: 'error' }),
    warning: (title, description) => store.push({ title, description, variant: 'warning' }),
    info: (title, description) => store.push({ title, description, variant: 'info' }),
    dismiss: (id) => store.dismiss(id),
  }
}