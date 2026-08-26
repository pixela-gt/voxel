import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MonthRangePicker from './MonthRangePicker.vue'

const meta: Meta<typeof MonthRangePicker> = {
  title: 'Components/MonthRangePicker',
  component: MonthRangePicker,
  tags: ['autodocs'],
  argTypes: { disabled: { control: 'boolean' } },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }