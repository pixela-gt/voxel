import type { ClassValue, IconValue } from '../../types/shared'

// Root wrapper
// `open`/`defaultOpen` are NOT declared as props here — they flow through
// `$attrs` to Drawer, avoiding Vue 3's boolean-casting bug on undefined defaults.
export interface MobileNavProps {
  /** Breakpoint for mobile detection. Defaults to '768px'. */
  breakpoint?: string
  /** Drawer width. Numbers become px; strings pass through. Defaults to 255px. */
  width?: number | string
  /** Title displayed in drawer header. */
  title?: string
  /** Close icon component. */
  closeIcon?: IconValue
  class?: ClassValue
}

// Toggle button
export interface MobileNavToggleProps {
  /** Icon to display. Defaults to Menu icon. */
  icon?: IconValue
  /** Aria label for the toggle button. */
  ariaLabel?: string
  class?: ClassValue
}
