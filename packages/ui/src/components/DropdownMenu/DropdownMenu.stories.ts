import type { Meta, StoryObj } from '@storybook/vue3'
import DropdownMenu from './DropdownMenu.vue'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { DropdownMenu },
    template: `
      <DropdownMenu>
        <template #trigger>
          <button style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Open menu</button>
        </template>
      </DropdownMenu>
    `,
  }),
}
export const CustomItems: Story = {
  render: () => ({
    components: { DropdownMenu },
    template: `
      <DropdownMenu>
        <template #trigger>
          <button style="padding:8px 16px;border-radius:8px;background:var(--color-primary-base);color:white;border:none;cursor:pointer">Actions</button>
        </template>
        <template #item="{ item }">
          <span>Custom {{ item }}</span>
        </template>
      </DropdownMenu>
    `,
  }),
}
