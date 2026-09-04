<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import type { BreadcrumbProps } from './Breadcrumb.types'
import { BREADCRUMB_KEY } from './Breadcrumb.types'

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: '/',
  leading: true,
  trailing: true,
})

const items = ref<string[]>([])

function register(uid: string) {
  if (!items.value.includes(uid)) {
    items.value = [...items.value, uid]
  }
}

function unregister(uid: string) {
  items.value = items.value.filter(id => id !== uid)
}

provide(BREADCRUMB_KEY, {
  get separator() { return props.separator },
  get leading() { return props.leading },
  get trailing() { return props.trailing },
  items,
  register,
  unregister,
})

const listClass = computed(() => [
  'vx-breadcrumb__list',
  {
    'vx-breadcrumb__list--leading': props.leading,
    'vx-breadcrumb__list--trailing': props.trailing,
  },
])
</script>

<template>
  <nav aria-label="Breadcrumb" :class="['vx-breadcrumb', props.class]">
    <ol :class="listClass">
      <slot />
    </ol>
  </nav>
</template>

<style scoped>
.vx-breadcrumb {
  @apply flex items-center;
}

.vx-breadcrumb__list {
  @apply flex items-center gap-1 list-none m-0 p-0;
}
</style>
