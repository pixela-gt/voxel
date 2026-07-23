<script setup lang="ts">
import { computed } from 'vue'
import { StepperItem, StepperTrigger, StepperIndicator, StepperTitle, StepperDescription, StepperSeparator, injectStepperRootContext } from 'reka-ui'
import type { StepperItemProps } from './Stepper.types'

const props = defineProps<StepperItemProps>()

const root = injectStepperRootContext()
const state = computed(() => {
  if (props.completed) return 'completed'
  const current = root.modelValue.value ?? 1
  if (current === props.step) return 'active'
  if (current > props.step) return 'completed'
  return 'inactive'
})

const indicatorClass = computed(() => [
  'voxel-stepper-item__indicator',
  `voxel-stepper-item__indicator--${state.value}`,
])

const triggerClass = computed(() => ['voxel-stepper-item__trigger', props.class])
</script>

<template>
  <StepperItem :step="step" :disabled="disabled" :completed="completed" :class="triggerClass">
    <StepperTrigger class="voxel-stepper-item__trigger-inner">
      <StepperIndicator :class="indicatorClass">
        <svg v-if="state === 'completed'" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span v-else>{{ step }}</span>
      </StepperIndicator>
      <div class="voxel-stepper-item__content">
        <StepperTitle v-if="title" class="voxel-stepper-item__title">{{ title }}</StepperTitle>
        <StepperDescription v-if="description" class="voxel-stepper-item__description">{{ description }}</StepperDescription>
      </div>
    </StepperTrigger>
    <StepperSeparator v-if="$slots.separator" class="voxel-stepper-item__separator">
      <slot name="separator" />
    </StepperSeparator>
  </StepperItem>
</template>

<style scoped>
.voxel-stepper-item__trigger {
  @apply flex items-center gap-3;
}

.voxel-stepper--vertical .voxel-stepper-item__trigger {
  @apply flex-col items-start;
}

.voxel-stepper-item__trigger-inner {
  @apply inline-flex items-center gap-3
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2 rounded;
}

.voxel-stepper-item__indicator {
  @apply flex items-center justify-center
    rounded-full
    font-semibold
    text-sm
    transition-colors
    data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed;
}

.voxel-stepper--size-small .voxel-stepper-item__indicator { @apply size-6; }
.voxel-stepper--size-default .voxel-stepper-item__indicator { @apply size-8; }
.voxel-stepper--size-large .voxel-stepper-item__indicator { @apply size-10; }

.voxel-stepper-item__indicator--inactive {
  @apply bg-[var(--color-grey-200)] text-[var(--color-text-secondary)];
}

.voxel-stepper-item__indicator--active {
  @apply bg-[var(--color-primary-base)] text-white;
}

.voxel-stepper-item__indicator--completed {
  @apply bg-[var(--color-success-base)] text-white;
}

.voxel-stepper-item__content {
  @apply flex flex-col;
}

.voxel-stepper-item__title {
  @apply text-sm font-medium text-[var(--color-text-primary)];
}

.voxel-stepper-item__description {
  @apply text-xs text-[var(--color-text-secondary)];
}

.voxel-stepper-item__separator {
  @apply flex-1 bg-[var(--color-grey-200)];
}

.voxel-stepper--horizontal .voxel-stepper-item__separator {
  @apply h-px;
}

.voxel-stepper--vertical .voxel-stepper-item__separator {
  @apply w-px;
}
</style>
