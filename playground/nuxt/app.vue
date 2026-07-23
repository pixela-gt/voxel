<script setup lang="ts">
import {
  Button,
  Badge,
  Card,
  Text,
  Separator,
  Checkbox,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@pixela-gt/voxel-ui'

const checked = ref(false)
const switched = ref(false)
const tab = ref('one')
</script>

<template>
  <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
    <Text variant="display-lg" color="primary">Nuxt Playground</Text>
    <Separator style="margin: 1.5rem 0;" />

    <Text variant="headline-md">Button</Text>
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <Button>Default</Button>
      <Button style="outline">Outline</Button>
      <Button style="tonal">Tonal</Button>
    </div>

    <Text variant="headline-md">Badge</Text>
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
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
  </div>
</template>