<script setup lang="ts">
import { computed } from 'vue'
import type { ToggleButtonGroupProps } from './ToggleButton.types'

const props = defineProps<ToggleButtonGroupProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const selectedValues = computed({
  get() {
    return props.modelValue ?? []
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

function handleButtonClick(buttonValue: string, currentlyPressed: boolean) {
  if (props.type === 'single') {
    selectedValues.value = currentlyPressed ? [] : [buttonValue]
  } else {
    if (currentlyPressed) {
      selectedValues.value = selectedValues.value.filter((v) => v !== buttonValue)
    } else {
      selectedValues.value = [...selectedValues.value, buttonValue]
    }
  }
}
</script>

<template>
  <div class="voxel-toggle-button-group" role="group">
    <slot :selected="selectedValues" :toggle="handleButtonClick" />
  </div>
</template>

<style scoped>
.voxel-toggle-button-group {
  @apply inline-flex items-center;
}
</style>
