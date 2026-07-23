export interface ThemeColors {
  primary?: string
  secondary?: string
  info?: string
  error?: string
  warning?: string
  success?: string
}

export interface ThemeConfig {
  colors?: ThemeColors
  fontFamily?: string
}

const COLOR_KEYS: Record<keyof ThemeColors, string> = {
  primary: 'primary',
  secondary: 'secondary',
  info: 'info',
  error: 'error',
  warning: 'warning',
  success: 'success',
}

function generateColorScale(base: string): { darken: string; lighten: string } {
  return {
    darken: `color-mix(in srgb, ${base}, #000 20%)`,
    lighten: `color-mix(in srgb, ${base}, #fff 30%)`,
  }
}

function setCssVar(name: string, value: string) {
  document.documentElement.style.setProperty(`--${name}`, value)
}

export function useThemeConfig() {
  function setTheme(config: ThemeConfig) {
    if (config.colors) {
      for (const [key, value] of Object.entries(config.colors)) {
        if (!value) continue
        const varName = COLOR_KEYS[key as keyof ThemeColors]
        if (!varName) continue

        setCssVar(`color-${varName}-base`, value)

        const { darken, lighten } = generateColorScale(value)
        setCssVar(`color-${varName}-darken-1`, darken)
        setCssVar(`color-${varName}-lighten-1`, lighten)
      }
    }

    if (config.fontFamily) {
      setCssVar('font-family-sans', config.fontFamily)
    }
  }

  function resetTheme() {
    const el = document.documentElement
    const props = [
      ...Object.values(COLOR_KEYS).flatMap((k) => [
        `--color-${k}-base`,
        `--color-${k}-darken-1`,
        `--color-${k}-lighten-1`,
      ]),
      '--font-family-sans',
    ]
    props.forEach((p) => el.style.removeProperty(p))
  }

  return { setTheme, resetTheme }
}
