<script setup lang="ts">
import { computed } from 'vue'
import { HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardContent, HoverCardArrow } from 'reka-ui'
import type { HoverCardProps } from './HoverCard.types'

const props = withDefaults(defineProps<HoverCardProps>(), {
  openDelay: 300,
  closeDelay: 100,
} as const)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const rootClass = computed(() => ['voxel-hover-card', props.class])
</script>

<template>
  <HoverCardRoot
    :open="props.open"
    :defaultOpen="props.defaultOpen"
    :openDelay="props.openDelay"
    :closeDelay="props.closeDelay"
    @update:open="(v: boolean) => emit('update:open', v)"
    :class="rootClass"
    v-bind="$attrs"
  >
    <HoverCardTrigger class="voxel-hover-card__trigger">
      <slot name="trigger" />
    </HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent class="voxel-hover-card__content" :side-offset="6">
        <slot />
        <HoverCardArrow class="voxel-hover-card__arrow" />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>

<style scoped>
.voxel-hover-card {
  @apply inline-flex;
}

.voxel-hover-card__trigger {
  @apply inline-flex items-center cursor-pointer;
}

.voxel-hover-card__content {
  @apply bg-[var(--color-surface-base)]
    rounded-lg shadow-[var(--shadow-md)]
    border border-[var(--color-grey-200)]
    p-4
    text-sm text-[var(--color-text-primary)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    z-50;
  max-width: 320px;
}

.voxel-hover-card__arrow {
  @apply fill-[var(--color-surface-base)] size-2.5;
}
</style>
