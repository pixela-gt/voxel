import type { InjectionKey } from 'vue'
import type { ClassValue } from '../../types/shared'

export interface FormFieldContext {
  id: string
  errorMessage?: string
}

export const FORM_FIELD_KEY: InjectionKey<FormFieldContext> = Symbol('voxelFormField')

export interface FormFieldProps {
  label?: string
  hint?: string
  errorMessage?: string
  required?: boolean
  density?: 'default' | 'dense'
  id?: string
  class?: ClassValue
}
