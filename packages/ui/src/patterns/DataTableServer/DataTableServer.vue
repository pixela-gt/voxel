<script setup lang="ts" generic="T">
import type { DataTableServerProps } from './DataTableServer.types'
import { DataTable } from '../DataTable'

const props = withDefaults(defineProps<DataTableServerProps<T>>(), {
  page: 1,
  pageSize: 10,
  loading: false,
} as const)

const emit = defineEmits<{
  'update:page': [page: number]
}>()
</script>

<template>
  <DataTable
    v-bind="props"
    :total="props.total"
    :page="props.page"
    :page-size="props.pageSize"
    :loading="props.loading"
    @update:page="emit('update:page', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </DataTable>
</template>
