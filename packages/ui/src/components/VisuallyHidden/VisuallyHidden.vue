<script setup lang="ts">
import { computed } from 'vue'
import { useVisuallyHidden } from '../../composables/useVisuallyHidden'
import type { VisuallyHiddenProps } from './VisuallyHidden.types'

const props = defineProps<VisuallyHiddenProps>()
const visuallyHiddenClass = useVisuallyHidden()
const rootClass = computed(() => [visuallyHiddenClass, props.class])
</script>

<template>
  <span :class="rootClass"><slot /></span>
</template>
