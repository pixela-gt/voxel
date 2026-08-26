<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import type { LinkProps } from './Link.types'
import { Icon } from '../Icon'

const props = withDefaults(defineProps<LinkProps>(), {
  style: 'default',
  color: 'primary',
  size: 'default',
  density: 'default',
  disabled: false,
})

const linkIs = computed(() => {
  if (!props.to) return 'a'
  try {
    return resolveComponent('RouterLink')
  }
  catch {
    return 'a'
  }
})

const linkClasses = computed(() => [
  'voxel-link',
  `voxel-link--style-${props.style}`,
  `voxel-link--color-${props.color}`,
  `voxel-link--size-${props.size}`,
  `voxel-link--density-${props.density}`,
  { 'voxel-link--disabled': props.disabled },
  props.class,
])
</script>

<template>
  <component
    :is="linkIs"
    :to="props.to"
    :class="linkClasses"
    :aria-disabled="props.disabled || undefined"
    :tabindex="props.disabled ? -1 : undefined"
    @click="props.disabled && $event.preventDefault()"
    v-bind="$attrs"
  >
    <span
      v-if="props.icon || $slots.icon"
      class="voxel-link__icon"
      aria-hidden="true"
    >
      <slot name="icon">
        <Icon :icon="props.icon!" :size="props.size" />
      </slot>
    </span>
    <slot>{{ props.label }}</slot>
  </component>
</template>

<style scoped>
.voxel-link {
  @apply inline-flex items-center justify-center whitespace-nowrap font-sans antialiased font-medium;
}

/* Styles */
.voxel-link--style-underlined {
  @apply underline underline-offset-2;
}

.voxel-link--disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* Colors */
.voxel-link--color-primary {
  @apply text-[var(--color-primary-base)];
}
.voxel-link--color-secondary {
  @apply text-[var(--color-secondary-base)];
}

/* Sizes */
.voxel-link--size-small {
  @apply text-[12px] leading-[16px] tracking-[0.06px];
}
.voxel-link--size-default {
  @apply text-[14px] leading-[20px] tracking-[0.07px];
}
.voxel-link--size-large {
  @apply text-[16px] leading-[24px] tracking-[0.08px];
}

/* Density */
.voxel-link--size-default.voxel-link--density-default {
  @apply gap-[6px] p-[4px];
}
.voxel-link--size-default.voxel-link--density-dense {
  @apply gap-[6px] px-[4px] py-[2px];
}
.voxel-link--size-small.voxel-link--density-default {
  @apply gap-[6px] p-[4px];
}
.voxel-link--size-small.voxel-link--density-dense {
  @apply gap-[6px] px-[4px] py-[2px];
}
.voxel-link--size-large.voxel-link--density-default {
  @apply gap-[6px] p-[4px];
}
.voxel-link--size-large.voxel-link--density-dense {
  @apply gap-[6px] px-[4px] py-[2px];
}

/* Elements */
.voxel-link__icon {
  @apply inline-flex items-center justify-center;
}
.voxel-link--size-small .voxel-link__icon {
  @apply size-4;
}
.voxel-link--size-default .voxel-link__icon {
  @apply size-5;
}
.voxel-link--size-large .voxel-link__icon {
  @apply size-6;
}
</style>
