import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Calendar from './Calendar.vue'

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: { disabled: { control: 'boolean' } },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }