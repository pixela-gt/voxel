export type BannerVariant = 'default' | 'info' | 'success' | 'warning' | 'error'

export interface BannerOptions {
  title?: string
  description?: string
  variant?: BannerVariant
  dismissible?: boolean
  duration?: number
}

export interface BannerEntry extends BannerOptions {
  id: string
  open: boolean
}
