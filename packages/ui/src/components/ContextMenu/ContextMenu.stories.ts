import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ContextMenu from './ContextMenu.vue'

const meta: Meta<typeof ContextMenu> = {
  title: 'Navigation/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  argTypes: {
    modal: { control: 'boolean' },
    pressOpenDelay: { control: { type: 'number' } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = [
  { label: 'Cut', value: 'cut' },
  { label: 'Copy', value: 'copy' },
  { label: 'Paste', value: 'paste' },
  { separator: true },
  { label: 'Delete', value: 'delete', disabled: true },
]

export const Default: Story = {
  args: { items: sampleItems },
  render: () => ({
    components: { ContextMenu },
    setup() { return { sampleItems } },
    template: `
      <div style="padding:60px;display:flex;align-items:center;justify-content:center;border:2px dashed var(--color-grey-300);border-radius:8px">
        <ContextMenu :items="sampleItems">
          <template #trigger>
            <span style="color:var(--color-text-secondary);font-size:13px">Right-click anywhere here</span>
          </template>
        </ContextMenu>
      </div>
    `,
  }),
}
export const WithIcons: Story = {
  args: { items: sampleItems },
  render: () => ({
    components: { ContextMenu },
    setup() { return { sampleItems } },
    template: `
      <div style="padding:60px;display:flex;align-items:center;justify-content:center;border:2px dashed var(--color-grey-300);border-radius:8px">
        <ContextMenu :items="sampleItems">
          <template #trigger>
            <span style="color:var(--color-text-secondary);font-size:13px">Right-click here too</span>
          </template>
        </ContextMenu>
      </div>
    `,
  }),
}
export const NotModal: Story = {
  args: { items: sampleItems, modal: false },
  render: () => ({
    components: { ContextMenu },
    setup() { return { sampleItems } },
    template: `
      <div style="padding:60px;display:flex;align-items:center;justify-content:center;border:2px dashed var(--color-grey-300);border-radius:8px">
        <ContextMenu :items="sampleItems" :modal="false">
          <template #trigger>
            <span>Non-modal context menu</span>
          </template>
        </ContextMenu>
      </div>
    `,
  }),
}
