import type { InjectionKey } from 'vue'
import type { ClassValue } from '../../types/shared'

export interface FormFieldContext {
  id: string
  errorMessage?: string
  /** Set by the first control that claims the field id (first-consumer-wins); later siblings fall back to their own generated id. */
  claimed?: boolean
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
