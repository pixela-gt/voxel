<script setup lang="ts">
import { computed } from 'vue'
import {
  PaginationRoot,
  PaginationList,
  PaginationListItem,
  PaginationPrev,
  PaginationNext,
  PaginationEllipsis,
} from 'reka-ui'
import { ChevronLeft, ChevronRight, Ellipsis } from '@lucide/vue'
import { Icon } from '../Icon'
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
    <PaginationPrev class="voxel-pagination__step voxel-pagination__step--prev" aria-label="Previous page">
      <Icon :icon="ChevronLeft" size="small" />
    </PaginationPrev>
    <!-- reka owns range math (incl. ellipsis) — items come from the List slot -->
    <PaginationList v-slot="{ items }" class="voxel-pagination__list">
      <template v-for="(item, idx) in items" :key="idx">
        <PaginationEllipsis v-if="item.type === 'ellipsis'" class="voxel-pagination__ellipsis">
          <Icon :icon="Ellipsis" size="small" />
        </PaginationEllipsis>
        <PaginationListItem v-else :value="item.value" class="voxel-pagination__button">
          {{ item.value }}
        </PaginationListItem>
      </template>
    </PaginationList>
    <PaginationNext class="voxel-pagination__step voxel-pagination__step--next" aria-label="Next page">
      <Icon :icon="ChevronRight" size="small" />
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

.voxel-pagination__ellipsis {
  @apply inline-flex items-center justify-center text-[var(--color-text-secondary)] select-none;
}

.voxel-pagination--size-small .voxel-pagination__ellipsis { @apply size-7; }
.voxel-pagination--size-default .voxel-pagination__ellipsis { @apply size-9; }
.voxel-pagination--size-large .voxel-pagination__ellipsis { @apply size-11; }

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

.voxel-pagination__button[data-selected='true'] {
  @apply bg-[var(--color-primary-base)] text-white hover:bg-[var(--color-primary-darken-1)];
}

.voxel-pagination--size-small .voxel-pagination__button { @apply size-7 text-[11px]; }
.voxel-pagination--size-default .voxel-pagination__button { @apply size-9 text-sm; }
.voxel-pagination--size-large .voxel-pagination__button { @apply size-11 text-base; }

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
