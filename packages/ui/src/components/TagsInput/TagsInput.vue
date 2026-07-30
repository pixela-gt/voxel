<script setup lang="ts">
import { computed, inject } from 'vue'
import {
  TagsInputRoot,
  TagsInputItem,
  TagsInputItemText,
  TagsInputItemDelete,
  TagsInputInput,
  TagsInputClear,
} from 'reka-ui'
import type { TagsInputProps } from './TagsInput.types'
import type { FormFieldContext } from '../FormField/FormField.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

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
  variant: 'outlined',
  density: 'default',
  focusEffect: 'border',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  'add-tag': [value: string]
  'remove-tag': [value: string]
}>()

const formContext = inject<FormFieldContext | null>(FORM_FIELD_KEY, null)

const effectiveError = computed(() => props.errorMessage ?? formContext?.errorMessage)

const rootClass = computed(() => [
  'voxel-tags-input',
  `voxel-tags-input--variant-${props.variant}`,
  `voxel-tags-input--density-${props.density}`,
  `voxel-tags-input--focus-${props.focusEffect}`,
  {
    'voxel-tags-input--error': !!effectiveError.value,
    'voxel-tags-input--disabled': props.disabled,
  },
  props.class,
])
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
  @apply inline-flex flex-wrap items-center gap-1.5 w-full font-sans transition-all duration-[var(--transition-normal)] focus-within:outline-none;
}

/* Outlined */
.voxel-tags-input--variant-outlined {
  @apply bg-[var(--color-surface-background)] border-2 border-[var(--color-grey-200)] rounded-[var(--rounded-2xl)];
}

.voxel-tags-input--variant-outlined.voxel-tags-input--density-default {
  @apply px-3 py-3;
}

.voxel-tags-input--variant-outlined.voxel-tags-input--density-dense {
  @apply px-2 py-2;
}

/* Underlined */
.voxel-tags-input--variant-underlined {
  @apply bg-transparent border-0 border-b-2 border-[var(--color-grey-300)] rounded-none;
}

.voxel-tags-input--variant-underlined.voxel-tags-input--density-default {
  @apply py-3;
}

.voxel-tags-input--variant-underlined.voxel-tags-input--density-dense {
  @apply py-2;
}

/* Ghost */
.voxel-tags-input--variant-ghost {
  @apply bg-transparent border-2 border-transparent rounded-[var(--rounded-2xl)] hover:bg-[var(--color-surface-light)];
}

.voxel-tags-input--variant-ghost.voxel-tags-input--density-default {
  @apply px-3 py-3;
}

.voxel-tags-input--variant-ghost.voxel-tags-input--density-dense {
  @apply px-2 py-2;
}

/* Focus effects — border */
.voxel-tags-input--focus-border:focus-within {
  @apply border-[var(--color-primary-base)]/70;
}

.voxel-tags-input--variant-underlined.voxel-tags-input--focus-border:focus-within {
  @apply border-b-[var(--color-primary-base)]/70;
}

/* Focus effects — elevation */
.voxel-tags-input--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Focus effects — glow */
.voxel-tags-input--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-primary-base) 12%, transparent);
}

/* Error — border */
.voxel-tags-input--error.voxel-tags-input--focus-border:focus-within {
  @apply border-[var(--color-error-base)];
}

.voxel-tags-input--error.voxel-tags-input--variant-underlined.voxel-tags-input--focus-border:focus-within {
  @apply border-b-[var(--color-error-base)];
}

/* Error — elevation */
.voxel-tags-input--error.voxel-tags-input--focus-elevation:focus-within {
  box-shadow: 0 4px 6px -1px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Error — glow */
.voxel-tags-input--error.voxel-tags-input--focus-glow:focus-within {
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--color-error-base) 12%, transparent);
}

/* Disabled */
.voxel-tags-input--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-tags-input--disabled.voxel-tags-input--variant-outlined {
  @apply bg-[var(--color-grey-50)] border-[var(--color-grey-200)];
}

.voxel-tags-input--disabled.voxel-tags-input--variant-underlined {
  @apply border-b-[var(--color-grey-200)];
}

.voxel-tags-input--disabled.voxel-tags-input--variant-ghost {
  @apply hover:bg-transparent;
}

.voxel-tags-input__item {
  @apply inline-flex items-center gap-1
    bg-[var(--color-primary-lighten-1)] text-[var(--color-primary-base)]
    rounded-md
    data-[disabled]:opacity-50;
}

.voxel-tags-input--density-default .voxel-tags-input__item { @apply h-6 px-2; }
.voxel-tags-input--density-dense .voxel-tags-input__item { @apply h-5 px-1.5; }

.voxel-tags-input__item-text {
  @apply font-medium truncate max-w-[160px];
}

.voxel-tags-input__item-delete {
  @apply inline-flex items-center justify-center
    text-[var(--color-primary-base)] hover:text-[var(--color-primary-darken-1)]
    rounded;
}

.voxel-tags-input__input {
  @apply flex-1 min-w-[80px] bg-transparent outline-none border-0
    text-[var(--color-text-primary)]
    placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed;
}

.voxel-tags-input--density-default .voxel-tags-input__input { @apply h-6 text-sm; }
.voxel-tags-input--density-dense .voxel-tags-input__input { @apply h-5 text-xs; }

.voxel-tags-input__clear {
  @apply inline-flex items-center justify-center
    text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
    rounded;
}
</style>
