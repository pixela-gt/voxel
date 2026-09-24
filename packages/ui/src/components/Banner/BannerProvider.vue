<script setup lang="ts">
import { provideBannerStore, useBannerStore } from '../../composables/useBanner'
import Banner from './Banner.vue'

provideBannerStore()
const store = useBannerStore()
</script>

<template>
  <div class="voxel-banner-provider" v-bind="$attrs">
    <slot />
    <div class="voxel-banner-viewport">
      <Banner v-for="b in store.banners.value" :key="b.id" :banner="b" />
    </div>
  </div>
</template>

<style scoped>
.voxel-banner-viewport {
  @apply flex flex-col gap-2;
}
</style>
