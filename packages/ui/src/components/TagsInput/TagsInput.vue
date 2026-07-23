<script setup lang="ts">
import { computed } from 'vue'
import {
  TagsInputRoot,
  TagsInputItem,
  TagsInputItemText,
  TagsInputItemDelete,
  TagsInputInput,
  TagsInputClear,
} from 'reka-ui'
import type { TagsInputProps } from './TagsInput.types'

const props = withDefaults(defineProps<TagsInputProps>(), {
  delimiter: ',',
  max: 0,
  disabled: false,
  addOnPaste: false,
  addOnBlur: false,
  addOnTab: false,
  duplicate: false,
  placeholder: 'Add tag...',
  size: 'default',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  'add-tag': [value: string]
  'remove-tag': [value: string]
}>()

const rootClass = computed(() => ['voxel-tags-input', `voxel-tags-input--size-${props.size}`, props.class])
const inputClass = computed(() => ['voxel-tags-input__input', `voxel-tags-input__input--size-${props.size}`])

const hasValue = computed(() => Array.isArray(props.modelValue) && props.modelValue.length > 0)
</script>

<template>
  <TagsInputRoot
    :modelValue="props.modelValue"
    :defaultValue="props.defaultValue"
    :delimiter="props.delimiter"
    :max="props.max"
    :disabled="props.disabled"
    :addOnPaste="props.addOnPaste"
    :addOnBlur="props.addOnBlur"
    :addOnTab="props.addOnTab"
    :duplicate="props.duplicate"
    @update:modelValue="(v: string[]) => emit('update:modelValue', v)"
    @add-tag="(v: string) => emit('add-tag', v)"
    @remove-tag="(v: string) => emit('remove-tag', v)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <TagsInputItem v-for="item in props.modelValue" :key="item" :value="item" class="voxel-tags-input__item">
      <TagsInputItemText class="voxel-tags-input__item-text" />
      <TagsInputItemDelete class="voxel-tags-input__item-delete" aria-label="Remove tag">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
      </TagsInputItemDelete>
    </TagsInputItem>
    <TagsInputInput :placeholder="props.placeholder" :class="inputClass" />
    <TagsInputClear v-if="hasValue" class="voxel-tags-input__clear" aria-label="Clear all">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3L9 9M9 3L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
    </TagsInputClear>
  </TagsInputRoot>
</template>

<style scoped>
.voxel-tags-input {
  @apply inline-flex flex-wrap items-center gap-1.5 w-full
    bg-[var(--color-surface-base)]
    border border-[var(--color-grey-600)]
    rounded-lg
    transition-colors duration-[var(--transition-fast)]
    hover:border-[var(--color-primary-lighten-1)]
    focus-within:border-[var(--color-primary-base)] focus-within:ring-2 focus-within:ring-[var(--color-primary-base)]
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.voxel-tags-input--size-small { @apply px-1.5 py-1 text-[11px] min-h-7; }
.voxel-tags-input--size-default { @apply px-2 py-1.5 text-sm min-h-9; }
.voxel-tags-input--size-large { @apply px-2.5 py-2 text-base min-h-11; }

.voxel-tags-input__item {
  @apply inline-flex items-center gap-1
    bg-[var(--color-primary-lighten-1)] text-[var(--color-primary-base)]
    rounded-md
    data-[disabled]:opacity-50;
}

.voxel-tags-input--size-small .voxel-tags-input__item { @apply h-5 px-1.5; }
.voxel-tags-input--size-default .voxel-tags-input__item { @apply h-6 px-2; }
.voxel-tags-input--size-large .voxel-tags-input__item { @apply h-7 px-2.5; }

.voxel-tags-input__item-text {
  @apply font-medium truncate max-w-[160px];
}

.voxel-tags-input__item-delete {
  @apply inline-flex items-center justify-center
    text-[var(--color-primary-base)] hover:text-[var(--color-primary-darken-1)]
    rounded;
}

.voxel-tags-input__input {
  @apply flex-1 min-w-[80px] bg-transparent outline-none
    text-[var(--color-text-primary)]
    placeholder:text-[var(--color-text-muted)];
}

.voxel-tags-input--size-small .voxel-tags-input__input { @apply h-5 text-[11px]; }
.voxel-tags-input--size-default .voxel-tags-input__input { @apply h-6 text-sm; }
.voxel-tags-input--size-large .voxel-tags-input__input { @apply h-7 text-base; }

.voxel-tags-input__clear {
  @apply inline-flex items-center justify-center
    text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
    rounded;
}
</style>
