import { inject, provide, type InjectionKey, type Ref, type ComputedRef } from 'vue'
import type { ListDensity, SelectionMode, SelectedValue } from './List.types'

export interface ListContext {
  density: ComputedRef<ListDensity>
  separated: ComputedRef<boolean>
  selectionMode: ComputedRef<SelectionMode>
  selected: Ref<SelectedValue>
  selectItem: (value: string | number) => void
  isItemSelected: (value: string | number) => boolean
}

export const LIST_INJECTION_KEY: InjectionKey<ListContext> = Symbol('voxel-list-context')

export function provideList(context: ListContext) {
  provide(LIST_INJECTION_KEY, context)
}

export function useListContext() {
  return inject(LIST_INJECTION_KEY, null)
}
