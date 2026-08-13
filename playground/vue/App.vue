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
  VXToggle,
  VXLink,
  VXDrawer,
  VXColorField,
} from '@pixela/voxel-ui'

const checked = ref(false)
const switched = ref(false)
const tab = ref('one')
const radio = ref('a')
const toggled = ref(false)
const drawerOpen = ref(false)
const dialogOpen = ref(false)
const color = ref('#3450e8')
</script>

<template>
  <div class="p-8 max-w-3xl mx-auto">
    <VXText variant="display-lg" color="primary">Voxel UI Playground</VXText>
    <VXSeparator class="my-6" />

    <VXText variant="headline-md">ColorField</VXText>
    <div class="mb-4 flex items-center gap-4">
      <VXColorField v-model="color" />
      <VXText>Value: {{ color }}</VXText>
    </div>

    <VXText variant="headline-md">Button</VXText>
    <div class="flex gap-2 mb-4">
      <VXButton>Default</VXButton>
      <VXButton buttonStyle="outline">Outline</VXButton>
      <VXButton buttonStyle="tonal">Tonal</VXButton>
      <VXButton buttonStyle="text">Text</VXButton>
    </div>

    <VXText variant="headline-md">Badge</VXText>
    <div class="flex gap-2 mb-4">
      <VXBadge>Default</VXBadge>
      <VXBadge variant="success">Success</VXBadge>
      <VXBadge variant="error">Error</VXBadge>
      <VXBadge variant="info">Info</VXBadge>
    </div>

    <VXText variant="headline-md">Form Controls</VXText>
    <div class="flex gap-4 items-center mb-4">
      <VXCheckbox v-model="checked" label="Check me" />
      <VXSwitch v-model="switched" label="Toggle me" />
    </div>

    <VXText variant="headline-md">Card</VXText>
    <VXCard elevation="md" class="p-6 mb-4">
      <VXText variant="title-md">Card Title</VXText>
      <VXText variant="body-md">This is a card with some content.</VXText>
    </VXCard>

    <VXText variant="headline-md">Tabs</VXText>
    <VXTabs v-model="tab" class="mb-4">
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
    <VXAccordion type="single" collapsible class="mb-4">
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
    <VXRadioGroup v-model="radio" class="mb-4">
      <VXRadioItem value="a" label="Option A" />
      <VXRadioItem value="b" label="Option B" />
      <VXRadioItem value="c" label="Option C" />
    </VXRadioGroup>

    <VXText variant="headline-md">Toggle</VXText>
    <div class="flex gap-2 items-center mb-4">
      <VXToggle v-model="toggled">Toggle</VXToggle>
      <VXToggle size="small">Small</VXToggle>
      <VXToggle size="large">Large</VXToggle>
      <VXToggle variant="icon-button" aria-label="Favorite">
        <span>★</span>
      </VXToggle>
    </div>

    <VXText variant="headline-md">Avatar</VXText>
    <div class="flex gap-2 mb-4">
      <VXAvatar src="https://i.pravatar.cc/150?img=1" alt="User" />
      <VXAvatar src="https://i.pravatar.cc/150?img=2" alt="User" style="main" />
    </div>

    <VXText variant="headline-md">Link</VXText>
    <div class="mb-4">
      <VXLink href="https://example.com">External link</VXLink>
    </div>

    <VXText variant="headline-md">Tooltip</VXText>
    <div class="mb-4">
      <VXTooltip text="Hello!">
        <VXButton>Hover me</VXButton>
      </VXTooltip>
    </div>

    <VXText variant="headline-md">Drawer</VXText>
    <div class="mb-4">
      <VXButton @click="drawerOpen = !drawerOpen">Toggle Drawer</VXButton>
    </div>
    <VXDrawer v-model:state="drawerOpen" title="Drawer Title" description="This is a drawer.">
      <VXText>Drawer content goes here.</VXText>
    </VXDrawer>

    <VXText variant="headline-md">Dialog</VXText>
    <div class="mb-4">
      <VXButton @click="dialogOpen = true">Open Dialog</VXButton>
    </div>
    <VXDialog v-model:open="dialogOpen" title="Dialog Title" description="This is a dialog.">
      <div class="p-4">
        <VXText>Dialog content goes here.</VXText>
      </div>
    </VXDialog>
  </div>
</template>
