<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardContent, HoverCardArrow } from 'reka-ui'
import type { HoverCardProps } from './HoverCard.types'

// `open`/`defaultOpen` need `default: undefined` so Vue does NOT cast an absent
// Boolean prop to `false` (Vue 3 boolean casting). Without this, `props.open` is
// `false` even when unset, forcing reka into controlled-closed mode.
const props = withDefaults(defineProps<HoverCardProps>(), {
  open: undefined,
  defaultOpen: undefined,
  openDelay: 300,
  closeDelay: 100,
  showArrow: true,
} as const)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const attrs = useAttrs()

const rootClass = computed(() => ['voxel-hover-card', props.class])

// Unified open-state pattern (see BUG-008/BUG-009): forward open/defaultOpen
// conditionally so reka's own controlled/uncontrolled handling stays intact
// (reka's sentinel is `open === undefined`, preserved by the defaults above).
const rootBindings = computed(() => ({
  ...(props.open !== undefined ? { open: props.open } : {}),
  ...(props.defaultOpen !== undefined ? { defaultOpen: props.defaultOpen } : {}),
  ...attrs,
}))
</script>

<template>
  <HoverCardRoot
    v-bind="rootBindings"
    :openDelay="props.openDelay"
    :closeDelay="props.closeDelay"
    @update:open="(v: boolean) => emit('update:open', v)"
    :class="rootClass"
  >
    <HoverCardTrigger class="voxel-hover-card__trigger">
      <slot name="trigger" />
    </HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent
        class="voxel-hover-card__content"
        :side-offset="6"
        :side="props.side"
        :align="props.align"
      >
        <slot />
        <HoverCardArrow v-if="props.showArrow" class="voxel-hover-card__arrow" />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>

<style>
.voxel-hover-card {
  @apply inline-flex;
}

.voxel-hover-card__trigger {
  @apply inline-flex items-center cursor-pointer;
}

.voxel-hover-card__content {
  @apply bg-[var(--color-surface-base)]
    rounded-lg shadow-[var(--shadow-xl)]
    p-4
    text-sm text-[var(--color-text-primary)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    z-50;
  max-width: 320px;
}

/* Arrow keeps reka's native 10x5 aspect (attrs govern — no square override;
   the wrapper span rotates it per side). Fill matches the panel; a hairline
   stroke gives the edge definition since the triangle floats over the page,
   and drop-shadows mirror --shadow-xl's two tinted layers so it doesn't
   float unshaded while its panel casts a big soft shadow. */
.voxel-hover-card__arrow {
  @apply fill-[var(--color-surface-base)];
  filter: drop-shadow(0 8px 10px rgba(170, 179, 255, 0.12))
    drop-shadow(0 20px 25px rgba(170, 179, 255, 0.1));
}

.voxel-hover-card__arrow path {
  stroke: var(--color-grey-200);
  stroke-width: 1;
}
</style>
