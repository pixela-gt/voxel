<script setup lang="ts">
import { computed, inject } from 'vue'
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
import type { SelectProps, SelectItem as SelectItemType, SelectGroup as SelectGroupType } from './Select.types'
import type { FormFieldContext } from '../FormField/FormField.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

const props = withDefaults(defineProps<SelectProps>(), {
  multiple: false,
  disabled: false,
  size: 'default',
  variant: 'outlined',
  density: 'default',
  focusEffect: 'border',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[] | undefined]
  'update:open': [open: boolean]
}>()

const formContext = inject<FormFieldContext | null>(FORM_FIELD_KEY, null)

const effectiveError = computed(() => props.errorMessage ?? formContext?.errorMessage)

const rootClass = computed(() => ['voxel-select', `voxel-select--size-${props.size}`, props.class])
const triggerClass = computed(() => [
  'voxel-select__trigger',
  `voxel-select__trigger--size-${props.size}`,
  `voxel-select__trigger--variant-${props.variant}`,
  `voxel-select__trigger--density-${props.density}`,
  `voxel-select__trigger--focus-${props.focusEffect}`,
  {
    'voxel-select__trigger--error': !!effectiveError.value,
    'voxel-select__trigger--disabled': props.disabled,
  },
])
const isGroup = (entry: SelectItemType | SelectGroupType): entry is SelectGroupType =>
  Array.isArray((entry as SelectGroupType).items)

const handleItemClick = (item: SelectItemType) => {
  if (item.disabled) return
  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? props.modelValue : []
    const exists = current.includes(item.value)
    const next = exists ? current.filter(v => v !== item.value) : [...current, item.value]
    emit('update:modelValue', next)
  } else {
    emit('update:modelValue', item.value)
  }
}

const isSelected = (item: SelectItemType) => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(item.value)
  }
  return props.modelValue === item.value
}
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
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </SelectIcon>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent class="voxel-select__content" :side-offset="4" position="popper">
        <SelectScrollUpButton class="voxel-select__scroll-button">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 7.5L6 4.5L9 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
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
                @click="() => handleItemClick(item)"
              >
                <SelectItemText>{{ item.label ?? item.value }}</SelectItemText>
                <SelectItemIndicator v-if="isSelected(item)" class="voxel-select__item-indicator">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </SelectItemIndicator>
              </SelectItem>
            </SelectGroup>
            <SelectItem
              v-else
              :value="(entry as SelectItemType).value"
              :disabled="(entry as SelectItemType).disabled"
              class="voxel-select__item"
              @click="() => handleItemClick(entry as SelectItemType)"
            >
              <SelectItemText>{{ (entry as SelectItemType).label ?? (entry as SelectItemType).value }}</SelectItemText>
              <SelectItemIndicator v-if="isSelected(entry as SelectItemType)" class="voxel-select__item-indicator">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </SelectItemIndicator>
            </SelectItem>
          </template>
        </SelectViewport>
        <SelectScrollDownButton class="voxel-select__scroll-button">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<style scoped>
.voxel-select {
  @apply inline-flex;
}

.voxel-select__trigger {
  @apply inline-flex items-center justify-between gap-2 w-full font-sans transition-all duration-[var(--transition-normal)] focus-within:outline-none;
}

/* Outlined */
.voxel-select__trigger--variant-outlined {
  @apply bg-[var(--color-surface-background)] border-2 border-[var(--color-grey-200)] rounded-[var(--rounded-2xl)];
}

.voxel-select__trigger--variant-outlined.voxel-select__trigger--density-default {
  @apply px-3 py-3;
}

.voxel-select__trigger--variant-outlined.voxel-select__trigger--density-dense {
  @apply px-2 py-2;
}

/* Underlined */
.voxel-select__trigger--variant-underlined {
  @apply bg-transparent border-0 border-b-2 border-[var(--color-grey-300)] rounded-none;
}

.voxel-select__trigger--variant-underlined.voxel-select__trigger--density-default {
  @apply py-3;
}

.voxel-select__trigger--variant-underlined.voxel-select__trigger--density-dense {
  @apply py-2;
}

/* Ghost */
.voxel-select__trigger--variant-ghost {
  @apply bg-transparent border-2 border-transparent rounded-[var(--rounded-2xl)] hover:bg-[var(--color-surface-light)];
}

.voxel-select__trigger--variant-ghost.voxel-select__trigger--density-default {
  @apply px-3 py-3;
}

.voxel-select__trigger--variant-ghost.voxel-select__trigger--density-dense {
  @apply px-2 py-2;
}

/* Focus effects — border */
.voxel-select__trigger--focus-border:focus-within {
  @apply border-[var(--color-primary-base)]/70;
}

.voxel-select__trigger--variant-underlined.voxel-select__trigger--focus-border:focus-within {
  @apply border-b-[var(--color-primary-base)]/70;
}

/* Focus effects — elevation */
.voxel-select__trigger--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Focus effects — glow */
.voxel-select__trigger--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Error — border */
.voxel-select__trigger--error.voxel-select__trigger--focus-border:focus-within {
  @apply border-[var(--color-error-base)];
}

.voxel-select__trigger--error.voxel-select__trigger--variant-underlined.voxel-select__trigger--focus-border:focus-within {
  @apply border-b-[var(--color-error-base)];
}

/* Error — elevation */
.voxel-select__trigger--error.voxel-select__trigger--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Error — glow */
.voxel-select__trigger--error.voxel-select__trigger--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Disabled */
.voxel-select__trigger--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-select__trigger--disabled.voxel-select__trigger--variant-outlined {
  @apply bg-[var(--color-grey-50)] border-[var(--color-grey-200)];
}

.voxel-select__trigger--disabled.voxel-select__trigger--variant-underlined {
  @apply border-b-[var(--color-grey-200)];
}

.voxel-select__trigger--disabled.voxel-select__trigger--variant-ghost {
  @apply hover:bg-transparent;
}

/* Size overrides — reset old size classes, use density instead */
.voxel-select__trigger--size-small {
  @apply text-[11px];
}

.voxel-select__trigger--size-default {
  @apply text-sm;
}

.voxel-select__trigger--size-large {
  @apply text-base;
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
  @apply px-2 py-1.5 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide;
}

.voxel-select__item {
  @apply relative flex items-center justify-between gap-2
    rounded-md px-2 py-1.5
    text-sm text-[var(--color-text-primary)]
    cursor-pointer select-none outline-none
    data-[highlighted]:bg-[var(--color-primary-lighten-1)] data-[highlighted]:text-[var(--color-primary-base)]
    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed;
}

.voxel-select__item-indicator {
  @apply text-[var(--color-primary-base)] flex-shrink-0;
}

.voxel-select__separator {
  @apply h-px bg-[var(--color-grey-200)] my-1;
}
</style>
