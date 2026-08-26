<script setup lang="ts">
import { computed } from 'vue'
import {
  ListboxRoot,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxFilter,
} from 'reka-ui'
import type { ListboxProps, ListboxItem as ListboxItemType, ListboxGroup as ListboxGroupType } from './Listbox.types'
import { ref } from 'vue'

const props = withDefaults(defineProps<ListboxProps>(), {
  multiple: false,
  disabled: false,
  highlightOnHover: true,
  size: 'default',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[] | undefined]
}>()

const searchTerm = ref('')

const rootClass = computed(() => ['voxel-listbox', `voxel-listbox--size-${props.size}`, props.class])

const isGroup = (entry: ListboxItemType | ListboxGroupType): entry is ListboxGroupType =>
  Array.isArray((entry as ListboxGroupType).items)

const isSelected = (item: ListboxItemType) => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(item.value)
  }
  return props.modelValue === item.value
}

const visibleItems = computed<(ListboxItemType | ListboxGroupType)[]>(() => {
  if (!searchTerm.value) return props.items ?? []
  const t = searchTerm.value.toLowerCase()
  const result: (ListboxItemType | ListboxGroupType)[] = []
  for (const entry of props.items ?? []) {
    if (isGroup(entry)) {
      const filtered = entry.items.filter((it) =>
        String(it.label ?? it.value).toLowerCase().includes(t),
      )
      if (filtered.length) result.push({ ...entry, items: filtered })
    } else {
      const e = entry as ListboxItemType
      if (String(e.label ?? e.value).toLowerCase().includes(t)) result.push(e)
    }
  }
  return result
})
</script>

<template>
  <ListboxRoot
    :modelValue="props.modelValue"
    :defaultValue="props.defaultValue"
    :multiple="props.multiple"
    :disabled="props.disabled"
    :highlightOnHover="props.highlightOnHover"
    @update:modelValue="(v: any) => emit('update:modelValue', v)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <ListboxFilter v-model="searchTerm" placeholder="Filter..." class="voxel-listbox__filter" />
    <ListboxContent class="voxel-listbox__content">
      <template v-for="(entry, idx) in visibleItems" :key="idx">
        <ListboxGroup v-if="isGroup(entry)" class="voxel-listbox__group">
          <ListboxGroupLabel v-if="entry.label" class="voxel-listbox__group-label">{{ entry.label }}</ListboxGroupLabel>
          <ListboxItem
            v-for="item in entry.items"
            :key="item.value"
            :value="item.value"
            :disabled="item.disabled"
            class="voxel-listbox__item"
          >
            <ListboxItemIndicator v-if="isSelected(item)" class="voxel-listbox__indicator">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </ListboxItemIndicator>
            <span>{{ item.label ?? item.value }}</span>
          </ListboxItem>
        </ListboxGroup>
        <ListboxItem
          v-else
          :value="(entry as ListboxItemType).value"
          :disabled="(entry as ListboxItemType).disabled"
          class="voxel-listbox__item"
        >
          <ListboxItemIndicator v-if="isSelected(entry as ListboxItemType)" class="voxel-listbox__indicator">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </ListboxItemIndicator>
          <span>{{ (entry as ListboxItemType).label ?? (entry as ListboxItemType).value }}</span>
        </ListboxItem>
      </template>
    </ListboxContent>
  </ListboxRoot>
</template>

<style scoped>
.voxel-listbox {
  @apply inline-flex flex-col w-full;
}

.voxel-listbox__filter {
  @apply w-full mb-2 h-9 px-3 text-sm
    bg-[var(--color-surface-base)]
    border border-[var(--color-grey-600)]
    rounded-lg outline-none
    text-[var(--color-text-primary)]
    placeholder:text-[var(--color-text-muted)]
    focus:border-[var(--color-primary-base)] focus:ring-2 focus:ring-[var(--color-primary-base)];
}

.voxel-listbox__content {
  @apply bg-[var(--color-surface-base)] rounded-lg border border-[var(--color-grey-200)]
    p-1 max-h-[300px] overflow-auto focus:outline-none;
}

.voxel-listbox__group {
  @apply flex flex-col;
}

.voxel-listbox__group-label {
  @apply px-2 py-1.5 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide;
}

.voxel-listbox__item {
  @apply relative flex items-center gap-2 rounded-md px-2 py-1.5
    text-sm text-[var(--color-text-primary)]
    cursor-pointer select-none outline-none
    data-[highlighted]:bg-[var(--color-primary-lighten-1)]/12 data-[highlighted]:text-[var(--color-primary-base)]
    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed;
}

.voxel-listbox__indicator {
  @apply text-[var(--color-primary-base)] flex-shrink-0;
}
</style>
