<script setup lang="ts">
import { computed } from 'vue'
import {
  EditableRoot,
  EditableArea,
  EditablePreview,
  EditableInput,
  EditableEditTrigger,
  EditableSubmitTrigger,
  EditableCancelTrigger,
} from 'reka-ui'
import type { EditableProps } from './Editable.types'

const props = withDefaults(defineProps<EditableProps>(), {
  placeholder: 'Enter text...',
  disabled: false,
  submitMode: 'blur',
  activationMode: 'focus',
  selectOnFocus: false,
  startWithEditMode: false,
  size: 'default',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: [value: string]
}>()

const rootClass = computed(() => ['voxel-editable', `voxel-editable--size-${props.size}`, props.class])
const previewClass = computed(() => ['voxel-editable__preview', `voxel-editable__preview--size-${props.size}`])
const inputClass = computed(() => ['voxel-editable__input', `voxel-editable__input--size-${props.size}`])
</script>

<template>
  <EditableRoot
    :modelValue="props.modelValue"
    :defaultValue="props.defaultValue"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :submitMode="props.submitMode"
    :activationMode="props.activationMode"
    :selectOnFocus="props.selectOnFocus"
    :maxLength="props.maxLength"
    :startWithEditMode="props.startWithEditMode"
    @update:modelValue="(v: string | null | undefined) => emit('update:modelValue', v ?? '')"
    @submit="(v: string | null | undefined) => emit('submit', v ?? '')"
    :class="rootClass"
    v-bind="$attrs"
  >
    <EditableArea class="voxel-editable__area">
      <EditablePreview :class="previewClass" />
      <EditableInput :class="inputClass" />
    </EditableArea>
    <div class="voxel-editable__actions">
      <EditableEditTrigger v-if="!props.startWithEditMode" class="voxel-editable__button voxel-editable__button--edit" aria-label="Edit">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9.5 2.5L11.5 4.5L5 11H3V9L9.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" /></svg>
      </EditableEditTrigger>
      <EditableSubmitTrigger class="voxel-editable__button voxel-editable__button--submit" aria-label="Save">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </EditableSubmitTrigger>
      <EditableCancelTrigger class="voxel-editable__button voxel-editable__button--cancel" aria-label="Cancel">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
      </EditableCancelTrigger>
    </div>
  </EditableRoot>
</template>

<style scoped>
.voxel-editable {
  @apply inline-flex items-center gap-2;
}

.voxel-editable__area {
  @apply flex-1 min-w-0;
}

.voxel-editable__preview {
  @apply font-sans rounded-md px-2
    text-[var(--color-text-primary)]
    border border-transparent
    cursor-text
    truncate
    hover:bg-[var(--color-grey-100)]
    data-[placeholder]:text-[var(--color-text-muted)];
}

.voxel-editable__preview--size-small { @apply text-[11px] h-7 leading-[28px]; }
.voxel-editable__preview--size-default { @apply text-sm h-9 leading-[36px]; }
.voxel-editable__preview--size-large { @apply text-base h-11 leading-[44px]; }

.voxel-editable__input {
  @apply font-sans w-full rounded-md px-2
    bg-[var(--color-surface-base)]
    border border-[var(--color-primary-base)]
    text-[var(--color-text-primary)]
    outline-none ring-2 ring-[var(--color-primary-base)]
    placeholder:text-[var(--color-text-muted)];
}

.voxel-editable__input--size-small { @apply text-[11px] h-7; }
.voxel-editable__input--size-default { @apply text-sm h-9; }
.voxel-editable__input--size-large { @apply text-base h-11; }

.voxel-editable__actions {
  @apply inline-flex items-center gap-1;
}

.voxel-editable__button {
  @apply inline-flex items-center justify-center
    text-[var(--color-text-secondary)]
    hover:text-[var(--color-text-primary)] hover:bg-[var(--color-grey-100)]
    rounded-md
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)]
    transition-colors;
}

.voxel-editable--size-small .voxel-editable__button { @apply size-6; }
.voxel-editable--size-default .voxel-editable__button { @apply size-8; }
.voxel-editable--size-large .voxel-editable__button { @apply size-10; }

.voxel-editable__button--submit { @apply text-[var(--color-success-base)]; }
.voxel-editable__button--cancel { @apply text-[var(--color-error-base)]; }
</style>
