<script setup lang="ts">
import { computed } from 'vue'
import type { TextProps } from './Text.types'

const props = withDefaults(defineProps<TextProps>(), {
  tag: 'p',
})

const tag = computed(() => props.tag)
const textClass = computed(() => ['voxel-text', props.variant && `voxel-text--${props.variant}`, props.weight && `voxel-text--${props.weight}`, props.color && `voxel-text--${props.color}`, props.class])
</script>

<template>
  <component
    :is="tag"
    :class="textClass"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style scoped>
@reference "../../style.css"
.voxel-text {
  @apply font-sans antialiased;
}

/* Variants - Display */
.voxel-text--display-lg {
  @apply text-[45px] leading-[56px] tracking-[0.18px] font-normal;
}
.voxel-text--display-md {
  @apply text-[35px] leading-[44px] tracking-[0.14px] font-normal;
}
.voxel-text--display-sm {
  @apply text-[28px] leading-[36px] tracking-[0.12px] font-normal;
}

/* Variants - Headline */
.voxel-text--headline-lg {
  @apply text-[30px] leading-[38px] tracking-[0.12px] font-normal;
}
.voxel-text--headline-md {
  @apply text-[20px] leading-[28px] tracking-[0.1px] font-normal;
}
.voxel-text--headline-sm {
  @apply text-[16px] leading-[24px] tracking-[0.08px] font-normal;
}

/* Variants - Title */
.voxel-text--title-lg {
  @apply text-[28px] leading-[36px] tracking-[0.12px] font-medium;
}
.voxel-text--title-md {
  @apply text-[20px] leading-[28px] tracking-[0.1px] font-medium;
}
.voxel-text--title-sm {
  @apply text-[16px] leading-[24px] tracking-[0.08px] font-medium;
}

/* Variants - Body */
.voxel-text--body-lg {
  @apply text-[16px] leading-[24px] tracking-[0.08px] font-normal;
}
.voxel-text--body-md {
  @apply text-[14px] leading-[20px] tracking-[0.07px] font-normal;
}
.voxel-text--body-sm {
  @apply text-[12px] leading-[16px] tracking-[0.06px] font-normal;
}

/* Variants - Label */
.voxel-text--label-lg {
  @apply text-[14px] leading-[20px] tracking-[0.07px] font-medium;
}
.voxel-text--label-md {
  @apply text-[12px] leading-[16px] tracking-[0.06px] font-medium;
}
.voxel-text--label-sm {
  @apply text-[11px] leading-[16px] tracking-[0.2px] font-medium;
}

/* Variants - Text sizes */
.voxel-text--text-xs {
  @apply text-[12px] leading-[16px] tracking-[0.06px] font-normal;
}
.voxel-text--text-sm {
  @apply text-[14px] leading-[20px] tracking-[0.07px] font-normal;
}
.voxel-text--text-base {
  @apply text-[16px] leading-[24px] tracking-[0.08px] font-normal;
}
.voxel-text--text-lg {
  @apply text-[20px] leading-[28px] tracking-[0.09px] font-normal;
}
.voxel-text--text-xl {
  @apply text-[28px] leading-[36px] tracking-[0.12px] font-normal;
}
.voxel-text--text-2xl {
  @apply text-[30px] leading-[38px] tracking-[0.12px] font-normal;
}
.voxel-text--text-3xl {
  @apply text-[35px] leading-[44px] tracking-[0.14px] font-normal;
}
.voxel-text--text-4xl {
  @apply text-[40px] leading-[50px] tracking-[0.16px] font-normal;
}
.voxel-text--text-5xl {
  @apply text-[45px] leading-[56px] tracking-[0.18px] font-normal;
}
.voxel-text--text-6xl {
  @apply text-[57px] leading-[70px] tracking-[0.22px] font-normal;
}
.voxel-text--text-7xl {
  @apply text-[71px] leading-[88px] tracking-[0.28px] font-normal;
}

/* Weights */
.voxel-text--normal {
  @apply font-normal;
}
.voxel-text--medium {
  @apply font-medium;
}
.voxel-text--bold {
  @apply font-bold;
}

/* Colors */
.voxel-text--primary {
  @apply text-[var(--color-text-primary)];
}
.voxel-text--secondary {
  @apply text-[var(--color-text-secondary)];
}
.voxel-text--inverse {
  @apply text-[var(--color-text-inverse)];
}
.voxel-text--muted {
  @apply text-[var(--color-text-muted)];
}
</style>