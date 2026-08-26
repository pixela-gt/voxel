<script setup lang="ts">
import { computed } from 'vue'
import { AvatarRoot, AvatarImage, AvatarFallback } from 'reka-ui'
import type { AvatarProps } from './Avatar.types'

const props = withDefaults(defineProps<AvatarProps>(), {
  style: 'default',
  shape: 'rounded',
  size: 'default',
} as const)

const HASH_PALETTE = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const

function hashIndex(name: string): number {
  let sum = 0
  for (const ch of name) sum += ch.charCodeAt(0)
  return sum % HASH_PALETTE.length
}

const initials = computed(() => {
  if (!props.name) return ''
  const words = props.name.trim().split(/\s+/)
  const chars = words.slice(0, 2).map((w) => w.charAt(0))
  return chars.join('').toUpperCase()
})

const colorName = computed(() => props.color ?? HASH_PALETTE[hashIndex(props.name ?? '')])
</script>

<template>
  <AvatarRoot
    :class="[
      'voxel-avatar',
      `voxel-avatar--style-${props.style}`,
      `voxel-avatar--size-${props.size}`,
      `voxel-avatar--shape-${props.shape}`,
      props.class,
    ]"
  >
    <AvatarImage v-if="props.src" :src="props.src" :alt="props.alt" class="voxel-avatar__image" />
    <AvatarFallback
      :class="['voxel-avatar__fallback', initials && `voxel-avatar__fallback--color-${colorName}`]"
    >
      <slot>
        <span v-if="initials" class="voxel-avatar__initials">{{ initials }}</span>
        <svg
          v-else
          class="voxel-avatar__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      </slot>
    </AvatarFallback>
    <div v-if="props.style === 'main'" class="voxel-avatar__shadow voxel-avatar__shadow--1" />
    <div v-if="props.style === 'main'" class="voxel-avatar__shadow voxel-avatar__shadow--2" />
    <span v-if="props.status" :class="`voxel-avatar__status voxel-avatar__status--${props.status} voxel-avatar__status--size-${props.size}`" />
  </AvatarRoot>
</template>

<style scoped>
.voxel-avatar {
  @apply relative inline-block size-8 rounded-[8px] overflow-hidden align-middle bg-[var(--color-surface-light)];
}

.voxel-avatar--size-small {
  @apply size-6;
}

.voxel-avatar--size-large {
  @apply size-10;
}

.voxel-avatar--shape-circle,
.voxel-avatar--shape-circle .voxel-avatar__shadow {
  @apply rounded-full;
}

.voxel-avatar--style-main {
  /* main variant has shadow layers */
}

.voxel-avatar__image {
  @apply absolute inset-0 size-full object-cover;
}

.voxel-avatar__fallback {
  @apply flex items-center justify-center size-full;
}

.voxel-avatar__icon {
  @apply size-4 text-[var(--color-text-secondary)];
}

.voxel-avatar__initials {
  @apply font-semibold leading-none;
}

.voxel-avatar--size-small .voxel-avatar__initials {
  @apply text-[9px];
}
.voxel-avatar--size-default .voxel-avatar__initials {
  @apply text-[11px];
}
.voxel-avatar--size-large .voxel-avatar__initials {
  @apply text-[14px];
}

.voxel-avatar__fallback--color-primary { @apply bg-[var(--color-primary-base)] text-[var(--color-text-on-primary)]; }
.voxel-avatar__fallback--color-secondary { @apply bg-[var(--color-secondary-base)] text-[var(--color-text-on-secondary)]; }
.voxel-avatar__fallback--color-info { @apply bg-[var(--color-info-base)] text-[var(--color-text-on-info)]; }
.voxel-avatar__fallback--color-success { @apply bg-[var(--color-success-base)] text-[var(--color-text-on-success)]; }
.voxel-avatar__fallback--color-warning { @apply bg-[var(--color-warning-base)] text-[var(--color-text-on-warning)]; }
.voxel-avatar__fallback--color-error { @apply bg-[var(--color-error-base)] text-[var(--color-text-on-error)]; }
.voxel-avatar__fallback--color-neutral { @apply bg-[var(--color-neutral-base)] text-[var(--color-text-on-neutral)]; }

.voxel-avatar__shadow {
  @apply absolute size-8 bg-[var(--color-grey-600)];
}
.voxel-avatar__shadow--1 {
  @apply -left-[1px] -top-[4px] rounded-[6px];
}
.voxel-avatar__shadow--2 {
  @apply -left-0 -top-[1px] rounded-[8px];
}

.voxel-avatar--size-small .voxel-avatar__shadow {
  @apply size-6;
}
.voxel-avatar--size-large .voxel-avatar__shadow {
  @apply size-10;
}

.voxel-avatar__status {
  @apply absolute bottom-0 right-0 z-10 rounded-full border-2 border-[var(--color-surface-background)] bg-[var(--color-grey-500)];
}
.voxel-avatar__status--online { @apply bg-[var(--color-success-base)]; }
.voxel-avatar__status--away { @apply bg-[var(--color-warning-base)]; }
.voxel-avatar__status--busy { @apply bg-[var(--color-error-base)]; }

.voxel-avatar__status--size-small {
  @apply size-1.5 -mb-px -mr-px;
}
.voxel-avatar__status--size-default {
  @apply size-2 -mb-px -mr-px;
}
.voxel-avatar__status--size-large {
  @apply size-2.5 -mb-px -mr-px;
}
</style>
