<script setup lang="ts">
import { computed } from 'vue'
import { Check, Info, TriangleAlert, X } from '@lucide/vue'
import { Icon } from '../Icon'
import type { BannerEntry } from './Banner.types'
import { useBannerStore } from '../../composables/useBanner'

const props = defineProps<{ banner: BannerEntry }>()

const store = useBannerStore()

const variantIcon = computed(() => {
  switch (props.banner.variant) {
    case 'success': return Check
    case 'error': return X
    case 'warning': return TriangleAlert
    default: return Info
  }
})

const bannerClass = computed(() => [
  'voxel-banner',
  `voxel-banner--${props.banner.variant ?? 'default'}`,
  { 'voxel-banner--dismissed': !props.banner.open },
])
</script>

<template>
  <div :class="bannerClass" role="alert">
    <div :class="['voxel-banner__icon', `voxel-banner__icon--${banner.variant ?? 'default'}`]">
      <Icon :icon="variantIcon" size="default" />
    </div>
    <div class="voxel-banner__content">
      <p v-if="banner.title" class="voxel-banner__title">{{ banner.title }}</p>
      <p v-if="banner.description" class="voxel-banner__description">{{ banner.description }}</p>
    </div>
    <button
      v-if="banner.dismissible"
      class="voxel-banner__close"
      aria-label="Dismiss"
      @click="store.dismiss(banner.id)"
    >
      <Icon :icon="X" size="small" />
    </button>
  </div>
</template>

<style>
.voxel-banner {
  @apply flex items-start gap-3 w-full p-4
    bg-[var(--color-surface-base)]
    rounded-lg shadow-[var(--shadow-sm)]
    border border-[var(--color-grey-200)]
    transition-all duration-200;
}

.voxel-banner--info { @apply border-l-4 border-l-[var(--color-info-base)]; }
.voxel-banner--success { @apply border-l-4 border-l-[var(--color-success-base)]; }
.voxel-banner--warning { @apply border-l-4 border-l-[var(--color-warning-base)]; }
.voxel-banner--error { @apply border-l-4 border-l-[var(--color-error-base)]; }

.voxel-banner--dismissed {
  @apply opacity-0 -translate-y-2;
}

.voxel-banner__icon {
  @apply flex-shrink-0 flex items-center justify-center size-8 rounded-full;
}

.voxel-banner__icon--default { @apply bg-[var(--color-grey-100)]/12 text-[var(--color-text-secondary)]; }
.voxel-banner__icon--info { @apply bg-[var(--color-info-lighten-1)]/12 text-[var(--color-info-base)]; }
.voxel-banner__icon--success { @apply bg-[var(--color-success-lighten-1)]/12 text-[var(--color-success-base)]; }
.voxel-banner__icon--warning { @apply bg-[var(--color-warning-lighten-1)]/12 text-[var(--color-warning-base)]; }
.voxel-banner__icon--error { @apply bg-[var(--color-error-lighten-1)]/12 text-[var(--color-error-base)]; }

.voxel-banner__content { @apply flex-1 min-w-0; }
.voxel-banner__title { @apply text-sm font-semibold text-[var(--color-text-primary)] m-0; }
.voxel-banner__description { @apply mt-0.5 text-sm text-[var(--color-text-secondary)] leading-snug m-0; }

.voxel-banner__close {
  @apply flex-shrink-0 inline-flex items-center justify-center
    text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
    rounded p-0.5
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)];
}
</style>
