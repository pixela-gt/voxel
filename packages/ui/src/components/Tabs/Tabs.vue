<script setup lang="ts">
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'reka-ui'
import type { TabsProps } from './Tabs.types'

interface Tab {
  value: string
  label: string
}

const props = withDefaults(defineProps<TabsProps & { items?: Tab[] }>(), {
  orientation: 'horizontal',
  activationMode: 'automatic',
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <TabsRoot
    v-model="props.modelValue"
    :orientation="props.orientation"
    :activationMode="props.activationMode"
    @update:modelValue="emit('update:modelValue', $event)"
    v-bind="$attrs"
  >
    <TabsList
      :class="[
        'voxel-tabs__list',
        props.orientation === 'vertical' && 'voxel-tabs__list--vertical',
      ]"
    >
      <TabsTrigger
        v-for="tab in items"
        :key="tab.value"
        :value="tab.value"
        class="voxel-tabs__trigger"
      >
        {{ tab.label }}
      </TabsTrigger>
      <slot name="list" />
    </TabsList>

    <TabsContent
      v-for="tab in items"
      :key="tab.value"
      :value="tab.value"
      class="voxel-tabs__content"
    >
      <slot :name="`content-${tab.value}`" />
    </TabsContent>
  </TabsRoot>
</template>

<style scoped>
.voxel-tabs__list {
  @apply inline-flex items-center bg-[var(--color-grey-100)] p-1 rounded-xl gap-1;
}

.voxel-tabs__list--vertical {
  @apply flex-col;
}

.voxel-tabs__trigger {
  @apply relative px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)]
    rounded-lg transition-colors duration-150
    hover:text-[var(--color-text-primary)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.voxel-tabs__trigger[data-state='active'] {
  @apply text-[var(--color-text-on-primary)] bg-[var(--color-primary-base)];
}

.voxel-tabs__content {
  @apply mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}
</style>
