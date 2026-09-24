import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Edit, Copy, Trash2 } from '@lucide/vue'
import DropdownMenu from './DropdownMenu.vue'
import DropdownMenuItem from './DropdownMenuItem.vue'
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Overlays/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    sideOffset: { control: 'number' },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    modal: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { sideOffset: 4 },
  render: (args) => ({
    components: { DropdownMenu, DropdownMenuItem },
    setup() { return { args } },
    template: `
      <DropdownMenu v-bind="args" @select="(v) => console.log('selected:', v)">
        <template #trigger>
          <button style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Open menu</button>
        </template>
        <DropdownMenuItem value="edit">Edit</DropdownMenuItem>
        <DropdownMenuItem value="copy">Copy</DropdownMenuItem>
        <DropdownMenuItem value="delete" destructive>Delete</DropdownMenuItem>
      </DropdownMenu>
    `,
  }),
}

export const WithIcons: Story = {
  args: { sideOffset: 4 },
  render: (args) => ({
    components: { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator },
    setup() { return { args } },
    template: `
      <DropdownMenu v-bind="args">
        <template #trigger>
          <button style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Actions</button>
        </template>
        <DropdownMenuItem value="edit" :icon="Edit">Edit</DropdownMenuItem>
        <DropdownMenuItem value="copy" :icon="Copy">Copy</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem value="delete" :icon="Trash2" destructive>Delete</DropdownMenuItem>
      </DropdownMenu>
    `,
  }),
}

export const DisabledItem: Story = {
  args: { sideOffset: 4 },
  render: (args) => ({
    components: { DropdownMenu, DropdownMenuItem },
    setup() { return { args } },
    template: `
      <DropdownMenu v-bind="args">
        <template #trigger>
          <button style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Menu</button>
        </template>
        <DropdownMenuItem value="copy">Copy</DropdownMenuItem>
        <DropdownMenuItem value="paste" disabled>Paste</DropdownMenuItem>
      </DropdownMenu>
    `,
  }),
}
