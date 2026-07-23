<script setup lang="ts">
import { computed } from 'vue'
import type { LinkProps } from './Link.types'

const props = withDefaults(defineProps<LinkProps>(), {
  style: 'default',
  color: 'primary',
  size: 'default',
  density: 'default',
})

const linkClasses = computed(() => [
  'voxel-link',
  `voxel-link--${props.style}`,
  `voxel-link--${props.color}`,
  `voxel-link--${props.size}`,
  `voxel-link--${props.density}`,
  props.class,
])

const iconClass = computed(() => {
  const sizes = { small: 'voxel-link__icon--sm', default: 'voxel-link__icon--md', large: 'voxel-link__icon--lg' }
  return sizes[props.size]
})
</script>

<template>
  <a
    :class="linkClasses"
    v-bind="$attrs"
  >
    <slot name="icon">
      <span v-if="props.showIcon !== false" :class="['voxel-link__icon', iconClass]" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </slot>
    <slot>{{ props.label }}</slot>
  </a>
</template>

<style scoped>
.voxel-link {
  @apply inline-flex items-center justify-center whitespace-nowrap font-sans antialiased font-medium;
}

/* Styles */
.voxel-link--underlined {
  @apply underline underline-offset-2;
}

/* Colors */
.voxel-link--primary {
  @apply text-[var(--color-primary-base)];
}
.voxel-link--secondary {
  @apply text-[var(--color-secondary-base)];
}

/* Sizes */
.voxel-link--small {
  @apply text-[12px] leading-[16px] tracking-[0.06px];
}
.voxel-link--default {
  @apply text-[14px] leading-[20px] tracking-[0.07px];
}
.voxel-link--large {
  @apply text-[16px] leading-[24px] tracking-[0.08px];
}

/* Density */
.voxel-link--default.voxel-link--default {
  @apply gap-[6px] p-[4px];
}
.voxel-link--default.voxel-link--dense {
  @apply gap-[6px] px-[4px] py-[2px];
}
.voxel-link--small.voxel-link--default {
  @apply gap-[6px] p-[4px];
}
.voxel-link--small.voxel-link--dense {
  @apply gap-[6px] px-[4px] py-[2px];
}
.voxel-link--large.voxel-link--default {
  @apply gap-[6px] p-[4px];
}
.voxel-link--large.voxel-link--dense {
  @apply gap-[6px] px-[4px] py-[2px];
}

/* Elements */
.voxel-link__icon--sm {
  @apply size-[12px];
}
.voxel-link__icon--md {
  @apply size-[16px];
}
.voxel-link__icon--lg {
  @apply size-[16px];
}
</style>