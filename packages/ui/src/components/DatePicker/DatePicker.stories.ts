import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DatePicker from './DatePicker.vue'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: { disabled: { control: 'boolean' } },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }