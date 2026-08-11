import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Label from './Label.vue'

const meta: Meta<typeof Label> = {
  title: 'Content/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const text = (t: string) => (args: any) => ({
  components: { Label },
  setup() { return { args } },
  template: `<Label v-bind="args">${t}</Label>`,
})

export const Default: Story = { render: text('Label') }
export const Small: Story = { args: { size: 'small' }, render: text('Small label') }
export const Large: Story = { args: { size: 'large' }, render: text('Large label') }
export const Disabled: Story = { args: { disabled: true }, render: text('Disabled label') }
