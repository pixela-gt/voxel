<script setup lang="ts">
import { computed, provide, ref, watch, nextTick } from 'vue'
import { ToggleGroupRoot } from 'reka-ui'
import type { SegmentedControlContext, SegmentedControlProps } from './SegmentedControl.types'

const props = withDefaults(defineProps<SegmentedControlProps>(), {
  size: 'default',
  disabled: false,
} as const)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const rootRef = ref<HTMLElement | null>(null)

const indicatorStyle = ref<Record<string, string>>({})

function updateIndicator() {
  const root = rootRef.value
  if (!root) return
  const active = root.querySelector<HTMLElement>('[data-state="on"]')
  if (!active) {
    indicatorStyle.value = { opacity: '0' }
    return
  }
  const rootRect = root.getBoundingClientRect()
  const activeRect = active.getBoundingClientRect()
  indicatorStyle.value = {
    '--indicator-left': `${activeRect.left - rootRect.left}px`,
    '--indicator-width': `${activeRect.width}px`,
    opacity: '1',
  }
}

watch(() => props.modelValue, () => {
  nextTick(updateIndicator)
}, { immediate: true })

provide<SegmentedControlContext>('voxelSegmentedControl', {
  size: props.size,
  activeValue: props.modelValue,
})

const rootClass = computed(() => [
  'voxel-segmented-control',
  `voxel-segmented-control--size-${props.size}`,
  props.disabled ? 'voxel-segmented-control--disabled' : '',
  props.class,
])
</script>

<template>
  <div
    ref="rootRef"
    :class="rootClass"
    role="radiogroup"
  >
    <div
      class="voxel-segmented-control__indicator"
      :style="indicatorStyle"
      aria-hidden="true"
    />
    <ToggleGroupRoot
      :modelValue="props.modelValue"
      type="single"
      :disabled="props.disabled"
      class="voxel-segmented-control__group"
      @update:modelValue="(v) => emit('update:modelValue', v as string)"
      v-bind="$attrs"
    >
      <slot />
    </ToggleGroupRoot>
  </div>
</template>

<style scoped>
.voxel-segmented-control {
  @apply relative inline-flex items-center
    bg-[var(--color-surface-light)] rounded-xl p-1
    transition-colors duration-150;
}

.voxel-segmented-control--disabled {
  @apply opacity-50 pointer-events-none;
}

.voxel-segmented-control__indicator {
  @apply absolute top-1 bottom-1 left-0 rounded-lg
    bg-[var(--color-primary-base)]
    transition-all duration-200 ease-in-out;
  transform: translateX(var(--indicator-left, 0px));
  width: var(--indicator-width, 0px);
}

.voxel-segmented-control__group {
  @apply relative z-10 inline-flex items-center gap-1;
}

.voxel-segmented-control--size-small .voxel-segmented-control__indicator {
  @apply top-0.5 bottom-0.5 rounded-md;
}

.voxel-segmented-control--size-large .voxel-segmented-control__indicator {
  @apply rounded-lg;
}
</style>
