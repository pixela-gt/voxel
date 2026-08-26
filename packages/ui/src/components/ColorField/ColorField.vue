<script setup lang="ts">
import { computed } from 'vue'
import { ColorFieldRoot, ColorFieldInput } from 'reka-ui'
import Input from '../Input/Input.vue'
import ColorSwatch from '../ColorSwatch/ColorSwatch.vue'
import type { ColorFieldProps } from './ColorField.types'

const props = withDefaults(defineProps<ColorFieldProps>(), {
  disabled: false,
  readonly: false,
  variant: 'outlined',
  size: 'default',
  density: 'default',
  focusEffect: 'border',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: ColorFieldProps['modelValue']]
}>()

const swatchColor = computed(() => props.modelValue ?? props.defaultValue ?? undefined)

const rootClass = computed<Record<string, boolean>>(() => ({
  'voxel-color-field': true,
  'voxel-color-field--disabled': props.disabled,
  'voxel-color-field--size-small': props.size === 'small',
  'voxel-color-field--size-default': props.size === 'default',
  'voxel-color-field--size-large': props.size === 'large',
}))
</script>

<template>
  <ColorFieldRoot
    :model-value="modelValue ?? undefined"
    :default-value="defaultValue ?? undefined"
    :placeholder="placeholder"
    :channel="channel"
    :disabled="disabled"
    :readonly="readonly"
    :name="name"
    @update:modelValue="(v) => emit('update:modelValue', v ?? null)"
  >
    <ColorFieldInput as-child>
      <Input
        :variant="variant"
        :density="density"
        :focus-effect="focusEffect"
        :error-message="errorMessage"
        :disabled="disabled"
        :class="rootClass"
      >
        <template #prepend>
          <ColorSwatch v-if="swatchColor" :value="swatchColor" size="small" />
        </template>
      </Input>
    </ColorFieldInput>
  </ColorFieldRoot>
</template>

<style>
.voxel-color-field.voxel-input {
  @apply px-3 py-2;
}

.voxel-color-field.voxel-input .voxel-input__field {
  @apply font-sans;
}

.voxel-color-field--size-small .voxel-input__field { @apply text-[11px]; }
.voxel-color-field--size-default .voxel-input__field { @apply text-sm; }
.voxel-color-field--size-large .voxel-input__field { @apply text-base; }
</style>