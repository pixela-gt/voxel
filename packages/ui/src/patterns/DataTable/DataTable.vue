<script setup lang="ts" generic="T">
import { ref, computed } from 'vue'
import type { DataTableProps, SortDirection } from './DataTable.types'
import { EmptyState } from '../EmptyState'

const props = withDefaults(defineProps<DataTableProps<T>>(), {
  pageSize: 10,
  loading: false,
} as const)

const emit = defineEmits<{
  'update:page': [page: number]
  sort: [key: string, direction: SortDirection]
}>()

const isServerMode = computed(() => props.total !== undefined)

const currentPage = ref(1)
const sortKey = ref<string | null>(null)
const sortDir = ref<SortDirection>(null)

const effectivePage = computed(() => isServerMode.value ? (props.page ?? 1) : currentPage.value)

const totalPages = computed(() => {
  const t = isServerMode.value ? props.total! : props.items.length
  return Math.max(1, Math.ceil(t / props.pageSize))
})

const sortedItems = computed(() => {
  if (isServerMode.value) return props.items
  if (!sortKey.value || !sortDir.value) return props.items
  return [...props.items].sort((a, b) => {
    const col = props.columns.find(c => c.key === sortKey.value)
    const aVal = col?.accessor ? col.accessor(a) : (a as Record<string, any>)[sortKey.value!]
    const bVal = col?.accessor ? col.accessor(b) : (b as Record<string, any>)[sortKey.value!]
    const cmp = String(aVal).localeCompare(String(bVal))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

const paginatedItems = computed(() => {
  if (isServerMode.value) return props.items
  const start = (currentPage.value - 1) * props.pageSize
  return sortedItems.value.slice(start, start + props.pageSize)
})

function toggleSort(key: string) {
  if (isServerMode.value) return
  if (sortKey.value === key) {
    if (sortDir.value === 'asc') sortDir.value = 'desc'
    else if (sortDir.value === 'desc') { sortKey.value = null; sortDir.value = null }
    else sortDir.value = 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

function goToPage(page: number) {
  const clamped = Math.max(1, Math.min(totalPages.value, page))
  if (isServerMode.value) {
    emit('update:page', clamped)
  } else {
    currentPage.value = clamped
  }
}
</script>

<template>
  <div :class="['voxel-data-table-wrapper', props.class]" v-bind="$attrs">
    <div v-if="props.loading" class="voxel-data-table__loading">
      <div v-for="n in props.pageSize" :key="n" class="voxel-data-table__skeleton-row">
        <div class="voxel-data-table__skeleton-cell" v-for="col in props.columns" :key="col.key" :style="{ width: typeof col.width === 'number' ? `${col.width}px` : col.width }" />
      </div>
    </div>

    <template v-else>
      <div v-if="props.items.length === 0" class="voxel-data-table__empty">
        <EmptyState title="No data" description="There are no items to display." />
      </div>

      <table v-else class="voxel-data-table">
        <thead>
          <tr>
            <th
              v-for="col in props.columns"
              :key="col.key"
              :class="['voxel-data-table__th', col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : '']"
              :style="{ width: typeof col.width === 'number' ? `${col.width}px` : col.width }"
              :aria-sort="col.sortable ? (sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none') : undefined"
              @click="col.sortable ? toggleSort(col.key) : undefined"
            >
              <span class="voxel-data-table__th-content">
                {{ col.label }}
                <span v-if="col.sortable && sortKey === col.key" class="voxel-data-table__sort-icon">
                  {{ sortDir === 'asc' ? '\u2191' : '\u2193' }}
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIdx) in paginatedItems" :key="rowIdx" class="voxel-data-table__row">
            <td
              v-for="col in props.columns"
              :key="col.key"
              :class="['voxel-data-table__td', col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : '']"
            >
              <slot :name="`cell-${col.key}`" :row="row" :value="col.accessor ? col.accessor(row) : (row as Record<string, any>)[col.key]">
                {{ col.accessor ? col.accessor(row) : (row as Record<string, any>)[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="totalPages > 1" class="voxel-data-table__pagination">
        <button class="voxel-data-table__page-btn" :disabled="effectivePage <= 1" @click="goToPage(effectivePage - 1)">Prev</button>
        <span class="voxel-data-table__page-info">Page {{ effectivePage }} of {{ totalPages }}</span>
        <button class="voxel-data-table__page-btn" :disabled="effectivePage >= totalPages" @click="goToPage(effectivePage + 1)">Next</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.voxel-data-table-wrapper {
  @apply w-full;
}

.voxel-data-table {
  @apply w-full border-collapse text-sm;
}

.voxel-data-table__th {
  @apply text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)] border-b border-[var(--color-surface-light)] select-none;
}

.voxel-data-table__th-content {
  @apply inline-flex items-center gap-1;
}

.voxel-data-table__sort-icon {
  @apply text-[var(--color-text-muted)];
}

.voxel-data-table__td {
  @apply px-4 py-2.5 text-[var(--color-text-primary)];
}

.voxel-data-table__row {
  @apply border-b border-[var(--color-surface-light)];
}

.voxel-data-table__row:hover {
  @apply bg-[var(--color-surface-light)]/50;
}

.voxel-data-table__pagination {
  @apply flex items-center justify-between px-4 py-3 text-sm;
}

.voxel-data-table__page-btn {
  @apply px-3 py-1 rounded text-[var(--color-primary-base)] hover:bg-[var(--color-surface-light)] disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-data-table__page-info {
  @apply text-[var(--color-text-secondary)];
}

.voxel-data-table__loading {
  @apply w-full;
}

.voxel-data-table__skeleton-row {
  @apply flex gap-4 px-4 py-2.5;
}

.voxel-data-table__skeleton-cell {
  @apply h-4 rounded bg-[var(--color-surface-light)] animate-pulse flex-1;
}

.voxel-data-table__empty {
  @apply py-8;
}
</style>
