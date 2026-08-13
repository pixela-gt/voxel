<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  useForwardPropsEmits,
} from 'reka-ui'
import type { TooltipRootEmits } from 'reka-ui'
import type { TooltipProps } from './Tooltip.types'

const props = defineProps<TooltipProps>()
const emits = defineEmits<TooltipRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

// ponytail: skip reka-ui rendering during SSR to avoid dual-Vue-instance crash
const isClient = ref(false)
onMounted(() => { isClient.value = true })
</script>

<template>
  <template v-if="isClient">
    <TooltipProvider :skip-delay-duration="props.skipDelayDuration">
      <TooltipRoot v-bind="forwarded">
        <TooltipTrigger as-child>
          <slot />
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            :side="props.position"
            :align="props.align"
            :side-offset="props.sideOffset"
            :align-offset="props.alignOffset"
            :arrow-padding="props.arrowPadding"
            :avoid-collisions="props.avoidCollisions"
            :collision-boundary="props.collisionBoundary"
            :collision-padding="props.collisionPadding"
            :sticky="props.sticky"
            :hide-when-detached="props.hideWhenDetached"
            :position-strategy="props.positionStrategy"
            :update-position-strategy="props.updatePositionStrategy"
            :aria-label="props.ariaLabel"
            :force-mount="props.forceMount"
            class="voxel-tooltip__content"
            :class="props.class"
          >
            <slot name="content">
              {{ props.text }}
            </slot>
            <TooltipArrow class="voxel-tooltip__arrow" />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  </template>
  <slot v-else />
</template>

<style>
.voxel-tooltip__content {
  @apply z-50 bg-[var(--color-surface-base)] px-3 py-1.5 text-xs font-medium
    text-[var(--color-text-primary)] whitespace-nowrap rounded-[8px] shadow-[var(--shadow-md)];
}

.voxel-tooltip__arrow {
  @apply size-2 fill-[var(--color-surface-base)];
}
</style>
