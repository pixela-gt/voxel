import type { ClassValue } from '../../types/shared'

export interface FileInputProps {
  modelValue?: FileList | null
  value?: FileList | null // VeeValidate compatibility
  multiple?: boolean
  accept?: string
  disabled?: boolean
  name?: string
  errorMessage?: string
  dragoverText?: string
  browseText?: string
  class?: ClassValue
}
