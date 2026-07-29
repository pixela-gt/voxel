<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { Input } from '../Input'
import type { MaskedInputProps } from './MaskedInput.types'
import { applyMask } from './mask'

const props = withDefaults(defineProps<MaskedInputProps>(), {
  type: 'text',
  density: 'default',
  variant: 'outlined',
  focusEffect: 'border',
  disabled: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const slots = useSlots()

const masked = computed(() => {
  const raw = props.modelValue ?? ''
  return props.mask ? applyMask(raw, props.mask) : raw
})

function onInput(value: string | number) {
  const raw = String(value)
  emit('update:modelValue', props.mask ? applyMask(raw, props.mask) : raw)
}
</script>

<template>
  <Input
    :type="type"
    :modelValue="masked"
    :placeholder="placeholder"
    :disabled="disabled"
    :density="density"
    :variant="variant"
    :focusEffect="focusEffect"
    :errorMessage="errorMessage"
    :name="name"
    :class="props.class"
    v-bind="$attrs"
    @update:modelValue="onInput"
  >
    <template v-if="slots.prepend" #prepend><slot name="prepend" /></template>
    <template v-if="slots.append" #append><slot name="append" /></template>
  </Input>
</template>
