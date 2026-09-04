<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, resolveComponent } from 'vue'
import type { BreadcrumbItemProps } from './Breadcrumb.types'
import { BREADCRUMB_KEY } from './Breadcrumb.types'

const props = withDefaults(defineProps<BreadcrumbItemProps>(), {
  active: false,
  disabled: false,
})

const uid = Math.random().toString(36).slice(2, 9)

const context = inject(BREADCRUMB_KEY, {
  separator: '/',
  leading: true,
  trailing: true,
  items: ref([]),
  register: () => { },
  unregister: () => { },
})

onMounted(() => context.register(uid))
onUnmounted(() => context.unregister(uid))

const isFirst = computed(() => context.items.value[0] === uid)
const isLast = computed(() => context.items.value[context.items.value.length - 1] === uid)

const showSeparator = computed(() => {
  if (isFirst.value && !context.leading) return false
  if (isLast.value && !context.trailing) return false
  return true
})

const showTrailing = computed(() => {
  return isLast.value && context.trailing
})

const linkIs = computed(() => {
  if (!props.to) return 'a'
  try { return resolveComponent('NuxtLink') } catch { }
  try { return resolveComponent('RouterLink') } catch { }
  return 'a'
})

const linkBind = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href }
  return {}
})
</script>

<template>
  <li class="vx-breadcrumb__item">
    <span v-if="showSeparator" class="vx-breadcrumb__separator" aria-hidden="true">
      <slot name="separator">{{ context.separator }}</slot>
    </span>
    <component :is="linkIs" v-bind="linkBind"
      :class="['vx-breadcrumb__link', { 'vx-breadcrumb__link--active': props.active }]"
      :aria-current="props.active ? 'page' : undefined" :aria-disabled="props.disabled ? 'true' : undefined">
      <slot />
    </component>
    <span v-if="showTrailing" class="vx-breadcrumb__separator" aria-hidden="true">
      <slot name="separator">{{ context.separator }}</slot>
    </span>
  </li>
</template>

<style scoped>
.vx-breadcrumb__item {
  @apply flex items-center gap-1 cursor-pointer;
}

.vx-breadcrumb__separator {
  @apply text-[var(--color-grey-400)] text-sm;
}

.vx-breadcrumb__link {
  @apply text-sm text-[var(--color-text-secondary)] no-underline transition-colors hover:text-[var(--color-text-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-base)] focus-visible:ring-offset-2;
}

.vx-breadcrumb__link--active {
  @apply font-medium text-[var(--color-primary-base)] pointer-events-none;
}
</style>
