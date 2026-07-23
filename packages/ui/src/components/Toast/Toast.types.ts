export interface ToastOptions {
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export interface ToastEntry extends ToastOptions {
  id: string
  open: boolean
  duration: number
}
