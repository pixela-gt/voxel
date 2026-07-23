<script setup lang="ts">
import { ref } from 'vue'
import {
  VXButton,
  VXIconButton,
  VXBadge,
  VXCheckbox,
  VXSwitch,
  VXCard,
  VXSeparator,
  VXText,
  VXAvatar,
  VXDialog,
  VXTooltip,
  VXTabs,
  VXTabsList,
  VXTabsTrigger,
  VXTabsContent,
  VXAccordion,
  VXAccordionItem,
  VXAccordionHeader,
  VXAccordionTrigger,
  VXAccordionContent,
  VXRadioGroup,
  VXRadioItem,
  VXToggleButton,
  VXToggleButtonGroup,
  VXLink,
  VXDrawer,
} from '@pixela-gt/voxel-ui'

const checked = ref(false)
const switched = ref(false)
const tab = ref('one')
const radio = ref('a')
const toggled = ref<string[]>(['bold'])
const drawerOpen = ref(false)
const dialogOpen = ref(false)
</script>

<template>
  <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
    <VXText variant="display-lg" color="primary">Voxel UI Playground</VXText>
    <VXSeparator style="margin: 1.5rem 0;" />

    <VXText variant="headline-md">Button</VXText>
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <VXButton>Default</VXButton>
      <VXButton style="outline">Outline</VXButton>
      <VXButton style="tonal">Tonal</VXButton>
      <VXButton style="text">Text</VXButton>
    </div>

    <VXText variant="headline-md">Badge</VXText>
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <VXBadge>Default</VXBadge>
      <VXBadge variant="success">Success</VXBadge>
      <VXBadge variant="error">Error</VXBadge>
      <VXBadge variant="info">Info</VXBadge>
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

    <VXText variant="headline-md">Accordion</VXText>
    <VXAccordion type="single" collapsible style="margin-bottom: 1rem;">
      <VXAccordionItem value="item-1">
        <VXAccordionHeader>
          <VXAccordionTrigger>Is it accessible?</VXAccordionTrigger>
        </VXAccordionHeader>
        <VXAccordionContent>
          <VXText>Yes. It adheres to the WAI-ARIA design pattern.</VXText>
        </VXAccordionContent>
      </VXAccordionItem>
      <VXAccordionItem value="item-2">
        <VXAccordionHeader>
          <VXAccordionTrigger>Is it styled?</VXAccordionTrigger>
        </VXAccordionHeader>
        <VXAccordionContent>
          <VXText>Yes. It comes with default styles that match the other components.</VXText>
        </VXAccordionContent>
      </VXAccordionItem>
    </VXAccordion>

    <VXText variant="headline-md">Radio</VXText>
    <VXRadioGroup v-model="radio" style="margin-bottom: 1rem;">
      <VXRadioItem value="a" label="Option A" />
      <VXRadioItem value="b" label="Option B" />
      <VXRadioItem value="c" label="Option C" />
    </VXRadioGroup>

    <VXText variant="headline-md">Toggle Button</VXText>
    <VXToggleButtonGroup v-model="toggled" type="multiple" style="margin-bottom: 1rem;">
      <template #default="{ selected, toggle }">
        <VXToggleButton value="bold" :pressed="selected.includes('bold')" @click="toggle('bold', selected.includes('bold'))">Bold</VXToggleButton>
        <VXToggleButton value="italic" :pressed="selected.includes('italic')" @click="toggle('italic', selected.includes('italic'))">Italic</VXToggleButton>
        <VXToggleButton value="underline" :pressed="selected.includes('underline')" @click="toggle('underline', selected.includes('underline'))">Underline</VXToggleButton>
      </template>
    </VXToggleButtonGroup>

    <VXText variant="headline-md">Avatar</VXText>
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <VXAvatar src="https://i.pravatar.cc/150?img=1" alt="User" />
      <VXAvatar src="https://i.pravatar.cc/150?img=2" alt="User" style="main" />
    </div>

    <VXText variant="headline-md">Link</VXText>
    <div style="margin-bottom: 1rem;">
      <VXLink href="https://example.com">External link</VXLink>
    </div>

    <VXText variant="headline-md">Tooltip</VXText>
    <div style="margin-bottom: 1rem;">
      <VXTooltip text="Hello!">
        <VXButton>Hover me</VXButton>
      </VXTooltip>
    </div>

    <VXText variant="headline-md">Drawer</VXText>
    <VXButton @click="drawerOpen = !drawerOpen">Toggle Drawer</VXButton>
    <VXDrawer v-model:state="drawerOpen" title="Drawer Title" description="This is a drawer.">
      <VXText>Drawer content goes here.</VXText>
    </VXDrawer>

    <VXText variant="headline-md">Dialog</VXText>
    <VXButton @click="dialogOpen = true">Open Dialog</VXButton>
    <VXDialog v-model:open="dialogOpen" title="Dialog Title" description="This is a dialog.">
      <div style="padding: 1rem;">
        <VXText>Dialog content goes here.</VXText>
      </div>
    </VXDialog>
  </div>
</template>
