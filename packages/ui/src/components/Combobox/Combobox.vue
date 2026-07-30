<script setup lang="ts">
import { computed, inject } from 'vue'
import {
  ComboboxRoot,
  ComboboxAnchor,
  ComboboxInput,
  ComboboxPortal,
  ComboboxContent,
  ComboboxViewport,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxEmpty,
  ComboboxTrigger,
  ComboboxCancel,
} from 'reka-ui'
import type { ComboboxProps, ComboboxItem as ComboboxItemType, ComboboxGroup as ComboboxGroupType } from './Combobox.types'
import type { FormFieldContext } from '../FormField/FormField.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

const props = withDefaults(defineProps<ComboboxProps>(), {
  multiple: false,
  disabled: false,
  size: 'default',
  placeholder: 'Search...',
  variant: 'outlined',
  density: 'default',
  focusEffect: 'border',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[] | undefined]
  'update:open': [open: boolean]
  'update:searchTerm': [value: string]
}>()

const formContext = inject<FormFieldContext | null>(FORM_FIELD_KEY, null)

const effectiveError = computed(() => props.errorMessage ?? formContext?.errorMessage)

const searchTerm = defineModel<string>('searchTerm', { default: '' })

const rootClass = computed(() => ['voxel-combobox', `voxel-combobox--size-${props.size}`, props.class])
const anchorClass = computed(() => [
  'voxel-combobox__anchor',
  `voxel-combobox__anchor--variant-${props.variant}`,
  `voxel-combobox__anchor--density-${props.density}`,
  `voxel-combobox__anchor--focus-${props.focusEffect}`,
  {
    'voxel-combobox__anchor--error': !!effectiveError.value,
    'voxel-combobox__anchor--disabled': props.disabled,
  },
])
const inputClass = computed(() => ['voxel-combobox__input', `voxel-combobox__input--size-${props.size}`])

const isGroup = (entry: ComboboxItemType | ComboboxGroupType): entry is ComboboxGroupType =>
  Array.isArray((entry as ComboboxGroupType).items)

const isSelected = (item: ComboboxItemType) => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(item.value)
  }
  return props.modelValue === item.value
}

const flatItems = computed<ComboboxItemType[]>(() => {
  if (!props.items) return []
  const result: ComboboxItemType[] = []
  for (const entry of props.items) {
    if (isGroup(entry)) {
      for (const it of entry.items) result.push(it)
    } else {
      result.push(entry as ComboboxItemType)
    }
  }
  return result
})

const hasMatches = computed(() => {
  if (!searchTerm.value) return true
  const t = searchTerm.value.toLowerCase()
  return flatItems.value.some((item) => {
    const label = String(item.label ?? item.value).toLowerCase()
    return label.includes(t)
  })
})
</script>

<template>
  <ComboboxRoot
    :modelValue="props.modelValue"
    :defaultValue="props.defaultValue"
    :open="props.open"
    :defaultOpen="props.defaultOpen"
    :multiple="props.multiple"
    :disabled="props.disabled"
    :required="props.required"
    :name="props.name"
    @update:modelValue="(v: any) => emit('update:modelValue', v)"
    @update:open="(v: boolean) => emit('update:open', v)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <ComboboxAnchor :class="anchorClass">
      <ComboboxInput
        :modelValue="searchTerm"
        @update:modelValue="(v: string) => (searchTerm = v)"
        :placeholder="props.placeholder"
        :class="inputClass"
      />
      <ComboboxCancel v-if="searchTerm" class="voxel-combobox__cancel" aria-label="Clear">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3L9 9M9 3L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
      </ComboboxCancel>
      <ComboboxTrigger class="voxel-combobox__trigger" aria-label="Open">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent class="voxel-combobox__content" :side-offset="4" position="popper">
        <ComboboxViewport class="voxel-combobox__viewport">
          <ComboboxEmpty v-if="!hasMatches" class="voxel-combobox__empty">No results found.</ComboboxEmpty>
          <template v-for="(entry, idx) in props.items" :key="idx">
            <ComboboxSeparator v-if="idx > 0 && isGroup(entry)" class="voxel-combobox__separator" />
            <ComboboxGroup v-if="isGroup(entry)" class="voxel-combobox__group">
              <ComboboxLabel v-if="entry.label" class="voxel-combobox__label">{{ entry.label }}</ComboboxLabel>
              <ComboboxItem
                v-for="item in entry.items"
                :key="item.value"
                :value="item.value"
                :disabled="item.disabled"
                class="voxel-combobox__item"
              >
                <ComboboxItemIndicator v-if="isSelected(item)" class="voxel-combobox__item-indicator">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </ComboboxItemIndicator>
                <span>{{ item.label ?? item.value }}</span>
              </ComboboxItem>
            </ComboboxGroup>
            <ComboboxItem
              v-else
              :value="(entry as ComboboxItemType).value"
              :disabled="(entry as ComboboxItemType).disabled"
              class="voxel-combobox__item"
            >
              <ComboboxItemIndicator v-if="isSelected(entry as ComboboxItemType)" class="voxel-combobox__item-indicator">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </ComboboxItemIndicator>
              <span>{{ (entry as ComboboxItemType).label ?? (entry as ComboboxItemType).value }}</span>
            </ComboboxItem>
          </template>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>

