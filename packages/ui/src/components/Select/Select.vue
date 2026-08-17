<script setup lang="ts">
import { computed } from 'vue'
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from 'reka-ui'
import { ChevronDown, ChevronUp, Check } from '@lucide/vue'
import { Icon } from '../Icon'
import type { SelectProps, SelectItem as SelectItemType, SelectGroup as SelectGroupType } from './Select.types'

const props = withDefaults(defineProps<SelectProps>(), {
  multiple: false,
  disabled: false,
  size: 'default',
  // `undefined` defaults prevent Vue from coercing absent Boolean props to `false`,
  // which would otherwise force reka-ui into controlled mode (`open === undefined` is its uncontrolled sentinel).
  open: undefined,
  defaultOpen: undefined,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[] | undefined]
  'update:open': [open: boolean]
}>()

const rootClass = computed(() => ['voxel-select', `voxel-select--size-${props.size}`, props.class])
const triggerClass = computed(() => ['voxel-select__trigger', `voxel-select__trigger--size-${props.size}`])
const isGroup = (entry: SelectItemType | SelectGroupType): entry is SelectGroupType =>
  Array.isArray((entry as SelectGroupType).items)
</script>

<template>
  <SelectRoot
    :modelValue="props.modelValue"
    :defaultValue="props.defaultValue"
    :defaultOpen="props.defaultOpen"
    :open="props.open"
    :multiple="props.multiple"
    :disabled="props.disabled"
    :required="props.required"
    :name="props.name"
    @update:modelValue="(v: any) => emit('update:modelValue', v)"
    @update:open="(v: boolean) => emit('update:open', v)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <SelectTrigger :class="triggerClass">
      <SelectValue :placeholder="props.placeholder" class="voxel-select__value" />
      <SelectIcon class="voxel-select__icon">
        <Icon :icon="ChevronDown" size="small" />
      </SelectIcon>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent class="voxel-select__content" :side-offset="4" position="popper">
        <SelectScrollUpButton class="voxel-select__scroll-button">
          <Icon :icon="ChevronUp" size="small" />
        </SelectScrollUpButton>
        <SelectViewport class="voxel-select__viewport">
          <template v-for="(entry, idx) in props.items" :key="idx">
            <SelectSeparator v-if="idx > 0 && isGroup(entry)" class="voxel-select__separator" />
            <SelectGroup v-if="isGroup(entry)" class="voxel-select__group">
              <SelectLabel v-if="entry.label" class="voxel-select__label">{{ entry.label }}</SelectLabel>
              <SelectItem
                v-for="item in entry.items"
                :key="item.value"
                :value="item.value"
                :disabled="item.disabled"
                class="voxel-select__item"
              >
                <SelectItemText>{{ item.label ?? item.value }}</SelectItemText>
                <SelectItemIndicator class="voxel-select__item-indicator">
                  <Icon :icon="Check" size="small" />
                </SelectItemIndicator>
              </SelectItem>
            </SelectGroup>
            <SelectItem
              v-else
              :value="(entry as SelectItemType).value"
              :disabled="(entry as SelectItemType).disabled"
              class="voxel-select__item"
            >
              <SelectItemText>{{ (entry as SelectItemType).label ?? (entry as SelectItemType).value }}</SelectItemText>
              <SelectItemIndicator class="voxel-select__item-indicator">
                <Icon :icon="Check" size="small" />
              </SelectItemIndicator>
            </SelectItem>
          </template>
        </SelectViewport>
        <SelectScrollDownButton class="voxel-select__scroll-button">
          <Icon :icon="ChevronDown" size="small" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<style>
.voxel-select {
  @apply inline-flex;
}

.voxel-select__trigger {
  @apply inline-flex items-center justify-between gap-2
    bg-[var(--color-surface-base)]
    border border-[var(--color-grey-600)]
    text-[var(--color-text-primary)]
    rounded-lg
    transition-colors duration-[var(--transition-fast)]
    hover:border-[var(--color-primary-lighten-1)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    min-w-[160px];
}

.voxel-select__trigger--size-small {
  @apply h-7 px-2 text-[11px];
}
.voxel-select__trigger--size-default {
  @apply h-9 px-3 text-sm;
}
.voxel-select__trigger--size-large {
  @apply h-11 px-4 text-base;
}

.voxel-select__value {
  @apply truncate;
}

.voxel-select__icon {
  @apply text-[var(--color-text-secondary)] flex-shrink-0;
}

.voxel-select__content {
  @apply bg-[var(--color-surface-base)] rounded-lg shadow-[var(--shadow-md)]
    border border-[var(--color-grey-200)]
    focus-visible:outline-none
    overflow-hidden z-50;
  width: var(--reka-select-trigger-width);
}

.voxel-select__viewport {
  @apply p-1;
}

.voxel-select__scroll-button {
  @apply flex items-center justify-center h-6 text-[var(--color-text-secondary)] cursor-default;
}

.voxel-select__group {
  @apply flex flex-col;
}

.voxel-select__label {
  @apply px-2 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)]/90 uppercase tracking-wide;
}

.voxel-select__item {
  @apply relative flex items-center justify-between gap-2
    rounded-md px-2 py-1.5
    text-sm text-[var(--color-text-primary)]
    cursor-pointer select-none outline-none
    data-[highlighted]:bg-[var(--color-primary-lighten-1)]/12 data-[highlighted]:text-[var(--color-primary-base)]
    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed;
}

.voxel-select__item-indicator {
  @apply text-[var(--color-primary-base)] flex-shrink-0;
}

.voxel-select__separator {
  @apply h-px bg-[var(--color-grey-200)] my-1;
}
</style>
