import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Separator from './Separator.vue'

const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    decorative: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { orientation: 'horizontal' } }
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: () => ({
    components: { Separator },
    template: `
      <div style="display:flex;align-items:center;justify-content:center;gap:12px;height:100px;padding:0 24px;">
        <Separator orientation="vertical" />
      </div>
    `,
  }),
}

export const Decorative: Story = { args: { orientation: 'horizontal', decorative: true } }
export const InRow: Story = {
  args: { orientation: 'vertical' },
  render: () => ({
    components: { Separator },
    template: `
      <div style="display:flex;align-items:center;gap:12px;height:24px;padding:12px;min-height:40px;">
        <span>Item 1</span>
        <Separator orientation="vertical" />
        <span>Item 2</span>
        <Separator orientation="vertical" />
        <span>Item 3</span>
      </div>
    `,
  }),
}
