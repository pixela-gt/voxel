<script setup lang="ts">
import {
  VXButton,
  VXBadge,
  VXCard,
  VXText,
  VXSeparator,
  VXCheckbox,
  VXSwitch,
  VXTabs,
  VXTabsList,
  VXTabsTrigger,
  VXTabsContent,
} from '@pixela-gt/voxel-ui'

const checked = ref(false)
const switched = ref(false)
const tab = ref('one')
</script>

<template>
  <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
    <VXText variant="display-lg" color="primary">Nuxt Playground</VXText>
    <VXSeparator style="margin: 1.5rem 0;" />

    <VXText variant="headline-md">Button</VXText>
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <VXButton>Default</VXButton>
      <VXButton style="outline">Outline</VXButton>
      <VXButton style="tonal">Tonal</VXButton>
    </div>

    <VXText variant="headline-md">Badge</VXText>
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <VXBadge>Default</VXBadge>
      <VXBadge variant="success">Success</VXBadge>
      <VXBadge variant="error">Error</VXBadge>
    </div>

    <VXText variant="headline-md">Form Controls</VXText>
    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
      <VXCheckbox v-model="checked" label="Check me" />
      <VXSwitch v-model="switched" label="Toggle me" />
    </div>

    <VXText variant="headline-md">Card</VXText>
    <VXCard elevation="md" style="padding: 1.5rem; margin-bottom: 1rem;">
      <VXText variant="title-md">Card Title</VXText>
      <VXText variant="body-md">This is a card with some content.</VXText>
    </VXCard>

    <VXText variant="headline-md">Tabs</VXText>
    <VXTabs v-model="tab" style="margin-bottom: 1rem;">
      <VXTabsList>
        <VXTabsTrigger value="one">One</VXTabsTrigger>
        <VXTabsTrigger value="two">Two</VXTabsTrigger>
        <VXTabsTrigger value="three">Three</VXTabsTrigger>
      </VXTabsList>
      <VXTabsContent value="one">
        <VXText>Content for tab one.</VXText>
      </VXTabsContent>
      <VXTabsContent value="two">
        <VXText>Content for tab two.</VXText>
      </VXTabsContent>
      <VXTabsContent value="three">
        <VXText>Content for tab three.</VXText>
      </VXTabsContent>
    </VXTabs>
  </div>
</template>
