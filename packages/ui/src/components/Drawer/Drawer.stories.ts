import type { Meta, StoryObj } from '@storybook/vue3'
import { X } from '@lucide/vue'
import Drawer from './Drawer.vue'

const meta: Meta<typeof Drawer> = {
  title: 'Surfaces/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['expanded', 'collapsed'] },
    title: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const template = (args: any) => ({
  components: { Drawer },
  setup() { return { args } },
  template: `
    <Drawer v-bind="args">
      <template #content>
        <p style="margin:0 0 8px;font-size:14px">Drawer body content.</p>
        <p style="margin:0 0 8px;font-size:13px;color:var(--color-text-secondary)">Use slots for custom body content.</p>
      </template>
      <template #footer>
        <button style="padding:6px 12px;border-radius:6px;background:transparent;border:1px solid var(--color-grey-300);cursor:pointer">Close</button>
      </template>
    </Drawer>
  `,
})

export const Expanded: Story = { args: { state: 'expanded', title: 'Settings' }, render: template }
export const Collapsed: Story = { args: { state: 'collapsed', title: 'Settings' }, render: template }
export const WithDescription: Story = { args: { state: 'expanded', title: 'Settings', description: 'Panel options' }, render: template }
export const WithFooter: Story = { args: { state: 'expanded', title: 'Confirm action' }, render: template }
export const WithCloseIcon: Story = {
  args: { state: 'expanded', title: 'With close' },
  render: () => ({
    components: { Drawer, X },
    setup() { return { X } },
    template: `
      <Drawer state="expanded" title="With close">
        <template #content><p>Content</p></template>
        <template #close-icon><X :size="16" /></template>
      </Drawer>
    `,
  }),
}
