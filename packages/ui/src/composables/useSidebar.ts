import { ref, watch, effectScope, type Ref } from 'vue'

export interface UseSidebarOptions {
  storageKey?: string
  defaultCollapsed?: boolean
  defaultVisible?: boolean
}

interface SidebarInstance {
  collapsed: Ref<boolean>
  visible: Ref<boolean>
  options: UseSidebarOptions
  scope: ReturnType<typeof effectScope>
}

const instances = new Map<string, SidebarInstance>()

function ensureInstance(id: string, options: UseSidebarOptions): SidebarInstance {
  if (!instances.has(id)) {
    const collapsed = ref(options.defaultCollapsed ?? false)
    const visible = ref(options.defaultVisible ?? true)
    const scope = effectScope()

    scope.run(() => {
      const { storageKey } = options
      if (storageKey && typeof window !== 'undefined') {
        const stored = localStorage.getItem(storageKey)
        if (stored !== null) collapsed.value = stored === 'true'
        const storedVisible = localStorage.getItem(`${storageKey}-visible`)
        if (storedVisible !== null) visible.value = storedVisible === 'true'

        watch(collapsed, (val) => localStorage.setItem(storageKey, String(val)))
        watch(visible, (val) => localStorage.setItem(`${storageKey}-visible`, String(val)))
      }
    })

    instances.set(id, { collapsed, visible, options, scope })
  }

  return instances.get(id)!
}

export function useSidebar(options: UseSidebarOptions & { id?: string } = {}) {
  const { id, ...rest } = options

  if (id) {
    const instance = ensureInstance(id, rest)

    return {
      collapsed: instance.collapsed,
      visible: instance.visible,
      toggle: () => { instance.collapsed.value = !instance.collapsed.value },
      setCollapsed: (v: boolean) => { instance.collapsed.value = v },
      setVisible: (v: boolean) => { instance.visible.value = v },
      show: () => { instance.visible.value = true },
      hide: () => { instance.visible.value = false },
    }
  }

  // ponytail: no-ID path creates a throwaway instance (not registered)
  const collapsed = ref(rest.defaultCollapsed ?? false)
  const visible = ref(rest.defaultVisible ?? true)
  return {
    collapsed,
    visible,
    toggle: () => { collapsed.value = !collapsed.value },
    setCollapsed: (v: boolean) => { collapsed.value = v },
    setVisible: (v: boolean) => { visible.value = v },
    show: () => { visible.value = true },
    hide: () => { visible.value = false },
  }
}
