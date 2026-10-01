<script setup lang="ts">
import { computed } from 'vue'
import type { TimestampProps } from './Timestamp.types'

const props = withDefaults(defineProps<TimestampProps>(), {
  format: 'relative',
  locale: undefined,
} as const)

const rootClass = computed(() => ['voxel-timestamp', props.class])

const parsedDate = computed(() => new Date(props.datetime))
const isValid = computed(() => !Number.isNaN(parsedDate.value.getTime()))

const isoDatetime = computed(() => (isValid.value ? parsedDate.value.toISOString() : undefined))

const displayTime = computed(() => {
  if (!isValid.value) return ''

  if (props.format === 'absolute') {
    return new Intl.DateTimeFormat(props.locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(parsedDate.value)
  }

  // Relative time
  const now = Date.now()
  const diffMs = parsedDate.value.getTime() - now
  const absDiffMs = Math.abs(diffMs)
  const rtf = new Intl.RelativeTimeFormat(props.locale, { numeric: 'auto' })

  const minute = 60_000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (absDiffMs < minute) {
    return rtf.format(Math.round(diffMs / 1000), 'second')
  } else if (absDiffMs < hour) {
    return rtf.format(Math.round(diffMs / minute), 'minute')
  } else if (absDiffMs < day) {
    return rtf.format(Math.round(diffMs / hour), 'hour')
  } else if (absDiffMs < week) {
    return rtf.format(Math.round(diffMs / day), 'day')
  } else if (absDiffMs < month) {
    return rtf.format(Math.round(diffMs / week), 'week')
  } else if (absDiffMs < year) {
    return rtf.format(Math.round(diffMs / month), 'month')
  } else {
    return rtf.format(Math.round(diffMs / year), 'year')
  }
})
</script>

<template>
  <time :class="rootClass" :datetime="isoDatetime" v-bind="$attrs">
    {{ displayTime }}
  </time>
</template>

<style scoped>
.voxel-timestamp {
  @apply font-sans text-[var(--color-text-secondary)];
}
</style>
