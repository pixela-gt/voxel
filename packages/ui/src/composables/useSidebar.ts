import { ref, watch, type Ref } from 'vue'

export interface UseSidebarOptions {
  storageKey?: string
  defaultCollapsed?: boolean
}

export function useSidebar(options: UseSidebarOptions = {}) {
  const { storageKey, defaultCollapsed = false } = options
  const collapsed: Ref<boolean> = ref(defaultCollapsed)

  if (storageKey && typeof window !== 'undefined') {
    const stored = localStorage.getItem(storageKey)
    if (stored !== null) {
      collapsed.value = stored === 'true'
    }
  }

  function toggle() {
    collapsed.value = !collapsed.value
  }

  function setCollapsed(value: boolean) {
    collapsed.value = value
  }

  if (storageKey && typeof window !== 'undefined') {
    watch(collapsed, (val) => {
      localStorage.setItem(storageKey, String(val))
    })
  }

  return {
    collapsed,
    toggle,
    setCollapsed,
  }
}
