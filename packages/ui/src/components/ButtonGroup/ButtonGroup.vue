<script setup lang="ts">
import { computed, provide, useSlots, Fragment, Comment, Text, type VNode } from 'vue'
import type { ButtonGroupProps, ButtonGroupContext } from './ButtonGroup.types'
import { BUTTON_GROUP_KEY } from './ButtonGroup.types'
import { Separator } from '../Separator'

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
  separators: true,
  flat: false,
} as const)

const groupContext = computed<ButtonGroupContext>(() => ({
  variant: props.variant,
  color: props.color,
  size: props.size,
  density: props.density,
  disabled: props.disabled,
}))

provide(BUTTON_GROUP_KEY, groupContext.value)

const slots = useSlots()

function flattenVNodes(vnodes: VNode[]): VNode[] {
  const result: VNode[] = []
  for (const vnode of vnodes) {
    if (vnode.type === Comment) continue
    if (vnode.type === Text && typeof vnode.children === 'string' && !vnode.children.trim()) continue
    if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      result.push(...flattenVNodes(vnode.children as VNode[]))
      continue
    }
    result.push(vnode)
  }
  return result
}

const validChildren = computed(() => {
  const raw = slots.default?.()
  return raw ? flattenVNodes(raw) : []
})

const separatorOrientation = computed(() =>
  props.orientation === 'horizontal' ? 'vertical' : 'horizontal'
)

const rootClasses = computed(() => [
  'voxel-button-group',
  `voxel-button-group--${props.orientation}`,
  { 'voxel-button-group--flat': props.flat },
  props.class,
])
</script>

<template>
  <div :class="rootClasses" v-bind="$attrs">
    <template v-for="(child, index) in validChildren" :key="index">
      <Separator
        v-if="props.separators && index > 0"
        :orientation="separatorOrientation"
        class="voxel-button-group__separator"
      />
      <component :is="child" />
    </template>
  </div>
</template>

<style scoped>
.voxel-button-group {
  @apply inline-flex items-center content-stretch relative shrink-0 p-[4px] rounded-[12px]
    bg-[var(--color-surface-light)];
}

.voxel-button-group--vertical {
  @apply flex-col items-stretch;
}

.voxel-button-group--flat {
  @apply bg-transparent p-0 rounded-none;
}

.voxel-button-group__separator {
  @apply bg-[var(--color-grey-200)] shrink-0 rounded-[0.5px];
}

.voxel-button-group--horizontal .voxel-button-group__separator {
  @apply h-[24px] w-px my-auto;
}

.voxel-button-group--vertical .voxel-button-group__separator {
  @apply w-full h-px mx-auto;
}
</style>
