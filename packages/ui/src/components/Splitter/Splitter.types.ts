import type { ClassValue } from '../../types/shared'

export interface SplitterGroupProps {
  direction: 'horizontal' | 'vertical'
  autoSaveId?: string | null
  keyboardResizeBy?: number | null
  class?: ClassValue
}

export interface SplitterPanelProps {
  defaultSize?: number
  minSize?: number
  maxSize?: number
  collapsedSize?: number
  collapsible?: boolean
  order?: number
  class?: ClassValue
}

export interface SplitterResizeHandleProps {
  disabled?: boolean
  class?: ClassValue
}
