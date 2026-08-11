import type { Meta, StoryObj } from '@storybook/vue3-vite'
import YearRangePicker from './YearRangePicker.vue'

const meta: Meta<typeof YearRangePicker> = {
  title: 'Components/YearRangePicker',
  component: YearRangePicker,
  tags: ['autodocs'],
  argTypes: { disabled: { control: 'boolean' } },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }