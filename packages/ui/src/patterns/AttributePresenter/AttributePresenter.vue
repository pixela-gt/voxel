<script setup lang="ts" generic="T">
import { computed } from 'vue'
import type { AttributePresenterProps } from './AttributePresenter.types'
import { toLabel, flattenObject } from './utils'
import { Card } from '../../components/Card'
import { Skeleton } from '../../components/Skeleton'
import { Text } from '../../components/Text'
import { EmptyState } from '../EmptyState'

const props = withDefaults(defineProps<AttributePresenterProps<T>>(), {
  loading: false,
  skeletonCount: 5,
  missingBehavior: 'dash',
  missingFallback: '-',
  elevation: 'flat',
  shadow: 'none',
  dense: false,
} as const)

// Flatten the item for nested object support
const flatItem = computed(() => {
  if (!props.item) return {}
  return flattenObject(props.item as Record<string, any>)
})

// Determine which fields to display
const displayFields = computed(() => {
  if (props.fields) {
    return props.fields.map((field) => ({
      key: field.key,
      label: field.label || toLabel(field.key),
      accessor: field.accessor,
    }))
  }

  // Auto-generate fields from item keys
  return Object.keys(flatItem.value).map((key) => ({
    key,
    label: toLabel(key),
    accessor: undefined,
  }))
})

// Get value for a field
function getValue(field: { key: string; accessor?: (item: any) => any }): any {
  if (field.accessor) {
    return field.accessor(props.item)
  }
  return flatItem.value[field.key]
}

// Check if value is missing
function isMissing(value: any): boolean {
  return value === null || value === undefined || value === ''
}

// Get display value for a field
function getDisplayValue(field: { key: string; accessor?: (item: any) => any }): string | null {
  const value = getValue(field)
  if (isMissing(value)) {
    if (props.missingBehavior === 'hide') return null
    if (props.missingBehavior === 'custom') return props.missingFallback
    return '-'
  }
  return String(value)
}
</script>

<template>
  <Card :elevation="props.elevation"
    :class="['vx-attribute-presenter', { 'vx-attribute-presenter--dense': props.dense }, props.class]"
    :style="props.shadow !== 'none' ? `box-shadow: var(--shadow-${props.shadow})` : undefined" v-bind="$attrs">
    <!-- Title slot or prop -->
    <div v-if="$slots.title || props.title" class="vx-attribute-presenter__title">
      <slot name="title">
        <Text variant="title-sm" weight="medium">{{ props.title }}</Text>
      </slot>
    </div>

    <!-- Loading state -->
    <div v-if="props.loading" class="vx-attribute-presenter__loading">
      <div v-for="n in props.skeletonCount" :key="n" class="vx-attribute-presenter__row">
        <Skeleton variant="text" width="100px" />
        <Skeleton variant="text" />
      </div>
    </div>

    <!-- Empty state -->
    <EmptyState v-else-if="!props.item || displayFields.length === 0" :title="props.emptyText || 'No data'"
      description="There are no attributes to display." />

    <!-- Content -->
    <div v-else class="vx-attribute-presenter__content">
      <div v-for="field in displayFields" :key="field.key" class="vx-attribute-presenter__row">
        <slot :name="`label-${field.key}`" :label="field.label" :value="getValue(field)">
          <span class="vx-attribute-presenter__label">{{ field.label }}</span>
        </slot>
        <slot :name="field.key" :value="getValue(field)" :label="field.label">
          <span v-if="getDisplayValue(field) !== null" class="vx-attribute-presenter__value">
            {{ getDisplayValue(field) }}
          </span>
        </slot>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.vx-attribute-presenter__title {
  @apply mb-4 pb-4 border-b border-[var(--color-surface-light)];
}

.vx-attribute-presenter--dense .vx-attribute-presenter__title {
  @apply mb-2 pb-2;
}

.vx-attribute-presenter__loading {
  @apply space-y-4;
}

.vx-attribute-presenter--dense .vx-attribute-presenter__loading {
  @apply space-y-2;
}

.vx-attribute-presenter__row {
  @apply flex flex-col gap-1;
}

.vx-attribute-presenter--dense .vx-attribute-presenter__row {
  @apply gap-0.5;
}

.vx-attribute-presenter__content {
  @apply space-y-4;
}

.vx-attribute-presenter--dense .vx-attribute-presenter__content {
  @apply space-y-2;
}

.vx-attribute-presenter__label {
  @apply text-sm font-medium text-[var(--color-primary-darken-1)]/80;
}

.vx-attribute-presenter--dense .vx-attribute-presenter__label {
  @apply text-xs;
}

.vx-attribute-presenter__value {
  @apply text-sm text-[var(--color-text-primary)];
}

.vx-attribute-presenter--dense .vx-attribute-presenter__value {
  @apply text-xs;
}
</style>
