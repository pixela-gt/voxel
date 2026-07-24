import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from 'storybook/test'
import { BookOpen, Terminal, Palette } from '@lucide/vue'
import { ref } from 'vue'
import Accordion from './Accordion.vue'
import { AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent } from './index'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
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
  components: { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent },
  setup() {
    const value = ref(args.modelValue ?? (args.type === 'multiple' ? [] : ''))
    return { args, value }
  },
  template: `
    <Accordion v-bind="args" v-model="value" style="width:400px">
      <AccordionItem value="item1">
        <AccordionHeader>
          <AccordionTrigger>What is voxel-ui?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>voxel-ui is a Vue 3 design system based on reka-ui and Tailwind.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item2">
        <AccordionHeader>
          <AccordionTrigger>How do I install it?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>Install via pnpm and import the components you need.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item3">
        <AccordionHeader>
          <AccordionTrigger>Can I customize tokens?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>Yes, override CSS custom properties or use useThemeConfig.</AccordionContent>
      </AccordionItem>
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

export const Default: Story = {
  render: () => ({
    components: { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent, BookOpen, Terminal, Palette },
    setup() {
      const value = ref('')
      return { value, BookOpen, Terminal, Palette }
    },
    template: `
      <Accordion v-model="value" type="single" collapsible style="width:440px">
        <AccordionItem value="what">
          <AccordionHeader>
            <AccordionTrigger :icon="BookOpen">What is voxel-ui?</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <p style="margin:0 0 8px;font-size:13px">voxel-ui is a Vue 3 component design system built on reka-ui primitives and styled with Tailwind CSS. It ships 63 components covering actions, inputs, navigation, layout, overlays, and data display.</p>
            <p style="margin:0;font-size:13px;color:var(--color-text-secondary)">Every component is accessible by default and ships with a Storybook story for design review.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="install">
          <AccordionHeader>
            <AccordionTrigger :icon="Terminal">How do I install it?</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <p style="margin:0 0 8px;font-size:13px">Install via pnpm and import the components you need:</p>
            <ul style="margin:0 0 0 16px;padding:0;font-size:13px;line-height:1.6">
              <li><code style="font-family:ui-monospace,monospace;background:var(--color-grey-100);padding:1px 4px;border-radius:3px">pnpm add @pixela-gt/voxel-ui</code></li>
              <li>Import components from the package, e.g. <code style="font-family:ui-monospace,monospace;background:var(--color-grey-100);padding:1px 4px;border-radius:3px">import { Button } from '@pixela-gt/voxel-ui'</code></li>
              <li>Import the design tokens CSS once in your app root.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="tokens">
          <AccordionHeader>
            <AccordionTrigger :icon="Palette">Can I customize tokens?</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <p style="margin:0;font-size:13px">Yes. Override any CSS custom property (e.g. <code style="font-family:ui-monospace,monospace;background:var(--color-grey-100);padding:1px 4px;border-radius:3px">--color-primary-base</code>) at the <code style="font-family:ui-monospace,monospace;background:var(--color-grey-100);padding:1px 4px;border-radius:3px">:root</code> level, or use the <code style="font-family:ui-monospace,monospace;background:var(--color-grey-100);padding:1px 4px;border-radius:3px">useThemeConfig</code> composable for programmatic control.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    `,
  }),
}
export const SimpleItems: Story = { args: { type: 'single' }, render: simpleTemplate }
export const Single: Story = { args: { type: 'single' }, render: compoundTemplate }
export const Multiple: Story = {
  args: { type: 'multiple' },
  render: () => ({
    components: { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent },
    setup() {
      const value = ref<string[]>([])
      return { value }
    },
    template: `
      <Accordion v-model="value" type="multiple" style="width:400px">
        <AccordionItem value="a">
          <AccordionHeader><AccordionTrigger>Item A</AccordionTrigger></AccordionHeader>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionHeader><AccordionTrigger>Item B</AccordionTrigger></AccordionHeader>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>
    `,
  }),
}
export const Collapsible: Story = { args: { type: 'single', collapsible: true }, render: compoundTemplate }
export const NotCollapsible: Story = { args: { type: 'single', collapsible: false }, render: compoundTemplate }
export const Disabled: Story = { args: { disabled: true }, render: compoundTemplate }

export const Interactive: Story = {
  render: compoundTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('What is voxel-ui?'))
    await expect(await within(canvasElement).findByText(/Vue 3 design system/)).toBeInTheDocument()
  },
}
