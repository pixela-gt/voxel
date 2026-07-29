<script setup lang="ts">
import { computed, useSlots, Fragment, Comment, Text, type VNode } from 'vue'
import type { ListProps, ListEmits, SelectedValue } from './List.types'
import { provideList } from './useListContext'
import { Separator } from '../Separator'

const props = withDefaults(defineProps<ListProps>(), {
  density: 'default',
  separated: false,
  selectionMode: 'none',
  loading: false,
} as const)

const emit = defineEmits<ListEmits>()

const selected = computed<SelectedValue>({
  get() {
    return props.selected ?? (props.selectionMode === 'multiple' ? [] : '')
  },
  set(value: SelectedValue) {
    emit('update:selected', value)
  },
})

function selectItem(value: string | number) {
  if (props.selectionMode === 'none') return

  if (props.selectionMode === 'single') {
    selected.value = selected.value === value ? '' : value
  } else {
    const arr = Array.isArray(selected.value) ? selected.value : []
    const idx = arr.indexOf(value)
    selected.value = idx >= 0 ? arr.filter((v) => v !== value) : [...arr, value]
  }
}

function isItemSelected(value: string | number): boolean {
  if (props.selectionMode === 'single') return selected.value === value
  if (props.selectionMode === 'multiple')
    return Array.isArray(selected.value) && selected.value.includes(value)
  return false
}

provideList({
  density: computed(() => props.density),
  separated: computed(() => props.separated),
  selectionMode: computed(() => props.selectionMode),
  selected,
  selectItem,
  isItemSelected,
})

const slots = useSlots()

function flattenVNodes(vnodes: VNode[]): VNode[] {
  const result: VNode[] = []
  for (const vnode of vnodes) {
    if (vnode.type === Comment) continue
    if (vnode.type === Text && typeof vnode.children === 'string' && !vnode.children.trim()) continue
    if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      result.push(...flattenVNodes(vnode.children as VNode[]))
      continue
    }
    result.push(vnode)
  }
  return result
}

const validChildren = computed(() => {
  const raw = slots.default?.()
  return raw ? flattenVNodes(raw) : []
})

const rootClasses = computed(() => [
  'voxel-list',
  `voxel-list--density-${props.density}`,
  { 'voxel-list--separated': props.separated },
  { 'voxel-list--loading': props.loading },
  props.class,
])
</script>

<template>
  <div role="list" :class="rootClasses" v-bind="$attrs">
    <template v-if="validChildren.length > 0">
      <template v-for="(child, index) in validChildren" :key="index">
        <Separator
          v-if="props.separated && index > 0"
          orientation="horizontal"
          class="voxel-list__separator"
        />
        <component :is="child" />
      </template>
    </template>
    <slot v-else name="empty" />
  </div>
</template>

<style scoped>
.voxel-list {
  @apply flex flex-col;
}

.voxel-list--density-compact {
  @apply gap-0;
}

.voxel-list--density-default {
  @apply gap-0;
}

.voxel-list--density-comfortable {
  @apply gap-0;
}

.voxel-list--separated .voxel-list__separator {
  @apply bg-[var(--color-grey-300)];
}

.voxel-list--loading {
  @apply opacity-50 cursor-wait pointer-events-none;
}
</style>
