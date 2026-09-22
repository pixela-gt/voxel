import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Copy, Trash2, Edit, Download } from '@lucide/vue'
import MoreMenu from './MoreMenu.vue'
import MoreMenuItem from './MoreMenuItem.vue'
import MoreMenuSeparator from './MoreMenuSeparator.vue'

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

export const Default: Story = {
  args: { sideOffset: 4, align: 'end' },
  render: (args) => ({
    components: { MoreMenu, MoreMenuItem, MoreMenuSeparator },
    setup() { return { args } },
    template: `
      <div style="padding:60px;display:flex;align-items:center;justify-content:center">
        <MoreMenu v-bind="args" @select="(v) => console.log('selected:', v)">
          <MoreMenuItem value="edit" :icon="Edit">Edit</MoreMenuItem>
          <MoreMenuItem value="copy" :icon="Copy">Copy</MoreMenuItem>
          <MoreMenuItem value="download" :icon="Download">Download</MoreMenuItem>
          <MoreMenuSeparator />
          <MoreMenuItem value="delete" :icon="Trash2" destructive>Delete</MoreMenuItem>
        </MoreMenu>
      </div>
    `,
  }),
}

export const DisabledItem: Story = {
  args: { sideOffset: 4 },
  render: (args) => ({
    components: { MoreMenu, MoreMenuItem },
    setup() { return { args } },
    template: `
      <div style="padding:60px;display:flex;align-items:center;justify-content:center">
        <MoreMenu v-bind="args">
          <MoreMenuItem value="copy" :icon="Copy">Copy</MoreMenuItem>
          <MoreMenuItem value="paste" :icon="Copy" disabled>Paste</MoreMenuItem>
        </MoreMenu>
      </div>
    `,
  }),
}

export const AlignStart: Story = {
  args: { sideOffset: 4, align: 'start' },
  render: (args) => ({
    components: { MoreMenu, MoreMenuItem },
    setup() { return { args } },
    template: `
      <div style="padding:60px;display:flex;align-items:center;justify-content:center">
        <MoreMenu v-bind="args">
          <MoreMenuItem value="edit">Edit</MoreMenuItem>
          <MoreMenuItem value="copy">Copy</MoreMenuItem>
        </MoreMenu>
      </div>
    `,
  }),
}
