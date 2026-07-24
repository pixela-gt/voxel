import type { Meta, StoryObj } from '@storybook/vue3'
import Badge from './Badge.vue'

const meta: Meta<typeof Badge> = {
  title: 'Content/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'subtle', 'info', 'success', 'warning', 'error'],
    },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    dot: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const label = (text: string) => (args: any) => ({
  components: { Badge },
  setup() { return { args } },
  template: `<Badge v-bind="args">${text}</Badge>`,
})

export const Default: Story = { render: label('Badge') }
export const Outline: Story = { args: { variant: 'outline' }, render: label('Outline') }
export const Subtle: Story = { args: { variant: 'subtle' }, render: label('Subtle') }
export const Info: Story = { args: { variant: 'info' }, render: label('Info') }
export const Success: Story = { args: { variant: 'success' }, render: label('Success') }
export const Warning: Story = { args: { variant: 'warning' }, render: label('Warning') }
export const Error: Story = { args: { variant: 'error' }, render: label('Error') }
export const WithDot: Story = { args: { dot: true }, render: label('Online') }
