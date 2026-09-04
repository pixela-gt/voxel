import type { InjectionKey, Ref } from 'vue'
import type { ClassValue } from '../../types/shared'

// Root wrapper
export interface BreadcrumbProps {
  separator?: string
  /** Show separator before the first item. Defaults to true. */
  leading?: boolean
  /** Show separator after the last item. Defaults to true. */
  trailing?: boolean
  class?: ClassValue
}

// Individual breadcrumb item
export interface BreadcrumbItemProps {
  to?: string
  href?: string
  active?: boolean
  disabled?: boolean
  class?: ClassValue
}

// Context for provide/inject
export interface BreadcrumbContext {
  separator: string
  leading: boolean
  trailing: boolean
  items: Ref<string[]>
  register: (uid: string) => void
  unregister: (uid: string) => void
}

export const BREADCRUMB_KEY: InjectionKey<BreadcrumbContext> = Symbol('voxelBreadcrumb')
