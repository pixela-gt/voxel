<script setup lang="ts">
import { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator } from 'reka-ui'
import type { RadioGroupProps } from './Radio.types'

interface RadioItemData {
  value: string
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<RadioGroupProps & { items?: RadioItemData[] }>(), {
  size: 'default',
  disabled: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <RadioGroupRoot
    :value="props.modelValue"
    :disabled="props.disabled"
    :name="props.name"
    :required="props.required"
    @update:modelValue="(v) => v && emit('update:modelValue', v as string)"
    class="inline-flex items-center"
    v-bind="$attrs"
  >
    <RadioGroupItem
      v-for="item in props.items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      :class="['voxel-radio', `voxel-radio--${props.size}`]"
    >
      <span :class="['voxel-radio__indicator', `voxel-radio__indicator--${props.size}`]">
        <RadioGroupIndicator :class="['voxel-radio__icon', `voxel-radio__icon--${props.size}`]">
          <div class="voxel-radio__dot" />
        </RadioGroupIndicator>
      </span>
      <label v-if="item.label" :class="['voxel-radio__label', `voxel-radio__label--${props.size}`]">
        {{ item.label }}
      </label>
    </RadioGroupItem>
    <slot />
  </RadioGroupRoot>
</template>

<style scoped>
.voxel-radio {
  @apply flex items-center;
}

.voxel-radio__indicator {
  @apply flex-shrink-0;
}
.voxel-radio__indicator--small {
  @apply size-4 rounded-[8px] border-[1.5px] border-[var(--color-grey-400)]
    focus-within:ring-2 focus-within:ring-[var(--color-primary-base)] focus-within:ring-offset-2;
}
.voxel-radio__indicator--default {
  @apply size-5 rounded-[10px] border-[1.5px] border-[var(--color-grey-400)]
    focus-within:ring-2 focus-within:ring-[var(--color-primary-base)] focus-within:ring-offset-2;
}
.voxel-radio__indicator--large {
  @apply size-6 rounded-[12px] border-[2px] border-[var(--color-grey-400)]
    focus-within:ring-2 focus-within:ring-[var(--color-primary-base)] focus-within:ring-offset-2;
}

.voxel-radio__icon {
  @apply flex items-center justify-center;
}
.voxel-radio__icon--small {
  @apply size-[6px];
}
.voxel-radio__icon--default {
  @apply size-[8px];
}
.voxel-radio__icon--large {
  @apply size-[10px];
}

.voxel-radio__dot {
  @apply bg-[var(--color-primary-base)] rounded-full size-full;
}

.voxel-radio__label {
  @apply font-sans font-normal text-[var(--color-text-primary)] ml-1.5;
}
.voxel-radio__label--small {
  @apply text-[11px] leading-[16px] tracking-[0.2px];
}
.voxel-radio__label--default {
  @apply text-sm leading-[20px] tracking-[0.07px];
}
.voxel-radio__label--large {
  @apply text-base leading-[24px] tracking-[0.08px];
}
</style>
