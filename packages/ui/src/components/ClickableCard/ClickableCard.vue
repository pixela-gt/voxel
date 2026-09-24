<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import { Card } from '../Card'
import type { ClickableCardProps } from './ClickableCard.types'

const props = withDefaults(defineProps<ClickableCardProps>(), {
  elevation: 'flat',
  disabled: false,
  tag: 'div',
})

const emit = defineEmits<{
  click: [event: MouseEvent | KeyboardEvent]
}>()

const isLink = computed(() => !!props.href || !!props.to)

const rootTag = computed(() => {
  if (props.to) {
    try {
      return resolveComponent('RouterLink')
    } catch {
      return 'a'
    }
  }
  if (props.href) return 'a'
  return props.tag
})

const rootClass = computed(() => [
  'voxel-clickable-card',
  {
    'voxel-clickable-card--disabled': props.disabled,
    'voxel-clickable-card--link': isLink.value,
  },
])

function onClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    emit('click', event)
  }
}
</script>

<template>
  <component
    :is="rootTag"
    :class="rootClass"
    :to="to"
    :href="href"
    :target="target"
    :tabindex="disabled ? -1 : 0"
    role="button"
    @click="onClick"
    @keydown="onKeydown"
  >
    <Card :elevation="elevation" class="voxel-clickable-card__inner">
      <slot />
    </Card>
    <div class="voxel-clickable-card__overlay" aria-hidden="true" />
  </component>
</template>

<style scoped>
.voxel-clickable-card {
  @apply relative block rounded-[var(--rounded-2xl)] outline-none
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2
    cursor-pointer
    transition-transform duration-150
    hover:scale-[1.01]
    active:scale-[0.99];
}

.voxel-clickable-card--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.voxel-clickable-card--link {
  @apply no-underline text-inherit;
}

.voxel-clickable-card__inner {
  @apply relative z-10;
}

.voxel-clickable-card__overlay {
  @apply absolute inset-0 rounded-[var(--rounded-2xl)]
    opacity-0
    transition-opacity duration-150
    bg-[var(--color-primary-base)]/4
    pointer-events-none;
}

.voxel-clickable-card:hover .voxel-clickable-card__overlay {
  @apply opacity-100;
}
</style>