<style scoped>
.voxel-combobox {
  @apply inline-flex w-full;
}

.voxel-combobox__anchor {
  @apply inline-flex items-center gap-2 w-full font-sans transition-all duration-[var(--transition-normal)] focus-within:outline-none;
}

/* Outlined */
.voxel-combobox__anchor--variant-outlined {
  @apply bg-[var(--color-surface-background)] border-2 border-[var(--color-grey-200)] rounded-[var(--rounded-2xl)];
}

.voxel-combobox__anchor--variant-outlined.voxel-combobox__anchor--density-default {
  @apply px-3 py-3;
}

.voxel-combobox__anchor--variant-outlined.voxel-combobox__anchor--density-dense {
  @apply px-2 py-2;
}

/* Underlined */
.voxel-combobox__anchor--variant-underlined {
  @apply bg-transparent border-0 border-b-2 border-[var(--color-grey-300)] rounded-none;
}

.voxel-combobox__anchor--variant-underlined.voxel-combobox__anchor--density-default {
  @apply py-3;
}

.voxel-combobox__anchor--variant-underlined.voxel-combobox__anchor--density-dense {
  @apply py-2;
}

/* Ghost */
.voxel-combobox__anchor--variant-ghost {
  @apply bg-transparent border-2 border-transparent rounded-[var(--rounded-2xl)] hover:bg-[var(--color-surface-light)];
}

.voxel-combobox__anchor--variant-ghost.voxel-combobox__anchor--density-default {
  @apply px-3 py-3;
}

.voxel-combobox__anchor--variant-ghost.voxel-combobox__anchor--density-dense {
  @apply px-2 py-2;
}

/* Focus effects — border */
.voxel-combobox__anchor--focus-border:focus-within {
  @apply border-[var(--color-primary-base)]/70;
}

.voxel-combobox__anchor--variant-underlined.voxel-combobox__anchor--focus-border:focus-within {
  @apply border-b-[var(--color-primary-base)]/70;
}

/* Focus effects — elevation */
.voxel-combobox__anchor--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Focus effects — glow */
.voxel-combobox__anchor--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Error — border */
.voxel-combobox__anchor--error.voxel-combobox__anchor--focus-border:focus-within {
  @apply border-[var(--color-error-base)];
}

.voxel-combobox__anchor--error.voxel-combobox__anchor--variant-underlined.voxel-combobox__anchor--focus-border:focus-within {
  @apply border-b-[var(--color-error-base)];
}

/* Error — elevation */
.voxel-combobox__anchor--error.voxel-combobox__anchor--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Error — glow */
.voxel-combobox__anchor--error.voxel-combobox__anchor--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Disabled */
.voxel-combobox__anchor--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-combobox__anchor--disabled.voxel-combobox__anchor--variant-outlined {
  @apply bg-[var(--color-grey-50)] border-[var(--color-grey-200)];
}

.voxel-combobox__anchor--disabled.voxel-combobox__anchor--variant-underlined {
  @apply border-b-[var(--color-grey-200)];
}

.voxel-combobox__anchor--disabled.voxel-combobox__anchor--variant-ghost {
  @apply hover:bg-transparent;
}

/* Size — text only (density handles padding) */
.voxel-combobox--size-small .voxel-combobox__anchor { @apply text-[11px]; }
.voxel-combobox--size-default .voxel-combobox__anchor { @apply text-sm; }
.voxel-combobox--size-large .voxel-combobox__anchor { @apply text-base; }

.voxel-combobox__input {
  @apply flex-1 bg-transparent outline-none border-0 text-[var(--color-text-primary)]
    placeholder:text-[var(--color-text-muted)] min-w-0 disabled:cursor-not-allowed;
}

.voxel-combobox__cancel,
.voxel-combobox__trigger {
  @apply flex-shrink-0 flex items-center justify-center text-[var(--color-text-secondary)]
    hover:text-[var(--color-text-primary)] rounded;
}

.voxel-combobox__content {
  @apply w-[var(--reka-combobox-content-available-width)] max-h-[300px]
    bg-[var(--color-surface-base)] rounded-lg shadow-[var(--shadow-md)]
    border border-[var(--color-grey-200)]
    focus-visible:outline-none overflow-hidden z-50;
}

.voxel-combobox__viewport {
  @apply p-1;
}

.voxel-combobox__empty {
  @apply py-2 px-3 text-sm text-[var(--color-text-muted)] text-center;
}

.voxel-combobox__group {
  @apply flex flex-col;
}

.voxel-combobox__label {
  @apply px-2 py-1.5 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide;
}

.voxel-combobox__item {
  @apply relative flex items-center gap-2 rounded-md px-2 py-1.5
    text-sm text-[var(--color-text-primary)]
    cursor-pointer select-none outline-none
    data-[highlighted]:bg-[var(--color-primary-lighten-1)] data-[highlighted]:text-[var(--color-primary-base)]
    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed;
}

.voxel-combobox__item-indicator {
  @apply text-[var(--color-primary-base)] flex-shrink-0;
}

.voxel-combobox__separator {
  @apply h-px bg-[var(--color-grey-200)] my-1;
}
</style>
