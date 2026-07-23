import type { ClassValue, IconValue } from '../../types/shared'

export interface AccordionProps {
  modelValue?: string | string[]
  type?: 'single' | 'multiple'
  collapsible?: boolean
  disabled?: boolean
  class?: ClassValue
}

export interface AccordionItemProps {
  value: string
  disabled?: boolean
  class?: ClassValue
}

export interface AccordionHeaderProps {
  class?: ClassValue
}

export interface AccordionTriggerProps {
  icon?: IconValue
  class?: ClassValue
}

export interface AccordionContentProps {
  class?: ClassValue
}
