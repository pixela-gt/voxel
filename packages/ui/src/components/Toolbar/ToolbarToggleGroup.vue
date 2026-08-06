<script setup lang="ts">
import { computed, provide } from 'vue'
import { ToolbarToggleGroup as RekaToolbarToggleGroup } from 'reka-ui'
import type { ToolbarToggleContext, ToolbarToggleGroupProps } from './Toolbar.types'
import { TOOLBAR_TOGGLE_KEY } from './Toolbar.types'

const props = withDefaults(defineProps<ToolbarToggleGroupProps>(), {
  type: 'single',
  disabled: false,
  rovingFocus: true,
  loop: true,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

provide<ToolbarToggleContext>(TOOLBAR_TOGGLE_KEY, { size: 'default' })

const rootClass = computed(() => [
  'voxel-toolbar-toggle-group',
  props.class,
])
</script>

<template>
  <RekaToolbarToggleGroup
    :modelValue="props.modelValue"
    :type="props.type"
    :disabled="props.disabled"
    :rovingFocus="props.rovingFocus"
    :loop="props.loop"
    @update:modelValue="emit('update:modelValue', $event as string | string[])"
    :class="rootClass"
    v-bind="$attrs"
  >
    <slot />
  </RekaToolbarToggleGroup>
</template>

<style scoped>
.voxel-toolbar-toggle-group {
  @apply inline-flex items-center gap-1;
}
</style>
