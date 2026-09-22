<script setup lang="ts">
import { computed, inject, ref, useAttrs } from 'vue'
import type { FileInputProps } from './FileInput.types'
import type { FormFieldContext } from '../FormField/FormField.types'
import { FORM_FIELD_KEY } from '../FormField/FormField.types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FileInputProps>(), {
  multiple: false,
  accept: undefined,
  disabled: false,
  dragoverText: 'Drop files here',
  browseText: 'Browse files',
})

const emit = defineEmits<{
  'update:modelValue': [files: FileList | null]
  change: [files: FileList | null]
}>()

const attrs = useAttrs()
const formContext = inject<FormFieldContext | null>(FORM_FIELD_KEY, null)
const isDragover = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

const effectiveError = computed(() => props.errorMessage ?? formContext?.errorMessage)
const effectiveId = computed(() => formContext?.id)

// VeeValidate compatibility — its v-slot props expose `value` instead of `modelValue`
const controlledValue = computed(() => props.modelValue ?? props.value)
const describedBy = computed(() => {
  if (!formContext?.id) return undefined
  return effectiveError.value ? `${formContext.id}-error` : `${formContext.id}-hint`
})

const rootClass = computed(() => [
  'voxel-file-input',
  {
    'voxel-file-input--dragover': isDragover.value,
    'voxel-file-input--error': !!effectiveError.value,
    'voxel-file-input--disabled': props.disabled,
  },
  props.class,
])

function openDialog() {
  fileInputRef.value?.click()
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  emit('update:modelValue', files)
  emit('change', files)
  target.value = '' // reset so same file can be re-selected
  // ponytail: forward to vee-validate's onChange if present
  if (typeof attrs.onChange === 'function') {
    attrs.onChange(event)
  }
}

function onDragover(event: DragEvent) {
  event.preventDefault()
  if (!props.disabled) isDragover.value = true
}

function onDragleave() {
  isDragover.value = false
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  isDragover.value = false
  if (props.disabled) return
  const files = event.dataTransfer?.files ?? null
  emit('update:modelValue', files)
  emit('change', files)
}
</script>

<template>
  <div
    :class="rootClass"
    :aria-describedby="describedBy"
    :aria-invalid="!!effectiveError"
    @dragover="onDragover"
    @dragleave="onDragleave"
    @drop="onDrop"
  >
    <input
      :id="effectiveId"
      ref="fileInputRef"
      type="file"
      :name="name"
      :multiple="multiple"
      :accept="accept"
      :disabled="disabled"
      class="voxel-file-input__native"
      @change="onFileChange"
    />
    <div class="voxel-file-input__zone" @click="openDialog" role="button" tabindex="0"
      @keydown.enter="openDialog" @keydown.space.prevent="openDialog">
      <slot>
        <p class="voxel-file-input__text">
          {{ isDragover ? dragoverText : browseText }}
        </p>
        <p v-if="accept" class="voxel-file-input__hint">Accepted: {{ accept }}</p>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.voxel-file-input {
  @apply relative w-full;
}

.voxel-file-input__native {
  @apply absolute inset-0 w-full h-full opacity-0 pointer-events-none;
}

.voxel-file-input__zone {
  @apply flex flex-col items-center justify-center gap-2
    min-h-[120px] p-6
    border-2 border-dashed border-[var(--color-grey-300)]
    rounded-[var(--rounded-2xl)]
    bg-[var(--color-surface-background)]
    cursor-pointer
    transition-colors duration-200
    hover:border-[var(--color-primary-base)] hover:bg-[var(--color-primary-lighten-1)]/4;
}

.voxel-file-input--dragover .voxel-file-input__zone {
  @apply border-[var(--color-primary-base)] bg-[var(--color-primary-lighten-1)]/8;
}

.voxel-file-input--error .voxel-file-input__zone {
  @apply border-[var(--color-error-base)];
}

.voxel-file-input--disabled .voxel-file-input__zone {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-file-input__text {
  @apply text-sm text-[var(--color-text-secondary)] m-0;
}

.voxel-file-input__hint {
  @apply text-xs text-[var(--color-text-muted)] m-0;
}
</style>
