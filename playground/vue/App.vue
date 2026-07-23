<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  IconButton,
  Badge,
  Checkbox,
  Switch,
  Card,
  Separator,
  Text,
  Avatar,
  Dialog,
  Tooltip,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  RadioGroup,
  RadioItem,
  ToggleButton,
  ToggleButtonGroup,
  Link,
  Drawer,
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
    <Text variant="display-lg" color="primary">Voxel UI Playground</Text>
    <Separator style="margin: 1.5rem 0;" />

    <Text variant="headline-md">Button</Text>
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <Button>Default</Button>
      <Button style="outline">Outline</Button>
      <Button style="tonal">Tonal</Button>
      <Button style="text">Text</Button>
    </div>

    <Text variant="headline-md">Badge</Text>
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>

    <Text variant="headline-md">Form Controls</Text>
    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
      <Checkbox v-model="checked" label="Check me" />
      <Switch v-model="switched" label="Toggle me" />
    </div>

    <Text variant="headline-md">Card</Text>
    <Card elevation="md" style="padding: 1.5rem; margin-bottom: 1rem;">
      <Text variant="title-md">Card Title</Text>
      <Text variant="body-md">This is a card with some content.</Text>
    </Card>

    <Text variant="headline-md">Tabs</Text>
    <Tabs v-model="tab" style="margin-bottom: 1rem;">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
        <TabsTrigger value="three">Three</TabsTrigger>
      </TabsList>
      <TabsContent value="one">
        <Text>Content for tab one.</Text>
      </TabsContent>
      <TabsContent value="two">
        <Text>Content for tab two.</Text>
      </TabsContent>
      <TabsContent value="three">
        <Text>Content for tab three.</Text>
      </TabsContent>
    </Tabs>

    <Text variant="headline-md">Accordion</Text>
    <Accordion type="single" collapsible style="margin-bottom: 1rem;">
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>Is it styled?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Text>Yes. It comes with default styles that match the other components.</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <Text variant="headline-md">Radio</Text>
    <RadioGroup v-model="radio" style="margin-bottom: 1rem;">
      <RadioItem value="a" label="Option A" />
      <RadioItem value="b" label="Option B" />
      <RadioItem value="c" label="Option C" />
    </RadioGroup>

    <Text variant="headline-md">Toggle Button</Text>
    <ToggleButtonGroup v-model="toggled" type="multiple" style="margin-bottom: 1rem;">
      <template #default="{ selected, toggle }">
        <ToggleButton value="bold" :pressed="selected.includes('bold')" @click="toggle('bold', selected.includes('bold'))">Bold</ToggleButton>
        <ToggleButton value="italic" :pressed="selected.includes('italic')" @click="toggle('italic', selected.includes('italic'))">Italic</ToggleButton>
        <ToggleButton value="underline" :pressed="selected.includes('underline')" @click="toggle('underline', selected.includes('underline'))">Underline</ToggleButton>
      </template>
    </ToggleButtonGroup>

    <Text variant="headline-md">Avatar</Text>
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <Avatar src="https://i.pravatar.cc/150?img=1" alt="User" />
      <Avatar src="https://i.pravatar.cc/150?img=2" alt="User" style="main" />
    </div>

    <Text variant="headline-md">Link</Text>
    <div style="margin-bottom: 1rem;">
      <Link href="https://example.com">External link</Link>
    </div>

    <Text variant="headline-md">Tooltip</Text>
    <div style="margin-bottom: 1rem;">
      <Tooltip text="Hello!">
        <Button>Hover me</Button>
      </Tooltip>
    </div>

    <Text variant="headline-md">Drawer</Text>
    <Button @click="drawerOpen = !drawerOpen">Toggle Drawer</Button>
    <Drawer v-model:state="drawerOpen" title="Drawer Title" description="This is a drawer.">
      <Text>Drawer content goes here.</Text>
    </Drawer>

    <Text variant="headline-md">Dialog</Text>
    <Button @click="dialogOpen = true">Open Dialog</Button>
    <Dialog v-model:open="dialogOpen" title="Dialog Title" description="This is a dialog.">
      <div style="padding: 1rem;">
        <Text>Dialog content goes here.</Text>
      </div>
    </Dialog>
  </div>
</template>