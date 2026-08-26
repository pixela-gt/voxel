import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import Tabs from './Tabs.vue'
import { TabsList, TabsTrigger, TabsContent } from './index'

const meta: Meta<typeof Tabs> = {
  title: 'Surfaces/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    activationMode: { control: 'select', options: ['automatic', 'manual'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { value: 'overview', label: 'Overview' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'reports', label: 'Reports' },
]

const compoundTemplate = (args: any) => ({
  components: { Tabs, TabsList, TabsTrigger, TabsContent },
  setup() {
    const value = ref(args.modelValue ?? 'overview')
    return { args, value }
  },
  template: `
    <Tabs v-bind="args" v-model="value" style="width:400px">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content. Welcome to the dashboard.</TabsContent>
      <TabsContent value="analytics">Analytics content. View your key metrics.</TabsContent>
      <TabsContent value="reports">Reports content. Recent activity and exports.</TabsContent>
    </Tabs>
  `,
})

const simpleTemplate = (args: any) => ({
  components: { Tabs },
  setup() {
    const value = ref(args.modelValue ?? 'overview')
    return { args, value, items }
  },
  template: `
    <Tabs v-bind="args" v-model="value" :items="items" style="width:400px">
      <template #content-overview>Overview content.</template>
      <template #content-analytics>Analytics content.</template>
      <template #content-reports>Reports content.</template>
    </Tabs>
  `,
})

export const Default: Story = { render: compoundTemplate }
export const SimpleItems: Story = { args: { modelValue: 'overview' }, render: simpleTemplate }
export const Vertical: Story = { args: { orientation: 'vertical' }, render: compoundTemplate }
export const Manual: Story = { args: { activationMode: 'manual' }, render: compoundTemplate }
export const SecondSelected: Story = { args: { modelValue: 'analytics' }, render: compoundTemplate }

export const Interactive: Story = {
  render: compoundTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('Analytics'))
    await expect(await within(canvasElement).findByText(/key metrics/)).toBeInTheDocument()
  },
}
