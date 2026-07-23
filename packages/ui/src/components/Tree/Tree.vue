<script setup lang="ts">
import { computed } from 'vue'
import { TreeRoot, TreeItem } from 'reka-ui'
import type { TreeProps, TreeNode } from './Tree.types'

const props = withDefaults(defineProps<TreeProps>(), {
  selectionBehavior: 'toggle',
  propagateSelect: true,
  size: 'default',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  'update:expanded': [value: string[]]
  select: [value: string]
  toggle: [value: string]
}>()

const rootClass = computed(() => ['voxel-tree', `voxel-tree--size-${props.size}`, props.class])

const flatten = (nodes: TreeNode[], depth = 0): { node: TreeNode; depth: number }[] => {
  const result: { node: TreeNode; depth: number }[] = []
  for (const n of nodes) {
    result.push({ node: n, depth })
    if (n.children?.length) result.push(...flatten(n.children, depth + 1))
  }
  return result
}

const flat = computed(() => flatten(props.items))

const getKey = (item: TreeNode) => item.id
const getChildren = (item: TreeNode) => item.children ?? []

const isExpanded = (id: string) => {
  const expanded = props.expanded ?? props.defaultExpanded ?? []
  return expanded.includes(id)
}

const isSelected = (id: string) => {
  const value = props.modelValue ?? []
  return value.includes(id)
}

const hasChildren = (item: TreeNode) => Array.isArray(item.children) && item.children.length > 0

const toggleExpand = (id: string) => {
  const current = props.expanded ?? props.defaultExpanded ?? []
  const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id]
  emit('update:expanded', next)
  emit('toggle', id)
}

const handleSelect = (id: string) => {
  emit('select', id)
  const current = props.modelValue ?? []
  if (props.selectionBehavior === 'replace') {
    emit('update:modelValue', [id])
  } else {
    const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id]
    emit('update:modelValue', next)
  }
}
</script>

<template>
  <!-- ponytail: alpha, reka API may shift -->
  <TreeRoot
    :modelValue="props.modelValue"
    :defaultValue="props.defaultValue"
    :items="props.items"
    :expanded="props.expanded"
    :defaultExpanded="props.defaultExpanded"
    :getKey="getKey"
    :getChildren="getChildren"
    :selectionBehavior="props.selectionBehavior"
    :propagateSelect="props.propagateSelect"
    @update:modelValue="(v: any) => emit('update:modelValue', Array.isArray(v) ? v as string[] : [v as string])"
    @update:expanded="(v: any[]) => emit('update:expanded', v.map(getKey))"
    :class="rootClass"
    v-bind="$attrs"
  >
    <div v-for="entry in flat" :key="entry.node.id" class="voxel-tree__row-wrapper">
      <div
        :class="['voxel-tree__row', `voxel-tree__row--size-${props.size}`, isSelected(entry.node.id) && 'voxel-tree__row--selected']"
        :style="{ paddingLeft: `${entry.depth * 16 + 8}px` }"
        @click="() => handleSelect(entry.node.id)"
      >
        <button
          v-if="hasChildren(entry.node)"
          type="button"
          class="voxel-tree__caret"
          :aria-label="isExpanded(entry.node.id) ? 'Collapse' : 'Expand'"
          @click.stop="() => toggleExpand(entry.node.id)"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" :class="['voxel-tree__caret-icon', isExpanded(entry.node.id) && 'voxel-tree__caret-icon--open']"><path d="M3 4L5 6L7 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
        <span v-else class="voxel-tree__caret-spacer" />
        <TreeItem :value="entry.node" :level="entry.depth + 1" class="voxel-tree__item">
          <span class="voxel-tree__label">{{ entry.node.label }}</span>
        </TreeItem>
      </div>
    </div>
  </TreeRoot>
</template>

<style scoped>
.voxel-tree {
  @apply w-full
    bg-[var(--color-surface-base)]
    border border-[var(--color-grey-200)]
    rounded-lg p-1
    overflow-auto;
}

.voxel-tree__row-wrapper {
  @apply w-full;
}

.voxel-tree__row {
  @apply flex items-center gap-1
    rounded-md
    cursor-pointer
    transition-colors
    hover:bg-[var(--color-grey-100)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-tree--size-small .voxel-tree__row { @apply h-6 text-[11px]; }
.voxel-tree--size-default .voxel-tree__row { @apply h-8 text-sm; }
.voxel-tree--size-large .voxel-tree__row { @apply h-10 text-base; }

.voxel-tree__row--selected {
  @apply bg-[var(--color-primary-lighten-1)] text-[var(--color-primary-base)];
}

.voxel-tree__caret {
  @apply flex-shrink-0 flex items-center justify-center
    size-5 rounded
    text-[var(--color-text-secondary)]
    hover:text-[var(--color-text-primary)]
    hover:bg-[var(--color-grey-200)];
}

.voxel-tree__caret-spacer {
  @apply flex-shrink-0 size-5;
}

.voxel-tree__caret-icon {
  @apply transition-transform;
}

.voxel-tree__caret-icon--open {
  @apply rotate-180;
}

.voxel-tree__item {
  @apply flex items-center flex-1 min-w-0;
}

.voxel-tree__label {
  @apply truncate text-[var(--color-text-primary)];
}
</style>
