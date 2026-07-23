<script setup lang="ts">
import { RadioGroupItem, RadioGroupIndicator } from 'reka-ui'
import type { RadioItemProps } from './Radio.types'

const props = withDefaults(defineProps<RadioItemProps>(), {
  size: 'default',
  disabled: false,
})
</script>

<template>
  <RadioGroupItem :value="props.value" :disabled="props.disabled" class="voxel-radio__item">
    <span :class="['voxel-radio__indicator', `voxel-radio__indicator--${props.size}`]">
      <RadioGroupIndicator :class="['voxel-radio__dot', `voxel-radio__dot--${props.size}`]">
        <div class="voxel-radio__dot-inner" />
      </RadioGroupIndicator>
    </span>
    <label v-if="props.label" :class="['voxel-radio__label', `voxel-radio__label--${props.size}`]">
      {{ props.label }}
    </label>
    <slot />
  </RadioGroupItem>
</template>

<style scoped>
.voxel-radio__item {
  @apply flex items-center;
}

.voxel-radio__indicator {
  @apply flex-shrink-0 flex items-center justify-center border-[var(--color-grey-400)] bg-[var(--color-surface-base)] border;
}

.voxel-radio__indicator--small {
  @apply size-4 rounded-[8px] border-[1.5px];
}

.voxel-radio__indicator--default {
  @apply size-5 rounded-[10px] border-[1.5px];
}

.voxel-radio__indicator--large {
  @apply size-6 rounded-[12px] border-[2px];
}

.voxel-radio__item[data-state='checked'] .voxel-radio__indicator {
  @apply border-[var(--color-primary-base)];
}

.voxel-radio__dot {
  @apply flex items-center justify-center;
}

.voxel-radio__dot--small {
  @apply size-[6px];
}

.voxel-radio__dot--default {
  @apply size-[8px];
}

.voxel-radio__dot--large {
  @apply size-[10px];
}

.voxel-radio__dot-inner {
  @apply bg-[var(--color-primary-base)] rounded-full size-full;
}

.voxel-radio__label {
  @apply font-sans font-normal text-[var(--color-text-primary)];
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
