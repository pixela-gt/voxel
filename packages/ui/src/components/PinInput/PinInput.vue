<script setup lang="ts">
import { computed } from 'vue'
import { PinInputRoot, PinInputInput } from 'reka-ui'
import type { PinInputProps } from './PinInput.types'

const props = withDefaults(defineProps<PinInputProps>(), {
  length: 6,
  type: 'text',
  mask: false,
  disabled: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const rootClass = computed(() => ['voxel-pin-input', props.class])
</script>

<template>
  <PinInputRoot
    :modelValue="props.modelValue"
    :length="props.length"
    :type="props.type"
    :mask="props.mask"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    @update:modelValue="emit('update:modelValue', $event)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <PinInputInput
      v-for="(_, index) in props.length"
      :key="index"
      :index="index"
      class="voxel-pin-input__field"
    />
  </PinInputRoot>
</template>

<style scoped>
.voxel-pin-input {
  @apply flex items-center gap-2;
}

.voxel-pin-input__field {
  @apply w-10 h-12 text-center text-base font-sans
    bg-[var(--color-surface-base)]
    border border-[var(--color-grey-600)]
    rounded-lg
    transition-colors duration-[var(--transition-fast)]
    placeholder:text-[var(--color-text-muted)]
    hover:border-[var(--color-primary-lighten-1)]
    focus:outline-none focus:border-[var(--color-primary-base)] focus:ring-2 focus:ring-[var(--color-primary-base)]
    disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
