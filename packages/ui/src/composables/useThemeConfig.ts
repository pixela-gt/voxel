export interface ThemeColors {
  primary?: string
  secondary?: string
  success?: string
  info?: string
  error?: string
  warning?: string
  neutral?: string
}

export interface ThemeConfig {
  colors?: ThemeColors
  fontFamilyDisplay?: string
  fontFamilyTitle?: string
  fontFamilyHeading?: string
  fontFamilyBody?: string
  fontFamilyEmphasis?: string
}

const COLOR_KEYS: Record<keyof ThemeColors, string> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  info: 'info',
  error: 'error',
  warning: 'warning',
  neutral: 'neutral',
}

const FONT_KEYS: Record<string, string> = {
  fontFamilyDisplay: 'font-display',
  fontFamilyTitle: 'font-title',
  fontFamilyHeading: 'font-heading',
  fontFamilyBody: 'font-body',
  fontFamilyEmphasis: 'font-emphasis',
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

    if (config.fontFamilyDisplay) {
      setCssVar(FONT_KEYS.fontFamilyDisplay, config.fontFamilyDisplay)
    }
    if (config.fontFamilyTitle) {
      setCssVar(FONT_KEYS.fontFamilyTitle, config.fontFamilyTitle)
    }
    if (config.fontFamilyHeading) {
      setCssVar(FONT_KEYS.fontFamilyHeading, config.fontFamilyHeading)
    }
    if (config.fontFamilyBody) {
      setCssVar(FONT_KEYS.fontFamilyBody, config.fontFamilyBody)
    }
    if (config.fontFamilyEmphasis) {
      setCssVar(FONT_KEYS.fontFamilyEmphasis, config.fontFamilyEmphasis)
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
      ...Object.values(FONT_KEYS).map((k) => `--${k}`),
    ]
    props.forEach((p) => el.style.removeProperty(p))
  }

  return { setTheme, resetTheme }
}
