<script setup lang="ts">
import { ToastProvider, ToastPortal, ToastViewport } from 'reka-ui'
import { provideToastStore, useToastStore } from '../../composables/useToast'
import Toast from './Toast.vue'

provideToastStore()
const store = useToastStore()
</script>

<template>
  <ToastProvider swipe-direction="right" :duration="5000">
    <slot />
    <ToastPortal>
      <ToastViewport class="voxel-toast-viewport">
        <Toast v-for="t in store.toasts.value" :key="t.id" :toast="t">
          <template v-if="$slots.action" #action>
            <slot name="action" :toast="t" />
          </template>
        </Toast>
      </ToastViewport>
    </ToastPortal>
  </ToastProvider>
</template>

<style scoped>
.voxel-toast-viewport {
  @apply fixed bottom-4 right-4 z-[100]
    flex flex-col gap-2
    list-none m-0 p-0
    outline-none;
}
</style>
