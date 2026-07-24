import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import { BookOpen, Terminal, Palette } from '@lucide/vue'
import { ref } from 'vue'
import Accordion from './Accordion.vue'

const meta: Meta<typeof Accordion> = {
  title: 'Surfaces/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    type: { control: 'select', options: ['single', 'multiple'] },
    collapsible: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const itemsData = [
  { value: 'item1', header: 'What is voxel-ui?' },
  { value: 'item2', header: 'How do I install it?' },
  { value: 'item3', header: 'Can I customize tokens?' },
]

const compoundTemplate = (args: any) => ({
  components: { Accordion },
  setup() {
    const value = ref(args.modelValue ?? (args.type === 'multiple' ? [] : ''))
    return { args, value, items: itemsData }
  },
  template: `
    <Accordion v-bind="args" v-model="value" :items="items" style="width:400px">
      <template #content="{ item }">
        <span v-if="item.value === 'item1'">voxel-ui is a Vue 3 design system based on reka-ui and Tailwind.</span>
        <span v-else-if="item.value === 'item2'">Install via pnpm and import the components you need.</span>
        <span v-else-if="item.value === 'item3'">Yes, override CSS custom properties or use useThemeConfig.</span>
      </template>
    </Accordion>
  `,
})

const simpleTemplate = (args: any) => ({
  components: { Accordion },
  setup() {
    const value = ref(args.modelValue ?? (args.type === 'multiple' ? [] : ''))
    return { args, value, items: itemsData }
  },
  template: '<Accordion v-bind="args" v-model="value" :items="items" style="width:400px" />',
})

const faqItems = [
  { value: 'what', header: 'What is voxel-ui?', icon: BookOpen },
  { value: 'install', header: 'How do I install it?', icon: Terminal },
  { value: 'tokens', header: 'Can I customize tokens?', icon: Palette },
]

export const Default: Story = {
  render: () => ({
    components: { Accordion },
    setup() {
      const value = ref('')
      return { value, faqItems, BookOpen, Terminal, Palette }
    },
    template: `
      <Accordion v-model="value" type="single" collapsible :items="faqItems" style="width:440px">
        <template #header="{ item }">
          <div style="display:flex;align-items:center;gap:8px">
            <component :is="item.icon" style="width:18px;height:18px" />
            <span>{{ item.header }}</span>
          </div>
        </template>
        <template #content="{ item }">
          <div v-if="item.value === 'what'">
            <p style="margin:0 0 8px;font-size:13px">voxel-ui is a Vue 3 component design system built on reka-ui primitives and styled with Tailwind CSS. It ships 63 components covering actions, inputs, navigation, layout, overlays, and data display.</p>
            <p style="margin:0;font-size:13px;color:var(--color-text-secondary)">Every component is accessible by default and ships with a Storybook story for design review.</p>
          </div>
          <div v-else-if="item.value === 'install'">
            <p style="margin:0 0 8px;font-size:13px">Install via pnpm and import the components you need:</p>
            <ul style="margin:0 0 0 16px;padding:0;font-size:13px;line-height:1.6">
              <li><code style="font-family:ui-monospace,monospace;background:var(--color-grey-100);padding:1px 4px;border-radius:3px">pnpm add @pixela-gt/voxel-ui</code></li>
              <li>Import components from the package, e.g. <code style="font-family:ui-monospace,monospace;background:var(--color-grey-100);padding:1px 4px;border-radius:3px">import { Button } from '@pixela-gt/voxel-ui'</code></li>
              <li>Import the design tokens CSS once in your app root.</li>
            </ul>
          </div>
          <div v-else-if="item.value === 'tokens'">
            <p style="margin:0;font-size:13px">Yes. Override any CSS custom property (e.g. <code style="font-family:ui-monospace,monospace;background:var(--color-grey-100);padding:1px 4px;border-radius:3px">--color-primary-base</code>) at the <code style="font-family:ui-monospace,monospace;background:var(--color-grey-100);padding:1px 4px;border-radius:3px">:root</code> level, or use the <code style="font-family:ui-monospace,monospace;background:var(--color-grey-100);padding:1px 4px;border-radius:3px">useThemeConfig</code> composable for programmatic control.</p>
          </div>
        </template>
      </Accordion>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('What is voxel-ui?'))
    await expect(await canvas.findByText(/Vue 3 component design system/)).toBeInTheDocument()
  },
}

export const SimpleItems: Story = {
  args: { type: 'single' },
  render: simpleTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('What is voxel-ui?'))
    await expect(await canvas.findByText(/Content for item1/)).toBeInTheDocument()
  },
}

export const Single: Story = {
  args: { type: 'single' },
  render: compoundTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('What is voxel-ui?'))
    await expect(await canvas.findByText(/Vue 3 design system/)).toBeInTheDocument()
  },
}

export const Multiple: Story = {
  args: { type: 'multiple' },
  render: compoundTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('What is voxel-ui?'))
    await userEvent.click(canvas.getByText('How do I install it?'))
    await expect(await canvas.findByText(/Vue 3 design system/)).toBeInTheDocument()
    await expect(await canvas.findByText(/Install via pnpm/)).toBeInTheDocument()
  },
}

export const Collapsible: Story = {
  args: { type: 'single', collapsible: true },
  render: compoundTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByText('What is voxel-ui?')
    await userEvent.click(trigger)
    await expect(await canvas.findByText(/Vue 3 design system/)).toBeInTheDocument()
    await userEvent.click(trigger)
  },
}

export const NotCollapsible: Story = {
  args: { type: 'single', collapsible: false },
  render: compoundTemplate,
}

export const Disabled: Story = {
  args: { disabled: true },
  render: compoundTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('What is voxel-ui?'))
    expect(canvas.queryByText(/Vue 3 design system/)).not.toBeInTheDocument()
  },
}

export const Interactive: Story = {
  render: compoundTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('What is voxel-ui?'))
    await expect(await canvas.findByText(/Vue 3 design system/)).toBeInTheDocument()
  },
}
