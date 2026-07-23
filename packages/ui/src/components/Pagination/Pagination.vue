<script setup lang="ts">
import { computed } from 'vue'
import {
  PaginationRoot,
  PaginationList,
  PaginationListItem,
  PaginationPrev,
  PaginationNext,
  PaginationEllipsis,
  injectPaginationRootContext,
} from 'reka-ui'
import type { PaginationProps } from './Pagination.types'

const props = withDefaults(defineProps<PaginationProps>(), {
  defaultPage: 1,
  siblingCount: 2,
  showEdges: false,
  disabled: false,
  size: 'default',
} as const)

const emit = defineEmits<{
  'update:page': [page: number]
}>()

const root = injectPaginationRootContext()
const currentPage = computed(() => root.page.value)
const pageCount = computed(() => root.pageCount.value)

const generateRange = (): (number | 'ellipsis')[] => {
  const total = pageCount.value
  const sib = props.siblingCount
  const current = currentPage.value
  const range: (number | 'ellipsis')[] = []
  const start = Math.max(1, current - sib)
  const end = Math.min(total, current + sib)

  if (props.showEdges) {
    range.push(1)
    if (start > 2) range.push('ellipsis')
  } else if (start > 1) {
    range.push(1)
    if (start > 2) range.push('ellipsis')
  }

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  if (end < total) {
    if (end < total - 1) range.push('ellipsis')
    if (props.showEdges) {
      range.push(total)
    } else {
      range.push(total)
    }
  }
  return range
}

const range = computed(generateRange)

const rootClass = computed(() => ['voxel-pagination', `voxel-pagination--size-${props.size}`, props.class])
</script>

<template>
  <PaginationRoot
    :page="props.page"
    :defaultPage="props.defaultPage"
    :total="props.total"
    :itemsPerPage="props.itemsPerPage"
    :siblingCount="props.siblingCount"
    :showEdges="props.showEdges"
    :disabled="props.disabled"
    @update:page="(v: number) => emit('update:page', v)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <PaginationPrev class="voxel-pagination__step voxel-pagination__step--prev">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7L9 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </PaginationPrev>
    <PaginationList class="voxel-pagination__list">
      <template v-for="(item, idx) in range" :key="idx">
        <PaginationListItem v-if="item === 'ellipsis'" :value="-1" class="voxel-pagination__item">
          <PaginationEllipsis class="voxel-pagination__ellipsis">...</PaginationEllipsis>
        </PaginationListItem>
        <PaginationListItem v-else :value="item" class="voxel-pagination__item">
          <button
            type="button"
            :class="['voxel-pagination__button', currentPage === item && 'voxel-pagination__button--active']"
            @click="() => emit('update:page', item)"
          >
            {{ item }}
          </button>
        </PaginationListItem>
      </template>
    </PaginationList>
    <PaginationNext class="voxel-pagination__step voxel-pagination__step--next">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3L9 7L5 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </PaginationNext>
  </PaginationRoot>
</template>

<style scoped>
.voxel-pagination {
  @apply inline-flex items-center gap-1;
}

.voxel-pagination__list {
  @apply inline-flex items-center gap-1;
}

.voxel-pagination__item {
  @apply inline-flex;
}

.voxel-pagination__button {
  @apply inline-flex items-center justify-center
    rounded-md
    text-sm font-medium
    bg-transparent
    text-[var(--color-text-primary)]
    transition-colors
    hover:bg-[var(--color-grey-100)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-pagination--size-small .voxel-pagination__button { @apply size-7 text-[11px]; }
.voxel-pagination--size-default .voxel-pagination__button { @apply size-9 text-sm; }
.voxel-pagination--size-large .voxel-pagination__button { @apply size-11 text-base; }

.voxel-pagination__button--active {
  @apply bg-[var(--color-primary-base)] text-white hover:bg-[var(--color-primary-darken-1)];
}

.voxel-pagination__ellipsis {
  @apply inline-flex items-center justify-center text-[var(--color-text-muted)] select-none;
}

.voxel-pagination__step {
  @apply inline-flex items-center justify-center
    rounded-md
    text-[var(--color-text-primary)]
    hover:bg-[var(--color-grey-100)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed transition-colors;
}

.voxel-pagination--size-small .voxel-pagination__step { @apply size-7; }
.voxel-pagination--size-default .voxel-pagination__step { @apply size-9; }
.voxel-pagination--size-large .voxel-pagination__step { @apply size-11; }
</style>
