import { ref, watch, type Ref } from 'vue'

export interface UseSidebarOptions {
  storageKey?: string
  defaultCollapsed?: boolean
  defaultVisible?: boolean
}

const collapsed: Ref<boolean> = ref(false)
const visible: Ref<boolean> = ref(true)
let initialized = false

export function useSidebar(options: UseSidebarOptions = {}) {
  if (!initialized) {
    const { storageKey, defaultCollapsed = false, defaultVisible = true } = options

    collapsed.value = defaultCollapsed
    visible.value = defaultVisible

    if (storageKey && typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey)
      if (stored !== null) {
        collapsed.value = stored === 'true'
      }
      const storedVisible = localStorage.getItem(`${storageKey}-visible`)
      if (storedVisible !== null) {
        visible.value = storedVisible === 'true'
      }

      watch(collapsed, (val) => {
        localStorage.setItem(storageKey, String(val))
      })
      watch(visible, (val) => {
        localStorage.setItem(`${storageKey}-visible`, String(val))
      })
    }

    initialized = true
  }

  function toggle() {
    collapsed.value = !collapsed.value
  }

  function setCollapsed(value: boolean) {
    collapsed.value = value
  }

  function setVisible(value: boolean) {
    visible.value = value
  }

  function show() {
    visible.value = true
  }

  function hide() {
    visible.value = false
  }

  return {
    collapsed,
    visible,
    toggle,
    setCollapsed,
    setVisible,
    show,
    hide,
  }
}
