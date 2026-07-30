<script setup lang="ts">
import { computed, inject } from 'vue'
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
import type { FormFieldContext } from '../FormField/FormField.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

const props = withDefaults(defineProps<EditableProps>(), {
  placeholder: 'Enter text...',
  disabled: false,
  submitMode: 'blur',
  activationMode: 'focus',
  selectOnFocus: false,
  startWithEditMode: false,
  size: 'default',
  variant: 'outlined',
  density: 'default',
  focusEffect: 'border',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: [value: string]
}>()

const formContext = inject<FormFieldContext | null>(FORM_FIELD_KEY, null)

const effectiveError = computed(() => props.errorMessage ?? formContext?.errorMessage)

const rootClass = computed(() => ['voxel-editable', `voxel-editable--size-${props.size}`, props.class])
const previewClass = computed(() => [
  'voxel-editable__preview',
  `voxel-editable__preview--size-${props.size}`,
  `voxel-editable__preview--variant-${props.variant}`,
  `voxel-editable__preview--density-${props.density}`,
  {
    'voxel-editable__preview--error': !!effectiveError.value,
  },
])
const inputClass = computed(() => [
  'voxel-editable__input',
  `voxel-editable__input--size-${props.size}`,
  `voxel-editable__input--variant-${props.variant}`,
  `voxel-editable__input--density-${props.density}`,
  `voxel-editable__input--focus-${props.focusEffect}`,
  {
    'voxel-editable__input--error': !!effectiveError.value,
  },
])
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

/* Preview — Outlined */
.voxel-editable__preview--variant-outlined {
  @apply font-sans rounded-[var(--rounded-2xl)] px-3
    text-[var(--color-text-primary)]
    border border-[var(--color-grey-200)]
    cursor-text truncate
    hover:bg-[var(--color-surface-light)]
    data-[placeholder]:text-[var(--color-text-muted)];
}

/* Preview — Underlined */
.voxel-editable__preview--variant-underlined {
  @apply font-sans rounded-none px-1
    text-[var(--color-text-primary)]
    border-0 border-b-2 border-[var(--color-grey-300)]
    cursor-text truncate
    hover:bg-[var(--color-surface-light)]
    data-[placeholder]:text-[var(--color-text-muted)];
}

/* Preview — Ghost */
.voxel-editable__preview--variant-ghost {
  @apply font-sans rounded-[var(--rounded-2xl)] px-3
    text-[var(--color-text-primary)]
    border-2 border-transparent
    cursor-text truncate
    hover:bg-[var(--color-surface-light)]
    data-[placeholder]:text-[var(--color-text-muted)];
}

/* Preview density */
.voxel-editable__preview--density-default { @apply h-9 leading-[36px]; }
.voxel-editable__preview--density-dense { @apply h-7 leading-[28px]; }

/* Preview size (override density for backwards compat) */
.voxel-editable__preview--size-small { @apply text-[11px]; }
.voxel-editable__preview--size-default { @apply text-sm; }
.voxel-editable__preview--size-large { @apply text-base; }

/* Preview error */
.voxel-editable__preview--error.voxel-editable__preview--variant-outlined {
  @apply border-[var(--color-error-base)];
}

.voxel-editable__preview--error.voxel-editable__preview--variant-underlined {
  @apply border-b-[var(--color-error-base)];
}

/* Input — Outlined */
.voxel-editable__input {
  @apply font-sans w-full bg-transparent outline-none border-0
    text-[var(--color-text-primary)]
    placeholder:text-[var(--color-text-muted)]
    disabled:cursor-not-allowed;
}

.voxel-editable__input--variant-outlined {
  @apply rounded-[var(--rounded-2xl)] px-3
    bg-[var(--color-surface-background)] border-2 border-[var(--color-grey-200)];
}

.voxel-editable__input--variant-underlined {
  @apply rounded-none px-1
    bg-transparent border-0 border-b-2 border-[var(--color-grey-300)];
}

.voxel-editable__input--variant-ghost {
  @apply rounded-[var(--rounded-2xl)] px-3
    bg-transparent border-2 border-transparent hover:bg-[var(--color-surface-light)];
}

/* Input density */
.voxel-editable__input--density-default { @apply h-9 py-3; }
.voxel-editable__input--density-dense { @apply h-7 py-2; }

/* Input size (override density for backwards compat) */
.voxel-editable__input--size-small { @apply text-[11px]; }
.voxel-editable__input--size-default { @apply text-sm; }
.voxel-editable__input--size-large { @apply text-base; }

/* Input focus effects */
.voxel-editable__input--focus-border:focus-within {
  @apply border-[var(--color-primary-base)]/70;
}

.voxel-editable__input--variant-underlined.voxel-editable__input--focus-border:focus-within {
  @apply border-b-[var(--color-primary-base)]/70;
}

.voxel-editable__input--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

.voxel-editable__input--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Input error */
.voxel-editable__input--error.voxel-editable__input--focus-border:focus-within {
  @apply border-[var(--color-error-base)];
}

.voxel-editable__input--error.voxel-editable__input--variant-underlined.voxel-editable__input--focus-border:focus-within {
  @apply border-b-[var(--color-error-base)];
}

.voxel-editable__input--error.voxel-editable__input--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

.voxel-editable__input--error.voxel-editable__input--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

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
