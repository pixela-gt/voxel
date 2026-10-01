<script setup lang="ts">
import { computed } from 'vue'
import { AlertCircle, AlertTriangle, CheckCircle, Info } from '@lucide/vue'
import { Icon } from '../Icon'
import type { FieldStatusProps } from './FieldStatus.types'

const props = withDefaults(defineProps<FieldStatusProps>(), {
  status: 'info',
} as const)

const iconMap = {
  error: AlertCircle,
  warning: AlertTriangle,
  success: CheckCircle,
  info: Info,
} as const

const icon = computed(() => iconMap[props.status])

const rootClass = computed(() => [
  'voxel-field-status',
  `voxel-field-status--${props.status}`,
  props.class,
])
</script>

<template>
  <div :class="rootClass" :role="props.status === 'error' ? 'alert' : 'status'" v-bind="$attrs">
    <Icon :icon="icon" size="small" class="voxel-field-status__icon" />
    <span v-if="props.message || $slots.default" class="voxel-field-status__message">
      <slot>{{ props.message }}</slot>
    </span>
  </div>
</template>

<style scoped>
.voxel-field-status {
  @apply inline-flex items-center gap-1.5
    font-sans text-xs leading-[16px];
}

.voxel-field-status--error {
  @apply text-[var(--color-error-base)];
}

.voxel-field-status--warning {
  @apply text-[var(--color-warning-darken-1)];
}

.voxel-field-status--success {
  @apply text-[var(--color-success-darken-1)];
}

.voxel-field-status--info {
  @apply text-[var(--color-info-base)];
}

.voxel-field-status__icon {
  @apply flex-shrink-0;
}

.voxel-field-status__message {
  @apply leading-[16px];
}
</style>
