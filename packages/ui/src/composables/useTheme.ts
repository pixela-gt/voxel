import { ref, computed, onMounted, watch, type Ref } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

export function useTheme() {
  const theme: Ref<ThemeMode> = ref('system')

  const resolvedTheme = computed(() => {
    if (theme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme.value
  })

  function setTheme(mode: ThemeMode) {
    theme.value = mode
  }

  function applyTheme(mode: 'light' | 'dark') {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  onMounted(() => {
    const stored = localStorage.getItem('theme') as ThemeMode | null
    if (stored) {
      theme.value = stored
    }
    applyTheme(resolvedTheme.value)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (theme.value === 'system') {
        applyTheme(resolvedTheme.value)
      }
    })
  })

  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    applyTheme(resolvedTheme.value)
  })

  return {
    theme,
    resolvedTheme,
    setTheme,
  }
}