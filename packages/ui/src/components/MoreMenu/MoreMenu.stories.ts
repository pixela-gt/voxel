import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Copy, Trash2, Edit, Download } from '@lucide/vue'
import MoreMenu from './MoreMenu.vue'

const meta: Meta<typeof MoreMenu> = {
  title: 'Actions/MoreMenu',
  component: MoreMenu,
  tags: ['autodocs'],
  argTypes: {
    sideOffset: { control: 'number' },
    align: { control: 'select', options: ['start', 'center', 'end'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = [
  { label: 'Edit', value: 'edit', icon: Edit },
  { label: 'Copy', value: 'copy', icon: Copy },
  { label: 'Download', value: 'download', icon: Download },
  { separator: true },
  { label: 'Delete', value: 'delete', icon: Trash2, destructive: true },
]

export const Default: Story = {
  args: { items: sampleItems, sideOffset: 4, align: 'end' },
  render: (args) => ({
    components: { MoreMenu },
    setup() { return { args } },
    template: `
      <div style="padding:60px;display:flex;align-items:center;justify-content:center">
        <MoreMenu v-bind="args" />
      </div>
    `,
  }),
}

export const DisabledItem: Story = {
  args: {
    items: [
      { label: 'Copy', value: 'copy', icon: Copy },
      { label: 'Paste', value: 'paste', icon: Copy, disabled: true },
    ],
    sideOffset: 4,
  },
  render: (args) => ({
    components: { MoreMenu },
    setup() { return { args } },
    template: `
      <div style="padding:60px;display:flex;align-items:center;justify-content:center">
        <MoreMenu v-bind="args" />
      </div>
    `,
  }),
}

export const AlignStart: Story = {
  args: { items: sampleItems, align: 'start', sideOffset: 4 },
  render: (args) => ({
    components: { MoreMenu },
    setup() { return { args } },
    template: `
      <div style="padding:60px;display:flex;align-items:center;justify-content:center">
        <MoreMenu v-bind="args" />
      </div>
    `,
  }),
}
