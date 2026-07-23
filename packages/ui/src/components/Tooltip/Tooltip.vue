<script setup lang="ts">
import { computed } from 'vue'
import { TooltipRoot, TooltipTrigger, TooltipContent, TooltipArrow } from 'reka-ui'
import type { TooltipProps, TooltipPosition } from './Tooltip.types'

const props = defineProps<TooltipProps>()

const positionMap: Record<TooltipPosition, 'top' | 'bottom' | 'left' | 'right'> = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
}

const side = computed(() => positionMap[props.position ?? 'top'])
</script>

<template>
  <TooltipRoot :disabled="props.disabled">
    <TooltipTrigger as-child>
      <slot />
    </TooltipTrigger>
    <TooltipContent
      :side="side"
      align="center"
      :side-offset="8"
      class="voxel-tooltip__content"
    >
      {{ props.text }}
      <TooltipArrow class="voxel-tooltip__arrow" />
    </TooltipContent>
  </TooltipRoot>
</template>

<style scoped>
@reference "../../style.css"
.voxel-tooltip__content {
  @apply bg-[var(--color-surface-base)] text-[var(--color-text-primary)] text-xs font-medium
    px-3 py-1.5 rounded-[8px] shadow-[var(--shadow-md)] whitespace-nowrap z-50;
}

.voxel-tooltip__arrow {
  @apply fill-[var(--color-surface-base)] size-2;
}
</style>