import type { ClassValue } from '../../types/shared'

// ponytail: alpha, reka API may shift
export interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
  disabled?: boolean
}

export interface TreeProps {
  modelValue?: string[]
  defaultValue?: string[]
  expanded?: string[]
  defaultExpanded?: string[]
  items: TreeNode[]
  selectionBehavior?: 'toggle' | 'replace'
  propagateSelect?: boolean
  size?: 'small' | 'default' | 'large'
  class?: ClassValue
}
